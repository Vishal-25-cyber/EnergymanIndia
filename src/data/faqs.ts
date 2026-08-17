export interface FAQItem {
  id: string;
  category: "general" | "residential" | "commercial" | "agricultural" | "technical";
  categoryLabel: string;
  question: string;
  answer: string;
}

export const faqsData: FAQItem[] = [
  {
    id: "faq-1",
    category: "general",
    categoryLabel: "General Solar",
    question: "How does an on-grid rooftop solar system work?",
    answer: "An on-grid solar system converts sunlight into direct current (DC) electricity via solar photovoltaic (PV) panels. A grid-tied solar inverter then converts this DC electricity into alternating current (AC) electricity synchronized with your building's power supply. Any excess solar electricity not consumed on-site is exported to the state electricity grid via a bidirectional 'Net Meter', earning you energy credits that deduct directly from your monthly power bill."
  },
  {
    id: "faq-2",
    category: "residential",
    categoryLabel: "Residential & Subsidy",
    question: "How much government subsidy can I receive under PM Surya Ghar Muft Bijli Yojana?",
    answer: "Under the PM Surya Ghar scheme, residential individual homeowners receive a direct central financial subsidy of: ₹30,000 for a 1 kW system; ₹60,000 for a 2 kW system; and a fixed maximum of ₹78,000 for systems of 3 kW and higher. The subsidy is credited via Direct Benefit Transfer (DBT) directly into your Aadhaar-linked bank account within 30 days after net-meter commissioning."
  },
  {
    id: "faq-3",
    category: "residential",
    categoryLabel: "Residential & Subsidy",
    question: "How much shadow-free rooftop space is required for a residential solar plant?",
    answer: "As a standard rule of thumb, you require approximately 80 to 100 square feet of shadow-free terrace or roof area per 1 kW of installed solar capacity. For example, a 3 kW system requires approximately 240 to 300 sq.ft, while a 5 kW system requires around 400 to 500 sq.ft of south/unobstructed roof space."
  },
  {
    id: "faq-4",
    category: "general",
    categoryLabel: "General Solar",
    question: "What is the expected lifespan and warranty of solar panels?",
    answer: "Tier-1 solar panels engineered by Energy Man India have a designed operational lifespan exceeding 25 to 30 years. All our panels come with a 10 to 15-year comprehensive product workmanship warranty and a 25 to 30-year linear power output performance warranty (guaranteeing at least 84.8% to 87.4% generation retention at the end of Year 25/30)."
  },
  {
    id: "faq-5",
    category: "commercial",
    categoryLabel: "Commercial & Industrial",
    question: "What tax benefits are available for commercial and industrial solar installations in India?",
    answer: "Commercial enterprises, factories, and MSMEs can claim 40% Accelerated Depreciation (AD) under Section 32 of the Income Tax Act in the first year of commissioning the solar plant. Additionally, companies can claim 100% Input Tax Credit (ITC) on the 18% GST paid on solar equipment and turnkey EPC contracts, drastically improving capital efficiency and speeding up overall ROI to under 3 years."
  },
  {
    id: "faq-6",
    category: "commercial",
    categoryLabel: "Commercial & Industrial",
    question: "Can an industrial solar system run synchronously with our diesel generator (DG) set during power cuts?",
    answer: "Yes! Energy Man India integrates specialized DG-PV Hybrid Controllers with Zero-Export capability. During a grid power outage, the controller dynamically modulates solar inverter power output so that solar generation matches plant load without sending reverse power back into the generator alternator. This cuts diesel fuel consumption by up to 70% during load-shedding while protecting the genset."
  },
  {
    id: "faq-7",
    category: "agricultural",
    categoryLabel: "Agricultural Pumps",
    question: "How does an agricultural solar water pump operate during cloudy days?",
    answer: "Our agricultural solar water pumps utilize intelligent Vector Variable Frequency Drives (VFD) with high-efficiency MPPT (Maximum Power Point Tracking) algorithms. The controller dynamically adjusts motor RPM and frequency based on available solar irradiance, continuing to deliver water from deep borewells even on hazy or overcast days without stalling the motor."
  },
  {
    id: "faq-8",
    category: "agricultural",
    categoryLabel: "Agricultural Pumps",
    question: "What subsidy is available for farmers under the PM-KUSUM scheme?",
    answer: "Under Component B of the PM-KUSUM scheme, farmers receive up to 60% combined subsidy (30% Central Financial Assistance + 30% State Government subsidy) for standalone solar water pumping systems ranging from 3 HP to 10 HP. The farmer contributes only 10% to 40% of the benchmark cost, with subsidized agricultural bank loans available for the farmer share."
  },
  {
    id: "faq-9",
    category: "technical",
    categoryLabel: "Technical & Maintenance",
    question: "How much maintenance does a solar rooftop system require?",
    answer: "Solar systems have zero moving parts and require minimal maintenance. Routine maintenance primarily involves washing dust and debris off the panel glass surface with clean water every 10 to 15 days to maximize light absorption. Energy Man India also provides comprehensive Operations & Maintenance (O&M) packages including electrical torque checks, thermal scanning, and cloud telemetry monitoring."
  },
  {
    id: "faq-10",
    category: "technical",
    categoryLabel: "Technical & Maintenance",
    question: "What happens during rainy days or at night? Will I have electricity?",
    answer: "For on-grid solar systems, your building remains seamlessly connected to the state electricity grid. At night or during heavy rain when solar panels produce less, electricity flows automatically from the grid with zero interruption. If you opt for a Hybrid Solar System with Battery Energy Storage (LiFePO4), stored solar energy powers your building through grid blackouts."
  }
];
