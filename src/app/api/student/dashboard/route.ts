import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectToDatabase from "@/lib/db/mongoose";
import { getSession } from "@/lib/auth/session";
import User from "@/models/User";
import StudentProfile from "@/models/StudentProfile";
import LiveSession from "@/models/LiveSession";
import Attendance from "@/models/Attendance";
import Assignment from "@/models/Assignment";
import AssignmentSubmission from "@/models/AssignmentSubmission";
import Material from "@/models/Material";
import Notification from "@/models/Notification";
import Payment from "@/models/Payment";
import SystemSettings from "@/models/SystemSettings";
import { getSubjectsForClassAndBoard } from "@/lib/curriculum";

export const dynamic = "force-dynamic";

const DAYS_OF_WEEK = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function isSubjectMatch(itemSubject: string = "", targetSubject: string = ""): boolean {
  if (!itemSubject || !targetSubject) return false;
  const item = itemSubject.trim().toLowerCase();
  const target = targetSubject.trim().toLowerCase();
  if (item === target) return true;
  if (target === "mathematics") return item.includes("math") || item.includes("algebra") || item.includes("geometry") || item.includes("arithmetic") || item.includes("trig");
  if (target === "science") return item.includes("science") || item.includes("physics") || item.includes("chemistry") || item.includes("biology") || item.includes("botany") || item.includes("zoology");
  if (target === "social science") return item.includes("social") || item.includes("history") || item.includes("civics") || item.includes("geography") || item.includes("economics");
  if (target === "english") return item.includes("english") || item.includes("grammar") || item.includes("prose") || item.includes("poetry");
  if (target === "tamil") return item.includes("tamil");
  return item.includes(target) || target.includes(item);
}

export async function GET(req?: any) {
  try {
    const session = await getSession(req);
    if (!session || session.role !== "STUDENT") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const [user, profile]: [any, any] = await Promise.all([
      User.findById(session.userId).select("name email phone avatarUrl status").lean(),
      StudentProfile.findOne({ userId: session.userId }).populate("batchId").lean(),
    ]);

    let studentProfile = profile;
    if (!studentProfile) {
      studentProfile = await StudentProfile.create({
        userId: session.userId,
        currentClass: "Class 10",
        board: "State Board",
        schoolName: "SSVS",
      });
    }

    const currentClass = studentProfile.currentClass || "Class 10";
    const board = studentProfile.board || "CBSE";
    const now = new Date();
    const todayDateStr = now.toISOString().split("T")[0];
    const currentDayName = DAYS_OF_WEEK[now.getDay()];

    const batchName = (studentProfile.batchId as any)?.name || "6:00 PM – 7:00 PM";
    const batchId = (studentProfile.batchId as any)?._id || studentProfile.batchId;

    const liveSessionFilter = batchId
      ? { $or: [{ batchId }, { classLevel: currentClass }] }
      : { classLevel: currentClass };

    const studentObjId = mongoose.Types.ObjectId.isValid(session.userId)
      ? new mongoose.Types.ObjectId(session.userId)
      : session.userId;

    const assignmentFilter: any = {
      $or: [
        { classLevel: currentClass },
        { classLevel: null },
        { classLevel: { $exists: false } },
        ...(batchId ? [{ batchId }] : []),
      ],
    };

    const materialFilter: any = {
      $or: [
        { classLevel: currentClass },
        { classLevel: null },
        { classLevel: { $exists: false } },
        ...(batchId ? [{ batchId }] : []),
      ],
    };

    // Fetch REAL created live sessions, attendance, assignments, and payments directly from DB
    const [
      dbTodayClasses,
      upcomingClasses,
      completedOrLiveBatchSessions,
      attendanceRecords,
      allAssignments,
      submissions,
      allMaterials,
      unreadNotifications,
      paymentsList,
    ] = await Promise.all([
      LiveSession.find({
        $or: [
          { status: "LIVE" },
          {
            $and: [
              {
                $or: [
                  { classLevel: currentClass },
                  { classLevel: null },
                  { classLevel: { $exists: false } },
                  { batchId: batchId || null },
                  { batchId: null },
                  { batchId: { $exists: false } },
                ],
              },
              { date: todayDateStr, status: { $in: ["PUBLISHED", "SCHEDULED", "LIVE"] } },
            ],
          },
        ],
      })
        .populate("teacherId", "name avatarUrl email")
        .populate("batchId")
        .sort({ date: 1, startTime: 1 })
        .lean(),

      LiveSession.find({
        $or: [
          { status: "LIVE" },
          {
            $and: [
              {
                $or: [
                  { classLevel: currentClass },
                  { classLevel: null },
                  { classLevel: { $exists: false } },
                  { batchId: batchId || null },
                  { batchId: null },
                  { batchId: { $exists: false } },
                ],
              },
              { status: { $in: ["PUBLISHED", "SCHEDULED", "LIVE"] }, date: { $gte: todayDateStr } },
            ],
          },
        ],
      })
        .populate("teacherId", "name avatarUrl")
        .populate("batchId")
        .sort({ date: 1, startTime: 1 })
        .limit(8)
        .lean(),

      LiveSession.find({
        ...liveSessionFilter,
        status: { $in: ["COMPLETED", "LIVE"] },
      }).lean(),

      Attendance.find({
        $or: [{ studentId: session.userId }, { studentId: studentObjId }],
      })
        .populate("sessionId", "title subject topic date startTime endTime")
        .sort({ date: -1, createdAt: -1 })
        .lean(),

      Assignment.find(assignmentFilter)
        .populate("teacherId", "name email avatarUrl")
        .sort({ createdAt: -1 })
        .lean(),

      AssignmentSubmission.find({
        $or: [{ studentId: session.userId }, { studentId: studentObjId }],
      }).lean(),

      Material.find(materialFilter)
        .populate("uploadedBy", "name email")
        .sort({ createdAt: -1 })
        .lean(),

      Notification.find({
        userId: session.userId,
        read: false,
      })
        .sort({ createdAt: -1 })
        .lean(),

      Payment.find({ studentId: session.userId }).sort({ createdAt: -1, dueDate: -1 }).lean(),
    ]);

    // Dynamic Current Month & Fee Setup
    const currentMonthStr = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(new Date());
    const settings = await SystemSettings.findOne().lean();
    const defaultMonthlyFee = (settings as any)?.monthlyTuitionFee ?? (settings as any)?.monthlyFee ?? 1999;
    const studentCustomFee = Number((studentProfile as any)?.customMonthlyFee ?? (studentProfile as any)?.monthlyTuitionFee);
    const isDeekshith =
      (user?.name && /Deekshith/i.test(user.name)) ||
      studentProfile?.studentId === "STD_002" ||
      studentProfile?.studentId === "#STD_002" ||
      user?.email === "srimadhu2005@gmail.com";
    const monthlyFee = !isNaN(studentCustomFee) && studentCustomFee > 0
      ? studentCustomFee
      : (isDeekshith ? 1300 : defaultMonthlyFee);

    // Ensure single payment invoice exists for current student (no duplicates)
    let studentPayments: any[] = await Payment.find({ studentId: session.userId }).sort({ createdAt: -1 }).lean();
    if (studentPayments.length === 0) {
      const invoice = await Payment.findOneAndUpdate(
        { studentId: session.userId, billingMonth: currentMonthStr },
        {
          $setOnInsert: {
            studentId: session.userId,
            amount: monthlyFee,
            billingMonth: currentMonthStr,
            courseName: `${currentClass} ${board} — Core Academic Tuition`,
            dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
            status: "PENDING",
            receiptNumber: `REC-${Date.now().toString().slice(-6)}`,
          },
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      ).lean();
      studentPayments = [invoice];
    } else {
      // Deduplicate: If there are multiple PENDING invoices for the same student & month, remove duplicates
      const seenMonths = new Set<string>();
      const uniquePayments: any[] = [];
      for (const p of studentPayments) {
        const key = `${p.billingMonth || currentMonthStr}-${p.status}`;
        if (p.status === "PENDING" && seenMonths.has(key)) {
          await Payment.deleteOne({ _id: p._id });
        } else {
          seenMonths.add(key);
          if (
            (p.status === "PENDING" || p.status === "PENDING_VERIFICATION") &&
            (p.amount !== monthlyFee || p.billingMonth === "February 2025" || !p.billingMonth)
          ) {
            await Payment.updateOne(
              { _id: p._id },
              { $set: { amount: monthlyFee, billingMonth: currentMonthStr } }
            );
            p.amount = monthlyFee;
            p.billingMonth = currentMonthStr;
          }
          uniquePayments.push(p);
        }
      }
      studentPayments = uniquePayments;
    }

    const pendingFee = studentPayments.find((p: any) => p.status === "PENDING" || p.status === "OVERDUE");
    const pendingVerificationFee = studentPayments.find((p: any) => p.status === "PENDING_VERIFICATION");
    const paidFee = studentPayments.find((p: any) => p.status === "PAID");

    const feeStatus = {
      hasPending: !!pendingFee,
      hasPendingVerification: !!pendingVerificationFee,
      isPaid: !pendingFee && !pendingVerificationFee && !!paidFee,
      dueAmount: pendingFee?.amount ?? (pendingVerificationFee?.amount ?? monthlyFee),
      billingMonth: pendingFee?.billingMonth || pendingVerificationFee?.billingMonth || paidFee?.billingMonth || currentMonthStr,
      dueDate: pendingFee?.dueDate || pendingVerificationFee?.dueDate || null,
      receiptNumber: pendingFee?.receiptNumber || pendingVerificationFee?.receiptNumber || paidFee?.receiptNumber || null,
      transactionId: pendingVerificationFee?.transactionId || paidFee?.transactionId || null,
      currentFee: pendingFee || null,
      pendingVerification: pendingVerificationFee || null,
    };

    // Real strictly calculated Attendance from database
    const totalAttended = attendanceRecords.filter(
      (a: any) => a.status === "PRESENT" || a.status === "LATE" || a.status === "PARTIAL"
    ).length;
    const totalConductedSessions = completedOrLiveBatchSessions.length;
    const totalSessions = Math.max(totalConductedSessions, totalAttended);
    const attendancePercentage = totalSessions > 0
      ? Math.round((totalAttended / totalSessions) * 100)
      : 0;

    // Separate assignments into coursework vs proctored tests
    const activeAssignments = allAssignments.filter((a: any) => a.type !== "TEST");
    const testTasks = allAssignments.filter((a: any) => a.type === "TEST");

    const submissionMap = new Map<string, any>(
      submissions.map((s: any) => [s.assignmentId ? s.assignmentId.toString() : "", s])
    );

    // Dynamic subjects for current Class and Board from syllabus curriculum
    const subjects = getSubjectsForClassAndBoard(currentClass, board);

    // Color palettes for subjects matching logo color (navy #004b79 & gold #dfb74a)
    const subjectPalettes = [
      {
        gradient: "from-[#004b79] via-[#0066a4] to-[#002b48]",
        barColor: "bg-gradient-to-r from-[#004b79] to-[#dfb74a]",
      },
      {
        gradient: "from-[#002b48] via-[#003d66] to-[#004b79]",
        barColor: "bg-gradient-to-r from-[#003d66] to-[#dfb74a]",
      },
      {
        gradient: "from-[#b89047] via-[#cfa34b] to-[#dfb74a]",
        barColor: "bg-gradient-to-r from-[#b89047] to-[#dfb74a]",
      },
      {
        gradient: "from-[#003352] via-[#004b79] to-[#0066a4]",
        barColor: "bg-gradient-to-r from-[#004b79] to-[#dfb74a]",
      },
      {
        gradient: "from-[#1e293b] via-[#002b48] to-[#004b79]",
        barColor: "bg-gradient-to-r from-[#004b79] to-[#b89047]",
      },
    ];

    // Compute dynamic Courses list strictly from curriculum and real items
    const courses = subjects.map((subjName, idx) => {
      const palette = subjectPalettes[idx % subjectPalettes.length];
      const subMats = allMaterials.filter((m: any) => isSubjectMatch(m.subject, subjName));
      const subSess = completedOrLiveBatchSessions.filter((s: any) => isSubjectMatch(s.subject, subjName));
      const subAsgns = activeAssignments.filter((a: any) => isSubjectMatch(a.subject, subjName));
      const subTests = testTasks.filter((t: any) => isSubjectMatch(t.subject, subjName));

      const subLessonsCount = subMats.length + subSess.length;
      const subAsgnsCount = subAsgns.length;
      const subTestsCount = subTests.length;

      const completedSubAsgns = subAsgns.filter((a: any) => submissionMap.has(a._id.toString())).length;
      const completedSubTests = subTests.filter((t: any) => submissionMap.has(t._id.toString())).length;
      const attendedSubSess = subSess.filter((s: any) =>
        attendanceRecords.some(
          (att: any) =>
            att.sessionId?.toString() === s._id?.toString() &&
            (att.status === "PRESENT" || att.status === "LATE")
        )
      ).length;

      const totalItems = subLessonsCount + subAsgnsCount + subTestsCount;
      const completedItems = attendedSubSess + completedSubAsgns + completedSubTests;
      const progress = totalItems > 0 ? Math.min(100, Math.round((completedItems / totalItems) * 100)) : 0;

      return {
        id: `course-${subjName.toLowerCase().replace(/\s+/g, "-")}`,
        name: `${subjName} : Class ${currentClass.replace("Class ", "")} ${board} Syllabus`,
        subject: subjName,
        tag: `${currentClass} • ${board}`,
        progress,
        lessons: subLessonsCount,
        assignments: subAsgnsCount,
        tests: subTestsCount,
        completedLessons: attendedSubSess,
        completedAssignments: completedSubAsgns,
        completedTests: completedSubTests,
        gradient: palette.gradient,
        barColor: palette.barColor,
        isCompleted: progress >= 100,
      };
    });

    // Active Course for Top Resume Banner
    const todayLive = dbTodayClasses.find((c: any) => c.status === "LIVE") || dbTodayClasses[0];
    let activeCourse: any = null;

    if (todayLive) {
      const matchCourse = courses.find((c) => isSubjectMatch(c.subject, todayLive.subject));
      activeCourse = {
        title: `${todayLive.subject} : ${todayLive.topic || todayLive.title}`,
        subject: todayLive.subject,
        tag: `${currentClass} • Live Today`,
        progress: matchCourse ? matchCourse.progress : 50,
        lessons: matchCourse ? matchCourse.lessons : 1,
        assignments: matchCourse ? matchCourse.assignments : 0,
        tests: matchCourse ? matchCourse.tests : 0,
        actionText: todayLive.status === "LIVE" ? "Join Live" : "Resume",
        actionLink: "/student/classes",
      };
    } else {
      const primary = courses.find((c) => !c.isCompleted) || courses[0];
      activeCourse = {
        title: primary?.name || `${currentClass} Academic Tuition`,
        subject: primary?.subject || "Mathematics",
        tag: `${currentClass} • ${board}`,
        progress: primary?.progress || 0,
        lessons: primary?.lessons || 1,
        assignments: primary?.assignments || 0,
        tests: primary?.tests || 0,
        actionText: "Resume",
        actionLink: `/student/materials?subject=${encodeURIComponent(primary?.subject || "")}`,
      };
    }

    // ── 3 STATUS CARDS COUNTS ──
    const totalMaterialsCount = allMaterials.length;
    const totalLessonsCount = totalMaterialsCount + totalConductedSessions;
    const completedLessonsCount = Math.min(totalLessonsCount, totalAttended);
    const lessonsPercentage = totalLessonsCount > 0
      ? Math.min(100, Math.round((completedLessonsCount / totalLessonsCount) * 100))
      : 0;

    const totalAssignmentsCount = activeAssignments.length;
    const completedAssignmentsCount = activeAssignments.filter((a: any) =>
      submissionMap.has(a._id.toString())
    ).length;
    const assignmentsPercentage = totalAssignmentsCount > 0
      ? Math.min(100, Math.round((completedAssignmentsCount / totalAssignmentsCount) * 100))
      : 0;

    const totalTestsCount = testTasks.length;
    const completedTestsCount = testTasks.filter((t: any) =>
      submissionMap.has(t._id.toString())
    ).length;
    const testsPercentage = totalTestsCount > 0
      ? Math.min(100, Math.round((completedTestsCount / totalTestsCount) * 100))
      : 0;

    // Assessment evaluation statistics
    const evaluatedSubmissions = submissions.filter(
      (s: any) => s.status === "EVALUATED" && (s.marksObtained !== undefined || s.score !== undefined)
    );
    let avgScore: number | null = null;
    if (evaluatedSubmissions.length > 0) {
      let totalPercentageSum = 0;
      for (const sub of evaluatedSubmissions) {
        const matchingAssignment = allAssignments.find(
          (a: any) => a._id?.toString() === sub.assignmentId?.toString()
        );
        const maxMarks = matchingAssignment?.maxMarks || 100;
        const score = sub.marksObtained ?? (sub as any).score ?? 0;
        const percentage = maxMarks > 0 ? (score / maxMarks) * 100 : score;
        totalPercentageSum += percentage;
      }
      avgScore = Math.round(totalPercentageSum / evaluatedSubmissions.length);
    }

    const assessmentSummary = {
      total: allAssignments.length,
      submitted: submissions.length,
      pending: Math.max(0, allAssignments.length - submissions.length),
      evaluated: evaluatedSubmissions.length,
      averageScore: avgScore,
    };

    const pendingAssignmentsList = activeAssignments.slice(0, 4).map((a: any) => {
      const sub = submissions.find((s: any) => s.assignmentId?.toString() === a._id?.toString());
      return {
        _id: a._id.toString(),
        title: a.title,
        subject: a.subject,
        dueDate: a.dueDate,
        maxMarks: a.maxMarks,
        status: sub ? sub.status : "PENDING",
        marksObtained: sub?.marksObtained,
        feedback: sub?.feedback,
      };
    });

    // ── UPCOMING SCHEDULE ──
    const upcomingSchedule: any[] = [];

    // 1. Live sessions scheduled for today or upcoming dates
    for (const cls of upcomingClasses) {
      let day = String(now.getDate()).padStart(2, "0");
      let month = "SEPT";
      if (cls.date) {
        try {
          const d = new Date(cls.date);
          day = String(d.getDate()).padStart(2, "0");
          month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(d).toUpperCase();
        } catch {}
      }
      upcomingSchedule.push({
        id: `session-${cls._id}`,
        day,
        month,
        title: `${cls.subject} : ${cls.topic || cls.title}`,
        type: cls.status === "LIVE" ? "Live Class" : "Live Class",
        dotColor: "bg-purple-600",
        textColor: "text-purple-600 dark:text-purple-400",
        link: "/student/classes",
        timestamp: new Date(cls.date + (cls.startTime ? `T${cls.startTime}:00` : "T00:00:00")).getTime(),
      });
    }

    // 2. Pending assignments due soon
    for (const asgn of activeAssignments) {
      const isSubmitted = submissionMap.has(asgn._id.toString());
      if (!isSubmitted && asgn.dueDate) {
        const d = new Date(asgn.dueDate);
        const day = String(d.getDate()).padStart(2, "0");
        const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(d).toUpperCase();
        upcomingSchedule.push({
          id: `asgn-${asgn._id}`,
          day,
          month,
          title: `${asgn.subject} : ${asgn.title}`,
          type: "Assignments",
          dotColor: "bg-pink-500",
          textColor: "text-pink-500 dark:text-pink-400",
          link: "/student/assignments",
          timestamp: d.getTime(),
        });
      }
    }

    // 3. Pending tests
    for (const tst of testTasks) {
      const isSubmitted = submissionMap.has(tst._id.toString());
      if (!isSubmitted) {
        const targetDate = tst.testDate || tst.dueDate;
        if (targetDate) {
          const d = new Date(targetDate);
          const day = String(d.getDate()).padStart(2, "0");
          const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(d).toUpperCase();
          upcomingSchedule.push({
            id: `test-${tst._id}`,
            day,
            month,
            title: `${tst.subject} : ${tst.title}`,
            type: "Test",
            dotColor: "bg-emerald-500",
            textColor: "text-emerald-500 dark:text-emerald-400",
            link: "/student/assignments",
            timestamp: d.getTime(),
          });
        }
      }
    }

    // 4. Recent revision / study materials
    for (const mat of allMaterials.slice(0, 3)) {
      const d = mat.createdAt ? new Date(mat.createdAt) : new Date();
      const day = String(d.getDate()).padStart(2, "0");
      const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(d).toUpperCase();
      upcomingSchedule.push({
        id: `mat-${mat._id}`,
        day,
        month,
        title: `${mat.subject} : ${mat.title}`,
        type: "Lessons",
        dotColor: "bg-amber-500",
        textColor: "text-amber-500 dark:text-amber-400",
        link: "/student/materials",
        timestamp: d.getTime(),
      });
    }

    // Sort by chronological order
    upcomingSchedule.sort((a, b) => a.timestamp - b.timestamp);

    // ── CALENDAR EVENTS & REASONS (LIVE DATA ONLY) ──
    // Key: YYYY-MM-DD -> Array of { type: string; title: string; status?: string; time?: string }
    const calendarEventsMap: Record<string, Array<{ type: string; title: string; status?: string; time?: string }>> = {};

    const addCalendarEvent = (dateStr: string, event: { type: string; title: string; status?: string; time?: string }) => {
      if (!dateStr) return;
      const key = dateStr.slice(0, 10);
      if (!calendarEventsMap[key]) {
        calendarEventsMap[key] = [];
      }
      calendarEventsMap[key].push(event);
    };

    // 1. Attendance records marked by faculty
    for (const att of attendanceRecords) {
      const sess = typeof att.sessionId === "object" ? (att.sessionId as any) : null;
      const dStr = (att as any).date || sess?.date || (att.createdAt ? new Date(att.createdAt).toISOString().split("T")[0] : null);
      if (dStr) {
        addCalendarEvent(dStr, {
          type: "ATTENDANCE",
          title: sess?.subject ? `${sess.subject} Class` : "Academic Session",
          status: att.status || "PRESENT",
          time: sess?.startTime ? `${sess.startTime} - ${sess.endTime}` : undefined,
        });
      }
    }

    // 2. Real scheduled classes
    for (const cls of upcomingClasses) {
      if (cls.date) {
        addCalendarEvent(cls.date, {
          type: "CLASS",
          title: `${cls.subject}: ${cls.topic || cls.title}`,
          status: cls.status,
          time: `${cls.startTime || ""} - ${cls.endTime || ""}`,
        });
      }
    }

    // 3. Real assignments & tests
    for (const asgn of allAssignments) {
      const targetDate = asgn.dueDate || asgn.testDate;
      if (targetDate) {
        try {
          const dStr = new Date(targetDate).toISOString().split("T")[0];
          addCalendarEvent(dStr, {
            type: asgn.type === "TEST" ? "TEST" : "ASSIGNMENT",
            title: `${asgn.subject}: ${asgn.title}`,
          });
        } catch {}
      }
    }

    // Daily Attendance Records formatted for Student Dashboard
    const dailyAttendanceLogs = attendanceRecords.slice(0, 20).map((att: any) => {
      const sess = typeof att.sessionId === "object" ? (att.sessionId as any) : null;
      const dStr = att.date || sess?.date || (att.createdAt ? new Date(att.createdAt).toISOString().split("T")[0] : "");
      return {
        _id: att._id?.toString(),
        date: dStr,
        status: att.status || "PRESENT",
        subject: sess?.subject || "Core Academics",
        topic: sess?.topic || sess?.title || "Daily Lecture",
        time: sess?.startTime ? `${sess.startTime} - ${sess.endTime}` : "Batch Slot",
      };
    });

    const activeCalendarDays = Object.keys(calendarEventsMap)
      .filter((dateStr) => {
        const parts = dateStr.split("-");
        const yr = parseInt(parts[0], 10);
        const mo = parseInt(parts[1], 10) - 1;
        return yr === now.getFullYear() && mo === now.getMonth();
      })
      .map((dateStr) => parseInt(dateStr.split("-")[2], 10));

    let assignedStudentId = profile?.studentId;
    if (!assignedStudentId) {
      const allStudents = await StudentProfile.find().sort({ createdAt: 1 }).select("_id userId").lean();
      const idx = allStudents.findIndex(
        (s: any) => s.userId?.toString() === session.userId || s._id?.toString() === profile?._id?.toString()
      );
      assignedStudentId = `STD_${String(idx >= 0 ? idx + 1 : 1).padStart(3, "0")}`;
      if (profile?._id) {
        await StudentProfile.findByIdAndUpdate(profile._id, { studentId: assignedStudentId });
      }
    }

    return NextResponse.json(
      {
        student: {
          id: session.userId,
          studentId: assignedStudentId,
          name: user?.name || session.name || "Student",
          email: user?.email || session.email || "student@mantif.edu",
          phone: user?.phone || profile?.parentPhone || "",
          classLevel: currentClass,
          board: board,
          schoolName: profile.schoolName || "",
          batch: profile.batchId,
          streakCount: profile.streakCount ?? 0,
          earnedBadges: profile.earnedBadges || [],
          attendancePercentage,
          totalAttended,
          totalSessions,
        },
        feeStatus,
        currentDay: currentDayName,
        todayClasses: dbTodayClasses,
        hasCreatedClass: dbTodayClasses.length > 0,
        upcomingClasses,
        assessmentSummary,
        pendingAssignments: pendingAssignmentsList,
        recentMaterials: allMaterials.slice(0, 8),
        unreadNotifications,

        // Live Dynamic Project Data
        subjects,
        courses,
        activeCourse,
        statusCounts: {
          totalLessons: totalLessonsCount,
          completedLessons: completedLessonsCount,
          lessonsPercentage,
          totalAssignments: totalAssignmentsCount,
          completedAssignments: completedAssignmentsCount,
          assignmentsPercentage,
          totalTests: totalTestsCount,
          completedTests: completedTestsCount,
          testsPercentage,
        },
        upcomingSchedule: upcomingSchedule.slice(0, 6),
        calendarHighlights: Array.from(activeCalendarDays),
        calendarEvents: calendarEventsMap,
        dailyAttendance: dailyAttendanceLogs,
        attendanceStats: {
          totalSessions,
          totalAttended,
          attendancePercentage,
        },
      },
      {
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      }
    );
  } catch (error: any) {
    console.error("Student Dashboard API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

