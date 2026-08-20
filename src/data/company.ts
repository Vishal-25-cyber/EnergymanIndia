export interface OfficeLocation {
  city: string;
  type: string;
  address: string;
  pincode: string;
  phone: string;
  email: string;
  mapQuery: string;
  workingHours: string;
}

export interface CompanyMetric {
  label: string;
  value: number;
  suffix: string;
  description: string;
}

export interface CompanyData {
  name: string;
  legalName: string;
  formerName: string;
  tagline: string;
  shortTagline: string;
  description: string;
  establishedYear: number;
  incorporationYear: number;
  cin: string;
  mnreAccreditation: string;
  strategicPartnership: string;
  isoCertifications: string[];
  headquarters: string;
  mission: string[];
  vision: string[];
  phones: {
    primary: string;
    sales: string;
    support: string;
    whatsapp: string;
  };
  emails: {
    primary: string;
    sales: string;
    support: string;
    careers: string;
  };
  offices: OfficeLocation[];
  metrics: CompanyMetric[];
  socialLinks: {
    linkedin: string;
    facebook: string;
    twitter: string;
    instagram: string;
    youtube: string;
    whatsapp: string;
  };
  pillars: {
    title: string;
    description: string;
    icon: string;
  }[];
}

export const companyData: CompanyData = {
  name: "ENERGYMAN",
  legalName: "Energyman Power Technologies (India) Private Limited",
  formerName: "Formerly known as Luminary's Solar Power Systems",
  tagline: "Renewable Energy Saves Earth",
  shortTagline: "Leading Solar Energy Storage System & EPC Players in India",
  description: "Energyman Power Technologies (India) Private Limited (formerly known as Luminary's Solar Power Systems) is one of the most efficient organizations in this field since 2011, which pays attention to the holistic utilization of solar energy in the products that it manufactures. Leading Solar Energy Storage System & EPC Players in India.",
  establishedYear: 2011,
  incorporationYear: 2016,
  cin: "U40300TZ2016PTC028163",
  mnreAccreditation: "MNRE Subsidy Scheme Authorized Vendor & Implementing Partner",
  strategicPartnership: "Strategic EPC Collaboration with WAAREE (One with the Sun)",
  isoCertifications: ["ISO 9001:2015 Quality Management", "ISO 14001:2015 Environmental Management"],
  headquarters: "119, Gopal Layout, Ponnaiahrajapuram, Near Gandhi Park, Coimbatore, Tamil Nadu, India - 641001",
  mission: [
    "Harness the power of the sun to empower communities and businesses with clean, sustainable energy, reducing reliance on fossil fuels and safeguarding our planet for future generations.",
    "Empower clients with customized, high-performance solar power plant solutions, maximizing energy independence and contributing to cost savings.",
    "Champion innovation and technological advancements in the solar industry, delivering unparalleled efficiency, reliability, and environmental benefits."
  ],
  vision: [
    "To be recognized as a leading solar EPC company, spearheading the transition to a renewable energy future.",
    "To be the preferred partner for businesses and communities seeking reliable, clean, and cost-effective solar power solutions.",
    "To contribute to a world powered by sunlight, where clean energy is accessible, affordable, and the environmental norm.",
    "To inspire and empower others to embrace the potential of solar energy and create a sustainable future for all."
  ],
  phones: {
    primary: "+91 70925 10004",
    sales: "+91 70925 10004",
    support: "+91 70925 10004",
    whatsapp: "+917092510004",
  },
  emails: {
    primary: "info@energymanindia.in",
    sales: "sales@energymanindia.in",
    support: "support@energymanindia.in",
    careers: "careers@energymanindia.in",
  },
  offices: [
    {
      city: "Coimbatore",
      type: "Registered Head Office & Experience Center",
      address: "119, Gopal Layout, Ponnaiahrajapuram, Near Gandhi Park",
      pincode: "641001",
      phone: "+91 70925 10004",
      email: "info@energymanindia.in",
      mapQuery: "119 Gopal Layout, Ponnaiahrajapuram, Near Gandhi Park, Coimbatore 641001",
      workingHours: "Mon - Sat: 9:00 AM - 7:00 PM"
    },
    {
      city: "Palani",
      type: "Franchisee Office & Regional Hub",
      address: "S.F. No. 20/1, Old Sales Tax Building, R.S. Ramalingam Street",
      pincode: "624601",
      phone: "+91 70925 10004",
      email: "palani@energymanindia.in",
      mapQuery: "R.S. Ramalingam Street, Palani, Tamil Nadu 624601",
      workingHours: "Mon - Sat: 9:00 AM - 6:30 PM"
    }
  ],
  metrics: [
    {
      label: "Happy Customers",
      value: 6500,
      suffix: "+",
      description: "Residential, commercial & agricultural clean power installations."
    },
    {
      label: "Industrial Solar Solutions",
      value: 800,
      suffix: "+",
      description: "Megawatt-scale and captive industrial rooftop installations."
    },
    {
      label: "City Presence",
      value: 40,
      suffix: "+",
      description: "Cities and industrial hubs served across Tamil Nadu & South India."
    }
  ],
  socialLinks: {
    facebook: "https://facebook.com/energymanindia",
    instagram: "https://instagram.com/energymanindia",
    linkedin: "https://linkedin.com/company/energymanindia",
    youtube: "https://youtube.com/@energymanindia",
    twitter: "https://twitter.com/energymanindia",
    whatsapp: "https://wa.me/917092510004?text=Hello%20Energyman%2C%20I%20would%20like%20to%20request%20a%20solar%20quote."
  },
  pillars: [
    {
      title: "Consult",
      description: "Precision initial feasibility survey, rooftop shadow assessment, and energy load analysis.",
      icon: "UserCheck"
    },
    {
      title: "Design",
      description: "Custom 3D PVSyst engineering simulations, structural wind calculations, and electrical schematics.",
      icon: "Layers"
    },
    {
      title: "Engineer",
      description: "Deploying Tier-1 ALMM mono-crystalline modules, hybrid inverters, and heavy-duty hot-dip galvanized structures.",
      icon: "Cpu"
    },
    {
      title: "Install",
      description: "Turnkey DISCOM statutory liaison, CEIG approvals, bi-directional net metering, and DBT subsidy synchronization.",
      icon: "CheckCircle2"
    },
    {
      title: "Support",
      description: "25-year performance monitoring, remote cloud SCADA telemetry, preventive maintenance, and rapid O&M SLAs.",
      icon: "ShieldCheck"
    }
  ]
};
