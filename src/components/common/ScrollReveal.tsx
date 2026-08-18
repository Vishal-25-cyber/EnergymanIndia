import React, { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: "slide-up" | "fade-in" | "zoom-in";
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  animation = "slide-up",
  delay = 0,
  duration = 700,
  className = "",
  threshold = 0.1,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  const getAnimationClasses = () => {
    if (!isVisible) return "opacity-0 translate-y-8";
    
    switch (animation) {
      case "slide-up":
        return "opacity-100 translate-y-0";
      case "fade-in":
        return "opacity-100";
      case "zoom-in":
        return "opacity-100 scale-100";
      default:
        return "opacity-100 translate-y-0";
    }
  };

  const getHiddenClasses = () => {
    switch (animation) {
      case "slide-up":
        return "opacity-0 translate-y-8";
      case "fade-in":
        return "opacity-0";
      case "zoom-in":
        return "opacity-0 scale-95";
      default:
        return "opacity-0 translate-y-8";
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-all ease-out will-change-transform ${
        isVisible ? getAnimationClasses() : getHiddenClasses()
      } ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};
