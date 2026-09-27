import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/mongoose";
import { getSession } from "@/lib/auth/session";
import StudentProfile from "@/models/StudentProfile";

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
    const classLevel = searchParams.get("classLevel") || "";
    const subject = searchParams.get("subject") || "";
    const search = searchParams.get("search") || "";
    const teacherUserId = searchParams.get("teacherUserId") || "";
    const classFilter = searchParams.get("classes") || ""; // comma-separated
    const subjectFilter = searchParams.get("subjects") || ""; // comma-separated

    await connectToDatabase();

    // Build MongoDB query
    const query: any = {};

    if (studentType && studentType !== "ALL") {
      if (studentType === "B2C") {
        // Match B2C students OR students who signed up as individual (schoolName = Individual Tutoring)
        query.$or = [
          { studentType: "B2C" },
          { schoolName: { $regex: /individual/i } },
          { studentType: { $exists: false } }, // legacy records without type
        ];
      } else {
        query.studentType = studentType;
      }
    }

    if (schoolName && schoolName.trim() && studentType !== "B2C") {
      query.schoolName = { $regex: new RegExp(schoolName.trim(), "i") };
    }
    if (classLevel && classLevel !== "ALL") {
      query.currentClass = classLevel;
    }
    if (subject && subject !== "ALL") {
      query.subjects = subject;
    }
    // Smart filter: if teacher's classes/subjects passed, narrow to matching students
    if (classFilter) {
      const classList = classFilter.split(",").map((c) => c.trim()).filter(Boolean);
      if (classList.length > 0) query.currentClass = { $in: classList };
    }
    if (subjectFilter) {
      const subjectList = subjectFilter.split(",").map((s) => s.trim()).filter(Boolean);
      if (subjectList.length > 0) query.subjects = { $in: subjectList };
    }

    const profiles = await StudentProfile.find(query)
      .populate("userId", "name email phone status avatarUrl")
      .populate("assignedTeacherIds", "name email phone")
      .sort({ createdAt: -1 })
      .lean() as any[];

    let formatted = profiles
      .filter((p: any) => {
        // Must have a valid user record
        if (!p.userId) return false;
        // Include all students (ACTIVE or no status set)
        const userStatus = p.userId.status || "ACTIVE";
        return ["ACTIVE", "TRIAL", ""].includes(userStatus) || !userStatus;
      })
      .map((p: any) => {
        // Derive studentType from schoolName fallback for legacy records
        const derivedType =
          p.studentType ||
          (p.schoolName?.toLowerCase().includes("individual") ? "B2C" : "B2B");
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
          subjects: Array.isArray(p.subjects) ? p.subjects : [],
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
          // Whether this specific teacher is already assigned
          alreadyAssigned: teacherUserId
            ? (Array.isArray(p.assignedTeacherIds)
                ? p.assignedTeacherIds.some((t: any) => (t._id || t).toString() === teacherUserId)
                : false)
            : false,
        };
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
          s.currentClass.toLowerCase().includes(q)
      );
    }

    return NextResponse.json({ students: formatted, total: formatted.length });
  } catch (error: any) {
    console.error("Allocatable Students Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
