import type { Lang } from "@/lib/i18n";

type AnyLang = Lang | "es";

type Item = { title: string; body: string[] };

const DATA: Record<AnyLang, { heading: string; items: Item[] }> = {
  it: {
    heading: "Prima di procedere",
    items: [
      { title: "Chi emette i biglietti.", body: ["Tutti i biglietti sono emessi da un'agenzia di viaggi regolarmente autorizzata in Italia, di proprietà di CAVALLINODIECI S.r.l., che opera con il marchio Calliphora Travel dal 2004."] },
      { title: "Compilare il modulo non vi impegna a nulla.", body: ["È una richiesta di preventivo, non una prenotazione."] },
      { title: "Il preventivo ha una scadenza.", body: ["Vi rispondiamo nel più breve tempo possibile. L'offerta indicherà la data entro cui può essere confermata: oltre quel termine decade e non è più garantita, perché tariffe e disponibilità cambiano di continuo."] },
      { title: "Pagamento.", body: [
        "L'importo totale in euro va versato con bonifico, in un'unica soluzione, sul conto SEPA dell'agenzia.",
        "Non accettiamo carte di credito e non è previsto il pagamento rateale. Non è una scelta commerciale: su queste tariffe le compagnie richiedono all'agenzia il pagamento immediato e per intero, e l'agenzia è tenuta ad applicare le stesse condizioni alla propria clientela. È il rovescio della medaglia di tariffe che non sono pubblicate da nessuna parte.",
        "Le eventuali spese di trasferimento sono a carico del cliente — l'importo accreditato deve corrispondere a quello indicato nell'offerta.",
      ] },
      { title: "Se pagate dal Brasile.", body: [
        "L'importo resta in euro, ma potete sapere esattamente quanto significa in reais prima di confermare qualsiasi cosa. Sulle piattaforme di cambio e remessa internazionale inserite la cifra in euro e il sistema mostra il totale in reais già comprensivo di tutto: tasso applicato, commissioni della piattaforma e IOF. È l'importo finale che esce dal vostro conto, non una stima — così valutate la nostra proposta in moneta nazionale, a numero chiuso, prima di impegnarvi.",
        "Una soluzione che di norma offre condizioni migliori dei canali bancari tradizionali è Remessa Online (apertura del conto in pochi passaggi): fatto il calcolo, pagate via Pix o TED e l'importo in euro viene accreditato sul conto dell'agenzia.",
        "È solo un suggerimento pratico. Il rapporto con la piattaforma è esclusivamente vostro, e vi consigliamo di confrontare le condizioni prima di scegliere.",
      ] },
      { title: "Emissione.", body: ["Il biglietto viene emesso dopo l'accredito effettivo delle somme e inviato per email. Un bonifico SEPA accredita di norma in giornata o il giorno lavorativo successivo; pagando dal Brasile tramite piattaforma di rimessa, dopo il Pix o il TED l'accredito è quasi immediato. Una volta confermata l'offerta disponete il pagamento subito, tenendo conto di fine settimana e festivi."] },
      { title: "Assistenza in viaggio, sempre inclusa nel prezzo.", body: ["Dall'emissione al rientro siete seguiti via email e WhatsApp, senza costi aggiuntivi. È un'assistenza proattiva: in caso di cancellazioni, ritardi o riprotezioni ci muoviamo noi, senza aspettare che ci scriviate dall'aeroporto."] },
    ],
  },
  pt: {
    heading: "Antes de prosseguir",
    items: [
      { title: "Quem emite os bilhetes.", body: ["Todos os bilhetes são emitidos por uma agência de viagens devidamente autorizada na Itália, de propriedade da CAVALLINODIECI S.r.l., que atua com a marca Calliphora Travel desde 2004."] },
      { title: "Preencher o formulário não gera nenhum compromisso.", body: ["É um pedido de cotação, não uma reserva."] },
      { title: "A cotação tem prazo de validade.", body: ["Respondemos no menor tempo possível. A oferta indicará a data limite para confirmação: passado esse prazo ela caduca e deixa de ser garantida, porque tarifas e disponibilidade mudam o tempo todo."] },
      { title: "Pagamento.", body: [
        "O valor total é em euros e deve ser pago por transferência, de uma só vez, na conta SEPA da agência.",
        "Não aceitamos cartão de crédito e não há parcelamento. Não é uma escolha comercial: nessas tarifas as companhias exigem da agência o pagamento à vista e integral, e a agência precisa aplicar as mesmas condições ao cliente. É a contrapartida de tarifas que não estão publicadas em lugar nenhum.",
        "Eventuais tarifas de transferência são por conta do cliente — o valor creditado precisa corresponder ao da oferta.",
      ] },
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
      { title: "Who issues the tickets.", body: ["All tickets are issued by a travel agency duly authorized in Italy, owned by CAVALLINODIECI S.r.l., operating under the Calliphora brand since 2004."] },
      { title: "Filling in the form commits you to nothing.", body: ["It's a request for a quote, not a booking."] },
      { title: "The quote has an expiry date.", body: ["We reply as quickly as possible. The offer will state the date by which it can be confirmed: beyond that deadline it lapses and is no longer guaranteed, because fares and availability change constantly."] },
      { title: "Payment.", body: [
        "The total amount in euros must be paid by bank transfer, in a single instalment, to the agency's SEPA account.",
        "We do not accept credit cards, and payment in instalments is not available. This is not a commercial choice: on these fares, the airlines require the agency to pay immediately and in full, and the agency is bound to apply the same conditions to its own clients. It's the flip side of fares that are published nowhere.",
        "Any transfer fees are borne by the client: the amount credited must match the amount stated in the offer.",
      ] },
      { title: "If you're paying from Brazil.", body: [
        "The amount stays in euros, but you can know exactly what it means in reais before confirming anything. On international currency-exchange and remittance platforms, you enter the figure in euros and the system shows the total in reais, all-inclusive: the exchange rate applied, the platform's fees and the IOF tax. It's the final amount that leaves your account, not an estimate — so you can assess our proposal in your national currency, as a fixed figure, before committing.",
        "A solution that generally offers better conditions than traditional banking channels is Remessa Online (account opening takes just a few steps): once you've run the calculation, you pay via Pix or TED and the euro amount is credited to the agency's account.",
        "This is only a practical suggestion. Your relationship with the platform is entirely your own, and we recommend comparing conditions before choosing.",
      ] },
      { title: "Issuance.", body: ["The ticket is issued after the funds have actually been credited, and sent by email. A SEPA transfer normally clears the same day or the next business day; when paying from Brazil through a remittance platform, the credit arrives almost immediately after the Pix or TED. Once you confirm the offer, arrange payment right away, keeping weekends and public holidays in mind."] },
      { title: "In-trip assistance, always included in the price.", body: ["From issuance to your return, you are supported via email and WhatsApp, at no extra cost. It's proactive assistance: in the event of cancellations, delays or rebooking, we act first — we don't wait for you to write to us from the airport."] },
    ],
  },
  es: {
    heading: "Antes de continuar",
    items: [
      { title: "Quién emite los boletos.", body: ["Todos los boletos son emitidos por una agencia de viajes debidamente habilitada en Italia, propiedad de CAVALLINODIECI S.r.l., que opera con la marca Calliphora Travel desde 2004."] },
      { title: "Completar el formulario no lo compromete a nada.", body: ["Es una solicitud de cotización, no una reserva."] },
      { title: "La cotización tiene fecha de vencimiento.", body: ["Respondemos en el menor tiempo posible. La oferta indicará la fecha límite para confirmarla: vencido ese plazo caduca y deja de estar garantizada, porque las tarifas y la disponibilidad cambian constantemente."] },
      { title: "Pago.", body: [
        "El importe total es en euros y se abona por transferencia, en un único pago, a la cuenta SEPA de la agencia.",
        "No aceptamos tarjetas de crédito ni pago en cuotas. No es una decisión comercial: en estas tarifas las aerolíneas exigen a la agencia el pago inmediato y total, y la agencia debe aplicar las mismas condiciones a sus clientes. Es la contracara de tarifas que no están publicadas en ningún lado.",
        "Los eventuales gastos de transferencia corren por cuenta del cliente — el importe acreditado debe coincidir con el de la oferta.",
      ] },
      { title: "Si paga desde Sudamérica.", body: [
        "El importe se mantiene en euros, pero usted puede saber exactamente cuánto representa en su moneda local antes de confirmar nada. En las plataformas de cambio y remesa internacional se ingresa la cifra en euros y el sistema muestra el total en moneda local con todo incluido: tipo de cambio aplicado, comisiones de la plataforma e impuestos. Es el importe final que sale de su cuenta, no una estimación.",
        "Es sólo una sugerencia práctica: la relación con la plataforma es exclusivamente suya, y recomendamos comparar condiciones antes de decidir.",
      ] },
      { title: "Emisión.", body: ["El boleto se emite una vez acreditados efectivamente los fondos y se envía por correo electrónico. Una transferencia SEPA suele acreditarse el mismo día o el día hábil siguiente. Confirmada la oferta, realice el pago cuanto antes, teniendo en cuenta fines de semana y feriados."] },
      { title: "Asistencia durante el viaje, siempre incluida en el precio.", body: ["Desde la emisión hasta el regreso lo acompañamos por correo y WhatsApp, sin costo adicional. Es una asistencia proactiva: ante cancelaciones, demoras o reprogramaciones actuamos nosotros, sin esperar a que nos escriba desde el aeropuerto."] },
    ],
  },
};

export function BeforeYouProceed({ lang, className = "" }: { lang: AnyLang; className?: string }) {
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
