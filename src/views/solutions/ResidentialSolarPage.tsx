"use client";
import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Home,
  Phone,
  MapPin,
  Wrench,
  Award
} from "lucide-react";
import { SEOHead } from "../../components/common/SEOHead";
import { solutionsData } from "../../data/solutions";
import { companyData } from "../../data/company";

export const ResidentialSolarPage: React.FC = () => {
  const data = solutionsData.find((s) => s.id === "residential") || solutionsData[0];

  return (
    <div className="bg-[#0A0A0E] text-slate-100 min-h-screen">
      <SEOHead
        title="Residential Rooftop Solar & PM Surya Ghar Subsidy"
        description="Save up to 90% on home electricity bills with ENERGYMAN's residential rooftop solar systems. Avail ₹78,000 PM Surya Ghar DBT subsidy."
      />

      {/* Hero Header */}
      <section className="pt-28 pb-10 bg-[#0A0A0E] border-b border-red-950/60 relative overflow-hidden">
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
                  href="/get-a-quote?solution=Residential%20Solar"
                  className="btn-primary py-3.5 px-7 text-sm font-bold inline-flex items-center gap-2"
                >
                  <span>Get Free Home Solar Assessment</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/government-subsidy"
                  className="py-3.5 px-6 text-sm font-bold inline-flex items-center gap-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-red-950/60 transition-all"
                >
                  <span>View Subsidy Breakdown</span>
                </Link>
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
              <div className="rounded-2xl overflow-hidden border border-red-950/60 shadow-xl relative bg-slate-900 h-[220px] sm:h-[260px] lg:h-[290px]">
                <img
                  src={data.heroImage}
                  alt="Residential rooftop solar installation"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 02. SECTION: RESIDENTIAL VALUE PILLARS (EXPANSIVE FULL-PAGE EDITORIAL DESIGN) ── */}
      <section className="py-12 sm:py-16 bg-[#0A0A0E] border-b border-red-950/60 relative overflow-hidden">
        {/* Full-bleed Ambient Glows */}
        <div className="absolute top-1/4 left-1/5 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/5 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
          
          {/* Grand Section Header */}
          <div className="text-center max-w-4xl mx-auto space-y-3">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-red-950/80 text-rose-300 border border-red-500/40 font-mono shadow-xs">
              <Home className="w-3 h-3 text-amber-400" />
              <span>RESIDENTIAL ADVANTAGES</span>
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight leading-[1.12]">
              WHY HOME SOLAR{" "}
              <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">
                MAKES SENSE
              </span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto font-normal">
              Cut household electricity expenses by up to 90% and secure up to ₹78,000 direct bank transfer subsidy with Tier-1 bi-facial engineering.
            </p>
          </div>

          {/* 3 Full-Width Cardless Open Editorial Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Pillar 01 */}
            <div className="space-y-3 pb-6 border-b border-red-500/30">
              <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-red-500/80 font-mono block leading-none">01</span>
              <h3 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight">
                ₹78,000 Central Subsidy
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Direct bank transfer under PM Surya Ghar Muft Bijli Yojana facilitated seamlessly with zero paperwork hassle.
              </p>
            </div>

            {/* Pillar 02 */}
            <div className="space-y-3 pb-6 border-b border-amber-500/30">
              <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-amber-400/80 font-mono block leading-none">02</span>
              <h3 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight">
                90% Bill Reduction
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Export surplus clean generation back to the grid via bidirectional net-metering for instant monthly bill relief.
              </p>
            </div>

            {/* Pillar 03 */}
            <div className="space-y-3 pb-6 border-b border-red-500/30">
              <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-rose-400/80 font-mono block leading-none">03</span>
              <h3 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight">
                25-Year Power Yield
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Tier-1 TOPCon Bi-facial panels engineered for superior long-term generation performance and storm resilience.
              </p>
            </div>
          </div>

          {/* ── 5-Step Connected Turnkey Pipeline ── */}
          <div className="space-y-10 pt-4">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-amber-950/80 text-amber-300 border border-amber-500/40 font-mono">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>TURNKEY SOLAR PIPELINE</span>
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
                  { num: "01", title: "Site Audit", desc: "3D terrace shadow simulation & structure load appraisal", icon: MapPin, color: "text-red-400 border-red-500/60 bg-red-950/90" },
                  { num: "02", title: "Custom Design", desc: "Optimal string, inverter sizing & yield simulation", icon: Home, color: "text-orange-400 border-orange-500/60 bg-orange-950/90" },
                  { num: "03", title: "DISCOM Clearance", desc: "Bi-directional net-metering application & approvals", icon: ShieldCheck, color: "text-amber-400 border-amber-500/60 bg-amber-950/90" },
                  { num: "04", title: "Turnkey Install", desc: "Tier-1 equipment execution & earthing protection", icon: Wrench, color: "text-rose-400 border-rose-500/60 bg-rose-950/90" },
                  { num: "05", title: "Subsidy Credit", desc: "Direct DBT bank transfer under PM Surya Ghar", icon: Award, color: "text-emerald-400 border-emerald-500/60 bg-emerald-950/90" }
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

export default ResidentialSolarPage;
