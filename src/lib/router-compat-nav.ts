import {
  useNavigate,
  useLocation,
  useSearchParams as useRouterSearchParams,
  useParams as useRouterParams,
} from "react-router-dom";
import { prefetchApi } from "./api-cache";

const ROUTE_API_MAP: Record<string, string> = {
  "/student/dashboard": "/api/student/dashboard",
  "/student/classes": "/api/student/classes",
  "/student/materials": "/api/student/materials",
  "/student/assignments": "/api/student/assignments",
  "/student/attendance": "/api/student/attendance",
  "/student/fees": "/api/student/payments",
  "/student/performance": "/api/student/performance",
  "/student/parent-view": "/api/student/parent-view",
  "/teacher/dashboard": "/api/teacher/dashboard",
  "/teacher/schedule": "/api/classes",
  "/teacher/materials": "/api/teacher/materials",
  "/teacher/assignments": "/api/teacher/assignments",
  "/teacher/students": "/api/teacher/students",
  "/teacher/reports": "/api/teacher/reports",
  "/teacher/attendance": "/api/teacher/attendance",
  "/admin/dashboard": "/api/admin/dashboard",
  "/admin/students": "/api/admin/students",
  "/admin/teachers": "/api/admin/teachers?status=ALL",
  "/admin/reports": "/api/teacher/reports",
  "/admin/batches": "/api/batches",
  "/admin/classes": "/api/classes",
  "/admin/attendance": "/api/admin/attendance?classLevel=ALL&status=ALL",
  "/admin/staff-attendance": "/api/admin/staff-attendance",
  "/admin/finance": "/api/admin/finance",
  "/admin/analytics": "/api/admin/analytics",
  "/admin/settings": "/api/admin/settings",
};

export function useRouter() {
  const navigate = useNavigate();
  return {
    push: (href: string) => navigate(href),
    replace: (href: string) => navigate(href, { replace: true }),
    back: () => navigate(-1),
    forward: () => navigate(1),
    refresh: () => window.location.reload(),
    prefetch: (href: string) => {
      const cleanPath = (href || "").split("?")[0];
      const ep = ROUTE_API_MAP[cleanPath];
      if (ep) prefetchApi(ep);
    },
  };
}

export function usePathname(): string {
  const location = useLocation();
  return location.pathname;
}

export function useSearchParams(): URLSearchParams {
  const [searchParams] = useRouterSearchParams();
  return searchParams;
}

export function useParams<T extends Record<string, string | string[]>>(): T {
  const params = useRouterParams();
  return params as unknown as T;
}

export function redirect(url: string) {
  if (typeof window !== "undefined") {
    window.location.href = url;
  }
}
