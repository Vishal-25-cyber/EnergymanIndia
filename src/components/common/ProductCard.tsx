import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Download, CheckCircle2 } from "lucide-react";
import { ProductItem } from "../../data/products";

interface ProductCardProps {
  product: ProductItem;
  onOpenQuoteModal?: (productName: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenQuoteModal }) => {
  return (
    <div className="flex flex-col bg-brand-900/75 backdrop-blur-md border border-slate-800 rounded-3xl overflow-hidden hover:border-energy-500/40 hover:shadow-2xl hover:shadow-energy-500/10 transition-all duration-300 group">
      {/* Product Image Header */}
      <div className="relative h-60 overflow-hidden bg-brand-950">
        <img
          src={product.mainImage}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/30 to-transparent" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="badge-emerald text-xs font-semibold shadow-md">
            {product.categoryLabel}
          </span>
        </div>

        {/* Warranty Tag */}
        <div className="absolute bottom-3 left-4 right-4">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-300 bg-brand-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 w-fit">
            <ShieldCheck className="w-3.5 h-3.5 text-energy-400 shrink-0" />
            <span className="line-clamp-1">{product.warranty.split("&")[0]}</span>
          </div>
        </div>
      </div>

      {/* Product Body */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-white group-hover:text-energy-400 transition-colors line-clamp-2 leading-snug">
            {product.name}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 line-clamp-2 leading-relaxed">
            {product.tagline}
          </p>

          {/* Key Feature Specs (First 3) */}
          <div className="space-y-1.5 pt-3 border-t border-slate-800">
            {product.features.slice(0, 3).map((feat, fIdx) => (
              <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-energy-400 shrink-0 mt-0.5" />
                <span className="line-clamp-1">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-2 border-t border-slate-800/80">
          <div className="grid grid-cols-2 gap-2">
            <Link
              to={`/products/${product.category}?item=${product.slug}`}
              className="btn-secondary py-2.5 px-3 text-xs font-semibold justify-center text-center"
            >
              View Specs
            </Link>

            <Link
              to={`/get-a-quote?product=${encodeURIComponent(product.name)}`}
              className="btn-primary py-2.5 px-3 text-xs font-bold justify-center text-center"
            >
              Request Quote
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
