import React from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Cpu,
  Phone,
  ChevronRight
} from "lucide-react";
import { SEOHead } from "../../components/common/SEOHead";
import { ProductImageCarousel } from "../../components/common/ProductImageCarousel";
import { productsData } from "../../data/products";

export const ProductDetailPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [searchParams] = useSearchParams();
  const itemSlug = searchParams.get("item");

  const product =
    productsData.find((p) => p.slug === itemSlug) ||
    productsData.find((p) => p.category === category) ||
    productsData[0];

  const relatedProducts = productsData.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="bg-[#0A0A0E] text-slate-100 min-h-screen">
      <SEOHead
        title={`${product.name} - Technical Specifications`}
        description={product.description}
      />

      {/* Breadcrumb Bar */}
      <section className="pt-28 pb-4 bg-[#0A0A0E] border-b border-red-950/60">
        <div className="site-container flex items-center gap-2 text-xs text-slate-400">
          <Link to="/" className="hover:text-red-400 transition-colors font-medium">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <Link to="/products" className="hover:text-red-400 transition-colors font-medium">Products</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-white font-bold truncate max-w-xs">{product.name}</span>
        </div>
      </section>

      {/* Product Detail Section */}
      <section className="section-padding bg-[#0A0A0E]">
        <div className="site-container space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left: Product Images with Thumbnails & Zoom (6 Cols on LG) */}
            <div className="lg:col-span-6">
              <ProductImageCarousel
                images={product.galleryImages}
                productName={product.name}
              />
            </div>

            {/* Right: Product Info & Actions (6 Cols on LG) */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-3">
                <span className="badge-crimson text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  {product.categoryLabel}
                </span>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">
                  {product.name}
                </h1>

                <p className="text-sm font-bold text-red-400">
                  {product.tagline}
                </p>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  {product.description}
                </p>
              </div>

              {/* Warranty & Certification Badges */}
              <div className="p-4 rounded-2xl bg-[#14101A]/95 border border-red-900/30 space-y-2 shadow-md">
                <div className="flex items-center gap-2 text-xs text-white font-bold">
                  <ShieldCheck className="w-4 h-4 text-red-400 shrink-0" />
                  <span>Warranty: {product.warranty}</span>
                </div>
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {product.certifications.map((cert, cIdx) => (
                    <span key={cIdx} className="bg-slate-900 border border-red-950/60 text-slate-300 text-[10px] font-semibold px-2.5 py-0.5 rounded-md">
                      {cert}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Features List */}
              <div className="space-y-2 pt-2 border-t border-red-950/60">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">Engineering Highlights:</p>
                <div className="space-y-1.5">
                  {product.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-300 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Action Buttons */}
              <div className="space-y-3 pt-4 border-t border-red-950/60">
                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    to={`/get-a-quote?product=${encodeURIComponent(product.name)}`}
                    className="btn-primary py-3.5 px-8 text-sm font-bold inline-flex items-center gap-2 flex-1 justify-center"
                  >
                    <span>Request Quotation</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <a
                    href="tel:+919842211910"
                    className="py-3.5 px-6 text-sm font-bold rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-red-950/60 inline-flex items-center gap-2 transition-all"
                  >
                    <Phone className="w-4 h-4 text-red-400" />
                    <span>Talk to Engineer</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Specifications Table */}
          <div className="bg-[#14101A]/95 border border-red-900/30 rounded-3xl p-6 sm:p-10 space-y-6 shadow-xl">
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <Cpu className="w-6 h-6 text-red-400" />
              <span>Full Technical Specifications</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3 divide-y md:divide-y-0 divide-slate-800 text-xs">
              {product.specifications.map((spec, idx) => (
                <div key={idx} className="flex justify-between py-2 border-b border-red-950/60">
                  <span className="text-slate-400 font-medium">{spec.name}:</span>
                  <span className="text-white font-bold text-right">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Related Products */}
          <div className="space-y-6">
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Complementary Solar Hardware
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/products/${rel.category}?item=${rel.slug}`}
                  className="p-5 rounded-2xl bg-[#14101A]/95 border border-red-900/30 hover:border-red-500/50 hover:shadow-xl transition-all duration-300 group block"
                >
                  <div className="h-40 rounded-xl overflow-hidden mb-3 bg-slate-900">
                    <img
                      src={rel.mainImage}
                      alt={rel.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors line-clamp-1">
                    {rel.name}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                    {rel.tagline}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetailPage;
