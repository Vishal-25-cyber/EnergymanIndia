import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import connectToDatabase from "@/lib/db/mongoose";
import { getSession } from "@/lib/auth/session";
import Notification from "@/models/Notification";

export async function GET(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ notifications: [] });
    }

    await connectToDatabase();
    
    // Support matching both string and ObjectId userId
    const userConditions: any[] = [{ userId: session.userId }];
    if (mongoose.Types.ObjectId.isValid(session.userId)) {
      userConditions.push({ userId: new mongoose.Types.ObjectId(session.userId) });
    }

    const notifications = await Notification.find({ $or: userConditions })
      .sort({ createdAt: -1 })
      .limit(30)
      .lean();

    return NextResponse.json({ notifications });
  } catch (error: any) {
    console.error("GET /api/notifications error:", error);
    return NextResponse.json({ notifications: [] });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const body = await req.json().catch(() => ({}));
    const { notificationId, markAll = false } = body;

    const userConditions: any[] = [{ userId: session.userId }];
    if (mongoose.Types.ObjectId.isValid(session.userId)) {
      userConditions.push({ userId: new mongoose.Types.ObjectId(session.userId) });
    }

    if (markAll) {
      await Notification.updateMany(
        { $or: userConditions, read: false },
        { $set: { read: true } }
      );
    } else if (notificationId) {
      const idFilter = mongoose.Types.ObjectId.isValid(notificationId)
        ? new mongoose.Types.ObjectId(notificationId)
        : notificationId;

      await Notification.updateOne(
        { _id: idFilter },
        { $set: { read: true } }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("PUT /api/notifications error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    let notificationId: string | null = null;
    let deleteAll = false;
    let deleteRead = false;

    const { searchParams } = new URL(req.url);
    notificationId = searchParams.get("id") || searchParams.get("notificationId");
    if (searchParams.get("all") === "true") deleteAll = true;
    if (searchParams.get("read") === "true") deleteRead = true;

    if (!notificationId && !deleteAll && !deleteRead) {
      const body = await req.json().catch(() => ({}));
      notificationId = body.notificationId || body.id;
      deleteAll = !!body.deleteAll;
      deleteRead = !!body.deleteRead;
    }

    const userConditions: any[] = [{ userId: session.userId }];
    if (mongoose.Types.ObjectId.isValid(session.userId)) {
      userConditions.push({ userId: new mongoose.Types.ObjectId(session.userId) });
    }

    if (deleteAll) {
      await Notification.deleteMany({ $or: userConditions });
      return NextResponse.json({ success: true, message: "All notifications deleted" });
    }

    if (deleteRead) {
      await Notification.deleteMany({ $or: userConditions, read: true });
      return NextResponse.json({ success: true, message: "Read notifications deleted" });
    }

    if (notificationId) {
      const idFilter = mongoose.Types.ObjectId.isValid(notificationId)
        ? new mongoose.Types.ObjectId(notificationId)
        : notificationId;

      await Notification.deleteOne({
        _id: idFilter,
        $or: userConditions,
      });
      return NextResponse.json({ success: true, message: "Notification deleted" });
    }

    return NextResponse.json({ error: "Missing notificationId or deleteAll flag" }, { status: 400 });
  } catch (error: any) {
    console.error("DELETE /api/notifications error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const body = await req.json();
    const { title, message, type = "SYSTEM", linkUrl, targetUserId } = body;

    if (!title || !message) {
      return NextResponse.json({ error: "Title and message required" }, { status: 400 });
    }

    const recipientId = targetUserId || session.userId;
    const notification = await Notification.create({
      userId: recipientId,
      title,
      message,
      type,
      linkUrl,
      read: false,
    });

    return NextResponse.json({ success: true, notification });
  } catch (error: any) {
    console.error("POST /api/notifications error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

