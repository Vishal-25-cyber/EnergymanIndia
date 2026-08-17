import React from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import {
  ShieldCheck,
  CheckCircle2,
  Download,
  ArrowRight,
  Zap,
  Cpu,
  Layers,
  Phone,
  Award,
  ChevronRight
} from "lucide-react";
import { SEOHead } from "../../components/common/SEOHead";
import { ProductImageCarousel } from "../../components/common/ProductImageCarousel";
import { productsData } from "../../data/products";
import { companyData } from "../../data/company";

export const ProductDetailPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [searchParams] = useSearchParams();
  const itemSlug = searchParams.get("item");

  // Find product by slug or category
  const product =
    productsData.find((p) => p.slug === itemSlug) ||
    productsData.find((p) => p.category === category) ||
    productsData[0];

  const relatedProducts = productsData.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <>
      <SEOHead
        title={`${product.name} - Technical Specifications`}
        description={product.description}
      />

      {/* Breadcrumb Bar */}
      <section className="pt-28 pb-4 bg-brand-950 border-b border-slate-800/80">
        <div className="site-container flex items-center gap-2 text-xs text-slate-400">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/products" className="hover:text-white transition-colors">Products</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-200 font-semibold truncate max-w-xs">{product.name}</span>
        </div>
      </section>

      {/* Product Detail Section */}
      <section className="section-padding bg-brand-950">
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
                <span className="badge-emerald text-xs font-semibold">
                  {product.categoryLabel}
                </span>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                  {product.name}
                </h1>

                <p className="text-sm font-semibold text-energy-400">
                  {product.tagline}
                </p>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Warranty & Certification Badges */}
              <div className="p-4 rounded-2xl bg-brand-900/80 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-xs text-white font-bold">
                  <ShieldCheck className="w-4 h-4 text-energy-400 shrink-0" />
                  <span>Warranty: {product.warranty}</span>
                </div>
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {product.certifications.map((cert, cIdx) => (
                    <span key={cIdx} className="badge-slate text-[10px]">
                      {cert}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Features List */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Engineering Highlights:</p>
                <div className="space-y-1.5">
                  {product.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-energy-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-800">
                <Link
                  to={`/get-a-quote?product=${encodeURIComponent(product.name)}`}
                  className="btn-primary py-3.5 px-7 font-bold text-xs sm:text-sm flex-1 justify-center"
                >
                  Request Quotation / Pricing →
                </Link>

                <a
                  href={`https://wa.me/919443312890?text=Hello%20Energy%20Man%20India%2C%20I%20am%20interested%20in%20technical%20specs%20for%20${encodeURIComponent(product.name)}.`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary py-3.5 px-6 font-semibold text-xs sm:text-sm inline-flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-energy-400" />
                  <span>WhatsApp Inquire</span>
                </a>
              </div>
            </div>
          </div>

          {/* Technical Specifications Table */}
          <div className="bg-brand-900/80 backdrop-blur-md border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <Cpu className="w-6 h-6 text-energy-400" />
              <span>Full Electrical & Mechanical Specifications</span>
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm text-left divide-y divide-slate-800">
                <thead>
                  <tr className="text-slate-400 bg-brand-950/60 font-mono uppercase text-[11px]">
                    <th className="py-3.5 px-4 rounded-l-xl font-bold">Parameter / Test Condition</th>
                    <th className="py-3.5 px-4 rounded-r-xl font-bold">Factory Rating / Specification Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {product.specifications.map((spec, sIdx) => (
                    <tr key={sIdx} className="hover:bg-brand-850/60 transition-colors">
                      <td className="py-3 px-4 font-semibold text-slate-300">{spec.name}</td>
                      <td className="py-3 px-4 font-mono font-bold text-energy-400">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Related Products */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white">Related Renewable Energy Products</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <div key={p.id} className="p-5 rounded-3xl bg-brand-900/60 border border-slate-800 space-y-3">
                  <img src={p.mainImage} alt={p.name} className="w-full h-40 object-cover rounded-2xl" />
                  <h4 className="text-sm font-bold text-white line-clamp-1">{p.name}</h4>
                  <p className="text-xs text-slate-400 line-clamp-2">{p.tagline}</p>
                  <Link to={`/products/${p.category}?item=${p.slug}`} className="text-xs font-bold text-energy-400 hover:underline inline-flex items-center gap-1">
                    View Specs <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
