import { useState } from "react";
import StatusTabs from "../../components/transactionHistory/StatusTabs";
import TransactionSection from "../../components/transactionHistory/TransactionSection";
import { DEFAULT_MISSING_IDS } from "../../data/pensionRequirements";

export default function TransactionHistoryPage1() {
  const [activeTab, setActiveTab] = useState<
    "All" | "Paid" | "Pending" | "Failed"
  >("All");

  const paidTransactions = [
    {
      beneficiaryName: "Sarah Johnson",
      role: "Data Engineer (Retired)",
      bankName: "Citibank",
      maskedAccount: "52******68",
      amountEur: BigInt(200000),
      status: "Paid",
      date: "02 Feb 2026",
    },
    {
      beneficiaryName: "David Wilson",
      role: "Data Engineer (Retired)",
      bankName: "HSBC",
      maskedAccount: "38******25",
      amountEur: BigInt(310000),
      status: "Paid",
      date: "11 Apr 2025",
    },
    {
      beneficiaryName: "Aisha Hassan",
      role: "Pension processe (Retired)",
      bankName: "JPMorgan Chase",
      maskedAccount: "69******32",
      amountEur: BigInt(175000),
      status: "Paid",
      date: "10 Mar 2025",
    },
    {
      beneficiaryName: "Brian Thompson",
      role: "IT Support Lead (Retired)",
      bankName: "JPMorgan Chase",
      maskedAccount: "24******55",
      amountEur: BigInt(200000),
      status: "Paid",
      date: "14 Jan 2026",
    },
    {
      beneficiaryName: "Fatima Ahmed",
      role: "Business Systems Analyst (Retired)",
      bankName: "Citibank",
      maskedAccount: "51******67",
      amountEur: BigInt(180000),
      status: "Paid",
      date: "22 Jan 2026",
    },
  ];

  const pendingTransactions: typeof paidTransactions = [];

  const failedTransactions = [
    {
      beneficiaryName: "Gabriel Scott",
      role: "Barkeend Engineer (Retired)",
      bankName: "Wells Fargo",
      maskedAccount: "73******40",
      amountEur: BigInt(280000),
      status: "Failed",
      date: "02 Feb 2026",
      missingRequirementIds: DEFAULT_MISSING_IDS,
    },
    {
      beneficiaryName: "Brian Thompson",
      role: "Data Engineer · (Retired)",
      bankName: "JPMorgan Chase",
      maskedAccount: "",
      amountEur: BigInt(170000),
      status: "Failed",
      date: "14 Aug 2025",
      missingRequirementIds: DEFAULT_MISSING_IDS,
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
              sectionNote="Missing proof of employment start date. Missing valid company ID. Payment will resume once all required documents are verified."
            />
          )}
        </div>
      </div>
    </div>
  );
}
