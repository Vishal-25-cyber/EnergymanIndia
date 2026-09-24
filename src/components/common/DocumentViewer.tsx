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
} from "lucide-react";

interface DocumentViewerProps {
  url?: string;
  fileName?: string;
  title?: string;
  description?: string;
  className?: string;
  defaultZoom?: number;
  showToolbar?: boolean;
  minHeight?: string;
  isExamMode?: boolean;
}

/**
 * Converts a data URL to a local same-origin Blob URL.
 * Essential for rendering PDFs in Chrome/Edge, which block data: URLs inside iframes and objects.
 */
function safeDataUrlToBlobUrl(dataUrl: string): { blobUrl: string; mimeType: string } | null {
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
 * Opens any document in a safe new window or tab with full interactive viewer without triggering automatic file downloads.
 */
export function openDocumentInNewTab(url: string, fileName?: string) {
  if (!url) return;

  const title = fileName || "Document Preview";
  let targetUrl = url;

  if (targetUrl.startsWith("/api/materials/file/") && !targetUrl.endsWith(".pdf") && !targetUrl.includes("?")) {
    targetUrl = `${targetUrl}.pdf`;
  }

  let finalSrc = targetUrl;
  let isImage = false;

  if (targetUrl.startsWith("data:")) {
    const blobResult = safeDataUrlToBlobUrl(targetUrl);
    finalSrc = blobResult ? blobResult.blobUrl : targetUrl;
    isImage = (blobResult?.mimeType || "").startsWith("image/") || targetUrl.startsWith("data:image/");
  } else {
    isImage = /\.(png|jpe?g|webp|gif|svg|bmp)$/i.test(targetUrl) || /\.(png|jpe?g|webp|gif|svg|bmp)$/i.test(title);
  }

  const downloadUrl = targetUrl.startsWith("/api/materials/file/")
    ? targetUrl.includes("?")
      ? `${targetUrl}&download=1`
      : `${targetUrl}?download=1`
    : targetUrl;

  const newWin = window.open("", "_blank");
  if (newWin) {
    if (isImage) {
      newWin.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>${title}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body { margin: 0; background: #0f172a; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; padding: 20px; box-sizing: border-box; font-family: system-ui, -apple-system, sans-serif; }
              .header { color: #94a3b8; font-size: 13px; font-weight: 600; margin-bottom: 12px; }
              img { max-width: 95vw; max-height: 90vh; object-fit: contain; border-radius: 8px; box-shadow: 0 20px 40px rgba(0,0,0,0.6); border: 1px solid #334155; }
            </style>
          </head>
          <body>
            <div class="header">${title}</div>
            <img src="${finalSrc}" alt="${title}" />
          </body>
        </html>
      `);
    } else {
      newWin.document.write(`
        <!DOCTYPE html>
        <html style="height:100%;margin:0;padding:0;">
          <head>
            <title>${title}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              html, body { height: 100%; width: 100%; margin: 0; padding: 0; overflow: hidden; background: #0f172a; font-family: system-ui, -apple-system, sans-serif; display: flex; flex-direction: column; }
              .bar { height: 46px; background: #002137; color: #dfb74a; display: flex; align-items: center; justify-content: space-between; padding: 0 16px; font-size: 13px; font-weight: 700; border-bottom: 1px solid rgba(223, 183, 74, 0.25); box-sizing: border-box; flex-shrink: 0; }
              .title { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 70%; }
              .btn { background: #dfb74a; color: #002137; padding: 6px 14px; border-radius: 8px; text-decoration: none; font-size: 12px; font-weight: 700; transition: all 0.2s; white-space: nowrap; }
              .btn:hover { background: #b89047; color: #ffffff; }
              iframe { width: 100%; height: calc(100% - 46px); flex: 1; border: none; background: #ffffff; }
            </style>
          </head>
          <body>
            <div class="bar">
              <span class="title">${title}</span>
              <a class="btn" href="${downloadUrl}" download="${title}">Download File</a>
            </div>
            <iframe src="${finalSrc}#toolbar=1&navpanes=0" type="application/pdf" title="${title}">
              <p style="color:white;padding:20px;text-align:center;">Your browser is previewing this document. <a href="${downloadUrl}" download="${title}" style="color:#dfb74a;">Click here to download</a>.</p>
            </iframe>
          </body>
        </html>
      `);
    }
    newWin.document.close();
    return;
  }

  // Fallback if popup blocker prevented window.open("", "_blank")
  window.open(targetUrl, "_blank");
}

/**
 * Triggers a direct download of the document with correct filename and extension.
 */
export function downloadDocumentFile(url: string, suggestedName = "document") {
  if (!url) return;

  let downloadUrl = url;
  let isRevocable = false;

  if (url.startsWith("data:")) {
    const blobResult = safeDataUrlToBlobUrl(url);
    if (blobResult) {
      downloadUrl = blobResult.blobUrl;
      isRevocable = true;
    }
  } else if (url.startsWith("/api/materials/file/") || url.startsWith("/uploads/")) {
    downloadUrl = url.includes("?") ? `${url}&download=1` : `${url}?download=1`;
  }

  const cleanName = suggestedName.includes(".") ? suggestedName : `${suggestedName}.pdf`;

  const link = document.createElement("a");
  link.href = downloadUrl;
  link.download = cleanName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  if (isRevocable) {
    setTimeout(() => {
      try {
        URL.revokeObjectURL(downloadUrl);
      } catch {}
    }, 15000);
  }
}

export function DocumentViewer({
  url,
  fileName = "Document",
  title,
  description,
  className = "",
  defaultZoom = 100,
  showToolbar = true,
  minHeight = "400px",
  isExamMode = false,
}: DocumentViewerProps) {
  const [zoom, setZoom] = useState(defaultZoom);
  const [rotation, setRotation] = useState(0);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [blobMime, setBlobMime] = useState<string>("");
  const [loadError, setLoadError] = useState(false);

  // Convert data URL to Blob URL on mount / url change
  useEffect(() => {
    setLoadError(false);
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
    if (!url && !fileName) return "NONE";

    const lowerName = (fileName || "").toLowerCase();
    const lowerUrl = (url || "").toLowerCase();
    const effectiveMime = blobMime.toLowerCase();

    // 1. Explicit or detected PDF (including all material file routes and exam question papers)
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

    if (
      effectiveMime.startsWith("image/") ||
      lowerUrl.startsWith("data:image/") ||
      /\.(png|jpe?g|webp|gif|svg|bmp)$/i.test(lowerName) ||
      /\.(png|jpe?g|webp|gif|svg|bmp)/i.test(lowerUrl)
    ) {
      return "IMAGE";
    }

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

    if (
      effectiveMime.startsWith("text/") ||
      lowerUrl.startsWith("data:text/") ||
      /\.(txt|md|csv)$/i.test(lowerName)
    ) {
      return "TEXT";
    }

    return "GENERIC";
  }, [url, fileName, blobMime, isExamMode]);

  // Active resource URL to use for iframe / embed
  const activeResourceUrl = blobUrl || url || "";

  // Zoom handlers
  const handleZoomIn = () => setZoom((prev) => Math.min(250, prev + 15));
  const handleZoomOut = () => setZoom((prev) => Math.max(50, prev - 15));
  const handleZoomReset = () => {
    setZoom(100);
    setRotation(0);
  };
  const handleRotate = () => setRotation((prev) => (prev + 90) % 360);

  if (!url) {
    return (
      <div className={`flex flex-col items-center justify-center p-8 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 text-center ${className}`} style={{ minHeight }}>
        <FileText className="w-10 h-10 text-slate-300 dark:text-slate-600 mb-2" />
        <p className="text-xs font-semibold text-slate-500">No document attached.</p>
        {description && (
          <p className="text-xs text-slate-400 mt-2 max-w-md whitespace-pre-wrap">{description}</p>
        )}
      </div>
    );
  }

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

          {/* Action Tools */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Zoom Controls (Images & PDFs) */}
            {(docType === "PDF" || docType === "IMAGE") && (
              <div className="flex items-center gap-1 bg-white dark:bg-slate-800 rounded-xl p-1 border border-slate-200 dark:border-slate-700 shadow-2xs">
                <button
                  type="button"
                  onClick={handleZoomOut}
                  title="Zoom Out"
                  className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
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
                  className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                {docType === "IMAGE" && (
                  <button
                    type="button"
                    onClick={handleRotate}
                    title="Rotate 90°"
                    className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleZoomReset}
                  title="Reset View"
                  className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Open Full Size in New Tab (Hidden in Exam Mode to prevent tab switch violations) */}
            {!isExamMode ? (
              <>
                <button
                  type="button"
                  onClick={() => openDocumentInNewTab(url, fileName)}
                  title="Open Fullscreen in New Window"
                  className="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-[#004b79] hover:bg-[#003b60] text-white flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Open Full Size</span>
                </button>

                <button
                  type="button"
                  onClick={() => downloadDocumentFile(url, fileName)}
                  title="Download Document"
                  className="p-1.5 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                </button>
              </>
            ) : (
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
          <div className="w-full h-full min-h-[420px] flex-1 flex flex-col items-center justify-center overflow-hidden">
            <iframe
              src={`${activeResourceUrl}#toolbar=1&navpanes=0`}
              title={title || "PDF Document"}
              className="w-full h-full min-h-[500px] flex-1 rounded-xl bg-white shadow-md border-0"
              style={{
                transform: zoom !== 100 ? `scale(${zoom / 100})` : undefined,
                transformOrigin: "top center",
              }}
            />
          </div>
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
          <div className="p-8 text-center flex flex-col items-center justify-center gap-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md max-w-lg my-auto">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-600 shadow-sm">
              <FileCheck className="w-8 h-8" />
            </div>

            <div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900">
                Microsoft Word Document
              </span>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 mt-2">
                {fileName || "Question_Paper.docx"}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-md">
                This document is ready to view. Click below to download and open it in Word, or view online.
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
              <button
                type="button"
                onClick={() => openDocumentInNewTab(url, fileName)}
                className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open in New Tab</span>
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

        {/* ── 4. TEXT / MONOSPACE DOCUMENT ── */}
        {docType === "TEXT" && (
          <div className="w-full h-full min-h-[360px] p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-auto text-left font-mono text-xs text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap">
            {description || "Text content ready. Click 'Open Full Size' or 'Download' to view raw document file."}
          </div>
        )}

        {/* ── 5. GENERIC FILE: EMBED DIRECTLY INLINE ── */}
        {docType === "GENERIC" && (
          <div className="w-full h-full min-h-[420px] flex-1 flex flex-col items-center justify-center overflow-hidden">
            <iframe
              src={activeResourceUrl}
              title={title || fileName || "Document"}
              className="w-full h-full min-h-[500px] flex-1 rounded-xl bg-white shadow-md border-0"
            />
          </div>
        )}
      </div>
    </div>
  );
}
