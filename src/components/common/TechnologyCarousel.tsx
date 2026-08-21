"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Cpu,
  Zap,
  Tractor,
  Sun,
  BatteryCharging,
  Activity,
  CheckCircle2
} from "lucide-react";

interface TechItem {
  id: string;
  category: string;
  name: string;
  description: string;
  highlights: string[];
  image: string;
  link: string;
  icon: React.ReactNode;
}

const techItems: TechItem[] = [
  {
    id: "tech-panels",
    category: "Photovoltaic Modules",
    name: "N-Type TOPCon & Mono PERC Dual-Glass Panels",
    description: "Next-generation 16-busbar photovoltaic cells with up to 22.8% module efficiency and bi-facial generation gains.",
    highlights: ["25% Rear-Side Bifacial Gain", "Zero LID / LeTID Degradation", "-0.30%/°C Temperature Tolerance"],
    image: "https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?auto=format&fit=crop&w=1200&q=80",
    link: "/products",
    icon: <Cpu className="w-4 h-4 text-red-400" />
  },
  {
    id: "tech-inverters",
    category: "Smart Power Inverters",
    name: "Multi-MPPT On-Grid & Hybrid String Inverters",
    description: "Ultra-high efficiency grid-tied inverters featuring smart I-V curve diagnostics, AFCI arc-fault protection, and 98.8% conversion efficiency.",
    highlights: ["Up to 10 Independent MPPTs", "Integrated Type-II AC/DC SPDs", "Real-Time Mobile App Telemetry"],
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
    link: "/products",
    icon: <Activity className="w-4 h-4 text-amber-400" />
  },
  {
    id: "tech-pumps",
    category: "Agricultural Pumping",
    name: "Stainless Steel Submersible Solar Pumps with VFD",
    description: "High-discharge deep borewell water pumps paired with Vector Variable Frequency Drives (VFD) and PM-KUSUM 60% subsidy.",
    highlights: ["Discharge up to 350,000 LPD", "Deep Heads up to 600+ Feet", "Dry-Run Sensorless Protection"],
    image: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1200&q=80",
    link: "/products/solar-pumps",
    icon: <Tractor className="w-4 h-4 text-emerald-400" />
  },
  {
    id: "tech-heaters",
    category: "Solar Thermal Heating",
    name: "Three-Target Vacuum Tube (ETC) Water Heaters",
    description: "High-retention domestic and commercial solar water heaters with food-grade SS316 inner tanks and high-density PUF insulation.",
    highlights: ["Retains Hot Water for 48+ Hours", "Food-Grade SS316 Inner Tank", "Up to 80% Water Heating Savings"],
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    link: "/products/solar-water-heaters",
    icon: <Sun className="w-4 h-4 text-amber-400" />
  },
  {
    id: "tech-bess",
    category: "Battery Storage",
    name: "Modular LiFePO4 Energy Storage Rack Banks",
    description: "Grade-A Lithium Iron Phosphate rack batteries with active balancing BMS, 6000+ cycle life, and sub-10ms automatic transfer time.",
    highlights: ["6,000+ Cycles at 80% DoD", "Safe Lithium Iron Phosphate", "Peak Shaving & Backup Power"],
    image: "https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&w=1200&q=80",
    link: "/solutions/energy-storage",
    icon: <BatteryCharging className="w-4 h-4 text-red-500" />
  },
  {
    id: "tech-telemetry",
    category: "Cloud Telemetry",
    name: "Central SCADA & Remote Performance Telemetry",
    description: "24/7 cloud telemetry with automated string anomaly detection, weather sensor cross-referencing, and proactive maintenance alerts.",
    highlights: ["String-Level Current Mapping", "Automated Performance Ratio (PR)", "Instant WhatsApp/SMS Alerts"],
    image: "https://images.unsplash.com/photo-1545208942-e1c9c916524b?auto=format&fit=crop&w=1200&q=80",
    link: "/solutions/epc-maintenance",
    icon: <Activity className="w-4 h-4 text-rose-400" />
  }
];

export const TechnologyCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const maxIndex = techItems.length - 1;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused, currentIndex]);

  return (
    <section
      className="section-padding bg-[#0A0A0E] relative overflow-hidden border-t border-red-950/60"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="site-container relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold tracking-wider uppercase bg-red-950/80 text-rose-300 border border-red-500/40 shadow-xs">
            <Cpu className="w-3.5 h-3.5 text-red-400" />
            <span>Engineering Hardware Standards</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            THE HARDWARE <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">POWERING YOUR PLANT</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            We exclusively deploy Tier-1, MNRE-approved, and ALMM-enlisted equipment designed for extreme Indian climatic conditions and 25+ years of trouble-free operation.
          </p>
        </div>

        {/* Carousel Grid Viewport */}
        <div className="overflow-hidden pb-4">
          <div
            className="flex transition-transform duration-500 ease-out -mx-3"
            style={{
              transform: `translateX(-${currentIndex * (100 / (typeof window !== 'undefined' && window.innerWidth >= 1024 ? 3 : typeof window !== 'undefined' && window.innerWidth >= 640 ? 2 : 1))}%)`
            }}
          >
            {techItems.map((item) => (
              <div
                key={item.id}
                className="w-full sm:w-1/2 lg:w-1/3 px-3 shrink-0"
              >
                <div className="h-full flex flex-col bg-[#14101A]/95 border border-red-900/30 rounded-3xl overflow-hidden hover:border-red-500/50 hover:shadow-2xl hover:shadow-black/70 transition-all duration-300 group shadow-md">
                  <div className="relative h-52 overflow-hidden bg-slate-900">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#14101A] via-transparent to-transparent" />
                    
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#0A0A0E]/90 text-slate-100 border border-red-900/40 shadow-md">
                        {item.icon}
                        <span>{item.category}</span>
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-base sm:text-lg font-black text-white group-hover:text-red-400 transition-colors line-clamp-1">
                        {item.name}
                      </h3>
                      <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>

                      <div className="space-y-1.5 pt-3 border-t border-red-950/60">
                        {item.highlights.map((hl, hIdx) => (
                          <div key={hIdx} className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5 text-red-500 shrink-0" />
                            <span className="line-clamp-1">{hl}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2">
                      <Link
                        href={item.link}
                        className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-red-600 text-slate-200 hover:text-white font-bold text-xs transition-all duration-300 border border-red-950/60 shadow-xs"
                      >
                        <span>View Technical Specs</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologyCarousel;
