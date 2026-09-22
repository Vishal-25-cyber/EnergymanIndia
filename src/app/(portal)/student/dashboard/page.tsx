"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  CheckCircle2,
  BookOpen,
  Mail,
  Phone,
  School,
  ShieldCheck,
  Clock,
  GraduationCap,
  ArrowRight,
  Copy,
  Check,
  FileCheck,
  Award,
} from "lucide-react";
import { useFastFetch } from "@/lib/api-cache";
import { formatStudentId } from "@/lib/id-generator";
import { StudentTrialCountdownBanner } from "@/components/student/StudentTrialCountdownBanner";


export default function StudentDashboardPage() {
  const { data: authData } = useFastFetch("/api/auth/me");
  const { data } = useFastFetch<any>("/api/student/dashboard", undefined, { pollIntervalMs: 3000 });
  const { data: classesData } = useFastFetch<any>("/api/student/classes", undefined, { pollIntervalMs: 3000 });
  const { data: paymentData } = useFastFetch("/api/student/payments");

  const [copiedId, setCopiedId] = useState(false);

  const authUser = authData?.user;
  const trial = authUser?.trial;
  const hasPaid = !!trial?.hasPaid || !!paymentData?.history?.length || !!data?.feeStatus?.isPaid;
  const isTrialActive = !hasPaid && !!trial?.isTrialActive;
  const student = data?.student;

  // 1-Month (30 Days) Tuition Duration & Expiry Calculation
  const latestPaid = paymentData?.history?.[0];
  const paidDateRaw = latestPaid?.paidDate || latestPaid?.createdAt;
  const baseDate = paidDateRaw ? new Date(paidDateRaw) : new Date();
  const coverageExpiryDate = new Date(baseDate.getTime() + 30 * 24 * 60 * 60 * 1000);
  const now = new Date();
  const diffCoverageMs = coverageExpiryDate.getTime() - now.getTime();
  const remainingDays = Math.max(0, Math.ceil(diffCoverageMs / (1000 * 60 * 60 * 24)));

  // Show duration remaining alert during the last 1 week (7 days) before month ends
  const isExpiringSoon = hasPaid && remainingDays <= 7 && remainingDays > 0;

  const rawName = student?.name || (authUser?.role === "STUDENT" ? authUser?.name : null) || "Student";
  const safeName = typeof rawName === "string" && rawName.trim() ? rawName : "Student";
  const classLevel = student?.classLevel || authUser?.profile?.currentClass || "Class 10";
  const board = student?.board || authUser?.profile?.board || "State Board";
  const batch = student?.batch || authUser?.profile?.batchId;
  const batchName = batch?.name || (typeof batch === "string" ? batch : "Assigned Batch");
  const studentId = student?.studentId
    ? (student.studentId.startsWith("#") ? student.studentId : `#${student.studentId}`)
    : (student?.id || authUser?._id ? `#${formatStudentId(student?.id || authUser?._id)}` : "#STD_001");
  const studentEmail = student?.email || authUser?.email || "—";
  const studentPhone = student?.phone || authUser?.phone || "—";
  const schoolName = student?.schoolName || (authUser?.profile as any)?.schoolName || "—";

  // Real strictly computed attendance values
  const totalSessions = student?.totalSessions ?? 0;
  const totalAttended = student?.totalAttended ?? 0;
  const attendancePercentage = student?.attendancePercentage ?? (totalSessions > 0 ? Math.round((totalAttended / totalSessions) * 100) : 100);

  // Real assessment summary stats
  const assessments = data?.assessmentSummary || {
    total: 0,
    submitted: 0,
    pending: 0,
    evaluated: 0,
    averageScore: null,
  };

  const todayFormatted = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  const handleCopyId = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(studentId.replace("#", ""));
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  const assignedTeacherName = classesData?.weeklySchedule?.[0]?.faculty || "Sharva Karunya";

  // Curated Opted Subjects for Student's Curriculum
  const optedSubjects = [
    {
      name: "Mathematics",
      code: "MATH-10",
      topic: "Core Board Curriculum, Trigonometry, Quadratic Equations & NCERT Solutions",
      schedule: batchName,
      faculty: assignedTeacherName,
    },
    {
      name: "Science (Physics, Chemistry & Biology)",
      code: "SCI-10",
      topic: "Conceptual Theory, Chemical Reactions, Optics, Genetics & Lab Practicals",
      schedule: batchName,
      faculty: assignedTeacherName,
    },
    {
      name: "English & Social Studies",
      code: "ENG-10",
      topic: "Grammar, Reading Comprehension, Indian History, Civics & Analytical Writing",
      schedule: batchName,
      faculty: assignedTeacherName,
    },
  ];

  return (
    <main className="w-full max-w-7xl mx-auto px-4 py-5 sm:px-6 sm:py-8 lg:px-8 space-y-8 animate-in fade-in duration-200 select-none">

      {/* ── 1. HEADER & IDENTITY (CARDLESS MASTHEAD) ── */}
      <div className="pb-6 border-b border-slate-200 dark:border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#b89047]/10 text-[#8f6d2b] dark:text-[#dfb74a] border border-[#b89047]/20">
              <GraduationCap className="w-3.5 h-3.5 shrink-0" />
              <span>Academic Year 2026–27</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/60">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span>Active Student Portal</span>
            </span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
              Welcome back, {safeName}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-slate-800 dark:text-slate-200">{classLevel}</span>
              <span className="text-slate-300 dark:text-slate-600">•</span>
              <span>{board.toLowerCase().includes("board") ? board : `${board} Board`}</span>
              <span className="text-slate-300 dark:text-slate-600">•</span>
              <span className="text-[#004b79] dark:text-[#dfb74a] font-mono font-semibold">{batchName}</span>
            </p>
          </div>
        </div>

        {/* Date & Countdown */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-2.5 shrink-0">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-semibold">
            <Calendar className="w-4 h-4 text-slate-400 dark:text-[#dfb74a] shrink-0" />
            <span>{todayFormatted}</span>
          </div>

          {isTrialActive && (
            <div className="py-1 px-2.5 rounded-lg bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/50">
              <StudentTrialCountdownBanner
                trialEndsAt={trial?.trialEndsAt}
                trialStartDate={trial?.trialStartDate}
                remainingHours={trial?.remainingHours}
                studentName={safeName}
                onExpire={() => {
                  window.location.reload();
                }}
              />
            </div>
          )}
        </div>
      </div>


      {/* ── 1 WEEK REMAINING DURATION ALERT (CARDLESS) ── */}
      {isExpiringSoon && (
        <div className="py-3 px-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition-all">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <div className="text-xs">
              <span className="font-bold text-slate-900 dark:text-slate-100">
                Monthly Tuition · {remainingDays} Day{remainingDays === 1 ? "" : "s"} Remaining:
              </span>{" "}
              <span className="text-slate-600 dark:text-slate-400">
                Active until {coverageExpiryDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}.
              </span>
            </div>
          </div>

          <Link
            href="/student/fees"
            className="text-xs font-bold text-[#004b79] dark:text-[#dfb74a] hover:underline flex items-center gap-1 shrink-0"
          >
            <span>Renew Tuition</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {/* ── 4. ACADEMIC VITAL METRICS (CARDLESS FLAT PERFORMANCE BAR) ── */}
      <div className="space-y-3 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Academic Vital Metrics
          </h2>
          <span className="text-[11px] font-medium text-slate-400">Real-Time Performance</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 dark:divide-slate-800 pt-2">

          {/* Metric 1: Attendance Turnout */}
          <div className="py-3 sm:py-0 sm:pr-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Attendance Turnout
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${attendancePercentage >= 75
                    ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
                    : "bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800"
                  }`}
              >
                {attendancePercentage >= 75 ? "Optimal" : "Below 75%"}
              </span>
            </div>

            <div>
              <p className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight font-mono">
                {attendancePercentage}%
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                {totalSessions > 0
                  ? `${totalAttended} of ${totalSessions} Live Sessions Attended`
                  : "No classes marked yet"}
              </p>
            </div>

            <Link
              href="/student/attendance"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#004b79] dark:text-[#dfb74a] hover:underline pt-1"
            >
              <span>View Attendance Logs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Metric 2: Assigned Tasks */}
          <div className="py-3 sm:py-0 sm:px-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Homework &amp; Assignments
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${assessments.pending === 0
                    ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
                    : "bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800"
                  }`}
              >
                {assessments.pending === 0 ? "Up to date" : `${assessments.pending} Pending`}
              </span>
            </div>

            <div>
              <p className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight font-mono">
                {assessments.total}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                {assessments.submitted} Submitted • {assessments.evaluated} Graded by Faculty
              </p>
            </div>

            <Link
              href="/student/assignments"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline pt-1"
            >
              <span>Open Task Manager</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Metric 3: Academic Average */}
          <div className="py-3 sm:py-0 sm:pl-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Academic Average
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-[#dfb74a] border border-amber-200 dark:border-amber-800">
                Cumulative Score
              </span>
            </div>

            <div>
              <p className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight font-mono">
                {assessments.averageScore !== null && assessments.averageScore !== undefined
                  ? `${assessments.averageScore}%`
                  : "—"}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                {assessments.evaluated > 0
                  ? `Evaluated across ${assessments.evaluated} graded task${assessments.evaluated === 1 ? "" : "s"}`
                  : "Awaiting first test evaluation"}
              </p>
            </div>

            <Link
              href="/student/performance"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-[#dfb74a] hover:underline pt-1"
            >
              <span>Academic Analytics</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </div>

      {/* ── 5. MAIN CONTENT: OPTED SUBJECTS & VERIFIED CREDENTIALS (CARDLESS) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* ── LEFT: STUDENT OPTED COURSES (7 COLS) ── */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#004b79] dark:text-[#dfb74a] shrink-0" />
              <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                Enrolled Courses &amp; Curriculum Hub
              </h2>
            </div>
            <span className="text-xs font-mono font-medium text-slate-400">
              3 Core Subjects
            </span>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {optedSubjects.map((sub, idx) => (
              <div key={idx} className="py-4 space-y-2 first:pt-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100">
                      {sub.name}
                    </h3>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {sub.code}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#004b79] dark:text-[#dfb74a]">
                    {sub.schedule}
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  <strong className="text-slate-700 dark:text-slate-300">Curriculum Scope:</strong> {sub.topic}
                </p>

                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1">
                  <div className="flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                    <span>{sub.faculty}</span>
                  </div>
                  <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Enrolled &amp; Active
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: STUDENT DETAILS & CREDENTIALS DOSSIER (5 COLS) ── */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                Student Verification Dossier
              </h2>
            </div>
            <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Verified Active
            </span>
          </div>

          <div className="space-y-4 pt-1">
            {/* Avatar & Key ID Info */}
            <div className="flex items-center gap-3 sm:gap-4 pb-3 border-b border-slate-100 dark:border-slate-800 min-w-0">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#002137] text-white flex items-center justify-center font-extrabold text-base sm:text-lg shrink-0 shadow-xs">
                {safeName.charAt(0).toUpperCase()}
              </div>
              <div className="space-y-0.5 min-w-0 flex-1">
                <div className="flex items-center gap-1.5 min-w-0">
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-slate-100 truncate">
                    {safeName}
                  </h3>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[11px] font-mono font-bold text-[#004b79] dark:text-[#dfb74a] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700 truncate">
                    {studentId}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyId}
                    title="Copy Student ID"
                    className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer"
                  >
                    {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  {copiedId && <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">Copied!</span>}
                </div>
              </div>
            </div>

            {/* Open Definition List */}
            <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs sm:text-sm">
              <div className="flex items-center justify-between gap-2 py-2">
                <span className="text-slate-500 dark:text-slate-400 flex items-center gap-2 font-medium shrink-0">
                  <GraduationCap className="w-4 h-4 text-slate-400 shrink-0" />
                  Academic Level
                </span>
                <span className="font-bold text-slate-900 dark:text-slate-100 text-right truncate">
                  {classLevel} ({board})
                </span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="text-slate-500 dark:text-slate-400 flex items-center gap-2 font-medium shrink-0">
                  <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                  Batch Allocation
                </span>
                <span className="font-mono font-semibold text-slate-900 dark:text-slate-100 text-right truncate">
                  {batchName}
                </span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="text-slate-500 dark:text-slate-400 flex items-center gap-2 font-medium shrink-0">
                  <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                  Student Email
                </span>
                <span className="font-mono text-xs text-slate-700 dark:text-slate-300 text-right truncate flex-1 min-w-0 pl-2">
                  {studentEmail}
                </span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="text-slate-500 dark:text-slate-400 flex items-center gap-2 font-medium shrink-0">
                  <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                  Parent Phone
                </span>
                <span className="font-mono text-slate-700 dark:text-slate-300 text-right truncate flex-1 min-w-0 pl-2">
                  {studentPhone}
                </span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="text-slate-500 dark:text-slate-400 flex items-center gap-2 font-medium shrink-0">
                  <School className="w-4 h-4 text-slate-400 shrink-0" />
                  School Affiliation
                </span>
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 text-right truncate flex-1 min-w-0 pl-2">
                  {schoolName}
                </span>
              </div>
            </div>

            {/* Verified Accreditation Seal */}
            <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                Official Credential
              </span>
              <span className="font-mono text-[10px] text-slate-400">
                MANTIF Verified
              </span>
            </div>
          </div>
        </div>

      </div>

    </main>
  );
}
