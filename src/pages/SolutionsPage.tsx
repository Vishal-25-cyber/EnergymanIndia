import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { SEOHead } from "../components/common/SEOHead";
import { solutionsData } from "../data/solutions";

export const SolutionsPage: React.FC = () => {
  return (
    <div className="bg-[#0A0A0E] text-slate-100 min-h-screen">
      <SEOHead
        title="Solar Solutions for Every Scale"
        description="Comprehensive solar solutions engineered for homes, businesses, industrial plants, agricultural estates, and microgrids. MNRE subsidy partner."
      />

      {/* Hero Header */}
      <section className="pt-32 pb-16 bg-[#0A0A0E] border-b border-red-950/60 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="site-container relative z-10 text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold tracking-wider uppercase bg-red-950/80 text-rose-300 border border-red-500/40 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-red-400" />
            <span>Turnkey Clean Energy Architecture</span>
          </div>
          <h1 className="heading-hero text-white">
            SOLAR SOLUTIONS FOR <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">EVERY SECTOR</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            Tailored engineering systems designed to eliminate electricity costs, maximize generation uptime, and deliver proven financial payback across residential, commercial, industrial, and agricultural operations.
          </p>
        </div>
      </section>

      {/* Solutions Detailed Grid */}
      <section className="section-padding bg-[#0A0A0E] relative">
        <div className="site-container space-y-16">
          {solutionsData.map((sol, index) => (
            <div
              key={sol.id}
              className={`flex flex-col lg:flex-row items-center gap-10 lg:gap-14 p-6 sm:p-10 rounded-3xl bg-[#14101A]/95 border border-red-900/30 shadow-xl hover:border-red-500/50 transition-all ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image Half */}
              <div className="w-full lg:w-1/2">
                <div className="relative rounded-2xl overflow-hidden border border-red-950/60 shadow-xl group bg-slate-900">
                  <img
                    src={sol.heroImage}
                    alt={sol.title}
                    className="w-full h-80 sm:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14101A] via-transparent to-transparent" />
                  
                  <div className="absolute top-4 left-4">
                    <span className="badge-crimson text-xs font-bold px-3 py-1 rounded-full shadow-md">
                      {sol.tag}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                    <span className="bg-[#0A0A0E]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-red-950/60 font-bold shadow-md">
                      ROI: <strong className="text-amber-400">{sol.typicalRoi}</strong>
                    </span>
                    <span className="bg-[#0A0A0E]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-red-950/60 font-bold shadow-md">
                      Lifespan: {sol.lifespan.split("with")[0]}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content Half */}
              <div className="w-full lg:w-1/2 space-y-6">
                <div className="space-y-3">
                  <h2 className="text-2xl sm:text-3xl font-black text-white">
                    {sol.title}
                  </h2>
                  <p className="text-sm font-bold text-red-400">
                    {sol.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {sol.overview}
                  </p>
                </div>

                {/* Key Benefits */}
                <div className="space-y-2 pt-2 border-t border-red-950/60">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">Key Engineering Highlights</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {sol.keyBenefits.slice(0, 4).map((benefit, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2 text-xs text-slate-300 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Links */}
                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <Link
                    to={`/solutions/${sol.slug}`}
                    className="btn-primary py-3 px-6 text-xs font-bold inline-flex items-center gap-2"
                  >
                    <span>Explore Solution Specs</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    to={`/get-a-quote?type=${encodeURIComponent(sol.title)}`}
                    className="py-3 px-6 text-xs font-bold rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-red-950/60 transition-all"
                  >
                    Request Feasibility Survey
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SolutionsPage;
