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
 * Resolves the stream type (B2C vs B2B) and the exact list of eligible students
 * when a teacher schedules or creates a live class.
 *
 * Rules:
 * - If teacher is B2C (Individual Tutor), class is assigned ONLY to individual students
 *   allocated to this teacher for this classLevel & subject.
 * - If teacher is B2B (Institutional Faculty), class is assigned ONLY to students belonging
 *   to that specific institution/school for this classLevel & subject.
 * - Under no circumstance will a B2C class be assigned or notified to B2B students, or vice-versa.
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
      studentType: "B2B",
      schoolName: { $regex: instRegex },
    }).lean();

    const subjectRegex = getSubjectRegex(subject);

    const eligible = schoolStudents.filter((st: any) => {
      // Must match class level
      if (classLevel && !isClassMatching(st.currentClass, [classLevel])) {
        return false;
      }
      // Must match subject if student has specific enrolled subjects
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
  // Gather all individual student IDs allocated to this teacher
  const directAllocated = (teacherProfile?.assignedStudentIds || [])
    .filter(Boolean)
    .map((id: any) => (id._id || id).toString());

  // Also query any students who have this teacher in their assignedTeacherIds
  const reverseAllocated = await StudentProfile.find({
    assignedTeacherIds: teacherUserId,
    studentType: { $ne: "B2B" },
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
    const studentDocs = await StudentProfile.find({
      userId: { $in: allAllocatedIds },
      studentType: { $ne: "B2B" }, // Strictly isolate from institutional
    }).lean();

    const subjectRegex = getSubjectRegex(subject);

    eligible = studentDocs.filter((st: any) => {
      // Must match class level
      if (classLevel && !isClassMatching(st.currentClass, [classLevel])) {
        return false;
      }
      // Must match subject if student has subjects
      if (Array.isArray(st.subjects) && st.subjects.length > 0) {
        const matchesSubject = st.subjects.some((s: string) => subjectRegex.test(s));
        if (!matchesSubject) return false;
      }
      return true;
    });
  }

  // If teacher has batchId fallback for B2C batch
  if (eligible.length === 0 && batchId) {
    const batchStudents = await StudentProfile.find({
      batchId,
      studentType: { $ne: "B2B" },
    }).lean();
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
 * Ensures zero leakage between B2C (individual) and B2B (institutional) streams.
 */
export function buildStudentClassAccessQuery(
  studentProfile: any,
  sessionUserId: string
): Record<string, any> {
  const isInstitutional =
    studentProfile?.studentType === "B2B" &&
    Boolean(studentProfile?.schoolName && !/individual/i.test(studentProfile.schoolName));

  const currentClass = studentProfile?.currentClass || "Class 10";
  const classVariants = [
    currentClass,
    currentClass.replace(/Class\s*/i, "").trim(),
    `Class ${currentClass.replace(/Class\s*/i, "").trim()}`,
  ].filter(Boolean);

  if (isInstitutional) {
    const instName = studentProfile.schoolName.trim();
    const instRegex = new RegExp(
      `^${instName.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")}$`,
      "i"
    );

    return {
      streamType: "B2B",
      institutionName: { $regex: instRegex },
      classLevel: { $in: classVariants },
      $or: [
        { assignedStudentIds: { $exists: false } },
        { assignedStudentIds: { $size: 0 } },
        { assignedStudentIds: sessionUserId },
      ],
    };
  }

  // B2C / Individual student
  const assignedTeachers = Array.isArray(studentProfile?.assignedTeacherIds)
    ? studentProfile.assignedTeacherIds.filter(Boolean)
    : [];

  const studentAccessConditions: any[] = [
    { assignedStudentIds: sessionUserId },
  ];

  if (assignedTeachers.length > 0) {
    studentAccessConditions.push({
      teacherId: { $in: assignedTeachers },
      classLevel: { $in: classVariants },
      $or: [
        { assignedStudentIds: { $exists: false } },
        { assignedStudentIds: { $size: 0 } },
        { assignedStudentIds: sessionUserId },
      ],
    });
  } else {
    // Unassigned trial student: can only see unassigned B2C classes for their classLevel
    studentAccessConditions.push({
      classLevel: { $in: classVariants },
      $or: [
        { assignedStudentIds: { $exists: false } },
        { assignedStudentIds: { $size: 0 } },
        { assignedStudentIds: sessionUserId },
      ],
    });
  }

  return {
    streamType: { $ne: "B2B" },
    institutionName: { $in: ["", null, undefined] },
    $or: studentAccessConditions,
  };
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
