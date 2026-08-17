import React from "react";
import { Link } from "react-router-dom";
import {
  Wrench,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Zap,
  Activity,
  Cpu,
  Clock
} from "lucide-react";
import { SEOHead } from "../../components/common/SEOHead";
import { solutionsData } from "../../data/solutions";
import { companyData } from "../../data/company";
import { SolarHealthAudit } from "../../components/common/SolarHealthAudit";
import { FAQAccordion } from "../../components/common/FAQAccordion";

export const SolarEPCMaintenancePage: React.FC = () => {
  const data = solutionsData.find((s) => s.id === "epc-maintenance") || solutionsData[4];

  return (
    <>
      <SEOHead
        title="Turnkey Solar EPC & Lifetime O&M Services"
        description="End-to-end solar EPC engineering, procurement, construction, and SCADA-backed Operations & Maintenance (O&M) for guaranteed plant uptime."
      />

      {/* Hero Header */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-brand-950 via-brand-900/60 to-brand-950 border-b border-slate-800 relative overflow-hidden">
        <div className="site-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-purple-500/10 text-purple-400 border border-purple-500/30">
                <Wrench className="w-3.5 h-3.5" />
                <span>Turnkey Plant Engineering & Performance Guarantees</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                PRECISION SOLAR EPC & <span className="bg-gradient-to-r from-purple-400 to-energy-400 bg-clip-text text-transparent">LIFETIME O&M</span>
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                A solar plant is a 25-year financial generator. Energy Man India delivers end-to-end EPC turnkey delivery alongside AI-powered Operations & Maintenance (O&M) to safeguard maximum kilowatt-hour generation.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/get-a-quote?solution=Solar%20EPC%20and%20OM"
                  className="btn-primary py-3.5 px-7 text-sm font-bold inline-flex items-center gap-2"
                >
                  <span>Inquire for EPC / O&M Contract</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/contact"
                  className="btn-secondary py-3.5 px-6 text-sm font-semibold"
                >
                  <span>Request Plant Health Audit</span>
                </Link>
              </div>

              {/* Badges */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-300 font-medium">
                <span className="flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-purple-400" />
                  Drone Thermal Anomaly Scanning
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-energy-400" />
                  Guaranteed Performance Ratio (PR)
                </span>
              </div>
            </div>

            {/* Hero Image */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden border border-slate-800 shadow-2xl relative">
                <img
                  src={data.heroImage}
                  alt="Solar EPC engineering maintenance"
                  className="w-full h-80 sm:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 bg-brand-900/90 backdrop-blur-md p-4 rounded-2xl border border-slate-700 text-xs">
                  <span className="text-slate-400 block">Plant Availability SLA:</span>
                  <strong className="text-base text-purple-400 font-extrabold">&gt; 99% Guaranteed Generation Uptime</strong>
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
                Maximizing 25-Year Plant Performance & Asset Longevity
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                {data.overview}
              </p>

              <div className="space-y-3 pt-4">
                <h3 className="text-base font-bold text-white">EPC & O&M Scope:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {data.keyBenefits.map((b, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-brand-900/60 border border-slate-800 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Technical Specs Card */}
            <div className="lg:col-span-5 bg-brand-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Wrench className="w-5 h-5 text-purple-400" />
                <span>O&M Service Protocols</span>
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
                <p className="text-xs font-bold text-purple-400">Suitable Solar Assets:</p>
                <ul className="text-xs text-slate-300 space-y-1">
                  {data.suitableFor.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Fault & Plant Health Audit Tool */}
      <SolarHealthAudit />

      {/* FAQs */}
      <section className="section-padding bg-brand-950/90 border-t border-slate-800">
        <div className="site-container max-w-4xl space-y-8">
          <div className="text-center space-y-2">
            <h2 className="heading-section">
              SOLAR EPC & O&M <span className="text-purple-400">FAQS</span>
            </h2>
            <p className="text-subtle">Thermography, module washing schedules, and response SLAs.</p>
          </div>
          <FAQAccordion defaultCategory="technical" />
        </div>
      </section>
    </>
  );
};
