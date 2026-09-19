"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  CheckCircle2,
  BookOpen,
  CalendarCheck2,
  Mail,
  Phone,
  School,
  ShieldCheck,
  Clock,
  GraduationCap,
  ArrowRight,
  Video,
  FileCheck,
  Award,
  Copy,
  Check,
  Radio,
  ChevronRight,
} from "lucide-react";
import { useFastFetch } from "@/lib/api-cache";
import { formatStudentId } from "@/lib/id-generator";
import { StudentTrialCountdownBanner } from "@/components/student/StudentTrialCountdownBanner";

export default function StudentDashboardPage() {
  const { data: authData } = useFastFetch("/api/auth/me");
  const { data } = useFastFetch<any>("/api/student/dashboard", undefined, { pollIntervalMs: 3000 });
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

  // Real today's sessions from API
  const todayClasses = data?.todayClasses || [];
  const activeOrUpcomingClass = todayClasses.find((c: any) => c.status === "LIVE") || todayClasses[0];
  const isClassLiveNow = activeOrUpcomingClass?.status === "LIVE";

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

  // Curated Opted Subjects for Student's Curriculum
  const optedSubjects = [
    {
      name: "Mathematics",
      code: "MATH-10",
      color: "from-blue-600 to-indigo-600",
      lightBg: "bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800",
      accentBorder: "border-blue-500/20 hover:border-blue-500/40",
      topic: "Core Board Curriculum, Trigonometry, Quadratic Equations & NCERT Solutions",
      schedule: batchName,
      faculty: "Assigned Faculty Specialist",
    },
    {
      name: "Science (Physics, Chemistry & Biology)",
      code: "SCI-10",
      color: "from-emerald-600 to-teal-600",
      lightBg: "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
      accentBorder: "border-emerald-500/20 hover:border-emerald-500/40",
      topic: "Conceptual Theory, Chemical Reactions, Optics, Genetics & Lab Practicals",
      schedule: batchName,
      faculty: "Assigned Faculty Specialist",
    },
    {
      name: "English & Social Studies",
      code: "ENG-10",
      color: "from-amber-600 to-orange-600",
      lightBg: "bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800",
      accentBorder: "border-amber-500/20 hover:border-amber-500/40",
      topic: "Grammar, Reading Comprehension, Indian History, Civics & Analytical Writing",
      schedule: batchName,
      faculty: "Assigned Faculty Specialist",
    },
  ];

  return (
    <main className="w-full max-w-7xl mx-auto px-3.5 py-4 sm:p-6 lg:p-8 space-y-5 sm:space-y-8 animate-in fade-in duration-200 select-none">
      
      {/* ── 1. HERO BANNER WITH PROFESSIONAL QUICK-ACTION BUTTONS ── */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#002137] via-[#002d4b] to-[#001726] text-white p-4 sm:p-6 lg:p-8 shadow-lg border border-slate-700/40">
        {/* Subtle Background Glow Orbs */}
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#004b79]/30 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-[#dfb74a]/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5 sm:gap-6">
          {/* Left: Student Identity & Badges */}
          <div className="space-y-2.5 sm:space-y-3">
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold bg-[#dfb74a]/20 text-[#dfb74a] border border-[#dfb74a]/30 backdrop-blur-xs">
                <GraduationCap className="w-3.5 h-3.5 shrink-0" />
                <span>Academic Year 2026–27</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-white/10 text-slate-200 border border-white/15 backdrop-blur-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span>Active Student Portal</span>
              </span>
            </div>

            <div>
              <h1 className="text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white break-words">
                Welcome back, {safeName}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 font-medium flex items-center gap-1.5 sm:gap-2 flex-wrap">
                <span className="font-semibold text-white">{classLevel}</span>
                <span className="text-slate-400">•</span>
                <span>{board.toLowerCase().includes("board") ? board : `${board} Board`}</span>
                <span className="text-slate-400">•</span>
                <span className="text-[#dfb74a] font-mono">{batchName}</span>
              </p>
            </div>
          </div>

          {/* Right: Date Badge & Single Primary Action */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-2.5 sm:gap-3 w-full lg:w-auto shrink-0">
            <div className="inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md text-xs sm:text-sm text-slate-200 font-semibold shadow-xs">
              <Calendar className="w-4 h-4 text-[#dfb74a] shrink-0" />
              <span className="truncate">{todayFormatted}</span>
            </div>

            <Link
              href="/student/classes"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#dfb74a] to-[#c9a33e] text-[#002137] font-extrabold text-xs sm:text-sm shadow-sm hover:shadow-md hover:brightness-105 active:scale-95 transition-all cursor-pointer group"
            >
              <Video className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />
              <span>Enter Live Classroom</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform shrink-0" />
            </Link>

            {isTrialActive && (
              <div className="w-full">
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
      </div>

      {/* ── 2. SPOTLIGHT: NEXT SCHEDULED CLASS / TIMETABLE WIDGET ── */}
      <div className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3 sm:gap-4 min-w-0 flex-1">
          <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-xs mt-0.5 sm:mt-0 ${
            isClassLiveNow 
              ? "bg-rose-50 dark:bg-rose-950/60 border border-rose-300 text-rose-600 animate-pulse" 
              : "bg-blue-50 dark:bg-blue-950/60 border border-blue-200 text-[#004b79] dark:text-[#dfb74a]"
          }`}>
            {isClassLiveNow ? <Radio className="w-5 h-5 sm:w-6 sm:h-6" /> : <Clock className="w-5 h-5 sm:w-6 sm:h-6" />}
          </div>
          <div className="space-y-0.5 min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">
                {isClassLiveNow ? "Session Now Live" : "Daily Academic Timetable"}
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                isClassLiveNow
                  ? "bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300 border border-rose-200"
                  : "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200"
              }`}>
                {isClassLiveNow ? "Live In Session" : "Regular Batch Schedule"}
              </span>
            </div>
            <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-slate-100 leading-snug break-words">
              {activeOrUpcomingClass?.subject 
                ? `${activeOrUpcomingClass.subject} — ${activeOrUpcomingClass.topic || "Core Curriculum"}`
                : `Assigned Batch: ${batchName}`}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {activeOrUpcomingClass?.startTime && activeOrUpcomingClass?.endTime
                ? `Today • ${activeOrUpcomingClass.startTime} to ${activeOrUpcomingClass.endTime} • Faculty: ${activeOrUpcomingClass.teacherId?.name || "Assigned Specialist"}`
                : `Monday through Saturday • Daily live batches with dedicated faculty mentorship`}
            </p>
          </div>
        </div>

        <Link
          href="/student/classes"
          className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-[#004b79] hover:text-white dark:hover:bg-[#004b79] text-slate-700 dark:text-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
        >
          <span>View Full Schedule</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* ── 1 WEEK REMAINING DURATION ALERT CARD (IF EXPIRING SOON) ── */}
      {isExpiringSoon && (
        <div className="relative overflow-hidden p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/[0.08] via-amber-500/[0.04] to-transparent dark:from-amber-950/40 dark:via-slate-900/60 dark:to-slate-900/40 border border-amber-500/30 dark:border-amber-500/25 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5 sm:gap-4 transition-all animate-in fade-in duration-200">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600" />
          <div className="flex items-start sm:items-center gap-3 pr-0 min-w-0 flex-1">
            <div className="relative w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-300/80 dark:border-amber-800 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 shadow-xs mt-0.5 sm:mt-0">
              <Clock className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div className="space-y-0.5 min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100">
                  Monthly Tuition · {remainingDays} Day{remainingDays === 1 ? "" : "s"} Remaining
                </h3>
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 shadow-xs">
                  Renewal Due Soon
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Your current monthly tuition coverage is active until{" "}
                {coverageExpiryDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto shrink-0 justify-end">
            <Link
              href="/student/fees"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#004b79] hover:bg-[#003b60] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs hover:shadow-md active:scale-95 cursor-pointer"
            >
              <span>View Tuition &amp; Fees</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}

      {/* ── 2. ACADEMIC VITAL METRICS (PROFESSIONAL ELEVATED CARDS WITH PROGRESS & ACTIONS) ── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between pb-1">
          <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Academic Vital Metrics
          </h2>
          <span className="text-[11px] sm:text-xs font-semibold text-slate-400">Real-Time Performance</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 lg:gap-6">
          
          {/* Metric 1: Attendance Turnout */}
          <div className="relative overflow-hidden p-4 sm:p-6 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-3.5 sm:space-y-4">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-emerald-500" />
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/70 dark:border-indigo-800/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shadow-2xs">
                  <CalendarCheck2 className="w-5 h-5" />
                </div>
                <span
                  className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                    attendancePercentage >= 75
                      ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
                      : "bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800"
                  }`}
                >
                  {attendancePercentage >= 75 ? "Optimal Turnout" : "Below 75%"}
                </span>
              </div>

              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                  Attendance Turnout
                </span>
                <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight mt-0.5 font-mono">
                  {attendancePercentage}%
                </p>
              </div>

              {/* Progress bar */}
              <div className="space-y-1">
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-500"
                    style={{ width: `${Math.min(100, Math.max(0, attendancePercentage))}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  {totalSessions > 0
                    ? `${totalAttended} of ${totalSessions} Live Sessions Attended`
                    : "No classes marked yet"}
                </p>
              </div>
            </div>

            <Link
              href="/student/attendance"
              className="pt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs font-bold text-[#004b79] dark:text-[#dfb74a] hover:underline flex items-center justify-between group cursor-pointer"
            >
              <span>View Attendance Logs</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Metric 2: Assigned Tasks */}
          <div className="relative overflow-hidden p-4 sm:p-6 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-3.5 sm:space-y-4">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-indigo-500" />
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200/70 dark:border-purple-800/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shadow-2xs">
                  <FileCheck className="w-5 h-5" />
                </div>
                <span
                  className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                    assessments.pending === 0
                      ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
                      : "bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800"
                  }`}
                >
                  {assessments.pending === 0 ? "Up to date" : `${assessments.pending} Pending`}
                </span>
              </div>

              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                  Homework &amp; Assignments
                </span>
                <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight mt-0.5 font-mono">
                  {assessments.total}
                </p>
              </div>

              {/* Progress indicator */}
              <div className="space-y-1">
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-500"
                    style={{
                      width: `${assessments.total > 0 ? Math.round((assessments.submitted / assessments.total) * 100) : 0}%`,
                    }}
                  />
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  {assessments.submitted} Submitted • {assessments.evaluated} Graded by Faculty
                </p>
              </div>
            </div>

            <Link
              href="/student/assignments"
              className="pt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline flex items-center justify-between group cursor-pointer"
            >
              <span>Open Task Manager</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Metric 3: Academic Average */}
          <div className="relative overflow-hidden p-4 sm:p-6 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-3.5 sm:space-y-4">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#dfb74a] to-amber-500" />
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200/70 dark:border-amber-800/60 text-amber-600 dark:text-[#dfb74a] flex items-center justify-center shadow-2xs">
                  <Award className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-[#dfb74a] border border-amber-200 dark:border-amber-800">
                  Cumulative Score
                </span>
              </div>

              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                  Academic Average
                </span>
                <p className="text-2xl sm:text-3xl font-black text-amber-600 dark:text-[#dfb74a] tracking-tight mt-0.5 font-mono">
                  {assessments.averageScore !== null && assessments.averageScore !== undefined
                    ? `${assessments.averageScore}%`
                    : "—"}
                </p>
              </div>

              {/* Score bar */}
              <div className="space-y-1">
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#dfb74a] to-amber-500 transition-all duration-500"
                    style={{
                      width: `${assessments.averageScore !== null && assessments.averageScore !== undefined ? Math.min(100, Math.max(0, assessments.averageScore)) : 0}%`,
                    }}
                  />
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  {assessments.evaluated > 0
                    ? `Evaluated across ${assessments.evaluated} graded task${assessments.evaluated === 1 ? "" : "s"}`
                    : "Awaiting first test evaluation"}
                </p>
              </div>
            </div>

            <Link
              href="/student/performance"
              className="pt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs font-bold text-amber-700 dark:text-[#dfb74a] hover:underline flex items-center justify-between group cursor-pointer"
            >
              <span>Academic Analytics</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>
      </div>

      {/* ── 3. MAIN CONTENT: OPTED SUBJECTS & VERIFIED CREDENTIALS ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 items-start">
        
        {/* ── LEFT: STUDENT OPTED COURSES (7 COLS) ── */}
        <div className="lg:col-span-7 space-y-3.5 sm:space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#004b79] dark:text-[#dfb74a] shrink-0" />
              <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                Enrolled Courses &amp; Curriculum Hub
              </h2>
            </div>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 shrink-0">
              3 Subjects
            </span>
          </div>

          <div className="space-y-3 sm:space-y-3.5">
            {optedSubjects.map((sub, idx) => (
              <div
                key={idx}
                className={`p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900/80 border ${sub.accentBorder} shadow-xs hover:shadow-md transition-all space-y-3`}
              >
                <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-1.5 xs:gap-2">
                  <div className="flex items-center gap-2 flex-wrap min-w-0">
                    <div className="w-2 h-2 rounded-full bg-[#004b79] dark:bg-[#dfb74a] shrink-0" />
                    <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-slate-100 truncate">
                      {sub.name}
                    </h3>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border shrink-0 ${sub.lightBg}`}>
                      {sub.code}
                    </span>
                  </div>
                  <span className="text-[11px] sm:text-xs font-mono font-bold text-[#004b79] dark:text-[#dfb74a] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 w-fit shrink-0">
                    {sub.schedule}
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  <span className="font-bold text-slate-700 dark:text-slate-200">Curriculum Scope:</span> {sub.topic}
                </p>

                <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/80 text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1.5 truncate">
                    <GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{sub.faculty}</span>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Enrolled &amp; Active
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: STUDENT DETAILS & CREDENTIALS DOSSIER (5 COLS) ── */}
        <div className="lg:col-span-5 space-y-3.5 sm:space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                Student Verification Dossier
              </h2>
            </div>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Verified Active
            </span>
          </div>

          {/* Profile Identity Card */}
          <div className="relative overflow-hidden p-4 sm:p-6 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4 sm:space-y-5">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#002137] via-[#004b79] to-[#dfb74a]" />
            
            {/* Avatar & Key ID Info */}
            <div className="flex items-center gap-3 sm:gap-4 pb-3 sm:pb-4 border-b border-slate-100 dark:border-slate-800 min-w-0">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#002137] text-white flex items-center justify-center font-extrabold text-lg sm:text-xl shadow-md ring-4 ring-slate-100 dark:ring-slate-800 shrink-0">
                {safeName.charAt(0).toUpperCase()}
              </div>
              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex items-center gap-1.5 min-w-0">
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-slate-100 truncate">
                    {safeName}
                  </h3>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[11px] sm:text-xs font-mono font-bold text-[#004b79] dark:text-[#dfb74a] bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-md border border-blue-200 dark:border-blue-800/60 truncate">
                    {studentId}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyId}
                    title="Copy Student ID"
                    className="p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  {copiedId && <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 animate-in fade-in">Copied!</span>}
                </div>
              </div>
            </div>

            {/* Data Table */}
            <div className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm">
              <div className="flex items-center justify-between gap-2 py-1.5 border-b border-slate-100 dark:border-slate-800/60">
                <span className="text-slate-500 dark:text-slate-400 flex items-center gap-2 font-medium shrink-0">
                  <GraduationCap className="w-4 h-4 text-slate-400 shrink-0" />
                  Academic Level
                </span>
                <span className="font-bold text-slate-900 dark:text-slate-100 text-right truncate">
                  {classLevel} ({board})
                </span>
              </div>

              <div className="flex items-center justify-between gap-2 py-1.5 border-b border-slate-100 dark:border-slate-800/60">
                <span className="text-slate-500 dark:text-slate-400 flex items-center gap-2 font-medium shrink-0">
                  <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                  Batch Allocation
                </span>
                <span className="font-semibold text-slate-900 dark:text-slate-100 font-mono text-right truncate">
                  {batchName}
                </span>
              </div>

              <div className="flex items-center justify-between gap-2 py-1.5 border-b border-slate-100 dark:border-slate-800/60">
                <span className="text-slate-500 dark:text-slate-400 flex items-center gap-2 font-medium shrink-0">
                  <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                  Student Email
                </span>
                <span className="font-mono text-xs text-slate-700 dark:text-slate-300 text-right truncate flex-1 min-w-0 pl-2">
                  {studentEmail}
                </span>
              </div>

              <div className="flex items-center justify-between gap-2 py-1.5 border-b border-slate-100 dark:border-slate-800/60">
                <span className="text-slate-500 dark:text-slate-400 flex items-center gap-2 font-medium shrink-0">
                  <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                  Parent Phone
                </span>
                <span className="font-mono text-slate-700 dark:text-slate-300 text-right truncate flex-1 min-w-0 pl-2">
                  {studentPhone}
                </span>
              </div>

              <div className="flex items-center justify-between gap-2 py-1.5">
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
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
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
