export type FinancialHealthFormState = {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  maritalStatus: string;
  dependents: string;
  occupationStatus: string;
  annualIncome: string;
  incomeGrowthRate: string;
  liabilities: string[];
  otherLoans: string;
  monthlyIncome: string;
  monthlyExpenses: string;
  emergencyFund: string;
  assetBankSavings: string;
  assetMutualFunds: string;
  assetBonds: string;
  assetGoldCommodities: string;
  assetRealEstate: string;
  assetRetirement: string;
  assetInsurance: string;
  outstandingLoans: string;
  emiCommitments: string;
  marketVolatility: string;
  investmentObjective: string;
  investmentHorizon: string;
  preferredAssetClasses: string;
  internationalAssets: string;
  healthInsurance: string;
  lifeInsurance: string;
  otherProtection: string;
  adequatelyInsured: string;
  shortTermGoals: string;
  mediumTermGoals: string;
  longTermGoals: string;
  goalMilestones: string[];
  otherMilestones: string;
  willEstatePlan: string;
  trustsSuccession: string;
  nomineesUpdated: string;
  investmentStyle: string;
  reviewFrequency: string;
  sipPreference: string;
  trackingTime: string;
  advisorExpectations: string[];
  meetingFrequency: string;
  digitalAccess: string;
};

export const initialFinancialHealthFormState: FinancialHealthFormState = {
  firstName: "",
  middleName: "",
  lastName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  maritalStatus: "",
  dependents: "",
  occupationStatus: "",
  annualIncome: "",
  incomeGrowthRate: "",
  liabilities: [],
  otherLoans: "",
  monthlyIncome: "",
  monthlyExpenses: "",
  emergencyFund: "",
  assetBankSavings: "",
  assetMutualFunds: "",
  assetBonds: "",
  assetGoldCommodities: "",
  assetRealEstate: "",
  assetRetirement: "",
  assetInsurance: "",
  outstandingLoans: "",
  emiCommitments: "",
  marketVolatility: "",
  investmentObjective: "",
  investmentHorizon: "",
  preferredAssetClasses: "",
  internationalAssets: "",
  healthInsurance: "",
  lifeInsurance: "",
  otherProtection: "",
  adequatelyInsured: "",
  shortTermGoals: "",
  mediumTermGoals: "",
  longTermGoals: "",
  goalMilestones: [],
  otherMilestones: "",
  willEstatePlan: "",
  trustsSuccession: "",
  nomineesUpdated: "",
  investmentStyle: "",
  reviewFrequency: "",
  sipPreference: "",
  trackingTime: "",
  advisorExpectations: [],
  meetingFrequency: "",
  digitalAccess: "",
};

export function formatFinancialHealthSubmission(
  form: FinancialHealthFormState,
): string {
  const lines = [
    "=== Personal & Professional Information ===",
    `First Name: ${form.firstName}`,
    `Middle Name: ${form.middleName || "—"}`,
    `Last Name: ${form.lastName}`,
    `Email: ${form.email}`,
    `Phone: ${form.phone}`,
    `Date of Birth: ${form.dateOfBirth}`,
    `Marital Status: ${form.maritalStatus}`,
    `Dependents: ${form.dependents || "—"}`,
    `Occupation: ${form.occupationStatus}`,
    `Annual Income: ${form.annualIncome}`,
    `Income Growth Rate: ${form.incomeGrowthRate || "—"}`,
    `Existing Liabilities: ${form.liabilities.join(", ") || "None"}`,
    `Other Loans: ${form.otherLoans || "—"}`,
    "",
    "=== Current Financial Position ===",
    `Monthly Income: ${form.monthlyIncome || "—"}`,
    `Monthly Expenses: ${form.monthlyExpenses || "—"}`,
    `Emergency Fund: ${form.emergencyFund || "—"}`,
    `Bank Savings & FDs: ${form.assetBankSavings || "—"}`,
    `Mutual Funds / Equity: ${form.assetMutualFunds || "—"}`,
    `Bonds / Debentures: ${form.assetBonds || "—"}`,
    `Gold / Commodities: ${form.assetGoldCommodities || "—"}`,
    `Real Estate: ${form.assetRealEstate || "—"}`,
    `Retirement Accounts: ${form.assetRetirement || "—"}`,
    `Insurance Coverage: ${form.assetInsurance || "—"}`,
    `Outstanding Loans: ${form.outstandingLoans || "—"}`,
    `EMI Commitments: ${form.emiCommitments || "—"}`,
    "",
    "=== Risk Profile & Investment Preferences ===",
    `Market Volatility Comfort: ${form.marketVolatility || "—"}`,
    `Investment Objective: ${form.investmentObjective || "—"}`,
    `Investment Horizon: ${form.investmentHorizon || "—"}`,
    `Preferred Asset Classes: ${form.preferredAssetClasses || "—"}`,
    `International Assets: ${form.internationalAssets || "—"}`,
    "",
    "=== Insurance & Protection Planning ===",
    `Health Insurance: ${form.healthInsurance || "—"}`,
    `Life Insurance: ${form.lifeInsurance || "—"}`,
    `Other Protection: ${form.otherProtection || "—"}`,
    `Adequately Insured: ${form.adequatelyInsured || "—"}`,
    "",
    "=== Goals & Aspirations ===",
    `Short-term Goals: ${form.shortTermGoals || "—"}`,
    `Medium-term Goals: ${form.mediumTermGoals || "—"}`,
    `Long-term Goals: ${form.longTermGoals || "—"}`,
    `Milestones: ${form.goalMilestones.join(", ") || "None"}`,
    `Other Milestones: ${form.otherMilestones || "—"}`,
    "",
    "=== Estate & Legacy Planning ===",
    `Will / Estate Plan: ${form.willEstatePlan || "—"}`,
    `Trusts / Succession: ${form.trustsSuccession || "—"}`,
    `Nominees Updated: ${form.nomineesUpdated || "—"}`,
    "",
    "=== Financial Behavior & Preferences ===",
    `Investment Style: ${form.investmentStyle || "—"}`,
    `Portfolio Review Frequency: ${form.reviewFrequency || "—"}`,
    `SIP vs Lump Sum: ${form.sipPreference || "—"}`,
    `Time Tracking Investments: ${form.trackingTime || "—"}`,
    "",
    "=== Advisor Expectations ===",
    `Expectations: ${form.advisorExpectations.join(", ") || "—"}`,
    `Review Meeting Frequency: ${form.meetingFrequency || "—"}`,
    `Digital Access & Reports: ${form.digitalAccess || "—"}`,
  ];

  return lines.join("\n");
}

export function formatFinancialHealthSectionSubmission(
  stepIndex: number,
  form: FinancialHealthFormState,
  sectionTitle: string,
): string {
  const header = `=== ${sectionTitle} ===\n`;

  switch (stepIndex) {
    case 0:
      return (
        header +
        [
          `First Name: ${form.firstName}`,
          `Middle Name: ${form.middleName || "—"}`,
          `Last Name: ${form.lastName}`,
          `Email: ${form.email}`,
          `Phone: ${form.phone}`,
          `Date of Birth: ${form.dateOfBirth}`,
          `Marital Status: ${form.maritalStatus}`,
          `Dependents: ${form.dependents || "—"}`,
          `Occupation: ${form.occupationStatus}`,
          `Annual Income: ${form.annualIncome}`,
          `Income Growth Rate: ${form.incomeGrowthRate || "—"}`,
          `Existing Liabilities: ${form.liabilities.join(", ") || "None"}`,
          `Other Loans: ${form.otherLoans || "—"}`,
        ].join("\n")
      );
    case 1:
      return (
        header +
        [
          `Monthly Income: ${form.monthlyIncome || "—"}`,
          `Monthly Expenses: ${form.monthlyExpenses || "—"}`,
          `Emergency Fund: ${form.emergencyFund || "—"}`,
          `Bank Savings & FDs: ${form.assetBankSavings || "—"}`,
          `Mutual Funds / Equity: ${form.assetMutualFunds || "—"}`,
          `Bonds / Debentures: ${form.assetBonds || "—"}`,
          `Gold / Commodities: ${form.assetGoldCommodities || "—"}`,
          `Real Estate: ${form.assetRealEstate || "—"}`,
          `Retirement Accounts: ${form.assetRetirement || "—"}`,
          `Insurance Coverage: ${form.assetInsurance || "—"}`,
          `Outstanding Loans: ${form.outstandingLoans || "—"}`,
          `EMI Commitments: ${form.emiCommitments || "—"}`,
        ].join("\n")
      );
    case 2:
      return (
        header +
        [
          `Market Volatility Comfort: ${form.marketVolatility || "—"}`,
          `Investment Objective: ${form.investmentObjective || "—"}`,
          `Investment Horizon: ${form.investmentHorizon || "—"}`,
          `Preferred Asset Classes: ${form.preferredAssetClasses || "—"}`,
          `International Assets: ${form.internationalAssets || "—"}`,
        ].join("\n")
      );
    case 3:
      return (
        header +
        [
          `Health Insurance: ${form.healthInsurance || "—"}`,
          `Life Insurance: ${form.lifeInsurance || "—"}`,
          `Other Protection: ${form.otherProtection || "—"}`,
          `Adequately Insured: ${form.adequatelyInsured || "—"}`,
        ].join("\n")
      );
    case 4:
      return (
        header +
        [
          `Short-term Goals: ${form.shortTermGoals || "—"}`,
          `Medium-term Goals: ${form.mediumTermGoals || "—"}`,
          `Long-term Goals: ${form.longTermGoals || "—"}`,
          `Milestones: ${form.goalMilestones.join(", ") || "None"}`,
          `Other Milestones: ${form.otherMilestones || "—"}`,
        ].join("\n")
      );
    case 5:
      return (
        header +
        [
          `Will / Estate Plan: ${form.willEstatePlan || "—"}`,
          `Trusts / Succession: ${form.trustsSuccession || "—"}`,
          `Nominees Updated: ${form.nomineesUpdated || "—"}`,
        ].join("\n")
      );
    case 6:
      return (
        header +
        [
          `Investment Style: ${form.investmentStyle || "—"}`,
          `Portfolio Review Frequency: ${form.reviewFrequency || "—"}`,
          `SIP vs Lump Sum: ${form.sipPreference || "—"}`,
          `Time Tracking Investments: ${form.trackingTime || "—"}`,
        ].join("\n")
      );
    case 7:
      return (
        header +
        [
          `Expectations: ${form.advisorExpectations.join(", ") || "—"}`,
          `Review Meeting Frequency: ${form.meetingFrequency || "—"}`,
          `Digital Access & Reports: ${form.digitalAccess || "—"}`,
        ].join("\n")
      );
    default:
      return header;
  }
}

export function validateFinancialHealthSection(
  stepIndex: number,
  form: FinancialHealthFormState,
): string | null {
  if (stepIndex !== 0) return null;

  const missing: string[] = [];
  if (!form.firstName.trim()) missing.push("First Name");
  if (!form.lastName.trim()) missing.push("Last Name");
  if (!form.email.trim()) missing.push("Email");
  if (!form.phone.trim()) missing.push("Phone Number");
  if (!form.dateOfBirth) missing.push("Date of Birth");
  if (!form.maritalStatus) missing.push("Marital Status");
  if (!form.occupationStatus) missing.push("Occupation");
  if (!form.annualIncome) missing.push("Annual Income");

  if (missing.length === 0) return null;

  return `Please complete required fields: ${missing.join(", ")}.`;
}
