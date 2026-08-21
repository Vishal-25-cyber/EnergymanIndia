"use client";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { Star, ShieldCheck, ArrowLeft, ArrowRight, Quote, MapPin } from "lucide-react";
import { testimonialsData } from "../../data/testimonials";
import { ScrollReveal } from "./ScrollReveal";

const projectTypeColors: Record<string, string> = {
  Industrial:   "bg-amber-950/80 text-amber-300 border-amber-500/40",
  Commercial:   "bg-blue-950/80 text-blue-300 border-blue-500/40",
  Agricultural: "bg-emerald-950/80 text-emerald-300 border-emerald-500/40",
  Residential:  "bg-red-950/80 text-rose-300 border-red-500/40",
};

export const TestimonialCarousel: React.FC = () => {
  const total = testimonialsData.length;
  const [visibleCount, setVisibleCount] = useState<number>(3);
  const [offset, setOffset] = useState<number>(0);

  // Dynamic responsive cards per view
  useEffect(() => {
    const updateVisible = () => {
      if (typeof window !== "undefined") {
        if (window.innerWidth < 640) {
          setVisibleCount(1);
        } else if (window.innerWidth < 1024) {
          setVisibleCount(2);
        } else {
          setVisibleCount(3);
        }
      }
    };

    updateVisible();
    window.addEventListener("resize", updateVisible);
    return () => window.removeEventListener("resize", updateVisible);
  }, []);

  const maxOffset = Math.max(0, total - visibleCount);

  // Keep offset within bounds when resizing
  useEffect(() => {
    setOffset((current) => Math.min(current, maxOffset));
  }, [maxOffset]);

  const prev = useCallback(() => {
    setOffset((o) => Math.max(0, o - 1));
  }, []);

  const next = useCallback(() => {
    setOffset((o) => Math.min(maxOffset, o + 1));
  }, [maxOffset]);

  const canPrev = offset > 0;
  const canNext = offset < maxOffset;

  // Touch swipe support for mobile devices
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const [isSwiping, setIsSwiping] = useState(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
    setIsSwiping(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaX = touchEndX - touchStartXRef.current;
    const deltaY = touchEndY - (touchStartYRef.current ?? touchEndY);

    // Only swipe if horizontal intent is stronger than vertical scroll
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
      if (deltaX < 0 && canNext) {
        next();
      } else if (deltaX > 0 && canPrev) {
        prev();
      }
    }

    touchStartXRef.current = null;
    touchStartYRef.current = null;
    setIsSwiping(false);
  };

  // Gap between cards in px
  const gapPx = 16;

  return (
    <section
      className="py-14 sm:py-20 bg-gradient-to-b from-[#0A0A0E] via-[#0F0B15] to-[#0A0A0E] relative overflow-hidden border-t border-red-950/60"
      id="testimonials"
    >
      {/* Ambient glows */}
      <div className="absolute top-1/3 left-1/4 w-[280px] sm:w-[350px] h-[280px] sm:h-[350px] bg-amber-500/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[280px] sm:w-[350px] h-[280px] sm:h-[350px] bg-red-600/8 rounded-full blur-3xl pointer-events-none" />

      <div className="site-container relative z-10 space-y-8 sm:space-y-10">

        {/* Header */}
        <ScrollReveal animation="slide-up">
          <div className="text-center max-w-4xl mx-auto space-y-3 px-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold tracking-widest uppercase bg-amber-950/80 text-amber-300 border border-amber-500/40 font-mono">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>Customer Trust &amp; Reviews</span>
            </div>
            <h2 className="text-2xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              WHAT OUR{" "}
              <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">
                CUSTOMERS SAY
              </span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
              Direct feedback from factory directors, hospital administrators, agricultural farmers, and homeowners who partnered with ENERGYMAN since 2016.
            </p>
          </div>
        </ScrollReveal>

        {/* Carousel Container */}
        <div
          className="overflow-hidden select-none touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className={`flex transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
              isSwiping ? "transition-none" : ""
            }`}
            style={{
              gap: `${gapPx}px`,
              transform: `translateX(calc(-${offset} * ((100% + ${gapPx}px) / ${visibleCount})))`,
            }}
          >
            {testimonialsData.map((t) => (
              <div
                key={t.id}
                className="shrink-0 transition-all duration-300"
                style={{
                  width: `calc((100% - ${(visibleCount - 1) * gapPx}px) / ${visibleCount})`,
                }}
              >
                <div className="group bg-[#14101A]/95 border border-red-900/30 rounded-2xl p-5 sm:p-6 sm:p-7 shadow-xl shadow-black/60 h-full flex flex-col justify-between space-y-4 sm:space-y-5 hover:border-red-500/50 hover:bg-[#181322] transition-all duration-300 relative overflow-hidden">
                  {/* Subtle decorative quotation watermark */}
                  <Quote className="absolute top-4 right-4 w-10 h-10 sm:w-12 sm:h-12 text-white/[0.03] group-hover:text-red-500/10 pointer-events-none transition-colors" />

                  {/* Stars + badges row */}
                  <div className="flex flex-wrap items-center justify-between gap-2 relative z-10">
                    <div className="flex items-center gap-0.5" aria-label={`${t.rating} out of 5 stars`}>
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 sm:w-4 h-3.5 sm:h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className={`text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full border ${projectTypeColors[t.projectType] || "bg-red-950/80 text-rose-300 border-red-500/40"}`}>
                        {t.projectType}
                      </span>
                      <span className="text-[10px] sm:text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-red-950/80 text-rose-300 border border-red-500/40">
                        {t.capacityInstalled}
                      </span>
                    </div>
                  </div>

                  {/* Quote content */}
                  <blockquote className="text-xs sm:text-sm md:text-[15px] text-slate-200 leading-relaxed italic font-normal flex-1 relative z-10">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>

                  {/* Customer author footer */}
                  <div className="flex items-center gap-3 pt-3.5 border-t border-red-950/60 relative z-10">
                    {t.avatar ? (
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover border-2 border-red-500/40 group-hover:border-red-500 shadow-md shrink-0 transition-colors"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-red-600 to-amber-600 flex items-center justify-center font-bold text-white text-xs shrink-0">
                        {t.name.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs sm:text-sm font-black text-white flex items-center gap-1.5 truncate">
                        <span className="truncate">{t.name}</span>
                        {t.verified && (
                          <span title="Verified Customer" className="shrink-0 inline-flex">
                            <ShieldCheck className="w-3.5 h-3.5 text-red-400" />
                          </span>
                        )}
                      </h4>
                      <p className="text-[10px] sm:text-xs text-slate-400 leading-tight truncate">
                        {t.role}{t.organization ? `, ${t.organization}` : ""}
                      </p>
                      <p className="text-[10px] sm:text-xs text-amber-400 font-semibold mt-0.5 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                        <span className="truncate">{t.location}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Carousel Navigation Controls ── */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-2">
          {/* Main Arrow & Counter Row */}
          <div className="flex items-center justify-center gap-2 sm:gap-4">
            {/* Prev Button */}
            <button
              onClick={prev}
              disabled={!canPrev}
              aria-label="Previous customer review"
              className={`group relative flex items-center gap-2 px-3 sm:pl-5 sm:pr-4 py-2.5 sm:py-3 transition-all duration-300 touch-manipulation ${
                canPrev ? "opacity-100 cursor-pointer active:scale-95" : "opacity-30 cursor-not-allowed"
              }`}
            >
              {/* Arrow trail line (desktop) */}
              <span className={`hidden sm:block h-px w-8 lg:w-10 transition-all duration-300 ${canPrev ? "bg-red-500 group-hover:w-14" : "bg-slate-700"}`} />
              <span className={`flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 transition-all duration-300 ${
                canPrev
                  ? "border-red-500 text-red-400 group-hover:bg-red-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-red-500/40"
                  : "border-slate-800 text-slate-600"
              }`}>
                <ArrowLeft className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </span>
            </button>

            {/* Center counter & progress bar */}
            <div className="flex items-center gap-2.5 sm:gap-3 px-3 sm:px-4 bg-[#14101A]/80 border border-red-950/60 rounded-full py-1.5 px-3.5">
              <span className="text-xs sm:text-sm font-black text-white font-mono tabular-nums">
                {String(offset + 1).padStart(2, "0")}
              </span>
              <div className="relative w-16 sm:w-24 h-[3px] bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-red-500 to-amber-400 rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(100, ((offset + visibleCount) / total) * 100)}%`,
                  }}
                />
              </div>
              <span className="text-xs sm:text-sm font-black text-slate-500 font-mono tabular-nums">
                {String(total).padStart(2, "0")}
              </span>
            </div>

            {/* Next Button */}
            <button
              onClick={next}
              disabled={!canNext}
              aria-label="Next customer review"
              className={`group relative flex items-center gap-2 px-3 sm:pr-5 sm:pl-4 py-2.5 sm:py-3 transition-all duration-300 touch-manipulation ${
                canNext ? "opacity-100 cursor-pointer active:scale-95" : "opacity-30 cursor-not-allowed"
              }`}
            >
              <span className={`flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 transition-all duration-300 ${
                canNext
                  ? "border-red-500 text-red-400 group-hover:bg-red-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-red-500/40"
                  : "border-slate-800 text-slate-600"
              }`}>
                <ArrowRight className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </span>
              {/* Arrow trail line (desktop) */}
              <span className={`hidden sm:block h-px w-8 lg:w-10 transition-all duration-300 ${canNext ? "bg-red-500 group-hover:w-14" : "bg-slate-700"}`} />
            </button>
          </div>

          {/* Pagination Dot Pills (especially handy on mobile) */}
          <div className="flex items-center justify-center gap-1.5 sm:hidden">
            {Array.from({ length: total }).map((_, idx) => {
              const isActive = idx >= offset && idx < offset + visibleCount;
              return (
                <button
                  key={idx}
                  onClick={() => setOffset(Math.min(maxOffset, idx))}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? "w-6 bg-gradient-to-r from-red-500 to-amber-400"
                      : "w-2 bg-slate-700 hover:bg-slate-500"
                  }`}
                />
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default TestimonialCarousel;

