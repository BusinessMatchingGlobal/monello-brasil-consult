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

const TITLE = "Ten-Fold, and Still Not Attacking: The Embraer Lesson in Constraint Capital";

const BACK = {
  it: "Torna alle analisi",
  en: "Back to analysis",
  pt: "Voltar às análises",
} as const;

const body: Block[] = [
  { p: "#CustoBrasil Series — Structural Intelligence on the Brazil Cost Equation" },
  { p: "A company's share price rises roughly ten-fold in five years. Its order backlog hits a record $34.5 billion. The Economist dedicates a feature to it under the headline \"Forget Airbus and Boeing\" — the kind of coverage CEOs spend careers chasing." },
  { p: "And the boldest thing its chief executive says, when asked whether he will now attack the duopoly?" },
  { p: "That he is very comfortable with the situation he has." },
  { p: "That answer — reported by The Economist on July 30th — is the most Brazilian sentence in the entire piece, and almost nobody will read it that way. This article is about why they should." },
  { h: "What The Economist Documented" },
  { p: "Strip the story to its structural facts, and the picture is remarkable. Embraer, the world's third-largest maker of passenger jets, delivered 141 aircraft in 2021 and may reach 255 this year. Since early 2021 its stock has outperformed both Airbus and Boeing by an order of magnitude. Demand is surging simultaneously across all three of its lines: commercial jets, executive aviation — where the Phenom 300 has led its class for fourteen consecutive years — and defense, where global rearmament keeps lifting KC-390 orders." },
  { p: "The engine behind the commercial surge is time. Airlines ordering a narrow-body from Airbus or Boeing today wait eight to ten years, against a combined duopoly backlog of some 16,000 aircraft. Embraer's E2 delivers in under two. In a supply-constrained market, delivery speed is the product — and Embraer forecasts a market of 8,500 aircraft in its segment over two decades, where its only direct size competitor is the A220. As CEO Francisco Gomes Neto observes, even half that market at half the orders would fill Embraer's production lines for twenty years." },
  { p: "Buried in the piece is a detail worth the whole read for anyone who studies market architecture: the smaller E175 is currently the only aircraft in production that US regional airlines can operate at all, because scope clauses in pilot-union agreements cap the size of aircraft regional carriers may fly. A labor-relations artifact functions as a regulatory moat worth billions. Readers of this series will recognize the pattern instantly — it is the same lesson we keep extracting from Brazil: the rulebook is the market, and whoever reads it structurally, rather than complaining about it, owns the segment." },
  { h: "The Bombardier Ghost" },
  { p: "So why not attack? The Economist lays out the temptation honestly: Airbus and Boeing will not replace their core narrow-bodies until late in the 2030s, and neither has much incentive to invest heavily while current models sell — a genuine opening. Boeing itself sizes the total market at 36,000 jets over two decades. A Bank of America analyst frames the leap as taking Embraer to the next level." },
  { p: "But the counter-case has a name, and the name is Bombardier. The Canadian rival's assault on the duopoly nearly bankrupted it and ended with its program sold to Airbus for a nominal sum in 2018 — becoming, with brutal irony, the very A220 that now competes against the E2. Airbus chief Guillaume Faury has publicly warned Embraer to \"think twice\". A new large jet would cost on the order of $10 billion, which — per UBS analysis cited in the piece — Embraer could not carry alone: it would need engine-makers, suppliers, customers and outside investors as partners. Internally, the question reportedly divides opinion." },
  { h: "The Custo Brasil Reading" },
  { p: "Here is what a São Paulo analyst desk will not tell you, and what this series exists to say: Gomes Neto's restraint is not timidity. It is the same capital discipline that built the company — the Custo Brasil operating as an inherited instinct." },
  { p: "Bombardier could gamble because it grew up inside a system of patient sovereign support and deep capital markets that would catch it if it fell. It fell anyway. Embraer grew up where capital is expensive, the sovereign customer is thin, and a single failed program means death rather than restructuring. A company forged under that constraint does not bet the firm on a $10 billion frontal assault — it compounds: twenty new aircraft certified in roughly twenty years, each program closing inside survivable risk. That certification cadence, which the CEO cites as proof Embraer could build the bigger jet, is better read as proof of why it hasn't needed to." },
  { p: "The ten-fold share price is the market grading exactly this behavior. Investors are not paying for the promise of a duopoly war. They are paying for the only aircraft manufacturer in the world whose growth story requires no heroic assumptions — just delivery slots the giants cannot offer, a moat written into other people's labor contracts, and a management culture structurally incapable of Bombardier's mistake." },
  { p: "For the European stakeholders this desk serves, the takeaway is practical. When you evaluate a Brazilian counterpart — a supplier, a target, a partner — and find them expanding more slowly than their order book would justify, do not automatically read it as lack of ambition. You may be looking at the discipline that the Custo Brasil breeds into its survivors: the ones still standing are, by selection, the ones who never bet what they could not lose." },
  { p: "The duopoly question will stay open for years, and Embraer has the luxury of deciding late. The more interesting question is ours: how many other Brazilian companies are currently being underestimated for the very trait that makes them durable?" },
  { p: "Source: The Economist, \"Forget Airbus and Boeing. Embraer is soaring\", July 30th 2026; Embraer Q2 2026 disclosures." },
];

export default function Economist() {
  const { lang, setLang } = useT();
  const article = getArticleBySlug("economist");
  const desc =
    "Embraer is up ten-fold, its backlog is at $34.5bn, and The Economist says 'Forget Airbus and Boeing'. Why the CEO still refuses to attack the duopoly — and what that says about Brazilian capital discipline.";
  useCanonical("/economist", {
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
          <LangSwitcher to="/economist" />
        </div>
        <article className="prose-invert">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4">{TITLE}</h1>
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
