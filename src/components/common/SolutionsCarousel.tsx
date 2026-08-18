import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Home,
  Building2,
  Factory,
  Tractor,
  Wrench,
  BatteryCharging,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import { solutionsData } from "../../data/solutions";
import { ScrollReveal } from "./ScrollReveal";

const getIcon = (iconName: string) => {
  switch (iconName) {
    case "Home":
      return <Home className="w-5 h-5" />;
    case "Building2":
      return <Building2 className="w-5 h-5" />;
    case "Factory":
      return <Factory className="w-5 h-5" />;
    case "Tractor":
      return <Tractor className="w-5 h-5" />;
    case "Wrench":
      return <Wrench className="w-5 h-5" />;
    case "BatteryCharging":
      return <BatteryCharging className="w-5 h-5" />;
    default:
      return <Sparkles className="w-5 h-5" />;
  }
};

export const SolutionsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartRef = useRef<number | null>(null);

  // Visible cards: Desktop 3, Tablet 2, Mobile 1
  const maxIndex = solutionsData.length - 1;

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
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused, currentIndex]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartRef.current === null) return;
    const diff = touchStartRef.current - e.changedTouches[0].clientX;
    if (diff > 50) nextSlide();
    if (diff < -50) prevSlide();
    touchStartRef.current = null;
  };

  return (
    <section
      className="section-padding bg-brand-950 relative overflow-hidden"
      id="solutions"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-energy-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-solar-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="site-container relative z-10">
        <ScrollReveal animation="slide-up">
          {/* Section Header */}
          <div className="max-w-3xl mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-energy-500/10 text-energy-400 border border-energy-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tailored Renewable Engineering</span>
            </div>
            <h2 className="heading-section">
              OUR <span className="bg-gradient-to-r from-energy-400 to-solar-400 bg-clip-text text-transparent">SERVICES</span>
            </h2>
            <p className="text-subtle">
              Energyman Power Technologies (India) Pvt. Ltd., a decade-strong company, delivers comprehensive solar solutions from residential rooftops to large-scale industrial projects, including expertise in agricultural applications. We are a proud MNRE subsidy partner, committed to uncompromising quality throughout every project stage.
            </p>
          </div>
        </ScrollReveal>

        {/* Connected Energy Circuit Track */}
        <div className="hidden lg:flex items-center justify-between mb-6 px-4">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-energy-400 animate-ping" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-energy-400 font-bold">Grid Solution Stream Active</span>
          </div>
          <div className="flex-1 mx-6 h-px bg-gradient-to-r from-energy-500/40 via-solar-400/30 to-energy-500/40 relative">
            <div className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-energy-400 to-transparent animate-[energyTravelHorizontal_4s_ease-in-out_infinite]" />
          </div>
          <span className="text-[11px] font-mono text-slate-400">01 — 06 Systems</span>
        </div>

        {/* Carousel Viewport */}
        <div
          className="overflow-hidden pb-4"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-out -mx-3"
            style={{
              transform: `translateX(-${currentIndex * (100 / (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1))}%)`
            }}
          >
            {solutionsData.map((item, sIndex) => (
              <div
                key={item.id}
                className="w-full sm:w-1/2 lg:w-1/3 px-3 shrink-0"
              >
                <div className="h-full flex flex-col bg-brand-900/60 backdrop-blur-md border border-slate-800/80 rounded-2xl overflow-hidden transition-all duration-500 ease-out group hover:border-energy-500/50 hover:shadow-2xl hover:shadow-energy-500/[0.12] hover:-translate-y-2 relative">
                  {/* Active top line accent on hover */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-energy-500 via-solar-400 to-energy-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />

                  {/* Card Image Container with Zoom & Shimmer */}
                  <div className="relative h-60 sm:h-64 overflow-hidden bg-brand-950 shimmer-container">
                    <img
                      src={item.heroImage}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.05]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/40 to-transparent" />
                    
                    {/* Tag Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-brand-950/90 backdrop-blur-md text-slate-200 border border-slate-700 shadow-md">
                        {getIcon(item.icon)}
                        <span>{item.tag}</span>
                      </span>
                    </div>

                    {/* Subsidy Badge if available */}
                    {item.subsidyAvailable && (
                      <div className="absolute top-4 right-4">
                        <span className="badge-amber text-[11px] shadow-lg">
                          Subsidy Available
                        </span>
                      </div>
                    )}

                    {/* Typical ROI Tag */}
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-slate-300">
                      <span className="bg-brand-900/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-700 font-semibold shadow-md">
                        ROI: <span className="text-energy-400 font-bold">{item.typicalRoi}</span>
                      </span>
                      <span className="bg-brand-900/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-700 font-semibold text-slate-300 shadow-md">
                        Capacity: {item.systemSizes.split("(")[0]}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-white group-hover:text-energy-400 transition-colors line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 line-clamp-2 leading-relaxed">
                        {item.subtitle}
                      </p>

                      {/* Key highlights list */}
                      <ul className="space-y-2 pt-2 border-t border-slate-800/80">
                        {item.keyBenefits.slice(0, 3).map((benefit, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2 text-xs text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-energy-400 shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Card Footer Link */}
                    <div className="pt-2">
                      <Link
                        to={`/solutions/${item.slug}`}
                        className="inline-flex items-center justify-between w-full px-4 py-3 rounded-xl bg-brand-850/80 hover:bg-energy-500 text-slate-200 hover:text-brand-950 font-bold text-xs sm:text-sm transition-all duration-300 border border-slate-700/80 hover:border-energy-400 group/btn shadow-md"
                      >
                        <span>Explore {item.shortTitle}</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {solutionsData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex ? "w-8 bg-energy-500" : "w-2 bg-slate-700 hover:bg-slate-600"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
