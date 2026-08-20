import React from "react";
import { Link } from "react-router-dom";
import {
  BatteryCharging,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Clock
} from "lucide-react";
import { SEOHead } from "../../components/common/SEOHead";
import { solutionsData } from "../../data/solutions";
import { FAQAccordion } from "../../components/common/FAQAccordion";

export const EnergyStoragePage: React.FC = () => {
  const data = solutionsData.find((s) => s.id === "energy-storage") || solutionsData[5];

  return (
    <div className="bg-[#0A0A0E] text-slate-100 min-h-screen">
      <SEOHead
        title="Battery Energy Storage Systems (BESS) & LiFePO4 Banks"
        description="Lithium Iron Phosphate (LiFePO4) solar battery energy storage systems for commercial peak shaving and 24/7 uninterruptible home power independence."
      />

      {/* Hero Header */}
      <section className="pt-32 pb-16 bg-[#0A0A0E] border-b border-red-950/60 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="site-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold tracking-wider uppercase bg-amber-950/80 text-amber-300 border border-amber-500/40 shadow-xs">
                <BatteryCharging className="w-3.5 h-3.5 text-amber-400" />
                <span>Next-Gen LiFePO4 Energy Storage (BESS)</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                TRUE 24/7 POWER INDEPENDENCE WITH <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">ENERGY STORAGE</span>
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
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
                  className="py-3.5 px-6 text-sm font-bold rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-red-950/60 transition-all"
                >
                  <span>View LiFePO4 Rack Models</span>
                </Link>
              </div>

              {/* Badges */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-400 font-semibold">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  6,000+ Life Cycles (15+ Yrs)
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-red-400" />
                  Sub-10ms Seamless Transfer Time
                </span>
              </div>
            </div>

            {/* Hero Image */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden border border-red-950/60 shadow-xl relative bg-slate-900">
                <img
                  src={data.heroImage}
                  alt="Lithium battery energy storage rack"
                  className="w-full h-80 sm:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0E] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 bg-[#14101A]/95 backdrop-blur-md p-4 rounded-2xl border border-red-900/30 text-xs shadow-md">
                  <span className="text-slate-400 block font-bold">Battery Chemistry:</span>
                  <strong className="text-base text-amber-300 font-black">Grade-A LiFePO4 (Ultra-Safe)</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview & Key Highlights */}
      <section className="section-padding bg-[#0A0A0E]">
        <div className="site-container space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Round-the-Clock Clean Power &amp; Peak Shaving
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                {data.overview}
              </p>

              <div className="space-y-3 pt-4">
                <h3 className="text-base font-black text-white">Energy Storage Benefits:</h3>
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

            {/* Technical Specs Card */}
            <div className="lg:col-span-5 bg-[#14101A]/95 border border-red-900/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <BatteryCharging className="w-5 h-5 text-amber-400" />
                <span>BESS Technical Specs</span>
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
                <p className="text-xs font-black text-amber-400">Suitable Applications:</p>
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

          {/* 5-Step Process */}
          <div className="bg-[#14101A]/95 border border-red-900/30 rounded-3xl p-8 sm:p-12 space-y-8 shadow-xl">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h3 className="text-2xl font-black text-white">
                Our 5-Step Storage Integration Process
              </h3>
              <p className="text-xs text-slate-300 font-normal">
                Engineered for maximum safety, thermal stability, and battery life cycle optimization.
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

      {/* Storage FAQs */}
      <section className="section-padding bg-[#0A0A0E] border-t border-red-950/60">
        <div className="site-container max-w-4xl space-y-8">
          <div className="text-center space-y-2">
            <h2 className="heading-section text-white">
              ENERGY STORAGE <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">FAQS</span>
            </h2>
            <p className="text-slate-300 text-sm">LiFePO4 battery chemistry, depth of discharge (DoD), and warranty life.</p>
          </div>
          <FAQAccordion defaultCategory="technical" />
        </div>
      </section>
    </div>
  );
};

export default EnergyStoragePage;
