import { useState } from "react";
import StatusTabs from "../../components/transactionHistory/StatusTabs";
import TransactionSection from "../../components/transactionHistory/TransactionSection";
import { DEFAULT_MISSING_IDS } from "../../data/pensionRequirements";

export default function TransactionHistoryPage3() {
  const [activeTab, setActiveTab] = useState<
    "All" | "Paid" | "Pending" | "Failed"
  >("All");

  const paidTransactions = [
    {
      beneficiaryName: "Peter Mensah",
      role: "Infrastructure Lead (Retired)",
      bankName: "Citibank",
      maskedAccount: "66******81",
      amountEur: BigInt(220000),
      status: "Paid",
      date: "02 Feb 2026",
    },
    {
      beneficiaryName: "Mary Ellen.",
      role: "Lead Engineer (Retired )",
      bankName: "JPMorgan Chase",
      maskedAccount: "29******29",
      amountEur: BigInt(264580),
      status: "Failed",
      date: "10 Dec 2025",
      missingRequirementIds: DEFAULT_MISSING_IDS,
    },
    {
      beneficiaryName: "Emma Robinson",
      role: "Blockchain Developer (Retired)",
      bankName: "Citibank",
      maskedAccount: "49******72",
      amountEur: BigInt(195000),
      status: "Paid",
      date: "11 Jan 2026",
    },
    {
      beneficiaryName: "Julian Foster",
      role: "DevOps Lead (Retired)",
      bankName: "JPMorgan Chase",
      maskedAccount: "82******56",
      amountEur: BigInt(250000),
      status: "Paid",
      date: "20 Mar 2025",
    },
    {
      beneficiaryName: "Peter O'Sullivan",
      role: "Cloud Platform Engineer (Retired)",
      bankName: "Wells Fargo",
      maskedAccount: "52*****54",
      amountEur: BigInt(230000),
      status: "Paid",
      date: "15 Feb 2026",
    },
  ];

  const pendingTransactionsLeft = [
    {
      beneficiaryName: "Grace Williams",
      role: "Systems Analyst (Retired)",
      bankName: "Bank of America",
      maskedAccount: "80******19",
      amountEur: BigInt(170000),
      status: "Pending",
      date: "10 Dec 2026",
      missingRequirementIds: DEFAULT_MISSING_IDS,
    },
  ];

  const pendingTransactionsRight = [
    {
      beneficiaryName: "Brian Thompson",
      role: "IT Support Lead (Retired)",
      bankName: "JPMorgan Chase",
      maskedAccount: "24******55",
      amountEur: BigInt(200000),
      status: "Pending",
      date: "14 Aug 2026",
      missingRequirementIds: DEFAULT_MISSING_IDS,
    },
    {
      beneficiaryName: "Fatima Ahmed",
      role: "Business Systems Analyst (Retired)",
      bankName: "Citibank",
      maskedAccount: "51******67",
      amountEur: BigInt(180000),
      status: "Pending",
      date: "21 Nov 2026",
      missingRequirementIds: DEFAULT_MISSING_IDS,
    },
  ];

  const failedTransactionsLeft = [
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
      beneficiaryName: "Ahmed Khan",
      role: "",
      bankName: "JPMorgan Chase",
      maskedAccount: "265*****72",
      amountEur: BigInt(175000),
      status: "Pending",
      date: "06 May 2026",
      missingRequirementIds: DEFAULT_MISSING_IDS,
    },
  ];

  const failedTransactionsRight = [
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
            <div className="grid md:grid-cols-2 gap-6">
              <TransactionSection
                title="Pending Transactions"
                status="Pending"
                transactions={pendingTransactionsLeft}
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
              <TransactionSection
                title="Pending Transactions"
                status="Pending"
                transactions={pendingTransactionsRight}
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
            </div>
          )}

          {shouldShowSection("Failed") && (
            <div className="grid md:grid-cols-2 gap-6">
              <TransactionSection
                title="Failed Transactions"
                status="Failed"
                transactions={failedTransactionsLeft}
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
              <TransactionSection
                title="Failed Transactions"
                status="Failed"
                transactions={failedTransactionsRight}
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
            </div>
          )}
        </div>

        {shouldShowSection("Failed") && (
          <div className="text-center text-sm text-muted-foreground italic">
            Missing proof of employment start date. Missing valid company ID.
            Payment will resume once all required documents are verified.
          </div>
        )}
      </div>
    </div>
  );
}
