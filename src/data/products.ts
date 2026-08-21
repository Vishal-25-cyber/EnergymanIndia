export interface ProductSpec {
  name: string;
  value: string;
}

export interface ProductItem {
  id: string;
  slug: string;
  name: string;
  category: "solar-pumps" | "solar-water-heaters";
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
    id: "solar-agricultural-pumps",
    slug: "solar-agricultural-pumps",
    name: "Open Well & Submersible Solar Pumps (1 Hp - 50 Hp)",
    category: "solar-pumps",
    categoryLabel: "Solar Pumps",
    tagline: "Bringing reliable water supply with stainless steel submersible & open well solar pumps.",
    description: "Empowering farmers and agriculture with reliable daylight water irrigation. High-discharge multi-stage stainless steel submersible and open-well pumps compatible with 1 Hp to 50 Hp motors, delivering continuous water flow from 100ft to 600ft+ depth.",
    mainImage: "https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&w=1200&q=80"
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
    id: "solar-water-heater-etc-fpc",
    slug: "solar-water-heater-etc-fpc",
    name: "Solar Water Heaters (110L - 330L Domestic & Industrial)",
    category: "solar-water-heaters",
    categoryLabel: "Solar Water Heaters",
    tagline: "Mild steel glass-lined tanks with 50mm injected PUF insulation and non-welding technology.",
    description: "Reliable solar thermal solutions for domestic bathrooms, commercial hotels, and industrial boiler pre-heating. Featuring non-pressurized gravity-feed systems in tank volumes 110L, 165L, 220L, 275L, and 330L with mild steel glass-lined inner tanks, powder-coated outer finish, 50 mm PUF insulation, non-welding technology, silicon washers, and optional 2KW/3KW backup electrical heaters.",
    mainImage: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1200&q=80"
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
  }
];
