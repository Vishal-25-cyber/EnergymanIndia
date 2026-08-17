import React from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Clock,
  ArrowRight,
  TrendingUp,
  Download,
  AlertCircle,
  HelpCircle
} from "lucide-react";
import { SEOHead } from "../components/common/SEOHead";
import { subsidySchemes, subsidyProcessTimeline } from "../data/subsidies";
import { FAQAccordion } from "../components/common/FAQAccordion";
import { companyData } from "../data/company";

export const GovernmentSubsidyPage: React.FC = () => {
  const pmSuryaGhar = subsidySchemes[0];
  const pmKusum = subsidySchemes[1];
  const commercialTax = subsidySchemes[2];

  return (
    <>
      <SEOHead
        title="Government Solar Subsidy Guide - PM Surya Ghar & PM-KUSUM"
        description="Complete 2026 guide to claiming ₹78,000 subsidy under PM Surya Ghar Muft Bijli Yojana and up to 60% subsidy for solar pumps under PM-KUSUM."
      />

      {/* Hero Header */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-brand-950 via-brand-900/60 to-brand-950 border-b border-slate-800">
        <div className="site-container text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-solar-500/10 text-solar-400 border border-solar-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>National Solar Mission Hub</span>
          </div>
          <h1 className="heading-hero text-white">
            MAKE SOLAR MORE AFFORDABLE WITH <span className="bg-gradient-to-r from-solar-400 to-energy-400 bg-clip-text text-transparent">GOVERNMENT SUBSIDY</span>
          </h1>
          <p className="text-subtle">
            Get up to ₹78,000 Direct Benefit Transfer (DBT) central subsidy for homes under PM Surya Ghar and up to 60% subsidy for agricultural pumps under PM-KUSUM.
          </p>
        </div>
      </section>

      {/* Main Subsidy Content */}
      <section className="section-padding bg-brand-950">
        <div className="site-container space-y-16">
          {/* PM Surya Ghar Tier Breakdown Table */}
          <div className="bg-brand-900/80 backdrop-blur-xl border border-slate-700/80 rounded-3xl p-6 sm:p-10 space-y-8 shadow-2xl">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="badge-amber text-xs font-bold mb-1 inline-flex">Residential Homeowners</span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                    PM Surya Ghar: Muft Bijli Yojana Subsidy Structure
                  </h2>
                </div>
                <Link
                  to="/get-a-quote?type=Homeowner"
                  className="btn-primary py-2.5 px-5 text-xs font-bold"
                >
                  Apply via Energy Man India →
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
                  className={`p-6 rounded-3xl border flex flex-col justify-between space-y-5 ${
                    tIdx === 2
                      ? "bg-brand-850/90 border-solar-500/60 shadow-xl shadow-solar-500/5 ring-1 ring-solar-500/40"
                      : "bg-brand-950/80 border-slate-800"
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-white">{tier.systemCapacity}</h3>
                      {tIdx === 2 && (
                        <span className="badge-amber text-[10px]">Most Popular</span>
                      )}
                    </div>

                    <div className="p-4 rounded-2xl bg-brand-900 border border-slate-800">
                      <span className="text-[11px] text-slate-400 block">Direct Central Subsidy:</span>
                      <div className="text-2xl font-black text-solar-400">
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
                        <strong className="text-energy-400">{tier.monthlySavings}</strong>
                      </div>
                      <div className="pt-2 flex justify-between">
                        <span className="text-slate-400">Recommended For:</span>
                        <span className="text-slate-200 font-medium text-right max-w-[160px]">{tier.recommendedFor}</span>
                      </div>
                    </div>
                  </div>

                  <Link
                    to={`/get-a-quote?type=Homeowner&capacity=${encodeURIComponent(tier.systemCapacity)}`}
                    className="btn-secondary w-full py-2.5 text-xs font-bold text-center justify-center"
                  >
                    Select {tier.systemCapacity} Plan
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* 5-Step Visual Timeline */}
          <div className="bg-brand-900/60 border border-slate-800 rounded-3xl p-8 sm:p-12 space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                How to Claim Your Subsidy (5-Step Visual Timeline)
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Energy Man India manages the end-to-end portal filing, structural installation, and net-meter approvals.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {subsidyProcessTimeline.map((step) => (
                <div
                  key={step.step}
                  className="p-6 rounded-2xl bg-brand-950/90 border border-slate-800 space-y-3 relative group hover:border-energy-500/40 transition-colors"
                >
                  <span className="text-2xl font-extrabold text-energy-400 font-mono">
                    {step.step}
                  </span>
                  <h4 className="text-sm font-bold text-white group-hover:text-energy-400 transition-colors">
                    {step.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* PM-KUSUM & Commercial Tax Incentives Dual Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* PM-KUSUM Agriculture */}
            <div className="p-8 rounded-3xl bg-brand-900/75 border border-slate-800 space-y-6">
              <div className="space-y-2">
                <span className="badge-emerald text-xs font-bold">Agricultural Farmers</span>
                <h3 className="text-xl font-bold text-white">{pmKusum.name}</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{pmKusum.overview}</p>
              </div>

              <div className="space-y-2">
                {pmKusum.keyHighlights.map((hl, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>

              <Link to="/solutions/agricultural" className="text-xs font-bold text-emerald-400 hover:underline inline-flex items-center gap-1">
                Explore Agricultural Solar Solutions →
              </Link>
            </div>

            {/* Commercial 40% Tax Depreciation */}
            <div className="p-8 rounded-3xl bg-brand-900/75 border border-slate-800 space-y-6">
              <div className="space-y-2">
                <span className="badge-amber text-xs font-bold">Commercial & Industrial</span>
                <h3 className="text-xl font-bold text-white">{commercialTax.name}</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{commercialTax.overview}</p>
              </div>

              <div className="space-y-2">
                {commercialTax.keyHighlights.map((hl, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-solar-400 shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>

              <Link to="/solutions/commercial" className="text-xs font-bold text-solar-400 hover:underline inline-flex items-center gap-1">
                Explore Commercial Solar Systems →
              </Link>
            </div>
          </div>

          {/* Required Documents Checklist */}
          <div className="p-8 rounded-3xl bg-brand-900/60 border border-slate-800 space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-energy-400" />
              <span>Required Documents for PM Surya Ghar Application</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {pmSuryaGhar.requiredDocuments.map((doc, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-brand-950 border border-slate-800 flex items-start gap-3 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-energy-400 shrink-0 mt-0.5" />
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white text-center">Government Subsidy FAQs</h3>
            <div className="max-w-4xl mx-auto">
              <FAQAccordion defaultCategory="residential" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
