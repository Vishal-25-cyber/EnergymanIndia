import React from "react";
import { useParams, Link } from "react-router-dom";
import {
  MapPin,
  Calendar,
  Zap,
  TrendingUp,
  Trees,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  Flame,
  Building2,
  Factory,
  Tractor,
  Home
} from "lucide-react";
import { SEOHead } from "../../components/common/SEOHead";
import { projectsData } from "../../data/projects";
import { companyData } from "../../data/company";

export const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const project =
    projectsData.find((p) => p.id === id || p.slug === id) || projectsData[0];

  const relatedProjects = projectsData
    .filter((p) => p.id !== project.id && (p.category === project.category || true))
    .slice(0, 2);

  return (
    <>
      <SEOHead
        title={`${project.title} - Solar Case Study`}
        description={`Case study of ${project.capacity} ${project.categoryLabel} commissioned in ${project.location}, ${project.state} by Energy Man India.`}
      />

      {/* Breadcrumb Header */}
      <section className="pt-28 pb-4 bg-brand-950 border-b border-slate-800/80">
        <div className="site-container flex items-center gap-2 text-xs text-slate-400">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/projects" className="hover:text-white transition-colors">Projects</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-200 font-semibold truncate max-w-xs">{project.title}</span>
        </div>
      </section>

      {/* Hero Banner Section */}
      <section className="pt-12 pb-16 bg-gradient-to-b from-brand-950 via-brand-900/60 to-brand-950 border-b border-slate-800">
        <div className="site-container">
          <div className="max-w-4xl space-y-5">
            <div className="flex flex-wrap items-center gap-3">
              <span className="badge-emerald text-xs font-bold">
                {project.categoryLabel}
              </span>
              <span className="badge-amber text-xs font-black">
                {project.capacity} Installed
              </span>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-solar-400" />
                <span>{project.location}, {project.state}</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              {project.title}
            </h1>

            <p className="text-sm font-semibold text-energy-400">
              Client: {project.clientName} • Commissioned {project.completionDate}
            </p>
          </div>

          {/* Large Hero Image Container */}
          <div className="mt-8 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl relative">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-80 sm:h-[480px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-transparent to-transparent" />
            
            {/* Quick Metrics Overlay */}
            <div className="absolute bottom-6 left-6 right-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-brand-900/90 backdrop-blur-md border border-slate-700 text-xs">
                <span className="text-slate-400 block">Annual Clean Generation:</span>
                <strong className="text-base text-energy-400 font-extrabold">{project.annualGeneration}</strong>
              </div>
              <div className="p-4 rounded-2xl bg-brand-900/90 backdrop-blur-md border border-slate-700 text-xs">
                <span className="text-slate-400 block">Annual Financial Savings:</span>
                <strong className="text-base text-solar-400 font-extrabold">{project.annualSavings}</strong>
              </div>
              <div className="p-4 rounded-2xl bg-brand-900/90 backdrop-blur-md border border-slate-700 text-xs">
                <span className="text-slate-400 block">Annual CO₂ Offset:</span>
                <strong className="text-base text-emerald-400 font-extrabold">{project.co2Offset}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Content Breakdown */}
      <section className="section-padding bg-brand-950">
        <div className="site-container space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Challenge & Solution (7 Cols) */}
            <div className="lg:col-span-7 space-y-10">
              {/* Challenge */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <span className="w-8 h-8 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-center justify-center text-sm font-black">
                    01
                  </span>
                  <span>The Operational Challenge</span>
                </h2>
                <div className="p-6 rounded-3xl bg-brand-900/60 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {project.challenge}
                </div>
              </div>

              {/* Engineered Solution */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <span className="w-8 h-8 rounded-xl bg-energy-500/10 border border-energy-500/30 text-energy-400 flex items-center justify-center text-sm font-black">
                    02
                  </span>
                  <span>The Engineered Solution</span>
                </h2>
                <div className="p-6 rounded-3xl bg-brand-900/60 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {project.solution}
                </div>
              </div>

              {/* Key Results & Performance */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <span className="w-8 h-8 rounded-xl bg-solar-500/10 border border-solar-500/30 text-solar-400 flex items-center justify-center text-sm font-black">
                    03
                  </span>
                  <span>Documented Results & Performance</span>
                </h2>
                <div className="space-y-2.5">
                  {project.results.map((res, rIdx) => (
                    <div key={rIdx} className="flex items-start gap-3 p-4 rounded-2xl bg-brand-900/60 border border-slate-800 text-xs sm:text-sm text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-energy-400 shrink-0 mt-0.5" />
                      <span>{res}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Technology Bill of Materials & Environmental Impact (5 Cols) */}
            <div className="lg:col-span-5 space-y-8">
              {/* Technology Bill of Materials */}
              <div className="bg-brand-900/80 backdrop-blur-md border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-solar-400" />
                  <span>Hardware & Engineering Bill of Materials</span>
                </h3>

                <div className="space-y-2.5 divide-y divide-slate-800/80 text-xs">
                  {project.technologyUsed.map((tech, tIdx) => (
                    <div key={tIdx} className="pt-2 flex items-start gap-2 text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-energy-400 shrink-0 mt-0.5" />
                      <span className="font-semibold">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Environmental Impact Card */}
              <div className="bg-gradient-to-br from-brand-900 via-brand-900/90 to-brand-850 border border-slate-700/80 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Trees className="w-5 h-5 text-emerald-400" />
                  <span>Environmental & ESG Impact</span>
                </h3>

                <div className="grid grid-cols-1 gap-3 text-xs">
                  <div className="p-4 rounded-2xl bg-brand-950 border border-slate-800">
                    <span className="text-slate-400 block">Annual CO₂ Offset:</span>
                    <strong className="text-base text-emerald-400 font-extrabold">{project.environmentalImpact.co2PerYear}</strong>
                  </div>
                  <div className="p-4 rounded-2xl bg-brand-950 border border-slate-800">
                    <span className="text-slate-400 block">Equivalent Trees Planted:</span>
                    <strong className="text-base text-emerald-400 font-extrabold">{project.environmentalImpact.treesPlanted}</strong>
                  </div>
                  <div className="p-4 rounded-2xl bg-brand-950 border border-slate-800">
                    <span className="text-slate-400 block">Fossil Fuel / Coal Displaced:</span>
                    <strong className="text-base text-solar-400 font-extrabold">{project.environmentalImpact.coalSaved}</strong>
                  </div>
                </div>
              </div>

              {/* "Want a Similar Solution?" CTA Card */}
              <div className="p-6 rounded-3xl bg-energy-500/10 border border-energy-500/30 text-center space-y-4">
                <h4 className="text-base font-bold text-white">Want a Similar Solar Solution?</h4>
                <p className="text-xs text-slate-300">
                  Let us engineer a custom system matching your facility capacity and budget.
                </p>
                <Link
                  to={`/get-a-quote?solution=${encodeURIComponent(project.title)}`}
                  className="btn-primary w-full py-3 text-xs font-bold justify-center text-center"
                >
                  Get a Free Custom Proposal →
                </Link>
              </div>
            </div>
          </div>

          {/* Project Gallery */}
          {project.galleryImages && project.galleryImages.length > 1 && (
            <div className="space-y-6 pt-8 border-t border-slate-800">
              <h3 className="text-2xl font-bold text-white">Installation Gallery</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {project.galleryImages.map((img, gIdx) => (
                  <div key={gIdx} className="rounded-2xl overflow-hidden border border-slate-800 h-56 group">
                    <img
                      src={img}
                      alt={`Installation photo ${gIdx + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Projects */}
          <div className="space-y-6 pt-8 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-white">Explore More Case Studies</h3>
              <Link to="/projects" className="text-xs font-bold text-energy-400 hover:underline flex items-center gap-1">
                View All <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedProjects.map((p) => (
                <div key={p.id} className="p-6 rounded-3xl bg-brand-900/60 border border-slate-800 flex flex-col sm:flex-row gap-5 items-center">
                  <img src={p.image} alt={p.title} className="w-full sm:w-40 h-32 object-cover rounded-2xl shrink-0" />
                  <div className="space-y-2">
                    <span className="badge-emerald text-[11px] font-bold">{p.categoryLabel}</span>
                    <h4 className="text-sm font-bold text-white line-clamp-1">{p.title}</h4>
                    <p className="text-xs text-slate-400">{p.location}, {p.state} • {p.capacity}</p>
                    <Link to={`/projects/${p.id}`} className="text-xs font-bold text-energy-400 hover:underline block pt-1">
                      Read Case Study →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
