import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Star,
  Quote,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Building2,
  Tractor,
  Home,
  Factory
} from "lucide-react";
import { SEOHead } from "../components/common/SEOHead";
import { testimonialsData } from "../data/testimonials";

export const TestimonialsPage: React.FC = () => {
  const [filterType, setFilterType] = useState<string>("All");

  const filterOptions = ["All", "Industrial", "Commercial", "Agricultural", "Residential"];

  const filteredReviews = testimonialsData.filter(
    (item) => filterType === "All" || item.projectType === filterType
  );

  return (
    <>
      <SEOHead
        title="Customer Testimonials & Verified Reviews"
        description="Read what industrial plant directors, hospital administrators, agricultural farmers, and homeowners say about working with Energy Man India."
      />

      {/* Hero Header */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-brand-950 via-brand-900/60 to-brand-950 border-b border-slate-800">
        <div className="site-container text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-solar-500/10 text-solar-400 border border-solar-500/30">
            <Star className="w-3.5 h-3.5 fill-solar-400" />
            <span>Verified Customer Stories</span>
          </div>
          <h1 className="heading-hero text-white">
            WHAT OUR <span className="bg-gradient-to-r from-solar-400 to-energy-400 bg-clip-text text-transparent">CUSTOMERS SAY</span>
          </h1>
          <p className="text-subtle">
            Real feedback from clients who transformed their electricity economics with Energy Man India solar installations.
          </p>
        </div>
      </section>

      {/* Filters Bar */}
      <section className="py-6 bg-brand-950/90 border-b border-slate-800/80 sticky top-[68px] z-30 backdrop-blur-md">
        <div className="site-container flex items-center justify-center">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {filterOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => setFilterType(opt)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  filterType === opt
                    ? "bg-solar-500 text-brand-950 font-bold shadow-md shadow-solar-500/20"
                    : "bg-brand-900 border border-slate-800 text-slate-300 hover:border-slate-700"
                }`}
              >
                {opt} Reviews
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="section-padding bg-brand-950">
        <div className="site-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredReviews.map((item) => (
              <div
                key={item.id}
                className="bg-brand-900/80 border border-slate-800 rounded-3xl p-8 hover:border-solar-500/40 hover:shadow-2xl hover:shadow-solar-500/10 transition-all duration-300 flex flex-col justify-between space-y-6 relative group"
              >
                <Quote className="w-12 h-12 text-slate-800/60 absolute top-6 right-6 pointer-events-none group-hover:text-solar-500/10 transition-colors" />

                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-1 text-solar-400">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-solar-400 text-solar-400" />
                      ))}
                    </div>

                    <span className="badge-emerald text-xs font-bold">
                      {item.capacityInstalled}
                    </span>
                  </div>

                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed italic">
                    "{item.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {item.avatar && (
                      <img
                        src={item.avatar}
                        alt={item.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-slate-700"
                      />
                    )}
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                        <span>{item.name}</span>
                        {item.verified && (
                          <span title="Verified Customer">
                            <ShieldCheck className="w-4 h-4 text-energy-400" />
                          </span>
                        )}
                      </h4>
                      <p className="text-xs text-slate-400">
                        {item.role}{item.organization ? `, ${item.organization}` : ""}
                      </p>
                      <p className="text-[11px] text-solar-400 font-medium">
                        {item.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
