import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Zap, TrendingUp, Trees } from "lucide-react";
import { ProjectItem } from "../../data/projects";

interface ProjectCardProps {
  project: ProjectItem;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="flex flex-col bg-brand-900/80 backdrop-blur-md border border-slate-800 rounded-3xl overflow-hidden hover:border-energy-500/50 hover:shadow-2xl hover:shadow-energy-500/10 transition-all duration-300 group h-full">
      {/* Project Image */}
      <div className="relative h-64 overflow-hidden bg-brand-950">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/40 to-transparent" />

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="badge-emerald text-xs font-bold shadow-md">
            {project.categoryLabel}
          </span>
        </div>

        {/* Capacity Marker */}
        <div className="absolute top-4 right-4">
          <span className="badge-amber text-xs font-black shadow-md">
            {project.capacity}
          </span>
        </div>

        {/* Location Tag */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-slate-300">
          <div className="flex items-center gap-1.5 bg-brand-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 font-semibold">
            <MapPin className="w-3.5 h-3.5 text-solar-400 shrink-0" />
            <span>{project.location}, {project.state}</span>
          </div>
          <span className="text-[11px] text-slate-400 font-mono bg-brand-950/80 px-2.5 py-1 rounded-lg border border-slate-800">
            {project.completionDate}
          </span>
        </div>
      </div>

      {/* Project Card Body */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
        <div className="space-y-3">
          <p className="text-xs font-semibold text-energy-400 uppercase tracking-wider">
            {project.clientName}
          </p>
          <h3 className="text-lg font-bold text-white group-hover:text-energy-400 transition-colors line-clamp-2 leading-snug">
            {project.title}
          </h3>

          {/* Quick Metrics Row */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
            <div className="p-3 rounded-2xl bg-brand-950/60 border border-slate-800">
              <span className="text-[11px] text-slate-400 block">Annual Savings</span>
              <strong className="text-sm font-black text-solar-400">{project.annualSavings}</strong>
            </div>
            <div className="p-3 rounded-2xl bg-brand-950/60 border border-slate-800">
              <span className="text-[11px] text-slate-400 block">CO₂ Offset</span>
              <strong className="text-sm font-black text-emerald-400">{project.co2Offset}</strong>
            </div>
          </div>
        </div>

        {/* CTA Link */}
        <div className="pt-2">
          <Link
            to={`/projects/${project.id}`}
            className="inline-flex items-center justify-between w-full px-4 py-3 rounded-xl bg-brand-850 hover:bg-energy-500 text-slate-200 hover:text-brand-950 font-bold text-xs sm:text-sm transition-all duration-300 border border-slate-700/80 hover:border-energy-400 group/btn"
          >
            <span>View Full Case Study</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};
