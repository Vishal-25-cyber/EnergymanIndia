import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Layers,
  Search,
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
    <div className="bg-[#0A0A0E] text-slate-100 min-h-screen">
      <SEOHead
        title="Engineering Solar Hardware & Product Catalogue"
        description="Tier-1 Solar Panels (TOPCon Bi-facial), On-Grid & Hybrid Inverters, Stainless Steel Solar Water Pumps, Solar Water Heaters, and LiFePO4 Energy Storage Racks."
      />

      {/* Hero Header */}
      <section className="pt-32 pb-16 bg-[#0A0A0E] border-b border-red-950/60 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="site-container relative z-10 text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold tracking-wider uppercase bg-amber-950/80 text-amber-300 border border-amber-500/40 shadow-xs">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>Tier-1 Engineering Hardware</span>
          </div>
          <h1 className="heading-hero text-white">
            SOLAR PRODUCTS <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">CATALOGUE</span>
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base">
            Explore our engineering-grade renewable energy hardware. Tested and certified under BIS, IEC, and MNRE standards with 25-30 year performance warranties.
          </p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="py-4 bg-[#14101A]/95 border-b border-red-950/60 sticky top-[60px] md:top-[92px] z-30 backdrop-blur-md shadow-lg">
        <div className="site-container flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto bg-slate-900 p-1.5 rounded-2xl border border-red-950/60">
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
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-red-600 text-white shadow-md"
                    : "text-slate-300 hover:text-red-400 hover:bg-slate-800"
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
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-red-950/60 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 shadow-xs"
            />
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="section-padding bg-[#0A0A0E]">
        <div className="site-container space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16 bg-[#14101A] rounded-3xl border border-red-950/60 text-slate-400 max-w-md mx-auto space-y-3">
              <p className="text-sm font-bold text-white">No products found matching your search</p>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
                className="btn-primary px-4 py-2 text-xs font-bold"
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
