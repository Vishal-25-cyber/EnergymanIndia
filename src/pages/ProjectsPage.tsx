import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Sparkles,
  Search,
} from "lucide-react";
import { SEOHead } from "../components/common/SEOHead";
import { ProjectCard } from "../components/common/ProjectCard";
import { projectsData } from "../data/projects";

export const ProjectsPage: React.FC<{ categoryFilter?: string }> = ({ categoryFilter }) => {
  const [searchParams] = useSearchParams();
  const initialCategory = categoryFilter || searchParams.get("category") || "all";
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>("");

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
    <div className="bg-[#0A0A0E] text-slate-100 min-h-screen">
      <SEOHead
        title="Commissioned Solar Projects Portfolio & Case Studies"
        description="Explore 2,500+ commissioned solar projects across spinning mills, hospital campuses, agricultural estates, and residential villas in South India."
      />

      {/* ═══ HERO ═══ */}
      <section className="relative pt-32 pb-16 overflow-hidden bg-[#0A0A0E] border-b border-red-950/60">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="site-container relative z-10 text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-extrabold tracking-widest uppercase bg-red-950/80 text-rose-300 border border-red-500/40 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-red-400" />
            <span>Proven Engineering Track Record Since 2016</span>
          </div>

          <h1 className="heading-hero text-white mt-4">
            COMMISSIONED{' '}
            <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">
              SOLAR PROJECTS
            </span>
          </h1>

          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base">
            Over 35 MW+ of clean solar capacity commissioned across Tamil Nadu, Karnataka, and Kerala. Real clients, verified capacities, and documented return-on-investment metrics.
          </p>
        </div>
      </section>

      {/* ═══ FILTER & SEARCH BAR ═══ */}
      <section className="py-4 bg-[#14101A]/95 border-b border-red-950/60 sticky top-[60px] md:top-[92px] z-30 backdrop-blur-xl shadow-lg">
        <div className="site-container flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto bg-slate-900 p-1.5 rounded-2xl border border-red-950/60">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`relative px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-red-600 text-white shadow-md"
                    : "text-slate-300 hover:text-red-400 hover:bg-slate-800"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by client, location, MW..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-red-950/60 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 shadow-xs"
            />
          </div>
        </div>
      </section>

      {/* ═══ PROJECTS GRID ═══ */}
      <section className="section-padding bg-[#0A0A0E]">
        <div className="site-container">
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-[#14101A]/95 rounded-3xl border border-red-950/60 space-y-4">
              <h3 className="text-xl font-bold text-white">No projects found</h3>
              <p className="text-slate-400 text-xs sm:text-sm">
                Try adjusting your search keywords or filter category.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
                className="btn-primary px-4 py-2 text-xs font-bold"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;
