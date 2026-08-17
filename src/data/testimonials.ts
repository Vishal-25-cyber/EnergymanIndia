export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  organization?: string;
  location: string;
  rating: number;
  capacityInstalled: string;
  projectType: "Residential" | "Industrial" | "Commercial" | "Agricultural";
  quote: string;
  verified: boolean;
  avatar?: string;
}

export const testimonialsData: TestimonialItem[] = [
  {
    id: "test-1",
    name: "K. Balasubramanian",
    role: "Managing Director",
    organization: "Sri Balaji Spinning & Weaving Mills",
    location: "Coimbatore, Tamil Nadu",
    rating: 5,
    capacityInstalled: "1.2 MW Rooftop Solar",
    projectType: "Industrial",
    quote: "Energy Man India executed our 1.2 MW rooftop solar project with extreme precision. We experienced zero downtime during the installation process. Our monthly power bill has reduced by nearly ₹12 Lakhs, and the plant has generated consistently above PVSyst estimates for over 18 months now. Highly recommended for industrial EPC.",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "test-2",
    name: "Dr. R. Meenakshi Sundaram",
    role: "Medical Director",
    organization: "Sundaram Multi-Specialty Care",
    location: "Salem, Tamil Nadu",
    rating: 5,
    capacityInstalled: "350 kWp Hospital Solar",
    projectType: "Commercial",
    quote: "Hospital operations cannot tolerate power interruptions. The Energy Man India team designed a dual-redundant 350 kWp solar system that syncs seamlessly with our generators and grid. The savings on daytime air conditioning loads are phenomenal, and their engineering support is always proactive.",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "test-3",
    name: "M. Thangavel",
    role: "Progressive Farmer & Plantation Owner",
    organization: "Thangavel Agro Farms (30 Acres)",
    location: "Palani / Dindigul, Tamil Nadu",
    rating: 5,
    capacityInstalled: "10 HP Solar Submersible Pump",
    projectType: "Agricultural",
    quote: "Before installing the Energy Man solar pump, we had to visit the fields at 2:00 AM for erratic 3-phase electricity or spend ₹35,000 monthly on diesel. With this 10 HP solar pump, water starts flowing automatically at 7:00 AM every single morning. The PM-KUSUM subsidy arrived smoothly in our account.",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "test-4",
    name: "Anand Rajagopalan",
    role: "Architect & Villa Owner",
    location: "Pollachi, Tamil Nadu",
    rating: 5,
    capacityInstalled: "10 kWp Hybrid Rooftop + Lithium Battery",
    projectType: "Residential",
    quote: "I wanted a sleek, all-black solar setup for my new villa that wouldn't ruin the roof architecture. Energy Man India delivered a flawless 10 kWp hybrid system with 15kWh LiFePO4 storage. My electricity bill is virtually zero, and we received the full ₹78,000 PM Surya Ghar subsidy within 4 weeks of commissioning.",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "test-5",
    name: "S. Muruganantham",
    role: "Chief Operating Officer",
    organization: "Apex Cold Chain Logistics",
    location: "Erode, Tamil Nadu",
    rating: 5,
    capacityInstalled: "500 kWp Captive Solar",
    projectType: "Industrial",
    quote: "For our cold storage operations, peak power tariffs in summer were punishing. Energy Man India engineered a 500 kWp rooftop array that directly offsets peak compressor loads. Their remote SCADA telemetry provides real-time visibility on my phone. We achieved ROI in less than 3 years.",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80"
  }
];
