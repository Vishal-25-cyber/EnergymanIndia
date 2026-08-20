export interface ProductSpec {
  name: string;
  value: string;
}

export interface ProductItem {
  id: string;
  slug: string;
  name: string;
  category: "solar-panels" | "inverters" | "solar-pumps" | "solar-water-heaters" | "energy-storage" | "other";
  categoryLabel: string;
  tagline: string;
  description: string;
  mainImage: string;
  galleryImages: string[];
  features: string[];
  specifications: ProductSpec[];
  applications: string[];
  warranty: string;
  certifications: string[];
  brochureAvailable: boolean;
}

export const productsData: ProductItem[] = [
  {
    id: "topcon-bifacial-panel",
    slug: "topcon-bifacial-panel",
    name: "N-Type TOPCon & Mono PERC Solar Panels (10Wp - 585Wp+)",
    category: "solar-panels",
    categoryLabel: "Solar Panels",
    tagline: "High-yield On-Grid, Off-Grid, Ground Mounted & Rooftop Solar Panels.",
    description: "Engineered for maximum power density in rooftop and ground installations. Full range of crystalline photovoltaic modules from 10Wp to 585Wp+ with high conversion efficiency, multi-busbar technology, and heavy-duty tempered glass.",
    mainImage: "https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1545208942-e1c9c916524b?auto=format&fit=crop&w=1200&q=80"
    ],
    features: [
      "Comprehensive Range: 10Wp to 585Wp+ High-Efficiency Solar Panels",
      "Compatible with On-Grid, Off-Grid & Hybrid Solar Systems",
      "Anti-reflective coated high-transmittance tempered glass",
      "IP68 Weatherproof Junction Box with MC4 connectors",
      "High mechanical durability (2400Pa wind / 5400Pa snow load)"
    ],
    specifications: [
      { name: "Power Range", value: "10Wp to 585Wp+" },
      { name: "Cell Chemistry", value: "N-Type TOPCon / Mono PERC / Polycrystalline" },
      { name: "System Types", value: "On-Grid, Off-Grid, Hybrid & Ground-Mounted" },
      { name: "Frame", value: "Anodized Aluminum Alloy" },
      { name: "Linear Degradation", value: "< 0.45% / Year" }
    ],
    applications: [
      "Industrial MW-Scale Rooftops",
      "Commercial Complex Rooftops",
      "Agricultural Ground Mount Plants",
      "Residential Home Net-Metering"
    ],
    warranty: "12-Year Product Warranty & 25-Year 84.8% Linear Performance Warranty",
    certifications: ["BIS IS 14286", "ALMM Enlisted", "IEC 61215", "IEC 61730"],
    brochureAvailable: true
  },
  {
    id: "solar-water-heater-etc-fpc",
    slug: "solar-water-heater-etc-fpc",
    name: "Solar Water Heaters (110L - 330L Domestic & Industrial)",
    category: "solar-water-heaters",
    categoryLabel: "Solar Water Heaters",
    tagline: "Mild steel glass-lined tanks with 50mm injected PUF insulation and non-welding technology.",
    description: "Reliable solar thermal solutions for domestic bathrooms, commercial hotels, and industrial boiler pre-heating. Featuring non-pressurized gravity-feed systems in tank volumes 110L, 165L, 220L, 275L, and 330L with mild steel glass-lined inner tanks, powder-coated outer finish, 50 mm PUF insulation, non-welding technology, silicon washers, and optional 2KW/3KW backup electrical heaters.",
    mainImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80"
    ],
    features: [
      "Tank Volumes: 110L, 165L, 220L, 275L, 330L & Custom Industrial",
      "Mild steel glass-lined inner tank for superior corrosion resistance",
      "High-durability powder-coated outer finish",
      "50 mm high-density PUF insulation keeps water hot for 48+ hours",
      "Non-welding joint technology and silicon washers prevent tank leakage",
      "Gravity feeding assistant tank configuration",
      "Optional 2KW / 3KW backup electrical heating element with thermostat"
    ],
    specifications: [
      { name: "Tank Capacities", value: "110L / 165L / 220L / 275L / 330L (Domestic) & up to 5,000L (Industrial)" },
      { name: "Inner Tank", value: "Mild Steel Glass-Lined Anti-Corrosive Inner Tank" },
      { name: "Outer Finish", value: "High-Grade Powder-Coated Outer Finish" },
      { name: "Insulation", value: "50 mm Injected CFC-Free PUF (Polyurethane Foam)" },
      { name: "Sealing Technology", value: "Non-Welding Joint Technology with Silicon Washers" },
      { name: "Feeding Mechanism", value: "Gravity Feeding / Assistant Tank" },
      { name: "Backup Electrical Heater", value: "Optional 2 kW / 3 kW Incoloy Heating Element" },
      { name: "Max Water Temp", value: "Up to 85°C" }
    ],
    applications: [
      "Domestic Residential Homes & Villas",
      "Hotels, Resorts & Guest Houses",
      "Hospitals & Hostel Dormitories",
      "Industrial Boiler Pre-heating & Textile Dyeing"
    ],
    warranty: "5-Year Comprehensive Warranty",
    certifications: ["BIS IS 12933", "MNRE Approved Specifications", "ISO 9001:2015"],
    brochureAvailable: true
  },
  {
    id: "solar-agricultural-pumps",
    slug: "solar-agricultural-pumps",
    name: "Open Well & Submersible Solar Pumps (1 Hp - 50 Hp)",
    category: "solar-pumps",
    categoryLabel: "Solar Pumps",
    tagline: "Bringing reliable water supply with stainless steel submersible & open well solar pumps.",
    description: "Empowering farmers and agriculture with reliable daylight water irrigation. High-discharge multi-stage stainless steel submersible and open-well pumps compatible with 1 Hp to 50 Hp motors, delivering continuous water flow from 100ft to 600ft+ depth.",
    mainImage: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1200&q=80"
    ],
    features: [
      "Motor Power Range: 1 Hp to 50 Hp",
      "Suitable for Open Well & Borewell Submersible Applications",
      "Reversible Polarity Protection",
      "Eligible for up to 60% PM-KUSUM subsidy",
      "High hydraulic discharge: up to 350,000 Liters per day",
      "Sensorless dry-run and water-table level protection"
    ],
    specifications: [
      { name: "Power Range", value: "1 Hp, 3 Hp, 5 Hp, 7.5 Hp, 10 Hp up to 50 Hp" },
      { name: "Pump Types", value: "Open Well Submersible & Multi-Stage Borewell Pumps" },
      { name: "Voltage Compatibility", value: "110 Volts to 440 Volts" },
      { name: "Protection", value: "Reversible Polarity & Dry Run Protection" },
      { name: "Pump Material", value: "Food-Grade SS304 / SS316 Stainless Steel" },
      { name: "Head Range", value: "30 Meters to 220 Meters (Up to 600+ Feet)" }
    ],
    applications: [
      "Agricultural Borewell & Open Well Irrigation",
      "PM-KUSUM Component-B & C Farms",
      "Horticulture, Coconut, Banana & Sugarcane Plantations",
      "Rural Water Supply & Farmhouses"
    ],
    warranty: "5-Year Complete System Warranty",
    certifications: ["MNRE Approved Specifications", "BIS IS 14220", "PM-KUSUM Empanelled"],
    brochureAvailable: true
  },
  {
    id: "solar-vfd-drives",
    slug: "solar-vfd-drives",
    name: "Solar VFD Drive Controllers (110V - 440V, 1Hp - 50Hp)",
    category: "inverters",
    categoryLabel: "Drives & Controllers",
    tagline: "Advanced VFD drive controllers with reversible polarity protection for 1Hp-50Hp pumps.",
    description: "High-performance Variable Frequency Drive (VFD) controllers with advanced MPPT algorithms for agricultural and industrial solar pump automation. Supports dual AC/DC input with automatic grid/genset bypass.",
    mainImage: "https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&w=1200&q=80"
    ],
    features: [
      "Wide Voltage Range: 110 Volts to 440 Volts",
      "Supports 1 Hp to 50 Hp Submersible & Surface Pumps",
      "Built-in Reversible Polarity Protection",
      "High tracking efficiency MPPT algorithm (> 99%)",
      "IP65 Weatherproof Lockable Outdoor Canopy"
    ],
    specifications: [
      { name: "Drive Input Voltage", value: "110V - 440V AC / DC" },
      { name: "Motor Rating", value: "1 Hp to 50 Hp" },
      { name: "MPPT Efficiency", value: "> 99%" },
      { name: "Protection Features", value: "Reversible Polarity, Overvoltage, Undervoltage, Dry-Run" },
      { name: "Telemetry", value: "GSM / GPRS Remote Mobile Monitoring" }
    ],
    applications: [
      "Agricultural Solar Water Pumping",
      "Industrial Booster Pump Control",
      "Micro-Irrigation Automation"
    ],
    warranty: "5-Year Warranty",
    certifications: ["MNRE Tested", "IEC 61800", "CE Compliant"],
    brochureAvailable: true
  },
  {
    id: "booster-pumps",
    slug: "booster-pumps",
    name: "Solar Booster Pumps & Pressurized Circulation Systems",
    category: "other",
    categoryLabel: "Booster Pumps",
    tagline: "Constant-pressure automatic solar booster pumps for multi-story villas and industrial boilers.",
    description: "Engineered constant-pressure booster pumps with pressure tanks, electronic flow switches, and high-efficiency motors for pressurized hot water delivery and industrial circulation.",
    mainImage: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80"
    ],
    features: [
      "Automatic constant pressure flow switch",
      "Compatible with solar water heater pressurized circuits",
      "Quiet operation with thermal overload protection",
      "Low power consumption with high hydraulic efficiency"
    ],
    specifications: [
      { name: "Motor Power", value: "0.5 Hp to 5.0 Hp" },
      { name: "Operating Pressure", value: "Up to 6 Bar" },
      { name: "Body Material", value: "Cast Iron / SS304 Impeller" },
      { name: "Liquid Temp", value: "Up to 90°C" }
    ],
    applications: [
      "Residential Villas & Multi-Story Homes",
      "Hotels, Resorts & Commercial Kitchens",
      "Boiler Feed & Solar Thermal Circulation"
    ],
    warranty: "2-Year Warranty",
    certifications: ["IS 8472", "CE Certified"],
    brochureAvailable: true
  },
  {
    id: "solar-street-lighting-bos",
    slug: "solar-street-lighting-bos",
    name: "Solar Street Lights & GI Powder Coated Installation Structures",
    category: "other",
    categoryLabel: "Street Lights & Structures",
    tagline: "Integrated All-in-One LED street lights and heavy-duty GI powder-coated panel mounting structures.",
    description: "Complete Balance of System (BOS) solar hardware. Includes self-contained All-In-One LED Solar Street Lights with PIR sensors, alongside factory pre-engineered GI Powder Coated Structures and Hot-Dip Galvanized (HDG) superstructures tested for 180 km/h wind resilience.",
    mainImage: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1200&q=80"
    ],
    features: [
      "All-in-One LED Solar Street Lights with PIR motion sensor",
      "Heavy-duty GI Powder Coated Structures for solar panel installation",
      "Elevated superstructures with under-panel walk clearance",
      "Cyclone wind load tested up to 180 km/h (IS 875 Part 3)",
      "Zero corrosion guarantee with 80-micron galvanizing"
    ],
    specifications: [
      { name: "Street Light Power", value: "20W, 40W, 60W, 90W, 120W LED" },
      { name: "Structure Finish", value: "GI Powder Coated / 80-Micron Hot-Dip Galvanized (HDG)" },
      { name: "Wind Load Rating", value: "Tested up to 180 km/h" },
      { name: "Mounting Types", value: "Ground Mounted, Rooftop Flush & Elevated Superstructure" }
    ],
    applications: [
      "Industrial Campus Perimeters & Roadways",
      "Textile Mill Rooftops with GI Superstructures",
      "Ground-Mount Solar Parks",
      "Farmhouse Pathways & Gated Communities"
    ],
    warranty: "5-Year Lighting Warranty; 25-Year Structural Integrity Warranty",
    certifications: ["IS 4759", "IS 875 Part 3", "IP66 Weatherproof"],
    brochureAvailable: true
  },
  {
    id: "lifepo4-energy-storage-rack",
    slug: "lifepo4-energy-storage-rack",
    name: "Containerized & Modular Energy Storage Systems (BESS)",
    category: "energy-storage",
    categoryLabel: "Energy Storage",
    tagline: "Leading Solar Energy Storage System & EPC Players in India.",
    description: "Utility-scale containerized Battery Energy Storage Systems (BESS) and commercial LiFePO4 rack systems for peak shaving, captive diesel generator replacement, and 24/7 continuous industrial power security.",
    mainImage: "https://images.unsplash.com/photo-1558441719-8b489c6340c4?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1558441719-8b489c6340c4?auto=format&fit=crop&w=1200&q=80"
    ],
    features: [
      "Utility-Scale Containerized BESS & Modular 19-inch Rack Units",
      "6,000+ Deep Cycles with Grade-A LiFePO4 chemistry",
      "Seamless 10ms UPS transfer during grid outages",
      "Integrated liquid cooling / active HVAC thermal management"
    ],
    specifications: [
      { name: "Capacity Options", value: "5.12 kWh Rack to 5+ MWh Containerized BESS" },
      { name: "Battery Chemistry", value: "Lithium Iron Phosphate (LiFePO4)" },
      { name: "Cycle Life", value: "≥ 6000 Cycles @ 80% DoD" },
      { name: "Telemetry", value: "Cloud SCADA with CAN Bus & RS485" }
    ],
    applications: [
      "Industrial Peak Shaving & TOU Tariff Arbitrage",
      "Microgrids & 100% Off-Grid Infrastructure",
      "Hospital & Data Center Critical Power"
    ],
    warranty: "10-Year Comprehensive Warranty",
    certifications: ["UN 38.3", "IEC 62619", "CE", "UL 1973"],
    brochureAvailable: true
  }
];
