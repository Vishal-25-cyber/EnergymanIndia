import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  MapPin,
  Sparkles,
  Zap,
  TrendingUp,
  Trees
} from "lucide-react";
import { projectsData } from "../../data/projects";

export const ProjectCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartRef = useRef<number | null>(null);

  const maxIndex = projectsData.length - 1;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartRef.current === null) return;
    const diff = touchStartRef.current - e.changedTouches[0].clientX;
    if (diff > 50) nextSlide();
    if (diff < -50) prevSlide();
    touchStartRef.current = null;
  };

  return (
    <section className="section-padding bg-brand-950 relative overflow-hidden" id="projects">
      <div className="site-container relative z-10">
        {/* Header with 01 / 08 counter and controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-energy-500/10 text-energy-400 border border-energy-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Proven Field Results</span>
            </div>
            <h2 className="heading-section">
              ENERGY <span className="bg-gradient-to-r from-energy-400 to-solar-400 bg-clip-text text-transparent">IN ACTION</span>
            </h2>
            <p className="text-subtle">
              Explore real-world solar power installations engineered across spinning mills, hospitals, modern agricultural estates, and luxury homes.
            </p>
          </div>

          {/* Controls & Pagination Counter */}
          <div className="flex items-center gap-4 self-start md:self-auto">
            <div className="text-sm font-mono text-slate-300 bg-brand-900 px-4 py-2.5 rounded-2xl border border-slate-800 font-bold">
              <span className="text-energy-400">0{currentIndex + 1}</span> / 0{projectsData.length}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                className="w-12 h-12 rounded-2xl bg-brand-900 hover:bg-brand-850 border border-slate-700/80 text-slate-200 hover:text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-lg"
                aria-label="Previous Project"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="w-12 h-12 rounded-2xl bg-brand-900 hover:bg-brand-850 border border-slate-700/80 text-slate-200 hover:text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-lg"
                aria-label="Next Project"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Carousel Viewport */}
        <div
          className="overflow-hidden pb-4"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-out -mx-3 sm:-mx-4"
            style={{
              transform: `translateX(-${currentIndex * (100 / (window.innerWidth >= 1024 ? 2 : 1))}%)`
            }}
          >
            {projectsData.map((project) => (
              <div
                key={project.id}
                className="w-full lg:w-1/2 px-3 sm:px-4 shrink-0"
              >
                <div className="bg-brand-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl overflow-hidden hover:border-energy-500/50 hover:shadow-2xl hover:shadow-energy-500/10 transition-all duration-300 group flex flex-col md:flex-row h-full">
                  {/* Left Half: Image */}
                  <div className="relative md:w-1/2 h-64 md:h-auto min-h-[260px] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-brand-950/80 via-brand-950/20 to-transparent" />

                    <div className="absolute top-4 left-4">
                      <span className="badge-emerald text-xs font-bold shadow-md">
                        {project.categoryLabel}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4">
                      <span className="badge-amber text-xs font-black shadow-md">
                        {project.capacity}
                      </span>
                    </div>
                  </div>

                  {/* Right Half: Project Details */}
                  <div className="p-6 sm:p-7 md:w-1/2 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <MapPin className="w-3.5 h-3.5 text-solar-400 shrink-0" />
                        <span>{project.location}, {project.state}</span>
                      </div>

                      <h3 className="text-lg font-bold text-white group-hover:text-energy-400 transition-colors line-clamp-2 leading-snug">
                        {project.title}
                      </h3>

                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
                        <div className="p-3 rounded-2xl bg-brand-950/60 border border-slate-800">
                          <span className="text-[10px] text-slate-400 block">Annual Savings</span>
                          <strong className="text-xs sm:text-sm font-black text-solar-400 block truncate">
                            {project.annualSavings}
                          </strong>
                        </div>
                        <div className="p-3 rounded-2xl bg-brand-950/60 border border-slate-800">
                          <span className="text-[10px] text-slate-400 block">Annual Generation</span>
                          <strong className="text-xs sm:text-sm font-black text-energy-400 block truncate">
                            {project.annualGeneration}
                          </strong>
                        </div>
                      </div>

                      <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                        {project.challenge}
                      </p>
                    </div>

                    <div className="pt-2">
                      <Link
                        to={`/projects/${project.id}`}
                        className="inline-flex items-center justify-between w-full px-4 py-3 rounded-xl bg-brand-850 hover:bg-energy-500 text-slate-200 hover:text-brand-950 font-bold text-xs sm:text-sm transition-all duration-300 border border-slate-700/80 hover:border-energy-400 group/btn"
                      >
                        <span>Explore Case Study</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View All Projects Strip */}
        <div className="mt-8 flex items-center justify-between p-5 rounded-2xl bg-brand-900/60 border border-slate-800 text-xs sm:text-sm">
          <span className="text-slate-300">
            Looking for a specific category of solar installation?
          </span>
          <Link
            to="/projects"
            className="text-energy-400 hover:text-energy-300 font-bold flex items-center gap-1.5 hover:underline"
          >
            <span>View All Projects & Results</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
