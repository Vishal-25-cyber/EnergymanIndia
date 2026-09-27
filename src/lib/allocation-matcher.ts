/**
 * Matching utilities for B2C student-to-teacher allocation.
 * Supports single subject matches, aliases (e.g. Maths <-> Mathematics, SST <-> Social Science),
 * case-insensitivity, and class normalization.
 */

const SUBJECT_ALIAS_MAP: Record<string, RegExp> = {
  mathematics: /(^|[,\s])(mathematics|maths|math)([,\s]|$)/i,
  science: /(^|[,\s])(science|general science)([,\s]|$)/i,
  physics: /(^|[,\s])physics([,\s]|$)/i,
  chemistry: /(^|[,\s])chemistry([,\s]|$)/i,
  biology: /(^|[,\s])(biology|bio)([,\s]|$)/i,
  english: /(^|[,\s])(english|eng)([,\s]|$)/i,
  "social science": /(^|[,\s])(social science|social studies|social|sst)([,\s]|$)/i,
  "computer science": /(^|[,\s])(computer science|computer|cs|it)([,\s]|$)/i,
  tamil: /(^|[,\s])tamil([,\s]|$)/i,
  hindi: /(^|[,\s])hindi([,\s]|$)/i,
};

export function getSubjectRegex(subject: string): RegExp {
  const normalized = subject.trim().toLowerCase();
  for (const [key, regex] of Object.entries(SUBJECT_ALIAS_MAP)) {
    if (normalized === key || regex.test(normalized)) {
      return regex;
    }
  }
  const escaped = subject.trim().replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  return new RegExp(`(^|[,\s])(${escaped})([,\s]|$)`, "i");
}

export function getClassRegex(cls: string): RegExp {
  const numMatch = cls.match(/\d+/);
  if (numMatch) {
    const num = numMatch[0];
    return new RegExp(`^(class\\s*)?${num}(th)?$`, "i");
  }
  const escaped = cls.trim().replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  return new RegExp(`^${escaped}$`, "i");
}

/**
 * Returns canonical teacher subjects that match at least one of the student's subjects.
 * Works if student.subjects is an array of strings OR a single string OR comma-separated.
 */
export function getOverlappingSubjects(
  studentSubjects: string[] | string | undefined | null,
  teacherSubjects: string[]
): string[] {
  if (!studentSubjects) return [];
  const studentList: string[] = Array.isArray(studentSubjects)
    ? studentSubjects
    : typeof studentSubjects === "string"
    ? studentSubjects.split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  if (studentList.length === 0) return [];

  const matched: string[] = [];
  for (const tSub of teacherSubjects) {
    const regex = getSubjectRegex(tSub);
    const hasMatch = studentList.some((sSub) => regex.test(sSub.trim()));
    if (hasMatch) {
      matched.push(tSub);
    }
  }
  return matched;
}

/**
 * Checks if a student's class matches any of the teacher's classes.
 */
export function isClassMatching(
  studentClass: string | undefined | null,
  teacherClasses: string[]
): boolean {
  if (!studentClass || !studentClass.trim()) return true; // Unassigned class is permissive
  if (teacherClasses.length === 0) return true;
  return teacherClasses.some((tCls) => getClassRegex(tCls).test(studentClass.trim()));
}

/**
 * Broad MongoDB filter query for B2C students.
 */
export function b2cStudentMongoQuery(extra: Record<string, any> = {}) {
  return {
    $or: [
      { studentType: "B2C" },
      { schoolName: { $regex: /individual/i } },
      { studentType: { $exists: false } },
      { studentType: null },
      { studentType: "" },
    ],
    ...extra,
  };
}
