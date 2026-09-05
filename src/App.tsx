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
import HowWeWork from "./pages/HowWeWork";
import PartnerProgram from "./pages/PartnerProgram";
import OurServices from "./pages/OurServices";
import Ethics from "./pages/Ethics";
import Method from "./pages/Method";
import BusinessMatchingService from "./pages/servizi/BusinessMatching";
import BusinessMatchingServiceBR from "./pages/servicos/BusinessMatching";
import BusinessMatchingServiceEN from "./pages/services/BusinessMatching";
import CustoBrasil from "./pages/CustoBrasil";
import NewsEbook from "./pages/NewsEbook";
import SaceGuide from "./pages/SaceGuide";
import PharmaGuide from "./pages/PharmaGuide";
import EudrGuide from "./pages/EudrGuide";
import NewsletterConfirm from "./pages/NewsletterConfirm";
import Admin from "./pages/Admin";
import Fly, { FlyEN, FlyBR } from "./pages/Fly";
import BusinessTravel from "./pages/BusinessTravel";
import BusinessTravelEN from "./pages/BusinessTravelEN";
import BusinessTravelBR from "./pages/BusinessTravelBR";
import BusinessTravelLocalized from "./pages/BusinessTravelLocalized";
import Analysis from "./pages/Analysis";
import Pix from "./pages/analysis/Pix";
import Suja from "./pages/analysis/Suja";
import Embraer from "./pages/analysis/Embraer";
import EmbraerIT from "./pages/analysis/Embraer_IT";
import EmbraerBR from "./pages/analysis/Embraer_BR";
import Amaro from "./pages/analysis/Amaro";
import AmaroIT from "./pages/analysis/Amaro_IT";
import AmaroBR from "./pages/analysis/Amaro_BR";
import DoingBusinessGuide from "./pages/DoingBusinessGuide";
import AiJus from "./pages/analysis/AiJus";
import AiJusIT from "./pages/analysis/AiJus_IT";
import AiJusBR from "./pages/analysis/AiJus_BR";
import Bahia from "./pages/analysis/Bahia";
import BahiaIT from "./pages/analysis/Bahia_IT";
import BahiaBR from "./pages/analysis/Bahia_BR";
import { AiJusLocalized, AmaroLocalized, AsuncionLocalized, CeutaLocalized, EconomistLocalized, EmbraerLocalized, LimaLocalized, LorenzettiLocalized, RareLocalized, AmapaLocalized, BahiaLocalized } from "./pages/analysis/LocalizedArticle";
import Voli from "./pages/calliphora/Voli";
import Lorenzetti from "./pages/analysis/Lorenzetti";
import Ceuta from "./pages/analysis/Ceuta";
import CeutaBR from "./pages/analysis/Ceuta_BR";
import CeutaIT from "./pages/analysis/Ceuta_IT";
import LorenzettiIT from "./pages/analysis/Lorenzetti_IT";
import LorenzettiBR from "./pages/analysis/Lorenzetti_BR";
import Economist from "./pages/analysis/Economist";
import EconomistIT from "./pages/analysis/Economist_IT";
import EconomistBR from "./pages/analysis/Economist_BR";
import Lima from "./pages/analysis/Lima";
import Rare from "./pages/analysis/Rare";
import RareBR from "./pages/analysis/Rare_BR";
import RareIT from "./pages/analysis/Rare_IT";
import LimaIT from "./pages/analysis/Lima_IT";
import LimaBR from "./pages/analysis/Lima_BR";
import Amapa from "./pages/analysis/Amapa";
import AmapaBR from "./pages/analysis/Amapa_BR";
import AmapaIT from "./pages/analysis/Amapa_IT";
import Asuncion from "./pages/analysis/Asuncion";
import AsuncionIT from "./pages/analysis/Asuncion_IT";
import AsuncionBR from "./pages/analysis/Asuncion_BR";


import { LanguageProvider } from "./lib/i18n";
import { CookieConsent } from "./components/CookieConsent";
import { AskBmgWidget } from "./components/AskBmgWidget";

import { CalliphoraDomainRouting } from "./components/CalliphoraDomainRouting";
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
          <CalliphoraDomainRouting />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/sample-report" element={<SampleReport />} />
            <Route path="/unsubscribe" element={<Unsubscribe />} />
            <Route path="/About_us" element={<AboutUs />} />
            <Route path="/about_us" element={<AboutUs />} />
            <Route path="/How_we_work" element={<HowWeWork />} />
            <Route path="/how_we_work" element={<HowWeWork />} />
            <Route path="/Partner_Program" element={<PartnerProgram />} />
            <Route path="/partner_program" element={<PartnerProgram />} />
            <Route path="/ethics" element={<Ethics />} />
            <Route path="/Ethics" element={<Ethics />} />
            <Route path="/method" element={<Method />} />
            <Route path="/Method" element={<Method />} />
            <Route path="/Our_Services" element={<OurServices />} />
            <Route path="/our_services" element={<OurServices />} />
            <Route path="/servizi/business-matching" element={<BusinessMatchingService />} />
            <Route path="/servicos/business-matching" element={<BusinessMatchingServiceBR />} />
            <Route path="/services/business-matching" element={<BusinessMatchingServiceEN />} />
            <Route path="/custo-brasil" element={<CustoBrasil />} />
            <Route path="/news" element={<NewsEbook />} />
            <Route path="/sace" element={<SaceGuide />} />
            <Route path="/SACE" element={<SaceGuide />} />
            <Route path="/pharma" element={<PharmaGuide />} />
            <Route path="/Pharma" element={<PharmaGuide />} />
            <Route path="/eudr" element={<EudrGuide />} />
            <Route path="/EUDR" element={<EudrGuide />} />
            <Route path="/newsletter/confirm" element={<NewsletterConfirm />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/BT" element={<BusinessTravelLocalized />} />
            <Route path="/bt" element={<BusinessTravelLocalized />} />
            <Route path="/BT_it" element={<BusinessTravel force="it" />} />
            <Route path="/bt_it" element={<BusinessTravel force="it" />} />
            <Route path="/BT_en" element={<BusinessTravelEN force="en" />} />
            <Route path="/bt_en" element={<BusinessTravelEN force="en" />} />
            <Route path="/BT_br" element={<BusinessTravelBR force="pt" />} />
            <Route path="/bt_br" element={<BusinessTravelBR force="pt" />} />
            <Route path="/fly" element={<Fly />} />
            <Route path="/fly_en" element={<FlyEN />} />
            <Route path="/fly_br" element={<FlyBR />} />
            {/* Calliphora Travel (Spanish, South America) */}
            <Route path="/voli" element={<Voli />} />
            <Route path="/formfly" element={<Fly forceLang="es" brand="calliphora" />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/pix" element={<Pix />} />
            <Route path="/suja" element={<Suja />} />
            <Route path="/lorenzetti" element={<LorenzettiLocalized />} />
            <Route path="/ceuta" element={<CeutaLocalized />} />
            <Route path="/Ceuta" element={<CeutaLocalized />} />
            <Route path="/ceuta_en" element={<Ceuta />} />
            <Route path="/ceuta_br" element={<CeutaBR />} />
            <Route path="/Ceuta_BR" element={<CeutaBR />} />
            <Route path="/ceuta_it" element={<CeutaIT />} />
            <Route path="/Ceuta_IT" element={<CeutaIT />} />
            <Route path="/economist" element={<EconomistLocalized />} />
            <Route path="/Economist" element={<EconomistLocalized />} />
            <Route path="/economist_it" element={<EconomistIT />} />
            <Route path="/Economist_IT" element={<EconomistIT />} />
            <Route path="/economist_br" element={<EconomistBR />} />
            <Route path="/Economist_BR" element={<EconomistBR />} />
            <Route path="/Lorenzetti" element={<LorenzettiLocalized />} />
            <Route path="/lorenzetti_en" element={<Lorenzetti />} />
            <Route path="/lorenzetti_it" element={<LorenzettiIT />} />
            <Route path="/Lorenzetti_IT" element={<LorenzettiIT />} />
            <Route path="/lorenzetti_br" element={<LorenzettiBR />} />
            <Route path="/Lorenzetti_BR" element={<LorenzettiBR />} />
            <Route path="/Embraer" element={<EmbraerLocalized />} />
            <Route path="/embraer" element={<EmbraerLocalized />} />
            <Route path="/Embraer_EN" element={<Embraer />} />
            <Route path="/embraer_en" element={<Embraer />} />
            <Route path="/Embraer_IT" element={<EmbraerIT />} />
            <Route path="/embraer_it" element={<EmbraerIT />} />
            <Route path="/Embraer_BR" element={<EmbraerBR />} />
            <Route path="/embraer_br" element={<EmbraerBR />} />
            <Route path="/amaro" element={<AmaroLocalized />} />
            <Route path="/Amaro" element={<AmaroLocalized />} />
            <Route path="/amaro_en" element={<Amaro />} />
            <Route path="/Amaro_IT" element={<AmaroIT />} />
            <Route path="/amaro_it" element={<AmaroIT />} />
            <Route path="/Amaro_BR" element={<AmaroBR />} />
            <Route path="/amaro_br" element={<AmaroBR />} />
            <Route path="/aiJus" element={<AiJusLocalized />} />
            <Route path="/aijus" element={<AiJusLocalized />} />
            <Route path="/aijus_en" element={<AiJus />} />
            <Route path="/AiJus_IT" element={<AiJusIT />} />
            <Route path="/aijus_it" element={<AiJusIT />} />
            <Route path="/AiJus_BR" element={<AiJusBR />} />
            <Route path="/aijus_br" element={<AiJusBR />} />
            <Route path="/lima" element={<LimaLocalized />} />
            <Route path="/Lima" element={<LimaLocalized />} />
            <Route path="/lima_en" element={<Lima />} />
            <Route path="/lima_it" element={<LimaIT />} />
            <Route path="/Lima_IT" element={<LimaIT />} />
            <Route path="/lima_br" element={<LimaBR />} />
            <Route path="/Lima_BR" element={<LimaBR />} />
            <Route path="/rare" element={<RareLocalized />} />
            <Route path="/Rare" element={<RareLocalized />} />
            <Route path="/rare_en" element={<Rare />} />
            <Route path="/rare_br" element={<RareBR />} />
            <Route path="/Rare_BR" element={<RareBR />} />
            <Route path="/rare_it" element={<RareIT />} />
            <Route path="/Rare_IT" element={<RareIT />} />
            <Route path="/amapa" element={<AmapaLocalized />} />
            <Route path="/Amapa" element={<AmapaLocalized />} />
            <Route path="/amapa_en" element={<Amapa />} />
            <Route path="/amapa_br" element={<AmapaBR />} />
            <Route path="/Amapa_BR" element={<AmapaBR />} />
            <Route path="/amapa_it" element={<AmapaIT />} />
            <Route path="/Amapa_IT" element={<AmapaIT />} />
            <Route path="/asuncion" element={<AsuncionLocalized />} />
            <Route path="/Asuncion" element={<AsuncionLocalized />} />
            <Route path="/asuncion_it" element={<AsuncionIT />} />
            <Route path="/Asuncion_IT" element={<AsuncionIT />} />
            <Route path="/asuncion_br" element={<AsuncionBR />} />
            <Route path="/Asuncion_BR" element={<AsuncionBR />} />
            <Route path="/bahia" element={<BahiaLocalized />} />
            <Route path="/Bahia" element={<BahiaLocalized />} />
            <Route path="/bahia_en" element={<Bahia />} />
            <Route path="/Bahia_EN" element={<Bahia />} />
            <Route path="/bahia_it" element={<BahiaIT />} />
            <Route path="/Bahia_IT" element={<BahiaIT />} />
            <Route path="/bahia_br" element={<BahiaBR />} />
            <Route path="/Bahia_BR" element={<BahiaBR />} />


            <Route path="/guides/doing-business-in-brazil" element={<DoingBusinessGuide />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <AskBmgWidget />
          <CookieConsent />

        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;
