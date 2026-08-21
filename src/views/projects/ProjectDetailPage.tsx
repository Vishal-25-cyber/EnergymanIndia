"use client";
import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  MapPin,
  Sun,
  Trees,
  CheckCircle2,
  ChevronRight,
  Flame,
  Globe2,
  Building2,
  TrendingUp,
  ShieldCheck,
  Award,
  ArrowRight,
  Calendar
} from "lucide-react";
import { SEOHead } from "../../components/common/SEOHead";
import { projectsData } from "../../data/projects";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1200&q=80";

export const ProjectDetailPage: React.FC = () => {
  const params = useParams();
  const id = params?.id as string | undefined;

  const project =
    projectsData.find((p) => p.id === id || p.slug === id) || projectsData[0];

  const words = project.title.split(" ");
  const splitIndex = Math.ceil(words.length / 2);
  const firstHalf = words.slice(0, splitIndex).join(" ");
  const secondHalf = words.slice(splitIndex).join(" ");

  return (
    <div className="bg-[#0A0A0E] text-slate-100 min-h-screen">
      <SEOHead
        title={`${project.title} - Solar Case Study | ENERGYMAN`}
        description={`Engineering case study of ${project.capacity} ${project.categoryLabel} commissioned in ${project.location}, ${project.state} by ENERGYMAN.`}
      />

      {/* ── Breadcrumb Header ── */}
      <section className="pt-28 pb-4 bg-[#0A0A0E] border-b border-red-950/60">
        <div className="site-container flex items-center gap-2 text-xs text-slate-400 font-mono">
          <Link href="/" className="hover:text-red-400 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <Link href="/projects" className="hover:text-red-400 transition-colors">Projects</Link>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="text-white font-bold truncate max-w-sm">{project.title}</span>
        </div>
      </section>

      {/* ── Hero Title & Showcase Section (Seamless Centered Layout) ── */}
      <section className="pt-10 pb-12 bg-[#0A0A0E] relative overflow-hidden">
        {/* Subtle Background Glows */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="site-container relative z-10 space-y-6 text-center flex flex-col items-center">
          
          {/* Centered Metadata Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-red-950/80 text-rose-300 border border-red-500/40 shadow-xs">
              {project.categoryLabel}
            </span>
            <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-amber-950/80 text-amber-300 border border-amber-500/40 shadow-xs">
              {project.capacity} Commissioned
            </span>
            <div className="inline-flex items-center gap-1.5 text-xs text-slate-300 font-mono px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-red-950/60 shadow-xs">
              <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
              <span>{project.location}, {project.state}</span>
            </div>
          </div>

          {/* Centered Project Headline with Dual-Tone (First Half White, Second Half Theme Gradient) */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12] max-w-4xl uppercase text-center">
            <span className="text-white">{firstHalf} </span>
            <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">
              {secondHalf}
            </span>
          </h1>

          {/* Centered Client & Verification Strip */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-300 pt-1 font-mono">
            <span className="text-slate-400">
              Client Enterprise: <strong className="text-white font-bold">{project.clientName}</strong>
            </span>
            <span className="text-red-900 hidden sm:inline">•</span>
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Turnkey EPC Handover Verified</span>
            </span>
          </div>

          {/* ── Visual Showcase (Seamlessly aligned with ample spacing and no border collision) ── */}
          <div className="w-full max-w-3xl mx-auto pt-6 sm:pt-8">
            <div className="relative w-full h-[280px] sm:h-[360px] lg:h-[400px] rounded-3xl overflow-hidden bg-slate-900 border border-red-900/40 shadow-2xl shadow-black/80 group">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (target.src !== FALLBACK_IMAGE) {
                    target.src = FALLBACK_IMAGE;
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0E]/80 via-transparent to-black/30" />
              
              {/* Overlay Capacity Tag */}
              <div className="absolute top-4 left-4 z-20">
                <div className="bg-black/85 backdrop-blur-md text-white px-3.5 py-1.5 rounded-xl border border-white/20 shadow-lg flex items-center gap-2">
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-mono font-black">{project.projectNumber} • {project.capacity}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── Seamless Horizontal Key Metrics Bar (Directly on Background) ── */}
      <section className="py-8 bg-[#0A0A0E] border-y border-red-950/60">
        <div className="site-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 block">
                Installed Capacity
              </span>
              <p className="text-2xl sm:text-3xl font-black font-mono text-white tracking-tight">
                {project.capacity}
              </p>
              <span className="text-xs text-rose-300 font-medium">Bifacial PV Arrays</span>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 block">
                Annual Clean Energy
              </span>
              <p className="text-2xl sm:text-3xl font-black font-mono text-amber-300 tracking-tight">
                {project.annualGeneration.split(" ")[0]} <span className="text-sm font-sans font-bold text-slate-400">kWh/yr</span>
              </p>
              <span className="text-xs text-slate-400 font-medium">Grid-Tied Generation</span>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 block">
                Financial Savings
              </span>
              <p className="text-2xl sm:text-3xl font-black font-mono text-emerald-400 tracking-tight">
                {project.annualSavings.split(" ")[0]} <span className="text-sm font-sans font-bold text-slate-400">/ Year</span>
              </p>
              <span className="text-xs text-slate-400 font-medium">Electricity Bill Displaced</span>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 block">
                Annual CO₂ Offset
              </span>
              <p className="text-2xl sm:text-3xl font-black font-mono text-white tracking-tight">
                {project.co2Offset.split(" ")[0]} <span className="text-sm font-sans font-bold text-slate-400">Tons/yr</span>
              </p>
              <span className="text-xs text-slate-400 font-medium">Clean Carbon Abatement</span>
            </div>

          </div>
        </div>
      </section>

      {/* ── Case Study Engineering Breakdown (2-Column Seamless Layout) ── */}
      <section className="py-16 sm:py-20 bg-[#0A0A0E]">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Detailed Engineering Narrative (7 Cols) */}
            <div className="lg:col-span-7 space-y-12">
              
              {/* Section 01: The Challenge */}
              <div className="space-y-3 pb-8 border-b border-red-950/60">
                <span className="text-xs font-mono font-black uppercase tracking-widest text-amber-400">
                  01 // OPERATIONAL CHALLENGE
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  High Energy Tariffs &amp; Structural Requirements
                </h2>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal pt-1">
                  {project.challenge}
                </p>
              </div>

              {/* Section 02: Turnkey EPC Solution */}
              <div className="space-y-3 pb-8 border-b border-red-950/60">
                <span className="text-xs font-mono font-black uppercase tracking-widest text-red-400">
                  02 // TURNKEY EPC SOLUTION
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Custom Structural &amp; Electrical Engineering
                </h2>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal pt-1">
                  {project.solution}
                </p>
              </div>

              {/* Section 03: Verified Outcomes */}
              <div className="space-y-4">
                <span className="text-xs font-mono font-black uppercase tracking-widest text-emerald-400">
                  03 // VERIFIED OPERATIONAL OUTCOMES
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Performance &amp; Financial Payback
                </h2>
                
                <div className="space-y-3 pt-2">
                  {project.results.map((res, rIdx) => (
                    <div key={rIdx} className="flex items-start gap-3 text-sm text-slate-200 py-2 border-b border-red-950/30">
                      <CheckCircle2 className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                      <span className="leading-relaxed font-medium">{res}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Technology Specs & Environmental Offset (5 Cols) */}
            <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-8">
              
              {/* Technology Stack Readout */}
              <div className="space-y-4 pb-8 border-b border-red-950/60">
                <div className="flex items-center gap-2">
                  <Sun className="w-4 h-4 text-amber-400" />
                  <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-red-400">
                    TECHNOLOGY STACK DEPLOYED
                  </h3>
                </div>

                <div className="space-y-2.5 pt-1">
                  {project.technologyUsed.map((tech, tIdx) => (
                    <div key={tIdx} className="flex items-start gap-3 py-2 border-b border-red-950/30 text-xs sm:text-sm text-slate-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0 mt-2" />
                      <span className="font-semibold leading-relaxed">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Environmental Impact Metrics */}
              {project.environmentalImpact && (
                <div className="space-y-4 pb-8 border-b border-red-950/60">
                  <div className="flex items-center gap-2">
                    <Globe2 className="w-4 h-4 text-emerald-400" />
                    <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">
                      ANNUAL ENVIRONMENTAL DIVIDENDS
                    </h3>
                  </div>

                  <div className="space-y-3 pt-1 text-xs sm:text-sm font-mono">
                    <div className="flex justify-between py-1.5 border-b border-red-950/30 text-slate-300">
                      <span className="text-slate-400 flex items-center gap-1.5">
                        <Trees className="w-4 h-4 text-emerald-400" />
                        Carbon Sequestration:
                      </span>
                      <strong className="text-white">{project.environmentalImpact.treesPlanted}</strong>
                    </div>

                    <div className="flex justify-between py-1.5 text-slate-300">
                      <span className="text-slate-400 flex items-center gap-1.5">
                        <Flame className="w-4 h-4 text-amber-400" />
                        Fossil Fuel Displaced:
                      </span>
                      <strong className="text-white">{project.environmentalImpact.coalSaved}</strong>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Call to Action */}
              <div className="space-y-3 pt-2">
                <Link
                  href={`/get-a-quote?type=${encodeURIComponent(project.categoryLabel)}`}
                  className="btn-primary w-full py-4 text-xs sm:text-sm font-bold text-center justify-center rounded-xl shadow-lg shadow-red-600/30 transition-transform hover:scale-[1.02] flex items-center gap-2"
                >
                  <span>Request Similar Project Sizing</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <p className="text-[11px] text-center text-slate-500 font-mono">
                  Customized 3D Rooftop Shadow Study & ROI Report in 24 Hours
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>
    </div>
  );
};

export default ProjectDetailPage;
