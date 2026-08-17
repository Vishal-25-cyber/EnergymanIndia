import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Calculator,
  ShieldCheck,
  TrendingUp,
  CreditCard,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Zap
} from "lucide-react";

export const EMIFinanceCalculator: React.FC = () => {
  const [systemKw, setSystemKw] = useState<number>(3); // 3 kW default (PM Surya Ghar sweet spot)
  const [tenureYears, setTenureYears] = useState<number>(5);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);

  // Approximate turnkey cost before subsidy (₹65,000 / kW)
  const grossCost = systemKw * 65000;

  // PM Surya Ghar subsidy
  const subsidy = systemKw === 1 ? 30000 : systemKw === 2 ? 60000 : 78000;
  const netSystemCost = Math.max(0, grossCost - subsidy);

  const downPaymentAmount = Math.round((netSystemCost * downPaymentPercent) / 100);
  const loanPrincipal = netSystemCost - downPaymentAmount;

  // Interest rate ~7% p.a. standard solar collateral-free loan
  const annualInterestRate = 0.07;
  const monthlyRate = annualInterestRate / 12;
  const numberOfMonths = tenureYears * 12;

  // Standard EMI formula: P * r * (1+r)^n / ((1+r)^n - 1)
  const monthlyEmi = Math.round(
    (loanPrincipal * monthlyRate * Math.pow(1 + monthlyRate, numberOfMonths)) /
      (Math.pow(1 + monthlyRate, numberOfMonths) - 1)
  );

  // Typical monthly electricity bill replaced by this system
  const monthlyElectricityReplaced = systemKw * 120 * 7.5; // ~120 units/kW/mo * ₹7.5/unit
  const netMonthlyProfit = Math.round(monthlyElectricityReplaced - monthlyEmi);

  return (
    <section className="section-padding bg-brand-950 border-t border-slate-800" id="financing">
      <div className="site-container space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-solar-500/10 text-solar-400 border border-solar-500/30">
            <CreditCard className="w-3.5 h-3.5" />
            <span>Day-1 Positive Cash Flow</span>
          </div>
          <h2 className="heading-section">
            ZERO UPFRONT & <span className="bg-gradient-to-r from-solar-400 to-energy-400 bg-clip-text text-transparent">SOLAR LOAN EMI CALCULATOR</span>
          </h2>
          <p className="text-subtle">
            Switching to solar shouldn't strain your savings. With national collateral-free solar loans at 7% p.a. and ₹78,000 direct subsidy, your monthly solar EMI is often lower than your current electricity bill!
          </p>
        </div>

        {/* Calculator Main Box */}
        <div className="bg-gradient-to-br from-brand-900 via-brand-900/90 to-brand-850 border border-slate-700/80 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Sliders & Controls (6 Cols) */}
            <div className="lg:col-span-6 space-y-6">
              {/* System Capacity */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-300">
                  <span>Selected System Capacity:</span>
                  <span className="text-energy-400 font-mono text-sm">{systemKw} kW Rooftop</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[2, 3, 5, 10].map((kw) => (
                    <button
                      key={kw}
                      type="button"
                      onClick={() => setSystemKw(kw)}
                      className={`py-2 rounded-xl text-xs font-bold transition-all ${
                        systemKw === kw
                          ? "bg-energy-500 text-brand-950 shadow-md ring-1 ring-energy-500"
                          : "bg-brand-950 border border-slate-800 text-slate-300 hover:border-slate-700"
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
                  <span className="text-solar-400 font-mono text-sm">{tenureYears} Years ({tenureYears * 12} Months)</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[3, 5, 7].map((yr) => (
                    <button
                      key={yr}
                      type="button"
                      onClick={() => setTenureYears(yr)}
                      className={`py-2 rounded-xl text-xs font-bold transition-all ${
                        tenureYears === yr
                          ? "bg-solar-500 text-brand-950 shadow-md ring-1 ring-solar-500"
                          : "bg-brand-950 border border-slate-800 text-slate-300 hover:border-slate-700"
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
                  <span className="text-white font-mono text-sm">{downPaymentPercent}% (₹{downPaymentAmount.toLocaleString()})</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[10, 20, 30].map((dp) => (
                    <button
                      key={dp}
                      type="button"
                      onClick={() => setDownPaymentPercent(dp)}
                      className={`py-2 rounded-xl text-xs font-bold transition-all ${
                        downPaymentPercent === dp
                          ? "bg-slate-200 text-brand-950 shadow-md"
                          : "bg-brand-950 border border-slate-800 text-slate-300 hover:border-slate-700"
                      }`}
                    >
                      {dp}% Down
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Financial Payback Matrix Card (6 Cols) */}
            <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-brand-950/90 border border-slate-700 space-y-6 shadow-xl">
              <div className="space-y-2 pb-4 border-b border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">Estimated Monthly Solar Loan EMI:</span>
                  <span className="badge-amber text-[10px] font-bold">@ 7.0% Interest</span>
                </div>
                <div className="text-4xl font-black text-white font-mono flex items-baseline gap-1">
                  <span>₹{monthlyEmi.toLocaleString()}</span>
                  <span className="text-xs text-slate-400 font-normal">/ month</span>
                </div>
              </div>

              {/* Cash Flow Comparison */}
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                  <span className="text-slate-400">Turnkey Installed Cost:</span>
                  <strong className="text-white font-mono">₹{grossCost.toLocaleString()}</strong>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                  <span className="text-slate-400">Direct PM Surya Ghar Subsidy:</span>
                  <strong className="text-energy-400 font-mono">- ₹{subsidy.toLocaleString()}</strong>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                  <span className="text-slate-400">Net Cost to Homeowner:</span>
                  <strong className="text-solar-400 font-mono">₹{netSystemCost.toLocaleString()}</strong>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                  <span className="text-slate-400">Current Monthly EB Bill Offset:</span>
                  <strong className="text-white font-mono">~₹{Math.round(monthlyElectricityReplaced).toLocaleString()} / mo</strong>
                </div>
              </div>

              {/* Day-1 Positive Cash Flow Callout */}
              <div className="p-4 rounded-2xl bg-energy-500/10 border border-energy-500/30 text-xs text-slate-200 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-energy-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-energy-400 block mb-0.5">Day-1 Positive Cash Flow:</strong>
                  Your monthly electricity bill savings (~₹{Math.round(monthlyElectricityReplaced).toLocaleString()}) exceed your monthly loan EMI (₹{monthlyEmi.toLocaleString()}) by <strong className="text-white">₹{netMonthlyProfit.toLocaleString()} / mo</strong>!
                </div>
              </div>

              {/* CTA */}
              <Link
                to={`/get-a-quote?type=Homeowner&kw=${systemKw}&financing=loan`}
                className="btn-primary w-full py-3 text-xs font-bold justify-center"
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
