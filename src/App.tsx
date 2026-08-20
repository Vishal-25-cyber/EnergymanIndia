import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { ScrollToTop } from "./components/layout/ScrollToTop";

// Pages
import { HomePage } from "./pages/HomePage";
import { SolutionsPage } from "./pages/SolutionsPage";
import { ResidentialSolarPage } from "./pages/solutions/ResidentialSolarPage";
import { CommercialSolarPage } from "./pages/solutions/CommercialSolarPage";
import { IndustrialSolarPage } from "./pages/solutions/IndustrialSolarPage";
import { AgriculturalSolarPage } from "./pages/solutions/AgriculturalSolarPage";
import { SolarEPCMaintenancePage } from "./pages/solutions/SolarEPCMaintenancePage";
import { EnergyStoragePage } from "./pages/solutions/EnergyStoragePage";

import { ProductsPage } from "./pages/ProductsPage";
import { ProductDetailPage } from "./pages/products/ProductDetailPage";

import { ProjectsPage } from "./pages/ProjectsPage";
import { ProjectDetailPage } from "./pages/projects/ProjectDetailPage";

import { GovernmentSubsidyPage } from "./pages/GovernmentSubsidyPage";
import { InsightsPage } from "./pages/InsightsPage";
import { BlogDetailPage } from "./pages/insights/BlogDetailPage";
import { GalleryPage } from "./pages/GalleryPage";
import { AboutPage } from "./pages/AboutPage";
import { TestimonialsPage } from "./pages/TestimonialsPage";
import { FAQPage } from "./pages/FAQPage";
import { ContactPage } from "./pages/ContactPage";
import { GetAQuotePage } from "./pages/GetAQuotePage";
import { NotFoundPage } from "./pages/NotFoundPage";

export const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-[#0A0A0E] text-slate-100 antialiased selection:bg-red-500 selection:text-white">
        {/* Global Sticky Glass Header */}
        <Navbar />

        {/* Dynamic Route Viewport */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            
            {/* Solutions Routes */}
            <Route path="/solutions" element={<SolutionsPage />} />
            <Route path="/solutions/residential" element={<ResidentialSolarPage />} />
            <Route path="/solutions/commercial" element={<CommercialSolarPage />} />
            <Route path="/solutions/industrial" element={<IndustrialSolarPage />} />
            <Route path="/solutions/agricultural" element={<AgriculturalSolarPage />} />
            <Route path="/solutions/epc-maintenance" element={<SolarEPCMaintenancePage />} />
            <Route path="/solutions/energy-storage" element={<EnergyStoragePage />} />

            {/* Products Routes */}
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:category" element={<ProductDetailPage />} />

            {/* Projects Routes */}
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/industrial" element={<ProjectsPage categoryFilter="industrial" />} />
            <Route path="/projects/commercial" element={<ProjectsPage categoryFilter="commercial" />} />
            <Route path="/projects/:id" element={<ProjectDetailPage />} />

            {/* Government Subsidy Hub */}
            <Route path="/government-subsidy" element={<GovernmentSubsidyPage />} />

            {/* Insights & Blog Routes */}
            <Route path="/insights" element={<InsightsPage />} />
            <Route path="/insights/:slug" element={<BlogDetailPage />} />

            {/* Company & Support Routes */}
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/get-a-quote" element={<GetAQuotePage />} />

            {/* 404 Route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        {/* Global Multi-Column Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
