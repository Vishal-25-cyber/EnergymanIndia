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
  const { data: classesData } = useFastFetch<any>("/api/student/classes", undefined, { pollIntervalMs: 4000 });
  const { data: paymentData } = useFastFetch("/api/student/payments");

  // Filter & Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [courseTab, setCourseTab] = useState<"ACTIVE" | "COMPLETED">("ACTIVE");
  const [copiedId, setCopiedId] = useState(false);
  const [showDossier, setShowDossier] = useState(false);

  // Calendar State
  const [currentMonthDate, setCurrentMonthDate] = useState(new Date());

  const authUser = authData?.user;
  const trial = authUser?.trial;
  const hasPaid = !!trial?.hasPaid || !!paymentData?.history?.length || !!data?.feeStatus?.isPaid;
  const isTrialActive = !hasPaid && !!trial?.isTrialActive;
  const student = data?.student;

  const rawName = student?.name || (authUser?.role === "STUDENT" ? authUser?.name : null) || "Dipu paul";
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

  // Real or Curated Counts
  const assessments = data?.assessmentSummary || {
    total: 24,
    submitted: 8,
    pending: 16,
    evaluated: 6,
    averageScore: 78,
  };

  const totalLessons = data?.materialsCount || 73;
  const completedLessons = data?.completedMaterialsCount || 42;
  const lessonsPercentage = Math.round((completedLessons / (totalLessons || 1)) * 100) || 59;

  const totalAssignments = assessments.total || 24;
  const completedAssignments = assessments.submitted || 8;
  const assignmentsPercentage = Math.round((completedAssignments / (totalAssignments || 1)) * 100) || 59;

  const totalTests = data?.totalTestsCount || 15;
  const completedTests = data?.completedTestsCount || 3;
  const testsPercentage = Math.round((completedTests / (totalTests || 1)) * 100) || 59;

  // Courses List with dynamic styling matching the reference design
  const allCourses = useMemo(() => [
    {
      id: "course-1",
      name: "Web Design : From Figma to Web",
      tag: "UI/UX & Frontend",
      progress: 75,
      lessons: 15,
      assignments: 6,
      tests: 3,
      gradient: "from-pink-500 via-rose-500 to-purple-600",
      barColor: "bg-gradient-to-r from-purple-600 to-indigo-500",
      isCompleted: false,
    },
    {
      id: "course-2",
      name: "HTML Basics",
      tag: "Web Foundations",
      progress: 35,
      lessons: 15,
      assignments: 6,
      tests: 3,
      gradient: "from-amber-500 via-orange-500 to-red-500",
      barColor: "bg-gradient-to-r from-rose-500 to-pink-500",
      isCompleted: false,
    },
    {
      id: "course-3",
      name: "Data with Python",
      tag: "Programming & Logic",
      progress: 50,
      lessons: 15,
      assignments: 6,
      tests: 3,
      gradient: "from-yellow-400 via-orange-500 to-pink-500",
      barColor: "bg-gradient-to-r from-amber-500 to-orange-500",
      isCompleted: false,
    },
    {
      id: "course-4",
      name: "Mathematics : Quadratic Equations & Board Prep",
      tag: `${classLevel} • ${board}`,
      progress: 82,
      lessons: 20,
      assignments: 8,
      tests: 4,
      gradient: "from-blue-500 via-indigo-500 to-purple-600",
      barColor: "bg-gradient-to-r from-indigo-500 to-purple-600",
      isCompleted: false,
    },
    {
      id: "course-5",
      name: "Science : Physics Optics & Chemical Reactions",
      tag: `${classLevel} • Core Science`,
      progress: 100,
      lessons: 18,
      assignments: 7,
      tests: 3,
      gradient: "from-emerald-400 via-teal-500 to-blue-500",
      barColor: "bg-gradient-to-r from-emerald-500 to-teal-600",
      isCompleted: true,
    },
  ], [classLevel, board]);

  const filteredCourses = useMemo(() => {
    return allCourses
      .filter((c) => (courseTab === "ACTIVE" ? !c.isCompleted : c.isCompleted))
      .filter((c) =>
        searchQuery.trim() === ""
          ? true
          : c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }, [allCourses, courseTab, searchQuery]);

  // Upcoming items matching reference screenshot
  const upcomingItems = [
    {
      id: "up-1",
      day: "29",
      month: "Sept",
      title: "Practical theory",
      type: "Assignments",
      dotColor: "bg-pink-500",
      textColor: "text-pink-500",
      link: "/student/assignments",
    },
    {
      id: "up-2",
      day: "29",
      month: "Sept",
      title: "Practical theory 1",
      type: "Test",
      dotColor: "bg-emerald-500",
      textColor: "text-emerald-500",
      link: "/student/assignments",
    },
    {
      id: "up-3",
      day: "29",
      month: "Sept",
      title: "Practical theory 2",
      type: "Lessons",
      dotColor: "bg-amber-500",
      textColor: "text-amber-500",
      link: "/student/materials",
    },
    {
      id: "up-4",
      day: "29",
      month: "Sept",
      title: "Practical theory 3",
      type: "Assignments",
      dotColor: "bg-pink-500",
      textColor: "text-pink-500",
      link: "/student/assignments",
    },
  ];

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
          <Search className="w-4 h-4 text-purple-600 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search here..."
            className="w-full pl-10 pr-4 py-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-200 placeholder-slate-400 shadow-2xs focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
          />
        </div>

        {/* Right Tools: Messages, Notifications, Profile Chip */}
        <div className="flex items-center gap-3 self-end md:self-auto">
          {/* Messages */}
          <button
            type="button"
            className="w-9 h-9 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-500 hover:text-purple-600 flex items-center justify-center shadow-2xs hover:shadow-xs transition-all cursor-pointer"
            title="Messages"
          >
            <MessageSquare className="w-4 h-4" />
          </button>

          {/* Notifications with red dot */}
          <button
            type="button"
            className="relative w-9 h-9 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-500 hover:text-purple-600 flex items-center justify-center shadow-2xs hover:shadow-xs transition-all cursor-pointer"
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
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 text-white font-black text-xs flex items-center justify-center shadow-xs">
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
      {isTrialActive && (
        <div className="p-3 rounded-2xl bg-amber-50/90 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 shadow-xs">
          <StudentTrialCountdownBanner
            trialEndsAt={trial?.trialEndsAt}
            trialStartDate={trial?.trialStartDate}
            remainingHours={trial?.remainingHours}
            studentName={safeName}
            onExpire={() => window.location.reload()}
          />
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
          <Link href="/student/fees" className="font-bold text-purple-700 hover:underline flex items-center gap-1">
            <span>Renew</span> <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {/* ── MAIN 2-COLUMN GRID (LEFT ~70%, RIGHT ~30%) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ════ LEFT MAIN SECTION (8 COLS) ════ */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* 1. TOP RESUME COURSE BANNER (EXACT AS SCREENSHOT) */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-5 border border-slate-100 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all">
            <div className="flex items-center gap-3.5 min-w-0 flex-1">
              {/* Vibrant Gradient Icon */}
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-purple-600 via-pink-500 to-rose-400 flex items-center justify-center text-white shadow-sm shrink-0">
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>

              {/* Title & Underline Progress */}
              <div className="space-y-1.5 min-w-0 flex-1">
                <h3 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 truncate">
                  The Name of the course
                </h3>
                <div className="w-44 sm:w-56 h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full w-3/5 bg-gradient-to-r from-purple-600 to-indigo-500 rounded-full" />
                </div>
              </div>
            </div>

            {/* Stat Counters: 📄 15, 📝 6, 📋 3 */}
            <div className="flex items-center gap-4 text-xs font-semibold text-slate-600 dark:text-slate-400 shrink-0">
              <span className="flex items-center gap-1.5">
                <span className="text-amber-500">📄</span>
                <span>15</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-pink-500">📝</span>
                <span>6</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-emerald-500">📋</span>
                <span>3</span>
              </span>
            </div>

            {/* Resume Button */}
            <Link
              href="/student/materials"
              className="px-4 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 dark:bg-purple-950/50 dark:hover:bg-purple-900/60 dark:text-purple-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-2xs shrink-0"
            >
              <Play className="w-3.5 h-3.5 fill-purple-700 dark:fill-purple-300" />
              <span>Resume</span>
            </Link>
          </div>

          {/* 2. "STATUS" THREE LARGE PASTEL STAT CARDS */}
          <div className="space-y-3">
            <h2 className="text-base sm:text-lg font-black text-slate-800 dark:text-slate-100 tracking-tight">
              Status
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
              
              {/* Card 1: Lessons (Warm Cream / Peach) */}
              <div className="bg-[#FFF8EE] dark:bg-[#20180e] border border-amber-200/60 dark:border-amber-900/40 rounded-3xl p-5 shadow-xs flex flex-col justify-between gap-5 transition-all hover:shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-2xl bg-[#FF7A59] text-white flex items-center justify-center shadow-xs">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <CircularProgressRing
                    percentage={lessonsPercentage}
                    strokeColor="#FF7A59"
                    trackColor="rgba(255, 122, 89, 0.15)"
                  />
                </div>

                <div>
                  <p className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-mono tracking-tight">
                    {completedLessons}
                  </p>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">
                    Lessons
                  </p>
                  <p className="text-xs text-purple-600 dark:text-purple-400 font-semibold mt-0.5">
                    of {totalLessons} completed
                  </p>
                </div>
              </div>

              {/* Card 2: Assignments (Soft Pastel Pink / Rose) */}
              <div className="bg-[#FFF0F4] dark:bg-[#240f17] border border-rose-200/60 dark:border-rose-900/40 rounded-3xl p-5 shadow-xs flex flex-col justify-between gap-5 transition-all hover:shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-2xl bg-[#FF4F81] text-white flex items-center justify-center shadow-xs">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <CircularProgressRing
                    percentage={assignmentsPercentage}
                    strokeColor="#FF4F81"
                    trackColor="rgba(255, 79, 129, 0.15)"
                  />
                </div>

                <div>
                  <p className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-mono tracking-tight">
                    {completedAssignments.toString().padStart(2, "0")}
                  </p>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">
                    Assignments
                  </p>
                  <p className="text-xs text-purple-600 dark:text-purple-400 font-semibold mt-0.5">
                    of {totalAssignments} completed
                  </p>
                </div>
              </div>

              {/* Card 3: Tests (Mint / Soft Pastel Green) */}
              <div className="bg-[#F0FAF4] dark:bg-[#0c1f15] border border-emerald-200/60 dark:border-emerald-900/40 rounded-3xl p-5 shadow-xs flex flex-col justify-between gap-5 transition-all hover:shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-2xl bg-[#2ECC71] text-white flex items-center justify-center shadow-xs">
                    <Award className="w-5 h-5" />
                  </div>
                  <CircularProgressRing
                    percentage={testsPercentage}
                    strokeColor="#2ECC71"
                    trackColor="rgba(46, 204, 113, 0.15)"
                  />
                </div>

                <div>
                  <p className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-mono tracking-tight">
                    {completedTests.toString().padStart(2, "0")}
                  </p>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">
                    Tests
                  </p>
                  <p className="text-xs text-purple-600 dark:text-purple-400 font-semibold mt-0.5">
                    of {totalTests} completed
                  </p>
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
                      ? "bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 shadow-2xs font-bold"
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
                      ? "bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 shadow-2xs font-bold"
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
                      filteredCourses.map((c) => (
                        <tr key={c.id} className="group hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors">
                          {/* # Icon */}
                          <td className="py-3.5 pl-2">
                            <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${c.gradient} flex items-center justify-center text-white shadow-2xs shrink-0`}>
                              <BookOpen className="w-4 h-4" />
                            </div>
                          </td>

                          {/* Course Name */}
                          <td className="py-3.5 pr-4">
                            <div className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-purple-600 transition-colors truncate max-w-xs">
                              {c.name}
                            </div>
                            <span className="text-[10px] text-slate-400 font-medium">
                              {c.tag}
                            </span>
                          </td>

                          {/* Completed Progress Bar */}
                          <td className="py-3.5 pr-4">
                            <div className="w-32 sm:w-44 h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                              <div className={`h-full ${c.barColor} rounded-full`} style={{ width: `${c.progress}%` }} />
                            </div>
                          </td>

                          {/* Status Icons: 📄 15, 📝 6, 📋 3 */}
                          <td className="py-3.5 pr-2 text-right font-medium text-slate-600 dark:text-slate-400 whitespace-nowrap">
                            <span className="inline-flex items-center gap-3">
                              <span className="inline-flex items-center gap-1">
                                <span className="text-amber-500">📄</span>
                                <span className="text-[11px]">{c.lessons}</span>
                              </span>
                              <span className="inline-flex items-center gap-1">
                                <span className="text-pink-500">📝</span>
                                <span className="text-[11px]">{c.assignments}</span>
                              </span>
                              <span className="inline-flex items-center gap-1">
                                <span className="text-emerald-500">📋</span>
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
              <h2 className="text-base sm:text-lg font-black text-slate-800 dark:text-slate-100 tracking-tight">
                Status
              </h2>

              {/* Month Navigation Arrows */}
              <div className="flex items-center gap-1 text-purple-600">
                <button
                  type="button"
                  onClick={handlePrevMonth}
                  className="p-1 rounded-lg hover:bg-purple-50 text-purple-700 dark:text-purple-300 cursor-pointer transition-all"
                  title="Previous Month"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNextMonth}
                  className="p-1 rounded-lg hover:bg-purple-50 text-purple-700 dark:text-purple-300 cursor-pointer transition-all"
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

                  // Highlighting days 23, 24-26, 27 matching screenshot
                  const isRangeStart = d === 23;
                  const isInRange = d >= 24 && d <= 26;
                  const isRangeEnd = d === 27;

                  if (isRangeStart || isRangeEnd) {
                    return (
                      <div key={d} className="flex items-center justify-center">
                        <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center shadow-xs">
                          {d}
                        </span>
                      </div>
                    );
                  }

                  if (isInRange) {
                    return (
                      <div key={d} className="flex items-center justify-center bg-purple-100/90 dark:bg-purple-950/70 text-purple-800 dark:text-purple-200 font-semibold h-7 sm:h-8">
                        <span>{d}</span>
                      </div>
                    );
                  }

                  return (
                    <div key={d} className="flex items-center justify-center h-7 sm:h-8 text-slate-700 dark:text-slate-400 hover:text-purple-600">
                      <span>{d}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 2. "UPCOMING" WIDGET (EXACT ITEMS FROM USER SCREENSHOT) */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-100 dark:border-slate-800 shadow-xs space-y-4">
            <h2 className="text-base sm:text-lg font-black text-slate-800 dark:text-slate-100 tracking-tight">
              Upcoming
            </h2>

            <div className="space-y-3">
              {upcomingItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.link}
                  className="flex items-center gap-3.5 p-2 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors group cursor-pointer"
                >
                  {/* Date Box: 29 Sept */}
                  <div className="w-12 h-12 rounded-2xl bg-[#f8f9fd] dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60 flex flex-col items-center justify-center leading-none shrink-0 group-hover:border-purple-200 transition-colors">
                    <span className="text-xs sm:text-sm font-extrabold text-slate-800 dark:text-slate-200">
                      {item.day}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase mt-0.5">
                      {item.month}
                    </span>
                  </div>

                  {/* Title & Type */}
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-purple-600 transition-colors truncate">
                      {item.title}
                    </h4>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${item.dotColor}`} />
                      <span className={`text-[11px] font-semibold ${item.textColor}`}>
                        {item.type}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
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
              <div className="flex items-center gap-1.5 mt-1 font-bold font-mono text-purple-700 dark:text-purple-300">
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
