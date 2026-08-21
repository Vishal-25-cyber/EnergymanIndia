import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Suspense } from "react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { ScrollToTop } from "../components/layout/ScrollToTop";
import { NavigationProgressBar } from "../components/layout/NavigationProgressBar";

export const metadata: Metadata = {
  metadataBase: new URL("https://energymanindia.in"),
  title: "Energy Man India | Premium Solar & Renewable Energy Engineering Solutions",
  description:
    "Energyman Power Technologies India - Leading engineering-grade solar solutions for homes, businesses, agriculture, and industries. MNRE Channel Partner & PM Surya Ghar Subsidy Provider.",
  keywords:
    "solar energy india, solar rooftop, PM Surya Ghar subsidy, solar pumps, industrial solar EPC, coimbatore solar company, energyman india",
  openGraph: {
    type: "website",
    title: "Energy Man India | Renewable Energy Saves Earth",
    description:
      "Commercial, Industrial, Agricultural & Residential Solar EPC Solutions. MNRE Subsidy Partner.",
    images: ["/logo.svg"],
    url: "https://energymanindia.in",
  },
};

export const viewport: Viewport = {
  themeColor: "#08502A",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#0A0A0E] text-slate-100 antialiased selection:bg-red-500 selection:text-white min-h-screen flex flex-col">
        <Suspense fallback={null}>
          <NavigationProgressBar />
        </Suspense>
        <ScrollToTop />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
