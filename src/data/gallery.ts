export interface GalleryImage {
  id: string;
  title: string;
  category: "residential" | "commercial" | "industrial" | "agricultural";
  categoryLabel: string;
  location: string;
  capacity?: string;
  image: string;
  description: string;
}

export const galleryData: GalleryImage[] = [
  {
    id: "gal-1",
    title: "1.2 MW Industrial Spinning Mill Rooftop Solar",
    category: "industrial",
    categoryLabel: "Industrial",
    location: "Coimbatore, Tamil Nadu",
    capacity: "1.2 MW",
    image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1200&q=80",
    description: "Multi-roof standing seam installation delivering over 5,000 units of green energy daily."
  },
  {
    id: "gal-2",
    title: "10 HP Deep Borewell Solar Submersible Farm Pump",
    category: "agricultural",
    categoryLabel: "Agricultural",
    location: "Palani / Dindigul, Tamil Nadu",
    capacity: "10 HP (9.6 kWp)",
    image: "https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&w=1200&q=80",
    description: "PM-KUSUM solar pump discharging 180,000 LPD for continuous plantation irrigation."
  },
  {
    id: "gal-3",
    title: "350 kWp Elevated Commercial Rooftop Installation",
    category: "commercial",
    categoryLabel: "Commercial",
    location: "Salem, Tamil Nadu",
    capacity: "350 kWp",
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1200&q=80",
    description: "Walkable elevated HDG structure providing clean captive power for commercial operations."
  },
  {
    id: "gal-4",
    title: "10 kWp Net-Zero Villa Solar with Hybrid Inverter",
    category: "residential",
    categoryLabel: "Residential",
    location: "Pollachi, Tamil Nadu",
    capacity: "10 kWp Net-Metering",
    image: "https://images.unsplash.com/photo-1545208942-e1c9c916524b?auto=format&fit=crop&w=1200&q=80",
    description: "High-efficiency monocrystalline rooftop array with hybrid inverter for 24/7 power autonomy."
  },
  {
    id: "gal-5",
    title: "500 kWp Cold Storage & Food Processing Solar",
    category: "industrial",
    categoryLabel: "Industrial",
    location: "Erode, Tamil Nadu",
    capacity: "500 kWp",
    image: "https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?auto=format&fit=crop&w=1200&q=80",
    description: "Cold storage facility achieving zero daytime grid dependency with captive rooftop solar."
  },
  {
    id: "gal-6",
    title: "Solar Water Heating System for Commercial Facility",
    category: "commercial",
    categoryLabel: "Commercial",
    location: "Kodaikanal, Tamil Nadu",
    capacity: "5,000 LPD System",
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1200&q=80",
    description: "High-temperature glass-lined mild steel tank array supplying hot water round the clock."
  },
  {
    id: "gal-7",
    title: "5 kWp PM Surya Ghar Residential Rooftop System",
    category: "residential",
    categoryLabel: "Residential",
    location: "Tiruppur, Tamil Nadu",
    capacity: "5 kWp (₹78k Subsidy)",
    image: "https://images.unsplash.com/photo-1545208942-e1c9c916524b?auto=format&fit=crop&w=1200&q=80",
    description: "Homeowner receiving ₹78,000 direct subsidy and zero monthly DISCOM power bills."
  },
  {
    id: "gal-8",
    title: "2.5 MW Ground-Mounted Captive Solar Power Plant",
    category: "industrial",
    categoryLabel: "Industrial",
    location: "Udumalpet, Tamil Nadu",
    capacity: "2.5 MWp",
    image: "https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&w=1200&q=80",
    description: "Ground-mounted MW power generation array connected to 33kV high-tension feeder."
  }
];
