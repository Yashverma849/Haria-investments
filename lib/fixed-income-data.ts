export type FixedIncomeProduct = {
  id: string;
  title: string;
  rateRange: string;
  description: string;
  tenure: string;
  minAmount: string;
  features: string[];
  image: string;
};

export type LadderYear = {
  year: number;
  amount: string;
  rate: string;
  maturity: string;
};

export type LadderBenefit = {
  number: string;
  title: string;
  description: string;
  image: string;
};

export const fixedIncomeProducts: FixedIncomeProduct[] = [
  {
    id: "corporate-deposits",
    title: "Corporate Deposits",
    rateRange: "6.5-8.5%",
    description: "Guaranteed returns with capital protection",
    tenure: "7 days - 10 years",
    minAmount: "Variable",
    features: [
      "Guaranteed returns",
      "Capital protection",
      "Flexible tenure",
      "Quarterly interest",
    ],
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
  },
  {
    id: "corporate-bonds",
    title: "Corporate Bonds",
    rateRange: "8-12%",
    description: "Higher returns from corporate debt instruments",
    tenure: "3-10 years",
    minAmount: "Variable",
    features: [
      "Higher returns",
      "Regular income",
      "Credit rating",
      "Liquidity",
    ],
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
  },
  {
    id: "government-securities",
    title: "Government Securities",
    rateRange: "6-7.5%",
    description: "Sovereign guarantee with stable returns",
    tenure: "1-30 years",
    minAmount: "Variable",
    features: [
      "Sovereign guarantee",
      "Zero default risk",
      "Tax benefits",
      "Liquidity",
    ],
    image:
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&q=80",
  },
  {
    id: "ncds",
    title: "NCDs",
    rateRange: "9-14%",
    description: "Non-convertible debentures for higher yields",
    tenure: "1-7 years",
    minAmount: "Variable",
    features: [
      "Higher yields",
      "Credit rating",
      "Regular interest",
      "Listing benefits",
    ],
    image:
      "https://images.unsplash.com/photo-1642790106117-e829e14a08fe?w=800&q=80",
  },
  {
    id: "capital-gain-bonds",
    title: "Capital Gain Bonds",
    rateRange: "5-6%",
    description: "Save tax on long-term capital gains under Section 54EC",
    tenure: "5 years",
    minAmount: "Max 50 Lakhs",
    features: [
      "Tax savings on LTCG",
      "Section 54EC benefits",
      "Lock-in period",
      "Sovereign guarantee",
    ],
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
  },
];

export const ladderYears: LadderYear[] = [
  { year: 1, amount: "₹2,00,000", rate: "7.2%", maturity: "2025" },
  { year: 2, amount: "₹2,00,000", rate: "7.5%", maturity: "2026" },
  { year: 3, amount: "₹2,00,000", rate: "7.8%", maturity: "2027" },
  { year: 4, amount: "₹2,00,000", rate: "8%", maturity: "2028" },
  { year: 5, amount: "₹2,00,000", rate: "8.2%", maturity: "2029" },
];

export const ladderBenefits: LadderBenefit[] = [
  {
    number: "01",
    title: "Higher Returns",
    description:
      "Lock in better rates by investing across different time periods. Longer-term deposits typically offer higher interest rates, allowing you to maximize overall portfolio returns.",
    image: "/images/home-services/band-fixed-income.jpg",
  },
  {
    number: "02",
    title: "Risk Management",
    description:
      "Spread maturity dates to reduce interest rate risk. As deposits mature regularly, you can reinvest at current market rates, protecting against rate fluctuations.",
    image: "/images/commodities/risk-management.jpg",
  },
  {
    number: "03",
    title: "Regular Income",
    description:
      "Quarterly interest payouts provide consistent cash flow. Staggered maturities ensure regular access to funds without compromising on returns or breaking deposits prematurely.",
    image: "/images/services/investment-fixed-income.jpg",
  },
];
