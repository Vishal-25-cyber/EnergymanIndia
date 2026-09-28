"use client";

import React, { useState } from "react";
import {
  School,
  Plus,
  Users,
  GraduationCap,
  Layers,
  Search,
  CheckCircle2,
  AlertCircle,
  X,
  UserPlus,
  Lock,
  Mail,
  Phone,
  BookOpen,
  Building2,
  Trash2,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { useFastFetch, invalidateCache } from "@/lib/api-cache";

const AVAILABLE_CLASSES = ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10"];
const AVAILABLE_SUBJECTS = ["Mathematics", "Science", "Physics", "Chemistry", "Biology", "English", "Social Science"];

export default function AdminInstitutionsPage() {
  const { data, refetch, isLoading } = useFastFetch("/api/admin/institutions");

  const institutions: any[] = data?.institutions || [];
  const summary = data?.summary || {
    totalInstitutions: 0,
    totalFaculty: 0,
    totalStudents: 0,
    totalGroups: 0,
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInstId, setSelectedInstId] = useState<string | null>(null);
  const [expandedInstIds, setExpandedInstIds] = useState<Set<string>>(new Set());

  // Modal states
  const [showAddInstModal, setShowAddInstModal] = useState(false);
  const [showAddFacultyModal, setShowAddFacultyModal] = useState(false);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showGroupModal, setShowGroupModal] = useState(false);

  // Form states
  const [activeInst, setActiveInst] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // New Institution Form
  const [instForm, setInstForm] = useState({
    name: "",
    code: "",
    district: "",
    address: "",
    contactPerson: "",
    contactPhone: "",
    contactEmail: "",
    classesOffered: ["Class 9", "Class 10"],
  });

  // New Faculty Form
  const [facultyForm, setFacultyForm] = useState({
    name: "",
    username: "",
    phone: "",
    password: "",
    qualification: "B.Ed, B.Sc",
    specialization: "Mathematics & Science",
    classesTaught: ["Class 9", "Class 10"],
    subjects: ["Mathematics", "Science"],
  });

  // New Student Form
  const [studentForm, setStudentForm] = useState({
    name: "",
    username: "",
    phone: "",
    password: "",
    currentClass: "Class 10",
    board: "State Board",
    parentName: "",
    parentPhone: "",
    assignedFacultyId: "",
  });

  // Group Form
  const [groupForm, setGroupForm] = useState({
    groupId: "",
    groupName: "",
    classLevel: "Class 10",
    facultyUserId: "",
    studentUserIds: [] as string[],
  });

  const toggleExpand = (instId: string) => {
    setExpandedInstIds((prev) => {
      const next = new Set(prev);
      if (next.has(instId)) next.delete(instId);
      else next.add(instId);
      return next;
    });
  };

  const handleOpenAddFaculty = (inst: any) => {
    setActiveInst(inst);
    setErrorMsg("");
    setSuccessMsg("");
    setFacultyForm({
      name: "",
      username: "",
      phone: "",
      password: "",
      qualification: "B.Ed, B.Sc",
      specialization: "Mathematics & Science",
      classesTaught: inst.classesOffered?.length ? [inst.classesOffered[0]] : ["Class 10"],
      subjects: ["Mathematics", "Science"],
    });
    setShowAddFacultyModal(true);
  };

  const handleOpenAddStudent = (inst: any) => {
    setActiveInst(inst);
    setErrorMsg("");
    setSuccessMsg("");
    setStudentForm({
      name: "",
      username: "",
      phone: "",
      password: "",
      currentClass: inst.classesOffered?.length ? inst.classesOffered[0] : "Class 10",
      board: "State Board",
      parentName: "",
      parentPhone: "",
      assignedFacultyId: inst.faculty?.[0]?.userId || "",
    });
    setShowAddStudentModal(true);
  };

  const handleOpenGroupModal = (inst: any, existingGroup?: any) => {
    setActiveInst(inst);
    setErrorMsg("");
    setSuccessMsg("");
    if (existingGroup) {
      setGroupForm({
        groupId: existingGroup.groupId,
        groupName: existingGroup.groupName,
        classLevel: existingGroup.classLevel,
        facultyUserId: existingGroup.facultyUserId?.toString() || "",
        studentUserIds: (existingGroup.studentUserIds || []).map((id: any) => (id._id || id).toString()),
      });
    } else {
      const initialClass = inst.classesOffered?.[0] || "Class 10";
      setGroupForm({
        groupId: "",
        groupName: `${initialClass} - Section A`,
        classLevel: initialClass,
        facultyUserId: inst.faculty?.[0]?.userId || "",
        studentUserIds: [],
      });
    }
    setShowGroupModal(true);
  };

  // Submit New Institution
  const handleCreateInstitution = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!instForm.name.trim()) {
      setErrorMsg("Institution name is required.");
      return;
    }
    setSubmitting(true);
    setErrorMsg("");
    try {
      const res = await fetch("/api/admin/institutions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "CREATE_INSTITUTION",
          ...instForm,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create institution.");

      setSuccessMsg(data.message || "Institution created successfully!");
      invalidateCache("/api/admin/institutions");
      refetch();
      setTimeout(() => {
        setShowAddInstModal(false);
        setSuccessMsg("");
      }, 1200);
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  // Submit New Faculty
  const handleCreateFaculty = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!facultyForm.name.trim() || !facultyForm.username.trim() || !facultyForm.password.trim()) {
      setErrorMsg("Please provide Faculty Name, Username/Email, and Password.");
      return;
    }
    setSubmitting(true);
    setErrorMsg("");
    try {
      const res = await fetch("/api/admin/institutions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "ADD_FACULTY",
          institutionId: activeInst?._id,
          institutionName: activeInst?.name,
          ...facultyForm,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add faculty member.");

      setSuccessMsg(data.message || "Faculty member created with login credentials!");
      invalidateCache("/api/admin/institutions");
      invalidateCache("/api/admin/teachers");
      refetch();
      setTimeout(() => {
        setShowAddFacultyModal(false);
        setSuccessMsg("");
      }, 1200);
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  // Submit New Student
  const handleCreateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentForm.name.trim() || !studentForm.username.trim() || !studentForm.password.trim()) {
      setErrorMsg("Please provide Student Name, Username/Email, and Password.");
      return;
    }
    setSubmitting(true);
    setErrorMsg("");
    try {
      const res = await fetch("/api/admin/institutions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "ADD_STUDENT",
          institutionId: activeInst?._id,
          institutionName: activeInst?.name,
          ...studentForm,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add student.");

      setSuccessMsg(data.message || "Student created with login credentials!");
      invalidateCache("/api/admin/institutions");
      invalidateCache("/api/admin/students");
      refetch();
      setTimeout(() => {
        setShowAddStudentModal(false);
        setSuccessMsg("");
      }, 1200);
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  // Submit Group Allocation
  const handleSaveGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!groupForm.groupName.trim()) {
      setErrorMsg("Please provide a group name (e.g. Class 10 - Section A).");
      return;
    }
    if (!groupForm.facultyUserId) {
      setErrorMsg("Please select the designated faculty member (Mam/Sir).");
      return;
    }
    setSubmitting(true);
    setErrorMsg("");
    try {
      const res = await fetch("/api/admin/institutions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "SAVE_GROUP",
          institutionId: activeInst?._id,
          ...groupForm,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save group.");

      setSuccessMsg(data.message || "Group allocation saved successfully!");
      invalidateCache("/api/admin/institutions");
      invalidateCache("/api/admin/teachers");
      refetch();
      setTimeout(() => {
        setShowGroupModal(false);
        setSuccessMsg("");
      }, 1200);
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  // Delete Institution
  const handleDeleteInstitution = async (inst: any) => {
    if (!confirm(`Are you sure you want to delete "${inst.name}"? This action cannot be undone.`)) {
      return;
    }
    try {
      const res = await fetch(`/api/admin/institutions?id=${encodeURIComponent(inst._id)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete institution.");
      invalidateCache("/api/admin/institutions");
      refetch();
    } catch (err: any) {
      alert(err.message || "Error deleting institution.");
    }
  };

  const filteredInstitutions = institutions.filter((inst) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      inst.name?.toLowerCase().includes(q) ||
      inst.code?.toLowerCase().includes(q) ||
      inst.district?.toLowerCase().includes(q)
    );
  });

  return (
    <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* ── Top Header & KPI Bar ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-blue-700 via-indigo-700 to-violet-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold tracking-wide">
            <Building2 className="w-3.5 h-3.5" />
            <span>Institutional B2B Architecture</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Schools, Faculty & Class Groups
          </h1>
          <p className="text-sm text-blue-100 max-w-2xl leading-relaxed">
            Create school institutions, add teachers and students with active username and password credentials, and allocate class groups so tests and live classes are strictly posted to designated participants.
          </p>
        </div>
        <div className="relative z-10 flex items-center gap-3">
          <Button
            onClick={() => {
              setErrorMsg("");
              setSuccessMsg("");
              setInstForm({
                name: "",
                code: "",
                district: "",
                address: "",
                contactPerson: "",
                contactPhone: "",
                contactEmail: "",
                classesOffered: ["Class 9", "Class 10"],
              });
              setShowAddInstModal(true);
            }}
            className="bg-white text-blue-700 hover:bg-blue-50 font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-black/10 flex items-center gap-2 border border-white/20 transition-all active:scale-95"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Create Institution</span>
          </Button>
        </div>
      </div>

      {/* ── Metrics Cards ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Institutions / Schools</span>
            <Building2 className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-2">
            {summary.totalInstitutions}
          </div>
          <span className="text-[11px] text-slate-400">Registered schools</span>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Faculty Members</span>
            <Users className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-2">
            {summary.totalFaculty}
          </div>
          <span className="text-[11px] text-slate-400">Allocated teachers</span>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Enrolled Students</span>
            <GraduationCap className="w-4 h-4 text-violet-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-2">
            {summary.totalStudents}
          </div>
          <span className="text-[11px] text-slate-400">School learners</span>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Active Groups</span>
            <Layers className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-2">
            {summary.totalGroups}
          </div>
          <span className="text-[11px] text-slate-400">Isolated class groups</span>
        </div>
      </div>

      {/* ── Search & Filter Bar ── */}
      <div className="flex items-center gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-2.5 shadow-sm">
        <Search className="w-4 h-4 text-slate-400 shrink-0" />
        <input
          type="text"
          placeholder="Search institution by name, school code, or district..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-transparent border-none text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none w-full"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="text-xs text-slate-400 hover:text-slate-600 p-1"
          >
            Clear
          </button>
        )}
      </div>

      {/* ── Institutions List ── */}
      <div className="space-y-4">
        {isLoading && institutions.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-sm">
            Loading institutions and group allocations...
          </div>
        ) : filteredInstitutions.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center space-y-4">
            <School className="w-12 h-12 text-slate-300 mx-auto" />
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-800 dark:text-white">
                No Institutions Found
              </h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                {searchQuery
                  ? "No schools matched your search. Try another keyword or clear filter."
                  : "Get started by creating your first school institution to allocate teachers and students."}
              </p>
            </div>
            {!searchQuery && (
              <Button
                onClick={() => setShowAddInstModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-xl"
              >
                Create School Institution
              </Button>
            )}
          </div>
        ) : (
          filteredInstitutions.map((inst) => {
            const isExpanded = expandedInstIds.has(inst._id);
            const facultyCount = inst.faculty?.length || 0;
            const studentCount = inst.students?.length || 0;
            const groupCount = inst.groups?.length || 0;

            return (
              <div
                key={inst._id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden transition-all"
              >
                {/* Institution Header Card */}
                <div className="p-5 sm:p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
                          {inst.name}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 font-mono text-[11px] font-bold border border-blue-200 dark:border-blue-900">
                          {inst.code}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 text-[11px] font-semibold border border-emerald-200 dark:border-emerald-900">
                          {inst.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-500 flex-wrap">
                        {inst.district && <span>📍 {inst.district}</span>}
                        {inst.contactPerson && <span>👤 Contact: {inst.contactPerson}</span>}
                        {inst.contactPhone && <span>📞 {inst.contactPhone}</span>}
                        {inst.contactEmail && <span>✉️ {inst.contactEmail}</span>}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <Button
                        size="sm"
                        onClick={() => handleOpenAddFaculty(inst)}
                        className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 font-bold text-xs rounded-xl h-9 px-3 flex items-center gap-1.5"
                      >
                        <UserPlus className="w-3.5 h-3.5" />
                        <span>Add Faculty</span>
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleOpenAddStudent(inst)}
                        className="bg-violet-50 hover:bg-violet-100 text-violet-700 border border-violet-200 font-bold text-xs rounded-xl h-9 px-3 flex items-center gap-1.5"
                      >
                        <GraduationCap className="w-3.5 h-3.5" />
                        <span>Add Student</span>
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleOpenGroupModal(inst)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl h-9 px-3.5 flex items-center gap-1.5 shadow-sm"
                      >
                        <Layers className="w-3.5 h-3.5" />
                        <span>New Group</span>
                      </Button>
                      <button
                        onClick={() => handleDeleteInstitution(inst)}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-all"
                        title="Delete Institution"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Badges / Metrics bar */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                    <div className="flex items-center gap-4 flex-wrap">
                      <span className="font-medium text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-emerald-600" />
                        <strong className="text-slate-900 dark:text-white">{facultyCount}</strong> Faculty
                      </span>
                      <span className="font-medium text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                        <GraduationCap className="w-3.5 h-3.5 text-violet-600" />
                        <strong className="text-slate-900 dark:text-white">{studentCount}</strong> Students
                      </span>
                      <span className="font-medium text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-amber-600" />
                        <strong className="text-slate-900 dark:text-white">{groupCount}</strong> Groups
                      </span>
                      <div className="flex items-center gap-1">
                        {(inst.classesOffered || []).map((cls: string) => (
                          <span
                            key={cls}
                            className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-semibold text-slate-600 dark:text-slate-300"
                          >
                            {cls}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => toggleExpand(inst._id)}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                    >
                      <span>{isExpanded ? "Collapse Details" : "View Groups & Rosters"}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Details Section */}
                {isExpanded && (
                  <div className="p-5 sm:p-6 bg-slate-50/70 dark:bg-slate-950/40 border-t border-slate-100 dark:border-slate-800 space-y-6">
                    {/* Groups Section */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-2">
                          <Layers className="w-3.5 h-3.5 text-amber-600" />
                          <span>Class Groups ({groupCount})</span>
                        </h4>
                        <button
                          onClick={() => handleOpenGroupModal(inst)}
                          className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add Group</span>
                        </button>
                      </div>

                      {groupCount === 0 ? (
                        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs text-slate-500 text-center">
                          No class groups created yet. Click "New Group" to allocate a faculty member to specific students.
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {inst.groups.map((grp: any) => (
                            <div
                              key={grp.groupId}
                              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm space-y-3 relative hover:border-blue-300 transition-all"
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div className="space-y-0.5">
                                  <div className="font-bold text-slate-900 dark:text-white text-sm">
                                    {grp.groupName}
                                  </div>
                                  <span className="inline-block px-1.5 py-0.5 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 rounded text-[10px] font-semibold">
                                    {grp.classLevel}
                                  </span>
                                </div>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleOpenGroupModal(inst, grp)}
                                  className="h-7 text-xs font-bold text-blue-600 px-2"
                                >
                                  Edit Group
                                </Button>
                              </div>

                              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 space-y-1 text-xs">
                                <div className="text-[11px] font-semibold text-slate-500">
                                  Designated Faculty:
                                </div>
                                <div className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                  <span>{grp.facultyName}</span>
                                </div>
                              </div>

                              <div className="text-xs space-y-1">
                                <div className="text-[11px] font-semibold text-slate-500 flex items-center justify-between">
                                  <span>Allocated Students:</span>
                                  <span className="font-bold text-slate-800 dark:text-slate-200">
                                    {grp.studentCount} students
                                  </span>
                                </div>
                                <div className="max-h-24 overflow-y-auto space-y-1 pr-1 text-[11px] text-slate-600 dark:text-slate-300">
                                  {grp.students && grp.students.length > 0 ? (
                                    grp.students.map((st: any) => (
                                      <div
                                        key={st.userId}
                                        className="flex items-center justify-between py-0.5 border-b border-slate-100 dark:border-slate-800 last:border-none"
                                      >
                                        <span className="truncate">{st.name}</span>
                                        <span className="font-mono text-[10px] text-slate-400">
                                          {st.studentId}
                                        </span>
                                      </div>
                                    ))
                                  ) : (
                                    <div className="text-slate-400 italic">No students allocated yet.</div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Faculty Roster */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-2">
                          <Users className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Faculty Members ({facultyCount})</span>
                        </h4>
                        <button
                          onClick={() => handleOpenAddFaculty(inst)}
                          className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add Faculty</span>
                        </button>
                      </div>

                      {facultyCount === 0 ? (
                        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs text-slate-500 text-center">
                          No faculty members added to this school yet.
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                          {inst.faculty.map((f: any) => (
                            <div
                              key={f.userId}
                              className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-1 text-xs"
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-slate-900 dark:text-white">
                                  {f.name}
                                </span>
                                <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-50 text-emerald-700 font-semibold">
                                  {f.status}
                                </span>
                              </div>
                              <div className="text-[11px] text-slate-500 font-mono truncate">
                                {f.email} • {f.phone}
                              </div>
                              <div className="text-[11px] text-slate-600 dark:text-slate-300">
                                {f.qualification} • {f.specialization}
                              </div>
                              <div className="text-[10px] text-slate-400 font-semibold pt-1 border-t border-slate-100 dark:border-slate-800">
                                Group Students: {f.assignedStudentCount}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Students Roster */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-2">
                          <GraduationCap className="w-3.5 h-3.5 text-violet-600" />
                          <span>Registered Students ({studentCount})</span>
                        </h4>
                        <button
                          onClick={() => handleOpenAddStudent(inst)}
                          className="text-xs font-bold text-violet-600 hover:underline flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add Student</span>
                        </button>
                      </div>

                      {studentCount === 0 ? (
                        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs text-slate-500 text-center">
                          No students registered in this school yet.
                        </div>
                      ) : (
                        <div className="max-h-60 overflow-y-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl divide-y divide-slate-100 dark:divide-slate-800">
                          {inst.students.map((st: any) => (
                            <div
                              key={st.userId}
                              className="p-3 flex items-center justify-between gap-2 text-xs hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                            >
                              <div className="space-y-0.5">
                                <div className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                                  <span>{st.name}</span>
                                  <span className="font-mono text-[10px] text-slate-400">
                                    {st.studentId}
                                  </span>
                                  <span className="px-1.5 py-0.2 rounded bg-violet-50 text-violet-700 text-[10px] font-semibold">
                                    {st.currentClass}
                                  </span>
                                </div>
                                <div className="text-[11px] text-slate-500">
                                  Login: <span className="font-mono text-slate-700 dark:text-slate-300">{st.email}</span> • Phone: {st.phone}
                                </div>
                              </div>
                              <div className="text-right text-[11px] text-slate-500">
                                {st.parentName && <div>Parent: {st.parentName}</div>}
                                <div className="text-[10px] text-slate-400">
                                  {st.assignedTeacherIds?.length ? "Allocated to Faculty" : "Unassigned"}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* ──────────────────────────────────────────────────────────────────────── */}
      {/* MODAL 1: ADD NEW INSTITUTION                                            */}
      {/* ──────────────────────────────────────────────────────────────────────── */}
      {showAddInstModal && (
        <Modal
          isOpen={showAddInstModal}
          onClose={() => setShowAddInstModal(false)}
          title="Create New School Institution"
        >
          <form onSubmit={handleCreateInstitution} className="space-y-4 pt-2">
            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-50 text-red-700 border border-red-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}
            {successMsg && (
              <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Institution / School Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. St. Joseph's Higher Secondary School"
                value={instForm.name}
                onChange={(e) => setInstForm({ ...instForm, name: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-blue-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Institution Code
                </label>
                <input
                  type="text"
                  placeholder="e.g. STJ_HSS"
                  value={instForm.code}
                  onChange={(e) => setInstForm({ ...instForm, code: e.target.value.toUpperCase() })}
                  className="w-full px-3 py-2 text-xs font-mono rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-blue-600 uppercase"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  District / Location
                </label>
                <input
                  type="text"
                  placeholder="e.g. Chennai / Coimbatore"
                  value={instForm.district}
                  onChange={(e) => setInstForm({ ...instForm, district: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-blue-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Contact Person & Mobile Phone
              </label>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Contact Person (e.g. Principal / Coordinator)"
                  value={instForm.contactPerson}
                  onChange={(e) => setInstForm({ ...instForm, contactPerson: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-blue-600"
                />
                <input
                  type="tel"
                  placeholder="Phone (10 digits)"
                  value={instForm.contactPhone}
                  onChange={(e) => setInstForm({ ...instForm, contactPhone: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-blue-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Contact Email
              </label>
              <input
                type="email"
                placeholder="e.g. principal@stjoseph.edu"
                value={instForm.contactEmail}
                onChange={(e) => setInstForm({ ...instForm, contactEmail: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Classes Offered
              </label>
              <div className="flex items-center gap-2 flex-wrap">
                {AVAILABLE_CLASSES.map((cls) => {
                  const isSelected = instForm.classesOffered.includes(cls);
                  return (
                    <button
                      key={cls}
                      type="button"
                      onClick={() => {
                        const next = isSelected
                          ? instForm.classesOffered.filter((c) => c !== cls)
                          : [...instForm.classesOffered, cls];
                        setInstForm({ ...instForm, classesOffered: next });
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        isSelected
                          ? "bg-blue-600 text-white shadow-sm"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                      }`}
                    >
                      {cls}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowAddInstModal(false)}
                className="text-xs"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={submitting}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4"
              >
                {submitting ? "Creating..." : "Save Institution"}
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* ──────────────────────────────────────────────────────────────────────── */}
      {/* MODAL 2: ADD FACULTY (Username & Password)                               */}
      {/* ──────────────────────────────────────────────────────────────────────── */}
      {showAddFacultyModal && (
        <Modal
          isOpen={showAddFacultyModal}
          onClose={() => setShowAddFacultyModal(false)}
          title={`Add Faculty Member • ${activeInst?.name}`}
        >
          <form onSubmit={handleCreateFaculty} className="space-y-4 pt-2">
            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-50 text-red-700 border border-red-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}
            {successMsg && (
              <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Faculty Full Name (Mam / Sir) *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Priya Sharma Mam"
                value={facultyForm.name}
                onChange={(e) => setFacultyForm({ ...facultyForm, name: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-blue-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Username / Login Email *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. priya.mam@school.edu"
                  value={facultyForm.username}
                  onChange={(e) => setFacultyForm({ ...facultyForm, username: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Login Password *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya@123"
                  value={facultyForm.password}
                  onChange={(e) => setFacultyForm({ ...facultyForm, password: e.target.value })}
                  className="w-full px-3 py-2 text-xs font-mono rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-blue-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Mobile Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="e.g. 9876543210"
                  value={facultyForm.phone}
                  onChange={(e) => setFacultyForm({ ...facultyForm, phone: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Qualification
                </label>
                <input
                  type="text"
                  placeholder="e.g. M.Sc, B.Ed"
                  value={facultyForm.qualification}
                  onChange={(e) => setFacultyForm({ ...facultyForm, qualification: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-blue-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Specialization / Subject Focus
              </label>
              <input
                type="text"
                placeholder="e.g. Mathematics & Physical Sciences"
                value={facultyForm.specialization}
                onChange={(e) => setFacultyForm({ ...facultyForm, specialization: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Classes Taught
              </label>
              <div className="flex items-center gap-2 flex-wrap">
                {AVAILABLE_CLASSES.map((cls) => {
                  const isSelected = facultyForm.classesTaught.includes(cls);
                  return (
                    <button
                      key={cls}
                      type="button"
                      onClick={() => {
                        const next = isSelected
                          ? facultyForm.classesTaught.filter((c) => c !== cls)
                          : [...facultyForm.classesTaught, cls];
                        setFacultyForm({ ...facultyForm, classesTaught: next });
                      }}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                        isSelected
                          ? "bg-emerald-600 text-white shadow-sm"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                      }`}
                    >
                      {cls}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowAddFacultyModal(false)}
                className="text-xs"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={submitting}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4"
              >
                {submitting ? "Creating Faculty..." : "Create Faculty Account"}
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* ──────────────────────────────────────────────────────────────────────── */}
      {/* MODAL 3: ADD STUDENT (Username & Password & Faculty Link)                 */}
      {/* ──────────────────────────────────────────────────────────────────────── */}
      {showAddStudentModal && (
        <Modal
          isOpen={showAddStudentModal}
          onClose={() => setShowAddStudentModal(false)}
          title={`Add Student • ${activeInst?.name}`}
        >
          <form onSubmit={handleCreateStudent} className="space-y-4 pt-2">
            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-50 text-red-700 border border-red-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}
            {successMsg && (
              <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Student Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Arun Kumar"
                value={studentForm.name}
                onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-blue-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Username / Login Email *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. arun@school.edu"
                  value={studentForm.username}
                  onChange={(e) => setStudentForm({ ...studentForm, username: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Login Password *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Arun@123"
                  value={studentForm.password}
                  onChange={(e) => setStudentForm({ ...studentForm, password: e.target.value })}
                  className="w-full px-3 py-2 text-xs font-mono rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-blue-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Class Level *
                </label>
                <select
                  value={studentForm.currentClass}
                  onChange={(e) => setStudentForm({ ...studentForm, currentClass: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-blue-600"
                >
                  {AVAILABLE_CLASSES.map((cls) => (
                    <option key={cls} value={cls}>
                      {cls}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Education Board
                </label>
                <select
                  value={studentForm.board}
                  onChange={(e) => setStudentForm({ ...studentForm, board: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-blue-600"
                >
                  <option value="State Board">State Board</option>
                  <option value="CBSE">CBSE</option>
                </select>
              </div>
            </div>

            {/* Direct Faculty Allocation */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Allocate to Faculty Mam / Sir (Optional)
              </label>
              <select
                value={studentForm.assignedFacultyId}
                onChange={(e) => setStudentForm({ ...studentForm, assignedFacultyId: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-blue-600"
              >
                <option value="">-- Unassigned / Allocate Later via Group --</option>
                {(activeInst?.faculty || []).map((f: any) => (
                  <option key={f.userId} value={f.userId}>
                    {f.name} ({f.specialization || "Faculty"})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Parent / Guardian Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Kumar S."
                  value={studentForm.parentName}
                  onChange={(e) => setStudentForm({ ...studentForm, parentName: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Parent Mobile Phone
                </label>
                <input
                  type="tel"
                  placeholder="e.g. 9876543210"
                  value={studentForm.parentPhone}
                  onChange={(e) => setStudentForm({ ...studentForm, parentPhone: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-blue-600"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowAddStudentModal(false)}
                className="text-xs"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={submitting}
                className="bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold px-4"
              >
                {submitting ? "Creating Student..." : "Create Student Account"}
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* ──────────────────────────────────────────────────────────────────────── */}
      {/* MODAL 4: CREATE / MANAGE CLASS GROUP (Allocate "This Mam" to group)      */}
      {/* ──────────────────────────────────────────────────────────────────────── */}
      {showGroupModal && (
        <Modal
          isOpen={showGroupModal}
          onClose={() => setShowGroupModal(false)}
          title={`Allocate Class Group • ${activeInst?.name}`}
        >
          <form onSubmit={handleSaveGroup} className="space-y-4 pt-2">
            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-50 text-red-700 border border-red-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}
            {successMsg && (
              <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Group / Section Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Class 10 - Section A"
                  value={groupForm.groupName}
                  onChange={(e) => setGroupForm({ ...groupForm, groupName: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Class Level *
                </label>
                <select
                  value={groupForm.classLevel}
                  onChange={(e) => setGroupForm({ ...groupForm, classLevel: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-blue-600"
                >
                  {AVAILABLE_CLASSES.map((cls) => (
                    <option key={cls} value={cls}>
                      {cls}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Designated Faculty Member (Mam / Sir for this Group) *
              </label>
              <select
                required
                value={groupForm.facultyUserId}
                onChange={(e) => setGroupForm({ ...groupForm, facultyUserId: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-blue-600"
              >
                <option value="">-- Select Faculty Mam / Sir --</option>
                {(activeInst?.faculty || []).map((f: any) => (
                  <option key={f.userId} value={f.userId}>
                    {f.name} ({f.email}) • {f.specialization || "Faculty"}
                  </option>
                ))}
              </select>
            </div>

            {/* Students Allocation Checklist */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700 dark:text-slate-300">
                  Select Students for this Group:
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const allIds = (activeInst?.students || [])
                        .filter((s: any) => s.currentClass === groupForm.classLevel)
                        .map((s: any) => s.userId);
                      setGroupForm({ ...groupForm, studentUserIds: allIds });
                    }}
                    className="text-[11px] font-bold text-blue-600 hover:underline"
                  >
                    Select All Matching
                  </button>
                  <span className="text-slate-300">|</span>
                  <button
                    type="button"
                    onClick={() => setGroupForm({ ...groupForm, studentUserIds: [] })}
                    className="text-[11px] font-bold text-slate-500 hover:underline"
                  >
                    Deselect All
                  </button>
                </div>
              </div>

              <div className="max-h-56 overflow-y-auto border border-slate-200 dark:border-slate-800 rounded-2xl p-2 space-y-1 bg-slate-50/50 dark:bg-slate-900/50">
                {(() => {
                  const matchingStudents = (activeInst?.students || []).filter(
                    (s: any) => !groupForm.classLevel || s.currentClass === groupForm.classLevel
                  );

                  if (matchingStudents.length === 0) {
                    return (
                      <div className="p-4 text-center text-xs text-slate-400">
                        No students found in {activeInst?.name} matching {groupForm.classLevel}. Click "Add Student" to create them first.
                      </div>
                    );
                  }

                  return matchingStudents.map((st: any) => {
                    const isChecked = groupForm.studentUserIds.includes(st.userId);
                    return (
                      <label
                        key={st.userId}
                        className={`flex items-center justify-between p-2 rounded-xl text-xs cursor-pointer border transition-all ${
                          isChecked
                            ? "bg-blue-50/80 dark:bg-blue-950/40 border-blue-200 dark:border-blue-900"
                            : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => {
                              const next = e.target.checked
                                ? [...groupForm.studentUserIds, st.userId]
                                : groupForm.studentUserIds.filter((id) => id !== st.userId);
                              setGroupForm({ ...groupForm, studentUserIds: next });
                            }}
                            className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                          />
                          <div>
                            <span className="font-bold text-slate-900 dark:text-white">
                              {st.name}
                            </span>
                            <span className="ml-2 font-mono text-[10px] text-slate-400">
                              {st.studentId}
                            </span>
                          </div>
                        </div>

                        <span className="text-[10px] font-semibold text-slate-500">
                          {st.currentClass}
                        </span>
                      </label>
                    );
                  });
                })()}
              </div>
              <div className="text-[11px] text-slate-400">
                Selected: <strong className="text-slate-800 dark:text-white">{groupForm.studentUserIds.length}</strong> students. These students will strictly receive live classes, timetable, and tests from this designated teacher.
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowGroupModal(false)}
                className="text-xs"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={submitting}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4"
              >
                {submitting ? "Saving Group..." : "Save Group Allocation"}
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </main>
  );
}
