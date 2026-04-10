import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";

const b2 = new S3Client({
  region: "us-east-005",
  endpoint: process.env.B2_ENDPOINT!,
  credentials: {
    accessKeyId: process.env.B2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.B2_SECRET_ACCESS_KEY!,
  },
});

const BUCKET = process.env.B2_BUCKET_NAME!;

export async function uploadToB2(file: File, prefix = "media"): Promise<{ url: string; key: string }> {
  const timestamp = Date.now();
  const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
  const key = `${prefix}/${timestamp}_${safeName}`;

  const buffer = Buffer.from(await file.arrayBuffer());

  await b2.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: buffer,
      ContentType: file.type,
    })
  );

  return { url: `/api/image/${key}`, key };
}

export async function uploadBufferToB2(
  buffer: Buffer,
  _filename: string,
  contentType: string,
  key: string,
): Promise<{ url: string; key: string }> {
  await b2.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    })
  );

  return { url: `/api/image/${key}`, key };
}

export async function getImageStream(key: string, range?: string) {
  const response = await b2.send(
    new GetObjectCommand({
      Bucket: BUCKET,
      Key: key,
      ...(range ? { Range: range } : {}),
    })
  );

  return {
    body: response.Body,
    contentType: response.ContentType || "application/octet-stream",
    contentLength: response.ContentLength,
    contentRange: response.ContentRange,
  };
}

export async function deleteFromB2(imageUrl: string): Promise<void> {
  // Extract key from proxy URL like /api/image/products/123_file.jpg
  const key = imageUrl.replace("/api/image/", "");

  await b2.send(
    new DeleteObjectCommand({
      Bucket: BUCKET,
      Key: key,
    })
  );
}