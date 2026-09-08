/**
 * "Situation" pages — entry points by where the client already stands with Brazil.
 * English lives at the root, Italian under /it. Portuguese is prepared but not
 * published: no machine translation, the PT copy will be added when supplied.
 */

export type SituationLang = "en" | "it" | "pt";

export type SituationBullet = { text: string; service?: string };

export type SituationSection = {
  kicker: string;
  title: string;
  body?: string[];
  bullets?: SituationBullet[];
  ordered?: boolean;
};

export type SituationContent = {
  slug: string;
  navLabel: string;
  cardTitle: string;
  cardText: string;
  title: string;
  description: string;
  kicker: string;
  heroTitle: string;
  heroBody: string;
  sections: SituationSection[];
  start: { kicker: string; title: string; body: string };
  cta: { text: string; button: string; subject: string };
};

export type SituationKey = "already-in-brazil" | "back-to-brazil";

export type Situation = {
  key: SituationKey;
  content: Partial<Record<SituationLang, SituationContent>>;
};

export const SITUATIONS: Situation[] = [
  {
    key: "already-in-brazil",
    content: {
      en: {
        slug: "/already-in-brazil",
        navLabel: "Already in Brazil",
        cardTitle: "Already in Brazil",
        cardText: "An independent point of view for head office.",
        title:
          "Independent second opinion for companies already in Brazil | Business Matching Global",
        description:
          "Independent verification of distributors and partners, field benchmarks, uncovered regions, regulatory monitoring. For European head offices already present in Brazil.",
        kicker: "Already in Brazil",
        heroTitle: "You are already in Brazil. You need one more point of view.",
        heroBody:
          "A local structure — distributor, agent, subsidiary or plant — sees the market from where it stands. Head office needs, every now and then, an independent reading. Not to check on the people on the ground: to decide better.",
        sections: [
          {
            kicker: "The problem",
            title: "Present does not mean covered",
            body: [
              "Brazil is a continent. Being in São Paulo is not being in Minas Gerais, the South or the Northeast. A distributor active for years may cover three states and ignore twenty. A regulation changes and the local team, busy with the day-to-day, notices once it is already in force. A new product line sits still because nobody on the ground has time to study it. These are normal situations, nobody's fault: the physiological limits of whoever is inside the market every day.",
            ],
          },
          {
            kicker: "What we do",
            title: "Data collected in the field, not reported",
            bullets: [
              {
                text: "Independent verification of current counterparts — solidity, litigation, real territorial coverage, overlaps with other brands.",
                service: "Supplier Check / Company Check",
              },
              {
                text: "Price and positioning benchmark — how your product is displayed, priced and offered on the shelf and online, observed directly from the Brazilian customer's side (quote request, response time, after-sales service).",
                service: "Competitor Snapshot",
              },
              {
                text: "Uncovered regions and channels — where your product could sell and does not reach today.",
                service: "Buyer Finder",
              },
              {
                text: "Ongoing monitoring — regulation, tenders, moves by competitors and retail chains, with periodic briefings in your language.",
                service: "BMG Intelligence Desk",
              },
              {
                text: "Due diligence on new agreements — partners, acquisitions, licences, with local professionals selected case by case and confidentiality secured by a bilateral agreement.",
                service: "Enhanced Due Diligence",
              },
              {
                text: "Local operational support — follow-up with counterparts, missions, B2B agendas, trade fairs and events, for those without a local structure or with a small one.",
                service: "Local Business Support",
              },
              {
                text: "Extension to neighbouring countries — Paraguay, Uruguay, Argentina, Guyana, with the same network and the same point of contact.",
              },
            ],
          },
        ],
        start: {
          kicker: "Where to start",
          title: "One partner only, the one that worries you most",
          body: "The first assignment is usually the independent verification of a single counterpart: who they really are, what they do in the territory, what they say about you. Limited scope, fixed fee stated upfront, written result. From there you decide whether to widen.",
        },
        cta: {
          text: "Write us a few lines about your context: we reply in writing with a first assessment, no commitment.",
          button: "Request a first assessment",
          subject: "Already in Brazil",
        },
      },
      it: {
        slug: "/gia-in-brasile",
        navLabel: "Già in Brasile",
        cardTitle: "Siete già in Brasile",
        cardText: "Un punto di vista indipendente per la casa madre.",
        title:
          "Seconda opinione indipendente per chi è già in Brasile | Business Matching Global",
        description:
          "Verifica indipendente di distributori e partner, benchmark sul campo, regioni scoperte, monitoraggio normativo. Per case madri europee già presenti in Brasile.",
        kicker: "Già in Brasile",
        heroTitle: "Siete già in Brasile. Vi serve un punto di vista in più.",
        heroBody:
          "Una struttura locale — distributore, agente, filiale o stabilimento — vede il mercato dal suo punto di osservazione. La casa madre ha bisogno, ogni tanto, di una lettura indipendente. Non per controllare chi lavora sul posto: per decidere meglio.",
        sections: [
          {
            kicker: "Il problema",
            title: "Presenti non vuol dire coperti",
            body: [
              "Il Brasile è un continente. Una presenza a San Paolo non è una presenza nel Minas Gerais, nel Sud o nel Nordeste. Un distributore attivo da anni può coprire tre stati e ignorarne venti. Una normativa cambia e la struttura locale, presa dal quotidiano, se ne accorge quando è già in vigore. Una linea di prodotto nuova resta ferma perché nessuno sul posto ha il tempo di studiarla. Sono situazioni normali, non colpe di nessuno: sono i limiti fisiologici di chi è dentro il mercato tutti i giorni.",
            ],
          },
          {
            kicker: "Cosa facciamo",
            title: "Dati rilevati sul campo, non riferiti",
            bullets: [
              {
                text: "Verifica indipendente delle controparti attuali — solidità, contenziosi, reale copertura del territorio, sovrapposizioni con altri marchi.",
                service: "Supplier Check / Company Check",
              },
              {
                text: "Benchmark di prezzo e posizionamento — come il vostro prodotto è esposto, prezzato e proposto sullo scaffale e online, rilevato direttamente dal lato del cliente brasiliano (richiesta di preventivo, tempi di risposta, assistenza post-vendita).",
                service: "Competitor Snapshot",
              },
              {
                text: "Regioni e canali scoperti — dove il vostro prodotto potrebbe vendere e oggi non arriva.",
                service: "Buyer Finder",
              },
              {
                text: "Monitoraggio continuativo — normativa, gare, mosse dei concorrenti e delle catene distributive, con briefing periodico nella vostra lingua.",
                service: "BMG Intelligence Desk",
              },
              {
                text: "Due diligence su nuovi accordi — partner, acquisizioni, licenze, con professionisti locali selezionati caso per caso e riservatezza garantita da accordo bilaterale.",
                service: "Enhanced Due Diligence",
              },
              {
                text: "Supporto operativo locale — follow-up con le controparti, missioni, agende B2B, fiere ed eventi, per chi non ha una struttura propria o l'ha piccola.",
                service: "Local Business Support",
              },
              {
                text: "Estensione ai paesi vicini — Paraguay, Uruguay, Argentina, Guyana, con la stessa rete e lo stesso interlocutore.",
              },
            ],
          },
        ],
        start: {
          kicker: "Da dove si comincia",
          title: "Un solo partner, quello che vi dà più pensieri",
          body: "Il primo incarico, di solito, è la verifica indipendente di una sola controparte: chi è davvero, cosa fa sul territorio, cosa dice di voi. Incarico circoscritto, costo fisso dichiarato in anticipo, risultato scritto. Da lì si decide se allargare.",
        },
        cta: {
          text: "Scriveteci due righe sul contesto: rispondiamo per iscritto con una prima valutazione, senza impegno.",
          button: "Richiedi una prima valutazione",
          subject: "Già in Brasile",
        },
      },
    },
  },
  {
    key: "back-to-brazil",
    content: {
      en: {
        slug: "/back-to-brazil",
        navLabel: "Back to Brazil",
        cardTitle: "Tried before",
        cardText: "What is left, who owns it, how to restart.",
        title: "Tried Brazil before? Assessment and restart | Business Matching Global",
        description:
          "Dormant local company, authorisations in someone else's name, a partner who went solo, idle equipment: assessing what is left and the viable ways to restart in Brazil.",
        kicker: "Back to Brazil",
        heroTitle: "You have tried Brazil before. You do not start from scratch.",
        heroBody:
          "A project launched years ago and stuck one step from the finish line is the situation we meet more often than people think. Before starting again, it is worth understanding what is left and who owns it.",
        sections: [
          {
            kicker: "Typical situations",
            title: "Stuck one step from the finish line",
            bullets: [
              { text: "A local company incorporated and never operational." },
              { text: "An authorisation or registration obtained, but in someone else's name." },
              { text: "A partner who learned the trade and now prefers to go alone." },
              { text: "Machinery, trademarks, patents, contracts waiting for a second chance." },
              { text: "A distributor gone quiet, a dispute never closed, an investment never recovered." },
            ],
          },
          {
            kicker: "What we do",
            title: "Assessment first, then the viable routes",
            ordered: true,
            bullets: [
              {
                text: "Assessment of what is left — the company (status, debts, pending obligations), authorisations and registrations (in whose name, whether transferable), trademarks and patents (what is filed in Brazil and Mercosur, what is not), assets and contracts. With local professionals engaged case by case, under a confidentiality agreement.",
              },
              {
                text: "The routes that actually work — know-how licensing, contract manufacturing, a new partnership, direct restart, or a written approach to the former counterpart to see whether the relationship can be recovered on different terms. Each route with pros, cons and costs, in writing.",
              },
              {
                text: "Subsidised finance for the restart — Italian and European instruments dedicated to Latin America, checked with a specialised partner before any step.",
              },
              {
                text: "Execution — selection and verification of new counterparts, deal structure with the lawyers, local presence during the start-up phase.",
              },
            ],
          },
        ],
        start: {
          kicker: "Where to start",
          title: "The assessment",
          body: "The first assignment is the assessment of what is left and who formally owns it, because every viable route depends on it. Defined scope, fixed fee, written result in English or Italian.",
        },
        cta: {
          text: "Tell us in a few lines where the project stopped: we reply in writing with a first assessment, no commitment.",
          button: "Request a first assessment",
          subject: "Back to Brazil",
        },
      },
      it: {
        slug: "/riprendere-il-brasile",
        navLabel: "Riprendere il Brasile",
        cardTitle: "Ci avete già provato",
        cardText: "Cosa resta, chi ne è titolare, come si riparte.",
        title: "Avete già provato il Brasile? Ricognizione e ripartenza | Business Matching Global",
        description:
          "Società locale inattiva, autorizzazioni intestate ad altri, partner che ha fatto da solo, impianti fermi: ricognizione di ciò che resta e vie percorribili per ripartire in Brasile.",
        kicker: "Riprendere il Brasile",
        heroTitle: "Il Brasile lo avete già tentato. Non si riparte da zero.",
        heroBody:
          "Un progetto avviato anni fa e fermo a un passo dal traguardo è la situazione che incontriamo più spesso di quanto si pensi. Prima di ricominciare, vale la pena capire cosa resta e chi ne è titolare.",
        sections: [
          {
            kicker: "Le situazioni tipiche",
            title: "Fermi a un passo dal traguardo",
            bullets: [
              { text: "Una società locale costituita e mai diventata operativa." },
              { text: "Un'autorizzazione o una registrazione ottenuta, ma intestata a qualcun altro." },
              { text: "Un partner che ha imparato il mestiere e oggi preferisce fare da solo." },
              { text: "Macchinari, marchi, brevetti, contratti che aspettano una seconda occasione." },
              { text: "Un distributore sparito, un contenzioso mai chiuso, un investimento mai recuperato." },
            ],
          },
          {
            kicker: "Cosa facciamo",
            title: "Prima la ricognizione, poi le vie percorribili",
            ordered: true,
            bullets: [
              {
                text: "Ricognizione di ciò che resta — società (stato, debiti, obblighi pendenti), autorizzazioni e registrazioni (a chi sono intestate, se sono trasferibili), marchi e brevetti (cosa è depositato in Brasile e nel Mercosur, cosa no), beni e contratti. Con professionisti locali coinvolti caso per caso, sotto accordo di riservatezza.",
              },
              {
                text: "Le vie realmente percorribili — licenza del know-how, produzione in terzismo, nuova partnership, ripresa diretta, oppure un contatto per iscritto con la vecchia controparte per capire se il rapporto è recuperabile a condizioni diverse. Ogni via con pro, contro e costi, per iscritto.",
              },
              {
                text: "Finanza agevolata per la ripartenza — strumenti italiani ed europei dedicati all'America Latina, verificati con un partner specializzato prima di qualunque passo.",
              },
              {
                text: "Esecuzione — scelta e verifica delle nuove controparti, struttura dell'accordo con i legali, presidio locale nella fase di avvio.",
              },
            ],
          },
        ],
        start: {
          kicker: "Da dove si comincia",
          title: "La ricognizione",
          body: "Il primo incarico è la ricognizione di ciò che resta e di chi ne è formalmente titolare, perché da lì dipende ogni via percorribile. Perimetro definito, costo fisso, risultato scritto in italiano o inglese.",
        },
        cta: {
          text: "Raccontateci in due righe dove si è fermato il progetto: rispondiamo per iscritto con una prima valutazione, senza impegno.",
          button: "Richiedi una prima valutazione",
          subject: "Riprendere il Brasile",
        },
      },
    },
  },
];

/** True when the copy for that language exists (Portuguese is not published yet). */
export function hasSituations(lang: SituationLang): boolean {
  return SITUATIONS.every((s) => Boolean(s.content[lang]));
}

export function getSituation(key: SituationKey): Situation {
  return SITUATIONS.find((s) => s.key === key)!;
}

/** Content for a language, falling back to English while a translation is missing. */
export function situationContent(key: SituationKey, lang: SituationLang): SituationContent {
  const s = getSituation(key);
  return (s.content[lang] ?? s.content.en)!;
}

/** All slugs registered as routes (every language that has copy). */
export function situationSlugs(): string[] {
  return SITUATIONS.flatMap((s) => Object.values(s.content).map((c) => c!.slug));
}

/** Home strip: "Where are you starting from?" */
export const STARTING_POINT = {
  en: {
    title: "Where are you starting from?",
    notYet: {
      title: "Not in Brazil yet",
      text: "From the first insight to the first business conversation: market, counterparts, rules.",
    },
  },
  it: {
    title: "Da dove partite?",
    notYet: {
      title: "Non siete ancora in Brasile",
      text: "Dal primo dato al primo contatto: mercato, controparti, regole.",
    },
  },
  pt: {
    title: "De onde vocês estão partindo?",
    notYet: {
      title: "Ainda não estão no Brasil",
      text: "Do primeiro dado ao primeiro contato: mercado, contrapartes, regras.",
    },
  },
} as const;
