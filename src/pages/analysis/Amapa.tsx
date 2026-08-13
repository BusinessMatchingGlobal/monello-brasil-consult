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

const TITLE = "The Island That Isn't";

const BACK = {
  it: "Torna alle analisi",
  en: "Back to analysis",
  pt: "Voltar às análises",
} as const;

const body: Block[] = [
  { p: "Brazil's only land border with the European Union runs through its most isolated state. Two dates this summer just changed what that means." },
  { p: "There is a state in Brazil that built a bridge to another country before it managed to build a road to its own." },
  { p: "Of Brazil's 27 federative units, Amapá is the only one with no land connection to the rest of the national territory. Not Acre, the usual punchline — Amapá. Wedged between the mouth of the Amazon and French Guiana, it is, as Brazilians put it, an island that isn't an island. Everything that enters or leaves does so by air, by barge across the Amazon from the port of Santana, or by ferry across the Jari River into Pará — a 400-metre crossing served by boats with limited schedules, weather interruptions, and queues that decide when medicine, food, and people move." },
  { p: "Two bridges tell the whole story." },
  { h: "The bridge that worked too well, too early" },
  { p: "The first stands at Oiapoque, at Brazil's northern extreme: a 378-metre cable-stayed binational bridge over the Oiapoque River, linking Brazil to French Guiana — which is to say, linking Brazil to France, which is to say, to the European Union. It was completed in August 2011 at a cost of roughly €30 million, split between the two countries." },
  { p: "Then it sat closed for six years." },
  { p: "No customs posts were ready. France required visas for Brazilians crossing by land — Schengen visas didn't apply, because French Guiana sits outside Schengen. The bridge finally opened to traffic in March 2017, and even then it led onto the BR-156, a highway whose northern stretch remained unpaved and whose construction began — this is not a typo — in 1932, making it the oldest unfinished public work in the state." },
  { p: "Brazil had connected itself to Europe before connecting Amapá to Brazil. And then the connection to Europe didn't work either." },
  { h: "The bridge that never worked at all" },
  { p: "The second bridge is at Laranjal do Jari, on the border with Pará. This one would actually end Amapá's isolation: 406 metres over the Jari River to the district of Monte Dourado. Construction began in 2001. Twenty-five years and roughly R$21 million later, the structure consists of pillars standing in the riverbed — three of them damaged after being struck by a vessel." },
  { p: "The project has cycled through municipal management, a federal court agreement in 2019, incorporation into the Novo PAC, and a place in the 'Rota de Integração 01' — a R$28.6 billion infrastructure package for Amapá covering the port of Santana, the Jari bridge, and 110 km of paving on the BR-156, with completion promised by the end of 2026. As of early 2026, reporting from the state showed no concrete progress on the bridge itself." },
  { p: "So far, this reads as a familiar genre: the Custo Brasil as monument, the unfinished pillar as national symbol. But that framing misses what happened this summer." },
  { h: "Two dates that reprice a state" },
  { p: "31 July 2026. France's visa requirement for Brazilians entering French Guiana ended, under an agreement signed at Itamaraty on 1 July by foreign ministers Mauro Vieira and Jean-Noël Barrot, as part of a broader border-security cooperation package. For the first time, the binational bridge does what a bridge is supposed to do: anyone can cross it. Amapá's governor was explicit about the stakes — French Guiana, with its high average income, is the immediate market; the European Union, via the EU–Mercosur agreement, is the real one. That border, he said, is a door." },
  { p: "Early September 2026. Petrobras expects to conclude drilling of the Morpho well — the first ever in the Foz do Amazonas basin, some 500 kilometres off the Amapá coast, in Brazil's Equatorial Margin. The company has budgeted US$3 billion for exploration in the region through 2029, and the geological case writes itself: the basin sits next door to Guyana and Suriname, where more than 11 billion barrels have already been found. If Morpho confirms commercial oil, Macapá and Oiapoque become oil-supply geography overnight — services, logistics, personnel — in a state that currently has almost none of that infrastructure." },
  { p: "An isolated state with 900,000 inhabitants is not a market. An isolated state sitting on a possible oil frontier and a newly open EU land border is an option — and the option gets priced in September." },
  { h: "What September actually decides" },
  { p: "A word of discipline before the enthusiasm: single frontier wells disappoint more often than they deliver. Wildcats in untested deep-water basins succeed perhaps a quarter to a third of the time, and the Equatorial Margin has already produced one cautionary tale on this exact analogy. In 2011, Total drilled the Zaedyus well in French Guiana's waters — the same 'next Guyana' logic — found encouraging hydrocarbons, generated a cycle of headlines, and then watched the follow-up wells fail until the play was abandoned. ExxonMobil itself drilled for decades in the region before Liza turned Guyana into Guyana." },
  { p: "The most likely outcome in September is neither triumph nor a dry hole but ambiguity: indications of hydrocarbons, volumes to be assessed, appraisal wells required. And here timing matters twice over. The result lands weeks before Brazil's October elections, which makes the announcement a political act as much as a geological one — the government has every incentive to read positively whatever comes out of the seabed, the opposition to read it the other way. Sophisticated observers will learn more from how the result is communicated than from the result itself." },
  { p: "For anyone assessing Amapá, though, the well is not the bet. Run the three scenarios. Commercial discovery: the state reprices immediately and the supply-chain land grab begins. Ambiguous result: US$3 billion of exploration budget and contingent wells keep the option alive through 2029. Dry hole: the EU land border remains exactly where it was, and geology has no vote on customs territory. Only one of the three scenarios kills the thesis of this article, and it isn't on the list." },
  { h: "The arbitrage, in three layers" },
  { p: "What does a border with the European Union actually offer? Three distinct things, and only one of them is new." },
  { p: "The price layer has existed for decades, informally. French Guiana runs on French salaries and French welfare while importing nearly everything from a metropole 7,000 km away; its cost of living is among the highest in France. Across the river: Brazilian prices. Guianese residents have long crossed to Oiapoque for groceries, fuel, dentistry, services. The visa waiver now makes the flow symmetrical — Brazilians can legally access a euro-denominated market with high purchasing power. There is also a black layer here (gold from illegal garimpos, fuel smuggling) that any honest analysis names and no serious operator touches." },
  { p: "The customs layer is the window that matters. French Guiana is EU customs territory. Today, a truck of Brazilian cement, food, or building materials crossing the bridge pays EU tariffs as if it had docked in Rotterdam — one reason the bridge stayed empty and Guiana keeps buying from Le Havre at absurd landed costs. EU–Mercosur ratification changes the arithmetic: the natural supplier of French Guiana becomes Brazil, 400 metres away, not France, three weeks away by sea. But tariffs are only half the wall. The other half is conformity — sanitary certification, EUDR traceability for timber and açaí, EU labelling. Everyone on the Brazilian side has the product. Almost no one has the compliance. Whoever builds the conforming supply chain before ratification takes the market at minute zero." },
  { p: "The procurement layer. As an EU outermost region, French Guiana receives European structural funds, on top of the spending gravity of the Kourou spaceport. Construction happens at French cost structures next to Brazilian labour and materials. Firms able to operate on both sides of the river hold a structural advantage that has nothing to do with luck." },
  { h: "Windows open until they close" },
  { p: "None of this is a moral story. The Jari pillars will stand in the river regardless of what anyone writes about them, and the ferry queues will persist until the day they don't. The analytical point is narrower: arbitrage windows like the customs layer exist precisely because they are temporary. They open between a treaty's ratification and the moment large players notice; they close when the market reprices or the rules change. The job is not to celebrate them or condemn them — it is to see them while they are open." },
  { p: "Amapá spent a century as Brazil's logistical joke. Between 31 July and early September 2026, it quietly became something else: the one place where Brazil touches Europe by land, next to the one basin that might extend Brazil's oil frontier, in the one state everyone had stopped watching." },
  { p: "The country that built a bridge to another nation before connecting to itself may be about to discover that the first bridge was the right one after all." },
  { p: "Business Matching Global — market intelligence and business orchestration on the EU–Brazil corridor." },
];

export default function Amapa() {
  const { lang, setLang } = useT();
  const article = getArticleBySlug("amapa");
  const desc =
    "Amapá is Brazil's only land border with the European Union. A visa waiver and a frontier oil well are about to reprice the country's most isolated state.";
  useCanonical("/amapa", {
    title: "The Island That Isn't: Amapá, Brazil's EU Land Border",
    description: desc,
    type: "article",
  });

  useEffect(() => {
    const previous = lang;
    if (lang !== "en") setLang("en");
    return () => {
      if (previous !== "en") setLang(previous);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <div className="container max-w-3xl py-16 md:py-24">
        <div className="flex items-center justify-between gap-4 mb-8">
          <Link
            to="/analysis"
            className="inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            {BACK[lang]}
          </Link>
          <LangSwitcher to="/amapa" />
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
