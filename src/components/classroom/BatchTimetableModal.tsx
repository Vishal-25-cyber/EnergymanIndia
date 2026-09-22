"use client";

import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, BookOpen, User, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";

interface BatchTimetableModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const COMMON_SUBJECTS = [
  "Mathematics",
  "Science",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "Social Science",
];

export function BatchTimetableModal({
  isOpen,
  onClose,
  onSuccess,
}: BatchTimetableModalProps) {
  const [batches, setBatches] = useState<any[]>([]);
  const [teachers, setTeachers] = useState<any[]>([]);
  const [selectedBatchId, setSelectedBatchId] = useState<string>("");
  const [scheduleData, setScheduleData] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const getAuthHeaders = () => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("acuity_auth_token") || sessionStorage.getItem("acuity_auth_token") || ""
        : "";
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
      headers["x-auth-token"] = token;
    }
    return headers;
  };

  const loadData = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/teacher/schedule/batch-timetable", {
        headers: getAuthHeaders(),
        credentials: "include",
      });
      const data = await res.json();
      if (data.batches && Array.isArray(data.batches)) {
        setBatches(data.batches);
        if (!selectedBatchId && data.batches.length > 0) {
          setSelectedBatchId(data.batches[0]._id);
        }
      }
      if (data.teachers && Array.isArray(data.teachers)) {
        setTeachers(data.teachers);
      }
    } catch (err: any) {
      setErrorMessage("Failed to load batches and timetable.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
      setErrorMessage("");
      setSuccessMessage("");
    }
  }, [isOpen]);

  // When selectedBatchId changes, populate scheduleData from that batch
  useEffect(() => {
    if (!selectedBatchId || batches.length === 0) return;
    const batch = batches.find((b) => b._id === selectedBatchId);
    if (!batch) return;

    const map: Record<string, any> = {};
    const existingList = Array.isArray(batch.weeklySchedule) ? batch.weeklySchedule : [];
    const byDay = new Map<string, any>();
    for (const item of existingList) {
      if (item?.day) byDay.set(item.day.toLowerCase(), item);
    }

    const defaultTeacherId = batch.assignedTeacherIds?.[0]?._id || teachers[0]?._id || "";

    for (const day of DAYS) {
      const ex = byDay.get(day.toLowerCase());
      map[day] = {
        day,
        subject: ex?.subject || (day === "Tuesday" || day === "Thursday" ? "Science" : "Mathematics"),
        topic: ex?.topic || "",
        startTime: ex?.startTime || batch.startTime || "18:00",
        endTime: ex?.endTime || batch.endTime || "19:00",
        teacherId: (typeof ex?.teacherId === "object" ? ex.teacherId?._id : ex?.teacherId) || defaultTeacherId,
        isEnabled: ex ? ex.isEnabled !== false : true,
      };
    }

    setScheduleData(map);
  }, [selectedBatchId, batches, teachers]);

  const handleDayFieldChange = (day: string, field: string, value: any) => {
    setScheduleData((prev) => ({
      ...prev,
      [day]: {
        ...(prev[day] || {}),
        [field]: value,
      },
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBatchId) return;

    setIsSaving(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const weeklySchedule = DAYS.map((day) => {
        const item = scheduleData[day] || {};
        return {
          day,
          subject: item.subject || "Mathematics",
          topic: item.topic || "",
          startTime: item.startTime || "18:00",
          endTime: item.endTime || "19:00",
          teacherId: item.teacherId || undefined,
          isEnabled: item.isEnabled !== false,
        };
      });

      const res = await fetch("/api/teacher/schedule/batch-timetable", {
        method: "POST",
        headers: getAuthHeaders(),
        credentials: "include",
        body: JSON.stringify({
          batchId: selectedBatchId,
          weeklySchedule,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.error || "Failed to update timetable.");
        return;
      }

      setSuccessMessage("Weekly batch timetable saved! Student view has been updated.");
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 1000);
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to save timetable.");
    } finally {
      setIsSaving(false);
    }
  };

  const currentBatch = batches.find((b) => b._id === selectedBatchId);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Configure Batch Weekly Timetable"
      description="Set what subject, curriculum topic, and faculty is conducted on each day of the week for this batch."
      maxWidth="3xl"
    >
      <form onSubmit={handleSave} className="space-y-4 pt-1">
        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Batch Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Select Batch Slot
            </label>
            <p className="text-[11px] text-slate-500">
              Classes configured here will immediately update student schedules for this batch.
            </p>
          </div>

          <select
            value={selectedBatchId}
            onChange={(e) => setSelectedBatchId(e.target.value)}
            className="flex h-9 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-1 text-xs font-bold text-[#004b79] dark:text-[#dfb74a] focus:outline-none focus:border-[#004b79]"
          >
            {batches.map((b) => (
              <option key={b._id} value={b._id}>
                {b.name} ({b.startTime} – {b.endTime})
              </option>
            ))}
          </select>
        </div>

        {/* 6-Day Schedule Form */}
        <div className="space-y-3 max-h-[55vh] overflow-y-auto pr-1">
          {DAYS.map((day) => {
            const item = scheduleData[day] || {
              day,
              subject: "Mathematics",
              topic: "",
              startTime: currentBatch?.startTime || "18:00",
              endTime: currentBatch?.endTime || "19:00",
              isEnabled: true,
            };

            return (
              <div
                key={day}
                className={`p-3.5 rounded-xl border transition-colors space-y-2.5 ${
                  item.isEnabled
                    ? "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                    : "bg-slate-50 dark:bg-slate-900/40 border-slate-200/60 dark:border-slate-800/50 opacity-60"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`day-${day}`}
                      checked={item.isEnabled}
                      onChange={(e) => handleDayFieldChange(day, "isEnabled", e.target.checked)}
                      className="w-4 h-4 rounded text-[#004b79] focus:ring-[#004b79] cursor-pointer"
                    />
                    <label
                      htmlFor={`day-${day}`}
                      className="text-xs font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200 cursor-pointer"
                    >
                      {day}
                    </label>
                  </div>

                  <span className="text-[11px] font-mono text-slate-400">
                    {item.startTime} – {item.endTime}
                  </span>
                </div>

                {item.isEnabled && (
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 pt-1">
                    {/* Subject */}
                    <div className="sm:col-span-3">
                      <select
                        value={item.subject}
                        onChange={(e) => handleDayFieldChange(day, "subject", e.target.value)}
                        className="w-full h-8 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-2 text-xs font-bold text-slate-900 dark:text-slate-100"
                      >
                        {COMMON_SUBJECTS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Topic */}
                    <div className="sm:col-span-5">
                      <Input
                        value={item.topic}
                        onChange={(e) => handleDayFieldChange(day, "topic", e.target.value)}
                        placeholder="Curriculum topic / chapter..."
                        className="h-8 text-xs"
                      />
                    </div>

                    {/* Assigned Teacher */}
                    <div className="sm:col-span-4">
                      <select
                        value={item.teacherId}
                        onChange={(e) => handleDayFieldChange(day, "teacherId", e.target.value)}
                        className="w-full h-8 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-2 text-xs font-medium text-slate-700 dark:text-slate-300"
                      >
                        {teachers.map((t) => (
                          <option key={t._id} value={t._id}>
                            {t.name} (Faculty)
                          </option>
                        ))}
                        {teachers.length === 0 && <option value="">Assigned Faculty</option>}
                      </select>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isSaving}
            className="text-xs font-bold"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSaving || isLoading}
            className="bg-[#004b79] hover:bg-[#003b60] text-white text-xs font-bold shadow-xs"
          >
            {isSaving ? "Saving Timetable..." : "Save Batch Timetable"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
