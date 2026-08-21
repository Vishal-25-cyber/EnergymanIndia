export interface ProjectItem {
  id: string;
  slug: string;
  projectNumber: string;
  title: string;
  clientName: string;
  category: "industrial" | "agricultural" | "residential" | "commercial";
  categoryLabel: string;
  location: string;
  state: string;
  capacity: string;
  capacityNumber: number;
  capacityUnit: string;
  inverterType: string;
  mountingStructure?: string;
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
    id: "sri-balabagavathi-mills",
    slug: "sri-balabagavathi-mills",
    projectNumber: "PROJECT 01",
    title: "660 kW Rooftop Solar Solution with Hybrid Inverter",
    clientName: "Sri Balabagavathi Mills",
    category: "industrial",
    categoryLabel: "Industrial Solar",
    location: "Karumathampatti, Coimbatore",
    state: "Tamil Nadu",
    capacity: "660 kW",
    capacityNumber: 660,
    capacityUnit: "kW",
    inverterType: "High-Efficiency Hybrid Inverter with DG Sync",
    mountingStructure: "Custom Non-Penetrative Sheet Racking",
    annualGeneration: "990,000 kWh / Year",
    co2Offset: "812 Tons / Year",
    annualSavings: "₹84.15 Lakhs / Year",
    completionDate: "Commissioned",
    image: "https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&w=1400&q=80"
    ],
    challenge: "High HT industrial electricity tariffs and continuous spinning mill shift operations required stable, zero-interruption captive solar generation coupled with existing diesel generators.",
    solution: "Turnkey EPC installation of a 660 kW captive rooftop solar plant with advanced hybrid inverters, zero-export protection, and automated DG-PV power synchronizer.",
    technologyUsed: [
      "Tier-1 Mono PERC Bi-facial Solar Modules",
      "Industrial Hybrid Inverter with DG Synchronization",
      "Hot-Dip Galvanized (HDG) Wind-Rated Structure",
      "Cloud Telemetry SCADA with String Monitoring"
    ],
    results: [
      "Generates over 2,700+ units of clean electricity daily",
      "Significantly lowered peak grid demand penalties",
      "Substantial reduction in diesel generator running expenses"
    ],
    environmentalImpact: {
      co2PerYear: "812 Metric Tons",
      treesPlanted: "36,900 Trees equivalent",
      coalSaved: "330 Tons Coal Displaced"
    }
  },
  {
    id: "mr-palanisamy-banu-illam",
    slug: "mr-palanisamy-banu-illam",
    projectNumber: "PROJECT 02",
    title: "670 kW Rooftop Solar Solution with Hybrid Inverter",
    clientName: "Mr. Palanisamy — Banu Illam",
    category: "commercial",
    categoryLabel: "Commercial / Captive Solar",
    location: "Somanur, Coimbatore",
    state: "Tamil Nadu",
    capacity: "670 kW",
    capacityNumber: 670,
    capacityUnit: "kW",
    inverterType: "High-Capacity Hybrid Inverter System",
    mountingStructure: "Elevated Solar Superstructure",
    annualGeneration: "1,005,000 kWh / Year",
    co2Offset: "824 Tons / Year",
    annualSavings: "₹85.4 Lakhs / Year",
    completionDate: "Commissioned",
    image: "https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?auto=format&fit=crop&w=1400&q=80"
    ],
    challenge: "Maximizing rooftop area utilization while retaining rooftop accessibility and protecting the building infrastructure from high-velocity wind loads.",
    solution: "Engineered 670 kW solar array mounted on an elevated structural framework, delivering dual utility: massive clean electricity yield and rooftop weatherproofing.",
    technologyUsed: [
      "High-Yield Half-Cut Multi-Busbar Solar Panels",
      "Multi-MPPT Hybrid Inverter Unit",
      "Elevated HDG Superstructure Frame",
      "Surge Protection & Class-1 Earthing Network"
    ],
    results: [
      "1,005,000+ clean kWh delivered annually",
      "Protects facility rooftop from heat and UV degradation",
      "Complete net-metering synchrony with DISCOM grid"
    ],
    environmentalImpact: {
      co2PerYear: "824 Metric Tons",
      treesPlanted: "37,450 Trees equivalent",
      coalSaved: "335 Tons Coal Displaced"
    }
  },
  {
    id: "deivajothi-textiles",
    slug: "deivajothi-textiles",
    projectNumber: "PROJECT 03",
    title: "430 kW Rooftop Solar Solution with Hybrid Inverter",
    clientName: "Deivajothi Textiles",
    category: "industrial",
    categoryLabel: "Industrial Solar",
    location: "Somanur, Coimbatore",
    state: "Tamil Nadu",
    capacity: "430 kW",
    capacityNumber: 430,
    capacityUnit: "kW",
    inverterType: "Three-Phase Hybrid String Inverter",
    mountingStructure: "Aluminum Standing Seam Clamps",
    annualGeneration: "645,000 kWh / Year",
    co2Offset: "528 Tons / Year",
    annualSavings: "₹54.8 Lakhs / Year",
    completionDate: "Commissioned",
    image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1400&q=80"
    ],
    challenge: "Reducing soaring monthly commercial electricity expenditure across textile loom machinery while ensuring zero structural puncture on factory roofs.",
    solution: "430 kW captive solar engineering with high-efficiency hybrid inverter configuration and non-invasive standing-seam mounting.",
    technologyUsed: [
      "Mono PERC High-Density Solar Modules",
      "Decentralized Hybrid String Inverters",
      "Anodized Non-Penetrative Aluminum Mounting",
      "Real-time Mobile Monitoring Telemetry"
    ],
    results: [
      "Displaced 70% of peak daytime textile mill grid demand",
      "Zero roof leakage or penetration during installation",
      "Investment payback under 3.2 years"
    ],
    environmentalImpact: {
      co2PerYear: "528 Metric Tons",
      treesPlanted: "24,000 Trees equivalent",
      coalSaved: "215 Tons Coal Displaced"
    }
  },
  {
    id: "varun-exports",
    slug: "varun-exports",
    projectNumber: "PROJECT 04",
    title: "110 kW Rooftop Solar Solution with Hybrid Inverter",
    clientName: "Varun Exports",
    category: "commercial",
    categoryLabel: "Commercial Solar",
    location: "Somanur, Coimbatore",
    state: "Tamil Nadu",
    capacity: "110 kW",
    capacityNumber: 110,
    capacityUnit: "kW",
    inverterType: "High-Efficiency Hybrid Inverter",
    mountingStructure: "Flush Roof Racking System",
    annualGeneration: "165,000 kWh / Year",
    co2Offset: "135 Tons / Year",
    annualSavings: "₹14.0 Lakhs / Year",
    completionDate: "Commissioned",
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1400&q=80"
    ],
    challenge: "Optimizing export unit operational energy bills and meeting international green manufacturing compliance standards.",
    solution: "110 kW rooftop solar deployment engineered with hybrid inverter control, maximizing direct self-consumption and clean energy certification.",
    technologyUsed: [
      "Tier-1 Mono-crystalline Solar Panels",
      "Hybrid Inverter with Integrated Power Limiter",
      "Corrosion-Resistant HDG Strut Channel Framing",
      "Lightning Protection System"
    ],
    results: [
      "165,000 kWh clean electricity generated annually",
      "Elevated export facility green supply-chain ESG rating",
      "Immediate 65% reduction in daytime commercial power bills"
    ],
    environmentalImpact: {
      co2PerYear: "135 Metric Tons",
      treesPlanted: "6,100 Trees equivalent",
      coalSaved: "55 Tons Coal Displaced"
    }
  },
  {
    id: "green-cotton-mills",
    slug: "green-cotton-mills",
    projectNumber: "PROJECT 05",
    title: "105 kW Solar Solution with GI Superstructure",
    clientName: "Green Cotton Mills",
    category: "industrial",
    categoryLabel: "Industrial Solar",
    location: "Uthukuli, Tirupur",
    state: "Tamil Nadu",
    capacity: "105 kW",
    capacityNumber: 105,
    capacityUnit: "kW",
    inverterType: "Industrial Three-Phase String Inverter",
    mountingStructure: "Heavy-Duty Galvanized Iron (GI) Superstructure",
    annualGeneration: "157,500 kWh / Year",
    co2Offset: "129 Tons / Year",
    annualSavings: "₹13.4 Lakhs / Year",
    completionDate: "Commissioned",
    image: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=1400&q=80"
    ],
    challenge: "Elevated spinning equipment requires structural clearance on rooftop with high wind-load endurance in the Tirupur-Uthukuli textile belt.",
    solution: "105 kW solar plant installed on a custom heavy-duty GI Superstructure providing complete under-panel clearance and wind stability rated up to 160 km/h.",
    technologyUsed: [
      "High-Efficiency Mono PERC Solar Modules",
      "Heavy-Duty Galvanized Iron (GI) Superstructure",
      "Three-Phase On-Grid Smart Inverter",
      "Dual Earthing with Chemical Rods"
    ],
    results: [
      "Full rooftop clearance retained for operations",
      "157,500 units of self-generated green energy per year",
      "100% statutory clearance with CEIG inspection"
    ],
    environmentalImpact: {
      co2PerYear: "129 Metric Tons",
      treesPlanted: "5,800 Trees equivalent",
      coalSaved: "52 Tons Coal Displaced"
    }
  }
];
