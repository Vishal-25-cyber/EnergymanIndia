export interface SolutionItem {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  tag: string;
  icon: string;
  heroImage: string;
  overview: string;
  keyBenefits: string[];
  systemSizes: string;
  subsidyAvailable: boolean;
  subsidyDetails?: string;
  typicalRoi: string;
  lifespan: string;
  suitableFor: string[];
  technicalSpecs: { label: string; value: string }[];
  processSteps: { step: string; title: string; desc: string }[];
}

export const solutionsData: SolutionItem[] = [
  {
    id: "residential",
    slug: "residential",
    title: "Residential Rooftop Solar Solutions",
    shortTitle: "Residential Solar",
    subtitle: "Transform your home roof into a self-powering green powerhouse with zero electricity bills and direct government subsidy.",
    tag: "Homes & Villas",
    icon: "Home",
    heroImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80",
    overview: "Energy Man India's residential solar systems are custom-engineered for independent houses, villas, and housing societies. By harnessing high-efficiency Mono PERC & TOPCon bi-facial solar panels with smart on-grid string inverters, our rooftop systems slash monthly utility bills by up to 90% while adding value to your property. We handle the complete process including structural engineering, DISCOM net-metering liaison, and PM Surya Ghar: Muft Bijli Yojana subsidy disbursement.",
    keyBenefits: [
      "Up to 90% reduction on your monthly electricity bill",
      "Direct central government subsidy up to ₹78,000 under PM Surya Ghar",
      "Net-metering support: sell excess solar power back to the grid",
      "25-Year linear panel power output warranty",
      "Smart smartphone app to monitor real-time daily generation",
      "Battery hybrid backup options for zero blackouts"
    ],
    systemSizes: "2 kW to 15 kW (Tailored to monthly consumption)",
    subsidyAvailable: true,
    subsidyDetails: "Eligible for PM Surya Ghar: Muft Bijli Yojana (₹30,000 for 1kW, ₹60,000 for 2kW, ₹78,000 for 3kW+ systems).",
    typicalRoi: "3.2 to 4.5 Years",
    lifespan: "25+ Years with 84%+ generation retention",
    suitableFor: [
      "Independent Villas & Bungalows",
      "Residential Apartments & Gated Communities",
      "Row Houses & Farmhouses",
      "Individual Homeowners with Terrace Rights"
    ],
    technicalSpecs: [
      { label: "Panel Technology", value: "Mono PERC / N-Type TOPCon Bi-facial (540Wp - 585Wp)" },
      { label: "Module Efficiency", value: "Up to 22.8%" },
      { label: "Inverter Type", value: "Smart On-Grid String / Hybrid with Dual MPPT" },
      { label: "Inverter Efficiency", value: "> 98.4% Peak Efficiency" },
      { label: "Mounting Structure", value: "Hot-Dip Galvanized (HDG) Steel & Anodized Aluminum" },
      { label: "Protection", value: "Class II Surge Protection (SPD), DC Isolation, Lightning Arrester & Chemical Earthing" }
    ],
    processSteps: [
      { step: "01", title: "Site Assessment & Shadow Mapping", desc: "Our engineers analyze terrace orientation, shadow-free area, and historical electricity bills." },
      { step: "02", title: "Custom 3D Engineering Design", desc: "Optimal string sizing, wind-load certified structure design, and generation simulation." },
      { step: "03", title: "DISCOM Approval & Procurement", desc: "Submitting net metering application with local electricity board and dispatching Tier-1 components." },
      { step: "04", title: "Precision Installation & Testing", desc: "Certified installation adhering to MNRE safety standards, conduit routing, and earthing." },
      { step: "05", title: "Net Metering & Subsidy Credit", desc: "Bi-directional meter installation, grid commissioning, and subsidy portal processing." }
    ]
  },
  {
    id: "commercial",
    slug: "commercial",
    title: "Commercial Solar Power Systems",
    shortTitle: "Commercial Solar",
    subtitle: "Cut operating overheads, hedge against rising commercial power tariffs, and meet ESG sustainability goals with high-yield solar.",
    tag: "Offices & Institutions",
    icon: "Building2",
    heroImage: "https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=1600&q=80",
    overview: "Commercial electricity tariffs in India often range from ₹8 to ₹12 per unit. Energy Man India delivers high-performance commercial rooftop and carport solar installations that generate clean electricity at less than ₹2.50 per unit over 25 years. Benefit from 40% accelerated tax depreciation under Section 32 of the Income Tax Act, lower demand charges, and enhance your corporate sustainability credentials.",
    keyBenefits: [
      "Hedge against commercial tariff hikes for the next 25 years",
      "Avail 40% Accelerated Depreciation tax benefits in Year 1",
      "Significant reduction in sanctioned demand peak charges",
      "Zero disruption to daily business operations during installation",
      "Advanced SCADA cloud telemetry for multi-facility monitoring",
      "CAPEX and OPEX/RESCO financing models available"
    ],
    systemSizes: "20 kW to 500 kW",
    subsidyAvailable: false,
    subsidyDetails: "40% Accelerated Depreciation tax benefit under IT Act Section 32 + GST input credit.",
    typicalRoi: "2.8 to 3.8 Years",
    lifespan: "25+ Years",
    suitableFor: [
      "Corporate Office Complexes & Tech Parks",
      "Hospitals, Clinics & Healthcare Facilities",
      "Educational Campuses, Colleges & Schools",
      "Hotels, Resorts & Shopping Malls",
      "Warehouses & Cold Storage Units"
    ],
    technicalSpecs: [
      { label: "Panel Technology", value: "Tier-1 High Wattage TOPCon Bi-facial (580Wp - 620Wp)" },
      { label: "Inverter Type", value: "Commercial Three-Phase Multi-MPPT String Inverters" },
      { label: "Grid Synchronisation", value: "Automatic synchronization with Zero-Export Controller options" },
      { label: "Structure", value: "Elevated Solar Walkways & High-Clearance Roof Mounts" },
      { label: "Monitoring", value: "Cloud-based SCADA with string-level current monitoring" },
      { label: "Protection", value: "Type I+II AC/DC SPDs, Arc-Fault Circuit Interrupters (AFCI)" }
    ],
    processSteps: [
      { step: "01", title: "Energy Audit & Load Profiling", desc: "Detailed analysis of 15-minute interval demand data, HT/LT consumer tariffs, and roof structural integrity." },
      { step: "02", title: "Techno-Commercial Feasibility", desc: "PVSyst simulation, financial cash flow modeling, internal rate of return (IRR) calculations." },
      { step: "03", title: "Statutory Approvals & CEIG Liaison", desc: "Chief Electrical Inspector to Government (CEIG) approvals, grid connectivity permissions." },
      { step: "04", title: "Fast-Track EPC Execution", desc: "Engineered execution with zero downtime to facility machinery, adhering to strict industrial EHS protocols." },
      { step: "05", title: "Commissioning & Performance Ratio Testing", desc: "Full load sync testing, PR validation, and integration with building management systems." }
    ]
  },
  {
    id: "industrial",
    slug: "industrial",
    title: "Industrial & MW-Scale Captive Solar",
    shortTitle: "Industrial Solar",
    subtitle: "Heavy-duty solar engineering for manufacturing plants, spinning mills, steel foundries, and energy-intensive industries.",
    tag: "Heavy Industry",
    icon: "Factory",
    heroImage: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1600&q=80",
    overview: "Power constitutes 30% to 50% of operating expenses in heavy manufacturing. Energy Man India is a specialized industrial solar EPC contractor with extensive track records in executing multi-megawatt rooftop and ground-mounted captive solar projects. We engineer systems capable of synchronizing seamlessly with diesel generator sets, HT grid substations, and captive power plants while maximizing yield through automated cleaning systems and bifacial gains.",
    keyBenefits: [
      "Massive reduction in Levelized Cost of Electricity (LCOE)",
      "Smart DG-PV Hybrid Controller integration for fuel savings during grid outages",
      "Engineered for harsh industrial atmospheres (corrosion-resistant HDG structures)",
      "High voltage (11kV / 22kV / 33kV) substation & transformer integration",
      "Guaranteed Generation / Performance Ratio (PR) commitments",
      "Carbon neutrality compliance for global supply chain requirements"
    ],
    systemSizes: "100 kW to 10 MW+ (Rooftop, Ground Mount & Open Access)",
    subsidyAvailable: false,
    subsidyDetails: "Accelerated Depreciation (40%), carbon credit eligibility, and open access banking benefits.",
    typicalRoi: "2.5 to 3.5 Years",
    lifespan: "25+ Years",
    suitableFor: [
      "Textile Mills & Spinning Units",
      "Automobile & Engineering Foundries",
      "Chemical, Pharmaceutical & Agro Processing Units",
      "Cement & Heavy Manufacturing Plants",
      "Paper Mills & Packaging Facilities"
    ],
    technicalSpecs: [
      { label: "Modules", value: "High-Density Bi-facial N-Type Modules with IP68 junction boxes" },
      { label: "Inverters", value: "Centralized / High-capacity Decentralized 100kW-350kW String Inverters" },
      { label: "Substation Interface", value: "11kV / 22kV / 33kV Step-up HT Transformers with VCB panels" },
      { label: "DG Synchronization", value: "Zero-reverse power flow DG-PV hybrid controller" },
      { label: "Telemetry", value: "Fiber-optic SCADA with Weather Monitoring Station (Pyranometers)" },
      { label: "Structural Rating", value: "Wind resistance up to 180 km/h (IS 875 Part 3 compliant)" }
    ],
    processSteps: [
      { step: "01", title: "Industrial Plant Survey", desc: "3D drone surveying, structural load capacity testing, and electrical SLD audit." },
      { step: "02", title: "Civil & Electrical Detailed Engineering", desc: "Foundation engineering, HT switchgear integration, and short-circuit fault analysis." },
      { step: "03", title: "CEIG & DISCOM Compliance", desc: "Preparation of drawings, statutory submissions, and safety inspectorate clearances." },
      { step: "04", title: "Industrial Grade Construction", desc: "Rigorous quality control, torque tightening, cable trenching, and earthing grid testing." },
      { step: "05", title: "Yield Optimization & SCADA", desc: "String current mapping, thermal imaging verification, and 24/7 remote operations center handover." }
    ]
  },
  {
    id: "agricultural",
    slug: "agricultural",
    title: "Agricultural Solar Water Pumps & Farm Power",
    shortTitle: "Agricultural Solar",
    subtitle: "Empowering farmers with reliable daylight irrigation, solar water pumping systems, and PM-KUSUM government subsidies.",
    tag: "Farms & Agriculture",
    icon: "Tractor",
    heroImage: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1600&q=80",
    overview: "Irregular agricultural power supply and diesel pump costs throttle farm productivity. Energy Man India delivers high-efficiency AC and DC Solar Water Pumping Systems (submersible and surface) engineered for borewells, open wells, canals, and drip irrigation systems. Our high-torque MPPT solar pump controllers ensure automatic pump start at sunrise and continuous water flow even during cloudy weather.",
    keyBenefits: [
      "Zero dependency on night-shift erratic grid power supply",
      "Direct government subsidy up to 60% under PM-KUSUM scheme",
      "Drastic savings on diesel pump fuel and generator maintenance",
      "Automatic operation with dry run protection and sensor-free operation",
      "High head capacity capable of pumping from depths exceeding 500+ feet",
      "Long-lasting stainless steel pumps and hot-dip galvanized structures"
    ],
    systemSizes: "3 HP, 5 HP, 7.5 HP, 10 HP to 25 HP Solar Pump Systems",
    subsidyAvailable: true,
    subsidyDetails: "Eligible for up to 60% combined Central & State subsidy under PM-KUSUM (Component B & C).",
    typicalRoi: "1.5 to 2.5 Years",
    lifespan: "20+ Years for panels, 10+ Years for pump sets",
    suitableFor: [
      "Borewell & Deep Well Irrigation",
      "Open Well & River Basin Pumping",
      "Drip & Sprinkler Micro-Irrigation Farms",
      "Coconut, Sugarcane, Cotton & Paddy Plantations",
      "Poultry Farms, Dairies & Agro-Processing Sheds"
    ],
    technicalSpecs: [
      { label: "Pump Types", value: "Stainless Steel Submersible (SS304/SS316) & Monobloc Surface Pumps" },
      { label: "Pump Controller", value: "High-efficiency Vector MPPT VFD Controller (Efficiency > 98%)" },
      { label: "Operating Voltage", value: "Wide DC Input range with auto-wake and auto-sleep" },
      { label: "Protections", value: "Dry-run protection, Overload, Under-voltage, Reverse Polarity, Phase Loss" },
      { label: "Mounting Structure", value: "Manual / Seasonal Dual-Axis Tracking Galvanized Structure" },
      { label: "Motor Rating", value: "Permanent Magnet Brushless DC (BLDC) & High-efficiency AC Induction" }
    ],
    processSteps: [
      { step: "01", title: "Hydrogeological Borewell Audit", desc: "Measuring borewell depth, water yield (LPH), static water table, and dynamic head." },
      { step: "02", title: "Pump & Array Matching", desc: "Selecting optimal motor HP, discharge rate, and PV string voltage for maximum daily water output." },
      { step: "03", title: "Subsidy Documentation Filing", desc: "Assisting farmer in filing PM-KUSUM portal applications and farmer share payment." },
      { step: "04", title: "On-Farm Mechanical & Electrical Setup", desc: "Rigid foundation casting, heavy-gauge riser pipe lowering, and lightning surge protection." },
      { step: "05", title: "Discharge Commissioning & Training", desc: "Full water flow validation, controller training, and farmer handover." }
    ]
  },
  {
    id: "epc-maintenance",
    slug: "epc-maintenance",
    title: "Turnkey Solar EPC & Lifetime O&M",
    shortTitle: "Solar EPC & O&M",
    subtitle: "Complete engineering, procurement, construction, and AI-powered operations & maintenance for peak plant performance.",
    tag: "Engineering & Service",
    icon: "Wrench",
    heroImage: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=80",
    overview: "A solar system is a 25-year financial asset. Energy Man India offers comprehensive turnkey EPC solutions alongside scheduled Operations & Maintenance (O&M) contracts. Utilizing drone thermography, IV curve tracing, robotic module cleaning, and 24/7 central SCADA telemetry, we guarantee 99%+ plant uptime and maximum energy yields.",
    keyBenefits: [
      "End-to-end turnkey EPC delivery with single-point accountability",
      "Guaranteed plant availability and Performance Ratio (PR) agreements",
      "Drone-based thermal imaging to detect micro-cracks and hot spots",
      "Scheduled chemical-free solar panel cleaning protocols",
      "Rapid response breakdown maintenance and spare parts inventory",
      "DISCOM & CEIG compliance audits and annual safety inspections"
    ],
    systemSizes: "Custom contracts from 50 kW to 25 MW+",
    subsidyAvailable: false,
    typicalRoi: "Optimizes yield by 5% - 15% annually",
    lifespan: "Customizable 1-year to 10-year comprehensive O&M agreements",
    suitableFor: [
      "Existing Rooftop Solar Plant Owners",
      "Industrial Captive Power Plant Operators",
      "Solar Farm Investors & IPPs",
      "Institutional Solar Assets"
    ],
    technicalSpecs: [
      { label: "Diagnostic Tools", value: "FLIR Thermal Drones, Seaward PV200 IV Curve Tracers, Insulation Resistance Testers" },
      { label: "Monitoring", value: "Cloud SCADA with predictive AI anomaly detection" },
      { label: "Response SLA", value: "Under 4 Hours for Critical Outages" },
      { label: "Cleaning Methods", value: "De-mineralized water pressure washing & Semi-automated robotic cleaners" },
      { label: "Testing Standards", value: "IEC 62446 Grid Connected PV Systems Verification" }
    ],
    processSteps: [
      { step: "01", title: "Comprehensive Plant Health Audit", desc: "Detailed baseline testing of PV strings, inverters, transformers, and earthing pits." },
      { step: "02", title: "Customized O&M Schedule", desc: "Establishing scheduled preventive maintenance frequencies, cleaning cycles, and spare parts buffer." },
      { step: "03", title: "SCADA Telemetry Integration", desc: "Connecting plant inverters and weather sensors to our 24/7 remote monitoring desk." },
      { step: "04", title: "Periodic Field Interventions", desc: "Torque checks, thermal scanning, DC cabling inspection, and inverter firmware updates." },
      { step: "05", title: "Monthly Performance Analytics", desc: "Delivering detailed monthly generation reports, PR analysis, and actionable optimization insights." }
    ]
  },
  {
    id: "energy-storage",
    slug: "energy-storage",
    title: "Battery Energy Storage Systems (BESS)",
    shortTitle: "Energy Storage",
    subtitle: "Next-generation Lithium Iron Phosphate (LiFePO4) energy storage for true 24/7 round-the-clock solar independence.",
    tag: "Storage & Microgrids",
    icon: "BatteryCharging",
    heroImage: "https://images.unsplash.com/photo-1558441719-8b489c6340c4?auto=format&fit=crop&w=1600&q=80",
    overview: "Pair your solar system with intelligent Battery Energy Storage Systems (BESS). Energy Man India integrates Tier-1 LiFePO4 rack-mount and modular high-voltage energy storage with intelligent Hybrid inverters. Enable peak shaving, time-of-day tariff arbitrage, and clean silent backup power that outperforms polluting diesel generators.",
    keyBenefits: [
      "Continuous power during grid outages without noise or diesel fumes",
      "Time-of-Day (ToD) tariff arbitrage: store cheap solar, discharge during peak rate hours",
      "Ultra-safe Lithium Iron Phosphate (LiFePO4) chemistry with 6000+ life cycles",
      "Modular scalability: expand storage capacity as energy demands grow",
      "Seamless transfer time (< 10 milliseconds) for sensitive IT equipment and machinery",
      "10-Year comprehensive manufacturer battery warranty"
    ],
    systemSizes: "5 kWh to 2 MWh modular systems",
    subsidyAvailable: false,
    typicalRoi: "4 to 6 Years depending on diesel displacement and peak tariffs",
    lifespan: "15+ Years (6000+ Cycles at 80% DoD)",
    suitableFor: [
      "Villas & Residences with frequent grid outages",
      "Hospitals, Laboratories & Data Centers",
      "Continuous process manufacturing industries",
      "Remote microgrids, eco-resorts & off-grid agricultural estates"
    ],
    technicalSpecs: [
      { label: "Battery Chemistry", value: "Grade-A Lithium Iron Phosphate (LiFePO4)" },
      { label: "Cycle Life", value: "≥ 6,000 Cycles @ 80% DoD, 25°C" },
      { label: "BMS Intelligence", value: "Multi-tier Active Cell Balancing, Over-temp, Over-current & CAN/RS485 comms" },
      { label: "Round-Trip Efficiency", value: "> 95%" },
      { label: "Inverter Compatibility", value: "Deye, Sungrow, Growatt, Victron, Schneider" },
      { label: "Enclosure Rating", value: "IP54 / IP65 with built-in thermal management" }
    ],
    processSteps: [
      { step: "01", title: "Backup Load Segmentation", desc: "Identifying essential vs non-essential circuits and peak surge power requirements." },
      { step: "02", title: "Storage Capacity Sizing", desc: "Simulating depth of discharge, autonomy hours, and solar charging curve." },
      { step: "03", title: "Safe Electrical Integration", desc: "Installing DC circuit breakers, Class-T fuses, fire suppression, and battery disconnect switches." },
      { step: "04", title: "Smart BMS Programming", desc: "Configuring peak shaving profiles, self-consumption priority, and grid export parameters." },
      { step: "05", title: "Commissioning & Outage Simulation", desc: "Simulating seamless grid trip transitions and verifying real-time app telemetry." }
    ]
  }
];
