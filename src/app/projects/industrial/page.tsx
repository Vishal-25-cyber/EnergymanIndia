"use client";
import { Suspense } from "react";
import { ProjectsPage } from "../../../views/ProjectsPage";

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0A0A0E]" />}>
      <ProjectsPage categoryFilter="industrial" />
    </Suspense>
  );
}
