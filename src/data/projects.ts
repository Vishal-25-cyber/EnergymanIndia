export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  clientName: string;
  category: "industrial" | "agricultural" | "residential" | "commercial";
  categoryLabel: string;
  location: string;
  state: string;
  capacity: string;
  annualGeneration: string;
  co2Offset: string;
  annualSavings: string;
  completionDate: string;
  image: string;
  galleryImages: string[];
  challenge: string;
  solution: string;
  technologyUsed: string[];
  results: string[];
  environmentalImpact: {
    co2PerYear: string;
    treesPlanted: string;
    coalSaved: string;
  };
}

export const projectsData: ProjectItem[] = [
  {
    id: "industrial-spinning-mill-coimbatore",
    slug: "industrial-spinning-mill-coimbatore",
    title: "1.2 MW Captive Rooftop Solar Plant for Textile Spinning Facility",
    clientName: "Leading Textile & Yarn Manufacturer",
    category: "industrial",
    categoryLabel: "Industrial Solar",
    location: "Coimbatore Industrial Belt",
    state: "Tamil Nadu",
    capacity: "1,200 kWp (1.2 MW)",
    annualGeneration: "1,850,000 kWh / Year",
    co2Offset: "1,517 Tons / Year",
    annualSavings: "₹1.48 Crore / Year",
    completionDate: "Q3 2024",
    image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1400&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1400&q=80"
    ],
    challenge: "The spinning mill operated on 24/7 continuous operations with high HT tariff costs (approx. ₹8.50/unit) and heavy peak demand charges. The metal sheet roof had varied azimuth orientations and required zero downtime to continuous production during EPC execution.",
    solution: "Energy Man India engineered a customized 1.2 MW multi-roof array using Tier-1 N-Type TOPCon 580Wp bi-facial modules and decentralized high-voltage string inverters with integrated DG-PV hybrid synchronization. Non-penetrative standing seam clamps preserved the roof warranty.",
    technologyUsed: [
      "2,070 x TOPCon Bi-facial 580Wp Solar Modules",
      "12 x 100kW Multi-MPPT Three-Phase Inverters",
      "Standing-Seam Anodized Aluminum Rail Racking",
      "Fiber-optic SCADA with Centralized Weather Station",
      "Zero-Export & DG Hybrid Power Management Controller"
    ],
    results: [
      "Generates over 5,000 units of clean electricity daily",
      "Reduced plant daytime grid power dependence by 68%",
      "Payback period achieved in under 3.1 years",
      "Availing 40% Accelerated Depreciation tax write-off"
    ],
    environmentalImpact: {
      co2PerYear: "1,517 Metric Tons",
      treesPlanted: "69,000 Trees equivalent",
      coalSaved: "620 Tons of Coal burnt"
    }
  },
  {
    id: "agricultural-kusum-farm-dindigul",
    slug: "agricultural-kusum-farm-dindigul",
    title: "10 HP Solar Submersible Agricultural Pumping & Micro-Irrigation Network",
    clientName: "Commercial Coconut & Banana Plantation",
    category: "agricultural",
    categoryLabel: "Agricultural Solar",
    location: "Palani / Dindigul Agricultural Belt",
    state: "Tamil Nadu",
    capacity: "10 HP (9.6 kWp PV Array)",
    annualGeneration: "15,800 kWh / Year",
    co2Offset: "13.2 Tons / Year",
    annualSavings: "₹2.90 Lakhs Diesel & Maintenance Savings",
    completionDate: "Q1 2025",
    image: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1400&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1400&q=80"
    ],
    challenge: "The 35-acre farm struggled with erratic 3-phase agricultural grid electricity, often supplied during midnight hours. Running a 15 HP diesel genset caused exorbitant fuel expenditure and frequent mechanical breakdowns during peak irrigation seasons.",
    solution: "Turnkey installation of a 10 HP Stainless Steel Solar Submersible Pump with a dedicated 9.6 kWp Mono PERC solar array mounted on heavy-duty seasonal tracking structures, coupled with an intelligent Vector MPPT controller.",
    technologyUsed: [
      "18 x 540Wp Mono PERC High-Yield Solar Panels",
      "10 HP SS304 Multi-Stage Submersible Pump (Head 120m)",
      "High-Efficiency Vector Control MPPT VFD with Dry-Run Sensor",
      "Dual-Axis Seasonal Adjustable HDG Structure",
      "GSM Remote Starter with Farmer Mobile App"
    ],
    results: [
      "Delivers reliable daily discharge of 180,000+ Litres from 350ft depth",
      "100% elimination of diesel generator fuel consumption",
      "Irrigation automated during sunny daylight hours",
      "Government PM-KUSUM subsidy availed smoothly"
    ],
    environmentalImpact: {
      co2PerYear: "13.2 Metric Tons",
      treesPlanted: "620 Trees equivalent",
      coalSaved: "5,800 Litres of Diesel eliminated annually"
    }
  },
  {
    id: "commercial-hospital-campus-salem",
    slug: "commercial-hospital-campus-salem",
    title: "350 kWp Rooftop Solar EPC with Uninterrupted Hospital Critical Load Sync",
    clientName: "Multi-Specialty Healthcare Campus",
    category: "commercial",
    categoryLabel: "Commercial Solar",
    location: "Salem",
    state: "Tamil Nadu",
    capacity: "350 kWp",
    annualGeneration: "540,000 kWh / Year",
    co2Offset: "442 Tons / Year",
    annualSavings: "₹45.9 Lakhs / Year",
    completionDate: "Q2 2024",
    image: "https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=1400&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1400&q=80"
    ],
    challenge: "Hospitals require 100% power reliability for ICUs, surgical theatres, and diagnostic scans. The management needed to dramatically curb soaring daytime air conditioning power bills while ensuring zero electrical harmonic interference or surge risks.",
    solution: "Engineered a low-THD (< 2%) 350 kWp elevated rooftop solar system with integrated Class I+II surge arresters, dual-redundant inverters, and full synchronization with the hospital's central backup generators.",
    technologyUsed: [
      "605 x 580Wp TOPCon Bi-facial Solar Modules",
      "4 x 80kW Smart On-Grid Commercial Inverters",
      "Elevated 2.5m Hot-Dip Galvanized Superstructures (Walkable Terrace)",
      "Low Harmonic Active Filtering & CEIG Class A Earthing Grid"
    ],
    results: [
      "Supplies 55% of total daytime hospital energy requirements",
      "Protects sensitive medical diagnostics with ultra-clean pure sine wave power",
      "Recovered initial capital investment in 3.4 years",
      "Reduced ambient top-floor heat by 3.5°C due to rooftop panel shade"
    ],
    environmentalImpact: {
      co2PerYear: "442 Metric Tons",
      treesPlanted: "20,500 Trees equivalent",
      coalSaved: "180 Tons of Coal"
    }
  },
  {
    id: "residential-luxury-villa-pollachi",
    slug: "residential-luxury-villa-pollachi",
    title: "10 kWp Hybrid Net-Metered Rooftop Solar with Lithium Battery Backup",
    clientName: "Architectural Eco-Villa Residence",
    category: "residential",
    categoryLabel: "Residential Solar",
    location: "Pollachi",
    state: "Tamil Nadu",
    capacity: "10 kWp (with 15 kWh LiFePO4 Storage)",
    annualGeneration: "15,200 kWh / Year",
    co2Offset: "12.4 Tons / Year",
    annualSavings: "₹1.35 Lakhs / Year (Net Zero Bill)",
    completionDate: "Q4 2024",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1545208942-e1c9c916524b?auto=format&fit=crop&w=1400&q=80"
    ],
    challenge: "The homeowner wanted a zero-emission luxury home with 100% energy self-sufficiency, capable of powering central ACs and an electric vehicle (EV) even during suburban grid load shedding.",
    solution: "Installed an aesthetic all-black 10 kWp solar array paired with a 10kW Hybrid Inverter and 15 kWh modular LiFePO4 rack battery system with bidirectional net metering.",
    technologyUsed: [
      "18 x 555Wp Monocrystalline PERC All-Weather Panels",
      "10kW Three-Phase Hybrid Smart Inverter",
      "15 kWh LiFePO4 Energy Storage Bank (3 x 5kWh Modules)",
      "Dedicated 7.4kW EV Smart Wallbox Charger"
    ],
    results: [
      "Electricity bill reduced to zero (Net-Zero Energy Home)",
      "Uninterrupted 24/7 power backup with instantaneous transfer",
      "Received ₹78,000 direct subsidy under PM Surya Ghar",
      "Complete home energy flows tracked via smartphone app"
    ],
    environmentalImpact: {
      co2PerYear: "12.4 Metric Tons",
      treesPlanted: "580 Trees equivalent",
      coalSaved: "5.1 Tons of Coal"
    }
  },
  {
    id: "commercial-educational-institution-tirupur",
    slug: "commercial-educational-institution-tirupur",
    title: "200 kWp Green Campus Solar Initiative for Engineering College",
    clientName: "Accredited Technical Institute",
    category: "commercial",
    categoryLabel: "Commercial Solar",
    location: "Tirupur",
    state: "Tamil Nadu",
    capacity: "200 kWp",
    annualGeneration: "310,000 kWh / Year",
    co2Offset: "254 Tons / Year",
    annualSavings: "₹26.5 Lakhs / Year",
    completionDate: "Q1 2024",
    image: "https://images.unsplash.com/photo-1545208942-e1c9c916524b?auto=format&fit=crop&w=1400&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1545208942-e1c9c916524b?auto=format&fit=crop&w=1400&q=80"
    ],
    challenge: "High daytime operational load across computer laboratories, workshops, and administrative blocks resulting in heavy monthly electric expenses.",
    solution: "Engineered 200 kWp rooftop solar plant across 3 academic blocks with elevated pergola structures, creating shaded student study zones beneath the solar arrays.",
    technologyUsed: [
      "360 x 555Wp Mono PERC Tier-1 Modules",
      "4 x 50kW Multi-MPPT On-Grid Inverters",
      "Custom Architectural Elevated Solar Pergola Structure",
      "Campus Display Dashboard showing real-time clean power generated"
    ],
    results: [
      "Campus runs 80% on clean solar during class hours",
      "Helped college attain NAAC 'A++' Green Campus certification",
      "Annual recurring budget savings of ₹26.5 Lakhs reinvested into research"
    ],
    environmentalImpact: {
      co2PerYear: "254 Metric Tons",
      treesPlanted: "11,800 Trees equivalent",
      coalSaved: "105 Tons of Coal"
    }
  },
  {
    id: "industrial-agro-cold-storage-erode",
    slug: "industrial-agro-cold-storage-erode",
    title: "500 kWp Captive Solar EPC for Turmeric & Agro Cold Storage Facility",
    clientName: "Agro Commodities Logistics Hub",
    category: "industrial",
    categoryLabel: "Industrial Solar",
    location: "Erode",
    state: "Tamil Nadu",
    capacity: "500 kWp",
    annualGeneration: "780,000 kWh / Year",
    co2Offset: "640 Tons / Year",
    annualSavings: "₹66.3 Lakhs / Year",
    completionDate: "Q3 2024",
    image: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1400&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1400&q=80"
    ],
    challenge: "Compressors in cold storage units run continuously during hot daytime peaks, leading to huge electricity bills and high tariff penalties during maximum demand spikes.",
    solution: "Installed 500 kWp high-efficiency solar plant on the cold storage warehouse roof, precisely matching daytime refrigeration thermal loads.",
    technologyUsed: [
      "865 x 580Wp TOPCon Modules",
      "5 x 100kW On-Grid Smart Inverters",
      "Zero-Export Controller & Automatic Power Factor Correction (APFC) Tuning"
    ],
    results: [
      "Direct offset of daytime refrigeration peak consumption",
      "Reduced monthly power bill by 62%",
      "Payback period of only 2.9 years"
    ],
    environmentalImpact: {
      co2PerYear: "640 Metric Tons",
      treesPlanted: "29,500 Trees equivalent",
      coalSaved: "260 Tons of Coal"
    }
  }
];
