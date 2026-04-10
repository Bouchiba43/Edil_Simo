/**
 * One-time migration: upload all images from public/projects/images/ to B2
 * and seed Firestore with metadata from media-catalog.json.
 *
 * Usage:
 *   pnpm tsx scripts/migrate-to-b2.ts
 *
 * Requires .env.local to have all B2_* and FIREBASE_* vars set.
 */

import "dotenv/config";
import fs from "node:fs/promises";
import path from "node:path";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";

// ── Config ───────────────────────────────────────────────────────────────────

const b2 = new S3Client({
  region: "us-east-005",
  endpoint: process.env.B2_ENDPOINT!,
  credentials: {
    accessKeyId: process.env.B2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.B2_SECRET_ACCESS_KEY!,
  },
});
const BUCKET = process.env.B2_BUCKET_NAME!;

const adminApp =
  getApps().find((a) => a.name === "migrate") ||
  initializeApp(
    {
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      }),
    },
    "migrate",
  );

const db = getFirestore(adminApp);

// ── Types ────────────────────────────────────────────────────────────────────

interface CatalogItem {
  file_name: string;
  title: string;
  description: string;
}
interface CatalogSection {
  folder: string;
  media: CatalogItem[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

async function uploadFile(localPath: string, b2Key: string, contentType: string) {
  const buffer = await fs.readFile(localPath);
  await b2.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: b2Key,
      Body: buffer,
      ContentType: contentType,
    }),
  );
  return `/api/image/${b2Key}`;
}

function guessMime(filename: string): string {
  const ext = path.extname(filename).toLowerCase();
  const map: Record<string, string> = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
    ".gif": "image/gif",
    ".mp4": "video/mp4",
    ".webm": "video/webm",
    ".mov": "video/quicktime",
  };
  return map[ext] ?? "application/octet-stream";
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const publicDir = path.join(process.cwd(), "public");
  const catalogPath = path.join(publicDir, "projects", "media-catalog.json");

  const raw = await fs.readFile(catalogPath, "utf8");
  const catalog: CatalogSection[] = JSON.parse(raw);

  for (const section of catalog) {
    const type: "image" | "video" = section.folder.includes("video") ? "video" : "image";
    const localFolder = path.join(publicDir, section.folder);

    console.log(`\n── ${section.folder} (${section.media.length} files) ──`);

    for (const item of section.media) {
      const localPath = path.join(localFolder, item.file_name);

      // Check file exists locally
      try {
        await fs.access(localPath);
      } catch {
        console.warn(`  SKIP (not found): ${item.file_name}`);
        continue;
      }

      // Check if already in Firestore
      const existing = await db
        .collection("media")
        .where("key", "==", `media/${section.folder.split("/")[1]}/${item.file_name}`)
        .limit(1)
        .get();

      if (!existing.empty) {
        console.log(`  SKIP (exists): ${item.file_name}`);
        continue;
      }

      const mimeType = guessMime(item.file_name);
      const b2Key = `media/${section.folder.split("/")[1]}/${item.file_name}`;

      try {
        const stat = await fs.stat(localPath);
        const url = await uploadFile(localPath, b2Key, mimeType);

        await db.collection("media").add({
          url,
          key: b2Key,
          type,
          title: item.title,
          description: item.description,
          featured: false,
          mimeType,
          fileSize: stat.size,
          createdAt: FieldValue.serverTimestamp(),
          updatedAt: FieldValue.serverTimestamp(),
        });

        console.log(`  OK: ${item.file_name}`);
      } catch (err) {
        console.error(`  ERROR: ${item.file_name}`, err);
      }
    }
  }

  console.log("\n✓ Migration complete");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
