export type DerivativesApproachStep = {
  id: string;
  number: string;
  text: string;
};

export const derivativesApproachSection = {
  eyebrow: "Our Approach",
  title: "How We Operate",
  description: "Disciplined frameworks for derivative trading success",
  ctaLabel: "Get Started",
  categoryLabel: "Derivative Trading Operations",
} as const;

export const derivativesApproachSteps: DerivativesApproachStep[] = [
  {
    id: "eligibility",
    number: "01",
    text: "Eligibility and suitability assessment before onboarding",
  },
  {
    id: "playbooks",
    number: "02",
    text: "Playbooks for entries, exits and max loss per trade",
  },
  {
    id: "risk-monitoring",
    number: "03",
    text: "Real-time risk monitoring and prudent leverage",
  },
  {
    id: "reporting",
    number: "04",
    text: "Periodic reviews and structured reporting",
  },
];
