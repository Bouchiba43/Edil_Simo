import type { NextRequest } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { verifyIdToken } from "@/lib/firebase-admin";
import { deleteFromB2 } from "@/lib/b2";
import { FieldValue } from "firebase-admin/firestore";

async function authenticate(req: NextRequest) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "");
  if (!token) throw new Error("No token");
  await verifyIdToken(token);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await authenticate(req);
  } catch {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();

  const allowed = ["title", "description", "featured", "order"] as const;
  const update: Record<string, unknown> = { updatedAt: FieldValue.serverTimestamp() };
  for (const field of allowed) {
    if (field in body) update[field] = body[field];
  }

  try {
    await adminDb.collection("media").doc(id).update(update);
    return Response.json({ success: true });
  } catch (err) {
    console.error("PATCH /api/admin/media/[id] error:", err);
    return Response.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await authenticate(req);
  } catch {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const doc = await adminDb.collection("media").doc(id).get();
    if (!doc.exists) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }

    const data = doc.data()!;
    await deleteFromB2(data.url as string);
    await adminDb.collection("media").doc(id).delete();

    return Response.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/admin/media/[id] error:", err);
    return Response.json({ error: "Failed to delete" }, { status: 500 });
  }
}
