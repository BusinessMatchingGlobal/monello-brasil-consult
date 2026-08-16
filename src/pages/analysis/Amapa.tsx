import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { useT } from "@/lib/i18n";
import { getArticleBySlug } from "@/lib/analysis";
import { AnalysisFooter } from "@/components/AnalysisFooter";
import { useCanonical } from "@/lib/useCanonical";
import { ShareBlock } from "@/components/ShareBlock";
import { LangSwitcher } from "@/components/LangSwitcher";
import { NewsletterSignup } from "@/components/NewsletterSignup";

type Block = { h: string } | { p: string } | { tag: string };

const TITLE = "The Island That Isn't";

const BACK = {
  it: "Torna alle analisi",
  en: "Back to analysis",
  pt: "Voltar às análises",
} as const;

const body: Block[] = [
  { p: "Brazil's only land border with the European Union runs through its most isolated state. Two dates this summer just changed what that means." },
  { tag: "#CustoBrasil" },
  { p: "There is a state in Brazil that built a bridge to another country before it managed to build a road to its own." },
  { p: "Of Brazil's 27 federative units, Amapá is the only one with no land connection to the rest of the national territory. Not Acre, as any Brazilian would answer by instinct: in the country's pop culture, Acre is the joke state par excellence, so remote that a meme running for fifteen years insists it doesn't exist at all (\"o Acre não existe\"). No: Amapá. Wedged between the mouth of the Amazon and French Guiana, it is what the Brazilian press calls an estado-ilha — a state-island: an island that isn't an island. Everything that enters or leaves does so by air, by barge across the Amazon from the port of Santana, or by ferry across the Jari River into Pará — a 400-metre crossing served by boats with limited schedules, weather interruptions, and queues that decide when medicine, food, and people move." },
  { p: "Two bridges tell the whole story." },
  { h: "The bridge that worked too well, too early" },
  { p: "The first stands at Oiapoque, at Brazil's northern extreme: a 378-metre cable-stayed binational bridge over the Oiapoque River, linking Brazil to French Guiana — which is to say, linking Brazil to France, which is to say, to the European Union. It was completed in August 2011 at a cost of roughly €30 million, split between the two countries." },
  { p: "Then it sat closed for six years." },
  { p: "No customs posts were ready. France required visas for Brazilians crossing by land — Schengen visas didn't apply, because French Guiana sits outside Schengen. The bridge finally opened to traffic in March 2017, and even then it led onto the BR-156, a highway whose northern stretch remained unpaved and whose construction began — this is not a typo — in 1932, making it the oldest unfinished public work in the state." },
  { p: "Brazil had connected itself to Europe before connecting Amapá to Brazil. And then the connection to Europe didn't work either." },
  { h: "The bridge that never worked at all" },
  { p: "The second bridge should stand at Laranjal do Jari, on the border with Pará — but it was never completed. This is the one that would actually end Amapá's isolation: 406 metres over the Jari River to the district of Monte Dourado. Construction began in 2001. Twenty-five years and roughly R$21 million later, the structure consists of pillars standing in the riverbed — three of them damaged after being struck by a vessel." },
  { p: "The project has cycled through municipal management, a federal court agreement in 2019, incorporation into the Novo PAC — the relaunched edition of the Programa de Aceleração do Crescimento, the federal public-works mega-programme Lula created in 2007 and revived in 2023 — and a place in the \"Rota de Integração 01\" — a R$28.6 billion infrastructure package for Amapá covering the port of Santana, the Jari bridge, and 110 km of paving on the BR-156, with completion promised by the end of 2026. As of early 2026, reporting from the state showed no concrete progress on the bridge itself." },
  { p: "So far, this reads as a familiar genre: the Custo Brasil as monument, the unfinished pillar as national symbol. But that framing misses what happened this summer." },
  { h: "Two dates that reprice a state" },
  { p: "31 July 2026. France's visa requirement for Brazilians entering French Guiana ended, under an agreement signed at Itamaraty on 1 July by foreign ministers Mauro Vieira and Jean-Noël Barrot, as part of a broader border-security cooperation package. For the first time, the binational bridge does what a bridge is supposed to do: anyone can cross it. Amapá's governor was explicit about the stakes — French Guiana, with its high average income, is the immediate market; the European Union, via the EU–Mercosur agreement, is the real one. That border, he said, is a door." },
  { p: "14 August 2026. Petrobras announced the presence of hydrocarbons in the Morpho well — the first ever drilled in the Foz do Amazonas basin — in ultradeep waters some 175 km off the Amapá coast, under 2,886 metres of water. The find, identified through electric logs and indicators in the rock, sits in block FZA-M-59, where Petrobras holds 100% under a concession acquired in 2013 at the 11th bid round of the ANP, the federal agency that regulates Brazil's oil sector and auctions its exploration blocks — thirteen years from auction to first announcement, a Custo Brasil metric in itself. In the first hours the company would not even say whether it had found oil or natural gas; by that evening, Estadão was already carrying the confirmation: oil. Drilling continues in the evaluation phase all the same. Savour one detail: Morpho is the same well whose \"permanent abandonment\" in July was widely read as a quiet failure. Abandonment, Petrobras insisted at the time, is a standard technical procedure with no bearing on results — and the results have now spoken. Three more wells, PAD-Morpho, Manga and Crotalus, are queued for licensing. The geological case was always next door — and you don't need to be a geologist to grasp it. More than a hundred million years ago, South America and Africa were a single landmass that tore in two like a sheet of paper, opening the Atlantic between them. The \"margin\" is the edge of that tear: the strip of continent that now sits underwater off the coast. Along that edge, the newborn ocean spent millions of years burying enormous amounts of organic matter which, compressed and slowly cooked, became oil. The point is that the edge is one and continuous: it runs from the Guianas to the mouth of the Amazon without a break, just as the rim of a tear doesn't change nature from one centimetre to the next. Guyana, Suriname and the Amapá coast are stretches of the same rim — same rocks, same history. More than 11 billion barrels have already been found on the far side of the maritime border; geology does not read borders, which is why Petrobras bets there must be something on this side too." },
  { p: "An isolated state with 900,000 inhabitants is not a market. An isolated state sitting on a hydrocarbon find and a newly open EU land border is an option — and the pricing of that option has already begun." },
  { h: "What 14 August actually decided — and what it didn't" },
  { p: "A word of discipline before the enthusiasm. In oil-industry jargon, a well like Morpho is a wildcat: the first well ever drilled in an area where nobody has produced anything, with only seismic surveys and geological models suggesting there is something down there. The category's statistics are unforgiving: in untested deep-water basins, perhaps one attempt in three or four works — and \"working\" at the first strike only means finding hydrocarbons, not finding enough of them, concentrated enough and reachable enough to justify the billions that development costs. Between \"there is oil\" and \"there is a commercial field\" lies the same distance as between panning nuggets from a stream and opening a mine." },
  { p: "And the Equatorial Margin has taught this lesson once already — precisely where this story is set. In 2011, Total drilled Zaedyus in French Guiana's waters, selling it to the market with the exact argument used today: the geology matches Guyana's, therefore the oil must be there. The first well did find encouraging hydrocarbons; headlines announced a new frontier. Then the follow-up wells came in empty or disappointing, and within a few years the play — the entire geological bet on that zone — was abandoned. ExxonMobil itself drilled the region for decades collecting disappointments, until the Liza well, in 2015, turned Guyana into \"Guyana\": from small, overlooked country to the name the oil industry now utters as shorthand for jackpot — today among the world's largest oil producers per capita, with every new frontier marketed as \"the next Guyana\". That well came when almost everyone else had already left." },
  { p: "The moral is not that Morpho will end like Zaedyus. It is that a first well, on its own, decides nothing: it moves the odds." },
  { p: "Against that base rate, the most likely outcome was always neither triumph nor dry hole but ambiguity. That is precisely what arrived. \"Indications of hydrocarbons.\" \"Evaluation phase.\" Not yet commercial — as Petrobras' own president, Magda Chambriard, told Reuters — while the official statement declared that the company's optimism about the Equatorial Margin \"is confirmed today.\" Both sentences are true; only one of them was written with October's elections in view. And that is no longer an inference: Lula opens his re-election campaign this weekend in São Bernardo do Campo under the slogan \"O Brasil pronto pra mais\" — Brazil ready for more — with the find already packaged as a legacy of his government. The announcement also arrived bundled with a record quarter — R$52.4 billion in net profit, nearly double year-on-year on war-driven oil prices, and R$17.4 billion in dividends, of which R$6.2 billion flow to the controlling federal shareholder. Read the choreography along with the geology." },
  { p: "The geology, though, says something real. Industry veterans put the rule of thumb at eight failed wells out of every ten drilled — failed in one of two ways: dry, when there is nothing down there, or uneconomic, when the hydrocarbons exist but are too scarce, too scattered or too costly to extract to be worth the billions of development. Finding hydrocarbons in a basin's first campaign materially de-risks the entire margin, which is why analysts and the oil lobby treated the news as confirmation of the regional thesis rather than of any specific field. The next step has a name: commerciality — establishing whether the field is worth the money, that is, whether recoverable volumes and extraction costs justify development. That will be decided by appraisal wells, further drilling around the discovery to measure how large, thick and rich the reservoir is." },
  { p: "Petrobras, meanwhile, frames the basin as its answer to a problem with a date on it: the pré-sal — the giant oil province discovered in 2006 off the coast between Rio and Santos, where the oil lies beneath a mattress of salt up to two kilometres thick, and which today supplies the bulk of Brazilian output — peaks around 2034–35 and then begins to decline. Reserves must be rebuilt before then, or the country goes back to importing. The scale of the option is not small: the ANP estimates the Foz do Amazonas basin may hold up to 30 billion barrels — potential, mind, not proven: an estimate of what the geology could be guarding, not an inventory of what has been found. For a sense of proportion, that would be roughly double all of Brazil's proven reserves today. And neither is the pressure small: at current extraction rates, Petrobras' proven reserves run out in little over a decade." },
  { p: "Taken together, the two figures explain the stubbornness: for Petrobras this frontier is not a pioneer's adventure, it is survival — without new discoveries, the Petrobras of the mid-2030s would be an oil company left without oil. And the same urgency explains a detail the celebration glosses over: TotalEnergies, BP and Ecopetrol all gave up on the region along the way — BP originally co-held this very block — leaving the state operator alone at the table with 100%." },
  { p: "On the eve of the announcement, three outcomes were possible. Triumph: a discovery declared commercial, and Amapá reprices on the spot. Failure: a dry hole, leaving the EU land border standing all the same — it never needed the geology. And the middle path: hydrocarbons found, value still to be established. The third is what arrived: the bet stays alive, funded by a US$3 billion exploration budget, with years of appraisal ahead to keep Amapá under the lights — and with a tail risk the celebration ignores: the block's next three wells still await Ibama authorisation, and environmental organisations have already said they will press on with the court cases over the licensing. And options — bets bought today on a value that will only be known tomorrow — move prices before they are ever exercised: Oiapoque has been absorbing migration inflows since 2024 on expectation alone. The repricing of Amapá did not wait for the drill bit, and it will not wait for commerciality. Nor does it hurt that the president of Brazil's Senate, Davi Alcolumbre, is a senator for Amapá — \"we were right\", he greeted the announcement — meaning the most isolated state currently holds the loudest gavel in Brasília." },
  { h: "The arbitrage, in three layers" },
  { p: "What does a border with the European Union actually offer? Three distinct things, and only one of them is new." },
  { p: "The price layer has existed for decades, informally. French Guiana runs on French salaries and French welfare while importing nearly everything from a metropole 7,000 km away; its cost of living is among the highest in France. Across the river: Brazilian prices. Guianese residents have long crossed to Oiapoque for groceries, fuel, dentistry, services. The visa waiver now makes the flow symmetrical — Brazilians can legally access a euro-denominated market with high purchasing power. There is also a black layer here (gold from illegal garimpos, fuel smuggling) that any honest analysis names and no serious operator touches." },
  { p: "The customs layer is the window that matters. French Guiana is EU customs territory. Today, a truck of Brazilian cement, food, or building materials crossing the bridge pays EU tariffs as if it had docked in Rotterdam — one reason the bridge stayed empty and Guiana keeps buying from Le Havre at absurd landed costs. EU–Mercosur ratification changes the arithmetic: the natural supplier of French Guiana becomes Brazil, 400 metres away, not France, three weeks away by sea. But tariffs are only half the wall. The other half is conformity — sanitary certification, EUDR traceability for timber and açaí, EU labelling. Everyone on the Brazilian side has the product. Almost no one has the compliance. Whoever builds the conforming supply chain before ratification takes the market at minute zero." },
  { p: "The procurement layer. As an EU outermost region, French Guiana receives European structural funds, on top of the spending gravity of the Kourou spaceport. Construction happens at French cost structures next to Brazilian labour and materials. Firms able to operate on both sides of the river hold a structural advantage that has nothing to do with luck. And if appraisal confirms what block 59 is hinting at, a fourth layer assembles itself: oil-supply logistics in a state that has almost none of that infrastructure today." },
  { h: "Windows open until they close" },
  { p: "None of this is a moral story. The Jari pillars will stand in the river regardless of what anyone writes about them, and the ferry queues will disappear only on the day a deck is finally laid across those pillars — a day the official schedule promises for late 2026, and one that twenty-five years of history suggest not marking in the calendar. The analytical point is narrower: arbitrage windows like the customs layer exist precisely because they are temporary. They open between a treaty's ratification and the moment large players notice; they close when the market reprices or the rules change. The job is not to celebrate them or condemn them — it is to see them while they are open." },
  { p: "Amapá spent a century as Brazil's logistical joke. Between 31 July and 14 August 2026 — fifteen days — it quietly became something else: the one place where Brazil touches Europe by land, sitting beside the first hydrocarbon find in the basin that may extend Brazil's oil frontier, in the one state everyone had stopped watching." },
  { p: "The country that built a bridge to another nation before connecting to itself may be about to discover that the first bridge was the right one after all." },
  { p: "Business Matching Global — market intelligence and business orchestration on the EU–Brazil corridor." },
];

export default function Amapa() {
  const { lang } = useT();
  const article = getArticleBySlug("amapa");
  useCanonical(`/amapa`);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <article className="min-h-screen bg-background text-foreground">
      <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/analysis"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {BACK[lang as keyof typeof BACK] ?? BACK.en}
          </Link>
          <LangSwitcher />
        </div>

        <header className="mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            {TITLE}
          </h1>
          {article && (
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <time dateTime={article.date}>
                {new Date(article.date).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })}
              </time>
              {article.updated && article.updated !== article.date && (
                <>
                  <span>—</span>
                  <span>
                    updated{" "}
                    {new Date(article.updated).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })}
                  </span>
                </>
              )}
            </div>
          )}
        </header>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          {body.map((block, i) =>
            "h" in block ? (
              <h2 key={i} className="text-2xl sm:text-3xl font-semibold mt-12 mb-4">
                {block.h}
              </h2>
            ) : "tag" in block ? (
              <p key={i} className="text-sm font-semibold tracking-wide text-muted-foreground mt-2 mb-6">
                {block.tag}
              </p>
            ) : (
              <p key={i} className="leading-relaxed mb-6 text-justify">
                {block.p}
              </p>
            )
          )}
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <ShareBlock title={TITLE} />
        </div>

        <div className="mt-12">
          <NewsletterSignup />
        </div>
      </div>

      <AnalysisFooter />
    </article>
  );
}
