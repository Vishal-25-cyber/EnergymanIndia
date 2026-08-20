import React, { useState } from "react";
import { Sun, Droplets, ShieldCheck, Thermometer, Zap, Layers, ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { ScrollReveal } from "./ScrollReveal";

interface WaterHeaterCapacity {
  volume: string;
  idealFor: string;
  tubes: number;
  dailySavingUnits: string;
}

const capacities: WaterHeaterCapacity[] = [
  { volume: "110L", idealFor: "2 - 3 Family Members", tubes: 10, dailySavingUnits: "3 - 4 kWh" },
  { volume: "165L", idealFor: "4 - 5 Family Members", tubes: 15, dailySavingUnits: "5 - 6 kWh" },
  { volume: "220L", idealFor: "6 - 7 Family Members", tubes: 20, dailySavingUnits: "7 - 8 kWh" },
  { volume: "275L", idealFor: "8 - 10 Family Members", tubes: 25, dailySavingUnits: "9 - 11 kWh" },
  { volume: "330L", idealFor: "Luxury Villas & Large Homes", tubes: 30, dailySavingUnits: "12 - 14 kWh" }
];

export const SolarWaterHeaterInteractive: React.FC = () => {
  const [selectedVolIdx, setSelectedVolIdx] = useState<number>(1); // Default 165L
  const selectedCap = capacities[selectedVolIdx];

  return (
    <section className="section-padding bg-[#0A0A0E] relative overflow-hidden border-t border-red-950/60" id="water-heater">
      
      {/* Background Watermark */}
      <div className="absolute top-1/3 right-0 text-[12vw] font-black text-white/[0.015] tracking-widest pointer-events-none select-none uppercase font-sans">
        THERMAL
      </div>

      <div className="site-container relative z-10 space-y-14">
        
        {/* Section Header */}
        <ScrollReveal animation="slide-up">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold tracking-widest uppercase bg-amber-950/80 text-amber-300 border border-amber-500/40 shadow-xs font-mono">
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>SOLAR THERMAL ENGINEERING</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              NON-PRESSURIZED <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">SOLAR WATER HEATER</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              Precision-crafted mild steel glass-lined tanks with 50mm injected PUF insulation and non-welding joint technology for lifetime leak protection.
            </p>
          </div>
        </ScrollReveal>

        {/* ── Capacity Selector Tabs ── */}
        <div className="flex items-center justify-center gap-3 overflow-x-auto pb-2">
          {capacities.map((cap, idx) => {
            const isSelected = selectedVolIdx === idx;
            return (
              <button
                key={cap.volume}
                onClick={() => setSelectedVolIdx(idx)}
                className={`px-5 py-3 rounded-2xl border text-center transition-all cursor-pointer ${
                  isSelected
                    ? "bg-red-950/90 border-red-500/80 text-white shadow-lg shadow-red-500/20 scale-105"
                    : "bg-[#14101A]/80 border-red-950/60 text-slate-400 hover:text-slate-200 hover:border-red-500/40"
                }`}
              >
                <strong className="text-lg font-black font-mono block">
                  {cap.volume}
                </strong>
                <span className="text-[11px] font-medium text-slate-400 block">
                  {cap.idealFor}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Main Interactive Visualization Box ── */}
        <div className="bg-[#14101A]/95 border border-red-900/40 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Visual Silhouette & Technical Callout Pins (6 Cols) */}
            <div className="lg:col-span-6 relative">
              
              <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-red-950/60 shadow-xl p-8 flex flex-col items-center justify-center min-h-[360px]">
                
                {/* SVG Silhouette of Solar Water Heater */}
                <svg
                  viewBox="0 0 320 220"
                  className="w-full h-auto max-h-[220px] drop-shadow-xl"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="swh-tank" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#E63946" />
                      <stop offset="100%" stopColor="#9B111E" />
                    </linearGradient>
                    <linearGradient id="swh-tube" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#1E293B" />
                      <stop offset="100%" stopColor="#0F172A" />
                    </linearGradient>
                  </defs>

                  {/* Mounting Legs */}
                  <line x1="60" y1="90" x2="20" y2="190" stroke="#64748B" strokeWidth="4" strokeLinecap="round" />
                  <line x1="260" y1="90" x2="300" y2="190" stroke="#64748B" strokeWidth="4" strokeLinecap="round" />
                  <line x1="20" y1="190" x2="300" y2="190" stroke="#475569" strokeWidth="3" />
                  <line x1="60" y1="90" x2="260" y2="90" stroke="#475569" strokeWidth="3" />

                  {/* Evacuated Vacuum Tubes Array */}
                  {[...Array(12)].map((_, tIdx) => {
                    const x = 70 + tIdx * 15;
                    return (
                      <line
                        key={tIdx}
                        x1={x}
                        y1="75"
                        x2={x + 30}
                        y2="175"
                        stroke="url(#swh-tube)"
                        strokeWidth="8"
                        strokeLinecap="round"
                      />
                    );
                  })}

                  {/* Main Storage Tank Cylinder */}
                  <rect x="50" y="45" width="220" height="40" rx="10" fill="url(#swh-tank)" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.5" />
                  
                  {/* Assistant / Gravity Feed Tank */}
                  <rect x="70" y="25" width="40" height="22" rx="4" fill="#9B111E" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.4" />
                  <line x1="90" y1="47" x2="90" y2="52" stroke="#FFFFFF" strokeWidth="2" />

                  {/* Measurement Callout Lines */}
                  <circle cx="90" cy="35" r="4" fill="#F59E0B" className="animate-ping" />
                  <circle cx="90" cy="35" r="3" fill="#FFFFFF" />

                  <circle cx="160" cy="65" r="4" fill="#F59E0B" className="animate-ping" />
                  <circle cx="160" cy="65" r="3" fill="#FFFFFF" />

                  <circle cx="190" cy="130" r="4" fill="#F59E0B" className="animate-ping" />
                  <circle cx="190" cy="130" r="3" fill="#FFFFFF" />
                </svg>

                {/* Live Selected Volume Badge */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-black/80 backdrop-blur-md p-3 rounded-xl border border-white/20 text-xs">
                  <span className="text-slate-300 font-bold">Configured Tank:</span>
                  <strong className="text-amber-400 font-black font-mono">{selectedCap.volume} ({selectedCap.tubes} Vacuum Tubes)</strong>
                </div>
              </div>

            </div>

            {/* Right Column: 8 Factual Technical Specifications (6 Cols) */}
            <div className="lg:col-span-6 space-y-5">
              
              <div className="space-y-1">
                <span className="badge-amber text-xs font-bold font-mono">
                  TANK VOLUME: {selectedCap.volume}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  Technical Specifications
                </h3>
                <p className="text-xs text-slate-400">
                  Engineered strictly in accordance with MNRE and BIS standards.
                </p>
              </div>

              {/* Factual Specs Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {[
                  { label: "Inner Tank", val: "Mild Steel Glass-Lined Anti-Corrosive" },
                  { label: "Outer Tank", val: "High-Grade Powder-Coated Finish" },
                  { label: "Insulation", val: "50 mm Injected CFC-Free PUF" },
                  { label: "Sealing Tech", val: "Non-Welding Joint with Silicon Washers" },
                  { label: "Feeding Mechanism", val: "Gravity Feeding / Assistant Tank" },
                  { label: "Backup Heater", val: "Optional 2KW / 3KW Incoloy Element" },
                  { label: "Thermal Retention", val: "Maintains Hot Water for 48+ Hours" },
                  { label: "Warranty", val: "5-Year Comprehensive Warranty" }
                ].map((spec, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-3 rounded-xl bg-slate-900/90 border border-red-950/60 space-y-0.5"
                  >
                    <span className="text-[10px] font-bold text-slate-400 uppercase font-mono block">
                      {spec.label}
                    </span>
                    <strong className="text-xs text-slate-100 block font-semibold">
                      {spec.val}
                    </strong>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="pt-2 flex items-center justify-between">
                <Link
                  to="/products/solar-water-heaters"
                  className="btn-primary py-3 px-6 text-xs sm:text-sm font-bold inline-flex items-center gap-2"
                >
                  <span>Explore Water Heater Catalogue</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/get-a-quote"
                  className="text-xs font-bold text-slate-400 hover:text-white"
                >
                  Get Pricing →
                </Link>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default SolarWaterHeaterInteractive;
