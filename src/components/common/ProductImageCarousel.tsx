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
      <div className="relative aspect-4/3 rounded-3xl overflow-hidden bg-brand-950 border border-slate-800 shadow-2xl group">
        <img
          src={currentImg}
          alt={`${productName} view ${activeIndex + 1}`}
          className={`w-full h-full object-cover transition-transform duration-500 cursor-zoom-in ${
            isZoomed ? "scale-150" : "group-hover:scale-105"
          }`}
          onClick={() => setIsZoomed(!isZoomed)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950/60 via-transparent to-transparent pointer-events-none" />

        {/* Controls Overlay */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <button
            onClick={() => setIsZoomed(!isZoomed)}
            className="p-2.5 rounded-xl bg-brand-900/80 hover:bg-brand-850 border border-slate-700 text-white backdrop-blur-md transition-transform hover:scale-105"
            title={isZoomed ? "Zoom Out" : "Zoom In"}
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsFullscreen(true)}
            className="p-2.5 rounded-xl bg-brand-900/80 hover:bg-brand-850 border border-slate-700 text-white backdrop-blur-md transition-transform hover:scale-105"
            title="Fullscreen View"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Previous / Next Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-brand-900/80 hover:bg-brand-850 border border-slate-700 text-white backdrop-blur-md transition-transform hover:scale-110 active:scale-95"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-brand-900/80 hover:bg-brand-850 border border-slate-700 text-white backdrop-blur-md transition-transform hover:scale-110 active:scale-95"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Image Counter Badge */}
        <div className="absolute bottom-4 left-4">
          <span className="text-xs font-mono text-slate-300 bg-brand-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 font-bold">
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
              className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 shrink-0 transition-all ${
                idx === activeIndex
                  ? "border-energy-500 ring-2 ring-energy-500/30 scale-105"
                  : "border-slate-800 hover:border-slate-600 opacity-70 hover:opacity-100"
              }`}
            >
              <img
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8 animate-fade-in">
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-6 right-6 p-3 rounded-full bg-slate-800 text-white hover:bg-slate-700 transition-colors"
            aria-label="Close fullscreen"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="max-w-5xl max-h-[85vh] relative flex flex-col items-center justify-center">
            <img
              src={currentImg}
              alt={productName}
              className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl"
            />
            <p className="text-sm font-semibold text-slate-300 mt-4 text-center">
              {productName} (0{activeIndex + 1} / 0{images.length})
            </p>

            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-0 sm:-left-16 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-800 text-white hover:bg-slate-700"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-0 sm:-right-16 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-800 text-white hover:bg-slate-700"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
