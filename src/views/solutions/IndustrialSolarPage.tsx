"use client";
import React from "react";
import Link from "next/link";
import {
  Factory,
  ShieldCheck,
  ArrowRight,
  MapPin,
  Wrench,
  Award,
  Sparkles
} from "lucide-react";
import { SEOHead } from "../../components/common/SEOHead";
import { solutionsData } from "../../data/solutions";

export const IndustrialSolarPage: React.FC = () => {
  const data = solutionsData.find((s) => s.id === "industrial") || solutionsData[2];

  return (
    <div className="bg-[#0A0A0E] text-slate-100 min-h-screen">
      <SEOHead
        title="Industrial & MW-Scale Captive Solar EPC"
        description="High-voltage industrial solar EPC for spinning mills, manufacturing facilities, and heavy foundries. HT grid synchronization and DG hybrid controllers."
      />

      {/* Hero Header */}
      <section className="pt-28 pb-10 bg-[#0A0A0E] border-b border-red-950/60 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="site-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold tracking-wider uppercase bg-red-950/80 text-rose-300 border border-red-500/40 shadow-xs">
                <Factory className="w-3.5 h-3.5 text-red-400" />
                <span>MW-Scale Captive &amp; Open Access Engineering</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                ENGINEERED FOR <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">HEAVY INDUSTRY</span>
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
                Power represents up to 40% of manufacturing overheads. ENERGYMAN engineers heavy-duty captive solar power plants designed to synchronize with high-tension (HT) substations and diesel generators, cutting energy expenses by tens of lakhs every month.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/get-a-quote?solution=Industrial%20Solar"
                  className="btn-primary py-3.5 px-7 text-sm font-bold inline-flex items-center gap-2"
                >
                  <span>Request Industrial Feasibility</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/projects"
                  className="py-3.5 px-6 text-sm font-bold inline-flex items-center gap-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-red-950/60 transition-all"
                >
                  <span>View Industrial Projects</span>
                </Link>
              </div>

              {/* Badges */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-400 font-semibold">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-red-400" />
                  Zero-Export DG Hybrid Synchronization
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  11kV / 22kV / 33kV Substation Integration
                </span>
              </div>
            </div>

            {/* Hero Image */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-red-950/60 shadow-xl relative bg-slate-900 h-[220px] sm:h-[260px] lg:h-[290px]">
                <img
                  src={data.heroImage}
                  alt="Industrial manufacturing solar plant"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 02. SECTION: INDUSTRIAL VALUE PILLARS (CARDLESS EDITORIAL DESIGN) ── */}
      <section className="py-12 sm:py-16 bg-[#0A0A0E] border-b border-red-950/60 relative overflow-hidden">
        {/* Full-bleed Ambient Glows */}
        <div className="absolute top-1/4 left-1/5 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/5 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
          
          {/* Grand Section Header */}
          <div className="text-center max-w-4xl mx-auto space-y-3">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-red-950/80 text-rose-300 border border-red-500/40 font-mono shadow-xs">
              <Factory className="w-3 h-3 text-amber-400" />
              <span>INDUSTRIAL ADVANTAGES</span>
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight leading-[1.12]">
              WHY INDUSTRIAL SOLAR{" "}
              <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">
                MAKES SENSE
              </span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto font-normal">
              Slash heavy manufacturing electricity overheads, integrate smart DG hybrid controllers, and secure guaranteed performance ratios.
            </p>
          </div>

          {/* 3 Full-Width Cardless Open Editorial Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Pillar 01 */}
            <div className="space-y-3 pb-6 border-b border-red-500/30">
              <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-red-500/80 font-mono block leading-none">01</span>
              <h3 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight">
                Lowest Levelized Cost (LCOE)
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Reduce unit power expenses to under ₹2.40/unit with high-capacity captive solar generation over 25 years.
              </p>
            </div>

            {/* Pillar 02 */}
            <div className="space-y-3 pb-6 border-b border-amber-500/30">
              <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-amber-400/80 font-mono block leading-none">02</span>
              <h3 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight">
                Smart DG-PV Hybrid Sync
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Zero-reverse power flow synchronization ensures automatic diesel generator fuel savings during grid power cuts.
              </p>
            </div>

            {/* Pillar 03 */}
            <div className="space-y-3 pb-6 border-b border-red-500/30">
              <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-rose-400/80 font-mono block leading-none">03</span>
              <h3 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight">
                High-Voltage HT Integration
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Turnkey 11kV / 22kV / 33kV step-up substation transformers, VCB breaker panels, and CEIG statutory clearances.
              </p>
            </div>
          </div>

          {/* ── 5-Step Connected Turnkey Pipeline ── */}
          <div className="space-y-10 pt-4">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-amber-950/80 text-amber-300 border border-amber-500/40 font-mono">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>TURNKEY INDUSTRIAL PIPELINE</span>
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                OUR 5-STAGE EXECUTION JOURNEY
              </h3>
            </div>

            {/* Connected Track */}
            <div className="relative">
              {/* Horizontal Connecting Glow Line */}
              <div className="hidden lg:block absolute top-6 left-12 right-12 h-0.5 bg-gradient-to-r from-red-500 via-orange-400 to-amber-300 opacity-40 z-0" />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 relative z-10">
                {[
                  { num: "01", title: "Drone & SLD Audit", desc: "3D topographical drone survey, structure load capacity & electrical SLD audit", icon: MapPin, color: "text-red-400 border-red-500/60 bg-red-950/90" },
                  { num: "02", title: "Civil & HT Design", desc: "Foundation engineering, HT switchgear integration & short-circuit analysis", icon: Factory, color: "text-orange-400 border-orange-500/60 bg-orange-950/90" },
                  { num: "03", title: "CEIG Clearances", desc: "Safety inspectorate clearance, drawing preparation & statutory approvals", icon: ShieldCheck, color: "text-amber-400 border-amber-500/60 bg-amber-950/90" },
                  { num: "04", title: "Heavy-Duty EPC", desc: "Corrosion-resistant HDG structures, cable trenching & earthing grid testing", icon: Wrench, color: "text-rose-400 border-rose-500/60 bg-rose-950/90" },
                  { num: "05", title: "SCADA Handover", desc: "24/7 remote monitoring, string mapping & thermal imaging validation", icon: Award, color: "text-emerald-400 border-emerald-500/60 bg-emerald-950/90" }
                ].map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <div key={i} className="flex flex-col items-center text-center space-y-3 group">
                      <div className={`w-12 h-12 rounded-full border-2 ${s.color} flex items-center justify-center shadow-lg shadow-black/60 shrink-0 group-hover:scale-110 group-hover:border-white transition-all duration-300`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider block">STAGE {s.num}</span>
                        <h4 className="text-sm font-bold text-white uppercase tracking-tight">{s.title}</h4>
                        <p className="text-xs text-slate-300 leading-relaxed font-normal">{s.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default IndustrialSolarPage;
