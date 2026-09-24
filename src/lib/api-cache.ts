"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const memoryCache = new Map<string, { data: any; timestamp: number }>();
const inflightRequests = new Map<string, Promise<any>>();
const CACHE_STALE_MS = 60000; // 60s stale time: instant UI transitions with background sync

// Global event bus for instant cache invalidation across tabs / components
const cacheListeners = new Set<(urlPrefix: string) => void>();

function getAuthHeaders(isAuthMe = false): Record<string, string> {
  const headers: Record<string, string> = {};
  if (isAuthMe) {
    headers["Cache-Control"] = "no-cache";
  }
  if (typeof window !== "undefined") {
    try {
      const token = localStorage.getItem("acuity_auth_token") || sessionStorage.getItem("acuity_auth_token");
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
        headers["x-auth-token"] = token;
      }
    } catch {
      // ignore
    }
  }
  return headers;
}

function getFromStorage(url: string) {
  if (typeof window === "undefined" || !url) return null;
  try {
    const raw = sessionStorage.getItem(`mantif_cache_${url}`) || localStorage.getItem(`mantif_cache_${url}`);
    if (raw) {
      const parsed = JSON.parse(raw);
      const ttl = url.includes("/api/auth/me") ? 60000 : 300000; // 60s TTL for auth, 5m for static
      if (parsed && Date.now() - parsed.timestamp < ttl) {
        memoryCache.set(url, parsed);
        return parsed.data;
      }
    }
  } catch {
    // ignore
  }
  return null;
}

function saveToStorage(url: string, data: any) {
  if (typeof window === "undefined" || !url) return;
  try {
    const serialized = JSON.stringify({ data, timestamp: Date.now() });
    sessionStorage.setItem(`mantif_cache_${url}`, serialized);
    localStorage.setItem(`mantif_cache_${url}`, serialized);
  } catch {
    // ignore
  }
}

/**
 * Prefetches and caches an API endpoint in the background with deduplication.
 */
export async function prefetchApi(url: string): Promise<any> {
  if (!url || typeof window === "undefined") return null;

  const cached = memoryCache.get(url)?.data ?? getFromStorage(url);
  if (cached) {
    return cached;
  }

  if (inflightRequests.has(url)) {
    return inflightRequests.get(url);
  }

  const fetchPromise = (async () => {
    try {
      const headers = getAuthHeaders(url.includes("/api/auth/me"));
      const res = await fetch(url, {
        credentials: "include",
        headers: Object.keys(headers).length > 0 ? headers : undefined,
      });
      if (res.ok) {
        const data = await res.json();
        memoryCache.set(url, { data, timestamp: Date.now() });
        saveToStorage(url, data);
        return data;
      }
    } catch (e) {
      // ignore prefetch errors
    } finally {
      inflightRequests.delete(url);
    }
    return null;
  })();

  inflightRequests.set(url, fetchPromise);
  return fetchPromise;
}

/**
 * Pre-warms common portal routes into memory cache for instant sub-millisecond navigation.
 */
export function warmupPortalCache(role: string = "STUDENT") {
  if (typeof window === "undefined") return;

  const endpoints =
    role === "STUDENT"
      ? [
        "/api/auth/me",
        "/api/student/dashboard",
        "/api/student/classes",
        "/api/student/materials",
        "/api/student/assignments",
        "/api/student/attendance",
        "/api/student/payments",
        "/api/notifications",
      ]
      : role === "TEACHER"
      ? [
        "/api/auth/me",
        "/api/teacher/dashboard",
        "/api/classes",
        "/api/teacher/materials",
        "/api/teacher/assignments",
        "/api/teacher/students",
        "/api/teacher/attendance",
        "/api/notifications",
      ]
      : [
        "/api/auth/me",
        "/api/admin/dashboard",
        "/api/admin/students",
        "/api/admin/teachers?status=ALL",
        "/api/admin/batches",
        "/api/batches",
        "/api/admin/classes",
        "/api/admin/attendance?classLevel=ALL&status=ALL",
        "/api/admin/staff-attendance",
        "/api/admin/finance",
        "/api/admin/analytics",
        "/api/admin/settings",
        "/api/notifications",
      ];

  endpoints.forEach((ep, i) => {
    setTimeout(() => prefetchApi(ep), i * 15);
  });
}

/**
 * High-performance Stale-While-Revalidate (SWR) hook.
 * Returns cached data immediately on mount, then fetches fresh data from the server in background.
 * Also supports auto-revalidation on window focus and auto-polling.
 */
export function useFastFetch<T = any>(
  url: string | null,
  initialFallback?: T,
  options: { pollIntervalMs?: number; disableAutoRevalidate?: boolean } = {}
): { data: T | null; isLoading: boolean; isRevalidating: boolean; error: any; refetch: () => Promise<void> } {
  const getCached = useCallback(() => {
    if (!url) return null;
    const entry = memoryCache.get(url);
    if (entry && entry.data !== undefined) return entry.data;
    return getFromStorage(url);
  }, [url]);

  const [data, setData] = useState<T | null>(() => {
    const cached = getCached();
    return cached !== null && cached !== undefined ? cached : (initialFallback ?? null);
  });

  const [isLoading, setIsLoading] = useState<boolean>(() => {
    if (!url) return false;
    return getCached() === null;
  });

  const [isRevalidating, setIsRevalidating] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const isMountedRef = useRef(true);

  // Sync cache immediately when url changes
  useEffect(() => {
    if (!url) {
      setData(null);
      setIsLoading(false);
      return;
    }
    const cached = memoryCache.get(url)?.data ?? getFromStorage(url);
    if (cached !== undefined && cached !== null) {
      setData(cached);
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [url]);

  const executeFetch = useCallback(
    async (isManual = false) => {
      if (!url) return;

      const cached = memoryCache.get(url)?.data ?? getFromStorage(url);
      if (!isManual && cached !== undefined && cached !== null) {
        setIsLoading(false);
        setIsRevalidating(true);
      } else if (isManual || cached === undefined || cached === null) {
        setIsLoading(true);
      }

      try {
        let fetchPromise = inflightRequests.get(url);
        if (!fetchPromise) {
          fetchPromise = (async () => {
            const headers = getAuthHeaders(url.includes("/api/auth/me"));
            const res = await fetch(url, {
              credentials: "include",
              headers: Object.keys(headers).length > 0 ? headers : undefined,
            });
            if (!res.ok) {
              throw new Error(`Request failed with status ${res.status}`);
            }
            return await res.json();
          })();
          inflightRequests.set(url, fetchPromise);
        }

        const json = await fetchPromise;
        memoryCache.set(url, { data: json, timestamp: Date.now() });
        saveToStorage(url, json);

        if (isMountedRef.current) {
          setData(json);
          setError(null);
        }
      } catch (err) {
        if (isMountedRef.current) {
          setError(err);
        }
      } finally {
        inflightRequests.delete(url);
        if (isMountedRef.current) {
          setIsLoading(false);
          setIsRevalidating(false);
        }
      }
    },
    [url]
  );

  useEffect(() => {
    isMountedRef.current = true;
    executeFetch();

    // Revalidate on window focus
    const handleFocus = () => {
      executeFetch();
    };
    window.addEventListener("focus", handleFocus);

    // Listen for global cache invalidations
    const handleInvalidation = (prefix: string) => {
      if (url && url.startsWith(prefix)) {
        executeFetch(true);
      }
    };
    cacheListeners.add(handleInvalidation);

    // Optional polling interval (default every 10 seconds for live sync)
    const pollInterval = options.pollIntervalMs || 10000;
    let timer: any = null;
    if (!options.disableAutoRevalidate) {
      timer = setInterval(() => {
        executeFetch();
      }, pollInterval);
    }

    return () => {
      isMountedRef.current = false;
      window.removeEventListener("focus", handleFocus);
      cacheListeners.delete(handleInvalidation);
      if (timer) clearInterval(timer);
    };
  }, [url, executeFetch, options.pollIntervalMs, options.disableAutoRevalidate]);

  return {
    data,
    isLoading,
    isRevalidating,
    error,
    refetch: () => executeFetch(true),
  };
}

/**
 * Manually update client memory cache for an endpoint
 */
export function setCachedData(url: string, data: any) {
  memoryCache.set(url, { data, timestamp: Date.now() });
  saveToStorage(url, data);
  cacheListeners.forEach((listener) => listener(url));
}

/**
 * Invalidate cache key prefix and notify all active listeners to refresh immediately
 */
export function invalidateCache(urlPrefix: string = "") {
  if (!urlPrefix || urlPrefix === "/api" || urlPrefix === "all") {
    memoryCache.clear();
    inflightRequests.clear();
  } else {
    for (const key of memoryCache.keys()) {
      if (key.startsWith(urlPrefix)) {
        memoryCache.delete(key);
      }
    }
  }

  if (typeof window !== "undefined") {
    try {
      const prefix = `mantif_cache_${urlPrefix}`;
      const toRemoveSession: string[] = [];
      const toRemoveLocal: string[] = [];
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        if (key && (urlPrefix === "" || urlPrefix === "/api" || urlPrefix === "all" ? key.startsWith("mantif_cache_") : key.startsWith(prefix))) {
          toRemoveSession.push(key);
        }
      }
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (urlPrefix === "" || urlPrefix === "/api" || urlPrefix === "all" ? key.startsWith("mantif_cache_") : key.startsWith(prefix))) {
          toRemoveLocal.push(key);
        }
      }
      toRemoveSession.forEach((k) => sessionStorage.removeItem(k));
      toRemoveLocal.forEach((k) => localStorage.removeItem(k));
    } catch {
      // ignore
    }
  }

  cacheListeners.forEach((listener) => listener(urlPrefix));
}

/**
 * Hard reset all client auth tokens, session state, and memory caches
 */
export function clearAuthAndCaches() {
  memoryCache.clear();
  inflightRequests.clear();
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem("acuity_auth_token");
      localStorage.removeItem("acuity_user_name");
      localStorage.removeItem("acuity_user_role");
      sessionStorage.removeItem("acuity_auth_token");

      const toRemoveSession: string[] = [];
      const toRemoveLocal: string[] = [];
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        if (key && key.startsWith("mantif_cache_")) {
          toRemoveSession.push(key);
        }
      }
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("mantif_cache_")) {
          toRemoveLocal.push(key);
        }
      }
      toRemoveSession.forEach((k) => sessionStorage.removeItem(k));
      toRemoveLocal.forEach((k) => localStorage.removeItem(k));
    } catch {
      // ignore
    }
  }
  cacheListeners.forEach((listener) => listener("all"));
}
