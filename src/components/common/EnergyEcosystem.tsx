import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  Factory,
  Tractor,
  Zap,
  BatteryCharging,
  Sun,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Percent
} from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=800&q=80";

interface SolutionCard {
  id: string;
  categoryGroup: "all" | "residential" | "commercial" | "agriculture" | "storage";
  title: string;
  category: string;
  capacityTag: string;
  roiTag: string;
  badge: string;
  badgeType: "subsidy" | "depreciation" | "utility";
  desc: string;
  image: string;
  icon: React.ReactNode;
  highlights: string[];
  link: string;
}

const solutionsList: SolutionCard[] = [
  {
    id: "residential",
    categoryGroup: "residential",
    title: "Residential Rooftop Solar",
    category: "Homes & Independent Villas",
    capacityTag: "1 kW — 15 kW",
    roiTag: "3.2 Yrs Payback",
    badge: "₹78,000 Direct Subsidy",
    badgeType: "subsidy",
    desc: "Custom rooftop engineering with Tier-1 bifacial panels, bi-directional net metering, and instant PM Surya Ghar bank subsidy disbursement.",
    image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=800&q=80",
    icon: <Home className="w-4 h-4 text-red-400" />,
    highlights: ["Up to 90% power bill reduction", "PM Surya Ghar approved partner", "25-Year linear panel warranty"],
    link: "/solutions/residential"
  },
  {
    id: "industrial",
    categoryGroup: "commercial",
    title: "Industrial & Commercial Solar",
    category: "Factories & Textile Mills",
    capacityTag: "50 kW — 5 MW+",
    roiTag: "Under 3.0 Yrs Payback",
    badge: "40% Tax Depreciation",
    badgeType: "depreciation",
    desc: "High-yield captive rooftop solar plants for spinning mills, industrial factories, and export units with zero-downtime DG synchronization.",
    image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=800&q=80",
    icon: <Factory className="w-4 h-4 text-amber-400" />,
    highlights: ["Hedge against peak HT tariffs", "Automated DG-PV synchronizer", "CEIG certified engineering"],
    link: "/solutions/industrial"
  },
  {
    id: "agricultural",
    categoryGroup: "agriculture",
    title: "Agricultural Solar Water Pumps",
    category: "Irrigation & Modern Farming",
    capacityTag: "3 HP — 20 HP",
    roiTag: "Zero Fuel Cost",
    badge: "60% PM-KUSUM Subsidy",
    badgeType: "subsidy",
    desc: "Stainless steel multi-stage submersible and surface water pumps paired with vector VFD controllers for daylight farm irrigation.",
    image: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80",
    icon: <Tractor className="w-4 h-4 text-emerald-400" />,
    highlights: ["Discharge up to 350,000 LPD", "Deep heads up to 600+ feet", "Dry-run sensor protection"],
    link: "/solutions/agricultural"
  },
  {
    id: "water-heaters",
    categoryGroup: "residential",
    title: "Solar Thermal Water Heaters",
    category: "Domestic & Commercial Heating",
    capacityTag: "110L — 500L+",
    roiTag: "80% Heating Savings",
    badge: "SS316 Food-Grade Tank",
    badgeType: "utility",
    desc: "High-retention 3-target ETC vacuum tube solar water heaters with 50mm high-density PUF insulation for 48+ hours hot water retention.",
    image: "https://images.unsplash.com/photo-1545208942-e1c9c916524b?auto=format&fit=crop&w=800&q=80",
    icon: <Sun className="w-4 h-4 text-amber-400" />,
    highlights: ["48+ Hours thermal heat retention", "Non-welding inner tank build", "Rust-proof powder coated outer"],
    link: "/products/solar-water-heaters"
  },
  {
    id: "storage",
    categoryGroup: "storage",
    title: "LiFePO4 Energy Storage & Microgrids",
    category: "Battery Backup & Peak Shaving",
    capacityTag: "5 kWh — 200 kWh+",
    roiTag: "6,000+ Cycles",
    badge: "100% Blackout Immunity",
    badgeType: "utility",
    desc: "Modular Lithium Iron Phosphate battery banks with active BMS balancing and sub-10ms automatic UPS power transfer.",
    image: "https://images.unsplash.com/photo-1558441719-8b489c6340c4?auto=format&fit=crop&w=800&q=80",
    icon: <BatteryCharging className="w-4 h-4 text-rose-400" />,
    highlights: ["Sub-10ms automatic UPS transfer", "Safe LiFePO4 chemistry", "Peak demand penalty shaving"],
    link: "/solutions/energy-storage"
  },
  {
    id: "megawatt",
    categoryGroup: "commercial",
    title: "Turnkey EPC & Lifetime O&M",
    category: "Utility Scale & Asset Management",
    capacityTag: "1 MW — 50 MW+",
    roiTag: "> 99% Uptime SLA",
    badge: "Guaranteed PR Output",
    badgeType: "utility",
    desc: "End-to-end solar EPC contracting with SCADA AI telemetry, drone thermal anomaly scanning, and preventive AMC maintenance.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    icon: <Zap className="w-4 h-4 text-amber-300" />,
    highlights: ["Drone thermographic scanning", "String-level cloud SCADA telemetry", "Performance Ratio (PR) contract"],
    link: "/solutions/epc-maintenance"
  }
];

export const EnergyEcosystem: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("all");

  const filteredSolutions = solutionsList.filter((s) => {
    if (activeTab === "all") return true;
    return s.categoryGroup === activeTab;
  });

  return (
    <section className="py-20 sm:py-28 bg-[#0A0A0E] relative overflow-hidden border-t border-red-950/60" id="solutions">
      
      {/* Background Glows & Subtle Texture */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none opacity-50" />

      <div className="site-container relative z-10 space-y-12 sm:space-y-16">
        
        {/* ── Section Header (Centered & Bold) ── */}
        <ScrollReveal animation="slide-up">
          <div className="text-center max-w-4xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-extrabold tracking-widest uppercase bg-red-950/80 text-rose-300 border border-red-500/40 shadow-xs font-mono mx-auto">
              <Sparkles className="w-3.5 h-3.5 text-red-400" />
              <span>THE COMPLETE SOLAR ECOSYSTEM</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] uppercase">
              ENGINEERED SOLAR SOLUTIONS FOR{" "}
              <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent block sm:inline">
                EVERY SECTOR
              </span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Decade-proven turnkey engineering delivering maximum kilowatt-hour generation, PM Surya Ghar subsidies, and guaranteed ROI across Tamil Nadu.
            </p>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
              {[
                { id: "all", label: "All Solutions (6)" },
                { id: "residential", label: "Residential & Rooftops" },
                { id: "commercial", label: "Commercial & Industrial" },
                { id: "agriculture", label: "Agricultural Pumps" },
                { id: "storage", label: "Battery Storage" }
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      isActive
                        ? "bg-gradient-to-r from-red-600 to-rose-600 text-white border-red-400 shadow-md shadow-red-900/30 scale-105"
                        : "bg-[#14101A] text-slate-300 border-red-950/60 hover:text-white hover:border-red-500/40"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

          </div>
        </ScrollReveal>

        {/* ── Modern 3-Column Solution Cards Matrix ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredSolutions.map((item, idx) => (
            <ScrollReveal key={item.id} animation="slide-up" delay={idx * 75}>
              <div className="h-full flex flex-col justify-between bg-[#14101A]/95 border border-red-900/30 rounded-3xl overflow-hidden hover:border-red-500/40 hover:shadow-2xl hover:shadow-red-950/40 hover:-translate-y-1 transition-all duration-300 group relative shadow-xl">

                {/* ── Card Image Header ── */}
                <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-slate-900 shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (target.src !== FALLBACK_IMAGE) {
                        target.src = FALLBACK_IMAGE;
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14101A] via-black/20 to-black/40" />

                  {/* Icon & Category Pill */}
                  <div className="absolute top-4 left-4 z-20">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-[#0A0A0E]/90 backdrop-blur-md text-white border border-red-900/50 shadow-md">
                      {item.icon}
                      <span>{item.category}</span>
                    </span>
                  </div>

                  {/* Benefit Badge */}
                  <div className="absolute top-4 right-4 z-20">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-mono font-bold shadow-md backdrop-blur-md border ${
                      item.badgeType === "subsidy"
                        ? "bg-amber-950/90 text-amber-300 border-amber-500/40"
                        : item.badgeType === "depreciation"
                        ? "bg-emerald-950/90 text-emerald-300 border-emerald-500/40"
                        : "bg-red-950/90 text-rose-300 border-red-500/40"
                    }`}>
                      {item.badge}
                    </span>
                  </div>

                  {/* Capacity & ROI Bottom Strip */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-20 text-xs">
                    <span className="bg-[#0A0A0E]/85 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 text-white font-mono font-bold">
                      {item.capacityTag}
                    </span>
                    <span className="bg-red-950/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-red-500/30 text-rose-300 font-mono font-bold">
                      {item.roiTag}
                    </span>
                  </div>
                </div>

                {/* ── Card Body ── */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <h3 className="text-xl font-black text-white group-hover:text-red-400 transition-colors leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed font-normal">
                      {item.desc}
                    </p>

                    {/* Key Technical Checklist */}
                    <div className="space-y-1.5 pt-2 border-t border-red-950/60">
                      {item.highlights.map((hl, hIdx) => (
                        <div key={hIdx} className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-red-500 shrink-0" />
                          <span className="line-clamp-1">{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ── Card Action Button ── */}
                  <div className="pt-2">
                    <Link
                      to={item.link}
                      className="inline-flex items-center justify-between w-full px-4 py-3 rounded-xl bg-slate-900 group-hover:bg-red-600 text-slate-200 group-hover:text-white font-extrabold text-xs sm:text-sm transition-all duration-300 border border-red-950/60 group-hover:border-red-500 shadow-md group/btn"
                    >
                      <span>Explore Technical Specs</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1.5" />
                    </Link>
                  </div>

                </div>

              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* ── Bottom Inquire Strip ── */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#14101A] via-[#1C1525] to-[#14101A] border border-red-900/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-lg sm:text-xl font-black text-white">
              Not sure which solar capacity or subsidy fits your property?
            </h4>
            <p className="text-xs sm:text-sm text-slate-400">
              Speak with our senior solar engineers for a free site shadow analysis and customized payback roadmap.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to="/get-a-quote"
              className="btn-primary py-3 px-6 text-xs sm:text-sm font-bold inline-flex items-center gap-2"
            >
              <span>Get Free Site Feasibility</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="py-3 px-5 text-xs sm:text-sm font-bold rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-red-950/60 transition-all hover:text-white hover:border-red-500/40"
            >
              Contact Engineering Team
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default EnergyEcosystem;
