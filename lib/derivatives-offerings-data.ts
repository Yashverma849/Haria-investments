import type { ProtectionPlan } from "@/lib/life-insurance-data";

export const derivativesOfferingsSection = {
  eyebrow: "Derivatives Offerings",
  title: "Diverse Trading Opportunities",
  description: "Purpose-built frameworks across asset classes",
} as const;

export const derivativesOfferings: ProtectionPlan[] = [
  {
    id: "currency-futures-options",
    title: "Currency Futures & Options",
    monthlyPremium: "FX",
    description:
      "INR hedging for importers/exporters and tactical views.",
    tenure: "Flexible",
    minAmount: "Variable",
    features: [
      "INR hedging strategies",
      "Import/export protection",
      "Tactical positioning",
      "Expert guidance",
    ],
    image: "/images/services/commodities-derivation.jpg",
  },
  {
    id: "energy-agri",
    title: "Energy & Agri",
    monthlyPremium: "Commodities",
    description:
      "Exposure frameworks for crude, natural gas, and select agri.",
    tenure: "Customized",
    minAmount: "As per need",
    features: [
      "Crude oil exposure",
      "Natural gas trading",
      "Agricultural commodities",
      "Risk frameworks",
    ],
    image: "/images/services/commodities.jpg",
  },
  {
    id: "index-derivatives",
    title: "Index Derivatives",
    monthlyPremium: "Equity",
    description:
      "Defined-risk spreads and tactical positioning on indices.",
    tenure: "Flexible",
    minAmount: "Variable",
    features: [
      "Index futures & options",
      "Spread strategies",
      "Defined risk approach",
      "Tactical positioning",
    ],
    image: "/images/services/investment-equity.jpg",
  },
];
