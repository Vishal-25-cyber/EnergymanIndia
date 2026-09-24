"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  FileText,
  Image as ImageIcon,
  FileCode,
  Download,
  ExternalLink,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  RotateCw,
  Maximize2,
  AlertCircle,
  FileCheck,
  Loader2,
  RefreshCw,
  HelpCircle,
  CheckCircle2,
  Clock,
  Award,
  BookOpen,
} from "lucide-react";
import * as pdfjsLib from "pdfjs-dist";

// Initialize PDF.js worker: local worker with cdnjs fallback
if (typeof window !== "undefined") {
  try {
    pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
  } catch {
    try {
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version || "3.11.174"}/pdf.worker.min.js`;
    } catch {}
  }
}

interface DocumentViewerProps {
  url?: string;
  fileName?: string;
  title?: string;
  description?: string;
  subject?: string;
  maxMarks?: number | string;
  durationMinutes?: number | string;
  classLevel?: string;
  className?: string;
  defaultZoom?: number;
  showToolbar?: boolean;
  minHeight?: string;
  isExamMode?: boolean;
  showOpenFullSize?: boolean;
  showDownload?: boolean;
}

/**
 * Converts a data URL to a local same-origin Blob URL.
 * Essential for rendering PDFs in Chrome/Edge, which block data: URLs inside iframes and objects.
 */
export function safeDataUrlToBlobUrl(dataUrl: string): { blobUrl: string; mimeType: string } | null {
  if (!dataUrl || !dataUrl.startsWith("data:")) return null;
  try {
    const parts = dataUrl.split(",");
    if (parts.length < 2) return null;
    const header = parts[0];
    const mimeMatch = header.match(/:(.*?);/);
    const mimeType = mimeMatch ? mimeMatch[1] : "application/octet-stream";
    const base64Data = parts[1].replace(/\s/g, "");
    const binaryStr = atob(base64Data);
    const len = binaryStr.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryStr.charCodeAt(i);
    }
    const blob = new Blob([bytes], { type: mimeType });
    const blobUrl = URL.createObjectURL(blob);
    return { blobUrl, mimeType };
  } catch (err) {
    console.warn("safeDataUrlToBlobUrl error:", err);
    return null;
  }
}

/**
 * Downloads document file safely.
 */
export function downloadDocumentFile(fileUrl?: string, defaultName = "document.pdf") {
  if (!fileUrl) return;

  if (fileUrl.startsWith("data:")) {
    const res = safeDataUrlToBlobUrl(fileUrl);
    if (!res) return;
    const a = document.createElement("a");
    a.href = res.blobUrl;
    a.download = defaultName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => {
      try {
        URL.revokeObjectURL(res.blobUrl);
      } catch {}
    }, 15000);
    return;
  }

  const cleanUrl = fileUrl.includes("?")
    ? `${fileUrl}&download=1`
    : `${fileUrl}?download=1`;

  const a = document.createElement("a");
  a.href = cleanUrl;
  a.download = defaultName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

/**
 * Safely opens a document in a new window/tab.
 */
export function openDocumentInNewTab(fileUrl?: string, fileName?: string) {
  if (!fileUrl) return;

  if (fileUrl.startsWith("http://") || fileUrl.startsWith("https://") || fileUrl.startsWith("/")) {
    window.open(fileUrl, "_blank", "noopener,noreferrer");
    return;
  }

  if (fileUrl.startsWith("data:")) {
    const res = safeDataUrlToBlobUrl(fileUrl);
    if (!res) return;
    const a = document.createElement("a");
    a.href = res.blobUrl;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => {
      try {
        URL.revokeObjectURL(res.blobUrl);
      } catch {}
    }, 60000);
  }
}

/**
 * Renders a single PDF page crisp onto an HTML5 <canvas>.
 * Completely eliminates browser download prompts and plugin crashes.
 */
function PdfCanvasPage({
  pdfDoc,
  pageNum,
  zoom,
  rotation,
}: {
  pdfDoc: any;
  pageNum: number;
  zoom: number;
  rotation: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const renderTaskRef = useRef<any>(null);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    let isCancelled = false;

    async function renderPage() {
      if (!pdfDoc || !canvasRef.current) return;
      try {
        setPageLoading(true);

        if (renderTaskRef.current) {
          try {
            renderTaskRef.current.cancel();
          } catch {}
        }

        const page = await pdfDoc.getPage(pageNum);
        if (isCancelled || !canvasRef.current) return;

        // Base responsive scale: 1.35x for crisp text on screens
        const baseScale = (zoom / 100) * 1.35;
        const viewport = page.getViewport({ scale: baseScale, rotation });
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d", { alpha: false });
        if (!context) return;

        const pixelRatio = window.devicePixelRatio || 1;
        canvas.width = Math.floor(viewport.width * pixelRatio);
        canvas.height = Math.floor(viewport.height * pixelRatio);
        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;

        const transform = pixelRatio !== 1 ? [pixelRatio, 0, 0, pixelRatio, 0, 0] : null;

        const renderContext = {
          canvasContext: context,
          transform: transform || undefined,
          viewport: viewport,
        };

        const renderTask = page.render(renderContext);
        renderTaskRef.current = renderTask;

        await renderTask.promise;
        if (!isCancelled) {
          setPageLoading(false);
        }
      } catch (err: any) {
        if (err?.name === "RenderingCancelledException") {
          return;
        }
        console.warn(`Error rendering PDF page ${pageNum}:`, err);
        if (!isCancelled) {
          setPageLoading(false);
        }
      }
    }

    renderPage();

    return () => {
      isCancelled = true;
      if (renderTaskRef.current) {
        try {
          renderTaskRef.current.cancel();
        } catch {}
      }
    };
  }, [pdfDoc, pageNum, zoom, rotation]);

  return (
    <div className="relative my-3 flex flex-col items-center shadow-lg rounded-xl overflow-hidden bg-white border border-slate-200 dark:border-slate-800 transition-all max-w-full">
      {pageLoading && (
        <div className="absolute inset-0 bg-white/80 dark:bg-slate-900/80 flex items-center justify-center z-10">
          <Loader2 className="w-6 h-6 animate-spin text-[#004b79]" />
        </div>
      )}
      <canvas ref={canvasRef} className="block max-w-full bg-white select-none" />
      <div className="w-full py-1 text-center bg-slate-100 dark:bg-slate-800 text-[11px] font-bold text-slate-500 border-t border-slate-200 dark:border-slate-700">
        Page {pageNum} of {pdfDoc.numPages}
      </div>
    </div>
  );
}

export function DocumentViewer({
  url,
  fileName = "Question_Paper.pdf",
  title,
  description,
  subject,
  maxMarks,
  durationMinutes,
  classLevel,
  className = "",
  defaultZoom = 100,
  showToolbar = true,
  minHeight = "400px",
  isExamMode = false,
  showOpenFullSize = false,
  showDownload = false,
}: DocumentViewerProps) {
  const [zoom, setZoom] = useState(defaultZoom);
  const [rotation, setRotation] = useState(0);
  const [viewTab, setViewTab] = useState<"PDF" | "TEXT">("PDF");
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [blobMime, setBlobMime] = useState<string>("");
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);
  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [pdfLoading, setPdfLoading] = useState<boolean>(true);
  const [pdfError, setPdfError] = useState<boolean>(false);
  const [useNativeFallback, setUseNativeFallback] = useState<boolean>(false);
  const [detectedType, setDetectedType] = useState<"NONE" | "PDF" | "IMAGE" | "WORD" | "TEXT" | "GENERIC" | null>(null);
  const [reloadKey, setReloadKey] = useState<number>(0);

  // Word Document rendering
  const [wordHtml, setWordHtml] = useState<string | null>(null);
  const [wordLoading, setWordLoading] = useState(false);
  const [wordError, setWordError] = useState<string | null>(null);

  // Convert data URL to Blob URL on mount / url change
  useEffect(() => {
    if (!url) {
      setBlobUrl(null);
      setBlobMime("");
      return;
    }

    if (url.startsWith("data:")) {
      const result = safeDataUrlToBlobUrl(url);
      if (result) {
        setBlobUrl(result.blobUrl);
        setBlobMime(result.mimeType);
        return () => {
          try {
            URL.revokeObjectURL(result.blobUrl);
          } catch {}
        };
      }
    } else {
      setBlobUrl(null);
      setBlobMime("");
    }
  }, [url]);

  // Determine file type
  const docType: "NONE" | "PDF" | "IMAGE" | "WORD" | "TEXT" | "GENERIC" = useMemo(() => {
    if (detectedType) return detectedType;
    if (!url && !fileName) return "NONE";

    const lowerName = (fileName || "").toLowerCase();
    const lowerUrl = (url || "").toLowerCase();
    const effectiveMime = blobMime.toLowerCase();

    // 1. Explicit Word Document (.docx / .doc)
    if (
      effectiveMime.includes("word") ||
      effectiveMime.includes("openxmlformats") ||
      lowerUrl.startsWith("data:application/vnd.openxmlformats") ||
      lowerUrl.startsWith("data:application/msword") ||
      /\.(docx?|rtf)$/i.test(lowerName) ||
      /\.(docx?|rtf)/i.test(lowerUrl)
    ) {
      return "WORD";
    }

    // 2. Images
    if (
      effectiveMime.startsWith("image/") ||
      lowerUrl.startsWith("data:image/") ||
      /\.(png|jpe?g|webp|gif|svg|bmp)$/i.test(lowerName) ||
      /\.(png|jpe?g|webp|gif|svg|bmp)/i.test(lowerUrl)
    ) {
      return "IMAGE";
    }

    // 3. Text / Markdown
    if (
      effectiveMime.startsWith("text/") ||
      lowerUrl.startsWith("data:text/") ||
      /\.(txt|md|csv)$/i.test(lowerName)
    ) {
      return "TEXT";
    }

    // 4. PDF (including material file routes and exam question papers)
    if (
      effectiveMime.includes("pdf") ||
      lowerUrl.startsWith("data:application/pdf") ||
      lowerName.endsWith(".pdf") ||
      lowerUrl.includes(".pdf") ||
      lowerUrl.includes("/api/materials/file") ||
      lowerUrl.includes("/materials/") ||
      lowerName.includes("question") ||
      lowerName.includes("paper") ||
      lowerName.includes("test") ||
      lowerName.includes("worksheet") ||
      isExamMode
    ) {
      return "PDF";
    }

    return "GENERIC";
  }, [url, fileName, blobMime, isExamMode, detectedType]);

  // Load and parse PDF using PDF.js into canvas document model with robust fallbacks
  useEffect(() => {
    if (!url || docType !== "PDF") {
      setPdfLoading(false);
      setPdfError(false);
      setPdfDoc(null);
      setNumPages(0);
      setUseNativeFallback(false);
      return;
    }

    let isCancelled = false;
    setPdfLoading(true);
    setPdfError(false);
    setUseNativeFallback(false);
    let localBlobUrl: string | null = null;

    const targetUrl = url;
    if (!targetUrl) return;

    async function loadPdf() {
      try {
        let pdfData: Uint8Array | null = null;

        if (targetUrl.startsWith("data:")) {
          const result = safeDataUrlToBlobUrl(targetUrl);
          if (result) {
            localBlobUrl = result.blobUrl;
            setPdfBlobUrl(result.blobUrl);
            const res = await fetch(result.blobUrl);
            const buf = await res.arrayBuffer();
            pdfData = new Uint8Array(buf);
          }
        } else if (targetUrl.startsWith("blob:")) {
          setPdfBlobUrl(targetUrl);
          const res = await fetch(targetUrl);
          const buf = await res.arrayBuffer();
          pdfData = new Uint8Array(buf);
        } else {
          // Standard API or remote URL: fetch arrayBuffer directly with auth headers
          const headers: Record<string, string> = {};
          if (typeof window !== "undefined") {
            try {
              const token =
                localStorage.getItem("acuity_auth_token") ||
                sessionStorage.getItem("acuity_auth_token");
              if (token) {
                headers["Authorization"] = `Bearer ${token}`;
                headers["x-auth-token"] = token;
              }
            } catch {}
          }

          let fetchUrl = targetUrl;
          try {
            fetchUrl = encodeURI(decodeURI(targetUrl));
          } catch {}

          const res = await fetch(fetchUrl, {
            credentials: "include",
            headers: Object.keys(headers).length > 0 ? headers : undefined,
          });

          if (!res.ok) {
            throw new Error(`HTTP error ${res.status}`);
          }

          const contentType = (res.headers.get("content-type") || "").toLowerCase();
          if (contentType.includes("application/json")) {
            throw new Error("Received JSON response instead of PDF binary");
          }

          // Inspect content-type to see if it's actually an image or word document
          if (contentType.includes("image/")) {
            const blob = await res.blob();
            localBlobUrl = URL.createObjectURL(blob);
            setBlobUrl(localBlobUrl);
            setBlobMime(contentType);
            setDetectedType("IMAGE");
            setPdfLoading(false);
            return;
          }

          if (
            contentType.includes("word") ||
            contentType.includes("openxmlformats") ||
            contentType.includes("msword")
          ) {
            const blob = await res.blob();
            localBlobUrl = URL.createObjectURL(blob);
            setBlobUrl(localBlobUrl);
            setBlobMime(contentType);
            setDetectedType("WORD");
            setPdfLoading(false);
            return;
          }

          const blob = await res.blob();
          localBlobUrl = URL.createObjectURL(blob);
          setPdfBlobUrl(localBlobUrl);
          const buf = await blob.arrayBuffer();
          pdfData = new Uint8Array(buf);

          // Magic byte detection
          if (pdfData.length >= 4) {
            // PNG: 89 50 4E 47
            if (pdfData[0] === 0x89 && pdfData[1] === 0x50 && pdfData[2] === 0x4e && pdfData[3] === 0x47) {
              setBlobUrl(localBlobUrl);
              setBlobMime("image/png");
              setDetectedType("IMAGE");
              setPdfLoading(false);
              return;
            }
            // JPEG: FF D8 FF
            if (pdfData[0] === 0xff && pdfData[1] === 0xd8 && pdfData[2] === 0xff) {
              setBlobUrl(localBlobUrl);
              setBlobMime("image/jpeg");
              setDetectedType("IMAGE");
              setPdfLoading(false);
              return;
            }
            // Word: PK\x03\x04
            if (pdfData[0] === 0x50 && pdfData[1] === 0x4b && pdfData[2] === 0x03 && pdfData[3] === 0x04 && !fileName.toLowerCase().endsWith(".zip")) {
              setBlobUrl(localBlobUrl);
              setBlobMime("application/vnd.openxmlformats-officedocument.wordprocessingml.document");
              setDetectedType("WORD");
              setPdfLoading(false);
              return;
            }
          }
        }

        if (isCancelled || !pdfData) return;

        // Try parsing with PDF.js
        try {
          const loadingTask = pdfjsLib.getDocument({
            data: pdfData,
            cMapUrl: "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/cmaps/",
            cMapPacked: true,
            standardFontDataUrl: "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/standard_fonts/",
            isEvalSupported: false,
          });

          const doc = await loadingTask.promise;
          if (!isCancelled) {
            setPdfDoc(doc);
            setNumPages(doc.numPages);
            setPdfLoading(false);
            setPdfError(false);
            setUseNativeFallback(false);
          }
        } catch (canvasParseErr) {
          console.warn("PDF.js canvas parser warning, activating native browser PDF fallback:", canvasParseErr);
          if (!isCancelled) {
            // Activate Layer 2 Native Browser PDF Fallback: renders PDF in native object/iframe
            setUseNativeFallback(true);
            setPdfLoading(false);
            setPdfError(false);
          }
        }
      } catch (err: any) {
        console.warn("DocumentViewer PDF prefetch error, checking native fallback:", err);
        if (!isCancelled) {
          if (localBlobUrl || targetUrl) {
            setUseNativeFallback(true);
            setPdfError(false);
          } else {
            setPdfError(true);
          }
          setPdfLoading(false);
        }
      }
    }

    loadPdf();

    return () => {
      isCancelled = true;
      if (localBlobUrl) {
        try {
          URL.revokeObjectURL(localBlobUrl);
        } catch {}
      }
    };
  }, [url, docType, reloadKey]);

  // Render Word document via Mammoth on client
  useEffect(() => {
    if (docType === "WORD" && url) {
      setWordLoading(true);
      setWordError(null);
      let isCancelled = false;

      (async () => {
        try {
          const fetchUrl = blobUrl || url;
          const res = await fetch(fetchUrl);
          if (!res.ok) throw new Error(`HTTP error ${res.status}`);
          const arrayBuffer = await res.arrayBuffer();

          const mammoth = await import("mammoth");
          const result = await mammoth.convertToHtml({ arrayBuffer });
          if (!isCancelled) {
            setWordHtml(result.value || "<p>Empty document</p>");
          }
        } catch (err: any) {
          console.warn("Mammoth conversion error:", err);
          if (!isCancelled) {
            setWordError("Could not convert Word document for inline preview.");
          }
        } finally {
          if (!isCancelled) {
            setWordLoading(false);
          }
        }
      })();

      return () => {
        isCancelled = true;
      };
    } else {
      setWordHtml(null);
      setWordError(null);
      setWordLoading(false);
    }
  }, [docType, url, blobUrl]);

  // Active resource URL to use for iframe / embed
  const activeResourceUrl = pdfBlobUrl || blobUrl || url || "";

  // For blob: URLs, do NOT append #toolbar=1 because Chrome PDF plugin fails on hash fragments in blob URLs!
  const pdfEmbedSrc = activeResourceUrl.startsWith("blob:")
    ? activeResourceUrl
    : activeResourceUrl.startsWith("http") || activeResourceUrl.startsWith("/")
    ? `${activeResourceUrl}${activeResourceUrl.includes("#") ? "" : "#toolbar=1&navpanes=0"}`
    : activeResourceUrl;

  // Zoom handlers
  const handleZoomIn = () => setZoom((prev) => Math.min(250, prev + 15));
  const handleZoomOut = () => setZoom((prev) => Math.max(50, prev - 15));
  const handleZoomReset = () => {
    setZoom(100);
    setRotation(0);
  };
  const handleRotate = () => setRotation((prev) => (prev + 90) % 360);

  // Fallback Question Paper Sheet View (Text Mode)
  const renderQuestionSheetText = () => (
    <div className="w-full max-w-4xl p-6 sm:p-10 my-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl text-left flex flex-col gap-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="rounded-2xl p-5 bg-gradient-to-r from-[#002137] to-[#004b79] text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-md">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/20 text-white backdrop-blur-xs">
            Official Examination Paper
          </span>
          <h2 className="text-lg sm:text-xl font-black mt-1.5 tracking-tight text-white">
            {title || fileName || "Subject Assessment"}
          </h2>
          <p className="text-xs text-slate-200 mt-0.5">
            {subject || "Curriculum Evaluation"} {classLevel ? `• ${classLevel}` : ""}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 flex-wrap">
          {durationMinutes && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 text-white text-xs font-bold border border-white/10">
              <Clock className="w-3.5 h-3.5 text-[#dfb74a]" />
              <span>{durationMinutes} Mins</span>
            </div>
          )}
          {maxMarks && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 text-white text-xs font-bold border border-white/10">
              <Award className="w-3.5 h-3.5 text-[#dfb74a]" />
              <span>Max: {maxMarks} Marks</span>
            </div>
          )}
        </div>
      </div>

      {/* General Instructions */}
      <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/60 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
          <p className="font-bold text-amber-950 dark:text-amber-100 mb-1">
            General Instructions for Candidates:
          </p>
          <ul className="list-disc list-inside space-y-0.5">
            <li>Write your full name, student ID, and date at the top of your blank answer sheets.</li>
            <li>Number all solutions clearly corresponding to the questions below. Show step-by-step working.</li>
            <li>Maintain camera focus and keep proctoring active throughout the entire session.</li>
            <li>Scan/photograph and upload your complete answer paper before the submission timer concludes.</li>
          </ul>
        </div>
      </div>

      {/* Questions Content */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
          <h3 className="text-sm font-black text-[#004b79] dark:text-[#dfb74a] uppercase tracking-wider flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            <span>Questions &amp; Problem Statements</span>
          </h3>
          <span className="text-[11px] font-bold text-slate-400">
            Section A
          </span>
        </div>

        <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 font-sans text-sm leading-relaxed whitespace-pre-wrap select-text">
          {description?.trim() ? (
            description
          ) : (
            <div className="flex flex-col items-center justify-center p-6 text-center text-slate-500">
              <HelpCircle className="w-8 h-8 text-slate-300 dark:text-slate-600 mb-2" />
              <p className="font-semibold text-xs text-slate-600 dark:text-slate-400">
                Please follow the curriculum problems as specified by your faculty.
              </p>
              <p className="text-[11px] text-slate-400 mt-1 max-w-sm">
                Write complete, clean answers on your paper. If a printed paper was provided, solve according to questions assigned.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Switch to PDF Button if error occurred */}
      {pdfError && (
        <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs">
          <span className="text-slate-600 dark:text-slate-300 font-medium">
            Original PDF synchronization failed. Displaying text questions directly.
          </span>
          <button
            type="button"
            onClick={() => {
              setPdfError(false);
              setPdfLoading(true);
              setReloadKey((prev) => prev + 1);
              setViewTab("PDF");
            }}
            className="px-3 py-1.5 rounded-lg bg-[#004b79] hover:bg-[#003b60] text-white font-bold flex items-center gap-1.5 cursor-pointer shadow-xs transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retry PDF</span>
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className={`flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs ${className}`}>
      {/* Header Toolbar */}
      {showToolbar && (
        <div className="px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2 shrink-0 flex-wrap">
          {/* File Badge & Title */}
          <div className="flex items-center gap-2 truncate min-w-0">
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider text-white shrink-0 ${
                docType === "PDF"
                  ? "bg-rose-500"
                  : docType === "IMAGE"
                  ? "bg-emerald-600"
                  : docType === "WORD"
                  ? "bg-blue-600"
                  : "bg-indigo-600"
              }`}
            >
              {docType}
            </span>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
              {title || fileName}
            </span>
          </div>

          {/* Mode Tabs (PDF vs Text Sheet) */}
          {(docType === "PDF" || isExamMode) && (
            <div className="flex items-center gap-1 bg-slate-200/80 dark:bg-slate-800 p-0.5 rounded-xl border border-slate-300/80 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setViewTab("PDF")}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewTab === "PDF"
                    ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                }`}
                title="View Question Paper as PDF document"
              >
                <FileText className="w-3.5 h-3.5 text-rose-500" />
                <span>PDF Paper</span>
              </button>
              <button
                type="button"
                onClick={() => setViewTab("TEXT")}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewTab === "TEXT"
                    ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                }`}
                title="View Questions and Instructions in Text format"
              >
                <FileCheck className="w-3.5 h-3.5 text-[#004b79] dark:text-[#dfb74a]" />
                <span>Questions (Text)</span>
              </button>
            </div>
          )}

          {/* Action Tools */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Zoom Controls (Images & PDFs) */}
            {viewTab === "PDF" && (docType === "PDF" || docType === "IMAGE") && (
              <div className="flex items-center gap-1 bg-white dark:bg-slate-800 rounded-xl p-1 border border-slate-200 dark:border-slate-700 shadow-2xs">
                <button
                  type="button"
                  onClick={handleZoomOut}
                  title="Zoom Out"
                  className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] font-mono font-bold text-slate-600 dark:text-slate-300 w-10 text-center">
                  {zoom}%
                </span>
                <button
                  type="button"
                  onClick={handleZoomIn}
                  title="Zoom In"
                  className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                {docType === "IMAGE" && (
                  <button
                    type="button"
                    onClick={handleRotate}
                    title="Rotate 90°"
                    className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleZoomReset}
                  title="Reset View"
                  className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Action Buttons (Open Full Size and Download removed by default) */}
            {showOpenFullSize && (
              <button
                type="button"
                onClick={() => openDocumentInNewTab(url, fileName)}
                title="Open Fullscreen in New Window"
                className="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-[#004b79] hover:bg-[#003b60] text-white flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Open Full Size</span>
              </button>
            )}

            {showDownload && (
              <button
                type="button"
                onClick={() => downloadDocumentFile(url, fileName)}
                title="Download Document"
                className="p-1.5 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
              </button>
            )}

            {isExamMode && (
              <span className="px-2.5 py-1 rounded-xl text-[11px] font-bold bg-[#004b79]/10 text-[#004b79] dark:bg-[#dfb74a]/10 dark:text-[#dfb74a] border border-[#004b79]/20">
                Exam Mode • Full Inline View
              </span>
            )}
          </div>
        </div>
      )}

      {/* Main Document Content Area */}
      <div className="flex-1 overflow-auto relative flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-950 p-2" style={{ minHeight }}>
        {/* ── 1. PDF DOCUMENT ── */}
        {docType === "PDF" && (
          <>
            {viewTab === "PDF" ? (
              <div className="w-full h-full min-h-[420px] flex-1 flex flex-col items-center overflow-auto relative">
                {pdfLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/95 dark:bg-slate-900/95 z-20 backdrop-blur-xs gap-3">
                    <Loader2 className="w-8 h-8 animate-spin text-[#004b79] dark:text-[#dfb74a]" />
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Loading Question Paper Pages…
                    </p>
                  </div>
                )}

                {/* Layer 1: PDF.js Canvas Pages */}
                {!useNativeFallback && pdfDoc && numPages > 0 ? (
                  <div className="w-full max-w-4xl flex flex-col items-center py-2 px-2">
                    {Array.from({ length: numPages }, (_, i) => (
                      <PdfCanvasPage
                        key={i + 1}
                        pdfDoc={pdfDoc}
                        pageNum={i + 1}
                        zoom={zoom}
                        rotation={rotation}
                      />
                    ))}
                  </div>
                ) : (useNativeFallback || (!pdfLoading && (!pdfDoc || numPages === 0))) && (pdfBlobUrl || blobUrl || url) ? (
                  /* Layer 2: Automatic Native Browser PDF Viewer Fallback */
                  <div className="w-full h-full min-h-[550px] flex-1 flex flex-col items-center justify-center p-1 sm:p-2">
                    <object
                      data={pdfEmbedSrc}
                      type="application/pdf"
                      className="w-full h-full min-h-[550px] flex-1 rounded-xl bg-white shadow-md border-0"
                    >
                      <iframe
                        src={pdfEmbedSrc}
                        title={title || fileName || "Document"}
                        className="w-full h-full min-h-[550px] flex-1 rounded-xl bg-white shadow-md border-0"
                      />
                    </object>
                  </div>
                ) : pdfError ? (
                  /* Layer 3: Questions & Text Instructions Sheet if Binary is Completely Unavailable */
                  renderQuestionSheetText()
                ) : !pdfLoading ? (
                  renderQuestionSheetText()
                ) : null}
              </div>
            ) : (
              renderQuestionSheetText()
            )}
          </>
        )}

        {/* ── 2. IMAGE DOCUMENT ── */}
        {docType === "IMAGE" && (
          <div className="w-full h-full min-h-[360px] flex-1 flex items-center justify-center overflow-auto p-4">
            <img
              src={activeResourceUrl}
              alt={fileName || "Document Preview"}
              className="max-w-full max-h-full object-contain rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 transition-transform duration-200 select-none cursor-zoom-in"
              style={{
                transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
                transformOrigin: "center center",
              }}
              onClick={() => openDocumentInNewTab(url, fileName)}
            />
          </div>
        )}

        {/* ── 3. WORD DOCUMENT (.docx / .doc) ── */}
        {docType === "WORD" && (
          <div className="w-full h-full min-h-[420px] flex-1 flex flex-col bg-slate-100 dark:bg-slate-950 overflow-hidden">
            {wordLoading ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 gap-3 text-slate-500">
                <Loader2 className="w-8 h-8 animate-spin text-[#002137] dark:text-[#dfb74a]" />
                <p className="text-xs font-semibold">Opening Word document…</p>
              </div>
            ) : wordHtml ? (
              <div className="flex-1 overflow-auto p-4 sm:p-8 flex justify-center">
                <div
                  className="w-full max-w-3xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 p-6 sm:p-12 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 font-serif leading-relaxed text-sm sm:text-base prose dark:prose-invert max-w-none"
                  style={{
                    transform: zoom !== 100 ? `scale(${zoom / 100})` : undefined,
                    transformOrigin: "top center",
                  }}
                  dangerouslySetInnerHTML={{ __html: wordHtml }}
                />
              </div>
            ) : (
              <div className="p-8 text-center flex flex-col items-center justify-center gap-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md max-w-lg m-auto">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-600 shadow-sm">
                  <FileCheck className="w-8 h-8" />
                </div>

                <div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900">
                    Microsoft Word Document
                  </span>
                  <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 mt-2">
                    {fileName || "Document.docx"}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-md">
                    {wordError || "This document is ready to view. Click below to download and open it in Word."}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-1 flex-wrap justify-center">
                  <button
                    type="button"
                    onClick={() => downloadDocumentFile(url, fileName)}
                    className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download &amp; Open Document</span>
                  </button>
                </div>

                {description && (
                  <div className="w-full text-left p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 mt-2">
                    <span className="text-[11px] font-bold text-[#004b79] dark:text-[#dfb74a] block mb-1">
                      Questions &amp; Instructions:
                    </span>
                    <p className="text-xs font-mono text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
                      {description}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── 4. TEXT / MONOSPACE DOCUMENT ── */}
        {docType === "TEXT" && renderQuestionSheetText()}

        {/* ── 5. GENERIC FILE: EMBED DIRECTLY INLINE OR SHOW QUESTIONS ── */}
        {docType === "GENERIC" && (
          <div className="w-full h-full min-h-[420px] flex-1 flex flex-col items-center justify-center overflow-hidden">
            {activeResourceUrl ? (
              <object
                data={pdfEmbedSrc}
                type="application/pdf"
                className="w-full h-full min-h-[500px] flex-1 rounded-xl bg-white shadow-md border-0"
              >
                <iframe
                  src={pdfEmbedSrc}
                  title={title || fileName || "Document"}
                  className="w-full h-full min-h-[500px] flex-1 rounded-xl bg-white shadow-md border-0"
                />
              </object>
            ) : (
              renderQuestionSheetText()
            )}
          </div>
        )}

        {/* ── 6. NONE: SHOW QUESTION SHEET DIRECTLY ── */}
        {docType === "NONE" && renderQuestionSheetText()}
      </div>
    </div>
  );
}
export default DocumentViewer;
