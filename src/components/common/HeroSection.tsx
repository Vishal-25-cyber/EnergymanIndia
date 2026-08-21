"use client";
import React from "react";
import { ArrowRight, Calculator } from "lucide-react";
import Link from "next/link";

export const HeroSection: React.FC = () => {
  return (
    <section
      className="relative w-full min-h-[660px] lg:min-h-[780px] flex items-center justify-center overflow-hidden bg-[#0A0A0E] select-none pt-32 sm:pt-36 md:pt-40 pb-20 lg:pb-24 border-b border-red-950/60"
      aria-label="Energyman Solar Energy Hero Showcase"
    >
      {/* ── UNIQUE CINEMATIC SOLAR POWER PLANT BACKGROUND ── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        
        {/* Bespoke Sunset Solar Power Array Image */}
        <img
          src="/assets/images/hero-solar-bg.jpg"
          alt="Energyman Solar Power Station"
          className="w-full h-full object-cover object-center filter brightness-[0.52] contrast-125 scale-105 transform duration-1000"
        />

        {/* Deep Energy Crimson & Dark Obsidian Atmospheric Gradient Layers */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0E] via-[#0A0A0E]/60 to-[#0A0A0E]/80" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#0A0A0E]/40 to-[#0A0A0E]/90" />
        
        {/* Soft Radiant Crimson Core */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-red-600/15 rounded-full blur-[130px]" />

        {/* Top Edge Accent Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
      </div>

      {/* ── HERO MAIN CONTENT: LOWERED & CENTER-ALIGNED ── */}
      <div className="site-container relative z-10 w-full flex flex-col items-center justify-center text-center max-w-5xl mx-auto space-y-8 sm:space-y-10 translate-y-2 sm:translate-y-4">
        
        {/* Main Headline */}
        <div className="flex flex-col items-center justify-center text-center w-full">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-black tracking-tight text-white leading-[1.08] uppercase drop-shadow-2xl text-center flex flex-col items-center justify-center w-full">
            <span className="block text-center w-full">TURN SUNLIGHT INTO</span>
            <span className="block text-center w-full bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">
              PERMANENT SAVINGS.
            </span>
          </h1>
        </div>

        {/* ── CENTER-ALIGNED PROFESSIONAL BUTTONS ── */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 pt-2 mx-auto">
          
          {/* Button 1: Primary CTA */}
          <Link
            href="/get-a-quote"
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-black text-sm sm:text-base text-white bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 shadow-xl shadow-red-600/40 hover:shadow-2xl hover:shadow-red-500/60 hover:-translate-y-0.5 transition-all duration-200 border border-red-400/40 cursor-pointer text-center"
          >
            <Calculator className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
            <span className="tracking-wider uppercase">GET A FREE QUOTE</span>
            <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* Button 2: Secondary CTA */}
          <Link
            href="/projects"
            className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-sm sm:text-base text-slate-200 bg-slate-900/80 hover:bg-slate-800/90 hover:text-white border border-red-900/60 hover:border-red-500/60 shadow-lg backdrop-blur-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer text-center"
          >
            <span className="tracking-wider uppercase">EXPLORE PROJECTS</span>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-red-400 group-hover:translate-x-1 transition-transform" />
          </Link>

        </div>

      </div>
    </section>
  );
};

export default HeroSection;
