import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/mongoose";
import { getSession } from "@/lib/auth/session";
import Batch from "@/models/Batch";
import User from "@/models/User";
import { recordAuditLog } from "@/lib/audit";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || (session.role !== "TEACHER" && session.role !== "ADMIN")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const batches = await Batch.find({ isActive: true })
      .populate("assignedTeacherIds", "name email")
      .populate("weeklySchedule.teacherId", "name email")
      .sort({ startTime: 1 })
      .lean();

    const teachers = await User.find({ role: "TEACHER", status: { $ne: "SUSPENDED" } })
      .select("name email")
      .lean();

    return NextResponse.json({ batches, teachers });
  } catch (error: any) {
    console.error("GET /api/teacher/schedule/batch-timetable error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch batch timetable." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || (session.role !== "TEACHER" && session.role !== "ADMIN")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { batchId, weeklySchedule } = await req.json();

    if (!batchId || !Array.isArray(weeklySchedule)) {
      return NextResponse.json({ error: "batchId and weeklySchedule array are required." }, { status: 400 });
    }

    await connectToDatabase();

    const batch = await Batch.findById(batchId);
    if (!batch) {
      return NextResponse.json({ error: "Batch not found." }, { status: 404 });
    }

    batch.weeklySchedule = weeklySchedule as any;
    await batch.save();

    await recordAuditLog({
      actorId: session.userId,
      action: "BATCH_TIMETABLE_UPDATED",
      entityType: "BATCH",
      entityId: batchId,
      details: { batchName: batch.name, daysConfigured: weeklySchedule.length },
    });

    const populatedBatch = await Batch.findById(batchId)
      .populate("assignedTeacherIds", "name email")
      .populate("weeklySchedule.teacherId", "name email")
      .lean();

    return NextResponse.json({
      success: true,
      message: "Weekly batch timetable updated successfully.",
      batch: populatedBatch,
    });
  } catch (error: any) {
    console.error("POST /api/teacher/schedule/batch-timetable error:", error);
    return NextResponse.json({ error: error.message || "Failed to update timetable." }, { status: 500 });
  }
}
