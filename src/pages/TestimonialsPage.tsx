import React, { useState } from "react";
import {
  Star,
  Quote,
  ShieldCheck,
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
    <div className="bg-[#0A0A0E] text-slate-100 min-h-screen">
      <SEOHead
        title="Customer Testimonials & Verified Reviews"
        description="Read what industrial plant directors, hospital administrators, agricultural farmers, and homeowners say about working with ENERGYMAN."
      />

      {/* Hero Header */}
      <section className="pt-32 pb-16 bg-[#0A0A0E] border-b border-red-950/60 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="site-container relative z-10 text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold tracking-wider uppercase bg-amber-950/80 text-amber-300 border border-amber-500/40 shadow-xs">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>Verified Customer Stories</span>
          </div>
          <h1 className="heading-hero text-white">
            WHAT OUR <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">CUSTOMERS SAY</span>
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base">
            Real feedback from clients who transformed their electricity economics with ENERGYMAN solar installations.
          </p>
        </div>
      </section>

      {/* Filters Bar */}
      <section className="py-4 bg-[#14101A]/95 border-b border-red-950/60 sticky top-[60px] md:top-[92px] z-30 backdrop-blur-md shadow-lg">
        <div className="site-container flex items-center justify-center">
          <div className="flex flex-wrap items-center justify-center gap-2 bg-slate-900 p-1.5 rounded-2xl border border-red-950/60">
            {filterOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => setFilterType(opt)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  filterType === opt
                    ? "bg-red-600 text-white shadow-md"
                    : "text-slate-300 hover:text-red-400 hover:bg-slate-800"
                }`}
              >
                {opt} Reviews
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="section-padding bg-[#0A0A0E]">
        <div className="site-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredReviews.map((item) => (
              <div
                key={item.id}
                className="bg-[#14101A]/95 border border-red-900/30 rounded-3xl p-8 hover:border-red-500/50 hover:shadow-2xl hover:shadow-black/70 transition-all duration-300 flex flex-col justify-between space-y-6 relative group shadow-md"
              >
                <Quote className="w-12 h-12 text-slate-800 absolute top-6 right-6 pointer-events-none group-hover:text-red-500/20 transition-colors" />

                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>

                    <span className="badge-crimson text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                      {item.capacityInstalled}
                    </span>
                  </div>

                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed italic font-medium">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-red-950/60 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {item.avatar && (
                      <img
                        src={item.avatar}
                        alt={item.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-red-950/60 shadow-xs"
                      />
                    )}
                    <div>
                      <h4 className="text-sm font-bold text-white">{item.name}</h4>
                      <p className="text-xs text-slate-400">
                        {item.role}{item.organization ? ` • ${item.organization}` : ""}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] text-red-400 font-medium">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Verified Project</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TestimonialsPage;
