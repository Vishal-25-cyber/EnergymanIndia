import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { Readable } from "stream";
import connectToDatabase from "@/lib/db/mongoose";
import { getSession } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const session = await getSession(req);
    if (!session || (session.role !== "TEACHER" && session.role !== "ADMIN")) {
      return NextResponse.json({ error: "Unauthorized. Staff access only." }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) {
      return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }

    await connectToDatabase();
    const db = mongoose.connection.db;
    if (!db) {
      return NextResponse.json({ error: "Database connection failed." }, { status: 500 });
    }

    const cleanFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const bucket = new mongoose.mongo.GridFSBucket(db, { bucketName: "materials" });
    const uploadStream = bucket.openUploadStream(cleanFileName, {
      contentType: file.type || "application/pdf",
      metadata: {
        originalName: file.name,
        uploadedBy: session.userId,
        size: file.size,
        createdAt: new Date(),
      },
    });

    await new Promise<void>((resolve, reject) => {
      const readable = Readable.from(buffer);
      readable
        .pipe(uploadStream)
        .on("finish", () => resolve())
        .on("error", (err) => reject(err));
    });

    const fileId = uploadStream.id.toString();
    const fileUrl = `/api/materials/file/${fileId}`;

    const sizeStr = file.size > 1024 * 1024
      ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
      : `${Math.round(file.size / 1024)} KB`;

    return NextResponse.json({
      success: true,
      fileUrl,
      fileName: file.name,
      fileSize: sizeStr,
      fileId,
    });
  } catch (error: any) {
    console.error("Assignment Question Paper Upload Error:", error);
    return NextResponse.json({ error: error.message || "Failed to upload file." }, { status: 500 });
  }
}
