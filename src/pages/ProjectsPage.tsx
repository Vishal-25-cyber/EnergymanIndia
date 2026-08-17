import React, { useState } from "react";
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

  const filteredProjects = projectsData.filter((proj) => {
    const matchesCategory = selectedCategory === "all" || proj.category === selectedCategory;
    const matchesSearch =
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.capacity.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <SEOHead
        title="Commissioned Solar Projects Portfolio & Case Studies"
        description="Explore 2,500+ commissioned solar projects across spinning mills, hospital campuses, agricultural estates, and residential villas in South India."
      />

      {/* Hero Header */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-brand-950 via-brand-900/60 to-brand-950 border-b border-slate-800">
        <div className="site-container text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-energy-500/10 text-energy-400 border border-energy-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Proven Engineering Track Record</span>
          </div>
          <h1 className="heading-hero text-white">
            COMMISSIONED <span className="bg-gradient-to-r from-energy-400 to-solar-400 bg-clip-text text-transparent">SOLAR PROJECTS</span>
          </h1>
          <p className="text-subtle">
            Over 35 MW+ of clean solar capacity commissioned across Tamil Nadu, Karnataka, and Kerala. Real clients, verified capacities, and documented return-on-investment metrics.
          </p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="py-8 bg-brand-950/90 border-b border-slate-800/80 sticky top-[68px] z-30 backdrop-blur-md">
        <div className="site-container flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {[
              { id: "all", label: "All Projects" },
              { id: "industrial", label: "Industrial Solar" },
              { id: "agricultural", label: "Agricultural Pumps" },
              { id: "commercial", label: "Commercial Solar" },
              { id: "residential", label: "Residential Solar" }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? "bg-energy-500 text-brand-950 font-bold shadow-md shadow-energy-500/20"
                    : "bg-brand-900 border border-slate-800 text-slate-300 hover:border-slate-700"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by city, capacity, client..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-brand-900 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-energy-500"
            />
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding bg-brand-950">
        <div className="site-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((proj) => (
              <ProjectCard key={proj.id} project={proj} />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16 bg-brand-900/40 rounded-3xl border border-slate-800 text-slate-400 space-y-4">
              <p>No projects match your current filter parameters.</p>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
                className="btn-secondary py-2 px-5 text-xs font-semibold"
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
