import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import connectToDatabase from "@/lib/db/mongoose";
import { getSession } from "@/lib/auth/session";
import TeacherProfile from "@/models/TeacherProfile";
import StudentProfile from "@/models/StudentProfile";
import User from "@/models/User";
import Notification from "@/models/Notification";
import { isClassMatching } from "@/lib/allocation-matcher";

export const dynamic = "force-dynamic";

/**
 * GET /api/teacher/students/group
 * 
 * Returns the teacher's current group roster and all available students from the teacher's institution
 * who can be allocated to this teacher's group.
 */
export async function GET(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || (session.role !== "TEACHER" && session.role !== "ADMIN")) {
      return NextResponse.json({ error: "Unauthorized. Teacher access required." }, { status: 401 });
    }

    await connectToDatabase();

    const teacherProfile = (await TeacherProfile.findOne({
      $or: [{ userId: session.userId }, { _id: session.userId }],
    }).lean()) as any;

    if (!teacherProfile) {
      return NextResponse.json({ error: "Teacher profile not found." }, { status: 404 });
    }

    const institutionName = teacherProfile.institutionName?.trim() || "";
    const teacherClasses = (
      teacherProfile.assignedClasses?.length > 0
        ? teacherProfile.assignedClasses
        : teacherProfile.classesTaught || []
    ) as string[];

    const teacherUserId = (teacherProfile.userId?._id || teacherProfile.userId || session.userId).toString();
    const teacherObjId = mongoose.Types.ObjectId.isValid(teacherUserId)
      ? new mongoose.Types.ObjectId(teacherUserId)
      : teacherUserId;

    // 1. Get directly and reverse allocated students in this teacher's group
    const directAllocated = (teacherProfile.assignedStudentIds || [])
      .filter(Boolean)
      .map((id: any) => (id._id || id).toString());

    const reverseAllocated = await StudentProfile.find({
      assignedTeacherIds: { $in: [teacherUserId, teacherObjId] },
    })
      .select("userId")
      .lean();

    const myAllocatedUserIds = new Set<string>([
      ...directAllocated,
      ...reverseAllocated.map((s: any) => s.userId?.toString()).filter(Boolean),
    ]);

    // 2. Query all students belonging to this teacher's institution
    let schoolQuery: any = {};
    if (institutionName) {
      const instRegex = new RegExp(
        `^${institutionName.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")}$`,
        "i"
      );
      schoolQuery.schoolName = { $regex: instRegex };
    }

    const candidateProfiles = (await StudentProfile.find(schoolQuery)
      .populate("userId", "name email phone status avatarUrl")
      .populate("assignedTeacherIds", "name email")
      .sort({ currentClass: 1, createdAt: -1 })
      .lean()) as any[];

    const candidates = candidateProfiles
      .filter((p: any) => p && p.userId)
      .map((p: any) => {
        const uId = (p.userId?._id || p.userId).toString();
        const isInMyGroup = myAllocatedUserIds.has(uId);

        const otherTeachers = Array.isArray(p.assignedTeacherIds)
          ? p.assignedTeacherIds
              .filter((t: any) => {
                const tId = (t?._id || t)?.toString();
                return tId && tId !== teacherUserId;
              })
              .map((t: any) => t.name || "Faculty")
          : [];

        const hasClassMatch = isClassMatching(p.currentClass, teacherClasses);

        return {
          _id: p._id,
          userId: uId,
          name: p.userId?.name || "Student",
          email: p.userId?.email || "",
          phone: p.userId?.phone || "",
          studentId: p.studentId || "",
          currentClass: p.currentClass || "Class 10",
          board: p.board || "CBSE",
          schoolName: p.schoolName || institutionName,
          subjects: Array.isArray(p.subjects) ? p.subjects : [],
          isInMyGroup,
          isAssignedToOther: otherTeachers.length > 0,
          otherTeacherNames: otherTeachers,
          hasClassMatch,
        };
      });

    return NextResponse.json({
      institutionName,
      teacherClasses,
      totalInGroup: myAllocatedUserIds.size,
      candidates,
    });
  } catch (error: any) {
    console.error("GET /api/teacher/students/group error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch student group." }, { status: 500 });
  }
}

/**
 * POST /api/teacher/students/group
 * 
 * Updates the teacher's group allocation (adds/removes students).
 * Synchronizes TeacherProfile.assignedStudentIds and StudentProfile.assignedTeacherIds.
 */
export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || (session.role !== "TEACHER" && session.role !== "ADMIN")) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const body = await req.json();
    const { studentUserIds } = body;

    if (!Array.isArray(studentUserIds)) {
      return NextResponse.json({ error: "studentUserIds must be an array of student user IDs." }, { status: 400 });
    }

    await connectToDatabase();

    const teacherProfile = (await TeacherProfile.findOne({
      $or: [{ userId: session.userId }, { _id: session.userId }],
    })) as any;

    if (!teacherProfile) {
      return NextResponse.json({ error: "Teacher profile not found." }, { status: 404 });
    }

    const teacherUserId = (teacherProfile.userId?._id || teacherProfile.userId || session.userId).toString();
    const teacherObjId = mongoose.Types.ObjectId.isValid(teacherUserId)
      ? new mongoose.Types.ObjectId(teacherUserId)
      : teacherUserId;

    const teacherUser = await User.findById(teacherUserId).select("name").lean();
    const teacherName = (teacherUser as any)?.name || "Faculty Specialist";

    const cleanStudentIds = studentUserIds.map((id: any) => id.toString());
    const studentObjIds = cleanStudentIds
      .filter((id: string) => mongoose.Types.ObjectId.isValid(id))
      .map((id: string) => new mongoose.Types.ObjectId(id));

    // Get previous assigned IDs to detect newly added students
    const prevAssigned = new Set<string>(
      (teacherProfile.assignedStudentIds || []).map((id: any) => (id?._id || id).toString())
    );

    teacherProfile.assignedStudentIds = studentObjIds.length > 0 ? studentObjIds : cleanStudentIds;
    await teacherProfile.save();

    // 1. Add this teacher to selected students
    if (cleanStudentIds.length > 0) {
      await StudentProfile.updateMany(
        {
          $or: [
            { userId: { $in: cleanStudentIds } },
            { userId: { $in: studentObjIds } },
          ],
        },
        {
          $addToSet: { assignedTeacherIds: teacherObjId },
        }
      );
    }

    // 2. Remove this teacher from students who were deselected
    await StudentProfile.updateMany(
      {
        userId: { $nin: [...cleanStudentIds, ...studentObjIds] },
        assignedTeacherIds: { $in: [teacherUserId, teacherObjId] },
      },
      {
        $pull: { assignedTeacherIds: teacherObjId },
      }
    );

    // 3. Send notifications to newly allocated students
    const newlyAddedIds = cleanStudentIds.filter((id) => !prevAssigned.has(id));
    for (const sId of newlyAddedIds) {
      try {
        await Notification.create({
          userId: sId,
          title: "Added to Class Group!",
          message: `You have been added to ${teacherName}'s class group. Your live classes and academic schedule are now available.`,
          type: "SYSTEM",
        });
      } catch (_) {}
    }

    return NextResponse.json({
      success: true,
      message: `Group allocation updated successfully. (${cleanStudentIds.length} students in group)`,
      assignedCount: cleanStudentIds.length,
    });
  } catch (error: any) {
    console.error("POST /api/teacher/students/group error:", error);
    return NextResponse.json({ error: error.message || "Failed to update group." }, { status: 500 });
  }
}
