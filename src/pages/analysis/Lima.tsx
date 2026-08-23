import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { useT } from "@/lib/i18n";
import { getArticleBySlug } from "@/lib/analysis";
import { AnalysisFooter } from "@/components/AnalysisFooter";
import { useCanonical } from "@/lib/useCanonical";
import { ShareBlock } from "@/components/ShareBlock";
import { LangSwitcher } from "@/components/LangSwitcher";

type Block = { h: string } | { p: string };

const TITLE = "The Route That Already Exists";

const BACK = {
  it: "Torna alle analisi",
  en: "Back to analysis",
  pt: "Voltar às análises",
} as const;

const body: Block[] = [
  { p: "Every year, 150,000 people fly between Milan and Lima. No airline flies between Milan and Lima. Emirates noticed." },
  { p: "According to Corriere della Sera's aviation correspondent Leonard Berberi (August 12), Emirates is close to obtaining approval to operate a direct Milan Malpensa–Lima service under an annex to the Italy–UAE bilateral agreements. The final regulatory signature would still be missing, Corriere's sources say, but the extension of the so-called \"fifth freedom\" regime could be authorized as early as the coming winter season — the industry window that runs from late October to late March." },
  { p: "Two caveats before the analysis, because at BMG we attribute and we use the conditional until the ink is dry. First: authorization is not operation. Emirates itself, contacted by Corriere, did not deny having requested the rights but stated it has \"no immediate plans\" for Lima and continuously evaluates routes against demand, market conditions and aircraft availability. Second: Emirates today does not serve Lima at all — not even from its own hub in Dubai. What is being secured is an option, not a schedule." },
  { p: "There is even precedent for the option going unused. As the specialist outlet Italiavola recalls, Emirates had in the past already obtained four weekly frequencies for another fifth-freedom route from Malpensa — long rumored to be Mexico City — and never opened it. The same outlet indicates October 25, the start of the winter schedule, as the likely effective date of the new authorization. Emirates currently serves Malpensa three times daily from Dubai, the third frequency restored on August 1 with the A350-900, plus the daily fifth-freedom continuation to New York." },
  { p: "That is precisely what makes the story worth reading." },
  { h: "The rent being contested" },
  { p: "Consider the number buried in the middle of the Corriere piece: roughly 150,000 passengers a year fly between Milan and the Peruvian capital, every one of them connecting somewhere else. Lima is the largest destination not served nonstop from Milan — a market with three distinct demand layers (the Peruvian community in Italy, tourism, business) plus cargo in both directions." },
  { p: "Today that traffic is harvested by the European majors' hubs. Passengers from Lombardy are \"fished\" — Corriere's own verb — and carried to Rome, Frankfurt, Paris, Madrid or London, then flown across the Atlantic. This is not a route; it is a rent. The demand exists independently of any airline's product decision. The hubs simply sit between the demand and the geography and collect the toll." },
  { p: "And the toll booths are fewer than the map suggests. According to Brazilian aviation outlet Aeroin, Lima's only nonstop links to Europe today are Amsterdam, Barcelona, Paris and Madrid — the Air France-KLM and IAG systems. The rent, in other words, is collected by two airline groups; everyone else, Italy included, feeds them." },
  { p: "Fifth freedom is the legal instrument that lets a third-country carrier contest that rent. Emirates already runs the model in the opposite direction: flight EK205 Dubai–Milan–New York sells seats on the Milan–New York leg alone, despite Emirates being neither Italian nor American. That route has been tested in every way that matters: it survived a legal challenge brought by the Italian carriers' association Assaereo, with an Italian administrative court ruling in Emirates' favor, and its success prompted — by Emirates president Tim Clark's own account at the time — some ten European cities to ask the airline for similar transatlantic service. Malpensa–Lima would be the same architecture, litigation-proofed, pointed south." },
  { p: "One honest caveat on that architecture. A fifth-freedom leg is untethered from Dubai commercially, not operationally: the aircraft still originates at the hub. When the war with Iran closed Gulf airspace in March, Emirates' entire fifth-freedom network — Malpensa–New York included, along with Athens–Newark, Barcelona–Mexico City and Miami–Bogotá — stopped for days. A Milan–Lima nonstop flown by Emirates would carry a geopolitical exposure that a Madrid or Paris connection does not. Architecture contests rent; it does not abolish risk." },
  { h: "The vacancy" },
  { p: "There is a deeper layer to this story, and it is Italian, not Emirati. The market Emirates is moving into was not taken from anyone. It was vacated — deliberately." },
  { p: "Malpensa was built to be exactly what this dossier describes: the \"Malpensa 2000\" project opened in 1998 as an intercontinental hub for Northern Italy. Ten years later, Alitalia de-hubbed it — a decision announced in the 2007 plan, executed in 2008, and cemented by the CAI rescue, which concentrated the network on Rome Fiumicino. The logic of keeping one hub was economic; the choice of which hub to keep was political. Because the demand never moved. Malpensa's catchment — Lombardy and the surrounding regions — is the wealthiest in the country, and the imbalance shows in the schedules: as Corriere itself notes, there are today more nonstop flights to Asia from Malpensa than from Fiumicino. Italy's flag carrier retreated from the richest air travel market in Italy and left it structurally unserved for long-haul." },
  { p: "What followed was mechanical. Lufthansa tried to fill the gap itself with Lufthansa Italia (2009–2011) and gave up. Low-cost carriers took the short haul. Emirates opened the fifth-freedom New York service in 2013. And now Lima. Each of these operators is not seizing a rent; it is occupying a vacancy that has been advertised since 2008." },
  { p: "Seen this way, ITA's grievance inverts. The carrier's predecessor abandoned Malpensa to protect the Rome hub — and its successor now objects because someone else serves, from Malpensa, markets that Rome never served at all. The 150,000 passengers routed annually through Madrid and Paris are not a threat created by Emirates. They are the still-running annual invoice for a decision taken eighteen years ago." },
  { h: "The other half of the continent" },
  { p: "Readers of this page know our running thesis: Brazil concentrates roughly half of South America's GDP, and the other half is not a footnote — it is a differently structured market. It is telling that the first new Europe–South America node under discussion from Milan is not Brazilian. From Malpensa, the only nonstop to the continent today is LATAM's São Paulo service. Emirates' shortlist for further fifth-freedom routes, per Corriere's sources, includes São Paulo — but also Santiago, Mexico City and Los Angeles." },
  { p: "Analysts quoted in the piece note that Latin America is currently the market showing the best economic yields. When a carrier with Emirates' network discipline starts collecting fifth-freedom options across the Atlantic, it is not sentiment. It is a measured bet that the Europe–Latin America corridor is under-served relative to what it earns." },
  { h: "Who gets complicated" },
  { p: "ITA Airways — 41% Lufthansa today, headed to 90% in early 2027 — has been building its own Latin American expansion from Rome Fiumicino, with Santiago among the planned additions. A nonstop Malpensa–Lima operated by a Gulf carrier would drain exactly the northern Italian feed that makes marginal long-haul routes from Rome pencil out. The SEA chief executive, Armando Brunini, had already told Corriere that Malpensa's focus would now be South America. Milan's airport operator and Milan's flag-adjacent carrier are, on this dossier, on opposite sides." },
  { p: "There is a paradox worth underlining here. Per Aeroin, no Lufthansa Group carrier serves Lima at all — not from Frankfurt, not from Munich, not from Zurich. The group that will soon own 90% of Italy's flag carrier has no product in the market it would be defending. The objection to Emirates on Milan–Lima is not \"we serve this market better\"; it is \"we would prefer this market to keep connecting through someone's hub\" — and not even, today, through Lufthansa's own." },
  { h: "What this means for corridor stakeholders" },
  { p: "For the companies we work with, three practical readings." },
  { p: "Connectivity is regulatory before it is commercial. The binding constraint on Milan–Lima was never demand — 150,000 annual passengers prove that. It was a signature on a bilateral annex. Windows like this open by administrative act and can close the same way; the operators who benefit are the ones watching the paperwork, not the ones waiting for the press release." },
  { p: "Bellies are infrastructure. The authorization under discussion covers passengers and cargo. A widebody nonstop between Lombardy and Peru is export capacity for perishables, machinery parts and pharma in both directions — capacity that today routes through third hubs with the time and handling costs that implies." },
  { p: "Watch the shortlist, not just the headline. If Santiago, Mexico City and São Paulo from Malpensa are genuinely under study, the map of Europe–Latin America connectivity is being redrawn by a carrier from neither continent. For anyone planning market entry on either side of the Atlantic, the assumption that \"you connect through a European hub\" has a shelf life." },
  { p: "The route already exists. The question the regulators are about to answer is merely who gets paid for it." },
  { p: "Sources: Corriere della Sera (Leonard Berberi, August 12, 2026), with route data attributed by Corriere to Cirium; Italiavola (August 12, 2026); Aeroin (August 12, 2026); Gulf News archive on the Assaereo case and Tim Clark's remarks." },
];

export default function Lima() {
  const { lang } = useT();
  const article = getArticleBySlug("lima");
  const desc =
    "Every year 150,000 people fly between Milan and Lima, yet no airline flies the route. Why Emirates' fifth-freedom option is a contest for a rent Italy vacated in 2008.";
  useCanonical("/lima", {
    title: `${TITLE} | Business Matching Global`,
    description: desc,
    type: "article",
  });


  return (
    <main className="min-h-screen bg-background">
      <div className="container max-w-3xl py-16 md:py-24">
        <div className="flex items-center justify-between gap-4 mb-8">
          <Link
            to="/analysis"
            className="inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            {BACK["en"]}
          </Link>
          <LangSwitcher to="/lima" />
        </div>
        <article className="prose-invert">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4">
            {TITLE}
          </h1>
          <p className="text-xs text-foreground/70 mb-2">#CustoBrasil — Business Matching Global</p>
          <p className="text-xs text-foreground/70 mb-10 tabular-nums">{article?.date}</p>
          <div className="space-y-5 text-foreground/85 text-justify leading-relaxed">
            {body.map((block, i) =>
              "h" in block ? (
                <h2 key={i} className="text-xl md:text-2xl font-semibold text-foreground text-left mt-8 mb-2">
                  {block.h}
                </h2>
              ) : (
                <p key={i}>{block.p}</p>
              )
            )}
          </div>
          <ShareBlock title={TITLE} />
        </article>
        <AnalysisFooter />
      </div>
    </main>
  );
}
