"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NotificationBell } from "./NotificationBell";
import { useFastFetch } from "@/lib/api-cache";
import { LayoutDashboard, Menu } from "lucide-react";

interface PortalHeaderProps {
  userName?: string;
  userRole?: string;
}

export default function PortalHeader({
  userName: propUserName,
  userRole: propUserRole,
}: PortalHeaderProps) {
  const pathname = usePathname();
  const { data: authData } = useFastFetch("/api/auth/me");
  const isStudentRoute = pathname.includes("/student") || propUserRole === "STUDENT";
  const isTeacherRoute = pathname.includes("/teacher") || propUserRole === "TEACHER";
  const { data: studentData } = useFastFetch(isStudentRoute ? "/api/student/dashboard" : "");

  const user = authData?.user;
  const rawName =
    propUserName ||
    studentData?.student?.name ||
    (isStudentRoute ? (user?.role === "STUDENT" ? user?.name : "Student") : user?.name) ||
    (isStudentRoute ? "Student" : isTeacherRoute ? "Faculty Member" : "Administrator");
  const safeName = typeof rawName === "string" && rawName.trim() ? rawName : (isStudentRoute ? "Student" : "Faculty Member");
  const userRole = propUserRole || (isStudentRoute ? "STUDENT" : isTeacherRoute ? "TEACHER" : user?.role || "ADMIN");
  const classLevel = studentData?.student?.classLevel || user?.profile?.currentClass || "Class 10";

  const getPageTitle = () => {
    if (pathname.includes("/student/dashboard")) return "Student Dashboard";
    if (pathname.includes("/admin/dashboard")) return "Admin Overview";
    if (pathname.includes("/teacher/dashboard")) return "Teacher Dashboard";
    if (pathname.includes("/student/classes") || pathname.includes("/teacher/schedule")) return "Live Classes & Timetable";
    if (pathname.includes("/materials")) return "Learning Hub";
    if (pathname.includes("/assignments")) return "Assignments & Tasks";
    if (pathname.includes("/attendance")) return "Attendance & Streak";
    if (pathname.includes("/fees")) return "Tuition & Fees";
    if (pathname.includes("/students")) return "Student Directory";
    if (pathname.includes("/teachers")) return "Teacher Management";
    if (pathname.includes("/batches")) return "Batch Management";
    if (pathname.includes("/finance")) return "Finance & Invoices";
    if (pathname.includes("/analytics")) return "Analytics";
    if (pathname.includes("/settings")) return "Settings";
    return userRole === "STUDENT" ? "Student Dashboard" : userRole === "TEACHER" ? "Faculty Workspace" : "Admin Overview";
  };

  return (
    <header className="h-[64px] sm:h-[70px] lg:h-[72px] px-5 sm:px-8 lg:px-10 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md flex items-center justify-between sticky top-0 z-40 transition-all shadow-2xs shrink-0">
      {/* ── LEFT: MOBILE MENU TRIGGER + PAGE TITLE ── */}
      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
        <button
          type="button"
          onClick={() => window.dispatchEvent(new CustomEvent("toggle-portal-sidebar"))}
          aria-label="Toggle navigation menu"
          className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0 border border-slate-200 dark:border-slate-700 active:scale-95"
        >
          <Menu className="w-4 h-4" />
        </button>
        <h2 className="font-extrabold text-base sm:text-lg lg:text-xl text-slate-900 dark:text-slate-100 tracking-tight truncate">
          {getPageTitle()}
        </h2>
      </div>

      {/* ── RIGHT: NOTIFICATIONS + USER PROFILE ── */}
      <div className="flex items-center gap-3 shrink-0">
        <NotificationBell />

        <div className="h-7 w-px bg-slate-200 dark:bg-slate-700" />

        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#002137] dark:bg-[#dfb74a] text-white dark:text-[#002137] flex items-center justify-center font-black text-sm shrink-0 shadow-sm">
            {safeName.charAt(0).toUpperCase()}
          </div>
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="text-[13px] font-bold text-slate-900 dark:text-slate-100 truncate max-w-[140px]">
              {safeName}
            </span>
            <span className="text-[10px] font-semibold text-slate-400 leading-tight">
              {userRole === "STUDENT" ? `${classLevel} Student` : userRole === "TEACHER" ? "Faculty Member" : "Administrator"}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

export { PortalHeader };
