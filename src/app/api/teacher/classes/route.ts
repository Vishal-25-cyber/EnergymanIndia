import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/mongoose";
import { getSession } from "@/lib/auth/session";
import LiveSession from "@/models/LiveSession";
import StudentProfile from "@/models/StudentProfile";
import Notification from "@/models/Notification";
import { recordAuditLog } from "@/lib/audit";

export async function GET(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || (session.role !== "TEACHER" && session.role !== "ADMIN")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const query: any = session.role === "TEACHER" ? { teacherId: session.userId } : {};

    const sessions = await LiveSession.find(query)
      .populate("batchId")
      .sort({ date: -1, startTime: 1 })
      .lean();

    return NextResponse.json({ sessions, classes: sessions });
  } catch (error: any) {
    console.error("GET /api/teacher/classes error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || (session.role !== "TEACHER" && session.role !== "ADMIN")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      title,
      subject,
      topic,
      description,
      classLevel = "Class 10",
      batchId,
      date,
      startTime,
      endTime,
      status = "PUBLISHED",
      materials = [],
      gracePeriodMinutes = 5,
      attendanceThresholdPercent = 75,
    } = body;

    if (!subject || !topic || !batchId || !date || !startTime || !endTime) {
      return NextResponse.json({ error: "All required fields must be filled." }, { status: 400 });
    }

    await connectToDatabase();

    const cleanSubject = subject.toUpperCase().replace(/[^A-Z0-9]/g, "");
    const cleanTopic = topic.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 15);
    const uniqueMeetingId = `ACUITY-${cleanSubject || "CLASS"}-${cleanTopic || "SESSION"}-${Date.now()}`;
    const generatedTitle = title?.trim() || `${classLevel} ${subject} — ${topic}`;
    const normalizedStatus = status.toUpperCase() === "DRAFT" ? "DRAFT" : "PUBLISHED";

import TeacherProfile from "@/models/TeacherProfile";

    // Deduplication check: check if this teacher already scheduled this class
    const existingSession = await LiveSession.findOne({
      date,
      startTime,
      classLevel,
      subject,
      teacherId: session.userId,
      status: { $ne: "CANCELLED" },
    });

    // Query teacher profile to find allocated students (strictly isolated)
    const teacherProfile = await TeacherProfile.findOne({ userId: session.userId }).lean();
    let eligibleStudents: any[] = [];

    if (teacherProfile?.assignedStudentIds && teacherProfile.assignedStudentIds.length > 0) {
      // B2C or explicit student allocation
      eligibleStudents = await StudentProfile.find({
        userId: { $in: teacherProfile.assignedStudentIds },
        ...(classLevel ? { currentClass: classLevel } : {}),
      });
    } else if (teacherProfile?.teacherType === "B2B" && teacherProfile?.institutionName) {
      // B2B school students
      eligibleStudents = await StudentProfile.find({
        schoolName: { $regex: new RegExp(teacherProfile.institutionName.trim(), "i") },
        ...(classLevel ? { currentClass: classLevel } : {}),
      });
    } else {
      eligibleStudents = await StudentProfile.find({
        batchId,
        ...(classLevel ? { currentClass: classLevel } : {}),
      });
    }

    const assignedStudentUserIds = eligibleStudents.map((st) => st.userId);

    if (existingSession) {
      existingSession.topic = topic;
      existingSession.title = generatedTitle;
      existingSession.description = description || "";
      existingSession.endTime = endTime;
      existingSession.status = normalizedStatus;
      existingSession.assignedStudentIds = assignedStudentUserIds;
      if (Array.isArray(materials) && materials.length) existingSession.materials = materials;
      await existingSession.save();

      return NextResponse.json({
        success: true,
        message: "Class session updated successfully.",
        session: existingSession,
      }, { status: 200 });
    }

    const newSession = await LiveSession.create({
      title: generatedTitle,
      subject,
      topic,
      description: description || "",
      classLevel,
      batchId,
      teacherId: session.userId,
      assignedStudentIds: assignedStudentUserIds,
      date,
      startTime,
      endTime,
      meetingId: uniqueMeetingId,
      livekitRoomId: uniqueMeetingId,
      status: normalizedStatus,
      materials: Array.isArray(materials) ? materials : [],
      gracePeriodMinutes: Number(gracePeriodMinutes) || 5,
      attendanceThresholdPercent: Number(attendanceThresholdPercent) || 75,
    });

    let notifiedCount = 0;
    if (normalizedStatus === "PUBLISHED") {
      if (eligibleStudents.length > 0) {
        const notificationDocs = eligibleStudents.map((st) => ({
          userId: st.userId,
          title: `New Live Class: ${subject}`,
          message: `Topic: ${topic} on ${date} at ${startTime}.`,
          type: "CLASS_REMINDER",
          linkUrl: `/student/classes`,
          read: false,
        }));
        await Notification.insertMany(notificationDocs);
        notifiedCount = eligibleStudents.length;
      }
    }

    await recordAuditLog({
      actorId: session.userId,
      action: normalizedStatus === "DRAFT" ? "CLASS_DRAFTED" : "LIVE_CLASS_CREATED",
      entityType: "LIVE_SESSION",
      entityId: newSession._id.toString(),
      details: { classLevel, topic, notifiedCount },
    });

    return NextResponse.json({
      success: true,
      message:
        normalizedStatus === "DRAFT"
          ? "Class saved as draft successfully."
          : `Live class scheduled and published! ${notifiedCount} students notified.`,
      session: newSession,
      class: newSession,
    });
  } catch (error: any) {
    console.error("POST /api/teacher/classes error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getSession(req).catch(() => null);
    if (!session || (session.role !== "TEACHER" && session.role !== "ADMIN")) {
      return NextResponse.json({ error: "Unauthorized. Staff only." }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    let id = searchParams.get("id") || searchParams.get("classId");
    if (!id) {
      const body = await req.json().catch(() => ({}));
      id = body.id || body.classId;
    }

    if (id) {
      try {
        id = decodeURIComponent(id).trim();
      } catch {}
    }

    if (!id) {
      return NextResponse.json({ error: "Class ID is required." }, { status: 400 });
    }

    await connectToDatabase();

    let liveClass: any = null;
    const mongoose = (await import("mongoose")).default;
    if (mongoose.Types.ObjectId.isValid(id)) {
      liveClass = await LiveSession.findById(id);
    }
    if (!liveClass) {
      liveClass = await LiveSession.findOne({
        $or: [{ meetingId: id }, { livekitRoomId: id }, { title: id }, { topic: id }],
      });
    }
    if (!liveClass) {
      const escaped = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const safeRegex = new RegExp(`^${escaped}$`, "i");
      liveClass = await LiveSession.findOne({
        $or: [{ meetingId: safeRegex }, { livekitRoomId: safeRegex }, { title: safeRegex }, { topic: safeRegex }],
      });
    }

    if (!liveClass) {
      return NextResponse.json({ error: "Class not found." }, { status: 404 });
    }

    const classIdToDelete = liveClass._id;
    await LiveSession.findByIdAndDelete(classIdToDelete);
    const { invalidateClassesCache } = await import("@/app/api/classes/route");
    invalidateClassesCache();

    // Secondary cleanups non-blocking in background
    (async () => {
      try {
        const Attendance = (await import("@/models/Attendance")).default;
        await Attendance.deleteMany({ sessionId: classIdToDelete });
      } catch {}
      try {
        await recordAuditLog({
          actorId: session.userId || "staff",
          action: "CLASS_DELETED",
          entityType: "LIVE_SESSION",
          entityId: classIdToDelete.toString(),
          details: { title: liveClass.title, subject: liveClass.subject, topic: liveClass.topic },
        });
      } catch {}
    })().catch(() => {});

    return NextResponse.json({ success: true, message: "Class deleted successfully." });
  } catch (error: any) {
    console.error("DELETE /api/teacher/classes error:", error);
    return NextResponse.json({ error: error.message || "Failed to delete class." }, { status: 500 });
  }
}
