import React, { useState, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Sparkles,
  Search,
  MapPin,
  ArrowRight,
  Filter,
  TrendingUp,
  Trees,
  Zap
} from "lucide-react";
import { SEOHead } from "../components/common/SEOHead";
import { ProjectCard } from "../components/common/ProjectCard";
import { projectsData } from "../data/projects";

export const ProjectsPage: React.FC<{ categoryFilter?: string }> = ({ categoryFilter }) => {
  const [searchParams] = useSearchParams();
  const initialCategory = categoryFilter || searchParams.get("category") || "all";
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);
  const [cardsVisible, setCardsVisible] = useState(true);
  const gridRef = useRef<HTMLDivElement>(null);

  // Intersection observer for card reveal
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set());
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-project-id");
            if (id) setVisibleCards((prev) => new Set(prev).add(id));
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    const cards = gridRef.current?.querySelectorAll("[data-project-id]");
    cards?.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [selectedCategory, searchQuery]);

  const filteredProjects = projectsData.filter((proj) => {
    const matchesCategory = selectedCategory === "all" || proj.category === selectedCategory;
    const matchesSearch =
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.capacity.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "industrial", label: "Industrial Solar" },
    { id: "agricultural", label: "Agricultural Pumps" },
    { id: "commercial", label: "Commercial Solar" },
    { id: "residential", label: "Residential Solar" }
  ];

  return (
    <>
      <SEOHead
        title="Commissioned Solar Projects Portfolio & Case Studies"
        description="Explore 2,500+ commissioned solar projects across spinning mills, hospital campuses, agricultural estates, and residential villas in South India."
      />

      {/* ═══ PREMIUM HERO ═══ */}
      <section className="relative pt-28 sm:pt-36 pb-20 sm:pb-24 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-950 via-brand-900 to-brand-950" />
        <div className="absolute inset-0 bg-grid-pattern opacity-40" />

        {/* Animated Glowing Orbs */}
        <div className="hero-bg-glow w-[500px] h-[500px] bg-energy-500/[0.07] top-[-10%] right-[-5%] animate-glow-pulse" />
        <div className="hero-bg-glow w-[400px] h-[400px] bg-solar-500/[0.05] bottom-[-15%] left-[-8%] animate-glow-pulse" style={{ animationDelay: '2s' }} />

        {/* Thin Horizontal Light Streak */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-energy-500/20 to-transparent" />

        <div className="site-container relative z-10 text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div
            className={`transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase bg-energy-500/10 text-energy-400 border border-energy-500/25 backdrop-blur-sm shadow-lg shadow-energy-500/5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Proven Engineering Track Record</span>
            </div>
          </div>

          {/* Heading */}
          <h1
            className={`heading-hero text-white mt-6 transition-all duration-700 delay-100 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            COMMISSIONED{' '}
            <span className="bg-gradient-to-r from-energy-400 via-solar-400 to-energy-300 bg-clip-text text-transparent">
              SOLAR PROJECTS
            </span>
          </h1>

          {/* Description */}
          <p
            className={`text-subtle max-w-2xl mx-auto mt-5 transition-all duration-700 delay-200 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            Over 35 MW+ of clean solar capacity commissioned across Tamil Nadu, Karnataka, and Kerala. Real clients, verified capacities, and documented return-on-investment metrics.
          </p>
        </div>

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-brand-950 to-transparent" />
      </section>

      {/* ═══ PREMIUM FILTER & SEARCH BAR ═══ */}
      <section
        className={`py-5 bg-brand-950/95 border-b border-slate-800/50 sticky top-[68px] z-30 backdrop-blur-xl transition-all duration-700 delay-300 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      >
        <div className="site-container flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Filter Pills — Premium Segmented Control */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto bg-brand-900/60 p-1.5 rounded-2xl border border-slate-800/60">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`relative px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-350 focus:outline-none focus:ring-2 focus:ring-energy-500/50 ${
                  selectedCategory === cat.id
                    ? "bg-gradient-to-r from-energy-600 to-energy-500 text-white font-bold shadow-lg shadow-energy-500/25"
                    : "text-slate-400 hover:text-slate-200 hover:bg-brand-850/60"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box — Premium */}
          <div className={`relative w-full md:w-80 transition-all duration-300 ${isSearchFocused ? 'md:w-96' : ''}`}>
            <Search className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-300 ${isSearchFocused ? 'text-energy-400' : 'text-slate-500'}`} />
            <input
              type="text"
              placeholder="Search by city, capacity, client..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-brand-900/80 border text-sm text-slate-200 placeholder-slate-500 transition-all duration-300 focus:outline-none ${
                isSearchFocused
                  ? 'border-energy-500/50 ring-2 ring-energy-500/15 shadow-lg shadow-energy-500/5 bg-brand-900'
                  : 'border-slate-800/60 hover:border-slate-700'
              }`}
            />
          </div>
        </div>
      </section>

      {/* ═══ PROJECTS GRID WITH SCROLL REVEAL ═══ */}
      <section className="section-padding bg-brand-950 relative">
        {/* Subtle side glow */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-energy-500/[0.03] rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-solar-500/[0.03] rounded-full blur-[100px] pointer-events-none" />

        <div className="site-container relative z-10" ref={gridRef}>
          {/* Connected Portfolio Header Line */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800/80">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-energy-400 animate-ping" />
              <span className="text-xs font-mono uppercase tracking-widest text-slate-300 font-bold">
                Showing {filteredProjects.length} Verified Commissioned Sites
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 font-mono">
              <span className="text-energy-400">⚡ 100% Turnkey Delivery</span>
              <span>•</span>
              <span className="text-solar-400">Tier-1 Hardware</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProjects.map((proj, index) => (
              <div
                key={proj.id}
                data-project-id={proj.id}
                className={`transition-all duration-700 ${
                  visibleCards.has(proj.id) || cardsVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: `${Math.min(index * 100, 400)}ms`
                }}
              >
                <ProjectCard project={proj} />
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20 bg-brand-900/30 rounded-3xl border border-slate-800/60 text-slate-400 space-y-5">
              <div className="w-16 h-16 rounded-2xl bg-brand-850/60 border border-slate-700/60 flex items-center justify-center mx-auto">
                <Search className="w-7 h-7 text-slate-500" />
              </div>
              <p className="text-base">No projects match your current filter parameters.</p>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
                className="btn-secondary py-2.5 px-6 text-xs font-semibold"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};
