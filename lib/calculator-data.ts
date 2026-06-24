export type CalculatorType = "sip" | "swp" | "lump-sum" | "cagr";

export type CalculatorField = {
  id: string;
  label: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
};

export type CalculatorConfig = {
  type: CalculatorType;
  title: string;
  description: string;
  primaryLabel: string;
  secondaryLabel: string;
  tertiaryLabel?: string;
  fields: CalculatorField[];
};

export const calculatorConfigs: Record<CalculatorType, CalculatorConfig> = {
  sip: {
    type: "sip",
    title: "SIP Calculator",
    description: "Estimate returns on a systematic monthly investment plan",
    primaryLabel: "Estimated Corpus",
    secondaryLabel: "Total Invested",
    tertiaryLabel: "Estimated Returns",
    fields: [
      {
        id: "monthly",
        label: "Monthly Investment (₹)",
        min: 500,
        max: 1_000_000,
        step: 500,
        defaultValue: 10_000,
      },
      {
        id: "rate",
        label: "Expected Annual Return (%)",
        min: 1,
        max: 30,
        step: 0.5,
        defaultValue: 12,
      },
      {
        id: "years",
        label: "Investment Period (Years)",
        min: 1,
        max: 40,
        step: 1,
        defaultValue: 10,
      },
    ],
  },
  swp: {
    type: "swp",
    title: "SWP Calculator",
    description: "Plan systematic withdrawals from your mutual fund corpus",
    primaryLabel: "Remaining Corpus",
    secondaryLabel: "Total Withdrawn",
    tertiaryLabel: "Estimated Returns Earned",
    fields: [
      {
        id: "corpus",
        label: "Initial Corpus (₹)",
        min: 100_000,
        max: 50_000_000,
        step: 10_000,
        defaultValue: 50_00_000,
      },
      {
        id: "monthly",
        label: "Monthly Withdrawal (₹)",
        min: 1_000,
        max: 500_000,
        step: 1_000,
        defaultValue: 25_000,
      },
      {
        id: "rate",
        label: "Expected Annual Return (%)",
        min: 1,
        max: 20,
        step: 0.5,
        defaultValue: 8,
      },
      {
        id: "years",
        label: "Withdrawal Period (Years)",
        min: 1,
        max: 30,
        step: 1,
        defaultValue: 15,
      },
    ],
  },
  "lump-sum": {
    type: "lump-sum",
    title: "Lump Sum Calculator",
    description: "Project growth of a one-time investment over time",
    primaryLabel: "Estimated Value",
    secondaryLabel: "Principal Amount",
    tertiaryLabel: "Estimated Returns",
    fields: [
      {
        id: "principal",
        label: "Investment Amount (₹)",
        min: 1_000,
        max: 50_000_000,
        step: 1_000,
        defaultValue: 5_00_000,
      },
      {
        id: "rate",
        label: "Expected Annual Return (%)",
        min: 1,
        max: 30,
        step: 0.5,
        defaultValue: 12,
      },
      {
        id: "years",
        label: "Investment Period (Years)",
        min: 1,
        max: 40,
        step: 1,
        defaultValue: 10,
      },
    ],
  },
  cagr: {
    type: "cagr",
    title: "CAGR Calculator",
    description: "Measure compound annual growth between two values",
    primaryLabel: "CAGR",
    secondaryLabel: "Initial Value",
    tertiaryLabel: "Final Value",
    fields: [
      {
        id: "initial",
        label: "Initial Value (₹)",
        min: 1_000,
        max: 50_000_000,
        step: 1_000,
        defaultValue: 1_00_000,
      },
      {
        id: "final",
        label: "Final Value (₹)",
        min: 1_000,
        max: 100_000_000,
        step: 1_000,
        defaultValue: 3_10_000,
      },
      {
        id: "years",
        label: "Time Period (Years)",
        min: 1,
        max: 40,
        step: 1,
        defaultValue: 5,
      },
    ],
  },
};

export function calculateSip(
  monthly: number,
  annualRate: number,
  years: number,
): { corpus: number; invested: number; returns: number } {
  const months = years * 12;
  const monthlyRate = annualRate / 100 / 12;

  if (monthly <= 0 || months <= 0) {
    return { corpus: 0, invested: 0, returns: 0 };
  }

  const corpus =
    monthlyRate === 0
      ? monthly * months
      : monthly *
        ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
        (1 + monthlyRate);

  const invested = monthly * months;
  return { corpus, invested, returns: corpus - invested };
}

export function calculateSwp(
  corpus: number,
  monthlyWithdrawal: number,
  annualRate: number,
  years: number,
): { remaining: number; withdrawn: number; returnsEarned: number } {
  const months = years * 12;
  const monthlyRate = annualRate / 100 / 12;

  if (corpus <= 0 || months <= 0) {
    return { remaining: 0, withdrawn: 0, returnsEarned: 0 };
  }

  let balance = corpus;
  let withdrawn = 0;

  for (let month = 0; month < months; month += 1) {
    balance *= 1 + monthlyRate;
    const payout = Math.min(monthlyWithdrawal, balance);
    balance -= payout;
    withdrawn += payout;
    if (balance <= 0) break;
  }

  const returnsEarned = Math.max(0, balance + withdrawn - corpus);
  return { remaining: Math.max(0, balance), withdrawn, returnsEarned };
}

export function calculateLumpSum(
  principal: number,
  annualRate: number,
  years: number,
): { value: number; returns: number } {
  if (principal <= 0 || years <= 0) {
    return { value: 0, returns: 0 };
  }

  const value = principal * (1 + annualRate / 100) ** years;
  return { value, returns: value - principal };
}

export function calculateCagr(
  initial: number,
  final: number,
  years: number,
): number {
  if (initial <= 0 || final <= 0 || years <= 0) return 0;
  return (Math.pow(final / initial, 1 / years) - 1) * 100;
}
