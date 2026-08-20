import React from "react";
import { useParams, Link } from "react-router-dom";
import {
  MapPin,
  Zap,
  Trees,
  CheckCircle2,
  ChevronRight,
  Flame,
  Globe2
} from "lucide-react";
import { SEOHead } from "../../components/common/SEOHead";
import { projectsData } from "../../data/projects";

export const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const project =
    projectsData.find((p) => p.id === id || p.slug === id) || projectsData[0];

  const relatedProjects = projectsData
    .filter((p) => p.id !== project.id && (p.category === project.category || true))
    .slice(0, 2);

  return (
    <div className="bg-[#0A0A0E] text-slate-100 min-h-screen">
      <SEOHead
        title={`${project.title} - Solar Case Study`}
        description={`Case study of ${project.capacity} ${project.categoryLabel} commissioned in ${project.location}, ${project.state} by ENERGYMAN.`}
      />

      {/* Breadcrumb Header */}
      <section className="pt-28 pb-4 bg-[#0A0A0E] border-b border-red-950/60">
        <div className="site-container flex items-center gap-2 text-xs text-slate-400">
          <Link to="/" className="hover:text-red-400 transition-colors font-medium">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <Link to="/projects" className="hover:text-red-400 transition-colors font-medium">Projects</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-white font-bold truncate max-w-xs">{project.title}</span>
        </div>
      </section>

      {/* Hero Banner Section */}
      <section className="pt-12 pb-16 bg-[#0A0A0E] border-b border-red-950/60">
        <div className="site-container">
          <div className="max-w-4xl space-y-5">
            <div className="flex flex-wrap items-center gap-3">
              <span className="badge-crimson text-xs font-bold px-3 py-1 rounded-full shadow-md">
                {project.categoryLabel}
              </span>
              <span className="badge-amber text-xs font-black px-3 py-1 rounded-full shadow-md">
                {project.capacity} Installed
              </span>
              <div className="flex items-center gap-1.5 text-xs text-slate-300 font-medium">
                <MapPin className="w-3.5 h-3.5 text-red-400" />
                <span>{project.location}, {project.state}</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              {project.title}
            </h1>

            <p className="text-sm font-bold text-red-400">
              Client: {project.clientName} • Commissioned {project.completionDate}
            </p>
          </div>

          {/* Large Hero Image Container */}
          <div className="mt-8 rounded-3xl overflow-hidden border border-red-950/60 shadow-2xl relative bg-slate-900">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-80 sm:h-[480px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0E] via-transparent to-transparent" />
            
            {/* Quick Metrics Overlay */}
            <div className="absolute bottom-6 left-6 right-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-[#14101A]/95 backdrop-blur-md border border-red-900/30 text-xs shadow-md">
                <span className="text-slate-400 block font-bold">Annual Clean Generation:</span>
                <strong className="text-base text-red-400 font-black">{project.annualGeneration}</strong>
              </div>
              <div className="p-4 rounded-2xl bg-[#14101A]/95 backdrop-blur-md border border-red-900/30 text-xs shadow-md">
                <span className="text-slate-400 block font-bold">Annual Financial Savings:</span>
                <strong className="text-base text-amber-300 font-black">{project.annualSavings}</strong>
              </div>
              <div className="p-4 rounded-2xl bg-[#14101A]/95 backdrop-blur-md border border-red-900/30 text-xs shadow-md">
                <span className="text-slate-400 block font-bold">Annual CO₂ Offset:</span>
                <strong className="text-base text-rose-400 font-black">{project.co2Offset}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Content Breakdown */}
      <section className="section-padding bg-[#0A0A0E]">
        <div className="site-container space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Challenge & Solution (7 Cols) */}
            <div className="lg:col-span-7 space-y-10">
              <div className="space-y-4">
                <span className="text-xs font-extrabold uppercase tracking-wider text-amber-400 font-mono">01. The Challenge</span>
                <h2 className="text-2xl font-black text-white">Operational Bottlenecks &amp; Energy Tariffs</h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  {project.challenge}
                </p>
              </div>

              <div className="space-y-4">
                <span className="text-xs font-extrabold uppercase tracking-wider text-red-400 font-mono">02. Engineering Solution</span>
                <h2 className="text-2xl font-black text-white">Custom System Architecture &amp; Delivery</h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  {project.solution}
                </p>
              </div>

              <div className="space-y-4">
                <span className="text-xs font-extrabold uppercase tracking-wider text-rose-400 font-mono">03. Verified Outcomes</span>
                <h2 className="text-2xl font-black text-white">Financial &amp; Generation Results</h2>
                <div className="space-y-2.5">
                  {project.results.map((res, rIdx) => (
                    <div key={rIdx} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#14101A] border border-red-950/60 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      <span>{res}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Technical Specs & Technology (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-[#14101A]/95 border border-red-900/30 space-y-6 shadow-xl">
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-red-400" />
                  <span>Technology &amp; Impact</span>
                </h3>

                <div className="space-y-3 text-xs">
                  <span className="text-slate-400 block font-bold font-mono uppercase tracking-wider">Technology Stack Used:</span>
                  <div className="space-y-2">
                    {project.technologyUsed.map((tech, tIdx) => (
                      <div key={tIdx} className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-900 border border-red-950/60 text-slate-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                        <span>{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Environmental Impact Card */}
                {project.environmentalImpact && (
                  <div className="p-4 rounded-2xl bg-slate-900 border border-red-950/60 space-y-3">
                    <span className="text-xs font-bold text-red-400 font-mono uppercase tracking-wider flex items-center gap-1.5">
                      <Globe2 className="w-4 h-4" />
                      Annual Environmental Offset
                    </span>
                    <div className="space-y-2 text-xs text-slate-300">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 flex items-center gap-1.5">
                          <Trees className="w-3.5 h-3.5 text-rose-400" />
                          Trees Equivalent:
                        </span>
                        <strong className="text-white">{project.environmentalImpact.treesPlanted}</strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 flex items-center gap-1.5">
                          <Flame className="w-3.5 h-3.5 text-amber-400" />
                          Coal Saved:
                        </span>
                        <strong className="text-white">{project.environmentalImpact.coalSaved}</strong>
                      </div>
                    </div>
                  </div>
                )}

                <Link
                  to={`/get-a-quote?type=${encodeURIComponent(project.categoryLabel)}`}
                  className="btn-primary w-full py-3 text-xs font-bold text-center justify-center rounded-xl shadow-md transition-all block"
                >
                  Request Similar Project Sizing →
                </Link>
              </div>
            </div>
          </div>

          {/* Related Case Studies */}
          <div className="space-y-6 pt-12 border-t border-red-950/60">
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Explore More Commissioned Case Studies
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedProjects.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/projects/${rel.id}`}
                  className="p-6 rounded-3xl bg-[#14101A]/95 border border-red-900/30 hover:border-red-500/50 hover:shadow-xl transition-all group flex flex-col sm:flex-row gap-6 items-center"
                >
                  <img
                    src={rel.image}
                    alt={rel.title}
                    className="w-full sm:w-40 h-32 rounded-2xl object-cover"
                  />
                  <div className="space-y-2 flex-1">
                    <span className="badge-crimson text-[10px] font-bold px-2.5 py-0.5 rounded-full">{rel.categoryLabel}</span>
                    <h4 className="text-base font-bold text-white group-hover:text-red-400 transition-colors line-clamp-1">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-slate-400 font-mono font-bold">
                      {rel.capacity} • {rel.location}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetailPage;
