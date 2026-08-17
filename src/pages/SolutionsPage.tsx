import React from "react";
import { Link } from "react-router-dom";
import {
  Home,
  Building2,
  Factory,
  Tractor,
  Wrench,
  BatteryCharging,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Zap
} from "lucide-react";
import { SEOHead } from "../components/common/SEOHead";
import { solutionsData } from "../data/solutions";

export const SolutionsPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Solar Solutions for Every Scale"
        description="Comprehensive solar solutions engineered for homes, businesses, industrial plants, agricultural estates, and microgrids. MNRE subsidy partner."
      />

      {/* Hero Header */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-brand-950 via-brand-900/60 to-brand-950 border-b border-slate-800">
        <div className="site-container text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-energy-500/10 text-energy-400 border border-energy-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Turnkey Clean Energy Architecture</span>
          </div>
          <h1 className="heading-hero text-white">
            SOLAR SOLUTIONS FOR <span className="bg-gradient-to-r from-energy-400 to-solar-400 bg-clip-text text-transparent">EVERY SECTOR</span>
          </h1>
          <p className="text-subtle">
            Tailored engineering systems designed to eliminate electricity costs, maximize generation uptime, and deliver proven financial payback across residential, commercial, industrial, and agricultural operations.
          </p>
        </div>
      </section>

      {/* Solutions Detailed Grid */}
      <section className="section-padding bg-brand-950">
        <div className="site-container space-y-16">
          {solutionsData.map((sol, index) => (
            <div
              key={sol.id}
              className={`flex flex-col lg:flex-row items-center gap-10 lg:gap-14 ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image Half */}
              <div className="w-full lg:w-1/2">
                <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl group">
                  <img
                    src={sol.heroImage}
                    alt={sol.title}
                    className="w-full h-80 sm:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-transparent to-transparent" />
                  
                  <div className="absolute top-4 left-4">
                    <span className="badge-emerald text-xs font-bold shadow-lg">
                      {sol.tag}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-200">
                    <span className="bg-brand-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 font-semibold">
                      ROI: <strong className="text-energy-400">{sol.typicalRoi}</strong>
                    </span>
                    <span className="bg-brand-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 font-semibold">
                      Lifespan: {sol.lifespan.split("with")[0]}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content Half */}
              <div className="w-full lg:w-1/2 space-y-6">
                <div className="space-y-3">
                  <h2 className="text-2xl sm:text-3xl font-bold text-white">
                    {sol.title}
                  </h2>
                  <p className="text-sm font-semibold text-energy-400">
                    {sol.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {sol.overview}
                  </p>
                </div>

                {/* Key Benefits */}
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Key Engineering Highlights</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {sol.keyBenefits.slice(0, 4).map((benefit, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2 text-xs text-slate-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-energy-400 shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    to={`/solutions/${sol.slug}`}
                    className="btn-primary py-3 px-6 text-xs sm:text-sm font-bold"
                  >
                    <span>View In-Depth Technical Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    to={`/get-a-quote?solution=${encodeURIComponent(sol.shortTitle)}`}
                    className="btn-secondary py-3 px-6 text-xs sm:text-sm font-semibold"
                  >
                    <span>Get a Quote</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
