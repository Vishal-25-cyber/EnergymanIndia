import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  Search,
  Clock,
  ArrowRight,
  Sparkles,
  ChevronRight,
  User
} from "lucide-react";
import { SEOHead } from "../components/common/SEOHead";
import { blogsData, BlogPost } from "../data/blogs";

export const InsightsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = ["All", "Government Subsidy", "Technology", "Agriculture", "Industry", "Solar Energy"];

  const featuredPost = blogsData.find((b) => b.featured) || blogsData[0];

  const filteredPosts = blogsData.filter((post) => {
    const matchesCat = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <>
      <SEOHead
        title="Clean Energy Insights & Solar Technology Guides"
        description="Comprehensive engineering insights, PM Surya Ghar subsidy explainers, agricultural pump economics, and commercial solar guides from Energy Man India."
      />

      {/* Hero Header */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-brand-950 via-brand-900/60 to-brand-950 border-b border-slate-800">
        <div className="site-container text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-energy-500/10 text-energy-400 border border-energy-500/30">
            <FileText className="w-3.5 h-3.5" />
            <span>Clean Energy Knowledge Hub</span>
          </div>
          <h1 className="heading-hero text-white">
            INSIGHTS <span className="bg-gradient-to-r from-energy-400 to-solar-400 bg-clip-text text-transparent">& IDEAS</span>
          </h1>
          <p className="text-subtle">
            In-depth engineering analyses, government subsidy updates, and solar ROI roadmaps for India's clean energy transition.
          </p>
        </div>
      </section>

      {/* Featured Article Hero Carousel / Card */}
      {featuredPost && (
        <section className="py-12 bg-brand-950 border-b border-slate-800/80">
          <div className="site-container">
            <div className="bg-brand-900/80 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row group">
              <div className="lg:w-1/2 relative h-72 sm:h-96 lg:h-auto overflow-hidden">
                <img
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-brand-950/80 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 badge-amber text-xs font-bold">
                  Featured Insight
                </span>
              </div>

              <div className="lg:w-1/2 p-8 sm:p-12 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="badge-emerald text-xs">{featuredPost.category}</span>
                    <span>•</span>
                    <span>{featuredPost.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {featuredPost.readTime}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-energy-400 transition-colors leading-tight">
                    {featuredPost.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex items-center gap-3 pt-2">
                    <img
                      src={featuredPost.author.avatar}
                      alt={featuredPost.author.name}
                      className="w-10 h-10 rounded-full object-cover border border-slate-700"
                    />
                    <div>
                      <p className="text-xs font-bold text-white">{featuredPost.author.name}</p>
                      <p className="text-[11px] text-slate-400">{featuredPost.author.role}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <Link
                    to={`/insights/${featuredPost.slug}`}
                    className="btn-primary py-3 px-6 font-bold text-xs sm:text-sm inline-flex items-center gap-2"
                  >
                    <span>Read Complete Guide</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Filter and Search Bar */}
      <section className="py-8 bg-brand-950/90 border-b border-slate-800/80 sticky top-[68px] z-30 backdrop-blur-md">
        <div className="site-container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? "bg-energy-500 text-brand-950 font-bold shadow-md shadow-energy-500/20"
                    : "bg-brand-900 border border-slate-800 text-slate-300 hover:border-slate-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search solar guides..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-brand-900 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-energy-500"
            />
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="section-padding bg-brand-950">
        <div className="site-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-brand-900/70 border border-slate-800 rounded-3xl overflow-hidden hover:border-energy-500/40 hover:shadow-2xl hover:shadow-energy-500/10 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-52 overflow-hidden bg-brand-950">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-transparent to-transparent" />
                    <span className="absolute top-4 left-4 badge-emerald text-xs font-semibold">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-energy-400 transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    to={`/insights/${post.slug}`}
                    className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-brand-850 hover:bg-energy-500 text-slate-200 hover:text-brand-950 font-semibold text-xs transition-all duration-300 border border-slate-700/80 group/btn"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
