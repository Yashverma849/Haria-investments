import type { ProtectionPlan } from "@/lib/life-insurance-data";

export const commodityTradingProductsSection = {
  eyebrow: "Trading Products",
  title: "Derivative Trading Options",
  description: "Choose from futures, options, and direct commodity trading",
} as const;

export const commodityTradingProducts: ProtectionPlan[] = [
  {
    id: "futures-trading",
    title: "Futures Trading",
    monthlyPremium: "High Leverage",
    description: "Trade standardized contracts with leverage",
    tenure: "1 day to 1 month",
    minAmount: "₹3,00,000",
    features: [
      "High leverage opportunities",
      "Standardized contracts",
      "High liquidity",
      "Effective hedging tool",
    ],
    image: "/images/commodities/futures-options.jpg",
  },
  {
    id: "options-trading",
    title: "Options Trading",
    monthlyPremium: "Limited Risk",
    description: "Advanced derivatives",
    tenure: "1 day to 1 month",
    minAmount: "₹3,00,000",
    features: [
      "Unlimited profit potential",
      "Flexible strategies",
      "Multiple trading approaches",
    ],
    image: "/images/services/commodities-derivation.jpg",
  },
  {
    id: "commodity-trading",
    title: "Commodity Trading",
    monthlyPremium: "Inflation Hedge",
    description: "",
    tenure: "1 day to 1 month",
    minAmount: "₹3,00,000",
    features: [
      "Physical delivery option",
      "Spot trading available",
      "Portfolio diversification",
      "Inflation hedge protection",
    ],
    image: "/images/services/commodities.jpg",
  },
];

export const commodityMarketInsightsSection = {
  eyebrow: "Market Insights",
  title: "Expert Analysis & Insights",
  description: "Stay ahead with expert analysis and market updates",
} as const;

export const commodityMarketInsights: ProtectionPlan[] = [
  {
    id: "technical-analysis",
    title: "Technical Analysis",
    monthlyPremium: "",
    description: "",
    tenure: "",
    minAmount: "",
    features: [],
    image: "/images/services/investment-equity.jpg",
  },
  {
    id: "market-reports",
    title: "Market Reports",
    monthlyPremium: "",
    description: "",
    tenure: "",
    minAmount: "",
    features: [],
    image: "/images/services/commodities-derivation.jpg",
  },
  {
    id: "trading-signals",
    title: "Trading Signals",
    monthlyPremium: "",
    description: "",
    tenure: "",
    minAmount: "",
    features: [],
    image: "/images/services/commodities-trading.jpg",
  },
];
