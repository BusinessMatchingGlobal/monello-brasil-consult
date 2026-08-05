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

const TITLE = "Voting with Their Feet";

const BACK = {
  it: "Torna alle analisi",
  en: "Back to analysis",
  pt: "Voltar às análises",
} as const;

const body: Block[] = [
  { p: "What the Ceuta crisis actually tells us — once the noise is filtered out" },
  { p: "Some texts are written to persuade. This one is written to verify. In the days following the events at Ceuta, an unusual volume of confident statements circulated across European capitals and social feeds — many of them checkable, and many of them false. What follows is not a defense of any government. It is an exercise in restoring the dataset, because in market intelligence, as in politics, the flows tell the truth long before the press releases do." },
  { h: "Fact one: Ceuta is not in the Schengen Area — and never has been" },
  { p: "The loudest claim of the past week — that migrants entering Ceuta had \"breached Schengen\" and could walk freely to Milan or Helsinki — fails at the first archival check." },
  { p: "When Spain joined the Schengen Agreement in 1991, a specific Declaration on Ceuta and Melilla was annexed to its Accession Act, carving the two North African cities out of the free-movement regime. That special status survives today in Article 41 of the Schengen Borders Code. Concretely: crossing into Ceuta does not grant the right to remain in Spain, to reach the Iberian Peninsula, or to circulate in Europe. Exit controls between Ceuta and the mainland have existed since 1991 — a double filter that predates most of the politicians now discovering the city on a map." },
  { p: "The numbers confirm the architecture worked as designed. Of the roughly 50,000–60,000 people who crossed in less than 24 hours, Spanish authorities report that over 48,000 were returned to Morocco within 48 hours. On 1 August, Commission President von der Leyen — after a call with Commissioners Brunner and Šuica — stated publicly that the vast majority of those who entered had already returned to Morocco thanks to the work of Spanish and Moroccan forces, and that not a single person had reached mainland Spain or the rest of the EU." },
  { p: "One government nevertheless suspended Schengen with Spain for a month, closing maritime and air borders to selective checks. It did so over a border that is not, and has never been, a Schengen border. Two procedural details complete the picture: Brussels noted that the suspension had been announced before any formal notification reached the Commission, and an EU spokesperson publicly asked Rome to explain in what way the Ceuta crisis constituted a security threat — the legal precondition for reinstating internal controls. Brussels also pointed out that the enclave, like Melilla, is an external border where the necessary checks were in place, and that no flows from it had been detected." },
  { p: "The same government then co-promoted, with Denmark, a letter signed by 22 European heads of state and government — addressed to the presidents of the European Council and Commission and to the rotating Irish presidency — calling for an urgent videoconference of interior ministers and a coordinated European response on external borders, returns and trafficking. Set the two moves side by side and let them speak: a unilateral suspension of Schengen announced without notification, and a letter invoking coordination and a united European answer, in the same news cycle. One of the two gestures contradicts the other; the reader may decide which one was meant for Brussels and which one for the domestic evening news." },
  { h: "Fact two: the regularization has nothing to do with the fence" },
  { p: "A second claim linked the crisis to Spain's regularization of roughly 500,000 migrants, presented as an open invitation to cross. The mechanics say otherwise: the Spanish process requires documented prior residence in Spain, a clean criminal record, and a work contract or proof of sufficient means. Someone climbing a fence in July 2026 is, by definition, excluded from it. Spanish authorities also documented a disinformation campaign run by trafficking networks, which misrepresented a Supreme Court ruling on border returns to convince people that reaching Ceuta guaranteed permanence. It does not; the ruling changed procedure, not rights of stay." },
  { p: "For the record, the Frontex figures cited by the Spanish government on irregular entries between 2021 and 2026 rank the routes as follows: Italy at roughly 478,600; the Western Balkans at 340,600; Greece at 259,800; Spain at 234,760. The country that suspended Schengen with Spain has registered roughly double Spain's irregular entries over the period." },
  { p: "It is worth noting how this rebuttal was delivered. While other capitals escalated — summits invoked, borders closed, ambassadors summoned — the Spanish prime minister's answer took the form of a social media post listing those five Frontex figures, introduced by a single remark: solidarity and empathy are optional; respect for European treaties and for the data is not. One side responded with a table, the other with a diplomatic escalation. The reader can decide which of the two feared verification." },
  { h: "Fact three: the Spanish model, imperfect but measurable" },
  { p: "Spain is currently the fastest-growing large economy in the eurozone, expanding at around 3% annually for two consecutive years while Germany and Italy hover near zero. The drivers are documented: record tourism, effective absorption of Next Generation EU funds, low-cost renewable energy, and — the irony of the current polemic — immigration itself, which has sustained employment and consumption in an aging continent. The model has real weaknesses: a severe housing crisis, low productivity per hour worked, residual labor precarity. But \"imperfect and growing at 3%\" is a different sentence from the one being written about Spain this week." },
  { h: "Fact four: Morocco is not an eldorado — 60,000 people just certified it" },
  { p: "Here the crisis becomes genuinely instructive, because it demolishes not one narrative but two." },
  { p: "Morocco has spent years marketing itself as Africa's success story: GDP growth above 3% annually, cumulative expansion of 22% since 2019, an export industry approaching Italy's automotive output, high-speed rail from Kenitra to Marrakech, and the 2030 World Cup — co-hosted with Spain and Portugal — complete with what will be the largest stadium in the world." },
  { p: "The other ledger: roughly two-thirds of Moroccan employment is informal — 67.6% per the HCP/ILO employment satellite account, over 67% per the OECD, up to 77% in other estimates. Unemployment among 15-to-24-year-olds exceeded 36% in 2024–2025 on HCP data; under the stricter methodology adopted in 2026 the headline rate is 29%, but the composite measure of youth labor underutilization reaches 45%. Female labor-force participation has fallen from around 28% in 2000 to 19% — one of the widest gaps globally. Growth is concentrated in capital-intensive sectors controlled largely by foreign multinationals, absorbing investment while employing few and redistributing less. The GenZ 212 protest movement condensed the imbalance into five words: we want hospitals, not stadiums. The OECD places Morocco near the top of the global ranking of countries by workers leaving." },
  { p: "This is the context in which tens of thousands of Moroccans — not Sahelian transit migrants, but Moroccans — rushed a fence on their king's Throne Day. The toll is documented: at least 67 bodies recovered by divers, the Guardia Civil and Spanish maritime rescue among those who tried to swim around the Tarajal breakwater, now closed off by a 500-meter floating barrier. No consultancy report, no sovereign marketing campaign, no infrastructure ribbon-cutting can outweigh that data point. When people risk their lives on razor wire and open water, they are issuing a country rating more honest than anything a rating agency publishes." },
  { p: "They voted with their feet. It is the one ballot that cannot be spun." },
  { h: "Fact five: the accusers' own ledger" },
  { p: "The governments loudest in denouncing Madrid deserve the same factual audit they demand of others." },
  { p: "Italy, in 2025, restricted its iure sanguinis citizenship — by decree, signed by the same foreign minister now attacking Spain's regularization — cutting off most South American descendants of Italian emigrants beyond children and grandchildren of the Italy-born. The same political area now watches a popular legislative initiative called \"Remigration and Reconquest\" arrive in Parliament with 150,000 signatures: a text that defines remigration as the assisted return of foreigners legally resident in Italy, and that — in a twist worth savoring — simultaneously proposes state support for the return of Italian descendants abroad." },
  { p: "Read the two policies together. The descendants who spent years queuing at consulates to reclaim Italian citizenship were voting with their feet toward Italy — and the door was closed on them, booked as a consular cost. The foreigners who voted with their feet toward Italy and built regular lives there are now, in the most radical proposal on the table, invited to leave. A diaspora written off as a liability; a resident population redefined as a surplus. Whatever one's politics, the accounting is not coherent — and incoherent accounting is a poor pulpit from which to lecture Madrid." },
  { h: "The method behind the noise" },
  { p: "I have written before about firms crossing the Ponte da Amizade into Paraguay, voting with their feet against the Custo Brasil while official narratives insisted everything was fine. The Ceuta crisis is the same phenomenon at human scale, with three flows delivering three verdicts: Brazilian companies against their cost structure, Moroccan citizens against their two-speed miracle, Italian descendants toward a homeland that stopped answering." },
  { p: "In every case, power responded to the feet with rhetoric instead of reform. And in every case, the flows were right." },
  { h: "Update — 5 August 2026: what the file has added in three days" },
  { p: "This piece was published on 2 August. We leave the five facts above untouched — none has required correction — and record here, dated, what the public record has added since." },
  { p: "The numbers converged. Italy's leading business daily, Il Sole 24 Ore, ran a field report from Tangier reading the same instruments this analysis used: official youth unemployment above 30% among under-24s, an informal economy worth about a third of GDP and over 60% of the workforce, and the dualism between Tanger Med's boom and the squares of Gen Z — what an Atlantic Council analyst quoted by the paper calls \"two Moroccos\", and what fact four above called a two-speed miracle. The same edition added a number worth adopting as a sixth fact, from ISTAT: arrivals from Morocco to Italy grew almost 50% in 2025 — 36,000 people, the second nationality by entries, counted by official statistics. The government loudest about an \"invasion\" at Ceuta presides over a country where Moroccans are the third national community (412,000 residents), with 115,569 students in Italian schools and 27,000 acquisitions of Italian citizenship in 2024 alone. Updated local estimates, meanwhile, size the original surge at nearly 80,000 attempted entries per Ceuta's own president, with between 3,000 and 5,000 people still in the city four days on — and the rest returned." },
  { p: "The fuse has a file now. Spain's Audiencia Nacional opened an investigation into whether criminal networks, traffickers or a coordinated strategy with political aims lie behind the social media campaign that preceded the rush — the accounts telling tens of thousands that the border was open and whoever crossed would stay. Rabat blamed the \"disinformation mafias\"; as of 5 August, 25 people stand indicted for organizing crossings and transport. A new mass-entry call is already circulating for 15 August (\"that day everything will make sense\"), so far unconfirmed by Madrid or Rabat. Analyst Nathalie Tocci (IAI / Johns Hopkins SAIS), speaking on Sky TG24, offered a three-actor reading worth recording under her name: third states weaponizing migration for leverage, as Tunisia, Libyan militias and Turkey have done before Morocco; global actors — the origins of much of the circulating disinformation tracing back, in her assessment, partly to Moscow, partly to the American MAGA world, partly to Israel — aiming to divide Europe starting from Sánchez's Spain; and the domestic far right riding what she calls a \"fake crisis\", since 70,000 people who enter one day and leave the next are not a migration crisis. Her sharpest point is a logic bomb this piece is happy to adopt: reaching mainland Spain from Ceuta is harder than the direct crossing from Morocco, because exit controls from the enclave are stricter. Whoever cries invasion-via-Ceuta is describing the route no rational migrant would choose." },
  { p: "The street answered in Spanish. In Ceuta itself, hundreds of residents demonstrated against a rally by the Spanish far-right movement Núcleo Nacional; the next day a protest born of neighborhood associations split when the agitator Vito Quiles arrived with Save Europe Act — co-founded by the Austrian Martin Sellner, with Generation Identity activists traveled in from Germany. Their banner read \"Sánchez must go, Spain needs remigration\". It was in English. The Ceutans contesting it answered in Spanish. A banner's addressee can be deduced from its language: whoever writes in English in a Spanish city is speaking to the camera and the algorithm, not to the city — which, being roughly half of Moroccan and Muslim origin, rejected its \"saviors\" in its own tongue. The external actors, this time, came in person; they remain the only ones in this story to have crossed more borders than the migrants." },
  { p: "Three days on, the pattern of the original piece has only sharpened: the flows keep telling the truth, and the loudest voices keep avoiding the file. The only \"invasion\" documented on the record at Ceuta was the invasion of the posts." },
  { p: "Facts and figures are drawn from public sources: the Schengen Borders Code and Spain's 1991 Accession Act; the Frontex entry statistics 2021–2026 as cited by the Spanish government; statements by the European Commission and the Spanish government (July–August 2026); OECD, HCP and World Bank data on Morocco; the text of the Italian popular initiative deposited at the Chamber of Deputies on 30 June 2026; ISMU Foundation and Italian Labour Ministry reports on the Moroccan community in Italy; ISTAT 2025 migration data; court records and reporting on the Audiencia Nacional investigation and the Ceuta demonstrations (August 2026); Nathalie Tocci interview, Sky TG24 \"Timeline\", 5 August 2026." },
  { p: "Business Matching Global — market intelligence and business orchestration, Europe–Brazil corridor. Our work rests on rigorous fact- and data-checking, because — as the maxim attributed to W. Edwards Deming, the statistician who taught quality to Japanese industry, has it — without data, you're just another person with an opinion. We'd rather be just another person with the data." },
];

export default function Ceuta() {
  const { lang, setLang } = useT();
  const article = getArticleBySlug("ceuta");
  const desc =
    "What the Ceuta crisis actually tells us: Schengen's special status, Frontex data, Morocco's two-speed economy and the migration flows that verify what press releases deny.";
  useCanonical("/ceuta", {
    title: `${TITLE} — Business Matching Global`,
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
          <LangSwitcher to="/ceuta" />
        </div>
        <article className="prose-invert">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4">{TITLE}</h1>
          <p className="text-xs text-foreground/70 mb-2">#CustoBrasil — Business Matching Global</p>
          <p className="text-xs text-foreground/70 mb-10 tabular-nums">2026-08-02 — updated 2026-08-05</p>
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
