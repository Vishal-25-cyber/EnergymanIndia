import React, { useState } from "react";
import {
  Sparkles,
  MapPin,
  Maximize2,
  Camera
} from "lucide-react";
import { SEOHead } from "../components/common/SEOHead";
import { LightboxModal } from "../components/common/LightboxModal";
import { galleryData } from "../data/gallery";

export const GalleryPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ["All", "Residential", "Commercial", "Industrial", "Agricultural"];

  const filteredImages = galleryData.filter(
    (img) => activeCategory === "All" || img.categoryLabel === activeCategory
  );

  return (
    <div className="bg-[#0A0A0E] text-slate-100 min-h-screen">
      <SEOHead
        title="Our Exclusive Client's Project Sites | ENERGYMAN Gallery"
        description="Visual portfolio of our exclusive client's project sites across spinning mills, hospital campuses, agricultural estates, and residential rooftops."
      />

      {/* Hero Header */}
      <section className="pt-32 pb-16 bg-[#0A0A0E] border-b border-red-950/60 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="site-container relative z-10 text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold tracking-widest uppercase bg-red-950/80 text-rose-300 border border-red-500/40 shadow-xs font-mono">
            <Camera className="w-3.5 h-3.5 text-red-400" />
            <span>VISUAL COMMISSIONING PORTFOLIO</span>
          </div>
          <h1 className="heading-hero text-white uppercase">
            OUR EXCLUSIVE <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">CLIENT'S PROJECT SITES</span>
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base">
            High-resolution visual documentation of commissioned rooftop solar plants, agricultural pumps, HT substations, and energy storage systems across South India.
          </p>
        </div>
      </section>

      {/* Filters Bar */}
      <section className="py-4 bg-[#14101A]/95 border-b border-red-950/60 sticky top-[60px] md:top-[74px] z-30 backdrop-blur-md shadow-lg">
        <div className="site-container flex items-center justify-center">
          <div className="flex flex-wrap items-center justify-center gap-2 bg-slate-900 p-1.5 rounded-2xl border border-red-950/60">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-red-600 text-white shadow-md"
                    : "text-slate-300 hover:text-red-400 hover:bg-slate-800"
                }`}
              >
                {cat === "All" ? "All Project Sites" : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Image Gallery Masonry Grid */}
      <section className="section-padding bg-[#0A0A0E]">
        <div className="site-container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((img, idx) => (
              <div
                key={img.id}
                onClick={() => setLightboxIndex(idx)}
                className="group relative rounded-3xl overflow-hidden bg-slate-900 border border-red-900/30 hover:border-red-500/50 transition-all duration-300 cursor-pointer shadow-lg hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="aspect-4/3 overflow-hidden">
                  <img
                    src={img.image}
                    alt={img.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0E]/90 via-[#0A0A0E]/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                {/* Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="badge-crimson text-[11px] font-bold">
                    {img.categoryLabel}
                  </span>
                  {img.capacity && (
                    <span className="badge-amber text-[10px] font-bold">
                      {img.capacity}
                    </span>
                  )}
                </div>

                {/* Details Footer */}
                <div className="absolute bottom-4 left-4 right-4 space-y-1">
                  <h3 className="text-base font-black text-white group-hover:text-red-400 transition-colors line-clamp-1">
                    {img.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      {img.location}
                    </span>
                    <span className="p-1.5 rounded-lg bg-white/10 text-white group-hover:bg-red-600 transition-colors">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <LightboxModal
          images={filteredImages}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  );
};

export default GalleryPage;
