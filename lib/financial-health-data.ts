export const financialHealthSections = [
  {
    id: "personal",
    title: "Personal & Professional",
    subtitle: "Tell us about yourself",
  },
  {
    id: "position",
    title: "Current Financial Position",
    subtitle: "Your current financial situation",
  },
  {
    id: "risk",
    title: "Risk & Investment Preferences",
    subtitle: "Understanding your investment comfort and preferences",
  },
  {
    id: "insurance",
    title: "Insurance & Protection",
    subtitle: "Ensuring adequate protection for you and your family",
  },
  {
    id: "goals",
    title: "Goals & Aspirations",
    subtitle: "What are you working towards?",
  },
  {
    id: "estate",
    title: "Estate & Legacy Planning",
    subtitle: "Planning for the future",
  },
  {
    id: "behavior",
    title: "Financial Behavior",
    subtitle: "Your investment style and habits",
  },
  {
    id: "advisor",
    title: "Advisor Expectations",
    subtitle: "How can we serve you best?",
  },
] as const;

export const maritalStatusOptions = [
  "Single",
  "Married",
  "Divorced",
  "Widowed",
] as const;

export const occupationOptions = [
  "Salaried",
  "Self-employed",
  "Business Owner",
  "Retired",
  "Other",
] as const;

export const liabilityOptions = [
  "Home Loan",
  "Car Loan",
  "Personal Loan",
  "Credit Card Debt",
] as const;

export const yesNoOptions = ["Yes", "No"] as const;

export const volatilityOptions = [
  "Very Uncomfortable",
  "Somewhat Uncomfortable",
  "Neutral",
  "Comfortable",
  "Very Comfortable",
] as const;

export const investmentObjectiveOptions = [
  "Capital Preservation",
  "Regular Income",
  "Balanced Growth",
  "Aggressive Growth",
  "Wealth Creation",
] as const;

export const investmentHorizonOptions = [
  "Less than 1 year",
  "1 to 3 years",
  "3 to 5 years",
  "5 to 10 years",
  "More than 10 years",
] as const;

export const internationalAssetsOptions = [
  "Yes",
  "No",
  "Maybe / Need guidance",
] as const;

export const adequatelyInsuredOptions = ["Yes", "No", "Unsure"] as const;

export const goalMilestoneOptions = [
  "Wedding",
  "Foreign Education",
  "Philanthropy",
] as const;

export const trustsSuccessionOptions = [
  "Yes",
  "No",
  "Need Guidance",
] as const;

export const nomineesOptions = ["Yes", "No", "Partially"] as const;

export const investmentStyleOptions = [
  "Actively managed investments",
  "Passive (index/ETF) investing",
  "A mix of both",
] as const;

export const reviewFrequencyOptions = [
  "Monthly",
  "Quarterly",
  "Half-yearly",
  "Annually",
  "As needed",
] as const;

export const sipPreferenceOptions = [
  "Automated SIP / Disciplined investing",
  "Tactical lump sum calls",
  "A mix of both",
] as const;

export const trackingTimeOptions = [
  "Minimal — I prefer hands-off approach",
  "Moderate — occasional check-ins",
  "Active — I enjoy tracking regularly",
] as const;

export const advisorExpectationOptions = [
  "Comprehensive planning & execution",
  "Product recommendations",
  "Regular reviews and rebalancing",
  "Tax optimization",
  "Estate & succession planning",
] as const;

export const meetingFrequencyOptions = [
  "Monthly",
  "Quarterly",
  "Half-yearly",
  "Annually",
] as const;
