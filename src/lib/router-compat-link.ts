import React, { useCallback, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { preloadRoute } from "./route-preloader";

export interface NextLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string | { pathname?: string; query?: Record<string, any> };
  prefetch?: boolean;
  replace?: boolean;
  scroll?: boolean;
  children?: React.ReactNode;
  className?: string;
  onMouseEnter?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  onTouchStart?: (e: React.TouchEvent<HTMLAnchorElement>) => void;
}

export function Link({
  href,
  prefetch = true,
  replace,
  scroll,
  children,
  onMouseEnter,
  onTouchStart,
  ...rest
}: NextLinkProps) {
  let targetTo = typeof href === "string" ? href : href?.pathname || "/";
  if (typeof href === "object" && href.query) {
    const params = new URLSearchParams(href.query);
    targetTo = `${targetTo}?${params.toString()}`;
  }

  const handlePrefetch = useCallback(() => {
    if (prefetch !== false) {
      preloadRoute(targetTo);
    }
  }, [targetTo, prefetch]);

  // Eager prefetch if link is mounted
  useEffect(() => {
    if (prefetch !== false) {
      handlePrefetch();
    }
  }, [handlePrefetch, prefetch]);

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    handlePrefetch();
    if (onMouseEnter) onMouseEnter(e);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLAnchorElement>) => {
    handlePrefetch();
    if (onTouchStart) onTouchStart(e);
  };

  return React.createElement(
    RouterLink,
    {
      to: targetTo,
      replace,
      onMouseEnter: handleMouseEnter,
      onTouchStart: handleTouchStart,
      ...rest,
    },
    children
  );
}

export default Link;

