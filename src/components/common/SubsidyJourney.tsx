"use client";
import React from "react";
import { ShieldCheck, CheckCircle2, ArrowRight, IndianRupee, FileText, Banknote } from "lucide-react";
import Link from "next/link";
import { subsidyProcessTimeline } from "../../data/subsidies";
import { ScrollReveal } from "./ScrollReveal";

export const SubsidyJourney: React.FC = () => {
  return (
    <section className="section-padding bg-[#0A0A0E] relative overflow-hidden border-t border-red-950/60" id="subsidy">
      <div className="site-container relative z-10 space-y-12">
        
        {/* Main Subsidy Feature Box */}
        <div className="bg-[#14101A]/95 border border-red-900/40 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-10">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-red-950/60">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-amber-950/80 text-amber-300 border border-amber-500/40 font-mono">
                <IndianRupee className="w-3.5 h-3.5 text-amber-400" />
                <span>PM SURYA GHAR: MUFT BIJLI YOJANA</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                MAKE SOLAR MORE <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">ACCESSIBLE</span>
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                Direct Central Financial Assistance (CFA) under PM Surya Ghar. EnergyMan manages complete feasibility inspection, portal registration, DISCOM meter testing, and direct DBT bank disbursement up to ₹78,000.
              </p>
            </div>

            <ScrollReveal animation="fade-in" delay={100}>
              <Link
                href="/government-subsidy"
                className="btn-primary py-4 px-8 font-black text-xs sm:text-sm tracking-wider uppercase whitespace-nowrap self-start lg:self-auto group inline-flex items-center gap-2 shadow-lg"
              >
                <span>CHECK YOUR SOLAR SUBSIDY</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </ScrollReveal>
          </div>

          {/* 3 Core Subsidy Benefit Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-red-950/60 space-y-2">
              <div className="p-2.5 rounded-xl bg-red-950/80 border border-red-500/40 text-red-400 w-fit">
                <IndianRupee className="w-5 h-5" />
              </div>
              <strong className="text-base font-black text-white block">Reduced Upfront Cost</strong>
              <p className="text-xs text-slate-300">
                Direct government subsidy credited to your bank account within 30 days of commissioning.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-red-950/60 space-y-2">
              <div className="p-2.5 rounded-xl bg-amber-950/80 border border-amber-500/40 text-amber-400 w-fit">
                <FileText className="w-5 h-5" />
              </div>
              <strong className="text-base font-black text-white block">Simplified Documentation</strong>
              <p className="text-xs text-slate-300">
                100% turnkey liaison with TANGEDCO/DISCOM portals handled entirely by EnergyMan engineers.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-red-950/60 space-y-2">
              <div className="p-2.5 rounded-xl bg-rose-950/80 border border-rose-500/40 text-rose-400 w-fit">
                <Banknote className="w-5 h-5" />
              </div>
              <strong className="text-base font-black text-white block">25-Year Guaranteed Savings</strong>
              <p className="text-xs text-slate-300">
                Lock in zero electricity charges and earn bi-directional net metering credits for excess export.
              </p>
            </div>
          </div>

          {/* 5-Step Process Timeline */}
          <div className="space-y-4 pt-4 border-t border-red-950/60">
            <h4 className="text-xs font-bold font-mono text-slate-400 uppercase tracking-wider">
              Step-by-Step Subsidy Journey
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {subsidyProcessTimeline.map((step) => (
                <div
                  key={step.step}
                  className="bg-slate-900/90 border border-red-950/60 rounded-2xl p-5 space-y-2.5 relative group hover:border-red-500/50 transition-colors shadow-xs"
                >
                  <span className="text-2xl font-black text-red-500 font-mono">
                    {step.step}
                  </span>
                  <h4 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors">
                    {step.title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default SubsidyJourney;
