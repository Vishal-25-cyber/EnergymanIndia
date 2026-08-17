import React, { useState } from "react";
import {
  Sparkles,
  MapPin,
  Maximize2,
  Filter
} from "lucide-react";
import { SEOHead } from "../components/common/SEOHead";
import { LightboxModal } from "../components/common/LightboxModal";
import { galleryData, GalleryImage } from "../data/gallery";

export const GalleryPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ["All", "Residential", "Commercial", "Industrial", "Agricultural"];

  const filteredImages = galleryData.filter(
    (img) => activeCategory === "All" || img.categoryLabel === activeCategory
  );

  return (
    <>
      <SEOHead
        title="Project Gallery & Solar Installations Portfolio"
        description="Visual gallery of commissioned solar projects by Energy Man India across residential villas, textile mills, hospital campuses, and agricultural farms."
      />

      {/* Hero Header */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-brand-950 via-brand-900/60 to-brand-950 border-b border-slate-800">
        <div className="site-container text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-solar-500/10 text-solar-400 border border-solar-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Visual Installation Portfolio</span>
          </div>
          <h1 className="heading-hero text-white">
            PROJECT <span className="bg-gradient-to-r from-solar-400 to-energy-400 bg-clip-text text-transparent">GALLERY</span>
          </h1>
          <p className="text-subtle">
            Browse high-resolution photographs of our rooftop solar plants, agricultural pumps, HT substations, and energy storage systems across India.
          </p>
        </div>
      </section>

      {/* Filters Bar */}
      <section className="py-6 bg-brand-950/90 border-b border-slate-800/80 sticky top-[68px] z-30 backdrop-blur-md">
        <div className="site-container flex items-center justify-center">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? "bg-solar-500 text-brand-950 font-bold shadow-md shadow-solar-500/20"
                    : "bg-brand-900 border border-slate-800 text-slate-300 hover:border-slate-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Masonry Image Grid */}
      <section className="section-padding bg-brand-950">
        <div className="site-container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredImages.map((img, index) => (
              <div
                key={img.id}
                onClick={() => setLightboxIndex(index)}
                className="group relative rounded-3xl overflow-hidden bg-brand-900 border border-slate-800 shadow-xl cursor-pointer hover:border-solar-500/50 hover:shadow-2xl hover:shadow-solar-500/10 transition-all duration-300 h-80"
              >
                <img
                  src={img.image}
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4">
                  <span className="badge-emerald text-xs font-bold shadow-md">
                    {img.categoryLabel}
                  </span>
                </div>

                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="p-2 rounded-xl bg-brand-900/90 text-white border border-slate-700">
                    <Maximize2 className="w-4 h-4 text-solar-400" />
                  </div>
                </div>

                {/* Bottom Details Overlay */}
                <div className="absolute bottom-4 left-4 right-4 space-y-1">
                  <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-solar-400 transition-colors line-clamp-1">
                    {img.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-solar-400" />
                      {img.location}
                    </span>
                    {img.capacity && (
                      <span className="text-energy-400 font-bold font-mono">
                        {img.capacity}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fullscreen Lightbox Modal */}
      {lightboxIndex !== null && (
        <LightboxModal
          images={filteredImages}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
};
