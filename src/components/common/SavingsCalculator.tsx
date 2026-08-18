import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Calculator,
  Zap,
  TrendingUp,
  Clock,
  Sparkles,
  Trees,
  ArrowRight,
  Info,
  CheckCircle2,
  Building2,
  Home,
  Factory,
  Tractor
} from "lucide-react";

export const SavingsCalculator: React.FC = () => {
  const [propertyType, setPropertyType] = useState<"residential" | "commercial" | "industrial" | "agricultural">("residential");
  const [monthlyBill, setMonthlyBill] = useState<number>(4500);
  const [stateLocation, setStateLocation] = useState<string>("Tamil Nadu");
  const [roofArea, setRoofArea] = useState<number>(400);

  // Dynamic calculations based on industry tariffs and solar generation averages in South India (approx 4.2 peak sun hours/day = 1500 kWh/kWp/year)
  const calculation = useMemo(() => {
    let tariffPerUnit = 7.0; // Default residential average slab
    if (propertyType === "commercial") tariffPerUnit = 9.5;
    if (propertyType === "industrial") tariffPerUnit = 8.5;
    if (propertyType === "agricultural") tariffPerUnit = 6.0;

    // Monthly units consumed
    const monthlyUnits = monthlyBill / tariffPerUnit;
    const dailyUnits = monthlyUnits / 30;

    // Recommended kW sizing (1 kW generates ~4.2 units/day in South India)
    let recommendedKw = Math.ceil((dailyUnits / 4.2) * 10) / 10;
    if (propertyType === "residential" && recommendedKw < 2) recommendedKw = 2;
    if (propertyType === "commercial" && recommendedKw < 10) recommendedKw = 10;
    if (propertyType === "industrial" && recommendedKw < 25) recommendedKw = 25;
    if (propertyType === "agricultural" && recommendedKw < 5) recommendedKw = 5;

    // Annual generation (kWh)
    const annualGenerationKwh = Math.round(recommendedKw * 1480);

    // Approximate System Base Cost (₹ / watt benchmark)
    let benchmarkCostPerKw = 60000;
    if (propertyType === "commercial") benchmarkCostPerKw = 52000;
    if (propertyType === "industrial") benchmarkCostPerKw = 46000;
    if (propertyType === "agricultural") benchmarkCostPerKw = 58000;

    const estimatedSystemCost = Math.round(recommendedKw * benchmarkCostPerKw);

    // Central Government Subsidy Deduction (PM Surya Ghar for residential, PM-KUSUM for agricultural)
    let subsidyAmount = 0;
    let subsidyName = "";
    if (propertyType === "residential") {
      if (recommendedKw >= 3) {
        subsidyAmount = 78000;
        subsidyName = "PM Surya Ghar ₹78,000 Subsidy Applied";
      } else if (recommendedKw >= 2) {
        subsidyAmount = 60000;
        subsidyName = "PM Surya Ghar ₹60,000 Subsidy Applied";
      } else {
        subsidyAmount = 30000;
        subsidyName = "PM Surya Ghar ₹30,000 Subsidy Applied";
      }
    } else if (propertyType === "agricultural") {
      subsidyAmount = Math.round(estimatedSystemCost * 0.6); // 60% PM-KUSUM subsidy
      subsidyName = "PM-KUSUM Up to 60% Subsidy Applied";
    }

    const netSystemCost = Math.max(estimatedSystemCost - subsidyAmount, 10000);

    // Annual Bill Savings
    const annualSavingsRs = Math.round(annualGenerationKwh * tariffPerUnit);
    const monthlySavingsRs = Math.round(annualSavingsRs / 12);

    // Payback period (Years)
    const paybackYears = (netSystemCost / annualSavingsRs).toFixed(1);

    // 25-Year Cumulative Savings (assuming modest 3% annual grid tariff escalation)
    let lifetimeSavings = 0;
    let currentAnnualSaving = annualSavingsRs;
    for (let yr = 1; yr <= 25; yr++) {
      lifetimeSavings += currentAnnualSaving;
      currentAnnualSaving *= 1.03;
    }
    const lifetimeSavingsLakhs = (lifetimeSavings / 100000).toFixed(2);

    // Environmental Offset
    const annualCo2Tons = (annualGenerationKwh * 0.82 / 1000).toFixed(1);
    const treesEquivalent = Math.round(Number(annualCo2Tons) * 45);

    // Roof space required (sq.ft)
    const spaceRequiredSqft = Math.round(recommendedKw * 85);

    return {
      recommendedKw,
      annualGenerationKwh,
      estimatedSystemCost,
      subsidyAmount,
      subsidyName,
      netSystemCost,
      annualSavingsRs,
      monthlySavingsRs,
      paybackYears,
      lifetimeSavingsLakhs,
      annualCo2Tons,
      treesEquivalent,
      spaceRequiredSqft
    };
  }, [monthlyBill, propertyType]);

  return (
    <section className="section-padding bg-brand-950 relative overflow-hidden" id="calculator">
      {/* Background Gradients */}
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-energy-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-solar-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="site-container relative z-10 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-solar-500/10 text-solar-400 border border-solar-500/30">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive ROI & Subsidy Estimator</span>
          </div>
          <h2 className="heading-section">
            HOW MUCH COULD YOU <span className="bg-gradient-to-r from-solar-400 to-energy-400 bg-clip-text text-transparent">SAVE WITH SOLAR?</span>
          </h2>
          <p className="text-subtle">
            Select your property type and monthly electricity expense to forecast your recommended solar system capacity, government subsidy savings, and 25-year financial returns.
          </p>
        </div>

        {/* Main Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Inputs (5 Cols on LG) */}
          <div className="lg:col-span-5 bg-brand-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-7 shadow-2xl">
            {/* Property Type Selection */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                1. Select Property Type
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setPropertyType("residential")}
                  className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs font-semibold transition-all ${
                    propertyType === "residential"
                      ? "bg-energy-500/15 border-energy-500 text-energy-400 shadow-md ring-1 ring-energy-500/40"
                      : "bg-brand-850 border-slate-700/80 text-slate-300 hover:border-slate-600"
                  }`}
                >
                  <Home className="w-4 h-4 shrink-0" />
                  <span>Residential Home</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPropertyType("commercial")}
                  className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs font-semibold transition-all ${
                    propertyType === "commercial"
                      ? "bg-solar-500/15 border-solar-500 text-solar-400 shadow-md ring-1 ring-solar-500/40"
                      : "bg-brand-850 border-slate-700/80 text-slate-300 hover:border-slate-600"
                  }`}
                >
                  <Building2 className="w-4 h-4 shrink-0" />
                  <span>Commercial / Office</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPropertyType("industrial")}
                  className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs font-semibold transition-all ${
                    propertyType === "industrial"
                      ? "bg-blue-500/15 border-blue-500 text-blue-400 shadow-md ring-1 ring-blue-500/40"
                      : "bg-brand-850 border-slate-700/80 text-slate-300 hover:border-slate-600"
                  }`}
                >
                  <Factory className="w-4 h-4 shrink-0" />
                  <span>Industrial / Factory</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPropertyType("agricultural")}
                  className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs font-semibold transition-all ${
                    propertyType === "agricultural"
                      ? "bg-emerald-500/15 border-emerald-500 text-emerald-400 shadow-md ring-1 ring-emerald-500/40"
                      : "bg-brand-850 border-slate-700/80 text-slate-300 hover:border-slate-600"
                  }`}
                >
                  <Tractor className="w-4 h-4 shrink-0" />
                  <span>Agricultural Farm</span>
                </button>
              </div>
            </div>

            {/* Monthly Electricity Bill Input & Slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  2. Average Monthly Electricity Bill
                </label>
                <span className="text-lg font-extrabold text-solar-400 bg-brand-850 px-3 py-1 rounded-lg border border-slate-700 font-mono shadow-md">
                  ₹{monthlyBill.toLocaleString("en-IN")}
                </span>
              </div>
              <input
                type="range"
                min={propertyType === "industrial" ? 25000 : propertyType === "commercial" ? 10000 : 1000}
                max={propertyType === "industrial" ? 500000 : propertyType === "commercial" ? 200000 : 30000}
                step={propertyType === "industrial" ? 5000 : 500}
                value={monthlyBill}
                onChange={(e) => setMonthlyBill(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-solar-400 focus:outline-none"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>Min: ₹{propertyType === "industrial" ? "25,000" : propertyType === "commercial" ? "10,000" : "1,000"}</span>
                <span>Max: ₹{propertyType === "industrial" ? "5,00,000+" : propertyType === "commercial" ? "2,00,000+" : "30,000+"}</span>
              </div>
            </div>

            {/* Location Select */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                3. Installation State / DISCOM
              </label>
              <select
                value={stateLocation}
                onChange={(e) => setStateLocation(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-brand-850 border border-slate-700 text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-energy-500"
              >
                <option value="Tamil Nadu">Tamil Nadu (TANGEDCO)</option>
                <option value="Karnataka">Karnataka (BESCOM / MESCOM)</option>
                <option value="Kerala">Kerala (KSEB)</option>
                <option value="Andhra Pradesh">Andhra Pradesh (APEPDCL / APSPDCL)</option>
                <option value="Telangana">Telangana (TSSPDCL / TSNPDCL)</option>
                <option value="Other">Other State in India</option>
              </select>
            </div>

            {/* Roof Area Guidance */}
            <div className="p-4 rounded-2xl bg-brand-850/60 border border-slate-800 flex items-start gap-3 text-xs text-slate-400">
              <Info className="w-4 h-4 text-energy-400 shrink-0 mt-0.5" />
              <span>
                Required shadow-free rooftop space: approx. <strong className="text-slate-200">{calculation.spaceRequiredSqft} sq.ft</strong> ({calculation.recommendedKw} kW system).
              </span>
            </div>
          </div>

          {/* Right Column: Dynamic Results Cards (7 Cols on LG) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Primary Capacity & Subsidy Highlights */}
            <div className="bg-gradient-to-br from-brand-900 via-brand-900/90 to-brand-850 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-6 border-b border-slate-800">
                <div className="p-4 rounded-2xl bg-brand-950/60 border border-slate-800">
                  <span className="text-xs font-semibold text-slate-400 block mb-1">Recommended Capacity</span>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white">
                    {calculation.recommendedKw} <span className="text-energy-400 text-lg">kW</span>
                  </div>
                  <span className="text-[11px] text-slate-400">Generates ~{calculation.annualGenerationKwh.toLocaleString()} units/yr</span>
                </div>

                <div className="p-4 rounded-2xl bg-brand-950/60 border border-slate-800">
                  <span className="text-xs font-semibold text-slate-400 block mb-1">Annual Electricity Savings</span>
                  <div className="text-2xl sm:text-3xl font-extrabold text-solar-400">
                    ₹{calculation.annualSavingsRs.toLocaleString("en-IN")}
                  </div>
                  <span className="text-[11px] text-slate-400">~₹{calculation.monthlySavingsRs.toLocaleString("en-IN")} saved monthly</span>
                </div>

                <div className="p-4 rounded-2xl bg-brand-950/60 border border-slate-800">
                  <span className="text-xs font-semibold text-slate-400 block mb-1">Estimated Payback Period</span>
                  <div className="text-2xl sm:text-3xl font-extrabold text-energy-400">
                    {calculation.paybackYears} <span className="text-slate-300 text-lg">Years</span>
                  </div>
                  <span className="text-[11px] text-slate-400">Free power for next 21+ yrs</span>
                </div>
              </div>

              {/* Subsidy Banner */}
              {calculation.subsidyAmount > 0 && (
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-2xl bg-solar-500/10 border border-solar-500/30 gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-solar-500/20 text-solar-400">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{calculation.subsidyName}</p>
                      <p className="text-xs text-slate-300">Direct DBT Bank Credit upon Net-Meter Commissioning</p>
                    </div>
                  </div>
                  <div className="text-right self-end sm:self-auto">
                    <span className="text-lg font-black text-solar-400 font-mono">
                      - ₹{calculation.subsidyAmount.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              )}

              {/* 25-Year Lifetime Savings & Environmental Impact */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-brand-950/40 border border-slate-800 flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-energy-500/10 text-energy-400 shrink-0">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">25-Year Net Savings</span>
                    <strong className="text-lg sm:text-xl font-black text-white font-mono">
                      ₹{calculation.lifetimeSavingsLakhs} Lakhs
                    </strong>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-brand-950/40 border border-slate-800 flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
                    <Trees className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">Lifetime CO₂ Offset</span>
                    <strong className="text-lg sm:text-xl font-black text-white font-mono">
                      {calculation.annualCo2Tons} Tons/yr
                    </strong>
                  </div>
                </div>
              </div>

              {/* Direct Next Action CTA */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-400 leading-relaxed">
                  *Results are estimates based on standard South India solar irradiance ({stateLocation}) and average slab tariffs.
                </div>
                <Link
                  to={`/get-a-quote?type=${propertyType}&bill=${monthlyBill}&kw=${calculation.recommendedKw}`}
                  className="btn-primary w-full sm:w-auto py-3 px-6 text-sm font-bold shrink-0 inline-flex items-center gap-2 group shimmer-container"
                >
                  <span>Claim Your Solar Plan</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
