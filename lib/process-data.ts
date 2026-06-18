export type ProcessStep = {
  id: string;
  title: string;
  summary: string;
  whatToExpect: string[];
  yourPreparation: string[];
  outcome: string;
};

export const processSteps: ProcessStep[] = [
  {
    id: "consultation",
    title: "Initial Consultation",
    summary:
      "Comprehensive discussion of your financial goals, current situation, and concerns",
    whatToExpect: [
      "No-pressure environment focused on understanding your needs",
      "Comprehensive discussion of financial goals and timeline",
      "Review of current investment portfolio and strategies",
      "Clear explanation of our services and potential fit",
    ],
    yourPreparation: [
      "Bring recent investment statements",
      "Last 2 years tax returns",
      "List of financial goals with timeline",
      "Current insurance policies summary",
    ],
    outcome:
      "Clear understanding of your needs and our potential value-add",
  },
  {
    id: "analysis",
    title: "Comprehensive Financial Analysis",
    summary:
      "Detailed analysis of your current financial position, risk tolerance, and goal feasibility",
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
      "Comprehensive written plan with implementation timeline and cost estimates",
  },
  {
    id: "implementation",
    title: "Implementation & Onboarding",
    summary:
      "Systematic portfolio construction and account setup based on approved plan",
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
      "Fully implemented investment strategy with complete documentation",
  },
  {
    id: "ongoing",
    title: "Ongoing Relationship Management",
    summary:
      "Proactive portfolio management with regular reviews and strategic adjustments",
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
      "Consistent progress toward financial goals with ongoing optimization",
  },
];
