import type { NextRequest } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { verifyIdToken } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";

async function authenticate(req: NextRequest) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "");
  if (!token) throw new Error("No token");
  await verifyIdToken(token);
}

export async function GET(req: NextRequest) {
  try {
    await authenticate(req);
  } catch {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = req.nextUrl;
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
  const limit = Math.min(48, Math.max(1, parseInt(searchParams.get("limit") ?? "12", 10)));
  const type = searchParams.get("type");
  const featured = searchParams.get("featured");

  try {
    let query: FirebaseFirestore.Query = adminDb
      .collection("media")
      .orderBy("createdAt", "desc");

    if (type === "image" || type === "video") {
      query = query.where("type", "==", type);
    }
    if (featured === "true") {
      query = query.where("featured", "==", true);
    }

    const countSnap = await query.count().get();
    const total = countSnap.data().count;

    const snapshot = await query
      .offset((page - 1) * limit)
      .limit(limit)
      .get();

    const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    return Response.json({ items, total, page, limit, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    console.error("GET /api/admin/media error:", err);
    return Response.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await authenticate(req);
  } catch {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { url, key, type, title, description, mimeType, fileSize } = body;

    if (!url || !key || !type) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    const docRef = await adminDb.collection("media").add({
      url,
      key,
      type,
      title: title ?? "",
      description: description ?? "",
      featured: false,
      mimeType: mimeType ?? "",
      fileSize: fileSize ?? 0,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });

    return Response.json({ id: docRef.id }, { status: 201 });
  } catch (err) {
    console.error("POST /api/admin/media error:", err);
    return Response.json({ error: "Failed to create" }, { status: 500 });
  }
}
