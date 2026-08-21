"use client";
import { Suspense } from "react";
import { ProductDetailPage } from "../../../views/products/ProductDetailPage";

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0A0A0E]" />}>
      <ProductDetailPage />
    </Suspense>
  );
}
