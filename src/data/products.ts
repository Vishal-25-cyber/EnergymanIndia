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
    name: "N-Type TOPCon Dual-Glass Bi-Facial Solar Module (585Wp - 620Wp)",
    category: "solar-panels",
    categoryLabel: "Solar Panels",
    tagline: "High-density N-Type cell architecture with up to 25% additional rear-side energy yield.",
    description: "Engineered for maximum power density in rooftop and ground installations. The Dual-Glass N-Type TOPCon module features zero Light Induced Degradation (LID), superior low-light performance on overcast days, and industry-leading temperature coefficient for hot Indian climates.",
    mainImage: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1545208942-e1c9c916524b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80"
    ],
    features: [
      "Module Efficiency up to 22.8% with 16BB Multi-Busbar Technology",
      "Bi-faciality Factor > 80% (up to 25% additional power from reflected albedo)",
      "Zero Light Induced Degradation (LID / LeTID)",
      "Ultra-low Temperature Coefficient of -0.30%/°C for maximum summer yield",
      "Dual 2.0mm Semi-Tempered Glass for superior mechanical strength (5400Pa snow / 2400Pa wind)",
      "IP68 Weatherproof Junction Box with original MC4-EVO2 connectors"
    ],
    specifications: [
      { name: "Nominal Power (Pmax)", value: "585W - 620Wp" },
      { name: "Module Efficiency", value: "22.8%" },
      { name: "Cell Type", value: "N-Type Monocrystalline TOPCon (182mm / 210mm)" },
      { name: "Open Circuit Voltage (Voc)", value: "51.80 V" },
      { name: "Short Circuit Current (Isc)", value: "14.25 A" },
      { name: "Max Power Voltage (Vmp)", value: "43.20 V" },
      { name: "Max Power Current (Imp)", value: "13.55 A" },
      { name: "Dimensions", value: "2278 x 1134 x 30 mm" },
      { name: "Weight", value: "31.5 kg (Dual Glass)" }
    ],
    applications: [
      "Industrial MW-Scale Rooftops",
      "Commercial Complex Rooftops",
      "Agricultural Ground Mount Plants",
      "Premium Residential Villa Rooftops"
    ],
    warranty: "15-Year Product Workmanship Warranty & 30-Year 87.4% Linear Power Output Warranty",
    certifications: ["BIS (Bureau of Indian Standards)", "ALMM (Approved List of Module Manufacturers)", "IEC 61215", "IEC 61730", "IEC 61701 (Salt Mist)"],
    brochureAvailable: true
  },
  {
    id: "mono-perc-halfcut-panel",
    slug: "mono-perc-halfcut-panel",
    name: "Mono PERC 144 Half-Cut Solar Module (540Wp - 555Wp)",
    category: "solar-panels",
    categoryLabel: "Solar Panels",
    tagline: "Proven high-efficiency monocrystalline solar panels optimized for residential and commercial rooftops.",
    description: "The workhorse of Indian solar installations. High-transmittance AR coated glass combined with half-cut cell technology significantly reduces internal resistance losses and enhances performance under partial shading conditions.",
    mainImage: "https://images.unsplash.com/photo-1545208942-e1c9c916524b?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1545208942-e1c9c916524b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80"
    ],
    features: [
      "High module conversion efficiency up to 21.4%",
      "Half-cut cell design minimizes hotspot risks and shadow losses",
      "PID resistant encapsulation technology",
      "Anodized aluminum alloy frame for high mechanical durability",
      "Positive power tolerance of 0 ~ +5W",
      "Compatible with all standard on-grid and hybrid string inverters"
    ],
    specifications: [
      { name: "Nominal Power (Pmax)", value: "540W - 555Wp" },
      { name: "Module Efficiency", value: "21.4%" },
      { name: "Cell Configuration", value: "144 (6 x 24) Half-Cells" },
      { name: "Open Circuit Voltage (Voc)", value: "49.60 V" },
      { name: "Short Circuit Current (Isc)", value: "13.86 A" },
      { name: "Dimensions", value: "2279 x 1134 x 35 mm" },
      { name: "Weight", value: "28.5 kg" }
    ],
    applications: [
      "PM Surya Ghar Residential Rooftops",
      "Commercial Building Terraces",
      "Educational Institutes & Hospitals"
    ],
    warranty: "12-Year Product Warranty & 25-Year 84.8% Linear Performance Warranty",
    certifications: ["BIS Certified", "ALMM Enlisted", "IEC 61215", "IEC 61730", "ISO 9001"],
    brochureAvailable: true
  },
  {
    id: "three-phase-ongrid-inverter",
    slug: "three-phase-ongrid-inverter",
    name: "Industrial & Commercial Three-Phase Smart On-Grid String Inverter (10kW - 110kW)",
    category: "inverters",
    categoryLabel: "Inverters",
    tagline: "High-efficiency grid-tied inverter with multi-MPPT trackers and integrated AFCI safety.",
    description: "Designed for commercial, institutional, and industrial solar plants. Featuring up to 9/10 independent MPPT trackers with 150% DC oversizing capability, smart IV curve scanning, and integrated Arc Fault Circuit Interruption (AFCI) to prevent electrical fires.",
    mainImage: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1558441719-8b489c6340c4?auto=format&fit=crop&w=1200&q=80"
    ],
    features: [
      "Max Efficiency 98.8% (Euro Efficiency 98.4%)",
      "Multi-MPPT design (up to 10 MPPTs) for complex roof orientations",
      "Wide MPPT operating voltage range (180V - 1000V)",
      "Smart I-V Curve diagnosis for string-level fault pinpointing",
      "Built-in Type II DC & AC Surge Protection Devices",
      "IP66 ingress protection with fan-less / smart forced air cooling",
      "Wi-Fi / 4G / RS485 connectivity for real-time cloud SCADA telemetry"
    ],
    specifications: [
      { name: "Rated AC Output Power", value: "10 kW to 110 kW" },
      { name: "Max DC Input Voltage", value: "1100 V" },
      { name: "MPPT Operating Range", value: "180 V - 1000 V" },
      { name: "Max Efficiency", value: "98.8%" },
      { name: "THDi", value: "< 3% at rated power" },
      { name: "Cooling", value: "Smart Forced Air / Natural Convection" },
      { name: "Protection Degree", value: "IP66" }
    ],
    applications: [
      "Commercial Shopping Malls & Office Towers",
      "Textile & Manufacturing Factories",
      "Educational Campuses",
      "Hospitals & Healthcare Facilities"
    ],
    warranty: "5-Year Standard Warranty (Extendable to 10 / 15 Years)",
    certifications: ["CEA Technical Standards", "IEC 62109-1/2", "IEC 61727", "IEC 62116", "IS 16221 / IS 16169"],
    brochureAvailable: true
  },
  {
    id: "single-phase-residential-inverter",
    slug: "single-phase-residential-inverter",
    name: "Residential Single-Phase Smart String Inverter (3kW - 6kW)",
    category: "inverters",
    categoryLabel: "Inverters",
    tagline: "Compact, whisper-quiet rooftop inverter with dual MPPTs and mobile app monitoring.",
    description: "Tailor-made for Indian homes under the PM Surya Ghar scheme. Whisper-quiet natural cooling (< 25dB), lightweight wall-mounted design, dual MPPT inputs for split east-west roof orientations, and instant Wi-Fi pairing for smartphone generation tracking.",
    mainImage: "https://images.unsplash.com/photo-1558441719-8b489c6340c4?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1558441719-8b489c6340c4?auto=format&fit=crop&w=1200&q=80"
    ],
    features: [
      "Dual MPPT trackers for maximum roof flexibility",
      "High conversion efficiency of 97.8%",
      "Ultra-low start-up voltage of 70V for early morning energy harvest",
      "Zero noise natural convection cooling",
      "Integrated DC switch and Type II SPD",
      "Direct iOS & Android mobile monitoring app"
    ],
    specifications: [
      { name: "Rated AC Output", value: "3.3 kW / 5 kW / 6 kW" },
      { name: "Max DC Input Voltage", value: "600 V" },
      { name: "MPPT Channels", value: "2 Independent Trackers" },
      { name: "Max Input Current per MPPT", value: "16 A" },
      { name: "Weight", value: "10.5 kg" },
      { name: "Ingress Rating", value: "IP65 Weatherproof" }
    ],
    applications: [
      "Residential Homes under PM Surya Ghar",
      "Small Commercial Outlets & Clinics",
      "Villas & Individual Bungalows"
    ],
    warranty: "5-Year Comprehensive Replacement Warranty (10-Year Option)",
    certifications: ["MNRE Compliant", "IEC 62109", "IEC 61727", "BIS Certified"],
    brochureAvailable: true
  },
  {
    id: "solar-submersible-pump-system",
    slug: "solar-submersible-pump-system",
    name: "Heavy-Duty Agricultural Solar Submersible Water Pump (3HP - 10HP+)",
    category: "solar-pumps",
    categoryLabel: "Solar Pumps",
    tagline: "High-discharge stainless steel solar pump set with intelligent Vector MPPT VFD controller.",
    description: "Engineered specifically for agricultural irrigation from deep borewells. Our solar submersible pumps feature 100% SS304/SS316 stainless steel impellers, water-filled submersible motors, and high-efficiency MPPT variable frequency drives that deliver steady water flow from dawn to dusk without burning diesel.",
    mainImage: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80"
    ],
    features: [
      "Eligible for up to 60% subsidy under Central & State PM-KUSUM Scheme",
      "High hydraulic discharge: up to 350,000 Liters per day",
      "Handles deep heads up to 600+ Feet (180+ Meters)",
      "Sensorless dry-run and water-table level protection",
      "Heavy-duty seasonal dual-axis adjustable tracker mounting",
      "Remote telemetry with GSM mobile pump ON/OFF control and SMS alerts"
    ],
    specifications: [
      { name: "Power Range", value: "3 HP, 5 HP, 7.5 HP, 10 HP to 20 HP" },
      { name: "Pump Type", value: "Multi-Stage Stainless Steel Submersible (SS304/SS316)" },
      { name: "Motor Type", value: "Permanent Magnet BLDC / Water-Filled AC Induction" },
      { name: "Head Range", value: "30 Meters to 220 Meters" },
      { name: "Discharge Volume", value: "20,000 to 350,000 Litres / Day" },
      { name: "Controller Efficiency", value: "> 98% MPPT Algorithm" },
      { name: "Enclosure", value: "IP65 Weatherproof Lockable Canopy" }
    ],
    applications: [
      "Agricultural Borewell & Open Well Irrigation",
      "Drip & Sprinkler Horticulture Farming",
      "Coconut, Areca Nut, Cotton & Sugarcane Plantations",
      "Village Drinking Water Schemes (Jal Jeevan Mission)"
    ],
    warranty: "5-Year Complete System & Controller Warranty",
    certifications: ["MNRE Tested & Approved", "BIS IS 14220", "IS 9283", "PM-KUSUM Empanelled"],
    brochureAvailable: true
  },
  {
    id: "solar-water-heater-etc-fpc",
    slug: "solar-water-heater-etc-fpc",
    name: "Industrial & Domestic Solar Water Heating Systems (100 LPD - 5000+ LPD)",
    category: "solar-water-heaters",
    categoryLabel: "Solar Water Heaters",
    tagline: "High-retention hot water systems with vacuum tubes and high-density PUF insulation.",
    description: "Reliable solar thermal solutions for domestic bathrooms, commercial hotels, and industrial boiler pre-heating. Featuring high-absorption Three-Target Evacuated Tube Collectors (ETC) and Flat Plate Collectors (FPC) with food-grade SS316 inner tanks and high-pressure capability.",
    mainImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80"
    ],
    features: [
      "Cuts water heating electricity expenses by up to 80%",
      "Three-target copper-coated borosilicate glass vacuum tubes (ETC)",
      "High-density injected PUF insulation maintains hot water for 48+ hours",
      "Inner tank manufactured from corrosion-resistant Food Grade SS304/SS316",
      "Pressurized and non-pressurized configurations for booster pump compatibility",
      "Optional electrical backup heater with smart digital thermostat"
    ],
    specifications: [
      { name: "Capacity Options", value: "100 LPD, 200 LPD, 300 LPD, 500 LPD to 5,000+ LPD Commercial" },
      { name: "Collector Technology", value: "Three-Target Borosilicate Glass Vacuum Tubes / Copper-Aluminum FPC" },
      { name: "Inner Tank Material", value: "Food-Grade Stainless Steel SS304-2B / SS316" },
      { name: "Insulation", value: "High-density 50mm CFC-free Polyurethane Foam (PUF)" },
      { name: "Max Water Temperature", value: "Up to 85°C" },
      { name: "Operating Pressure", value: "Non-pressurized / Up to 6 Bar Pressurized" }
    ],
    applications: [
      "Villas, Apartments & Independent Homes",
      "Hotels, Resorts & Guest Houses",
      "Hospitals & Hostel Dormitories",
      "Textile Dyeing & Boiler Preheating Systems"
    ],
    warranty: "5-Year Comprehensive Warranty (Tank & Collector)",
    certifications: ["BIS IS 12933", "MNRE Approved Specifications", "ISO 9001:2015"],
    brochureAvailable: true
  },
  {
    id: "lifepo4-energy-storage-rack",
    slug: "lifepo4-energy-storage-rack",
    name: "Modular LiFePO4 Energy Storage Rack System (5.12kWh - 100kWh+)",
    category: "energy-storage",
    categoryLabel: "Energy Storage",
    tagline: "High-cycle Lithium Iron Phosphate storage engineered for commercial and luxury home backup.",
    description: "Safeguard critical business operations and modern homes against grid power cuts. Built with premium Grade-A LiFePO4 cells, active cell balancing smart BMS, and modular 19-inch rack-mount chassis that scales seamlessly with your energy demands.",
    mainImage: "https://images.unsplash.com/photo-1558441719-8b489c6340c4?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1558441719-8b489c6340c4?auto=format&fit=crop&w=1200&q=80"
    ],
    features: [
      "6,000+ Deep Cycles at 80% Depth of Discharge (DoD)",
      "High thermal stability & inherent fire-safety chemistry",
      "Active cell balancing BMS with dual-core CAN & RS485 telemetry",
      "Modular stackable design: connect up to 32 modules in parallel",
      "Fast charging: 0% to 90% charge in under 2 hours with solar",
      "Zero maintenance compared to toxic lead-acid batteries"
    ],
    specifications: [
      { name: "Nominal Voltage", value: "51.2 V (Standard 48V Bus) / High Voltage 400V Options" },
      { name: "Module Capacity", value: "100Ah (5.12 kWh) per module" },
      { name: "Cycle Life", value: "≥ 6000 Cycles @ 80% DoD, 25°C" },
      { name: "Max Charge / Discharge Current", value: "100 A Continuous" },
      { name: "Communication Protocols", value: "CAN 2.0B / RS485 / RS232" },
      { name: "Operating Temp Range", value: "-10°C to 55°C" },
      { name: "Dimensions", value: "442 x 480 x 177 mm (4U Standard Rack)" }
    ],
    applications: [
      "Luxury Home 24/7 Backup",
      "Hospitals, Diagnostics & Critical Care Units",
      "Server Rooms & IT Hubs",
      "Commercial Peak Shaving & Time-of-Use Arbitrage"
    ],
    warranty: "10-Year Manufacturer Performance Warranty",
    certifications: ["UN 38.3", "IEC 62619", "CE", "UL 1973 Certified Cells", "RoHS Compliant"],
    brochureAvailable: true
  },
  {
    id: "solar-street-lighting-bos",
    slug: "solar-street-lighting-bos",
    name: "All-In-One Integrated LED Solar Street Lighting & HDG Mounting Systems",
    category: "other",
    categoryLabel: "Other Solar Products",
    tagline: "Self-contained solar lighting and hot-dip galvanized mounting structures engineered for 25+ years.",
    description: "Engineered balance-of-system solar hardware. Includes All-In-One LED Solar Street Lights with PIR motion sensors and built-in lithium batteries, alongside structural-grade 80-micron Hot-Dip Galvanized (HDG) elevated solar mounting structures tested for 180 km/h cyclone wind resistance.",
    mainImage: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1200&q=80"
    ],
    features: [
      "High luminous efficiency LED chips (> 160 lumens/watt)",
      "Smart PIR radar sensor dims light to 30% when no motion is detected to conserve energy",
      "80-micron Hot-Dip Galvanizing adheres to IS 4759 standards for zero rust",
      "Pre-engineered modular structure kits for quick site assembly without welding",
      "Lightning arresters and chemical earthing electrodes for complete surge defense"
    ],
    specifications: [
      { name: "Street Light Wattages", value: "20W, 40W, 60W, 90W, 120W High Lumen LED" },
      { name: "Battery Type", value: "Integrated LiFePO4 Battery Pack" },
      { name: "Autonomy", value: "3 to 5 Rainy / Cloudy Days" },
      { name: "Structure Material", value: "Hot-Dip Galvanized Steel (HDG) & Anodized 6005-T5 Aluminum" },
      { name: "Wind Load Rating", value: "Tested up to 180 km/h (IS 875 Part 3)" },
      { name: "Tilt Angles", value: "Fixed 10° - 15° / Adjustable 10° - 35°" }
    ],
    applications: [
      "Industrial Campus Perimeters & Roadways",
      "Gated Communities & Farmhouse Pathways",
      "Rooftop Elevated Solar Walkways",
      "Ground Mount Solar Park Racking"
    ],
    warranty: "3 to 5 Year Warranty on Lighting; 25-Year Structural Integrity Warranty",
    certifications: ["MNRE Compliant", "IS 10322", "IP66 Ingress Rated", "IS 4759 Galvanizing"],
    brochureAvailable: true
  }
];
