import React from "react";
import { Link } from "react-router-dom";
import { Sun, ArrowRight, Home, Search } from "lucide-react";
import { SEOHead } from "../components/common/SEOHead";

export const NotFoundPage: React.FC = () => {
  return (
    <>
      <SEOHead title="Page Not Found" />

      <section className="min-h-[75vh] flex items-center justify-center py-28 bg-brand-950 text-center relative overflow-hidden">
        <div className="site-container relative z-10 max-w-lg space-y-6">
          <div className="w-20 h-20 rounded-3xl bg-brand-900 border border-slate-800 flex items-center justify-center mx-auto shadow-2xl">
            <Sun className="w-10 h-10 text-solar-400" />
          </div>

          <div className="space-y-2">
            <span className="text-4xl sm:text-6xl font-black text-energy-400 font-mono">404</span>
            <h1 className="text-2xl font-bold text-white">Solar Circuit Not Found</h1>
            <p className="text-xs sm:text-sm text-slate-400">
              The page you are looking for might have been moved, renamed, or is temporarily disconnected.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link to="/" className="btn-primary py-3 px-6 text-xs sm:text-sm font-bold inline-flex items-center gap-2">
              <Home className="w-4 h-4" />
              <span>Back to Homepage</span>
            </Link>
            <Link to="/solutions" className="btn-secondary py-3 px-6 text-xs sm:text-sm font-semibold">
              Explore Solar Solutions
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
