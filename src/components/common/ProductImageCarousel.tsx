import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  ZoomIn
} from "lucide-react";

interface ProductImageCarouselProps {
  images: string[];
  productName: string;
}

export const ProductImageCarousel: React.FC<ProductImageCarouselProps> = ({ images, productName }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const currentImg = images[activeIndex] || images[0];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-4">
      {/* Large Main Product Image Box */}
      <div className="relative aspect-4/3 rounded-3xl overflow-hidden bg-slate-900 border border-red-950/60 shadow-xl group">
        <img
          src={currentImg}
          alt={`${productName} view ${activeIndex + 1}`}
          className={`w-full h-full object-cover transition-transform duration-500 cursor-zoom-in ${
            isZoomed ? "scale-150" : "group-hover:scale-105"
          }`}
          onClick={() => setIsZoomed(!isZoomed)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0E]/80 via-transparent to-transparent pointer-events-none" />

        {/* Controls Overlay */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <button
            onClick={() => setIsZoomed(!isZoomed)}
            className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-200 backdrop-blur-md transition-transform hover:scale-105 shadow-md cursor-pointer"
            title={isZoomed ? "Zoom Out" : "Zoom In"}
          >
            <ZoomIn className="w-4 h-4 text-red-400" />
          </button>
          <button
            onClick={() => setIsFullscreen(true)}
            className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-200 backdrop-blur-md transition-transform hover:scale-105 shadow-md cursor-pointer"
            title="Fullscreen View"
          >
            <Maximize2 className="w-4 h-4 text-amber-400" />
          </button>
        </div>

        {/* Previous / Next Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-white backdrop-blur-md transition-transform hover:scale-110 active:scale-95 shadow-md cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-white backdrop-blur-md transition-transform hover:scale-110 active:scale-95 shadow-md cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Image Counter Badge */}
        <div className="absolute bottom-4 left-4">
          <span className="text-xs font-mono text-slate-200 bg-[#0A0A0E]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-red-950/60 font-bold shadow-md">
            0{activeIndex + 1} / 0{images.length}
          </span>
        </div>
      </div>

      {/* Thumbnail Carousel Strip */}
      {images.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveIndex(idx);
                setIsZoomed(false);
              }}
              className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                activeIndex === idx
                  ? "border-red-500 shadow-md ring-2 ring-red-500/30 scale-105"
                  : "border-slate-800 opacity-60 hover:opacity-100 hover:border-slate-700"
              }`}
            >
              <img
                src={img}
                alt={`${productName} thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4">
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-6 right-6 p-3 rounded-full bg-slate-900 text-white border border-slate-700 hover:bg-slate-800 transition-transform hover:scale-105 shadow-xl cursor-pointer"
            aria-label="Close fullscreen"
          >
            <X className="w-6 h-6" />
          </button>

          <img
            src={currentImg}
            alt={productName}
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-2xl shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};

export default ProductImageCarousel;
