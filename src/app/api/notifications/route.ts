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
