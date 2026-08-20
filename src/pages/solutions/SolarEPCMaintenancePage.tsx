import React from "react";
import { Link } from "react-router-dom";
import {
  Wrench,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Activity,
} from "lucide-react";
import { SEOHead } from "../../components/common/SEOHead";
import { solutionsData } from "../../data/solutions";
import { SolarHealthAudit } from "../../components/common/SolarHealthAudit";
import { FAQAccordion } from "../../components/common/FAQAccordion";

export const SolarEPCMaintenancePage: React.FC = () => {
  const data = solutionsData.find((s) => s.id === "epc-maintenance") || solutionsData[4];

  return (
    <div className="bg-[#0A0A0E] text-slate-100 min-h-screen">
      <SEOHead
        title="Turnkey Solar EPC & Lifetime O&M Services"
        description="End-to-end solar EPC engineering, procurement, construction, and SCADA-backed Operations & Maintenance (O&M) for guaranteed plant uptime."
      />

      {/* Hero Header */}
      <section className="pt-32 pb-16 bg-[#0A0A0E] border-b border-red-950/60 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="site-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold tracking-wider uppercase bg-red-950/80 text-rose-300 border border-red-500/40 shadow-xs">
                <Wrench className="w-3.5 h-3.5 text-red-400" />
                <span>Turnkey Plant Engineering &amp; Performance Guarantees</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                PRECISION SOLAR EPC &amp; <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">LIFETIME O&amp;M</span>
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
                A solar plant is a 25-year financial generator. ENERGYMAN delivers end-to-end EPC turnkey delivery alongside AI-powered Operations &amp; Maintenance (O&amp;M) to safeguard maximum kilowatt-hour generation.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/get-a-quote?solution=Solar%20EPC%20and%20OM"
                  className="btn-primary py-3.5 px-7 text-sm font-bold inline-flex items-center gap-2"
                >
                  <span>Inquire for EPC / O&amp;M Contract</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/contact"
                  className="py-3.5 px-6 text-sm font-bold rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-red-950/60 transition-all"
                >
                  <span>Request Plant Health Audit</span>
                </Link>
              </div>

              {/* Badges */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-400 font-semibold">
                <span className="flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-rose-400" />
                  Drone Thermal Anomaly Scanning
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-red-400" />
                  Guaranteed Performance Ratio (PR)
                </span>
              </div>
            </div>

            {/* Hero Image */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden border border-red-950/60 shadow-xl relative bg-slate-900">
                <img
                  src={data.heroImage}
                  alt="Solar EPC engineering maintenance"
                  className="w-full h-80 sm:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0E] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 bg-[#14101A]/95 backdrop-blur-md p-4 rounded-2xl border border-red-900/30 text-xs shadow-md">
                  <span className="text-slate-400 block font-bold">Plant Availability SLA:</span>
                  <strong className="text-base text-red-400 font-black">&gt; 99% Guaranteed Generation Uptime</strong>
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
                Maximizing 25-Year Plant Performance &amp; Asset Longevity
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                {data.overview}
              </p>

              <div className="space-y-3 pt-4">
                <h3 className="text-base font-black text-white">EPC &amp; O&amp;M Deliverables:</h3>
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
                <Activity className="w-5 h-5 text-rose-400" />
                <span>O&amp;M Service Protocols</span>
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
                <p className="text-xs font-black text-rose-400">Target Solar Assets:</p>
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

          {/* Interactive Solar Health Audit */}
          <SolarHealthAudit />
        </div>
      </section>

      {/* EPC FAQs */}
      <section className="section-padding bg-[#0A0A0E] border-t border-red-950/60">
        <div className="site-container max-w-4xl space-y-8">
          <div className="text-center space-y-2">
            <h2 className="heading-section text-white">
              SOLAR EPC &amp; O&amp;M <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">FAQS</span>
            </h2>
            <p className="text-slate-300 text-sm">Response time SLAs, module degradation diagnostics, and AMC terms.</p>
          </div>
          <FAQAccordion defaultCategory="technical" />
        </div>
      </section>
    </div>
  );
};

export default SolarEPCMaintenancePage;
