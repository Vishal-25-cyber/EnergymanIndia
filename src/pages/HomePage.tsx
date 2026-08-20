import React from "react";
import { SEOHead } from "../components/common/SEOHead";
import { HeroSection } from "../components/common/HeroSection";
import { EnergyStatement } from "../components/common/EnergyStatement";
import { EnergyEcosystem } from "../components/common/EnergyEcosystem";
import { WhyEnergyPathway } from "../components/common/WhyEnergyPathway";
import { NumbersThatMatter } from "../components/common/NumbersThatMatter";
import { ProjectsTimeline } from "../components/common/ProjectsTimeline";
import { SolarWaterHeaterInteractive } from "../components/common/SolarWaterHeaterInteractive";
import { SustainabilityPossibility } from "../components/common/SustainabilityPossibility";
import { ExclusiveGalleryPreview } from "../components/common/ExclusiveGalleryPreview";
import { SubsidyJourney } from "../components/common/SubsidyJourney";
import { ClimaxFinalCTA } from "../components/common/ClimaxFinalCTA";
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

      {/* 08. SECTION 7 — SOLAR WATER HEATER (INTERACTIVE PRODUCT VISUALIZATION) */}
      <SolarWaterHeaterInteractive />

      {/* 09. SECTION 8 — SUSTAINABILITY (FROM SUNLIGHT TO POSSIBILITY) */}
      <SustainabilityPossibility />

      {/* 10. SECTION 9 — GALLERY PREVIEW (OUR EXCLUSIVE CLIENT'S PROJECT SITES) */}
      <ExclusiveGalleryPreview />

      {/* 11. SECTION 10 — SUBSIDY (MAKE SOLAR MORE ACCESSIBLE - PM SURYA GHAR) */}
      <SubsidyJourney />

      {/* 12. TESTIMONIALS & TRUSTED PARTNERS STRIP */}
      <TestimonialCarousel />

      <section className="py-12 bg-[#0A0A0E] border-y border-red-950/60">
        <div className="site-container">
          <p className="text-center text-xs font-black uppercase tracking-wider text-slate-400 mb-8 font-mono">
            TRUSTED BY TEXTILE MILLS, HOSPITALS, RESIDENTIAL VILLAS & AGRICULTURAL COMMUNITIES SINCE 2016
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 sm:gap-8 items-center justify-items-center opacity-90 hover:opacity-100 transition-opacity">
            {[
              "Sri Balabagavathi Mills",
              "Deivajothi Textiles",
              "Green Cotton Mills",
              "Varun Exports",
              "Banu Illam Residency",
              "KUSUM Agro Farms"
            ].map((partner, pIdx) => (
              <div
                key={pIdx}
                className="p-4 rounded-2xl bg-[#14101A] border border-red-950/60 text-center w-full transition-all duration-300 hover:border-red-500/50 hover:bg-slate-900 shadow-xs"
              >
                <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-slate-300 hover:text-red-400">
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span className="line-clamp-1">{partner}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13. FREQUENTLY ASKED QUESTIONS */}
      <section className="section-padding bg-[#0A0A0E] relative overflow-hidden" id="faq">
        <div className="site-container relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold tracking-widest uppercase bg-red-950/80 text-rose-300 border border-red-500/40 shadow-xs font-mono">
              <Zap className="w-3.5 h-3.5 text-red-400" />
              <span>SOLAR KNOWLEDGE BASE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              FREQUENTLY ASKED <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">QUESTIONS</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Clear, transparent answers regarding solar pricing, PM Surya Ghar subsidy, net metering timelines, and system warranties.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <FAQAccordion />
          </div>
        </div>
      </section>

      {/* 14. SECTION 11 — FINAL CLIMAX CTA */}
      <ClimaxFinalCTA />
    </>
  );
};

export default HomePage;
