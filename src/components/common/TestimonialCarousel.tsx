"use client";
import React, { useState, useCallback } from "react";
import { Star, ShieldCheck, ArrowLeft, ArrowRight } from "lucide-react";
import { testimonialsData } from "../../data/testimonials";
import { ScrollReveal } from "./ScrollReveal";

const projectTypeColors: Record<string, string> = {
  Industrial:   "bg-amber-950/80 text-amber-300 border-amber-500/40",
  Commercial:   "bg-blue-950/80 text-blue-300 border-blue-500/40",
  Agricultural: "bg-emerald-950/80 text-emerald-300 border-emerald-500/40",
  Residential:  "bg-red-950/80 text-rose-300 border-red-500/40",
};

const VISIBLE = 3; // cards visible at once

export const TestimonialCarousel: React.FC = () => {
  const total = testimonialsData.length;
  const maxOffset = total - VISIBLE;
  const [offset, setOffset] = useState(0);

  const prev = useCallback(() => setOffset((o) => Math.max(0, o - 1)), []);
  const next = useCallback(() => setOffset((o) => Math.min(maxOffset, o + 1)), [maxOffset]);

  const canPrev = offset > 0;
  const canNext = offset < maxOffset;

  return (
    <section
      className="py-14 sm:py-20 bg-gradient-to-b from-[#0A0A0E] via-[#0F0B15] to-[#0A0A0E] relative overflow-hidden border-t border-red-950/60"
      id="testimonials"
    >
      {/* Ambient glows */}
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-amber-500/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[350px] h-[350px] bg-red-600/8 rounded-full blur-3xl pointer-events-none" />

      <div className="site-container relative z-10 space-y-10">

        {/* Header */}
        <ScrollReveal animation="slide-up">
          <div className="text-center max-w-4xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold tracking-widest uppercase bg-amber-950/80 text-amber-300 border border-amber-500/40 font-mono">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>Customer Trust &amp; Reviews</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
              WHAT OUR{" "}
              <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">
                CUSTOMERS SAY
              </span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Direct feedback from factory directors, hospital administrators, agricultural farmers, and homeowners who partnered with ENERGYMAN since 2016.
            </p>
          </div>
        </ScrollReveal>

        {/* Carousel row */}
        <div className="overflow-hidden">
          <div
            className="flex gap-4 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
            style={{
              transform: `translateX(calc(-${offset} * (100% / ${VISIBLE} + 5.5px)))`,
            }}
          >
            {testimonialsData.map((t) => (
              <div
                key={t.id}
                className="shrink-0"
                style={{ width: `calc(${100 / VISIBLE}% - ${(VISIBLE - 1) * 16 / VISIBLE}px)` }}
              >
                <div className="group bg-[#14101A]/90 border border-red-900/30 rounded-2xl p-5 sm:p-6 shadow-xl shadow-black/50 h-full flex flex-col justify-between space-y-4 hover:border-red-500/50 transition-all duration-300">
                  {/* Stars + badges */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-0.5">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${projectTypeColors[t.projectType]}`}>
                        {t.projectType}
                      </span>
                      <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-red-950/80 text-rose-300 border border-red-500/40">
                        {t.capacityInstalled}
                      </span>
                    </div>
                  </div>

                  {/* Quote */}
                  <blockquote className="text-xs sm:text-sm text-slate-200 leading-relaxed italic font-medium flex-1">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>

                  {/* Customer */}
                  <div className="flex items-center gap-3 pt-3 border-t border-red-950/60">
                    {t.avatar && (
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-red-500/40 group-hover:border-red-500 shadow shrink-0 transition-colors"
                      />
                    )}
                    <div>
                      <h4 className="text-xs font-black text-white flex items-center gap-1">
                        {t.name}
                        {t.verified && (
                          <span title="Verified Customer">
                            <ShieldCheck className="w-3 h-3 text-red-400" />
                          </span>
                        )}
                      </h4>
                      <p className="text-[10px] text-slate-400 leading-tight">
                        {t.role}{t.organization ? `, ${t.organization}` : ""}
                      </p>
                      <p className="text-[10px] text-amber-400 font-bold mt-0.5">{t.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Unique Arrow Controls ── */}
        <div className="flex items-center justify-center gap-0">
          {/* Prev */}
          <button
            onClick={prev}
            disabled={!canPrev}
            aria-label="Previous reviews"
            className={`group relative flex items-center gap-2 pl-5 pr-4 py-3 transition-all duration-300 ${
              canPrev ? "opacity-100 cursor-pointer" : "opacity-25 cursor-not-allowed"
            }`}
          >
            {/* Arrow trail line */}
            <span className={`block h-px w-10 transition-all duration-300 ${canPrev ? "bg-red-500 group-hover:w-16" : "bg-slate-600"}`} />
            <span className={`flex items-center justify-center w-9 h-9 rounded-full border-2 transition-all duration-300 ${
              canPrev
                ? "border-red-500 text-red-400 group-hover:bg-red-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-red-500/40"
                : "border-slate-700 text-slate-600"
            }`}>
              <ArrowLeft className="w-4 h-4" />
            </span>
          </button>

          {/* Center counter */}
          <div className="flex items-center gap-3 px-6">
            <span className="text-xs font-black text-white font-mono tabular-nums">
              {String(offset + 1).padStart(2, "0")}
            </span>
            <div className="relative w-20 h-[2px] bg-slate-800 rounded-full overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-red-500 to-amber-400 rounded-full transition-all duration-500"
                style={{ width: `${((offset + VISIBLE) / total) * 100}%` }}
              />
            </div>
            <span className="text-xs font-black text-slate-500 font-mono tabular-nums">
              {String(total).padStart(2, "0")}
            </span>
          </div>

          {/* Next */}
          <button
            onClick={next}
            disabled={!canNext}
            aria-label="Next reviews"
            className={`group relative flex items-center gap-2 pr-5 pl-4 py-3 transition-all duration-300 ${
              canNext ? "opacity-100 cursor-pointer" : "opacity-25 cursor-not-allowed"
            }`}
          >
            <span className={`flex items-center justify-center w-9 h-9 rounded-full border-2 transition-all duration-300 ${
              canNext
                ? "border-red-500 text-red-400 group-hover:bg-red-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-red-500/40"
                : "border-slate-700 text-slate-600"
            }`}>
              <ArrowRight className="w-4 h-4" />
            </span>
            {/* Arrow trail line */}
            <span className={`block h-px w-10 transition-all duration-300 ${canNext ? "bg-red-500 group-hover:w-16" : "bg-slate-600"}`} />
          </button>
        </div>

      </div>
    </section>
  );
};

export default TestimonialCarousel;
