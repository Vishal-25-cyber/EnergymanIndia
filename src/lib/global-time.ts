"use client";

import { useState, useEffect } from "react";

// Official Institutional Timezone: Indian Standard Time (UTC+05:30)
export const GLOBAL_TIMEZONE = "Asia/Kolkata";
export const GLOBAL_TIMEZONE_LABEL = "IST (UTC+05:30)";

// Monotonic Global Time State (Untamperable via client OS clock adjustments)
let serverBaselineMs: number | null = null;
let monotonicBaselineMs: number = 0;
let isGloballySynchronized = false;

/**
 * Initializes or updates the global authoritative time baseline using server time.
 * Pairs server time with the browser's monotonic performance.now() clock.
 */
export function initGlobalTime(serverIsoOrMs?: string | number) {
  if (!serverIsoOrMs) return;
  try {
    const parsed =
      typeof serverIsoOrMs === "string"
        ? new Date(serverIsoOrMs).getTime()
        : serverIsoOrMs;

    if (!isNaN(parsed) && parsed > 0) {
      serverBaselineMs = parsed;
      monotonicBaselineMs =
        typeof performance !== "undefined" && typeof performance.now === "function"
          ? performance.now()
          : 0;
      isGloballySynchronized = true;
    }
  } catch (err) {
    console.warn("Global time sync parse error:", err);
  }
}

/**
 * Returns the current live timestamp in milliseconds, synchronized with global server time.
 * Immune to user changing their local system clock because performance.now() is strictly monotonic.
 */
export function getGlobalNowMs(): number {
  if (
    serverBaselineMs !== null &&
    typeof performance !== "undefined" &&
    typeof performance.now === "function"
  ) {
    const elapsed = performance.now() - monotonicBaselineMs;
    return serverBaselineMs + elapsed;
  }
  return Date.now();
}

/**
 * Returns a Date object representing the current live global time.
 */
export function getGlobalNow(): Date {
  return new Date(getGlobalNowMs());
}

/**
 * Checks whether a given due date has passed according to the untamperable global time.
 */
export function isPastGlobalDeadline(dueDate: string | Date | undefined | null): boolean {
  if (!dueDate) return false;
  const d = typeof dueDate === "string" ? new Date(dueDate) : dueDate;
  if (isNaN(d.getTime())) return false;
  return getGlobalNowMs() > d.getTime();
}

/**
 * Formats a Date or timestamp string in the official institutional timezone (Asia/Kolkata).
 */
export function formatGlobalDateTime(
  date: string | Date | undefined | null,
  options?: Intl.DateTimeFormatOptions
): string {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  if (isNaN(d.getTime())) return "";

  const defaultOptions: Intl.DateTimeFormatOptions = {
    timeZone: GLOBAL_TIMEZONE,
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  try {
    return new Intl.DateTimeFormat("en-IN", options || defaultOptions).format(d);
  } catch (e) {
    return d.toLocaleString();
  }
}

/**
 * Human-readable due date formatter in live institutional timezone (Asia/Kolkata).
 * Example: "Due: 24 Sep at 11:59 PM (IST)"
 */
export function formatGlobalDueDateTime(dStr: string | Date | undefined | null): string {
  if (!dStr) return "No deadline";
  const d = typeof dStr === "string" ? new Date(dStr) : dStr;
  if (isNaN(d.getTime())) return "No deadline";

  try {
    const datePart = new Intl.DateTimeFormat("en-IN", {
      timeZone: GLOBAL_TIMEZONE,
      day: "numeric",
      month: "short",
    }).format(d);

    const timePart = new Intl.DateTimeFormat("en-IN", {
      timeZone: GLOBAL_TIMEZONE,
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(d);

    return `Due: ${datePart} at ${timePart}`;
  } catch (e) {
    return `Due: ${d.toLocaleDateString()}`;
  }
}

/**
 * Formats current live time into HH:MM:SS AM/PM IST.
 */
export function formatLiveClock(date?: Date): string {
  const d = date || getGlobalNow();
  try {
    return new Intl.DateTimeFormat("en-IN", {
      timeZone: GLOBAL_TIMEZONE,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }).format(d);
  } catch (e) {
    return d.toLocaleTimeString();
  }
}

/**
 * React hook that provides an untamperable, live ticking global clock in Asia/Kolkata (IST).
 * Periodically pings /api/time to maintain synchronization.
 */
export function useLiveGlobalTime(initialServerTime?: string | number) {
  if (initialServerTime && !isGloballySynchronized) {
    initGlobalTime(initialServerTime);
  }

  const [liveNow, setLiveNow] = useState<Date>(() => getGlobalNow());
  const [liveTimeStr, setLiveTimeStr] = useState<string>(() => formatLiveClock());
  const [isSynced, setIsSynced] = useState<boolean>(isGloballySynchronized);

  useEffect(() => {
    // 1. Initial sync fetch if not already initialized
    const syncWithServer = async () => {
      try {
        const res = await fetch("/api/time", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (data.serverTimeMs) {
            initGlobalTime(data.serverTimeMs);
            setIsSynced(true);
          }
        }
      } catch (err) {
        // Fallback to local monotonic clock
      }
    };

    if (!isGloballySynchronized) {
      syncWithServer();
    }

    // 2. High-precision 1-second ticker using monotonic clock
    const ticker = setInterval(() => {
      const now = getGlobalNow();
      setLiveNow(now);
      setLiveTimeStr(formatLiveClock(now));
      setIsSynced(isGloballySynchronized);
    }, 1000);

    // 3. Periodic 60-second resync with server to ensure zero clock drift
    const resyncInterval = setInterval(() => {
      syncWithServer();
    }, 60000);

    // 4. Resync when window gains focus or visibility returns
    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        syncWithServer();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("focus", syncWithServer);

    return () => {
      clearInterval(ticker);
      clearInterval(resyncInterval);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("focus", syncWithServer);
    };
  }, []);

  return {
    globalNow: liveNow,
    liveTimeStr,
    isSynced,
    timeZone: GLOBAL_TIMEZONE,
    timeZoneLabel: GLOBAL_TIMEZONE_LABEL,
    getGlobalNowMs,
    isPastGlobalDeadline,
    formatGlobalDueDateTime,
  };
}
