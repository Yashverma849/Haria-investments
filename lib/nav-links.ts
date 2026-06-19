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

export const mainNavLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
] as const;

export const serviceCategories: ServiceCategory[] = [
  {
    label: "Insurance",
    href: "/insurance",
    description: "Protect what matters with life and general insurance.",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
    items: [
      {
        label: "Life",
        href: "/insurance/life",
        description: "Secure your family's future.",
        image:
          "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80",
      },
      {
        label: "General",
        href: "/insurance/general",
        description: "Coverage for health, motor, and more.",
        image:
          "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
      },
    ],
  },
  {
    label: "Investment",
    href: "/investment",
    description: "Grow wealth with expert-guided investment plans.",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
    items: [
      {
        label: "Mutual Funds",
        href: "/investment/mutual-funds",
        description: "Diversified funds for every goal.",
        image:
          "https://images.unsplash.com/photo-1642790106117-e829e14a08fe?w=800&q=80",
      },
      {
        label: "Equity Investments",
        href: "/investment/equity",
        description: "Direct equity strategies for growth.",
        image:
          "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&q=80",
      },
      {
        label: "Fixed Income",
        href: "/investment/fixed-income",
        description: "Stable returns with lower volatility.",
        image:
          "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
      },
    ],
  },
  {
    label: "Commodities",
    href: "/commodities",
    description: "Trade and invest in gold, silver, and more.",
    image:
      "https://images.unsplash.com/photo-1610375461246-83c859d2e4c8?w=800&q=80",
    items: [
      {
        label: "Commodity Training",
        href: "/commodities/training",
        description: "Learn commodity market fundamentals.",
        image:
          "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
      },
      {
        label: "Silver and Gold",
        href: "/commodities/silver-gold",
        description: "Precious metals for portfolio balance.",
        image:
          "https://images.unsplash.com/photo-1624365168968-f283d507fecc?w=800&q=80",
      },
      {
        label: "Other Derivation",
        href: "/commodities/derivation",
        description: "Derivatives and advanced instruments.",
        image:
          "https://images.unsplash.com/photo-1642790106117-e829e14a08fe?w=800&q=80",
      },
    ],
  },
  {
    label: "Calculator",
    href: "/calculator",
    description: "Plan smarter with financial calculators.",
    image:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80",
    items: [
      {
        label: "SIP",
        href: "/calculator/sip",
        description: "Estimate systematic investment returns.",
        image:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      },
      {
        label: "SWP",
        href: "/calculator/swp",
        description: "Plan systematic withdrawal payouts.",
        image:
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      },
      {
        label: "Lump Sum",
        href: "/calculator/lump-sum",
        description: "Project one-time investment growth.",
        image:
          "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80",
      },
      {
        label: "CAGR",
        href: "/calculator/cagr",
        description: "Measure compound annual growth.",
        image:
          "https://images.unsplash.com/photo-1553729450-ef036fd3022d?w=800&q=80",
      },
    ],
  },
  {
    label: "Financial Health Form",
    href: "/financial-health",
    description: "Assess your financial wellness in minutes.",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
  },
];

export const scheduleConsultation = {
  label: "Schedule Consultation",
  href: "/contact",
};
