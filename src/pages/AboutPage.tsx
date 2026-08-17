import React from "react";
import { Link } from "react-router-dom";
import {
  Sun,
  Zap,
  ShieldCheck,
  Award,
  CheckCircle2,
  Users,
  Target,
  Eye,
  Heart,
  ArrowRight,
  Sparkles,
  Cpu,
  Building2,
  Factory,
  Tractor
} from "lucide-react";
import { SEOHead } from "../components/common/SEOHead";
import { companyData } from "../data/company";
import { StatCounter } from "../components/common/StatCounter";

export const AboutPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="About Us - Engineering A Cleaner Energy Future"
        description="Learn about Energyman Power Technologies (India) Pvt. Ltd., our decade of solar EPC excellence, MNRE subsidy accreditation, and mission to power India sustainably."
      />

      {/* Hero Header */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-brand-950 via-brand-900/60 to-brand-950 border-b border-slate-800">
        <div className="site-container text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-energy-500/10 text-energy-400 border border-energy-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Decade of Engineering Excellence</span>
          </div>
          <h1 className="heading-hero text-white">
            ENGINEERING A <span className="bg-gradient-to-r from-energy-400 to-solar-400 bg-clip-text text-transparent">CLEANER ENERGY FUTURE</span>
          </h1>
          <p className="text-subtle">
            Founded with a steadfast mission to make clean, dependable solar energy accessible for Indian industries, farms, and homes.
          </p>
        </div>
      </section>

      {/* Metrics Strip */}
      <StatCounter />

      {/* Company Story & Mission */}
      <section className="section-padding bg-brand-950">
        <div className="site-container space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Text Story (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-energy-400">Our Story</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  From Regional Solar Pioneer to Trusted South India EPC Contractor
                </h2>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <p>
                  <strong>Energyman Power Technologies (India) Private Limited</strong> was incorporated with a vision to revolutionize clean power delivery across South India. With corporate headquarters in Coimbatore and an established engineering hub in Palani, we have evolved into a premier turnkey renewable energy solutions provider.
                </p>
                <p>
                  Over the past decade, we have engineered and commissioned over <strong>35 MW+</strong> of rooftop, ground-mounted, and agricultural solar pumping systems. Our work spans multi-megawatt captive solar plants for energy-intensive textile spinning mills to PM Surya Ghar rooftop solar setups for thousands of homes.
                </p>
                <p>
                  As an approved <strong>Ministry of New and Renewable Energy (MNRE) Channel Partner</strong> and registered subsidy implementer, we guarantee that every kilowatt installed adheres to the strictest safety, electrical, and structural codes.
                </p>
              </div>

              {/* Accreditations Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-brand-900/80 border border-slate-800 flex items-center gap-3">
                  <ShieldCheck className="w-6 h-6 text-energy-400 shrink-0" />
                  <div>
                    <strong className="text-xs text-white block">MNRE Partner</strong>
                    <span className="text-[11px] text-slate-400">PM Surya Ghar & PM-KUSUM</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-brand-900/80 border border-slate-800 flex items-center gap-3">
                  <Award className="w-6 h-6 text-solar-400 shrink-0" />
                  <div>
                    <strong className="text-xs text-white block">ISO 9001:2015 Certified</strong>
                    <span className="text-[11px] text-slate-400">Quality Management System</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Image (5 Cols) */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden border border-slate-800 shadow-2xl relative">
                <img
                  src="https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80"
                  alt="Solar engineering field"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 bg-brand-900/90 backdrop-blur-md p-4 rounded-2xl border border-slate-700">
                  <span className="text-xs font-bold text-solar-400 block">Energy Man India</span>
                  <span className="text-xs text-slate-300">"Renewable Energy Saves Earth"</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mission, Vision, Core Values (3 Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-brand-900/70 border border-slate-800 rounded-3xl p-8 space-y-4 hover:border-energy-500/40 transition-colors">
              <div className="p-3 rounded-2xl bg-energy-500/10 text-energy-400 border border-energy-500/20 w-fit">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Our Mission</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                To accelerate India's transition to clean energy by engineering reliable, high-yield solar systems that deliver genuine long-term savings and lower carbon emissions for every customer.
              </p>
            </div>

            <div className="bg-brand-900/70 border border-slate-800 rounded-3xl p-8 space-y-4 hover:border-solar-500/40 transition-colors">
              <div className="p-3 rounded-2xl bg-solar-500/10 text-solar-400 border border-solar-500/20 w-fit">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Our Vision</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                To stand as India's benchmark engineering EPC company—trusted for technical precision, uncompromising hardware quality, and lifetime customer care.
              </p>
            </div>

            <div className="bg-brand-900/70 border border-slate-800 rounded-3xl p-8 space-y-4 hover:border-blue-500/40 transition-colors">
              <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 w-fit">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Our Core Values</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Engineering integrity, transparent economics, zero compromise on safety, and continuous innovation in renewable power management.
              </p>
            </div>
          </div>

          {/* Company Timeline */}
          <div className="bg-brand-900/60 border border-slate-800 rounded-3xl p-8 sm:p-12 space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h3 className="text-2xl font-bold text-white">
                Our Journey & Key Milestones
              </h3>
              <p className="text-xs text-slate-400">
                A decade of continuous innovation and expanding solar capacity.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { year: "2016", title: "Company Inception", desc: "Energyman Power Technologies incorporated in Tamil Nadu with focus on agricultural solar pumps and rooftop systems." },
                { year: "2019", title: "10 MW Milestone", desc: "Crossed 10 MW installed capacity across industrial spinning mills and commercial institutions in Western Tamil Nadu." },
                { year: "2023", title: "PM-KUSUM & BESS Expansion", desc: "Empanelled for large-scale PM-KUSUM farm pumps and launched modular LiFePO4 battery energy storage lines." },
                { year: "2026", title: "35 MW+ & PM Surya Ghar", desc: "Over 2,500+ commissioned installations, deploying N-Type TOPCon bi-facial modules and national portal subsidy fulfillment." }
              ].map((m, mIdx) => (
                <div key={mIdx} className="p-5 rounded-2xl bg-brand-950/80 border border-slate-800 space-y-2">
                  <span className="text-xl font-black text-solar-400 font-mono">{m.year}</span>
                  <h4 className="text-sm font-bold text-white">{m.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-brand-900 via-brand-850 to-brand-900 border-t border-slate-800 text-center">
        <div className="site-container max-w-3xl space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Partner With India's Trusted Solar Engineers
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Let us evaluate your property and design an energy system built for 25+ years of reliable power generation.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/get-a-quote" className="btn-primary py-3.5 px-8 font-bold text-sm">
              Get Your Custom Solar Plan →
            </Link>
            <Link to="/contact" className="btn-secondary py-3.5 px-6 text-sm font-semibold">
              Contact Our Engineers
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
