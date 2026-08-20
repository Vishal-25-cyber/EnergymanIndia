import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Home,
  Building2,
  Factory,
  Tractor,
  Wrench,
  BatteryCharging,
  CheckCircle2,
  Sparkles,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { solutionsData } from "../../data/solutions";
import { ScrollReveal } from "./ScrollReveal";

const getIcon = (iconName: string) => {
  switch (iconName) {
    case "Home":
      return <Home className="w-4 h-4 text-red-400" />;
    case "Building2":
      return <Building2 className="w-4 h-4 text-amber-400" />;
    case "Factory":
      return <Factory className="w-4 h-4 text-rose-400" />;
    case "Tractor":
      return <Tractor className="w-4 h-4 text-emerald-400" />;
    case "Wrench":
      return <Wrench className="w-4 h-4 text-amber-500" />;
    case "BatteryCharging":
      return <BatteryCharging className="w-4 h-4 text-red-500" />;
    default:
      return <Sparkles className="w-4 h-4 text-red-400" />;
  }
};

export const SolutionsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartRef = useRef<number | null>(null);

  const maxIndex = solutionsData.length - 1;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

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
      className="section-padding bg-[#0A0A0E] relative overflow-hidden border-t border-red-950/60"
      id="solutions"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="site-container relative z-10">
        <ScrollReveal animation="slide-up">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold tracking-wider uppercase bg-red-950/80 text-rose-300 border border-red-500/40 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-red-400" />
                <span>Tailored Renewable Engineering</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                OUR SOLAR <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">SERVICES</span>
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
                Energyman Power Technologies (India) Pvt. Ltd., since 2016, delivers comprehensive solar EPC solutions from residential rooftops to MW-scale industrial plants and agricultural pumping.
              </p>
            </div>

            {/* Manual Controls */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={prevSlide}
                className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-red-950/60 text-slate-200 hover:text-red-400 transition-colors shadow-md cursor-pointer"
                aria-label="Previous service"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-red-950/60 text-slate-200 hover:text-red-400 transition-colors shadow-md cursor-pointer"
                aria-label="Next service"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Carousel Viewport */}
        <div
          className="overflow-hidden pb-4"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-out -mx-3"
            style={{
              transform: `translateX(-${currentIndex * (100 / (typeof window !== 'undefined' && window.innerWidth >= 1024 ? 3 : typeof window !== 'undefined' && window.innerWidth >= 640 ? 2 : 1))}%)`
            }}
          >
            {solutionsData.map((item) => (
              <div
                key={item.id}
                className="w-full sm:w-1/2 lg:w-1/3 px-3 shrink-0"
              >
                <div className="h-full flex flex-col bg-[#14101A]/95 border border-red-900/30 rounded-3xl overflow-hidden transition-all duration-400 ease-out group hover:border-red-500/50 hover:shadow-2xl hover:shadow-black/70 hover:-translate-y-2 relative shadow-md">
                  {/* Top Accent Line */}
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-500 via-rose-400 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />

                  {/* Card Image */}
                  <div className="relative h-60 sm:h-64 overflow-hidden bg-slate-900">
                    <img
                      src={item.heroImage}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#14101A] via-[#14101A]/30 to-transparent" />

                    {/* Tag Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#0A0A0E]/90 backdrop-blur-md text-slate-100 border border-red-900/40 shadow-md">
                        {getIcon(item.icon)}
                        <span>{item.tag}</span>
                      </span>
                    </div>

                    {/* Subsidy Badge */}
                    {item.subsidyAvailable && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-amber-950/90 text-amber-300 border border-amber-500/40 text-[11px] px-2.5 py-1 rounded-full shadow-md font-bold backdrop-blur-md">
                          Subsidy Available
                        </span>
                      </div>
                    )}

                    {/* ROI & Capacity tags */}
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white">
                      <span className="bg-[#0A0A0E]/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-red-900/40 font-bold shadow-md">
                        ROI: <span className="text-amber-300 font-bold">{item.typicalRoi}</span>
                      </span>
                      <span className="bg-[#0A0A0E]/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-red-900/40 font-bold shadow-md">
                        Capacity: {item.systemSizes.split("(")[0]}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                    <div className="space-y-3">
                      <h3 className="text-xl font-extrabold text-white group-hover:text-red-400 transition-colors line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed font-normal">
                        {item.subtitle}
                      </p>

                      {/* Key Highlights */}
                      <div className="space-y-1.5 pt-2">
                        {item.keyBenefits.slice(0, 3).map((f, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-red-950/60">
                      <Link
                        to={`/solutions/${item.slug}`}
                        className="inline-flex items-center gap-2 text-xs font-bold text-red-400 group-hover:text-red-300 group-hover:gap-3 transition-all"
                      >
                        <span>Explore {item.shortTitle}</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Indicators */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {solutionsData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                index === currentIndex ? "w-8 bg-red-500" : "w-2 bg-slate-700 hover:bg-slate-500"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionsCarousel;
