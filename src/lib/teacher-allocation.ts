import mongoose from "mongoose";
import connectToDatabase from "@/lib/db/mongoose";
import TeacherProfile from "@/models/TeacherProfile";
import Institution from "@/models/Institution";
import StudentProfile from "@/models/StudentProfile";
import { CLASS_LIST } from "@/lib/curriculum";

export interface TeacherAllocationResult {
  allocatedClasses: string[];
  allocatedSubjects: string[];
  institutionName: string;
  teacherType: string;
  hasSpecificAllocations: boolean;
  profile: any;
}

const DEFAULT_SUBJECTS = [
  "Mathematics",
  "Science",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "Social Science",
  "Computer Science",
];

export async function getTeacherAllocations(userId: string): Promise<TeacherAllocationResult> {
  await connectToDatabase();

  const userObjId = mongoose.Types.ObjectId.isValid(userId)
    ? new mongoose.Types.ObjectId(userId)
    : userId;

  const teacherProfile = await TeacherProfile.findOne({
    $or: [{ userId: userId }, { userId: userObjId }, { _id: userId }],
  }).lean();

  const classesSet = new Set<string>();
  const subjectsSet = new Set<string>();

  // 1. From TeacherProfile assignedClasses & classesTaught
  if (Array.isArray(teacherProfile?.assignedClasses)) {
    teacherProfile.assignedClasses.forEach((c: string) => {
      if (c && typeof c === "string" && c.trim()) classesSet.add(c.trim());
    });
  }
  if (Array.isArray(teacherProfile?.classesTaught)) {
    teacherProfile.classesTaught.forEach((c: string) => {
      if (c && typeof c === "string" && c.trim()) classesSet.add(c.trim());
    });
  }

  // 2. From TeacherProfile assignedSubjects & subjects
  if (Array.isArray(teacherProfile?.assignedSubjects)) {
    teacherProfile.assignedSubjects.forEach((s: string) => {
      if (s && typeof s === "string" && s.trim()) subjectsSet.add(s.trim());
    });
  }
  if (Array.isArray(teacherProfile?.subjects)) {
    teacherProfile.subjects.forEach((s: string) => {
      if (s && typeof s === "string" && s.trim()) subjectsSet.add(s.trim());
    });
  }

  // 3. From Institution groups where this faculty is assigned
  try {
    const institutionDocs = await Institution.find({
      "groups.facultyUserId": { $in: [userId, userObjId] },
    }).lean();

    for (const inst of institutionDocs) {
      if (Array.isArray(inst.groups)) {
        for (const g of inst.groups) {
          const facultyIdStr = (g.facultyUserId?._id || g.facultyUserId || "").toString();
          if (facultyIdStr === userId.toString()) {
            if (g.classLevel && typeof g.classLevel === "string" && g.classLevel.trim()) {
              classesSet.add(g.classLevel.trim());
            }
            if (
              g.subject &&
              typeof g.subject === "string" &&
              g.subject.trim() &&
              g.subject !== "All Subjects"
            ) {
              subjectsSet.add(g.subject.trim());
            }
          }
        }
      }
    }
  } catch (err) {
    console.error("Error fetching institution group allocations:", err);
  }

  // 4. From StudentProfile assigned to this teacher
  try {
    const assignedStudents = await StudentProfile.find({
      assignedTeacherIds: { $in: [userId, userObjId] },
    })
      .select("currentClass subjects")
      .lean();

    for (const sp of assignedStudents) {
      if (sp.currentClass && typeof sp.currentClass === "string" && sp.currentClass.trim()) {
        classesSet.add(sp.currentClass.trim());
      }
      if (Array.isArray(sp.subjects)) {
        sp.subjects.forEach((s: string) => {
          if (s && typeof s === "string" && s.trim()) subjectsSet.add(s.trim());
        });
      }
    }
  } catch (err) {
    console.error("Error fetching student allocations:", err);
  }

  // 5. From TeacherProfile assignedStudentIds
  if (Array.isArray(teacherProfile?.assignedStudentIds) && teacherProfile.assignedStudentIds.length > 0) {
    try {
      const studentIds = teacherProfile.assignedStudentIds
        .map((s: any) => (s?._id || s).toString())
        .filter((id: string) => mongoose.Types.ObjectId.isValid(id))
        .map((id: string) => new mongoose.Types.ObjectId(id));

      if (studentIds.length > 0) {
        const studentDocs = await StudentProfile.find({
          userId: { $in: studentIds },
        })
          .select("currentClass subjects")
          .lean();

        for (const sp of studentDocs) {
          if (sp.currentClass && typeof sp.currentClass === "string" && sp.currentClass.trim()) {
            classesSet.add(sp.currentClass.trim());
          }
          if (Array.isArray(sp.subjects)) {
            sp.subjects.forEach((s: string) => {
              if (s && typeof s === "string" && s.trim()) subjectsSet.add(s.trim());
            });
          }
        }
      }
    } catch (err) {
      console.error("Error fetching teacherProfile.assignedStudentIds allocations:", err);
    }
  }

  // Sort classes according to CLASS_LIST order
  const rawClasses = Array.from(classesSet);
  rawClasses.sort((a, b) => {
    const idxA = CLASS_LIST.indexOf(a as any);
    const idxB = CLASS_LIST.indexOf(b as any);
    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
    if (idxA !== -1) return -1;
    if (idxB !== -1) return 1;
    return a.localeCompare(b);
  });

  const rawSubjects = Array.from(subjectsSet);
  rawSubjects.sort((a, b) => a.localeCompare(b));

  const hasSpecificAllocations = rawClasses.length > 0 || rawSubjects.length > 0;

  return {
    allocatedClasses: rawClasses,
    allocatedSubjects: rawSubjects,
    institutionName: teacherProfile?.institutionName || "",
    teacherType: teacherProfile?.teacherType || "B2B",
    hasSpecificAllocations,
    profile: teacherProfile,
  };
}
