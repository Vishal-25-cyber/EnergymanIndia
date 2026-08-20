import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import { ProjectItem } from "../../data/projects";

interface ProjectCardProps {
  project: ProjectItem;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="flex flex-col bg-[#14101A]/95 border border-red-900/30 rounded-2xl overflow-hidden transition-all duration-400 ease-out group h-full hover:border-red-500/50 hover:shadow-2xl hover:shadow-black/70 hover:-translate-y-2 relative shadow-md">
      {/* Connected Top Circuit Accent on hover */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-500 via-rose-400 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />

      {/* ═══ Project Image ═══ */}
      <div className="relative h-60 sm:h-64 overflow-hidden bg-slate-900">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.05]"
          loading="lazy"
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#14101A] via-transparent to-transparent" />

        {/* Category Badge — Top Left */}
        <div className="absolute top-4 left-4 z-10">
          <span className="badge-crimson text-[11px] font-extrabold shadow-md backdrop-blur-md">
            {project.categoryLabel}
          </span>
        </div>

        {/* Capacity Badge — Top Right */}
        <div className="absolute top-4 right-4 z-10">
          <span className="badge-amber text-[11px] font-black shadow-md backdrop-blur-md">
            {project.capacity}
          </span>
        </div>

        {/* Location & Date — Bottom */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs z-10 text-white">
          <div className="flex items-center gap-1.5 bg-[#0A0A0E]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-red-950/60 font-bold shadow-md">
            <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
            <span>{project.location}, {project.state}</span>
          </div>
          <span className="text-[10px] text-slate-300 font-mono bg-[#0A0A0E]/90 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-red-950/60 tracking-wide font-bold">
            {project.completionDate}
          </span>
        </div>
      </div>

      {/* ═══ Card Body ═══ */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          {/* Client Name */}
          <p className="text-[11px] font-bold text-red-400 uppercase tracking-widest flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 group-hover:scale-125 transition-transform" />
            <span>{project.clientName}</span>
          </p>

          {/* Project Title */}
          <h3 className="text-base sm:text-lg font-black text-white group-hover:text-red-400 transition-colors duration-300 line-clamp-2 leading-snug tracking-tight">
            {project.title}
          </h3>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-2 pt-3 border-t border-red-950/60">
            <div className="p-3 rounded-xl bg-slate-900 border border-red-950/60 shadow-xs">
              <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">Annual Savings</span>
              <strong className="text-sm font-black text-amber-400 mt-0.5 block">{project.annualSavings}</strong>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-red-950/60 shadow-xs">
              <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">CO₂ Offset</span>
              <strong className="text-sm font-black text-red-400 mt-0.5 block">{project.co2Offset}</strong>
            </div>
          </div>
        </div>

        {/* CTA Link */}
        <div className="pt-1">
          <Link
            to={`/projects/${project.id}`}
            className="inline-flex items-center justify-between w-full px-4 py-3 rounded-xl bg-slate-900 hover:bg-red-600 text-slate-200 hover:text-white font-bold text-xs sm:text-sm transition-all duration-300 border border-red-950/60 group/btn shadow-xs"
          >
            <span>View Full Case Study</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
