"use client";
import React from "react";
import Link from "next/link";
import { ShieldCheck, CheckCircle2 } from "lucide-react";
import { ProductItem } from "../../data/products";

interface ProductCardProps {
  product: ProductItem;
  onOpenQuoteModal?: (productName: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="flex flex-col bg-[#14101A]/95 border border-red-900/30 rounded-3xl overflow-hidden hover:border-red-500/50 hover:shadow-2xl hover:shadow-black/70 transition-all duration-300 group shadow-md h-full justify-between">
      {/* Product Image Header */}
      <div>
        <div className="relative h-60 overflow-hidden bg-slate-900">
          <img
            src={product.mainImage}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#14101A] via-transparent to-transparent" />
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="badge-crimson text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md shadow-md">
              {product.categoryLabel}
            </span>
          </div>

          {/* Warranty Tag */}
          <div className="absolute bottom-3 left-4 right-4">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-200 bg-[#0A0A0E]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-red-950/60 w-fit shadow-md">
              <ShieldCheck className="w-3.5 h-3.5 text-red-400 shrink-0" />
              <span className="line-clamp-1">{product.warranty.split("&")[0]}</span>
            </div>
          </div>
        </div>

        {/* Product Body */}
        <div className="p-6 sm:p-7 space-y-4">
          <h3 className="text-lg font-black text-white group-hover:text-red-400 transition-colors line-clamp-2 leading-snug">
            {product.name}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed font-normal">
            {product.tagline}
          </p>

          {/* Key Feature Specs (First 3) */}
          <div className="space-y-1.5 pt-3 border-t border-red-950/60">
            {product.features.slice(0, 3).map((feat, fIdx) => (
              <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-300 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                <span className="line-clamp-1">{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-6 pt-0">
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-red-950/60">
          <Link
            href={`/products/${product.category}?item=${product.slug}`}
            className="py-2.5 px-3 text-xs font-bold justify-center text-center bg-slate-900 hover:bg-slate-800 text-slate-200 rounded-xl border border-red-950/60 transition-colors block"
          >
            View Specs
          </Link>

          <Link
            href={`/get-a-quote?product=${encodeURIComponent(product.name)}`}
            className="btn-primary py-2.5 px-3 text-xs font-bold justify-center text-center rounded-xl shadow-xs transition-colors block"
          >
            Request Quote
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
