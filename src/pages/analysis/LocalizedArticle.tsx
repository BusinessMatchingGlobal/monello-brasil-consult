import { useT } from "@/lib/i18n";
import AiJusEN from "./AiJus";
import AiJusIT from "./AiJus_IT";
import AiJusBR from "./AiJus_BR";
import AmaroEN from "./Amaro";
import AmaroIT from "./Amaro_IT";
import AmaroBR from "./Amaro_BR";
import Asuncion from "./Asuncion";
import AsuncionIT from "./Asuncion_IT";
import AsuncionBR from "./Asuncion_BR";
import EmbraerEN from "./Embraer";
import EmbraerIT from "./Embraer_IT";
import EmbraerBR from "./Embraer_BR";
import LimaEN from "./Lima";
import LimaIT from "./Lima_IT";
import LimaBR from "./Lima_BR";
import LorenzettiEN from "./Lorenzetti";
import LorenzettiIT from "./Lorenzetti_IT";
import LorenzettiBR from "./Lorenzetti_BR";
import CeutaEN from "./Ceuta";
import CeutaBR from "./Ceuta_BR";
import CeutaIT from "./Ceuta_IT";
import EconomistEN from "./Economist";
import EconomistIT from "./Economist_IT";
import EconomistBR from "./Economist_BR";
import RareEN from "./Rare";
import RareIT from "./Rare_IT";
import RareBR from "./Rare_BR";
import AmapaEN from "./Amapa";
import AmapaIT from "./Amapa_IT";
import AmapaBR from "./Amapa_BR";
import BahiaEN from "./Bahia";
import BahiaIT from "./Bahia_IT";
import BahiaBR from "./Bahia_BR";

// Renders the language variant matching the current site language
// (auto-detected from the browser on first visit), on a single shared URL.
export function AiJusLocalized() {
  const { lang } = useT();
  if (lang === "it") return <AiJusIT />;
  if (lang === "pt") return <AiJusBR />;
  return <AiJusEN />;
}

export function AmaroLocalized() {
  const { lang } = useT();
  if (lang === "it") return <AmaroIT />;
  if (lang === "pt") return <AmaroBR />;
  return <AmaroEN />;
}

export function EmbraerLocalized() {
  const { lang } = useT();
  if (lang === "it") return <EmbraerIT />;
  if (lang === "pt") return <EmbraerBR />;
  return <EmbraerEN />;
}

export function LorenzettiLocalized() {
  const { lang } = useT();
  if (lang === "it") return <LorenzettiIT />;
  if (lang === "pt") return <LorenzettiBR />;
  return <LorenzettiEN />;
}

export function LimaLocalized() {
  const { lang } = useT();
  if (lang === "it") return <LimaIT />;
  if (lang === "pt") return <LimaBR />;
  return <LimaEN />;
}

export function CeutaLocalized() {
  const { lang } = useT();
  if (lang === "it") return <CeutaIT />;
  if (lang === "pt") return <CeutaBR />;
  return <CeutaEN />;
}

export function EconomistLocalized() {
  const { lang } = useT();
  if (lang === "it") return <EconomistIT />;
  if (lang === "pt") return <EconomistBR />;
  return <EconomistEN />;
}

export function RareLocalized() {
  const { lang } = useT();
  if (lang === "it") return <RareIT />;
  if (lang === "pt") return <RareBR />;
  return <RareEN />;
}

export function AsuncionLocalized() {
  const { lang } = useT();
  if (lang === "it") return <AsuncionIT />;
  if (lang === "pt") return <AsuncionBR />;
  return <Asuncion />;
}

export function AmapaLocalized() {
  const { lang } = useT();
  if (lang === "it") return <AmapaIT />;
  if (lang === "pt") return <AmapaBR />;
  return <AmapaEN />;
}

export function BahiaLocalized() {
  const { lang } = useT();
  if (lang === "it") return <BahiaIT />;
  if (lang === "pt") return <BahiaBR />;
  return <BahiaEN />;
}
