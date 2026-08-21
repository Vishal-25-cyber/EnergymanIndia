"use client";
import React, { useState, useEffect } from "react";
import { Zap, ShieldCheck, Activity, Award, Sparkles, Sun } from "lucide-react";

export const GeometricEnergyVisual: React.FC = () => {
  const [generationWatts, setGenerationWatts] = useState(4820);
  const [efficiencyRate, setEfficiencyRate] = useState(98.8);
  const [activeFacet, setActiveFacet] = useState<number>(0);

  // Subtle live telemetry fluctuation for realistic engineering feel
  useEffect(() => {
    const interval = setInterval(() => {
      setGenerationWatts((prev) => {
        const delta = Math.floor(Math.random() * 25) - 12;
        return Math.max(4750, Math.min(4890, prev + delta));
      });
      setEfficiencyRate((prev) => {
        const delta = (Math.random() * 0.2 - 0.1);
        return Number((Math.max(98.4, Math.min(99.2, prev + delta))).toFixed(1));
      });
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-[540px] mx-auto select-none">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] bg-gradient-to-tr from-red-600/20 via-rose-500/10 to-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Polygonal / Geometric Card Frame */}
      <div className="relative rounded-3xl p-6 sm:p-8 bg-[#0D0B12]/95 border border-red-900/40 shadow-2xl backdrop-blur-xl overflow-hidden">
        
        {/* Subtle Geometric Diagonal Lines & Circuit Mesh */}
        <div className="absolute inset-0 opacity-15 pointer-events-none"
             style={{
               backgroundImage: `radial-gradient(circle at 2px 2px, #E63946 1px, transparent 0)`,
               backgroundSize: '24px 24px'
             }}
        />

        {/* Top Header Row of the Visual Core */}
        <div className="relative z-10 flex items-center justify-between border-b border-red-950/60 pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-red-950/80 border border-red-500/40 text-red-400 shadow-md">
              <Zap className="w-4 h-4 text-red-400 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-red-400 font-mono block">
                SMART PV ARRAY TELEMETRY
              </span>
              <h3 className="text-sm font-black text-white">High-Yield Crystalline Grid</h3>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/80 border border-red-500/40 text-rose-300 text-xs font-bold font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>ACTIVE</span>
          </div>
        </div>

        {/* ── Central Triangular Geometric Solar Facet Array (SVG) ── */}
        <div className="relative z-10 my-4 flex items-center justify-center">
          <svg
            viewBox="0 0 360 260"
            className="w-full h-auto max-h-[240px] drop-shadow-xl"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Crystalline Facet Gradients */}
              <linearGradient id="facet-red-1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E63946" />
                <stop offset="100%" stopColor="#B91C1C" />
              </linearGradient>

              <linearGradient id="facet-red-2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#9B111E" />
                <stop offset="100%" stopColor="#6A0D15" />
              </linearGradient>

              <linearGradient id="facet-amber" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#D97706" />
              </linearGradient>

              <linearGradient id="facet-white" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#F1F5F9" />
              </linearGradient>
            </defs>

            {/* Background Circuit Grid Lines */}
            <line x1="30" y1="130" x2="330" y2="130" stroke="#B91C1C" strokeWidth="0.8" strokeDasharray="4 4" opacity="0.3" />
            <line x1="180" y1="20" x2="180" y2="240" stroke="#B91C1C" strokeWidth="0.8" strokeDasharray="4 4" opacity="0.3" />
            <circle cx="180" cy="130" r="90" stroke="#E63946" strokeWidth="1" strokeDasharray="6 6" opacity="0.25" />

            {/* Geometric Pyramid / Polygonal Solar Facets */}
            {/* Top Apex Triangle */}
            <polygon
              points="180,30 135,100 225,100"
              fill={activeFacet === 0 ? "url(#facet-amber)" : "url(#facet-red-1)"}
              stroke="#FFFFFF"
              strokeWidth="1.5"
              strokeOpacity="0.4"
              className="cursor-pointer transition-all duration-300 hover:opacity-90"
              onClick={() => setActiveFacet(0)}
            />

            {/* Middle Left Triangle */}
            <polygon
              points="135,105 90,175 180,175"
              fill={activeFacet === 1 ? "url(#facet-amber)" : "url(#facet-red-2)"}
              stroke="#FFFFFF"
              strokeWidth="1.5"
              strokeOpacity="0.4"
              className="cursor-pointer transition-all duration-300 hover:opacity-90"
              onClick={() => setActiveFacet(1)}
            />

            {/* Middle Center Inverted Triangle */}
            <polygon
              points="135,105 225,105 180,175"
              fill={activeFacet === 2 ? "url(#facet-amber)" : "url(#facet-white)"}
              stroke="#B91C1C"
              strokeWidth="1.5"
              className="cursor-pointer transition-all duration-300 hover:opacity-90"
              onClick={() => setActiveFacet(2)}
            />

            {/* Middle Right Triangle */}
            <polygon
              points="225,105 180,175 270,175"
              fill={activeFacet === 3 ? "url(#facet-amber)" : "url(#facet-red-1)"}
              stroke="#FFFFFF"
              strokeWidth="1.5"
              strokeOpacity="0.4"
              className="cursor-pointer transition-all duration-300 hover:opacity-90"
              onClick={() => setActiveFacet(3)}
            />

            {/* Bottom Row Triangular Nodes */}
            <polygon
              points="90,180 45,245 135,245"
              fill="url(#facet-red-2)"
              stroke="#FFFFFF"
              strokeWidth="1.2"
              strokeOpacity="0.3"
            />
            <polygon
              points="90,180 180,180 135,245"
              fill="url(#facet-red-1)"
              stroke="#FFFFFF"
              strokeWidth="1.2"
              strokeOpacity="0.3"
            />
            <polygon
              points="180,180 135,245 225,245"
              fill="url(#facet-white)"
              stroke="#B91C1C"
              strokeWidth="1.2"
            />
            <polygon
              points="180,180 270,180 225,245"
              fill="url(#facet-red-2)"
              stroke="#FFFFFF"
              strokeWidth="1.2"
              strokeOpacity="0.3"
            />
            <polygon
              points="270,180 225,245 315,245"
              fill="url(#facet-red-1)"
              stroke="#FFFFFF"
              strokeWidth="1.2"
              strokeOpacity="0.3"
            />

            {/* Glowing Active Vertex Nodes */}
            <circle cx="180" cy="30" r="4" fill="#F59E0B" className="animate-ping" />
            <circle cx="180" cy="30" r="3" fill="#FFFFFF" />
            <circle cx="135" cy="100" r="3" fill="#FFFFFF" />
            <circle cx="225" cy="100" r="3" fill="#FFFFFF" />
            <circle cx="180" cy="175" r="3.5" fill="#F59E0B" />
          </svg>
        </div>

        {/* Live Metrics Grid Footer */}
        <div className="relative z-10 grid grid-cols-3 gap-2.5 pt-4 border-t border-red-950/60">
          <div className="p-3 rounded-2xl bg-slate-900/90 border border-red-950/60 text-center">
            <span className="text-[10px] font-bold text-slate-400 block uppercase font-mono">Real-time Yield</span>
            <strong className="text-sm sm:text-base font-black text-white mt-0.5 block font-mono">
              {(generationWatts / 1000).toFixed(2)} kW
            </strong>
          </div>

          <div className="p-3 rounded-2xl bg-slate-900/90 border border-red-950/60 text-center">
            <span className="text-[10px] font-bold text-slate-400 block uppercase font-mono">PR Efficiency</span>
            <strong className="text-sm sm:text-base font-black text-amber-400 mt-0.5 block font-mono">
              {efficiencyRate}%
            </strong>
          </div>

          <div className="p-3 rounded-2xl bg-slate-900/90 border border-red-950/60 text-center">
            <span className="text-[10px] font-bold text-slate-400 block uppercase font-mono">Central DBT</span>
            <strong className="text-sm sm:text-base font-black text-red-400 mt-0.5 block font-mono">
              ₹78,000
            </strong>
          </div>
        </div>

        {/* Floating Trust Pill Badge */}
        <div className="mt-4 pt-3 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1.5 font-bold text-slate-300">
            <ShieldCheck className="w-4 h-4 text-red-400 shrink-0" />
            25-Yr Linear Generation SLA
          </span>
          <span className="text-[11px] font-mono text-red-400 font-bold bg-red-950/60 px-2 py-0.5 rounded-lg border border-red-900/40">
            SINCE 2016
          </span>
        </div>
      </div>
    </div>
  );
};

export default GeometricEnergyVisual;
