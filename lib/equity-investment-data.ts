export type RiskLevel = "Moderate Risk" | "High Risk" | "Very High Risk";

export type InvestmentOption = {
  id: string;
  title: string;
  risk: RiskLevel;
  description: string;
  tenure: string;
  minAmount: string;
  features: readonly [string, string, string, string];
  image: string;
};

export const equityInvestmentHero = {
  eyebrow: "Investment Options",
  title: "Ways to invest with us",
  description:
    "Explore diverse investment options tailored to your financial goals",
} as const;

export const investmentOptions: InvestmentOption[] = [
  {
    id: "indian-equities",
    title: "Indian Equities",
    risk: "High Risk",
    description:
      "Direct ownership in listed Indian companies across market caps. Built for long term wealth creation with disciplined stock selection.",
    tenure: "5+ years",
    minAmount: "₹500",
    features: [
      "Direct ownership",
      "Long-term wealth",
      "Disciplined selection",
      "Market cap diversity",
    ],
    image:
      "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&q=80",
  },
  {
    id: "sectoral-etfs",
    title: "Sectoral and Thematic ETFs",
    risk: "Moderate Risk",
    description:
      "Target specific themes like IT, Pharma, Banking, Energy or global megatrends. Ideal when you want focused exposure without stock picking.",
    tenure: "3-5 years",
    minAmount: "₹500",
    features: [
      "Thematic exposure",
      "Focused strategy",
      "No stock picking",
      "Diversified themes",
    ],
    image:
      "https://images.unsplash.com/photo-1642790106117-e829e14a08fe?w=800&q=80",
  },
  {
    id: "reits-invits",
    title: "REITs and INVITs",
    risk: "Moderate Risk",
    description:
      "Earn regular income by investing in commercial real estate and infrastructure assets. Think rent and tolls without owning physical property.",
    tenure: "3+ years",
    minAmount: "₹5,000",
    features: [
      "Regular income",
      "Real estate exposure",
      "Infrastructure assets",
      "No physical ownership",
    ],
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
  },
  {
    id: "pms",
    title: "PMS (Portfolio Management Services)",
    risk: "Moderate Risk",
    description:
      "Customized equity portfolios managed by professionals based on your risk profile. Minimum investment of ₹50 lakhs as mandated by SEBI.",
    tenure: "3-5 years",
    minAmount: "₹50 Lakhs",
    features: [
      "Professional management",
      "Customized portfolios",
      "Risk-based approach",
      "SEBI regulated",
    ],
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
  },
  {
    id: "aif",
    title: "AIF (Alternate Investment Funds)",
    risk: "High Risk",
    description:
      "Access private equity, structured credit, and alternative strategies beyond public markets. Minimum investment of ₹1 crore as per SEBI regulations.",
    tenure: "5+ years",
    minAmount: "₹1 Crore",
    features: [
      "Private equity",
      "Structured credit",
      "Alternative strategies",
      "SEBI regulated",
    ],
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
  },
  {
    id: "imp",
    title: "IMP (Intelligent Model Portfolio)",
    risk: "Moderate Risk",
    description:
      "Rule based portfolio strategy managed by Motilal that dynamically allocates assets. Designed to balance growth and risk using proven models.",
    tenure: "3-5 years",
    minAmount: "₹25,000",
    features: [
      "Rule-based strategy",
      "Dynamic allocation",
      "Growth & risk balance",
      "Proven models",
    ],
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
  },
  {
    id: "global-investments",
    title: "Global Investments (US and International ETFs)",
    risk: "High Risk",
    description:
      "Invest in US stocks and global ETFs or Indian listed ETFs tracking US and Chinese indices. Choose to invest in INR or USD across international markets.",
    tenure: "5+ years",
    minAmount: "₹5,000",
    features: [
      "US stocks",
      "Global ETFs",
      "INR or USD",
      "International markets",
    ],
    image:
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&q=80",
  },
  {
    id: "unlisted-shares",
    title: "Unlisted Shares",
    risk: "Very High Risk",
    description:
      "Early access to high potential companies before they go public. Higher risk, higher upside, suitable for investors with patience and conviction.",
    tenure: "5+ years",
    minAmount: "₹1,00,000",
    features: [
      "Early access",
      "Pre-IPO companies",
      "High upside",
      "Patient investors",
    ],
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  },
];
