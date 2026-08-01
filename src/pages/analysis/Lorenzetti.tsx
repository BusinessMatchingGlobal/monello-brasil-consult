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

const BACK = {
  it: "Torna alle analisi",
  en: "Back to analysis",
  pt: "Voltar às análises",
} as const;

const body: Block[] = [
  { p: "Ask a European engineer to inspect a Brazilian bathroom and watch the sequence of reactions. First, alarm: a plastic showerhead with a 7,500-watt bare resistance element, live wires visible at the ceiling, heating water at the exact moment it touches the body. Expat forums call it the ducha da morte — the shower of death. Then, confusion: there is no hot water pipe anywhere in the apartment. Then, if the engineer stays long enough, something closer to respect." },
  { p: "Because the object they are looking at is not an improvisation. It is one of the most successful pieces of constraint-driven engineering in the history of consumer goods — and it was designed, patented and industrialized by an Italian immigrant family from Genoa." },
  { h: "An Italian invention Brazil made its own" },
  { p: "In 1923, civil engineer Alessandro Lorenzetti — who had come from Genoa decades earlier to work on the Port of Vitória and the Santos–Jundiaí railway — founded a precision-screw workshop with fellow Italian Carlo Tonanni in Mooca, São Paulo's industrial Italian quarter. Four employees, four automatic lathes." },
  { p: "The pivot came with the next generation. In 1952, as Brazil urbanized and the electricity grid raced across the cities, Alessandro's son Lorenzo — metido a inventor, as the family called him — patented the automatic electric shower: a unit that switched itself on with the pressure of the water itself. No lever, no pilot flame, no tank. Open the tap, get hot water." },
  { p: "Seventy years later, Lorenzetti S.A. operates five plants in São Paulo and Minas Gerais, posted record revenue above R$2 billion, and exports to more than 45 countries — above all in Latin America and Africa, markets that replicate the exact conditions of 1950s Brazil: growing electrification, no gas network, capital-scarce households. The definitive compliment arrived at a trade fair in China, where Lorenzetti employees stumbled upon a fully counterfeit stand of their own brand. Nobody counterfeits an accident." },
  { h: "The razor and the resistance" },
  { p: "To European eyes, the economics look absurd. A market leader built on a product that retails for R$60–150 — the price of a pizza dinner — in a category where the European equivalent, a gas boiler or storage heater, sells for fifty times as much? Where is the margin?" },
  { p: "The answer is that the cheap device is the door, not the business. The near-zero CapEx puts a Lorenzetti in virtually every bathroom in the country — an installed base no boiler manufacturer will ever approach in Brazil. And inside every one of those showers sits a consumable: the resistance element burns out, regularly, worn down by hard water and thermal cycling. The Brazilian household does not buy a new shower. It buys a resistência — a few reais, available in every hardware store and supermarket in the country — and often fits it at home. Lorenzetti sells the appliance once and the replacement element forever, across tens of millions of bathrooms. It is the razor-and-blade model applied to hot water; the patented flat Loren Ultra resistance, introduced in 2015, tightens the loop by making the consumable proprietary." },
  { p: "The third layer is the brand as standard. When the family surname becomes the generic noun for the category — Brazilians buy um lorenzetti the way they photocopy with a Xerox — and every electrician in the country can install and service the product blind, displacing the incumbent costs a challenger almost everything and the incumbent almost nothing. The counterfeit stand in China was simply the market certifying that status." },
  { p: "Read as a formula: minimal CapEx to maximize the installed base, a recurring consumable to monetize it, a brand-standard to defend it. Seventy years of rent built on a sixty-real object — the exact inversion of the European model, which concentrates the margin in a high-CapEx product sold once. Neither logic is naive. Each is the rational answer to its own infrastructure." },
  { h: "The logic of the constraint" },
  { p: "To understand why the electric shower conquered Brazil — and why it could never conquer Europe — you have to read the infrastructure, not the product." },
  { p: "The house has no hot water system. The chuveiro heats water at the point of use, at the moment of use. Zero storage losses, zero hot-water plumbing, near-100% conversion efficiency at the fixture. Installation cost: the price of the device itself, roughly R$60–150 for entry models, plus one dedicated circuit. In an economy where the binding constraint on the household is upfront capital, this is not a compromise. It is the optimum." },
  { p: "The grid pays the bill. Millions of showers switching on between 6 and 9 p.m. — the after-work banho — created Brazil's notorious evening residential peak. For decades, distribution utilities dimensioned capacity around a load that exists three hours a day. Time-of-use experiments, the tarifa branca, the campaigns to shift consumption: much of it traces back to this one appliance." },
  { p: "The tariff model permits it. Here is the structural divergence Europeans miss. An Italian household contracts power — typically 3 kW — and the meter physically disconnects above it. A 7.5 kW shower could never even switch on. Brazilian residential supply has no equivalent contracted-power ceiling: the customer pays for energy consumed, and the load is free to spike. Italy disciplines demand upstream, at the contract; Brazil absorbs it downstream, at the grid." },
  { p: "The safety regime tolerates it. A bare resistance element in flowing water leaks current by design. Brazil's NBR 5410 standard has required 30 mA residual-current devices in wet areas since 1997 — the same threshold as Europe's norms — but every Brazilian electrician knows the phrase \"o chuveiro desarma o DR\": the shower trips the breaker. The popular fix is rarely a new shower. It is removing the breaker — and surveys by Procobre and Abracopel estimate that only around a quarter of Brazilian homes have a residual-current device installed at all. The system runs on a normative compromise that no European regulator would sign, and a generation of Brazilians grew up knowing the faint formigamento — the tingle — of a shower grounded to a water pipe, or to nothing at all. Modern encapsulated-resistance designs have largely engineered the risk away; the installed base is another matter." },
  { h: "The washing machine that never heats" },
  { p: "Once you see the chuveiro, the second Brazilian peculiarity explains itself: the standard Brazilian washing machine has no heating element. It washes cold. Always." },
  { p: "The reasons stack neatly. The household's electrical budget — wiring, breaker panel, the utility connection itself — is already spent on the bathroom; there is no room for a second 2 kW resistive load in the service area. The climate makes cold-wash acceptable for everyday soil. And the detergent industry co-evolved: Brazilian formulations are enzyme systems optimized for 20–30°C, the mirror image of a European market that spent decades calibrated around 40–60°C cycles." },
  { p: "Walk into an appliance retailer in São Paulo or Belo Horizonte today and the market reads as three tiers. The mass standard: top-load agitator machines from Brastemp, Consul and the omnipresent Electrolux — 15-to-17-kilo workhorses, cold water, cycles under forty minutes, nearly indestructible, in almost every Brazilian home. The premium tier: front-load Lava e Seca washer-dryers, a segment booming in middle- and upper-middle-class apartments and dominated by LG and Samsung — machines that work exactly like their European cousins, heating water internally and tumbling clothes gently, positioned and priced as luxury goods. Between them, a recent compromise: impeller top-loaders (a flat rotating disc instead of the central post), gentler on fabric, weaker on stubborn dirt." },
  { p: "Why does the mass market need that aggressive central agitator at all? Industrial cleaning theory answers with the Sinner circle — formulated around 1959 by Herbert Sinner, a chemist at Henkel, the German detergent house behind Persil, and still the foundational model taught in professional laundering: washing is the sum of four forces — temperature, chemistry, time and mechanical action — drawn as slices of a circle that must always be full. Shrink one slice, and the others must expand to compensate. The Brazilian machine removes temperature almost entirely and refuses to compensate with time (the cycle is a third of a European one), so the entire burden lands on mechanics: the agitator grabs, twists and scrubs the load in sharp alternating strokes, a motorized simulation of vigorous hand-washing. The clothes come out clean, fast, and measurably older. Cotton thins, edges fray, pilling appears, elastics surrender early." },
  { p: "Note what happened to the cost. It did not disappear — it migrated. The household saved on the appliance and on the electricity bill, and pays instead through a shortened wardrobe life: a recurring expense that appears on no energy label, no price tag, no comparison chart. Costs that survive by moving to lines nobody prices — this is the grammar of the Custo Brasil, applied to a laundry room." },
  { p: "The architecture goes further down-market. Below the automatic top-loader sits the tanquinho — the semi-automatic washer, and it is worth being precise about how little machine it actually is. A plastic tub with an agitator and a timer: it washes and rinses, but the human does the rest — fill it with a hose, dose the detergent, drain the water, transfer the load, and wring it by hand or move it to a centrífuga, a standalone spin-dryer that survives in Brazil as an autonomous product category half a century after it vanished from European retail. Capacities run from 8 to 16 kilos — households use them especially for the heavy loads, blankets, rugs — and the running cost is almost a rounding error: with no heating and no spin motor, a typical 10-kilo model declares around 0.10 kWh per cycle. The purchase price, a fraction of an automatic's, buys half a washing machine; the other half is supplied by the household, in labor. It is the same migration seen with the agitator and the wardrobe: the cost the sticker doesn't show hasn't vanished — it has moved onto a line nobody prices, in this case somebody's afternoon." },
  { p: "The national leader in semi-automatics is Suggar of Belo Horizonte — a company founded in 1978 around a different product entirely, the kitchen air purifier, which Brazilians to this day call \"um suggar\" regardless of who made it. Two companies in one story whose surname became the generic noun for a product category: in this market, the prize for reading the constraint first is becoming the language itself. And millions of tanquinhos sold per year say the household finds the trade-off entirely rational." },
  { p: "And when a Brazilian home does have hot water — a gas aquecedor de passagem, a rooftop solar system, typical of upper-middle apartment stock — the washing machine still refuses to heat it. Selected models simply accept pre-heated water at the inlet, usually capped around 40°C to protect the plastic tub and valves. The division of labor is explicit: heating water is the house's job, not the appliance's. Europe internalized the heat inside the machine because the machine historically had one connection, cold. Brazil externalized it because the house historically had one heater, the shower." },
  { h: "Neither product crosses the ocean" },
  { p: "This is the part that matters for anyone planning market entry in either direction." },
  { p: "The chuveiro elétrico cannot be exported to Europe — not because of cost, but because of systemic incompatibility: mandatory 30 mA differentials that its physics would trip, contracted-power ceilings its wattage would exceed, and a compliance culture with no appetite for the Brazilian compromise. In the opposite direction, the European hot-water ecosystem — gas boilers, heating washing machines, radiators — cannot be exported to Brazil, because the infrastructure downstream of the product does not exist: piped gas reaches a sliver of São Paulo and Rio, and the average home's wiring cannot host resistive loads beyond the one it already has." },
  { p: "Two sophisticated industrial markets. Two mature appliance industries. Near-zero product flow between them in these categories — and consumer taste has nothing to do with it. The asymmetry is infrastructural, regulatory and tariff-structural. The product is a fossil of the system that produced it." },
  { p: "Which brings the story back to Lorenzetti, and to the reason a 1923 screw workshop from Mooca became a centennial market leader while generations of importers failed. Alessandro Lorenzetti did not ship the Italian solution across the Atlantic. His son read the actual Brazilian constraint — abundant hydroelectricity, no gas, no capital, houses without plumbing for heat — and engineered the native answer. The product was born in Brazil because the method was applied in Brazil." },
  { p: "A century later the lesson is unchanged. Before asking what your product costs to ship, ask a harder question: how much of the system your product depends on exists on the other side of the ocean — and if the answer is \"little,\" is your real export the product at all, or the method that would design its Brazilian twin?" },
  { p: "Business Matching Global maps the infrastructure behind the market — before the container ships." },
];

export default function Lorenzetti() {
  const { lang, setLang } = useT();
  const article = getArticleBySlug("lorenzetti");
  const desc =
    "How an Italian immigrant family engineered Brazil's electric shower — and why the appliance, the cold-wash machine and the tanquinho reveal the infrastructure logic behind the Custo Brasil.";
  useCanonical("/lorenzetti", {
    title: `${article?.title[lang] ?? "The Shower That Decides How Brazil Washes"} — Business Matching Global`,
    description: desc,
    type: "article",
  });

  useEffect(() => {
    const previous = lang;
    if (lang !== "en") setLang("en");
    return () => {
      if (previous !== "en") setLang(previous);
    };
  }, [lang, setLang]);

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
          <LangSwitcher to="/lorenzetti" />
        </div>
        <article className="prose-invert">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4">
            {article?.title[lang] ?? "The Shower That Decides How Brazil Washes"}
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
          <ShareBlock title={article?.title[lang] ?? "The Shower That Decides How Brazil Washes"} />
        </article>
        <AnalysisFooter />
      </div>
    </main>
  );
}
