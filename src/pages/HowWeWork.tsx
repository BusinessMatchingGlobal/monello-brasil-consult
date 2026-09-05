import { useEffect } from "react";
import { useT } from "@/lib/i18n";
import { useCanonical } from "@/lib/useCanonical";
import { Nav, ContactForm } from "./AboutUs";
import { MethodArticle, methodTitle } from "./Method";

type MethodBlockData = {
  title: string;
  paragraphs: Array<{ text: string; italicParts?: string[] }>;
  highlight: string;
};

function renderWithItalics(text: string, italicParts?: string[]) {
  if (!italicParts || italicParts.length === 0) return text;
  type Match = { start: number; end: number; text: string };
  const matches: Match[] = italicParts
    .map((p) => {
      const idx = text.indexOf(p);
      return idx !== -1 ? { start: idx, end: idx + p.length, text: p } : null;
    })
    .filter((m): m is Match => m !== null)
    .sort((a, b) => a.start - b.start);
  const nodes: React.ReactNode[] = [];
  let pos = 0;
  for (const m of matches) {
    if (m.start < pos) continue;
    nodes.push(text.slice(pos, m.start));
    nodes.push(
      <em key={m.start} className="italic">
        {m.text}
      </em>
    );
    pos = m.end;
  }
  nodes.push(text.slice(pos));
  return <>{nodes}</>;
}

function MethodBlock({ block }: { block: MethodBlockData }) {
  return (
    <section className="mb-14">
      <h2 className="font-display text-2xl md:text-3xl mb-6 text-foreground">{block.title}</h2>
      <div className="space-y-6">
        {block.paragraphs.map((p, i) => (
          <p key={i} className="text-base md:text-lg leading-relaxed text-muted-foreground text-justify">
            {renderWithItalics(p.text, p.italicParts)}
          </p>
        ))}
      </div>
      <p className="mt-8 border-l-2 border-primary pl-4 font-display text-xl md:text-2xl text-foreground">
        {block.highlight}
      </p>
    </section>
  );
}

const blocksEn: MethodBlockData[] = [
  {
    title: "Clear terms, long corridors",
    paragraphs: [
      {
        text: "The Italians have said it for centuries: patti chiari, amicizia lunga — clear pacts, long friendship. The Brazilians coined the same wisdom in almost accounting terms: o combinado não sai caro — what has been clearly agreed will never cost you too much. Two languages, one insight, and a telling difference between them: the Italian proverb watches over the relationship; the Brazilian one watches over the bill. Together they say it all — clear terms protect both the friendship and the balance sheet. When two cultures arrive at the same proverb by different roads, it is usually because both have paid the same price to learn it.",
        italicParts: ["patti chiari, amicizia lunga", "o combinado não sai caro"],
      },
      {
        text: "Brazilian legal doctrine, however, adds an asterisk worth an entire contract: an agreement holds only if it is agreed right. Not every signed deal is a valid one. A contract has force only where it respects good faith, balance between the parties, and the law. Clauses that shift every risk to one side, or waive rights that cannot be waived, are not terms — they are paper with a signature on it, and on the day it matters, a court will strike them down. A cross-border agreement, to be truly clear, must be lawful twice over: in the legal system it leaves from, and in the one it lands in.",
      },
      {
        text: "That is why our work begins before any introductions are made. We call it phase zero: establishing who owns what, aligning the paperwork with the real agreements, closing the gaps that can be closed and declaring the ones that remain — and making sure every clause holds up where it will be read, not just where it was written.",
      },
      {
        text: "The principle is simple: an international agreement must be able to speak for itself — years from now, before people who weren't in the room, in a language that isn't yours — and say things the law of both countries knows how to defend.",
      },
    ],
    highlight: "Order is the first thing you export.",
  },
];

const blocksIt: MethodBlockData[] = [
  {
    title: "Patti chiari, corridoi lunghi",
    paragraphs: [
      {
        text: "Gli italiani lo dicono da secoli: patti chiari, amicizia lunga. I brasiliani hanno coniato, per la stessa saggezza, una formula quasi contabile: o combinado não sai caro — ciò che è stato chiaramente pattuito non sarà mai troppo caro. Due lingue, un'unica intuizione — con una sfumatura che le distingue e le completa: l'italiano guarda alla relazione che dura, il brasiliano guarda al conto che non arriva. Insieme dicono tutto: i patti chiari proteggono l'amicizia e il portafoglio. Quando due culture arrivano allo stesso proverbio per strade diverse, di solito è perché hanno pagato lo stesso prezzo per impararlo.",
        italicParts: ["patti chiari, amicizia lunga", "o combinado não sai caro"],
      },
      {
        text: "Ma la dottrina brasiliana aggiunge al proverbio un asterisco che vale un contratto intero: o combinado não sai caro — desde que combinado direito. Non ogni patto firmato vale: un accordo ha forza solo se rispetta la buona fede, l'equilibrio tra le parti e la legge. Le clausole che scaricano tutti i rischi su un solo lato, o fanno rinunciare a diritti irrinunciabili, non sono patti: sono carta con una firma sopra — e il giorno del bisogno, un giudice le annulla. Un accordo internazionale, per essere davvero chiaro, deve essere anche lecito due volte: nell'ordinamento di chi parte e in quello di chi accoglie.",
        italicParts: ["o combinado não sai caro — desde que combinado direito"],
      },
      {
        text: "Per questo il nostro lavoro comincia prima delle presentazioni. La chiamiamo fase zero: verificare chi possiede cosa, allineare la carta agli accordi reali, chiudere le crepe che si possono chiudere e dichiarare quelle che restano — e assicurarci che ogni clausola regga dove verrà letta, non solo dove è stata scritta.",
      },
      {
        text: "Il principio è semplice: un accordo tra due paesi deve poter parlare da solo — tra anni, davanti a persone che non c'erano, in una lingua che non è la vostra — e dire cose che il diritto di entrambi sappia difendere.",
      },
    ],
    highlight: "L'ordine è il primo prodotto da esportare.",
  },
];

const blocksPt: MethodBlockData[] = [
  {
    title: "Combinado direito, corredores longos",
    paragraphs: [
      {
        text: "Os brasileiros resumem tudo numa fórmula quase contábil: o combinado não sai caro. Os italianos dizem há séculos a mesma coisa, olhando para a relação: patti chiari, amicizia lunga — acordos claros, amizade longa. Duas línguas, uma só intuição, e uma diferença que revela: o provérbio brasileiro cuida da conta, o italiano cuida da relação. Juntos dizem tudo: o combinado claro protege a amizade e o bolso. Quando duas culturas chegam ao mesmo provérbio por caminhos diferentes, geralmente é porque pagaram o mesmo preço para aprendê-lo.",
        italicParts: ["o combinado não sai caro", "patti chiari, amicizia lunga"],
      },
      {
        text: "Mas a doutrina brasileira acrescenta ao provérbio um asterisco que vale um contrato inteiro: o combinado não sai caro — desde que combinado direito. Nem todo acordo assinado vale: um acordo só tem força se respeita a boa-fé, o equilíbrio entre as partes e a lei. Cláusulas que jogam todo o risco sobre um lado só, ou que renunciam a direitos irrenunciáveis, não são acordo: são papel com uma assinatura em cima — e, no dia em que importa, um juiz as anula. Um acordo internacional, para ser realmente claro, precisa ser lícito duas vezes: no ordenamento de quem parte e no de quem recebe.",
        italicParts: ["o combinado não sai caro — desde que combinado direito"],
      },
      {
        text: "Por isso o nosso trabalho começa antes das apresentações. Chamamos de fase zero: verificar quem é dono do quê, alinhar o papel aos acordos reais, fechar as brechas que podem ser fechadas e declarar as que ficam — e garantir que cada cláusula se sustente onde vai ser lida, não só onde foi escrita.",
      },
      {
        text: "O princípio é simples: um acordo entre dois países precisa falar por si — daqui a anos, diante de pessoas que não estavam lá, numa língua que não é a sua — e dizer coisas que o direito de ambos saiba defender.",
      },
    ],
    highlight: "A ordem é o primeiro produto a exportar.",
  },
];

export default function HowWeWork() {
  const { t, lang } = useT();
  const seo =
    lang === "it"
      ? {
          title: "Come lavoriamo — Business Matching Global",
          description: "L'ordine è il primo prodotto da esportare.",
        }
      : lang === "pt"
      ? {
          title: "Como trabalhamos — Business Matching Global",
          description: "A ordem é o primeiro produto a exportar.",
        }
      : {
          title: "How we work — Business Matching Global",
          description: "Order is the first thing you export.",
        };
  useCanonical("/How_we_work", seo);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const blocks = lang === "en" ? blocksEn : lang === "pt" ? blocksPt : blocksIt;
  const pageTitle = lang === "en" ? "How we work" : lang === "pt" ? "Como trabalhamos" : "Come lavoriamo";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <div className="container max-w-3xl pt-32 md:pt-40 pb-16 md:pb-24">
        <h1 className="font-display text-4xl md:text-5xl leading-tight mb-10">{pageTitle}</h1>
        <article>
          {blocks.map((b, i) => (
            <MethodBlock key={i} block={b} />
          ))}
        </article>

        <section className="mt-16 pt-12 border-t border-border">
          <h2 className="font-display text-3xl md:text-4xl mb-10 text-foreground">
            {lang === "en"
              ? "The method, step by step"
              : lang === "pt"
                ? "O método, passo a passo"
                : "Il metodo, passo per passo"}
          </h2>

          <h3 className="font-display text-xl md:text-2xl mb-6 text-foreground">{t.how.title}</h3>
          <div className="space-y-8">
            {t.how.steps.map(([title, body], i) => (
              <div key={title}>
                <div className="text-amber font-display text-3xl mb-1">0{i + 1}</div>
                <h4 className="font-display text-lg mb-2">{title}</h4>
                <p className="text-base leading-relaxed text-muted-foreground whitespace-pre-line">{body}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 border-l-2 border-amber pl-5 font-display text-lg md:text-xl">{t.how.note}</p>

          <h3 className="font-display text-2xl md:text-3xl mt-16 mb-6 text-foreground">{methodTitle(lang)}</h3>
          <MethodArticle />
        </section>

        <ContactForm />
      </div>
    </div>
  );
}
