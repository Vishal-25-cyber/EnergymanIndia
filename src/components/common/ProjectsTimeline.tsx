"use client";
import React from "react";
import Link from "next/link";
import { projectsData } from "../../data/projects";
import {
  Building2,
  Sun,
  MapPin,
  ArrowRight,
  TrendingUp,
  Leaf
} from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

// Fallback image in case of network issues
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=800&q=80";

export const ProjectsTimeline: React.FC = () => {
  // Duplicate projects array to create an infinite seamless loop
  const marqueeProjects = [...projectsData, ...projectsData];

  return (
    <section
      className="py-16 sm:py-24 bg-[#0A0A0E] relative overflow-hidden border-t border-red-950/60"
      id="projects"
    >
      {/* Background Subtle Glows */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/3 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="space-y-12 relative z-10">

        {/* ── Centered, Enlarged Section Header ── */}
        <div className="site-container">
          <ScrollReveal animation="slide-up">
            <div className="text-center max-w-4xl mx-auto space-y-4">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-extrabold tracking-widest uppercase bg-red-950/80 text-rose-300 border border-red-500/40 shadow-xs font-mono mx-auto">
                <Building2 className="w-3.5 h-3.5 text-amber-400" />
                <span>COMMISSIONED CASE STUDIES</span>
              </div>

              {/* Title in center & big size */}
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] uppercase">
                OUR INDUSTRIAL & COMMERCIAL{" "}
                <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent block sm:inline">
                  SOLAR PROJECTS
                </span>
              </h2>

              {/* Subtitle */}
              <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                Real-world engineering case studies delivering guaranteed high-yield generation and millions in utility savings across Tamil Nadu.
              </p>

              {/* Centered Actions / Status Bar */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Continuous Feed • Hover Card to Inspect
                </span>

                <Link
                  href="/projects"
                  className="bg-slate-900 hover:bg-slate-800 text-white border border-red-950/60 py-2 px-4 text-xs sm:text-sm font-bold inline-flex items-center gap-1.5 rounded-xl transition-all hover:border-red-500/40 shadow-xs"
                >
                  <span>Explore All Projects</span>
                  <ArrowRight className="w-4 h-4 text-red-500" />
                </Link>
              </div>

            </div>
          </ScrollReveal>
        </div>

        {/* ── Continuous Moving Infinite Marquee Track ── */}
        <div className="relative w-full overflow-hidden py-3">
          
          {/* Left Gradient Fade Mask */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#0A0A0E] via-[#0A0A0E]/80 to-transparent z-20" />
          
          {/* Right Gradient Fade Mask */}
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#0A0A0E] via-[#0A0A0E]/80 to-transparent z-20" />

          {/* Scrolling Container */}
          <div className="animate-smooth-marquee gap-6 px-4">
            {marqueeProjects.map((project, idx) => (
              <div
                key={`${project.id}-${idx}`}
                className="w-[320px] sm:w-[360px] lg:w-[380px] shrink-0"
              >
                <div className="h-[500px] flex flex-col justify-between bg-[#14101A]/95 border border-red-900/30 rounded-2xl overflow-hidden hover:border-red-500/60 hover:shadow-2xl hover:shadow-red-950/50 hover:-translate-y-1.5 transition-all duration-300 group relative shadow-lg">
                  
                  {/* Top Glowing Accent Line on Hover */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-rose-400 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30" />

                  {/* ── Card Image Container (Fixed Height 185px) ── */}
                  <div className="relative h-[185px] w-full overflow-hidden bg-slate-900 shrink-0">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (target.src !== FALLBACK_IMAGE) {
                          target.src = FALLBACK_IMAGE;
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#14101A] via-black/20 to-black/40" />

                    {/* Solar Capacity Floating Badge */}
                    <div className="absolute top-3 left-3 z-20">
                      <div className="bg-gradient-to-r from-red-600 to-rose-600 text-white px-2.5 py-1 rounded-lg shadow-md border border-red-400/40">
                        <span className="text-xs font-black font-mono block leading-none">
                          {project.capacity}
                        </span>
                      </div>
                    </div>

                    {/* Project Index Badge */}
                    <div className="absolute top-3 right-3 z-20">
                      <span className="px-2 py-0.5 rounded-md text-[9px] font-mono font-black tracking-wider bg-black/75 backdrop-blur-md text-amber-400 border border-amber-500/30 shadow-xs">
                        {project.projectNumber}
                      </span>
                    </div>

                    {/* Location & Status Strip */}
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between z-20 text-[10px]">
                      <div className="inline-flex items-center gap-1 bg-black/80 backdrop-blur-md px-2 py-1 rounded-md border border-white/15 font-bold text-slate-200 truncate max-w-[70%]">
                        <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                        <span className="truncate">{project.location}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-md bg-emerald-950/90 text-emerald-300 font-mono font-bold border border-emerald-500/40 backdrop-blur-xs">
                        ● {project.completionDate}
                      </span>
                    </div>
                  </div>

                  {/* ── Perfectly Aligned Card Body ── */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    
                    {/* Top Row: Category + State */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="badge-crimson font-bold px-2 py-0.5 rounded-full">
                          {project.categoryLabel}
                        </span>
                        <span className="font-mono font-bold text-slate-400">
                          {project.state}
                        </span>
                      </div>

                      {/* Title: Fixed 2-Line Height for perfect alignment */}
                      <div className="h-11 flex items-center">
                        <h3 className="text-sm sm:text-base font-black text-white group-hover:text-red-400 transition-colors line-clamp-2 leading-snug">
                          {project.title}
                        </h3>
                      </div>

                      {/* Client Name: Fixed 1-Line Height */}
                      <p className="text-[11px] font-bold text-amber-400/90 font-mono truncate">
                        Client: {project.clientName}
                      </p>
                    </div>

                    {/* Compact Key Metrics (Yield & Savings) */}
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <div className="p-2.5 rounded-xl bg-slate-900/90 border border-red-950/60 shadow-xs">
                        <div className="flex items-center gap-1 text-[9px] text-slate-400 font-bold uppercase font-mono">
                          <Sun className="w-2.5 h-2.5 text-amber-400 shrink-0" />
                          <span className="truncate">Annual Yield</span>
                        </div>
                        <strong className="text-xs font-black text-amber-400 font-mono block mt-0.5 truncate">
                          {project.annualGeneration.split("/")[0]}
                        </strong>
                      </div>

                      <div className="p-2.5 rounded-xl bg-slate-900/90 border border-red-950/60 shadow-xs">
                        <div className="flex items-center gap-1 text-[9px] text-slate-400 font-bold uppercase font-mono">
                          <TrendingUp className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
                          <span className="truncate">Annual Savings</span>
                        </div>
                        <strong className="text-xs font-black text-emerald-400 font-mono block mt-0.5 truncate">
                          {project.annualSavings.split("/")[0]}
                        </strong>
                      </div>
                    </div>

                    {/* Bottom CTA Button */}
                    <div className="pt-2.5 border-t border-red-950/60">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl bg-slate-900 group-hover:bg-red-600 text-slate-200 group-hover:text-white font-bold text-xs transition-all duration-300 border border-red-950/60 group-hover:border-red-500 shadow-xs group/btn"
                      >
                        <span>Explore Case Study</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </div>

                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>

        {/* ── Footer Environmental Stat (Centered) ── */}
        <div className="site-container">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-center text-xs text-slate-400 font-mono pt-2">
            <div className="flex items-center gap-1.5">
              <Leaf className="w-3.5 h-3.5 text-emerald-400" />
              <span>Over 2,400+ Tons Lifetime CO₂ Displaced across 5 Commissioned Sites</span>
            </div>
            <span className="hidden sm:inline text-slate-600">•</span>
            <span className="text-[11px] text-slate-500">
              Hover over any case study card to pause continuous movement
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProjectsTimeline;
