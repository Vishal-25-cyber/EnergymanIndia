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
    image: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1600&q=80",
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
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80",
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
    image: "https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=1600&q=80",
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
    image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1600&q=80",
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
  const [cinematicStage, setCinematicStage] = useState(0);
  const slideInterval = useRef<any>(null);
  const progressInterval = useRef<any>(null);

  const SLIDE_DURATION = 6000; // 6 seconds per slide

  // Instantaneous mount & Parallel Image Preload
  useEffect(() => {
    setCinematicStage(10);
    // Preload all slide images into browser cache immediately
    slides.forEach((s) => {
      const img = new Image();
      img.src = s.image;
    });
  }, []);

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
      className="relative w-full min-h-[720px] lg:min-h-[860px] flex items-center justify-center overflow-hidden bg-brand-950 select-none pt-24 sm:pt-28 pb-16"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Renewable Energy Hero Showcase"
    >
      {/* ── STEP 1 & 2: Warm Sunlight Radial Glow & Deep Navy Ambient Core ── */}
      <div
        className={`absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none transition-all duration-1000 ${
          cinematicStage >= 2 ? "opacity-40 scale-100" : "opacity-0 scale-75"
        }`}
        style={{
          background: "radial-gradient(circle, rgba(245, 158, 11, 0.25) 0%, rgba(16, 185, 129, 0.15) 45%, transparent 70%)",
          filter: "blur(70px)"
        }}
      />
      <div
        className={`absolute top-10 right-10 w-[500px] h-[500px] rounded-full pointer-events-none transition-all duration-1000 delay-300 ${
          cinematicStage >= 1 ? "opacity-30 scale-100" : "opacity-0 scale-50"
        }`}
        style={{
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 60%)",
          filter: "blur(90px)"
        }}
      />

      {/* ── STEP 3: Technical Engineering Grid Overlay ── */}
      <div
        className={`absolute inset-0 bg-tech-grid transition-opacity duration-1000 pointer-events-none z-10 ${
          cinematicStage >= 3 ? "opacity-70" : "opacity-0"
        }`}
      />

      {/* ── STEP 4: Solar Imagery Reveal with Smooth Mask & Camera Pan/Zoom ── */}
      {slides.map((s, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              isActive ? "opacity-100 z-0" : "opacity-0 -z-10"
            }`}
          >
            <img
              src={s.image}
              alt={s.headingHighlight}
              className={`w-full h-full object-cover object-center transform transition-all duration-[6000ms] ease-out will-change-transform ${
                cinematicStage >= 4 && isActive ? "scale-105 translate-x-0" : "scale-110 translate-x-2"
              }`}
              loading="eager"
              decoding="async"
              fetchPriority={index === 0 ? "high" : "low"}
            />
            {/* Cinematic Multi-Layer Gradients for Premium Contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-950/85 to-brand-950/45" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/40 to-brand-950/70" />
            <div className="absolute inset-0 bg-brand-950/20 backdrop-brightness-90" />
          </div>
        );
      })}

      {/* ── STEP 5 & 6: Cinematic SVG Energy Lines Traveling Across/Toward Content ── */}
      <div
        className={`absolute inset-0 z-10 pointer-events-none transition-opacity duration-1000 ${
          cinematicStage >= 5 ? "opacity-100" : "opacity-0"
        }`}
      >
        <svg className="w-full h-full" viewBox="0 0 1440 900" fill="none" preserveAspectRatio="none">
          {/* Upper flowing energy conduit */}
          <path
            d="M -100,220 Q 350,180 700,240 T 1540,200"
            stroke="url(#hero-energy-gradient)"
            strokeWidth="1.5"
            strokeDasharray="10 20"
            className="energy-conduit-line opacity-40"
          />
          {/* Lower diagonal solar path */}
          <path
            d="M 100,750 Q 500,680 950,720 T 1600,650"
            stroke="url(#hero-solar-gradient)"
            strokeWidth="1.5"
            strokeDasharray="8 16"
            className="energy-conduit-line opacity-30"
          />
          <defs>
            <linearGradient id="hero-energy-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#34D399" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="hero-solar-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#FCD34D" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* ── STEP 7, 8, 9, 10: Staggered Hero Content Presentation ── */}
      <div className="site-container relative z-20 w-full py-8">
        <div key={currentSlide} className="max-w-3xl space-y-6">
          {/* STEP 7: Badge & EnergyMan Branding Indicator */}
          <div
            className={`transition-all duration-700 ${
              cinematicStage >= 7 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide bg-brand-900/90 border border-slate-700 shadow-xl backdrop-blur-md">
              {slide.badgeType === "emerald" && <Zap className="w-4 h-4 text-energy-400 fill-energy-400 animate-pulse" />}
              {slide.badgeType === "amber" && <Sparkles className="w-4 h-4 text-solar-400" />}
              {slide.badgeType === "blue" && <ShieldCheck className="w-4 h-4 text-blue-400" />}
              {slide.badgeType === "purple" && <Zap className="w-4 h-4 text-purple-400" />}
              <span className="text-slate-200">{slide.badge}</span>
            </div>
          </div>

          {/* STEP 8: Confident Heading Reveal */}
          <div
            className={`space-y-1 sm:space-y-2 transition-all duration-700 delay-100 ${
              cinematicStage >= 8 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
              <span>{slide.heading}</span>
              <br />
              <span className="bg-gradient-to-r from-energy-400 via-solar-400 to-energy-300 bg-clip-text text-transparent">
                {slide.headingHighlight}
              </span>
            </h1>
          </div>

          {/* STEP 9: Description Reveal */}
          <p
            className={`text-slate-300 text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-2xl transition-all duration-700 delay-200 ${
              cinematicStage >= 9 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {slide.description}
          </p>

          {/* STEP 10: Call-To-Action Buttons & Interactive Elements */}
          <div
            className={`flex flex-wrap items-center gap-4 pt-2 transition-all duration-700 delay-300 ${
              cinematicStage >= 10 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Link
              to={slide.primaryBtnLink}
              className="btn-primary py-3.5 px-7 font-bold text-sm sm:text-base group shimmer-container"
            >
              <span>{slide.primaryBtnText}</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1.5" />
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

          {/* Metric Highlight Card on Desktop */}
          {slide.statBadge && (
            <div
              className={`hidden sm:inline-flex items-center gap-4 px-4 py-3 rounded-2xl bg-brand-900/80 border border-slate-700/80 backdrop-blur-md shadow-2xl transition-all duration-700 delay-400 ${
                cinematicStage >= 10 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
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
