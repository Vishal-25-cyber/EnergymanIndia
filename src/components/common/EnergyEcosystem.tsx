"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  Home,
  Building2,
  Factory,
  Tractor,
  Battery,
  Sun,
  ArrowRight,
  ShieldCheck,
  Check,
  Calculator,
  TrendingUp,
  Award,
  Layers,
  CheckCircle2,
  Clock,
  Gauge
} from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

interface SolutionTab {
  id: string;
  tabLabel: string;
  sectorTag: string;
  title: string;
  description: string;
  capacityRange: string;
  image: string;
  fallbackImage: string;
  icon: React.ReactNode;
  badge: string;
  stats: { value: string; label: string }[];
  keyPoints: string[];
  link: string;
}

const solutionsData: SolutionTab[] = [
  {
    id: "residential",
    tabLabel: "Residential",
    sectorTag: "Homes & Independent Villas",
    title: "Residential Rooftop Solar Systems",
    description: "Custom-engineered rooftop solar installations designed for independent houses, villas, and housing societies. Slash your electricity bills by up to 90% with Tier-1 bifacial panels, smart string inverters, and instant PM Surya Ghar central subsidy credit.",
    capacityRange: "1 kW — 15 kW",
    image: "/images/hero_rooftop_solar.jpg",
    fallbackImage: "/assets/images/hero-solar-bg.jpg",
    icon: <Home className="w-4 h-4" />,
    badge: "₹78,000 Direct Subsidy",
    stats: [
      { value: "₹78,000", label: "Max Central Subsidy" },
      { value: "3.2 Yrs", label: "Typical ROI Payback" },
      { value: "25 Yrs", label: "Linear Panel Warranty" }
    ],
    keyPoints: [
      "Up to 90% monthly electricity bill reduction",
      "Direct PM Surya Ghar Muft Bijli Yojana subsidy disbursement",
      "Bi-directional net metering handled end-to-end with TANGEDCO",
      "Tier-1 N-Type TOPCon bi-facial high-efficiency solar modules"
    ],
    link: "/solutions/residential"
  },
  {
    id: "commercial",
    tabLabel: "Commercial",
    sectorTag: "Offices & Institutions",
    title: "Commercial Rooftop Solar",
    description: "Hedge your business against commercial tariff hikes with turnkey rooftop solar plants. Designed for educational institutions, corporate tech parks, hospitals, and hotels with 40% accelerated tax depreciation benefits in Year 1.",
    capacityRange: "20 kW — 500 kW",
    image: "/images/hero_solar_panels.jpg",
    fallbackImage: "/assets/images/hero-solar-bg.jpg",
    icon: <Building2 className="w-4 h-4" />,
    badge: "40% Tax Depreciation",
    stats: [
      { value: "40%", label: "Accelerated Tax Benefit" },
      { value: "< 3.0 Yrs", label: "Payback Period" },
      { value: "< ₹2.50", label: "Cost Per Unit (kWh)" }
    ],
    keyPoints: [
      "Significant reduction in sanctioned demand peak charges",
      "40% accelerated tax depreciation under IT Act Section 32",
      "Zero disruption to daily business operations during installation",
      "Advanced SCADA cloud monitoring with real-time generation alerts"
    ],
    link: "/solutions/commercial"
  },
  {
    id: "industrial",
    tabLabel: "Industrial",
    sectorTag: "Factories & Spinning Mills",
    title: "Industrial & Captive MW Solar",
    description: "Heavy-duty captive solar power systems engineered for spinning mills, industrial factories, and heavy manufacturing plants with automated DG-PV synchronization and zero export protection.",
    capacityRange: "50 kW — 5 MW+",
    image: "/assets/images/hero-solar-bg.jpg",
    fallbackImage: "/images/hero_solar_panels.jpg",
    icon: <Factory className="w-4 h-4" />,
    badge: "Automated DG Sync",
    stats: [
      { value: "₹38L+", label: "Avg Annual OPEX Saved" },
      { value: "> 99.2%", label: "System Generation Uptime" },
      { value: "CEIG", label: "Certified Electrical Draw" }
    ],
    keyPoints: [
      "Seamless synchronization with existing diesel generator sets",
      "CEIG approvals and statutory statutory electrical safety compliance",
      "Non-penetrative sheet rooftop mounting to preserve roof warranty",
      "Guaranteed Performance Ratio (PR) with lifetime preventive O&M"
    ],
    link: "/solutions/industrial"
  },
  {
    id: "agricultural",
    tabLabel: "Agricultural",
    sectorTag: "Irrigation & Modern Farming",
    title: "Agricultural Solar Water Pumps",
    description: "Stainless steel multi-stage submersible and surface water pumps paired with vector VFD MPPT controllers for dependable daylight farm irrigation without recurring diesel or electricity bills.",
    capacityRange: "3 HP — 20 HP",
    image: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1200&q=80",
    fallbackImage: "/images/hero_solar_panels.jpg",
    icon: <Tractor className="w-4 h-4" />,
    badge: "60% PM-KUSUM Subsidy",
    stats: [
      { value: "60%", label: "PM-KUSUM Subsidy" },
      { value: "3.5L LPD", label: "Daily Water Yield" },
      { value: "₹0", label: "Lifetime Fuel Cost" }
    ],
    keyPoints: [
      "Discharge volume up to 350,000 Liters per day in sunlight",
      "Deep well head lift capability up to 600+ feet",
      "PM-KUSUM Component-B subsidy assistance and portal claim",
      "Built-in dry-run sensor protection and lightning surge arresters"
    ],
    link: "/solutions/agricultural"
  },
  {
    id: "heaters",
    tabLabel: "Water Heaters",
    sectorTag: "Domestic & Commercial Thermal",
    title: "Solar Thermal Water Heaters",
    description: "High-retention 3-target ETC vacuum tube solar water heaters with 50mm high-density PUF insulation and food-grade stainless steel inner tanks for 48+ hours hot water storage.",
    capacityRange: "110L — 500L+",
    image: "https://images.unsplash.com/photo-1545208942-e1c9c916524b?auto=format&fit=crop&w=1200&q=80",
    fallbackImage: "/images/hero_rooftop_solar.jpg",
    icon: <Sun className="w-4 h-4" />,
    badge: "SS316 Food-Grade Tank",
    stats: [
      { value: "48+ Hrs", label: "Thermal Heat Retention" },
      { value: "80%", label: "Geyser Power Savings" },
      { value: "5 Yrs", label: "Comprehensive Warranty" }
    ],
    keyPoints: [
      "48+ Hours thermal heat retention with 50mm PUF insulation",
      "Non-welding inner tank build preventing seam corrosion",
      "Compatible with hard water and pressurized booster pumps",
      "Rust-proof powder coated outer casing with UV guard"
    ],
    link: "/products/solar-water-heaters"
  },
  {
    id: "storage",
    tabLabel: "Energy Storage",
    sectorTag: "Battery Backup & Microgrids",
    title: "LiFePO4 Energy Storage Systems",
    description: "Modular Lithium Iron Phosphate (LiFePO4) battery banks with active cell-balancing BMS, sub-10ms automatic UPS power transfer, and peak-demand penalty shaving for continuous operation.",
    capacityRange: "5 kWh — 200 kWh+",
    image: "https://images.unsplash.com/photo-1558441719-8b489c6340c4?auto=format&fit=crop&w=1200&q=80",
    fallbackImage: "/images/hero_dark_ambient.jpg",
    icon: <Battery className="w-4 h-4" />,
    badge: "100% Blackout Immunity",
    stats: [
      { value: "< 10ms", label: "Auto UPS Transfer" },
      { value: "6,000+", label: "Deep Cycle Life" },
      { value: "99.99%", label: "Power Reliability" }
    ],
    keyPoints: [
      "Sub-10ms automatic UPS transfer for seamless power continuity",
      "Safe non-combustible Lithium Iron Phosphate chemistry",
      "Active CAN/RS485 smart BMS cell balancing and protection",
      "Modular design stackable up to 200 kWh+ capacity"
    ],
    link: "/solutions/energy-storage"
  }
];

export const EnergyEcosystem: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState<string>("residential");

  const currentTab =
    solutionsData.find((tab) => tab.id === activeTabId) || solutionsData[0];

  return (
    <section
      className="pt-16 pb-10 sm:pt-20 sm:pb-12 bg-[#0A0A0E] relative overflow-hidden border-t border-red-950/60"
      id="solutions"
    >
      {/* ── Ambient Radial Glows ── */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none opacity-40" />

      {/* Top Edge Conduit Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-[1px] bg-gradient-to-r from-transparent via-red-500/40 to-transparent pointer-events-none" />

      <div className="site-container relative z-10 space-y-8 sm:space-y-10">
        
        {/* ── Section Header ── */}
        <ScrollReveal animation="slide-up">
          <div className="text-center max-w-4xl mx-auto space-y-4">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-extrabold tracking-widest uppercase bg-red-950/80 text-rose-300 border border-red-500/40 shadow-xs font-mono mx-auto">
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>THE COMPLETE SOLAR ECOSYSTEM</span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] uppercase">
              ENGINEERED SOLAR SOLUTIONS FOR{" "}
              <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent block sm:inline">
                EVERY SECTOR
              </span>
            </h2>

            {/* Subtext */}
            <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Decade-proven turnkey engineering delivering maximum kilowatt-hour generation, PM Surya Ghar subsidies, and guaranteed ROI across Tamil Nadu.
            </p>

            {/* ── Sleek Segment Tab Switcher (Symmetrical & Clean) ── */}
            <div className="pt-4 max-w-4xl mx-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 p-1.5 rounded-2xl bg-[#130E1A] border border-red-950/70 shadow-inner">
                {solutionsData.map((tab) => {
                  const isActive = activeTabId === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTabId(tab.id)}
                      className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer text-center ${
                        isActive
                          ? "bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-950/60 scale-[1.02]"
                          : "text-slate-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <span className={isActive ? "text-white" : "text-slate-400"}>
                        {tab.icon}
                      </span>
                      <span className="truncate">{tab.tabLabel}</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </ScrollReveal>

        {/* ── Main Showcase Area (Seamless Background Integration) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center pt-2">
          
          {/* Left Column: Solution Detail, Specs & Action CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Sector Tag & Capacity Pill */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#14101A] text-white border border-red-900/60 shadow-sm">
                {currentTab.icon}
                <span>{currentTab.sectorTag}</span>
              </span>

              <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-amber-950/90 text-amber-300 border border-amber-500/40 shadow-sm">
                {currentTab.badge}
              </span>

              <span className="px-3 py-1.5 rounded-xl text-xs font-mono font-bold bg-[#14101A] text-slate-300 border border-red-950/70">
                Capacity: {currentTab.capacityRange}
              </span>
            </div>

            {/* Title & Description */}
            <div className="space-y-3">
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.12]">
                {currentTab.title}
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal max-w-2xl">
                {currentTab.description}
              </p>
            </div>

            {/* 3 Metric Stats (Clean Glass Boxes) */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {currentTab.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-2xl bg-[#14101A] border border-red-950/70 hover:border-red-500/40 transition-colors shadow-md text-center sm:text-left"
                >
                  <span className="text-[10px] sm:text-xs font-mono text-slate-400 uppercase block truncate">
                    {stat.label}
                  </span>
                  <strong className="text-xl sm:text-2xl lg:text-3xl font-black text-white font-mono block mt-1">
                    {stat.value}
                  </strong>
                </div>
              ))}
            </div>

            {/* Key Highlights Checklist */}
            <div className="space-y-2.5 pt-2 border-t border-red-950/60">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentTab.keyPoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                    <div className="w-4 h-4 rounded-full bg-red-950/90 border border-red-500/50 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 text-rose-300" />
                    </div>
                    <span className="leading-snug">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href={currentTab.link}
                className="btn-primary py-4 px-7 text-xs sm:text-sm font-black inline-flex items-center gap-2.5 shadow-xl"
              >
                <span>Explore Engineering Specs</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/get-a-quote"
                className="py-4 px-6 rounded-xl bg-[#14101A] hover:bg-slate-800 text-slate-200 font-bold text-xs sm:text-sm transition-all border border-red-950/60 hover:border-red-500/40 hover:text-white inline-flex items-center gap-2"
              >
                <Calculator className="w-4 h-4 text-amber-400" />
                <span>Get Free Feasibility Quote</span>
              </Link>
            </div>

          </div>

          {/* Right Column: High-Impact Photography Showcase Frame */}
          <div className="lg:col-span-5 flex">
            <div className="relative w-full h-[380px] sm:h-[460px] lg:h-[500px] rounded-3xl overflow-hidden bg-slate-900 border border-red-900/40 shadow-2xl group flex flex-col justify-between p-6">
              
              {/* Background Image */}
              <img
                src={currentTab.image}
                alt={currentTab.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (target.src !== currentTab.fallbackImage) {
                    target.src = currentTab.fallbackImage;
                  }
                }}
              />

              {/* Dark Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0E] via-transparent to-black/30 pointer-events-none" />

              {/* Top Badge: Verified Partner */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-[#0A0A0E]/90 backdrop-blur-md text-white border border-white/15 shadow-lg inline-flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>MNRE Approved Partner</span>
                </span>

                <span className="px-3 py-1.5 rounded-xl text-xs font-mono font-bold bg-red-950/90 text-rose-300 border border-red-500/40 backdrop-blur-md">
                  {currentTab.capacityRange}
                </span>
              </div>

              {/* Bottom Floating Telemetry Card */}
              <div className="relative z-10 p-4 rounded-2xl bg-[#0A0A0E]/90 backdrop-blur-md border border-red-900/50 shadow-2xl space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono uppercase text-[10px]">
                    Guaranteed Output SLA
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-500/30">
                    Tier-1 Hardware
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-bold text-white leading-snug">
                  Turnkey Engineering • Net Metering Approval • Lifetime O&M
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* ── Centered Bottom Engineering Feasibility Strip ── */}
        <div className="pt-6 border-t border-red-950/60 flex flex-col items-center justify-center text-center space-y-4 max-w-3xl mx-auto">
          <div className="space-y-1.5">
            <h4 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Not sure which solar capacity fits your roof or land?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
              Request an on-site 3D shadow analysis and customized financial payback roadmap from our senior engineers.
            </p>
          </div>

          <div className="flex items-center justify-center pt-0.5">
            <Link
              href="/get-a-quote"
              className="btn-primary py-3.5 px-7 text-xs sm:text-sm font-black inline-flex items-center gap-2 shadow-xl hover:scale-105 transition-transform"
            >
              <span>Get Free Site Feasibility</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default EnergyEcosystem;
