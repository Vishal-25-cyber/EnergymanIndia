import React, { useEffect, Suspense, lazy } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// Public Landing Page is loaded directly for fastest First Contentful Paint (FCP / LCP)
import LandingPage from "./app/page";

// Public Contact Page (Lazy)
const ContactPage = lazy(() => import("./app/contact/page"));

// Careers Application Page (Lazy)
const CareerApplyPage = lazy(() => import("./app/careers/apply/page"));

// Student Portal (Lazy)
const StudentLayout = lazy(() => import("./app/(portal)/student/layout"));
const StudentDashboardPage = lazy(() => import("./app/(portal)/student/dashboard/page"));
const StudentClassesPage = lazy(() => import("./app/(portal)/student/classes/page"));
const StudentMaterialsPage = lazy(() => import("./app/(portal)/student/materials/page"));
const StudentAssignmentsPage = lazy(() => import("./app/(portal)/student/assignments/page"));
const StudentAttendancePage = lazy(() => import("./app/(portal)/student/attendance/page"));
const StudentFeesPage = lazy(() => import("./app/(portal)/student/fees/page"));
const StudentPerformancePage = lazy(() => import("./app/(portal)/student/performance/page"));
const StudentParentViewPage = lazy(() => import("./app/(portal)/student/parent-view/page"));
const StudentAiTutorPage = lazy(() => import("./app/(portal)/student/ai-tutor/page"));
const StudentClassroomSessionPage = lazy(() => import("./app/(portal)/student/classroom/[sessionId]/page"));

// Faculty / Teacher Portal (Lazy)
const TeacherLayout = lazy(() => import("./app/(portal)/teacher/layout"));
const TeacherDashboardPage = lazy(() => import("./app/(portal)/teacher/dashboard/page"));
const TeacherSchedulePage = lazy(() => import("./app/(portal)/teacher/schedule/page"));
const TeacherLiveClassCreatePage = lazy(() => import("./app/(portal)/teacher/live-class/create/page"));
const TeacherMaterialsPage = lazy(() => import("./app/(portal)/teacher/materials/page"));
const TeacherAssignmentsPage = lazy(() => import("./app/(portal)/teacher/assignments/page"));
const TeacherStudentsPage = lazy(() => import("./app/(portal)/teacher/students/page"));
const TeacherStudentReportsPage = lazy(() => import("./app/(portal)/teacher/reports/page"));
const TeacherAttendancePage = lazy(() => import("./app/(portal)/teacher/attendance/page"));
const TeacherClassAttendanceDetailPage = lazy(() => import("./app/(portal)/teacher/attendance/[classId]/page"));
const TeacherClassroomSessionPage = lazy(() => import("./app/(portal)/teacher/classroom/[sessionId]/page"));

// Admin Portal (Lazy)
const AdminLayout = lazy(() => import("./app/(portal)/admin/layout"));
const AdminDashboardPage = lazy(() => import("./app/(portal)/admin/dashboard/page"));
const AdminStudentsPage = lazy(() => import("./app/(portal)/admin/students/page"));
const AdminTeachersPage = lazy(() => import("./app/(portal)/admin/teachers/page"));
const AdminBatchesPage = lazy(() => import("./app/(portal)/admin/batches/page"));
const AdminClassesPage = lazy(() => import("./app/(portal)/admin/classes/page"));
const AdminAttendancePage = lazy(() => import("./app/(portal)/admin/attendance/page"));
const AdminStaffAttendancePage = lazy(() => import("./app/(portal)/admin/staff-attendance/page"));
const AdminFinancePage = lazy(() => import("./app/(portal)/admin/finance/page"));
const AdminAnalyticsPage = lazy(() => import("./app/(portal)/admin/analytics/page"));
const AdminSettingsPage = lazy(() => import("./app/(portal)/admin/settings/page"));

// Live Classroom (Lazy)
const ClassroomPage = lazy(() => import("./app/classroom/[classId]/page"));

class PortalErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Portal Runtime Caught Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
          <div className="max-w-md w-full p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl text-center space-y-4">
            <div className="w-12 h-12 mx-auto rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold text-lg">
              !
            </div>
            <h2 className="text-lg font-black text-slate-900 dark:text-slate-100">Portal View Recovered</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              An unexpected render issue occurred. Click reload to refresh your session state.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  this.setState({ hasError: false });
                  window.location.reload();
                }}
                className="px-4 py-2 rounded-xl bg-[#004b79] text-white text-xs font-bold hover:bg-[#003b60] transition-colors cursor-pointer"
              >
                Reload Page
              </button>
              <a
                href="/student/dashboard"
                onClick={() => this.setState({ hasError: false })}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                Dashboard
              </a>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function RouteLoadingFallback() {
  return (
    <div className="min-h-[50vh] w-full flex items-center justify-center bg-transparent text-slate-400 py-16">
      <div className="w-8 h-8 rounded-full border-2 border-[#002137] dark:border-[#dfb74a] border-t-transparent animate-spin" />
    </div>
  );
}

function RouteSEOAndScroll() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    const scrollContainers = document.querySelectorAll(
      "#student-portal-scroll-area, #teacher-portal-scroll-area, #admin-portal-scroll-area"
    );
    scrollContainers.forEach((el) => {
      el.scrollTop = 0;
    });

    // Dynamic Title per route
    let pageTitle = "Mantif — Human x Artificial Intelligence | Online Tutoring & Learning Platform";
    let isPrivate = false;

    if (pathname === "/contact") {
      pageTitle = "Contact & Admissions | Mantif Tutoring";
    } else if (pathname === "/careers/apply" || pathname === "/apply") {
      pageTitle = "Career & Internship Application | Mantif";
    } else if (pathname.startsWith("/student")) {
      isPrivate = true;
      if (pathname.includes("/dashboard")) pageTitle = "Student Dashboard | Mantif";
      else if (pathname.includes("/classes")) pageTitle = "Live Classes & Timetable | Mantif";
      else if (pathname.includes("/materials")) pageTitle = "Study Materials & Notes | Mantif";
      else if (pathname.includes("/assignments")) pageTitle = "Assignments & Proctored Tests | Mantif";
      else if (pathname.includes("/attendance")) pageTitle = "Attendance Record | Mantif";
      else if (pathname.includes("/fees")) pageTitle = "Fee Receipts & Billing | Mantif";
      else if (pathname.includes("/performance")) pageTitle = "Academic Performance | Mantif";
      else pageTitle = "Student Portal | Mantif";
    } else if (pathname.startsWith("/teacher")) {
      isPrivate = true;
      if (pathname.includes("/dashboard")) pageTitle = "Faculty Dashboard | Mantif";
      else if (pathname.includes("/schedule")) pageTitle = "Teaching Schedule & Timetable | Mantif";
      else if (pathname.includes("/materials")) pageTitle = "Study Resources | Mantif";
      else if (pathname.includes("/assignments")) pageTitle = "Assignments & Grading | Mantif";
      else if (pathname.includes("/students")) pageTitle = "Student List | Mantif";
      else if (pathname.includes("/reports")) pageTitle = "Student Performance Reports | Mantif";
      else pageTitle = "Faculty Portal | Mantif";
    } else if (pathname.startsWith("/admin")) {
      isPrivate = true;
      pageTitle = "Administration Console | Mantif";
    } else if (pathname.startsWith("/classroom")) {
      isPrivate = true;
      pageTitle = "Live Interactive Classroom | Mantif";
    }

    document.title = pageTitle;

    // Canonical link tag pointing to mantif.com
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", `https://mantif.com${pathname === "/" ? "" : pathname}`);

    // Robots meta tag: public index for landing/contact, noindex for private authenticated portals
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement("meta");
      metaRobots.setAttribute("name", "robots");
      document.head.appendChild(metaRobots);
    }
    if (isPrivate) {
      metaRobots.setAttribute("content", "noindex, nofollow");
    } else {
      metaRobots.setAttribute("content", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
    }

    // Google Analytics 4 (GA4) SPA Manual Page View Tracking (Exactly 1 event per navigation)
    if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
      (window as any).gtag("event", "page_view", {
        page_title: pageTitle,
        page_location: window.location.href,
        page_path: pathname,
      });
    }
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <PortalErrorBoundary>
      <RouteSEOAndScroll />
      <Suspense fallback={<RouteLoadingFallback />}>
        <Routes>
          {/* ── Public Landing Page & Auth Redirects ── */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/careers/apply" element={<CareerApplyPage />} />
          <Route path="/apply" element={<Navigate to="/careers/apply" replace />} />
          <Route path="/login" element={<Navigate to="/" replace />} />
          <Route path="/register" element={<Navigate to="/" replace />} />
          <Route path="/register/student" element={<Navigate to="/" replace />} />
          <Route path="/register/teacher" element={<Navigate to="/" replace />} />

          {/* ── Student Portal Nested Routes (Persistent Layout) ── */}
          <Route path="/student" element={<StudentLayout />}>
            <Route index element={<Navigate to="/student/dashboard" replace />} />
            <Route path="dashboard" element={<StudentDashboardPage />} />
            <Route path="classes" element={<StudentClassesPage />} />
            <Route path="materials" element={<StudentMaterialsPage />} />
            <Route path="assignments" element={<StudentAssignmentsPage />} />
            <Route path="attendance" element={<StudentAttendancePage />} />
            <Route path="fees" element={<StudentFeesPage />} />
            <Route path="performance" element={<StudentPerformancePage />} />
            <Route path="parent-view" element={<StudentParentViewPage />} />
            <Route path="ai-tutor" element={<StudentAiTutorPage />} />
            <Route path="classroom/:sessionId" element={<StudentClassroomSessionPage />} />
          </Route>

          {/* ── Teacher Portal Nested Routes (Persistent Layout) ── */}
          <Route path="/teacher" element={<TeacherLayout />}>
            <Route index element={<Navigate to="/teacher/dashboard" replace />} />
            <Route path="dashboard" element={<TeacherDashboardPage />} />
            <Route path="reports" element={<TeacherStudentReportsPage />} />
            <Route path="schedule" element={<TeacherSchedulePage />} />
            <Route path="live-class/create" element={<TeacherLiveClassCreatePage />} />
            <Route path="materials" element={<TeacherMaterialsPage />} />
            <Route path="assignments" element={<TeacherAssignmentsPage />} />
            <Route path="students" element={<TeacherStudentsPage />} />
            <Route path="attendance" element={<TeacherAttendancePage />} />
            <Route path="attendance/:classId" element={<TeacherClassAttendanceDetailPage />} />
            <Route path="classroom/:sessionId" element={<TeacherClassroomSessionPage />} />
          </Route>

          {/* ── Admin Portal Nested Routes (Persistent Layout) ── */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="reports" element={<TeacherStudentReportsPage />} />
            <Route path="students" element={<AdminStudentsPage />} />
            <Route path="teachers" element={<AdminTeachersPage />} />
            <Route path="batches" element={<AdminBatchesPage />} />
            <Route path="classes" element={<AdminClassesPage />} />
            <Route path="attendance" element={<AdminAttendancePage />} />
            <Route path="staff-attendance" element={<AdminStaffAttendancePage />} />
            <Route path="finance" element={<AdminFinancePage />} />
            <Route path="analytics" element={<AdminAnalyticsPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
          </Route>

          {/* ── Live Classroom Route ── */}
          <Route path="/classroom/:classId" element={<ClassroomPage />} />

          {/* ── Fallback Redirect ── */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </PortalErrorBoundary>
  );
}

