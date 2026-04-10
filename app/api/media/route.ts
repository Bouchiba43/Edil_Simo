import { adminDb } from "@/lib/firebase-admin";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
  const limit = Math.min(48, Math.max(1, parseInt(searchParams.get("limit") ?? "20", 10)));
  const type = searchParams.get("type"); // 'image' | 'video' | null
  const featured = searchParams.get("featured"); // 'true' | null

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

    return Response.json({
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error("GET /api/media error:", err);
    return Response.json({ error: "Failed to fetch media" }, { status: 500 });
  }
}
