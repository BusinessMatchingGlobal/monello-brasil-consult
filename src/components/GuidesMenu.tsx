import { Link, useLocation } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { useT, type Lang } from "@/lib/i18n";

const labels: Record<Lang, { title: string; items: { to: string; name: string; note: string }[] }> = {
  it: {
    title: "Guide disponibili",
    items: [
      { to: "/news", name: "Exporting to Brazil — EU Manual", note: "Accordo UE-Mercosur · in inglese" },
      { to: "/sace", name: "Vendere macchinari in Brasile", note: "SACE, SIMEST ed ex-tarifário · in italiano" },
      { to: "/pharma", name: "Brazil's Health Market", note: "Farmaceutico, dispositivi e supply chain · in inglese" },
    ],
  },
  en: {
    title: "Available guides",
    items: [
      { to: "/news", name: "Exporting to Brazil — EU Manual", note: "EU-Mercosur agreement · in English" },
      { to: "/sace", name: "Selling machinery in Brazil", note: "SACE, SIMEST and ex-tarifário · in Italian" },
      { to: "/pharma", name: "Brazil's Health Market", note: "Pharma, devices and supply chain · in English" },
    ],
  },
  pt: {
    title: "Guias disponíveis",
    items: [
      { to: "/news", name: "Exporting to Brazil — EU Manual", note: "Acordo UE-Mercosul · em inglês" },
      { to: "/sace", name: "Vender máquinas no Brasil", note: "SACE, SIMEST e ex-tarifário · em italiano" },
      { to: "/pharma", name: "Brazil's Health Market", note: "Farmacêutico, dispositivos e supply chain · em inglês" },
    ],
  },
};

export function GuidesMenu() {
  const { lang } = useT();
  const { pathname } = useLocation();
  const c = labels[lang];
  return (
    <nav aria-label={c.title} className="mb-10">
      <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-3">{c.title}</p>
      <div className="grid sm:grid-cols-2 gap-3">
        {c.items.map((item) => {
          const active = pathname.toLowerCase() === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex gap-3 rounded-lg border p-4 transition-colors ${
                active ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/50"
              }`}
            >
              <BookOpen className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span>
                <span className="block text-sm font-semibold">{item.name}</span>
                <span className="block text-xs text-muted-foreground mt-0.5">{item.note}</span>
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}