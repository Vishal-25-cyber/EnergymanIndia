import React from "react";
import { ShieldCheck, Award, Target, CheckCircle2, ArrowRight, Building2, Layers } from "lucide-react";
import { Link } from "react-router-dom";
import { ScrollReveal } from "./ScrollReveal";

export const CompanyIntroSection: React.FC = () => {
  return (
    <section className="section-padding bg-[#0A0A0E] relative overflow-hidden border-t border-red-950/60" id="about">
      {/* Background Decorative Ambient */}
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="site-container relative z-10 space-y-16">
        
        {/* ── Main Dual-Column Company Overview ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Image with Geometric Frame & Badge (5 Cols) */}
          <div className="lg:col-span-5">
            <ScrollReveal animation="slide-up">
              <div className="relative group">
                {/* Geometric Red Border Accent */}
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-amber-500 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity" />
                
                <div className="relative rounded-3xl overflow-hidden border border-red-900/40 bg-slate-900 shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?auto=format&fit=crop&w=1000&q=80"
                    alt="ENERGYMAN Solar Engineering Operations"
                    className="w-full h-80 sm:h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0E] via-transparent to-transparent" />
                  
                  {/* Floating Overlay Badge */}
                  <div className="absolute bottom-6 left-6 right-6 bg-[#14101A]/95 backdrop-blur-md p-4 rounded-2xl border border-red-900/40 shadow-xl space-y-1">
                    <span className="text-xs font-black uppercase tracking-wider text-red-400 font-mono flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      MNRE Approved Channel Partner
                    </span>
                    <p className="text-xs text-slate-200 font-medium">
                      Engineering high-efficiency captive and rooftop plants across South India.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Company Story & Accreditations (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <ScrollReveal animation="slide-up" delay={100}>
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold tracking-wider uppercase bg-red-950/80 text-rose-300 border border-red-500/40 shadow-xs">
                  <Building2 className="w-3.5 h-3.5 text-red-400" />
                  <span>About ENERGYMAN • Since 2016</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                  PIONEERING CLEAN POWER FOR <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">OVER A DECADE</span>
                </h2>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="slide-up" delay={150}>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
                Headquartered in Coimbatore with regional hubs in Palani, <strong className="text-white">Energyman Power Technologies (India) Pvt. Ltd.</strong> is a premier turnkey renewable energy engineering firm. Since 2016, we have commissioned over <strong className="text-red-400">35 MW+</strong> of high-yield solar capacity across manufacturing plants, spinning mills, institutions, and residential rooftops.
              </p>
            </ScrollReveal>

            {/* 3 Core Strengths Pills */}
            <ScrollReveal animation="slide-up" delay={200}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-4 rounded-2xl bg-[#14101A]/95 border border-red-900/30 shadow-xs">
                  <strong className="text-xl font-black text-red-400 font-mono block">35 MW+</strong>
                  <span className="text-xs text-slate-300 font-medium">Installed Capacity</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#14101A]/95 border border-red-900/30 shadow-xs">
                  <strong className="text-xl font-black text-amber-400 font-mono block">2,500+</strong>
                  <span className="text-xs text-slate-300 font-medium">Commissioned Plants</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#14101A]/95 border border-red-900/30 shadow-xs">
                  <strong className="text-xl font-black text-rose-300 font-mono block">100%</strong>
                  <span className="text-xs text-slate-300 font-medium">Subsidy DBT Fulfillment</span>
                </div>
              </div>
            </ScrollReveal>

            {/* CTA */}
            <ScrollReveal animation="slide-up" delay={250}>
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to="/about"
                  className="btn-primary py-3 px-6 text-xs sm:text-sm font-bold inline-flex items-center gap-2"
                >
                  <span>Learn About Our Heritage</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/projects"
                  className="py-3 px-6 text-xs sm:text-sm font-bold rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-red-950/60 transition-all hover:text-white"
                >
                  View Case Studies
                </Link>
              </div>
            </ScrollReveal>

          </div>

        </div>

      </div>
    </section>
  );
};

export default CompanyIntroSection;
