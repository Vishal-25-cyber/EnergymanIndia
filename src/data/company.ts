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
  tagline: string;
  shortTagline: string;
  description: string;
  establishedYear: number;
  cin: string;
  mnreAccreditation: string;
  isoCertifications: string[];
  headquarters: string;
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
  name: "Energy Man India",
  legalName: "Energyman Power Technologies (India) Private Limited",
  tagline: "Renewable Energy Saves Earth",
  shortTagline: "Powering India's Clean Energy Future",
  description: "Energyman Power Technologies (India) Pvt. Ltd. is an established engineering-driven renewable energy company delivering turnkey solar solutions for homes, commercial establishments, agricultural farms, and MW-scale industrial facilities across India.",
  establishedYear: 2016,
  cin: "U40300TZ2016PTC028163",
  mnreAccreditation: "Approved Channel Partner & Subsidy Implementer under PM Surya Ghar & MNRE",
  isoCertifications: ["ISO 9001:2015 Quality Management", "ISO 14001:2015 Environmental Management"],
  headquarters: "Coimbatore & Palani, Tamil Nadu, India",
  phones: {
    primary: "+91 94433 12890",
    sales: "+91 98422 45890",
    support: "+91 94888 67210",
    whatsapp: "+919443312890",
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
      type: "Corporate Office & Experience Center",
      address: "119-121, Gopal Layout, Behind Gandhi Park, Ponnaiah Rajapuram",
      pincode: "641001",
      phone: "+91 94433 12890",
      email: "covai@energymanindia.in",
      mapQuery: "Ponnaiah Rajapuram, Coimbatore, Tamil Nadu 641001",
      workingHours: "Mon - Sat: 9:00 AM - 7:00 PM"
    },
    {
      city: "Palani",
      type: "Registered Office & Engineering Hub",
      address: "S.F. No. 20/1, Old Sales Tax Building, R.S. Ramalingam Street",
      pincode: "624601",
      phone: "+91 98422 45890",
      email: "palani@energymanindia.in",
      mapQuery: "R.S. Ramalingam Street, Palani, Tamil Nadu 624601",
      workingHours: "Mon - Sat: 9:00 AM - 6:30 PM"
    },
    {
      city: "Coimbatore North",
      type: "Showroom & Dispatch Center",
      address: "Sathy Main Road, Ganapathy & Thottipalayam Pirivu",
      pincode: "641006",
      phone: "+91 94888 67210",
      email: "sales@energymanindia.in",
      mapQuery: "Ganapathy, Coimbatore, Tamil Nadu 641006",
      workingHours: "Mon - Sat: 9:30 AM - 7:00 PM"
    }
  ],
  metrics: [
    {
      label: "Years of Engineering Experience",
      value: 10,
      suffix: "+",
      description: "Dedicated solar engineering and EPC expertise"
    },
    {
      label: "Solar Projects Commissioned",
      value: 2500,
      suffix: "+",
      description: "Across residential, industrial, and agricultural sectors"
    },
    {
      label: "Installed Solar Capacity",
      value: 35,
      suffix: " MW+",
      description: "Generating clean power across South India"
    },
    {
      label: "Direct Electricity Bill Savings",
      value: 90,
      suffix: "%",
      description: "Average bill reduction achieved for clients"
    },
    {
      label: "Annual CO2 Offset",
      value: 42000,
      suffix: " Tons",
      description: "Contributing to carbon neutrality and clean air"
    },
    {
      label: "Customer Satisfaction",
      value: 99,
      suffix: "%",
      description: "Backed by 25-year panel performance warranties"
    }
  ],
  socialLinks: {
    linkedin: "https://linkedin.com/company/energymanindia",
    facebook: "https://facebook.com/energymanindia",
    twitter: "https://twitter.com/energymanindia",
    instagram: "https://instagram.com/energymanindia",
    youtube: "https://youtube.com/@energymanindia",
    whatsapp: "https://wa.me/919443312890?text=Hello%20Energy%20Man%20India%2C%20I%20would%20like%20to%20inquire%20about%20solar%20solutions."
  },
  pillars: [
    {
      title: "Engineering-First Design",
      description: "Precision 3D shadow analysis, optimal string sizing, and Tier-1 hardware engineered specifically for maximum generation under Indian climatic conditions.",
      icon: "Cpu"
    },
    {
      title: "End-to-End Execution",
      description: "Complete turnkey process from site feasibility and DISCOM net metering approvals to subsidy disbursement and lifetime maintenance.",
      icon: "CheckCircle2"
    },
    {
      title: "Government Subsidy Partner",
      description: "Direct assistance with PM Surya Ghar Muft Bijli Yojana (up to ₹78,000 subsidy) and PM-KUSUM agricultural solar schemes.",
      icon: "ShieldCheck"
    },
    {
      title: "Smart Cloud Monitoring",
      description: "Real-time generation tracking, fault detection, and automated alerts through mobile app and central SCADA dashboards.",
      icon: "Activity"
    }
  ]
};
