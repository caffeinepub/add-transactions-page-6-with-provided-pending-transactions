import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { ThemeProvider } from "next-themes";
import AppFooter from "./components/AppFooter";
import AppHeader from "./components/AppHeader";
import PensionRequirementsPage from "./pages/PensionRequirementsPage";
import TransactionHistoryPage1 from "./pages/transactions/TransactionHistoryPage1";
import TransactionHistoryPage2 from "./pages/transactions/TransactionHistoryPage2";
import TransactionHistoryPage3 from "./pages/transactions/TransactionHistoryPage3";
import TransactionHistoryPage4 from "./pages/transactions/TransactionHistoryPage4";
import TransactionHistoryPage5 from "./pages/transactions/TransactionHistoryPage5";
import TransactionHistoryPage6 from "./pages/transactions/TransactionHistoryPage6";
import TransactionHistoryPage7 from "./pages/transactions/TransactionHistoryPage7";

function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <AppFooter />
      <Toaster />
    </div>
  );
}

const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: TransactionHistoryPage1,
});

const page1Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/page1",
  component: TransactionHistoryPage1,
});

const page2Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/page2",
  component: TransactionHistoryPage2,
});

const page3Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/page3",
  component: TransactionHistoryPage3,
});

const page4Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/page4",
  component: TransactionHistoryPage4,
});

const page5Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/page5",
  component: TransactionHistoryPage5,
});

const page6Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/page6",
  component: TransactionHistoryPage6,
});

const page7Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/page7",
  component: TransactionHistoryPage7,
});

const pensionRequirementsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pension-requirements",
  component: PensionRequirementsPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  page1Route,
  page2Route,
  page3Route,
  page4Route,
  page5Route,
  page6Route,
  page7Route,
  pensionRequirementsRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
