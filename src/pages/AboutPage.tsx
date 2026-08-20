import React from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Award,
  Target,
  Eye,
  Heart,
  Sparkles,
  ArrowRight,
  Sun,
  Handshake,
  CheckCircle2
} from "lucide-react";
import { SEOHead } from "../components/common/SEOHead";
import { companyData } from "../data/company";

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-[#0A0A0E] text-slate-100 min-h-screen">
      <SEOHead
        title="About Us - Leading Solar Energy Storage System & EPC Players in India"
        description="Energyman Power Technologies (India) Private Limited (formerly known as Luminary's Solar Power Systems) is one of the most efficient organizations in this field since 2011. Strategic EPC Partner with WAAREE."
      />

      {/* Hero Header */}
      <section className="pt-32 pb-16 bg-[#0A0A0E] border-b border-red-950/60 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="site-container relative z-10 text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold tracking-widest uppercase bg-red-950/80 text-rose-300 border border-red-500/40 shadow-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-red-400" />
            <span>ESTABLISHED SINCE 2011 • FORMERLY LUMINARY'S SOLAR POWER SYSTEMS</span>
          </div>
          <h1 className="heading-hero text-white">
            ABOUT <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">ENERGYMAN</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto font-medium">
            Leading Solar Energy Storage System & EPC Players in India. Harnessing the power of the sun to empower communities, industries, and businesses with clean, dependable power.
          </p>
        </div>
      </section>

      {/* 3 Core Statistics from Source */}
      <section className="py-12 bg-[#14101A]/95 border-b border-red-950/60">
        <div className="site-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {companyData.metrics.map((m, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-slate-900/90 border border-red-950/60 text-center space-y-1 shadow-md"
              >
                <div className="text-3xl sm:text-4xl font-black text-amber-400 font-mono">
                  {m.value}{m.suffix}
                </div>
                <strong className="text-sm font-bold text-white block">{m.label}</strong>
                <p className="text-xs text-slate-400">{m.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Story & Heritage */}
      <section className="section-padding bg-[#0A0A0E] relative border-b border-red-950/60">
        <div className="site-container space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Text Story (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-extrabold uppercase tracking-wider text-red-400 font-mono">
                  OUR HERITAGE & BACKGROUND
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                  Pioneering Renewable Energy & Storage Systems Since 2011
                </h2>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                <p>
                  <strong className="text-white">Energyman Power Technologies (India) Private Limited</strong> (formerly known as <strong className="text-amber-300">Luminary's Solar Power Systems</strong>) is one of the most efficient organizations in this field since 2011, which pays attention to the holistic utilization of solar energy in the products that it manufactures and installs.
                </p>
                <p>
                  Headquartered at <strong className="text-slate-200">119, Gopal Layout, Ponnaiahrajapuram, Near Gandhi Park, Coimbatore</strong>, with regional franchisee operations in <strong className="text-slate-200">Palani</strong> and an active network of service centres across India, EnergyMan delivers turnkey rooftop, ground-mounted, energy storage (BESS), and agricultural solar pumping solutions.
                </p>
                <p>
                  We are an authorized vendor and implementing partner for the <strong className="text-red-400">MNRE Subsidy Scheme (PM Surya Ghar: Muft Bijli Yojana & PM-KUSUM)</strong>, providing clients with fixed per-kW capital subsidies, direct beneficiary transfers (DBT) within 30 days, and 5 years of comprehensive maintenance (CMC).
                </p>
              </div>

              {/* Accreditations Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-[#14101A]/95 border border-red-900/30 flex items-center gap-3 shadow-md">
                  <ShieldCheck className="w-6 h-6 text-red-400 shrink-0" />
                  <div>
                    <strong className="text-xs text-white block font-bold">MNRE Authorized Vendor</strong>
                    <span className="text-[11px] text-slate-400">National Portal for Rooftop Solar</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#14101A]/95 border border-red-900/30 flex items-center gap-3 shadow-md">
                  <Handshake className="w-6 h-6 text-amber-400 shrink-0" />
                  <div>
                    <strong className="text-xs text-white block font-bold">WAAREE Strategic Partner</strong>
                    <span className="text-[11px] text-slate-400">One with the Sun EPC Alliance</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Image (5 Cols) */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden border border-red-950/60 shadow-2xl relative bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80"
                  alt="Solar engineering installation"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0E] via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 bg-[#14101A]/95 backdrop-blur-md p-4 rounded-2xl border border-red-900/30 shadow-lg space-y-1">
                  <span className="text-xs font-mono font-bold text-red-400 block uppercase">
                    ENERGYMAN POWER TECHNOLOGIES
                  </span>
                  <p className="text-xs text-slate-200">
                    Renewable Energy Saves Earth • Coimbatore - 641001
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Mission & Vision (Verbatim from Brochure Pages 2 & 3) */}
      <section className="section-padding bg-[#0A0A0E] border-b border-red-950/60">
        <div className="site-container space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* MISSION */}
            <div className="p-8 rounded-3xl bg-[#14101A]/95 border border-red-900/40 space-y-6 shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-red-950/90 border border-red-500/40 text-red-400">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-red-400 uppercase tracking-widest block">
                    CORE PURPOSE
                  </span>
                  <h3 className="text-2xl font-black text-white">Our Mission</h3>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                {companyData.mission.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <p className="leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* VISION */}
            <div className="p-8 rounded-3xl bg-[#14101A]/95 border border-red-900/40 space-y-6 shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-amber-950/90 border border-amber-500/40 text-amber-400">
                  <Eye className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest block">
                    STRATEGIC DIRECTION
                  </span>
                  <h3 className="text-2xl font-black text-white">Our Vision</h3>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                {companyData.vision.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <p className="leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Strategic EPC Association with WAAREE (Pages 4 & 5) */}
      <section className="section-padding bg-[#0A0A0E] border-b border-red-950/60">
        <div className="site-container space-y-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-red-950/80 text-rose-300 border border-red-500/40 font-mono uppercase">
              <Handshake className="w-3.5 h-3.5 text-red-400" />
              <span>STRATEGIC EPC COLLABORATION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              WAAREE <span className="text-red-500">&amp;</span> ENERGYMAN
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Partnering with India's largest solar module manufacturer and EPC pioneer to deliver multi-megawatt industrial and utility solar power plants.
            </p>
          </div>

          {/* Highlights of Major Commissioned Installations */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 text-xs">
            {[
              { client: "Waneep Solar Pvt. Ltd.", loc: "Madhya Pradesh", cap: "50 MW" },
              { client: "Waneep Solar Pvt. Ltd.", loc: "Andhra Pradesh", cap: "50 MW" },
              { client: "Hero Future Energies", loc: "Telangana", cap: "44 MW" },
              { client: "Roha Dyechem Pvt. Ltd.", loc: "Rajasthan", cap: "25 MW" },
              { client: "Reliance Metro", loc: "Mumbai", cap: "2,700 kW" },
              { client: "Mondelez India (Cadbury)", loc: "Andhra Pradesh", cap: "2,000 kW" },
              { client: "Piramal Glass Ltd.", loc: "Gujarat", cap: "1,700 kW" },
              { client: "SRG Apparels", loc: "Tamil Nadu", cap: "1,000 kW" },
              { client: "Sri Balabagavathi Mills", loc: "Karumathampatti, Coimbatore", cap: "660 kW" },
              { client: "Deivajothi Textiles", loc: "Somanur, Coimbatore", cap: "670 kW" },
              { client: "Green Cotton Mills", loc: "Uthukuli, Tirupur", cap: "110 kW" },
              { client: "Mr. Palanisamy (Banu Illam)", loc: "Palladam, Tirupur", cap: "50 kW Hybrid" }
            ].map((proj, pIdx) => (
              <div
                key={pIdx}
                className="p-4 rounded-2xl bg-slate-900/90 border border-red-950/60 space-y-1 hover:border-red-500/50 transition-colors"
              >
                <span className="text-[10px] font-mono font-bold text-amber-400 block">{proj.cap}</span>
                <strong className="text-xs text-white block line-clamp-1">{proj.client}</strong>
                <p className="text-[11px] text-slate-400">{proj.loc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#14101A]/95 text-center">
        <div className="site-container max-w-2xl mx-auto space-y-4">
          <h3 className="text-2xl font-black text-white">Partner with EnergyMan for Your Solar Transition</h3>
          <p className="text-xs sm:text-sm text-slate-300">
            Approved MNRE subsidy partner with complete in-house design, engineering, procurement, construction, and 25-year lifecycle support.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="btn-primary py-3.5 px-8 text-xs sm:text-sm font-bold inline-flex items-center gap-2"
            >
              <span>Contact Engineering Desk</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
