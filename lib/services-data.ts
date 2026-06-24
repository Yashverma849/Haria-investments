export type ServiceOffering = {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
  textTone: "light" | "dark";
};

const homeServiceImages = {
  insurance: "/images/home-services/band-insurance.jpg",
  mutualFundsEquity: "/images/home-services/band-mutual-funds-equity.jpg",
  fixedIncome: "/images/home-services/band-fixed-income.jpg",
  commodities: "/images/home-services/band-commodities.jpg",
} as const;

export const serviceOfferings: ServiceOffering[] = [
  {
    id: "insurance",
    title: "Life & General Insurance",
    description:
      "Comprehensive coverage for you and your family's financial security",
    href: "/insurance/life",
    image: homeServiceImages.insurance,
    textTone: "light",
  },
  {
    id: "mutual-funds",
    title: "Mutual Funds & Equity",
    description:
      "Strategic investment solutions for long-term wealth creation",
    href: "/investment/mutual-funds",
    image: homeServiceImages.mutualFundsEquity,
    textTone: "light",
  },
  {
    id: "fixed-income",
    title: "Fixed Income",
    description:
      "Stable returns through diversified fixed income instruments",
    href: "/investment/fixed-income",
    image: homeServiceImages.fixedIncome,
    textTone: "light",
  },
  {
    id: "commodities",
    title: "Commodity Derivative Trading",
    description:
      "Expert guidance in commodity markets and derivatives",
    href: "/commodities/derivation",
    image: homeServiceImages.commodities,
    textTone: "light",
  },
];
