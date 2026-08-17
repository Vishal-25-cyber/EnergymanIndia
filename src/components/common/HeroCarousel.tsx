import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  Zap,
  Sparkles,
  Calculator
} from "lucide-react";

interface HeroSlide {
  id: number;
  badge: string;
  badgeType: "emerald" | "amber" | "blue" | "purple";
  heading: string;
  headingHighlight: string;
  description: string;
  primaryBtnText: string;
  primaryBtnLink: string;
  secondaryBtnText?: string;
  secondaryBtnLink?: string;
  image: string;
  statBadge?: {
    value: string;
    label: string;
  };
}

const slides: HeroSlide[] = [
  {
    id: 1,
    badge: "MNRE Subsidy Partner & ISO Certified EPC",
    badgeType: "emerald",
    heading: "POWERING INDIA'S",
    headingHighlight: "CLEAN ENERGY FUTURE",
    description: "Smart renewable-energy solutions engineered for homes, businesses, agriculture and industry. Slashing power bills with Tier-1 technology and 25-year performance warranties.",
    primaryBtnText: "Get Your Solar Plan",
    primaryBtnLink: "/get-a-quote",
    secondaryBtnText: "Explore Solutions",
    secondaryBtnLink: "/solutions",
    image: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1920&q=85",
    statBadge: {
      value: "35 MW+",
      label: "Installed Capacity"
    }
  },
  {
    id: 2,
    badge: "PM Surya Ghar: Muft Bijli Yojana Partner",
    badgeType: "amber",
    heading: "TURN SUNLIGHT INTO",
    headingHighlight: "LONG-TERM SAVINGS",
    description: "Avail up to ₹78,000 direct central government subsidy and eliminate up to 90% of your residential monthly electricity costs.",
    primaryBtnText: "Calculate Your Savings",
    primaryBtnLink: "/#calculator",
    secondaryBtnText: "Government Subsidy Guide",
    secondaryBtnLink: "/government-subsidy",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1920&q=85",
    statBadge: {
      value: "₹78,000",
      label: "Max Subsidy Support"
    }
  },
  {
    id: 3,
    badge: "Commercial Rooftop EPC & 40% Tax Depreciation",
    badgeType: "blue",
    heading: "SMART ENERGY FOR",
    headingHighlight: "MODERN BUSINESS",
    description: "Reduce commercial operating overheads, hedge against rising power tariffs, and meet ESG sustainability goals with high-yield solar systems.",
    primaryBtnText: "Explore Commercial Solar",
    primaryBtnLink: "/solutions/commercial",
    secondaryBtnText: "View Case Studies",
    secondaryBtnLink: "/projects/commercial",
    image: "https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=1920&q=85",
    statBadge: {
      value: "< 3.5 Yrs",
      label: "Typical ROI Payback"
    }
  },
  {
    id: 4,
    badge: "Heavy-Duty MW-Scale Industrial Solutions",
    badgeType: "purple",
    heading: "ENGINEERED FOR",
    headingHighlight: "HEAVY INDUSTRY",
    description: "High-performance solar solutions for large-scale energy requirements. Seamless integration with HT substations and diesel generators.",
    primaryBtnText: "Explore Industrial Solar",
    primaryBtnLink: "/solutions/industrial",
    secondaryBtnText: "Industrial Portfolio",
    secondaryBtnLink: "/projects/industrial",
    image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1920&q=85",
    statBadge: {
      value: "2,500+",
      label: "Commissioned Projects"
    }
  }
];

export const HeroCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const slideInterval = useRef<any>(null);
  const progressInterval = useRef<any>(null);

  const SLIDE_DURATION = 5500; // 5.5 seconds per slide

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setProgress(0);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0);
  };

  // Keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Auto-play timer and progress tracking
  useEffect(() => {
    if (isPaused) {
      if (slideInterval.current) clearInterval(slideInterval.current);
      if (progressInterval.current) clearInterval(progressInterval.current);
      return;
    }

    const startTime = Date.now();
    progressInterval.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      setProgress(Math.min((elapsed / SLIDE_DURATION) * 100, 100));
    }, 50);

    slideInterval.current = setInterval(() => {
      nextSlide();
    }, SLIDE_DURATION);

    return () => {
      if (slideInterval.current) clearInterval(slideInterval.current);
      if (progressInterval.current) clearInterval(progressInterval.current);
    };
  }, [currentSlide, isPaused]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (diff > 50) nextSlide();
    if (diff < -50) prevSlide();
    setTouchStart(null);
  };

  const slide = slides[currentSlide];

  return (
    <section
      className="relative w-full min-h-[680px] lg:min-h-[800px] flex items-center justify-center overflow-hidden bg-brand-950 select-none pt-24 sm:pt-28 pb-16"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Renewable Energy Hero Showcase"
    >
      {/* Background Images with Crossfade & Slow Zoom */}
      {slides.map((s, index) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100 z-0" : "opacity-0 -z-10"
          }`}
        >
          <img
            src={s.image}
            alt={s.headingHighlight}
            className={`w-full h-full object-cover object-center transform transition-transform duration-7000 ease-out ${
              index === currentSlide ? "scale-105" : "scale-100"
            }`}
            loading={index === 0 ? "eager" : "lazy"}
          />
          {/* Layered cinematic dark gradient overlay for optimal readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-950/85 to-brand-950/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-transparent to-brand-950/60" />
          <div className="absolute inset-0 bg-brand-950/30 backdrop-brightness-75" />
        </div>
      ))}

      {/* Main Hero Content */}
      <div className="site-container relative z-10 w-full py-8">
        <div className="max-w-3xl space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide bg-brand-900/90 border border-slate-700 shadow-xl backdrop-blur-md animate-fade-in">
            {slide.badgeType === "emerald" && <Zap className="w-4 h-4 text-energy-400 fill-energy-400" />}
            {slide.badgeType === "amber" && <Sparkles className="w-4 h-4 text-solar-400" />}
            {slide.badgeType === "blue" && <ShieldCheck className="w-4 h-4 text-blue-400" />}
            {slide.badgeType === "purple" && <Zap className="w-4 h-4 text-purple-400" />}
            <span className="text-slate-200">{slide.badge}</span>
          </div>

          {/* Large Confident Heading */}
          <div className="space-y-1 sm:space-y-2">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
              <span>{slide.heading}</span>
              <br />
              <span className="bg-gradient-to-r from-energy-400 via-solar-400 to-energy-300 bg-clip-text text-transparent">
                {slide.headingHighlight}
              </span>
            </h1>
          </div>

          {/* Description */}
          <p className="text-slate-300 text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-2xl">
            {slide.description}
          </p>

          {/* Call-To-Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              to={slide.primaryBtnLink}
              className="btn-primary py-3.5 px-7 font-bold text-sm sm:text-base group"
            >
              <span>{slide.primaryBtnText}</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>

            {slide.secondaryBtnText && slide.secondaryBtnLink && (
              <Link
                to={slide.secondaryBtnLink}
                className="btn-secondary py-3.5 px-6 font-semibold text-sm sm:text-base"
              >
                <span>{slide.secondaryBtnText}</span>
              </Link>
            )}

            {currentSlide === 0 && (
              <a
                href="#calculator"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-solar-400 hover:text-solar-300 px-4 py-3 rounded-xl bg-solar-500/10 border border-solar-500/30 transition-all hover:bg-solar-500/20"
              >
                <Calculator className="w-4 h-4" />
                <span>Savings Calculator</span>
              </a>
            )}
          </div>

          {/* Optional Metric Highlight Card on Desktop */}
          {slide.statBadge && (
            <div className="hidden sm:inline-flex items-center gap-4 px-4 py-3 rounded-2xl bg-brand-900/80 border border-slate-700/80 backdrop-blur-md shadow-2xl">
              <div className="text-2xl font-extrabold text-white tracking-tight bg-gradient-to-r from-energy-400 to-solar-400 bg-clip-text text-transparent">
                {slide.statBadge.value}
              </div>
              <div className="h-6 w-px bg-slate-700" />
              <div className="text-xs text-slate-300 font-medium">
                {slide.statBadge.label}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Manual Arrow Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-brand-900/80 hover:bg-brand-850 border border-slate-700/80 text-white flex items-center justify-center backdrop-blur-md shadow-xl transition-all hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-energy-500 hidden sm:flex"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-brand-900/80 hover:bg-brand-850 border border-slate-700/80 text-white flex items-center justify-center backdrop-blur-md shadow-xl transition-all hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-energy-500 hidden sm:flex"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Bottom Bar: Progress Indicator & Slide Indicators */}
      <div className="absolute bottom-6 left-0 right-0 z-20">
        <div className="site-container flex items-center justify-between">
          {/* Pagination Indicators with Progress Bar */}
          <div className="flex items-center gap-2">
            {slides.map((s, index) => (
              <button
                key={s.id}
                onClick={() => {
                  setCurrentSlide(index);
                  setProgress(0);
                }}
                className={`relative h-2 rounded-full transition-all duration-300 overflow-hidden focus:outline-none ${
                  index === currentSlide ? "w-10 sm:w-14 bg-slate-800" : "w-3 bg-slate-700/80 hover:bg-slate-600"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              >
                {index === currentSlide && (
                  <div
                    className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-energy-500 to-solar-400 rounded-full transition-all duration-75"
                    style={{ width: `${progress}%` }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Slide Number Counter */}
          <div className="text-xs font-mono text-slate-400 bg-brand-900/80 px-3 py-1 rounded-full border border-slate-800">
            <span className="text-white font-bold">0{currentSlide + 1}</span> / 0{slides.length}
          </div>
        </div>
      </div>
    </section>
  );
};
