
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/app/dashboard";
import CampaignResults from "./pages/app/campaign-results";
import FinancialReports from "./pages/app/financial-reports";
import NewCampaign from "./pages/app/new-campaign";
import ContentStrategy from "./pages/app/content-strategy";
import Checkout from "./pages/checkout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Landing Pages */}
          <Route path="/" element={<Index />} />
          <Route path="/checkout" element={<Checkout />} />
          
          {/* App Dashboard */}
          <Route path="/app" element={<Dashboard />} />
          <Route path="/app/campaign-results" element={<CampaignResults />} />
          <Route path="/app/financial-reports" element={<FinancialReports />} />
          <Route path="/app/new-campaign" element={<NewCampaign />} />
          <Route path="/app/content-strategy" element={<ContentStrategy />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
