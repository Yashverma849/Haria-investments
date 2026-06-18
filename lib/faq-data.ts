export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    id: "services",
    question: "What services does Haria Investments offer?",
    answer:
      "We provide end-to-end financial solutions including life and general insurance, mutual funds, equity investments, fixed income, commodities, financial health assessments, and goal-based planning—all under one roof.",
  },
  {
    id: "consultation",
    question: "How do I schedule a consultation?",
    answer:
      "Use the Schedule Consultation button in the navigation or contact us directly. We will understand your goals, assess your current financial position, and recommend a tailored plan at no obligation.",
  },
  {
    id: "insurance",
    question: "What is the difference between life and general insurance?",
    answer:
      "Life insurance protects your family's financial future in the event of loss of life or critical illness. General insurance covers assets and risks such as health, motor, property, and travel. We help you choose the right mix for complete protection.",
  },
  {
    id: "mutual-funds",
    question: "How do mutual funds fit into my portfolio?",
    answer:
      "Mutual funds pool money from many investors into diversified portfolios managed by professionals. They suit goals like wealth creation, retirement, and education with options across equity, debt, and hybrid categories based on your risk profile.",
  },
  {
    id: "confidentiality",
    question: "Is my financial information kept confidential?",
    answer:
      "Yes. Client confidentiality is fundamental to our practice. Your personal and financial data is handled with strict discretion and shared only as required to service your account or meet regulatory obligations.",
  },
  {
    id: "review",
    question: "How often should I review my financial plan?",
    answer:
      "We recommend a full review at least once a year, or sooner after major life events—marriage, a new child, job change, home purchase, or inheritance. Markets and personal goals evolve; regular reviews keep your plan aligned.",
  },
  {
    id: "experience",
    question: "What experience does Haria Investments bring?",
    answer:
      "Our legacy dates to 1957, spanning three generations in insurance and wealth advisory. With 1500+ clients served, we combine decades of trust with modern expertise across insurance, mutual funds, and equity markets.",
  },
  {
    id: "minimum-investment",
    question: "Is there a minimum amount to start investing?",
    answer:
      "No single minimum applies across all products. SIPs in mutual funds can start from modest monthly amounts, while other instruments may have different thresholds. We will guide you based on your goals and what you are comfortable committing.",
  },
];
