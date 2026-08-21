"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  FileText,
  Search,
  Clock,
  ArrowRight,
  ChevronRight
} from "lucide-react";
import { SEOHead } from "../components/common/SEOHead";
import { blogsData } from "../data/blogs";

export const InsightsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = ["All", "Government Subsidy", "Agriculture", "Industry", "Solar Water Heaters"];

  const filteredPosts = blogsData.filter((post) => {
    const matchesCat = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="bg-[#0A0A0E] text-slate-100 min-h-screen">
      <SEOHead
        title="Clean Energy Insights & Solar Engineering Guides | ENERGYMAN"
        description="Comprehensive engineering analyses, PM Surya Ghar subsidy explainers, agricultural pump economics, and commercial solar guides from ENERGYMAN."
      />

      {/* ── Breadcrumb Bar ── */}
      <section className="pt-28 pb-4 bg-[#0A0A0E] border-b border-red-950/60">
        <div className="site-container flex items-center gap-2 text-xs text-slate-400 font-mono">
          <Link href="/" className="hover:text-red-400 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="text-white font-bold">Insights &amp; Blog</span>
        </div>
      </section>

      {/* ── Hero Publication Header (Cardless) ── */}
      <section className="pt-10 pb-12 bg-[#0A0A0E] border-b border-red-950/60 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="site-container relative z-10 space-y-4 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-red-950/80 text-rose-300 border border-red-500/40">
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            <span>Clean Energy Knowledge Hub</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12] max-w-5xl uppercase">
            SOLAR INSIGHTS &amp; <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">ENGINEERING</span>
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-3xl font-normal">
            Field-tested engineering analyses, PM Surya Ghar central subsidy procedures, and levelized cost of energy (LCOE) roadmaps for residential, commercial, and agricultural operations.
          </p>
        </div>
      </section>

      {/* ── Category Filter & Search Bar ── */}
      <section className="py-4 bg-[#0A0A0E] border-b border-red-950/60 sticky top-[60px] md:top-[92px] z-30 backdrop-blur-md">
        <div className="site-container flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-red-600 text-white shadow-md shadow-red-600/20"
                    : "bg-slate-900/80 text-slate-300 hover:text-white border border-red-950/40 hover:border-red-500/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search solar analyses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-red-950/60 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 shadow-xs font-mono"
            />
          </div>

        </div>
      </section>

      {/* ── Editorial Publication Feed (Alternating Zigzag Stream - No Duplication) ── */}
      <section className="py-16 bg-[#0A0A0E]">
        <div className="site-container space-y-20">
          {filteredPosts.map((post, index) => {
            const isImageLeft = index % 2 === 0;

            return (
              <div
                key={post.id}
                className={`relative pt-12 first:pt-0 flex flex-col lg:flex-row items-center gap-10 lg:gap-14 ${
                  !isImageLeft ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Thin divider line above (except first) */}
                {index > 0 && (
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-950/60 to-transparent" />
                )}

                {/* ── Image Showcase Frame ── */}
                <div className="w-full lg:w-[46%] relative group">
                  <div className="relative rounded-2xl overflow-hidden border border-red-950/60 shadow-2xl shadow-black/80 bg-slate-950">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-[260px] sm:h-[300px] lg:h-[340px] object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0A0A0E] to-transparent" />

                    {/* Category badge */}
                    <span className="absolute bottom-4 left-4 px-3 py-1 bg-red-600 text-white text-xs font-mono font-black rounded-lg shadow-lg z-10">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* ── Editorial Content Breakdown ── */}
                <div className="w-full lg:w-[54%] space-y-4 relative z-10">
                  
                  {/* Meta Strip */}
                  <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                    <span className="text-red-400 font-bold uppercase tracking-wider">{post.category}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-slate-300">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      {post.readTime}
                    </span>
                  </div>

                  {/* Heading */}
                  <div className="border-l-4 border-red-600 pl-4">
                    <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight tracking-tight uppercase">
                      {post.title}
                    </h2>
                  </div>

                  {/* Excerpt */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {post.excerpt}
                  </p>

                  {/* Author & Action Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-red-950/40">
                    <div className="flex items-center gap-3">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-9 h-9 rounded-full object-cover border border-red-950/60 shadow-xs"
                      />
                      <div>
                        <p className="text-xs font-bold text-white font-mono">{post.author.name}</p>
                        <p className="text-[11px] text-slate-400">{post.author.role}</p>
                      </div>
                    </div>

                    <Link
                      href={`/insights/${post.slug}`}
                      className="btn-primary py-3 px-6 text-xs font-bold inline-flex items-center gap-2"
                    >
                      <span>Read Complete Guide</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                </div>

              </div>
            );
          })}

          {filteredPosts.length === 0 && (
            <div className="text-center py-16 text-slate-400 max-w-md mx-auto space-y-3 font-mono">
              <p className="text-sm font-bold text-white">No articles found matching your search</p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
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

export default InsightsPage;
