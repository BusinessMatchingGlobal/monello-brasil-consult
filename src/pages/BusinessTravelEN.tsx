import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useT, type Lang } from "@/lib/i18n";
import { useCanonical } from "@/lib/useCanonical";
import { LangSwitcher } from "@/components/LangSwitcher";
import { BeforeYouProceed } from "@/components/BeforeYouProceed";
import logoBMG from "@/assets/logo-business-matching-global-transparent.png.asset.json";

type Block = { type: "h2"; text: string } | { type: "p"; text: string; italic?: boolean };

export const blocks: Block[] = [
  { type: "h2", text: "There is no such thing as the price of a flight to Brazil" },
  { type: "p", text: "There are at least four. Same seat, same aircraft, same day. The only thing that changes is the door you come in through." },
  { type: "p", text: "There is the published fare, the one you see on the airline's website. There are negotiated and confidential fares, which by definition are not published anywhere. There are corporate contracts, reserved for those who move serious volume. And there are the programs airlines dedicate to small and medium enterprises — no minimum volume required, and almost no SME knows they exist." },
  { type: "p", text: "On the Europe–Brazil corridor, the traveller who pays less is rarely the one who searched harder. It is the one who had access.", italic: true },

  { type: "h2", text: "Where the access comes from" },
  { type: "p", text: "The travel service of Business Matching Global is built on a partnership with CAVALLINODIECI S.r.l., a company within our group that has operated in travel organisation, travel intermediation and air ticketing since 2004 — under its current corporate name since 2008 — holding all licences required by law." },
  { type: "p", text: "One desk, from the first enquiry to the moment you get home: flights, hotels, car rental, transfers, travel insurance." },

  { type: "h2", text: "Negotiated and confidential fares" },
  { type: "p", text: "Twenty years of carrier relationships translate into something concrete: access to negotiated and confidential fares. The name says it all — by definition they cannot be published. You will not find them on OTAs, the online travel agencies where prices are compared. You will not find them on the IBTs, the internet booking tools many companies use to self-book. And you will not find them on the airlines' own websites." },
  { type: "p", text: "Price is the most visible advantage, but not the only one. VFR fares (visiting friends and relatives), for example, typically come with a more generous baggage allowance and more flexible change rules than published fares, on top of a lower price." },

  { type: "h2", text: "We don't sell you a ticket. We build you a journey without friction." },
  { type: "p", text: "Our work does not end at ticketing. It starts well before and closes when you are back home." },
  { type: "p", text: "Before departure we anticipate what can compromise a trip: documents and entry requirements, minimum connecting times, fragile connections, baggage rules, insurance cover matched to the actual itinerary." },
  { type: "p", text: "In transit we manage disruption proactively — cancellations, denied boarding, rerouting: what the industry calls IROPS, irregular operations — to keep the damage to your schedule as small as possible. We do not wait for you to call us from the airport." },

  { type: "h2", text: "Not every aircraft treats you the same way" },
  { type: "p", text: "You can fly business class, in the most comfortable seat on the market, and still land feeling wrecked. Often it isn't the seat. It's the fuselage." },
  { type: "p", text: "An aluminium fuselage can only be pressurised so far: the cabin sits at an equivalent altitude of roughly 2,400 metres, with humidity that on long sectors drops below 10% — drier than many deserts. Less oxygen in your blood, dehydration, headaches, a longer jet lag." },
  { type: "p", text: "A composite fuselage — the Boeing 787 and the Airbus A350 — takes higher pressure differentials and does not corrode. The result: a cabin equivalent to roughly 1,800 metres, humidity reaching 15–20%, lower noise levels, better air filtration, and systems that damp turbulence before you feel it. Ten hours later, the difference is something you feel in your body." },
  { type: "p", text: "This variable appears in no search engine and in no price comparison. On the same route, on the same day, in the same cabin class and at the same fare, the aircraft can be an entirely different machine depending on the flight number." },
  { type: "p", text: "We advise on this too: which aircraft is actually operating, cabin configuration, seat placement, departure timing and connection structure relative to your time zone and to what you have to do on arrival." },
  { type: "p", text: "Because the journey does not end when you land. It ends when you are able to do what you travelled for.", italic: true },

  { type: "h2", text: "Making your money work" },
  { type: "p", text: "Immediately. Access to competitive fares with a wide range of carriers, to a wide range of destinations." },
  { type: "p", text: "If you fly often. When specific carriers and routes recur in your travel pattern, we negotiate dedicated agreements built on your actual flows." },
  { type: "p", text: "If you are an SME without volume. We handle your enrolment in airline corporate programs: schemes that accrue a credit on every flight, redeemable against future tickets. Enrolment does not cancel individual frequent flyer accrual — the two run in parallel." },
  { type: "p", text: "On frequent flyer programs. We work with you here as well: accruing faster where it is possible, and turning points into award tickets you can actually book — the stage where most travellers give up." },

  { type: "h2", text: "Not only for business" },
  { type: "p", text: "The same commitment applies to leisure travel. And not only in the air: we hold negotiated and confidential rates with hotels and car rental companies, and we can identify insurance cover with the best ratio of cost to real protection for your next trip." },

  { type: "h2", text: "A human stays at the centre" },
  { type: "p", text: "There is a person on your file. Always." },
  { type: "p", text: "We are equipping our travel consultants with IVA — Intelligent Vacation Assistant: not a replacement, but an exoskeleton that amplifies the capacity of the people handling your booking. Human in the loop: the technology works backstage, the judgement and the relationship stay with the person who answers you." },

  { type: "h2", text: "Try us, with no commitment" },
  { type: "p", text: "Fill in the form below to put the service to the test. Nothing is binding on your side." },
  { type: "p", text: "The information we ask for may look like a lot. It is exactly what we need — and nothing more — to get the right solution to you on the first proposal: what you want, but also what you are entitled to, based on citizenship, residence and documents. It is the first step towards a genuinely frictionless trip." },
];

export default function BusinessTravelEN({ force }: { force?: Lang } = {}) {
  const { lang, setLang } = useT();
  useCanonical("/BT_en", {
    title: "Business Travel & Travel Management | Business Matching Global",
    description: "A dedicated travel desk: air ticketing with negotiated and confidential fares, hotels, car rental, transfers and travel insurance.",
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (force && lang !== force) setLang(force);
  }, [force, lang, setLang]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed top-0 inset-x-0 z-50 bg-background/90 backdrop-blur border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="flex items-center" aria-label="Business Matching Global">
            <img src={logoBMG.url} alt="Business Matching Global" className="h-10 w-auto" />
          </Link>
          <div className="flex items-center gap-3">
            <LangSwitcher to="/BT" />
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" /> Home
            </Link>
          </div>
        </div>
      </header>

      <main className="container max-w-3xl pt-28 md:pt-36 pb-16 md:pb-24">
        <h1 className="font-display text-4xl md:text-5xl leading-tight mb-6">
          Business Travel &amp; Travel Management
        </h1>
        <article className="space-y-6">
          {blocks.map((b, i) =>
            b.type === "h2" ? (
              <h2 key={i} className="font-display text-2xl md:text-3xl mt-10 mb-2 text-foreground">
                {b.text}
              </h2>
            ) : (
              <p
                key={i}
                className={`text-base md:text-lg leading-relaxed text-muted-foreground text-justify${b.italic ? " italic" : ""}`}
              >
                {b.text}
              </p>
            )
          )}
        </article>

        <div className="mt-12 text-center">
          <Button asChild size="lg" className="rounded-full">
            <Link to="/fly">
              Request a quote
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <BeforeYouProceed lang="en" className="mt-10" />
      </main>
    </div>
  );
}
