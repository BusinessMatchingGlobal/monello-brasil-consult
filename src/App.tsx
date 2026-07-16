import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Privacy from "./pages/Privacy";
import SampleReport from "./pages/SampleReport";
import Unsubscribe from "./pages/Unsubscribe";
import AboutUs from "./pages/AboutUs";
import CustoBrasil from "./pages/CustoBrasil";
import { LanguageProvider } from "./lib/i18n";
import { CookieConsent } from "./components/CookieConsent";
import { useEffect } from "react";
import { initConsent } from "./lib/consent";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => { initConsent(); }, []);
  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <LanguageProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/sample-report" element={<SampleReport />} />
            <Route path="/unsubscribe" element={<Unsubscribe />} />
            <Route path="/About_us" element={<AboutUs />} />
            <Route path="/about_us" element={<AboutUs />} />
            <Route path="/custo-brasil" element={<CustoBrasil />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <CookieConsent />
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;
