import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/mongoose";
import { getSession } from "@/lib/auth/session";
import StudentProfile from "@/models/StudentProfile";
import {
  b2cStudentMongoQuery,
  getOverlappingSubjects,
  isClassMatching,
} from "@/lib/allocation-matcher";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const studentType = searchParams.get("studentType") || ""; // "B2B" | "B2C" | ""
    const schoolName = searchParams.get("schoolName") || "";
    const search = searchParams.get("search") || "";
    const teacherUserId = searchParams.get("teacherUserId") || "";
    const classFilter = searchParams.get("classes") || ""; // comma-separated
    const subjectFilter = searchParams.get("subjects") || ""; // comma-separated

    const teacherClasses = classFilter
      ? classFilter.split(",").map((c) => c.trim()).filter(Boolean)
      : [];
    const teacherSubjects = subjectFilter
      ? subjectFilter.split(",").map((s) => s.trim()).filter(Boolean)
      : [];

    await connectToDatabase();

    let query: any = {};

    if (studentType === "B2C") {
      query = b2cStudentMongoQuery();
    } else if (studentType === "B2B") {
      query.studentType = "B2B";
      if (schoolName && schoolName.trim()) {
        query.schoolName = { $regex: new RegExp(schoolName.trim(), "i") };
      }
    } else if (studentType && studentType !== "ALL") {
      query.studentType = studentType;
    }

    const profiles = (await StudentProfile.find(query)
      .populate("userId", "name email phone status avatarUrl")
      .populate("assignedTeacherIds", "name email phone")
      .sort({ createdAt: -1 })
      .lean()) as any[];

    // If teacher has NO subjects or NO classes selected at all, return empty list!
    if (teacherSubjects.length === 0 || teacherClasses.length === 0) {
      return NextResponse.json({ students: [], total: 0 });
    }

    let formatted = profiles
      .filter((p: any) => {
        if (!p.userId) return false;
        const userStatus = p.userId.status || "ACTIVE";
        if (!["ACTIVE", "TRIAL", ""].includes(userStatus)) return false;

        const rawSubjects: string[] = Array.isArray(p.subjects)
          ? p.subjects
          : typeof p.subjects === "string"
          ? p.subjects.split(",").map((s: string) => s.trim()).filter(Boolean)
          : [];
        const studentSubjects: string[] = rawSubjects.length > 0 ? rawSubjects : ["Science"];

        // 1. Strict subject requirement:
        // Student MUST have selected at least 1 subject that matches teacherSubjects.
        const overlapping = getOverlappingSubjects(studentSubjects, teacherSubjects);
        if (overlapping.length === 0) return false;

        // 2. Strict class requirement:
        // Student's class MUST match teacherClasses.
        if (!isClassMatching(p.currentClass, teacherClasses)) return false;

        return true;
      })
      .map((p: any) => {
        const derivedType = p.studentType || "B2C";

        const rawSubjects: string[] = Array.isArray(p.subjects)
          ? p.subjects
          : typeof p.subjects === "string"
          ? p.subjects.split(",").map((s: string) => s.trim()).filter(Boolean)
          : [];
        const studentSubList: string[] = rawSubjects.length > 0 ? rawSubjects : ["Science"];

        const overlapping = getOverlappingSubjects(studentSubList, teacherSubjects);
        const hasSubjectMatch = overlapping.length > 0;
        const hasClassMatch = isClassMatching(p.currentClass, teacherClasses);

        const isAssigned = teacherUserId
          ? Array.isArray(p.assignedTeacherIds)
            ? p.assignedTeacherIds.some(
                (t: any) => (t._id || t).toString() === teacherUserId
              )
            : false
          : false;

        return {
          _id: p._id,
          userId: p.userId?._id || p.userId,
          name: p.userId?.name || "Student",
          email: p.userId?.email || "",
          phone: p.userId?.phone || "",
          studentId: p.studentId || "",
          studentType: derivedType,
          schoolName: p.schoolName || "",
          currentClass: p.currentClass || "Class 10",
          board: p.board || "CBSE",
          subjects: studentSubList,
          overlappingSubjects: overlapping,
          hasSubjectMatch,
          hasClassMatch,
          alreadyAssigned: isAssigned,
          assignedTeacherIds: Array.isArray(p.assignedTeacherIds)
            ? p.assignedTeacherIds.map((t: any) => (t._id || t).toString())
            : [],
          assignedTeachers: Array.isArray(p.assignedTeacherIds)
            ? p.assignedTeacherIds.map((t: any) => ({
                _id: t._id || t,
                name: t.name,
                email: t.email,
              }))
            : [],
        };
      });

    // Sort:
    // 1. Already assigned to this teacher
    // 2. Has at least a single subject match (highlighted)
    // 3. Has class match
    // 4. Others
    formatted.sort((a, b) => {
      if (a.alreadyAssigned && !b.alreadyAssigned) return -1;
      if (!a.alreadyAssigned && b.alreadyAssigned) return 1;

      if (a.hasSubjectMatch && !b.hasSubjectMatch) return -1;
      if (!a.hasSubjectMatch && b.hasSubjectMatch) return 1;

      if (a.hasClassMatch && !b.hasClassMatch) return -1;
      if (!a.hasClassMatch && b.hasClassMatch) return 1;

      return 0;
    });

    // Text search filter
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      formatted = formatted.filter(
        (s: any) =>
          s.name.toLowerCase().includes(q) ||
          s.email.toLowerCase().includes(q) ||
          s.phone.toLowerCase().includes(q) ||
          s.studentId.toLowerCase().includes(q) ||
          s.schoolName.toLowerCase().includes(q) ||
          s.currentClass.toLowerCase().includes(q) ||
          s.subjects.some((sub: string) => sub.toLowerCase().includes(q))
      );
    }

    return NextResponse.json({ students: formatted, total: formatted.length });
  } catch (error: any) {
    console.error("Allocatable Students Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
