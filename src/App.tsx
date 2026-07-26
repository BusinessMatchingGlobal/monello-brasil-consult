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
import NewsEbook from "./pages/NewsEbook";
import NewsletterConfirm from "./pages/NewsletterConfirm";
import Admin from "./pages/Admin";
import Fly from "./pages/Fly";
import Analysis from "./pages/Analysis";
import Pix from "./pages/analysis/Pix";
import Suja from "./pages/analysis/Suja";
import Embraer from "./pages/analysis/Embraer";
import EmbraerIT from "./pages/analysis/Embraer_IT";
import EmbraerBR from "./pages/analysis/Embraer_BR";
import Amaro from "./pages/analysis/Amaro";
import AmaroIT from "./pages/analysis/Amaro_IT";
import DoingBusinessGuide from "./pages/DoingBusinessGuide";

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
            <Route path="/news" element={<NewsEbook />} />
            <Route path="/newsletter/confirm" element={<NewsletterConfirm />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/fly" element={<Fly />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/pix" element={<Pix />} />
            <Route path="/suja" element={<Suja />} />
            <Route path="/Embraer" element={<Embraer />} />
            <Route path="/embraer" element={<Embraer />} />
            <Route path="/Embraer_IT" element={<EmbraerIT />} />
            <Route path="/embraer_it" element={<EmbraerIT />} />
            <Route path="/Embraer_BR" element={<EmbraerBR />} />
            <Route path="/embraer_br" element={<EmbraerBR />} />
            <Route path="/amaro" element={<Amaro />} />

            <Route path="/guides/doing-business-in-brazil" element={<DoingBusinessGuide />} />
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
