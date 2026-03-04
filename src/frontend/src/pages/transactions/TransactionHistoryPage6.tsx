import { useState } from "react";
import StatusTabs from "../../components/transactionHistory/StatusTabs";
import TransactionSection from "../../components/transactionHistory/TransactionSection";
import { DEFAULT_MISSING_IDS } from "../../data/pensionRequirements";

export default function TransactionHistoryPage6() {
  const [activeTab, setActiveTab] = useState<
    "All" | "Paid" | "Pending" | "Failed"
  >("All");

  const pendingTransactions = [
    {
      beneficiaryName: "Jordan Thomas",
      role: "Data Cackend Engineer (Retired)",
      bankName: "JPMorgan Chase",
      maskedAccount: "23*******56",
      amountEur: BigInt(220000),
      status: "Pending",
      date: "20 march 2026",
      missingRequirementIds: DEFAULT_MISSING_IDS,
    },
    {
      beneficiaryName: "Olivia Anderson",
      role: "Network Operations Lead (Retired)",
      bankName: "Citibank",
      maskedAccount: "41******82",
      amountEur: BigInt(180000),
      status: "Pending",
      date: "12 may 2026",
      missingRequirementIds: DEFAULT_MISSING_IDS,
    },
    {
      beneficiaryName: "Benjamin Reyes",
      role: "Developer (Retired)",
      bankName: "Wells Fargo",
      maskedAccount: "57******14",
      amountEur: BigInt(265000),
      status: "Pending",
      date: "8 march 2026",
      missingRequirementIds: DEFAULT_MISSING_IDS,
    },
    {
      beneficiaryName: "Sandra Foster",
      role: "Backend Engineer (Retired)",
      bankName: "JPMorgan Chase",
      maskedAccount: "29******27",
      amountEur: BigInt(200000),
      status: "Pending",
      date: "26 feb 2026",
      missingRequirementIds: DEFAULT_MISSING_IDS,
    },
    {
      beneficiaryName: "Nicholas Bornet",
      role: "Dewow Engineer (Retired)",
      bankName: "Citibank",
      maskedAccount: "220*****5",
      amountEur: BigInt(220000),
      status: "Pending",
      date: "5 April 2026",
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
        </div>
      </div>
    </div>
  );
}
