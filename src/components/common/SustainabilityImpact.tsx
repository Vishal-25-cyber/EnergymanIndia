import React, { useState } from "react";
import { Trees, Globe, Flame, Zap, ShieldCheck, ArrowRight, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { ScrollReveal } from "./ScrollReveal";

export const SustainabilityImpact: React.FC = () => {
  const [capacityKw, setCapacityKw] = useState<number>(10);

  // Dynamic calculations based on capacity
  const annualGenerationKwh = capacityKw * 1500;
  const co2TonsReduced = (annualGenerationKwh * 0.82 / 1000).toFixed(1);
  const treesEquivalent = Math.round(annualGenerationKwh * 0.04);
  const coalSavedKg = Math.round(annualGenerationKwh * 0.4);
  const lifetimeFinancialSavings = Math.round(annualGenerationKwh * 8.5 * 25);

  return (
    <section className="section-padding bg-[#0A0A0E] relative overflow-hidden border-t border-red-950/60" id="sustainability">
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="site-container relative z-10">
        <ScrollReveal animation="slide-up">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold tracking-wider uppercase bg-red-950/80 text-rose-300 border border-red-500/40 shadow-xs">
              <Globe className="w-3.5 h-3.5 text-red-400" />
              <span>Real-Time Environmental & Economic Impact</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              MEASURE YOUR <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">CLEAN ENERGY IMPACT</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              Every solar kilowatt installed with ENERGYMAN displaces fossil fuels, lowers industrial emissions, and locks in 25 years of guaranteed free electricity.
            </p>
          </div>
        </ScrollReveal>

        {/* Interactive Impact Calculator Card */}
        <div className="bg-[#14101A]/95 border border-red-900/40 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl max-w-5xl mx-auto space-y-10">
          
          {/* Top Interactive Capacity Slider */}
          <div className="space-y-4 bg-slate-900/90 border border-red-950/60 p-6 rounded-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <label className="text-xs font-black uppercase tracking-wider text-slate-300 font-mono">
                  Select Solar Plant Sizing:
                </label>
                <p className="text-xs text-slate-400">Drag to forecast 25-year lifetime generation and carbon reduction</p>
              </div>
              <div className="inline-flex items-center gap-2 bg-red-950/90 border border-red-500/50 px-4 py-1.5 rounded-xl">
                <Zap className="w-4 h-4 text-amber-400" />
                <span className="text-lg font-black text-white font-mono">{capacityKw} kW</span>
                <span className="text-xs text-slate-400 font-bold">Capacity</span>
              </div>
            </div>

            <input
              type="range"
              min="3"
              max="100"
              step="1"
              value={capacityKw}
              onChange={(e) => setCapacityKw(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-500"
            />

            <div className="flex justify-between text-[11px] text-slate-400 font-mono">
              <span>3 kW (Residential Home)</span>
              <span>25 kW (Commercial Complex)</span>
              <span>100 kW (Industrial Factory)</span>
            </div>
          </div>

          {/* 4 Premium Impact Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Metric 1: CO2 Reduced */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-red-950/60 hover:border-red-500/50 transition-all space-y-2 group">
              <div className="p-2.5 rounded-xl bg-red-950/80 border border-red-500/40 text-red-400 w-fit group-hover:scale-110 transition-transform">
                <Globe className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-400 block uppercase font-mono">Annual CO₂ Offset</span>
              <strong className="text-2xl sm:text-3xl font-black text-white block font-mono">
                {co2TonsReduced} <span className="text-sm font-normal text-slate-400">Tons/Yr</span>
              </strong>
              <p className="text-[11px] text-slate-400">Clean atmospheric displacement</p>
            </div>

            {/* Metric 2: Clean Generation */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-red-950/60 hover:border-red-500/50 transition-all space-y-2 group">
              <div className="p-2.5 rounded-xl bg-amber-950/80 border border-amber-500/40 text-amber-400 w-fit group-hover:scale-110 transition-transform">
                <Zap className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-400 block uppercase font-mono">Annual Clean Units</span>
              <strong className="text-2xl sm:text-3xl font-black text-amber-400 block font-mono">
                {annualGenerationKwh.toLocaleString()} <span className="text-sm font-normal text-slate-400">kWh</span>
              </strong>
              <p className="text-[11px] text-slate-400">Solar rooftop generation</p>
            </div>

            {/* Metric 3: Trees Equivalent */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-red-950/60 hover:border-red-500/50 transition-all space-y-2 group">
              <div className="p-2.5 rounded-xl bg-rose-950/80 border border-rose-500/40 text-rose-400 w-fit group-hover:scale-110 transition-transform">
                <Trees className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-400 block uppercase font-mono">Trees Equivalent</span>
              <strong className="text-2xl sm:text-3xl font-black text-rose-300 block font-mono">
                {treesEquivalent.toLocaleString()} <span className="text-sm font-normal text-slate-400">Trees</span>
              </strong>
              <p className="text-[11px] text-slate-400">Forest carbon sequestration</p>
            </div>

            {/* Metric 4: Coal Saved */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-red-950/60 hover:border-red-500/50 transition-all space-y-2 group">
              <div className="p-2.5 rounded-xl bg-red-950/80 border border-red-500/40 text-red-400 w-fit group-hover:scale-110 transition-transform">
                <Flame className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-400 block uppercase font-mono">Coal Displaced</span>
              <strong className="text-2xl sm:text-3xl font-black text-red-400 block font-mono">
                {coalSavedKg.toLocaleString()} <span className="text-sm font-normal text-slate-400">kg</span>
              </strong>
              <p className="text-[11px] text-slate-400">Fossil fuel burned avoided</p>
            </div>
          </div>

          {/* Lifetime 25-Year Economic Value Banner */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-gradient-to-r from-[#1C0B0E] via-[#2A050B] to-[#14101A] border border-red-500/30 shadow-lg">
            <div className="space-y-1">
              <span className="text-xs font-black uppercase tracking-wider text-amber-400 font-mono flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4" />
                25-Year Cumulative Financial Savings
              </span>
              <h4 className="text-2xl sm:text-3xl font-black text-white font-mono">
                ₹{lifetimeFinancialSavings.toLocaleString()} <span className="text-sm font-normal text-slate-300">Estimated Utility Savings</span>
              </h4>
            </div>

            <Link
              to="/get-a-quote"
              className="btn-primary py-3 px-6 text-xs sm:text-sm font-bold whitespace-nowrap inline-flex items-center gap-2 self-start md:self-auto"
            >
              <span>Get Site Feasibility Study</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SustainabilityImpact;
