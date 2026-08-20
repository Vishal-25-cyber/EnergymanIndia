import React, { useState, useEffect } from "react";
import {
  Star,
  Quote,
  ShieldCheck,
} from "lucide-react";
import { testimonialsData } from "../../data/testimonials";

export const TestimonialCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const maxIndex = testimonialsData.length - 1;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5500);

    return () => clearInterval(timer);
  }, [isPaused, currentIndex]);

  return (
    <section
      className="section-padding bg-[#0A0A0E] relative overflow-hidden border-t border-red-950/60"
      id="testimonials"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="site-container relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold tracking-wider uppercase bg-amber-950/80 text-amber-300 border border-amber-500/40 shadow-xs">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>Customer Trust & Reviews</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            WHAT OUR <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">CUSTOMERS SAY</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Direct feedback from factory directors, hospital administrators, agricultural farmers, and homeowners who partnered with ENERGYMAN since 2016.
          </p>
        </div>

        {/* Carousel Viewport */}
        <div className="overflow-hidden pb-4">
          <div
            className="flex transition-transform duration-500 ease-out -mx-3"
            style={{
              transform: `translateX(-${currentIndex * (100 / (typeof window !== 'undefined' && window.innerWidth >= 1024 ? 2 : 1))}%)`
            }}
          >
            {testimonialsData.map((item) => (
              <div
                key={item.id}
                className="w-full lg:w-1/2 px-3 shrink-0"
              >
                <div className="bg-[#14101A]/95 border border-red-900/30 rounded-3xl p-7 sm:p-8 hover:border-red-500/50 hover:shadow-2xl hover:shadow-black/70 transition-all duration-300 flex flex-col justify-between space-y-6 h-full relative group shadow-md">
                  {/* Subtle top accent */}
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-500 via-rose-400 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Quote className="w-10 h-10 text-slate-800 absolute top-6 right-6 pointer-events-none group-hover:text-red-300/20 transition-colors" />

                  <div className="space-y-4">
                    {/* Stars & Project Badge */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="badge-crimson text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                          {item.capacityInstalled}
                        </span>
                      </div>
                    </div>

                    {/* Quote Text */}
                    <p className="text-sm sm:text-base text-slate-200 leading-relaxed italic font-medium">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>

                  {/* Customer Profile Row */}
                  <div className="pt-4 border-t border-red-950/60 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {item.avatar && (
                        <img
                          src={item.avatar}
                          alt={item.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-red-950/60 group-hover:border-red-500 transition-colors shadow-xs"
                        />
                      )}
                      <div>
                        <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                          <span>{item.name}</span>
                          {item.verified && (
                            <span title="Verified Customer">
                              <ShieldCheck className="w-4 h-4 text-red-400" />
                            </span>
                          )}
                        </h4>
                        <p className="text-xs text-slate-400">
                          {item.role}{item.organization ? `, ${item.organization}` : ""}
                        </p>
                        <p className="text-[11px] text-red-400 font-bold">
                          {item.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
