export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: "Government Subsidy" | "Solar Energy" | "Agriculture" | "Industry" | "Solar Water Heaters";
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
    title: "Complete Guide to PM Surya Ghar Muft Bijli Yojana: How to Claim ₹78,000 Subsidy in Tamil Nadu",
    excerpt: "Official guide by Energy Man India on the PM Surya Ghar residential rooftop solar scheme, application procedures via the National Portal, TANGEDCO net-metering, and DBT subsidy timelines.",
    category: "Government Subsidy",
    author: {
      name: "Er. K. Sivakumar",
      role: "Managing Director & Chief Solar Engineer, Energy Man India",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    },
    date: "Feb 10, 2026",
    readTime: "6 min read",
    featured: true,
    coverImage: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1200&q=80",
    tableOfContents: [
      { id: "overview", title: "What is PM Surya Ghar Scheme?" },
      { id: "subsidy-breakdown", title: "Capacity & Subsidy Amount Breakdown" },
      { id: "eligibility", title: "Who is Eligible in Tamil Nadu?" },
      { id: "step-by-step", title: "Step-by-Step Application Process with Energy Man India" },
      { id: "loan-benefits", title: "7% Concessional Bank Loans" }
    ],
    content: {
      intro: "The PM Surya Ghar: Muft Bijli Yojana is India's flagship rooftop solar initiative, aimed at empowering residential households with up to 300 units of free clean electricity every month. Energyman Power Technologies (India) Pvt. Ltd., headquartered in Coimbatore, is an empannelled MNRE rooftop solar vendor assisting homeowners across Tamil Nadu in claiming maximum government subsidies with turnkey net-metering.",
      sections: [
        {
          id: "overview",
          heading: "What is PM Surya Ghar: Muft Bijli Yojana?",
          body: [
            "Launched with a massive central outlay of ₹75,021 crore, the scheme provides direct financial subsidies to residential consumers who install grid-connected rooftop solar systems.",
            "PM Surya Ghar operates on a centralized National Portal (pmsuryaghar.gov.in) with Direct Benefit Transfer (DBT) deposited straight into the applicant's Aadhaar-linked bank account within 30 days of TANGEDCO bidirectional net-meter commissioning."
          ],
          keyTakeaway: "Direct central subsidy of ₹78,000 for 3kW+ systems makes rooftop solar capital payback under 3.5 years."
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
          heading: "Eligibility & Technical Requirements in Tamil Nadu",
          body: [
            "The applicant must have an active domestic electricity connection with TANGEDCO.",
            "The rooftop must have shadow-free space (approx. 80-100 sq.ft per kW).",
            "Crucially, the solar modules installed must be manufactured with Domestic Content Requirement (DCR) cells and be listed on the MNRE Approved List of Module Manufacturers (ALMM). Energy Man India strictly installs 100% ALMM DCR-compliant panels."
          ]
        },
        {
          id: "step-by-step",
          heading: "Step-by-Step Application Process with Energy Man India",
          body: [
            "1. Register on the National Portal (pmsuryaghar.gov.in) with your consumer number.",
            "2. Select 'Energyman Power Technologies (India) Pvt. Ltd.' as your registered vendor.",
            "3. Receive technical feasibility approval from TANGEDCO / DISCOM.",
            "4. Our engineering team installs the solar array, inverter, and safety earthing per MNRE standards.",
            "5. TANGEDCO inspects the installation and commissions the bi-directional net meter.",
            "6. Commissioning report is uploaded to the portal, and the ₹78,000 subsidy arrives via DBT within 30 days."
          ]
        },
        {
          id: "loan-benefits",
          heading: "Collateral-Free Concessional Solar Loans at 7%",
          body: [
            "Leading public sector banks including SBI, Canara Bank, and Indian Bank provide collateral-free residential solar loans at interest rates around 7% p.a.",
            "The monthly EMI is lower than your regular electricity bill, meaning you become cash-flow positive immediately."
          ]
        }
      ],
      conclusion: "Rooftop solar under PM Surya Ghar is one of the safest high-yield investments for homeowners in Tamil Nadu. Energy Man India handles the entire paperwork, TANGEDCO approvals, and commissioning end-to-end."
    }
  },
  {
    id: "agricultural-solar-water-pump-kusum",
    slug: "agricultural-solar-water-pump-kusum",
    title: "How Tamil Nadu Farmers are Eliminating Diesel Bills with PM-KUSUM Solar Water Pumps",
    excerpt: "Energy Man India's engineering guide on 1 Hp to 50 Hp open well and submersible solar pumps under the 60% PM-KUSUM subsidy scheme.",
    category: "Agriculture",
    author: {
      name: "Er. K. Sivakumar",
      role: "Agricultural Solar & Pumping Specialist, Energy Man India",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    },
    date: "Jan 28, 2026",
    readTime: "5 min read",
    featured: false,
    coverImage: "https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&w=1200&q=80",
    tableOfContents: [
      { id: "diesel-crisis", title: "The Heavy Cost of Diesel Farming" },
      { id: "kusum-subsidy", title: "60% Subsidy under PM-KUSUM Component-B" },
      { id: "solar-pump-engineering", title: "High-Efficiency Stainless Steel Submersibles" },
      { id: "farmer-roi", title: "Farmer ROI & Water Yield Case Study" }
    ],
    content: {
      intro: "In regions like Coimbatore, Pollachi, Tiruppur, and Dindigul, erratic agricultural power supplies have historically forced farmers to irrigate fields at midnight or burn expensive diesel fuel. Energy Man India's stainless steel solar pumping solutions offer dependable daylight irrigation with zero recurring electricity bills.",
      sections: [
        {
          id: "diesel-crisis",
          heading: "The Heavy Cost of Diesel Agriculture",
          body: [
            "A standard 7.5 HP diesel engine consumes roughly 1.8 to 2.2 litres of diesel per hour of operation. A farmer irrigating a 15-acre coconut or sugarcane plantation for 6 hours daily burns over ₹1,200 per day in fuel alone, exceeding ₹3 Lakhs annually.",
            "Add routine oil changes, belt replacements, and engine overhauls, and conventional diesel irrigation becomes one of the largest drains on agricultural profitability."
          ]
        },
        {
          id: "kusum-subsidy",
          heading: "Up to 60% Financial Subsidy via PM-KUSUM",
          body: [
            "Under Component-B of the PM-KUSUM scheme, the Central Government provides 30% financial assistance, matched by another 30% from the State Government.",
            "The farmer contributes only 10% to 40% of the total system cost, with agricultural bank loans available for the remaining balance.",
            "Energy Man India assists farmers in borewell yield testing, portal documentation, and swift installation of MNRE-certified solar pump sets."
          ]
        },
        {
          id: "solar-pump-engineering",
          heading: "Food-Grade Stainless Steel Submersibles & MPPT VFDs",
          body: [
            "Energy Man India installs multi-stage stainless steel (SS304/SS316) impellers paired with specialized Vector Variable Frequency Drives (VFD) from 110V to 440V.",
            "The controller tracks maximum sunlight from early morning to late afternoon, modulating pump RPM to maintain steady water flow even during low irradiance.",
            "Integrated sensorless dry-run and water-table level protection automatically shuts off the pump if the borewell water table drops, preventing motor burnout."
          ]
        }
      ],
      conclusion: "Solar water pumps pay for themselves in less than 2 years by eliminating diesel purchases, while providing peaceful daytime irrigation that boosts crop yields."
    }
  },
  {
    id: "commercial-industrial-solar-roi-depreciation",
    slug: "commercial-industrial-solar-roi-depreciation",
    title: "Commercial & Industrial Solar in Tamil Nadu: 40% Accelerated Depreciation & 3-Year ROI",
    excerpt: "How spinning mills, manufacturing plants, and commercial complexes in Coimbatore & Tiruppur use solar EPC to cut power bills by 70% and slash corporate tax liabilities.",
    category: "Industry",
    author: {
      name: "Energy Man Engineering Cell",
      role: "Industrial Solar EPC Specialists, Coimbatore",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
    },
    date: "Jan 15, 2026",
    readTime: "7 min read",
    featured: false,
    coverImage: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1200&q=80",
    tableOfContents: [
      { id: "ht-tariff-pressures", title: "Industrial Tariff Pressures in Tamil Nadu" },
      { id: "depreciation-math", title: "Section 32 Tax Shield Calculations" },
      { id: "dg-pv-sync", title: "Diesel Generator Synchronization" },
      { id: "financial-irr", title: "Internal Rate of Return (IRR) Analysis" }
    ],
    content: {
      intro: "Electricity is often the second largest operational expense for textile mills and manufacturing units in Tamil Nadu. High-tension (HT) industrial tariffs regularly cross ₹8.50/unit, while captive solar generates power at a levelized cost of less than ₹2.20/unit.",
      sections: [
        {
          id: "ht-tariff-pressures",
          heading: "Industrial Tariff Pressures & Power Factor Charges",
          body: [
            "Industrial power bills are impacted by peak-time surcharge tariffs, maximum demand penalties, and power factor surcharges.",
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
      conclusion: "With a typical capital payback of 2.8 to 3.5 years and guaranteed 25-year performance, industrial solar EPC executed by Energy Man India is one of the safest high-yield capital allocation decisions for corporate CFOs."
    }
  },
  {
    id: "solar-water-heater-engineering-guide",
    slug: "solar-water-heater-engineering-guide",
    title: "Engineering Guide to Solar Water Heaters: Mild Steel Glass-Lined vs Standard Tanks",
    excerpt: "Understand how 50mm injected PUF insulation, non-welding joint technology, and glass-lined mild steel tanks provide 48+ hours hot water retention and zero leakage.",
    category: "Solar Water Heaters",
    author: {
      name: "Er. K. Sivakumar",
      role: "Managing Director & Senior Solar Thermal Engineer",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    },
    date: "Dec 20, 2025",
    readTime: "5 min read",
    featured: false,
    coverImage: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1200&q=80",
    tableOfContents: [
      { id: "inner-tank", title: "Mild Steel Glass-Lined Corrosion Protection" },
      { id: "insulation", title: "50mm High-Density PUF Insulation" },
      { id: "non-welding", title: "Non-Welding Joint & Silicon Washers" },
      { id: "sizing", title: "Capacity Sizing: 110L to 330L+" }
    ],
    content: {
      intro: "Water heating accounts for up to 30% of domestic electricity bills in Indian homes. Conventional electric geysers consume 2kW to 3kW of high-tariff electricity. Energy Man India's glass-lined solar water heaters deliver high-temperature hot water with zero recurring energy costs.",
      sections: [
        {
          id: "inner-tank",
          heading: "Mild Steel Glass-Lined Anti-Corrosion Protection",
          body: [
            "Hard water and chlorine can corrode standard stainless steel tanks over time. Glass-lining coats the inner steel surface with a smooth vitreous enamel fused at 850°C.",
            "This creates an impenetrable barrier against scaling, rust, and electrochemical pitting, extending system lifespan beyond 15 years."
          ]
        },
        {
          id: "insulation",
          heading: "50 mm Injected CFC-Free PUF Thermal Insulation",
          body: [
            "The tank is enclosed in a high-density 50mm Polyurethane Foam (PUF) thermal blanket injected under pressure.",
            "This superior insulation ensures water heated during the day retains temperatures up to 85°C for over 48 hours, even during chilly winter mornings and monsoon periods."
          ]
        },
        {
          id: "non-welding",
          heading: "Non-Welding Joint Technology & Silicon Washers",
          body: [
            "Traditional welding creates microscopic stress fractures and weak points susceptible to water leakage.",
            "Energy Man India systems employ precision non-welding joint engineering with food-grade silicon washers that withstand high thermal expansion without leaking."
          ]
        }
      ],
      conclusion: "Available in 110L, 165L, 220L, 275L, and 330L domestic capacities and up to 5,000L commercial manifolds, Energy Man India solar water heaters offer the most reliable thermal performance in Tamil Nadu."
    }
  }
];
