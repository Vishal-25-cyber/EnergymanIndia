import React from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Target,
  Eye,
  Sparkles,
  ArrowRight,
  Handshake,
  CheckCircle2,
  MapPin,
  Clock,
  FileBadge,
  Phone
} from "lucide-react";
import { SEOHead } from "../components/common/SEOHead";
import { companyData } from "../data/company";
import { ScrollReveal } from "../components/common/ScrollReveal";

// ── 6 Clean Milestone Chronicle Cards (2011 to Present) ──
const journeyMilestones = [
  {
    year: "2011",
    tag: "GENESIS",
    title: "Luminary's Solar Power Systems",
    description: "Founded in Coimbatore as Luminary's Solar Power Systems, focusing on domestic solar thermal water heaters, emergency solar lighting, and off-grid rooftop solutions.",
    highlight: "Initial 200+ residential installations in Western TN",
    accent: "from-red-500 to-rose-500",
    badgeColor: "bg-red-950/80 text-rose-300 border-red-500/50"
  },
  {
    year: "2014",
    tag: "AGRARIAN REVOLUTION",
    title: "Agricultural Solar Pumping",
    description: "Pioneered deep-well solar submersible agricultural pumping systems across the agrarian belts of Palani, Dindigul, and Pollachi, freeing farmers from diesel generators.",
    highlight: "500+ agricultural pump systems deployed",
    accent: "from-amber-500 to-orange-500",
    badgeColor: "bg-amber-950/80 text-amber-300 border-amber-500/50"
  },
  {
    year: "2016",
    tag: "PVT LTD ENTITY",
    title: "Energyman Power Technologies",
    description: "Officially incorporated as a Private Limited entity (CIN: U40300TZ2016PTC028163). Expanded into grid-tied commercial rooftop EPC with bi-directional net metering.",
    highlight: "Registered Head Office established at Gopal Layout, Coimbatore",
    accent: "from-rose-500 to-red-500",
    badgeColor: "bg-red-950/80 text-rose-300 border-rose-500/50"
  },
  {
    year: "2019",
    tag: "HEAVY INDUSTRY",
    title: "Megawatt Captive Industrial EPC",
    description: "Scaled engineering capabilities to execute MW-scale captive solar plants for spinning mills, heavy foundries, and cold storage logistics with zero-export DG synchronization.",
    highlight: "50+ Megawatts of captive industrial assets built",
    accent: "from-amber-500 to-yellow-500",
    badgeColor: "bg-amber-950/80 text-amber-300 border-amber-500/50"
  },
  {
    year: "2022",
    tag: "STRATEGIC ALLIANCE",
    title: "WAAREE Strategic EPC Partnership",
    description: "Formed a strategic EPC partnership with WAAREE (One with the Sun) to co-engineer and deploy utility-scale and large commercial solar projects across South India.",
    highlight: "Co-execution of utility plants up to 50 MW",
    accent: "from-red-500 to-amber-500",
    badgeColor: "bg-red-950/80 text-rose-300 border-red-500/50"
  },
  {
    year: "2024–2026",
    tag: "ACTIVE FRONTIER",
    title: "PM Surya Ghar & LiFePO4 Battery Storage",
    description: "Authorized vendor for PM Surya Ghar (₹78,000 DBT subsidy) and PM-KUSUM. Commercialized modular LiFePO4 battery energy storage (BESS) with cloud SCADA telemetry.",
    highlight: "6,500+ happy customers & 800+ industrial installations",
    accent: "from-emerald-500 to-teal-500",
    badgeColor: "bg-emerald-950/80 text-emerald-300 border-emerald-500/50"
  }
];

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-[#0A0A0E] text-slate-100 min-h-screen">
      <SEOHead
        title="About Us - Leading Solar Energy Storage System & EPC Players in India"
        description="Energyman Power Technologies (India) Private Limited (formerly known as Luminary's Solar Power Systems) is one of the most efficient organizations in this field since 2011. Strategic EPC Partner with WAAREE."
      />

      {/* ── 01. HERO HEADER ── */}
      <section className="relative overflow-hidden border-b border-red-900/40 bg-[#0A0A0E] pt-32 pb-16">
        {/* Subtle Ambient Radial Glows */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />

        <div className="site-container relative z-10">
          <div className="mx-auto max-w-4xl text-center space-y-4">
            <ScrollReveal animation="slide-up">
              <div className="inline-flex items-center gap-2 rounded-full border border-red-500/50 bg-red-950/80 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-rose-200 font-mono shadow-xs">
                <Sparkles className="h-3.5 w-3.5 text-red-400" />
                <span>Established since 2011 • formerly Luminary&apos;s Solar Power Systems</span>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="slide-up" delay={100}>
              <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl uppercase leading-tight">
                ABOUT{" "}
                <span className="bg-gradient-to-r from-red-500 via-orange-400 to-amber-300 bg-clip-text text-transparent">
                  ENERGYMAN
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal animation="slide-up" delay={150}>
              <p className="mx-auto max-w-3xl text-sm text-slate-300 sm:text-base leading-relaxed font-normal">
                Leading Solar Energy Storage System &amp; EPC Players in India. Harnessing the power of the sun to empower communities, industries, and businesses with clean, dependable power.
              </p>
            </ScrollReveal>

            {/* Quick Trust Badges */}
            <ScrollReveal animation="slide-up" delay={200}>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
                {[
                  { label: "Approved MNRE Partner", icon: ShieldCheck },
                  { label: "Strategic WAAREE Alliance", icon: Handshake },
                  { label: "ISO 9001:2015 Certified", icon: FileBadge },
                  { label: "HQ: Coimbatore, TN", icon: MapPin }
                ].map((item, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#14101A]/95 border border-red-500/30 hover:border-red-400/70 transition-colors text-xs font-bold text-slate-200 shadow-xs"
                  >
                    <item.icon className="w-3.5 h-3.5 text-amber-400" />
                    <span>{item.label}</span>
                  </span>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── 02. SECTION: 3 KEY METRIC CARDS ── */}
      <section className="border-b border-red-900/40 bg-[#0A0A0E] py-12 sm:py-16 relative overflow-hidden">
        <div className="site-container">
          <div className="grid gap-6 md:grid-cols-3">
            {companyData.metrics.map((item, index) => (
              <ScrollReveal key={index} animation="slide-up" delay={index * 100}>
                <div className="group relative overflow-hidden rounded-3xl border border-red-500/35 bg-[#14101A]/95 p-6 sm:p-7 shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-red-400 hover:shadow-2xl hover:shadow-red-950/50 flex flex-col justify-between h-full">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="space-y-3">
                    <div className="text-4xl sm:text-5xl font-black tracking-tight text-amber-300 font-mono leading-none">
                      {item.value}
                      <span className="ml-1 text-red-500">{item.suffix}</span>
                    </div>
                    
                    <h3 className="text-xs sm:text-sm font-black uppercase tracking-widest text-slate-100 font-mono">
                      {item.label}
                    </h3>
                    
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-300 font-normal">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-red-500/25 flex items-center justify-between text-xs text-slate-400">
                    <span className="text-[11px] text-slate-300 font-medium">Verified Metric</span>
                    <span className="text-[11px] font-mono text-emerald-400 font-bold">● Active Clients</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 03. SECTION: 6-CARD MILESTONE JOURNEY (2011 TO TODAY) ── */}
      <section className="py-16 sm:py-20 border-b border-red-900/40 bg-[#0A0A0E] relative overflow-hidden" id="journey">
        <div className="site-container relative z-10 space-y-12">
          <ScrollReveal animation="slide-up">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-red-500/50 bg-red-950/80 px-3.5 py-1 text-[10px] font-extrabold uppercase tracking-widest text-rose-300 font-mono shadow-xs">
                <Clock className="h-3 w-3 text-red-400" />
                <span>15-YEAR TRACK RECORD</span>
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase leading-tight">
                OUR JOURNEY FROM <span className="text-red-500">2011</span> TO{" "}
                <span className="bg-gradient-to-r from-red-500 via-orange-400 to-amber-300 bg-clip-text text-transparent">
                  TODAY
                </span>
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-normal">
                How a focused Coimbatore solar thermal venture evolved into a full-spectrum megawatt EPC organization.
              </p>
            </div>
          </ScrollReveal>

          {/* 6 Milestone Cards Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {journeyMilestones.map((m, idx) => (
              <ScrollReveal key={idx} animation="slide-up" delay={idx * 80}>
                <div className="h-full rounded-3xl border border-red-500/35 bg-[#14101A]/95 p-6 sm:p-7 shadow-xl hover:border-red-400 hover:shadow-2xl hover:shadow-red-950/50 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${m.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl sm:text-4xl font-black text-amber-300 font-mono">
                        {m.year}
                      </span>
                      <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg border ${m.badgeColor}`}>
                        {m.tag}
                      </span>
                    </div>

                    <h3 className="text-lg font-black text-white group-hover:text-red-400 transition-colors uppercase tracking-tight">
                      {m.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                      {m.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-5 border-t border-red-500/25 flex items-start gap-2 text-xs text-slate-300 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{m.highlight}</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 04. SECTION: WHY WE EXIST (CARDLESS OPEN EDITORIAL LAYOUT) ── */}
      <section className="py-16 sm:py-20 border-b border-red-900/40 bg-[#0A0A0E] relative overflow-hidden">
        {/* Subtle Ambient Radial Glows */}
        <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
        <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

        <div className="site-container relative z-10 space-y-14">
          <ScrollReveal animation="slide-up">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-red-500/50 bg-red-950/80 px-3.5 py-1 text-[10px] font-extrabold uppercase tracking-widest text-rose-300 font-mono shadow-xs">
                <Target className="h-3 w-3 text-red-400" />
                <span>WHY WE EXIST</span>
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase leading-tight">
                PURPOSE BUILT FOR{" "}
                <span className="bg-gradient-to-r from-red-500 via-orange-400 to-amber-300 bg-clip-text text-transparent">
                  SUSTAINABLE IMPACT
                </span>
              </h2>
            </div>
          </ScrollReveal>

          {/* Cardless 2-Column Open Grid */}
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 max-w-6xl mx-auto">
            {/* Left: MISSION (Cardless) */}
            <ScrollReveal animation="slide-up" delay={100}>
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-red-500/30">
                  <div className="inline-flex rounded-xl border border-red-500/50 bg-red-950/80 p-2.5 text-red-400 shadow-xs">
                    <Target className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-red-400 font-mono">
                      CORE PURPOSE
                    </span>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                      Our Mission
                    </h3>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      num: "01",
                      title: "Empower Communities & Industries",
                      desc: "Harness solar power to provide clean, dependable energy, reducing reliance on fossil fuels and safeguarding the planet."
                    },
                    {
                      num: "02",
                      title: "Maximize Energy Independence",
                      desc: "Deliver customized, high-performance solar power plants engineered for long-term reliability and significant cost savings."
                    },
                    {
                      num: "03",
                      title: "Drive Technological Innovation",
                      desc: "Champion state-of-the-art solar, BESS storage, and intelligent microgrids with unparalleled engineering efficiency."
                    }
                  ].map((point, idx) => (
                    <div
                      key={idx}
                      className="group flex items-start gap-4 pb-4 border-b border-white/10 hover:border-red-500/40 transition-colors"
                    >
                      <span className="text-xl sm:text-2xl font-black font-mono text-red-500/70 group-hover:text-red-400 transition-colors shrink-0 mt-0.5">
                        {point.num}
                      </span>
                      <div className="space-y-1">
                        <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-red-300 transition-colors">
                          {point.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                          {point.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Right: VISION (Cardless) */}
            <ScrollReveal animation="slide-up" delay={200}>
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-amber-500/30">
                  <div className="inline-flex rounded-xl border border-amber-500/50 bg-amber-950/80 p-2.5 text-amber-300 shadow-xs">
                    <Eye className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 font-mono">
                      LONG-TERM HORIZON
                    </span>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                      Our Vision
                    </h3>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      num: "01",
                      title: "Benchmark Solar EPC Leadership",
                      desc: "To be recognized as India's premier solar EPC organization, spearheading the nation's transition to 100% green power."
                    },
                    {
                      num: "02",
                      title: "The Preferred Energy Partner",
                      desc: "The trusted partner for enterprises, developers, and institutions seeking reliable, high-yield renewable power solutions."
                    },
                    {
                      num: "03",
                      title: "A Sun-Powered Future",
                      desc: "To build an accessible, decentralized clean energy landscape where solar power is the natural environmental norm."
                    }
                  ].map((point, idx) => (
                    <div
                      key={idx}
                      className="group flex items-start gap-4 pb-4 border-b border-white/10 hover:border-amber-500/40 transition-colors"
                    >
                      <span className="text-xl sm:text-2xl font-black font-mono text-amber-500/70 group-hover:text-amber-400 transition-colors shrink-0 mt-0.5">
                        {point.num}
                      </span>
                      <div className="space-y-1">
                        <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                          {point.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                          {point.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── 05. SECTION: CORPORATE OFFICES & CONTACT (PERFECT SYMMETRICAL ALIGNMENT) ── */}
      <section className="py-16 sm:py-20 border-b border-red-900/40 bg-[#0A0A0E] relative overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
        <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

        <div className="site-container relative z-10 space-y-12">
          <ScrollReveal animation="slide-up">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-red-500/50 bg-red-950/80 px-3.5 py-1 text-[10px] font-extrabold uppercase tracking-widest text-rose-300 font-mono shadow-xs">
                <MapPin className="h-3 w-3 text-red-400" />
                <span>OFFICE LOCATIONS</span>
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase leading-tight">
                VISIT OUR{" "}
                <span className="bg-gradient-to-r from-red-500 via-orange-400 to-amber-300 bg-clip-text text-transparent">
                  EXPERIENCE HUBS
                </span>
              </h2>
            </div>
          </ScrollReveal>

          {/* Cardless 2-Column Hubs Grid with Laser-Accurate Symmetrical Alignment */}
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14 max-w-6xl mx-auto">
            {companyData.offices.map((office, idx) => (
              <ScrollReveal key={idx} animation="slide-up" delay={idx * 100} className="h-full">
                <div className={`h-full flex flex-col justify-between pb-6 border-b ${idx === 0 ? 'border-red-500/30' : 'border-amber-500/30'}`}>
                  {/* Top Row: Icon + Tag + 1-Line Title + Location Pill */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-3 pb-1">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`inline-flex rounded-xl border p-2.5 shadow-xs shrink-0 ${idx === 0 ? 'border-red-500/50 bg-red-950/80 text-red-400' : 'border-amber-500/50 bg-amber-950/80 text-amber-300'}`}>
                          <MapPin className="h-5 w-5" />
                        </div>
                        <div className="min-w-0">
                          <span className={`text-[10px] font-mono font-bold uppercase tracking-widest block leading-none mb-1 ${idx === 0 ? 'text-red-400' : 'text-amber-400'}`}>
                            {office.type.split("&")[0].trim()}
                          </span>
                          <h3 className="text-base sm:text-lg lg:text-xl font-black text-white uppercase tracking-tight truncate">
                            {office.city} Experience Center
                          </h3>
                        </div>
                      </div>

                      <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-md border shrink-0 ${idx === 0 ? 'bg-red-950/80 text-rose-300 border-red-500/40' : 'bg-amber-950/80 text-amber-300 border-amber-500/40'}`}>
                        {office.city === 'Coimbatore' ? 'HQ Location' : 'Regional Hub'}
                      </span>
                    </div>

                    {/* Address with strict 2-line symmetry for exact baseline alignment */}
                    <div className="pl-11 space-y-2.5">
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal min-h-[40px]">
                        {idx === 0 ? (
                          <>
                            <span className="block">119, Gopal Layout, Ponnaiahrajapuram,</span>
                            <span className="block text-slate-400">Near Gandhi Park, Coimbatore - 641001</span>
                          </>
                        ) : (
                          <>
                            <span className="block">S.F. No. 20/1, Old Sales Tax Building,</span>
                            <span className="block text-slate-400">R.S. Ramalingam Street, Palani - 624601</span>
                          </>
                        )}
                      </p>

                      <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                        <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{office.workingHours}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Actions Row - Perfectly Baseline Aligned */}
                  <div className={`pt-4 mt-6 border-t flex items-center justify-between pl-11 ${idx === 0 ? 'border-red-500/20' : 'border-amber-500/20'}`}>
                    <a
                      href={`tel:${office.phone.replace(/\s+/g, '')}`}
                      className="text-xs sm:text-sm font-bold text-slate-200 hover:text-red-400 transition-colors flex items-center gap-2 font-mono"
                    >
                      <Phone className="w-3.5 h-3.5 text-amber-400" />
                      <span>{office.phone}</span>
                    </a>

                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-red-400 hover:text-red-300 transition-colors group"
                    >
                      <span>Visit Center</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Standalone Contact Page Button */}
          <ScrollReveal animation="slide-up" delay={200}>
            <div className="pt-6 sm:pt-8 text-center">
              <Link
                to="/contact"
                className="btn-primary py-3.5 px-9 text-xs sm:text-sm font-black uppercase tracking-wider inline-flex items-center gap-2.5 shadow-2xl shadow-red-950/60 rounded-xl"
              >
                <span>Contact EnergyMan Team</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
