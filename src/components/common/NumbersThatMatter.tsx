import React, { useEffect, useState, useRef } from "react";
import { companyData } from "../../data/company";
import { Smile, Factory, MapPin, Sparkles, ShieldCheck, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ScrollReveal } from "./ScrollReveal";

const AnimatedCounter: React.FC<{ value: number; duration?: number }> = ({ value, duration = 2000 }) => {
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
    <section className="section-padding bg-[#0A0A0E] relative overflow-hidden border-t border-red-950/60" id="metrics">
      
      {/* Massive Layered Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[14vw] font-black text-white/[0.015] tracking-widest pointer-events-none select-none uppercase font-sans">
        SCALE
      </div>

      <div className="site-container relative z-10 space-y-14">
        
        {/* Section Header */}
        <ScrollReveal animation="slide-up">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold tracking-widest uppercase bg-red-950/80 text-rose-300 border border-red-500/40 shadow-xs font-mono">
              <Sparkles className="w-3.5 h-3.5 text-red-400" />
              <span>SOURCE OF PROVEN EXECUTION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              NUMBERS THAT <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">MATTER</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              Real metrics from over a decade of dedicated solar EPC engineering across Tamil Nadu and South India.
            </p>
          </div>
        </ScrollReveal>

        {/* ── Giant Statistical Composition ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Giant Metric: 6500+ Happy Customers (7 Cols) */}
          <div className="lg:col-span-7">
            <ScrollReveal animation="slide-up" delay={100}>
              <div className="h-full bg-gradient-to-br from-[#1C1625] via-[#14101A] to-[#0A0A0E] border border-red-900/40 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden flex flex-col justify-between group hover:border-red-500/60 transition-all">
                
                {/* Background Ambient Glow */}
                <div className="absolute top-0 right-0 w-72 h-72 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />

                <div className="space-y-6 relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="p-3.5 rounded-2xl bg-red-950/80 border border-red-500/40 text-red-400">
                      <Smile className="w-8 h-8" />
                    </div>
                    <span className="text-xs font-mono font-bold text-red-400 bg-red-950/80 px-3 py-1.5 rounded-xl border border-red-900/40">
                      SINCE 2016
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="text-6xl sm:text-7xl md:text-8xl font-black text-white font-mono tracking-tight flex items-baseline">
                      <AnimatedCounter value={6500} />
                      <span className="text-red-500 text-4xl sm:text-5xl ml-1">+</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-wide uppercase">
                      HAPPY CUSTOMERS
                    </h3>
                  </div>

                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                    Delivering clean energy independence to residential homeowners, commercial enterprises, and farmers across Tamil Nadu.
                  </p>
                </div>

                <div className="pt-8 border-t border-red-950/60 flex items-center justify-between relative z-10">
                  <span className="flex items-center gap-2 text-xs font-bold text-slate-300">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    MNRE Subsidy Partner
                  </span>
                  <Link to="/contact" className="text-xs font-bold text-red-400 hover:underline flex items-center gap-1">
                    <span>Join Our Community</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: 800+ Industrial Solutions & 40+ City Presence (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Metric 2: 800+ Industrial Solutions */}
            <ScrollReveal animation="slide-up" delay={200}>
              <div className="bg-[#14101A]/95 border border-red-900/40 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden group hover:border-red-500/60 transition-all flex flex-col justify-between">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-slate-900 border border-red-950/60 text-amber-400">
                    <Factory className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-950/60 px-2.5 py-1 rounded-lg border border-amber-900/40">
                    MEGAWATT & CAPTIVE
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="text-4xl sm:text-5xl font-black text-white font-mono flex items-baseline">
                    <AnimatedCounter value={800} />
                    <span className="text-amber-400 text-3xl ml-1">+</span>
                  </div>
                  <h4 className="text-base sm:text-lg font-black text-slate-200 uppercase">
                    INDUSTRIAL SOLAR SOLUTIONS
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed pt-1">
                    Textile mills, manufacturing plants, foundries & commercial facilities.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Metric 3: 40+ City Presence */}
            <ScrollReveal animation="slide-up" delay={300}>
              <div className="bg-[#14101A]/95 border border-red-900/40 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden group hover:border-red-500/60 transition-all flex flex-col justify-between">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-slate-900 border border-red-950/60 text-rose-400">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-rose-300 bg-red-950/60 px-2.5 py-1 rounded-lg border border-red-900/40">
                    REGIONAL FOOTPRINT
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="text-4xl sm:text-5xl font-black text-white font-mono flex items-baseline">
                    <AnimatedCounter value={40} />
                    <span className="text-red-500 text-3xl ml-1">+</span>
                  </div>
                  <h4 className="text-base sm:text-lg font-black text-slate-200 uppercase">
                    CITY PRESENCE
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed pt-1">
                    Active installations and rapid O&M support hubs across Tamil Nadu.
                  </p>
                </div>
              </div>
            </ScrollReveal>

          </div>

        </div>

      </div>
    </section>
  );
};

export default NumbersThatMatter;
