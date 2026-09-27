import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/mongoose";
import { getSession } from "@/lib/auth/session";
import User from "@/models/User";
import TeacherProfile from "@/models/TeacherProfile";
import StudentProfile from "@/models/StudentProfile";
import Notification from "@/models/Notification";
import { recordAuditLog } from "@/lib/audit";
import {
  b2cStudentMongoQuery,
  getOverlappingSubjects,
  isClassMatching,
} from "@/lib/allocation-matcher";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function resolveClassesAndSubjects(
  teacherProfile: any,
  overrideClasses?: string[],
  overrideSubjects?: string[]
): { teacherClasses: string[]; teacherSubjects: string[] } {
  const teacherClasses: string[] =
    overrideClasses && overrideClasses.length > 0
      ? overrideClasses
      : (teacherProfile.assignedClasses?.length > 0
          ? teacherProfile.assignedClasses
          : teacherProfile.classesTaught) ?? [];

  const teacherSubjects: string[] =
    overrideSubjects && overrideSubjects.length > 0
      ? overrideSubjects
      : (teacherProfile.assignedSubjects?.length > 0
          ? teacherProfile.assignedSubjects
          : teacherProfile.subjects) ?? [];

  return { teacherClasses, teacherSubjects };
}

// ── POST: Execute auto-allocation ─────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await req.json();
    const { teacherUserId, dryRun = false, classes: bodyClasses, subjects: bodySubjects } = body;
    if (!teacherUserId) {
      return NextResponse.json({ error: "teacherUserId is required" }, { status: 400 });
    }
    await connectToDatabase();

    const teacherProfile = await TeacherProfile.findOne({ userId: teacherUserId }).lean() as any;
    if (!teacherProfile) {
      return NextResponse.json({ error: "Teacher profile not found" }, { status: 404 });
    }

    const tType = teacherProfile.teacherType || "B2C";
    if (tType !== "B2C") {
      return NextResponse.json({
        error: "Auto-allocation is only for B2C Individual Tutors. B2B teachers are matched by institution.",
        matches: [],
      }, { status: 400 });
    }

    const { teacherClasses, teacherSubjects } = resolveClassesAndSubjects(
      teacherProfile,
      Array.isArray(bodyClasses) ? bodyClasses : undefined,
      Array.isArray(bodySubjects) ? bodySubjects : undefined
    );

    if (teacherClasses.length === 0 && teacherSubjects.length === 0) {
      return NextResponse.json({
        error: "Teacher has no classes or subjects configured. Please assign them first.",
        matches: [],
      }, { status: 400 });
    }

    const existingStudentIds = (teacherProfile.assignedStudentIds ?? []).map((id: any) => id.toString());

    // Fetch all B2C students who are not yet assigned to this teacher
    const candidateStudents = await StudentProfile.find(
      b2cStudentMongoQuery({
        userId: { $nin: existingStudentIds },
      })
    ).populate("userId", "name email phone status avatarUrl").lean() as any[];

    // Filter using single subject match & class match
    const eligible: any[] = [];
    for (const s of candidateStudents) {
      if (!s.userId) continue;
      const userStatus = s.userId.status || "ACTIVE";
      if (!["ACTIVE", "TRIAL", ""].includes(userStatus)) continue;

      const overlap = getOverlappingSubjects(s.subjects, teacherSubjects);
      const classMatch = isClassMatching(s.currentClass, teacherClasses);

      // Match if at least a single subject matches OR (student has general/no subjects and class matches)
      const hasSubjectOverlap = overlap.length > 0;
      const isGeneralStudentWithClassMatch = (!s.subjects || s.subjects.length === 0) && classMatch;

      if (hasSubjectOverlap || isGeneralStudentWithClassMatch) {
        eligible.push({
          ...s,
          overlappingSubjects: hasSubjectOverlap ? overlap : teacherSubjects.slice(0, 2),
        });
      }
    }

    const formatted = eligible.map((s: any) => ({
      userId: s.userId?._id,
      name: s.userId?.name,
      email: s.userId?.email,
      phone: s.userId?.phone,
      studentId: s.studentId,
      currentClass: s.currentClass,
      subjects: s.subjects,
      overlappingSubjects: s.overlappingSubjects,
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

    // Bidirectional assignment + sync assignedClasses & assignedSubjects
    await TeacherProfile.findOneAndUpdate(
      { userId: teacherUserId },
      {
        $addToSet: { assignedStudentIds: { $each: newStudentUserIds } },
        ...(teacherClasses.length > 0 ? { assignedClasses: teacherClasses } : {}),
        ...(teacherSubjects.length > 0 ? { assignedSubjects: teacherSubjects } : {}),
      }
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
        const overlap = s.overlappingSubjects || [];
        await Notification.create({
          userId: s.userId._id,
          title: "Tutor Assigned!",
          message: `You have been matched with ${teacherName} for ${overlap.join(", ") || "General"} — ${s.currentClass || "Individual Tutoring"}. Your personalised tutoring sessions will begin soon!`,
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
      message: `${eligible.length} student${eligible.length === 1 ? "" : "s"} auto-allocated based on single subject and class match.`,
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

    const classesParam = searchParams.get("classes") || "";
    const subjectsParam = searchParams.get("subjects") || "";
    const overrideClasses = classesParam ? classesParam.split(",").map((c) => c.trim()).filter(Boolean) : undefined;
    const overrideSubjects = subjectsParam ? subjectsParam.split(",").map((s) => s.trim()).filter(Boolean) : undefined;

    await connectToDatabase();

    const teacherProfile = await TeacherProfile.findOne({ userId: teacherUserId }).lean() as any;
    if (!teacherProfile) {
      return NextResponse.json({ error: "Teacher profile not found" }, { status: 404 });
    }

    const { teacherClasses, teacherSubjects } = resolveClassesAndSubjects(
      teacherProfile,
      overrideClasses,
      overrideSubjects
    );

    const existingStudentIds = (teacherProfile.assignedStudentIds ?? []).map((id: any) => id.toString());

    // Fetch candidate B2C students not already assigned
    const candidateStudents = await StudentProfile.find(
      b2cStudentMongoQuery({
        userId: { $nin: existingStudentIds },
      })
    ).populate("userId", "name email phone status avatarUrl").lean() as any[];

    // Match if single subject matches OR class matches with general subjects
    const eligible: any[] = [];
    for (const s of candidateStudents) {
      if (!s.userId) continue;
      const userStatus = s.userId.status || "ACTIVE";
      if (!["ACTIVE", "TRIAL", ""].includes(userStatus)) continue;

      const overlap = getOverlappingSubjects(s.subjects, teacherSubjects);
      const classMatch = isClassMatching(s.currentClass, teacherClasses);

      // Match if at least a single subject matches OR (student has general/no subjects and class matches)
      const hasSubjectOverlap = overlap.length > 0;
      const isGeneralStudentWithClassMatch = (!s.subjects || s.subjects.length === 0) && classMatch;

      if (hasSubjectOverlap || isGeneralStudentWithClassMatch) {
        eligible.push({
          userId: s.userId?._id,
          name: s.userId?.name,
          email: s.userId?.email,
          phone: s.userId?.phone,
          studentId: s.studentId,
          currentClass: s.currentClass,
          subjects: s.subjects,
          overlappingSubjects: hasSubjectOverlap ? overlap : teacherSubjects.slice(0, 2),
        });
      }
    }

    return NextResponse.json({
      teacherType: teacherProfile.teacherType || "B2C",
      teacherClasses,
      teacherSubjects,
      matchCount: eligible.length,
      matches: eligible,
    });
  } catch (error: any) {
    console.error("Auto-allocate preview error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
