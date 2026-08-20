import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  CreditCard,
  Sparkles,
} from "lucide-react";

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
    <section className="section-padding bg-[#0A0A0E] border-t border-red-950/60" id="financing">
      <div className="site-container space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold tracking-wider uppercase bg-amber-950/80 text-amber-300 border border-amber-500/40 shadow-xs">
            <CreditCard className="w-3.5 h-3.5 text-amber-400" />
            <span>Day-1 Positive Cash Flow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            ZERO UPFRONT & <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">SOLAR LOAN EMI CALCULATOR</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Switching to solar shouldn&apos;t strain your savings. With national collateral-free solar loans at 7% p.a. and ₹78,000 direct subsidy, your monthly solar EMI is often lower than your current electricity bill!
          </p>
        </div>

        {/* Calculator Main Box */}
        <div className="bg-[#14101A]/95 border border-red-900/30 rounded-3xl p-6 sm:p-10 shadow-xl space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Sliders & Controls (6 Cols) */}
            <div className="lg:col-span-6 space-y-6">
              {/* System Capacity */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-300">
                  <span>Selected System Capacity:</span>
                  <span className="text-red-400 font-mono font-black text-sm">{systemKw} kW Rooftop</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[2, 3, 5, 10].map((kw) => (
                    <button
                      key={kw}
                      type="button"
                      onClick={() => setSystemKw(kw)}
                      className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        systemKw === kw
                          ? "bg-red-600 text-white shadow-md"
                          : "bg-slate-900 border border-red-950/60 text-slate-300 hover:border-red-900"
                      }`}
                    >
                      {kw} kW
                    </button>
                  ))}
                </div>
              </div>

              {/* Loan Tenure */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-300">
                  <span>Loan Repayment Tenure:</span>
                  <span className="text-amber-400 font-mono font-black text-sm">{tenureYears} Years ({tenureYears * 12} Months)</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[3, 5, 7].map((yr) => (
                    <button
                      key={yr}
                      type="button"
                      onClick={() => setTenureYears(yr)}
                      className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        tenureYears === yr
                          ? "bg-amber-600 text-white shadow-md"
                          : "bg-slate-900 border border-red-950/60 text-slate-300 hover:border-red-900"
                      }`}
                    >
                      {yr} Years
                    </button>
                  ))}
                </div>
              </div>

              {/* Down Payment */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-300">
                  <span>Down Payment Contribution:</span>
                  <span className="text-white font-mono font-bold text-sm">{downPaymentPercent}% (₹{downPaymentAmount.toLocaleString()})</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[10, 20, 30].map((dp) => (
                    <button
                      key={dp}
                      type="button"
                      onClick={() => setDownPaymentPercent(dp)}
                      className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        downPaymentPercent === dp
                          ? "bg-slate-700 text-white shadow-md"
                          : "bg-slate-900 border border-red-950/60 text-slate-300 hover:border-red-900"
                      }`}
                    >
                      {dp}% Down
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Financial Payback Matrix Card (6 Cols) */}
            <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-slate-900 border border-red-950/60 space-y-6 shadow-xl">
              <div className="space-y-2 pb-4 border-b border-red-950/60">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-bold">Estimated Monthly Solar Loan EMI:</span>
                  <span className="bg-amber-950/80 text-amber-300 border border-amber-500/40 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">@ 7.0% Interest</span>
                </div>
                <div className="text-4xl font-black text-white font-mono flex items-baseline gap-1">
                  <span>₹{monthlyEmi.toLocaleString()}</span>
                  <span className="text-xs text-slate-400 font-medium">/ month</span>
                </div>
              </div>

              {/* Cash Flow Comparison */}
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between py-1.5 border-b border-red-950/60">
                  <span className="text-slate-400">Turnkey Installed Cost:</span>
                  <strong className="text-white font-mono font-bold">₹{grossCost.toLocaleString()}</strong>
                </div>
                <div className="flex justify-between py-1.5 border-b border-red-950/60">
                  <span className="text-slate-400">Direct PM Surya Ghar Subsidy:</span>
                  <strong className="text-red-400 font-mono font-bold">- ₹{subsidy.toLocaleString()}</strong>
                </div>
                <div className="flex justify-between py-1.5 border-b border-red-950/60">
                  <span className="text-slate-400">Net Cost to Homeowner:</span>
                  <strong className="text-amber-400 font-mono font-bold">₹{netSystemCost.toLocaleString()}</strong>
                </div>
                <div className="flex justify-between py-1.5 border-b border-red-950/60">
                  <span className="text-slate-400">Current Monthly EB Bill Offset:</span>
                  <strong className="text-white font-mono font-bold">~₹{Math.round(monthlyElectricityReplaced).toLocaleString()} / mo</strong>
                </div>
              </div>

              {/* Day-1 Positive Cash Flow Callout */}
              <div className="p-4 rounded-2xl bg-red-950/60 border border-red-500/40 text-xs text-rose-200 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-rose-300 block mb-0.5">Day-1 Positive Cash Flow:</strong>
                  Your monthly electricity bill savings (~₹{Math.round(monthlyElectricityReplaced).toLocaleString()}) exceed your monthly loan EMI (₹{monthlyEmi.toLocaleString()}) by <strong className="text-white font-bold">₹{netMonthlyProfit.toLocaleString()} / mo</strong>!
                </div>
              </div>

              {/* CTA */}
              <Link
                to={`/get-a-quote?type=Homeowner&kw=${systemKw}&financing=loan`}
                className="btn-primary w-full py-3 text-xs font-bold justify-center rounded-xl shadow-md transition-all block text-center"
              >
                Apply for 7% Solar Loan Assistance →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EMIFinanceCalculator;
