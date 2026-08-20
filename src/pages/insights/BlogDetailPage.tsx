import React from "react";
import { useParams, Link } from "react-router-dom";
import {
  Clock,
  ChevronRight,
  Share2,
  Zap,
  Lightbulb
} from "lucide-react";
import { SEOHead } from "../../components/common/SEOHead";
import { blogsData } from "../../data/blogs";

export const BlogDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const post =
    blogsData.find((b) => b.slug === slug || b.id === slug) || blogsData[0];

  const relatedPosts = blogsData
    .filter((b) => b.id !== post.id)
    .slice(0, 2);

  return (
    <div className="bg-[#0A0A0E] text-slate-100 min-h-screen">
      <SEOHead
        title={post.title}
        description={post.excerpt}
        ogImage={post.coverImage}
      />

      {/* Breadcrumb Header */}
      <section className="pt-28 pb-4 bg-[#0A0A0E] border-b border-red-950/60">
        <div className="site-container flex items-center gap-2 text-xs text-slate-400">
          <Link to="/" className="hover:text-red-400 transition-colors font-medium">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <Link to="/insights" className="hover:text-red-400 transition-colors font-medium">Insights</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-white font-bold truncate max-w-xs">{post.title}</span>
        </div>
      </section>

      {/* Article Hero */}
      <section className="pt-10 pb-12 bg-[#0A0A0E] border-b border-red-950/60">
        <div className="site-container max-w-4xl space-y-6">
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 font-medium">
            <span className="badge-crimson text-xs font-bold px-3 py-1 rounded-full">{post.category}</span>
            <span>•</span>
            <span>{post.date}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-red-400" />
              {post.readTime}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
            {post.title}
          </h1>

          {/* Author Row */}
          <div className="flex items-center justify-between pt-4 border-t border-red-950/60">
            <div className="flex items-center gap-3">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-red-950/60 shadow-xs"
              />
              <div>
                <p className="text-sm font-black text-white">{post.author.name}</p>
                <p className="text-xs text-slate-400">{post.author.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(post.title + " " + (typeof window !== 'undefined' ? window.location.href : ''))}`}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-red-600 border border-red-950/60 text-slate-200 hover:text-white transition-colors"
                title="Share on WhatsApp"
              >
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Article Content & TOC Layout */}
      <section className="section-padding bg-[#0A0A0E]">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left/Main Column: Article Content (8 Cols) */}
            <div className="lg:col-span-8 space-y-8">
              {/* Cover Image */}
              <div className="rounded-3xl overflow-hidden border border-red-950/60 shadow-xl bg-slate-900">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-80 sm:h-96 object-cover"
                />
              </div>

              {/* Intro */}
              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-medium border-l-4 border-red-500 pl-4 py-1">
                {post.content.intro}
              </p>

              {/* Sections */}
              <div className="space-y-10">
                {post.content.sections.map((section) => (
                  <div key={section.id} id={section.id} className="space-y-4 pt-4">
                    <h2 className="text-xl sm:text-2xl font-black text-white">
                      {section.heading}
                    </h2>
                    <div className="space-y-3 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                      {section.body.map((paragraph, pIdx) => (
                        <p key={pIdx}>{paragraph}</p>
                      ))}
                    </div>

                    {section.keyTakeaway && (
                      <div className="p-4 rounded-2xl bg-[#14101A] border border-red-900/40 flex items-start gap-3 mt-4">
                        <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-xs font-bold uppercase tracking-wider text-red-400 block font-mono">Key Takeaway</span>
                          <p className="text-xs sm:text-sm text-slate-200 font-medium">{section.keyTakeaway}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Conclusion */}
              <div className="p-6 rounded-3xl bg-[#14101A]/95 border border-red-900/30 space-y-3">
                <h3 className="text-lg font-black text-white">Conclusion &amp; Next Steps</h3>
                <p className="text-sm text-slate-300 leading-relaxed font-normal">{post.content.conclusion}</p>
              </div>
            </div>

            {/* Right Column: CTA & Table of Contents (4 Cols) */}
            <div className="lg:col-span-4 space-y-6 sticky top-24">
              {/* Table of Contents */}
              {post.tableOfContents && post.tableOfContents.length > 0 && (
                <div className="p-6 rounded-3xl bg-[#14101A]/95 border border-red-900/30 space-y-4 shadow-xl">
                  <h4 className="text-xs font-black uppercase tracking-wider text-red-400 font-mono">Table of Contents</h4>
                  <ul className="space-y-2 text-xs">
                    {post.tableOfContents.map((toc) => (
                      <li key={toc.id}>
                        <a
                          href={`#${toc.id}`}
                          className="text-slate-300 hover:text-red-400 transition-colors block py-0.5"
                        >
                          • {toc.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Free Assessment Box */}
              <div className="p-6 sm:p-8 rounded-3xl bg-[#14101A]/95 border border-red-900/30 space-y-4 shadow-xl text-center">
                <div className="w-12 h-12 rounded-2xl bg-red-950 text-red-400 border border-red-500/40 flex items-center justify-center mx-auto shadow-md">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-white">
                  Want Solar For Your Facility?
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  Calculate how much you can save under PM Surya Ghar or Commercial 40% Tax Depreciation.
                </p>
                <Link
                  to="/get-a-quote"
                  className="btn-primary w-full py-3 text-xs font-bold rounded-xl shadow-md transition-all block"
                >
                  Get Custom Solar Proposal →
                </Link>
              </div>

              {/* Related Posts */}
              <div className="p-6 rounded-3xl bg-[#14101A]/95 border border-red-900/30 space-y-4 shadow-xl">
                <h4 className="text-sm font-black text-white">Recommended Reading</h4>
                <div className="space-y-4">
                  {relatedPosts.map((rel) => (
                    <Link
                      key={rel.id}
                      to={`/insights/${rel.slug}`}
                      className="block space-y-1.5 group"
                    >
                      <span className="text-[10px] font-bold text-red-400 uppercase tracking-wide">{rel.category}</span>
                      <h5 className="text-xs font-bold text-slate-200 group-hover:text-red-400 transition-colors line-clamp-2">
                        {rel.title}
                      </h5>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetailPage;
