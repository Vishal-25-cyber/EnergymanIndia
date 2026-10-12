"use client";

import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, BookOpen, FileText, CheckCircle2, AlertCircle, Trash2, GraduationCap } from "lucide-react";
import { CLASS_LIST } from "@/lib/curriculum";

interface EditClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  sessionDoc: any;
  onSuccess: () => void;
  onDelete?: (classId: string) => void;
}

const COMMON_SUBJECTS = [
  "Mathematics",
  "Science",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "Social Science",
  "Computer Science",
];

export function EditClassModal({
  isOpen,
  onClose,
  sessionDoc,
  onSuccess,
  onDelete,
}: EditClassModalProps) {
  const [classLevel, setClassLevel] = useState("Class 10");
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("18:00");
  const [endTime, setEndTime] = useState("19:00");
  const [description, setDescription] = useState("");
  const [allocatedClasses, setAllocatedClasses] = useState<string[]>([]);
  const [allocatedSubjects, setAllocatedSubjects] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    async function loadAllocations() {
      try {
        const token =
          typeof window !== "undefined"
            ? localStorage.getItem("acuity_auth_token") || sessionStorage.getItem("acuity_auth_token") || ""
            : "";
        const res = await fetch("/api/teacher/profile", {
          credentials: "include",
          headers: token ? { Authorization: `Bearer ${token}`, "x-auth-token": token } : {},
        });
        if (res.ok) {
          const d = await res.json();
          if (d.allocatedClasses?.length) setAllocatedClasses(d.allocatedClasses);
          if (d.allocatedSubjects?.length) setAllocatedSubjects(d.allocatedSubjects);
        }
      } catch (e) {
        console.error("Error loading allocations:", e);
      }
    }
    if (isOpen) {
      loadAllocations();
    }
  }, [isOpen]);

  useEffect(() => {
    if (sessionDoc) {
      setClassLevel(sessionDoc.classLevel || "Class 10");
      setSubject(sessionDoc.subject || "Mathematics");
      setTopic(sessionDoc.topic || "");
      setDate(sessionDoc.date || new Date().toISOString().split("T")[0]);
      setStartTime(sessionDoc.startTime || "18:00");
      setEndTime(sessionDoc.endTime || "19:00");
      setDescription(sessionDoc.description || "");
      setErrorMessage("");
      setSuccessMessage("");
    }
  }, [sessionDoc]);

  if (!sessionDoc) return null;

  const classOptions = allocatedClasses.length > 0 ? allocatedClasses : CLASS_LIST;
  const subjectOptions = allocatedSubjects.length > 0 ? allocatedSubjects : COMMON_SUBJECTS;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !topic.trim() || !date || !startTime || !endTime) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("acuity_auth_token") || sessionStorage.getItem("acuity_auth_token") || ""
          : "";
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
        headers["x-auth-token"] = token;
      }

      const res = await fetch(`/api/classes/${sessionDoc._id}`, {
        method: "PUT",
        headers,
        credentials: "include",
        body: JSON.stringify({
          classLevel: classLevel.trim(),
          subject: subject.trim(),
          topic: topic.trim(),
          title: `${classLevel.trim()} ${subject.trim()} — ${topic.trim()}`,
          date,
          startTime,
          endTime,
          description: description.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.error || "Failed to update class.");
        return;
      }

      setSuccessMessage("Class session updated successfully!");
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 900);
    } catch (err: any) {
      setErrorMessage(err.message || "Network error while updating class.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Class Session"
      description="Update subject, topic, timing, or description. Changes take effect immediately on student timetables."
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-1">
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

        {/* Class and Subject Selection Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-[#004b79] dark:text-[#dfb74a]" />
                <span>Class / Grade</span>
              </span>
              {allocatedClasses.length > 0 && (
                <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                  {allocatedClasses.length} allocated
                </span>
              )}
            </label>
            <select
              value={classLevel}
              onChange={(e) => setClassLevel(e.target.value)}
              className="flex h-10 w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-xs font-bold text-slate-900 dark:text-slate-100 focus:outline-none focus:border-[#004b79]"
            >
              {classOptions.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#004b79] dark:text-[#dfb74a]" />
                <span>Subject</span>
              </span>
              {allocatedSubjects.length > 0 && (
                <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                  {allocatedSubjects.length} allocated
                </span>
              )}
            </label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="flex h-10 w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-xs font-bold text-slate-900 dark:text-slate-100 focus:outline-none focus:border-[#004b79]"
            >
              {subjectOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Topic */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-[#004b79] dark:text-[#dfb74a]" />
            <span>Curriculum Topic / Chapter</span>
          </label>
          <Input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. Quadratic Equations & Coordinate Geometry"
            className="text-xs font-medium"
            required
          />
        </div>

        {/* Date and Times */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Date</span>
            </label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="text-xs font-medium"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Start Time</span>
            </label>
            <Input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="text-xs font-medium font-mono"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>End Time</span>
            </label>
            <Input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="text-xs font-medium font-mono"
              required
            />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
            Notes / Learning Scope (Optional)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            placeholder="Key concepts, formula sheets, homework review..."
            className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2.5 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-[#004b79]"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
          {onDelete ? (
            <button
              type="button"
              onClick={() => {
                if (window.confirm(`Are you sure you want to permanently delete "${sessionDoc.title || "this class"}"? It will be removed from student timetables.`)) {
                  onDelete(sessionDoc._id);
                  onClose();
                }
              }}
              className="text-xs font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/40 px-3 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Class</span>
            </button>
          ) : (
            <div />
          )}
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
              className="text-xs font-bold"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-[#004b79] hover:bg-[#003b60] text-white text-xs font-bold shadow-xs"
            >
              {isLoading ? "Saving Changes..." : "Save Class Changes"}
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
