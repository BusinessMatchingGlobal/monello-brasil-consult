import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useT } from "@/lib/i18n";
import { getArticleBySlug } from "@/lib/analysis";
import { AnalysisFooter } from "@/components/AnalysisFooter";
import { useCanonical } from "@/lib/useCanonical";
import { ShareBlock } from "@/components/ShareBlock";
import { LangSwitcher } from "@/components/LangSwitcher";

type Block = { h: string } | { p: string };

const TITLE = "The Backdoor to Brazil";

const BACK = {
  it: "Torna alle analisi",
  en: "Back to analysis",
  pt: "Voltar às análises",
} as const;

const body: Block[] = [
  { p: "Socks, softgel capsules and wiring harnesses for Stellantis: what the traffic across the Paraná actually says — and why the people shouting about it on Instagram are the least reliable guide to it." },
  { p: "In February, a post went viral on Brazilian social media: Lupo, the sock and underwear maker founded in 1921, was 'leaving Brazil after 104 years' and taking production to Paraguay. The company had to issue a public denial. It was not leaving. What it had actually done was open a plant in Ciudad del Este — thirty million reais, about a hundred and ten jobs, capacity for twenty million pairs of basic socks a year under Paraguay's maquila regime — while investing more than twice that amount, seventy million reais, in its historic base in Araraquara, on technical textiles and the higher-value Lupo Sport lines." },
  { p: "That is not an exodus. It is a division of labor: commodity production on one bank of the river, engineering and brand on the other. And the detail the viral post never mentioned is the most instructive one. Asked why, Lupo's chief executive, Liliana Aufiero — granddaughter of Henrique Lupo, the Italian immigrant who founded the company — did not talk about escaping Brazil. She talked about the competitors she needed to match: Chinese manufacturers already installed in Paraguay, already selling basic socks into the Brazilian market at costs Lupo could not touch from São Paulo state. The move across the river was not flight. It was pursuit." },
  { p: "Keep that inversion in mind, because it reframes everything else in this story. Paraguay is usually described as Brazil's low-cost refuge. It is more accurate to describe it as Brazil's backdoor — and the queue at the door is not made up only of Brazilians." },
  { h: "A door with the owner's signature on it" },
  { p: "The numbers first. Paraguay's maquila regime now hosts some 320 companies; roughly seven in ten are Brazilian. In the first half of 2026 the maquiladoras exported over seven hundred million dollars, a quarter more than the year before, and the regime supports over thirty-five thousand jobs, growing about ten percent a year. A new maquila law, in force since late 2025, replaced the 1997 original and extended the regime to services and technology. The tax is a single levy of one percent on value added. The newest arrivals are climbing the value chain: in August, the Brazilian pharmaceutical supplier HLCAPS inaugurated an eight-million-dollar plant in Ciudad del Este to produce five and a half billion softgel capsules a year — and stated, without drama, that the unit would serve South America and the United States." },
  { p: "Here is the part that gets lost in the indignation: this backdoor was written by Brazil itself. The free circulation that lets maquila output flow home is Mercosur law, signed in Asunción with Brazil's own pen. And the door stays open because it mostly serves insiders — around two-thirds of everything the maquiladoras produce goes straight back to Brazil. This is not foreign capital raiding the Brazilian market. It is, overwhelmingly, Brazilian companies leaving through the back door in order to re-enter through the front at a lower cost." },
  { p: 'If the whole thing has a comic patron saint, it is the Beagle Boys — the Irmãos Metralha, for the Brazilian half of this newsletter\'s readership. Sixty years of failed break-ins, because they insisted on cracking the front of a vault whose back entrance was published in the official gazette with the one-percent fee printed on the sign. They were never short of audacity. They were short of a subscription to the Gaceta Oficial.' },
  { h: "The European already inside" },
  { p: "The phenomenon is narrated as a Brazilian affair, but the maquila law does not ask for a passport. In San Lorenzo, a plant has been quietly producing automotive wiring harnesses for Stellantis and General Motors for years. It belongs to Leoni — a German company. The European proof of concept is not hypothetical; it is on the shop floor, it simply never hired a press office." },
  { p: "For a European manufacturer, the arbitrage has three faces. The first is the Mercosur side door: the common external tariff and the Custo Brasil that stop a European mid-cap at Brazil's front gate can be approached differently by producing in Paraguay and entering Brazil as Mercosur goods — with one decisive technicality. Rules of origin. Light assembly of European inputs does not confer Mercosur origin, and the product pays the external tariff anyway; the model works only where local value added — labor, Itaipú-priced energy, regional inputs — clears the thresholds. That analysis is case-by-case, and it is precisely where the real work sits." },
  { p: "The second face points north. In the tariff round that took effect in July, Washington applied a minimum of ten percent to some sixty countries and up to twelve and a half percent — with surcharges reaching twenty-five on some products — to China, India, the European Union and Brazil. Paraguay was left off the list entirely; its industry minister openly advertises the fact, noting that every tariff point a neighbor pays is competitiveness gained in Asunción. There is no free-trade agreement behind this — Mercosur's common tariff forbids one — only a framework agreement, a bilateral council, and conspicuous geopolitical good behavior. HLCAPS's plan to serve the United States from Ciudad del Este is this asymmetry converted into concrete and stainless steel." },
  { p: "The third face is the one almost nobody in Europe has priced in yet: the EU–Mercosur agreement, which Paraguay was among the first to ratify. When it takes effect, European inputs will enter Paraguay at reduced duties — and the combination of preferential inputs on the way in with maquila treatment on the way out is a configuration that exists, today, mostly on paper that nobody has bothered to read side by side." },
  { h: "Pouring concrete under the flows" },
  { p: "When private capital establishes a corridor, governments eventually show up to pour concrete under it. In August, the governor of Santa Catarina flew to Asunción — with the president of the state's industry federation — to propose, among seven items, a new bridge. Look at the map and smile: Santa Catarina does not border Paraguay. The proposed link, Mayor Otaño to El Dorado, crosses the Argentine province of Misiones, which contributes neither the supply nor the demand, only the geography and the tolls. The stated exchange is transactional — a shorter route for Paraguayan corn into Santa Catarina's animal-protein complex, and Catarinense ports added to the short list Paraguay currently uses for its maritime trade. The unstated context is that Santa Catarina's own manufacturers, textile names included, are already producing across the river. The state that could not keep every factory has decided to own the logistics instead: if you cannot be the plant, be the gateway. It would be the fourth bridge on this frontier, and the first conceived not to connect neighbors but to shorten an arbitrage." },
  { h: "The men selling shovels and sieves" },
  { p: 'Every day, more Brazilian influencers make a living promoting Paraguay — the one-percent tax, the "triple ten," the open-your-company-in-Asunción package. It has become a profession. In every gold rush the safest business was never the digging; it was selling shovels — access — and sieves, the flattering illusion of discernment, the course and the mentorship that will supposedly help you tell the nugget from the mud. It is worth remembering how that story ended: the diggers mostly died poor, and the man selling sturdy trousers was called Levi Strauss.' },
  { p: 'The professionalization of the promotion tells you two things at once. It certifies the scale — nobody builds an industry around advertising a marginal phenomenon. And it starts a clock: a backdoor shouted daily into a million feeds is a backdoor on its way to becoming a political question in Brasília, and political questions are the antechamber of patches. The Lupo episode shows the mechanism in miniature — a nuanced industrial decision, half of which was a larger investment inside Brazil, compressed by the engagement economy into "company abandons Brazil after 104 years," a claim so wrong the company had to deny it in writing.' },
  { p: "Which suggests a rule of general application, offered here free of charge: major decisions in life — and relocating a production line is one — are not something you take by following an influencer. The door is real, the one-percent sign is real, the German plant wiring Stellantis cars is real, and so is the fine print on rules of origin and the pen in Washington and Brasília that can close any of it. Every backdoor lives exactly as long as the owner of the system decides not to patch it. The sensible position is neither rushing through the door nor moralizing at it from a distance. It is standing on the threshold, watching the hinges." },
  { p: "Business Matching Global analyzes the corridors — and the side doors — between Europe and South America, for as long as they stay open." },
];

export default function Asuncion() {
  const { lang } = useT();
  const article = getArticleBySlug("asuncion");
  const desc =
    "Paraguay is not Brazil's low-cost refuge; it is Brazil's backdoor. Why Lupo, HLCAPS and Leoni are crossing the Paraná, what Mercosur law really allows, and why the influencer economy is the worst guide to it.";
  useCanonical("/asuncion", {
    title: "The Backdoor to Brazil: Asunción and the Paraguay Maquila Corridor",
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
          <LangSwitcher to="/asuncion" />
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
