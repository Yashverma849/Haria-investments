export type RiskLevel = "High Risk" | "Low Risk" | "Moderate Risk";

export type FundClassification = {
  title: string;
  items: string[];
  note?: string;
};

export type FundCategory = {
  id: string;
  title: string;
  risk: RiskLevel;
  description: string;
  tenure: string;
  minAmount: string;
  image: string;
  classifications: FundClassification[];
  benefits: string[];
};

export type NavTableRow = {
  transactionType: string;
  condition: string;
  applicableNav: string;
};

export type AmcPartner = {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  /** Bump logos that read small at the default marquee size */
  logoSize?: "lg" | "xl";
};

export const mutualFundsHero = {
  eyebrow: "Investment Categories",
  title: "Choose Your Fund Type",
  description:
    "Select the right fund type based on your goals and risk appetite",
};

export const fundCategories: FundCategory[] = [
  {
    id: "equity",
    title: "Equity Mutual Funds",
    risk: "High Risk",
    description: "High growth potential with market-linked returns",
    tenure: "5+ years",
    minAmount: "₹500",
    image: "/images/services/investment-mutual-funds.jpg",
    classifications: [
      {
        title: "Market Cap Based Active Funds",
        items: ["Large Cap", "Mid Cap", "Small Cap", "Flexi Cap", "Multi Cap"],
      },
      {
        title: "Index Funds",
        items: [
          "Nifty 50",
          "Nifty Next 50",
          "Nifty 100",
          "Midcap150",
          "Smallcap",
          "Microcap",
          "Total Market Index Fund",
        ],
        note: "These are passive funds which mirror the index performance.",
      },
      {
        title: "Sectoral and Thematic Funds",
        items: [
          "Financial Services",
          "Pharma",
          "Technology",
          "Consumption",
          "Infrastructure",
          "and many more",
        ],
      },
    ],
    benefits: [
      "Market growth",
      "High returns",
      "Long-term focus",
      "Diversification",
    ],
  },
  {
    id: "debt",
    title: "Debt Funds",
    risk: "Low Risk",
    description: "Stable returns with lower risk profile",
    tenure: "1–3 years",
    minAmount: "₹500",
    image: "/images/services/investment-fixed-income.jpg",
    classifications: [
      {
        title: "Short Term Debt Funds",
        items: [
          "Liquid Funds",
          "Ultra Short Term Funds",
          "Money Market Funds",
          "Low Duration Funds",
        ],
        note: "For your short term needs of less than year.",
      },
      {
        title: "Medium Term to Long Term Debt Funds",
        items: [
          "Medium Term Funds",
          "Long Term Funds",
          "Corporate Bond Funds",
          "Dynamic Bond Fund",
          "Banking and PSU Fund",
        ],
      },
      {
        title: "Government Securities Fund",
        items: ["Invests only in Government Securities"],
      },
    ],
    benefits: [
      "Stable returns",
      "Lower risk",
      "Regular income",
      "Capital preservation",
    ],
  },
  {
    id: "hybrid",
    title: "Hybrid Funds",
    risk: "Moderate Risk",
    description: "Balanced approach with equity and debt mix",
    tenure: "3–5 years",
    minAmount: "₹500",
    image: "/images/services/investment.jpg",
    classifications: [
      {
        title: "Equity Oriented Hybrid Funds",
        items: ["Balanced mix with higher equity allocation"],
      },
      {
        title: "Debt Oriented Hybrid Funds",
        items: ["Balanced mix with higher debt allocation"],
      },
      {
        title: "Multi Asset Funds",
        items: ["Diversified across multiple asset classes"],
      },
    ],
    benefits: [
      "Balanced risk",
      "Moderate returns",
      "Flexible allocation",
      "Tax efficiency",
    ],
  },
  {
    id: "international",
    title: "International Funds",
    risk: "High Risk",
    description:
      "Get exposure to global securities by investing in international funds",
    tenure: "5+ years",
    minAmount: "₹500",
    image: "/images/heroes/hero-equity-investment.jpg",
    classifications: [
      {
        title: "International Funds",
        items: [
          "Get exposure to global securities by investing in international funds.",
        ],
      },
    ],
    benefits: [
      "Global diversification",
      "Currency exposure",
      "International markets",
      "Long-term growth",
    ],
  },
];

export const amcPartners: AmcPartner[] = [
  {
    id: "hdfc",
    name: "HDFC Asset Management",
    shortName: "HDFC",
    logo: "/images/hdfc-removebg-preview.png",
  },
  {
    id: "icici",
    name: "ICICI Prudential AMC",
    shortName: "ICICI",
    logo: "/images/icici-removebg-preview.png",
  },
  {
    id: "axis",
    name: "Axis Mutual Fund",
    shortName: "AXIS",
    logo: "/images/axis-removebg-preview.png",
  },
  {
    id: "kotak",
    name: "Kotak Mahindra AMC",
    shortName: "KOTAK",
    logo: "/images/kotak-removebg-preview.png",
  },
  {
    id: "hsbc",
    name: "HSBC Mutual Fund",
    shortName: "HSBC",
    logo: "/images/hsbc-removebg-preview.png",
  },
  {
    id: "tata",
    name: "Tata Mutual Fund",
    shortName: "TATA",
    logo: "/images/tata-removebg-preview.png",
  },
  {
    id: "nippon",
    name: "Nippon India Mutual Fund",
    shortName: "NIPPON",
    logo: "/images/nippon-removebg-preview.png",
    logoSize: "xl",
  },
];

export const partnersSection = {
  label: "Trusted Partners",
};

export const navApplicabilityRows: NavTableRow[] = [
  {
    transactionType: "Purchase (Liquid / Overnight)",
    condition: "Before 1:30 PM & funds credited same day",
    applicableNav: "Previous business day NAV",
  },
  {
    transactionType: "Purchase (Liquid / Overnight)",
    condition: "After 1:30 PM",
    applicableNav: "Same day NAV (if credited before next cut-off)",
  },
  {
    transactionType: "Purchase (Liquid / Overnight)",
    condition: "Funds credited after cut-off",
    applicableNav: "NAV of day funds are credited",
  },
  {
    transactionType: "Purchase (Equity/Debt/Hybrid ≤ ₹2L)",
    condition: "Before 3:00 PM",
    applicableNav: "Same day NAV",
  },
  {
    transactionType: "Purchase (Equity/Debt/Hybrid ≤ ₹2L)",
    condition: "After 3:00 PM",
    applicableNav: "Next business day NAV",
  },
  {
    transactionType: "Purchase (> ₹2L)",
    condition: "Funds credited before 3:00 PM",
    applicableNav: "Same day NAV",
  },
  {
    transactionType: "Purchase (> ₹2L)",
    condition: "Funds credited after 3:00 PM",
    applicableNav: "NAV of day funds are credited",
  },
  {
    transactionType: "Redemption (All Funds)",
    condition: "Before 3:00 PM",
    applicableNav: "Same day NAV",
  },
  {
    transactionType: "Redemption (All Funds)",
    condition: "After 3:00 PM",
    applicableNav: "Next business day NAV",
  },
  {
    transactionType: "Switch Transactions",
    condition: "Switch-Out treated as Redemption",
    applicableNav: "Redemption cut-off applies",
  },
  {
    transactionType: "Switch Transactions",
    condition: "Switch-In treated as Purchase",
    applicableNav: "Purchase cut-off applies",
  },
];

export const navImportantNotes = [
  "Funds credited means actual realization in AMC's bank account, not cheque submission.",
  "Business day excludes weekends and market holidays.",
  "For online transactions, AMC/RTA system timestamp is considered.",
  "For amounts above ₹2 lakh, realization timing determines NAV applicability.",
  "In switch transactions, both legs (outgoing and incoming) are treated separately.",
];
