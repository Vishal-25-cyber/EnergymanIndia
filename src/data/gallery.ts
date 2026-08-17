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
    image: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1200&q=80",
    description: "PM-KUSUM solar pump discharging 180,000 LPD for continuous plantation irrigation."
  },
  {
    id: "gal-3",
    title: "350 kWp Elevated Commercial Hospital Rooftop",
    category: "commercial",
    categoryLabel: "Commercial",
    location: "Salem, Tamil Nadu",
    capacity: "350 kWp",
    image: "https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=1200&q=80",
    description: "Walkable elevated HDG structure providing clean power for medical equipment."
  },
  {
    id: "gal-4",
    title: "10 kWp Net-Zero Villa Solar with Lithium Battery Backup",
    category: "residential",
    categoryLabel: "Residential",
    location: "Pollachi, Tamil Nadu",
    capacity: "10 kWp + 15kWh LiFePO4",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    description: "All-black monocrystalline rooftop array with hybrid inverter and energy storage."
  },
  {
    id: "gal-5",
    title: "500 kWp Turmeric Cold Storage Warehouse Solar",
    category: "industrial",
    categoryLabel: "Industrial",
    location: "Erode, Tamil Nadu",
    capacity: "500 kWp",
    image: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80",
    description: "Zero-export industrial solar array offsetting daytime refrigeration compressor spikes."
  },
  {
    id: "gal-6",
    title: "200 kWp Engineering College Green Campus Pergola",
    category: "commercial",
    categoryLabel: "Commercial",
    location: "Tirupur, Tamil Nadu",
    capacity: "200 kWp",
    image: "https://images.unsplash.com/photo-1545208942-e1c9c916524b?auto=format&fit=crop&w=1200&q=80",
    description: "Architectural elevated solar structure creating shaded campus walkways."
  },
  {
    id: "gal-7",
    title: "5 kWp PM Surya Ghar Villa Rooftop Installation",
    category: "residential",
    categoryLabel: "Residential",
    location: "Coimbatore, Tamil Nadu",
    capacity: "5 kWp",
    image: "https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&w=1200&q=80",
    description: "High-efficiency bi-facial rooftop array with bidirectional TANGEDCO net metering."
  },
  {
    id: "gal-8",
    title: "7.5 HP Agro Solar Surface Pump for Canal Irrigation",
    category: "agricultural",
    categoryLabel: "Agricultural",
    location: "Udumalpet, Tamil Nadu",
    capacity: "7.5 HP (7.2 kWp)",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
    description: "Automated solar pump array with variable frequency MPPT vector control drive."
  },
  {
    id: "gal-9",
    title: "Utility-Scale Transformer & HT Switchgear Substation",
    category: "industrial",
    categoryLabel: "Industrial",
    location: "Dindigul, Tamil Nadu",
    capacity: "33 kV Substation",
    image: "https://images.unsplash.com/photo-1558441719-8b489c6340c4?auto=format&fit=crop&w=1200&q=80",
    description: "High-voltage substation step-up transformers with CEIG Class A safety approval."
  }
];
