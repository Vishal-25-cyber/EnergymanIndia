import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
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
    image: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80",
    link: "/products/solar-panels",
    icon: <Cpu className="w-5 h-5 text-energy-400" />
  },
  {
    id: "tech-inverters",
    category: "Smart Power Inverters",
    name: "Multi-MPPT On-Grid & Hybrid String Inverters",
    description: "Ultra-high efficiency grid-tied inverters featuring smart I-V curve diagnostics, AFCI arc-fault protection, and 98.8% conversion efficiency.",
    highlights: ["Up to 10 Independent MPPTs", "Integrated Type-II AC/DC SPDs", "Real-Time Mobile App Telemetry"],
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
    link: "/products/inverters",
    icon: <Zap className="w-5 h-5 text-solar-400" />
  },
  {
    id: "tech-pumps",
    category: "Agricultural Pumping",
    name: "Stainless Steel Submersible Solar Pumps with VFD",
    description: "High-discharge deep borewell water pumps paired with Vector Variable Frequency Drives (VFD) and PM-KUSUM 60% subsidy.",
    highlights: ["Discharge up to 350,000 LPD", "Deep Heads up to 600+ Feet", "Dry-Run Sensorless Protection"],
    image: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1200&q=80",
    link: "/products/solar-pumps",
    icon: <Tractor className="w-5 h-5 text-emerald-400" />
  },
  {
    id: "tech-heaters",
    category: "Solar Thermal Heating",
    name: "Three-Target Vacuum Tube (ETC) Water Heaters",
    description: "High-retention domestic and commercial solar water heaters with food-grade SS316 inner tanks and high-density PUF insulation.",
    highlights: ["Retains Hot Water for 48+ Hours", "Food-Grade SS316 Inner Tank", "Up to 80% Water Heating Savings"],
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    link: "/products/solar-water-heaters",
    icon: <Sun className="w-5 h-5 text-amber-400" />
  },
  {
    id: "tech-bess",
    category: "Battery Storage",
    name: "Modular LiFePO4 Energy Storage Rack Banks",
    description: "Grade-A Lithium Iron Phosphate rack batteries with active balancing BMS, 6000+ cycle life, and sub-10ms automatic transfer time.",
    highlights: ["6,000+ Cycles at 80% DoD", "Safe Lithium Iron Phosphate", "Peak Shaving & Backup Power"],
    image: "https://images.unsplash.com/photo-1558441719-8b489c6340c4?auto=format&fit=crop&w=1200&q=80",
    link: "/products/energy-storage",
    icon: <BatteryCharging className="w-5 h-5 text-cyan-400" />
  },
  {
    id: "tech-telemetry",
    category: "Cloud Telemetry",
    name: "Central SCADA & Remote Performance Telemetry",
    description: "24/7 cloud telemetry with automated string anomaly detection, weather sensor cross-referencing, and proactive maintenance alerts.",
    highlights: ["String-Level Current Mapping", "Automated Performance Ratio (PR)", "Instant WhatsApp/SMS Alerts"],
    image: "https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=1200&q=80",
    link: "/solutions/epc-maintenance",
    icon: <Activity className="w-5 h-5 text-purple-400" />
  }
];

export const TechnologyCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const maxIndex = techItems.length - 1;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // Automatic slide movement
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused, currentIndex]);

  return (
    <section
      className="section-padding bg-brand-950/60 relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="site-container relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-energy-500/10 text-energy-400 border border-energy-500/30">
            <Cpu className="w-3.5 h-3.5" />
            <span>Engineering Hardware Standards</span>
          </div>
          <h2 className="heading-section">
            THE HARDWARE <span className="bg-gradient-to-r from-solar-400 to-energy-400 bg-clip-text text-transparent">POWERING YOUR PLANT</span>
          </h2>
          <p className="text-subtle">
            We exclusively deploy Tier-1, MNRE-approved, and ALMM-enlisted equipment designed for extreme Indian climatic conditions and 25+ years of trouble-free operation.
          </p>
        </div>

        {/* Carousel Grid Viewport */}
        <div className="overflow-hidden pb-4">
          <div
            className="flex transition-transform duration-500 ease-out -mx-3"
            style={{
              transform: `translateX(-${currentIndex * (100 / (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1))}%)`
            }}
          >
            {techItems.map((item) => (
              <div
                key={item.id}
                className="w-full sm:w-1/2 lg:w-1/3 px-3 shrink-0"
              >
                <div className="h-full flex flex-col bg-brand-900/80 border border-slate-800 rounded-3xl overflow-hidden hover:border-solar-500/50 hover:shadow-2xl hover:shadow-solar-500/10 transition-all duration-300 group">
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/40 to-transparent" />
                    
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-brand-950/90 text-slate-200 border border-slate-700">
                        {item.icon}
                        <span>{item.category}</span>
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-solar-400 transition-colors line-clamp-1">
                        {item.name}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>

                      <div className="space-y-1.5 pt-3 border-t border-slate-800">
                        {item.highlights.map((hl, hIdx) => (
                          <div key={hIdx} className="flex items-center gap-2 text-xs text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-solar-400 shrink-0" />
                            <span className="line-clamp-1">{hl}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2">
                      <Link
                        to={item.link}
                        className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-brand-850 hover:bg-solar-500 text-slate-200 hover:text-brand-950 font-semibold text-xs transition-all duration-300 border border-slate-700/80 hover:border-solar-400 group/btn"
                      >
                        <span>View Technical Specs</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
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
