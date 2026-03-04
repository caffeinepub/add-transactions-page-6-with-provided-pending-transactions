import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Building2,
  Calendar,
  CheckCircle2,
  DollarSign,
  FileText,
  User,
} from "lucide-react";

interface RequirementItem {
  id: string;
  title: string;
  description: string;
  required: boolean;
}

interface RequirementSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  items: RequirementItem[];
}

const requirementsData: RequirementSection[] = [
  {
    id: "personal-documents",
    title: "Personal Documents",
    icon: <User className="h-5 w-5" />,
    items: [
      {
        id: "id-proof",
        title: "Valid Government-Issued ID",
        description: "Passport, driver's license, or national ID card",
        required: true,
      },
      {
        id: "birth-cert",
        title: "Birth Certificate",
        description: "Original or certified copy",
        required: true,
      },
      {
        id: "address-proof",
        title: "Proof of Address",
        description: "Utility bill or bank statement (within last 3 months)",
        required: true,
      },
    ],
  },
  {
    id: "employment-records",
    title: "Employment Records",
    icon: <Building2 className="h-5 w-5" />,
    items: [
      {
        id: "work-history",
        title: "Complete Work History",
        description: "List of all employers with dates of employment",
        required: true,
      },
      {
        id: "pay-stubs",
        title: "Recent Pay Stubs",
        description: "Last 6 months of pay stubs or salary statements",
        required: true,
      },
      {
        id: "employment-letter",
        title: "Employment Verification Letter",
        description: "Letter from current or most recent employer",
        required: false,
      },
    ],
  },
  {
    id: "financial-documents",
    title: "Financial Documents",
    icon: <DollarSign className="h-5 w-5" />,
    items: [
      {
        id: "bank-statements",
        title: "Bank Statements",
        description: "Last 12 months of bank statements",
        required: true,
      },
      {
        id: "tax-returns",
        title: "Tax Returns",
        description: "Last 3 years of filed tax returns",
        required: true,
      },
      {
        id: "investment-records",
        title: "Investment Account Statements",
        description: "Current statements for all investment accounts",
        required: false,
      },
    ],
  },
  {
    id: "pension-specific",
    title: "Pension-Specific Forms",
    icon: <FileText className="h-5 w-5" />,
    items: [
      {
        id: "application-form",
        title: "Pension Application Form",
        description: "Completed and signed pension application",
        required: true,
      },
      {
        id: "beneficiary-form",
        title: "Beneficiary Designation Form",
        description: "Designate your pension beneficiaries",
        required: true,
      },
      {
        id: "direct-deposit",
        title: "Direct Deposit Authorization",
        description: "Bank account information for pension payments",
        required: true,
      },
    ],
  },
  {
    id: "eligibility-criteria",
    title: "Eligibility Criteria",
    icon: <Calendar className="h-5 w-5" />,
    items: [
      {
        id: "age-requirement",
        title: "Age Requirement",
        description:
          "Must be at least 60 years old or meet early retirement criteria",
        required: true,
      },
      {
        id: "service-years",
        title: "Years of Service",
        description: "Minimum of 10 years of qualifying service",
        required: true,
      },
      {
        id: "contribution-proof",
        title: "Contribution Records",
        description: "Proof of pension contributions throughout employment",
        required: true,
      },
    ],
  },
];

export default function PensionRequirementsPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Header Section */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Pension Application Requirements
          </h1>
          <p className="text-lg text-muted-foreground">
            Review the documents and criteria needed to apply for your pension
            benefits. Ensure you have all required items before submitting your
            application.
          </p>
        </div>

        <Separator />

        {/* Requirements Sections */}
        <div className="space-y-6">
          {requirementsData.map((section) => (
            <Card key={section.id}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {section.icon}
                  </div>
                  <div>
                    <CardTitle className="text-xl">{section.title}</CardTitle>
                    <CardDescription>
                      {section.items.filter((item) => item.required).length}{" "}
                      required items
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {section.items.map((item, index) => (
                    <div key={item.id}>
                      {index > 0 && <Separator className="my-4" />}
                      <div className="flex items-start gap-4">
                        <div className="mt-1 flex-shrink-0">
                          <CheckCircle2 className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{item.title}</h3>
                            {item.required ? (
                              <Badge variant="default" className="text-xs">
                                Required
                              </Badge>
                            ) : (
                              <Badge variant="secondary" className="text-xs">
                                Optional
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Important Notes Section */}
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-lg">Important Notes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>
              • All documents must be original or certified copies. Photocopies
              will not be accepted.
            </p>
            <p>
              • Documents in languages other than English must be accompanied by
              certified translations.
            </p>
            <p>
              • Processing time for pension applications is typically 4-6 weeks
              after all required documents are received.
            </p>
            <p>
              • Incomplete applications will be returned, which may delay your
              pension start date.
            </p>
            <p>
              • For questions or assistance, please contact our pension support
              team.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
