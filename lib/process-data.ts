export type ProcessStep = {
  id: string;
  label: string;
  title: string;
  summary: string;
  whatToExpect: string[];
  yourPreparation: string[];
  outcome: string;
};

export const PROCESS_HERO = {
  title: "OUR PROCESS",
  subtitle:
    "A systematic, transparent approach designed to reduce anxiety and build confidence throughout your financial planning journey.",
};

export const processSteps: ProcessStep[] = [
  {
    id: "consultation",
    label: "INITIAL CONSULTATION",
    title: "Understand & Align",
    summary:
      "Comprehensive discussion of your financial goals, current situation, and concerns.",
    whatToExpect: [
      "No-pressure environment focused on understanding your needs",
      "Comprehensive discussion of financial goals and timeline",
      "Review of current investment portfolio and strategies",
    ],
    yourPreparation: [
      "Bring recent investment statements",
      "Last 2 years tax returns",
      "List of financial goals with timeline",
      "Current insurance policies summary",
    ],
    outcome:
      "Clear understanding of your needs and our potential value-add.",
  },
  {
    id: "analysis",
    label: "FINANCIAL ANALYSIS",
    title: "Deep Dive Assessment",
    summary:
      "Detailed analysis of your current financial position, risk tolerance, and goal feasibility.",
    whatToExpect: [
      "Advanced planning software for scenario analysis",
      "Risk tolerance assessment and goal feasibility study",
      "Tax optimization and estate planning review",
      "Written financial plan with specific recommendations",
    ],
    yourPreparation: [
      "Complete financial questionnaire",
      "Provide additional documentation as requested",
      "Schedule 90-minute review meeting",
    ],
    outcome:
      "Comprehensive written plan with implementation timeline and cost estimates.",
  },
  {
    id: "implementation",
    label: "IMPLEMENTATION & ONBOARDING",
    title: "Strategy Execution",
    summary:
      "Systematic portfolio construction and account setup based on approved plan.",
    whatToExpect: [
      "Streamlined account opening with institutional custodians",
      "Systematic investment implementation per approved strategy",
      "Insurance policy reviews and optimizations",
      "Complete documentation and beneficiary coordination",
    ],
    yourPreparation: [
      "Sign investment advisory agreement",
      "Fund new accounts per implementation plan",
      "Complete beneficiary designations",
    ],
    outcome:
      "Fully implemented investment strategy with complete documentation.",
  },
  {
    id: "ongoing",
    label: "ONGOING RELATIONSHIP MANAGEMENT",
    title: "Review & Adapt",
    summary:
      "Proactive portfolio management with regular reviews and strategic adjustments.",
    whatToExpect: [
      "Quarterly portfolio reviews and rebalancing",
      "Annual comprehensive plan updates",
      "Proactive market commentary and strategy updates",
      "24/7 secure client portal access",
    ],
    yourPreparation: [
      "Attend scheduled review meetings",
      "Communicate life changes promptly",
      "Review quarterly reports and updates",
    ],
    outcome:
      "Consistent progress toward financial goals with ongoing optimization.",
  },
];
