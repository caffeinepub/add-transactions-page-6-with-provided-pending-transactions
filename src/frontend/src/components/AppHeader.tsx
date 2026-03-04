import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function AppHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/assets/generated/new-found-land-logo.dim_512x512.png"
              alt="New Found Land Logo"
              className="h-10 w-auto"
            />
            <h1 className="text-xl font-bold tracking-tight">New Found Land</h1>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/page1"
              className="text-sm font-medium transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
            >
              Page 1
            </Link>
            <Link
              to="/page2"
              className="text-sm font-medium transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
            >
              Page 2
            </Link>
            <Link
              to="/page3"
              className="text-sm font-medium transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
            >
              Page 3
            </Link>
            <Link
              to="/page4"
              className="text-sm font-medium transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
            >
              Page 4
            </Link>
            <Link
              to="/page5"
              className="text-sm font-medium transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
            >
              Page 5
            </Link>
            <Link
              to="/page6"
              className="text-sm font-medium transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
            >
              Page 6
            </Link>
            <Link
              to="/page7"
              className="text-sm font-medium transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
            >
              Page 7
            </Link>
            <Link
              to="/pension-requirements"
              className="text-sm font-medium transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
            >
              Requirements
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t">
          <nav className="container flex flex-col gap-4 py-4">
            <Link
              to="/page1"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Page 1
            </Link>
            <Link
              to="/page2"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Page 2
            </Link>
            <Link
              to="/page3"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Page 3
            </Link>
            <Link
              to="/page4"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Page 4
            </Link>
            <Link
              to="/page5"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Page 5
            </Link>
            <Link
              to="/page6"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Page 6
            </Link>
            <Link
              to="/page7"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Page 7
            </Link>
            <Link
              to="/pension-requirements"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Requirements
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
