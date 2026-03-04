import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { useState } from "react";
import TransactionDetailModal from "../TransactionDetailModal";

interface Transaction {
  beneficiaryName: string;
  role: string;
  bankName: string;
  maskedAccount: string;
  amountEur: bigint;
  status: string;
  date: string;
  note?: string;
  failureReasons?: string[];
  missingRequirementIds?: string[];
}

interface TransactionSectionProps {
  title: string;
  status: "Paid" | "Pending" | "Failed";
  transactions: Transaction[];
  columns: string[];
  sectionNote?: string;
  dateLabel?: string;
}

export default function TransactionSection({
  title,
  status,
  transactions,
  columns,
  sectionNote,
  dateLabel = "Date",
}: TransactionSectionProps) {
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const getStatusIcon = () => {
    switch (status) {
      case "Paid":
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case "Pending":
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case "Failed":
        return <XCircle className="h-5 w-5 text-red-600" />;
    }
  };

  const getStatusBadgeVariant = () => {
    switch (status) {
      case "Paid":
        return "default";
      case "Pending":
        return "secondary";
      case "Failed":
        return "destructive";
    }
  };

  const formatAmount = (amount: bigint) => {
    return `$${amount.toLocaleString()}`;
  };

  if (transactions.length === 0) return null;

  return (
    <>
      <Card className="overflow-hidden">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-6">
            {getStatusIcon()}
            <h3 className="text-lg font-semibold">{title}</h3>
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  {columns.map((col) => (
                    <th
                      key={col}
                      className="text-left py-3 px-4 text-sm font-medium text-muted-foreground"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, idx) => (
                  <tr
                    key={`${transaction.beneficiaryName}-${idx}`}
                    className="border-b last:border-0 cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => setSelectedTransaction(transaction)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ")
                        setSelectedTransaction(transaction);
                    }}
                    tabIndex={0}
                  >
                    <td className="py-4 px-4">
                      <div>
                        <div className="font-medium">
                          {transaction.beneficiaryName}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {transaction.role}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm">
                      {transaction.bankName}
                    </td>
                    <td className="py-4 px-4 text-sm">
                      {transaction.maskedAccount}
                    </td>
                    {columns.includes("Amount") && (
                      <td className="py-4 px-4 text-sm font-medium">
                        {formatAmount(transaction.amountEur)}
                      </td>
                    )}
                    <td className="py-4 px-4">
                      <Badge
                        variant={getStatusBadgeVariant()}
                        className={
                          status === "Paid"
                            ? "bg-green-600 hover:bg-green-700"
                            : status === "Pending"
                              ? "bg-yellow-500 hover:bg-yellow-600 text-black"
                              : "bg-red-600 hover:bg-red-700"
                        }
                      >
                        {transaction.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-sm">
                      {transaction.date}
                      {transaction.note && (
                        <div className="text-xs text-muted-foreground mt-1">
                          {transaction.note}
                        </div>
                      )}
                      {transaction.failureReasons &&
                        transaction.failureReasons.length > 0 && (
                          <div className="mt-2">
                            <div className="text-xs font-semibold text-red-600 mb-1">
                              Failure Reasons:
                            </div>
                            <ul className="space-y-1">
                              {transaction.failureReasons.map(
                                (reason, rIdx) => (
                                  <li
                                    key={`${transaction.beneficiaryName}-reason-${rIdx}`}
                                    className="text-xs text-muted-foreground flex items-start gap-1"
                                  >
                                    <span className="text-red-400 mt-0.5">
                                      •
                                    </span>
                                    <span>{reason}</span>
                                  </li>
                                ),
                              )}
                            </ul>
                          </div>
                        )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {transactions.map((transaction, idx) => (
              <Card
                key={`${transaction.beneficiaryName}-card-${idx}`}
                className="p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => setSelectedTransaction(transaction)}
              >
                <div className="space-y-3">
                  <div>
                    <div className="font-medium">
                      {transaction.beneficiaryName}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {transaction.role}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <div className="text-muted-foreground">Bank</div>
                      <div>{transaction.bankName}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Account</div>
                      <div>{transaction.maskedAccount}</div>
                    </div>
                    {columns.includes("Amount") && (
                      <div>
                        <div className="text-muted-foreground">Amount</div>
                        <div className="font-medium">
                          {formatAmount(transaction.amountEur)}
                        </div>
                      </div>
                    )}
                    <div>
                      <div className="text-muted-foreground">Status</div>
                      <Badge
                        variant={getStatusBadgeVariant()}
                        className={
                          status === "Paid"
                            ? "bg-green-600 hover:bg-green-700"
                            : status === "Pending"
                              ? "bg-yellow-500 hover:bg-yellow-600 text-black"
                              : "bg-red-600 hover:bg-red-700"
                        }
                      >
                        {transaction.status}
                      </Badge>
                    </div>
                    <div>
                      <div className="text-muted-foreground">{dateLabel}</div>
                      <div>{transaction.date}</div>
                    </div>
                  </div>
                  {transaction.note && (
                    <div className="text-xs text-muted-foreground pt-2 border-t">
                      {transaction.note}
                    </div>
                  )}
                  {transaction.failureReasons &&
                    transaction.failureReasons.length > 0 && (
                      <div className="pt-2 border-t">
                        <div className="text-xs font-semibold text-red-600 mb-1">
                          Failure Reasons:
                        </div>
                        <ul className="space-y-1">
                          {transaction.failureReasons.map((reason, rIdx) => (
                            <li
                              key={`${transaction.beneficiaryName}-mobile-reason-${rIdx}`}
                              className="text-xs text-muted-foreground flex items-start gap-1"
                            >
                              <span className="text-red-400 mt-0.5">•</span>
                              <span>{reason}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>
              </Card>
            ))}
          </div>

          {sectionNote && (
            <div className="mt-4 text-center text-sm text-muted-foreground italic">
              {sectionNote}
            </div>
          )}
        </div>
      </Card>

      <TransactionDetailModal
        transaction={selectedTransaction}
        open={selectedTransaction !== null}
        onClose={() => setSelectedTransaction(null)}
      />
    </>
  );
}
