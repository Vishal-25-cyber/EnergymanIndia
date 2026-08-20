import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'card' | 'badge' | 'minimal' | 'transparent';
  theme?: 'dark' | 'light';
  showSubtitle?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'transparent',
  theme = 'dark',
  showSubtitle = true,
}) => {
  // Height sizing
  const sizeClasses = {
    sm: 'h-8 sm:h-9',
    md: 'h-10 sm:h-11 md:h-12',
    lg: 'h-13 sm:h-15 md:h-16',
    xl: 'h-18 sm:h-20 md:h-24',
  };

  const isLight = theme === 'light';
  const textColor = isLight ? '#0F172A' : '#FFFFFF';
  const subtitleColor = '#E63946';
  const sinceColor = isLight ? '#64748B' : '#94A3B8';
  const yearColor = '#B91C1C';

  return (
    <div className={`inline-flex items-center select-none group transition-transform duration-300 ${className}`}>
      {/* Official Vector Logo based on Energyman Card Branding */}
      <svg
        viewBox="0 0 460 100"
        className={`${sizeClasses[size]} w-auto drop-shadow-md transition-all duration-300 group-hover:scale-[1.02]`}
        style={{ aspectRatio: '460/100' }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        shapeRendering="geometricPrecision"
        textRendering="geometricPrecision"
        aria-label="ENERGYMAN - Renewable Energy Saves Earth Logo (Since 2016)"
      >
        <defs>
          {/* Crimson Red Gradient */}
          <linearGradient id="em-crimson-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E63946" />
            <stop offset="50%" stopColor="#D91E36" />
            <stop offset="100%" stopColor="#9B111E" />
          </linearGradient>

          {/* Facet Light Gradient for Dark Backgrounds */}
          <linearGradient id="em-facet-light" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F1F5F9" />
          </linearGradient>

          {/* Facet Shaded Gradient */}
          <linearGradient id="em-facet-shaded" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </linearGradient>

          {/* Facet Red Gradient for Light Backgrounds */}
          <linearGradient id="em-facet-red-light" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E63946" />
            <stop offset="100%" stopColor="#B91C1C" />
          </linearGradient>

          <linearGradient id="em-facet-red-shaded" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9B111E" />
            <stop offset="100%" stopColor="#6A0D15" />
          </linearGradient>

          <clipPath id="em-badge-clip">
            <rect x="0" y="0" width="460" height="100" rx="14" ry="14" />
          </clipPath>
        </defs>

        {/* Optional Card/Badge Background */}
        {variant === 'card' && (
          <g clipPath="url(#em-badge-clip)">
            <rect x="0" y="0" width="460" height="100" fill="url(#em-crimson-grad)" />
            <rect x="1" y="1" width="458" height="98" rx="13" ry="13" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.3" />
          </g>
        )}

        {/* ── 01. Crystalline Faceted Triangle Icon Mark ── */}
        <g transform="translate(12, 16)">
          {/* Tier 1 (Top Peak) */}
          <polygon points="32,2 20,24 44,24" fill={isLight ? "url(#em-facet-red-light)" : "url(#em-facet-light)"} />

          {/* Tier 2 (Middle Layer) */}
          <polygon points="20,26 8,48 32,48" fill={isLight ? "url(#em-facet-red-light)" : "url(#em-facet-light)"} />
          <polygon points="20,26 44,26 32,48" fill={isLight ? "url(#em-facet-red-shaded)" : "url(#em-facet-shaded)"} opacity="0.9" />
          <polygon points="44,26 32,48 56,48" fill={isLight ? "url(#em-facet-red-light)" : "url(#em-facet-light)"} />

          {/* Tier 3 (Base Layer) */}
          <polygon points="8,50 -4,72 20,72" fill={isLight ? "url(#em-facet-red-light)" : "url(#em-facet-light)"} />
          <polygon points="8,50 32,50 20,72" fill={isLight ? "url(#em-facet-red-shaded)" : "url(#em-facet-shaded)"} opacity="0.9" />
          <polygon points="32,50 20,72 44,72" fill={isLight ? "url(#em-facet-red-light)" : "url(#em-facet-light)"} />
          <polygon points="32,50 56,50 44,72" fill={isLight ? "url(#em-facet-red-shaded)" : "url(#em-facet-shaded)"} opacity="0.9" />
          <polygon points="56,50 44,72 68,72" fill={isLight ? "url(#em-facet-red-light)" : "url(#em-facet-light)"} />
        </g>

        {/* ── 02. Vertical Divider Line ── */}
        <line
          x1="94"
          y1="16"
          x2="94"
          y2="84"
          stroke="#E63946"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* ── 03. Brand Typography ── */}
        {/* Main Wordmark: ENERGYMAN */}
        <text
          x="108"
          y="50"
          fontFamily="'Plus Jakarta Sans', 'Inter', system-ui, -apple-system, sans-serif"
          fontSize="38"
          fontWeight="900"
          letterSpacing="3"
          fill={variant === 'card' ? '#FFFFFF' : textColor}
        >
          ENERGYMAN
        </text>

        {/* Tagline: Renewable Energy Saves Earth */}
        {showSubtitle && (
          <text
            x="110"
            y="76"
            fontFamily="'Plus Jakarta Sans', 'Inter', system-ui, -apple-system, sans-serif"
            fontSize="14"
            fontWeight="700"
            letterSpacing="1.2"
            fill={variant === 'card' ? '#FEE2E2' : subtitleColor}
          >
            Renewable Energy Saves Earth
          </text>
        )}

        {/* ── 04. SINCE 2016 Heritage Mark ── */}
        <g transform="translate(378, 22)">
          {/* Subtle Heritage Divider */}
          <line x1="0" y1="0" x2="0" y2="58" stroke="rgba(230,57,70,0.3)" strokeWidth="1.5" />

          {/* SINCE */}
          <text
            x="14"
            y="20"
            fontFamily="'Plus Jakarta Sans', 'Inter', system-ui, -apple-system, sans-serif"
            fontSize="11"
            fontWeight="800"
            letterSpacing="2.5"
            fill={variant === 'card' ? '#FECDD3' : sinceColor}
          >
            SINCE
          </text>

          {/* 2016 */}
          <text
            x="14"
            y="48"
            fontFamily="'Plus Jakarta Sans', 'Inter', system-ui, -apple-system, sans-serif"
            fontSize="24"
            fontWeight="900"
            letterSpacing="1.5"
            fill={variant === 'card' ? '#FFFFFF' : yearColor}
          >
            2016
          </text>
        </g>
      </svg>
    </div>
  );
};

export default BrandLogo;
