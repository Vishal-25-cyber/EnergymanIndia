import React from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  CheckCircle2,
  FileText,
  ArrowRight,
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
        title="Government Solar Subsidy Guide - PM Surya Ghar & PM-KUSUM"
        description="Complete 2026 guide to claiming ₹78,000 subsidy under PM Surya Ghar Muft Bijli Yojana and up to 60% subsidy for solar pumps under PM-KUSUM."
      />

      {/* Hero Header */}
      <section className="pt-32 pb-16 bg-[#0A0A0E] border-b border-red-950/60 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="site-container relative z-10 text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold tracking-wider uppercase bg-amber-950/80 text-amber-300 border border-amber-500/40 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>National Solar Mission Hub</span>
          </div>
          <h1 className="heading-hero text-white">
            MAKE SOLAR MORE AFFORDABLE WITH <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">GOVERNMENT SUBSIDY</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            Get up to ₹78,000 Direct Benefit Transfer (DBT) central subsidy for homes under PM Surya Ghar and up to 60% subsidy for agricultural pumps under PM-KUSUM.
          </p>
        </div>
      </section>

      {/* Main Subsidy Content */}
      <section className="section-padding bg-[#0A0A0E] relative">
        <div className="site-container space-y-16">
          {/* PM Surya Ghar Tier Breakdown Table */}
          <div className="bg-[#14101A]/95 border border-red-900/30 rounded-3xl p-6 sm:p-10 space-y-8 shadow-xl">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="bg-amber-950/80 text-amber-300 border border-amber-500/40 text-xs font-extrabold px-3 py-1 rounded-full mb-2 inline-flex">Residential Homeowners</span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">
                    PM Surya Ghar: Muft Bijli Yojana Subsidy Structure
                  </h2>
                </div>
                <Link
                  to="/get-a-quote?type=Homeowner"
                  className="btn-primary py-2.5 px-5 text-xs font-bold inline-flex items-center gap-1.5"
                >
                  <span>Apply via ENERGYMAN</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <p className="text-xs sm:text-sm text-slate-300">
                Direct central financial assistance deposited directly into your bank account after net-meter commissioning.
              </p>
            </div>

            {/* Subsidy Tiers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pmSuryaGhar.tiers?.map((tier, tIdx) => (
                <div
                  key={tIdx}
                  className={`p-6 rounded-3xl border flex flex-col justify-between space-y-5 transition-all shadow-md ${
                    tIdx === 2
                      ? "bg-[#1C1625] border-red-500/60 shadow-xl shadow-black/70 ring-1 ring-red-500/30"
                      : "bg-slate-900 border-red-950/60 hover:border-red-900"
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-black text-white">{tier.systemCapacity}</h3>
                      {tIdx === 2 && (
                        <span className="badge-crimson text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">Most Popular</span>
                      )}
                    </div>

                    <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30">
                      <span className="text-[11px] text-slate-400 font-bold block">Direct Central Subsidy:</span>
                      <div className="text-2xl font-black text-amber-300 font-mono">
                        {tier.centralSubsidy}
                      </div>
                    </div>

                    <div className="space-y-2 text-xs divide-y divide-slate-800 text-slate-300">
                      <div className="pt-2 flex justify-between">
                        <span className="text-slate-400">Monthly Generation:</span>
                        <strong className="text-white">{tier.monthlyGeneration}</strong>
                      </div>
                      <div className="pt-2 flex justify-between">
                        <span className="text-slate-400">Monthly Bill Savings:</span>
                        <strong className="text-red-400 font-bold">{tier.monthlySavings}</strong>
                      </div>
                      <div className="pt-2 flex justify-between">
                        <span className="text-slate-400">Recommended For:</span>
                        <span className="text-slate-200 font-medium text-right max-w-[160px]">{tier.recommendedFor}</span>
                      </div>
                    </div>
                  </div>

                  <Link
                    to={`/get-a-quote?type=Homeowner&capacity=${encodeURIComponent(tier.systemCapacity)}`}
                    className="w-full py-2.5 text-xs font-bold text-center justify-center bg-slate-900 hover:bg-red-600 text-slate-200 hover:text-white rounded-xl transition-all border border-red-950/60 block"
                  >
                    Select {tier.systemCapacity} Plan
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* 5-Step Visual Timeline */}
          <div className="bg-[#14101A]/95 border border-red-900/30 rounded-3xl p-8 sm:p-12 space-y-8 shadow-xl">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                How to Claim Your Subsidy (5-Step Process)
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                ENERGYMAN manages the end-to-end portal filing, structural installation, and net-meter approvals.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {subsidyProcessTimeline.map((step) => (
                <div
                  key={step.step}
                  className="p-6 rounded-2xl bg-slate-900 border border-red-950/60 space-y-3 relative group hover:border-red-500/50 transition-colors shadow-xs"
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

          {/* PM-KUSUM & Commercial Tax Incentives Dual Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* PM-KUSUM Agriculture */}
            <div className="p-8 rounded-3xl bg-[#14101A]/95 border border-red-900/30 space-y-6 shadow-xl hover:border-red-500/50 transition-all">
              <div className="space-y-2">
                <span className="badge-crimson text-xs font-extrabold px-3 py-1 rounded-full inline-block">Agricultural Farmers</span>
                <h3 className="text-xl font-black text-white">{pmKusum.name}</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">{pmKusum.overview}</p>
              </div>

              <div className="space-y-2">
                {pmKusum.keyHighlights.map((hl, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>

              <Link to="/solutions/agricultural" className="text-xs font-bold text-red-400 hover:text-rose-300 inline-flex items-center gap-1">
                <span>Explore Agricultural Solar Solutions</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Commercial 40% Tax Depreciation */}
            <div className="p-8 rounded-3xl bg-[#14101A]/95 border border-red-900/30 space-y-6 shadow-xl hover:border-amber-500/50 transition-all">
              <div className="space-y-2">
                <span className="bg-amber-950/80 text-amber-300 border border-amber-500/40 text-xs font-extrabold px-3 py-1 rounded-full inline-block">Commercial &amp; Industrial</span>
                <h3 className="text-xl font-black text-white">{commercialTax.name}</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">{commercialTax.overview}</p>
              </div>

              <div className="space-y-2">
                {commercialTax.keyHighlights.map((hl, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>

              <Link to="/solutions/commercial" className="text-xs font-bold text-amber-400 hover:text-amber-300 inline-flex items-center gap-1">
                <span>Explore Commercial Solar Systems</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Required Documents Checklist */}
          <div className="p-8 rounded-3xl bg-[#14101A]/95 border border-red-900/30 space-y-6 shadow-xl">
            <h3 className="text-xl font-black text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-red-400" />
              <span>Required Documents for PM Surya Ghar Application</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {pmSuryaGhar.requiredDocuments.map((doc, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-900 border border-red-950/60 flex items-start gap-3 text-xs text-slate-300 shadow-xs font-medium">
                  <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-6">
            <h3 className="text-2xl font-black text-white text-center">Government Subsidy FAQs</h3>
            <div className="max-w-4xl mx-auto">
              <FAQAccordion defaultCategory="residential" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GovernmentSubsidyPage;
