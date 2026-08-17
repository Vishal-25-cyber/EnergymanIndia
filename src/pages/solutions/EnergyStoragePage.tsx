import React from "react";
import { Link } from "react-router-dom";
import {
  BatteryCharging,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Zap,
  TrendingUp,
  Cpu,
  Clock
} from "lucide-react";
import { SEOHead } from "../../components/common/SEOHead";
import { solutionsData } from "../../data/solutions";
import { companyData } from "../../data/company";
import { FAQAccordion } from "../../components/common/FAQAccordion";

export const EnergyStoragePage: React.FC = () => {
  const data = solutionsData.find((s) => s.id === "energy-storage") || solutionsData[5];

  return (
    <>
      <SEOHead
        title="Battery Energy Storage Systems (BESS) & LiFePO4 Banks"
        description="Lithium Iron Phosphate (LiFePO4) solar battery energy storage systems for commercial peak shaving and 24/7 uninterruptible home power independence."
      />

      {/* Hero Header */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-brand-950 via-brand-900/60 to-brand-950 border-b border-slate-800 relative overflow-hidden">
        <div className="site-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-amber-500/10 text-amber-400 border border-amber-500/30">
                <BatteryCharging className="w-3.5 h-3.5" />
                <span>Next-Gen LiFePO4 Energy Storage (BESS)</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                TRUE 24/7 POWER INDEPENDENCE WITH <span className="bg-gradient-to-r from-amber-400 to-energy-400 bg-clip-text text-transparent">ENERGY STORAGE</span>
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                Store surplus daytime solar power and discharge during peak grid tariff hours or unexpected power outages. Safe, long-lasting Lithium Iron Phosphate chemistry with 6,000+ deep cycles.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/get-a-quote?solution=Energy%20Storage%20BESS"
                  className="btn-primary py-3.5 px-7 text-sm font-bold inline-flex items-center gap-2"
                >
                  <span>Request Storage System Sizing</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/products/energy-storage"
                  className="btn-secondary py-3.5 px-6 text-sm font-semibold"
                >
                  <span>View LiFePO4 Rack Models</span>
                </Link>
              </div>

              {/* Badges */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-300 font-medium">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  6,000+ Life Cycles (15+ Yrs)
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-energy-400" />
                  Sub-10ms Seamless Transfer Time
                </span>
              </div>
            </div>

            {/* Hero Image */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden border border-slate-800 shadow-2xl relative">
                <img
                  src={data.heroImage}
                  alt="Lithium battery energy storage rack"
                  className="w-full h-80 sm:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 bg-brand-900/90 backdrop-blur-md p-4 rounded-2xl border border-slate-700 text-xs">
                  <span className="text-slate-400 block">Battery Chemistry:</span>
                  <strong className="text-base text-amber-400 font-extrabold">Grade-A LiFePO4 (Ultra-Safe)</strong>
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
                Round-the-Clock Clean Power & Peak Shaving
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                {data.overview}
              </p>

              <div className="space-y-3 pt-4">
                <h3 className="text-base font-bold text-white">BESS Advantages:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {data.keyBenefits.map((b, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-brand-900/60 border border-slate-800 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Technical Specs Card */}
            <div className="lg:col-span-5 bg-brand-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <BatteryCharging className="w-5 h-5 text-amber-400" />
                <span>BESS Technical Specifications</span>
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
                <p className="text-xs font-bold text-amber-400">Recommended Storage Applications:</p>
                <ul className="text-xs text-slate-300 space-y-1">
                  {data.suitableFor.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-padding bg-brand-950/90 border-t border-slate-800">
        <div className="site-container max-w-4xl space-y-8">
          <div className="text-center space-y-2">
            <h2 className="heading-section">
              BATTERY STORAGE <span className="text-amber-400">FAQS</span>
            </h2>
            <p className="text-subtle">Cycle life, safety ratings, and hybrid inverter compatibility.</p>
          </div>
          <FAQAccordion defaultCategory="technical" />
        </div>
      </section>
    </>
  );
};
