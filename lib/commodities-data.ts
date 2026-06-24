export type CommodityHighlight = {
  id: string;
  number: string;
  title: string;
  description: string;
};

export type CommodityPageContent = {
  eyebrow: string;
  title: string;
  description: string;
  sectionTitle: string;
  sectionDescription: string;
  highlights: CommodityHighlight[];
};

export const commodityTraining: CommodityPageContent = {
  eyebrow: "Commodities",
  title: "Commodity Training",
  description:
    "Build a strong foundation in commodity markets with structured learning—from exchange basics to risk management and live market context.",
  sectionTitle: "What You Will Learn",
  sectionDescription:
    "Practical modules designed for investors and traders who want clarity before participating in commodity markets.",
  highlights: [
    {
      id: "basics",
      number: "01",
      title: "Market Fundamentals",
      description:
        "Understand how commodity exchanges work, contract specifications, lot sizes, and the role of MCX and international benchmarks.",
    },
    {
      id: "instruments",
      number: "02",
      title: "Futures & Options",
      description:
        "Learn how futures and options on gold, silver, crude, and agri commodities are priced, traded, and settled.",
    },
    {
      id: "risk",
      number: "03",
      title: "Risk Management",
      description:
        "Position sizing, margin requirements, stop-loss discipline, and hedging strategies to protect capital.",
    },
    {
      id: "strategy",
      number: "04",
      title: "Trading Frameworks",
      description:
        "Trend, range, and event-driven approaches—with emphasis on process over speculation.",
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
  highlights: [
    {
      id: "physical",
      number: "01",
      title: "Physical Gold & Silver",
      description:
        "Coins, bars, and jewellery-grade bullion with purity verification and secure storage considerations.",
    },
    {
      id: "etf",
      number: "02",
      title: "Gold & Silver ETFs",
      description:
        "Exchange-listed funds that track domestic bullion prices—efficient for long-term allocation without storage hassle.",
    },
    {
      id: "sovereign",
      number: "03",
      title: "Sovereign Gold Bonds",
      description:
        "Government-backed paper gold with periodic interest and tax advantages for qualifying holding periods.",
    },
    {
      id: "mcx",
      number: "04",
      title: "MCX Futures & Options",
      description:
        "Leveraged exposure for hedging or tactical trades—with margin, rollover, and volatility managed professionally.",
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
