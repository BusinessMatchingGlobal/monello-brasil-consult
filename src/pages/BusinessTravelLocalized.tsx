import { useT } from "@/lib/i18n";
import BusinessTravelIT from "./BusinessTravel";
import BusinessTravelEN from "./BusinessTravelEN";
import BusinessTravelBR from "./BusinessTravelBR";

// Single URL (/BT) that renders the variant matching the current site language.
export default function BusinessTravelLocalized() {
  const { lang } = useT();
  if (lang === "it") return <BusinessTravelIT />;
  if (lang === "pt") return <BusinessTravelBR />;
  return <BusinessTravelEN />;
}
