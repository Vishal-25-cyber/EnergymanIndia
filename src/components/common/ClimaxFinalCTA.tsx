"use client";
import React from "react";
import { ArrowRight, Calculator, CheckCircle2, Sun, Phone } from "lucide-react";
import Link from "next/link";
import { companyData } from "../../data/company";
import { ScrollReveal } from "./ScrollReveal";

export const ClimaxFinalCTA: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 bg-[#4A070D] text-white relative overflow-hidden border-t border-red-900/60" id="final-cta">
      
      {/* Background Solar Ambience */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?auto=format&fit=crop&w=1920&q=80"
          alt="Clean Energy Sunrise"
          className="w-full h-full object-cover opacity-15 transform scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0E]/80 via-[#4A070D]/90 to-[#1A0306]" />
      </div>

      {/* Central Ambient Energy Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-red-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="site-container relative z-10 text-center max-w-4xl mx-auto space-y-8">
        
        <ScrollReveal animation="slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black bg-white/15 text-amber-300 border border-amber-300/30 shadow-xl backdrop-blur-md font-mono uppercase">
            <Sun className="w-4 h-4 text-amber-300" />
            <span>THE 25-YEAR CLEAN ENERGY PARTNERSHIP</span>
          </div>
        </ScrollReveal>

        {/* ── Main Climax Typography ── */}
        <ScrollReveal animation="slide-up" delay={100}>
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.12]">
              YOUR ROOFTOP. YOUR FACTORY.
              <br />
              <span className="text-amber-300">YOUR FARM. </span>
              <span className="bg-gradient-to-r from-red-400 via-rose-300 to-white bg-clip-text text-transparent">
                YOUR ENERGY.
              </span>
            </h2>

            <p className="text-4xl sm:text-6xl font-black text-white tracking-widest pt-2">
              LET'S BUILD IT.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="slide-up" delay={150}>
          <p className="text-rose-100/90 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Get in touch with Energyman's engineering team for precision PVSyst simulation, rooftop structural appraisal, and complete PM Surya Ghar DBT subsidy facilitation.
          </p>
        </ScrollReveal>

        {/* Action CTAs */}
        <ScrollReveal animation="slide-up" delay={200}>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/get-a-quote"
              className="btn-solar py-4 px-8 text-sm sm:text-base font-black shadow-2xl group inline-flex items-center gap-2.5 tracking-wider uppercase"
            >
              <Calculator className="w-5 h-5 text-red-600" />
              <span>GET YOUR FREE SOLAR QUOTE</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1.5" />
            </Link>

            <a
              href={`tel:${companyData.phones.primary.replace(/\s+/g, '')}`}
              className="py-4 px-8 text-sm sm:text-base font-bold rounded-2xl bg-white/10 hover:bg-white/20 border border-white/25 text-white shadow-lg transition-all inline-flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-amber-300" />
              <span>Call Expert: {companyData.phones.primary}</span>
            </a>
          </div>
        </ScrollReveal>

        {/* Credibility Checklist Strip */}
        <ScrollReveal animation="slide-up" delay={250}>
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-rose-100/90 font-semibold border-t border-white/10">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-300" />
              MNRE Approved Channel Partner
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-300" />
              Direct DBT Central Subsidy up to ₹78,000
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-300" />
              25-Year Linear Generation Warranty
            </span>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};

export default ClimaxFinalCTA;
