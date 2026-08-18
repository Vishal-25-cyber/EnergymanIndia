import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  MessageCircle,
  Phone,
  Calculator,
  Activity,
  X,
  Sparkles,
  ArrowRight,
  ShieldCheck
} from "lucide-react";
import { companyData } from "../../data/company";

export const FloatingAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [quickBill, setQuickBill] = useState<number>(3500);

  const quickKw = Math.max(2, Math.round((quickBill / 7 / 30 / 4.2) * 10) / 10);
  const quickSubsidy = quickKw >= 3 ? 78000 : quickKw >= 2 ? 60000 : 30000;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Expanded Quick Menu */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 p-5 rounded-3xl bg-brand-900/95 backdrop-blur-2xl border border-slate-700/90 shadow-2xl shadow-black/80 space-y-4 animate-fade-in text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-energy-400 animate-ping" />
              <span className="font-bold text-white uppercase tracking-wider text-[11px]">
                Solar Support & Quick Estimator
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-brand-850"
              aria-label="Close Assistant"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick 1-click Solar Sizing Preview */}
          <div className="p-3.5 rounded-2xl bg-brand-950/80 border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-medium">Quick Estimate (Monthly Bill):</span>
              <span className="text-xs font-mono font-bold text-energy-400 bg-brand-900 px-2 py-0.5 rounded border border-slate-700">
                ₹{quickBill.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min={1000}
              max={15000}
              step={500}
              value={quickBill}
              onChange={(e) => setQuickBill(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-energy-500"
            />
            <div className="flex items-center justify-between text-[10px] text-slate-300 pt-1 border-t border-slate-800/80">
              <span>Rec: <strong className="text-white">{quickKw} kWp System</strong></span>
              <span className="text-solar-400 font-bold">PM Surya Ghar: ₹{quickSubsidy.toLocaleString()}</span>
            </div>
          </div>

          <div className="space-y-2">
            <a
              href={`https://api.whatsapp.com/send?phone=919842211910&text=Hi%20Energy%20Man%20India%2C%20I%20would%20like%20a%20solar%20consultation%20for%20a%20monthly%20bill%20of%20Rs.${quickBill}.`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center justify-between transition-colors shadow-lg shimmer-container"
            >
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Chat on WhatsApp (Direct)</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <a
              href={`tel:${companyData.phones.primary.replace(/\s+/g, "")}`}
              className="w-full py-2.5 px-4 rounded-xl bg-brand-850 hover:bg-brand-800 border border-slate-700 text-white font-bold flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-energy-400" />
                <span>Call Solar Engineer: {companyData.phones.primary}</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <Link
              to="/get-a-quote"
              onClick={() => setIsOpen(false)}
              className="w-full py-2.5 px-4 rounded-xl bg-solar-500/15 hover:bg-solar-500/25 border border-solar-500/40 text-solar-300 font-bold flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-solar-400" />
                <span>60-Sec Solar Quote Wizard</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="pt-2 text-[10px] text-slate-400 text-center flex items-center justify-center gap-1.5 border-t border-slate-800/80">
            <ShieldCheck className="w-3.5 h-3.5 text-energy-400" />
            <span>MNRE Channel Partner & PM Surya Ghar Subsidy</span>
          </div>
        </div>
      )}

      {/* Trigger Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 px-5 py-3.5 rounded-full bg-gradient-to-r from-energy-600 to-emerald-600 hover:from-energy-500 hover:to-emerald-500 text-white font-extrabold shadow-xl shadow-energy-600/30 transition-all duration-400 ease-out hover:scale-[1.04] hover:shadow-2xl hover:shadow-energy-500/35 active:scale-[0.98] shimmer-container"
        title="Quick Solar Assistant"
      >
        <MessageCircle className="w-5 h-5 fill-white" />
        <span className="text-xs tracking-wider">Quick Solar Help</span>
        <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-solar-400 animate-ping" />
        <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-solar-400" />
      </button>
    </div>
  );
};
