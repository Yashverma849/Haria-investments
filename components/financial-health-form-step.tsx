"use client";

import {
  adequatelyInsuredOptions,
  advisorExpectationOptions,
  goalMilestoneOptions,
  internationalAssetsOptions,
  investmentHorizonOptions,
  investmentObjectiveOptions,
  investmentStyleOptions,
  liabilityOptions,
  maritalStatusOptions,
  meetingFrequencyOptions,
  nomineesOptions,
  occupationOptions,
  reviewFrequencyOptions,
  sipPreferenceOptions,
  trackingTimeOptions,
  trustsSuccessionOptions,
  volatilityOptions,
  yesNoOptions,
} from "@/lib/financial-health-data";
import type { FinancialHealthFormState } from "@/lib/financial-health-form-state";

type StepContentProps = {
  stepIndex: number;
  form: FinancialHealthFormState;
  onChange: <K extends keyof FinancialHealthFormState>(
    key: K,
    value: FinancialHealthFormState[K],
  ) => void;
  onToggleArray: (
    key: "liabilities" | "goalMilestones" | "advisorExpectations",
    value: string,
  ) => void;
  inputClass: string;
  labelClass: string;
  legendClass: string;
};

function FieldGroup({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`space-y-6 ${className}`}>{children}</div>;
}

function TextField({
  id,
  label,
  required,
  type = "text",
  placeholder,
  value,
  onChange,
  inputClass,
  labelClass,
  min,
  max,
  step,
}: {
  id: string;
  label: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  inputClass: string;
  labelClass: string;
  min?: number;
  max?: number;
  step?: number;
}) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
        {required ? " *" : ""}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        placeholder={placeholder}
        data-lpignore="true"
        data-1p-ignore
        data-bwignore
        suppressHydrationWarning
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(event) => onChange(event.target.value)}
        className={inputClass}
      />
    </div>
  );
}

function TextAreaField({
  id,
  label,
  placeholder,
  value,
  onChange,
  inputClass,
  labelClass,
  rows = 3,
}: {
  id: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  inputClass: string;
  labelClass: string;
  rows?: number;
}) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <textarea
        id={id}
        rows={rows}
        placeholder={placeholder}
        data-lpignore="true"
        data-1p-ignore
        data-bwignore
        suppressHydrationWarning
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`${inputClass} resize-y`}
      />
    </div>
  );
}

function SelectField({
  id,
  label,
  required,
  placeholder,
  value,
  options,
  onChange,
  inputClass,
  labelClass,
}: {
  id: string;
  label: string;
  required?: boolean;
  placeholder: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
  inputClass: string;
  labelClass: string;
}) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
        {required ? " *" : ""}
      </label>
      <select
        id={id}
        required={required}
        data-lpignore="true"
        data-1p-ignore
        data-bwignore
        suppressHydrationWarning
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={inputClass}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function RadioGroup({
  legend,
  name,
  required,
  value,
  options,
  onChange,
  legendClass,
}: {
  legend: string;
  name: string;
  required?: boolean;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
  legendClass: string;
}) {
  return (
    <fieldset>
      <legend className={legendClass}>
        {legend}
        {required ? " *" : ""}
      </legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => {
          const selected = value === option;
          return (
            <label
              key={option}
              className={`cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors ${
                selected
                  ? "border-charcoal bg-charcoal/10 text-charcoal"
                  : "border-charcoal/20 text-charcoal/75 hover:border-charcoal/35"
              }`}
            >
              <input
                type="radio"
                name={name}
                value={option}
                required={required && !value}
                checked={selected}
                onChange={() => onChange(option)}
                className="sr-only"
                suppressHydrationWarning
              />
              {option}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

function CheckboxGroup({
  legend,
  selected,
  options,
  onToggle,
  legendClass,
}: {
  legend: string;
  selected: string[];
  options: readonly string[];
  onToggle: (value: string) => void;
  legendClass: string;
}) {
  return (
    <fieldset>
      <legend className={legendClass}>{legend}</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = selected.includes(option);
          return (
            <button
              key={option}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onToggle(option)}
              suppressHydrationWarning
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                isSelected
                  ? "border-charcoal bg-charcoal/10 text-charcoal"
                  : "border-charcoal/20 text-charcoal/75 hover:border-charcoal/35"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export default function FinancialHealthFormStep({
  stepIndex,
  form,
  onChange,
  onToggleArray,
  inputClass,
  labelClass,
  legendClass,
}: StepContentProps) {
  switch (stepIndex) {
    case 0:
      return (
        <FieldGroup>
          <p className="text-sm font-semibold text-charcoal/90">1. Personal Details</p>
          <div className="grid gap-6 sm:grid-cols-2">
            <TextField
              id="fh-first-name"
              label="First Name"
              required
              placeholder="First name"
              value={form.firstName}
              onChange={(value) => onChange("firstName", value)}
              inputClass={inputClass}
              labelClass={labelClass}
            />
            <TextField
              id="fh-middle-name"
              label="Middle Name"
              placeholder="Middle name"
              value={form.middleName}
              onChange={(value) => onChange("middleName", value)}
              inputClass={inputClass}
              labelClass={labelClass}
            />
            <TextField
              id="fh-last-name"
              label="Last Name"
              required
              placeholder="Last name"
              value={form.lastName}
              onChange={(value) => onChange("lastName", value)}
              inputClass={inputClass}
              labelClass={labelClass}
            />
            <TextField
              id="fh-email"
              label="Email"
              required
              type="email"
              placeholder="your.email@example.com"
              value={form.email}
              onChange={(value) => onChange("email", value)}
              inputClass={inputClass}
              labelClass={labelClass}
            />
            <TextField
              id="fh-phone"
              label="Phone Number"
              required
              type="tel"
              placeholder="+91 12345 67890"
              value={form.phone}
              onChange={(value) => onChange("phone", value)}
              inputClass={inputClass}
              labelClass={labelClass}
            />
            <TextField
              id="fh-dob"
              label="Date of Birth"
              required
              type="date"
              value={form.dateOfBirth}
              onChange={(value) => onChange("dateOfBirth", value)}
              inputClass={inputClass}
              labelClass={labelClass}
            />
            <SelectField
              id="fh-marital"
              label="Marital Status"
              required
              placeholder="Select status"
              value={form.maritalStatus}
              options={maritalStatusOptions}
              onChange={(value) => onChange("maritalStatus", value)}
              inputClass={inputClass}
              labelClass={labelClass}
            />
            <TextAreaField
              id="fh-dependents"
              label="Dependents (if any)"
              placeholder="Number and details"
              value={form.dependents}
              onChange={(value) => onChange("dependents", value)}
              inputClass={inputClass}
              labelClass={labelClass}
              rows={2}
            />
          </div>

          <RadioGroup
            legend="2. Occupation & Employment Status"
            name="fh-occupation"
            required
            value={form.occupationStatus}
            options={occupationOptions}
            onChange={(value) => onChange("occupationStatus", value)}
            legendClass={legendClass}
          />

          <div className="grid gap-6 sm:grid-cols-2">
            <TextField
              id="fh-annual-income"
              label="3. Annual Income (Fixed + Variable)"
              required
              type="number"
              min={0}
              step={10000}
              placeholder="e.g., ₹15,00,000"
              value={form.annualIncome}
              onChange={(value) => onChange("annualIncome", value)}
              inputClass={inputClass}
              labelClass={labelClass}
            />
            <TextField
              id="fh-growth-rate"
              label="Expected Growth Rate in Income"
              placeholder="e.g., 10% per annum"
              value={form.incomeGrowthRate}
              onChange={(value) => onChange("incomeGrowthRate", value)}
              inputClass={inputClass}
              labelClass={labelClass}
            />
          </div>

          <CheckboxGroup
            legend="4. Any existing loans or liabilities"
            selected={form.liabilities}
            options={liabilityOptions}
            onToggle={(value) => onToggleArray("liabilities", value)}
            legendClass={legendClass}
          />
          <TextAreaField
            id="fh-other-loans"
            label="Other loans (please specify)"
            value={form.otherLoans}
            onChange={(value) => onChange("otherLoans", value)}
            inputClass={inputClass}
            labelClass={labelClass}
            rows={2}
          />
        </FieldGroup>
      );

    case 1:
      return (
        <FieldGroup>
          <div className="grid gap-6 sm:grid-cols-2">
            <TextField
              id="fh-monthly-income"
              label="1. Current Monthly Income (₹)"
              placeholder="e.g., 1,50,000"
              value={form.monthlyIncome}
              onChange={(value) => onChange("monthlyIncome", value)}
              inputClass={inputClass}
              labelClass={labelClass}
            />
            <TextField
              id="fh-monthly-expenses"
              label="Monthly Household Expenses (₹)"
              placeholder="e.g., 80,000"
              value={form.monthlyExpenses}
              onChange={(value) => onChange("monthlyExpenses", value)}
              inputClass={inputClass}
              labelClass={labelClass}
            />
          </div>

          <RadioGroup
            legend="2. Do you maintain an emergency fund?"
            name="fh-emergency-fund"
            value={form.emergencyFund}
            options={yesNoOptions}
            onChange={(value) => onChange("emergencyFund", value)}
            legendClass={legendClass}
          />

          <p className="text-sm font-semibold text-charcoal/90">
            3. Assets (approximate value in ₹)
          </p>
          <div className="grid gap-6 sm:grid-cols-2">
            <TextField
              id="fh-asset-bank"
              label="Bank Savings & FDs"
              value={form.assetBankSavings}
              onChange={(value) => onChange("assetBankSavings", value)}
              inputClass={inputClass}
              labelClass={labelClass}
            />
            <TextField
              id="fh-asset-mf"
              label="Mutual Funds / Equity Investments"
              value={form.assetMutualFunds}
              onChange={(value) => onChange("assetMutualFunds", value)}
              inputClass={inputClass}
              labelClass={labelClass}
            />
            <TextField
              id="fh-asset-bonds"
              label="Bonds / Debentures"
              value={form.assetBonds}
              onChange={(value) => onChange("assetBonds", value)}
              inputClass={inputClass}
              labelClass={labelClass}
            />
            <TextField
              id="fh-asset-gold"
              label="Gold / Silver / Other Commodities"
              value={form.assetGoldCommodities}
              onChange={(value) => onChange("assetGoldCommodities", value)}
              inputClass={inputClass}
              labelClass={labelClass}
            />
            <TextField
              id="fh-asset-re"
              label="Real Estate Investments"
              value={form.assetRealEstate}
              onChange={(value) => onChange("assetRealEstate", value)}
              inputClass={inputClass}
              labelClass={labelClass}
            />
            <TextField
              id="fh-asset-retirement"
              label="Retirement Accounts (PF, NPS, Pension Plans)"
              value={form.assetRetirement}
              onChange={(value) => onChange("assetRetirement", value)}
              inputClass={inputClass}
              labelClass={labelClass}
            />
          </div>
          <TextAreaField
            id="fh-asset-insurance"
            label="Insurance (Life, Health, General) with coverage details"
            value={form.assetInsurance}
            onChange={(value) => onChange("assetInsurance", value)}
            inputClass={inputClass}
            labelClass={labelClass}
          />

          <p className="text-sm font-semibold text-charcoal/90">4. Liabilities</p>
          <TextAreaField
            id="fh-outstanding-loans"
            label="Outstanding loans (type and amount)"
            value={form.outstandingLoans}
            onChange={(value) => onChange("outstandingLoans", value)}
            inputClass={inputClass}
            labelClass={labelClass}
          />
          <TextAreaField
            id="fh-emi"
            label="EMI commitments (monthly amount and duration)"
            value={form.emiCommitments}
            onChange={(value) => onChange("emiCommitments", value)}
            inputClass={inputClass}
            labelClass={labelClass}
          />
        </FieldGroup>
      );

    case 2:
      return (
        <FieldGroup>
          <SelectField
            id="fh-volatility"
            label="1. How do you feel about short-term market volatility?"
            placeholder="Select your comfort level"
            value={form.marketVolatility}
            options={volatilityOptions}
            onChange={(value) => onChange("marketVolatility", value)}
            inputClass={inputClass}
            labelClass={labelClass}
          />
          <SelectField
            id="fh-objective"
            label="2. What is your primary investment objective?"
            placeholder="Select your primary objective"
            value={form.investmentObjective}
            options={investmentObjectiveOptions}
            onChange={(value) => onChange("investmentObjective", value)}
            inputClass={inputClass}
            labelClass={labelClass}
          />
          <SelectField
            id="fh-horizon"
            label="3. Investment Horizon for majority of your funds"
            placeholder="Select time horizon"
            value={form.investmentHorizon}
            options={investmentHorizonOptions}
            onChange={(value) => onChange("investmentHorizon", value)}
            inputClass={inputClass}
            labelClass={labelClass}
          />
          <TextAreaField
            id="fh-asset-classes"
            label="4. Preferred Asset Classes (rank in priority)"
            placeholder="e.g., 1. Equity, 2. Debt, 3. Gold/Silver, 4. Real Estate, 5. Alternative Investments"
            value={form.preferredAssetClasses}
            onChange={(value) => onChange("preferredAssetClasses", value)}
            inputClass={inputClass}
            labelClass={labelClass}
          />
          <RadioGroup
            legend="5. Are you comfortable investing in international assets / global funds?"
            name="fh-international"
            value={form.internationalAssets}
            options={internationalAssetsOptions}
            onChange={(value) => onChange("internationalAssets", value)}
            legendClass={legendClass}
          />
        </FieldGroup>
      );

    case 3:
      return (
        <FieldGroup>
          <RadioGroup
            legend="1. Do you currently have health insurance?"
            name="fh-health-insurance"
            value={form.healthInsurance}
            options={yesNoOptions}
            onChange={(value) => onChange("healthInsurance", value)}
            legendClass={legendClass}
          />
          <RadioGroup
            legend="2. Do you currently have life insurance?"
            name="fh-life-insurance"
            value={form.lifeInsurance}
            options={yesNoOptions}
            onChange={(value) => onChange("lifeInsurance", value)}
            legendClass={legendClass}
          />
          <TextAreaField
            id="fh-other-protection"
            label="3. Any other forms of protection?"
            placeholder="Critical illness, accidental, term plans, etc."
            value={form.otherProtection}
            onChange={(value) => onChange("otherProtection", value)}
            inputClass={inputClass}
            labelClass={labelClass}
          />
          <RadioGroup
            legend="4. Do you feel adequately insured for your dependents' financial security?"
            name="fh-adequately-insured"
            value={form.adequatelyInsured}
            options={adequatelyInsuredOptions}
            onChange={(value) => onChange("adequatelyInsured", value)}
            legendClass={legendClass}
          />
        </FieldGroup>
      );

    case 4:
      return (
        <FieldGroup>
          <TextAreaField
            id="fh-short-goals"
            label="1. Short-term goals (0 to 2 years)"
            placeholder="e.g., Emergency fund, vacation, car purchase..."
            value={form.shortTermGoals}
            onChange={(value) => onChange("shortTermGoals", value)}
            inputClass={inputClass}
            labelClass={labelClass}
          />
          <TextAreaField
            id="fh-medium-goals"
            label="2. Medium-term goals (2 to 5 years)"
            placeholder="e.g., Home purchase, business expansion..."
            value={form.mediumTermGoals}
            onChange={(value) => onChange("mediumTermGoals", value)}
            inputClass={inputClass}
            labelClass={labelClass}
          />
          <TextAreaField
            id="fh-long-goals"
            label="3. Long-term goals (more than 5 years)"
            placeholder="e.g., Retirement, children's education, legacy planning..."
            value={form.longTermGoals}
            onChange={(value) => onChange("longTermGoals", value)}
            inputClass={inputClass}
            labelClass={labelClass}
          />
          <CheckboxGroup
            legend="4. Specific milestones to plan for"
            selected={form.goalMilestones}
            options={goalMilestoneOptions}
            onToggle={(value) => onToggleArray("goalMilestones", value)}
            legendClass={legendClass}
          />
          <TextAreaField
            id="fh-other-milestones"
            label="Other milestones (please specify)"
            value={form.otherMilestones}
            onChange={(value) => onChange("otherMilestones", value)}
            inputClass={inputClass}
            labelClass={labelClass}
            rows={2}
          />
        </FieldGroup>
      );

    case 5:
      return (
        <FieldGroup>
          <RadioGroup
            legend="1. Do you have a Will or Estate Plan in place?"
            name="fh-will"
            value={form.willEstatePlan}
            options={yesNoOptions}
            onChange={(value) => onChange("willEstatePlan", value)}
            legendClass={legendClass}
          />
          <RadioGroup
            legend="2. Do you want to set up any Trusts or Succession Planning structures?"
            name="fh-trusts"
            value={form.trustsSuccession}
            options={trustsSuccessionOptions}
            onChange={(value) => onChange("trustsSuccession", value)}
            legendClass={legendClass}
          />
          <RadioGroup
            legend="3. Do you have nominees updated in all your investments & insurance policies?"
            name="fh-nominees"
            value={form.nomineesUpdated}
            options={nomineesOptions}
            onChange={(value) => onChange("nomineesUpdated", value)}
            legendClass={legendClass}
          />
        </FieldGroup>
      );

    case 6:
      return (
        <FieldGroup>
          <RadioGroup
            legend="1. Do you prefer"
            name="fh-investment-style"
            value={form.investmentStyle}
            options={investmentStyleOptions}
            onChange={(value) => onChange("investmentStyle", value)}
            legendClass={legendClass}
          />
          <SelectField
            id="fh-review-freq"
            label="2. How often do you review your financial portfolio?"
            placeholder="Select frequency"
            value={form.reviewFrequency}
            options={reviewFrequencyOptions}
            onChange={(value) => onChange("reviewFrequency", value)}
            inputClass={inputClass}
            labelClass={labelClass}
          />
          <RadioGroup
            legend="3. Do you prefer automated SIP / disciplined investing or tactical lump sum calls?"
            name="fh-sip"
            value={form.sipPreference}
            options={sipPreferenceOptions}
            onChange={(value) => onChange("sipPreference", value)}
            legendClass={legendClass}
          />
          <SelectField
            id="fh-tracking-time"
            label="4. How much time do you like to spend tracking investments?"
            placeholder="Select time preference"
            value={form.trackingTime}
            options={trackingTimeOptions}
            onChange={(value) => onChange("trackingTime", value)}
            inputClass={inputClass}
            labelClass={labelClass}
          />
        </FieldGroup>
      );

    case 7:
      return (
        <FieldGroup>
          <CheckboxGroup
            legend="1. What do you expect from your financial advisor?"
            selected={form.advisorExpectations}
            options={advisorExpectationOptions}
            onToggle={(value) => onToggleArray("advisorExpectations", value)}
            legendClass={legendClass}
          />
          <SelectField
            id="fh-meeting-freq"
            label="2. How often would you like review meetings?"
            placeholder="Select meeting frequency"
            value={form.meetingFrequency}
            options={meetingFrequencyOptions}
            onChange={(value) => onChange("meetingFrequency", value)}
            inputClass={inputClass}
            labelClass={labelClass}
          />
          <RadioGroup
            legend="3. Do you want digital access, reports, and alerts for your portfolio?"
            name="fh-digital"
            value={form.digitalAccess}
            options={yesNoOptions}
            onChange={(value) => onChange("digitalAccess", value)}
            legendClass={legendClass}
          />
        </FieldGroup>
      );

    default:
      return null;
  }
}
