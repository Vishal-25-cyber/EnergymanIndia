import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Quote,
  ShieldCheck,
  Building2,
  Tractor,
  Home,
  Factory
} from "lucide-react";
import { testimonialsData } from "../../data/testimonials";

export const TestimonialCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const maxIndex = testimonialsData.length - 1;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // Automatic slide movement
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5500);

    return () => clearInterval(timer);
  }, [isPaused, currentIndex]);

  return (
    <section
      className="section-padding bg-brand-950/80 relative overflow-hidden"
      id="testimonials"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="site-container relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-solar-500/10 text-solar-400 border border-solar-500/30">
            <Star className="w-3.5 h-3.5 fill-solar-400" />
            <span>Customer Trust & Reviews</span>
          </div>
          <h2 className="heading-section">
            WHAT OUR <span className="bg-gradient-to-r from-solar-400 to-energy-400 bg-clip-text text-transparent">CUSTOMERS SAY</span>
          </h2>
          <p className="text-subtle">
            Direct feedback from factory directors, hospital administrators, agricultural farmers, and homeowners who partnered with Energy Man India.
          </p>
        </div>

        {/* Carousel Viewport */}
        <div className="overflow-hidden pb-4">
          <div
            className="flex transition-transform duration-500 ease-out -mx-3"
            style={{
              transform: `translateX(-${currentIndex * (100 / (window.innerWidth >= 1024 ? 2 : 1))}%)`
            }}
          >
            {testimonialsData.map((item) => (
              <div
                key={item.id}
                className="w-full lg:w-1/2 px-3 shrink-0"
              >
                <div className="bg-brand-900/70 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-7 sm:p-8 hover:border-solar-500/40 hover:shadow-2xl hover:shadow-solar-500/10 transition-all duration-300 flex flex-col justify-between space-y-6 h-full relative group shimmer-container">
                  {/* Subtle top accent */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-solar-500 via-energy-400 to-solar-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Quote className="w-10 h-10 text-slate-700/40 absolute top-6 right-6 pointer-events-none group-hover:text-solar-500/20 transition-colors" />

                  <div className="space-y-4">
                    {/* Stars & Project Badge */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-1 text-solar-400">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-solar-400 text-solar-400" />
                        ))}
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="badge-emerald text-xs font-bold shadow-md">
                          {item.capacityInstalled}
                        </span>
                      </div>
                    </div>

                    {/* Quote Text */}
                    <p className="text-sm sm:text-base text-slate-200 leading-relaxed italic">
                      "{item.quote}"
                    </p>
                  </div>

                  {/* Customer Profile Row */}
                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {item.avatar && (
                        <img
                          src={item.avatar}
                          alt={item.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-slate-700 group-hover:border-solar-400 transition-colors shadow-md"
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
