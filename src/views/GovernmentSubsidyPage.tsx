"use client";
import React from "react";
import Link from "next/link";
import {
  Landmark,
  CheckCircle2,
  FileText,
  ArrowRight,
  Sun,
  Tractor,
  Building2,
  ShieldCheck,
  IndianRupee,
  ChevronRight
} from "lucide-react";
import { SEOHead } from "../components/common/SEOHead";
import { subsidySchemes, subsidyProcessTimeline } from "../data/subsidies";
import { FAQAccordion } from "../components/common/FAQAccordion";

export const GovernmentSubsidyPage: React.FC = () => {
  const pmSuryaGhar = subsidySchemes[0];
  const pmKusum = subsidySchemes[1];
  const commercialTax = subsidySchemes[2];

  return (
    <div className="bg-[#0A0A0E] text-slate-100 min-h-screen">
      <SEOHead
        title="Government Solar Subsidy Guide - PM Surya Ghar & PM-KUSUM | ENERGYMAN"
        description="Complete 2026 guide to claiming ₹78,000 central subsidy under PM Surya Ghar Muft Bijli Yojana and up to 60% subsidy for solar pumps under PM-KUSUM."
      />

      {/* ── Breadcrumb Bar ── */}
      <section className="pt-28 pb-4 bg-[#0A0A0E] border-b border-red-950/60">
        <div className="site-container flex items-center gap-2 text-xs text-slate-400 font-mono">
          <Link href="/" className="hover:text-red-400 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="text-white font-bold">Government Subsidy</span>
        </div>
      </section>

      {/* ── Hero Header ── */}
      <section className="pt-10 pb-12 bg-[#0A0A0E] border-b border-red-950/60 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="site-container relative z-10 space-y-4 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-red-950/80 text-rose-300 border border-red-500/40">
            <Landmark className="w-3.5 h-3.5 text-amber-400" />
            <span>National Solar Mission Hub</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase leading-[1.1]">
            <span className="text-white">MAKE SOLAR AFFORDABLE WITH </span>
            <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">GOVERNMENT SUBSIDY</span>
          </h1>

          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Claim up to <strong className="text-amber-300 font-bold">₹78,000 DBT</strong> under PM Surya Ghar &amp; up to 60% subsidy for farmers under PM-KUSUM — coordinated by our MNRE-empanelled EPC team.
          </p>
        </div>
      </section>


      {/* ── 01. PM Surya Ghar: Subsidy Structure (Cardless Comparison Matrix) ── */}
      <section className="py-12 bg-[#0A0A0E] border-t border-red-950/60">
        <div className="site-container space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-red-950/60">
            <div className="space-y-1.5">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400">
                01 // RESIDENTIAL SUBSIDY TIERS
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                PM Surya Ghar: Muft Bijli Yojana
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Central DBT assistance released by MNRE within 30 days of bi-directional net-meter commissioning.
              </p>
            </div>

            <Link
              href="/get-a-quote?type=Homeowner"
              className="btn-primary py-3 px-6 text-xs sm:text-sm font-bold inline-flex items-center gap-2 shrink-0 self-start sm:self-auto"
            >
              <span>Apply via ENERGYMAN</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Cardless Subsidy Comparison Grid (Perfect Pixel-Aligned Baseline Matrix) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 items-stretch">
            {pmSuryaGhar.tiers?.map((tier, tIdx) => {
              const isPopular = tIdx === 2;
              return (
                <div
                  key={tIdx}
                  className="flex flex-col justify-between h-full space-y-6 pb-6 border-b md:border-b-0 md:border-r last:border-r-0 border-red-950/60 md:pr-8 last:pr-0"
                >
                  <div className="space-y-5">
                    {/* Top Tier Label Bar */}
                    <div className="flex items-center justify-between h-6">
                      <span className="text-xs font-mono font-black text-slate-500 uppercase tracking-wider">
                        TIER 0{tIdx + 1}
                      </span>
                      {isPopular ? (
                        <span className="text-[10px] font-mono font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-red-950/80 text-rose-300 border border-red-500/40">
                          Most Popular
                        </span>
                      ) : (
                        <span className="h-4" />
                      )}
                    </div>

                    {/* System Capacity Title */}
                    <div className="min-h-[2.5rem] flex items-center">
                      <h3 className="text-2xl font-black text-white tracking-tight">
                        {tier.systemCapacity}
                      </h3>
                    </div>

                    {/* Direct Central Subsidy Readout */}
                    <div className="pt-1 pb-2 border-b border-red-950/40">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                        Direct Central Subsidy
                      </span>
                      <div className="flex items-baseline gap-2">
                        <p className="text-3xl sm:text-4xl font-black font-mono text-amber-300 tracking-tight">
                          {tier.centralSubsidy.split(" ")[0]}
                        </p>
                        {tier.centralSubsidy.includes("Fixed") && (
                          <span className="text-xs font-mono text-amber-400 font-bold">
                            (Fixed Cap)
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Specification Rows (Aligned Row Heights) */}
                    <div className="space-y-3 text-xs sm:text-sm text-slate-300 font-mono">
                      <div className="flex justify-between items-center py-1.5 border-b border-red-950/30">
                        <span className="text-slate-500">Monthly Yield:</span>
                        <strong className="text-white font-bold">{tier.monthlyGeneration}</strong>
                      </div>

                      <div className="flex justify-between items-center py-1.5 border-b border-red-950/30">
                        <span className="text-slate-500">Monthly Savings:</span>
                        <strong className="text-emerald-400 font-bold">{tier.monthlySavings}</strong>
                      </div>

                      <div className="py-1.5 border-b border-red-950/30 space-y-1 min-h-[4.5rem]">
                        <span className="text-slate-500 block text-[11px] uppercase tracking-wider">Suited For:</span>
                        <p className="text-slate-300 font-sans text-xs sm:text-sm leading-relaxed">
                          {tier.recommendedFor}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Primary Action Button (Locked to Bottom Baseline) */}
                  <div className="pt-4 mt-auto">
                    <Link
                      href={`/get-a-quote?type=Homeowner&capacity=${encodeURIComponent(tier.systemCapacity)}&bill=${tIdx === 0 ? "1000" : tIdx === 1 ? "2200" : "4500"}&kw=${tIdx === 0 ? "1" : tIdx === 1 ? "2" : "3"}`}
                      className="btn-primary w-full py-3.5 text-xs sm:text-sm font-bold text-center justify-center rounded-xl transition-all flex items-center gap-2 shadow-md shadow-red-600/20 hover:scale-[1.02]"
                    >
                      <span>Select {tier.systemCapacity}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── 02. Continuous 5-Step Process Pipeline (Cardless Milestone Track) ── */}
      <section className="py-16 bg-[#0A0A0E] border-t border-red-950/60">
        <div className="site-container space-y-10">
          
          <div className="space-y-1.5">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-red-400">
              02 // TURNKEY APPLICATION PIPELINE
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              How to Claim Your Subsidy (5-Step Process)
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              ENERGYMAN manages complete end-to-end documentation, vendor portal liaison, and DISCOM commissioning.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {subsidyProcessTimeline.map((step, idx) => (
              <div key={step.step} className="space-y-2.5 pb-4 border-b sm:border-b-0 sm:border-r last:border-r-0 border-red-950/40 sm:pr-6 last:pr-0">
                <div className="flex items-center gap-2">
                  <span className="text-2xl sm:text-3xl font-black font-mono text-red-500">
                    {step.step}
                  </span>
                  <span className="h-px flex-1 bg-red-950/60" />
                </div>
                <h4 className="text-sm font-bold text-white leading-snug">
                  {step.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed font-normal">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 03. PM-KUSUM & Commercial Tax Incentives (Cardless 2-Column Split) ── */}
      <section className="py-16 bg-[#0A0A0E] border-t border-red-950/60">
        <div className="site-container space-y-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
            
            {/* PM-KUSUM Agricultural Subsidy */}
            <div className="flex flex-col justify-between h-full space-y-6 pb-8 lg:pb-0 lg:border-r border-red-950/60 lg:pr-12">
              <div className="space-y-4">
                {/* Badge */}
                <div className="h-7 flex items-center">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-red-950/80 text-rose-300 border border-red-500/40">
                    <Tractor className="w-3.5 h-3.5 text-rose-400" />
                    <span>Agricultural Farmers</span>
                  </span>
                </div>

                {/* Title */}
                <div className="min-h-[4.5rem] flex items-center">
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                    PM-KUSUM Solar Pump Scheme (Up to 60% Subsidy)
                  </h3>
                </div>

                {/* Overview Paragraph */}
                <div className="min-h-[4.5rem] flex items-start">
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    Replaces expensive diesel irrigation with clean solar water pumping, securing daylight water access and zero recurring operational fuel expenses.
                  </p>
                </div>

                {/* 4 Aligned Highlights */}
                <div className="space-y-0 pt-2 font-medium">
                  <div className="flex items-start gap-2.5 py-3 border-b border-red-950/30 text-xs sm:text-sm text-slate-300 min-h-[3.25rem]">
                    <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <span>Component B: Standalone solar water pumps (3 HP to 10 HP) with 60% financial aid (30% Central + 30% State)</span>
                  </div>
                  <div className="flex items-start gap-2.5 py-3 border-b border-red-950/30 text-xs sm:text-sm text-slate-300 min-h-[3.25rem]">
                    <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <span>Farmer contributes only 10% to 40% capital, with subsidized low-interest bank loan facilities</span>
                  </div>
                  <div className="flex items-start gap-2.5 py-3 border-b border-red-950/30 text-xs sm:text-sm text-slate-300 min-h-[3.25rem]">
                    <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <span>Component C: Feeder-level and individual grid-connected agricultural solarization</span>
                  </div>
                  <div className="flex items-start gap-2.5 py-3 border-b border-red-950/30 text-xs sm:text-sm text-slate-300 min-h-[3.25rem]">
                    <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <span>Continuous daytime crop irrigation with options to monetize surplus power back to state DISCOMs</span>
                  </div>
                </div>
              </div>

              {/* Bottom CTA Link (Locked to Baseline) */}
              <div className="pt-4 mt-auto">
                <Link
                  href="/solutions/agricultural"
                  className="text-xs sm:text-sm font-bold text-rose-300 hover:text-white inline-flex items-center gap-1.5 transition-colors font-mono"
                >
                  <span>Explore Agricultural Solar Pumps</span>
                  <ArrowRight className="w-4 h-4 text-red-500" />
                </Link>
              </div>
            </div>

            {/* Commercial 40% Accelerated Tax Depreciation */}
            <div className="flex flex-col justify-between h-full space-y-6">
              <div className="space-y-4">
                {/* Badge */}
                <div className="h-7 flex items-center">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-amber-950/80 text-amber-300 border border-amber-500/40">
                    <Building2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>Commercial &amp; Industrial Enterprises</span>
                  </span>
                </div>

                {/* Title */}
                <div className="min-h-[4.5rem] flex items-center">
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                    Commercial 40% Accelerated Depreciation Tax Shield
                  </h3>
                </div>

                {/* Overview Paragraph */}
                <div className="min-h-[4.5rem] flex items-start">
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    Under Section 32 of the Income Tax Act, corporate entities can claim 40% accelerated tax depreciation in year 1, drastically reducing tax liability.
                  </p>
                </div>

                {/* 4 Aligned Highlights */}
                <div className="space-y-0 pt-2 font-medium">
                  <div className="flex items-start gap-2.5 py-3 border-b border-red-950/30 text-xs sm:text-sm text-slate-300 min-h-[3.25rem]">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>Substantial reduction in taxable corporate income in the exact year of solar project commissioning</span>
                  </div>
                  <div className="flex items-start gap-2.5 py-3 border-b border-red-950/30 text-xs sm:text-sm text-slate-300 min-h-[3.25rem]">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>100% input tax credit (ITC) on 18% GST paid on solar equipment &amp; EPC turnkey services</span>
                  </div>
                  <div className="flex items-start gap-2.5 py-3 border-b border-red-950/30 text-xs sm:text-sm text-slate-300 min-h-[3.25rem]">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>Hedges enterprise operations against rising commercial HT/LT electricity tariffs for 25 years</span>
                  </div>
                  <div className="flex items-start gap-2.5 py-3 border-b border-red-950/30 text-xs sm:text-sm text-slate-300 min-h-[3.25rem]">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>Enhances corporate ESG ratings, green supply-chain compliance, and verified carbon abatement accounting</span>
                  </div>
                </div>
              </div>

              {/* Bottom CTA Link (Locked to Baseline) */}
              <div className="pt-4 mt-auto">
                <Link
                  href="/solutions/commercial"
                  className="text-xs sm:text-sm font-bold text-amber-300 hover:text-white inline-flex items-center gap-1.5 transition-colors font-mono"
                >
                  <span>Explore Commercial Solar Solutions</span>
                  <ArrowRight className="w-4 h-4 text-amber-500" />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── 04. Required Documents Checklist (Cardless Minimalist Rail) ── */}
      <section className="py-16 bg-[#0A0A0E] border-t border-red-950/60">
        <div className="site-container space-y-8">
          
          <div className="space-y-1.5">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">
              04 // DOCUMENTATION REQUIREMENTS
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
              <FileText className="w-6 h-6 text-red-400" />
              <span>Required Documents for PM Surya Ghar Application</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Keep these documents ready for instantaneous registration on the National Subsidy Portal.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {pmSuryaGhar.requiredDocuments.map((doc, idx) => (
              <div key={idx} className="flex items-start gap-3 py-3 border-b border-red-950/40 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="font-medium leading-relaxed">{doc}</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 05. Subsidy FAQs ── */}
      <section className="py-16 bg-[#0A0A0E] border-t border-red-950/60">
        <div className="site-container space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-red-400">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Government Solar Subsidy FAQs
            </h3>
          </div>

          <div className="max-w-4xl mx-auto">
            <FAQAccordion defaultCategory="residential" />
          </div>
        </div>
      </section>

    </div>
  );
};

export default GovernmentSubsidyPage;
