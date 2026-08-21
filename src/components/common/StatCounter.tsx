"use client";
import React, { useEffect, useState, useRef } from "react";
import { companyData } from "../../data/company";
import { ShieldCheck, Award, Zap, Smile, MapPin, IndianRupee } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

const getMetricIcon = (index: number) => {
  switch (index) {
    case 0:
      return <Smile className="w-5 h-5 text-red-400" />;
    case 1:
      return <Zap className="w-5 h-5 text-amber-400" />;
    case 2:
      return <Award className="w-5 h-5 text-red-400" />;
    case 3:
      return <MapPin className="w-5 h-5 text-rose-400" />;
    case 4:
      return <IndianRupee className="w-5 h-5 text-amber-400" />;
    case 5:
      return <ShieldCheck className="w-5 h-5 text-red-400" />;
    default:
      return <ShieldCheck className="w-5 h-5 text-red-400" />;
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
        isDone ? "text-white font-black" : "text-slate-100"
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
          {/* Ambient crimson glow behind card */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600/25 via-rose-500/15 to-amber-500/20 rounded-[2rem] blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-700" />
          
          <div className="relative bg-[#14101A]/95 backdrop-blur-2xl border border-red-900/40 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl shadow-black/80 group-hover:border-red-500/50 transition-all duration-500">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-red-950/60">
              {companyData.metrics.map((metric, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center text-center space-y-2 group/item ${
                    index > 0 ? "pt-4 sm:pt-0 sm:pl-6" : ""
                  }`}
                >
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-red-950/60 shadow-md group-hover/item:scale-110 group-hover/item:border-red-500/50 transition-all duration-300">
                    {getMetricIcon(index)}
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-baseline">
                    <AnimatedNumber value={metric.value} />
                    <span className="text-red-500 text-lg sm:text-xl font-black ml-0.5">
                      {metric.suffix}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-slate-200">
                    {metric.label}
                  </p>
                  <p className="text-[11px] text-slate-400 hidden lg:block leading-tight font-medium">
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

export default StatCounter;
