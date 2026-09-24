"use client";

import { prefetchApi } from "./api-cache";

// Direct dynamic imports for every portal route component in Vite
const ROUTE_COMPONENT_LOADERS: Record<string, () => Promise<any>> = {
  // Student Portal
  "/student/dashboard": () => import("@/app/(portal)/student/dashboard/page"),
  "/student/classes": () => import("@/app/(portal)/student/classes/page"),
  "/student/materials": () => import("@/app/(portal)/student/materials/page"),
  "/student/assignments": () => import("@/app/(portal)/student/assignments/page"),
  "/student/attendance": () => import("@/app/(portal)/student/attendance/page"),
  "/student/fees": () => import("@/app/(portal)/student/fees/page"),
  "/student/performance": () => import("@/app/(portal)/student/performance/page"),
  "/student/parent-view": () => import("@/app/(portal)/student/parent-view/page"),

  // Teacher Portal
  "/teacher/dashboard": () => import("@/app/(portal)/teacher/dashboard/page"),
  "/teacher/schedule": () => import("@/app/(portal)/teacher/schedule/page"),
  "/teacher/live-class/create": () => import("@/app/(portal)/teacher/live-class/create/page"),
  "/teacher/materials": () => import("@/app/(portal)/teacher/materials/page"),
  "/teacher/assignments": () => import("@/app/(portal)/teacher/assignments/page"),
  "/teacher/students": () => import("@/app/(portal)/teacher/students/page"),
  "/teacher/reports": () => import("@/app/(portal)/teacher/reports/page"),
  "/teacher/attendance": () => import("@/app/(portal)/teacher/attendance/page"),

  // Admin Portal
  "/admin/dashboard": () => import("@/app/(portal)/admin/dashboard/page"),
  "/admin/reports": () => import("@/app/(portal)/teacher/reports/page"),
  "/admin/students": () => import("@/app/(portal)/admin/students/page"),
  "/admin/teachers": () => import("@/app/(portal)/admin/teachers/page"),
  "/admin/batches": () => import("@/app/(portal)/admin/batches/page"),
  "/admin/classes": () => import("@/app/(portal)/admin/classes/page"),
  "/admin/attendance": () => import("@/app/(portal)/admin/attendance/page"),
  "/admin/staff-attendance": () => import("@/app/(portal)/admin/staff-attendance/page"),
  "/admin/finance": () => import("@/app/(portal)/admin/finance/page"),
  "/admin/analytics": () => import("@/app/(portal)/admin/analytics/page"),
  "/admin/settings": () => import("@/app/(portal)/admin/settings/page"),
};

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

// Track already loaded chunks to avoid redundant calls
const loadedChunks = new Set<string>();

/**
 * Instantly preloads both the JavaScript chunk and API data for a given path.
 * Call on mouseEnter, touchStart, or link focus.
 */
export function preloadRoute(path: string) {
  if (typeof window === "undefined" || !path) return;
  const clean = path.split("?")[0];

  // 1. Preload Component Chunk
  if (!loadedChunks.has(clean) && ROUTE_COMPONENT_LOADERS[clean]) {
    try {
      ROUTE_COMPONENT_LOADERS[clean]()
        .then(() => loadedChunks.add(clean))
        .catch(() => {});
    } catch {}
  }

  // 2. Preload API Endpoint
  const apiEndpoint = ROUTE_API_MAP[clean];
  if (apiEndpoint) {
    prefetchApi(apiEndpoint);
  }
}

/**
 * Eagerly preloads all routes for the current portal role in the background.
 */
export function preloadAllPortalRoutes(role?: string) {
  if (typeof window === "undefined") return;

  const targetPrefixes = !role
    ? ["/student", "/teacher", "/admin"]
    : role === "STUDENT"
    ? ["/student"]
    : role === "TEACHER"
    ? ["/teacher"]
    : ["/admin"];

  const routesToLoad = Object.keys(ROUTE_COMPONENT_LOADERS).filter((route) =>
    targetPrefixes.some((prefix) => route.startsWith(prefix))
  );

  const runner = () => {
    routesToLoad.forEach((route, index) => {
      setTimeout(() => {
        preloadRoute(route);
      }, index * 20); // Stagger by 20ms to avoid blocking main thread
    });
  };

  if ("requestIdleCallback" in window) {
    (window as any).requestIdleCallback(runner);
  } else {
    setTimeout(runner, 50);
  }
}
