export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: "Government Subsidy" | "Solar Energy" | "Technology" | "Agriculture" | "Industry" | "Energy Savings";
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  featured: boolean;
  coverImage: string;
  tableOfContents: { id: string; title: string }[];
  content: {
    intro: string;
    sections: {
      id: string;
      heading: string;
      body: string[];
      keyTakeaway?: string;
    }[];
    conclusion: string;
  };
}

export const blogsData: BlogPost[] = [
  {
    id: "pm-surya-ghar-subsidy-guide-2026",
    slug: "pm-surya-ghar-subsidy-guide-2026",
    title: "Complete Guide to PM Surya Ghar Muft Bijli Yojana: How to Claim ₹78,000 Subsidy in 2026",
    excerpt: "Everything Indian homeowners need to know about the updated PM Surya Ghar rooftop solar scheme, application procedures, eligibility checks, and net-metering timelines.",
    category: "Government Subsidy",
    author: {
      name: "Er. K. Sivakumar",
      role: "Chief Solar Systems Engineer, Energy Man India",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    },
    date: "Feb 10, 2026",
    readTime: "6 min read",
    featured: true,
    coverImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    tableOfContents: [
      { id: "overview", title: "What is PM Surya Ghar Scheme?" },
      { id: "subsidy-breakdown", title: "Capacity & Subsidy Amount Breakdown" },
      { id: "eligibility", title: "Who is Eligible?" },
      { id: "step-by-step", title: "Step-by-Step Application Process" },
      { id: "loan-benefits", title: "7% Concessional Bank Loans" }
    ],
    content: {
      intro: "The PM Surya Ghar: Muft Bijli Yojana is India's flagship rooftop solar initiative, aimed at empowering over 1 crore households with up to 300 units of free clean electricity every month. In this comprehensive guide, we demystify the exact subsidy calculations, vendor empannelment requirements, and the DBT disbursement process.",
      sections: [
        {
          id: "overview",
          heading: "What is PM Surya Ghar: Muft Bijli Yojana?",
          body: [
            "Launched with a massive outlay of ₹75,021 crore, the scheme provides direct financial subsidies to residential consumers who install grid-connected rooftop solar systems.",
            "Unlike older subsidy schemes that were routed through local state DISCOMs with long delays, PM Surya Ghar operates entirely on a centralized National Portal (pmsuryaghar.gov.in) with Direct Benefit Transfer (DBT) directly into the applicant's Aadhaar-linked bank account within 30 days of net-meter commissioning."
          ],
          keyTakeaway: "Direct central subsidy of ₹78,000 for 3kW+ systems makes rooftop solar payback under 3.5 years."
        },
        {
          id: "subsidy-breakdown",
          heading: "Capacity & Subsidy Amount Breakdown",
          body: [
            "For systems up to 1 kW: Central Financial Assistance (CFA) of ₹30,000.",
            "For systems up to 2 kW: CFA of ₹60,000.",
            "For systems of 3 kW and above: Fixed maximum CFA of ₹78,000.",
            "For a typical 3 kW system costing around ₹1,75,000, your effective out-of-pocket capital is only ₹97,000. Generating approximately 360-400 units per month, you save ₹3,000 to ₹4,500 every billing cycle, resulting in complete capital payback within 3 to 4 years."
          ]
        },
        {
          id: "eligibility",
          heading: "Eligibility & Technical Requirements",
          body: [
            "The applicant must own a residential electricity connection with a dedicated consumer number.",
            "The rooftop must have shadow-free space (approx. 80-100 sq.ft per kW).",
            "Crucially, the solar modules installed must be manufactured with Domestic Content Requirement (DCR) cells and be listed on the MNRE Approved List of Module Manufacturers (ALMM). Energy Man India strictly installs 100% ALMM DCR-compliant panels for all subsidy installations."
          ]
        },
        {
          id: "step-by-step",
          heading: "Step-by-Step Application Process",
          body: [
            "1. Register on the National Portal with your state, electricity distribution company (DISCOM), and consumer number.",
            "2. Apply for rooftop solar and select 'Energyman Power Technologies' as your registered vendor.",
            "3. Receive technical feasibility approval from DISCOM.",
            "4. Our engineering team installs the solar array, inverter, and safety earthing per MNRE guidelines.",
            "5. Apply for net-metering inspection on the portal; DISCOM installs the bidirectional meter.",
            "6. Once the commissioning certificate is issued, submit your bank details and canceled cheque. Subsidy arrives via DBT within 30 days."
          ]
        },
        {
          id: "loan-benefits",
          heading: "Collateral-Free Concessional Solar Loans at 7%",
          body: [
            "To eliminate upfront cost barriers, leading public sector banks including State Bank of India (SBI), Canara Bank, and Punjab National Bank provide collateral-free residential solar loans at attractive interest rates pegged around 7% p.a. (repo rate + 0.5%).",
            "The monthly EMI is often lower than your current electricity bill, meaning you become cash-flow positive from Day 1 of switching to solar."
          ]
        }
      ],
      conclusion: "Rooftop solar under PM Surya Ghar is one of the highest-yield financial investments available for Indian homeowners today. Energy Man India handles the entire paperwork and net metering process end-to-end so you can enjoy worry-free green power."
    }
  },
  {
    id: "topcon-vs-mono-perc-solar-panels",
    slug: "topcon-vs-mono-perc-solar-panels",
    title: "TOPCon vs Mono PERC Solar Panels: Which Technology is Best for Indian Summers?",
    excerpt: "A deep engineering comparison of N-Type TOPCon vs P-Type Mono PERC modules, thermal degradation coefficients, bi-facial gains, and 25-year yield analysis.",
    category: "Technology",
    author: {
      name: "Er. Ramesh Krishnan",
      role: "Lead PV R&D Specialist",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
    },
    date: "Jan 24, 2026",
    readTime: "7 min read",
    featured: false,
    coverImage: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80",
    tableOfContents: [
      { id: "intro-tech", title: "The Evolution from P-Type to N-Type" },
      { id: "temp-coefficient", title: "Temperature Coefficient in Indian Summers" },
      { id: "bifacial-gain", title: "Bi-faciality & Reflected Light Yield" },
      { id: "degradation", title: "Degradation Rate & 30-Year Performance" },
      { id: "recommendation", title: "Energy Man India's Engineering Recommendation" }
    ],
    content: {
      intro: "As solar module technology leaps forward, prospective solar owners face a critical choice: should you stick with traditional Mono PERC or upgrade to next-generation N-Type TOPCon (Tunnel Oxide Passivated Contact) panels? In this technical breakdown, we look at the physics and economics of both.",
      sections: [
        {
          id: "intro-tech",
          heading: "The Evolution from P-Type to N-Type Silicon",
          body: [
            "For the past decade, P-Type Mono PERC has been the dominant solar panel technology. However, P-type silicon is susceptible to boron-oxygen defects that cause Light Induced Degradation (LID) in the first weeks of sunlight exposure.",
            "N-Type TOPCon uses phosphorus-doped silicon substrates. By inserting an ultra-thin tunnel oxide layer beneath a conductive poly-silicon layer, surface recombination losses are dramatically minimized, pushing cell efficiencies past 25%."
          ]
        },
        {
          id: "temp-coefficient",
          heading: "Temperature Coefficient in Indian Climates",
          body: [
            "In states like Tamil Nadu, Gujarat, and Rajasthan, summer ambient temperatures frequently cross 40°C, causing panel surface temperatures to soar to 65°C-70°C.",
            "Standard Mono PERC has a temperature coefficient of roughly -0.35%/°C. TOPCon boasts an improved coefficient of -0.30%/°C.",
            "This 0.05% difference translates to 3% to 5% higher daily energy generation during the hottest months when energy demand is highest."
          ]
        },
        {
          id: "bifacial-gain",
          heading: "Bi-faciality Factor: Generating Power from Both Sides",
          body: [
            "TOPCon dual-glass modules achieve a bi-faciality factor of 80% to 85%, compared to only 70% for standard PERC.",
            "On white-painted rooftops, light-colored gravel, or industrial shed roofs, TOPCon panels capture reflected albedo light from behind, delivering an extra 10% to 20% kilowatt-hours from the same installed area."
          ]
        },
        {
          id: "degradation",
          heading: "Long-Term Degradation: 30-Year Lifespan",
          body: [
            "Mono PERC degrades by approx. 2% in Year 1 and 0.55% annually thereafter, guaranteeing ~84.8% output at Year 25.",
            "TOPCon features zero LID (< 1% Year 1 degradation) and only 0.40% annual degradation, guaranteeing 87.4%+ output at Year 30.",
            "Over 30 years, a TOPCon array generates over 12% more total cumulative kilowatt-hours per watt installed."
          ]
        }
      ],
      conclusion: "While TOPCon carries a modest 4-6% price premium over Mono PERC, the superior temperature tolerance and bifacial gains deliver a faster overall ROI and far higher 25-year financial returns."
    }
  },
  {
    id: "agricultural-solar-pumping-kusum",
    slug: "agricultural-solar-pumping-kusum",
    title: "How Indian Farmers are Eliminating Diesel Bills with PM-KUSUM Solar Water Pumps",
    excerpt: "Discover how solar water pumps are transforming Indian agriculture, providing dependable daylight irrigation, and saving lakhs in diesel and maintenance expenses.",
    category: "Agriculture",
    author: {
      name: "Er. K. Sivakumar",
      role: "Agricultural Solar Specialist",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    },
    date: "Jan 12, 2026",
    readTime: "5 min read",
    featured: false,
    coverImage: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1200&q=80",
    tableOfContents: [
      { id: "diesel-crisis", title: "The Heavy Cost of Diesel Farming" },
      { id: "kusum-subsidy", title: "60% Subsidy under PM-KUSUM" },
      { id: "solar-pump-engineering", title: "Solar Pump Controller & MPPT Tech" },
      { id: "case-study", title: "Farmer ROI & Water Output Case Study" }
    ],
    content: {
      intro: "For decades, erratic agricultural power supplies have forced farmers to irrigate fields in the middle of the night or burn expensive diesel fuel. The PM-KUSUM scheme and modern MPPT solar water pumps have revolutionized farm economics.",
      sections: [
        {
          id: "diesel-crisis",
          heading: "The Heavy Cost of Diesel Agriculture",
          body: [
            "A standard 7.5 HP diesel engine consumes roughly 1.8 to 2.2 litres of diesel per hour of operation. A farmer irrigating a 15-acre coconut or sugarcane plantation for 6 hours daily burns over ₹1,200 per day in fuel alone, exceeding ₹3 Lakhs annually.",
            "Add routine oil changes, belt replacements, and engine overhauls, and conventional irrigation becomes one of the largest drains on agricultural profitability."
          ]
        },
        {
          id: "kusum-subsidy",
          heading: "Up to 60% Financial Subsidy via PM-KUSUM",
          body: [
            "Under Component B of the PM-KUSUM scheme, the Central Government provides 30% financial assistance, matched by another 30% from the State Government.",
            "The farmer contributes only 10% to 40% of the total system cost, with agricultural bank loans available for the balance at subsidized rates.",
            "Energy Man India assists farmers in borewell yield testing, portal documentation, and swift installation of MNRE-certified solar pump sets."
          ]
        },
        {
          id: "solar-pump-engineering",
          heading: "High-Efficiency Stainless Steel Submersibles & MPPT VFDs",
          body: [
            "Modern solar pump sets utilize brushless permanent magnet DC (BLDC) motors or specialized inverter-duty AC motors paired with Vector Variable Frequency Drives (VFD).",
            "The controller tracks maximum sunlight from 6:30 AM to 5:30 PM, modulating pump RPM to maintain steady water flow even during morning and afternoon low-irradiance hours.",
            "Integrated dry-run sensor technology automatically shuts off the pump if the water table drops, preventing motor burnout."
          ]
        }
      ],
      conclusion: "Solar water pumps pay for themselves in less than 2 years by eliminating diesel purchases, while providing peaceful daytime irrigation that boosts crop yields."
    }
  },
  {
    id: "commercial-industrial-solar-roi-depreciation",
    slug: "commercial-industrial-solar-roi-depreciation",
    title: "Commercial & Industrial Solar in India: 40% Accelerated Depreciation & 3-Year ROI",
    excerpt: "How manufacturing plants, spinning mills, and commercial complexes use solar EPC to cut power bills by 70% and slash corporate tax liabilities.",
    category: "Industry",
    author: {
      name: "Er. Ramesh Krishnan",
      role: "Lead PV R&D Specialist",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
    },
    date: "Dec 18, 2025",
    readTime: "8 min read",
    featured: false,
    coverImage: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1200&q=80",
    tableOfContents: [
      { id: "ht-tariff-pressures", title: "Industrial Tariff Pressures in India" },
      { id: "depreciation-math", title: "Section 32 Tax Shield Calculations" },
      { id: "dg-pv-sync", title: "Diesel Generator Synchronization" },
      { id: "financial-irr", title: "Internal Rate of Return (IRR) Analysis" }
    ],
    content: {
      intro: "Electricity is often the second largest operational expense for Indian manufacturing units after raw materials. High-tension (HT) industrial tariffs regularly cross ₹8.50/unit, while captive solar generates power at a levelized cost of less than ₹2.20/unit.",
      sections: [
        {
          id: "ht-tariff-pressures",
          heading: "Industrial Tariff Pressures & Power Factor Charges",
          body: [
            "Industrial power bills are complicated by peak-time surcharge tariffs, maximum demand penalties, and power factor surcharges.",
            "Installing a captive rooftop or ground-mounted solar plant directly offsets high daytime grid tariffs while maintaining a unity power factor through smart reactive power compensation."
          ]
        },
        {
          id: "depreciation-math",
          heading: "The Power of 40% Accelerated Tax Depreciation",
          body: [
            "Under Section 32(1) of the Income Tax Act, solar power equipment is eligible for 40% Accelerated Depreciation in the first year.",
            "For a company in the 25% to 30% corporate tax bracket, a ₹1 Crore solar investment yields an immediate direct tax saving of ₹10 to ₹12 Lakhs in Year 1.",
            "Combined with 100% Input Tax Credit on the 18% GST paid for capital goods, the net effective capital requirement drops dramatically."
          ]
        },
        {
          id: "dg-pv-sync",
          heading: "Zero-Reverse Power DG-PV Hybrid Controllers",
          body: [
            "Energy Man India integrates intelligent hybrid controllers that safely blend solar power with running diesel generators during grid outages.",
            "The controller modulates solar inverter output to prevent reverse power flow into the alternator while maintaining a minimum 30% base load on the genset, saving up to 70% in expensive diesel consumption during load-shedding."
          ]
        }
      ],
      conclusion: "With a typical capital payback of 2.8 to 3.5 years and guaranteed 25-year performance, solar EPC is one of the safest high-yield capital allocation decisions for Indian corporate CFOs."
    }
  }
];
