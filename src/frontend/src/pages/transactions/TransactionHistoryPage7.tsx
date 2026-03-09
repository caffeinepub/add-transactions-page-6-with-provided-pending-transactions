import { useState } from "react";
import StatusTabs from "../../components/transactionHistory/StatusTabs";
import TransactionSection from "../../components/transactionHistory/TransactionSection";
import {
  DEFAULT_MISSING_IDS,
  JASON_MADDISON_MISSING_IDS,
} from "../../data/pensionRequirements";

export default function TransactionHistoryPage7() {
  const [activeTab, setActiveTab] = useState<
    "All" | "Paid" | "Pending" | "Failed"
  >("All");

  const paidTransactions = [
    {
      beneficiaryName: "Victor Mensah",
      role: "Backend Engineer (Retired)",
      bankName: "JPMorgan Chase",
      maskedAccount: "39*****81",
      amountEur: BigInt(245000),
      status: "Paid",
      date: "20 Feb 2026",
    },
    {
      beneficiaryName: "Chloe Bennett",
      role: "Data Science Manager (Retired)",
      bankName: "Barclays",
      maskedAccount: "27*****63",
      amountEur: BigInt(195000),
      status: "Paid",
      date: "21 Feb 2026",
    },
    {
      beneficiaryName: "Daniel Okafor",
      role: "Senior Systems Architect (Retired)",
      bankName: "Goldman Sachs",
      maskedAccount: "48*****92",
      amountEur: BigInt(245000),
      status: "Paid",
      date: "24 Feb 2026",
    },
  ];

  const pendingTransactions = [
    {
      beneficiaryName: "Maria Gonzalez",
      role: "Cloud Infrastructure Lead (Retired)",
      bankName: "Morgan Stanley",
      maskedAccount: "63*****17",
      amountEur: BigInt(310000),
      status: "Pending",
      date: "15 Mar 2026",
      missingRequirementIds: DEFAULT_MISSING_IDS,
    },
    {
      beneficiaryName: "Samuel Adeyemi",
      role: "Enterprise Security Head (Retired)",
      bankName: "Bank of America",
      maskedAccount: "54*****08",
      amountEur: BigInt(330000),
      status: "Pending",
      date: "25 Apr 2026",
      missingRequirementIds: DEFAULT_MISSING_IDS,
    },
  ];

  const failedTransactions = [
    {
      beneficiaryName: "Jason Maddison",
      role: "Lead Engineer (Retired)",
      bankName: "JPMorgan Chase",
      maskedAccount: "29******29",
      amountEur: BigInt(264580),
      status: "Failed",
      date: "24 Feb 2026",
      failureReasons: [
        "Contribution Records – Required: Proof of pension contributions throughout employment",
        "Complete Work History – Required: List of all employers with dates of employment",
      ],
      missingRequirementIds: JASON_MADDISON_MISSING_IDS,
    },
  ];

  const shouldShowSection = (sectionStatus: string) => {
    if (activeTab === "All") return true;
    return activeTab === sectionStatus;
  };

  return (
    <div className="container py-8 max-w-7xl">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
            <p className="text-muted-foreground mt-1">
              Payment history and status overview.
            </p>
          </div>
          <StatusTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        <div className="space-y-6">
          {shouldShowSection("Paid") && (
            <TransactionSection
              title="Paid Transactions"
              status="Paid"
              transactions={paidTransactions}
              columns={[
                "Beneficiary / Role",
                "Bank",
                "Account",
                "Amount",
                "Status",
                "Date",
              ]}
            />
          )}

          {shouldShowSection("Pending") && (
            <TransactionSection
              title="Pending Transactions"
              status="Pending"
              transactions={pendingTransactions}
              columns={[
                "Beneficiary / Role",
                "Bank",
                "Account",
                "Amount",
                "Status",
                "Last Review",
              ]}
              dateLabel="Last Review"
            />
          )}

          {shouldShowSection("Failed") && (
            <TransactionSection
              title="Failed Transactions"
              status="Failed"
              transactions={failedTransactions}
              columns={[
                "Beneficiary / Role",
                "Bank",
                "Account",
                "Amount",
                "Status",
                "Last Review",
              ]}
              dateLabel="Last Review"
            />
          )}
        </div>
      </div>
    </div>
  );
}
