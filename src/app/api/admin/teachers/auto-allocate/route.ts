import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/mongoose";
import { getSession } from "@/lib/auth/session";
import User from "@/models/User";
import TeacherProfile from "@/models/TeacherProfile";
import StudentProfile from "@/models/StudentProfile";
import Notification from "@/models/Notification";
import { recordAuditLog } from "@/lib/audit";

export const dynamic = "force-dynamic";
export const revalidate = 0;

/**
 * Builds the MongoDB $or query to match B2C / Individual-tutoring students.
 * Catches:
 *  1. Students with explicit studentType = "B2C"
 *  2. Students who registered with schoolName containing "individual" (legacy fallback)
 */
function b2cStudentQuery(extraFields: Record<string, any> = {}) {
  return {
    $or: [
      { studentType: "B2C" },
      { schoolName: { $regex: /individual/i } },
    ],
    ...extraFields,
  };
}

// ── POST: Execute auto-allocation ─────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await req.json();
    const { teacherUserId, dryRun = false } = body;
    if (!teacherUserId) {
      return NextResponse.json({ error: "teacherUserId is required" }, { status: 400 });
    }
    await connectToDatabase();

    const teacherProfile = await TeacherProfile.findOne({ userId: teacherUserId }).lean() as any;
    if (!teacherProfile) {
      return NextResponse.json({ error: "Teacher profile not found" }, { status: 404 });
    }

    // Allow B2C teachers OR teachers with no explicit type (treat as individual)
    const tType = teacherProfile.teacherType || "B2C";
    if (tType !== "B2C") {
      return NextResponse.json({
        error: "Auto-allocation is only for B2C Individual Tutors. B2B teachers are matched by institution.",
        matches: [],
      }, { status: 400 });
    }

    const teacherClasses: string[] = (
      teacherProfile.assignedClasses?.length > 0
        ? teacherProfile.assignedClasses
        : teacherProfile.classesTaught
    ) ?? [];
    const teacherSubjects: string[] = (
      teacherProfile.assignedSubjects?.length > 0
        ? teacherProfile.assignedSubjects
        : teacherProfile.subjects
    ) ?? [];

    if (teacherClasses.length === 0 || teacherSubjects.length === 0) {
      return NextResponse.json({
        error: "Teacher has no classes or subjects configured. Please assign them first.",
        matches: [],
      }, { status: 400 });
    }

    const existingStudentIds = (teacherProfile.assignedStudentIds ?? []).map((id: any) => id.toString());

    // Find all B2C-style students matching at least one class AND one subject, not yet assigned
    const matchingStudents = await StudentProfile.find(
      b2cStudentQuery({
        currentClass: { $in: teacherClasses },
        subjects: { $in: teacherSubjects },
        userId: { $nin: existingStudentIds },
      })
    ).populate("userId", "name email phone status").lean() as any[];

    const eligible = matchingStudents.filter(
      (s: any) => s.userId && (s.userId.status === "ACTIVE" || !s.userId.status)
    );

    const formatted = eligible.map((s: any) => ({
      userId: s.userId?._id,
      name: s.userId?.name,
      email: s.userId?.email,
      phone: s.userId?.phone,
      studentId: s.studentId,
      currentClass: s.currentClass,
      subjects: s.subjects,
      overlappingSubjects: (s.subjects || []).filter((sub: string) => teacherSubjects.includes(sub)),
    }));

    if (dryRun) {
      return NextResponse.json({ dryRun: true, teacherClasses, teacherSubjects, matches: formatted });
    }

    if (eligible.length === 0) {
      return NextResponse.json({
        success: true,
        allocated: 0,
        message: "No new matching B2C students found.",
        matches: [],
      });
    }

    const newStudentUserIds = eligible.map((s: any) => s.userId._id.toString());

    // Bidirectional assignment
    await TeacherProfile.findOneAndUpdate(
      { userId: teacherUserId },
      { $addToSet: { assignedStudentIds: { $each: newStudentUserIds } } }
    );
    await StudentProfile.updateMany(
      { userId: { $in: newStudentUserIds } },
      { $addToSet: { assignedTeacherIds: teacherUserId } }
    );

    // Notifications
    const teacherUser = await User.findById(teacherUserId).select("name").lean() as any;
    const teacherName = teacherUser?.name || "Your Tutor";

    for (const s of eligible) {
      try {
        const overlap = (s.subjects || []).filter((sub: string) => teacherSubjects.includes(sub));
        await Notification.create({
          userId: s.userId._id,
          title: "Tutor Assigned!",
          message: `You have been matched with ${teacherName} for ${overlap.join(", ")} — ${s.currentClass}. Your personalised tutoring sessions will begin soon!`,
          type: "SYSTEM",
        });
      } catch (_) {}
    }
    try {
      await Notification.create({
        userId: teacherUserId,
        title: "Students Auto-Allocated!",
        message: `${eligible.length} student${eligible.length === 1 ? " has" : "s have"} been automatically matched to you based on your class and subject criteria.`,
        type: "SYSTEM",
      });
    } catch (_) {}

    await recordAuditLog({
      actorId: session.userId,
      action: "AUTO_ALLOCATION_COMPLETED",
      entityType: "USER",
      entityId: teacherUserId,
      details: { allocatedStudentCount: eligible.length, teacherClasses, teacherSubjects, studentUserIds: newStudentUserIds },
    });

    return NextResponse.json({
      success: true,
      allocated: eligible.length,
      message: `${eligible.length} student${eligible.length === 1 ? "" : "s"} auto-allocated based on class and subject match.`,
      matches: formatted,
    });
  } catch (error: any) {
    console.error("Auto-allocate error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ── GET: Preview / dry-run (no DB changes) ────────────────────────────────────
export async function GET(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { searchParams } = new URL(req.url);
    const teacherUserId = searchParams.get("teacherUserId") || "";
    if (!teacherUserId) {
      return NextResponse.json({ error: "teacherUserId is required" }, { status: 400 });
    }
    await connectToDatabase();

    const teacherProfile = await TeacherProfile.findOne({ userId: teacherUserId }).lean() as any;
    if (!teacherProfile) {
      return NextResponse.json({ error: "Teacher profile not found" }, { status: 404 });
    }

    const teacherClasses: string[] = (
      teacherProfile.assignedClasses?.length > 0
        ? teacherProfile.assignedClasses
        : teacherProfile.classesTaught
    ) ?? [];
    const teacherSubjects: string[] = (
      teacherProfile.assignedSubjects?.length > 0
        ? teacherProfile.assignedSubjects
        : teacherProfile.subjects
    ) ?? [];

    const existingStudentIds = (teacherProfile.assignedStudentIds ?? []).map((id: any) => id.toString());

    // Broadened query: B2C students OR "Individual Tutoring" schoolName
    const matchingStudents = await StudentProfile.find(
      b2cStudentQuery({
        currentClass: { $in: teacherClasses },
        subjects: { $in: teacherSubjects },
        userId: { $nin: existingStudentIds },
      })
    ).populate("userId", "name email phone status").lean() as any[];

    const eligible = matchingStudents.filter(
      (s: any) => s.userId && (s.userId.status === "ACTIVE" || !s.userId.status)
    );

    return NextResponse.json({
      teacherType: teacherProfile.teacherType || "B2C",
      teacherClasses,
      teacherSubjects,
      matchCount: eligible.length,
      matches: eligible.map((s: any) => ({
        userId: s.userId?._id,
        name: s.userId?.name,
        email: s.userId?.email,
        phone: s.userId?.phone,
        studentId: s.studentId,
        currentClass: s.currentClass,
        subjects: s.subjects,
        overlappingSubjects: (s.subjects || []).filter((sub: string) => teacherSubjects.includes(sub)),
      })),
    });
  } catch (error: any) {
    console.error("Auto-allocate preview error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
