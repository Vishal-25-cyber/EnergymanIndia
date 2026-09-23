"use client";

import React from "react";
import Link from "next/link";
import {
  Video,
  Clock,
  User,
  CalendarDays,
  Radio,
  ArrowRight,
  Lock,
  Download,
  Check,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFastFetch } from "@/lib/api-cache";
import { downloadTimetableDoc } from "@/lib/download";
import { useClassLiveTimer } from "@/lib/use-class-timer";

const DAYS_OF_WEEK = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function StudentClassesPage() {
  const { data } = useFastFetch<any>("/api/student/classes", undefined, { pollIntervalMs: 3000 });
  const [isDownloading, setIsDownloading] = React.useState(false);
  const [isDownloaded, setIsDownloaded] = React.useState(false);

  // Live real-time current day from browser's local timezone
  const [liveDay, setLiveDay] = React.useState<string>(() => {
    return typeof window !== "undefined" ? DAYS_OF_WEEK[new Date().getDay()] : "Tuesday";
  });

  React.useEffect(() => {
    const updateDay = () => setLiveDay(DAYS_OF_WEEK[new Date().getDay()]);
    updateDay();
    const interval = setInterval(updateDay, 1000);
    return () => clearInterval(interval);
  }, []);

  const currentClass = data?.currentClass || "Class 10";
  const board = data?.board || "CBSE";
  const currentDay = liveDay || data?.currentDay || "Tuesday";
  const batch = data?.batch;
  const batchName = batch?.name || "7:00 PM – 8:00 PM";

  // Real-time live timer & meeting lock status
  const timing = useClassLiveTimer(batch);
  const todayDateStr = new Date().toISOString().split("T")[0];
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const isWithinClassWindow = (c: any) => {
    if (!c) return false;
    if (c.status === "LIVE") return true;
    if (c.status === "PUBLISHED" || c.status === "SCHEDULED") {
      const [sh = "0", sm = "0"] = (c.startTime || "").split(":");
      const [eh = "23", em = "59"] = (c.endTime || "").split(":");
      const startMin = parseInt(sh, 10) * 60 + parseInt(sm, 10);
      const endMin = parseInt(eh, 10) * 60 + parseInt(em, 10);
      const isOvernight = endMin < startMin;
      const effectiveEndMin = isOvernight ? endMin + 1440 : endMin;
      const effectiveCurrentMin =
        isOvernight && currentMinutes < startMin - 15
          ? currentMinutes + 1440
          : currentMinutes;
      return effectiveCurrentMin >= (startMin - 15) && effectiveCurrentMin <= effectiveEndMin;
    }
    return false;
  };

  // Find real active live class or scheduled class actually created by the teacher
  const liveClassDoc =
    data?.classes?.filter((c: any) => c.status === "LIVE").sort((a: any, b: any) => {
      const tA = a.actualStartTime ? new Date(a.actualStartTime).getTime() : (a.createdAt ? new Date(a.createdAt).getTime() : 0);
      const tB = b.actualStartTime ? new Date(b.actualStartTime).getTime() : (b.createdAt ? new Date(b.createdAt).getTime() : 0);
      return tB - tA;
    })[0] || null;

  const todayDbClass = data?.classes?.find(
    (c: any) =>
      c.status !== "CANCELLED" &&
      c.status !== "COMPLETED" &&
      c.status !== "LIVE" &&
      (!c.date || c.date === todayDateStr)
  ) || null;

  const todayCompletedClass = data?.classes?.find(
    (c: any) =>
      c.status === "COMPLETED" &&
      (!c.date || c.date === todayDateStr)
  ) || null;

  const hasTeacherCreatedClass = Boolean(liveClassDoc || todayDbClass || todayCompletedClass);
  const isClassCurrentlyLive = Boolean(liveClassDoc && liveClassDoc.status === "LIVE");
  const liveOrTodayDbClass = liveClassDoc || todayDbClass;
  const activeDoc = liveClassDoc || todayDbClass || todayCompletedClass;

  const DAY_ORDER: Record<string, number> = {
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
    sunday: 7,
  };

  const todayOrder = DAY_ORDER[liveDay.toLowerCase()] || DAY_ORDER[currentDay.toLowerCase()] || 2;

  // Real schedule strictly as fixed by teacher & staff
  const apiScheduleList = Array.isArray(data?.weeklySchedule) ? data.weeklySchedule : [];

  const weeklySchedule = apiScheduleList.map((item: any) => {
    const isToday = liveDay.toLowerCase() === item.day?.toLowerCase() || currentDay.toLowerCase() === item.day?.toLowerCase();
    const itemDayOrder = DAY_ORDER[item.day?.toLowerCase()] || 1;

    const subject = (isToday && activeDoc?.subject) || item.subject;
    const topic = (isToday && (activeDoc?.topic || activeDoc?.title)) || item.topic;
    const faculty = (isToday && typeof activeDoc?.teacherId === "object" && activeDoc.teacherId?.name) 
      || item.faculty 
      || "Assigned Faculty";
    const time = item.time || batchName;
    const startTime = (isToday && activeDoc?.startTime) || item.startTime || batch?.startTime || "18:00";
    const endTime = (isToday && activeDoc?.endTime) || item.endTime || batch?.endTime || "19:00";
    const roomId = (isToday && activeDoc?.livekitRoomId) || item.roomId || timing.permanentRoomId;
    const description = item.description || "";

    let status = item.status || "SCHEDULED";
    let isLive = false;

    if (item.status === "OFF") {
      status = "OFF";
    } else if (itemDayOrder < todayOrder) {
      status = "COMPLETED";
    } else if (itemDayOrder > todayOrder) {
      status = "SCHEDULED";
    } else {
      // Today: strictly reflect real teacher class state
      if (isClassCurrentlyLive) {
        status = "LIVE";
        isLive = true;
      } else if (todayCompletedClass) {
        status = "COMPLETED";
      } else if (todayDbClass) {
        status = "SCHEDULED";
      } else {
        status = "NOT_CREATED";
      }
    }

    return {
      ...item,
      day: item.day,
      time,
      startTime,
      endTime,
      subject,
      topic,
      faculty,
      status,
      isLive,
      roomId,
      description,
      isToday,
      isConfigured: item.isConfigured !== false && item.status !== "OFF",
    };
  });

  const todayScheduleItem =
    weeklySchedule.find((s: any) => s.day?.toLowerCase() === currentDay.toLowerCase()) ||
    weeklySchedule.find((s: any) => s.day?.toLowerCase() === liveDay.toLowerCase()) ||
    weeklySchedule[0];

  const activeSubject = activeDoc?.subject || todayScheduleItem?.subject || "Live Classroom";
  const activeTopic =
    activeDoc?.topic ||
    activeDoc?.title ||
    todayScheduleItem?.topic ||
    "Interactive Academic Session";
  const activeFaculty =
    (typeof activeDoc?.teacherId === "object" && activeDoc?.teacherId?.name) ||
    todayScheduleItem?.faculty ||
    "Assigned Faculty";
  const activeRoomId =
    activeDoc?.livekitRoomId || activeDoc?.meetingId || todayScheduleItem?.roomId || timing.permanentRoomId;

  const getSubjectAccent = (subject?: string) => {
    switch (subject?.toLowerCase()) {
      case "mathematics":
        return { dot: "bg-indigo-500", text: "text-indigo-600 dark:text-indigo-400" };
      case "science":
      case "physics":
      case "chemistry":
        return { dot: "bg-emerald-500", text: "text-emerald-600 dark:text-emerald-400" };
      case "english":
        return { dot: "bg-amber-500", text: "text-amber-600 dark:text-amber-400" };
      case "social science":
        return { dot: "bg-rose-500", text: "text-rose-600 dark:text-rose-400" };
      default:
        return { dot: "bg-purple-500", text: "text-purple-600 dark:text-purple-400" };
    }
  };

  const handleDownloadTimetable = () => {
    setIsDownloading(true);
    setTimeout(() => {
      const success = downloadTimetableDoc({
        currentClass,
        board,
        batchName,
        weeklySchedule,
      });
      setIsDownloading(false);
      if (success) {
        setIsDownloaded(true);
        setTimeout(() => {
          setIsDownloaded(false);
        }, 3000);
      }
    }, 150);
  };

  return (
    <main className="w-full max-w-7xl mx-auto p-6 sm:p-8 space-y-6 sm:space-y-8 animate-in fade-in duration-150 select-none">

      {/* ── 1. CLEAN HEADER (NO CARDS) ── */}
      <div className="flex flex-row items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
          Live Classes & Timetable
        </h1>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleDownloadTimetable}
            disabled={isDownloading || weeklySchedule.length === 0}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-2xs cursor-pointer disabled:opacity-50"
          >
            {isDownloaded ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Downloaded</span>
              </>
            ) : isDownloading ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>Download Timetable</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* ── TUITION FEE LOCK PAYWALL (IF LOCKED & TRIAL EXPIRED) ── */}
      {data?.locked ? (
        <div className="py-6 sm:py-10 flex items-center justify-center">
          <div className="w-full max-w-xl p-8 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm text-center space-y-6">

            {/* Icon */}
            <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto ring-8 ring-amber-50/50 dark:ring-amber-950/20">
              {data.isUnderReview ? (
                <Clock className="w-7 h-7 animate-spin text-amber-600 dark:text-amber-400" />
              ) : (
                <Lock className="w-7 h-7 text-amber-600 dark:text-amber-400" />
              )}
            </div>

            {/* Title & Description */}
            <div className="space-y-2 max-w-md mx-auto">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                {data.isUnderReview ? "Tuition Payment Under Verification" : "Monthly Tuition Fee Payment Required"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {data.isUnderReview
                  ? "Your fee submission is currently under verification by the administration. Live class joining will unlock immediately upon approval."
                  : "Please clear your monthly tuition fee to attend live interactive coaching classes."}
              </p>
            </div>

            {/* Fee & Month Badge */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300">
              <span>Due Amount: <strong className="text-slate-900 dark:text-slate-100 font-bold">₹{data.unpaidFee?.amount || 1999}</strong></span>
              <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
              <span>Billing Cycle: <strong className="text-slate-900 dark:text-slate-100 font-bold">{data.unpaidFee?.billingMonth || "Current Cycle"}</strong></span>
            </div>

            {/* Features Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-left">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="text-[11px] font-medium text-slate-600 dark:text-slate-300">Live Video Classes</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="text-[11px] font-medium text-slate-600 dark:text-slate-300">Live Doubt Solving</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="text-[11px] font-medium text-slate-600 dark:text-slate-300">Attendance Log</span>
              </div>
            </div>

            {/* Call to Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/student/fees" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto px-6 py-2.5 text-xs font-bold bg-[#004b79] hover:bg-[#003b60] dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white rounded-xl shadow-xs transition-all cursor-pointer">
                  {data.isUnderReview ? "View Payment Verification Status →" : `Pay Tuition Fee (₹${data.unpaidFee?.amount || 1999}) →`}
                </Button>
              </Link>
              <Link href="/student/fees" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold rounded-xl border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 cursor-pointer">
                  View Fee Receipts & QR
                </Button>
              </Link>
            </div>

          </div>
        </div>
      ) : (
        <>
          {/* ── 2. CARDLESS ACTIVE LIVE SESSION SECTION ── */}
          <div className="pb-6 border-b border-slate-200 dark:border-slate-800">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">

              <div className="space-y-2 max-w-3xl">
                <div className="flex items-center gap-2.5 flex-wrap">
                  {isClassCurrentlyLive ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      CLASS IS LIVE NOW
                    </span>
                  ) : liveOrTodayDbClass ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400">
                      <Clock className="w-3.5 h-3.5 text-indigo-500" />
                      SCHEDULED FOR TODAY
                    </span>
                  ) : todayCompletedClass ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      TODAY'S CLASS COMPLETED
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      CLASS NOT CREATED YET
                    </span>
                  )}

                  <span className="text-slate-300 dark:text-slate-700">•</span>
                  <span className="text-xs font-mono font-medium text-slate-600 dark:text-slate-400">
                    {batchName}
                  </span>
                  {isClassCurrentlyLive && (
                    <>
                      <span className="text-slate-300 dark:text-slate-700">•</span>
                      <span className="text-xs font-mono text-slate-400">
                        Room: {activeRoomId}
                      </span>
                    </>
                  )}
                </div>

                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                  {hasTeacherCreatedClass
                    ? `${activeSubject}: ${activeTopic}`
                    : "Class is not created yet"}
                </h2>

                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  {hasTeacherCreatedClass ? (
                    <>
                      Instructor: <span className="font-medium text-slate-800 dark:text-slate-200">{activeFaculty}</span> • Direct Interactive Live Classroom
                    </>
                  ) : (
                    "Your teacher has not created or launched a live class for this batch today. The join button will appear automatically as soon as your teacher launches the class."
                  )}
                </p>
              </div>

              <div className="shrink-0">
                {isClassCurrentlyLive ? (
                  <Link href={`/classroom/${activeRoomId}`}>
                    <Button
                      size="lg"
                      className="font-bold text-sm px-6 py-5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white gap-2 shadow-sm cursor-pointer"
                    >
                      <Video className="w-4 h-4" />
                      <span>Join Live Classroom</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                ) : liveOrTodayDbClass ? (
                  <div className="space-y-1 text-left lg:text-right">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-semibold">
                      <Lock className="w-3.5 h-3.5 text-slate-400" />
                      <span>Starts at {liveOrTodayDbClass.startTime}</span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Live session scheduled for {batchName}
                    </p>
                  </div>
                ) : todayCompletedClass ? (
                  <div className="space-y-1 text-left lg:text-right">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-semibold border border-emerald-200/50">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Concluded for Today</span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Session completed · Replay & notes available
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1 text-left lg:text-right">
                    <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 text-xs font-semibold border border-amber-200/50">
                      <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>Class is not created yet</span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Batch slot: {batchName}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── 3. WEEKLY SCHEDULE TABLE (CARDLESS CLEAN TABLE DESIGN) ── */}
          <div className="space-y-4 pt-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <CalendarDays className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                  Weekly Class Timetable (Monday – Saturday)
                </h2>
              </div>
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                Batch Timing: <strong className="text-slate-800 dark:text-slate-200">{batchName}</strong>
              </span>
            </div>

            {/* Table Column Headers */}
            <div className="hidden md:grid grid-cols-12 gap-4 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
              <div className="col-span-3">Day &amp; Batch Time</div>
              <div className="col-span-5">Subject &amp; Curriculum Topic</div>
              <div className="col-span-2">Faculty Mentor</div>
              <div className="col-span-2 text-right">Class Status</div>
            </div>

            {/* Schedule Rows (Completely Cardless, Divider List) */}
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {weeklySchedule.map((item: any, idx: number) => {
                const isToday = item.isToday;
                const accent = getSubjectAccent(item.subject);

                return (
                  <div
                    key={idx}
                    className={`py-4 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 items-center transition-colors ${
                      isToday ? "bg-indigo-50/20 dark:bg-indigo-950/10 rounded-xl px-2.5 md:px-1" : ""
                    }`}
                  >
                    {/* Col 1: Day & Batch Time */}
                    <div className="col-span-3 space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900 dark:text-slate-100">
                          {item.day}
                        </span>
                        {isToday && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-indigo-600 text-white shrink-0">
                            Today
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-mono font-medium text-slate-600 dark:text-slate-400">
                        {item.time || batchName}
                      </p>
                    </div>

                    {/* Col 2: Subject & Topic */}
                    <div className="col-span-5 space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${item.status === "OFF" ? "bg-slate-300 dark:bg-slate-700" : accent.dot} shrink-0`} />
                        <span className={`text-xs font-bold ${item.status === "OFF" ? "text-slate-500 dark:text-slate-400" : accent.text}`}>
                          {item.subject}
                        </span>
                      </div>
                      <p className={`font-semibold text-xs sm:text-sm ${item.status === "OFF" ? "text-slate-500 dark:text-slate-400" : "text-slate-800 dark:text-slate-200"}`}>
                        {item.topic}
                      </p>
                      {item.description && item.status !== "OFF" && (
                        <p className="text-[11px] text-slate-400 line-clamp-1">
                          {item.description}
                        </p>
                      )}
                    </div>

                    {/* Col 3: Faculty */}
                    <div className="col-span-2">
                      <p className="font-medium text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                        {item.faculty}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {item.status === "OFF" ? "No Session" : "Assigned Faculty"}
                      </p>
                    </div>

                    {/* Col 4: Status / Join Action */}
                    <div className="col-span-2 flex items-center justify-start md:justify-end">
                      {item.status === "COMPLETED" ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200/60 dark:border-slate-700/60">
                          <Check className="w-3.5 h-3.5 text-slate-400 stroke-[2.5]" />
                          <span>COMPLETED</span>
                        </span>
                      ) : item.status === "LIVE" ? (
                        <Link href={`/classroom/${item.roomId || activeRoomId}`}>
                          <button className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors cursor-pointer shadow-xs animate-pulse">
                            <Video className="w-3.5 h-3.5" />
                            <span>Join Live</span>
                          </button>
                        </Link>
                      ) : isToday && item.status === "UPCOMING" ? (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200/70 dark:border-amber-800/50">
                          <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                          <span>Starts at {item.startTime}</span>
                        </div>
                      ) : item.status === "OFF" ? (
                        <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
                          Rest Day
                        </span>
                      ) : (
                        <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
                          Scheduled
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

    </main>
  );
}
