import React, { useState } from "react";
import { Link } from "react-router-dom";
import { projectsData } from "../../data/projects";
import { Zap, MapPin, ShieldCheck, ArrowRight, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

export const ProjectsTimeline: React.FC = () => {
  const [activeProjectIdx, setActiveProjectIdx] = useState<number>(0);
  const currentProject = projectsData[activeProjectIdx] || projectsData[0];

  const handleNext = () => {
    setActiveProjectIdx((prev) => (prev + 1) % projectsData.length);
  };

  const handlePrev = () => {
    setActiveProjectIdx((prev) => (prev - 1 + projectsData.length) % projectsData.length);
  };

  return (
    <section className="section-padding bg-[#0A0A0E] relative overflow-hidden border-t border-red-950/60" id="projects">
      
      {/* Background Watermark */}
      <div className="absolute top-1/4 left-0 text-[12vw] font-black text-white/[0.015] tracking-widest pointer-events-none select-none uppercase font-sans">
        PROJECTS
      </div>

      <div className="site-container relative z-10 space-y-14">
        
        {/* Section Header */}
        <ScrollReveal animation="slide-up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold tracking-widest uppercase bg-red-950/80 text-rose-300 border border-red-500/40 shadow-xs font-mono">
                <Sparkles className="w-3.5 h-3.5 text-red-400" />
                <span>COMMISSIONED CASE STUDIES</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                OUR INDUSTRIAL & COMMERCIAL <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">SOLAR PROJECTS</span>
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Real-world engineering case studies delivering guaranteed high-yield generation and millions in utility savings.
              </p>
            </div>

            <Link
              to="/projects"
              className="bg-slate-900 hover:bg-slate-800 text-white border border-red-950/60 py-3 px-6 text-xs sm:text-sm font-bold inline-flex items-center gap-2 self-start md:self-auto rounded-xl transition-all"
            >
              <span>Explore All Projects</span>
              <ArrowRight className="w-4 h-4 text-red-500" />
            </Link>
          </div>
        </ScrollReveal>

        {/* ── Project Step Selector Strip ── */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 border-b border-red-950/60">
          {projectsData.map((proj, pIdx) => {
            const isSelected = activeProjectIdx === pIdx;
            return (
              <button
                key={proj.id}
                onClick={() => setActiveProjectIdx(pIdx)}
                className={`px-5 py-3 rounded-2xl border text-left shrink-0 transition-all cursor-pointer ${
                  isSelected
                    ? "bg-red-950/90 border-red-500/80 text-white shadow-md shadow-red-500/20 scale-105"
                    : "bg-[#14101A]/70 border-red-950/60 text-slate-400 hover:text-slate-200 hover:border-red-500/40"
                }`}
              >
                <span className="text-[10px] font-mono font-bold text-red-400 block">
                  {proj.projectNumber}
                </span>
                <span className="text-xs sm:text-sm font-black block line-clamp-1">
                  {proj.clientName}
                </span>
                <span className="text-[11px] font-mono text-amber-400/90 font-bold block">
                  {proj.capacity}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Active Case Study Technical Viewport ── */}
        <div className="bg-[#14101A]/95 border border-red-900/40 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden group">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Image with Red Badge & Controls (6 Cols) */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden bg-slate-900 border border-red-950/60 shadow-xl">
                <img
                  src={currentProject.image}
                  alt={currentProject.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#14101A] via-transparent to-transparent" />

                {/* Capacity Callout Banner */}
                <div className="absolute top-4 left-4 bg-gradient-to-r from-red-600 to-rose-600 text-white p-3 rounded-2xl shadow-lg space-y-0.5">
                  <span className="text-[10px] font-mono font-bold block tracking-wider uppercase opacity-90">
                    Solar Capacity
                  </span>
                  <strong className="text-xl sm:text-2xl font-black font-mono block">
                    {currentProject.capacity}
                  </strong>
                </div>

                {/* Location Badge */}
                <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 text-xs font-bold text-slate-200">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>{currentProject.location}</span>
                </div>
              </div>

              {/* Prev / Next Controls */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs font-mono text-slate-400 font-bold">
                  {activeProjectIdx + 1} OF {projectsData.length} COMMISSIONED SITES
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-red-950/60 text-white transition-all cursor-pointer"
                    aria-label="Previous project"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-red-950/60 text-white transition-all cursor-pointer"
                    aria-label="Next project"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Technical Case Study Details (6 Cols) */}
            <div className="lg:col-span-6 space-y-5">
              
              <div className="space-y-2">
                <span className="badge-crimson text-xs font-bold">
                  {currentProject.categoryLabel} • {currentProject.projectNumber}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                  {currentProject.title}
                </h3>
                <p className="text-xs font-bold text-amber-400 font-mono">
                  Client: {currentProject.clientName} ({currentProject.location})
                </p>
              </div>

              {/* Technical Specifications Callout */}
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-red-950/60 space-y-2 text-xs">
                <div className="flex items-start gap-2">
                  <strong className="text-slate-400 font-mono shrink-0">Inverter Tech:</strong>
                  <span className="text-slate-200 font-bold">{currentProject.inverterType}</span>
                </div>
                {currentProject.mountingStructure && (
                  <div className="flex items-start gap-2">
                    <strong className="text-slate-400 font-mono shrink-0">Structure:</strong>
                    <span className="text-slate-200 font-bold">{currentProject.mountingStructure}</span>
                  </div>
                )}
              </div>

              {/* Annual Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-red-950/60 text-center">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase font-mono">Annual Yield</span>
                  <strong className="text-sm font-black text-amber-400 font-mono block mt-0.5">
                    {currentProject.annualGeneration}
                  </strong>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-red-950/60 text-center">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase font-mono">CO₂ Offset</span>
                  <strong className="text-sm font-black text-rose-300 font-mono block mt-0.5">
                    {currentProject.co2Offset}
                  </strong>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-red-950/60 text-center col-span-2 sm:col-span-1">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase font-mono">Status</span>
                  <strong className="text-sm font-black text-emerald-400 font-mono block mt-0.5">
                    {currentProject.completionDate}
                  </strong>
                </div>
              </div>

              {/* Results & Link */}
              <div className="space-y-2 pt-2 border-t border-red-950/60">
                {currentProject.results.slice(0, 2).map((res, rIdx) => (
                  <div key={rIdx} className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-red-500 shrink-0" />
                    <span>{res}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  to={`/projects/${currentProject.slug}`}
                  className="btn-primary py-3 px-6 text-xs sm:text-sm font-bold inline-flex items-center gap-2"
                >
                  <span>View Complete Case Study</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default ProjectsTimeline;
