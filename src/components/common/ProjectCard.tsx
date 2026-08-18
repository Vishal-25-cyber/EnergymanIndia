import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Zap, TrendingUp, Trees } from "lucide-react";
import { ProjectItem } from "../../data/projects";

interface ProjectCardProps {
  project: ProjectItem;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="flex flex-col bg-brand-900/60 backdrop-blur-md border border-slate-800/80 rounded-2xl overflow-hidden transition-all duration-500 ease-out group h-full hover:border-energy-500/50 hover:shadow-2xl hover:shadow-energy-500/[0.12] hover:-translate-y-2 relative">
      {/* Connected Top Circuit Accent on hover */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-energy-500 via-solar-400 to-energy-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />

      {/* ═══ Project Image with Shimmer ═══ */}
      <div className="relative h-60 sm:h-64 overflow-hidden bg-brand-950 shimmer-container">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.05]"
          loading="lazy"
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/35 to-transparent" />
        <div className="absolute inset-0 bg-brand-950/10 group-hover:bg-brand-950/0 transition-colors duration-500" />

        {/* Category Badge — Top Left */}
        <div className="absolute top-4 left-4 z-10">
          <span className="badge-emerald text-[11px] font-bold shadow-lg backdrop-blur-md">
            {project.categoryLabel}
          </span>
        </div>

        {/* Capacity Badge with Glow — Top Right */}
        <div className="absolute top-4 right-4 z-10">
          <span className="badge-amber text-[11px] font-black shadow-lg backdrop-blur-md group-hover:border-solar-400 group-hover:shadow-[0_0_12px_rgba(245,158,11,0.5)] transition-all duration-300">
            {project.capacity}
          </span>
        </div>

        {/* Location & Date — Bottom */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs z-10">
          <div className="flex items-center gap-1.5 bg-brand-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/70 text-slate-200 font-medium shadow-md">
            <MapPin className="w-3.5 h-3.5 text-solar-400 shrink-0" />
            <span>{project.location}, {project.state}</span>
          </div>
          <span className="text-[10px] text-slate-300 font-mono bg-brand-950/85 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-slate-800/70 tracking-wide">
            {project.completionDate}
          </span>
        </div>
      </div>

      {/* ═══ Card Body ═══ */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          {/* Client Name */}
          <p className="text-[11px] font-bold text-energy-400 uppercase tracking-widest flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-energy-400 group-hover:scale-125 transition-transform" />
            <span>{project.clientName}</span>
          </p>

          {/* Project Title */}
          <h3 className="text-base sm:text-lg font-bold text-white/95 group-hover:text-energy-400 transition-colors duration-300 line-clamp-2 leading-snug tracking-tight">
            {project.title}
          </h3>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-800/60">
            <div className="p-3 rounded-xl bg-brand-950/70 border border-slate-800/60 group-hover:border-slate-700/60 transition-colors">
              <span className="text-[10px] text-slate-400 block font-medium uppercase tracking-wider">Annual Savings</span>
              <strong className="text-sm font-extrabold text-solar-400 mt-0.5 block">{project.annualSavings}</strong>
            </div>
            <div className="p-3 rounded-xl bg-brand-950/70 border border-slate-800/60 group-hover:border-slate-700/60 transition-colors">
              <span className="text-[10px] text-slate-400 block font-medium uppercase tracking-wider">CO₂ Offset</span>
              <strong className="text-sm font-extrabold text-emerald-400 mt-0.5 block">{project.co2Offset}</strong>
            </div>
          </div>
        </div>

        {/* CTA Link */}
        <div className="pt-1">
          <Link
            to={`/projects/${project.id}`}
            className="inline-flex items-center justify-between w-full px-4 py-3 rounded-xl bg-brand-850/80 hover:bg-energy-500 text-slate-200 hover:text-brand-950 font-bold text-xs sm:text-sm transition-all duration-300 border border-slate-700/80 hover:border-energy-400 group/btn shadow-md"
          >
            <span>View Full Case Study</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
