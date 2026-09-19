"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Bell,
  Check,
  CheckCheck,
  Inbox,
  BookOpen,
  FileCheck,
  Video,
  ShieldAlert,
  Info,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

interface NotificationItem {
  _id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  linkUrl?: string;
  createdAt: string;
}

const getTypeStyle = (type: string) => {
  switch (type?.toUpperCase()) {
    case "TEST":
    case "EXAM":
      return { icon: ShieldAlert, bg: "bg-rose-500/15", iconColor: "text-rose-400", dot: "bg-rose-500" };
    case "ASSIGNMENT":
    case "HOMEWORK":
      return { icon: FileCheck, bg: "bg-amber-500/15", iconColor: "text-amber-400", dot: "bg-amber-500" };
    case "LIVE_CLASS":
    case "LIVE":
    case "CLASS":
      return { icon: Video, bg: "bg-emerald-500/15", iconColor: "text-emerald-400", dot: "bg-emerald-500" };
    case "MATERIAL":
    case "STUDY":
      return { icon: BookOpen, bg: "bg-blue-500/15", iconColor: "text-blue-400", dot: "bg-blue-500" };
    case "GRADE":
    case "RESULT":
      return { icon: Sparkles, bg: "bg-purple-500/15", iconColor: "text-purple-400", dot: "bg-purple-500" };
    default:
      return { icon: Info, bg: "bg-slate-500/15", iconColor: "text-slate-400", dot: "bg-slate-400" };
  }
};

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown whenever user touches or clicks anywhere outside
  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideInteraction = (event: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideInteraction);
    document.addEventListener("touchstart", handleOutsideInteraction);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleOutsideInteraction);
      document.removeEventListener("touchstart", handleOutsideInteraction);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const loadNotifications = async () => {
    try {
      const res = await fetch("/api/notifications");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.notifications)) {
          setNotifications(data.notifications);
        }
      }
    } catch (err) {
      console.error("Failed to load notifications", err);
    }
  };

  useEffect(() => {
    loadNotifications();
    const interval = setInterval(loadNotifications, 15000);
    return () => clearInterval(interval);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = async (notificationId: string, e?: React.MouseEvent | React.SyntheticEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    // Optimistically mark as read immediately
    setNotifications((prev) =>
      prev.map((n) => (n._id === notificationId ? { ...n, read: true } : n))
    );
    try {
      await fetch("/api/notifications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ notificationId }),
      });
    } catch (err) {
      console.error("Failed to mark notification as read:", err);
    }
  };

  const markAllAsRead = async (e?: React.MouseEvent | React.SyntheticEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    try {
      await fetch("/api/notifications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ markAll: true }),
      });
    } catch (err) {
      console.error("Failed to mark all notifications as read:", err);
    }
  };

  const formatTimeAgo = (dateStr?: string) => {
    if (!dateStr) return "";
    try {
      const date = new Date(dateStr);
      const diffSec = Math.floor((Date.now() - date.getTime()) / 1000);
      if (diffSec < 60) return "Just now";
      const diffMin = Math.floor(diffSec / 60);
      if (diffMin < 60) return `${diffMin}m ago`;
      const diffHour = Math.floor(diffMin / 60);
      if (diffHour < 24) return `${diffHour}h ago`;
      const diffDay = Math.floor(diffHour / 24);
      if (diffDay < 7) return `${diffDay}d ago`;
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    } catch {
      return dateStr;
    }
  };

  // ── Reusable notification card with individual mark-as-read button ─────────
  const NotifCard = ({ n, onClose }: { n: NotificationItem; onClose: () => void }) => {
    const style = getTypeStyle(n.type);
    const Icon = style.icon;
    return (
      <div
        className={`group relative flex items-start gap-2.5 p-3 rounded-xl transition-all duration-150 border ${
          n.read
            ? "bg-slate-50/40 dark:bg-slate-900/30 border-transparent hover:bg-slate-100/60 dark:hover:bg-slate-800/40 opacity-80 hover:opacity-100"
            : "bg-white dark:bg-slate-800/80 border-slate-200/90 dark:border-slate-700/80 shadow-xs hover:shadow-md"
        }`}
      >
        <Link
          href={n.linkUrl || "#"}
          onClick={() => {
            markAsRead(n._id);
            onClose();
          }}
          className="flex-1 flex items-start gap-2.5 min-w-0 cursor-pointer"
        >
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${style.bg}`}>
            <Icon className={`w-4 h-4 ${style.iconColor}`} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-1.5 mb-0.5">
              <p
                className={`text-xs font-bold leading-tight truncate ${
                  n.read ? "text-slate-500 dark:text-slate-400 font-medium" : "text-slate-900 dark:text-slate-100"
                }`}
              >
                {n.title}
              </p>
              <span className="text-[10px] text-slate-400 font-mono shrink-0 mt-0.5">
                {formatTimeAgo(n.createdAt)}
              </span>
            </div>
            <p
              className={`text-[11px] leading-relaxed line-clamp-2 ${
                n.read ? "text-slate-400 dark:text-slate-500" : "text-slate-600 dark:text-slate-300"
              }`}
            >
              {n.message}
            </p>
          </div>
        </Link>

        {/* Individual Mark As Read / Checked Button */}
        <div className="shrink-0 flex items-center pt-0.5 relative z-20">
          {!n.read ? (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                markAsRead(n._id, e);
              }}
              title="Mark as read"
              aria-label="Mark as read"
              className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-700/80 hover:bg-emerald-100 dark:hover:bg-emerald-950/60 text-slate-500 hover:text-emerald-700 dark:hover:text-emerald-300 border border-slate-300 dark:border-slate-600 flex items-center justify-center transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95"
            >
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          ) : (
            <div
              title="Marked as read"
              className="w-7 h-7 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200/70 dark:border-emerald-800/50 flex items-center justify-center shadow-2xs"
            >
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Bell button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="View notifications"
        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all relative cursor-pointer ${
          isOpen
            ? "bg-[#004b79] text-white shadow-lg"
            : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200"
        }`}
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center shadow-md">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* ── NOTIFICATIONS DROPDOWN (SCROLLABLE, INDIVIDUAL READ, NO VIEW ALL BUTTON) ── */}
      {isOpen && (
        <div
          className="fixed sm:absolute inset-x-3 sm:inset-x-auto sm:right-0 top-16 sm:top-auto sm:mt-2 sm:w-[360px] max-w-[calc(100vw-1.5rem)] bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl z-50 overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150"
          style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.1)" }}
        >
          {/* Header */}
          <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-slate-900/60">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#004b79]/10 dark:bg-[#004b79]/25 flex items-center justify-center">
                <Bell className="w-3.5 h-3.5 text-[#004b79] dark:text-blue-400" />
              </div>
              <div>
                <p className="text-xs font-black text-slate-900 dark:text-slate-100 leading-none">Notifications</p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  {unreadCount > 0 ? `${unreadCount} unread` : "All caught up"}
                </p>
              </div>
            </div>
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllAsRead}
                className="text-[10px] font-bold text-[#004b79] dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer px-2 py-1 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors"
              >
                <CheckCheck className="w-3 h-3" />
                <span>Mark all read</span>
              </button>
            )}
          </div>

          {/* Scrollable Notification Items List */}
          <div className="p-2 space-y-1 max-h-[380px] overflow-y-auto overscroll-contain divide-y divide-slate-100/60 dark:divide-slate-800/40">
            {notifications.length === 0 ? (
              <div className="py-10 text-center">
                <Inbox className="w-7 h-7 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
                <p className="text-xs font-medium text-slate-400">No notifications yet</p>
              </div>
            ) : (
              notifications.map((n) => (
                <NotifCard key={n._id} n={n} onClose={() => setIsOpen(false)} />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
