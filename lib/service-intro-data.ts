import { heroBackgrounds } from "@/lib/hero-backgrounds";

export type ServiceIntroContent = {
  titleLine1: string;
  titleLine2: string;
  introParagraph: string;
  sidebarTitle: string;
  sidebarParagraph: string;
  backgroundImage: string;
  primaryImage: string;
  secondaryImage: string;
  primaryImageAlt: string;
  secondaryImageAlt: string;
};

export const serviceIntros = {
  lifeInsurance: {
    titleLine1: "Life",
    titleLine2: "Insurance",
    introParagraph:
      "Comprehensive life cover tailored to every stage of your financial journey — protecting your family while you build wealth.",
    sidebarTitle: "Why Life Cover",
    sidebarParagraph:
      "From term plans to pension solutions, we help you choose coverage that matches your goals, income, and family responsibilities.",
    backgroundImage: heroBackgrounds.lifeInsurance,
    primaryImage: "/images/services/insurance-life.jpg",
    secondaryImage: "/images/services/insurance.jpg",
    primaryImageAlt: "Family protected with a comprehensive life insurance plan",
    secondaryImageAlt: "Insurance planning documents and policy review",
  },
  generalInsurance: {
    titleLine1: "General",
    titleLine2: "Insurance",
    introParagraph:
      "Complete protection for every aspect of your life — motor, property, fire, and travel coverage with expert guidance.",
    sidebarTitle: "Complete Protection",
    sidebarParagraph:
      "Whether it is your car, home, or next trip abroad, we structure policies that balance premium, coverage, and claims support.",
    backgroundImage: heroBackgrounds.generalInsurance,
    primaryImage: "/images/services/insurance-general.jpg",
    secondaryImage: "/images/home-services/band-insurance.jpg",
    primaryImageAlt: "Motor and property insurance protection",
    secondaryImageAlt: "General insurance coverage for assets and travel",
  },
  equityInvestment: {
    titleLine1: "Equity",
    titleLine2: "Investments",
    introParagraph:
      "Explore diverse investment options tailored to your financial goals — from Indian equities to global and unlisted opportunities.",
    sidebarTitle: "Built for Growth",
    sidebarParagraph:
      "We help you navigate equities, ETFs, REITs, PMS, and AIF with research-backed guidance aligned to your risk appetite.",
    backgroundImage: heroBackgrounds.equityInvestment,
    primaryImage: "/images/services/investment-equity.jpg",
    secondaryImage: "/images/home-services/band-mutual-funds-equity.jpg",
    primaryImageAlt: "Equity market growth and portfolio strategy",
    secondaryImageAlt: "Investment planning across equity instruments",
  },
  fixedIncome: {
    titleLine1: "Fixed",
    titleLine2: "Income",
    introParagraph:
      "Choose from corporate deposits, bonds, government securities, and NCDs — stable returns with capital protection.",
    sidebarTitle: "Stable Returns",
    sidebarParagraph:
      "Laddering strategies and yield comparisons help you lock in predictable income without sacrificing liquidity.",
    backgroundImage: heroBackgrounds.fixedIncome,
    primaryImage: "/images/services/investment-fixed-income.jpg",
    secondaryImage: "/images/home-services/band-fixed-income.jpg",
    primaryImageAlt: "Fixed income bonds and secure returns",
    secondaryImageAlt: "Corporate deposits and government securities",
  },
  mutualFunds: {
    titleLine1: "Mutual",
    titleLine2: "Funds",
    introParagraph:
      "Select the right fund type based on your goals and risk appetite — equity, debt, hybrid, and international options from leading AMCs.",
    sidebarTitle: "Pooled Strength",
    sidebarParagraph:
      "Diversified portfolios managed by professional fund houses, with ongoing monitoring and rebalancing guidance from our team.",
    backgroundImage: heroBackgrounds.mutualFunds,
    primaryImage: "/images/services/investment-mutual-funds.jpg",
    secondaryImage: "/images/services/investment.jpg",
    primaryImageAlt: "Mutual fund categories and portfolio diversification",
    secondaryImageAlt: "Fund selection across asset classes",
  },
  commodityDerivation: {
    titleLine1: "Commodity",
    titleLine2: "Derivatives",
    introParagraph:
      "Expert guidance in commodity futures, options, spreads, and corporate hedging strategies on Indian exchanges.",
    sidebarTitle: "Market Access",
    sidebarParagraph:
      "From position sizing to hedge ratios, we help corporates and active investors participate in commodities with discipline.",
    backgroundImage: heroBackgrounds.commodityDerivation,
    primaryImage: "/images/services/commodities-derivation.jpg",
    secondaryImage: "/images/services/commodities.jpg",
    primaryImageAlt: "Commodity futures and derivatives trading",
    secondaryImageAlt: "Commodity market instruments and exchange access",
  },
  commoditySilverGold: {
    titleLine1: "Silver",
    titleLine2: "& Gold",
    introParagraph:
      "Precious metals for portfolio balance — physical, digital, and exchange-traded routes with guidance on allocation and timing.",
    sidebarTitle: "Portfolio Balance",
    sidebarParagraph:
      "Gold and silver through bullion, ETFs, sovereign bonds, and MCX instruments — structured to match your horizon and liquidity needs.",
    backgroundImage: heroBackgrounds.commoditySilverGold,
    primaryImage: "/images/services/commodities-silver-gold.jpg",
    secondaryImage: "/images/services/commodities.jpg",
    primaryImageAlt: "Gold and silver investment options",
    secondaryImageAlt: "Precious metals allocation for diversified portfolios",
  },
  commodityTrading: {
    titleLine1: "Commodity",
    titleLine2: "Trading",
    introParagraph:
      "Participate in commodity markets with structured guidance — from exchange basics to futures, options, and risk management.",
    sidebarTitle: "Trade With Clarity",
    sidebarParagraph:
      "Practical support on futures, options, margin, and hedging — designed for investors who want a clear process before trading.",
    backgroundImage: heroBackgrounds.commodityTrading,
    primaryImage: "/images/services/commodities-trading.jpg",
    secondaryImage: "/images/services/commodities-derivation.jpg",
    primaryImageAlt: "Commodity market trading",
    secondaryImageAlt: "Futures and options trading for commodity markets",
  },
  calculatorSip: {
    titleLine1: "SIP",
    titleLine2: "Calculator",
    introParagraph:
      "Plan your monthly investments and see how disciplined SIPs can grow your wealth over time.",
    sidebarTitle: "Disciplined Investing",
    sidebarParagraph:
      "Model monthly contributions, expected returns, and tenure to understand how small, regular investments compound into meaningful wealth.",
    backgroundImage: heroBackgrounds.calculatorSip,
    primaryImage: "/images/services/calculator-sip.jpg",
    secondaryImage: "/images/services/calculator.jpg",
    primaryImageAlt: "Systematic investment plan projection",
    secondaryImageAlt: "Financial calculator for investment planning",
  },
  calculatorLumpSum: {
    titleLine1: "Lump Sum",
    titleLine2: "Calculator",
    introParagraph:
      "See how a single investment can compound over your chosen time horizon and expected return.",
    sidebarTitle: "One-Time Growth",
    sidebarParagraph:
      "Project the future value of a lump sum deployment — useful for bonuses, inheritances, or redeploying maturing investments.",
    backgroundImage: heroBackgrounds.calculatorLumpSum,
    primaryImage: "/images/services/calculator-lump-sum.jpg",
    secondaryImage: "/images/services/calculator.jpg",
    primaryImageAlt: "Lump sum investment growth projection",
    secondaryImageAlt: "Compound growth calculator for one-time investments",
  },
  calculatorSwp: {
    titleLine1: "SWP",
    titleLine2: "Calculator",
    introParagraph:
      "Model regular withdrawals from your corpus while tracking remaining balance and returns.",
    sidebarTitle: "Income Planning",
    sidebarParagraph:
      "Estimate how long your corpus can sustain monthly payouts — essential for retirement and post-maturity income strategies.",
    backgroundImage: heroBackgrounds.calculatorSwp,
    primaryImage: "/images/services/calculator-swp.jpg",
    secondaryImage: "/images/services/calculator.jpg",
    primaryImageAlt: "Systematic withdrawal plan modelling",
    secondaryImageAlt: "Withdrawal planning from mutual fund corpus",
  },
  calculatorCagr: {
    titleLine1: "CAGR",
    titleLine2: "Calculator",
    introParagraph:
      "Calculate the annualized growth rate between an initial and final investment value.",
    sidebarTitle: "Measure Performance",
    sidebarParagraph:
      "Compare investments on an equal footing with compound annual growth rate — the standard metric for long-term return analysis.",
    backgroundImage: heroBackgrounds.calculatorCagr,
    primaryImage: "/images/services/calculator-cagr.jpg",
    secondaryImage: "/images/services/calculator.jpg",
    primaryImageAlt: "Compound annual growth rate calculation",
    secondaryImageAlt: "Investment performance analytics dashboard",
  },
  financialHealth: {
    titleLine1: "Financial",
    titleLine2: "Health",
    introParagraph:
      "Help us understand your complete financial picture. Fill out our comprehensive questionnaire, and our experts will reach out with personalized recommendations tailored to your goals.",
    sidebarTitle: "Your Complete Picture",
    sidebarParagraph:
      "From income and assets to risk appetite and legacy goals — we review every dimension of your finances before recommending a practical path forward.",
    backgroundImage: heroBackgrounds.financialHealth,
    primaryImage: "/images/services/financial-health-assessment.jpg",
    secondaryImage: "/images/services/financial-health-planning.jpg",
    primaryImageAlt:
      "Financial advisor reviewing a comprehensive health assessment with a client",
    secondaryImageAlt:
      "Financial planning documents, goals, and investment review materials",
  },
} as const satisfies Record<string, ServiceIntroContent>;
