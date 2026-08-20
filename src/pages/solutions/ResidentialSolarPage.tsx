import React from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Zap,
  Calculator
} from "lucide-react";
import { SEOHead } from "../../components/common/SEOHead";
import { solutionsData } from "../../data/solutions";
import { companyData } from "../../data/company";
import { SavingsCalculator } from "../../components/common/SavingsCalculator";
import { FAQAccordion } from "../../components/common/FAQAccordion";

export const ResidentialSolarPage: React.FC = () => {
  const data = solutionsData.find((s) => s.id === "residential") || solutionsData[0];

  return (
    <div className="bg-[#0A0A0E] text-slate-100 min-h-screen">
      <SEOHead
        title="Residential Rooftop Solar & PM Surya Ghar Subsidy"
        description="Save up to 90% on home electricity bills with ENERGYMAN's residential rooftop solar systems. Avail ₹78,000 PM Surya Ghar DBT subsidy."
      />

      {/* Hero Header */}
      <section className="pt-32 pb-16 bg-[#0A0A0E] border-b border-red-950/60 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="site-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold tracking-wider uppercase bg-red-950/80 text-rose-300 border border-red-500/40 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-red-400" />
                <span>PM Surya Ghar Muft Bijli Yojana Partner</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                SMART SOLAR SOLUTIONS FOR <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">MODERN HOMES</span>
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
                Transform your home roof into a green asset. Cut your monthly utility bills by up to 90%, earn credits via bidirectional net metering, and receive up to ₹78,000 direct bank transfer subsidy.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/get-a-quote?solution=Residential%20Solar"
                  className="btn-primary py-3.5 px-7 text-sm font-bold inline-flex items-center gap-2"
                >
                  <span>Get Free Home Solar Assessment</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="#calculator"
                  className="py-3.5 px-6 text-sm font-bold inline-flex items-center gap-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-red-950/60 transition-all"
                >
                  <Calculator className="w-4 h-4 text-amber-400" />
                  <span>Estimate Home Savings</span>
                </a>
              </div>

              {/* Trust Badges */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-400 font-semibold">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-red-400" />
                  25-Year Linear Power Warranty
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-red-400" />
                  MNRE ALMM DCR Panels
                </span>
              </div>
            </div>

            {/* Hero Image */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden border border-red-950/60 shadow-xl relative bg-slate-900">
                <img
                  src={data.heroImage}
                  alt="Residential solar villa"
                  className="w-full h-80 sm:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0E] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 bg-[#14101A]/95 backdrop-blur-md p-4 rounded-2xl border border-red-900/30 text-xs shadow-md">
                  <span className="text-slate-400 block font-bold">Direct Central Subsidy:</span>
                  <strong className="text-base text-red-400 font-black">₹30,000 to ₹78,000 Direct Bank Transfer</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview & Key Benefits */}
      <section className="section-padding bg-[#0A0A0E]">
        <div className="site-container space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Why Residential Rooftop Solar Makes Financial Sense
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                {data.overview}
              </p>

              <div className="space-y-3 pt-4">
                <h3 className="text-base font-black text-white">System Benefits &amp; Features:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {data.keyBenefits.map((b, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#14101A]/95 border border-red-900/30 text-xs text-slate-200 font-medium shadow-xs">
                      <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Technical Specifications Card */}
            <div className="lg:col-span-5 bg-[#14101A]/95 border border-red-900/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-400" />
                <span>Technical Specifications</span>
              </h3>

              <div className="space-y-3 divide-y divide-slate-800 text-xs">
                {data.technicalSpecs.map((spec, sIdx) => (
                  <div key={sIdx} className="pt-2.5 flex justify-between gap-4">
                    <span className="text-slate-400 font-medium">{spec.label}</span>
                    <span className="text-white font-bold text-right">{spec.value}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-red-950/60 space-y-2 shadow-xs">
                <p className="text-xs font-black text-red-400">Suitable Property Types:</p>
                <ul className="text-xs text-slate-300 space-y-1">
                  {data.suitableFor.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* 5-Step Execution Workflow */}
          <div className="bg-[#14101A]/95 border border-red-900/30 rounded-3xl p-8 sm:p-12 space-y-8 shadow-xl">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h3 className="text-2xl font-black text-white">
                Our 5-Step Turnkey Residential Process
              </h3>
              <p className="text-xs text-slate-300 font-normal">
                From terrace shadow simulation to DISCOM net-meter inspection and subsidy credit.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {data.processSteps.map((p) => (
                <div key={p.step} className="p-5 rounded-2xl bg-slate-900 border border-red-950/60 space-y-2 shadow-xs hover:border-red-500/50 transition-colors">
                  <span className="text-xl font-black text-red-500 font-mono">{p.step}</span>
                  <h4 className="text-sm font-bold text-white">{p.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Savings Calculator */}
      <SavingsCalculator />

      {/* Residential FAQs */}
      <section className="section-padding bg-[#0A0A0E] border-t border-red-950/60">
        <div className="site-container max-w-4xl space-y-8">
          <div className="text-center space-y-2">
            <h2 className="heading-section text-white">
              RESIDENTIAL SOLAR <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">FAQS</span>
            </h2>
            <p className="text-slate-300 text-sm">Common questions about rooftop installation, subsidy, and net metering.</p>
          </div>
          <FAQAccordion defaultCategory="residential" />
        </div>
      </section>

      {/* CTA Bottom Strip */}
      <section className="py-16 bg-[#6A0D15] text-white border-t border-red-900/60 text-center">
        <div className="site-container max-w-3xl space-y-6">
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            Ready to Power Your Home with Solar?
          </h2>
          <p className="text-xs sm:text-sm text-rose-100 font-normal">
            Contact ENERGYMAN today for a complimentary 3D shadow audit and custom savings forecast.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/get-a-quote?type=Homeowner" className="btn-solar py-3.5 px-8 font-black text-sm shadow-md">
              Request Home Site Survey →
            </Link>
            <a href={`tel:${companyData.phones.primary.replace(/\s+/g, '')}`} className="py-3.5 px-6 text-sm font-bold rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all">
              Call: {companyData.phones.primary}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResidentialSolarPage;
