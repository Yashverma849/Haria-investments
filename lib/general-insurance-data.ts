export type InsurancePlan = {
  id: string;
  title: string;
  startingPrice: string;
  description: string;
  tenure: string;
  minAmount: string;
  features: string[];
  image: string;
};

export type InsuranceCategory = {
  id: string;
  title: string;
  description: string;
  plans: InsurancePlan[];
};

export const generalInsuranceHero = {
  eyebrow: "Our Insurance Services",
  title: "All Insurance Services",
  description: "Complete protection for every aspect of your life",
};

export const insuranceCategories: InsuranceCategory[] = [
  {
    id: "motor",
    title: "Motor Insurance",
    description: "Comprehensive protection for your vehicle",
    plans: [
      {
        id: "comprehensive-coverage",
        title: "Comprehensive Coverage",
        startingPrice: "Starting ₹1,000/year",
        description:
          "Complete coverage including own damage and third party",
        tenure: "1–3 years",
        minAmount: "₹5,000",
        features: [
          "Own damage cover",
          "Third party liability",
          "24/7 roadside assistance",
          "Cashless repairs",
        ],
        image:
          "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80",
      },
      {
        id: "third-party-only",
        title: "Third Party Only",
        startingPrice: "Starting ₹800/year",
        description:
          "Legal compliance coverage for third party damages",
        tenure: "1–3 years",
        minAmount: "₹2,000",
        features: [
          "Legal compliance",
          "Third party liability",
          "Affordable premium",
          "Quick issuance",
        ],
        image:
          "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
      },
      {
        id: "zero-depreciation",
        title: "Zero Depreciation",
        startingPrice: "Starting ₹2,000/year",
        description: "Get full claim value without depreciation",
        tenure: "1–3 years",
        minAmount: "₹8,000",
        features: [
          "No depreciation",
          "Full claim value",
          "Premium coverage",
          "New car benefits",
        ],
        image:
          "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80",
      },
    ],
  },
  {
    id: "fire",
    title: "Fire Insurance",
    description: "Comprehensive fire protection coverage",
    plans: [
      {
        id: "fire-allied-perils",
        title: "Fire & Allied Perils",
        startingPrice: "Starting ₹1,000/year",
        description: "Covers loss due to fire, explosion etc.",
        tenure: "1–3 years",
        minAmount: "₹50,000",
        features: [
          "Fire damage cover",
          "Flood damage cover",
          "Explosion coverage",
          "Quick settlement",
        ],
        image:
          "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80",
      },
    ],
  },
  {
    id: "property",
    title: "Property Insurance",
    description: "Protect your home and commercial properties",
    plans: [
      {
        id: "home-insurance",
        title: "Home Insurance",
        startingPrice: "Starting ₹1,000/year",
        description:
          "Complete home structure and contents protection",
        tenure: "1–3 years",
        minAmount: "₹1 Lakh",
        features: [
          "Structure cover",
          "Contents protection",
          "Natural calamities",
          "Theft coverage",
        ],
        image:
          "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
      },
    ],
  },
  {
    id: "travel",
    title: "Travel Insurance",
    description: "Global travel protection and assistance",
    plans: [
      {
        id: "international-travel",
        title: "International Travel",
        startingPrice: "Starting ₹500/per trip",
        description: "Worldwide travel coverage and assistance",
        tenure: "Per trip",
        minAmount: "50k dollars",
        features: [
          "Global coverage",
          "Emergency evacuation",
          "Passport loss",
          "24/7 assistance",
        ],
        image:
          "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80",
      },
      {
        id: "business-travel",
        title: "Business Travel",
        startingPrice: "Starting ₹300/day",
        description: "Corporate travel protection plans",
        tenure: "Annual/Per trip",
        minAmount: "50k dollars",
        features: [
          "Business equipment",
          "Meeting delays",
          "Corporate benefits",
          "Multi-trip options",
        ],
        image:
          "https://images.unsplash.com/photo-1436491865332-7a61a685cc74?w=800&q=80",
      },
    ],
  },
];

export type WhyChooseItem = {
  id: string;
  number: string;
  title: string;
  description: string;
};

export const whyChooseInsurance = {
  eyebrow: "Why Choose Us",
  title: "Why Choose Our Insurance Services?",
  description:
    "Comprehensive protection with expert guidance and support",
  items: [
    {
      id: "claims",
      number: "01",
      title: "99% Claims Settled",
      description:
        "Fast and hassle-free claims processing with one of the highest settlement rates in the industry.",
    },
    {
      id: "support",
      number: "02",
      title: "24/7 Support",
      description:
        "Round-the-clock assistance for all your insurance needs with our dedicated support team.",
    },
    {
      id: "prices",
      number: "03",
      title: "Best Prices",
      description:
        "Competitive premiums with maximum coverage, ensuring you get the best value for your money.",
    },
    {
      id: "guidance",
      number: "04",
      title: "Expert Guidance",
      description:
        "Get personalized advice from our insurance experts to choose the right coverage for your needs.",
    },
  ] satisfies WhyChooseItem[],
};
