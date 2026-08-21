"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  MapPin,
  Leaf,
  IndianRupee,
  ChevronRight,
  Sun,
  Factory,
  Building2,
  Layers,
  ArrowRight
} from "lucide-react";
import { SEOHead } from "../components/common/SEOHead";
import { projectsData } from "../data/projects";

const categoryColors: Record<string, string> = {
  industrial: "text-red-400 border-red-500/40 bg-red-950/60",
  commercial: "text-amber-400 border-amber-500/40 bg-amber-950/60",
  residential: "text-rose-400 border-rose-500/40 bg-rose-950/60",
  agricultural: "text-emerald-400 border-emerald-500/40 bg-emerald-950/60",
};

export const ProjectsPage: React.FC<{ categoryFilter?: string }> = ({ categoryFilter = "all" }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialCategory = searchParams?.get("category") || categoryFilter || "all";
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);

  useEffect(() => {
    if (categoryFilter && categoryFilter !== "all") {
      setActiveCategory(categoryFilter);
    } else if (searchParams?.get("category")) {
      setActiveCategory(searchParams.get("category")!);
    } else {
      setActiveCategory("all");
    }
  }, [categoryFilter, searchParams]);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    if (cat === "all") {
      router.replace("/projects", { scroll: false });
    } else {
      router.replace(`/projects?category=${cat}`, { scroll: false });
    }
  };

  const pageMeta =
    activeCategory === "industrial"
      ? {
          badge: "Industrial Solar Portfolio",
          titleWhite: "OUR INDUSTRIAL",
          titleGradient: "SOLAR PROJECTS",
          subtitle: "Textile mills, spinning units & high-demand captive MW rooftop solar arrays across Tamil Nadu.",
        }
      : activeCategory === "commercial"
        ? {
            badge: "Commercial Solar Portfolio",
            titleWhite: "OUR COMMERCIAL",
            titleGradient: "SOLAR PROJECTS",
            subtitle: "Garment export factories, corporate campuses & commercial establishments cutting high LT/HT grid bills.",
          }
        : {
            badge: "Commissioned EPC Portfolio",
            titleWhite: "OUR COMMISSIONED",
            titleGradient: "SOLAR PROJECTS",
            subtitle: "Real clients. Verified capacities. Documented return-on-investment metrics across Tamil Nadu, Karnataka, and Kerala.",
          };

  const filteredProjects = projectsData.filter((proj) => {
    return activeCategory === "all" || proj.category === activeCategory;
  });

  const industrialCount = projectsData.filter((p) => p.category === "industrial").length;
  const commercialCount = projectsData.filter((p) => p.category === "commercial").length;

  return (
    <div className="bg-[#0A0A0E] text-slate-100 min-h-screen">
      <SEOHead
        title="Commissioned Solar Projects Portfolio & Case Studies | ENERGYMAN"
        description="Explore verified industrial and commercial solar installations across Coimbatore, Tirupur, and South India. Turnkey engineering case studies."
      />

      {/* ── Breadcrumb Bar ── */}
      <section className="pt-28 pb-4 bg-[#0A0A0E] border-b border-red-950/60">
        <div className="site-container flex items-center gap-2 text-xs text-slate-400 font-mono">
          <Link href="/" className="hover:text-red-400 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="text-white font-bold">Projects</span>
          {activeCategory !== "all" && (
            <>
              <ChevronRight className="w-3 h-3 text-slate-600" />
              <span className="text-red-400 capitalize">{activeCategory} Solar</span>
            </>
          )}
        </div>
      </section>

      {/* ═══ HERO ═══ */}
      <section className="pt-10 pb-10 text-center border-b border-red-950/40 relative overflow-hidden bg-[#0A0A0E]">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="site-container relative z-10 space-y-4 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-red-950/80 text-rose-300 border border-red-500/40">
            <Sun className="w-3.5 h-3.5 text-amber-400" />
            <span>{pageMeta.badge}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase leading-[1.1]">
            <span className="text-white">{pageMeta.titleWhite} </span>
            <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">{pageMeta.titleGradient}</span>
          </h1>

          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            {pageMeta.subtitle}
          </p>
        </div>
      </section>

      {/* ═══ PROJECT LIST (CARDLESS EDITORIAL SHOWCASE) ═══ */}
      <section className="site-container py-12 space-y-12 relative">
        {filteredProjects.length === 0 ? (
          <div className="py-24 text-center text-slate-500 space-y-4">
            <Sun className="w-12 h-12 mx-auto text-amber-500/40" />
            <p className="text-lg font-bold text-slate-300">No projects found in this category.</p>
            <button
              onClick={() => handleCategoryChange("all")}
              className="btn-primary py-2 px-5 text-xs font-bold font-mono"
            >
              View All Projects
            </button>
          </div>
        ) : (
          filteredProjects.map((project, index) => {
            const isEven = index % 2 === 0;
            const catColor = categoryColors[project.category] ?? "text-slate-400 border-slate-600/40 bg-slate-700/10";

            return (
              <div
                key={project.id}
                className={`relative flex flex-col lg:flex-row items-center gap-10 lg:gap-14 py-10 ${
                  !isEven ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Thin horizontal divider above (except first) */}
                {index > 0 && (
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-950/60 to-transparent" />
                )}

                {/* ── IMAGE FRAME (Professional Standardized Dimensions) ── */}
                <div className="w-full lg:w-[46%] relative group">
                  <div className="relative rounded-2xl overflow-hidden border border-red-950/60 shadow-2xl shadow-black/80 z-10 bg-slate-950">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-[260px] sm:h-[300px] lg:h-[340px] object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0A0A0E] to-transparent" />
                    
                    {/* Capacity badge */}
                    <span className="absolute bottom-4 left-4 px-3.5 py-1 bg-red-600 text-white text-xs font-mono font-black rounded-lg shadow-lg z-10">
                      {project.capacity}
                    </span>
                    
                    {/* Project number badge */}
                    <span className="absolute top-4 left-4 px-2.5 py-1 bg-black/80 backdrop-blur-sm text-[10px] font-mono font-bold text-amber-400 rounded-md border border-red-950/60 z-10">
                      {project.projectNumber}
                    </span>
                  </div>
                </div>

                {/* ── CONTENT (Cardless Editorial Breakdown) ── */}
                <div className="w-full lg:w-[54%] space-y-4 relative z-10">
                  {/* Category Pill */}
                  <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest border ${catColor}`}>
                    {project.categoryLabel}
                  </span>

                  {/* Project Title with Red Accent Line */}
                  <div className="border-l-4 border-red-600 pl-4">
                    <h2 className="text-2xl lg:text-[1.65rem] font-black text-white leading-tight tracking-tight">
                      {project.title}
                    </h2>
                  </div>

                  {/* Client & Location */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm">
                    <span className="font-bold text-amber-400 font-mono">{project.clientName}</span>
                    <span className="flex items-center gap-1 text-slate-400">
                      <MapPin className="w-3.5 h-3.5 text-red-500" />
                      <span>{project.location}, {project.state}</span>
                    </span>
                  </div>

                  {/* Key Stats Bar */}
                  <div className="grid grid-cols-3 gap-3 py-3.5 border-y border-red-950/50">
                    <div>
                      <div className="flex items-center gap-1 mb-0.5">
                        <Sun className="w-3.5 h-3.5 text-amber-400" />
                        <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-500">Generation</span>
                      </div>
                      <p className="text-xs sm:text-sm font-black text-white font-mono">{project.annualGeneration}</p>
                    </div>

                    <div>
                      <div className="flex items-center gap-1 mb-0.5">
                        <IndianRupee className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-500">Annual Saving</span>
                      </div>
                      <p className="text-xs sm:text-sm font-black text-emerald-400 font-mono">{project.annualSavings}</p>
                    </div>

                    <div>
                      <div className="flex items-center gap-1 mb-0.5">
                        <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-500">CO₂ Offset</span>
                      </div>
                      <p className="text-xs sm:text-sm font-black text-white font-mono">{project.co2Offset}</p>
                    </div>
                  </div>

                  {/* Solution Summary */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {project.solution}
                  </p>

                  {/* View Full Case Study Button */}
                  <div className="pt-2">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl btn-primary text-xs sm:text-sm font-bold transition-all shadow-lg shadow-red-900/30 group/btn"
                    >
                      <span>View Full Case Study</span>
                      <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </section>
    </div>
  );
};

export default ProjectsPage;
