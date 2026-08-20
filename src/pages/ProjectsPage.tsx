import React from "react";
import {
  MapPin,
  Zap,
  Leaf,
  IndianRupee,
  ChevronRight,
} from "lucide-react";
import { SEOHead } from "../components/common/SEOHead";
import { projectsData } from "../data/projects";

const categoryColors: Record<string, string> = {
  industrial: "text-amber-400 border-amber-500/50 bg-amber-500/10",
  agricultural: "text-emerald-400 border-emerald-500/50 bg-emerald-500/10",
  commercial: "text-blue-400 border-blue-500/50 bg-blue-500/10",
  residential: "text-rose-400 border-rose-500/50 bg-rose-500/10",
};

export const ProjectsPage: React.FC<{ categoryFilter?: string }> = ({ categoryFilter }) => {
  const pageMeta =
    categoryFilter === "industrial"
      ? {
          title: "Our Industrial Solar Projects",
          subtitle: "Textile mills & captive MW rooftop systems",
        }
      : categoryFilter === "commercial"
        ? {
            title: "Our Commercial Solar Projects",
            subtitle: "Export units & commercial rooftops",
          }
        : {
            title: "Our Solar Projects",
            subtitle: "Real clients. Verified capacities. Documented return-on-investment metrics across Tamil Nadu, Karnataka, and Kerala.",
          };

  const filteredProjects = projectsData.filter((proj) => {
    return !categoryFilter || categoryFilter === "all" || proj.category === categoryFilter;
  });

  return (
    <div className="bg-[#0A0A0E] text-slate-100 min-h-screen">
      <SEOHead
        title="Commissioned Solar Projects Portfolio & Case Studies"
        description="Explore verified industrial and commercial solar projects across Coimbatore and Tirupur, Tamil Nadu."
      />

      {/* ═══ HERO ═══ */}
      <section className="pt-28 pb-10 text-center border-b border-red-950/40 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="site-container relative z-10 space-y-3">
          <h1 className="text-[1.75rem] sm:text-[2.4rem] lg:text-[3.8rem] font-black tracking-[-0.06em] leading-[0.92] uppercase text-transparent bg-gradient-to-r from-red-500 via-orange-400 to-amber-300 bg-clip-text">
            {pageMeta.title}
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            {pageMeta.subtitle}
          </p>
        </div>
      </section>

      {/* ═══ ZIGZAG PROJECT LIST ═══ */}
      <section className="site-container py-10 space-y-10 relative">
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-red-600/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        {filteredProjects.length === 0 ? (
          <div className="py-24 text-center text-slate-500">
            <Zap className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="text-lg font-semibold">No projects found in this category.</p>
          </div>
        ) : (
          filteredProjects.map((project, index) => {
            const isEven = index % 2 === 0;
            const catColor = categoryColors[project.category] ?? "text-slate-400 border-slate-600/40 bg-slate-700/10";

            return (
              <div
                key={project.id}
                className={`relative flex flex-col lg:flex-row items-center gap-10 lg:gap-14 py-10 ${!isEven ? "lg:flex-row-reverse" : ""
                  }`}
              >
                {/* Thin horizontal rule above (except first) */}
                {index > 0 && (
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-950/60 to-transparent" />
                )}

                {/* ── IMAGE (with space around it) ── */}
                <div className="w-full lg:w-[46%] relative group">

                  {/* Image container with padding + border */}
                  <div className="relative rounded-2xl overflow-hidden border border-white/8 shadow-xl shadow-black/50 z-10">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-[260px] lg:h-[340px] object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    {/* Subtle dark overlay at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/60 to-transparent" />
                    {/* Capacity badge */}
                    <span className="absolute bottom-4 left-4 px-3 py-1 bg-red-600 text-white text-xs font-black rounded-lg shadow-lg z-10">
                      {project.capacity}
                    </span>
                    {/* Project number badge */}
                    <span className="absolute top-4 left-4 px-2.5 py-1 bg-black/60 backdrop-blur-sm text-[10px] font-mono font-bold text-red-400 rounded-md z-10">
                      {project.projectNumber}
                    </span>
                  </div>
                </div>

                {/* ── CONTENT ── */}
                <div className="w-full lg:w-[54%] space-y-4 relative z-10">

                  {/* Category pill */}
                  <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${catColor}`}>
                    {project.categoryLabel}
                  </span>

                  {/* Title with red left accent */}
                  <div className={`border-l-4 border-red-600 pl-4`}>
                    <h2 className="text-2xl lg:text-[1.6rem] font-black text-white leading-tight">
                      {project.title}
                    </h2>
                  </div>

                  {/* Client + Location */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                    <span className="text-sm font-bold text-red-400">{project.clientName}</span>
                    <span className="flex items-center gap-1 text-xs text-slate-500">
                      <MapPin className="w-3 h-3" />
                      {project.location}, {project.state}
                    </span>
                  </div>

                  {/* Stats — inline */}
                  <div className="flex flex-wrap gap-6 py-4 border-y border-red-950/40">
                    <div>
                      <div className="flex items-center gap-1 mb-0.5">
                        <Zap className="w-3 h-3 text-amber-400" />
                        <span className="text-[9px] font-bold uppercase tracking-widest text-slate-600">Generation</span>
                      </div>
                      <p className="text-sm font-black text-white">{project.annualGeneration}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 mb-0.5">
                        <IndianRupee className="w-3 h-3 text-emerald-400" />
                        <span className="text-[9px] font-bold uppercase tracking-widest text-slate-600">Annual Saving</span>
                      </div>
                      <p className="text-sm font-black text-white">{project.annualSavings}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 mb-0.5">
                        <Leaf className="w-3 h-3 text-green-400" />
                        <span className="text-[9px] font-bold uppercase tracking-widest text-slate-600">CO₂ Offset</span>
                      </div>
                      <p className="text-sm font-black text-white">{project.co2Offset}</p>
                    </div>
                  </div>

                  {/* Solution */}
                  <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">
                    {project.solution}
                  </p>

                  {/* CTA */}
                  <a
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-sm font-bold transition-all shadow-lg shadow-red-900/30 group/btn"
                  >
                    View Full Case Study
                    <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </a>
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
