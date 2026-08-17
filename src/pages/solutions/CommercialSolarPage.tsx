import React from "react";
import { Link } from "react-router-dom";
import {
  Building2,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Zap,
  TrendingUp,
  Percent,
  Calculator
} from "lucide-react";
import { SEOHead } from "../../components/common/SEOHead";
import { solutionsData } from "../../data/solutions";
import { companyData } from "../../data/company";
import { SavingsCalculator } from "../../components/common/SavingsCalculator";
import { FAQAccordion } from "../../components/common/FAQAccordion";

export const CommercialSolarPage: React.FC = () => {
  const data = solutionsData.find((s) => s.id === "commercial") || solutionsData[1];

  return (
    <>
      <SEOHead
        title="Commercial Solar Power Systems & 40% Tax Depreciation"
        description="Slash commercial electricity tariffs, claim Section 32 40% accelerated depreciation, and improve ESG ratings with Energy Man India commercial solar EPC."
      />

      {/* Hero Header */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-brand-950 via-brand-900/60 to-brand-950 border-b border-slate-800 relative overflow-hidden">
        <div className="site-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-solar-500/10 text-solar-400 border border-solar-500/30">
                <Percent className="w-3.5 h-3.5" />
                <span>40% Accelerated Tax Depreciation & ESG Compliance</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                SMART ENERGY FOR <span className="bg-gradient-to-r from-solar-400 to-energy-400 bg-clip-text text-transparent">MODERN BUSINESS</span>
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                Commercial electricity tariffs in India average ₹8 to ₹12/unit. Power your offices, hospitals, educational campuses, and hotels with high-yield rooftop solar producing clean electricity at less than ₹2.50/unit over 25 years.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/get-a-quote?solution=Commercial%20Solar"
                  className="btn-primary py-3.5 px-7 text-sm font-bold inline-flex items-center gap-2"
                >
                  <span>Request Commercial Energy Feasibility</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/projects/commercial"
                  className="btn-secondary py-3.5 px-6 text-sm font-semibold"
                >
                  <span>View Commercial Projects</span>
                </Link>
              </div>

              {/* Badges */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-300 font-medium">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-solar-400" />
                  CAPEX & OPEX / RESCO Models
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-energy-400" />
                  CEIG / Safety Inspectorate Liaison
                </span>
              </div>
            </div>

            {/* Hero Image */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden border border-slate-800 shadow-2xl relative">
                <img
                  src={data.heroImage}
                  alt="Commercial solar building"
                  className="w-full h-80 sm:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 bg-brand-900/90 backdrop-blur-md p-4 rounded-2xl border border-slate-700 text-xs">
                  <span className="text-slate-400 block">Typical Capital Payback:</span>
                  <strong className="text-base text-energy-400 font-extrabold">{data.typicalRoi}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview & Key Highlights */}
      <section className="section-padding bg-brand-950">
        <div className="site-container space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Strategic Cost Reduction & Corporate Sustainability
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                {data.overview}
              </p>

              <div className="space-y-3 pt-4">
                <h3 className="text-base font-bold text-white">Commercial System Advantages:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {data.keyBenefits.map((b, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-brand-900/60 border border-slate-800 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-solar-400 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Technical Specs Card */}
            <div className="lg:col-span-5 bg-brand-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-solar-400" />
                <span>Commercial System Specifications</span>
              </h3>

              <div className="space-y-3 divide-y divide-slate-800 text-xs">
                {data.technicalSpecs.map((spec, sIdx) => (
                  <div key={sIdx} className="pt-2.5 flex justify-between gap-4">
                    <span className="text-slate-400 font-medium">{spec.label}</span>
                    <span className="text-slate-200 font-bold text-right">{spec.value}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-brand-950 border border-slate-800 space-y-2">
                <p className="text-xs font-bold text-solar-400">Suitable Commercial Facilities:</p>
                <ul className="text-xs text-slate-300 space-y-1">
                  {data.suitableFor.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-solar-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* 5-Step Process */}
          <div className="bg-brand-900/60 border border-slate-800 rounded-3xl p-8 sm:p-12 space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h3 className="text-2xl font-bold text-white">
                Our 5-Step Commercial EPC Execution Model
              </h3>
              <p className="text-xs text-slate-400">
                Engineered for rapid delivery with zero operational interruption to your business.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {data.processSteps.map((p) => (
                <div key={p.step} className="p-5 rounded-2xl bg-brand-950/80 border border-slate-800 space-y-2">
                  <span className="text-xl font-extrabold text-solar-400 font-mono">{p.step}</span>
                  <h4 className="text-sm font-bold text-white">{p.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Savings Calculator */}
      <SavingsCalculator />

      {/* FAQs */}
      <section className="section-padding bg-brand-950/90 border-t border-slate-800">
        <div className="site-container max-w-4xl space-y-8">
          <div className="text-center space-y-2">
            <h2 className="heading-section">
              COMMERCIAL SOLAR <span className="text-solar-400">FAQS</span>
            </h2>
            <p className="text-subtle">Learn about tax depreciation, CEIG clearances, and payback calculations.</p>
          </div>
          <FAQAccordion defaultCategory="commercial" />
        </div>
      </section>
    </>
  );
};
