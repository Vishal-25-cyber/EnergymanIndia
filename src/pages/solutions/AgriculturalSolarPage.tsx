import React from "react";
import { Link } from "react-router-dom";
import {
  Tractor,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Droplets,
  Sun,
  Sprout,
  Zap,
  Sparkles
} from "lucide-react";
import { SEOHead } from "../../components/common/SEOHead";
import { solutionsData } from "../../data/solutions";
import { FAQAccordion } from "../../components/common/FAQAccordion";

export const AgriculturalSolarPage: React.FC = () => {
  const data = solutionsData.find((s) => s.id === "agricultural") || solutionsData[3];

  return (
    <div className="bg-[#0A0A0E] text-slate-100 min-h-screen">
      <SEOHead
        title="Agricultural Solar Water Pumps & PM-KUSUM 60% Subsidy | ENERGYMAN"
        description="Replace expensive diesel engines with high-discharge stainless steel agricultural solar water pumps (3HP to 20HP). PM-KUSUM 60% subsidy assistance in Tamil Nadu."
      />

      {/* Hero Header */}
      <section className="pt-32 pb-16 bg-[#0A0A0E] border-b border-red-950/60 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="site-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold tracking-widest uppercase bg-red-950/80 text-rose-300 border border-red-500/40 shadow-xs font-mono">
                <Tractor className="w-3.5 h-3.5 text-red-400" />
                <span>PM-KUSUM GOVERNMENT SUBSIDY PARTNER (UP TO 60%)</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                POWERING FARMERS WITH <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">DAYLIGHT IRRIGATION</span>
              </h1>
              
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
                Eliminate diesel fuel costs and midnight power supply struggles. Our high-efficiency stainless steel solar submersible and surface pumps deliver reliable water flow from sunrise to sunset.
              </p>

              {/* ── Signature Concept Strip: SUN -> FIELD -> WATER -> ENERGY -> GROWTH ── */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-red-950/80 via-[#1C1625] to-slate-900 border border-red-500/40 space-y-1">
                <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest block">
                  THE AGRARIAN ENERGY CYCLE
                </span>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm font-black text-white font-mono">
                  <span className="text-amber-400">SUN</span>
                  <span className="text-red-500">→</span>
                  <span>FIELD</span>
                  <span className="text-red-500">→</span>
                  <span className="text-rose-300">WATER</span>
                  <span className="text-red-500">→</span>
                  <span className="text-amber-400">ENERGY</span>
                  <span className="text-red-500">→</span>
                  <span className="text-emerald-400">GROWTH</span>
                </div>
              </div>

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
                  className="py-3.5 px-6 text-sm font-bold rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-red-950/60 transition-all"
                >
                  <span>View Solar Pump Models</span>
                </Link>
              </div>

              {/* Badges */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-400 font-semibold">
                <span className="flex items-center gap-1.5">
                  <Droplets className="w-4 h-4 text-rose-400" />
                  Discharge up to 350,000 LPD
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  Sensorless Dry-Run Protection
                </span>
              </div>
            </div>

            {/* Hero Image */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden border border-red-900/40 shadow-2xl relative bg-slate-900">
                <img
                  src={data.heroImage}
                  alt="Agricultural solar farm pump"
                  className="w-full h-80 sm:h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0E] via-transparent to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6 bg-[#14101A]/90 backdrop-blur-md p-4 rounded-2xl border border-red-900/40 shadow-xl space-y-1">
                  <span className="text-xs font-mono font-bold text-amber-400 block">
                    PM-KUSUM COMPONENT-B & C
                  </span>
                  <p className="text-xs text-slate-200">
                    Daylight irrigation from 3 HP to 20 HP with smart MPPT Variable Frequency Drives.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4 Core Agricultural Applications from Source */}
      <section className="section-padding bg-[#0A0A0E] border-b border-red-950/60">
        <div className="site-container space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-black text-white tracking-tight">
              APPLICATIONS POWERED BY <span className="text-red-500">ENERGYMAN</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Transforming farming productivity across Tamil Nadu's agrarian districts.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Irrigation Pumps",
                desc: "High-discharge deep borewell & open well water pumping from 100ft to 600ft+ depth.",
                icon: <Droplets className="w-6 h-6 text-red-400" />
              },
              {
                title: "Cold Storage",
                desc: "Continuous solar power for horticultural perishables, fruits & vegetable preservation.",
                icon: <ShieldCheck className="w-6 h-6 text-amber-400" />
              },
              {
                title: "Greenhouses",
                desc: "Automated climate control, drip irrigation valves, and micro-sprinkler misting systems.",
                icon: <Sprout className="w-6 h-6 text-rose-400" />
              },
              {
                title: "Farm Lighting",
                desc: "All-in-one solar LED security perimeters, livestock sheds, and farmhouse electrification.",
                icon: <Sun className="w-6 h-6 text-amber-400" />
              }
            ].map((app, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-[#14101A]/95 border border-red-900/30 space-y-3 hover:border-red-500/50 transition-all shadow-md"
              >
                <div className="p-3 rounded-2xl bg-slate-900 border border-red-950/60 w-fit">
                  {app.icon}
                </div>
                <h3 className="text-lg font-black text-white">{app.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">{app.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specifications & Process Table */}
      <section className="section-padding bg-[#0A0A0E] border-b border-red-950/60">
        <div className="site-container max-w-4xl space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-white">Technical Pump Sizing & Capabilities</h2>
            <p className="text-xs text-slate-400">Manufactured with food-grade SS304/SS316 multi-stage impellers.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {[
              { label: "Power Range", value: "3 HP, 5 HP, 7.5 HP, 10 HP to 20 HP" },
              { label: "Head Range", value: "30 Meters to 220 Meters (Up to 600+ Feet)" },
              { label: "Daily Discharge", value: "20,000 to 350,000 Litres / Day" },
              { label: "Motor Type", value: "Permanent Magnet BLDC / Water-Filled AC" },
              { label: "Controller Tech", value: "> 98% Vector MPPT VFD with Dry-Run Sensor" },
              { label: "Government Subsidy", value: "Up to 60% under PM-KUSUM Scheme" },
              { label: "Pump Material", value: "Food-Grade SS304 / SS316 Stainless Steel" },
              { label: "Remote Starter", value: "GSM Mobile Mobile App ON/OFF & SMS Alerts" }
            ].map((spec, sIdx) => (
              <div
                key={sIdx}
                className="p-4 rounded-2xl bg-[#14101A]/95 border border-red-900/30 flex items-center justify-between"
              >
                <span className="text-slate-400 font-bold font-mono">{spec.label}</span>
                <strong className="text-white font-mono">{spec.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-[#0A0A0E]">
        <div className="site-container max-w-3xl space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-black text-white">Agricultural Solar FAQs</h2>
            <p className="text-xs text-slate-400">Everything you need to know regarding PM-KUSUM pump subsidies.</p>
          </div>
          <FAQAccordion defaultCategory="Agricultural Solar" />
        </div>
      </section>
    </div>
  );
};

export default AgriculturalSolarPage;
