export type ProtectionPlan = {
  id: string;
  title: string;
  monthlyPremium: string;
  description: string;
  tenure: string;
  minAmount: string;
  features: string[];
  image: string;
};

export type LifeInsuranceProcessStep = {
  id: string;
  label: string;
  title: string;
  summary: string;
};

export const protectionPlans: ProtectionPlan[] = [
  {
    id: "term",
    title: "Term Insurance",
    monthlyPremium: "₹500/month",
    description: "Pure protection, high coverage, low premium",
    tenure: "5 years to lifetime",
    minAmount: "₹5 Lakhs",
    features: ["High coverage", "Low premium", "Flexible terms", "Easy claims"],
    image:
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80",
  },
  {
    id: "whole-life",
    title: "Whole Life Insurance",
    monthlyPremium: "₹2,000/month",
    description: "Lifelong coverage with cash value building",
    tenure: "Lifelong",
    minAmount: "₹2.5 Lakhs",
    features: ["Lifelong coverage", "Cash value", "Premium flexibility"],
    image:
      "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80",
  },
  {
    id: "endowment",
    title: "Endowment Plans",
    monthlyPremium: "₹1,500/month",
    description: "Savings + insurance combination",
    tenure: "10–35 years",
    minAmount: "₹2 Lakhs",
    features: [
      "Guaranteed returns",
      "Maturity benefit",
      "Death benefit",
      "Tax savings",
    ],
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
  },
  {
    id: "ulip",
    title: "ULIP Plans",
    monthlyPremium: "₹2,500/month",
    description: "Market-linked returns with life cover",
    tenure: "5–25 years",
    minAmount: "₹2.5 Lakhs",
    features: ["Market returns", "Life cover", "Fund switching", "Tax benefits"],
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
  },
  {
    id: "money-back",
    title: "Money-Back Plans",
    monthlyPremium: "₹1,200/month",
    description: "Periodic payouts during the policy term + life cover",
    tenure: "10–25 years",
    minAmount: "₹2.5 Lakhs",
    features: [
      "Survival benefits",
      "Maturity returns",
      "Life cover",
      "Bonus payout",
    ],
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  },
  {
    id: "pension",
    title: "Pension Plans",
    monthlyPremium: "₹2,000/month",
    description: "Secure your retirement with regular annuity payouts",
    tenure: "Retirement age",
    minAmount: "₹1,00,000",
    features: [
      "Retirement income",
      "Deferred/Immediate annuity",
      "Optional life cover",
    ],
    image:
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&q=80",
  },
];

export const lifeInsuranceProcessSteps: LifeInsuranceProcessStep[] = [
  {
    id: "assessment",
    label: "Assessment",
    title: "Assessment",
    summary:
      "We analyze your financial needs and family requirements to determine the right coverage amount and plan type.",
  },
  {
    id: "recommendation",
    label: "Recommendation",
    title: "Recommendation",
    summary:
      "Based on your profile, we present tailored plan options with clear comparisons of benefits, premiums, and tenure.",
  },
  {
    id: "application",
    label: "Application",
    title: "Application",
    summary:
      "We guide you through documentation, medical requirements, and insurer submission so nothing is missed.",
  },
  {
    id: "activation",
    label: "Activation",
    title: "Activation",
    summary:
      "Once approved, your policy is issued and we help you understand coverage details, nominees, and renewal dates.",
  },
];
