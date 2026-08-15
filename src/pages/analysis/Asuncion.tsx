import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useT } from "@/lib/i18n";
import { getArticleBySlug } from "@/lib/analysis";
import { AnalysisFooter } from "@/components/AnalysisFooter";
import { useCanonical } from "@/lib/useCanonical";
import { ShareBlock } from "@/components/ShareBlock";
import { LangSwitcher } from "@/components/LangSwitcher";
import { NewsletterSignup } from "@/components/NewsletterSignup";

type Block = { h: string } | { p: string };

const TITLE = "The Backdoor to Brazil";

const BACK = {
  it: "Torna alle analisi",
  en: "Back to analysis",
  pt: "Voltar às análises",
} as const;

const body: Block[] = [
  { p: "Socks, softgel capsules and wiring harnesses for Stellantis: what the traffic across the Paraná — the border river that separates Paraguay from Brazil at Ciudad del Este — actually says, and why the people shouting about it on Instagram are the least reliable guide to it." },
  { p: "In February, a post went viral on Brazilian social media: Lupo, the sock and underwear maker founded in 1921, was \"leaving Brazil after 104 years\" and taking production to Paraguay. The company had to issue a public denial. It was not leaving. It was doing two things at once, and they are worth looking at separately." },
  { p: "In Paraguay, at Ciudad del Este, it opened a 30-million-real plant under the maquila regime — Paraguay's program that lets a company import machinery and raw materials with duties suspended, produce for export, and pay a single 1% tax on the value added inside the country: about 110 jobs and capacity for 20 million pairs a year of basic socks, the simplest product in the catalogue, the one where you compete on price alone. In Brazil, at its historic base in Araraquara — in the interior of São Paulo state, where the company was born in 1921 — it invested more than twice as much over the same period: 70 million reais in technical textiles and the higher-value sports lines, the part of the catalogue where you compete on research, machinery and brand." },
  { p: "That is not an exodus: it is a division of labor. The commodity product goes where production costs less; the premium product stays where the know-how and the brand live. And the detail the viral post never mentioned is the most instructive one. Asked why, chief executive Liliana Aufiero — granddaughter of Henrique Lupo, the Italian immigrant who founded the company — did not talk about escaping Brazil. She talked about the competitors she had to compete with: Chinese manufacturers already installed in Paraguay, selling basic socks into the Brazilian market at costs unreachable from São Paulo. The river crossing was not flight. It was pursuit." },
  { p: "Keep that inversion in mind, because it rewrites everything else in this story. Paraguay is usually described as Brazil's low-cost refuge. It is more accurate to describe it as Brazil's backdoor — and the queue at the door is not made up only of Brazilians." },
  { h: "A door with the owner's signature on it" },
  { p: "The numbers first; they are simple. Some 320 companies operate in Paraguay under the maquila regime; seven in ten are Brazilian. The name, incidentally, comes from medieval Iberia: the maquila was the share of flour the miller kept as payment for grinding someone else's grain. Paraguay has made itself the continent's miller — it grinds other people's grain and keeps its share, the one percent. In the first half of 2026 the maquiladoras exported over 700 million dollars, 25% more than the year before, and they employ more than 35,000 people. A new law, in force since late 2025, extended the regime to services and technology. And the newest arrivals are no longer just making socks: in August HLCAPS, a Brazilian contract manufacturer of supplement capsules, inaugurated an 8-million-dollar plant in Ciudad del Este — 5.5 billion softgel capsules a year, destined for South America and, in its own words, the United States." },
  { p: "Now the right question: where does all this production end up? Answer: two-thirds of it, in Brazil. And this is where the picture flips. Those goods come home without paying import duties, because goods circulate freely between Mercosur countries — a rule Brazil itself signed, in Asunción, in 1991. In other words: this is not foreign capital dodging Brazil's defenses. It is Brazilian companies moving production ten kilometers across the river and selling back to their own compatriots, legally and at lower cost, through a door Brasília built with its own hands. The backdoor is not a hole in the wall: it is in the building's original blueprints." },
  { p: "And the queue at the door is lengthening in plain sight. Jussara, a family-owned São Paulo dairy with seventy years of history and 1.2 million liters processed a day, is negotiating a 10-million-dollar unit to portion and package powdered milk in Ciudad del Este: declared destination, one hundred percent back to the Brazilian market — the two-thirds average, in this case, becomes the whole. And a well-known family-owned Brazilian retail chain, fonder than most of wrapping itself in the flag, already has bedsheets and towels produced by Paraguayan maquiladoras: that is no competitor's insinuation — it was recounted publicly, and with understandable satisfaction, by the president of Paraguay himself." },
  { p: "If the whole affair has a comic patron saint, it is the Beagle Boys — Irmãos Metralha, for the Brazilian half of this readership; Banda Bassotti, for the Italian one. Sixty years of failed break-ins, because they insisted on cracking the front of a vault whose back entrance was published in the official gazette, with the one-percent fee printed on the sign. They were never short of audacity. They were short of a subscription to the Gaceta Oficial." },
  { h: "The European already inside" },
  { p: "The phenomenon is narrated as a Brazilian affair, but the maquila law does not ask for a passport. In San Lorenzo, a plant has been quietly producing automotive wiring harnesses for Stellantis and General Motors for years. It belongs to Leoni — a German company. The European proof of concept is not a hypothesis: it is on the shop floor; it just never hired a press office." },
  { p: "For a European manufacturer, the arbitrage has three faces. The first is Mercosur's side door: the common external tariff and the Custo Brasil — Brazil's shorthand for the systemic overhead of doing business there: taxes, red tape, logistics, expensive credit — that stop a European mid-sized company at Brazil's front gate can be approached differently by producing in Paraguay and entering Brazil as Mercosur goods. With one decisive technicality: rules of origin. Light assembly of European components and semi-finished goods does not confer Mercosur origin, and the product pays the external tariff anyway; the model only works where local value added — labor, electricity, regional inputs — clears the thresholds. That is case-by-case analysis, and it is exactly where the real work sits." },
  { p: "On electricity, a parenthesis is worth opening, because it is the least-told gear in the whole mechanism. Itaipú, the binational hydroelectric dam on the Paraná, belongs half to Paraguay; but the 1973 treaty requires that whatever energy Paraguay does not consume at home be ceded to Brazil at an administered price — set by the treaty itself, not by the market. For half a century, then, the Paraguayan surplus has flowed to Brazil on imposed terms. Every factory that sets up in Paraguay reverses that arithmetic: the energy it consumes stops being surplus handed over at a regulated price and becomes Paraguayan value added, resold at market price inside the socks and the capsules. The math works for both sides: the state stops underselling a slice of its surplus, and the factory still pays for industrial electricity markedly cheaper than Brazil's. It is that rare arbitrage in which the landlord gains as much as the guest — which explains why the Paraguayan door is not merely tolerated: it is advertised by the doorman. Attracting industry is how Asunción found a way to renegotiate Itaipú without touching the treaty: it does not contest the clause — it shrinks the surplus the clause applies to. The maquila, seen from here, is also an energy arbitrage dressed up as a tax regime." },
  { p: "The second face points north, and it pays to be precise about the bill. Anyone exporting to the United States pays the ordinary customs tariff, which depends on the product and is often in single digits. The problem of 2026 is not that base: it is the layers Washington has stacked on top of it. In the round in force since July 24, some sixty countries were handed an additional duty of 10 to 12.5% — Argentina and the European Union in the lower band, China and others in the upper one, Brazil in the worst, with surcharges reaching 25% on some products. Paraguay appears on no list at all: whoever exports from Asunción pays only the base tariff that applies to everyone, with no additional layer. The differential with Brazil, then, is not a privilege written into a treaty — a free-trade agreement could not even exist, Mercosur's common external tariff forbids it. It is a de facto exemption, the fruit of geopolitical good behavior, revocable with the same pen that granted it. HLCAPS's plan to serve the United States from Ciudad del Este is that arithmetic converted into concrete: the same capsule, the same customs base, minus ten to twenty-five points of punitive layer." },
  { p: "The third face is the one almost nobody in Europe has priced in yet: the EU–Mercosur agreement, which Paraguay was among the first to ratify. When it takes effect, European components and raw materials will enter Paraguay at reduced duties — and the combination of preferential inputs on the way in with maquila treatment on the way out is a configuration that today exists mostly on papers nobody has bothered to read side by side." },
  { h: "Pouring concrete under the flows" },
  { p: "When private capital opens a corridor, governments sooner or later show up to pour concrete under it. In August, the governor of Santa Catarina flew to Asunción — with the president of the state's industry federation — to propose, among seven items, a new bridge. Look at the map and smile: Santa Catarina does not border Paraguay. The proposed link, from Mayor Otaño to El Dorado, crosses the Argentine province of Misiones, which contributes neither the demand nor the supply: only the geography, and the tolls. The stated exchange is transactional — a shorter route for Paraguayan corn into Santa Catarina's animal-protein complex, and Santa Catarina's ports added to the short list Paraguay currently uses for its maritime trade. The unstated context is that Santa Catarina's own manufacturers, textile names included, already produce across the river. The state that could not hold on to every factory has decided to own the logistics instead: if you cannot be the plant, be the gateway. It would be the fourth bridge between the two countries — after the Friendship Bridge of 1965 and the new Integration Bridge, both at Foz do Iguaçu, and the Bioceanic Route bridge at Porto Murtinho, farther north — and the first conceived not to connect neighbors but to shorten an arbitrage." },
  { h: "The men selling shovels and sieves" },
  { p: "One last data point, and it may be the most eloquent. Every day, more Brazilian influencers make a living promoting Paraguay — the one percent, the \"triple ten,\" the open-your-company-in-Asunción package. It has become a profession. In every gold rush the safest business was never the digging: it was selling shovels — access — and sieves, the flattering illusion of discernment, the course and the \"mentorship\" that supposedly teach you to tell the nugget from the mud. It is worth remembering how that story ended: the diggers mostly died poor, and the man selling sturdy trousers was called Levi Strauss." },
  { p: "And the shovel-selling is even automating. A test published by Folha de S.Paulo in recent days put four AI chatbots in front of a fictional profile — 28 years old, 125 kilos, a medical prescription for tirzepatide, a budget too small for Mounjaro: two recommended the Paraguayan weight-loss pens — tirzepatide is under patent in Brazil, but patents are territorial rights: across the river, five local laboratories produce versions with valid registrations at Dinavisa, Asunción's health agency, and no registration at Anvisa, which makes them illegal in Brazil; one chatbot mentioned them only to advise against them entirely; one refused to answer. \"A kind of safety lottery for whoever asks,\" said the researcher from InternetLab — an independent São Paulo think tank on law and technology — quoted by the paper. And the paradox is that these are not even border-stall goods: an analysis by the University of Campinas for the same paper confirmed that the Paraguayan versions contain real tirzepatide — while being unable to say anything about impurities, sterility, efficacy or safety — and the Asunción laboratories go as far as running public clinical trials on their own products, while the patent holder calls them counterfeits. A parallel pharmaceutical ecosystem legitimizing itself one registration at a time. But mind the difference, because it is the entire thesis of this piece: the pens are not the backdoor — they are its smuggled double. The maquila regime is a legal door, published in the official gazette with the fee on the sign; an unregistered medicine is illegal to possess in Brazil however carefully it was bought on the other side of the border. The promotional channel — influencer yesterday, algorithm today — is the same for both doors, and that is exactly the problem: the shovel-seller does not distinguish between the legal seam and the one that ends up seized at customs. Distinguishing is someone else's job." },
  { p: "The professionalization of the promotion says two things at once. It certifies the scale — nobody builds an industry around advertising a marginal phenomenon. And it starts a countdown. In computing, when a backdoor is discovered and talked about too much, the owner of the system sooner or later closes it with a patch — the fix that seals the flaw. It works the same way here: a shortcut shouted daily into a million feeds is a shortcut on its way to becoming a political question in Brasília, and political questions are the antechamber of the fix. The Lupo episode shows the mechanism in miniature — a nuanced industrial decision, half of which was a larger investment inside Brazil, compressed by the engagement economy into \"company abandons Brazil after 104 years\": a claim so wrong the company had to deny it in writing." },
  { p: "Which suggests a rule of general application, offered here free of charge: major decisions in life — and relocating a production line is one — are not something you take by following an influencer." },
  { p: "Consider this page, then, the work of an uninfluencer. Nobody here gets paid when you cross the river, and nobody gets paid if you stay home; the only subscriptions behind this analysis are to customs gazettes, maquila registries and tariff schedules, read side by side until they admit something. That is a different incentive structure, and incentive structures are destiny. Whoever is paid every time someone crosses — by commission, by sponsorship, by click — will always tell you that crossing is worth it: their earnings stop at the threshold, and what happens to you afterwards is not their concern. Analysis, by contrast, only eats if you are still in business years after the crossing. And whoever has that incentive is forced to mind the boring things that decide your survival: the rules of origin, the regimes' expiry dates, the pen — in Washington as in Brasília — that can close everything with one signature. Because every backdoor stays open only for as long as the owner of the system decides not to close it. The sensible position, then, is neither rushing through the door nor lecturing it from a distance: it is standing on the threshold and watching the hinges — that is, the signals that tell you whether the door is about to move. Ideally beside someone who has been watching them for a while." },
  { p: "Business Matching Global analyzes the corridors — and the side doors — between Europe and South America, for as long as they stay open." },
];

export default function Asuncion() {
  const { lang } = useT();
  const article = getArticleBySlug("asuncion");
  const desc =
    "Paraguay is not Brazil's low-cost refuge; it is Brazil's backdoor. Why Lupo, HLCAPS, Jussara, Leoni and Stellantis are crossing the Paraná, what Mercosur law really allows, and why the influencer economy is the worst guide to it.";
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
          <p className="text-xs text-foreground/70 mb-10 tabular-nums">
            {article?.date && (
              <>
                {article.date}
                {article?.updated && (
                  <span className="ml-2 text-foreground/50">
                    (updated {article.updated})
                  </span>
                )}
              </>
            )}
          </p>
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
        <NewsletterSignup />
        <AnalysisFooter />
      </div>
    </main>
  );
}
