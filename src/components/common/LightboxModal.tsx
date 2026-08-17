import React, { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn,
  MapPin,
  Sparkles
} from "lucide-react";
import { GalleryImage } from "../../data/gallery";

interface LightboxModalProps {
  images: GalleryImage[];
  initialIndex: number;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  images,
  initialIndex,
  onClose
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);

  const currentImage = images[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setIsZoomed(false);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setIsZoomed(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!currentImage) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-6 animate-fade-in select-none">
      {/* Top Bar: Slide Counter & Controls */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <span className="text-sm font-mono text-slate-300 bg-brand-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-700 font-bold">
            <span className="text-energy-400">0{currentIndex + 1}</span> / 0{images.length}
          </span>
          <span className="badge-emerald text-xs hidden sm:inline-flex">
            {currentImage.categoryLabel}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsZoomed(!isZoomed)}
            className="p-2.5 rounded-xl bg-brand-900/90 hover:bg-brand-850 border border-slate-700 text-white transition-transform hover:scale-105"
            title={isZoomed ? "Zoom Out" : "Zoom In"}
          >
            <ZoomIn className="w-5 h-5" />
          </button>
          <button
            onClick={onClose}
            className="p-2.5 rounded-xl bg-brand-900/90 hover:bg-red-500/20 border border-slate-700 text-white hover:text-red-400 transition-colors"
            title="Close Lightbox (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Center Image Viewport */}
      <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
        <img
          src={currentImage.image}
          alt={currentImage.title}
          className={`max-w-full max-h-[72vh] object-contain rounded-2xl shadow-2xl transition-transform duration-300 cursor-zoom-in ${
            isZoomed ? "scale-150" : "scale-100"
          }`}
          onClick={() => setIsZoomed(!isZoomed)}
        />

        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-3.5 rounded-full bg-brand-900/80 hover:bg-brand-850 border border-slate-700 text-white backdrop-blur-md transition-all hover:scale-110 active:scale-95 shadow-2xl"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-3.5 rounded-full bg-brand-900/80 hover:bg-brand-850 border border-slate-700 text-white backdrop-blur-md transition-all hover:scale-110 active:scale-95 shadow-2xl"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Info Bar */}
      <div className="max-w-3xl mx-auto w-full bg-brand-900/90 backdrop-blur-md border border-slate-800 rounded-2xl p-4 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-3 z-10">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-white">
            {currentImage.title}
          </h3>
          <p className="text-xs text-slate-400 line-clamp-1">
            {currentImage.description}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-300 shrink-0">
          <MapPin className="w-3.5 h-3.5 text-solar-400" />
          <span>{currentImage.location}</span>
          {currentImage.capacity && (
            <span className="badge-amber text-[10px] ml-2">
              {currentImage.capacity}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
