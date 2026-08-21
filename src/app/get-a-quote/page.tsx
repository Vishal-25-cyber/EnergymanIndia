"use client";
import { Suspense } from "react";
import { GetAQuotePage } from "../../views/GetAQuotePage";

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0A0A0E]" />}>
      <GetAQuotePage />
    </Suspense>
  );
}
