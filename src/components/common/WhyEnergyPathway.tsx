"use client";
import React from "react";
import { UserCheck, Layers, Wrench, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import { ScrollReveal } from "./ScrollReveal";

const pathwaySteps = [
  {
    step: "01",
    title: "CONSULT",
    subtitle: "Precision Feasibility Survey",
    description: "Detailed on-site structural inspection, 3D rooftop shadow profiling, DISCOM grid tariff study, and custom financial payback modeling.",
    icon: <UserCheck className="w-6 h-6 text-red-400" />,
    badge: "Site Feasibility"
  },
  {
    step: "02",
    title: "DESIGN",
    subtitle: "PVSyst 3D Engineering",
    description: "Custom 3D electrical schematics, string voltage sizing, structural wind load analysis (up to 180 km/h), and layout optimization.",
    icon: <Layers className="w-6 h-6 text-amber-400" />,
    badge: "PVSyst Simulation"
  },
  {
    step: "03",
    title: "ENGINEER",
    subtitle: "Tier-1 Hardware Procurement",
    description: "Deployment of ALMM-enlisted Mono PERC & TOPCon bi-facial modules, high-efficiency hybrid inverters, and hot-dip galvanized mounting structures.",
    icon: <Wrench className="w-6 h-6 text-red-400" />,
    badge: "Tier-1 Standards"
  },
  {
    step: "04",
    title: "INSTALL",
    subtitle: "Turnkey Net-Metering & Subsidy",
    description: "Complete CEIG statutory clearances, bi-directional net-metering synchronization, DISCOM inspection, and direct PM Surya Ghar DBT subsidy credits.",
    icon: <CheckCircle2 className="w-6 h-6 text-amber-400" />,
    badge: "100% Turnkey"
  },
  {
    step: "05",
    title: "SUPPORT",
    subtitle: "25-Year Performance & O&M",
    description: "Dedicated rapid-response operations and maintenance, drone thermography, cloud SCADA string monitoring, and guaranteed generation SLAs.",
    icon: <ShieldCheck className="w-6 h-6 text-rose-400" />,
    badge: "25-Year SLA"
  }
];

export const WhyEnergyPathway: React.FC = () => {
  return (
    <section className="section-padding bg-[#0A0A0E] relative overflow-hidden border-t border-red-950/60" id="pathway">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Red Energy Conduit Line Background */}
      <div className="hidden lg:block absolute top-[52%] left-10 right-10 h-0.5 bg-gradient-to-r from-red-500/10 via-red-500/40 to-red-500/10 z-0 pointer-events-none" />

      <div className="site-container relative z-10 space-y-16">
        
        {/* Section Header */}
        <ScrollReveal animation="slide-up">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold tracking-widest uppercase bg-red-950/80 text-rose-300 border border-red-500/40 shadow-xs font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-red-400" />
              <span>THE 5-STAGE LIFETIME COMMITMENT</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              WHY <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">ENERGYMAN?</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              Going solar is a 25-year engineering journey. We stand with you as a dedicated partner at every milestone — from initial consultation to decades of clean generation.
            </p>
          </div>
        </ScrollReveal>

        {/* ── 5-Stage Horizontal Storytelling Pathway ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
          {pathwaySteps.map((step, idx) => (
            <ScrollReveal key={step.step} delay={idx * 100} animation="slide-up">
              <div className="h-full bg-[#14101A]/95 border border-red-900/40 rounded-3xl p-6 hover:border-red-500/60 hover:bg-[#1C1625] hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/80 transition-all duration-300 group flex flex-col justify-between space-y-4 relative shadow-md">
                
                {/* Step Top Bar */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-2xl bg-slate-900 border border-red-950/60 group-hover:scale-110 group-hover:border-red-500/50 transition-all shadow-xs">
                      {step.icon}
                    </div>
                    <span className="text-sm font-black font-mono text-red-500 bg-slate-900 px-3 py-1 rounded-xl border border-red-950/60 group-hover:border-red-500/40 transition-colors">
                      {step.step}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase font-mono block">
                      {step.badge}
                    </span>
                    <h3 className="text-lg font-black text-white group-hover:text-red-400 transition-colors tracking-wide">
                      {step.title}
                    </h3>
                    <p className="text-xs font-semibold text-amber-400/90 mt-0.5">
                      {step.subtitle}
                    </p>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-red-950/60 flex items-center justify-between text-[11px] text-red-400 font-bold font-mono">
                  <span>STAGE {step.step}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>

              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom CTA Strip */}
        <div className="text-center pt-4">
          <Link
            href="/get-a-quote"
            className="btn-primary py-3.5 px-8 text-xs sm:text-sm font-black tracking-wider uppercase inline-flex items-center gap-2 shadow-lg"
          >
            <span>START YOUR 5-STAGE SOLAR JOURNEY</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default WhyEnergyPathway;
