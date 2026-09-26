import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/mongoose";
import { getSession } from "@/lib/auth/session";
import StudentProfile from "@/models/StudentProfile";
import User from "@/models/User";

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

    await connectToDatabase();

    const query: any = {};
    if (studentType && studentType !== "ALL") {
      query.studentType = studentType;
    }
    if (schoolName && schoolName.trim()) {
      query.schoolName = { $regex: new RegExp(schoolName.trim(), "i") };
    }
    if (classLevel && classLevel !== "ALL") {
      query.currentClass = classLevel;
    }
    if (subject && subject !== "ALL") {
      query.subjects = subject;
    }

    const profiles = await StudentProfile.find(query)
      .populate("userId", "name email phone status avatarUrl")
      .populate("assignedTeacherIds", "name email phone staffId")
      .sort({ createdAt: -1 })
      .lean();

    let formatted = profiles
      .filter((p: any) => p.userId)
      .map((p: any) => ({
        _id: p._id,
        userId: p.userId?._id || p.userId,
        name: p.userId?.name || "Student",
        email: p.userId?.email || "",
        phone: p.userId?.phone || "",
        studentId: p.studentId || "",
        studentType: p.studentType || (p.schoolName === "Individual Tutoring" ? "B2C" : "B2B"),
        schoolName: p.schoolName || "",
        currentClass: p.currentClass || "Class 10",
        board: p.board || "CBSE",
        subjects: Array.isArray(p.subjects) ? p.subjects : [],
        assignedTeacherIds: Array.isArray(p.assignedTeacherIds)
          ? p.assignedTeacherIds.map((t: any) => t._id || t)
          : [],
        assignedTeachers: Array.isArray(p.assignedTeacherIds) ? p.assignedTeacherIds : [],
      }));

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      formatted = formatted.filter(
        (s: any) =>
          s.name.toLowerCase().includes(q) ||
          s.email.toLowerCase().includes(q) ||
          s.phone.toLowerCase().includes(q) ||
          s.studentId.toLowerCase().includes(q) ||
          s.schoolName.toLowerCase().includes(q)
      );
    }

    return NextResponse.json({ students: formatted });
  } catch (error: any) {
    console.error("Allocatable Students Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
