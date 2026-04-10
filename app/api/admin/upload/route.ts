import type { NextRequest } from "next/server";
import { uploadToB2 } from "@/lib/b2";
import { verifyIdToken } from "@/lib/firebase-admin";

export async function POST(req: NextRequest) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "");
  if (!token) return Response.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await verifyIdToken(token);
  } catch {
    return Response.json({ error: "Invalid token" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return Response.json({ error: "No file provided" }, { status: 400 });
  }

  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "video/mp4",
    "video/webm",
    "video/mov",
  ];
  if (!allowedTypes.includes(file.type)) {
    return Response.json({ error: "Unsupported file type" }, { status: 400 });
  }

  const prefix = file.type.startsWith("video/") ? "media/videos" : "media/images";

  try {
    const { url, key } = await uploadToB2(file, prefix);
    const type: "image" | "video" = file.type.startsWith("video/") ? "video" : "image";
    return Response.json({ url, key, type, mimeType: file.type, fileSize: file.size });
  } catch (err) {
    console.error("Upload error:", err);
    return Response.json({ error: "Upload failed" }, { status: 500 });
  }
}
