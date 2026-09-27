"use client";

import React, { useState, useEffect } from "react";
import {
  UserCheck,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  ShieldCheck,
  FileText,
  Phone,
  Mail,
  Edit2,
  Trash2,
  Plus,
  BookOpen,
  GraduationCap,
  Download,
  Check,
  X,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { useFastFetch, invalidateCache } from "@/lib/api-cache";
import { sanitize10DigitPhone, isValid10DigitPhone, isValidAcuityOrGmail } from "@/lib/validations/phone";
import { formatStaffId } from "@/lib/id-generator";
import { getOverlappingSubjects } from "@/lib/allocation-matcher";

const ALL_CLASSES = [
  "Class 6",
  "Class 7",
  "Class 8",
  "Class 9",
  "Class 10",
];

const ALL_SUBJECTS = [
  "Mathematics",
  "Science",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "Social Science",
  "Computer Science",
  "Tamil",
  "Hindi",
];

export default function AdminTeachersPage() {
  const [filterStatus, setFilterStatus] = useState("ALL");
  const apiUrl = `/api/admin/teachers${filterStatus !== "ALL" ? `?status=${filterStatus}` : ""}`;
  const { data, refetch } = useFastFetch(apiUrl);
  const { data: allData } = useFastFetch("/api/admin/teachers?status=ALL");

  const [selectedTeacher, setSelectedTeacher] = useState<any>(null);
  const [editTeacher, setEditTeacher] = useState<any>(null);
  const [deleteTeacher, setDeleteTeacher] = useState<any>(null);

  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);


  // Student allocation candidates
  const [allocatableStudents, setAllocatableStudents] = useState<any[]>([]);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [studentSearch, setStudentSearch] = useState("");

  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    phone: "",
    qualification: "",
    specialization: "",
    experienceYears: 0,
    teacherType: "B2C" as "B2C" | "B2B",
    institutionName: "",
    subjects: [] as string[],
    subjectsInput: "",
    classesTaught: [] as string[],
    assignedSubjects: [] as string[],
    assignedClasses: [] as string[],
    assignedStudentIds: [] as string[],
    assignedStudents: [] as any[],
    status: "ACTIVE",
    resetPassword: "",
  });

  const teachers = Array.isArray(data?.teachers) ? data.teachers : [];
  const allTeachers = Array.isArray(allData?.teachers) ? allData.teachers : teachers;

  const pendingCount = React.useMemo(() => {
    return allTeachers.filter(
      (t: any) => t.approvalStatus === "PENDING_APPROVAL" || t.userId?.status === "PENDING_APPROVAL"
    ).length;
  }, [allTeachers]);

  const approvedCount = React.useMemo(() => {
    return allTeachers.filter(
      (t: any) => t.approvalStatus === "ACTIVE" || t.userId?.status === "ACTIVE"
    ).length;
  }, [allTeachers]);

  const rejectedCount = React.useMemo(() => {
    return allTeachers.filter(
      (t: any) => t.approvalStatus === "REJECTED" || t.userId?.status === "REJECTED"
    ).length;
  }, [allTeachers]);

  const fetchAllocatableStudents = async (
    type?: string,
    school?: string,
    teacherClasses?: string[],
    teacherSubjects?: string[],
    teacherUserId?: string
  ) => {
    setLoadingStudents(true);
    try {
      const params = new URLSearchParams();
      if (type && type !== "ALL") params.append("studentType", type);
      if (school && type !== "B2C") params.append("schoolName", school);
      if (teacherClasses && teacherClasses.length > 0)
        params.append("classes", teacherClasses.join(","));
      if (teacherSubjects && teacherSubjects.length > 0)
        params.append("subjects", teacherSubjects.join(","));
      if (teacherUserId) params.append("teacherUserId", teacherUserId);
      const res = await fetch(`/api/admin/students/allocatable?${params.toString()}`);
      const d = await res.json();
      if (Array.isArray(d.students)) {
        setAllocatableStudents(d.students);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingStudents(false);
    }
  };

  const getStudentId = (st: any): string => {
    if (!st) return "";
    if (typeof st === "string") return st;
    if (st.userId) {
      if (typeof st.userId === "string") return st.userId;
      if (st.userId._id) return st.userId._id.toString();
    }
    if (st._id) return st._id.toString();
    return "";
  };

  const openEditModal = (t: any) => {
    setEditTeacher(t);
    const teacherType = (t.teacherType || "B2C") as "B2C" | "B2B";
    const institution = t.institutionName || "";
    const rawList = (t.assignedStudents && t.assignedStudents.length > 0) ? t.assignedStudents : (t.assignedStudentIds || []);

    const tSubjects = (t.assignedSubjects && t.assignedSubjects.length > 0) ? t.assignedSubjects : (t.subjects || ["Mathematics"]);
    const tClasses = (t.assignedClasses && t.assignedClasses.length > 0) ? t.assignedClasses : (t.classesTaught || ["Class 10"]);

    // If teacher already has assigned students, retain only those whose selected subjects match teacher's subjects
    const validAssignedStudents = (t.assignedStudents && t.assignedStudents.length > 0)
      ? t.assignedStudents.filter((st: any) => {
          if (!st) return false;
          const studentSubjects = Array.isArray(st.subjects)
            ? st.subjects
            : typeof st.subjects === "string"
            ? st.subjects.split(",").map((s: string) => s.trim()).filter(Boolean)
            : [];
          if (tSubjects.length > 0) {
            if (studentSubjects.length === 0) return false;
            const overlap = getOverlappingSubjects(studentSubjects, tSubjects);
            if (overlap.length === 0) return false;
          }
          return true;
        })
      : [];

    const existingAssignedStudentIds = (t.assignedStudents && t.assignedStudents.length > 0)
      ? validAssignedStudents.map(getStudentId).filter(Boolean)
      : rawList.map(getStudentId).filter(Boolean);

    setEditForm({
      name: t.userId?.name || "",
      email: t.userId?.email || "",
      phone: t.userId?.phone || "",
      qualification: t.qualification || "",
      specialization: t.specialization || "",
      experienceYears: t.experienceYears || 0,
      teacherType,
      institutionName: institution,
      subjects: t.subjects || [],
      subjectsInput: (t.subjects || []).join(", "),
      classesTaught: t.classesTaught || [],
      assignedSubjects: tSubjects,
      assignedClasses: tClasses,
      assignedStudentIds: existingAssignedStudentIds,
      assignedStudents: validAssignedStudents,
      status: t.approvalStatus || t.userId?.status || "ACTIVE",
      resetPassword: "",
    });
    setStudentSearch("");
    const tUserId = (t.userId?._id || t.userId || t._id)?.toString();
    fetchAllocatableStudents(teacherType, institution, tClasses, tSubjects, tUserId);
  };

  // Synchronize allocatable students whenever assigned classes/subjects change in modal
  useEffect(() => {
    if (!editTeacher || editForm.teacherType !== "B2C") return;
    const tUserId = (editTeacher.userId?._id || editTeacher.userId || editTeacher._id)?.toString();
    if (!tUserId) return;

    const timer = setTimeout(() => {
      fetchAllocatableStudents(
        "B2C",
        "",
        editForm.assignedClasses,
        editForm.assignedSubjects,
        tUserId
      );
    }, 200);

    return () => clearTimeout(timer);
  }, [editForm.assignedClasses, editForm.assignedSubjects, editTeacher]);

  const handleUpdateStatus = async (teacherUserId: string, newStatus: string) => {
    try {
      const res = await fetch("/api/admin/teachers", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teacherId: teacherUserId, status: newStatus }),
      });

      if (res.ok) {
        setSelectedTeacher(null);
        invalidateCache(apiUrl);
        invalidateCache("/api/admin/teachers?status=ALL");
        invalidateCache("/api/admin/dashboard");
        refetch();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveTeacherEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTeacher) return;

    if (editForm.email && !isValidAcuityOrGmail(editForm.email)) {
      alert("Email address must end with @mantif.edu, @acuity.edu, or @gmail.com.");
      return;
    }
    if (editForm.phone && !isValid10DigitPhone(editForm.phone)) {
      alert("Teacher mobile number must be exactly 10 digits and cannot start with 0.");
      return;
    }

    setIsSaving(true);
    try {
      const subjectsArray = editForm.subjectsInput
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const teacherUserId = editTeacher.userId?._id || editTeacher._id;

      const res = await fetch("/api/admin/teachers", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teacherId: teacherUserId,
          name: editForm.name,
          email: editForm.email,
          phone: editForm.phone,
          qualification: editForm.qualification,
          specialization: editForm.specialization,
          experienceYears: Number(editForm.experienceYears),
          subjects: subjectsArray.length > 0 ? subjectsArray : editForm.assignedSubjects,
          classesTaught: editForm.classesTaught.length > 0 ? editForm.classesTaught : editForm.assignedClasses,
          teacherType: editForm.teacherType,
          institutionName: editForm.teacherType === "B2B" ? editForm.institutionName.trim() : "",
          assignedSubjects: editForm.assignedSubjects,
          assignedClasses: editForm.assignedClasses,
          assignedStudentIds: editForm.assignedStudentIds,
          status: editForm.status,
          resetPassword: editForm.resetPassword || undefined,
        }),
      });

      const resData = await res.json();
      if (!res.ok) {
        alert(resData.error || "Failed to save teacher changes");
        return;
      }

      setEditTeacher(null);
      invalidateCache(apiUrl);
      invalidateCache("/api/admin/teachers?status=ALL");
      invalidateCache("/api/admin/dashboard");
      refetch();
    } catch (err: any) {
      console.error(err);
      alert(err.message || "An error occurred while saving teacher changes");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteTeacher = async () => {
    if (!deleteTeacher) return;
    setIsDeleting(true);
    try {
      const teacherUserId =
        deleteTeacher.userId?._id ||
        (typeof deleteTeacher.userId === "string" ? deleteTeacher.userId : "") ||
        deleteTeacher._id;

      const res = await fetch(`/api/admin/teachers?id=${teacherUserId}`, {
        method: "DELETE",
      });

      const resData = await res.json();
      if (!res.ok) {
        alert(resData.error || "Failed to delete teacher");
        return;
      }

      setDeleteTeacher(null);
      invalidateCache(apiUrl);
      invalidateCache("/api/admin/teachers?status=ALL");
      invalidateCache("/api/admin/dashboard");
      refetch();
    } catch (err: any) {
      console.error(err);
      alert(err.message || "An error occurred while deleting teacher");
    } finally {
      setIsDeleting(false);
    }
  };

  const toggleAssignedClass = (cls: string) => {
    setEditForm((prev) => {
      const exists = prev.assignedClasses.includes(cls);
      return {
        ...prev,
        assignedClasses: exists
          ? prev.assignedClasses.filter((c) => c !== cls)
          : [...prev.assignedClasses, cls],
      };
    });
  };

  const selectAllAssignedClasses = () => {
    setEditForm((prev) => ({
      ...prev,
      assignedClasses:
        prev.assignedClasses.length === ALL_CLASSES.length ? [] : [...ALL_CLASSES],
    }));
  };

  const toggleAssignedSubject = (sub: string) => {
    setEditForm((prev) => {
      const exists = prev.assignedSubjects.includes(sub);
      return {
        ...prev,
        assignedSubjects: exists
          ? prev.assignedSubjects.filter((s) => s !== sub)
          : [...prev.assignedSubjects, sub],
      };
    });
  };

  const selectAllAssignedSubjects = () => {
    setEditForm((prev) => ({
      ...prev,
      assignedSubjects:
        prev.assignedSubjects.length === ALL_SUBJECTS.length ? [] : [...ALL_SUBJECTS],
    }));
  };

  const toggleStudentAllocation = (st: any) => {
    const stId = getStudentId(st);
    if (!stId) return;

    setEditForm((prev) => {
      const exists = prev.assignedStudentIds.includes(stId);
      if (exists) {
        return {
          ...prev,
          assignedStudentIds: prev.assignedStudentIds.filter((id) => id !== stId),
          assignedStudents: prev.assignedStudents.filter((s: any) => getStudentId(s) !== stId),
        };
      } else {
        return {
          ...prev,
          assignedStudentIds: [...prev.assignedStudentIds, stId],
          assignedStudents: [...prev.assignedStudents, st],
        };
      }
    });
  };

  return (
    <main className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 animate-in fade-in duration-150 select-none">


      {/* ── 1. CLEAN CARDLESS HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
              Faculty Staff &amp; Approvals
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              {allTeachers.length} Faculty
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Review teacher qualifications, credentials, edit subjects/classes, and manage database records.
          </p>
        </div>

        {/* Status Filter Tabs with Counts */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 rounded-xl overflow-x-auto no-scrollbar scroll-smooth self-start sm:self-auto shrink-0 max-w-full">
          {[
            { id: "ALL", label: `All Staff (${allTeachers.length})` },
            {
              id: "PENDING_APPROVAL",
              label: "Pending Review",
              count: pendingCount,
            },
            { id: "ACTIVE", label: `Approved (${approvedCount})` },
            { id: "REJECTED", label: `Rejected (${rejectedCount})` },
          ].map((tab: any) => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 shrink-0 active:scale-95 ${
                filterStatus === tab.id
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xs"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
              }`}
            >
              <span>{tab.label}</span>
              {typeof tab.count === "number" && tab.count > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold bg-amber-500 text-white animate-pulse">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── 2. CARDLESS 12-COLUMN MASTER TEACHERS TABLE ── */}
      <div className="space-y-2 pt-2">
        <div className="hidden md:grid grid-cols-12 gap-4 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-850">
          <div className="col-span-3">Faculty Name &amp; Contact</div>
          <div className="col-span-3">Qualification &amp; Experience</div>
          <div className="col-span-3">Classes &amp; Subjects</div>
          <div className="col-span-3 text-right">Status &amp; Verification Actions</div>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
          {teachers.length === 0 ? (
            <div className="p-10 text-center border border-dashed border-slate-200 dark:border-slate-800 rounded-xl space-y-2">
              <UserCheck className="w-8 h-8 text-slate-400 mx-auto" />
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                {filterStatus === "PENDING_APPROVAL"
                  ? "No pending approvals. All faculty profiles are up to date."
                  : "No faculty records in this category"}
              </p>
              <p className="text-xs text-slate-400">Try selecting another filter tab above.</p>
            </div>
          ) : (
            teachers.map((t: any, idx: number) => {
              const isPending = t.approvalStatus === "PENDING_APPROVAL" || t.userId?.status === "PENDING_APPROVAL";
              const isApproved = t.approvalStatus === "ACTIVE" || t.userId?.status === "ACTIVE";
              const assignedCount = t.assignedStudents?.length || t.assignedStudentIds?.length || 0;
              const displayClasses = (t.assignedClasses && t.assignedClasses.length > 0) ? t.assignedClasses : (t.classesTaught || []);
              const displaySubjects = (t.assignedSubjects && t.assignedSubjects.length > 0) ? t.assignedSubjects : (t.subjects || []);

              return (
                <div
                  key={t._id}
                  className="py-3.5 grid grid-cols-1 md:grid-cols-12 gap-4 items-center transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-900/30 px-1"
                >
                  {/* Col 1: Name & Contact & Category */}
                  <div className="col-span-3 space-y-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <p className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100">
                        {t.userId?.name || "Faculty Specialist"}
                      </p>
                      <span className="font-mono text-[10px] font-bold px-1.5 py-0.2 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                        {formatStaffId(t, idx)}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 flex-wrap">
                      {t.teacherType === "B2B" ? (
                        <span className="font-bold text-[10px] px-2 py-0.5 rounded bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                          B2B: {t.institutionName || "School Faculty"}
                        </span>
                      ) : (
                        <span className="font-bold text-[10px] px-2 py-0.5 rounded bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
                          B2C: Individual Tutor
                        </span>
                      )}
                    </div>

                    <p className="text-[11px] text-slate-400 font-mono truncate">
                      {t.userId?.email} • {t.userId?.phone || "—"}
                    </p>
                  </div>

                  {/* Col 2: Qualification & Experience */}
                  <div className="col-span-3 space-y-0.5 text-xs">
                    <p className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                      {t.qualification || "M.Sc. / B.Ed. Specialist"}
                    </p>
                    <p className="text-[11px] text-slate-400 font-medium">
                      {t.experienceYears || 0} Yrs Experience • {t.specialization || "General"}
                    </p>
                  </div>

                  {/* Col 3: Classes & Subjects & Allocated Students */}
                  <div className="col-span-3 space-y-1.5">
                    <p className="text-xs font-bold text-[#004b79] dark:text-[#dfb74a] truncate">
                      {displaySubjects.join(", ") || "Mathematics"}
                    </p>
                    <div className="flex flex-wrap items-center gap-1">
                      {displayClasses.map((c: string) => (
                        <span key={c} className="px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-mono text-slate-600 dark:text-slate-400">
                          {c}
                        </span>
                      ))}
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                        {assignedCount} Student{assignedCount === 1 ? "" : "s"}
                      </span>
                    </div>
                  </div>

                  {/* Col 4: Status & Actions */}
                  <div className="col-span-3 flex items-center justify-start md:justify-end gap-1.5 flex-wrap">
                    {isPending ? (
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 animate-pulse flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>Pending</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => handleUpdateStatus(t.userId._id, "ACTIVE")}
                          className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors cursor-pointer shadow-2xs flex items-center gap-1"
                        >
                          <Check className="w-3 h-3" />
                          <span>Approve</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleUpdateStatus(t.userId._id, "REJECTED")}
                          className="px-2 py-1 rounded-lg text-xs font-bold bg-rose-50 dark:bg-rose-950/40 text-rose-600 border border-rose-200 dark:border-rose-800 hover:bg-rose-100 transition-colors cursor-pointer"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          isApproved
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300"
                            : "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950 dark:text-rose-300"
                        }`}
                      >
                        {isApproved ? "Approved" : "Rejected"}
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={() => openEditModal(t)}
                      className="px-2.5 py-1 rounded-lg text-xs font-bold bg-[#004b79]/10 hover:bg-[#004b79] text-[#004b79] hover:text-white transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                    >
                      <Edit2 className="w-3 h-3" />
                      <span>Allocate &amp; Edit</span>
                    </button>


                    <button
                      type="button"
                      onClick={() => setSelectedTeacher(t)}
                      className="px-2.5 py-1 rounded-lg text-xs font-bold border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer shadow-2xs"
                    >
                      Docs
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeleteTeacher(t)}
                      className="px-2.5 py-1 rounded-lg text-xs font-bold border border-rose-200 dark:border-rose-800/60 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-400 transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* ── Edit & Allocate Faculty Modal ── */}
      {editTeacher && (
        <Modal
          isOpen={!!editTeacher}
          onClose={() => setEditTeacher(null)}
          title={`Allocate & Manage Faculty: ${editTeacher.userId?.name}`}
          description="Configure B2B / B2C stream, allocate specific students, and assign classes & subjects handled."
          maxWidth="xl"
        >
          <form onSubmit={handleSaveTeacherEdit} className="space-y-4 pt-1 text-xs">
            {/* Stream Selector: B2C vs B2B */}
            <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50 space-y-2">
              <label className="block font-bold text-slate-800 dark:text-slate-200">
                Tutoring Stream &amp; Classification *
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditForm({ ...editForm, teacherType: "B2C" });
                    fetchAllocatableStudents("B2C", "");
                  }}
                  className={`py-2 px-3 rounded-xl font-bold text-xs border transition-all cursor-pointer text-center ${
                    editForm.teacherType === "B2C"
                      ? "bg-sky-600 text-white border-sky-600 shadow-sm"
                      : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                  }`}
                >
                  B2C — Individual Tutor
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditForm({ ...editForm, teacherType: "B2B" });
                    fetchAllocatableStudents("B2B", editForm.institutionName);
                  }}
                  className={`py-2 px-3 rounded-xl font-bold text-xs border transition-all cursor-pointer text-center ${
                    editForm.teacherType === "B2B"
                      ? "bg-purple-600 text-white border-purple-600 shadow-sm"
                      : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                  }`}
                >
                  B2B — Institutional Faculty
                </button>
              </div>

              {editForm.teacherType === "B2B" && (
                <div className="pt-2">
                  <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">
                    Institution / School Name *
                  </label>
                  <Input
                    required={editForm.teacherType === "B2B"}
                    placeholder="e.g. SSVS Matriculation Higher Secondary School"
                    value={editForm.institutionName}
                    onChange={(e) => {
                      setEditForm({ ...editForm, institutionName: e.target.value });
                      fetchAllocatableStudents("B2B", e.target.value);
                    }}
                  />
                </div>
              )}
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">Teacher Name *</label>
                <Input
                  required
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">Email Address *</label>
                <Input
                  required
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">Phone Number (10 Digits) *</label>
                <Input
                  required
                  type="tel"
                  maxLength={10}
                  value={editForm.phone}
                  onChange={(e) =>
                    setEditForm({ ...editForm, phone: sanitize10DigitPhone(e.target.value) })
                  }
                />
              </div>
              <div>
                <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">Teaching Status / Approval</label>
                <select
                  value={editForm.status}
                  onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                  className="flex h-10 w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#004b79]"
                >
                  <option value="ACTIVE">ACTIVE (Approved &amp; Teaching)</option>
                  <option value="PENDING_APPROVAL">PENDING_APPROVAL (Under Review)</option>
                  <option value="REJECTED">REJECTED (Access Suspended)</option>
                </select>
              </div>
            </div>

            {/* Assigned Classes */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block font-bold text-slate-700 dark:text-slate-300">
                  Admin Allocated Classes to Handle *
                </label>
                <div className="flex items-center gap-2">
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    editForm.assignedClasses.length > 0
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400"
                      : "bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-400"
                  }`}>
                    {editForm.assignedClasses.length} selected
                  </span>
                  <button
                    type="button"
                    onClick={selectAllAssignedClasses}
                    className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                  >
                    {editForm.assignedClasses.length === ALL_CLASSES.length ? "Clear All" : "Select All"}
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                {ALL_CLASSES.map((cls) => {
                  const selected = editForm.assignedClasses.includes(cls);
                  return (
                    <button
                      key={cls}
                      type="button"
                      onClick={() => toggleAssignedClass(cls)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        selected
                          ? "bg-[#002137] text-white shadow-2xs"
                          : "border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      <span>{cls}</span>
                      <span className={`w-3.5 h-3.5 rounded text-[9px] flex items-center justify-center font-bold ${
                        selected ? "bg-[#dfb74a] text-[#002137]" : "border border-slate-300 text-transparent"
                      }`}>✓</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Assigned Subjects */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block font-bold text-slate-700 dark:text-slate-300">
                  Admin Allocated Subjects to Handle *
                </label>
                <div className="flex items-center gap-2">
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    editForm.assignedSubjects.length > 0
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400"
                      : "bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-400"
                  }`}>
                    {editForm.assignedSubjects.length} selected
                  </span>
                  <button
                    type="button"
                    onClick={selectAllAssignedSubjects}
                    className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                  >
                    {editForm.assignedSubjects.length === ALL_SUBJECTS.length ? "Clear All" : "Select All"}
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                {ALL_SUBJECTS.map((sub) => {
                  const selected = editForm.assignedSubjects.includes(sub);
                  return (
                    <button
                      key={sub}
                      type="button"
                      onClick={() => toggleAssignedSubject(sub)}
                      className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer text-left ${
                        selected
                          ? "bg-[#004b79] text-white shadow-2xs font-bold"
                          : "border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      <span className="truncate">{sub}</span>
                      <span className={`w-3.5 h-3.5 rounded text-[9px] flex items-center justify-center font-bold shrink-0 ml-1 ${
                        selected ? "bg-[#dfb74a] text-[#002137]" : "border border-slate-300 text-transparent"
                      }`}>✓</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── STUDENT ALLOCATION SECTION ── */}
            <div className="space-y-2 p-3.5 rounded-xl border-2 border-dashed border-[#004b79]/20 bg-blue-50/20 dark:bg-blue-950/10">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-xs text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                    <UserCheck className="w-4 h-4 text-[#004b79]" />
                    <span>Allocated Students ({editForm.assignedStudentIds.length})</span>
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {editForm.teacherType === "B2B"
                      ? `Select school students from ${editForm.institutionName || "institution"} to allocate to this staff.`
                      : "Select individual tutoring students to allocate to this private tutor."}
                  </p>
                </div>

                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  {editForm.assignedStudentIds.length} Assigned
                </span>
              </div>


              {/* Search candidate students */}
              <div className="pt-1">
                <Input
                  placeholder="Search students by name, mobile, student ID, class, or subject..."
                  value={studentSearch}
                  onChange={(e) => setStudentSearch(e.target.value)}
                  className="bg-white dark:bg-slate-900 text-xs"
                />
              </div>

              {/* Candidate Students List */}
              <div className="max-h-56 overflow-y-auto space-y-2 pr-1 divide-y divide-slate-100 dark:divide-slate-800">
                {loadingStudents ? (
                  <div className="py-6 text-center text-xs text-slate-500">
                    Loading allocatable students...
                  </div>
                ) : allocatableStudents.length === 0 ? (
                  <div className="py-6 text-center space-y-1">
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      No students found matching the selected subject(s) &amp; class(es).
                    </p>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500">
                      Only students who have selected {editForm.assignedSubjects.length > 0 ? editForm.assignedSubjects.join(", ") : "subjects"} will appear here.
                    </p>
                  </div>
                ) : (
                  allocatableStudents
                    .filter((st: any) => {
                      if (!studentSearch.trim()) return true;
                      const q = studentSearch.trim().toLowerCase();
                      return (
                        st.name?.toLowerCase().includes(q) ||
                        st.phone?.includes(q) ||
                        st.studentId?.toLowerCase().includes(q) ||
                        st.currentClass?.toLowerCase().includes(q) ||
                        st.schoolName?.toLowerCase().includes(q) ||
                        (st.subjects && st.subjects.some((s: string) => s.toLowerCase().includes(q)))
                      );
                    })
                    .map((st: any) => {
                      const stId = getStudentId(st);
                      const isAssigned = editForm.assignedStudentIds.includes(stId);
                      const studentSubjectsList: string[] = Array.isArray(st.subjects)
                        ? st.subjects
                        : typeof st.subjects === "string"
                        ? st.subjects.split(",").map((s: string) => s.trim()).filter(Boolean)
                        : [];

                      return (
                        <div
                          key={stId}
                          onClick={() => toggleStudentAllocation(st)}
                          className={`p-2.5 rounded-xl flex items-center justify-between gap-3 cursor-pointer transition-all border ${
                            isAssigned
                              ? "bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-500 shadow-2xs"
                              : "hover:bg-slate-100 dark:hover:bg-slate-800/80 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                          }`}
                        >
                          <div className="space-y-1 flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="font-bold text-xs text-slate-900 dark:text-slate-100">
                                {st.name}
                              </span>
                              <span className="font-mono text-[10px] text-slate-500">
                                ({st.studentId || "STD"})
                              </span>
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                                {st.currentClass}
                              </span>
                              {st.overlappingSubjects && st.overlappingSubjects.length > 0 && (
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 flex items-center gap-1">
                                  <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400 stroke-[2.5]" />
                                  <span>Matches: {st.overlappingSubjects.join(", ")}</span>
                                </span>
                              )}
                            </div>

                            {/* Prominent display of what subject(s) student selected */}
                            <div className="flex items-center gap-1.5 flex-wrap text-[11px] pt-0.5">
                              <span className="font-semibold text-slate-600 dark:text-slate-400">
                                Student Selected Subjects:
                              </span>
                              {studentSubjectsList.length > 0 ? (
                                studentSubjectsList.map((sub: string, sIdx: number) => {
                                  const isOverlap = st.overlappingSubjects?.some(
                                    (o: string) => o.toLowerCase() === sub.toLowerCase()
                                  );
                                  return (
                                    <span
                                      key={sIdx}
                                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md border flex items-center gap-1 ${
                                        isOverlap
                                          ? "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-700"
                                          : "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700"
                                      }`}
                                    >
                                      {isOverlap && <Check className="w-2.5 h-2.5 text-emerald-600 dark:text-emerald-400 stroke-[3]" />}
                                      <span>{sub}</span>
                                    </span>
                                  );
                                })
                              ) : (
                                <span className="italic text-rose-500 font-medium">None selected</span>
                              )}
                            </div>
                          </div>

                          <div
                            className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 border transition-all ${
                              isAssigned
                                ? "bg-emerald-600 border-emerald-600 text-white shadow-2xs"
                                : "border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-transparent"
                            }`}
                          >
                            <Check className="w-4 h-4 stroke-[3]" />
                          </div>
                        </div>
                      );
                    })
                )}
              </div>
            </div>

            <div className="flex justify-end gap-2.5 pt-4 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setEditTeacher(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-[#004b79] hover:bg-[#003b60] text-white transition-all cursor-pointer shadow-sm disabled:opacity-60"
              >
                {isSaving ? "Saving Allocation..." : "Save Faculty & Allocation"}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* ── Document Inspection Modal ── */}
      {selectedTeacher && (
        <Modal
          isOpen={!!selectedTeacher}
          onClose={() => setSelectedTeacher(null)}
          title={`Faculty Documents: ${selectedTeacher.userId?.name}`}
          description="Inspect uploaded certificates, identity proofs, and credentials."
          maxWidth="md"
        >
          <div className="space-y-4 pt-1 text-xs">
            <div className="space-y-2">
              <p className="font-bold text-slate-900 dark:text-slate-100">Identity &amp; Degree Verification:</p>
              {selectedTeacher.documents && selectedTeacher.documents.length > 0 ? (
                <div className="divide-y divide-slate-200 dark:divide-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                  {selectedTeacher.documents.map((doc: any, i: number) => (
                    <div key={i} className="p-3 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-[#004b79] dark:text-[#dfb74a]" />
                        <div>
                          <p className="font-bold text-slate-800 dark:text-slate-200">{doc.name || `Document #${i + 1}`}</p>
                          <p className="text-[10px] text-slate-400 font-mono">{doc.type || "PDF / Image Verification"}</p>
                        </div>
                      </div>
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1 rounded-lg text-xs font-bold border border-slate-200 dark:border-slate-800 hover:bg-slate-100 text-slate-700 dark:text-slate-300"
                      >
                        Inspect
                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-center text-slate-500">
                  No separate document files uploaded. Verified via system registration.
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setSelectedTeacher(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* ── Delete Confirmation Modal ── */}
      {deleteTeacher && (
        <Modal
          isOpen={!!deleteTeacher}
          onClose={() => setDeleteTeacher(null)}
          title="Permanently Delete Faculty Profile"
          description="This action cannot be undone."
          maxWidth="md"
        >
          <div className="space-y-4 pt-1 text-xs">
            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 shrink-0 text-rose-600 mt-0.5" />
              <div className="space-y-1">
                <p className="font-bold text-sm">
                  Delete &quot;{deleteTeacher.userId?.name}&quot; from Database?
                </p>
                <p className="text-xs text-rose-700 dark:text-rose-400">
                  This will permanently delete this faculty staff account, assigned classes, study materials uploaded, and teaching presence logs from the database.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setDeleteTeacher(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleDeleteTeacher}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white transition-all cursor-pointer shadow-sm disabled:opacity-60"
              >
                {isDeleting ? "Deleting from DB..." : "Confirm & Permanently Delete"}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </main>
  );
}
