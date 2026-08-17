import React from "react";
import { Link } from "react-router-dom";
import {
  Tractor,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Zap,
  TrendingUp,
  Droplets,
  Sun
} from "lucide-react";
import { SEOHead } from "../../components/common/SEOHead";
import { solutionsData } from "../../data/solutions";
import { companyData } from "../../data/company";
import { FAQAccordion } from "../../components/common/FAQAccordion";

export const AgriculturalSolarPage: React.FC = () => {
  const data = solutionsData.find((s) => s.id === "agricultural") || solutionsData[3];

  return (
    <>
      <SEOHead
        title="Agricultural Solar Water Pumps & PM-KUSUM 60% Subsidy"
        description="Replace expensive diesel engines with high-discharge stainless steel agricultural solar water pumps (3HP to 15HP). PM-KUSUM 60% subsidy assistance."
      />

      {/* Hero Header */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-brand-950 via-brand-900/60 to-brand-950 border-b border-slate-800 relative overflow-hidden">
        <div className="site-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                <Tractor className="w-3.5 h-3.5" />
                <span>PM-KUSUM Government Subsidy Partner (Up to 60%)</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                POWERING FARMERS WITH <span className="bg-gradient-to-r from-emerald-400 to-solar-400 bg-clip-text text-transparent">DAYLIGHT IRRIGATION</span>
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                Eliminate diesel fuel costs and midnight power supply struggles. Our high-efficiency stainless steel solar submersible and surface pumps deliver reliable water flow from sunrise to sunset.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/get-a-quote?solution=Agricultural%20Solar%20Pump"
                  className="btn-primary py-3.5 px-7 text-sm font-bold inline-flex items-center gap-2"
                >
                  <span>Inquire for PM-KUSUM Pump Subsidy</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/products/solar-pumps"
                  className="btn-secondary py-3.5 px-6 text-sm font-semibold"
                >
                  <span>View Solar Pump Models</span>
                </Link>
              </div>

              {/* Badges */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-300 font-medium">
                <span className="flex items-center gap-1.5">
                  <Droplets className="w-4 h-4 text-emerald-400" />
                  Discharge up to 350,000 LPD
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-solar-400" />
                  Sensorless Dry-Run Protection
                </span>
              </div>
            </div>

            {/* Hero Image */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden border border-slate-800 shadow-2xl relative">
                <img
                  src={data.heroImage}
                  alt="Agricultural solar farm pump"
                  className="w-full h-80 sm:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 bg-brand-900/90 backdrop-blur-md p-4 rounded-2xl border border-slate-700 text-xs">
                  <span className="text-slate-400 block">PM-KUSUM Financial Support:</span>
                  <strong className="text-base text-emerald-400 font-extrabold">Up to 60% Central + State Subsidy</strong>
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
                Reliable Water Security for Indian Agriculture
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                {data.overview}
              </p>

              <div className="space-y-3 pt-4">
                <h3 className="text-base font-bold text-white">Agricultural Solar Advantages:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {data.keyBenefits.map((b, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-brand-900/60 border border-slate-800 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Technical Specs Card */}
            <div className="lg:col-span-5 bg-brand-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Droplets className="w-5 h-5 text-emerald-400" />
                <span>Solar Pump Specifications</span>
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
                <p className="text-xs font-bold text-emerald-400">Suitable Agricultural Applications:</p>
                <ul className="text-xs text-slate-300 space-y-1">
                  {data.suitableFor.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
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
                Our 5-Step Agricultural Pump Deployment Process
              </h3>
              <p className="text-xs text-slate-400">
                From borewell depth mapping and hydro-testing to PM-KUSUM subsidy filing.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {data.processSteps.map((p) => (
                <div key={p.step} className="p-5 rounded-2xl bg-brand-950/80 border border-slate-800 space-y-2">
                  <span className="text-xl font-extrabold text-emerald-400 font-mono">{p.step}</span>
                  <h4 className="text-sm font-bold text-white">{p.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Agricultural FAQs */}
      <section className="section-padding bg-brand-950/90 border-t border-slate-800">
        <div className="site-container max-w-4xl space-y-8">
          <div className="text-center space-y-2">
            <h2 className="heading-section">
              AGRICULTURAL SOLAR <span className="text-emerald-400">FAQS</span>
            </h2>
            <p className="text-subtle">Learn about PM-KUSUM pump subsidies, water discharge volume, and pump warranties.</p>
          </div>
          <FAQAccordion defaultCategory="agricultural" />
        </div>
      </section>
    </>
  );
};
