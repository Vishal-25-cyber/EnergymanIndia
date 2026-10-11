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

  const institutionName = teacherProfile?.institutionName?.trim() || "";
  const subjectRegex = getSubjectRegex(subject);

  // 1. Check if the teacher has explicitly allocated students
  const directAllocated = (teacherProfile?.assignedStudentIds || [])
    .filter(Boolean)
    .map((id: any) => (id._id || id).toString());

  const teacherObjId = mongoose.Types.ObjectId.isValid(teacherUserId)
    ? new mongoose.Types.ObjectId(teacherUserId)
    : teacherUserId;

  // 1. Check for specific group(s) in Institution where this teacher is assigned for classLevel and subject
  let groupStudentIds: string[] = [];
  try {
    const Institution = (await import("@/models/Institution")).default;
    const institutionDoc = await Institution.findOne({
      "groups.facultyUserId": { $in: [teacherUserId, teacherObjId] },
    }).lean();

    if (institutionDoc && Array.isArray(institutionDoc.groups)) {
      const matchingGroups = institutionDoc.groups.filter((g: any) => {
        const isTeacher = (g.facultyUserId?._id || g.facultyUserId || "").toString() === teacherUserId.toString();
        if (!isTeacher) return false;
        if (classLevel && !isClassMatching(g.classLevel, [classLevel])) return false;
        if (subject && g.subject && g.subject !== "All Subjects") {
          if (!subjectRegex.test(g.subject)) return false;
        }
        return true;
      });

      if (matchingGroups.length > 0) {
        groupStudentIds = Array.from(
          new Set(
            matchingGroups.flatMap((g: any) =>
              (g.studentUserIds || []).map((id: any) => (id._id || id).toString()).filter(Boolean)
            )
          )
        );
      }
    }
  } catch (err) {
    console.warn("Group resolution warning:", err);
  }

  // 2. Check if the teacher has explicitly allocated students
  const directAllocated = (teacherProfile?.assignedStudentIds || [])
    .filter(Boolean)
    .map((id: any) => (id._id || id).toString());

  const reverseAllocated = await StudentProfile.find({
    assignedTeacherIds: { $in: [teacherUserId, teacherObjId] },
  })
    .select("userId")
    .lean();

  const allAllocatedIds = Array.from(
    new Set([
      ...groupStudentIds,
      ...directAllocated,
      ...reverseAllocated.map((s: any) => s.userId?.toString()).filter(Boolean),
    ])
  );

  let eligible: any[] = [];

  if (groupStudentIds.length > 0) {
    const studentDocs = await StudentProfile.find({
      userId: { $in: groupStudentIds },
    }).lean();

    eligible = studentDocs.filter((st: any) => {
      if (classLevel && !isClassMatching(st.currentClass, [classLevel])) {
        return false;
      }
      return true;
    });
  } else if (allAllocatedIds.length > 0) {
    const studentDocs = await StudentProfile.find({
      userId: { $in: allAllocatedIds },
    }).lean();

    eligible = studentDocs.filter((st: any) => {
      if (classLevel && !isClassMatching(st.currentClass, [classLevel])) {
        return false;
      }
      if (Array.isArray(st.subjects) && st.subjects.length > 0) {
        const matchesSubject = st.subjects.some((s: string) => subjectRegex.test(s));
        if (!matchesSubject) return false;
      }
      return true;
    });
  }

  // Strictly isolate to the teacher's allocated group.
  // We do NOT broadcast to the whole school so teachers' groups never interfere with each other
  // and newly signed up students are not included until added by faculty or admin.
  const assignedIds = eligible.map((st: any) => st.userId).filter(Boolean);

  return {
    streamType: "B2B",
    institutionName,
    assignedStudentIds: assignedIds,
    eligibleStudents: eligible,
  };
}

/**
 * Builds the MongoDB query condition for live classes that a student is authorized to view.
 * Strictly limited to classes of teachers allocated to this student's group or where the student
 * is explicitly in assignedStudentIds. Newly signed-up students see NO classes until added to a group.
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
    // 1. Explicitly in the session's assigned group
    { assignedStudentIds: sessionUserId },
  ];

  // 2. Created by a teacher specifically allocated to this student
  if (allTeachers.length > 0) {
    const teacherCond: any = {
      teacherId: { $in: allTeachers },
      classLevel: { $in: classVariants },
      $or: [
        { assignedStudentIds: { $exists: false } },
        { assignedStudentIds: { $size: 0 } },
        { assignedStudentIds: sessionUserId },
      ],
    };

    const schoolName = (studentProfile?.schoolName || "").trim();
    if (schoolName && !/individual/i.test(schoolName)) {
      const instRegex = new RegExp(
        `^${schoolName.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")}$`,
        "i"
      );
      teacherCond.institutionName = { $regex: instRegex };
    }

    orConditions.push(teacherCond);
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
