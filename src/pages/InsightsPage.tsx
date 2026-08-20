import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  Search,
  Clock,
  ArrowRight,
} from "lucide-react";
import { SEOHead } from "../components/common/SEOHead";
import { blogsData } from "../data/blogs";

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
    <div className="bg-[#0A0A0E] text-slate-100 min-h-screen">
      <SEOHead
        title="Clean Energy Insights & Solar Technology Guides"
        description="Comprehensive engineering insights, PM Surya Ghar subsidy explainers, agricultural pump economics, and commercial solar guides from ENERGYMAN."
      />

      {/* Hero Header */}
      <section className="pt-32 pb-16 bg-[#0A0A0E] border-b border-red-950/60 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="site-container relative z-10 text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold tracking-wider uppercase bg-red-950/80 text-rose-300 border border-red-500/40 shadow-xs">
            <FileText className="w-3.5 h-3.5 text-red-400" />
            <span>Clean Energy Knowledge Hub</span>
          </div>
          <h1 className="heading-hero text-white">
            INSIGHTS <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">&amp; IDEAS</span>
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base">
            In-depth engineering analyses, government subsidy updates, and solar ROI roadmaps for India&apos;s clean energy transition.
          </p>
        </div>
      </section>

      {/* Featured Article Hero */}
      {featuredPost && (
        <section className="py-12 bg-[#0A0A0E] border-b border-red-950/60">
          <div className="site-container">
            <div className="bg-[#14101A]/95 border border-red-900/30 rounded-3xl overflow-hidden shadow-xl flex flex-col lg:flex-row group hover:border-red-500/50 transition-all">
              <div className="lg:w-1/2 relative h-72 sm:h-96 lg:h-auto overflow-hidden bg-slate-900">
                <img
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#14101A] via-transparent to-transparent" />
                <span className="absolute top-4 left-4 bg-amber-950/80 text-amber-300 border border-amber-500/40 text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  Featured Insight
                </span>
              </div>

              <div className="lg:w-1/2 p-8 sm:p-12 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-xs text-slate-400 font-semibold">
                    <span className="badge-crimson text-xs font-bold px-2.5 py-0.5 rounded-full">{featuredPost.category}</span>
                    <span>•</span>
                    <span>{featuredPost.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-red-400" />
                      {featuredPost.readTime}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-black text-white group-hover:text-red-400 transition-colors leading-tight">
                    {featuredPost.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex items-center gap-3 pt-2">
                    <img
                      src={featuredPost.author.avatar}
                      alt={featuredPost.author.name}
                      className="w-10 h-10 rounded-full object-cover border border-red-950/60 shadow-xs"
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
      <section className="py-4 bg-[#14101A]/95 border-b border-red-950/60 sticky top-[60px] md:top-[92px] z-30 backdrop-blur-md shadow-lg">
        <div className="site-container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto bg-slate-900 p-1.5 rounded-2xl border border-red-950/60">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-red-600 text-white shadow-md"
                    : "text-slate-300 hover:text-red-400 hover:bg-slate-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search solar guides..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-red-950/60 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 shadow-xs"
            />
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="section-padding bg-[#0A0A0E]">
        <div className="site-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-[#14101A]/95 border border-red-900/30 rounded-3xl overflow-hidden hover:border-red-500/50 hover:shadow-2xl hover:shadow-black/70 transition-all duration-300 group flex flex-col justify-between shadow-md"
              >
                <div>
                  <div className="relative h-52 overflow-hidden bg-slate-900">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#14101A] via-transparent to-transparent" />
                    <span className="badge-crimson absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3 text-xs text-slate-400 font-semibold">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-red-400" />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-black text-white group-hover:text-red-400 transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed font-normal">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    to={`/insights/${post.slug}`}
                    className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-red-600 text-slate-200 hover:text-white font-bold text-xs transition-all duration-300 border border-red-950/60 group/btn"
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
    </div>
  );
};

export default InsightsPage;
