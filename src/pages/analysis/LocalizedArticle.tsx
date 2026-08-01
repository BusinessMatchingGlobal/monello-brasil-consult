import { useT } from "@/lib/i18n";
import AiJusEN from "./AiJus";
import AiJusIT from "./AiJus_IT";
import AiJusBR from "./AiJus_BR";
import AmaroEN from "./Amaro";
import AmaroIT from "./Amaro_IT";
import AmaroBR from "./Amaro_BR";
import EmbraerEN from "./Embraer";
import EmbraerIT from "./Embraer_IT";
import EmbraerBR from "./Embraer_BR";
import LorenzettiEN from "./Lorenzetti";
import LorenzettiIT from "./Lorenzetti_IT";

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
  return <LorenzettiEN />;
}
