import type { NextRequest } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { verifyIdToken } from "@/lib/firebase-admin";

// B2 free tier: 10 GB
const TOTAL_BYTES = 10 * 1024 * 1024 * 1024;

export async function GET(req: NextRequest) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "");
  if (!token) return Response.json({ error: "Unauthorized" }, { status: 401 });
  try {
    await verifyIdToken(token);
  } catch {
    return Response.json({ error: "Invalid token" }, { status: 401 });
  }

  try {
    const snapshot = await adminDb.collection("media").select("fileSize").get();
    const usedBytes = snapshot.docs.reduce(
      (sum, doc) => sum + ((doc.data().fileSize as number) || 0),
      0,
    );
    return Response.json({ usedBytes, totalBytes: TOTAL_BYTES });
  } catch (err) {
    console.error("GET /api/admin/storage error:", err);
    return Response.json({ error: "Failed to fetch storage" }, { status: 500 });
  }
}
