/**
 * Retry upload of 117.jpg with exponential backoff.
 * Usage: pnpm tsx --env-file=.env.local scripts/retry-117.ts
 */

import fs from "node:fs/promises";
import path from "node:path";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";

const b2 = new S3Client({
  region: "us-east-005",
  endpoint: process.env.B2_ENDPOINT!,
  credentials: {
    accessKeyId: process.env.B2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.B2_SECRET_ACCESS_KEY!,
  },
  requestHandler: {
    requestTimeout: 120_000, // 2 minutes
    connectionTimeout: 30_000,
  } as never,
});

const BUCKET = process.env.B2_BUCKET_NAME!;

const adminApp =
  getApps().find((a) => a.name === "retry") ||
  initializeApp(
    {
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      }),
    },
    "retry",
  );

const db = getFirestore(adminApp);

async function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function uploadWithRetry(buffer: Buffer, key: string, maxAttempts = 5) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      console.log(`  Attempt ${attempt}/${maxAttempts}…`);
      await b2.send(
        new PutObjectCommand({
          Bucket: BUCKET,
          Key: key,
          Body: buffer,
          ContentType: "image/jpeg",
        }),
      );
      return;
    } catch (err) {
      if (attempt === maxAttempts) throw err;
      const delay = 2 ** attempt * 1000; // 2s, 4s, 8s, 16s
      console.log(`  Failed, retrying in ${delay / 1000}s…`);
      await sleep(delay);
    }
  }
}

async function main() {
  const filename = "117.jpg";
  const key = `media/images/${filename}`;
  const localPath = path.join(process.cwd(), "public", "projects", "images", filename);

  // Check if already in Firestore
  const existing = await db.collection("media").where("key", "==", key).limit(1).get();
  if (!existing.empty) {
    console.log("117.jpg is already in Firestore — nothing to do.");
    process.exit(0);
  }

  console.log(`Uploading ${filename} to B2…`);
  const buffer = await fs.readFile(localPath);
  const stat = await fs.stat(localPath);

  await uploadWithRetry(buffer, key);
  console.log("  Upload OK, writing Firestore document…");

  await db.collection("media").add({
    url: `/api/image/${key}`,
    key,
    type: "image",
    title: "Intervento di muratura - Foto 117",
    description:
      "Documentazione fotografica delle lavorazioni edili in cantiere, con attenzione alla qualita esecutiva e alla corretta posa dei materiali.",
    featured: false,
    mimeType: "image/jpeg",
    fileSize: stat.size,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  });

  console.log("✓ Done");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
