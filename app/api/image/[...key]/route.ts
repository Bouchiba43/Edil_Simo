import type { NextRequest } from "next/server";
import { getImageStream } from "@/lib/b2";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ key: string[] }> },
) {
  const { key: segments } = await params;
  const key = segments.join("/");
  const range = req.headers.get("range") ?? undefined;

  try {
    const { body, contentType, contentLength, contentRange } = await getImageStream(key, range);

    if (!body) {
      return new Response("Not found", { status: 404 });
    }

    const headers: Record<string, string> = {
      "Content-Type": contentType,
      "Accept-Ranges": "bytes",
      // Videos must not be cached immutably; images can be.
      "Cache-Control": contentType.startsWith("video/")
        ? "public, max-age=3600"
        : "public, max-age=31536000, immutable",
    };

    if (contentLength !== undefined) {
      headers["Content-Length"] = String(contentLength);
    }
    if (contentRange) {
      headers["Content-Range"] = contentRange;
    }

    const status = range ? 206 : 200;

    return new Response(body as ReadableStream, { status, headers });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
