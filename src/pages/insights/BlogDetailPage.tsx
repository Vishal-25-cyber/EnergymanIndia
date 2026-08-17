import React from "react";
import { useParams, Link } from "react-router-dom";
import {
  Clock,
  ChevronRight,
  ArrowRight,
  Share2,
  Bookmark,
  Sparkles,
  Phone,
  CheckCircle2,
  HelpCircle,
  Zap
} from "lucide-react";
import { SEOHead } from "../../components/common/SEOHead";
import { blogsData } from "../../data/blogs";
import { companyData } from "../../data/company";

export const BlogDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const post =
    blogsData.find((b) => b.slug === slug || b.id === slug) || blogsData[0];

  const relatedPosts = blogsData
    .filter((b) => b.id !== post.id)
    .slice(0, 2);

  return (
    <>
      <SEOHead
        title={post.title}
        description={post.excerpt}
        ogImage={post.coverImage}
      />

      {/* Breadcrumb Header */}
      <section className="pt-28 pb-4 bg-brand-950 border-b border-slate-800/80">
        <div className="site-container flex items-center gap-2 text-xs text-slate-400">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/insights" className="hover:text-white transition-colors">Insights</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-200 font-semibold truncate max-w-xs">{post.title}</span>
        </div>
      </section>

      {/* Article Hero */}
      <section className="pt-10 pb-12 bg-gradient-to-b from-brand-950 via-brand-900/60 to-brand-950 border-b border-slate-800">
        <div className="site-container max-w-4xl space-y-6">
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
            <span className="badge-emerald text-xs font-bold">{post.category}</span>
            <span>•</span>
            <span>{post.date}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
            {post.title}
          </h1>

          {/* Author Row */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
            <div className="flex items-center gap-3">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-slate-700"
              />
              <div>
                <p className="text-sm font-bold text-white">{post.author.name}</p>
                <p className="text-xs text-slate-400">{post.author.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(post.title + " " + window.location.href)}`}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-brand-900 hover:bg-brand-850 border border-slate-700 text-slate-300 hover:text-white transition-colors"
                title="Share on WhatsApp"
              >
                <Share2 className="w-4 h-4 text-energy-400" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Article Content & TOC Layout */}
      <section className="section-padding bg-brand-950">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left/Main Column: Article Content (8 Cols) */}
            <div className="lg:col-span-8 space-y-8">
              {/* Cover Image */}
              <div className="rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-80 sm:h-[420px] object-cover"
                />
              </div>

              {/* Intro Text */}
              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-medium bg-brand-900/50 p-6 rounded-2xl border-l-4 border-energy-500">
                {post.content.intro}
              </p>

              {/* Dynamic Body Sections */}
              <div className="space-y-10">
                {post.content.sections.map((sec) => (
                  <div key={sec.id} id={sec.id} className="space-y-4 pt-4 scroll-mt-24">
                    <h2 className="text-xl sm:text-2xl font-bold text-white">
                      {sec.heading}
                    </h2>

                    <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {sec.body.map((p, pIdx) => (
                        <p key={pIdx}>{p}</p>
                      ))}
                    </div>

                    {sec.keyTakeaway && (
                      <div className="p-4 rounded-2xl bg-solar-500/10 border border-solar-500/30 text-xs text-solar-300 flex items-start gap-2.5">
                        <Sparkles className="w-4 h-4 text-solar-400 shrink-0 mt-0.5" />
                        <span><strong>Engineering Takeaway:</strong> {sec.keyTakeaway}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Conclusion Box */}
              <div className="p-6 rounded-3xl bg-brand-900/80 border border-slate-800 space-y-3">
                <h3 className="text-lg font-bold text-white">Conclusion & Key Recommendations</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {post.content.conclusion}
                </p>
              </div>
            </div>

            {/* Right Column: Table of Contents & CTA (4 Cols) */}
            <div className="lg:col-span-4 space-y-8 sticky top-28">
              {/* Table of Contents Box */}
              {post.tableOfContents && post.tableOfContents.length > 0 && (
                <div className="bg-brand-900/80 backdrop-blur-md border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-energy-400" />
                    <span>Table of Contents</span>
                  </h3>
                  <nav className="space-y-2 text-xs">
                    {post.tableOfContents.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className="block text-slate-400 hover:text-energy-400 transition-colors py-1 pl-2 border-l-2 border-slate-800 hover:border-energy-400"
                      >
                        {item.title}
                      </a>
                    ))}
                  </nav>
                </div>
              )}

              {/* Talk to an Energy Expert CTA */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-brand-900 via-brand-850 to-brand-900 border border-slate-700/80 text-center space-y-4 shadow-xl">
                <div className="w-12 h-12 rounded-full bg-energy-500/20 text-energy-400 flex items-center justify-center mx-auto">
                  <Phone className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white">Need Customized Advice?</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Speak directly with an Energy Man India solar engineer for a customized feasibility report.
                </p>
                <Link
                  to="/get-a-quote"
                  className="btn-primary w-full py-3 text-xs font-bold justify-center text-center"
                >
                  Request Solar Consultation →
                </Link>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <div className="pt-16 border-t border-slate-800 space-y-6">
              <h3 className="text-2xl font-bold text-white">More Clean Energy Guides</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedPosts.map((r) => (
                  <div key={r.id} className="p-6 rounded-3xl bg-brand-900/60 border border-slate-800 flex flex-col sm:flex-row gap-5 items-center">
                    <img src={r.coverImage} alt={r.title} className="w-full sm:w-40 h-32 object-cover rounded-2xl shrink-0" />
                    <div className="space-y-2">
                      <span className="badge-emerald text-[11px] font-bold">{r.category}</span>
                      <h4 className="text-sm font-bold text-white line-clamp-2">{r.title}</h4>
                      <Link to={`/insights/${r.slug}`} className="text-xs font-bold text-energy-400 hover:underline block pt-1">
                        Read Guide →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};
