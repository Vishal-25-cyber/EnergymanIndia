export interface SubsidyTier {
  systemCapacity: string;
  centralSubsidy: string;
  centralSubsidyAmount: number;
  typicalSystemCost: string;
  netEffectiveCost: string;
  monthlyGeneration: string;
  monthlySavings: string;
  recommendedFor: string;
}

export interface SubsidyScheme {
  id: string;
  name: string;
  officialPortal: string;
  targetAudience: string;
  maxBenefit: string;
  overview: string;
  tiers?: SubsidyTier[];
  keyHighlights: string[];
  eligibilityCriteria: string[];
  requiredDocuments: string[];
}

export const subsidySchemes: SubsidyScheme[] = [
  {
    id: "pm-surya-ghar",
    name: "PM Surya Ghar: Muft Bijli Yojana",
    officialPortal: "https://pmsuryaghar.gov.in",
    targetAudience: "Residential Individual Homeowners & Housing Societies",
    maxBenefit: "Direct Central Financial Assistance up to ₹78,000",
    overview: "Launched by the Government of India, the PM Surya Ghar: Muft Bijli Yojana provides direct bank transfer (DBT) subsidies for residential rooftop solar installations. Homeowners can generate up to 300 units of free clean electricity every month.",
    tiers: [
      {
        systemCapacity: "1 kW System",
        centralSubsidy: "₹30,000",
        centralSubsidyAmount: 30000,
        typicalSystemCost: "₹55,000 - ₹65,000",
        netEffectiveCost: "₹25,000 - ₹35,000",
        monthlyGeneration: "120 - 140 Units (kWh)",
        monthlySavings: "₹800 - ₹1,200",
        recommendedFor: "Small homes with 1-2 bedrooms, fans, lights, refrigerator"
      },
      {
        systemCapacity: "2 kW System",
        centralSubsidy: "₹60,000",
        centralSubsidyAmount: 60000,
        typicalSystemCost: "₹1,10,000 - ₹1,30,000",
        netEffectiveCost: "₹50,000 - ₹70,000",
        monthlyGeneration: "240 - 280 Units (kWh)",
        monthlySavings: "₹1,800 - ₹2,500",
        recommendedFor: "Medium families with 1 AC, refrigerator, washing machine"
      },
      {
        systemCapacity: "3 kW to 10 kW System",
        centralSubsidy: "₹78,000 (Fixed Cap)",
        centralSubsidyAmount: 78000,
        typicalSystemCost: "₹1,60,000 - ₹1,90,000 (for 3kW)",
        netEffectiveCost: "₹82,000 - ₹1,12,000 (for 3kW)",
        monthlyGeneration: "360 - 450 Units / 3kW",
        monthlySavings: "₹3,200 - ₹5,000+",
        recommendedFor: "Large independent villas with 2-3 ACs, EV charger, pumps"
      }
    ],
    keyHighlights: [
      "Direct DBT Subsidy credited directly into the homeowner's Aadhaar-linked bank account within 30 days of net-meter commissioning",
      "Concessional collateral-free solar loans from nationalized banks (SBI, Canara, PNB) starting at just 7% interest rate",
      "Net-metering mechanism allows banking surplus units with the state DISCOM (TANGEDCO / Electricity Board)",
      "Zero paperwork burden: Energy Man India manages the end-to-end portal registration, meter inspection, and commissioning approvals"
    ],
    eligibilityCriteria: [
      "Must be an Indian citizen with a valid residential electricity connection in their name",
      "Adequate shadow-free rooftop/terrace area (approx. 80-100 sq.ft per 1 kW)",
      "Rooftop must have permanent concrete/structural access",
      "Installation must be done using DCR (Domestic Content Requirement) solar modules from ALMM-approved manufacturers via an empanelled vendor like Energy Man India"
    ],
    requiredDocuments: [
      "Latest Electricity Bill (with consumer number & sanctioned load)",
      "Aadhaar Card (matching consumer name on electricity bill)",
      "Canceled Cheque or Bank Passbook copy (for DBT subsidy disbursement)",
      "Photograph of rooftop / terrace space",
      "Passport size photograph of applicant"
    ]
  },
  {
    id: "pm-kusum-agriculture",
    name: "PM-KUSUM Scheme (Pradhan Mantri Kisan Urja Suraksha evam Utthaan Mahabhiyan)",
    officialPortal: "https://pmkusum.mnre.gov.in",
    targetAudience: "Farmers, Agricultural Cooperatives & Water User Associations",
    maxBenefit: "Up to 60% Combined Central & State Government Subsidy",
    overview: "PM-KUSUM aims to provide energy security for Indian farmers by replacing expensive, polluting diesel irrigation pumps with clean, dependable solar water pumping systems and enabling solarization of agricultural grid feeders.",
    keyHighlights: [
      "Component B: Standalone solar water pumps (3 HP to 10 HP) for off-grid farms with up to 60% total financial support (30% Central + 30% State)",
      "Farmer needs to invest only 10% to 40% of the benchmark pump cost, with bank loan options for the rest",
      "Component C: Individual farmer solarization of existing grid-connected agriculture pumps",
      "Enables continuous daylight irrigation and sells surplus electricity back to DISCOMs for additional annual farm income"
    ],
    eligibilityCriteria: [
      "Individual farmers, farmer groups, cooperatives, and panchayats",
      "Valid agricultural land ownership documents (Patta / Chitta / Land Record)",
      "Functional borewell, open well, or water body on the farmland",
      "No existing electrified agricultural service connection for standalone scheme (Component B)"
    ],
    requiredDocuments: [
      "Land Ownership Documents (Patta, Chitta, Adangal)",
      "Aadhaar Card of the landholder",
      "Bank Account details (Passbook copy)",
      "Water source test / NOC from local revenue authority where applicable",
      "Passport size photograph"
    ]
  },
  {
    id: "commercial-accelerated-depreciation",
    name: "Commercial & Industrial 40% Accelerated Depreciation & ESG Tax Shield",
    officialPortal: "https://incometaxindia.gov.in",
    targetAudience: "Commercial Enterprises, MSMEs, Factories & Corporates",
    maxBenefit: "40% Accelerated Depreciation in Year 1 + 18% Full GST Input Tax Credit",
    overview: "Under Section 32 of the Income Tax Act, commercial businesses and manufacturing companies can claim 40% accelerated depreciation on solar power installations in the very first financial year, drastically reducing corporate income tax liability.",
    keyHighlights: [
      "Substantial reduction in taxable corporate income in the year of commissioning",
      "100% input tax credit (ITC) on 18% GST paid on solar equipment & EPC services",
      "Protects against annual commercial HT/LT electricity tariff hikes",
      "Enhances corporate ESG ratings and carbon credit accounting"
    ],
    eligibilityCriteria: [
      "Registered corporate entities, proprietorships, partnerships, LLPs, and private limited companies",
      "Solar plant commissioned on company-owned or legally leased commercial/industrial premises",
      "System integrated for captive commercial consumption"
    ],
    requiredDocuments: [
      "Company GST Registration & PAN",
      "Commercial Electricity Bill with HT/LT Sanctioned Load",
      "CEIG / Safety Inspectorate Approval Drawings",
      "Commissioning Certificate from Energy Man India & State DISCOM"
    ]
  }
];

export const subsidyProcessTimeline = [
  {
    step: "01",
    title: "Eligibility Check & Site Assessment",
    description: "Energy Man India assesses your roof area, sanctioned load, and verifies consumer eligibility on the National PM Surya Ghar portal."
  },
  {
    step: "02",
    title: "Portal Registration & Feasibility Approval",
    description: "We submit your technical application to the DISCOM portal and secure net-metering technical feasibility clearance."
  },
  {
    step: "03",
    title: "Engineering Installation & Earthing",
    description: "Our certified engineers install ALMM DCR-compliant panels, smart inverter, dual earthing, and safety switchgear per MNRE standards."
  },
  {
    step: "04",
    title: "Net-Meter Inspection & Commissioning",
    description: "DISCOM officials inspect the installation, install the bidirectional net meter, and issue the official Commissioning Certificate."
  },
  {
    step: "05",
    title: "Direct Subsidy (DBT) Disbursement",
    description: "The Commissioning Certificate is submitted to the portal. Central government transfers up to ₹78,000 directly into your bank account."
  }
];
