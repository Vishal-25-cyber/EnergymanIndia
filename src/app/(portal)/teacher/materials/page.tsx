"use client";

import React, { useState } from "react";
import {
  BookOpen,
  Trash2,
  Plus,
  Download,
  CheckCircle2,
  FileText,
  Paperclip,
  Search,
  Eye,
  Check,
  Loader2,
  Maximize2,
  Minimize2,
  X,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { DocumentViewer, openDocumentInNewTab } from "@/components/common/DocumentViewer";
import { getSubjectsForClassAndBoard, CLASS_LIST } from "@/lib/curriculum";
import { useFastFetch, invalidateCache } from "@/lib/api-cache";
import { downloadMaterial, openMaterial, DownloadableMaterial } from "@/lib/download";

export default function TeacherMaterialsPage() {
  const { data, refetch, isLoading } = useFastFetch("/api/teacher/materials");
  const [search, setSearch] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("ALL");
  const [selectedClass, setSelectedClass] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [deletedIds, setDeletedIds] = useState<string[]>([]);
  const [previewMaterial, setPreviewMaterial] = useState<any | null>(null);

  React.useEffect(() => {
    if (previewMaterial) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setPreviewMaterial(null);
          if (document.fullscreenElement) {
            document.exitFullscreen?.().catch(() => {});
          }
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "unset";
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [previewMaterial]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "NOTES",
    classLevel: "Class 10",
    subject: "Mathematics",
    fileUrl: "",
    fileName: "",
    fileSize: "",
  });

  const availableSubjectsForUpload = Array.from(
    new Set([
      ...getSubjectsForClassAndBoard(formData.classLevel, "CBSE"),
      ...getSubjectsForClassAndBoard(formData.classLevel, "State Board"),
    ])
  );

  const filterSubjects = ["ALL", "Mathematics", "Science", "Physics", "Chemistry", "Biology", "English", "Social Science"];

  const handleClassChange = (newClass: string) => {
    const newSubjects = getSubjectsForClassAndBoard(newClass, "CBSE");
    setFormData((prev) => ({
      ...prev,
      classLevel: newClass,
      subject: newSubjects[0] || "Mathematics",
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const sizeInMb = (file.size / (1024 * 1024)).toFixed(1);
      const sizeStr = `${sizeInMb} MB`;

      const reader = new FileReader();
      reader.onload = (event) => {
        let base64Url = event.target?.result as string;
        if (file.name.toLowerCase().endsWith(".pdf") && base64Url.startsWith("data:") && !base64Url.startsWith("data:application/pdf")) {
          const commaIdx = base64Url.indexOf(",");
          if (commaIdx !== -1) {
            base64Url = "data:application/pdf;base64," + base64Url.substring(commaIdx + 1);
          }
        }
        setFormData((prev) => ({
          ...prev,
          fileName: file.name,
          fileSize: sizeStr,
          fileUrl: base64Url,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const materials: DownloadableMaterial[] = Array.isArray(data?.materials) ? data.materials : [];

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.classLevel || !formData.subject) {
      alert("Please fill in all required fields.");
      return;
    }

    setIsUploading(true);
    try {
      let finalFileUrl = formData.fileUrl;
      let finalFileName = formData.fileName || selectedFile?.name;
      let finalFileSize = formData.fileSize;

      // Ensure file reading is fully complete before uploading
      if (selectedFile && (!finalFileUrl || !finalFileUrl.startsWith("data:"))) {
        finalFileUrl = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            let res = event.target?.result as string;
            if (selectedFile.name.toLowerCase().endsWith(".pdf") && res.startsWith("data:") && !res.startsWith("data:application/pdf")) {
              const commaIdx = res.indexOf(",");
              if (commaIdx !== -1) {
                res = "data:application/pdf;base64," + res.substring(commaIdx + 1);
              }
            }
            resolve(res);
          };
          reader.onerror = reject;
          reader.readAsDataURL(selectedFile);
        });
        finalFileName = selectedFile.name;
        finalFileSize = `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`;
      }

      const res = await fetch("/api/teacher/materials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          title: formData.title.trim(),
          description: formData.description.trim(),
          fileUrl: finalFileUrl || "https://acuity.edu/materials/class-material.pdf",
          fileName: finalFileName || `${formData.classLevel}_${formData.subject}_Notes.pdf`,
          fileSize: finalFileSize || "1.8 MB",
        }),
      });

      if (res.ok) {
        setUploadSuccess(true);
        invalidateCache("/api/teacher/materials");
        invalidateCache("/api/student/materials");
        refetch();
        setTimeout(() => {
          setIsModalOpen(false);
          setUploadSuccess(false);
          setFormData({
            title: "",
            description: "",
            category: "NOTES",
            classLevel: "Class 10",
            subject: "Mathematics",
            fileUrl: "",
            fileName: "",
            fileSize: "",
          });
          setSelectedFile(null);
        }, 1000);
      } else {
        const d = await res.json();
        alert(d.error || "Failed to upload material");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!id) return;
    // Optimistically remove immediately from UI
    setDeletedIds((prev) => [...prev, id]);

    try {
      const res = await fetch(`/api/teacher/materials/${id}`, { method: "DELETE" });
      if (!res.ok) {
        // Fallback to query param
        await fetch(`/api/teacher/materials?id=${id}`, { method: "DELETE" });
      }
    } catch (err) {
      console.error("Delete material error:", err);
    } finally {
      invalidateCache("/api/teacher/materials");
      invalidateCache("/api/student/materials");
      refetch();
    }
  };

  const isSubjectMatch = React.useCallback((matSub: string, filterSub: string) => {
    if (!filterSub || filterSub === "ALL") return true;
    const m = (matSub || "").trim().toLowerCase();
    const f = (filterSub || "").trim().toLowerCase();
    if (m === f) return true;
    if (f === "social science") return m.includes("social") || m.includes("history") || m.includes("geography");
    if (f === "science") return m === "science" || m.includes("physics") || m.includes("chemistry") || m.includes("biology");
    if (f === "mathematics") return m.includes("math") || m.includes("algebra") || m.includes("geometry");
    if (f === "english") return m.includes("english") || m.includes("grammar");
    return m.includes(f) || f.includes(m);
  }, []);

  const filteredMaterials = React.useMemo(() => {
    return materials.filter((m: any) => {
      const id = m._id?.toString() || m._id || m.title;
      if (deletedIds.includes(id) || deletedIds.includes(m._id) || deletedIds.includes(m.title)) {
        return false;
      }

      const matchesSearch =
        !search.trim() ||
        m.title?.toLowerCase().includes(search.toLowerCase()) ||
        m.subject?.toLowerCase().includes(search.toLowerCase()) ||
        m.description?.toLowerCase().includes(search.toLowerCase()) ||
        m.classLevel?.toLowerCase().includes(search.toLowerCase());

      const matchesSubject = isSubjectMatch(m.subject, selectedSubject);
      const matchesClass = selectedClass === "ALL" || m.classLevel === selectedClass;

      return matchesSearch && matchesSubject && matchesClass;
    });
  }, [materials, deletedIds, search, selectedSubject, selectedClass, isSubjectMatch]);

  const getSubjectBadge = (subject?: string) => {
    switch (subject?.toLowerCase()) {
      case "mathematics":
        return "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/70 border-indigo-200 dark:border-indigo-800";
      case "science":
      case "physics":
      case "chemistry":
      case "biology":
        return "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/70 border-emerald-200 dark:border-emerald-800";
      case "english":
        return "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/70 border-amber-200 dark:border-amber-800";
      case "social science":
        return "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/70 border-rose-200 dark:border-rose-800";
      default:
        return "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/70 border-purple-200 dark:border-purple-800";
    }
  };

  return (
    <main className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 animate-in fade-in duration-150 select-none">
      {/* ── 1. CLEAN HEADER (NO CARDS) ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
            Study Material &amp; Notes Repository
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Upload PDFs, formula handbooks, and syllabus worksheets for your enrolled students to download.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="text-xs font-mono text-slate-400">
            {filteredMaterials.length} of {materials.length} Resources
          </div>

          <button
            onClick={() => {
              setFormData({
                title: "",
                description: "",
                category: "NOTES",
                classLevel: "Class 10",
                subject: "Mathematics",
                fileUrl: "",
                fileName: "",
                fileSize: "",
              });
              setSelectedFile(null);
              setIsModalOpen(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-[#004b79] hover:bg-[#003b60] text-white transition-colors cursor-pointer shadow-sm active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Upload Material</span>
          </button>
        </div>
      </div>

      {/* ── 2. SEARCH & SUBJECT FILTERS (CARDLESS) ── */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search uploaded materials by title, subject, or keywords..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 pl-10 pr-4 text-xs sm:text-sm font-medium focus:outline-none focus:border-[#004b79]"
            />
          </div>

          {/* Grade filter */}
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="h-10 px-3.5 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 focus:outline-none focus:border-[#004b79] cursor-pointer shadow-xs"
          >
            <option value="ALL">All Grades</option>
            {CLASS_LIST.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Subject Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth pb-1 shrink-0">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
            Subjects:
          </span>
          {filterSubjects.map((s) => (
            <button
              key={s}
              onClick={() => setSelectedSubject(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all duration-150 cursor-pointer shrink-0 active:scale-95 ${
                selectedSubject === s
                  ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-xs"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {s === "ALL" ? "All Subjects" : s}
            </button>
          ))}
        </div>
      </div>

      {/* ── 3. CARDLESS MASTER MATERIALS TABLE ── */}
      <div className="space-y-2 pt-2">
        {/* Table Column Headers */}
        <div className="hidden md:grid grid-cols-12 gap-4 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-850">
          <div className="col-span-3">Subject &amp; Format</div>
          <div className="col-span-5">Study Material Title &amp; Summary</div>
          <div className="col-span-2">Target Grade</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {/* Materials Rows */}
        {isLoading && materials.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400 animate-pulse">Loading study materials...</div>
        ) : filteredMaterials.length === 0 ? (
          <div className="p-12 text-center border border-dashed border-slate-200 dark:border-slate-800 rounded-xl space-y-2">
            <BookOpen className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">No study materials found</p>
            <p className="text-xs text-slate-400">Click &quot;Upload Material&quot; to publish notes for your students.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {filteredMaterials.map((mat: any) => {
              return (
                <div
                  key={mat._id}
                  className="py-3.5 grid grid-cols-1 md:grid-cols-12 gap-4 items-center transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-900/30 px-1"
                >
                  {/* Col 1: Subject & Category */}
                  <div className="col-span-3 space-y-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded border ${getSubjectBadge(mat.subject)}`}>
                        {mat.subject}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                        {mat.category || "NOTES"}
                      </span>
                    </div>
                    <p className="text-[11px] font-mono text-slate-400">{mat.fileSize || "1.8 MB"}</p>
                  </div>

                  {/* Col 2: Title & Description */}
                  <div className="col-span-5 space-y-0.5">
                    <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100">
                      {mat.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                      {mat.description || "Shared with students for home revision."}
                    </p>
                  </div>

                  {/* Col 3: Grade Level */}
                  <div className="col-span-2">
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      {mat.classLevel || "Class 10"}
                    </span>
                    <p className="text-[10px] text-slate-400">CBSE / State Board</p>
                  </div>

                  {/* Col 4: Actions (View, Download, Delete) */}
                  <div className="col-span-2 flex items-center justify-start md:justify-end gap-1.5">
                    <button
                      onClick={() => setPreviewMaterial(mat)}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
                      title="View uploaded document in reader"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#004b79] dark:text-[#dfb74a]" />
                      <span>View</span>
                    </button>

                    <button
                      onClick={() => downloadMaterial(mat)}
                      className="inline-flex items-center gap-1 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
                      title="Download document file"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => handleDelete(mat._id)}
                      className="inline-flex items-center gap-1 p-1.5 rounded-xl border border-rose-200 dark:border-rose-900/60 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-400 transition-colors cursor-pointer"
                      title="Delete Material"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── 4. UPLOAD MATERIAL MODAL ── */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          maxWidth="2xl"
          onClose={() => {
            setIsModalOpen(false);
            setUploadSuccess(false);
          }}
          title="Upload Study Material / Notes"
          description="Publish reference handbooks, formula sheets, or model question papers for your enrolled students."
        >
          {uploadSuccess ? (
            <div className="p-10 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                Material Published Successfully!
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Enrolled students in {formData.classLevel} can now download this document from their Learning Hub.
              </p>
            </div>
          ) : (
            <form onSubmit={handleUpload} className="space-y-5 pt-2 text-xs sm:text-sm">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Document Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chapter 4 Quadratic Equations Formulas & Exemplar Problems"
                  value={formData.title}
                  onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))}
                  className="w-full h-10 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3.5 text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:border-[#004b79] transition-colors shadow-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Grade Level <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formData.classLevel}
                    onChange={(e) => handleClassChange(e.target.value)}
                    className="w-full h-10 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:border-[#004b79] transition-colors shadow-xs cursor-pointer"
                  >
                    {CLASS_LIST.map((cls) => (
                      <option key={cls} value={cls}>
                        {cls}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Subject <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData((p) => ({ ...p, subject: e.target.value }))}
                    className="w-full h-10 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:border-[#004b79] transition-colors shadow-xs cursor-pointer"
                  >
                    {availableSubjectsForUpload.map((sub) => (
                      <option key={sub} value={sub}>
                        {sub}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Category <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData((p) => ({ ...p, category: e.target.value }))}
                    className="w-full h-10 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:border-[#004b79] transition-colors shadow-xs cursor-pointer"
                  >
                    <option value="NOTES">Class Notes &amp; Handouts</option>
                    <option value="WORKSHEET">Worksheets &amp; Ray Diagrams</option>
                    <option value="PDF">PDF Reference Handbook</option>
                    <option value="QUESTION_PAPER">Model Question Paper</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Upload Document (PDF / Image)
                  </label>
                  <div className="h-10 px-3 border border-dashed border-slate-300 dark:border-slate-700 rounded-xl flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/30 hover:border-[#004b79] transition-colors">
                    <label className="cursor-pointer flex items-center gap-2 w-full truncate">
                      <Paperclip className="w-4 h-4 text-slate-400 shrink-0" />
                      <span className="text-xs font-semibold text-[#004b79] dark:text-[#dfb74a] truncate">
                        {selectedFile ? selectedFile.name : "Click to select a document file"}
                      </span>
                      <input type="file" onChange={handleFileChange} className="hidden" accept=".pdf,.doc,.docx,.png,.jpg" />
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Description (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Outline topics covered in this document..."
                  value={formData.description}
                  onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-[#004b79] transition-colors shadow-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  disabled={isUploading}
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-[#004b79] hover:bg-[#003b60] text-white transition-all cursor-pointer disabled:opacity-60 shadow-sm inline-flex items-center gap-2"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Uploading file to Learning Hub... Please wait</span>
                    </>
                  ) : (
                    <span>Publish Material</span>
                  )}
                </button>
              </div>
            </form>
          )}
        </Modal>
      )}

      {/* ── 5. FULL SCREEN DOCUMENT READER OVERLAY ── */}
      {previewMaterial && (
        <div className="fixed inset-0 z-[100] w-screen h-screen bg-slate-950 flex flex-col overflow-hidden animate-in fade-in duration-150 select-none">
          {/* Sleek Top Header Navigation Bar */}
          <div className="h-14 sm:h-16 px-3 sm:px-6 bg-slate-900 border-b border-slate-800 flex items-center justify-between gap-3 shrink-0 text-white shadow-md">
            {/* Left: Document Info */}
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#004b79]/40 border border-[#004b79]/60 flex items-center justify-center shrink-0">
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-[#dfb74a]" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                  <span className={`text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded border ${getSubjectBadge(previewMaterial.subject)}`}>
                    {previewMaterial.subject || "General"}
                  </span>
                  <span className="text-[10px] sm:text-xs font-mono font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {previewMaterial.category || "NOTES"}
                  </span>
                  <span className="text-[10px] sm:text-xs text-slate-400 hidden sm:inline">
                    {previewMaterial.classLevel || "Class 10"}
                  </span>
                </div>
                <h2 className="text-xs sm:text-sm font-bold text-slate-100 truncate max-w-xs sm:max-w-md md:max-w-xl">
                  {previewMaterial.title}
                </h2>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* Download Button */}
              <button
                type="button"
                onClick={() => downloadMaterial(previewMaterial)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all cursor-pointer"
                title="Download official file"
              >
                <Download className="w-3.5 h-3.5 text-[#dfb74a]" />
                <span className="hidden sm:inline">Download</span>
              </button>

              {/* Open in Native Tab */}
              <button
                type="button"
                onClick={() => openDocumentInNewTab(previewMaterial.fileUrl, previewMaterial.title)}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all cursor-pointer"
                title="Open document in a new browser tab"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>New Tab</span>
              </button>

              {/* Native Browser Fullscreen Toggle */}
              <button
                type="button"
                onClick={() => {
                  if (!document.fullscreenElement) {
                    document.documentElement.requestFullscreen?.().catch(() => {});
                  } else {
                    document.exitFullscreen?.().catch(() => {});
                  }
                }}
                className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer border border-slate-700/60 hidden sm:inline-flex"
                title="Toggle Native Browser Fullscreen"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => {
                  setPreviewMaterial(null);
                  if (document.fullscreenElement) {
                    document.exitFullscreen?.().catch(() => {});
                  }
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-rose-600/90 hover:bg-rose-600 text-white transition-all cursor-pointer shadow-sm ml-1"
                title="Close full screen reader (Esc)"
              >
                <X className="w-4 h-4" />
                <span className="hidden sm:inline">Close</span>
              </button>
            </div>
          </div>

          {/* Main Full-Screen Document Viewer */}
          <div className="flex-1 w-full h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] overflow-hidden bg-slate-950 flex flex-col">
            <DocumentViewer
              url={previewMaterial.fileUrl}
              fileName={previewMaterial.fileName || `${previewMaterial.title}.pdf`}
              title={previewMaterial.title}
              description={previewMaterial.description}
              subject={previewMaterial.subject}
              classLevel={previewMaterial.classLevel}
              showToolbar={true}
              className="w-full h-full flex-1 border-0 rounded-none shadow-none"
              minHeight="100%"
            />
          </div>
        </div>
      )}
    </main>
  );
}
