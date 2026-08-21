import React, { useState } from "react";
import { Sun, ShieldCheck, Zap, ArrowRight, CheckCircle2 } from "lucide-react";
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
    <section className="py-16 sm:py-24 bg-gradient-to-b from-[#0A0A0E] via-[#100D16] to-[#0A0A0E] relative overflow-hidden border-t border-red-950/60" id="water-heater">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-35" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10 sm:space-y-12">
        
        {/* ── Centered Section Header ── */}
        <ScrollReveal animation="slide-up">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold tracking-widest uppercase bg-red-950/80 text-rose-300 border border-red-500/40 shadow-xs font-mono">
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>SOLAR THERMAL ENGINEERING</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
              NON-PRESSURIZED{" "}
              <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">
                SOLAR WATER HEATER
              </span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
              Precision-crafted mild steel glass-lined tanks with 50mm injected PUF insulation and non-welding joint technology for lifetime leak protection.
            </p>

            {/* Capacity Selector Tabs Centered */}
            <div className="pt-3 flex flex-wrap items-center justify-center gap-2.5">
              {capacities.map((cap, idx) => {
                const isSelected = selectedVolIdx === idx;
                return (
                  <button
                    key={cap.volume}
                    type="button"
                    onClick={() => setSelectedVolIdx(idx)}
                    className={`px-4 py-2.5 rounded-2xl border text-center transition-all cursor-pointer ${
                      isSelected
                        ? "bg-red-950/90 border-red-500 text-white shadow-lg shadow-red-950/80 scale-105"
                        : "bg-[#14101A]/80 border-red-950/60 text-slate-300 hover:border-red-500/40 hover:text-white"
                    }`}
                  >
                    <strong className="text-sm font-black font-mono block">
                      {cap.volume}
                    </strong>
                    <span className="text-[10px] text-slate-400 block font-normal">
                      {cap.idealFor}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* ── Symmetrical 2-Column Command Center (Sitting Directly on Background) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* Left Column: Visual Silhouette (6 Cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
            
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#14101A] via-slate-900 to-[#14101A] border border-red-900/40 shadow-xl p-8 flex flex-col items-center justify-center min-h-[360px] flex-1">
              
              {/* SVG Silhouette of Solar Water Heater */}
              <svg
                viewBox="0 0 320 220"
                className="w-full h-auto max-h-[220px] drop-shadow-2xl"
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
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-black/80 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10 text-xs">
                <span className="text-slate-300 font-bold font-mono">Selected Tank Configuration:</span>
                <strong className="text-amber-300 font-black font-mono">{selectedCap.volume} ({selectedCap.tubes} Vacuum Tubes)</strong>
              </div>
            </div>

          </div>

          {/* Right Column: 8 Factual Technical Specifications (6 Cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
            
            <div className="space-y-1 pb-2 border-b border-red-950/60">
              <span className="text-xs font-bold text-amber-400 uppercase font-mono tracking-wider">
                TANK VOLUME: {selectedCap.volume}
              </span>
              <h3 className="text-xl font-black text-white">
                Technical Specifications &amp; Engineering
              </h3>
              <p className="text-xs text-slate-300">
                Engineered strictly in accordance with MNRE and BIS solar thermal standards.
              </p>
            </div>

            {/* Factual Specs Checklist (Cardless Seamless Layout) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1 text-xs">
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
                  className="py-2.5 border-b border-red-950/40 flex justify-between items-center"
                >
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                    {spec.label}:
                  </span>
                  <strong className="text-xs text-white font-mono font-bold text-right">
                    {spec.val}
                  </strong>
                </div>
              ))}
            </div>

            {/* CTA Action */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Immediate delivery & rooftop installation across TN.</span>
              </div>

              <Link
                to="/get-a-quote?product=Solar%20Water%20Heater"
                className="btn-primary py-3 px-6 text-xs sm:text-sm font-black inline-flex items-center gap-2 shadow-xl shadow-red-600/30 hover:scale-105 transition-all w-full sm:w-auto justify-center"
              >
                <span>Request Quotation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default SolarWaterHeaterInteractive;
