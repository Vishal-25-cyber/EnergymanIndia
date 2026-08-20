import React from "react";
import { Link } from "react-router-dom";
import { galleryData } from "../../data/gallery";
import { Camera, ArrowRight, Sparkles, MapPin } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

export const ExclusiveGalleryPreview: React.FC = () => {
  const featuredImages = galleryData.slice(0, 4);

  return (
    <section className="section-padding bg-[#0A0A0E] relative overflow-hidden border-t border-red-950/60" id="gallery-preview">
      <div className="site-container relative z-10 space-y-12">
        
        {/* Section Header */}
        <ScrollReveal animation="slide-up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold tracking-widest uppercase bg-red-950/80 text-rose-300 border border-red-500/40 shadow-xs font-mono">
                <Camera className="w-3.5 h-3.5 text-red-400" />
                <span>VISUAL PROJECT PORTFOLIO</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase">
                OUR EXCLUSIVE <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">CLIENT'S PROJECT SITES</span>
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Photographic portfolio showcasing turnkey rooftop solar, elevated superstructures, and agricultural pump installations across Tamil Nadu.
              </p>
            </div>

            <Link
              to="/gallery"
              className="btn-primary py-3 px-6 text-xs sm:text-sm font-bold inline-flex items-center gap-2 self-start md:self-auto"
            >
              <span>View Complete Gallery</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>

        {/* ── Editorial Asymmetric Gallery Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Main Editorial Hero Image (7 Cols) */}
          {featuredImages[0] && (
            <div className="md:col-span-7">
              <ScrollReveal animation="slide-up">
                <div className="h-80 sm:h-[420px] rounded-3xl overflow-hidden relative group border border-red-900/40 bg-slate-900 shadow-2xl">
                  <img
                    src={featuredImages[0].image}
                    alt={featuredImages[0].title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0E] via-[#0A0A0E]/30 to-transparent" />
                  
                  <div className="absolute bottom-6 left-6 right-6 space-y-2">
                    <span className="badge-crimson text-xs font-bold">
                      {featuredImages[0].categoryLabel}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white">
                      {featuredImages[0].title}
                    </h3>
                    <p className="text-xs text-slate-300 flex items-center gap-1.5 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      {featuredImages[0].location}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          )}

          {/* Right Column: 3 Stacked Images (5 Cols) */}
          <div className="md:col-span-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-6">
            {featuredImages.slice(1, 3).map((item, idx) => (
              <ScrollReveal key={item.id} delay={idx * 100} animation="slide-up">
                <div className="h-48 sm:h-[195px] rounded-2xl overflow-hidden relative group border border-red-950/60 bg-slate-900 shadow-lg">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0E] via-transparent to-transparent" />

                  <div className="absolute bottom-4 left-4 right-4 space-y-1">
                    <span className="text-[10px] font-mono font-bold text-amber-400 block uppercase">
                      {item.categoryLabel}
                    </span>
                    <h4 className="text-sm font-black text-white line-clamp-1">
                      {item.title}
                    </h4>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default ExclusiveGalleryPreview;
