import React, { useEffect, useState, useRef } from "react";
import { Smile, Factory, MapPin, ShieldCheck, Award } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

const AnimatedCounter: React.FC<{ value: number; duration?: number }> = ({ value, duration = 1800 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const startTime = performance.now();

          const updateCounter = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = Math.floor(easeProgress * value);
            setCount(currentVal);

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              setCount(value);
            }
          };

          requestAnimationFrame(updateCounter);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, duration, hasAnimated]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
};

export const NumbersThatMatter: React.FC = () => {
  return (
    <section className="py-16 sm:py-22 bg-[#0A0A0E] relative overflow-hidden" id="metrics">
      
      {/* Background Subtle Glows */}
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="site-container relative z-10 space-y-10 sm:space-y-12">
        
        {/* ── Centered Section Header ── */}
        <ScrollReveal animation="slide-up">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold tracking-widest uppercase bg-red-950/80 text-rose-300 border border-red-500/40 shadow-xs font-mono">
              <Award className="w-3.5 h-3.5 text-red-400" />
              <span>PROVEN DECADE TRACK RECORD</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight uppercase">
              NUMBERS THAT{" "}
              <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">
                MATTER
              </span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
              Real metrics from over a decade of dedicated solar EPC engineering across Tamil Nadu and South India.
            </p>
          </div>
        </ScrollReveal>

        {/* ── Perfectly Symmetrical 3-Column Balanced Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          
          {/* Metric 01: 6,500+ Happy Customers */}
          <ScrollReveal animation="slide-up" delay={100}>
            <div className="h-full bg-[#14101A]/95 border border-red-900/30 rounded-3xl p-6 sm:p-7 shadow-xl hover:border-red-500/60 hover:shadow-2xl hover:shadow-red-950/50 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
              
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="space-y-4">
                {/* Top Badge & Icon */}
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-red-950/80 border border-red-500/40 text-red-400 shadow-xs">
                    <Smile className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-red-400 bg-red-950/80 px-2.5 py-1 rounded-lg border border-red-900/40">
                    SINCE 2016
                  </span>
                </div>

                {/* Animated Stat & Label */}
                <div className="space-y-1">
                  <div className="text-4xl sm:text-5xl font-black text-white font-mono tracking-tight flex items-baseline">
                    <AnimatedCounter value={6500} />
                    <span className="text-red-500 text-3xl sm:text-4xl ml-1">+</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-black text-slate-100 uppercase tracking-wide">
                    HAPPY CUSTOMERS
                  </h3>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  Delivering clean energy independence to residential homeowners, commercial enterprises, and farmers across Tamil Nadu.
                </p>
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-4 mt-4 border-t border-red-950/60 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5 font-medium text-[11px] text-slate-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  MNRE Subsidy Partner
                </span>
                <span className="text-[11px] font-mono text-emerald-400 font-bold">● Active Clients</span>
              </div>

            </div>
          </ScrollReveal>

          {/* Metric 02: 800+ Industrial Solutions */}
          <ScrollReveal animation="slide-up" delay={200}>
            <div className="h-full bg-[#14101A]/95 border border-red-900/30 rounded-3xl p-6 sm:p-7 shadow-xl hover:border-amber-500/60 hover:shadow-2xl hover:shadow-amber-950/30 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
              
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="space-y-4">
                {/* Top Badge & Icon */}
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-amber-950/80 border border-amber-500/40 text-amber-400 shadow-xs">
                    <Factory className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-950/80 px-2.5 py-1 rounded-lg border border-amber-900/40">
                    MEGAWATT & CAPTIVE
                  </span>
                </div>

                {/* Animated Stat & Label */}
                <div className="space-y-1">
                  <div className="text-4xl sm:text-5xl font-black text-white font-mono tracking-tight flex items-baseline">
                    <AnimatedCounter value={800} />
                    <span className="text-amber-400 text-3xl sm:text-4xl ml-1">+</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-black text-slate-100 uppercase tracking-wide">
                    INDUSTRIAL SOLAR PROJECTS
                  </h3>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  High-yield captive rooftop solar plants for spinning mills, manufacturing foundries, and export facilities.
                </p>
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-4 mt-4 border-t border-red-950/60 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5 font-medium text-[11px] text-slate-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  DG Synchronization
                </span>
                <span className="text-[11px] font-mono text-amber-400 font-bold">● High Yield SLA</span>
              </div>

            </div>
          </ScrollReveal>

          {/* Metric 03: 40+ City Presence */}
          <ScrollReveal animation="slide-up" delay={300}>
            <div className="h-full bg-[#14101A]/95 border border-red-900/30 rounded-3xl p-6 sm:p-7 shadow-xl hover:border-rose-500/60 hover:shadow-2xl hover:shadow-rose-950/30 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
              
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="space-y-4">
                {/* Top Badge & Icon */}
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-red-950/80 border border-rose-500/40 text-rose-400 shadow-xs">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-rose-300 bg-red-950/80 px-2.5 py-1 rounded-lg border border-red-900/40">
                    REGIONAL FOOTPRINT
                  </span>
                </div>

                {/* Animated Stat & Label */}
                <div className="space-y-1">
                  <div className="text-4xl sm:text-5xl font-black text-white font-mono tracking-tight flex items-baseline">
                    <AnimatedCounter value={40} />
                    <span className="text-rose-400 text-3xl sm:text-4xl ml-1">+</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-black text-slate-100 uppercase tracking-wide">
                    CITY & REGIONAL HUBS
                  </h3>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  Active field installations, certified site supervisors, and rapid O&M support hubs across Tamil Nadu.
                </p>
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-4 mt-4 border-t border-red-950/60 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5 font-medium text-[11px] text-slate-300">
                  <Award className="w-3.5 h-3.5 text-rose-400" />
                  Decade of Service
                </span>
                <span className="text-[11px] font-mono text-rose-300 font-bold">● South India</span>
              </div>

            </div>
          </ScrollReveal>

        </div>

      </div>
    </section>
  );
};

export default NumbersThatMatter;
