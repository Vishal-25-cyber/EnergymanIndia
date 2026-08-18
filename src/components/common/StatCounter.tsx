import React, { useEffect, useState, useRef } from "react";
import { companyData } from "../../data/company";
import { ShieldCheck, Award, Zap, Trees, Smile } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

const getMetricIcon = (index: number) => {
  switch (index) {
    case 0:
      return <Award className="w-5 h-5 text-solar-400" />;
    case 1:
      return <Zap className="w-5 h-5 text-energy-400" />;
    case 2:
      return <ShieldCheck className="w-5 h-5 text-blue-400" />;
    case 3:
      return <Zap className="w-5 h-5 text-yellow-400" />;
    case 4:
      return <Trees className="w-5 h-5 text-emerald-400" />;
    default:
      return <Smile className="w-5 h-5 text-cyan-400" />;
  }
};

const AnimatedNumber: React.FC<{ value: number; duration?: number }> = ({ value, duration = 2200 }) => {
  const [count, setCount] = useState(0);
  const [isDone, setIsDone] = useState(false);
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
            
            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = Math.floor(easeProgress * value);
            setCount(currentVal);

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              setCount(value);
              setIsDone(true);
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

  return (
    <span
      ref={ref}
      className={`transition-all duration-500 ${
        isDone ? "text-white drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" : ""
      }`}
    >
      {count.toLocaleString()}
    </span>
  );
};

export const StatCounter: React.FC = () => {
  return (
    <div className="relative z-20 -mt-8 sm:-mt-12 site-container">
      <ScrollReveal animation="slide-up" delay={200}>
        <div className="relative group">
          {/* Subtle glow behind the card */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-energy-500/20 to-solar-500/20 rounded-[2rem] blur opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          
          <div className="relative bg-brand-900/80 backdrop-blur-xl border border-slate-700/60 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl shadow-black/80 group-hover:border-slate-600/60 transition-colors duration-500">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-800/80">
              {companyData.metrics.map((metric, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center text-center space-y-2 group/item ${
                    index > 0 ? "pt-4 md:pt-0 md:pl-6" : ""
                  }`}
                >
                  <div className="p-2.5 rounded-xl bg-brand-850/80 border border-slate-700/60 shadow-md group-hover/item:scale-110 group-hover/item:border-energy-500/30 transition-transform">
                    {getMetricIcon(index)}
                  </div>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight flex items-baseline">
                    <AnimatedNumber value={metric.value} />
                    <span className="text-energy-400 text-xl sm:text-2xl font-bold ml-0.5">
                      {metric.suffix}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-slate-200">
                    {metric.label}
                  </p>
                  <p className="text-[11px] text-slate-400 hidden lg:block leading-tight">
                    {metric.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
};
