import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, XCircle } from "lucide-react";
import {
  ALL_REQUIREMENT_IDS,
  PENSION_REQUIREMENTS,
} from "../data/pensionRequirements";

interface TransactionForModal {
  beneficiaryName: string;
  role: string;
  bankName: string;
  maskedAccount: string;
  amountEur: bigint;
  status: string;
  date: string;
  note?: string;
  missingRequirementIds?: string[];
}

interface TransactionDetailModalProps {
  transaction: TransactionForModal | null;
  open: boolean;
  onClose: () => void;
}

const formatAmount = (amount: bigint) => `$${amount.toLocaleString()}`;

const STATUS_STYLES: Record<string, { badge: string; label: string }> = {
  Paid: { badge: "bg-green-600 hover:bg-green-700 text-white", label: "Paid" },
  Pending: {
    badge: "bg-yellow-500 hover:bg-yellow-600 text-black",
    label: "Pending",
  },
  Failed: { badge: "bg-red-600 hover:bg-red-700 text-white", label: "Failed" },
};

// Group requirements by category for display
const CATEGORIES = Array.from(
  new Set(PENSION_REQUIREMENTS.map((r) => r.category)),
);

export default function TransactionDetailModal({
  transaction,
  open,
  onClose,
}: TransactionDetailModalProps) {
  if (!transaction) return null;

  const isPaid = transaction.status === "Paid";
  const missingIds = transaction.missingRequirementIds ?? [];

  // For paid transactions, all requirements are met
  const isRequirementMet = (reqId: string): boolean => {
    if (isPaid) return true;
    return !missingIds.includes(reqId);
  };

  const statusStyle =
    STATUS_STYLES[transaction.status] ?? STATUS_STYLES.Pending;

  const metCount = isPaid
    ? ALL_REQUIREMENT_IDS.length
    : ALL_REQUIREMENT_IDS.filter((id) => !missingIds.includes(id)).length;
  const totalCount = ALL_REQUIREMENT_IDS.length;

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
    >
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {transaction.beneficiaryName}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {transaction.role}
          </DialogDescription>
        </DialogHeader>

        {/* Transaction Details */}
        <div className="grid grid-cols-2 gap-4 py-2">
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
              Bank
            </div>
            <div className="text-sm font-medium">{transaction.bankName}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
              Account
            </div>
            <div className="text-sm font-medium">
              {transaction.maskedAccount || "—"}
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
              Amount
            </div>
            <div className="text-sm font-medium">
              {transaction.amountEur > BigInt(0)
                ? formatAmount(transaction.amountEur)
                : "—"}
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
              Date
            </div>
            <div className="text-sm font-medium">{transaction.date}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
              Status
            </div>
            <Badge className={statusStyle.badge}>{statusStyle.label}</Badge>
          </div>
        </div>

        {transaction.note && (
          <div className="text-sm text-muted-foreground bg-muted/40 rounded-md px-3 py-2">
            {transaction.note}
          </div>
        )}

        <Separator />

        {/* Requirements Checklist */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-base">Requirements Checklist</h3>
            <span
              className={`text-sm font-medium ${isPaid ? "text-green-600" : missingIds.length > 0 ? "text-red-600" : "text-green-600"}`}
            >
              {metCount} / {totalCount} met
            </span>
          </div>

          <div className="space-y-5">
            {CATEGORIES.map((category) => {
              const items = PENSION_REQUIREMENTS.filter(
                (r) => r.category === category,
              );
              return (
                <div key={category}>
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                    {category}
                  </div>
                  <div className="space-y-2">
                    {items.map((req) => {
                      const met = isRequirementMet(req.id);
                      return (
                        <div
                          key={req.id}
                          className={`flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors ${
                            met
                              ? "bg-green-50 dark:bg-green-950/20"
                              : "bg-red-50 dark:bg-red-950/20"
                          }`}
                        >
                          <div className="mt-0.5 flex-shrink-0">
                            {met ? (
                              <CheckCircle2 className="h-5 w-5 text-green-600" />
                            ) : (
                              <XCircle className="h-5 w-5 text-red-500" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div
                              className={`text-sm font-medium ${met ? "text-green-800 dark:text-green-200" : "text-red-800 dark:text-red-200"}`}
                            >
                              {req.title}
                            </div>
                            <div className="text-xs text-muted-foreground mt-0.5">
                              {req.description}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
