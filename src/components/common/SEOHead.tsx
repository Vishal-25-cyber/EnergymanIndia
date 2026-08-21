"use client";
import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
}

export const SEOHead = ({
  title,
  description = "Energyman Power Technologies (India) Pvt. Ltd. - Premier engineering solar solutions for residential rooftops, industrial facilities, and agricultural farms.",
  keywords = "solar energy india, solar rooftop, PM Surya Ghar subsidy, solar pumps, industrial solar EPC, coimbatore solar company, energyman india",
  ogImage = "https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?auto=format&fit=crop&w=1200&q=80"
}: SEOHeadProps) => {
  useEffect(() => {
    document.title = `${title} | Energy Man India`;
    
    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", description);
    } else {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      metaDesc.setAttribute("content", description);
      document.head.appendChild(metaDesc);
    }

    // Update OG title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute("content", `${title} | Energy Man India`);
    }

    // Update OG description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute("content", description);
    }

    // Update OG image
    let ogImgTag = document.querySelector('meta[property="og:image"]');
    if (ogImgTag) {
      ogImgTag.setAttribute("content", ogImage);
    }
  }, [title, description, keywords, ogImage]);

  return null;
};
