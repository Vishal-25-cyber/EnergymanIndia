"use client";

import React, { useState, useEffect } from "react";
import {
  FileCheck,
  Plus,
  CheckCircle2,
  Clock,
  Eye,
  Download,
  ExternalLink,
  FileText,
  Calendar,
  Layers,
  Send,
  Sparkles,
  Maximize2,
  Image as ImageIcon,
  Check,
  Award,
  Video,
  ShieldAlert,
  Camera,
  Timer,
  UploadCloud,
  Upload,
  X,
  Paperclip,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { getSubjectsForClassAndBoard, CLASS_LIST } from "@/lib/curriculum";
import { useFastFetch, invalidateCache } from "@/lib/api-cache";
import { DocumentViewer, openDocumentInNewTab, downloadDocumentFile } from "@/components/common/DocumentViewer";
import { formatGlobalDueDateTime, formatGlobalDateTime, GLOBAL_TIMEZONE_LABEL } from "@/lib/global-time";

export default function TeacherAssignmentsPage() {
  // Category Tab: "ASSIGNMENT" | "TEST" | "HOMEWORK"
  const [activeCategory, setActiveCategory] = useState<"ASSIGNMENT" | "TEST" | "HOMEWORK">("ASSIGNMENT");

  const { data, refetch, isLoading } = useFastFetch("/api/teacher/assignments");
  const [isCreateModal, setIsCreateModal] = useState(false);
  const [selectedSub, setSelectedSub] = useState<any>(null);

  const [marks, setMarks] = useState<number | string>(18);
  const [feedback, setFeedback] = useState("");
  const [isGrading, setIsGrading] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishError, setPublishError] = useState("");
  const [isUploadingAttachment, setIsUploadingAttachment] = useState(false);
  const [uploadingFileName, setUploadingFileName] = useState("");

  // Safe Document Opener: prevents Chrome about:blank issues on data: URLs
  const openDocumentSafely = (fileUrl: string, fileName?: string) => {
    openDocumentInNewTab(fileUrl, fileName);
  };

  const [formData, setFormData] = useState({
    type: "ASSIGNMENT" as "ASSIGNMENT" | "TEST" | "HOMEWORK",
    title: "",
    description: "",
    subject: "Mathematics",
    classLevel: "Class 10",
    batchId: "",
    durationMinutes: 45,
    proctoringRequired: true,
    dueDate: "",
    dueTime: "21:00",
    maxMarks: 20,
    attachmentUrl: "",
    attachmentName: "",
    attachmentSize: "",
  });

  const handleQuestionPaperUpload = async (file: File) => {
    if (!file) return;

    const defaultTitle = file.name.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " ");
    const sizeStr =
      file.size > 1024 * 1024
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
        : `${Math.round(file.size / 1024)} KB`;

    // Pre-populate title if empty
    setFormData((prev) => ({
      ...prev,
      title: prev.title.trim() ? prev.title : defaultTitle,
      attachmentName: file.name,
      attachmentSize: sizeStr,
    }));

    setIsUploadingAttachment(true);
    setUploadingFileName(file.name);
    setPublishError("");

    try {
      const token = typeof window !== "undefined"
        ? localStorage.getItem("acuity_auth_token") || sessionStorage.getItem("acuity_auth_token") || ""
        : "";

      const uploadBody = new FormData();
      uploadBody.append("file", file);

      const res = await fetch("/api/teacher/assignments/upload", {
        method: "POST",
        credentials: "include",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}`, "x-auth-token": token } : {}),
        },
        body: uploadBody,
      });

      if (res.ok) {
        const uData = await res.json();
        setFormData((prev) => ({
          ...prev,
          title: prev.title.trim() ? prev.title : defaultTitle,
          attachmentUrl: uData.fileUrl,
          attachmentName: uData.fileName || file.name,
          attachmentSize: uData.fileSize || sizeStr,
        }));
        setIsUploadingAttachment(false);
        return;
      }
    } catch (uploadErr) {
      console.warn("Direct upload error, falling back to local encoding:", uploadErr);
    }

    // Fallback if direct endpoint fails: read as data URL and upload via JSON
    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUrl = e.target?.result as string;
      if (!dataUrl) {
        setIsUploadingAttachment(false);
        return;
      }

      try {
        const jsonRes = await fetch("/api/teacher/assignments/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fileData: dataUrl,
            fileName: file.name,
            fileType: file.type || "application/pdf",
          }),
        });

        if (jsonRes.ok) {
          const jData = await jsonRes.json();
          setFormData((prev) => ({
            ...prev,
            title: prev.title.trim() ? prev.title : defaultTitle,
            attachmentUrl: jData.fileUrl,
            attachmentName: jData.fileName || file.name,
            attachmentSize: jData.fileSize || sizeStr,
          }));
          setIsUploadingAttachment(false);
          return;
        }
      } catch (jsonErr) {
        console.warn("JSON upload fallback warning:", jsonErr);
      }

      setFormData((prev) => ({
        ...prev,
        title: prev.title.trim() ? prev.title : defaultTitle,
        attachmentUrl: dataUrl,
        attachmentName: file.name,
        attachmentSize: sizeStr,
      }));
      setIsUploadingAttachment(false);
    };
    reader.onerror = () => {
      setIsUploadingAttachment(false);
      setPublishError("Failed to read file.");
    };
    reader.readAsDataURL(file);
  };
  const [batches, setBatches] = useState<any[]>([]);

  const availableSubjects = Array.from(
    new Set([
      ...getSubjectsForClassAndBoard(formData.classLevel, "CBSE"),
      ...getSubjectsForClassAndBoard(formData.classLevel, "State Board"),
    ])
  );

  const handleClassChange = (newClass: string) => {
    const newSubjects = getSubjectsForClassAndBoard(newClass, "CBSE");
    setFormData((prev) => ({
      ...prev,
      classLevel: newClass,
      subject: newSubjects[0] || "Mathematics",
    }));
  };

  useEffect(() => {
    async function loadBatches() {
      try {
        const res = await fetch("/api/batches");
        const bData = await res.json();
        if (bData.batches && bData.batches.length > 0) {
          setBatches(bData.batches);
          if (!formData.batchId) {
            setFormData((prev) => ({ ...prev, batchId: bData.batches[0]._id }));
          }
        }
      } catch (e) {
        console.error(e);
      }
    }
    loadBatches();
  }, []);

  const [subTab, setSubTab] = useState<"PENDING" | "COMPLETED" | "ALL">("PENDING");

  const allAssignments = data?.assignments || [];
  const allSubmissions = data?.submissions || [];

  // Filter tasks by selected category
  const filteredAssignments = allAssignments.filter(
    (a: any) => (a.type || "ASSIGNMENT") === activeCategory
  );
  const categoryAssignmentIds = new Set(filteredAssignments.map((a: any) => a._id?.toString()));

  const filteredCategorySubmissions = allSubmissions.filter((s: any) => {
    const aId = s.assignmentId?._id?.toString() || s.assignmentId?.toString();
    return categoryAssignmentIds.has(aId) || (s.type || "ASSIGNMENT") === activeCategory;
  });

  const pendingSubmissions = filteredCategorySubmissions.filter((s: any) => s.status !== "EVALUATED");
  const gradedSubmissions = filteredCategorySubmissions.filter((s: any) => s.status === "EVALUATED");

  const displayedSubmissions =
    subTab === "PENDING"
      ? pendingSubmissions
      : subTab === "COMPLETED"
        ? gradedSubmissions
        : filteredCategorySubmissions;

  const [grantingRetestId, setGrantingRetestId] = useState<string | null>(null);

  const pendingRetestRequests = allSubmissions.filter(
    (s: any) => (s.retestRequested || s.retestStatus === "REQUESTED") && !s.retestPermitted
  );

  const [retestDecisionModal, setRetestDecisionModal] = useState<{
    isOpen: boolean;
    submission: any;
    action: "APPROVE" | "REJECT";
    reason: string;
    isSubmitting: boolean;
    error: string;
  }>({
    isOpen: false,
    submission: null,
    action: "APPROVE",
    reason: "",
    isSubmitting: false,
    error: "",
  });

  const openRetestDecisionModal = (sub: any, action: "APPROVE" | "REJECT") => {
    setRetestDecisionModal({
      isOpen: true,
      submission: sub,
      action,
      reason:
        action === "APPROVE"
          ? "Retest approved: Technical exception granted. Please ensure a stable internet connection and remain facing the camera throughout the test."
          : "",
      isSubmitting: false,
      error: "",
    });
  };

  const handleConfirmRetestDecision = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!retestDecisionModal.submission) return;
    if (retestDecisionModal.action === "REJECT" && !retestDecisionModal.reason.trim()) {
      setRetestDecisionModal((prev) => ({
        ...prev,
        error: "Please enter a specific reason for declining the retest request so the student knows why.",
      }));
      return;
    }

    setRetestDecisionModal((prev) => ({ ...prev, isSubmitting: true, error: "" }));
    try {
      const res = await fetch("/api/teacher/assignments/grant-retest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submissionId: retestDecisionModal.submission._id,
          action: retestDecisionModal.action,
          note: retestDecisionModal.reason.trim(),
        }),
      });
      const resData = await res.json();
      if (res.ok) {
        setRetestDecisionModal({
          isOpen: false,
          submission: null,
          action: "APPROVE",
          reason: "",
          isSubmitting: false,
          error: "",
        });
        invalidateCache("/api/teacher/assignments");
        invalidateCache("/api/student/assignments");
        refetch();
        alert(resData.message || (retestDecisionModal.action === "APPROVE" ? "Retest granted! Student has been notified." : "Retest declined."));
      } else {
        setRetestDecisionModal((prev) => ({
          ...prev,
          error: resData.error || "Failed to process decision.",
          isSubmitting: false,
        }));
      }
    } catch (err: any) {
      setRetestDecisionModal((prev) => ({
        ...prev,
        error: err.message || "Network error.",
        isSubmitting: false,
      }));
    }
  };

  const handleGrantRetest = async (submissionId: string, action: "APPROVE" | "REJECT" = "APPROVE", note?: string) => {
    setGrantingRetestId(submissionId);
    try {
      const res = await fetch("/api/teacher/assignments/grant-retest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ submissionId, action, note }),
      });
      const resData = await res.json();
      if (res.ok) {
        invalidateCache("/api/teacher/assignments");
        invalidateCache("/api/student/assignments");
        refetch();
        alert(resData.message || (action === "APPROVE" ? "Retest permission granted! Student has been notified." : "Retest request declined."));
      } else {
        alert(resData.error || "Failed to process retest request.");
      }
    } catch (e: any) {
      alert("Error processing retest: " + (e.message || "Network error"));
    } finally {
      setGrantingRetestId(null);
    }
  };

  const getSystemDateAndDefaultTime = (category?: string) => {
    const now = new Date();
    // For HOMEWORK and ASSIGNMENT: default to tomorrow at 23:59 IST so students always have time
    if (category === "HOMEWORK" || category === "ASSIGNMENT" || activeCategory === "HOMEWORK" || activeCategory === "ASSIGNMENT") {
      const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
      const year = tomorrow.getFullYear();
      const month = String(tomorrow.getMonth() + 1).padStart(2, "0");
      const day = String(tomorrow.getDate()).padStart(2, "0");
      return { dateStr: `${year}-${month}-${day}`, timeStr: "23:59" };
    }
    // For tests: target is 2 hours from now, safely handling date rollover across midnight
    const target = new Date(now.getTime() + 2 * 60 * 60 * 1000);
    const year = target.getFullYear();
    const month = String(target.getMonth() + 1).padStart(2, "0");
    const day = String(target.getDate()).padStart(2, "0");
    const timeStr = `${String(target.getHours()).padStart(2, "0")}:${String(target.getMinutes()).padStart(2, "0")}`;
    return { dateStr: `${year}-${month}-${day}`, timeStr };
  };

  const [syncingTaskId, setSyncingTaskId] = useState<string | null>(null);

  const handleSyncTaskToSystemTime = async (taskId: string, extendHours: number = 24) => {
    try {
      setSyncingTaskId(taskId);
      const now = new Date();
      // Advance due date by 24h into the future at 23:59:59
      const newDue = new Date(now.getTime() + extendHours * 60 * 60 * 1000);
      newDue.setHours(23, 59, 59, 0);

      const res = await fetch("/api/teacher/assignments", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assignmentId: taskId,
          dueDate: newDue.toISOString(),
          testDate: newDue.toISOString(),
        }),
      });
      if (res.ok) {
        invalidateCache("/api/teacher/assignments");
        invalidateCache("/api/student/assignments");
        refetch();
      }
    } catch (e) {
      console.error("Sync to system time error:", e);
    } finally {
      setSyncingTaskId(null);
    }
  };

  const formatDueDateTime = (dStr: string | Date) => {
    return formatGlobalDueDateTime(dStr);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setPublishError("");

    if (isUploadingAttachment) {
      setPublishError("Please wait for the question paper file to finish uploading before publishing.");
      return;
    }

    const targetBatchId = formData.batchId || batches[0]?._id;
    if (!formData.title.trim()) {
      setPublishError("Please enter a title or chapter topic.");
      return;
    }
    if (!targetBatchId && batches.length > 0) {
      setPublishError("Please select a target batch.");
      return;
    }

    setIsPublishing(true);

    try {
      let fullDueIso: string | undefined = undefined;
      if (formData.dueDate) {
        try {
          const timePart = formData.dueTime || "23:59";
          const [hours = "23", minutes = "59"] = timePart.split(":");
          let d: Date;
          if (formData.dueDate.includes("-")) {
            const parts = formData.dueDate.split("-").map(Number);
            if (parts[0] > 1000) {
              // YYYY-MM-DD
              d = new Date(parts[0], parts[1] - 1, parts[2], Number(hours) || 23, Number(minutes) || 59, 0);
            } else {
              // DD-MM-YYYY
              d = new Date(parts[2], parts[1] - 1, parts[0], Number(hours) || 23, Number(minutes) || 59, 0);
            }
          } else {
            d = new Date(formData.dueDate);
          }
          if (!isNaN(d.getTime())) {
            // Guard against accidental past due dates
            if (d.getTime() <= Date.now()) {
              d = new Date(d.getTime() + 24 * 60 * 60 * 1000);
            }
            fullDueIso = d.toISOString();
          }
        } catch (dateErr) {
          console.warn("Date parse error:", dateErr);
          fullDueIso = new Date(Date.now() + 86400000 * 3).toISOString();
        }
      }

      const token = typeof window !== "undefined"
        ? localStorage.getItem("acuity_auth_token") || sessionStorage.getItem("acuity_auth_token") || ""
        : "";

      const res = await fetch("/api/teacher/assignments", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}`, "x-auth-token": token } : {}),
        },
        body: JSON.stringify({
          ...formData,
          batchId: targetBatchId || "",
          title: formData.title.trim(),
          description: formData.description.trim() || `${formData.classLevel} ${formData.subject} — ${formData.title.trim()}`,
          type: activeCategory,
          dueDate: fullDueIso || formData.dueDate,
          testDate: fullDueIso || formData.dueDate,
          maxMarks: Number(formData.maxMarks) || (activeCategory === "TEST" ? 50 : 20),
          durationMinutes: activeCategory === "TEST" ? Number(formData.durationMinutes) || 45 : undefined,
          proctoringRequired: activeCategory === "TEST" ? formData.proctoringRequired : false,
          attachmentUrl: formData.attachmentUrl || "",
          attachmentName: formData.attachmentName || "",
          attachmentSize: formData.attachmentSize || "",
        }),
      });

      const resJson = await res.json().catch(() => ({}));

      if (res.ok) {
        setIsCreateModal(false);
        setPublishError("");
        setFormData({
          type: activeCategory,
          title: "",
          description: "",
          subject: availableSubjects[0] || "Mathematics",
          classLevel: "Class 10",
          batchId: batches[0]?._id || "",
          durationMinutes: 45,
          proctoringRequired: true,
          dueDate: "",
          dueTime: "21:00",
          maxMarks: activeCategory === "TEST" ? 50 : 20,
          attachmentUrl: "",
          attachmentName: "",
          attachmentSize: "",
        });
        invalidateCache("/api/teacher/assignments");
        invalidateCache("/api/student/assignments");
        refetch();
      } else {
        setPublishError(resJson.error || "Failed to create task. Please check the details.");
      }
    } catch (err: any) {
      console.error(err);
      setPublishError(err.message || "Network error. Please try again.");
    } finally {
      setIsPublishing(false);
    }
  };

  const handleGrade = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSub) return;
    setIsGrading(true);
    try {
      const res = await fetch("/api/teacher/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submissionId: selectedSub._id,
          marksObtained: Number(marks),
          feedback: feedback.trim() || "Good work, keep practicing!",
        }),
      });
      if (res.ok) {
        setSelectedSub(null);
        invalidateCache("/api/teacher/assignments");
        invalidateCache("/api/teacher/dashboard");
        invalidateCache("/api/student/assignments");
        refetch();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGrading(false);
    }
  };

  return (
    <main className="w-full max-w-7xl mx-auto p-6 sm:p-8 space-y-8 animate-in fade-in duration-150 select-none pb-24">
      {/* ── 1. HEADER & CATEGORY TABS ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
              Assignments, Tests &amp; Homework Hub
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Publish coursework assignments, schedule live proctored tests, and review student solution uploads separately.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => {
              const { dateStr, timeStr } = getSystemDateAndDefaultTime();
              setPublishError("");
              setIsPublishing(false);
              setFormData({
                type: activeCategory,
                title: "",
                description: "",
                subject: availableSubjects[0] || "Mathematics",
                classLevel: "Class 10",
                batchId: batches[0]?._id || "",
                durationMinutes: 45,
                proctoringRequired: true,
                dueDate: dateStr,
                dueTime: timeStr,
                maxMarks: activeCategory === "TEST" ? 50 : 20,
                attachmentUrl: "",
                attachmentName: "",
                attachmentSize: "",
              });
              setIsCreateModal(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-[#004b79] hover:bg-[#003b60] text-white transition-all cursor-pointer shadow-sm shadow-[#004b79]/20"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>
              Create {activeCategory === "TEST" ? "Proctored Test" : activeCategory === "HOMEWORK" ? "Daily Homework" : "Assignment"}
            </span>
          </button>
        </div>
      </div>

      {/* ── HIGH PRIORITY RETEST REQUESTS BANNER (Visible across all tabs) ── */}
      {pendingRetestRequests.length > 0 && (
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/90 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-700/80 shadow-sm space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-700 dark:text-amber-400 flex items-center justify-center font-bold shrink-0">
                <AlertTriangle className="w-5 h-5 text-amber-600 animate-pulse" />
              </span>
              <div>
                <h3 className="text-sm font-black text-amber-950 dark:text-amber-200 flex items-center gap-2">
                  <span>Student Retest Requests Awaiting Review</span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-black bg-amber-200 dark:bg-amber-800 text-amber-900 dark:text-amber-100">
                    {pendingRetestRequests.length} Pending
                  </span>
                </h3>
                <p className="text-xs text-amber-800/90 dark:text-amber-300/90">
                  Review student explanations and accept or reject with a reason to update their test access.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            {pendingRetestRequests.map((req: any) => {
              const studentName = req.studentId?.name || "Student";
              const testTitle = req.assignmentId?.title || req.type || "Proctored Test";
              const studentClass = req.assignmentId?.classLevel || "Class 10";
              const subject = req.assignmentId?.subject || "Subject";
              const reasonText = req.retestReason || "Student requested a retest.";

              return (
                <div
                  key={req._id}
                  className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-800 shadow-xs flex flex-col justify-between gap-3"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100">
                          {studentName}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-500">
                          ({studentClass} • {subject})
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                        Retest Requested
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-[#004b79] dark:text-[#dfb74a] truncate">
                      {testTitle}
                    </p>

                    <div className="p-2.5 rounded-lg bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-900/50 text-xs">
                      <span className="font-bold text-amber-900 dark:text-amber-200">Student Explanation: </span>
                      <span className="text-amber-950 dark:text-amber-100 italic">"{reasonText}"</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1 border-t border-slate-100 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={() => openRetestDecisionModal(req, "APPROVE")}
                      className="flex-1 py-1.5 px-3 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-1.5 cursor-pointer transition-all shadow-xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approve Retest</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => openRetestDecisionModal(req, "REJECT")}
                      className="flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold bg-rose-50 hover:bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:hover:bg-rose-900/60 dark:text-rose-300 border border-rose-200 dark:border-rose-800 flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Decline with Reason</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── 2. CATEGORY SWITCHER (ASSIGNMENTS vs TIMED TESTS vs HOMEWORK) ── */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800">
        <button
          type="button"
          onClick={() => setActiveCategory("ASSIGNMENT")}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${activeCategory === "ASSIGNMENT"
              ? "bg-[#004b79] text-white shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
            }`}
        >
          <FileCheck className="w-4 h-4 text-blue-300" />
          <span>Coursework Assignments</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] bg-white/20 text-white font-mono">
            {allAssignments.filter((a: any) => (a.type || "ASSIGNMENT") === "ASSIGNMENT").length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveCategory("TEST")}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${activeCategory === "TEST"
              ? "bg-[#004b79] text-white shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
            }`}
        >
          <Timer className="w-4 h-4 text-[#dfb74a]" />
          <span>Timed Proctored Tests</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] bg-white/20 text-white font-mono">
            {allAssignments.filter((a: any) => a.type === "TEST").length}
          </span>
          {pendingRetestRequests.length > 0 && (
            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-black bg-amber-400 text-slate-900 animate-pulse">
              {pendingRetestRequests.length} Retest Req
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveCategory("HOMEWORK")}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${activeCategory === "HOMEWORK"
              ? "bg-[#004b79] text-white shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
            }`}
        >
          <FileText className="w-4 h-4 text-emerald-300" />
          <span>Daily Homework</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] bg-white/20 text-white font-mono">
            {allAssignments.filter((a: any) => a.type === "HOMEWORK").length}
          </span>
        </button>
      </div>

      {/* ── 3. SUBMISSIONS EVALUATION TABLE ── */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="space-y-0.5">
            <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              {activeCategory === "TEST"
                ? "Proctored Test Answer Submissions"
                : activeCategory === "HOMEWORK"
                  ? "Homework Worksheet Submissions"
                  : "Assignment Solution Submissions"}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {activeCategory === "TEST"
                ? "Review student answers, inspect webcam proctoring audit snapshots, and award marks."
                : activeCategory === "HOMEWORK"
                  ? "Review student daily homework worksheet solutions and award marks."
                  : "Review student coursework assignment solutions and award marks."}
            </p>
          </div>

          {/* Submission Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 self-start sm:self-auto">
            <button
              onClick={() => setSubTab("PENDING")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${subTab === "PENDING"
                  ? "bg-white dark:bg-slate-900 text-amber-700 dark:text-amber-300 shadow-xs"
                  : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
            >
              <span>Awaiting Evaluation</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 font-bold">
                {pendingSubmissions.length}
              </span>
            </button>

            <button
              onClick={() => setSubTab("COMPLETED")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${subTab === "COMPLETED"
                  ? "bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-300 shadow-xs"
                  : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
            >
              <span>Graded</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-bold">
                {gradedSubmissions.length}
              </span>
            </button>
          </div>
        </div>

        {/* Submissions List */}
        {displayedSubmissions.length === 0 ? (
          <div className="p-12 text-center border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl space-y-2">
            <CheckCircle2 className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto" />
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
              No {activeCategory.toLowerCase()} submissions found
            </p>
            <p className="text-xs text-slate-400">
              {subTab === "PENDING"
                ? "All submitted solutions for this category have been evaluated."
                : "No submissions recorded yet for this category."}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {displayedSubmissions.map((sub: any) => {
              const asg = sub.assignmentId || {};
              const student = sub.studentId || {};
              const isEvaluated = sub.status === "EVALUATED";
              const isTest = (sub.type || asg.type) === "TEST";

              return (
                <div
                  key={sub._id}
                  className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors px-1"
                >
                  <div className="space-y-1.5 min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-sm text-slate-900 dark:text-slate-100">
                        {student.name || "Student"}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500">
                        ({asg.classLevel || "Class 10"})
                      </span>
                      {isTest && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 flex items-center gap-1">
                          <Camera className="w-3 h-3 text-amber-600" />
                          Proctored Test
                        </span>
                      )}
                      {(sub.isDisqualified || sub.status === "DISQUALIFIED" || ((sub.violationCount || 0) >= 3 && !sub.retestPermitted)) && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-900 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3 text-rose-600" />
                          Disqualified (3 Warnings)
                        </span>
                      )}
                      {sub.retestRequested && !sub.retestPermitted && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 flex items-center gap-1 animate-pulse">
                          <Clock className="w-3 h-3 text-amber-600" />
                          Retest Requested by Student
                        </span>
                      )}
                      {sub.retestStatus === "REJECTED" && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-900 flex items-center gap-1">
                          <X className="w-3 h-3 text-rose-600" />
                          Retest Declined
                        </span>
                      )}
                    </div>

                    <p className="text-xs font-medium text-slate-700 dark:text-slate-300 truncate">
                      {asg.title || "Assessment Title"}
                    </p>

                    {/* Student Submitted Document / Solution Sheet */}
                    {sub.fileUrl && (
                      <div className="p-2.5 rounded-xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 flex items-center justify-between gap-3 flex-wrap">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase text-white shrink-0 ${
                            sub.fileUrl.startsWith("data:application/pdf") || sub.fileUrl.toLowerCase().includes(".pdf")
                              ? "bg-rose-500"
                              : sub.fileUrl.startsWith("data:image/") || /\.(png|jpe?g|webp|gif)$/i.test(sub.fileUrl)
                              ? "bg-emerald-600"
                              : "bg-blue-600"
                          }`}>
                            {sub.fileUrl.startsWith("data:application/pdf") || sub.fileUrl.toLowerCase().includes(".pdf")
                              ? "PDF Solution"
                              : sub.fileUrl.startsWith("data:image/") || /\.(png|jpe?g|webp|gif)$/i.test(sub.fileUrl)
                              ? "Photo Sheet"
                              : "Document"}
                          </span>
                          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                            {sub.fileName || `${student.name || "Student"} — Answer Sheet`}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => downloadDocumentFile(sub.fileUrl, `${student.name || "Student"}_Answer_Sheet`)}
                            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer border border-slate-200 dark:border-slate-700"
                            title="Download Submitted Answer Sheet"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Student Typed Solution Notes */}
                    {sub.submissionText && (
                      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs">
                        <span className="font-bold text-slate-700 dark:text-slate-300 block mb-0.5">Typed Answer / Notes:</span>
                        <p className="text-slate-600 dark:text-slate-400 font-mono text-[11px] whitespace-pre-wrap line-clamp-3">
                          {sub.submissionText}
                        </p>
                      </div>
                    )}

                    {sub.retestReason && (
                      <div className="p-2 rounded-xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 text-xs">
                        <span className="font-bold text-amber-800 dark:text-amber-300">Student Explanation: </span>
                        <span className="text-amber-900 dark:text-amber-100">{sub.retestReason}</span>
                      </div>
                    )}

                    {sub.retestDecisionNote && (
                      <div className={`p-2 rounded-xl border text-xs ${
                        sub.retestPermitted
                          ? "bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-200/80 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-200"
                          : "bg-rose-50/80 dark:bg-rose-950/40 border-rose-200/80 dark:border-rose-800/60 text-rose-900 dark:text-rose-200"
                      }`}>
                        <span className="font-bold">Faculty Decision Note: </span>
                        <span>"{sub.retestDecisionNote}"</span>
                      </div>
                    )}

                    {/* Proctoring Webcam Snapshot Thumbnail */}
                    {isTest && sub.proctoringSnapshotUrl && (
                      <div className="flex items-center gap-2 pt-1">
                        <span className="text-[11px] font-semibold text-slate-500">Proctoring Capture:</span>
                        <img
                          src={sub.proctoringSnapshotUrl}
                          alt="Proctoring Snapshot"
                          className="w-12 h-9 object-cover rounded-md border border-slate-300 dark:border-slate-700 cursor-pointer hover:scale-105 transition-transform"
                          onClick={() => openDocumentInNewTab(sub.proctoringSnapshotUrl, `${student.name}_Proctoring_Capture`)}
                          title="Click to view webcam capture full size"
                        />
                        <button
                          type="button"
                          onClick={() => openDocumentInNewTab(sub.proctoringSnapshotUrl, `${student.name}_Proctoring_Capture`)}
                          className="text-[11px] font-bold text-[#004b79] dark:text-[#dfb74a] hover:underline cursor-pointer"
                        >
                          View Camera Photo
                        </button>
                      </div>
                    )}

                    <div className="flex items-center gap-3 text-[11px] text-slate-400 flex-wrap">
                      <span className="font-semibold text-[#004b79] dark:text-[#dfb74a]">
                        {asg.subject || "Mathematics"}
                      </span>
                      <span>•</span>
                      <span>
                        Submitted: {new Date(sub.submittedAt || sub.createdAt).toLocaleDateString(undefined, {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      {isTest && sub.proctoringSnapshotUrl && (
                        <>
                          <span>•</span>
                          <span className="text-emerald-600 font-semibold flex items-center gap-1">
                            <Check className="w-3 h-3" /> Camera Verified
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0 flex-wrap sm:flex-nowrap">
                    {/* View Answer & Grade / Review Button */}
                    {!isEvaluated ? (
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedSub(sub);
                          setMarks(sub.marksObtained !== undefined ? sub.marksObtained : Math.round((asg.maxMarks || 20) * 0.85));
                          setFeedback(sub.feedback || "Good step-by-step accuracy.");
                        }}
                        className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#004b79] hover:bg-[#003b60] text-white flex items-center gap-1.5 cursor-pointer transition-all shadow-2xs"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Answer &amp; Grade</span>
                      </button>
                    ) : (
                      <div className="flex items-center gap-2">
                        <div className="text-right">
                          <span className="text-xs font-black text-emerald-600 block">
                            {sub.marksObtained} / {asg.maxMarks || 20} Marks
                          </span>
                          <p className="text-[10px] text-slate-400">Graded</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedSub(sub);
                            setMarks(sub.marksObtained);
                            setFeedback(sub.feedback || "");
                          }}
                          className="px-3 py-1.5 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center gap-1.5 transition-all cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Review</span>
                        </button>
                      </div>
                    )}

                    {/* Retest Actions */}
                    {sub.retestRequested ? (
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => openRetestDecisionModal(sub, "APPROVE")}
                          className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer transition-all shadow-2xs flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Approve Retest</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => openRetestDecisionModal(sub, "REJECT")}
                          className="px-2.5 py-1.5 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200 transition-all cursor-pointer flex items-center gap-1"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Decline</span>
                        </button>
                      </div>
                    ) : sub.retestPermitted ? (
                      <span className="px-2.5 py-1 rounded-xl text-xs font-bold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>Retest Granted</span>
                      </span>
                    ) : isTest ? (
                      <button
                        type="button"
                        disabled={grantingRetestId === sub._id}
                        onClick={() => handleGrantRetest(sub._id)}
                        title="Allow candidate to re-enter and retake test"
                        className="px-2.5 py-1.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-emerald-600 bg-slate-50 dark:bg-slate-900 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border border-slate-200 dark:border-slate-800 flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
                      >
                        <RefreshCw className="w-3 h-3 text-emerald-600" />
                        <span>Allow Retest</span>
                      </button>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── 4. PUBLISHED TASKS LIST ── */}
      <div className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Published {activeCategory === "TEST" ? "Proctored Tests" : activeCategory === "HOMEWORK" ? "Daily Homework Sheets" : "Assignments"}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Active tasks assigned to batches and student classes
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400 font-bold">
            {filteredAssignments.length} Published
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAssignments.map((task: any) => (
            <div
              key={task._id}
              className="p-4 rounded-2xl bg-white dark:bg-[#001726] border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-50 dark:bg-blue-950 text-[#004b79] dark:text-[#dfb74a]">
                    {task.subject}
                  </span>
                  <span className="text-[11px] font-bold text-slate-500">{task.classLevel}</span>
                </div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 line-clamp-1">
                  {task.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2">{task.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span>
                  {task.type === "TEST" ? `${task.durationMinutes || 45} mins • ` : ""}
                  Max: <strong className="text-slate-700 dark:text-slate-300 font-bold">{task.maxMarks} Marks</strong>
                </span>
                <span className="text-[#004b79] dark:text-[#dfb74a] font-semibold">
                  {task.submissionCount || 0} Submissions
                </span>
              </div>

              {(task.dueDate || task.testDate) && (
                <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-100 dark:border-slate-800/60">
                  <div className="text-[11px] font-semibold text-slate-500 flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-[#004b79] dark:text-[#dfb74a]" />
                    <span>{formatDueDateTime(task.dueDate || task.testDate)}</span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSyncTaskToSystemTime(task._id, 24);
                    }}
                    disabled={syncingTaskId === task._id}
                    title="Extend deadline by 24 hours to keep submissions open"
                    className="inline-flex items-center gap-1 text-[10px] font-bold text-[#004b79] dark:text-[#dfb74a] hover:underline cursor-pointer disabled:opacity-50"
                  >
                    <RefreshCw className={`w-2.5 h-2.5 ${syncingTaskId === task._id ? "animate-spin" : ""}`} />
                    <span>{syncingTaskId === task._id ? "Updating..." : "+24h Extend Deadline"}</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── 5. CREATE TASK MODAL (COMPACT & SEAMLESS FIT) ── */}
      {isCreateModal && (
        <Modal
          isOpen={isCreateModal}
          onClose={() => setIsCreateModal(false)}
          maxWidth="3xl"
          title={`Create ${activeCategory === "TEST" ? "Timed Proctored Test" : activeCategory === "HOMEWORK" ? "Daily Homework" : "Assignment"}`}
        >
          <form onSubmit={handleCreate} className="space-y-3 pt-1">
            {publishError && (
              <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-semibold flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-rose-500" />
                <span>{publishError}</span>
              </div>
            )}

            {/* Row 1: Title */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Title / Chapter Topic *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder={activeCategory === "TEST" ? "e.g. Quadratic Equations Unit Test 1" : "e.g. Worksheet #4 on Trigonometry"}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-[#004b79]"
              />
            </div>

            {/* Row 2: 4-Column Grid (Grade, Subject, Batch, Max Marks) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Target Grade *</label>
                <select
                  value={formData.classLevel}
                  onChange={(e) => handleClassChange(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100"
                >
                  {CLASS_LIST.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Subject *</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-2.5 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100"
                >
                  {availableSubjects.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Target Batch *</label>
                <select
                  value={formData.batchId || (batches[0]?._id ?? "")}
                  onChange={(e) => setFormData({ ...formData, batchId: e.target.value })}
                  className="w-full px-2.5 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 truncate"
                >
                  {batches.map((b) => (
                    <option key={b._id} value={b._id}>{b.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Max Marks *</label>
                <input
                  type="number"
                  required
                  value={formData.maxMarks}
                  onChange={(e) => setFormData({ ...formData, maxMarks: Number(e.target.value) })}
                  className="w-full px-2.5 py-1.5 text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>

            {/* Row 3: Timing & Proctoring (Compact) */}
            {activeCategory === "TEST" ? (
              <div className="p-2.5 rounded-xl bg-amber-50/60 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 space-y-2">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-amber-950 dark:text-amber-200">Test Date *</label>
                    <input
                      type="date"
                      required
                      value={formData.dueDate}
                      onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-amber-300 dark:border-amber-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-amber-950 dark:text-amber-200">Test Start Time *</label>
                    <input
                      type="time"
                      required
                      value={formData.dueTime}
                      onChange={(e) => setFormData({ ...formData, dueTime: e.target.value })}
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-amber-300 dark:border-amber-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-amber-950 dark:text-amber-200 flex items-center gap-1">
                      <Timer className="w-3 h-3 text-amber-600" />
                      <span>Duration</span>
                    </label>
                    <select
                      value={formData.durationMinutes}
                      onChange={(e) => setFormData({ ...formData, durationMinutes: Number(e.target.value) })}
                      className="w-full px-2.5 py-1.5 text-xs font-bold rounded-lg border border-amber-300 dark:border-amber-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
                    >
                      <option value={30}>30 Minutes</option>
                      <option value={45}>45 Minutes</option>
                      <option value={60}>60 Minutes</option>
                      <option value={90}>90 Minutes</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] pt-1">
                  <span className="text-amber-800/80 dark:text-amber-300/80 font-medium">Auto-align with your current system clock:</span>
                  <button
                    type="button"
                    onClick={() => {
                      const { dateStr, timeStr } = getSystemDateAndDefaultTime();
                      setFormData((prev) => ({ ...prev, dueDate: dateStr, dueTime: timeStr }));
                    }}
                    className="font-bold text-[#004b79] dark:text-[#dfb74a] hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Clock className="w-3 h-3" />
                    <span>Match System Time</span>
                  </button>
                </div>

                <label className="flex items-center gap-2 text-xs font-semibold text-amber-950 dark:text-amber-200 cursor-pointer pt-0.5">
                  <input
                    type="checkbox"
                    checked={formData.proctoringRequired}
                    onChange={(e) => setFormData({ ...formData, proctoringRequired: e.target.checked })}
                    className="w-3.5 h-3.5 rounded text-[#004b79]"
                  />
                  <span>Mandatory Webcam Proctoring (Student camera stream required)</span>
                </label>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Due Date *</label>
                    <input
                      type="date"
                      required
                      value={formData.dueDate}
                      onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Due Time (Set Time) *</label>
                    <input
                      type="time"
                      required
                      value={formData.dueTime}
                      onChange={(e) => setFormData({ ...formData, dueTime: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] pt-0.5">
                  <span className="text-slate-500 font-medium">Auto-align with your current system clock:</span>
                  <button
                    type="button"
                    onClick={() => {
                      const { dateStr, timeStr } = getSystemDateAndDefaultTime();
                      setFormData((prev) => ({ ...prev, dueDate: dateStr, dueTime: timeStr }));
                    }}
                    className="font-bold text-[#004b79] dark:text-[#dfb74a] hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Clock className="w-3 h-3" />
                    <span>Match System Time</span>
                  </button>
                </div>
              </div>
            )}

            {/* Row 4: Upload Question Paper File */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Upload Question Paper (PDF / Word Doc / Image)
              </label>

              {isUploadingAttachment ? (
                <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 flex items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 text-[#004b79] dark:text-[#dfb74a] animate-spin shrink-0" />
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      Uploading {uploadingFileName}...
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-[#004b79] dark:text-[#dfb74a] animate-pulse">Fast streaming...</span>
                </div>
              ) : formData.attachmentUrl ? (
                <div className="p-2.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2 truncate">
                    <span className="px-2 py-0.5 rounded text-[10px] font-black bg-rose-500 text-white shrink-0 uppercase tracking-wider">
                      {formData.attachmentName?.endsWith(".pdf") ? "PDF" : "DOC"}
                    </span>
                    <span className="font-bold truncate text-slate-900 dark:text-slate-100">
                      {formData.attachmentName || "Question_Paper.pdf"}
                    </span>
                    {formData.attachmentSize && (
                      <span className="text-[10px] text-slate-400 font-mono shrink-0">
                        ({formData.attachmentSize})
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <label className="text-[11px] font-bold text-[#004b79] dark:text-[#dfb74a] hover:underline cursor-pointer">
                      <span>Change</span>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files?.[0]) handleQuestionPaperUpload(e.target.files[0]);
                        }}
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, attachmentUrl: "", attachmentName: "", attachmentSize: "" }))}
                      className="p-1 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                      title="Remove Attachment"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <label className="w-full py-2.5 px-3.5 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl flex items-center justify-center gap-2 text-xs font-bold text-[#004b79] dark:text-[#dfb74a] hover:border-[#004b79] hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer transition-all group">
                  <UploadCloud className="w-4 h-4 group-hover:scale-110 transition-transform text-[#004b79] dark:text-[#dfb74a]" />
                  <span>Click to attach Question Paper (PDF or Image)</span>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) handleQuestionPaperUpload(e.target.files[0]);
                    }}
                  />
                </label>
              )}
            </div>

            {/* Row 5: Questions & Instructions */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Questions &amp; Instructions (Type or Paste Questions)
              </label>
              <textarea
                rows={2}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Type question list (e.g. Q1. Solve 3x + 5 = 20, Q2. Find value of x...), marking rubric, or student instructions..."
                className="w-full p-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-[#004b79]"
              />
            </div>

            {/* Row 6: Action Buttons */}
            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => setIsCreateModal(false)}
                disabled={isPublishing || isUploadingAttachment}
                className="px-4 py-2 text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isPublishing || isUploadingAttachment}
                className="flex-1 py-2 text-xs font-bold rounded-xl bg-[#004b79] text-white hover:bg-[#003b60] transition-colors cursor-pointer shadow-sm disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {(isPublishing || isUploadingAttachment) && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                <span>
                  {isUploadingAttachment
                    ? "Uploading Question Paper..."
                    : isPublishing
                    ? "Publishing..."
                    : `Publish ${activeCategory === "TEST" ? "Proctored Test" : activeCategory === "HOMEWORK" ? "Homework" : "Assignment"}`}
                </span>
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* ── 6. EVALUATION & GRADING MODAL ── */}
      {selectedSub && (
        <Modal isOpen={!!selectedSub} onClose={() => setSelectedSub(null)} title="Grade Student Submission">
          <form onSubmit={handleGrade} className="space-y-4 pt-2">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 space-y-1.5 text-xs">
              <div className="flex items-center justify-between font-bold flex-wrap gap-2">
                <span className="text-slate-900 dark:text-slate-100">{selectedSub.studentId?.name}</span>
                <div className="flex items-center gap-2">
                  {/* Proctoring Violation Badge - ONLY FOR PROCTORED TESTS */}
                  {((selectedSub.type || selectedSub.assignmentId?.type) === "TEST") && typeof selectedSub.violationCount === "number" && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black flex items-center gap-1 border ${ selectedSub.violationCount === 0 ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800" : selectedSub.violationCount <= 2 ? "bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-700" : "bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800" }`}>
                      <ShieldAlert className="w-3 h-3" />
                      {selectedSub.violationCount === 0 ? "No Violations" : `${selectedSub.violationCount} Violation${selectedSub.violationCount > 1 ? "s" : ""}`}
                    </span>
                  )}
                  <span className="text-[#004b79] dark:text-[#dfb74a]">{selectedSub.assignmentId?.title}</span>
                </div>
              </div>
              {/* Webcam Proctoring Video & Snapshot - ONLY FOR PROCTORED TESTS */}
              {((selectedSub.type || selectedSub.assignmentId?.type) === "TEST") && (selectedSub.proctoringVideoUrl || selectedSub.proctoringSnapshotUrl) && (
                <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <Video className="w-3.5 h-3.5 text-[#004b79] dark:text-[#dfb74a]" />
                      <span>{selectedSub.proctoringVideoUrl ? "Proctoring Exam Video Recording:" : "Webcam Proctoring Snapshot:"}</span>
                    </span>
                    {selectedSub.proctoringVideoUrl ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200/50">
                        Live Exam Recording
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => openDocumentInNewTab(selectedSub.proctoringSnapshotUrl, `${selectedSub.studentId?.name || "Student"}_Proctoring_Capture`)}
                        className="text-[11px] font-bold text-[#004b79] dark:text-[#dfb74a] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>View Full Resolution</span>
                      </button>
                    )}
                  </div>

                  {selectedSub.proctoringVideoUrl ? (
                    <div className="rounded-xl overflow-hidden border border-slate-300 dark:border-slate-700 bg-black shadow-xs">
                      <video
                        src={selectedSub.proctoringVideoUrl}
                        controls
                        playsInline
                        className="w-full max-h-64 object-contain mx-auto"
                      />
                    </div>
                  ) : (
                    <img
                      src={selectedSub.proctoringSnapshotUrl}
                      alt="Proctoring Snapshot"
                      className="w-48 h-36 object-cover rounded-xl border border-slate-300 dark:border-slate-700 shadow-sm cursor-zoom-in hover:scale-102 transition-transform"
                      onClick={() => openDocumentInNewTab(selectedSub.proctoringSnapshotUrl, `${selectedSub.studentId?.name || "Student"}_Proctoring_Capture`)}
                      title="Click to view webcam snapshot full size"
                    />
                  )}
                </div>
              )}
              {selectedSub.submissionText && (
                <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                  <span className="text-[11px] font-bold text-slate-500 block mb-1">Student Notes / Typed Answers:</span>
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <p className="text-slate-800 dark:text-slate-200 font-mono text-xs whitespace-pre-wrap leading-relaxed">
                      {selectedSub.submissionText}
                    </p>
                  </div>
                </div>
              )}
              {selectedSub.fileUrl && (
                <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                    <Paperclip className="w-3.5 h-3.5" />
                    <span>Submitted Solution Sheet / Answer Document:</span>
                  </span>

                  <DocumentViewer
                    url={selectedSub.fileUrl}
                    fileName={`${selectedSub.studentId?.name || "Student"}_Answer_Sheet`}
                    title={`${selectedSub.studentId?.name || "Student"} — Answer Document`}
                    minHeight="340px"
                    className="w-full"
                    showToolbar={true}
                  />
                </div>
              )}
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Award Marks (Out of {selectedSub.assignmentId?.maxMarks || 20}) *
              </label>
              <input
                type="number"
                required
                max={selectedSub.assignmentId?.maxMarks || 20}
                min={0}
                value={marks}
                onChange={(e) => setMarks(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Constructive Teacher Feedback
              </label>
              <textarea
                rows={2}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Enter feedback for the student..."
                className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100"
              />
            </div>

            <div className="flex items-center gap-2 pt-2 flex-wrap">
              <button
                type="button"
                onClick={() => setSelectedSub(null)}
                className="px-4 py-2 text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              {((selectedSub.type || selectedSub.assignmentId?.type) === "TEST") && !selectedSub.retestPermitted && (
                <button
                  type="button"
                  onClick={() => {
                    handleGrantRetest(selectedSub._id);
                    setSelectedSub(null);
                  }}
                  className="px-3.5 py-2 text-xs font-bold rounded-xl bg-amber-500 hover:bg-amber-600 text-white flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Grant Retest</span>
                </button>
              )}
              <button
                type="submit"
                disabled={isGrading}
                className="flex-1 py-2 text-xs font-bold rounded-xl bg-[#004b79] text-white hover:bg-[#003b60] disabled:opacity-60 flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                <span>{isGrading ? "Saving Grade…" : "Finalize & Save Grade"}</span>
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* ── RETEST DECISION MODAL (Accept or Reject with Reason) ── */}
      <Modal
        isOpen={retestDecisionModal.isOpen}
        onClose={() =>
          !retestDecisionModal.isSubmitting &&
          setRetestDecisionModal((prev) => ({ ...prev, isOpen: false, error: "" }))
        }
        title={
          retestDecisionModal.action === "APPROVE"
            ? "Approve Retest Request"
            : "Decline Retest Request"
        }
        description={
          retestDecisionModal.action === "APPROVE"
            ? "Grant student permission to attempt a fresh proctored retest."
            : "Decline student's retest request with an explanation."
        }
        maxWidth="lg"
      >
        <form onSubmit={handleConfirmRetestDecision} className="space-y-4">
          {retestDecisionModal.error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-700 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{retestDecisionModal.error}</span>
            </div>
          )}

          {retestDecisionModal.submission && (
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs flex-wrap gap-1">
                <span className="font-bold text-slate-900 dark:text-slate-100">
                  Candidate: {retestDecisionModal.submission.studentId?.name || "Student"}
                </span>
                <span className="text-slate-500 font-medium">
                  {retestDecisionModal.submission.assignmentId?.title || "Proctored Test"}
                </span>
              </div>
              {retestDecisionModal.submission.retestReason && (
                <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-xs text-amber-900 dark:text-amber-200">
                  <span className="font-bold">Student's Explanation: </span>
                  <span className="italic">"{retestDecisionModal.submission.retestReason}"</span>
                </div>
              )}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
              {retestDecisionModal.action === "APPROVE"
                ? "Note / Instructions for Student (Optional):"
                : "Reason for Declining (Required for Student): *"}
            </label>

            {/* Quick Chips */}
            <div className="flex items-center gap-1.5 flex-wrap pb-1">
              {(retestDecisionModal.action === "APPROVE"
                ? [
                    "Technical glitch confirmed. Retest granted.",
                    "Please ensure stable internet & single face in camera.",
                    "One-time exception granted.",
                  ]
                : [
                    "Multiple proctoring violations recorded.",
                    "Candidate face was absent from camera frame.",
                    "Multiple persons detected in camera frame.",
                    "Test deadline has already expired.",
                    "Single test attempt policy.",
                  ]
              ).map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() =>
                    setRetestDecisionModal((prev) => ({
                      ...prev,
                      reason: chip,
                      error: "",
                    }))
                  }
                  className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
                >
                  + {chip}
                </button>
              ))}
            </div>

            <textarea
              rows={3}
              value={retestDecisionModal.reason}
              onChange={(e) =>
                setRetestDecisionModal((prev) => ({
                  ...prev,
                  reason: e.target.value,
                  error: "",
                }))
              }
              placeholder={
                retestDecisionModal.action === "APPROVE"
                  ? "Optional note or instructions for the student before they retake the test..."
                  : "Provide the reason why this retest is declined..."
              }
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#004b79]"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              disabled={retestDecisionModal.isSubmitting}
              onClick={() =>
                setRetestDecisionModal((prev) => ({ ...prev, isOpen: false, error: "" }))
              }
              className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={retestDecisionModal.isSubmitting}
              className={`px-4 py-2 rounded-xl text-xs font-bold text-white cursor-pointer transition-all shadow-xs flex items-center gap-1.5 disabled:opacity-60 ${
                retestDecisionModal.action === "APPROVE"
                  ? "bg-emerald-600 hover:bg-emerald-700"
                  : "bg-rose-600 hover:bg-rose-700"
              }`}
            >
              {retestDecisionModal.isSubmitting ? (
                <span>Processing...</span>
              ) : retestDecisionModal.action === "APPROVE" ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Confirm & Grant Retest</span>
                </>
              ) : (
                <>
                  <X className="w-3.5 h-3.5" />
                  <span>Confirm & Decline Retest</span>
                </>
              )}
            </button>
          </div>
        </form>
      </Modal>
    </main>
  );
}
