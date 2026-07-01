export type BullionBadge = "Risk Managed" | "Liquid" | "Disciplined";

export type BullionOffering = {
  id: string;
  title: string;
  badge: BullionBadge;
  description: string;
  tenure: string;
  minAmount: string;
  benefits: string[];
  image: string;
};

export const bullionOfferingsSection = {
  eyebrow: "Bullion Offerings",
  title: "Strategic Bullion Solutions",
  description:
    "Institutional frameworks adapted for individual investors",
};

export const bullionOfferings: BullionOffering[] = [
  {
    id: "bullion-futures",
    title: "Bullion Futures",
    badge: "Risk Managed",
    description:
      "Participate in Gold & Silver price moves with prudent position sizing.",
    tenure: "Flexible",
    minAmount: "Variable",
    benefits: [
      "Leverage opportunities",
      "Professional guidance",
      "Market analysis",
      "Risk controls",
    ],
    image: "/images/commodities/silver-gold/bullion-futures.jpg",
  },
  {
    id: "gold-silver-sip",
    title: "Systematic Investment in Gold and Silver Mutual Funds",
    badge: "Disciplined",
    description:
      "Build wealth gradually through systematic investment plans in gold and silver mutual funds.",
    tenure: "Long-term",
    minAmount: "Flexible",
    benefits: [
      "Rupee cost averaging",
      "Systematic approach",
      "Long-term wealth building",
      "Professional fund management",
    ],
    image: "/images/commodities/silver-gold/gold-silver-sip-mutual-funds.jpg",
  },
  {
    id: "gold-silver-etf",
    title: "Gold and Silver ETF",
    badge: "Liquid",
    description:
      "Invest in gold and silver through Exchange Traded Funds for easy liquidity and diversification.",
    tenure: "Flexible",
    minAmount: "Variable",
    benefits: [
      "High liquidity",
      "Easy trading",
      "Portfolio diversification",
      "Transparent pricing",
    ],
    image: "/images/commodities/silver-gold/gold-silver-etf.jpg",
  },
];
