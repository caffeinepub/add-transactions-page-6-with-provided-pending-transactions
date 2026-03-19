export interface PensionRequirement {
  id: string;
  title: string;
  description: string;
  category: string;
}

export const PENSION_REQUIREMENTS: PensionRequirement[] = [
  // Personal Documents
  {
    id: "id-proof",
    title: "Valid Government-Issued ID",
    description: "Passport, driver's license, or national ID card",
    category: "Personal Documents",
  },
  {
    id: "birth-cert",
    title: "Birth Certificate",
    description: "Original or certified copy",
    category: "Personal Documents",
  },
  {
    id: "address-proof",
    title: "Proof of Address",
    description: "Utility bill or bank statement (within last 3 months)",
    category: "Personal Documents",
  },
  // Employment Records
  {
    id: "work-history",
    title: "Complete Work History",
    description: "List of all employers with dates of employment",
    category: "Employment Records",
  },
  {
    id: "pay-stubs",
    title: "Recent Pay Stubs",
    description: "Last 6 months of pay stubs or salary statements",
    category: "Employment Records",
  },
  {
    id: "employment-letter",
    title: "Employment Verification Letter",
    description: "Letter from current or most recent employer",
    category: "Employment Records",
  },
  // Financial Documents
  {
    id: "bank-statements",
    title: "Bank Statements",
    description: "Last 12 months of bank statements",
    category: "Financial Documents",
  },
  {
    id: "tax-returns",
    title: "Tax Returns",
    description: "Last 3 years of filed tax returns",
    category: "Financial Documents",
  },
  {
    id: "investment-records",
    title: "Investment Account Statements",
    description: "Current statements for all investment accounts",
    category: "Financial Documents",
  },
  // Pension-Specific Forms
  {
    id: "application-form",
    title: "Pension Application Form",
    description: "Completed and signed pension application",
    category: "Pension-Specific Forms",
  },
  {
    id: "beneficiary-form",
    title: "Beneficiary Designation Form",
    description: "Designate your pension beneficiaries",
    category: "Pension-Specific Forms",
  },
  {
    id: "direct-deposit",
    title: "Direct Deposit Authorization",
    description: "Bank account information for pension payments",
    category: "Pension-Specific Forms",
  },
  // Eligibility Criteria
  {
    id: "age-requirement",
    title: "Age Requirement",
    description:
      "Must be at least 60 years old or meet early retirement criteria",
    category: "Eligibility Criteria",
  },
  {
    id: "service-years",
    title: "Years of Service",
    description: "Minimum of 10 years of qualifying service",
    category: "Eligibility Criteria",
  },
  {
    id: "contribution-proof",
    title: "Contribution Records",
    description: "Proof of pension contributions throughout employment",
    category: "Eligibility Criteria",
  },
];

// All requirement IDs — used for paid transactions (all met)
export const ALL_REQUIREMENT_IDS = PENSION_REQUIREMENTS.map((r) => r.id);

// Default missing requirement IDs for generic failed/pending transactions
export const DEFAULT_MISSING_IDS: string[] = [
  "work-history",
  "employment-letter",
];

// Jason Maddison's original missing requirements (both Contribution Records + Complete Work History)
export const JASON_MADDISON_MISSING_IDS: string[] = [
  "contribution-proof",
  "work-history",
];

// Jason Maddison updated: only Contribution Records still missing (Complete Work History now verified)
export const JASON_MADDISON_UPDATED_MISSING_IDS: string[] = [
  "contribution-proof",
];
