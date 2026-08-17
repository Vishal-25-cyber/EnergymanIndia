import React, { useEffect, useState, useRef } from "react";
import { companyData } from "../../data/company";
import { ShieldCheck, Award, Zap, Trees, Smile } from "lucide-react";

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

const AnimatedNumber: React.FC<{ value: number; duration?: number }> = ({ value, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const end = value;
          const totalSteps = 40;
          const stepTime = duration / totalSteps;
          const increment = end / totalSteps;

          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, stepTime);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, duration, hasAnimated]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
};

export const StatCounter: React.FC = () => {
  return (
    <div className="relative z-20 -mt-8 sm:-mt-12 site-container">
      <div className="bg-brand-900/90 backdrop-blur-xl border border-slate-800/90 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl shadow-black/80">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-800/80">
          {companyData.metrics.map((metric, index) => (
            <div
              key={index}
              className={`flex flex-col items-center text-center space-y-2 group ${
                index > 0 ? "pt-4 md:pt-0 md:pl-6" : ""
              }`}
            >
              <div className="p-2.5 rounded-xl bg-brand-850 border border-slate-700/60 shadow-md group-hover:scale-110 transition-transform">
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
  );
};
