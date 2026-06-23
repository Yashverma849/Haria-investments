export type ServiceOffering = {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
  textTone: "light" | "dark";
};

export const serviceOfferings: ServiceOffering[] = [
  {
    id: "insurance",
    title: "Life & General Insurance",
    description:
      "Comprehensive coverage for you and your family's financial security",
    href: "/insurance",
    image:
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1600&q=80",
    textTone: "light",
  },
  {
    id: "mutual-funds",
    title: "Mutual Funds & Equity",
    description:
      "Strategic investment solutions for long-term wealth creation",
    href: "/investment/mutual-funds",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1600&q=80",
    textTone: "light",
  },
  {
    id: "fixed-income",
    title: "Fixed Income",
    description:
      "Stable returns through diversified fixed income instruments",
    href: "/investment/fixed-income",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1600&q=80",
    textTone: "light",
  },
  {
    id: "commodities",
    title: "Commodity Derivative Trading",
    description:
      "Expert guidance in commodity markets and derivatives",
    href: "/commodities/derivation",
    image: "/images/Gemini_Generated_Image_hfmgzahfmgzahfmg.png",
    textTone: "light",
  },
];
