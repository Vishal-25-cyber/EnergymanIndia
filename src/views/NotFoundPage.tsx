"use client";
import React from "react";
import Link from "next/link";
import { Sun, Home } from "lucide-react";
import { SEOHead } from "../components/common/SEOHead";

export const NotFoundPage: React.FC = () => {
  return (
    <div className="bg-[#0A0A0E] text-slate-100 min-h-screen">
      <SEOHead title="Page Not Found" />

      <section className="min-h-[75vh] flex items-center justify-center py-28 bg-[#0A0A0E] text-center relative overflow-hidden">
        <div className="site-container relative z-10 max-w-lg space-y-6">
          <div className="w-20 h-20 rounded-3xl bg-[#14101A] border border-red-900/30 flex items-center justify-center mx-auto shadow-xl">
            <Sun className="w-10 h-10 text-amber-400" />
          </div>

          <div className="space-y-2">
            <span className="text-4xl sm:text-6xl font-black text-red-500 font-mono">404</span>
            <h1 className="text-2xl font-black text-white">Solar Circuit Not Found</h1>
            <p className="text-xs sm:text-sm text-slate-400 font-normal">
              The page you are looking for might have been moved, renamed, or is temporarily disconnected.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link href="/" className="btn-primary py-3 px-6 text-xs sm:text-sm font-bold inline-flex items-center gap-2">
              <Home className="w-4 h-4" />
              <span>Back to Homepage</span>
            </Link>
            <Link href="/solutions" className="py-3 px-6 text-xs sm:text-sm font-bold rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-red-950/60 transition-all">
              Explore Solar Solutions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotFoundPage;
