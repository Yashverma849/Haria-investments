export type NavItem = {
  label: string;
  href: string;
  image?: string;
  description?: string;
};

export type ServiceCategory = {
  label: string;
  href: string;
  description: string;
  image: string;
  items?: NavItem[];
};

const serviceImages = {
  insurance: "/images/services/insurance.jpg",
  insuranceLife: "/images/services/insurance-life.jpg",
  insuranceGeneral: "/images/services/insurance-general.jpg",
  investment: "/images/services/investment.jpg",
  mutualFunds: "/images/services/investment-mutual-funds.jpg",
  equity: "/images/services/investment-equity.jpg",
  fixedIncome: "/images/services/investment-fixed-income.jpg",
  commodities: "/images/services/commodities.jpg",
  commodityTrading: "/images/services/commodities-trading.jpg",
  silverGold: "/images/services/commodities-silver-gold.jpg",
  derivation: "/images/services/commodities-derivation.jpg",
  calculator: "/images/services/calculator.jpg",
  sip: "/images/services/calculator-sip.jpg",
  swp: "/images/services/calculator-swp.jpg",
  lumpSum: "/images/services/calculator-lump-sum.jpg",
  cagr: "/images/services/calculator-cagr.jpg",
  financialHealth: "/images/services/financial-health-assessment.jpg",
} as const;

export const mainNavLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Health Form", href: "/financial-health" },
  { label: "Testimonials", href: "/#testimonials" },
] as const;

export const calculatorNav = {
  label: "Calculator",
  href: "/calculator/sip",
} as const;

export const calculatorNavItems: NavItem[] = [
  {
    label: "SIP Calculator",
    href: "/calculator/sip",
    description: "Estimate systematic investment returns.",
    image: serviceImages.sip,
  },
  {
    label: "SWP Calculator",
    href: "/calculator/swp",
    description: "Plan systematic withdrawal payouts.",
    image: serviceImages.swp,
  },
  {
    label: "CAGR Calculator",
    href: "/calculator/cagr",
    description: "Measure compound annual growth.",
    image: serviceImages.cagr,
  },
  {
    label: "Lump Sum Calculator",
    href: "/calculator/lump-sum",
    description: "Project one-time investment growth.",
    image: serviceImages.lumpSum,
  },
];

export const serviceCategories: ServiceCategory[] = [
  {
    label: "Insurance",
    href: "/insurance",
    description: "Protect what matters with life and general insurance.",
    image: serviceImages.insurance,
    items: [
      {
        label: "Life",
        href: "/insurance/life",
        description: "Secure your family's future.",
        image: serviceImages.insuranceLife,
      },
      {
        label: "General",
        href: "/insurance/general",
        description: "Coverage for health, motor, and more.",
        image: serviceImages.insuranceGeneral,
      },
    ],
  },
  {
    label: "Investment",
    href: "/investment",
    description: "Grow wealth with expert-guided investment plans.",
    image: serviceImages.investment,
    items: [
      {
        label: "Mutual Funds",
        href: "/investment/mutual-funds",
        description: "Diversified funds for every goal.",
        image: serviceImages.mutualFunds,
      },
      {
        label: "Equity Investments",
        href: "/investment/equity",
        description: "Direct equity strategies for growth.",
        image: serviceImages.equity,
      },
      {
        label: "Fixed Income",
        href: "/investment/fixed-income",
        description: "Stable returns with lower volatility.",
        image: serviceImages.fixedIncome,
      },
    ],
  },
  {
    label: "Commodities",
    href: "/commodities",
    description: "Trade and invest in gold, silver, and more.",
    image: serviceImages.commodities,
    items: [
      {
        label: "Commodity Trading",
        href: "/commodities/trading",
        description: "Trade commodity futures, options, and spot markets.",
        image: serviceImages.commodityTrading,
      },
      {
        label: "Silver and Gold",
        href: "/commodities/silver-gold",
        description: "Precious metals for portfolio balance.",
        image: serviceImages.silverGold,
      },
      {
        label: "Other Derivatives",
        href: "/commodities/derivation",
        description: "Derivatives and advanced instruments.",
        image: serviceImages.derivation,
      },
      {
        label: "Research & Insights",
        href: "/commodities/research",
        description: "Technical analysis, market reports, and trading signals.",
        image: serviceImages.commodities,
      },
    ],
  },
];

export const scheduleConsultation = {
  label: "Schedule Consultation",
  href: "/contact",
};
