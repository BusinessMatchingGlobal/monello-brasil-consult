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

const TITLE = "Rare Earths in Brazil: The Geology Is Settled. Everything Else Is Being Fought Over.";

const BACK = {
  it: "Torna alle analisi",
  en: "Back to analysis",
  pt: "Voltar às análises",
} as const;

const body: Block[] = [
  { p: "Here's a number that should keep anyone working in industry, defence or the energy transition awake at night: today, 100% of the heavy rare earths feeding Europe's magnets, electric motors and advanced defence systems comes — directly or indirectly — from China. Not 60%, not 80%. All of it." },
  { p: "Beijing controls roughly 60% of global mining and the overwhelming majority of separation and refining capacity. Even when the ore is dug up elsewhere, the technological bottleneck stays in the hands of a single actor — one that has repeatedly shown it knows how to use export restrictions as geopolitical leverage." },
  { p: "Against this backdrop, Brazil holds the world's second-largest declared reserves — around 21 million tonnes — and the state of Minas Gerais hosts what may be the most strategically important undeveloped deposits outside China. The European Union has noticed: Commissioner for International Partnerships Jozef Síkela travelled to Brazil in June 2026 under the Global Gateway strategy, and Brussels has flagged Brazilian critical mineral projects — including the Colossus rare earths project at Poços de Caldas — as priorities under the Critical Raw Materials Act (CRMA)." },
  { p: "So far, so bullish. But anyone presenting Minas Gerais as a de-risked jurisdiction is not telling you the whole story. The geology is extraordinary. The licences, the courts, the Congress and the communities are another matter entirely — and for a European investor, understanding that second half is what separates a thesis from a headline." },
  { p: "This is the full picture, as of August 2026." },
  { h: "1. Why this geology is genuinely different" },
  { p: "The Brazilian edge is not volume. It's the type of deposit." },
  { p: "The volcanic plateau of Poços de Caldas — a roughly 750 km² alkaline caldera in southern Minas Gerais — hosts massive formations of ionic adsorption clays (IAC): geologically, almost a copy-paste of the southern Chinese deposits in Jiangxi and Guangdong that have supplied virtually all of the world's heavy rare earths for decades. Two Australian-listed developers dominate the district:" },
  { p: "Viridis Mining & Minerals — Project Colossus: 228.6 km² of tenements, a resource of 493 Mt grading ~2,508 ppm TREO, with a magnet rare earth basket (NdPr, Dy, Tb) several times richer than typical Chinese operating grades. Pre-tax NPV estimated around US$1.4 billion; letters of support from export credit agencies including Export Development Canada, Bpifrance and Export Finance Australia; a 50/50 downstream JV (\"Viridion\") with Ionic Rare Earths, pre-qualified for a R$5 billion BNDES/FINEP funding programme." },
  { p: "Meteoric Resources — Project Caldeira: 77 licences over 193 km², a provincial-scale resource above 1 billion tonnes, widely described as the highest-grade IAC deposit known anywhere. An offtake MoU with Ucore Rare Metals will feed 3,000 tpa of mixed rare earth carbonate to the Louisiana Strategic Metals Complex in the US — a facility backed by the US Department of Defense. Caldeira is also the only mining project included in the first phase of the Brazil Climate and Ecological Transformation Investment Platform (BIP) presented at the G20." },
  { p: "Compared to hard rock, IAC deposits offer three structural advantages: free-dig extraction with ordinary excavators (no drilling, no blasting, dramatically lower capex and opex); ambient-temperature leaching with low-cost salts instead of high-temperature roasting with concentrated acids; and no tailings dams — spent clays are chemically inert and can be backfilled into the pits, enabling progressive rehabilitation." },
  { p: "On paper, this is the most capital-efficient, lowest-ESG-risk pathway to Western heavy rare earths supply that exists today. On paper." },
  { h: "2. The licence battle: what actually happened at Poços de Caldas" },
  { p: "Here is the part that rarely makes it into investor decks." },
  { p: "In November 2025, Brazil's Federal Prosecution Service (MPF) sent urgent recommendations to the Minas Gerais environmental bodies (FEAM and the state environmental council, Copam) demanding that the preliminary licence processes for both Colossus and Caldeira be pulled from the voting agenda. The MPF's objections were not procedural quibbles. They included:" },
  { p: "An allegedly breached court injunction (liminar) that prohibited the granting of new mining rights in the region — the MPF flagged possible illegality in proceeding at all;" },
  { p: "Absence of free, prior and informed consultation of Indigenous and Quilombola communities affected by Project Caldeira — a binding requirement under ILO Convention 169, whose omission, in the MPF's reading, blocks the licence from advancing;" },
  { p: "Overlap with a protected area: part of Caldeira falls within the Pedra Branca Ecological Sanctuary APA in Caldas, where municipal law prohibits mining — and the APA's management council had already rejected the request;" },
  { p: "Fragmented licensing: assessing each project individually, the MPF argued, cannot capture the cumulative and synergistic impacts of multiple mines on a sensitive plateau of interconnected aquifers and Atlantic Forest; it demanded a Strategic or Integrated Environmental Assessment for the whole district;" },
  { p: "A governance defect: Copam and its Mining Activities Chamber had been operating with expired mandates and an un-renewed composition since May 2025, undermining the required parity between the state and civil society." },
  { p: "The projects were pulled from the November agenda — then, on 19 December 2025, one day after the MPF sent further recommendations, Copam's mining chamber approved both preliminary licences (LPs) anyway, in a seven-hour virtual session with more than fifty civil-society speakers registered. Colossus passed unanimously; Caldeira with eleven votes in favour." },
  { p: "The approvals did not end the conflict. They relocated it:" },
  { p: "In March 2026, the special rare earths commission of the Poços de Caldas city council began examining an expert report (laudo pericial) forwarded by the Minas Gerais judiciary — including in connection with possible irregular extraction of minerals;" },
  { p: "In May 2026, a March Against Rare Earth Mining took place in Poços de Caldas, followed by a public hearing at the state legislative assembly;" },
  { p: "Local opposition is not fringe: it includes more than 900 agricultural producers (coffee, dairy, grapes, roses), tourism operators tied to the thermal springs economy, councillors of both host municipalities, and NGOs pointing out that some planned pits sit within a few hundred metres of a hospital, an airport and residential neighbourhoods, on an aquifer recharge zone with dozens of natural springs." },
  { p: "The investor takeaway: the preliminary licences exist, but they are contested licences, obtained over an explicit MPF objection referencing a court injunction. The step from LP to installation licence (LI) — the document that actually allows construction and unlocks the mining concession — is where all of these unresolved questions converge. Anyone modelling timelines should treat the licence chain as a live litigation risk, not an administrative formality." },
  { h: "3. The nuclear shadow" },
  { p: "There is a specific historical reason why this region fights so hard." },
  { p: "Poços de Caldas and neighbouring Caldas host Brazil's first uranium mine, operated by state company INB until 1995. The site left roughly 15 million cubic metres of acid-generating exposed rock and some 12,000 tonnes of highly radioactive residue known as \"Torta II\" — a legacy of monazite processing, stored in decaying drums and silos, in a facility never fully decommissioned. Some of the new IAC pits are planned within roughly two kilometres of the INB perimeter. The local fear — that heavy truck traffic, surface vibration and altered groundwater flows could compromise fragile containment structures — is not an abstraction here. It is lived memory." },
  { p: "The regulatory response so far has actually favoured the developers: based on tens of thousands of drill samples, the nuclear authorities found uranium and thorium levels in the mineralised clays far below the radiological exemption threshold, formally exempting the projects from nuclear-grade containment protocols. And the file is actively managed: in June 2026, Brazil's new National Nuclear Safety Authority (ANSN) inspected the pilot plants of both Meteoric and Viridis on the plateau, collecting samples to verify the classification of the facilities. Rare earths can be associated with uranium and thorium, and each deposit must be assessed on its own — but so far, the science has sided with the IAC thesis." },
  { p: "Meteoric, for its part, accepted a binding municipal protocol containing 46 environmental safeguard conditions — including rerouting haul roads by 30 km to avoid the INB perimeter entirely, and progressive backfilling obligations limiting how many pits can be open at once. That is what social licence costs in this district. Price it in." },
  { h: "4. The legislative duel: who will actually govern Brazilian critical minerals?" },
  { p: "While the state-level licence battle plays out, the federal Congress is fighting over the rulebook itself — and this, more than geology, will determine what foreign capital can and cannot do." },
  { p: "The front-runner: PL 2.780/2024. Approved by the Chamber of Deputies in May 2026 and now before the Senate, this bill creates a National Policy for Critical and Strategic Minerals: a federal council, a project registry, criteria for updating the minerals list (supply risk, external dependence, energy transition, defence, economic relevance). Financially, it provides for a R$2 billion guarantee fund and up to R$5 billion in federal tax credits between 2030 and 2034, plus ANM area auctions and exploration permits of up to ten years. The counterpart: companies would pay, for six years, 0.2% of gross operating revenue into the fund and 0.3% for research and innovation — on top of the existing 2% CFEM royalty and ordinary taxation. Legal practitioners following the file praise the guarantee fund (early-stage mining projects in Brazil are notoriously hard to finance) while noting the text still needs adjustment on sensitive points. Its most valuable institutional innovations — low-carbon mining certification, urban mining, production traceability — extend well beyond critical minerals." },
  { p: "The rival: PL 4.443/2025. Sitting in the Senate's Infrastructure Committee, this competing bill creates a different policy architecture, defines priority minerals and establishes \"mineral transformation zones\". The two texts overlap; the Senate will have to merge them or pick one. Duplicated bodies with overlapping mandates would mean higher costs and contradictory decisions — the exact opposite of what investors need." },
  { p: "The core governance question — as Loyanna Menezes, CEO of Abi-Ackel Advogados and head of the firm's regulatory practice, framed it in a recent LexLegal interview — is delimiting competences between the new CIMCE (the National Council for the Industrialisation of Critical and Strategic Minerals) and the ANM, the mining agency: the Council should set strategy and priorities, while the Agency must retain technical assessment, regulatory execution and enforcement. Her prescription for the framework as a whole: regulatory predictability combined with incentives conditioned on industrialisation, and sovereignty protected through objective screening criteria for strategic transactions — not through blanket restrictions on foreign capital." },
  { p: "That last point matters, because blanket restrictions are exactly what a third legislative current proposes. Bills from the interventionist wing of the governing party would put the state back in exclusive command of critical minerals — one proposal would go as far as banning foreign-controlled companies from exploring, mining, processing or selling them. And one bill, introduced in 2026, targets this district by name: it would declare the volcanic plateau of southern Minas Gerais and São Paulo — the Poços de Caldas alkaline massif, defined by coordinates — a National Reserve, suspending research authorisations, mining concessions, environmental licences and tenders in the area until special conditions set by the federal executive are met." },
  { p: "Analysts consider the extreme nationalist clauses unlikely to pass a centrist Congress. But \"unlikely\" is not \"impossible\", and the mere existence of a bill that would freeze the exact polygon where Colossus and Caldeira sit is a risk factor that belongs in every investment committee memo — and a reason to structure through local vehicles with careful ring-fencing." },
  { h: "5. What foreign capital needs to understand about the Brazilian system" },
  { p: "A few structural features of Brazilian mining law that every European boardroom should internalise before term sheets are drafted:" },
  { p: "The mineral belongs to the Union, full stop. Surface ownership is legally separate from the subsoil. Foreign investors participate through a company incorporated in Brazil; transfer of mining rights requires public approval; border strips, Indigenous lands and nuclear-sector substances follow special regimes. Capital buys participation in a project — it never buys the deposit." },
  { p: "The licence chain is sequential and independent. ANM research authorisation → final exploration report → mining concession (with development plan, closure plan) — and, separately, the environmental chain: preliminary licence (LP) → installation licence (LI) → operating licence (LO). The mining title does not open the mine; environmental licences, water use and vegetation suppression each require their own approvals. Delay by the public body never generates automatic authorisation. Projects classified as strategic can obtain priority review through a special environmental licence — but that accelerates analysis, it does not waive studies, consultation or conditions." },
  { p: "The royalty stack. Rare earths are subject to the 2% CFEM on gross revenue; where mining occurs on private land — nearly always, in these agricultural districts — the surface owner is entitled by law to an additional royalty equal to 50% of the CFEM paid to the state. Add the prospective 0.2% + 0.3% levies under PL 2.780/2024, ordinary corporate taxation, and withholding on repatriated dividends, and the top-line burden becomes a central input in any cash-flow model." },
  { p: "Indigenous and traditional communities have their own constitutional protection. Article 231 requires Congressional authorisation, consultation of affected communities and participation in mining results for Indigenous lands; an ordinary administrative licence cannot open those areas. Beyond formally demarcated lands, impacts on traditional communities can trigger free, prior and informed consultation — the exact ground on which the MPF challenged Caldeira. Errors here suspend works and compromise financing." },
  { p: "Title diligence is unforgiving. Registry, easements, indemnities, landowner participation and territorial restrictions must all be verified; the surface may be private, public or community-occupied. In this district, that is not boilerplate — it is where projects have already stumbled." },
  { h: "6. Downstream: where the dispute — and the value — actually concentrates" },
  { p: "Extracting mixed rare earth carbonate is only half the journey. Beneficiation removes impurities and concentrates the payable elements; then come the genuinely hard steps — chemical separation, oxide and metal production, component manufacturing, including the permanent magnets that go into EVs, turbines and electronics. That stretch of the chain is where the technology, the qualified jobs and most of the commercial value sit. A country that exports only concentrate remains dependent on processing done abroad — and a miner selling MREC is typically paid around 70% of the nominal value of the contained oxides, with freight and refining charges implicitly deducted." },
  { p: "Brazil knows this, and is acting on it at three levels:" },
  { p: "Government conditionality. Brasília has been explicit that incentives must be tied to industrialisation on Brazilian soil — subsidised credit and tax benefits linked to research, traceability, technological development and verifiable targets. This is the decisive criterion being written into the new legal framework: without such counterparts, incentives would simply increase extraction without expanding Brazilian industrial capacity." },
  { p: "MagBras. In Lagoa Santa, Minas Gerais, this initiative is developing national technology for manufacturing rare earth permanent magnets — the reference case for how public incentives should be directed, and a signal of where the state wants the chain to land." },
  { p: "Viridion. The Viridis–Ionic joint venture is building separation, refining and recycling capability at Poços de Caldas, pre-qualified for the R$5 billion BNDES/FINEP programme — designed to produce a pre-refined product for Western \"metal gigafactories\" like Ucore's Louisiana complex." },
  { p: "For European chemical engineering firms, equipment makers and research institutions, this is the entry point. Brazil is not asking Europe for capital alone; it is asking for the one thing China will not sell: separation know-how. The overlap between what Brasília demands and what European industry can supply is the single strongest argument for the corridor." },
  { h: "7. What this means for European players" },
  { p: "Pulling the threads together, the European opportunity now looks like this — with the risk lens attached:" },
  { p: "1. Financing and political cover — real, but early. Global Gateway engagement and CRMA prioritisation are genuine and recent. But to date, European financing discussions remain largely at the level of intent, without major formalised commitments. The ECAs (EDC, Bpifrance, EFA) are ahead of Brussels here. First-movers will shape terms; they will also carry the licence-chain risk described above." },
  { p: "2. Offtake — the scarce asset is Western-aligned MREC. Viridis has explicitly chosen to deal only with Western buyers; Meteoric's carbonate is already committed in part to a US defence-backed refinery. European industry — automotive, wind, defence — is competing for the remaining volumes against American counterparties that move faster and pay policy premiums. Waiting for the LI to be granted before negotiating means negotiating from the back of the queue." },
  { p: "3. Technology transfer — the widest door, and the least crowded. The regulatory direction is unambiguous: incentives conditioned on industrialisation, screening instead of blanket restrictions, national content in the processing chain. A European supplier of separation technology, analytical equipment or magnet-making know-how enters this market pushing on an open door — and, unlike a pure financial investor, is largely insulated from the nationalist tail risk, because it is precisely what every version of the legal framework wants more of." },
  { p: "4. Structure for the politics. Brazilian-incorporated vehicles, local partners, careful title diligence, ILO 169 compliance embedded from day one, and community protocols treated as a cost of doing business rather than an ambush. The Meteoric precedent — 46 conditions, 30 km of rerouted roads — is the realistic template." },
  { h: "The bottom line" },
  { p: "Minas Gerais still offers one of the most asymmetric propositions in global critical minerals: world-class ionic-clay geology, a structurally superior ESG profile at the extraction stage, ECA money already at the table, and an EU that has finally shown up in person." },
  { p: "But the honest version of the thesis has three clauses, not one. The geology is settled. The licences are granted but contested — by federal prosecutors, by the courts, by two city councils and by nine hundred farmers with long memories of what the nuclear industry left behind. And the rulebook is being rewritten in real time, in a Senate weighing two overlapping frameworks while a nationalist current proposes freezing this exact plateau by decree." },
  { p: "For anyone making investment or policy decisions, the question is no longer whether Brazil becomes a pillar of the Atlantic rare earths supply chain. It is who governs it, on what conditions, and who is in the room when those conditions are written. Right now, that room is still being furnished. That — not the clay — is the real window." },
  { h: "A note for the non-specialist reader: what rare earths actually are" },
  { p: "Seventeen elements, one misleading name. Rare earth elements (REEs) are a group of 17 chemically similar metals — the fifteen lanthanides plus scandium and yttrium. The name is a historical accident: they are not rare at all. Cerium is more abundant in the Earth's crust than copper; even the scarcest rare earths are more common than gold. What is genuinely rare is finding them concentrated enough to mine economically, and — above all — separating them from each other. Because their atoms are almost identical in size and charge, they occur mixed together in the same minerals and resist the usual methods of chemical separation. The \"rarity\" was never in the ground; it has always been in the chemistry." },
  { p: "The family has two branches — and they are not equal. \"Light\" rare earths (lanthanum, cerium, neodymium, praseodymium) are relatively abundant and mined in several countries. \"Heavy\" rare earths (dysprosium, terbium and others) are far scarcer in exploitable concentrations, command much higher prices, and have historically come almost entirely from the ionic clay deposits of southern China — which is precisely why the geologically analogous clays of Poços de Caldas matter so much." },
  { p: "What they are for. Rare earths are the invisible enablers of modern technology. Their single most strategic use is permanent magnets (neodymium-iron-boron, hardened with dysprosium and terbium for high temperatures): the strongest magnets known, and irreplaceable in electric vehicle motors, wind turbine generators, drones, robotics, hard drives and smartphone components. Beyond magnets, rare earths sit in fighter jet actuators, missile guidance systems, radar and sonar, catalytic converters, oil refining catalysts, glass polishing, lasers, medical imaging, and the phosphors that light up screens. A single EV can contain a kilogram or more of rare earth magnets; an F-35 contains over 400 kg of rare earth materials. There is no energy transition, no modern defence industry and no digital economy without them — and for most of these applications, no commercially viable substitute exists." },
  { p: "Why extraction is a problem. Conventional rare earth mining has one of the heaviest environmental footprints in the minerals industry, for three reasons. First, radioactivity: in most hard-rock deposits, rare earths sit alongside uranium and thorium, so mining and processing generate radioactive residues that must be contained for decades — the \"Torta II\" legacy at Poços de Caldas is exactly this problem, inherited from monazite processing. Second, aggressive chemistry: cracking the ore typically requires roasting at high temperature with concentrated sulphuric or hydrochloric acid, producing toxic gases and vast volumes of acidic, saline wastewater; the district of Baotou in China is ringed by tailings lakes that have become the textbook image of the industry's cost. Third, separation intensity: turning the mixed concentrate into individual pure oxides takes hundreds of sequential solvent-extraction stages, each consuming chemicals and generating effluent. In China's historical ionic-clay mining, a fourth problem emerged: in-situ leaching, where ammonium sulphate was injected directly into hillsides, contaminated groundwater and collapsed slopes across entire counties before being restricted." },
  { p: "This is the context in which the Brazilian ionic-clay projects make their central claim: surface clays with negligible radioactivity, leached in tanks at ambient temperature with recyclable salts, no acid roasting, no tailings dams, and progressive backfilling of the pits. If the claim holds at industrial scale, it would be the cleanest primary rare earth production pathway ever operated. Whether it holds — under Brazilian regulatory scrutiny, over aquifers, next to a nuclear legacy site — is, as this article has argued, exactly what the licence battle at Poços de Caldas is about." },
  { p: "Project figures cited derive from company disclosures and pre-feasibility level studies and are subject to revision. Legislative references reflect the status of proceedings as publicly reported in August 2026. This piece is for informational purposes and does not constitute financial, investment or legal advice." },
];

export default function Rare() {
  const { lang, setLang } = useT();
  const article = getArticleBySlug("rare");
  const desc =
    "Brazil holds the world's second-largest rare earth reserves, but the licences at Poços de Caldas are contested and the rulebook is being rewritten. The full August 2026 picture for European investors.";
  useCanonical("/rare", {
    title: "Rare Earths in Brazil: Geology Settled, Everything Else Contested",
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
          <LangSwitcher to="/rare" />
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
