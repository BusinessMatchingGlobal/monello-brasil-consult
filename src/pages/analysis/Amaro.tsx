import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useT } from "@/lib/i18n";
import { getArticleBySlug } from "@/lib/analysis";
import { AnalysisFooter } from "@/components/AnalysisFooter";
import { useCanonical } from "@/lib/useCanonical";
import { ShareBlock } from "@/components/ShareBlock";
import { useEffect } from "react";
import { LangSwitcher } from "@/components/LangSwitcher";

type Block = { h: string } | { p: string };

const body: Block[] = [
  { h: "Before the red carpet, there was a house made of straw" },
  { p: "Rolim Adolfo Amaro was born in 1942 in Pereira Barreto, deep in the interior of São Paulo state, in a sapé house with no electricity and no bathroom, the eldest of five children. He left school around the seventh grade to help pay the family's bills — mechanic's assistant, apprentice bookkeeper, bank office boy. At seventeen he earned his pilot's license; at twenty-one he was flying two-seat Cessnas for an air-taxi outfit. He hauled cargo across the roadless Amazon, built and sold his first small airline, and in 1968 entered a modest air-taxi company from Marília as a minority partner: Táxi Aéreo Marília. Four years later he controlled it. The world would come to know it by its initials — TAM — and to know him simply as Comandante Rolim." },
  { p: "What he built from that acronym is Brazilian business history: the radar-equipped Cessnas that professionalized regional flying in the seventies, the Fokker F-27s connecting the central airports of São Paulo and Rio in the eighties, the Fokker 100 jets of 1990 that brought high-standard aviation to routes nobody thought deserved it, and finally the airline that would overtake giants. He died the way pilots fear and legends acquire their final shape — a helicopter accident on July 8, 2001, at fifty-eight. His wake was held in TAM's hangar at Congonhas, on the same tarmac where the red carpet lay. A quarter of a century later, Brazilian business schools still teach him, an airport bears his name, and a state honor created in 2025 carries his title. This publication studies him for a narrower reason: no one in the history of this corridor understood better the costs that never appear on an invoice." },
  { h: "The first intuition: the carpet" },
  { p: "The story has been told many times, ours included: a humble mat at the foot of the boarding stairs, placed so passengers could wipe their shoes, and an owner who looked at it and saw something else entirely. From 1989, the red carpet at the aircraft door — often with Rolim himself standing beside it, shaking hands, handing out sweets — became the most recognizable commercial symbol in Brazilian aviation." },
  { p: "The insight underneath is what matters. In the Brazil of that era — a closed economy where, as one of his biographers put it, the consumer was widely treated as an unavoidable nuisance — Rolim decided the passenger was the point. His stated credo was disarmingly simple: treat the customer the way you would want to be treated. The carpet was not decoration; it was the visible tip of an operating system. It told the passenger you are received, not processed — and, just as deliberately, it told every TAM employee watching what standard the boss expected. A symbol that disciplines the inside while it seduces the outside is not marketing spend. It is culture, purchased at the price of a carpet." },
  { h: "The second intuition: the word of mouth" },
  { p: "Rolim's second insight was about media. Advertising you buy; recommendation you earn — and in a relationship business, the second compounds while the first depreciates. He engineered the airline so that the passenger did the advertising: the carpet, the sweets, the service standard, and above all the radical accessibility of the top. In 1991 he created a service whose name needs no explanation — Fale com o Presidente, \"Talk to the President\": a direct line through which any passenger could reach him. He was famous for repeating that the customer never interrupts the work, because the customer is the work." },
  { p: "Read as strategy rather than sentiment, this is precise economics: every resolved complaint converted a detractor into a storyteller, and every story sold seats no media budget could reach. TAM grew into Brazil's leading carrier while competing against larger, older, better-connected rivals. The word of mouth was the distribution network." },
  { h: "The seven commandments" },
  { p: "In 1997 he distilled his doctrine into the Sete Mandamentos — seven commandments that guided TAM's management and are quoted in Brazilian boardrooms to this day. Listed bare, half of them read as the opposite of what they meant. They deserve explaining, one by one — because the tension between them is the doctrine." },
  { p: "1. Nothing replaces profit. The most misread of the seven: placed first by the man of the red carpet, it sounds like cynicism, and it is the opposite. Without profit, nothing else exists — not the service, not the safety, not the salaries, not the carpet itself. Profit is not the goal opposed to the customer; it is the condition that allows you to serve him tomorrow. A loss-making airline that pampers its passengers is merely choosing the date of its own funeral." },
  { p: "2. In pursuit of the perfect, the good does not get done. Perfectionism as a form of paralysis. Whoever waits for the flawless solution never delivers the good one that was needed today — and meanwhile a competitor, with something mediocre but existing, has taken the market. Execute the good now; improve it after." },
  { p: "3. More important than the customer is safety. The one limit to \"the customer is king.\" The passenger is right about everything — schedules, service, courtesy — except one thing: when safety says no, it is no, however loudly he protests and whatever it costs. It is also a moral hierarchy: his life outranks his satisfaction." },
  { p: "4. The easiest way to make money is to stop losing it. Before chasing new revenue, plug the leaks — waste, inefficiency, repeated errors. But the deeper reading, the one that makes Rolim Rolim, is that the largest losses are the invisible ones: the passenger lost forever after a badly handled cancellation appears on no balance sheet, yet is the most expensive loss line an airline has. Stop losing applies to both ledgers — the one the accountant sees and the one he doesn't." },
  { p: "5. Think hard before acting. The counterweight to commandment 2: execute fast, decide slowly. Structural decisions — a fleet, a route, an acquisition — are weighed at length, because in aviation a strategic mistake is paid for over a decade. Together, 2 and 5 form the pairing: slow deliberation, rapid execution. Never the reverse." },
  { p: "6. Humility is fundamental. From a man who started in a straw house, this was not rhetoric. It meant three operational things: listen to the front line (a president who answers passengers' phone calls is humility institutionalized); never believe you have arrived — arrogance is the antechamber of decline, and aviation's graveyard is full of giants who died of pride; and admit mistakes quickly, which is the precondition of commandment 4." },
  { p: "7. Whoever lacks the intelligence to create must have the courage to copy. The most countercultural: a demolition of creative ego. If someone, anywhere, has already solved your problem better than you, copying them is not shame — it is duty to the company. Courage is the operative word: copying requires admitting someone else was better, which managerial pride rarely survives. The red carpet itself, after all, began as someone else's humble gesture, copied upward. Readers of these notes will recognize the thesis: it is method transfer, stated thirty years early — the best existing method is adopted and adapted, never reinvented out of vanity." },
  { p: "Read as a sequence, the seven form a system with a deliberate tension: the first four are economic hardness, the last three are discipline of character. Notice, too, what the list is not: a service romantic's manifesto. The man of the red carpet put profit first, safety above the customer, and pragmatic copying above creative vanity. That is precisely why the carpet worked — it was never charity. It was the highest-return line in the budget, run by someone who could count. The carpet lies exactly where the two halves of the list touch." },
  { h: "Hard costs, soft costs — and the days when things break" },
  { p: "And here is the lesson this corridor most needs. Every airline manager can read hard costs: fuel, leases, maintenance, crew. Rolim's rarer gift was pricing the soft ones — the impression of the first three seconds, the passenger lost forever after a badly handled cancellation, the reputation that decides whether a delay is forgiven or fatal. His fourth commandment — stop losing — applies to both ledgers, and he knew the invisible one was where fortunes actually leaked. That is why the moments other airlines treated as operational failures, he treated as the product's most important scene: a disruption is the one moment a passenger discovers what the company is really selling. Handled with the carpet's logic, it creates the fiercest loyalty there is; handled by a queue, it creates the stories that empty aircraft." },
  { p: "Twenty-five years after Congonhas fell silent for his wake, the industry has optimized nearly everything Rolim's era left unoptimized — except the thing he optimized first. The hard costs have never been better managed. The soft ones have never been more abandoned." },
  { p: "Which is, perhaps, the most contemporary thing about a man born in a straw house: he understood that in aviation, as in every relationship business, the profit commandment and the carpet are not rivals. One funds the other. He wrote them into the same list." },
  { h: "Where the memory lives" },
  { p: "Rolim's memory has its custodians. The Museu Asas de um Sonho, born of his own passion for aviation history, remains the national reference for preserving Brazil's aeronautical heritage — and in 2025 the State of São Paulo formalized a state honor bearing his name, the Asas de Um Sonho – Mérito Comandante Rolim Adolfo Amaro, awarded to those who carry forward the values he stood for. The Fundação Eductam, which he created in life, channeled his other conviction — scholarships and humanitarian work for those who, like the boy from Pereira Barreto, started with nothing. An airport in Jundiaí carries his name; a chair of the Brazilian Academy of Events and Tourism carries his patronage." },
  { p: "Institutions keep the memory. The method, though, is kept the only way methods ever are: by whoever still practices it. Twenty-five years on, that second form of custody remains open to anyone in this industry willing to apply for it." },
];

const BACK = {
  it: "Torna alle analisi",
  en: "Back to analysis",
  pt: "Voltar às análises",
} as const;

export default function Amaro() {
  const { lang } = useT();
  const article = getArticleBySlug("amaro");
  const desc =
    "Rolim Adolfo Amaro, founder of TAM, the red carpet, and the seven commandments: how a commander born in a straw house priced the costs accountants never see.";
  useCanonical("/amaro", {
    title: `${article?.title[lang] ?? "Amaro"} — Business Matching Global`,
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
          <LangSwitcher to="/amaro" />
        </div>
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
          <ShareBlock title={article?.title[lang] ?? "Amaro"} />
        </article>
        <AnalysisFooter />
      </div>
    </main>
  );
}
