import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Layers,
  Search,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Zap,
  Tractor,
  Sun,
  BatteryCharging
} from "lucide-react";
import { SEOHead } from "../components/common/SEOHead";
import { ProductCard } from "../components/common/ProductCard";
import { productsData } from "../data/products";

export const ProductsPage: React.FC<{ categoryFilter?: string }> = ({ categoryFilter }) => {
  const [searchParams] = useSearchParams();
  const initialCategory = categoryFilter || searchParams.get("category") || "all";
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredProducts = productsData.filter((product) => {
    const matchesCat = selectedCategory === "all" || product.category === selectedCategory;
    const matchesQuery =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <>
      <SEOHead
        title="Engineering Solar Hardware & Product Catalogue"
        description="Tier-1 Solar Panels (TOPCon Bi-facial), On-Grid & Hybrid Inverters, Stainless Steel Solar Water Pumps, Solar Water Heaters, and LiFePO4 Energy Storage Racks."
      />

      {/* Hero Header */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-brand-950 via-brand-900/60 to-brand-950 border-b border-slate-800">
        <div className="site-container text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-solar-500/10 text-solar-400 border border-solar-500/30">
            <Layers className="w-3.5 h-3.5" />
            <span>Tier-1 Engineering Hardware</span>
          </div>
          <h1 className="heading-hero text-white">
            SOLAR PRODUCTS <span className="bg-gradient-to-r from-solar-400 to-energy-400 bg-clip-text text-transparent">CATALOGUE</span>
          </h1>
          <p className="text-subtle">
            Explore our engineering-grade renewable energy hardware. Tested and certified under BIS, IEC, and MNRE standards with 25-30 year performance warranties.
          </p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="py-8 bg-brand-950/90 border-b border-slate-800/80 sticky top-[68px] z-30 backdrop-blur-md">
        <div className="site-container flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {[
              { id: "all", label: "All Products" },
              { id: "solar-panels", label: "Solar Panels" },
              { id: "inverters", label: "Inverters" },
              { id: "solar-pumps", label: "Solar Pumps" },
              { id: "solar-water-heaters", label: "Water Heaters" },
              { id: "energy-storage", label: "Energy Storage" },
              { id: "other", label: "Structures & BOS" }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? "bg-solar-500 text-brand-950 font-bold shadow-md shadow-solar-500/20"
                    : "bg-brand-900 border border-slate-800 text-slate-300 hover:border-slate-700"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search products & specs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-brand-900 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-energy-500"
            />
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="section-padding bg-brand-950">
        <div className="site-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16 bg-brand-900/40 rounded-3xl border border-slate-800 text-slate-400 space-y-4">
              <p>No products match your current search criteria.</p>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
                className="btn-secondary py-2 px-5 text-xs font-semibold"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};
