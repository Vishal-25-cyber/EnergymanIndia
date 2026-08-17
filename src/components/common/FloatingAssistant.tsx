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

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Expanded Quick Menu */}
      {isOpen && (
        <div className="mb-3 w-72 sm:w-80 p-5 rounded-3xl bg-brand-900/95 backdrop-blur-xl border border-slate-700/90 shadow-2xl space-y-4 animate-fade-in text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-energy-400 animate-ping" />
              <span className="font-bold text-white uppercase tracking-wider text-[11px]">
                Solar Support Online
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-slate-300">
            Need immediate help with solar sizing, net-metering, or government subsidies?
          </p>

          <div className="space-y-2">
            <a
              href={companyData.socialLinks.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center justify-between transition-colors shadow-lg"
            >
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <a
              href={`tel:${companyData.phones.primary.replace(/\s+/g, "")}`}
              className="w-full py-2.5 px-4 rounded-xl bg-brand-850 hover:bg-brand-800 border border-slate-700 text-white font-bold flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-energy-400" />
                <span>Call: {companyData.phones.primary}</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <Link
              to="/get-a-quote"
              onClick={() => setIsOpen(false)}
              className="w-full py-2.5 px-4 rounded-xl bg-solar-500/20 hover:bg-solar-500/30 border border-solar-500/40 text-solar-300 font-bold flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-solar-400" />
                <span>60-Sec Solar Quote Wizard</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="pt-2 text-[10px] text-slate-400 text-center flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-energy-400" />
            <span>MNRE Channel Partner & PM Surya Ghar Subsidy</span>
          </div>
        </div>
      )}

      {/* Trigger Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-energy-500 to-emerald-600 hover:from-energy-400 hover:to-emerald-500 text-brand-950 font-extrabold shadow-xl shadow-energy-500/25 transition-all duration-300 hover:scale-105"
        title="Quick Solar Assistant"
      >
        <MessageCircle className="w-5 h-5 fill-brand-950" />
        <span className="text-xs tracking-wider">Quick Solar Help</span>
        <span className="w-2 h-2 rounded-full bg-white animate-ping" />
      </button>
    </div>
  );
};
