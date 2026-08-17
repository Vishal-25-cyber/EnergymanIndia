import React from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Zap,
  Award,
  ArrowRight,
  Sparkles,
  Cpu,
  CheckCircle2,
  Activity,
  Layers,
  FileText,
  Clock,
  Sun,
  Tractor,
  Building2,
  Factory,
  Home,
  Check
} from "lucide-react";
import { SEOHead } from "../components/common/SEOHead";
import { HeroCarousel } from "../components/common/HeroCarousel";
import { StatCounter } from "../components/common/StatCounter";
import { SolutionsCarousel } from "../components/common/SolutionsCarousel";
import { SavingsCalculator } from "../components/common/SavingsCalculator";
import { LiveSolarTelemetry } from "../components/common/LiveSolarTelemetry";
import { EMIFinanceCalculator } from "../components/common/EMIFinanceCalculator";
import { EnergyFlowDiagram } from "../components/common/EnergyFlowDiagram";
import { TechnologyCarousel } from "../components/common/TechnologyCarousel";
import { LiveSCADADemo } from "../components/common/LiveSCADADemo";
import { ProjectCarousel } from "../components/common/ProjectCarousel";
import { BeforeAfterSolar } from "../components/common/BeforeAfterSolar";
import { TestimonialCarousel } from "../components/common/TestimonialCarousel";
import { FAQAccordion } from "../components/common/FAQAccordion";
import { productsData } from "../data/products";
import { blogsData } from "../data/blogs";
import { subsidyProcessTimeline } from "../data/subsidies";
import { companyData } from "../data/company";

export const HomePage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Engineering Clean Energy Futures"
        description="Energyman Power Technologies (India) Pvt. Ltd. - Premier engineering solar EPC solutions for homes, industries, agriculture, and businesses. MNRE Subsidy Partner."
      />

      {/* 01. CINEMATIC HERO CAROUSEL */}
      <HeroCarousel />

      {/* 02. TRUST & METRICS STRIP */}
      <StatCounter />

      {/* 03. SOLUTIONS SECTION */}
      <SolutionsCarousel />

      {/* 04. INTERACTIVE SOLAR SAVINGS CALCULATOR */}
      <SavingsCalculator />

      {/* 04B. LIVE SOLAR TELEMETRY & TILT OPTIMIZER */}
      <LiveSolarTelemetry />

      {/* 04C. ZERO UPFRONT EMI & SOLAR FINANCING CALCULATOR */}
      <EMIFinanceCalculator />

      {/* 05. WHY ENERGY MAN INDIA (6 Feature Cards) */}
      <section className="section-padding bg-brand-950 relative overflow-hidden">
        <div className="site-container relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-energy-500/10 text-energy-400 border border-energy-500/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>The Energy Man Advantage</span>
            </div>
            <h2 className="heading-section">
              WHY <span className="bg-gradient-to-r from-energy-400 to-solar-400 bg-clip-text text-transparent">ENERGY MAN?</span>
            </h2>
            <p className="text-subtle">
              Solar is a 25-year structural and electrical investment. Here is why homeowners, farmers, and industrial conglomerates trust us with their critical energy infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                step: "01",
                title: "Engineering Expertise",
                desc: "Every system is custom-designed around real load profiles, PVSyst 3D shadow simulations, and heavy-duty structural wind load ratings.",
                icon: <Cpu className="w-6 h-6 text-energy-400" />
              },
              {
                step: "02",
                title: "Quality Technology",
                desc: "We exclusively deploy Tier-1 ALMM-enlisted Mono PERC & N-Type TOPCon bi-facial modules with 25-30 year linear warranties.",
                icon: <Zap className="w-6 h-6 text-solar-400" />
              },
              {
                step: "03",
                title: "End-to-End Execution",
                desc: "From site survey and CEIG / DISCOM statutory approvals to physical installation, net metering, and DBT subsidy disbursement.",
                icon: <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              },
              {
                step: "04",
                title: "Transparent Economics",
                desc: "Clear financial modeling detailing payback periods, internal rate of return (IRR), and 40% accelerated tax depreciation benefits.",
                icon: <Award className="w-6 h-6 text-yellow-400" />
              },
              {
                step: "05",
                title: "Smart Monitoring",
                desc: "Cloud SCADA telemetry with string-level anomaly detection and mobile app integration for real-time daily generation tracking.",
                icon: <Activity className="w-6 h-6 text-cyan-400" />
              },
              {
                step: "06",
                title: "Long-Term Support",
                desc: "Dedicated post-commissioning Operations & Maintenance (O&M) teams, rapid breakdown response SLAs, and scheduled panel cleaning.",
                icon: <ShieldCheck className="w-6 h-6 text-purple-400" />
              }
            ].map((feature) => (
              <div
                key={feature.step}
                className="bg-brand-900/60 backdrop-blur-md border border-slate-800 rounded-3xl p-7 hover:border-energy-500/40 hover:bg-brand-850/80 hover:shadow-2xl hover:shadow-energy-500/5 transition-all duration-300 group flex flex-col justify-between space-y-4"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-2xl bg-brand-850 border border-slate-700/80 group-hover:scale-110 transition-transform">
                      {feature.icon}
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-400 bg-brand-950 px-2.5 py-1 rounded-lg border border-slate-800">
                      {feature.step}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-energy-400 transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center gap-1.5 text-xs text-energy-400 font-semibold">
                  <Check className="w-3.5 h-3.5" />
                  <span>Verified EPC Benchmark</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 06. TECHNOLOGY & ENERGY FLOW VISUALIZATION */}
      <EnergyFlowDiagram />

      {/* 07. HARDWARE TECHNOLOGY CAROUSEL */}
      <TechnologyCarousel />

      {/* 07B. LIVE SCADA PLANT TELEMETRY DEMONSTRATION */}
      <LiveSCADADemo />

      {/* 08. PRODUCTS CATALOGUE PREVIEW */}
      <section className="section-padding bg-brand-950 relative overflow-hidden" id="products">
        <div className="site-container relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-solar-500/10 text-solar-400 border border-solar-500/30">
                <Layers className="w-3.5 h-3.5" />
                <span>Tier-1 Engineering Catalogue</span>
              </div>
              <h2 className="heading-section">
                THE TECHNOLOGY <span className="bg-gradient-to-r from-solar-400 to-energy-400 bg-clip-text text-transparent">POWERING YOUR ENERGY</span>
              </h2>
              <p className="text-subtle">
                Engineered components meeting rigorous BIS, IEC, and MNRE benchmarks with 25-year performance warranties.
              </p>
            </div>

            <Link
              to="/products"
              className="btn-secondary py-3 px-6 text-xs sm:text-sm font-bold inline-flex items-center gap-2 self-start md:self-auto"
            >
              <span>Explore All Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {productsData.slice(0, 3).map((prod) => (
              <div
                key={prod.id}
                className="bg-brand-900/70 border border-slate-800 rounded-3xl overflow-hidden hover:border-solar-500/40 hover:shadow-2xl hover:shadow-solar-500/10 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-56 overflow-hidden bg-brand-950">
                    <img
                      src={prod.mainImage}
                      alt={prod.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-transparent to-transparent" />
                    <span className="absolute top-4 left-4 badge-emerald text-xs font-semibold">
                      {prod.categoryLabel}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="text-lg font-bold text-white group-hover:text-solar-400 transition-colors line-clamp-2">
                      {prod.name}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2">
                      {prod.tagline}
                    </p>

                    <div className="space-y-1.5 pt-3 border-t border-slate-800">
                      {prod.features.slice(0, 2).map((f, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-solar-400 shrink-0" />
                          <span className="line-clamp-1">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    to={`/products/${prod.category}?item=${prod.slug}`}
                    className="btn-primary w-full py-2.5 text-xs font-bold text-center justify-center"
                  >
                    View Technical Specifications →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 09. PROJECTS SHOWCASE CAROUSEL */}
      <ProjectCarousel />

      {/* 09B. BEFORE & AFTER SOLAR ECONOMIC TRANSFORMATION */}
      <BeforeAfterSolar />

      {/* 10. GOVERNMENT SUBSIDY TIMELINE STRIP */}
      <section className="section-padding bg-brand-950/80 relative overflow-hidden" id="subsidy">
        <div className="site-container relative z-10">
          <div className="bg-gradient-to-br from-brand-900 via-brand-900/90 to-brand-850 border border-slate-700/80 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-10">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-800">
              <div className="space-y-2 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-solar-500/10 text-solar-400 border border-solar-500/30">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>National Solar Mission</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                  MAKE SOLAR MORE AFFORDABLE WITH <span className="text-solar-400">PM SURYA GHAR</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Energy Man India handles the entire subsidy documentation, feasibility inspection, net-metering synchronization, and direct DBT bank transfer up to ₹78,000.
                </p>
              </div>

              <Link
                to="/government-subsidy"
                className="btn-solar py-3.5 px-6 font-bold text-xs sm:text-sm whitespace-nowrap self-start lg:self-auto"
              >
                <span>Read Full Subsidy Guide →</span>
              </Link>
            </div>

            {/* 5-Step Process Timeline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {subsidyProcessTimeline.map((step) => (
                <div
                  key={step.step}
                  className="bg-brand-950/70 border border-slate-800 rounded-2xl p-5 space-y-3 relative group hover:border-solar-500/40 transition-colors"
                >
                  <span className="text-2xl font-extrabold text-solar-400 font-mono">
                    {step.step}
                  </span>
                  <h4 className="text-sm font-bold text-white group-hover:text-solar-400 transition-colors">
                    {step.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 11. FEATURED INSIGHTS / BLOG GRID */}
      <section className="section-padding bg-brand-950 relative overflow-hidden" id="insights">
        <div className="site-container relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-energy-500/10 text-energy-400 border border-energy-500/30">
                <FileText className="w-3.5 h-3.5" />
                <span>Knowledge Base & Technical Guides</span>
              </div>
              <h2 className="heading-section">
                INSIGHTS <span className="bg-gradient-to-r from-energy-400 to-solar-400 bg-clip-text text-transparent">& IDEAS</span>
              </h2>
              <p className="text-subtle">
                Expert engineering analyses, subsidy roadmaps, and solar ROI calculations for India's clean energy transition.
              </p>
            </div>

            <Link
              to="/insights"
              className="btn-secondary py-3 px-6 text-xs sm:text-sm font-bold inline-flex items-center gap-2 self-start md:self-auto"
            >
              <span>Browse All Articles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {blogsData.slice(0, 3).map((blog) => (
              <div
                key={blog.id}
                className="bg-brand-900/70 border border-slate-800 rounded-3xl overflow-hidden hover:border-energy-500/40 hover:shadow-2xl hover:shadow-energy-500/10 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-brand-950">
                    <img
                      src={blog.coverImage}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-transparent to-transparent" />
                    <span className="absolute top-4 left-4 badge-emerald text-xs font-semibold">
                      {blog.category}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span>{blog.date}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {blog.readTime}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-energy-400 transition-colors line-clamp-2 leading-snug">
                      {blog.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {blog.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    to={`/insights/${blog.slug}`}
                    className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-brand-850 hover:bg-energy-500 text-slate-200 hover:text-brand-950 font-semibold text-xs transition-all duration-300 border border-slate-700/80 group/btn"
                  >
                    <span>Read Full Guide</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. TESTIMONIALS CAROUSEL */}
      <TestimonialCarousel />

      {/* 13. CLIENT / PARTNER LOGOS TRUST STRIP (Grayscale to Color hover) */}
      <section className="py-12 bg-brand-950/90 border-y border-slate-800/80">
        <div className="site-container">
          <p className="text-center text-xs font-bold uppercase tracking-wider text-slate-400 mb-8">
            TRUSTED BY BUSINESSES, HOSPITALS, MILLS & AGRICULTURAL COMMUNITIES
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 sm:gap-8 items-center justify-items-center opacity-70 hover:opacity-100 transition-opacity">
            {[
              "Textile Mills Corp",
              "Apex Cold Chains",
              "Healthcare Care Trust",
              "Modern Agro Farms",
              "Engineering Institute",
              "Eco Residency Villas"
            ].map((partner, pIdx) => (
              <div
                key={pIdx}
                className="p-4 rounded-2xl bg-brand-900/60 border border-slate-800 text-center w-full grayscale hover:grayscale-0 transition-all duration-300 hover:border-slate-700"
              >
                <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white">
                  <Sun className="w-4 h-4 text-solar-400" />
                  <span>{partner}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 14. FREQUENTLY ASKED QUESTIONS */}
      <section className="section-padding bg-brand-950 relative overflow-hidden" id="faq">
        <div className="site-container relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-energy-500/10 text-energy-400 border border-energy-500/30">
              <Zap className="w-3.5 h-3.5" />
              <span>Solar Knowledge Base</span>
            </div>
            <h2 className="heading-section">
              FREQUENTLY ASKED <span className="bg-gradient-to-r from-energy-400 to-solar-400 bg-clip-text text-transparent">QUESTIONS</span>
            </h2>
            <p className="text-subtle">
              Clear, transparent answers regarding solar pricing, PM Surya Ghar subsidy, net metering timelines, and system warranties.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <FAQAccordion />
          </div>
        </div>
      </section>

      {/* 15. LARGE DARK FINAL CTA */}
      <section className="py-20 sm:py-28 bg-brand-950 relative overflow-hidden border-t border-slate-800">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1920&q=80"
            alt="Solar installation at sunrise"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-950/95 to-brand-950/80" />
        </div>

        <div className="site-container relative z-10 text-center max-w-3xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-energy-500/15 text-energy-400 border border-energy-500/40 shadow-xl">
            <Sparkles className="w-4 h-4" />
            <span>Start Your 25-Year Clean Energy Journey Today</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            READY TO MAKE THE SWITCH TO <span className="bg-gradient-to-r from-energy-400 via-solar-400 to-energy-300 bg-clip-text text-transparent">CLEAN ENERGY?</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Let our experienced renewable energy engineers design a custom, high-yield solar system engineered precisely around your consumption needs, available roof space, and subsidy eligibility.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/get-a-quote"
              className="btn-primary py-4 px-8 text-sm sm:text-base font-bold shadow-2xl group inline-flex items-center gap-2"
            >
              <span>Get Your Solar Plan</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>

            <a
              href={`tel:${companyData.phones.primary.replace(/\s+/g, '')}`}
              className="btn-secondary py-4 px-8 text-sm sm:text-base font-semibold"
            >
              <span>Talk to an Energy Expert: {companyData.phones.primary}</span>
            </a>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-energy-400" />
              MNRE Channel Partner
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-energy-400" />
              Up to ₹78,000 DBT Subsidy
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-energy-400" />
              25-Year Panel Performance Warranty
            </span>
          </div>
        </div>
      </section>
    </>
  );
};
