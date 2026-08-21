"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export const NavigationProgressBar: React.FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isNavigating, setIsNavigating] = useState(false);
  const [progress, setProgress] = useState(0);

  // When route changes, complete the progress bar smoothly
  useEffect(() => {
    setIsNavigating(false);
    setProgress(100);
    const timer = setTimeout(() => {
      setProgress(0);
    }, 300);
    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  // Intercept click on internal links to start progress instantly
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (
        target &&
        target.href &&
        target.href.startsWith(window.location.origin) &&
        !target.getAttribute("target") &&
        !target.getAttribute("download") &&
        target.pathname !== window.location.pathname
      ) {
        setIsNavigating(true);
        setProgress(30);
        setTimeout(() => setProgress(70), 150);
      }
    };

    document.addEventListener("click", handleLinkClick, { passive: true });
    return () => document.removeEventListener("click", handleLinkClick);
  }, []);

  if (progress === 0 && !isNavigating) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[100] h-[3px] pointer-events-none transition-all duration-300 ease-out"
      style={{
        width: `${progress}%`,
        opacity: progress === 100 ? 0 : 1,
        background: "linear-gradient(90deg, #DC2626 0%, #FB7185 50%, #FBBF24 100%)",
        boxShadow: "0 0 10px rgba(220, 38, 38, 0.7), 0 0 5px rgba(251, 191, 36, 0.5)",
      }}
    />
  );
};
