import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  MapPin,
  Sparkles,
} from "lucide-react";
import { projectsData } from "../../data/projects";

export const ProjectCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartRef = useRef<number | null>(null);

  const maxIndex = projectsData.length - 1;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused, currentIndex]);

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
    <section
      className="section-padding bg-[#0A0A0E] relative overflow-hidden border-t border-red-950/60"
      id="projects"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="site-container relative z-10">
        {/* Header with counter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold tracking-wider uppercase bg-red-950/80 text-rose-300 border border-red-500/40 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-red-400" />
              <span>Proven Field Results</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              ENERGY <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">IN ACTION</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Explore real-world solar power installations engineered across spinning mills, hospitals, modern agricultural estates, and luxury homes since 2016.
            </p>
          </div>

          {/* Pagination Counter */}
          <div className="flex items-center gap-4 self-start md:self-auto">
            <div className="text-sm font-mono text-slate-300 bg-slate-900 px-4 py-2 rounded-2xl border border-red-950/60 font-bold shadow-xs">
              <span className="text-red-400 font-black">0{currentIndex + 1}</span> / 0{projectsData.length}
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
              transform: `translateX(-${currentIndex * (100 / (typeof window !== 'undefined' && window.innerWidth >= 1024 ? 2 : 1))}%)`
            }}
          >
            {projectsData.map((project) => (
              <div
                key={project.id}
                className="w-full lg:w-1/2 px-3 sm:px-4 shrink-0"
              >
                <div className="bg-[#14101A]/95 border border-red-900/30 rounded-3xl overflow-hidden hover:border-red-500/50 hover:shadow-2xl hover:shadow-black/70 transition-all duration-300 group flex flex-col md:flex-row h-full relative shadow-md">
                  {/* Active Top Line Accent */}
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-500 via-rose-400 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />

                  {/* Left Half: Image */}
                  <div className="relative md:w-1/2 h-64 md:h-auto min-h-[260px] overflow-hidden bg-slate-900">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#14101A] via-transparent to-transparent" />

                    <div className="absolute top-4 left-4 z-10">
                      <span className="badge-crimson text-xs font-extrabold shadow-md">
                        {project.categoryLabel}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 z-10">
                      <span className="badge-amber text-xs font-black shadow-md">
                        {project.capacity}
                      </span>
                    </div>
                  </div>

                  {/* Right Half: Project Details */}
                  <div className="p-6 sm:p-7 md:w-1/2 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold">
                        <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
                        <span>{project.location}, {project.state}</span>
                      </div>

                      <h3 className="text-lg font-black text-white group-hover:text-red-400 transition-colors line-clamp-2 leading-snug">
                        {project.title}
                      </h3>

                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-red-950/60">
                        <div className="p-3 rounded-2xl bg-slate-900 border border-red-950/60 shadow-xs">
                          <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">Annual Savings</span>
                          <strong className="text-xs sm:text-sm font-black text-amber-400 block truncate">
                            {project.annualSavings}
                          </strong>
                        </div>
                        <div className="p-3 rounded-2xl bg-slate-900 border border-red-950/60 shadow-xs">
                          <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">Annual Generation</span>
                          <strong className="text-xs sm:text-sm font-black text-red-400 block truncate">
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
                        className="inline-flex items-center justify-between w-full px-4 py-3 rounded-xl bg-slate-900 hover:bg-red-600 text-red-400 hover:text-white font-extrabold text-xs sm:text-sm transition-all duration-300 border border-red-950/60 group/btn shadow-xs"
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
        <div className="mt-8 flex items-center justify-between p-5 rounded-2xl bg-[#14101A]/95 border border-red-950/60 text-xs sm:text-sm shadow-md">
          <span className="text-slate-300 font-medium">
            Looking for a specific category of solar installation?
          </span>
          <Link
            to="/projects"
            className="text-red-400 hover:text-rose-300 font-extrabold flex items-center gap-1.5 hover:underline"
          >
            <span>View All Projects & Results</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectCarousel;
