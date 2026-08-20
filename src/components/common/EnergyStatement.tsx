import React from "react";
import { ShieldCheck, Award, ArrowRight, Sparkles, Building2, Layers, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { ScrollReveal } from "./ScrollReveal";

export const EnergyStatement: React.FC = () => {
  return (
    <section className="section-padding bg-[#0A0A0E] relative overflow-hidden border-t border-red-950/60" id="statement">
      
      {/* Oversized Background Watermark */}
      <div className="absolute top-1/3 left-0 text-[12vw] font-black text-white/[0.015] tracking-widest pointer-events-none select-none uppercase font-sans">
        PROGRESS
      </div>

      {/* Red Energy Conduit Line at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-red-500/40 to-transparent pointer-events-none" />

      <div className="site-container relative z-10 space-y-16 sm:space-y-20">
        
        {/* ── 01. The Large Statement ── */}
        <ScrollReveal animation="slide-up">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold tracking-widest uppercase bg-red-950/80 text-rose-300 border border-red-500/40 shadow-xs font-mono">
              <Sparkles className="w-3.5 h-3.5 text-red-400" />
              <span>THE ENERGY STATEMENT</span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.12]">
              ENERGY IS NOT JUST POWER.
              <br />
              <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">
                IT IS PROGRESS.
              </span>
            </h2>
          </div>
        </ScrollReveal>

        {/* ── 02. Company Positioning & Geometric Showcase ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Image with Red Geometric Framing (5 Cols) */}
          <div className="lg:col-span-5">
            <ScrollReveal animation="slide-up" delay={100}>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-tr from-red-600 to-amber-500 rounded-3xl blur-md opacity-30 group-hover:opacity-50 transition-opacity" />
                
                <div className="relative rounded-3xl overflow-hidden border border-red-900/40 bg-slate-900 shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1000&q=80"
                    alt="Energyman Renewable Energy Operations"
                    className="w-full h-80 sm:h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0E] via-transparent to-transparent" />
                  
                  {/* Floating Overlay Badge */}
                  <div className="absolute bottom-6 left-6 right-6 bg-[#14101A]/95 backdrop-blur-md p-4 rounded-2xl border border-red-900/40 shadow-xl space-y-1">
                    <span className="text-xs font-black uppercase tracking-wider text-red-400 font-mono flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      MNRE APPROVED SUBSIDY PARTNER
                    </span>
                    <p className="text-xs text-slate-200 font-medium">
                      Delivering uncompromising quality throughout every project stage.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Factual Narrative & Technical Badges (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <ScrollReveal animation="slide-up" delay={150}>
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-red-400 font-mono uppercase">
                  <span>ABOUT ENERGYMAN • ESTABLISHED 2016</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white leading-snug">
                  Comprehensive Solar Solutions from Residential Rooftops to Megawatt Infrastructure.
                </h3>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="slide-up" delay={200}>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
                <strong className="text-white">Energyman Power Technologies (India) Pvt. Ltd.</strong>, a decade-strong company, delivers comprehensive solar solutions from residential rooftops to large-scale industrial projects, including expertise in agricultural applications. We are a proud MNRE subsidy partner, committed to uncompromising quality throughout every project stage.
              </p>
            </ScrollReveal>

            {/* 3 Core Strength Cards */}
            <ScrollReveal animation="slide-up" delay={250}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-4 rounded-2xl bg-[#14101A]/95 border border-red-900/30 shadow-xs space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase font-mono block">Experience</span>
                  <strong className="text-lg sm:text-xl font-black text-red-400 font-mono block">10+ Years</strong>
                  <span className="text-xs text-slate-300">Decade of Excellence</span>
                </div>

                <div className="p-4 rounded-2xl bg-[#14101A]/95 border border-red-900/30 shadow-xs space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase font-mono block">Sectors</span>
                  <strong className="text-lg sm:text-xl font-black text-amber-400 font-mono block">Turnkey EPC</strong>
                  <span className="text-xs text-slate-300">Home • Industry • Farm</span>
                </div>

                <div className="p-4 rounded-2xl bg-[#14101A]/95 border border-red-900/30 shadow-xs space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase font-mono block">Accreditation</span>
                  <strong className="text-lg sm:text-xl font-black text-rose-300 font-mono block">MNRE Partner</strong>
                  <span className="text-xs text-slate-300">PM Surya Ghar Subsidy</span>
                </div>
              </div>
            </ScrollReveal>

            {/* CTAs */}
            <ScrollReveal animation="slide-up" delay={300}>
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to="/about"
                  className="btn-primary py-3 px-6 text-xs sm:text-sm font-bold inline-flex items-center gap-2"
                >
                  <span>Learn Our Complete Story</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/projects"
                  className="py-3 px-6 text-xs sm:text-sm font-bold rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-red-950/60 transition-all hover:text-white"
                >
                  Explore Commissioned Plants
                </Link>
              </div>
            </ScrollReveal>

          </div>

        </div>

      </div>
    </section>
  );
};

export default EnergyStatement;
