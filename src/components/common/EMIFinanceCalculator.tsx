import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  CreditCard,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  CheckCircle2
} from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

export const EMIFinanceCalculator: React.FC = () => {
  const [systemKw, setSystemKw] = useState<number>(3); // 3 kW default
  const [tenureYears, setTenureYears] = useState<number>(5);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);

  const grossCost = systemKw * 65000;
  const subsidy = systemKw === 1 ? 30000 : systemKw === 2 ? 60000 : 78000;
  const netSystemCost = Math.max(0, grossCost - subsidy);

  const downPaymentAmount = Math.round((netSystemCost * downPaymentPercent) / 100);
  const loanPrincipal = netSystemCost - downPaymentAmount;

  const annualInterestRate = 0.07;
  const monthlyRate = annualInterestRate / 12;
  const numberOfMonths = tenureYears * 12;

  const monthlyEmi = Math.round(
    (loanPrincipal * monthlyRate * Math.pow(1 + monthlyRate, numberOfMonths)) /
      (Math.pow(1 + monthlyRate, numberOfMonths) - 1)
  );

  const monthlyElectricityReplaced = systemKw * 120 * 7.5;
  const netMonthlyProfit = Math.round(monthlyElectricityReplaced - monthlyEmi);

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-[#0A0A0E] via-[#100D16] to-[#0A0A0E] relative overflow-hidden border-t border-red-950/60" id="financing">
      {/* Background Ambient Glows & Dot Texture */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-35" />

      {/* Full Width Site Container */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10 sm:space-y-12">
        
        {/* ── Section Header ── */}
        <ScrollReveal animation="slide-up">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold tracking-widest uppercase bg-red-950/80 text-rose-300 border border-red-500/40 shadow-xs font-mono">
              <CreditCard className="w-3.5 h-3.5 text-amber-400" />
              <span>DAY-1 POSITIVE CASH FLOW</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
              ZERO UPFRONT &{" "}
              <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">
                SOLAR LOAN EMI CALCULATOR
              </span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
              Switching to solar shouldn&apos;t strain your savings. With national collateral-free solar loans at 7% p.a. and ₹78,000 direct subsidy, your monthly solar EMI is often lower than your current electricity bill!
            </p>
          </div>
        </ScrollReveal>

        {/* ── Symmetrical 2-Column Command Center (Sitting Directly on Background) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* Left Column: Loan Parameters & Sizing (6 Cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-5">
            
            {/* 1. Selected System Capacity */}
            <div className="space-y-2.5">
              <div className="flex justify-between items-center text-xs font-mono font-bold">
                <span className="text-red-400 uppercase tracking-wider">1. System Capacity</span>
                <span className="text-white font-black">{systemKw} kW Rooftop</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[2, 3, 5, 10].map((kw) => (
                  <button
                    key={kw}
                    type="button"
                    onClick={() => setSystemKw(kw)}
                    className={`py-2.5 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer ${
                      systemKw === kw
                        ? "bg-red-950/90 border border-red-500 text-white shadow-md shadow-red-950/80"
                        : "bg-[#14101A]/80 border border-red-950/60 text-slate-300 hover:border-red-500/40 hover:text-white"
                    }`}
                  >
                    {kw} kW
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Loan Repayment Tenure */}
            <div className="space-y-2.5">
              <div className="flex justify-between items-center text-xs font-mono font-bold">
                <span className="text-amber-400 uppercase tracking-wider">2. Loan Tenure</span>
                <span className="text-amber-300">{tenureYears} Years ({tenureYears * 12} Months)</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[3, 5, 7].map((yr) => (
                  <button
                    key={yr}
                    type="button"
                    onClick={() => setTenureYears(yr)}
                    className={`py-2.5 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer ${
                      tenureYears === yr
                        ? "bg-amber-950/90 border border-amber-500 text-amber-200 shadow-md shadow-amber-950/80"
                        : "bg-[#14101A]/80 border border-red-950/60 text-slate-300 hover:border-amber-500/40 hover:text-white"
                    }`}
                  >
                    {yr} Years
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Down Payment Contribution */}
            <div className="space-y-2.5">
              <div className="flex justify-between items-center text-xs font-mono font-bold">
                <span className="text-rose-300 uppercase tracking-wider">3. Down Payment Contribution</span>
                <span className="text-white font-mono">{downPaymentPercent}% (₹{downPaymentAmount.toLocaleString("en-IN")})</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[10, 20, 30].map((dp) => (
                  <button
                    key={dp}
                    type="button"
                    onClick={() => setDownPaymentPercent(dp)}
                    className={`py-2.5 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer ${
                      downPaymentPercent === dp
                        ? "bg-purple-950/90 border border-purple-500 text-purple-200 shadow-md shadow-purple-950/80"
                        : "bg-[#14101A]/80 border border-red-950/60 text-slate-300 hover:border-purple-500/40 hover:text-white"
                    }`}
                  >
                    {dp}% Down
                  </button>
                ))}
              </div>
            </div>

            {/* System Cost & Financed Sizing Tile */}
            <div className="p-4 rounded-2xl bg-[#14101A]/90 border border-red-900/30 space-y-2 shadow-xs">
              <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                <span className="flex items-center gap-1.5 text-amber-400 font-bold">
                  <CreditCard className="w-4 h-4 text-amber-400" />
                  FINANCED LOAN PRINCIPAL
                </span>
                <span className="text-base font-black text-white font-mono">₹{loanPrincipal.toLocaleString("en-IN")}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-red-950/60 text-xs text-slate-300">
                <div>● Daily Units: <strong className="text-white">~{(systemKw * 4.2).toFixed(1)} Units</strong></div>
                <div>● Direct Subsidy: <strong className="text-amber-300">₹{subsidy.toLocaleString("en-IN")}</strong></div>
              </div>
            </div>

          </div>

          {/* Right Column: Live Financial Payback & EMI Breakdown (6 Cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
            
            {/* Hero Monthly EMI Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-red-950/40 via-purple-950/20 to-amber-950/20 border border-red-500/40 shadow-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-300">ESTIMATED MONTHLY SOLAR LOAN EMI</span>
                <span className="bg-amber-950/80 text-amber-300 border border-amber-500/40 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full font-mono">
                  @ 7.0% Concessional Interest
                </span>
              </div>
              <div className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight flex items-baseline gap-1.5">
                <span>₹{monthlyEmi.toLocaleString("en-IN")}</span>
                <span className="text-sm text-slate-400 font-sans font-medium">/ month</span>
              </div>
            </div>

            {/* Transparent Cost Breakdown */}
            <div className="p-4 rounded-2xl bg-[#14101A]/95 border border-red-900/30 space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-red-950/60">
                <span className="text-slate-400">Turnkey Installed Cost:</span>
                <strong className="text-white font-mono">₹{grossCost.toLocaleString("en-IN")}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-red-950/60">
                <span className="text-slate-400">Direct PM Surya Ghar Subsidy:</span>
                <strong className="text-rose-300 font-mono">- ₹{subsidy.toLocaleString("en-IN")}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-red-950/60">
                <span className="text-slate-400">Net Cost to Homeowner:</span>
                <strong className="text-amber-300 font-mono font-bold">₹{netSystemCost.toLocaleString("en-IN")}</strong>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Estimated Monthly EB Bill Savings:</span>
                <strong className="text-emerald-400 font-mono font-bold">~₹{Math.round(monthlyElectricityReplaced).toLocaleString("en-IN")} / mo</strong>
              </div>
            </div>

            {/* Day-1 Positive Cash Flow Highlight Banner */}
            <div className="p-3.5 rounded-2xl bg-red-950/50 border border-red-500/40 text-xs text-rose-200 flex items-start gap-2.5 shadow-sm">
              <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <strong className="text-rose-300 block font-mono text-[11px] mb-0.5">DAY-1 POSITIVE CASH FLOW:</strong>
                Your monthly bill savings (~₹{Math.round(monthlyElectricityReplaced).toLocaleString("en-IN")}) exceed your loan EMI (₹{monthlyEmi.toLocaleString("en-IN")}) by <strong className="text-white font-bold font-mono">+₹{netMonthlyProfit.toLocaleString("en-IN")}/mo</strong> profit!
              </div>
            </div>

            {/* Action CTA */}
            <Link
              to={`/get-a-quote?type=Homeowner&kw=${systemKw}&financing=loan`}
              className="btn-primary w-full py-3.5 text-xs sm:text-sm font-black justify-center rounded-xl shadow-xl shadow-red-600/30 hover:scale-[1.02] transition-all flex items-center gap-2"
            >
              <span>Apply for 7% Solar Loan Assistance</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

          </div>

        </div>

      </div>
    </section>
  );
};

export default EMIFinanceCalculator;
