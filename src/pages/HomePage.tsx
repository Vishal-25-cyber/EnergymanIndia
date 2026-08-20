import React from "react";
import { SEOHead } from "../components/common/SEOHead";
import { HeroSection } from "../components/common/HeroSection";
import { EnergyStatement } from "../components/common/EnergyStatement";
import { EnergyEcosystem } from "../components/common/EnergyEcosystem";
import { WhyEnergyPathway } from "../components/common/WhyEnergyPathway";
import { NumbersThatMatter } from "../components/common/NumbersThatMatter";
import { ProjectsTimeline } from "../components/common/ProjectsTimeline";
import { SustainabilityPossibility } from "../components/common/SustainabilityPossibility";



import { SavingsCalculator } from "../components/common/SavingsCalculator";
import { LiveSolarTelemetry } from "../components/common/LiveSolarTelemetry";
import { EMIFinanceCalculator } from "../components/common/EMIFinanceCalculator";
import { FAQAccordion } from "../components/common/FAQAccordion";
import { TestimonialCarousel } from "../components/common/TestimonialCarousel";
import { Sun, Zap, Sparkles } from "lucide-react";

export const HomePage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="POWERING TOMORROW. TODAY. | ENERGYMAN - Renewable Energy Saves Earth"
        description="Energyman Power Technologies (India) Pvt. Ltd. — Decade-strong solar EPC company delivering residential rooftop, industrial megawatt, agricultural solar pumps, and solar water heaters across Tamil Nadu. Approved MNRE subsidy partner."
      />

      {/* 01. HERO — THE WOW MOMENT */}
      <HeroSection />

      {/* 02. SECTION 2 — THE ENERGY STATEMENT */}
      <EnergyStatement />

      {/* 03. SECTION 3 — ENERGY SOLUTIONS (INTERACTIVE ENERGY ECOSYSTEM) */}
      <EnergyEcosystem />

      {/* 04. SECTION 4 — WHY ENERGYMAN (HORIZONTAL STORYTELLING PATHWAY) */}
      <WhyEnergyPathway />

      {/* 05. SECTION 5 — NUMBERS THAT MATTER (REAL FIGURES 6500+ / 800+ / 40+) */}
      <NumbersThatMatter />

      {/* 06. SECTION 6 — PROJECTS (CINEMATIC TIMELINE & TECHNICAL CASE STUDIES) */}
      <ProjectsTimeline />

      {/* 07. INTERACTIVE SAVINGS & SOLAR TELEMETRY SUITE */}
      <SavingsCalculator />
      <LiveSolarTelemetry />
      <EMIFinanceCalculator />

      {/* 08. SECTION 8 — SUSTAINABILITY (FROM SUNLIGHT TO POSSIBILITY) */}
      <SustainabilityPossibility />





      {/* 12. TESTIMONIALS & TRUSTED PARTNERS STRIP */}
      <TestimonialCarousel />

      {/* ── Trusted Clients Spotlight Grid ── */}
      <section className="py-12 bg-[#0A0A0E] border-y border-red-950/60">
        <div className="site-container space-y-8">
          <p className="text-center text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 font-mono">
            ⚡ Verified Client Installations — Tamil Nadu &amp; Beyond
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {[
              { initials: "SB", name: "Sri Balabagavathi Spinning & Weaving Mills", capacity: "1.2 MW", location: "Coimbatore", type: "Industrial", color: "from-amber-600 to-amber-800", border: "border-amber-700/40", badge: "bg-amber-950/80 text-amber-300 border-amber-600/40" },
              { initials: "SM", name: "Sundaram Multi-Specialty Care", capacity: "350 kWp", location: "Salem", type: "Commercial", color: "from-blue-600 to-blue-800", border: "border-blue-700/40", badge: "bg-blue-950/80 text-blue-300 border-blue-600/40" },
              { initials: "TA", name: "Thangavel Agro Farms (30 Acres)", capacity: "10 HP", location: "Palani", type: "Agricultural", color: "from-emerald-600 to-emerald-800", border: "border-emerald-700/40", badge: "bg-emerald-950/80 text-emerald-300 border-emerald-600/40" },
              { initials: "AR", name: "Anand Rajagopalan Villa", capacity: "10 kWp", location: "Pollachi", type: "Residential", color: "from-rose-600 to-rose-800", border: "border-rose-700/40", badge: "bg-red-950/80 text-rose-300 border-red-600/40" },
              { initials: "AC", name: "Apex Cold Chain Logistics", capacity: "500 kWp", location: "Erode", type: "Industrial", color: "from-amber-600 to-amber-800", border: "border-amber-700/40", badge: "bg-amber-950/80 text-amber-300 border-amber-600/40" },
            ].map((c, i) => (
              <div key={i} className={`group relative bg-[#14101A] border ${c.border} rounded-2xl p-4 flex flex-col items-center text-center gap-3 hover:bg-[#1C1625] hover:border-opacity-80 transition-all duration-300 overflow-hidden`}>
                {/* Subtle glow behind monogram */}
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-20 h-20 bg-gradient-to-b ${c.color} opacity-10 rounded-full blur-2xl pointer-events-none`} />

                {/* Monogram circle */}
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${c.color} flex items-center justify-center shadow-lg shrink-0 relative z-10`}>
                  <span className="text-sm font-black text-white tracking-tight">{c.initials}</span>
                </div>

                {/* Client details */}
                <div className="relative z-10 space-y-1">
                  <p className="text-xs font-black text-white leading-tight">{c.name}</p>
                  <p className="text-[10px] text-slate-400 font-mono">{c.location}</p>
                </div>

                {/* Bottom row: capacity + sector */}
                <div className="flex items-center gap-1.5 flex-wrap justify-center relative z-10">
                  <span className="text-[9px] font-mono font-black px-2 py-0.5 rounded-full bg-[#0A0A0E] text-slate-300 border border-red-950/60">
                    {c.capacity}
                  </span>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${c.badge}`}>
                    {c.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13. FREQUENTLY ASKED QUESTIONS */}
      <section className="section-padding bg-[#0A0A0E] relative overflow-hidden" id="faq">
        <div className="site-container relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold tracking-widest uppercase bg-red-950/80 text-rose-300 border border-red-500/40 shadow-xs font-mono">
              <Zap className="w-3.5 h-3.5 text-red-400" />
              <span>SOLAR KNOWLEDGE BASE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
              FREQUENTLY ASKED <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">QUESTIONS</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Clear, transparent answers regarding solar pricing, PM Surya Ghar subsidy, net metering timelines, and system warranties.
            </p>
          </div>

          <FAQAccordion />
        </div>
      </section>


    </>
  );
};

export default HomePage;
