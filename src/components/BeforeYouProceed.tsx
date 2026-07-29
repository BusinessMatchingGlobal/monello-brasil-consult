import type { Lang } from "@/lib/i18n";

type Item = { title: string; body: string[] };

const DATA: Record<Lang, { heading: string; items: Item[] }> = {
  it: {
    heading: "Prima di procedere",
    items: [
      { title: "Chi emette i biglietti.", body: ["Tutti i biglietti sono emessi da un'agenzia di viaggi regolarmente autorizzata in Italia, di proprietà di CAVALLINODIECI S.r.l., che opera con il marchio Calliphora Travel dal 2004."] },
      { title: "Compilare il modulo non vi impegna a nulla.", body: ["È una richiesta di preventivo, non una prenotazione."] },
      { title: "Il preventivo ha una scadenza.", body: ["Vi rispondiamo nel più breve tempo possibile. L'offerta indicherà la data entro cui può essere confermata: oltre quel termine decade e non è più garantita, perché tariffe e disponibilità cambiano di continuo."] },
      { title: "Pagamento.", body: ["L'importo totale in euro va versato in un'unica soluzione sul conto SEPA dell'agenzia. Non è previsto il pagamento rateale: la tariffa è espressa in euro ed emessa in Italia. Le eventuali spese di trasferimento sono a carico del cliente — l'importo accreditato deve corrispondere a quello indicato nell'offerta."] },
      { title: "Emissione.", body: ["Il biglietto viene emesso dopo l'accredito effettivo delle somme e inviato per email. Un bonifico SEPA accredita di norma in giornata o il giorno lavorativo successivo: una volta confermata l'offerta, disponete il pagamento subito, tenendo conto di fine settimana e festivi."] },
      { title: "Assistenza in viaggio, sempre inclusa nel prezzo.", body: ["Dall'emissione al rientro siete seguiti via email e WhatsApp, senza costi aggiuntivi. È un'assistenza proattiva: in caso di cancellazioni, ritardi o riprotezioni ci muoviamo noi, senza aspettare che ci scriviate dall'aeroporto."] },
    ],
  },
  pt: {
    heading: "Antes de prosseguir",
    items: [
      { title: "Quem emite os bilhetes.", body: ["Todos os bilhetes são emitidos por uma agência de viagens devidamente autorizada na Itália, de propriedade da CAVALLINODIECI S.r.l., que atua com a marca Calliphora Travel desde 2004."] },
      { title: "Preencher o formulário não gera nenhum compromisso.", body: ["É um pedido de cotação, não uma reserva."] },
      { title: "A cotação tem prazo de validade.", body: ["Respondemos no menor tempo possível. A oferta indicará a data limite para confirmação: passado esse prazo ela caduca e deixa de ser garantida, porque tarifas e disponibilidade mudam o tempo todo."] },
      { title: "Pagamento.", body: ["O valor total é em euros e deve ser pago de uma só vez, na conta SEPA da agência. Não há parcelamento: a tarifa é em euros e emitida na Itália. Eventuais tarifas de transferência são por conta do cliente — o valor creditado precisa corresponder ao da oferta."] },
      { title: "Como pagar a partir do Brasil.", body: [
        "O valor é sempre em euros — mas você sabe exatamente quanto isso representa em reais antes de confirmar qualquer coisa.",
        "Nas plataformas de câmbio e remessa internacional, você informa o valor em euros e o sistema mostra o total em reais já com tudo incluído: taxa de câmbio aplicada, tarifas da plataforma e IOF. É o valor final que sai da sua conta, não uma estimativa. Você avalia a nossa proposta em moeda nacional, com número fechado, antes de assumir qualquer compromisso — e sem surpresa depois.",
        "Uma opção que costuma apresentar condições melhores que as bancárias tradicionais é a Remessa Online (abertura de conta em poucos passos): feito o cálculo, você paga via Pix ou TED e o valor em euros é creditado na conta da agência.",
        "Trata-se apenas de uma sugestão prática. A relação com a plataforma é exclusivamente sua, e recomendamos comparar as condições antes de decidir.",
      ] },
      { title: "Emissão.", body: ["O bilhete é emitido após a compensação efetiva do valor, e enviado por e-mail. Pela Remessa Online, feito o Pix ou o TED, o crédito em euros na conta da agência costuma ser praticamente imediato. Por transferência bancária tradicional o prazo é maior. Fins de semana e feriados, no Brasil ou na Itália, alongam o processo: com a oferta confirmada, faça o pagamento o quanto antes."] },
      { title: "Assistência durante a viagem, sempre incluída no preço.", body: ["Da emissão até a volta, você é acompanhado por e-mail e WhatsApp, sem custo adicional. É uma assistência ativa: em caso de cancelamento, atraso ou reacomodação, nós agimos — sem esperar que você escreva do aeroporto."] },
    ],
  },
  en: {
    heading: "Before you proceed",
    items: [
      { title: "Who issues the tickets.", body: ["All tickets are issued by a travel agency duly licensed in Italy, owned by CAVALLINODIECI S.r.l., trading as Calliphora Travel since 2004."] },
      { title: "Submitting the form commits you to nothing.", body: ["It is a request for a quotation, not a booking."] },
      { title: "Quotations expire.", body: ["We reply as quickly as we can. Every offer states the date by which it can be confirmed: after that date it lapses and is no longer guaranteed, because fares and availability change constantly."] },
      { title: "Payment.", body: ["The total amount is in euro and must be paid in full, in a single transfer, to the agency's SEPA account. Instalments are not available: the fare is denominated in euro and issued in Italy. Any transfer charges are borne by the client — the amount credited must match the amount quoted."] },
      { title: "Ticketing.", body: ["Tickets are issued once funds have cleared, and are sent by email. A SEPA transfer normally credits the same day or the next business day: once you have confirmed the offer, send payment promptly and allow for weekends and public holidays."] },
      { title: "In-trip support, always included in the price.", body: ["From ticketing to your return you are supported by email and WhatsApp, at no extra cost. Support is proactive: in the event of cancellation, delay or rerouting we act, without waiting for you to write to us from the airport."] },
    ],
  },
};

export function BeforeYouProceed({ lang, className = "" }: { lang: Lang; className?: string }) {
  const c = DATA[lang] ?? DATA.en;
  return (
    <section className={`rounded-xl border border-border bg-muted/40 p-5 md:p-6 ${className}`}>
      <h3 className="font-display text-xl md:text-2xl mb-4 text-foreground">{c.heading}</h3>
      <div className="space-y-4">
        {c.items.map((it, i) => (
          <div key={i} className="space-y-2">
            {it.body.map((p, j) => (
              <p key={j} className="text-sm md:text-base leading-relaxed text-muted-foreground text-justify">
                {j === 0 ? <strong className="text-foreground font-semibold">{it.title} </strong> : null}
                {p}
              </p>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

export default BeforeYouProceed;
