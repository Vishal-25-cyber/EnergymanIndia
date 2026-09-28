import mongoose from "mongoose";
import TeacherProfile from "@/models/TeacherProfile";
import StudentProfile from "@/models/StudentProfile";
import { getSubjectRegex, getClassRegex, isClassMatching } from "@/lib/allocation-matcher";

export interface ResolvedStreamResult {
  streamType: "B2C" | "B2B";
  institutionName: string;
  assignedStudentIds: any[];
  eligibleStudents: any[];
}

/**
 * Resolves all teacher user IDs that are assigned to a given student
 * by checking both directions (StudentProfile.assignedTeacherIds and TeacherProfile.assignedStudentIds).
 */
export async function getAssignedTeacherIdsForStudent(
  studentProfile: any,
  sessionUserId: string
): Promise<string[]> {
  const directTeacherIds = Array.isArray(studentProfile?.assignedTeacherIds)
    ? studentProfile.assignedTeacherIds.map((t: any) => (t?._id || t).toString()).filter(Boolean)
    : [];

  const studentObjId = mongoose.Types.ObjectId.isValid(sessionUserId)
    ? new mongoose.Types.ObjectId(sessionUserId)
    : sessionUserId;

  const teachersWithThisStudent = await TeacherProfile.find({
    assignedStudentIds: { $in: [sessionUserId, studentObjId] },
  })
    .select("userId")
    .lean();

  const allTeacherIds = Array.from(
    new Set([
      ...directTeacherIds,
      ...teachersWithThisStudent.map((t: any) => (t.userId?._id || t.userId || t._id).toString()).filter(Boolean),
    ])
  );

  return allTeacherIds;
}

/**
 * Resolves the stream type (B2C vs B2B) and the exact list of eligible students
 * when a teacher schedules or creates a live class.
 */
export async function resolveClassStreamAndStudents({
  teacherUserId,
  classLevel,
  subject,
  batchId,
}: {
  teacherUserId: string;
  classLevel: string;
  subject: string;
  batchId?: string;
}): Promise<ResolvedStreamResult> {
  const teacherProfile = await TeacherProfile.findOne({
    $or: [{ userId: teacherUserId }, { _id: teacherUserId }],
  }).lean();

  const isB2BTeacher =
    teacherProfile?.teacherType === "B2B" && Boolean(teacherProfile?.institutionName?.trim());

  if (isB2BTeacher) {
    const institutionName = teacherProfile!.institutionName!.trim();
    const instRegex = new RegExp(
      `^${institutionName.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")}$`,
      "i"
    );

    // Query institutional students belonging to this school
    const schoolStudents = await StudentProfile.find({
      schoolName: { $regex: instRegex },
    }).lean();

    const subjectRegex = getSubjectRegex(subject);

    const eligible = schoolStudents.filter((st: any) => {
      if (classLevel && !isClassMatching(st.currentClass, [classLevel])) {
        return false;
      }
      if (Array.isArray(st.subjects) && st.subjects.length > 0) {
        const matchesSubject = st.subjects.some((s: string) => subjectRegex.test(s));
        if (!matchesSubject) return false;
      }
      return true;
    });

    const assignedIds = eligible.map((st: any) => st.userId).filter(Boolean);

    return {
      streamType: "B2B",
      institutionName,
      assignedStudentIds: assignedIds,
      eligibleStudents: eligible,
    };
  }

  // Teacher is B2C (Individual Tutoring Faculty)
  // Gather all student IDs explicitly allocated to this teacher
  const directAllocated = (teacherProfile?.assignedStudentIds || [])
    .filter(Boolean)
    .map((id: any) => (id._id || id).toString());

  const teacherObjId = mongoose.Types.ObjectId.isValid(teacherUserId)
    ? new mongoose.Types.ObjectId(teacherUserId)
    : teacherUserId;

  const reverseAllocated = await StudentProfile.find({
    assignedTeacherIds: { $in: [teacherUserId, teacherObjId] },
  })
    .select("userId")
    .lean();

  const allAllocatedIds = Array.from(
    new Set([
      ...directAllocated,
      ...reverseAllocated.map((s: any) => s.userId?.toString()).filter(Boolean),
    ])
  );

  let eligible: any[] = [];

  if (allAllocatedIds.length > 0) {
    // Fetch all allocated students
    const studentDocs = await StudentProfile.find({
      userId: { $in: allAllocatedIds },
    }).lean();

    eligible = studentDocs.filter((st: any) => {
      // Must match class level if provided
      if (classLevel && !isClassMatching(st.currentClass, [classLevel])) {
        return false;
      }
      return true;
    });
  }

  // Fallback to batch students only if teacher has zero allocated students
  if (eligible.length === 0 && batchId) {
    const batchStudents = await StudentProfile.find({ batchId }).lean();
    eligible = batchStudents.filter((st: any) => {
      if (classLevel && !isClassMatching(st.currentClass, [classLevel])) return false;
      return true;
    });
  }

  const assignedIds = eligible.map((st: any) => st.userId).filter(Boolean);

  return {
    streamType: "B2C",
    institutionName: "",
    assignedStudentIds: assignedIds,
    eligibleStudents: eligible,
  };
}

/**
 * Builds the MongoDB query condition for live classes that a student is authorized to view.
 */
export function buildStudentClassAccessQuery(
  studentProfile: any,
  sessionUserId: string,
  assignedTeacherUserIds: string[] = []
): Record<string, any> {
  const currentClass = studentProfile?.currentClass || "Class 10";
  const classVariants = [
    currentClass,
    currentClass.replace(/Class\s*/i, "").trim(),
    `Class ${currentClass.replace(/Class\s*/i, "").trim()}`,
  ].filter(Boolean);

  const directTeachers = Array.isArray(studentProfile?.assignedTeacherIds)
    ? studentProfile.assignedTeacherIds.map((t: any) => (t?._id || t).toString()).filter(Boolean)
    : [];

  const allTeachers = Array.from(new Set([...directTeachers, ...assignedTeacherUserIds]));

  const orConditions: any[] = [
    // 1. Explicitly assigned to this student
    { assignedStudentIds: sessionUserId },
  ];

  // 2. Created by any teacher assigned to this student (matching classLevel)
  if (allTeachers.length > 0) {
    orConditions.push({
      teacherId: { $in: allTeachers },
      classLevel: { $in: classVariants },
      $or: [
        { assignedStudentIds: { $exists: false } },
        { assignedStudentIds: { $size: 0 } },
        { assignedStudentIds: sessionUserId },
      ],
    });
  }

  // 3. Institutional classes for their school
  const isInstitutional =
    studentProfile?.studentType === "B2B" &&
    Boolean(studentProfile?.schoolName && !/individual/i.test(studentProfile.schoolName));

  if (isInstitutional) {
    const instName = studentProfile.schoolName.trim();
    const instRegex = new RegExp(
      `^${instName.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")}$`,
      "i"
    );

    orConditions.push({
      streamType: "B2B",
      institutionName: { $regex: instRegex },
      classLevel: { $in: classVariants },
      $or: [
        { assignedStudentIds: { $exists: false } },
        { assignedStudentIds: { $size: 0 } },
        { assignedStudentIds: sessionUserId },
      ],
    });
  } else {
    // 4. B2C trial/unassigned general classes for their batch or classLevel (only if unassigned)
    if (allTeachers.length === 0) {
      orConditions.push({
        streamType: { $ne: "B2B" },
        institutionName: { $in: ["", null, undefined] },
        classLevel: { $in: classVariants },
        $or: [
          { assignedStudentIds: { $exists: false } },
          { assignedStudentIds: { $size: 0 } },
          { assignedStudentIds: sessionUserId },
        ],
      });
    }
  }

  return { $or: orConditions };
}

/**
 * Builds subject filter for a student's enrolled subjects.
 */
export function buildStudentSubjectFilter(subjects?: string[] | null) {
  if (!subjects || !Array.isArray(subjects) || subjects.length === 0) {
    return null;
  }
  const regexes = subjects.map((sub) => getSubjectRegex(sub));
  return {
    $or: [
      { subject: { $in: subjects } },
      ...regexes.map((rx) => ({ subject: { $regex: rx } })),
      { subject: { $exists: false } },
      { subject: null },
    ],
  };
}
