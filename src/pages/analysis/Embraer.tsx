import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useT } from "@/lib/i18n";
import { getArticleBySlug } from "@/lib/analysis";
import { AnalysisFooter } from "@/components/AnalysisFooter";
import { useCanonical } from "@/lib/useCanonical";
import { ShareBlock } from "@/components/ShareBlock";

type Block = { h: string } | { p: string };

const body: Block[] = [
  { h: "I. The monopoly nobody watches" },
  { p: "The aviation world counts orders the way it always has: Airbus versus Boeing. Yet the most revealing statistic in commercial aerospace belongs to neither. In the 70-to-150-seat segment, one manufacturer holds roughly 76% of the market. It is not European. It is not North American. It is Embraer — a company from São José dos Campos, an hour from São Paulo, running what is in practice a quasi-monopoly in the one slice of commercial aviation where the duopoly never bothered to compete." },
  { p: "European commentary on Brazil defaults to soybeans, iron ore, and coffee. Embraer is the standing refutation: 23,000 employees, operations in 23 countries, 2025 revenue above US$7 billion, and — as of the second-quarter results released on July 24 — a record total backlog of US$34.5 billion, up 7% in a single quarter. This analysis explains how that happened, why it accelerated this July, and what it means for European industry." },
  { h: "II. \"Where is the Brazilian technology?\" — the objection, answered" },
  { p: "When we published the short version of this analysis, a reader raised the objection that deserves a full answer, because it is the most common European misreading of Embraer: if the E2 flies with French doors, Spanish empennages, and German flap controls, where exactly is the Brazilian technology? In the bolts and nuts?" },
  { p: "By that logic, Boeing is not American either — the 787 flies with Japanese-built wings and Italian fuselage sections — and Airbus, a four-country consortium by birth, is nobody's national champion. Global sourcing is how every modern airliner is built. The supplier list is the easy half of the industry." },
  { p: "The technology is everything the supplier list does not show. It is designing the wing — Embraer designs and manufactures its own, one of the few capabilities OEMs never outsource. It is writing the fly-by-wire control laws that decide how the aircraft behaves in every flight condition. It is integrating millions of parts from dozens of countries into a single machine and certifying it with the FAA, EASA, and ANAC simultaneously. It is standing behind every airframe, commercially and legally, for thirty years of service. Thousands of companies worldwide can make doors and flap actuators. Exactly three can deliver a certified mainline airliner. That scarcity — systems integration, certification authority, product responsibility — is the technology, and at Embraer it speaks Portuguese." },
  { p: "Keep this distinction in mind, because the rest of the analysis is the story of how a country acquired precisely that scarce capability." },
  { h: "III. Method before product: 1962–2026" },
  { p: "The sequence matters more than the dates. Brazil did not build an aircraft factory and hope engineers would follow. It built the school first: the ITA, the aeronautical engineering institute founded on the MIT model in the postwar years. From its graduates came the project: in 1965, an Air Force engineer named Ozires Silva led a team of three hundred at the São José dos Campos technical center, developing a small twin-turboprop to connect the towns Brazil's roads could not reach. The prototype — the Bandeirante — flew in 1968. Only then, in 1969, did the state create Embraer to build it in series. School, then project, then company. Brazil did not construct a factory; it constructed a system for producing aeronautical method, and the factory was the consequence." },
  { p: "The method never stopped compounding. Since 2007, Embraer has run its plants on the lean philosophy through its Enterprise Excellence Program (P3E), modeled on the Toyota Production System — and in 2022 it went to the source, signing an agreement with Toyota do Brasil to apply TPS directly on its lines. The results are measurable: a 13-month build cycle with final assembly in roughly 40 days; the Pratt & Whitney engine shortage that once left over a fifth of aircraft in production waiting for powerplants reduced to around 1%; executive-jet lead times cut from 18 months toward single digits; and a delivery ramp from 78 commercial jets in 2025 toward 85 this year and above 110 next — with company-wide output already up roughly 20% in the first half of 2026." },
  { h: "IV. The habitat: why the segment's home market is the world's best" },
  { p: "Embraer is not a supplier hunting for a market; it is embedded in the fastest-improving airline market on the planet." },
  { p: "Latin American geography does the marketing. Bogotá and Medellín sit barely 250 kilometers apart on the map — but the drive is over 400 kilometers of Andean mountain roads and takes eight to nine hours. The result is one of the world's busiest air corridors: over a hundred daily departures and 3.5 million passengers a year, at round-trip fares averaging around €45. Across the continent, high-speed rail does not exist and highways cannot substitute; for an enormous share of city-pairs, flying is the only practicable option. Add a growing middle class generating first-time fliers across Brazil, Colombia, Peru, and Chile — IATA projects regional traffic growth of 5% this year, second only to Asia-Pacific, with premium demand up over 22% in 2025, the fastest in the world." },
  { p: "The financial turnaround is just as stark. A sector investors treated for a decade as a distressed asset class used pandemic-era Chapter 11 restructurings to reset debt, fleets, and lease terms: regional operating profit rose from US$1.1 billion in 2019 to US$7.1 billion in 2025, and Copa, LATAM, and Avianca now post margins that embarrass many European and North American majors. The honest caveat — dollar-denominated costs against partly local-currency revenue keep projected net margin near 2.1% — explains why capital-light structures still matter in the region. For an airframer whose entire portfolio is built around filling a right-sized aircraft on dense, rail-free, medium-distance routes, this is not a market. It is a habitat." },
  { h: "V. The domestic paradox — and the week it ended" },
  { p: "Here is the strangest fact in the story: until this month, the manufacturer that owns 76% of the global segment was almost absent from its own country's airline fleets. For years, only Azul operated Embraer jets on Brazilian commercial routes; Gol has flown Boeing 737s exclusively since the early 2000s, and LATAM's first E2s arrive only at the end of this year." },
  { p: "Farnborough 2026 is where the paradox died. Abra Group — the holding behind Gol, Avianca, and Spain's ACMI operator Wamos Air — signed for 20 firm E195-E2s, worth around US$1.75 billion at list prices, with options and purchase rights taking the potential total to 45 aircraft. Deliveries are expected from the fourth quarter of 2027; the group says the jets may fly for both Gol and Avianca, with route announcements coming and Colombia explicitly on the radar for expansion. When the order is booked in the third quarter, every major Brazilian carrier group will operate the E2 — and the segment's center of gravity will have completed its return home." },
  { p: "Abra is worth watching beyond this single order. The group is preparing a New York listing, has moved on Chile's Sky Airline, and previously attempted a tie-up with Azul. Latin American aviation is consolidating around a handful of groups with pricing discipline — and a consolidating market with a pre-IPO growth narrative is precisely the customer that converts a manufacturer's backlog into decade-long fleet relationships." },
  { h: "VI. Farnborough 2026: the order book" },
  { p: "The Abra deal led a broader haul. Across the show, Embraer confirmed 30 firm orders from four customers — Abra's 20, five E195-E2s for Spain's Binter, three E190-E2s for Luxair, two E175s for Japan's Fuji Dream Airlines — with options and rights lifting the potential total to 60, on top of lessor Azorra's June expansion (39 to 54 firm E195-E2s) that had already pushed the E2 program past 500 cumulative orders. Azorra added a memorandum for up to 30 E-Freighter conversions, opening a cargo segment between large turboprops and narrowbody freighters. And a Gulf axis emerged alongside the order book: cooperation involving Etihad and Abra that puts widebody capacity into the group while Wamos serves Etihad in ACMI — the kind of interlocking fleet arrangement that signals long-term network planning, not opportunistic buying." },
  { h: "VII. The scale: Q2 in four numbers" },
  { p: "Friday's quarterly release, published as the show closed, quantified the moment. Total backlog: US$34.5 billion, a record, up 7% in three months. Commercial aviation: US$15.1 billion (the Farnborough orders will only be booked in Q3). Executive aviation: US$7.8 billion, up 3%. Services and support: US$5.5 billion, up 8% — the annuity stream that compounds quietly behind every delivery. And the engine of the quarter: defense, up 39% to US$6.1 billion, driven by the United Arab Emirates Air Force's order for up to 20 C-390 Millennium transports — the largest international order in the model's history. Sixty-five aircraft were delivered between April and June alone. The company's own long-range forecast, released for the show, sees demand for 8,500 commercial jets through 2045: a two-decade runway for a segment Embraer already dominates." },
  { h: "VIII. The tariff test: three regimes, one carve-out" },
  { p: "If you want an involuntary, third-party measurement of what that 76% is worth, do not ask Embraer. Ask the US Trade Representative." },
  { p: "Over the past twelve months, Washington has rebuilt its tariff wall against Brazil three separate times — and all three times, it cut the same door into it. The emergency order of July 2025, which raised duties on most Brazilian goods to 50%, exempted civil aircraft, parts, and components from day one. The global Section 122 regime introduced in February 2026 exempted commercial aircraft, engines, and aerospace parts outright — a carve-out broader than those granted to the European Union, Britain, or Japan under their trade deals. And the Brazil-specific 25% Section 301 tariff that took effect on July 22, 2026 exempts aircraft and aircraft parts again, with roughly 430 customs lines reserved for civil-aviation uses alone." },
  { p: "The reason is arithmetic, not affection. US regional aviation runs on the E175: SkyWest alone ordered 60 more last year, with rights on a further 50, to fly for American, Delta, United, and Alaska. A tariff on Embraer is a tax on US domestic connectivity — so, administration after revision after re-issue, the aircraft stays exempt while coffee and steel pay. Trade policy is where dependency stops being a thesis and becomes a customs table: Washington can live without Brazilian beef at the old price. It cannot live without the airplane." },
  { h: "IX. Defense: the fighter jet test" },
  { p: "Defense deserves its own analysis — we have published one — but the site version of this story needs its three July signals, because they complete the method thesis." },
  { p: "Speed: on July 16, the Czech Air Force received its first C-390, twenty months after contract signature — a commercial-aviation timeline applied to a military product, which is what a Toyota-derived production system is for. The aircraft, christened \"Karel Toman-Mareš\" at Farnborough, makes the Czech Republic the fourth operator after Brazil, Portugal, and Hungary, with the Netherlands, Austria, Sweden, and Slovakia in the queue; training-device agreements for Sweden (developed with Germany's Rheinmetall) and Austria, a memorandum with Anduril to integrate the Barracuda-500M cruise missile, and the February memorandum with Northrop Grumman aimed at the US Air Force round out the picture." },
  { p: "Trust: Saab and Embraer signed an agreement for the potential production of 20 additional Gripen fighters at Gavião Peixoto — with Embraer responsible for assembly, complementing Saab's own Linköping line to meet global demand. When Brazil selected the Gripen in 2014, technology flowed to Brazil as an offset obligation; twelve years and one training program later (engineers and technicians qualified in theory and practice, including in Sweden), the student facility has become the overflow factory for the world market. In aerospace, no capability is guarded more jealously than a fighter's production line. Sweden just handed Brazil the keys." },
  { h: "X. The corridor reading" },
  { p: "For European — and specifically Italian — industry, the implications run in both directions." },
  { p: "Upstream, this is not a hypothetical opportunity: European suppliers are already inside the aircraft. Latecoere builds the E2's passenger and emergency doors in France; Spain's Aernnova produces the empennage and forward fuselage, and in 2022 acquired Embraer's two aerostructure plants in Évora, Portugal, under a long-term supply agreement; Liebherr delivers the flap and slat control systems. An Embraer heading toward 110+ commercial deliveries a year, with services growing 8% a quarter, is an expanding procurement engine — and a third OEM at scale diversifies the customer base beyond the duopoly that currently sets suppliers' terms." },
  { p: "Downstream, Europe's flag carriers are already voting on the demand thesis with widebodies — Iberia frames Latin America as a market still short of maturity, ITA Airways is adding Caracas, Lima, and Santiago, and the South Atlantic is among the strongest earners for the continent's majors — while the E2's range expansion quietly rewrites route economics on exactly the kind of secondary city-pairs that intercontinental corridors depend on for feed. A segment built to connect small and mid-sized cities profitably is not a Brazilian curiosity; it is the missing infrastructure layer of every \"second-tier\" connectivity dossier in Europe and South America alike." },
  { p: "And there is a third flow, newer than the other two: method moving in reverse. European industrial strategies spent a decade debating how much technology to transfer to emerging markets. The Saab agreement, the Toyota partnership, the twenty-month NATO delivery — and a US tariff wall that keeps rebuilding itself around one Brazilian-shaped door — all point to the better question: what European industry stands to gain from the methods now flowing from them." },
  { h: "XI. Fifty-seven years, one method" },
  { p: "Ozires Silva turned 95 in January. The engineer who led three hundred people on the Bandeirante, and for whom the state created a company in 1969, lived to see the week his method assembled a European fighter for the world market, carried a US$34.5 billion backlog, and stood exempt — for the third time in a year — from the most protectionist trade cycle in modern American history. In December, the Italian Association of Aeronautics and Astronautics awarded him the Giuseppe Gabrielli Medal in Turin — Italian aerospace honoring the man who proved the thesis this series keeps returning to: the assets that cross borders most profitably are not products but methods. Methods mature more slowly than commodities. But they compound." },
];

const BACK = {
  it: "Torna alle analisi",
  en: "Back to analysis",
  pt: "Voltar às análises",
} as const;

export default function Embraer() {
  const { lang } = useT();
  const article = getArticleBySlug("Embraer");
  const desc =
    "Embraer 2026: how a Brazilian company built a 76% share of the 70–150 seat segment, a US$34.5B backlog, and a method that keeps clearing US tariff walls.";
  useCanonical("/Embraer", {
    title: `${article?.title[lang] ?? "Embraer"} — Business Matching Global`,
    description: desc,
    type: "article",
  });

  return (
    <main className="min-h-screen bg-background">
      <div className="container max-w-3xl py-16 md:py-24">
        <Link
          to="/analysis"
          className="inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          {BACK[lang]}
        </Link>
        <article className="prose-invert">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4">
            {article?.title[lang]}
          </h1>
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
          <ShareBlock title={article?.title[lang] ?? "Embraer"} />
        </article>
        <AnalysisFooter />
      </div>
    </main>
  );
}