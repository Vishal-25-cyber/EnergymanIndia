"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  MessageSquare,
  Bell,
  ChevronDown,
  Play,
  BookOpen,
  FileCheck,
  Award,
  ChevronLeft,
  ChevronRight,
  FileText,
  Calendar as CalendarIcon,
  CheckCircle2,
  Copy,
  Check,
  Clock,
  ArrowRight,
  ShieldCheck,
  School,
  Mail,
  Phone,
  GraduationCap,
  ExternalLink,
} from "lucide-react";
import { useFastFetch } from "@/lib/api-cache";
import { formatStudentId } from "@/lib/id-generator";
import { StudentTrialCountdownBanner } from "@/components/student/StudentTrialCountdownBanner";
import { getSubjectsForClassAndBoard } from "@/lib/curriculum";

// ── CIRCULAR PROGRESS RING ──
function CircularProgressRing({
  percentage,
  strokeColor,
  trackColor = "rgba(0,0,0,0.05)",
  size = 56,
}: {
  percentage: number;
  strokeColor: string;
  trackColor?: string;
  size?: number;
}) {
  const strokeWidth = 5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const validPct = Math.min(100, Math.max(0, percentage));
  const strokeDashoffset = circumference - (validPct / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          className="fill-none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="fill-none transition-all duration-700 ease-out"
        />
      </svg>
      <span className="absolute text-[11px] font-black text-slate-700 dark:text-slate-200 font-mono">
        {validPct}%
      </span>
    </div>
  );
}

export default function StudentDashboardPage() {
  const { data: authData } = useFastFetch("/api/auth/me");
  const { data } = useFastFetch<any>("/api/student/dashboard", undefined, { pollIntervalMs: 4000 });
  const { data: paymentData } = useFastFetch("/api/student/payments");

  // Filter & Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [courseTab, setCourseTab] = useState<"ACTIVE" | "COMPLETED">("ACTIVE");
  const [copiedId, setCopiedId] = useState(false);
  const [showDossier, setShowDossier] = useState(false);

  // Calendar State
  const [currentMonthDate, setCurrentMonthDate] = useState(new Date());
  const [selectedCalendarDay, setSelectedCalendarDay] = useState<number | null>(new Date().getDate());

  const authUser = authData?.user;
  const trial = authUser?.trial;
  const hasPaid = !!trial?.hasPaid || !!paymentData?.history?.length || !!data?.feeStatus?.isPaid;
  const isTrialActive = !hasPaid && !!trial?.isTrialActive;
  const student = data?.student;

  const rawName = student?.name || (authUser?.role === "STUDENT" ? authUser?.name : null) || authUser?.name || "Student";
  const safeName = typeof rawName === "string" && rawName.trim() ? rawName : "Student";
  const classLevel = student?.classLevel || authUser?.profile?.currentClass || "Class 10";
  const board = student?.board || authUser?.profile?.board || "CBSE";
  const batch = student?.batch || authUser?.profile?.batchId;
  const batchName = batch?.name || (typeof batch === "string" ? batch : "Assigned Batch");
  const studentId = student?.studentId
    ? (student.studentId.startsWith("#") ? student.studentId : `#${student.studentId}`)
    : (student?.id || authUser?._id ? `#${formatStudentId(student?.id || authUser?._id)}` : "#STD_1001");
  const studentEmail = student?.email || authUser?.email || "student@mantif.com";
  const studentPhone = student?.phone || authUser?.phone || "—";
  const schoolName = student?.schoolName || (authUser?.profile as any)?.schoolName || "SSVS";

  // Tuition Expiry calculation
  const latestPaid = paymentData?.history?.[0];
  const paidDateRaw = latestPaid?.paidDate || latestPaid?.createdAt;
  const baseDate = paidDateRaw ? new Date(paidDateRaw) : new Date();
  const coverageExpiryDate = new Date(baseDate.getTime() + 30 * 24 * 60 * 60 * 1000);
  const now = new Date();
  const diffCoverageMs = coverageExpiryDate.getTime() - now.getTime();
  const remainingDays = Math.max(0, Math.ceil(diffCoverageMs / (1000 * 60 * 60 * 24)));
  const isExpiringSoon = hasPaid && remainingDays <= 7 && remainingDays > 0;

  // Real Strictly Calculated Counts from Live DB
  const assessments = data?.assessmentSummary || {
    total: 0,
    submitted: 0,
    pending: 0,
    evaluated: 0,
    averageScore: 0,
  };

  const totalLessons = data?.statusCounts?.totalLessons ?? (data?.materialsCount || 0);
  const completedLessons = data?.statusCounts?.completedLessons ?? (data?.completedMaterialsCount || 0);
  const lessonsPercentage = data?.statusCounts?.lessonsPercentage ?? (totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0);

  const totalAssignments = data?.statusCounts?.totalAssignments ?? (assessments.total || 0);
  const completedAssignments = data?.statusCounts?.completedAssignments ?? (assessments.submitted || 0);
  const assignmentsPercentage = data?.statusCounts?.assignmentsPercentage ?? (totalAssignments > 0 ? Math.round((completedAssignments / totalAssignments) * 100) : 0);

  const totalTests = data?.statusCounts?.totalTests ?? (data?.totalTestsCount || 0);
  const completedTests = data?.statusCounts?.completedTests ?? (data?.completedTestsCount || 0);
  const testsPercentage = data?.statusCounts?.testsPercentage ?? (totalTests > 0 ? Math.round((completedTests / totalTests) * 100) : 0);

  // Dynamic Curriculum Subjects for this student
  const academicSubjects = useMemo(() => {
    return getSubjectsForClassAndBoard(classLevel, board);
  }, [classLevel, board]);

  // Dynamic Courses List strictly from Live DB and Curriculum
  const allCourses = useMemo(() => {
    if (Array.isArray(data?.courses) && data.courses.length > 0) {
      return data.courses;
    }

    const palettes = [
      { gradient: "from-[#002137] via-[#0b3354] to-[#b89047]", barColor: "bg-gradient-to-r from-[#002137] to-[#b89047]" },
      { gradient: "from-emerald-500 via-teal-600 to-[#002137]", barColor: "bg-gradient-to-r from-emerald-500 to-teal-600" },
      { gradient: "from-[#b89047] via-amber-600 to-[#002137]", barColor: "bg-gradient-to-r from-[#b89047] to-amber-600" },
      { gradient: "from-slate-700 via-[#002137] to-[#b89047]", barColor: "bg-gradient-to-r from-[#002137] to-[#dfb74a]" },
    ];

    return academicSubjects.map((subj, idx) => {
      const p = palettes[idx % palettes.length];
      return {
        id: `course-${subj.toLowerCase().replace(/\s+/g, "-")}`,
        name: `${subj} : ${classLevel} ${board} Syllabus`,
        tag: `${classLevel} • ${board}`,
        subject: subj,
        progress: 0,
        lessons: 0,
        assignments: 0,
        tests: 0,
        gradient: p.gradient,
        barColor: p.barColor,
        isCompleted: false,
      };
    });
  }, [data?.courses, academicSubjects, classLevel, board]);

  const filteredCourses = useMemo(() => {
    return allCourses
      .filter((c: any) => (courseTab === "ACTIVE" ? !c.isCompleted : c.isCompleted))
      .filter((c: any) =>
        searchQuery.trim() === ""
          ? true
          : c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (c.tag && c.tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (c.subject && c.subject.toLowerCase().includes(searchQuery.toLowerCase()))
      );
  }, [allCourses, courseTab, searchQuery]);

  // Real Live Upcoming Schedule strictly from Database
  const upcomingItems = useMemo(() => {
    return Array.isArray(data?.upcomingSchedule) ? data.upcomingSchedule : [];
  }, [data?.upcomingSchedule]);

  // Selected Date Events for Live Calendar Details
  const selectedDateEvents = useMemo(() => {
    if (!selectedCalendarDay) return [];
    const yr = currentMonthDate.getFullYear();
    const mo = String(currentMonthDate.getMonth() + 1).padStart(2, "0");
    const dy = String(selectedCalendarDay).padStart(2, "0");
    const dateKey = `${yr}-${mo}-${dy}`;
    return data?.calendarEvents?.[dateKey] || [];
  }, [selectedCalendarDay, currentMonthDate, data?.calendarEvents]);

  // Calendar Days calculation
  const calendarDays = useMemo(() => {
    const year = currentMonthDate.getFullYear();
    const month = currentMonthDate.getMonth();
    const firstDayIndex = new Date(year, month, 1).getDay();
    // Monday as 0: (day + 6) % 7
    const adjustedFirstDay = (firstDayIndex + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days: (number | null)[] = [];
    for (let i = 0; i < adjustedFirstDay; i++) {
      days.push(null);
    }
    for (let d = 1; d <= daysInMonth; d++) {
      days.push(d);
    }
    return days;
  }, [currentMonthDate]);

  const handlePrevMonth = () => {
    setCurrentMonthDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonthDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const handleCopyId = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(studentId.replace("#", ""));
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#f8f9fd] dark:bg-[#070d18] text-slate-900 dark:text-slate-100 p-4 sm:p-6 lg:p-8 space-y-6">
      
      {/* ── TOP NAV BAR (MATCHING USER SCREENSHOT) ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-black text-[#1e1b4b] dark:text-white tracking-tight">
          Dashboard
        </h1>

        {/* Center Search Pill */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#002137] dark:text-[#dfb74a] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search here..."
            className="w-full pl-10 pr-4 py-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-200 placeholder-slate-400 shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#002137]/20 focus:border-[#002137] dark:focus:border-[#dfb74a] transition-all"
          />
        </div>

        {/* Right Tools: Messages, Notifications, Profile Chip */}
        <div className="flex items-center gap-3 self-end md:self-auto">
          {/* Messages */}
          <button
            type="button"
            className="w-9 h-9 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-500 hover:text-[#002137] dark:hover:text-[#dfb74a] flex items-center justify-center shadow-2xs hover:shadow-xs transition-all cursor-pointer"
            title="Messages"
          >
            <MessageSquare className="w-4 h-4" />
          </button>

          {/* Notifications with red dot */}
          <button
            type="button"
            className="relative w-9 h-9 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-500 hover:text-[#002137] dark:hover:text-[#dfb74a] flex items-center justify-center shadow-2xs hover:shadow-xs transition-all cursor-pointer"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900" />
          </button>

          {/* User Profile Chip */}
          <div
            onClick={() => setShowDossier(!showDossier)}
            className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs hover:shadow-xs cursor-pointer transition-all select-none"
            title="View Student Dossier"
          >
            <div className="w-8 h-8 rounded-full bg-[#002137] text-[#dfb74a] border border-[#b89047]/40 font-black text-xs flex items-center justify-center shadow-xs">
              {safeName.charAt(0).toUpperCase()}
            </div>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate max-w-[120px]">
              {safeName}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </div>
        </div>
      </div>

      {/* Trial Banner / Expiration Alert (if applicable) */}
      {isTrialActive ? (
        <div className="p-3 rounded-2xl bg-[#FFFDEB] dark:bg-amber-950/40 border border-[#FDE68A] dark:border-amber-800/60 shadow-xs">
          <StudentTrialCountdownBanner
            trialEndsAt={trial?.trialEndsAt}
            trialStartDate={trial?.trialStartDate}
            remainingHours={trial?.remainingHours}
            studentName={safeName}
            onExpire={() => window.location.reload()}
          />
        </div>
      ) : (
        <div className="py-2.5 px-4 rounded-2xl bg-[#FFFDEB] dark:bg-amber-950/40 border border-[#FDE68A] dark:border-amber-800/60 shadow-xs text-xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-[#8c6924] dark:text-amber-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <Clock className="w-3.5 h-3.5 text-[#8c6924] dark:text-amber-400 shrink-0" />
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              Live Academic Enrollment:
            </span>
            <span className="text-slate-600 dark:text-slate-400 font-medium">
              {classLevel} ({board}) • Batch {batchName} • Academic Year 2025–2026 Active
            </span>
          </div>
          <Link href="/student/classes" className="font-bold text-[#002137] dark:text-[#dfb74a] hover:underline flex items-center gap-1 shrink-0">
            <span>Classroom</span> <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {isExpiringSoon && (
        <div className="py-2.5 px-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-amber-900 dark:text-amber-200">
            <Clock className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>Monthly Tuition Renewal:</strong> {remainingDays} day{remainingDays === 1 ? "" : "s"} remaining before month cycle ends.
            </span>
          </div>
          <Link href="/student/fees" className="font-bold text-[#002137] dark:text-[#dfb74a] hover:underline flex items-center gap-1">
            <span>Renew</span> <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {/* ── MAIN 2-COLUMN GRID (LEFT ~70%, RIGHT ~30%) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ════ LEFT MAIN SECTION (8 COLS) ════ */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* 1. "STATUS" FOUR LARGE PASTEL STAT CARDS */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-black text-slate-800 dark:text-slate-100 tracking-tight">
                Academic Status
              </h2>
              <span className="text-xs font-semibold text-[#b89047] dark:text-[#dfb74a]">
                Live Real-time Metrics
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              
              {/* Card 1: Lessons (Warm Gold / Bronze Accent) */}
              <div className="bg-[#FFFBF2] dark:bg-[#1a150c] border border-amber-200/60 dark:border-amber-900/40 rounded-3xl p-5 shadow-xs flex flex-col justify-between gap-5 transition-all hover:shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-2xl bg-[#b89047] text-white flex items-center justify-center shadow-xs">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <CircularProgressRing
                    percentage={lessonsPercentage}
                    strokeColor="#dfb74a"
                    trackColor="rgba(223, 183, 74, 0.16)"
                  />
                </div>

                <div>
                  <p className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-mono tracking-tight">
                    {completedLessons}
                  </p>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">
                    Lessons
                  </p>
                  <p className="text-xs text-[#002137] dark:text-[#dfb74a] font-semibold mt-0.5">
                    of {totalLessons} completed
                  </p>
                </div>
              </div>

              {/* Card 2: Assignments (Logo Brand Primary Navy Blue) */}
              <div className="bg-[#F0F6FA] dark:bg-[#071926] border border-blue-200/60 dark:border-blue-900/40 rounded-3xl p-5 shadow-xs flex flex-col justify-between gap-5 transition-all hover:shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-2xl bg-[#004b79] text-white flex items-center justify-center shadow-xs">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <CircularProgressRing
                    percentage={assignmentsPercentage}
                    strokeColor="#004b79"
                    trackColor="rgba(0, 75, 121, 0.15)"
                  />
                </div>

                <div>
                  <p className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-mono tracking-tight">
                    {completedAssignments.toString().padStart(2, "0")}
                  </p>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">
                    Assignments
                  </p>
                  <p className="text-xs text-[#002137] dark:text-[#dfb74a] font-semibold mt-0.5">
                    of {totalAssignments} completed
                  </p>
                </div>
              </div>

              {/* Card 3: Tests (Deep Brand Royal Navy & Gold) */}
              <div className="bg-[#F4F8FB] dark:bg-[#091a27] border border-blue-100 dark:border-blue-900/30 rounded-3xl p-5 shadow-xs flex flex-col justify-between gap-5 transition-all hover:shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-2xl bg-[#002b48] text-[#dfb74a] flex items-center justify-center shadow-xs">
                    <Award className="w-5 h-5" />
                  </div>
                  <CircularProgressRing
                    percentage={testsPercentage}
                    strokeColor="#00385c"
                    trackColor="rgba(0, 56, 92, 0.15)"
                  />
                </div>

                <div>
                  <p className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-mono tracking-tight">
                    {completedTests.toString().padStart(2, "0")}
                  </p>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">
                    Tests
                  </p>
                  <p className="text-xs text-[#002137] dark:text-[#dfb74a] font-semibold mt-0.5">
                    of {totalTests} completed
                  </p>
                </div>
              </div>

              {/* Card 4: Attendance (Mantif Logo Navy & Gold) */}
              <div className="bg-[#f0f5fa] dark:bg-[#051827] border border-[#b89047]/30 dark:border-[#b89047]/20 rounded-3xl p-5 shadow-xs flex flex-col justify-between gap-5 transition-all hover:shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-2xl bg-[#002137] text-[#dfb74a] flex items-center justify-center shadow-xs">
                    <CheckCircle2 className="w-5 h-5 text-[#dfb74a]" />
                  </div>
                  <CircularProgressRing
                    percentage={data?.student?.attendancePercentage ?? 100}
                    strokeColor="#b89047"
                    trackColor="rgba(184, 144, 71, 0.15)"
                  />
                </div>

                <div>
                  <p className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-mono tracking-tight">
                    {data?.student?.attendancePercentage ?? 100}%
                  </p>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">
                    Attendance
                  </p>
                  <Link
                    href="/student/attendance"
                    className="text-xs text-[#8f6d2b] dark:text-[#dfb74a] font-bold mt-0.5 hover:underline flex items-center gap-1"
                  >
                    <span>{data?.student?.totalAttended ?? 0} of {data?.student?.totalSessions ?? 0} attended</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

            </div>
          </div>

          {/* 3. "MY COURSES" SECTION & TABLE */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-black text-slate-800 dark:text-slate-100 tracking-tight">
                My Courses
              </h2>

              {/* Active vs Completed Toggle */}
              <div className="flex items-center p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setCourseTab("ACTIVE")}
                  className={`px-3 py-1 rounded-xl transition-all cursor-pointer ${
                    courseTab === "ACTIVE"
                      ? "bg-[#002137] text-[#dfb74a] shadow-xs font-bold border border-[#b89047]/30"
                      : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                  }`}
                >
                  Active
                </button>
                <button
                  type="button"
                  onClick={() => setCourseTab("COMPLETED")}
                  className={`px-3 py-1 rounded-xl transition-all cursor-pointer ${
                    courseTab === "COMPLETED"
                      ? "bg-[#002137] text-[#dfb74a] shadow-xs font-bold border border-[#b89047]/30"
                      : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                  }`}
                >
                  Completed
                </button>
              </div>
            </div>

            {/* Courses Table / List Card */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-100 dark:border-slate-800 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[11px] font-bold text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800 pb-2">
                      <th className="pb-3 pl-2 w-12 font-semibold">#</th>
                      <th className="pb-3 font-semibold">Course Name</th>
                      <th className="pb-3 font-semibold min-w-[140px]">Completed</th>
                      <th className="pb-3 pr-2 text-right font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 dark:divide-slate-800/60 text-xs">
                    {filteredCourses.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="py-8 text-center text-slate-400">
                          No courses found matching this criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredCourses.map((c: any) => (
                        <tr key={c.id} className="group hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors">
                          {/* # Icon */}
                          <td className="py-3.5 pl-2">
                            <Link
                              href={`/student/materials?subject=${encodeURIComponent(c.subject || "")}`}
                              className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${c.gradient} flex items-center justify-center text-white shadow-2xs shrink-0 cursor-pointer block hover:scale-105 transition-transform`}
                            >
                              <BookOpen className="w-4 h-4 mx-auto my-2.5" />
                            </Link>
                          </td>

                          {/* Course Name */}
                          <td className="py-3.5 pr-4">
                            <Link
                              href={`/student/materials?subject=${encodeURIComponent(c.subject || "")}`}
                              className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-[#002137] dark:group-hover:text-[#dfb74a] transition-colors truncate max-w-xs block cursor-pointer"
                            >
                              {c.name}
                            </Link>
                            <span className="text-[10px] text-slate-400 font-medium">
                              {c.tag}
                            </span>
                          </td>

                          {/* Completed Progress Bar */}
                          <td className="py-3.5 pr-4">
                            <div className="w-32 sm:w-44 h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                              <div
                                className={`h-full ${c.barColor} rounded-full transition-all duration-500`}
                                style={{ width: `${Math.max(5, Math.min(100, c.progress))}%` }}
                              />
                            </div>
                          </td>

                          {/* Status Icons: 📄 lessons, 📝 assignments, 📋 tests */}
                          <td className="py-3.5 pr-2 text-right font-medium text-slate-600 dark:text-slate-400 whitespace-nowrap">
                            <span className="inline-flex items-center gap-3">
                              <span className="inline-flex items-center gap-1" title="Lessons">
                                <span className="text-amber-500">📄</span>
                                <span className="text-[11px]">{c.lessons}</span>
                              </span>
                              <span className="inline-flex items-center gap-1" title="Assignments">
                                <span className="text-[#004b79] dark:text-[#dfb74a]">📝</span>
                                <span className="text-[11px]">{c.assignments}</span>
                              </span>
                              <span className="inline-flex items-center gap-1" title="Tests">
                                <span className="text-[#b89047] dark:text-[#dfb74a]">📋</span>
                                <span className="text-[11px]">{c.tests}</span>
                              </span>
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>

        {/* ════ RIGHT SIDEBAR SECTION (4 COLS) ════ */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* 1. "STATUS" CALENDAR WIDGET */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-100 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h2 className="text-base sm:text-lg font-black text-slate-800 dark:text-slate-100 tracking-tight">
                  Status &amp; Schedule
                </h2>
                <p className="text-[11px] font-semibold text-[#8f6d2b] dark:text-[#dfb74a]">
                  {new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(currentMonthDate)}
                </p>
              </div>

              {/* Month Navigation Arrows */}
              <div className="flex items-center gap-1 text-[#002137] dark:text-[#dfb74a]">
                <button
                  type="button"
                  onClick={handlePrevMonth}
                  className="p-1 rounded-lg hover:bg-[#002137]/10 text-[#002137] dark:text-[#dfb74a] cursor-pointer transition-all"
                  title="Previous Month"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNextMonth}
                  className="p-1 rounded-lg hover:bg-[#002137]/10 text-[#002137] dark:text-[#dfb74a] cursor-pointer transition-all"
                  title="Next Month"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="space-y-2 select-none">
              {/* Days of Week Header: Mo Tu We Th Fr Sa Su */}
              <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-slate-400">
                <span>Mo</span>
                <span>Tu</span>
                <span>We</span>
                <span>Th</span>
                <span>Fr</span>
                <span>Sa</span>
                <span>Su</span>
              </div>

              {/* Date Numbers */}
              <div className="grid grid-cols-7 gap-y-2 text-center text-xs font-medium text-slate-700 dark:text-slate-300">
                {calendarDays.map((d, i) => {
                  if (d === null) {
                    return <div key={`empty-${i}`} className="h-8" />;
                  }

                  const yr = currentMonthDate.getFullYear();
                  const mo = String(currentMonthDate.getMonth() + 1).padStart(2, "0");
                  const dy = String(d).padStart(2, "0");
                  const dateKey = `${yr}-${mo}-${dy}`;
                  const dayEvents = (data?.calendarEvents as any)?.[dateKey] || [];

                  const isCurrentMonth =
                    currentMonthDate.getMonth() === new Date().getMonth() &&
                    currentMonthDate.getFullYear() === new Date().getFullYear();
                  const todayDay = new Date().getDate();
                  const isToday = isCurrentMonth && d === todayDay;
                  const isSelected = selectedCalendarDay === d;

                  const hasPresent = dayEvents.some((e: any) => e.type === "ATTENDANCE" && (e.status === "PRESENT" || e.status === "LATE"));
                  const hasAbsent = dayEvents.some((e: any) => e.type === "ATTENDANCE" && e.status === "ABSENT");
                  const hasClass = dayEvents.some((e: any) => e.type === "CLASS");
                  const hasTask = dayEvents.some((e: any) => e.type === "ASSIGNMENT" || e.type === "TEST");

                  return (
                    <div key={d} className="flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => setSelectedCalendarDay(d)}
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex flex-col items-center justify-center relative mx-auto transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#002137] text-white font-bold ring-2 ring-[#b89047] shadow-xs"
                            : isToday
                            ? "border-2 border-[#002137] dark:border-[#dfb74a] font-bold text-slate-900 dark:text-white"
                            : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium"
                        }`}
                        title={
                          dayEvents.length > 0
                            ? dayEvents.map((e: any) => `${e.title}${e.status ? ` (${e.status})` : ""}`).join(", ")
                            : `Day ${d}`
                        }
                      >
                        <span className="text-xs leading-none">{d}</span>
                        {/* Live Status Indicator Dots */}
                        {dayEvents.length > 0 && (
                          <span className="flex items-center gap-0.5 absolute -bottom-1">
                            {hasPresent && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                            {hasAbsent && <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />}
                            {hasClass && <span className="w-1.5 h-1.5 rounded-full bg-[#002137] dark:bg-[#dfb74a]" />}
                            {hasTask && <span className="w-1.5 h-1.5 rounded-full bg-[#b89047]" />}
                          </span>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Calendar Legend: Explains why dates are marked */}
            <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800 flex-wrap gap-1.5">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                <span>Present</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                <span>Absent</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#002137] dark:bg-[#dfb74a] shrink-0" />
                <span>Class</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#b89047] shrink-0" />
                <span>Task/Test</span>
              </span>
            </div>

            {/* Selected Date Live Details Card: Shows why that date is marked */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-xs space-y-2">
              <div className="flex items-center justify-between font-bold text-slate-900 dark:text-slate-100">
                <div className="flex items-center gap-1.5">
                  <CalendarIcon className="w-3.5 h-3.5 text-[#b89047]" />
                  <span>
                    {new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", weekday: "short" }).format(
                      new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth(), selectedCalendarDay || 1)
                    )}
                  </span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider bg-[#b89047]/15 text-[#8f6d2b] dark:text-[#dfb74a] border border-[#b89047]/30">
                  {selectedDateEvents.length} {selectedDateEvents.length === 1 ? "Activity" : "Activities"}
                </span>
              </div>
              {selectedDateEvents.length === 0 ? (
                <p className="text-[11px] text-slate-400">
                  No attendance marked or classes scheduled on this date.
                </p>
              ) : (
                <div className="space-y-1.5 pt-0.5">
                  {selectedDateEvents.map((ev: any, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-[11px]"
                    >
                      <span
                        className={`w-2 h-2 rounded-full shrink-0 mt-1 ${
                          ev.status === "PRESENT"
                            ? "bg-emerald-500"
                            : ev.status === "ABSENT"
                            ? "bg-rose-500"
                            : ev.type === "CLASS"
                            ? "bg-[#002137] dark:bg-[#dfb74a]"
                            : "bg-[#b89047]"
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-slate-800 dark:text-slate-200 truncate">
                          {ev.title}
                        </p>
                        <div className="flex items-center gap-2 text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 flex-wrap">
                          {ev.status && (
                            <span
                              className={`font-semibold ${
                                ev.status === "PRESENT"
                                  ? "text-emerald-600 dark:text-emerald-400"
                                  : "text-rose-600 dark:text-rose-400"
                              }`}
                            >
                              Attendance: {ev.status}
                            </span>
                          )}
                          {ev.time && <span>Time: {ev.time}</span>}
                          {ev.type && <span className="uppercase text-slate-400">• {ev.type}</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* 2. "UPCOMING" WIDGET (STRICTLY REAL LIVE ITEMS) */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-100 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-black text-slate-800 dark:text-slate-100 tracking-tight">
                Upcoming
              </h2>
              {upcomingItems.length > 0 && (
                <span className="text-[10px] font-bold text-[#b89047] uppercase tracking-wider">
                  Live Schedule
                </span>
              )}
            </div>

            {upcomingItems.length === 0 ? (
              <div className="py-8 text-center text-slate-400 space-y-2">
                <CalendarIcon className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-700" />
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  No upcoming activities
                </p>
                <p className="text-[11px] text-slate-400 max-w-[220px] mx-auto">
                  New live classes, tests, and assignments will automatically appear here once scheduled by your teacher.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {upcomingItems.map((item: any) => (
                  <Link
                    key={item.id}
                    href={item.link || "/student/classes"}
                    className="flex items-center gap-3.5 p-2 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors group cursor-pointer"
                  >
                    {/* Date Box */}
                    <div className="w-12 h-12 rounded-2xl bg-[#002137]/5 dark:bg-slate-800 border border-[#002137]/10 dark:border-slate-700/60 flex flex-col items-center justify-center leading-none shrink-0 group-hover:border-[#b89047]/50 transition-colors">
                      <span className="text-xs sm:text-sm font-extrabold text-slate-800 dark:text-slate-200">
                        {item.day}
                      </span>
                      <span className="text-[10px] font-bold text-[#b89047] uppercase mt-0.5">
                        {item.month}
                      </span>
                    </div>

                    {/* Title & Type */}
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-[#002137] dark:group-hover:text-[#dfb74a] transition-colors truncate">
                        {item.title}
                      </h4>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${item.dotColor || "bg-[#002137]"}`} />
                        <span className={`text-[11px] font-semibold ${item.textColor || "text-[#002137] dark:text-[#dfb74a]"}`}>
                          {item.type}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* ── COLLAPSIBLE STUDENT CREDENTIALS / DOSSIER FOOTER ── */}
      {showDossier && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4 animate-in fade-in duration-150">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-slate-100">
                Official Student Credentials Dossier
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setShowDossier(false)}
              className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              Hide
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/50">
              <span className="text-slate-400 font-medium">Student ID</span>
              <div className="flex items-center gap-1.5 mt-1 font-bold font-mono text-[#002137] dark:text-[#dfb74a]">
                <span>{studentId}</span>
                <button type="button" onClick={handleCopyId} className="cursor-pointer">
                  {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                </button>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/50">
              <span className="text-slate-400 font-medium">Class & Board</span>
              <p className="font-bold text-slate-900 dark:text-slate-100 mt-1">
                {classLevel} ({board})
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/50">
              <span className="text-slate-400 font-medium">Batch Allocation</span>
              <p className="font-bold text-slate-900 dark:text-slate-100 mt-1 truncate">
                {batchName}
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/50">
              <span className="text-slate-400 font-medium">School Affiliation</span>
              <p className="font-bold text-slate-900 dark:text-slate-100 mt-1 truncate">
                {schoolName}
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
