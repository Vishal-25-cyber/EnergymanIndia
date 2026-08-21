"use client";
import React from "react";
import { ArrowRight, Calculator, Sparkles, ShieldCheck } from "lucide-react";
import { GeometricEnergyVisual } from "./GeometricEnergyVisual";

export const HeroCarousel: React.FC = () => {
  return (
    <section
      className="relative w-full min-h-[640px] lg:min-h-[740px] flex items-center overflow-hidden bg-[#0A0A0E] select-none pt-28 sm:pt-32 md:pt-36 pb-16 lg:pb-20 border-b border-red-950/60"
      aria-label="Solar Energy Hero Showcase"
    >
      {/* ── Background Geometric Grid & Ambient Crimson Lighting ── */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#0A0A0E] opacity-95" />
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(230, 57, 70, 0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(230, 57, 70, 0.12) 1px, transparent 1px)`,
            backgroundSize: '48px 48px'
          }}
        />
        {/* Deep Ambient Crimson Glow Spheres */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-red-600/15 via-rose-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-gradient-to-tl from-amber-500/10 via-red-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* ── Hero Main Content Grid ── */}
      <div className="site-container relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Headline, Description & CTAs (7 Cols) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7">
            
            {/* Top Brand Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold tracking-wider uppercase bg-red-950/80 text-rose-300 border border-red-500/40 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-red-400" />
              <span>Renewable Energy Saves Earth • Since 2016</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[58px] font-black tracking-tight text-white leading-[1.12]">
                <span>TURN SUNLIGHT INTO</span>
                <br />
                <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">
                  PERMANENT SAVINGS
                </span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-slate-300 text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-2xl">
              Avail up to <strong className="text-white font-bold">₹78,000 direct central government subsidy</strong> and eliminate up to 90% of your monthly electricity costs with Tier-1 turnkey solar engineering.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#calculator"
                className="relative inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm sm:text-[15px] text-white bg-gradient-to-r from-red-500 via-rose-500 to-red-600 hover:from-red-600 hover:via-rose-600 hover:to-red-700 shadow-md shadow-red-500/30 hover:shadow-lg hover:shadow-red-500/45 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 group cursor-pointer border border-red-400/40"
              >
                <div className="p-1 rounded-lg bg-white/20 group-hover:bg-white/30 transition-colors">
                  <Calculator className="w-4 h-4 text-white" />
                </div>
                <span className="tracking-normal font-extrabold text-white">Calculate Your Savings</span>
                <ArrowRight className="w-4 h-4 text-white transition-transform duration-200 group-hover:translate-x-1" />
              </a>

              <a
                href="#solutions"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-red-950/60 hover:border-red-500/40 transition-all hover:text-white"
              >
                <span>Explore Solutions</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </a>
            </div>

            {/* Trust Micro-Badges */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-400 font-semibold border-t border-red-950/60">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-red-400" />
                MNRE Empanelled EPC Partner
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                35 MW+ Commissioned Clean Power
              </span>
            </div>

          </div>

          {/* Right Column: Geometric Renewable Energy Visual (5 Cols) */}
          <div className="lg:col-span-5">
            <GeometricEnergyVisual />
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
