import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  Factory,
  Tractor,
  Zap,
  BatteryCharging,
  Sun,
  Droplets,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Layers
} from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

interface SolutionNode {
  id: string;
  title: string;
  category: string;
  shortDesc: string;
  fullDesc: string;
  icon: React.ReactNode;
  image: string;
  specs: string[];
  link: string;
}

const solutionNodes: SolutionNode[] = [
  {
    id: "residential",
    title: "Residential Solar",
    category: "Rooftop Systems",
    shortDesc: "Solar solutions for homes.",
    fullDesc: "Custom-engineered rooftop solar systems for independent houses, villas, and residential apartments. Slash grid electricity expenses by up to 90% with central PM Surya Ghar direct bank subsidy up to ₹78,000.",
    icon: <Home className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80",
    specs: ["1 kW to 10+ kW Capacity", "₹78,000 Direct DBT Subsidy", "Bi-Directional Net Metering", "25-Year Panel Warranty"],
    link: "/solutions/residential"
  },
  {
    id: "industrial",
    title: "Industrial Solar",
    category: "Commercial & Factories",
    shortDesc: "Large-scale solar solutions for factories and commercial establishments.",
    fullDesc: "High-capacity captive solar installations for textile mills, manufacturing plants, foundries, cold storage units, and commercial complexes with zero operational disruption and accelerated 40% tax depreciation.",
    icon: <Factory className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1000&q=80",
    specs: ["50 kW to 5+ MW Captive", "40% Accelerated Depreciation", "DG-PV Hybrid Synchronization", "Under 3-Year ROI"],
    link: "/solutions/industrial"
  },
  {
    id: "agricultural",
    title: "Agricultural Solar",
    category: "Irrigation & Farming",
    shortDesc: "Solar solutions for farmers, irrigation and agricultural applications.",
    fullDesc: "Daylight solar submersible and surface irrigation water pumps under PM-KUSUM. Eliminate diesel generator running expenses and power crops with uninterrupted daylight water pumping.",
    icon: <Tractor className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1000&q=80",
    specs: ["3 HP to 20 HP Solar Pumps", "Up to 60% PM-KUSUM Subsidy", "Borewells up to 600+ Feet", "Zero Diesel Dependency"],
    link: "/solutions/agricultural"
  },
  {
    id: "megawatt",
    title: "Megawatt Solar Park",
    category: "Utility Scale",
    shortDesc: "Large-scale solar infrastructure.",
    fullDesc: "Utility-scale ground-mount solar power plants engineered for high specific energy yield (kWh/kWp), automated tracking systems, HT evacuation substations, and long-term transmission wheeling.",
    icon: <Zap className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1000&q=80",
    specs: ["1 MW to 50+ MW Infrastructure", "HT Transmission Substation", "Automated Single-Axis Trackers", "Fiber SCADA Telemetry"],
    link: "/solutions/industrial"
  },
  {
    id: "independent-power",
    title: "Independent Power",
    category: "Microgrids & Storage",
    shortDesc: "Independent captive power solutions.",
    fullDesc: "Microgrids and off-grid hybrid power solutions integrating LiFePO4 battery storage, solar PV arrays, and automated backup generators for 100% grid-independent energy security.",
    icon: <BatteryCharging className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1558441719-8b489c6340c4?auto=format&fit=crop&w=1000&q=80",
    specs: ["LiFePO4 Modular Storage", "Seamless 10ms UPS Transfer", "100% Off-Grid Capability", "Zero Blackout Risk"],
    link: "/solutions/energy-storage"
  },
  {
    id: "solar-water-heater",
    title: "Solar Water Heater",
    category: "Domestic & Industry",
    shortDesc: "Domestic and industrial solar water-heating solutions.",
    fullDesc: "High-retention non-pressurized and pressurized solar thermal water heaters in tank volumes 110L, 165L, 220L, 275L, and 330L with mild steel glass-lined tanks, 50mm PUF insulation, and non-welding technology.",
    icon: <Sun className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80",
    specs: ["110L / 165L / 220L / 275L / 330L", "Mild Steel Glass-Lined Tank", "50mm High-Density PUF", "Optional 2KW/3KW Backup"],
    link: "/products/solar-water-heaters"
  },
  {
    id: "solar-pump",
    title: "Solar Pump Solutions",
    category: "Pumping Technology",
    shortDesc: "Solar pumping solutions.",
    fullDesc: "Engineered multi-stage stainless steel submersible and surface pumps with vector MPPT controllers, dry-run protection, and GSM remote mobile starter technology.",
    icon: <Droplets className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1000&q=80",
    specs: ["SS304/SS316 Stainless Steel", "Vector MPPT VFD Controller", "Dry-Run Sensor Protection", "GSM Remote Mobile Starter"],
    link: "/products/solar-pumps"
  }
];

export const EnergyEcosystem: React.FC = () => {
  const [activeNode, setActiveNode] = useState<SolutionNode>(solutionNodes[0]);

  return (
    <section className="section-padding bg-[#0A0A0E] relative overflow-hidden border-t border-red-950/60" id="solutions">
      
      {/* Background Watermark */}
      <div className="absolute top-1/4 right-0 text-[12vw] font-black text-white/[0.015] tracking-widest pointer-events-none select-none uppercase font-sans">
        SOLUTIONS
      </div>

      <div className="site-container relative z-10 space-y-12 sm:space-y-16">
        
        {/* Section Header */}
        <ScrollReveal animation="slide-up">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold tracking-widest uppercase bg-red-950/80 text-rose-300 border border-red-500/40 shadow-xs font-mono">
              <Layers className="w-3.5 h-3.5 text-red-400" />
              <span>THE ENERGY ECOSYSTEM</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              INTERACTIVE <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">ENERGY GRID</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              Select any node in the EnergyMan network to inspect custom engineering specifications, capacities, and sector-specific financial returns.
            </p>
          </div>
        </ScrollReveal>

        {/* ── Interactive Energy Map: Nodes Grid & Active Showcase ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Solution Selector Nodes (5 Cols) */}
          <div className="lg:col-span-5 space-y-2.5">
            {solutionNodes.map((node) => {
              const isActive = activeNode.id === node.id;
              return (
                <button
                  key={node.id}
                  onClick={() => setActiveNode(node)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between group cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-red-950/90 via-[#1C1625] to-[#14101A] border-red-500/80 shadow-lg shadow-red-500/20 translate-x-2"
                      : "bg-[#14101A]/80 hover:bg-[#1C1625] border-red-950/60 hover:border-red-500/40"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`p-2.5 rounded-xl border transition-colors ${
                      isActive
                        ? "bg-red-500 text-white border-red-400"
                        : "bg-slate-900 text-slate-300 border-red-950/60 group-hover:text-red-400 group-hover:border-red-500/40"
                    }`}>
                      {node.icon}
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase font-mono block">
                        {node.category}
                      </span>
                      <h3 className={`text-sm sm:text-base font-black transition-colors ${
                        isActive ? "text-white" : "text-slate-200 group-hover:text-red-400"
                      }`}>
                        {node.title}
                      </h3>
                    </div>
                  </div>

                  <ArrowRight className={`w-4 h-4 transition-all ${
                    isActive ? "text-red-400 translate-x-1" : "text-slate-500 group-hover:text-slate-300"
                  }`} />
                </button>
              );
            })}
          </div>

          {/* Right Column: Active Node Deep Dive Card (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="bg-[#14101A]/95 border border-red-900/40 rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 space-y-6 relative group">
              
              {/* Subtle Red Circuit Glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-red-600/10 rounded-full blur-2xl pointer-events-none" />

              {/* Image Frame */}
              <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden bg-slate-900 border border-red-950/60 shadow-md">
                <img
                  src={activeNode.image}
                  alt={activeNode.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#14101A] via-transparent to-transparent" />
                
                <span className="badge-crimson absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md shadow-md">
                  {activeNode.category}
                </span>
              </div>

              {/* Node Content */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-red-950/60 pb-3">
                  <h3 className="text-2xl sm:text-3xl font-black text-white">
                    {activeNode.title}
                  </h3>
                  <span className="text-xs font-mono font-bold text-red-400 bg-red-950/60 px-2.5 py-1 rounded-lg border border-red-900/40">
                    TURNKEY EPC
                  </span>
                </div>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {activeNode.fullDesc}
                </p>

                {/* 4 Feature Spec Badges */}
                <div className="grid grid-cols-2 gap-2.5 pt-2">
                  {activeNode.specs.map((spec, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-3 rounded-xl bg-slate-900/90 border border-red-950/60 flex items-center gap-2 text-xs font-bold text-slate-200"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-red-500 shrink-0" />
                      <span className="line-clamp-1">{spec}</span>
                    </div>
                  ))}
                </div>

                {/* Action Link */}
                <div className="pt-4 flex items-center justify-between">
                  <Link
                    to={activeNode.link}
                    className="btn-primary py-3 px-6 text-xs sm:text-sm font-bold inline-flex items-center gap-2"
                  >
                    <span>View Technical Details & Case Studies</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    to="/get-a-quote"
                    className="text-xs font-bold text-slate-400 hover:text-white transition-colors"
                  >
                    Request Custom Quote →
                  </Link>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default EnergyEcosystem;
