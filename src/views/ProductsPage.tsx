"use client";
import React from "react";
import Link from "next/link";
import {
  Layers,
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import { SEOHead } from "../components/common/SEOHead";
import { productsData } from "../data/products";

export const ProductsPage: React.FC = () => {
  return (
    <div className="bg-[#0A0A0E] text-slate-100 min-h-screen">
      <SEOHead
        title="Solar Hardware & Turnkey Systems Catalogue | ENERGYMAN"
        description="Explore our MNRE-certified solar pumps, solar water heaters, bi-facial solar modules, and hybrid smart inverters."
      />

      {/* ── Breadcrumb Bar ── */}
      <section className="pt-28 pb-4 bg-[#0A0A0E] border-b border-red-950/60">
        <div className="site-container flex items-center gap-2 text-xs text-slate-400 font-mono">
          <Link href="/" className="hover:text-red-400 transition-colors">Home</Link>
          <span className="text-slate-600">/</span>
          <span className="text-white font-bold">Products</span>
        </div>
      </section>

      {/* ── Monumental Editorial Header (Cardless) ── */}
      <section className="pt-10 pb-12 bg-[#0A0A0E] border-b border-red-950/60 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="site-container relative z-10 space-y-4 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-red-950/80 text-rose-300 border border-red-500/40">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>Turnkey Engineering Hardware</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12] max-w-5xl uppercase">
            OUR SOLAR <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">PRODUCTS</span>
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-3xl font-normal">
            Tested and certified under BIS, IEC, and MNRE standards. Select any product below to inspect complete technical specifications, dimensional drawings, and government subsidy benefits.
          </p>
        </div>
      </section>

      {/* ── Editorial Cardless Product List ── */}
      <section className="py-16 bg-[#0A0A0E]">
        <div className="site-container space-y-20">
          {productsData.map((product, index) => {
            const isEven = index % 2 === 0;
            const productHref =
              product.category === "solar-pumps"
                ? "/products/solar-pumps"
                : product.category === "solar-water-heaters"
                ? "/products/solar-water-heaters"
                : `/products/${product.category}?item=${product.slug}`;

            return (
              <div
                key={product.id}
                className={`relative pt-12 first:pt-0 flex flex-col lg:flex-row items-center gap-10 lg:gap-14 ${
                  !isEven ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Thin divider line above (except first) */}
                {index > 0 && (
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-950/60 to-transparent" />
                )}

                {/* ── Product Image Showcase Frame ── */}
                <div className="w-full lg:w-[46%] relative group">
                  <div className="relative rounded-2xl overflow-hidden border border-red-950/60 shadow-2xl shadow-black/80 z-10 bg-slate-950">
                    <img
                      src={product.mainImage}
                      alt={product.name}
                      className="w-full h-[260px] sm:h-[300px] lg:h-[340px] object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0A0A0E] to-transparent" />

                    {/* Category badge */}
                    <span className="absolute bottom-4 left-4 px-3 py-1 bg-red-600 text-white text-xs font-mono font-black rounded-lg shadow-lg z-10">
                      {product.categoryLabel}
                    </span>

                    {/* Warranty badge */}
                    <span className="absolute top-4 left-4 px-2.5 py-1 bg-black/80 backdrop-blur-sm text-[11px] font-mono font-bold text-amber-400 rounded-md border border-red-950/60 z-10">
                      {product.warranty.split("&")[0]}
                    </span>
                  </div>
                </div>

                {/* ── Editorial Content Breakdown (Cardless) ── */}
                <div className="w-full lg:w-[54%] space-y-4 relative z-10">
                  {/* Category Pill */}
                  <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest bg-red-950/60 text-rose-300 border border-red-500/30">
                    {product.categoryLabel}
                  </span>

                  {/* Title */}
                  <div className="border-l-4 border-red-600 pl-4">
                    <h2 className="text-2xl lg:text-[1.65rem] font-black text-white leading-tight tracking-tight uppercase">
                      {product.name}
                    </h2>
                    <p className="text-xs sm:text-sm font-mono text-red-400 font-bold mt-1">
                      {product.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {product.description}
                  </p>

                  {/* Feature Highlights Checklist */}
                  <div className="space-y-1.5 pt-1">
                    {product.features.slice(0, 3).map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-300 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Actions */}
                  <div className="pt-3 flex flex-wrap items-center gap-3">
                    <Link
                      href={productHref}
                      className="btn-primary py-3 px-6 text-xs font-bold inline-flex items-center gap-2"
                    >
                      <span>View Specifications</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <Link
                      href={`/get-a-quote?product=${encodeURIComponent(product.name)}`}
                      className="py-3 px-5 text-xs font-bold rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-red-950/60 inline-flex items-center gap-2 transition-all"
                    >
                      <span>Get Instant Quote</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
