"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NotificationBell } from "./NotificationBell";
import { useFastFetch } from "@/lib/api-cache";
import { Menu } from "lucide-react";

interface PortalHeaderProps {
  userName?: string;
  userRole?: "STUDENT" | "TEACHER" | "ADMIN";
}

export default function PortalHeader({
  userName: propUserName,
  userRole: propUserRole,
}: PortalHeaderProps) {
  const pathname = usePathname();
  const { data: authData } = useFastFetch("/api/auth/me");
  const isStudentRoute = pathname.includes("/student") || propUserRole === "STUDENT";
  const isTeacherRoute = pathname.includes("/teacher") || propUserRole === "TEACHER";
  const { data: studentData } = useFastFetch(isStudentRoute ? "/api/student/dashboard" : null);

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
    if (pathname.includes("/teacher/dashboard")) return "Faculty Dashboard";
    if (pathname.includes("/student/classes") || pathname.includes("/teacher/schedule")) return "Live Classes & Timetable";
    if (pathname.includes("/teacher/live-class/create")) return "Launch Live Class";
    if (pathname.includes("/materials")) return isStudentRoute ? "Learning Hub & Materials" : "Study Resources";
    if (pathname.includes("/assignments")) return isStudentRoute ? "Assignments & Tests" : "Assignments & Grading";
    if (pathname.includes("/attendance")) return isStudentRoute ? "Attendance Record" : pathname.includes("/teacher") ? "Staff Attendance Log" : "Student Attendance";
    if (pathname.includes("/fees")) return "Tuition & Fees";
    if (pathname.includes("/performance")) return "Academic Performance";
    if (pathname.includes("/parent-view")) return "Parent Overview";
    if (pathname.includes("/reports")) return "Performance & Growth";
    if (pathname.includes("/students")) return isTeacherRoute ? "Student Directory" : "Student Approvals";
    if (pathname.includes("/teachers")) return "Faculty Approvals";
    if (pathname.includes("/batches")) return "Batch Slots";
    if (pathname.includes("/classes")) return "Live Class Schedule";
    if (pathname.includes("/staff-attendance")) return "Faculty Attendance";
    if (pathname.includes("/finance")) return "Fee Accounts & Income";
    if (pathname.includes("/analytics")) return "Analytics";
    if (pathname.includes("/settings")) return "Institute Settings";
    return userRole === "STUDENT" ? "Student Dashboard" : userRole === "TEACHER" ? "Faculty Workspace" : "Admin Console";
  };

  return (
    <header className="h-14 sm:h-16 lg:h-[70px] px-3 sm:px-6 lg:px-8 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#001726]/95 backdrop-blur-md flex items-center justify-between sticky top-0 z-40 transition-all shadow-2xs shrink-0 select-none">
      {/* ── LEFT: MOBILE MENU TRIGGER + LOGO ICON + PAGE TITLE ── */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <button
          type="button"
          onClick={() => window.dispatchEvent(new CustomEvent("toggle-portal-sidebar"))}
          aria-label="Toggle navigation menu"
          className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0 border border-slate-200 dark:border-slate-700 active:scale-95"
        >
          <Menu className="w-5 h-5 text-[#002137] dark:text-[#dfb74a]" />
        </button>

        <img
          src="/images/mantif_icon.png?v=3"
          alt="Mantif"
          className="w-7 h-7 sm:w-8 sm:h-8 object-contain shrink-0 lg:hidden"
        />

        <h1 className="font-extrabold text-sm sm:text-base lg:text-lg text-slate-900 dark:text-slate-100 tracking-tight truncate">
          {getPageTitle()}
        </h1>
      </div>

      {/* ── RIGHT: NOTIFICATIONS + USER PROFILE ── */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <NotificationBell />

        <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block" />

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#002137] dark:bg-[#002842] text-[#dfb74a] border border-[#b89047]/40 flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
            {safeName.charAt(0).toUpperCase()}
          </div>
          <div className="hidden sm:flex flex-col leading-tight max-w-[130px]">
            <span className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
              {safeName}
            </span>
            <span className="text-[10px] font-semibold text-slate-400 leading-tight truncate">
              {userRole === "STUDENT" ? `${classLevel} Student` : userRole === "TEACHER" ? "Faculty" : "Administrator"}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

export { PortalHeader };
