export type CommodityHighlight = {
  id: string;
  number: string;
  title: string;
  description: string;
  image?: string;
};

export type CommodityPageContent = {
  eyebrow: string;
  title: string;
  description: string;
  sectionTitle: string;
  sectionDescription: string;
  cardLayout?: "grid" | "expandable";
  highlights: CommodityHighlight[];
};

export const commodityTrading: CommodityPageContent = {
  eyebrow: "Commodities",
  title: "Commodity Trading",
  description:
    "Trade commodity markets with structured guidance—from exchange basics to futures, options, and risk management.",
  sectionTitle: "Trading Essentials",
  sectionDescription:
    "Practical modules designed for investors and traders who want clarity before participating in commodity markets.",
  highlights: [
    {
      id: "basics",
      number: "01",
      title: "Market Fundamentals",
      description:
        "Understand how commodity exchanges work, contract specifications, lot sizes, and the role of MCX and international benchmarks.",
      image: "/images/commodities/market-fundamentals.jpg",
    },
    {
      id: "instruments",
      number: "02",
      title: "Futures & Options",
      description:
        "Learn how futures and options on gold, silver, crude, and agri commodities are priced, traded, and settled.",
      image: "/images/commodities/futures-options.jpg",
    },
    {
      id: "risk",
      number: "03",
      title: "Risk Management",
      description:
        "Position sizing, margin requirements, stop-loss discipline, and hedging strategies to protect capital.",
      image: "/images/commodities/risk-management.jpg",
    },
    {
      id: "strategy",
      number: "04",
      title: "Trading Frameworks",
      description:
        "Trend, range, and event-driven approaches—with emphasis on process over speculation.",
      image: "/images/commodities/trading-frameworks.jpg",
    },
  ],
};

export const commoditySilverGold: CommodityPageContent = {
  eyebrow: "Commodities",
  title: "Silver & Gold",
  description:
    "Precious metals for portfolio balance—physical, digital, and exchange-traded routes with guidance on allocation and timing.",
  sectionTitle: "Investment Avenues",
  sectionDescription:
    "Diversify with gold and silver through instruments suited to your horizon, liquidity needs, and risk profile.",
  cardLayout: "expandable",
  highlights: [
    {
      id: "physical",
      number: "01",
      title: "Physical Gold & Silver",
      description:
        "Coins, bars, and jewellery-grade bullion with purity verification and secure storage considerations.",
      image: "/images/commodities/silver-gold/physical-bullion.jpg",
    },
    {
      id: "etf",
      number: "02",
      title: "Gold & Silver ETFs",
      description:
        "Exchange-listed funds that track domestic bullion prices—efficient for long-term allocation without storage hassle.",
      image: "/images/commodities/silver-gold/gold-silver-etfs.jpg",
    },
    {
      id: "sovereign",
      number: "03",
      title: "Sovereign Gold Bonds",
      description:
        "Government-backed paper gold with periodic interest and tax advantages for qualifying holding periods.",
      image: "/images/commodities/silver-gold/sovereign-gold-bonds.jpg",
    },
    {
      id: "mcx",
      number: "04",
      title: "MCX Futures & Options",
      description:
        "Leveraged exposure for hedging or tactical trades—with margin, rollover, and volatility managed professionally.",
      image: "/images/commodities/silver-gold/mcx-futures.jpg",
    },
  ],
};

export const commodityDerivation: CommodityPageContent = {
  eyebrow: "Commodities",
  title: "Other Derivatives",
  description:
    "Structured strategies across commodity derivatives—futures, options, and spreads—for hedging and informed participation.",
  sectionTitle: "Derivative Solutions",
  sectionDescription:
    "Expert guidance on advanced commodity instruments beyond spot and physical holdings.",
  highlights: [
    {
      id: "futures",
      number: "01",
      title: "Commodity Futures",
      description:
        "Crude oil, natural gas, metals, and agri contracts on MCX with execution and rollover support.",
    },
    {
      id: "options",
      number: "02",
      title: "Commodity Options",
      description:
        "Defined-risk strategies using calls and puts on key contracts for hedging or directional views.",
    },
    {
      id: "spreads",
      number: "03",
      title: "Calendar & Inter-Commodity Spreads",
      description:
        "Relative-value trades across expiries and related commodities to reduce outright directional risk.",
    },
    {
      id: "hedging",
      number: "04",
      title: "Corporate Hedging",
      description:
        "Tailored hedging programs for businesses exposed to input costs in energy, metals, or agri commodities.",
    },
  ],
};
