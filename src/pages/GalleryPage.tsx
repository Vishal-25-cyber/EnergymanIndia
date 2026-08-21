import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Maximize2,
  Camera,
  ChevronRight,
  ArrowRight
} from "lucide-react";
import { SEOHead } from "../components/common/SEOHead";
import { LightboxModal } from "../components/common/LightboxModal";
import { galleryData } from "../data/gallery";

export const GalleryPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ["All", "Industrial", "Commercial", "Agricultural", "Residential"];

  const filteredImages = galleryData.filter(
    (img) => activeCategory === "All" || img.categoryLabel === activeCategory
  );

  return (
    <div className="bg-[#0A0A0E] text-slate-100 min-h-screen">
      <SEOHead
        title="Our Exclusive Client's Project Sites | ENERGYMAN Gallery"
        description="Visual portfolio of our exclusive client's project sites across spinning mills, hospital campuses, agricultural estates, and residential rooftops in Tamil Nadu."
      />

      {/* ── Breadcrumb Bar (Cardless) ── */}
      <section className="pt-28 pb-4 bg-[#0A0A0E] border-b border-red-950/60">
        <div className="site-container flex items-center gap-2 text-xs text-slate-400 font-mono">
          <Link to="/" className="hover:text-red-400 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="text-white font-bold">Client Site Gallery</span>
        </div>
      </section>

      {/* ── Monumental Editorial Header (Cardless) ── */}
      <section className="pt-10 pb-12 bg-[#0A0A0E] border-b border-red-950/60 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="site-container relative z-10 space-y-4 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-red-950/80 text-rose-300 border border-red-500/40">
            <Camera className="w-3.5 h-3.5 text-amber-400" />
            <span>Field Commissioning Documentation</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12] max-w-5xl uppercase">
            OUR EXCLUSIVE <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">CLIENT&apos;S PROJECT SITES</span>
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-3xl font-normal">
            High-resolution visual documentation of commissioned rooftop solar plants, PM-KUSUM agricultural pumps, and captive commercial installations across Coimbatore, Tiruppur, Palani, Erode, and Tamil Nadu.
          </p>
        </div>
      </section>

      {/* ── Category Filter Bar ── */}
      <section className="py-4 bg-[#0A0A0E] border-b border-red-950/60 sticky top-[60px] md:top-[92px] z-30 backdrop-blur-md">
        <div className="site-container flex items-center justify-between gap-4 overflow-x-auto">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-red-600 text-white shadow-md shadow-red-600/20"
                    : "bg-slate-900/80 text-slate-300 hover:text-white border border-red-950/40 hover:border-red-500/40"
                }`}
              >
                {cat === "All" ? "All Project Sites" : cat}
              </button>
            ))}
          </div>

          <span className="text-xs font-mono text-slate-400 hidden sm:inline-block">
            Showing {filteredImages.length} Verified Sites
          </span>
        </div>
      </section>

      {/* ── Cardless Visual Gallery Grid ── */}
      <section className="py-16 bg-[#0A0A0E]">
        <div className="site-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {filteredImages.map((img, idx) => (
              <div
                key={img.id}
                onClick={() => setLightboxIndex(idx)}
                className="group cursor-pointer space-y-3.5"
              >
                {/* Image Frame */}
                <div className="relative rounded-2xl overflow-hidden border border-red-950/60 shadow-xl bg-slate-950">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={img.image}
                      alt={img.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0E]/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

                  {/* Top Badges */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                    <span className="px-2.5 py-1 bg-black/80 backdrop-blur-sm text-[10px] font-mono font-bold text-rose-300 rounded-md border border-red-950/60">
                      {img.categoryLabel}
                    </span>
                    {img.capacity && (
                      <span className="px-2.5 py-1 bg-red-600 text-white text-[10px] font-mono font-black rounded-md shadow-md">
                        {img.capacity}
                      </span>
                    )}
                  </div>

                  {/* Expand Icon Overlay */}
                  <div className="absolute bottom-3.5 right-3.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="p-2 rounded-xl bg-red-600 text-white shadow-lg inline-flex items-center justify-center">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

                {/* Editorial Metadata Rail Below Image (Cardless) */}
                <div className="space-y-1.5 pl-1">
                  <div className="flex items-center gap-1.5 text-xs text-amber-400 font-mono font-semibold">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>{img.location}</span>
                  </div>

                  <h3 className="text-base font-black text-white group-hover:text-red-400 transition-colors leading-snug tracking-tight uppercase line-clamp-2">
                    {img.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed font-normal line-clamp-2">
                    {img.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Consultation Strip */}
          <div className="mt-16 pt-8 border-t border-red-950/60 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div className="space-y-1">
              <h4 className="text-lg font-black text-white uppercase tracking-tight">
                Want to Inspect Our Commissioned Sites in Person?
              </h4>
              <p className="text-xs text-slate-400 font-mono">
                Schedule a guided visit to our industrial or agricultural solar sites across Tamil Nadu.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/contact"
                className="btn-primary py-3 px-6 text-xs font-bold inline-flex items-center gap-2"
              >
                <span>Book Site Visit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
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
