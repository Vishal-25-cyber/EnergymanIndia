import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Calculator,
  ArrowRight,
  Home,
  Building2,
  Tractor,
  Sun,
  ShieldCheck,
  Clock,
  CheckCircle2,
  TrendingUp
} from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

export const SavingsCalculator: React.FC = () => {
  const [propertyType, setPropertyType] = useState<"residential" | "commercial" | "agricultural">("residential");
  const [monthlyBill, setMonthlyBill] = useState<number>(4500);

  // Quick preset bill amounts
  const billPresets = useMemo(() => {
    if (propertyType === "residential") return [2000, 3500, 4500, 7000, 12000, 20000];
    if (propertyType === "commercial") return [10000, 25000, 50000, 100000, 200000];
    return [3000, 6000, 12000, 25000, 50000];
  }, [propertyType]);

  // Dynamic calculations based on industry tariffs and solar generation averages
  const calculation = useMemo(() => {
    let tariffPerUnit = 7.0; // Residential average slab in Tamil Nadu
    if (propertyType === "commercial") tariffPerUnit = 9.5;
    if (propertyType === "agricultural") tariffPerUnit = 6.0;

    // Monthly units consumed
    const monthlyUnits = monthlyBill / tariffPerUnit;
    const dailyUnits = monthlyUnits / 30;

    // Recommended kW sizing (1 kW generates ~4.2 units/day in South India)
    let recommendedKw = Math.ceil((dailyUnits / 4.2) * 10) / 10;
    if (propertyType === "residential" && recommendedKw < 2) recommendedKw = 2;
    if (propertyType === "commercial" && recommendedKw < 10) recommendedKw = 10;
    if (propertyType === "agricultural" && recommendedKw < 3) recommendedKw = 3;

    // Annual generation (kWh)
    const annualGenerationKwh = Math.round(recommendedKw * 1480);
    const dailyGenerationUnits = (recommendedKw * 4.2).toFixed(1);

    // Approximate System Base Cost (₹ / watt benchmark)
    let benchmarkCostPerKw = 60000;
    if (propertyType === "commercial") benchmarkCostPerKw = 50000;
    if (propertyType === "agricultural") benchmarkCostPerKw = 55000;

    const estimatedSystemCost = Math.round(recommendedKw * benchmarkCostPerKw);

    // Central Government Subsidy Deduction
    let subsidyAmount = 0;
    let subsidyLabel = "PM Surya Ghar Direct Subsidy";
    if (propertyType === "residential") {
      if (recommendedKw >= 3) {
        subsidyAmount = 78000;
        subsidyLabel = "₹78,000 Direct PM Surya Ghar Subsidy";
      } else if (recommendedKw >= 2) {
        subsidyAmount = 60000;
        subsidyLabel = "₹60,000 Direct PM Surya Ghar Subsidy";
      } else {
        subsidyAmount = 30000;
        subsidyLabel = "₹30,000 Direct PM Surya Ghar Subsidy";
      }
    } else if (propertyType === "agricultural") {
      subsidyAmount = Math.round(estimatedSystemCost * 0.6); // 60% PM-KUSUM subsidy
      subsidyLabel = "Up to 60% PM-KUSUM Subsidy";
    } else {
      subsidyLabel = "40% Accelerated Tax Depreciation";
    }

    const netSystemCost = Math.max(estimatedSystemCost - subsidyAmount, 10000);

    // Annual Bill Savings
    const annualSavingsRs = Math.round(annualGenerationKwh * tariffPerUnit);
    const monthlySavingsRs = Math.round(annualSavingsRs / 12);

    // Payback period (Years)
    const paybackYears = (netSystemCost / annualSavingsRs).toFixed(1);

    // 25-Year Cumulative Savings
    let lifetimeSavings = 0;
    let currentAnnualSaving = annualSavingsRs;
    for (let yr = 1; yr <= 25; yr++) {
      lifetimeSavings += currentAnnualSaving;
      currentAnnualSaving *= 1.03; // 3% annual grid tariff inflation
    }
    const lifetimeSavingsLakhs = (lifetimeSavings / 100000).toFixed(1);
    const spaceRequiredSqft = Math.round(recommendedKw * 85);

    return {
      recommendedKw,
      dailyGenerationUnits,
      annualGenerationKwh,
      subsidyAmount,
      subsidyLabel,
      annualSavingsRs,
      monthlySavingsRs,
      paybackYears,
      lifetimeSavingsLakhs,
      spaceRequiredSqft
    };
  }, [monthlyBill, propertyType]);

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-[#0A0A0E] via-[#120E18] to-[#0A0A0E] relative overflow-hidden border-t border-red-950/60" id="calculator">
      
      {/* Background Ambient Glows & Dot Texture */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-35" />

      {/* Full Width Site Container */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10 sm:space-y-12">
        
        {/* ── Section Header ── */}
        <ScrollReveal animation="slide-up">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold tracking-widest uppercase bg-red-950/80 text-rose-300 border border-red-500/40 shadow-xs font-mono">
              <Calculator className="w-3.5 h-3.5 text-red-400" />
              <span>INSTANT SOLAR SAVINGS FORECAST</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
              CALCULATE YOUR{" "}
              <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">
                SOLAR SAVINGS
              </span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
              Select your property type and monthly bill to see your custom solar system size, government subsidy, and estimated 25-year financial returns.
            </p>
          </div>
        </ScrollReveal>

        {/* ── Full-Width 2-Column Symmetrical Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* Left Column: Interactive Input & Sizing (6 Cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            
            {/* 1. Property Type Selector */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-wider">
                  1. Select Property Type
                </span>
                <span className="text-xs text-slate-400 font-mono">Tamil Nadu / TANGEDCO</span>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setPropertyType("residential");
                    setMonthlyBill(4500);
                  }}
                  className={`flex flex-col items-center justify-center p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                    propertyType === "residential"
                      ? "bg-red-950/90 border-red-500 text-white shadow-lg shadow-red-950/80"
                      : "bg-[#14101A]/80 border-red-950/60 text-slate-300 hover:border-red-900/60 hover:text-white"
                  }`}
                >
                  <Home className={`w-4 h-4 mb-1.5 ${propertyType === "residential" ? "text-red-400" : "text-slate-400"}`} />
                  <span className="text-xs font-bold leading-tight">Residential</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setPropertyType("commercial");
                    setMonthlyBill(25000);
                  }}
                  className={`flex flex-col items-center justify-center p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                    propertyType === "commercial"
                      ? "bg-amber-950/90 border-amber-500 text-white shadow-lg shadow-amber-950/80"
                      : "bg-[#14101A]/80 border-red-950/60 text-slate-300 hover:border-red-900/60 hover:text-white"
                  }`}
                >
                  <Building2 className={`w-4 h-4 mb-1.5 ${propertyType === "commercial" ? "text-amber-400" : "text-slate-400"}`} />
                  <span className="text-xs font-bold leading-tight">Commercial</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setPropertyType("agricultural");
                    setMonthlyBill(6000);
                  }}
                  className={`flex flex-col items-center justify-center p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                    propertyType === "agricultural"
                      ? "bg-emerald-950/90 border-emerald-500 text-white shadow-lg shadow-emerald-950/80"
                      : "bg-[#14101A]/80 border-red-950/60 text-slate-300 hover:border-red-900/60 hover:text-white"
                  }`}
                >
                  <Tractor className={`w-4 h-4 mb-1.5 ${propertyType === "agricultural" ? "text-emerald-400" : "text-slate-400"}`} />
                  <span className="text-xs font-bold leading-tight">Agri Pump</span>
                </button>
              </div>
            </div>

            {/* 2. Monthly Electricity Bill */}
            <div className="space-y-3.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-wider">
                  2. Average Monthly Bill
                </span>
                <div className="inline-flex items-center gap-2">
                  <span className="text-xs text-slate-400">Current EB:</span>
                  <span className="text-xl font-black text-white font-mono bg-[#14101A] px-3.5 py-1 rounded-xl border border-red-500/40 shadow-inner">
                    ₹{monthlyBill.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Quick Presets */}
              <div className="flex flex-wrap gap-2">
                {billPresets.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setMonthlyBill(preset)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer ${
                      monthlyBill === preset
                        ? "bg-red-950/90 border-red-500 text-rose-200"
                        : "bg-[#14101A]/80 border-red-950/60 text-slate-300 hover:border-red-500/40 hover:text-white"
                    }`}
                  >
                    ₹{preset.toLocaleString("en-IN")}
                  </button>
                ))}
              </div>

              {/* Slider */}
              <input
                type="range"
                min={propertyType === "commercial" ? 10000 : 1000}
                max={propertyType === "commercial" ? 200000 : 30000}
                step={propertyType === "commercial" ? 5000 : 500}
                value={monthlyBill}
                onChange={(e) => setMonthlyBill(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-500 focus:outline-none"
              />
            </div>

            {/* Sizing Specifications Tile */}
            <div className="p-4 rounded-2xl bg-[#14101A]/90 border border-red-900/30 space-y-2 shadow-xs">
              <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                <span className="flex items-center gap-1.5 text-amber-400 font-bold">
                  <Sun className="w-4 h-4 text-amber-400" />
                  RECOMMENDED SYSTEM SIZE
                </span>
                <span className="text-base font-black text-white font-mono">{calculation.recommendedKw} kW</span>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-red-950/60 text-xs text-slate-300">
                <div>● Daily Yield: <strong className="text-white">~{calculation.dailyGenerationUnits} Units</strong></div>
                <div>● Roof Space: <strong className="text-white">~{calculation.spaceRequiredSqft} sq.ft</strong></div>
              </div>
            </div>

          </div>

          {/* Right Column: Live Financial & Subsidy Forecast (6 Cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            
            {/* 25-Year Savings Showcase Block */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-red-950/40 via-purple-950/20 to-amber-950/20 border border-red-500/40 shadow-xl relative overflow-hidden space-y-2.5">
              
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-amber-400">
                  <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
                  <span>25-YEAR ESTIMATED ELECTRICITY BILL SAVINGS</span>
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-900/40">
                  ● Guaranteed ROI
                </span>
              </div>

              <div className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight flex items-baseline gap-1.5">
                <span>₹{calculation.lifetimeSavingsLakhs}</span>
                <span className="text-lg sm:text-xl text-amber-300 font-sans font-bold">Lakhs</span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                Saves approx. <strong className="text-white">₹{calculation.annualSavingsRs.toLocaleString("en-IN")}/yr</strong> (~₹{calculation.monthlySavingsRs.toLocaleString("en-IN")}/mo) on your electricity bills.
              </p>

              {/* Progress Track: Payback vs Lifetime Profit */}
              <div className="pt-1 space-y-1">
                <div className="flex justify-between text-[10px] font-mono text-slate-300">
                  <span>Payback Period: <strong className="text-rose-300">{calculation.paybackYears} Years</strong></span>
                  <span>Free Clean Power: <strong className="text-emerald-400">Next 21+ Years</strong></span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden flex">
                  <div className="h-full bg-rose-500" style={{ width: `${Math.min(Number(calculation.paybackYears) * 4, 30)}%` }} />
                  <div className="h-full bg-gradient-to-r from-emerald-500 to-amber-400 flex-1" />
                </div>
              </div>
            </div>

            {/* 2 Vital Deliverables: Subsidy + Payback */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              
              {/* Subsidy Benefit */}
              <div className="p-4 rounded-2xl bg-[#14101A]/95 border border-red-900/30 hover:border-amber-500/40 transition-colors shadow-sm space-y-1">
                <span className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-amber-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  GOVERNMENT BENEFIT
                </span>
                <div className="text-xl sm:text-2xl font-black text-amber-300 font-mono">
                  {calculation.subsidyAmount > 0
                    ? `₹${calculation.subsidyAmount.toLocaleString("en-IN")}`
                    : "40% Tax Benefit"}
                </div>
                <p className="text-[11px] text-slate-300 pt-1 border-t border-red-950/60 leading-tight">
                  {calculation.subsidyLabel}
                </p>
              </div>

              {/* Estimated Payback */}
              <div className="p-4 rounded-2xl bg-[#14101A]/95 border border-red-900/30 hover:border-rose-500/40 transition-colors shadow-sm space-y-1">
                <span className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-rose-300">
                  <Clock className="w-3.5 h-3.5 text-rose-400" />
                  ESTIMATED PAYBACK
                </span>
                <div className="text-xl sm:text-2xl font-black text-rose-300 font-mono">
                  {calculation.paybackYears} <span className="text-slate-400 text-sm font-bold">Years</span>
                </div>
                <p className="text-[11px] text-slate-300 pt-1 border-t border-red-950/60 leading-tight">
                  25-Year Linear Warranty
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default SavingsCalculator;
