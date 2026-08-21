"use client";
import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Clock,
  ChevronRight,
  Share2,
  Phone,
  ArrowRight
} from "lucide-react";
import { SEOHead } from "../../components/common/SEOHead";
import { blogsData } from "../../data/blogs";

export const BlogDetailPage: React.FC = () => {
  const params = useParams();
  const slug = params?.slug as string | undefined;

  const post =
    blogsData.find((b) => b.slug === slug || b.id === slug) || blogsData[0];

  const relatedPosts = blogsData
    .filter((b) => b.id !== post.id)
    .slice(0, 3);

  return (
    <div className="bg-[#0A0A0E] text-slate-100 min-h-screen">
      <SEOHead
        title={`${post.title} | ENERGYMAN Solar Publication`}
        description={post.excerpt}
        ogImage={post.coverImage}
      />

      {/* ── Breadcrumb Header (Cardless) ── */}
      <section className="pt-28 pb-4 bg-[#0A0A0E] border-b border-red-950/60">
        <div className="site-container flex items-center gap-2 text-xs text-slate-400 font-mono overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-red-400 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" />
          <Link href="/insights" className="hover:text-red-400 transition-colors">Insights &amp; Blog</Link>
          <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" />
          <span className="text-rose-400 font-bold">{post.category}</span>
          <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" />
          <span className="text-white font-bold truncate max-w-xs sm:max-w-md">{post.title}</span>
        </div>
      </section>

      {/* ── Monumental Editorial Article Header (Cardless) ── */}
      <section className="pt-10 pb-12 bg-[#0A0A0E] border-b border-red-950/60 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="site-container relative z-10 space-y-6 text-center flex flex-col items-center">
          
          {/* Metadata Row */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-slate-400">
            <span className="px-3.5 py-1 bg-red-950/80 text-rose-300 border border-red-500/40 rounded-full font-bold uppercase tracking-wider text-[11px] shadow-xs">
              {post.category}
            </span>
            <span>•</span>
            <span>{post.date}</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              {post.readTime}
            </span>
          </div>

          {/* Monumental Dual-Tone Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.15] tracking-tight uppercase max-w-4xl text-center">
            {post.title.split(" ").slice(0, Math.ceil(post.title.split(" ").length / 2)).join(" ")}{" "}
            <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">
              {post.title.split(" ").slice(Math.ceil(post.title.split(" ").length / 2)).join(" ")}
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl font-normal text-center">
            {post.excerpt}
          </p>

          {/* Author & Share Bar */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 border-t border-red-950/40 w-full max-w-2xl">
            <div className="flex items-center gap-3.5">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-10 h-10 rounded-full object-cover border border-red-950/60 shadow-md"
              />
              <div className="text-left">
                <p className="text-xs sm:text-sm font-bold text-white font-mono">{post.author.name}</p>
                <p className="text-[11px] text-slate-400">{post.author.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`${post.title} - Read more at: ` + (typeof window !== 'undefined' ? window.location.href : ''))}`}
                target="_blank"
                rel="noreferrer"
                className="py-2 px-4 rounded-xl bg-emerald-950/80 hover:bg-emerald-900/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold inline-flex items-center gap-2 transition-all cursor-pointer shadow-xs"
                title="Share on WhatsApp"
              >
                <Share2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Share Guide</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ── Main Editorial Content Breakdown (Cardless 2-Column Grid) ── */}
      <section className="py-14 bg-[#0A0A0E]">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* ── Left / Main Column: Editorial Body (8 Cols) ── */}
            <div className="lg:col-span-8 space-y-10">
              
              {/* Cover Image Frame (Cardless) */}
              <div className="relative rounded-2xl overflow-hidden border border-red-950/60 shadow-2xl shadow-black/80 bg-slate-950">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-[260px] sm:h-[340px] lg:h-[380px] object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0A0A0E] to-transparent" />
                <span className="absolute bottom-4 left-4 px-3 py-1 bg-red-600 text-white text-xs font-mono font-black rounded-lg shadow-lg">
                  {post.category}
                </span>
              </div>

              {/* Executive Summary Intro */}
              <div className="border-l-4 border-red-500 pl-5 py-2">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-red-400 block mb-1">
                  EXECUTIVE SUMMARY
                </span>
                <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-medium">
                  {post.content.intro}
                </p>
              </div>

              {/* Article Sections (Cardless Editorial Rail) */}
              <div className="space-y-12">
                {post.content.sections.map((section, idx) => (
                  <div key={section.id} id={section.id} className="space-y-4 pt-6 border-t border-red-950/40 first:border-t-0 first:pt-0">
                    
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400 block">
                      0{idx + 1} // ENGINEERING BRIEF
                    </span>

                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white leading-snug tracking-tight uppercase">
                      {section.heading}
                    </h2>

                    <div className="space-y-3.5 text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed font-normal">
                      {section.body.map((paragraph, pIdx) => (
                        <p key={pIdx}>{paragraph}</p>
                      ))}
                    </div>

                    {/* Key Takeaway Rail (Cardless) */}
                    {section.keyTakeaway && (
                      <div className="mt-4 pt-3 pb-3 pl-4 border-l-4 border-amber-500 bg-transparent space-y-1">
                        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-400 block">
                          CRITICAL ENGINEERING TAKEAWAY:
                        </span>
                        <p className="text-xs sm:text-sm text-slate-200 font-semibold leading-relaxed">
                          {section.keyTakeaway}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Conclusion Section (Cardless) */}
              <div className="pt-8 pb-4 border-y border-red-950/60 space-y-3">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-red-400 block">
                  CONCLUSION &amp; NEXT STEPS
                </span>
                <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed font-normal">
                  {post.content.conclusion}
                </p>
              </div>

              {/* Bottom Action Strip */}
              <div className="pt-4 flex flex-wrap items-center justify-between gap-4">
                <Link
                  href="/get-a-quote"
                  className="btn-primary py-3.5 px-8 text-xs sm:text-sm font-bold inline-flex items-center gap-2"
                >
                  <span>Request Technical Sizing</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/contact"
                  className="py-3.5 px-6 text-xs sm:text-sm font-bold rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-red-950/60 inline-flex items-center gap-2 transition-all"
                >
                  <Phone className="w-4 h-4 text-red-400" />
                  <span>Talk to Solar Engineer</span>
                </Link>
              </div>

            </div>

            {/* ── Right Sidebar: Cardless Editorial Rail (4 Cols) ── */}
            <div className="lg:col-span-4 space-y-10 lg:sticky lg:top-28">
              
              {/* 01: Table of Contents (Cardless) */}
              {post.tableOfContents && post.tableOfContents.length > 0 && (
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-red-400 block pb-2 border-b border-red-950/60">
                    01 // TABLE OF CONTENTS
                  </span>
                  <ul className="space-y-2 text-xs font-mono">
                    {post.tableOfContents.map((toc, tIdx) => (
                      <li key={toc.id}>
                        <a
                          href={`#${toc.id}`}
                          className="text-slate-300 hover:text-red-400 transition-colors block py-1 border-b border-red-950/20 hover:border-red-500/40"
                        >
                          <span className="text-red-500 font-bold mr-2">0{tIdx + 1}.</span>
                          <span>{toc.title}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 02: Solar Engineering Advisory Desk (Cardless Rail) */}
              <div className="space-y-3 pt-4 border-t border-red-950/60">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400 block">
                  02 // ENGINEERING ADVISORY
                </span>
                <h4 className="text-base font-black text-white uppercase tracking-tight">
                  Consult Coimbatore Solar Desk
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Have questions about MNRE central subsidies, agricultural solar pumps, or captive rooftop payback?
                </p>
                <div className="pt-2 space-y-2">
                  <a
                    href="tel:+917092510004"
                    className="flex items-center gap-2 text-xs font-mono font-bold text-red-400 hover:text-white transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>+91 70925 10004 / +91 97874 55554</span>
                  </a>
                  <p className="text-[11px] text-slate-500 font-mono">
                    119, Gopal Layout, Coimbatore - 641001
                  </p>
                </div>
              </div>

              {/* 03: Recommended Briefings (Cardless List) */}
              <div className="space-y-3 pt-4 border-t border-red-950/60">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 block pb-2 border-b border-red-950/60">
                  03 // RECOMMENDED BRIEFINGS
                </span>
                <div className="space-y-4">
                  {relatedPosts.map((rel) => (
                    <Link
                      key={rel.id}
                      href={`/insights/${rel.slug}`}
                      className="block space-y-1 group border-b border-red-950/30 pb-3"
                    >
                      <span className="text-[10px] font-mono font-bold text-red-400 uppercase tracking-wide">
                        {rel.category} • {rel.readTime}
                      </span>
                      <h5 className="text-xs font-bold text-slate-200 group-hover:text-red-400 transition-colors line-clamp-2 leading-snug">
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
