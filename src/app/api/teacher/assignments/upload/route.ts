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

    await connectToDatabase();
    const db = mongoose.connection.db;
    if (!db) {
      return NextResponse.json({ error: "Database connection failed." }, { status: 500 });
    }

    let buffer: Buffer;
    let fileName: string = "question_paper.pdf";
    let contentType: string = "application/pdf";
    let fileSizeNum: number = 0;

    const reqContentType = req.headers.get("content-type") || "";

    if (reqContentType.includes("application/json")) {
      const body = await req.json();
      const { fileData, fileName: rawName, fileType } = body;
      if (!fileData) {
        return NextResponse.json({ error: "No file data provided." }, { status: 400 });
      }

      if (rawName) fileName = rawName;
      if (fileType) contentType = fileType;

      if (fileData.startsWith("data:")) {
        const commaIdx = fileData.indexOf(",");
        const header = commaIdx !== -1 ? fileData.substring(0, commaIdx) : "";
        const base64Data = commaIdx !== -1 ? fileData.substring(commaIdx + 1).replace(/\s/g, "+") : fileData.replace(/\s/g, "+");
        const match = header.match(/data:([^;,]+)/);
        if (match && match[1]) contentType = match[1].toLowerCase();
        buffer = Buffer.from(base64Data, "base64");
      } else {
        buffer = Buffer.from(fileData.replace(/\s/g, "+"), "base64");
      }
      fileSizeNum = buffer.length;
    } else {
      const formData = await req.formData();
      const file = formData.get("file") as File | null;
      if (!file) {
        return NextResponse.json({ error: "No file provided." }, { status: 400 });
      }
      fileName = file.name;
      contentType = file.type || "application/pdf";
      fileSizeNum = file.size;
      const arrayBuffer = await file.arrayBuffer();
      buffer = Buffer.from(arrayBuffer);
    }

    const cleanFileName = fileName.replace(/[^a-zA-Z0-9._-]/g, "_");

    const bucket = new mongoose.mongo.GridFSBucket(db, { bucketName: "materials" });
    const uploadStream = bucket.openUploadStream(cleanFileName, {
      contentType,
      metadata: {
        originalName: fileName,
        uploadedBy: session.userId,
        size: fileSizeNum,
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

    const sizeStr = fileSizeNum > 1024 * 1024
      ? `${(fileSizeNum / (1024 * 1024)).toFixed(1)} MB`
      : `${Math.round(fileSizeNum / 1024)} KB`;

    return NextResponse.json({
      success: true,
      fileUrl,
      fileName,
      fileSize: sizeStr,
      fileId,
    });
  } catch (error: any) {
    console.error("Assignment Question Paper Upload Error:", error);
    return NextResponse.json({ error: error.message || "Failed to upload file." }, { status: 500 });
  }
}
