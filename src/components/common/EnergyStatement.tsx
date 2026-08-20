import React from "react";
import { ArrowRight, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { ScrollReveal } from "./ScrollReveal";

const COMPANY_TEAM_IMAGE = "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80";
const BACKUP_COMPANY_IMAGE = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80";

export const EnergyStatement: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-[#0A0A0E] via-[#130E1A] to-[#0A0A0E] relative overflow-hidden border-t border-red-950/60" id="about-us">
      
      {/* Dynamic Ambient Background Glows & Subtle Texture */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />

      {/* Top Conduit Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-red-500/40 to-transparent pointer-events-none" />

      <div className="site-container relative z-10 space-y-12 sm:space-y-16">
        
        {/* ── 01. About Us Section Header ── */}
        <ScrollReveal animation="slide-up">
          <div className="max-w-4xl mx-auto text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold tracking-widest uppercase bg-red-950/80 text-rose-300 border border-red-500/40 shadow-xs font-mono">
              <Users className="w-3.5 h-3.5 text-red-400" />
              <span>ABOUT US • ESTABLISHED 2016</span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.12]">
              ABOUT{" "}
              <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">
                ENERGYMAN.
              </span>
            </h2>
            <p className="text-xs sm:text-sm font-mono font-bold text-red-400 uppercase tracking-widest pt-0.5">
              WHO WE ARE • A DECADE OF EXCELLENCE
            </p>
          </div>
        </ScrollReveal>

        {/* ── 02. Direct 2-Column Layout (Company Image Matches Text Range Perfectly) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Column: Company / Team Image (Exact Top-to-Bottom Height of Text Column) ── */}
          <div className="lg:col-span-5 flex">
            <div className="relative w-full h-full min-h-[360px] sm:min-h-[420px] rounded-3xl overflow-hidden bg-slate-900 border border-red-900/40 shadow-2xl group">
              <img
                src={COMPANY_TEAM_IMAGE}
                alt="Energyman Professional Team and Engineering Operations"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (target.src !== BACKUP_COMPANY_IMAGE) {
                    target.src = BACKUP_COMPANY_IMAGE;
                  }
                }}
              />
              {/* Subtle Vignette for Rich Aesthetics */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />
            </div>
          </div>

          {/* Right Column: Narrative & Aligned Metrics (Start from Top to Bottom) ── */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            
            {/* Top Heading & Narrative */}
            <div className="space-y-3">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">
                Comprehensive Solar Solutions from Residential Rooftops to Megawatt Infrastructure.
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal pt-1">
                <strong className="text-white">Energyman Power Technologies (India) Pvt. Ltd.</strong>, a decade-strong company, delivers comprehensive solar solutions from residential rooftops to large-scale industrial projects, including expertise in agricultural applications. We are a proud MNRE subsidy partner, committed to uncompromising quality throughout every project stage.
              </p>
            </div>

            {/* 3 Core Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
              <div className="p-4 rounded-2xl bg-[#14101A]/95 border border-red-900/30 hover:border-red-500/40 transition-colors shadow-sm space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase font-mono block">Experience</span>
                <strong className="text-xl sm:text-2xl font-black text-red-400 font-mono block">10+ Years</strong>
                <span className="text-xs text-slate-300">Decade of Excellence</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#14101A]/95 border border-red-900/30 hover:border-amber-500/40 transition-colors shadow-sm space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase font-mono block">Sectors</span>
                <strong className="text-xl sm:text-2xl font-black text-amber-400 font-mono block">Turnkey EPC</strong>
                <span className="text-xs text-slate-300">Home • Industry • Farm</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#14101A]/95 border border-red-900/30 hover:border-rose-500/40 transition-colors shadow-sm space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase font-mono block">Accreditation</span>
                <strong className="text-xl sm:text-2xl font-black text-rose-300 font-mono block">MNRE Partner</strong>
                <span className="text-xs text-slate-300">PM Surya Ghar Subsidy</span>
              </div>
            </div>

            {/* Ending CTA Button Strip */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to="/about"
                className="btn-primary py-3.5 px-7 text-xs sm:text-sm font-bold inline-flex items-center gap-2"
              >
                <span>Learn Our Complete Story</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/projects"
                className="py-3.5 px-6 text-xs sm:text-sm font-bold rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-red-950/60 transition-all hover:text-white hover:border-red-500/40"
              >
                Explore Commissioned Plants
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default EnergyStatement;
