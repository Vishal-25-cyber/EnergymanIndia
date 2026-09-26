import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/mongoose";
import { getSession } from "@/lib/auth/session";
import StudentProfile from "@/models/StudentProfile";
import LiveSession from "@/models/LiveSession";
import User from "@/models/User";
import Batch from "@/models/Batch";
import { getStudentFeeAccessStatus } from "@/lib/fee-guard";
import { sortClassesByPriority } from "@/lib/class-timing";

export const dynamic = "force-dynamic";

const DAYS_OF_WEEK = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export async function GET(req: NextRequest) {
  try {
    const session = await getSession(req);
    if (!session || session.role !== "STUDENT") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    // 1. Fee Lock Enforcement: Student cannot access classes if monthly tuition is unpaid or awaiting admin approval
    const feeStatus = await getStudentFeeAccessStatus(session.userId);
    if (feeStatus.isLocked) {
      return NextResponse.json({
        locked: true,
        reason: feeStatus.reason,
        isUnderReview: feeStatus.isUnderReview,
        message: feeStatus.message,
        unpaidFee: feeStatus.unpaidFee,
        pendingVerification: feeStatus.pendingVerification,
        classes: [],
        todayClasses: [],
        weeklySchedule: [],
      });
    }

    let profile: any = await StudentProfile.findOne({ userId: session.userId })
      .populate({
        path: "batchId",
        populate: [
          { path: "assignedTeacherIds", select: "name email avatarUrl phone" },
          { path: "weeklySchedule.teacherId", select: "name email avatarUrl phone" },
        ],
      })
      .lean();
    if (!profile) {
      profile = await StudentProfile.create({
        userId: session.userId,
        currentClass: "Class 10",
        board: "State Board",
        schoolName: "SSVS",
      });
    }

    const now = new Date();
    const dayFormatter = new Intl.DateTimeFormat("en-US", { weekday: "long", timeZone: "Asia/Kolkata" });
    const currentDayName = dayFormatter.format(now);
    const todayDateStr = now.toISOString().split("T")[0];
    const kolkataDateStr = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" }).format(now);

    // Robust auto-cleanup: Stale sessions strictly from past calendar dates or running for >12 hours
    try {
      const twelveHoursAgo = new Date(Date.now() - 12 * 60 * 60 * 1000);
      await LiveSession.updateMany(
        {
          status: "LIVE",
          $or: [
            { date: { $lt: todayDateStr } },
            { actualStartTime: { $lt: twelveHoursAgo } },
            { title: /General Live Session/i },
          ],
        },
        {
          $set: { status: "COMPLETED", actualEndTime: now },
        }
      );
    } catch (cleanErr) {
      console.warn("Auto-conclude stale classes error:", cleanErr);
    }

    const batchName = (profile.batchId as any)?.name || "7:00 PM – 8:00 PM";
    const batchStart = (profile.batchId as any)?.startTime || "19:00";
    const batchEnd = (profile.batchId as any)?.endTime || "20:00";
    const batchId = (profile.batchId as any)?._id || profile.batchId;

    const classVariants = [
      profile.currentClass,
      profile.currentClass?.replace(/Class\s*/i, "").trim(),
      `Class ${profile.currentClass?.replace(/Class\s*/i, "").trim()}`,
    ].filter(Boolean);

    const assignedTeachers = Array.isArray(profile.assignedTeacherIds) ? profile.assignedTeacherIds : [];

    const studentAccessConditions: any[] = [
      { assignedStudentIds: session.userId },
    ];

    if (assignedTeachers.length > 0) {
      studentAccessConditions.push({
        teacherId: { $in: assignedTeachers },
        classLevel: { $in: classVariants },
      });
    } else {
      studentAccessConditions.push({
        classLevel: { $in: classVariants },
        $or: [
          { assignedStudentIds: { $exists: false } },
          { assignedStudentIds: { $size: 0 } },
        ],
      });
    }

    const andConditions: any[] = [
      { $or: studentAccessConditions },
      { status: { $in: ["PUBLISHED", "SCHEDULED", "LIVE", "COMPLETED"] } },
    ];

    if (Array.isArray(profile.subjects) && profile.subjects.length > 0) {
      andConditions.push({
        $or: [
          { subject: { $in: profile.subjects } },
          { subject: { $exists: false } },
          { subject: null },
        ],
      });
    }

    const sessionQuery: any = { $and: andConditions };

    const rawClasses = await LiveSession.find(sessionQuery)
      .populate("teacherId", "name avatarUrl email phone")
      .populate("batchId")
      .sort({ date: 1, startTime: 1 })
      .lean();

    const sortedClasses = sortClassesByPriority(rawClasses as any[]);

    // Deduplicate any duplicate classes in database (same date, startTime, subject, and classLevel/topic)
    const seenSessionKeys = new Set<string>();
    const dbClasses: any[] = [];

    for (const c of sortedClasses) {
      const normSubject = (c.subject || "").trim().toLowerCase();
      const normClassLevel = (c.classLevel || "").trim().toLowerCase();
      const normTopic = (c.topic || "").trim().toLowerCase();
      const key = `${c.date}_${c.startTime}_${normSubject}_${normClassLevel || normTopic}`;
      if (!seenSessionKeys.has(key)) {
        seenSessionKeys.add(key);
        dbClasses.push(c);
      }
    }

    const todayClasses = dbClasses.filter(
      (c: any) =>
        c.status === "LIVE" ||
        ((c.date === todayDateStr || c.date === kolkataDateStr) &&
          (c.status === "SCHEDULED" || c.status === "PUBLISHED" || c.status === "LIVE"))
    );

    const hasLiveClassNow = dbClasses.some((c: any) => c.status === "LIVE");
    const activeLiveClass = dbClasses.find((c: any) => c.status === "LIVE");

    // Determine the actual teacher name assigned to this batch or school
    const batchDoc = profile?.batchId;
    const batchTeachers = Array.isArray(batchDoc?.assignedTeacherIds) ? batchDoc.assignedTeacherIds : [];
    let defaultTeacherName = batchTeachers[0]?.name;
    if (!defaultTeacherName) {
      const anyTeacher = await User.findOne({ role: "TEACHER", status: { $ne: "SUSPENDED" } }).select("name email").lean();
      defaultTeacherName = anyTeacher?.name || "Assigned Faculty";
    }

    // Build real dynamic weekly schedule from actual database LiveSession records
    const dbDayMap = new Map<string, any>();
    for (const c of dbClasses) {
      let dayName = "Monday";
      if (c.date) {
        try {
          dayName = new Intl.DateTimeFormat("en-US", { weekday: "long", timeZone: "Asia/Kolkata" }).format(new Date(c.date));
        } catch {}
      }
      if (!dbDayMap.has(dayName) || c.status === "LIVE") {
        dbDayMap.set(dayName, {
          _id: c._id?.toString(),
          day: dayName,
          date: c.date,
          time: c.startTime && c.endTime ? `${c.startTime} – ${c.endTime}` : batchName,
          startTime: c.startTime || batchStart,
          endTime: c.endTime || batchEnd,
          subject: c.subject || "Academic Live Session",
          topic: c.topic || c.title || "Live Class",
          faculty: (c.teacherId as any)?.name || defaultTeacherName,
          status: c.status || "SCHEDULED",
          roomId: c.livekitRoomId || `mantif-session-${c._id}`,
          description: c.description || "",
          isConfigured: true,
        });
      }
    }

    // Retrieve the staff/teacher configured weekly schedule from the Batch document
    const DAYS_ORDER = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const batchWeeklyItems = Array.isArray(batchDoc?.weeklySchedule) ? batchDoc.weeklySchedule : [];
    const batchScheduleByDay = new Map<string, any>();
    for (const item of batchWeeklyItems) {
      if (item?.day) {
        batchScheduleByDay.set(item.day.toLowerCase(), item);
      }
    }

    // Construct the schedule strictly from what the teacher/staff fixed
    const weeklySchedule = DAYS_ORDER.map((dayName) => {
      const dbMatch = dbDayMap.get(dayName);
      const batchItem = batchScheduleByDay.get(dayName.toLowerCase());

      if (dbMatch) {
        return {
          ...dbMatch,
          faculty: dbMatch.faculty || defaultTeacherName,
        };
      }

      if (batchItem && batchItem.isEnabled !== false && batchItem.subject) {
        const itemTeacher = (typeof batchItem.teacherId === "object" && batchItem.teacherId?.name)
          ? batchItem.teacherId.name
          : defaultTeacherName;

        return {
          day: dayName,
          time: batchItem.startTime && batchItem.endTime ? `${batchItem.startTime} – ${batchItem.endTime}` : batchName,
          startTime: batchItem.startTime || batchStart,
          endTime: batchItem.endTime || batchEnd,
          subject: batchItem.subject,
          topic: batchItem.topic || "Regular Curriculum Session",
          faculty: itemTeacher,
          status: "SCHEDULED",
          roomId: `mantif-batch-${batchStart.replace(":", "")}-${(batchId || "sess").toString().slice(-6)}`,
          description: "Scheduled class fixed by faculty",
          isConfigured: true,
        };
      }

      return {
        day: dayName,
        time: batchName,
        startTime: batchStart,
        endTime: batchEnd,
        subject: "No Class Scheduled",
        topic: "Rest Day or Self-Study Session",
        faculty: defaultTeacherName,
        status: "OFF",
        roomId: "",
        description: "No live session scheduled by faculty for this day.",
        isConfigured: false,
      };
    });

    return NextResponse.json({
      classes: dbClasses,
      todayClasses,
      weeklySchedule,
      batch: profile.batchId,
      currentClass: profile.currentClass,
      board: profile.board || "CBSE",
      currentDay: currentDayName,
      isTrialActive: feeStatus.isTrialActive,
      trialHoursRemaining: feeStatus.trialHoursRemaining,
      trialExpiresAt: feeStatus.trialExpiresAt,
      feeStatus,
    }, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  } catch (error: any) {
    console.error("GET /api/student/classes error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch classes" }, { status: 500 });
  }
}
