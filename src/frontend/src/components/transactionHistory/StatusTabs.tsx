import { Button } from "@/components/ui/button";

interface StatusTabsProps {
  activeTab: "All" | "Paid" | "Pending" | "Failed";
  onTabChange: (tab: "All" | "Paid" | "Pending" | "Failed") => void;
}

export default function StatusTabs({
  activeTab,
  onTabChange,
}: StatusTabsProps) {
  const tabs: Array<"All" | "Paid" | "Pending" | "Failed"> = [
    "All",
    "Paid",
    "Pending",
    "Failed",
  ];

  return (
    <div className="flex gap-2">
      {tabs.map((tab) => (
        <Button
          key={tab}
          variant={activeTab === tab ? "default" : "outline"}
          size="sm"
          onClick={() => onTabChange(tab)}
          className="min-w-[80px]"
        >
          {tab}
        </Button>
      ))}
    </div>
  );
}
