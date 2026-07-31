import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCanonical } from "@/lib/useCanonical";
import { BeforeYouProceed } from "@/components/BeforeYouProceed";
import { CALLIPHORA_LOGO, type UILang } from "@/pages/Fly";
import { UILangSwitcher } from "@/components/UILangSwitcher";
import { useState } from "react";


type Block = { type: "h2"; text: string } | { type: "p"; text: string; italic?: boolean };

const blocksIt: Block[] = [
  { type: "h2", text: "Servizio di Biglietteria Aerea" },
  { type: "p", text: "Non vi offriamo un biglietto per volare da A a B: vi offriamo un'esperienza di viaggio senza attriti, prima, durante e dopo. È la nostra filosofia dal 2004, anno in cui è nato il marchio Calliphora — allora sotto altra ragione sociale, dal 2008 con l'attuale CAVALLINODIECI S.r.l. — e da allora operiamo nell'organizzazione e intermediazione di viaggi e nella biglietteria aerea con le regolari autorizzazioni di legge.", italic: true },
  { type: "p", text: "Il nostro è un desk unico, che vi segue dalla prima richiesta al ritorno a casa: biglietteria aerea, sistemazioni alberghiere, noleggio auto, trasferimenti, coperture assicurative." },

  { type: "h2", text: "Tariffe negoziate e confidenziali" },
  { type: "p", text: "Vent'anni di rapporti con i vettori si traducono in qualcosa di molto concreto: l'accesso a tariffe negoziate e confidenziali. Il nome dice già tutto: per definizione non possono essere pubblicate. Non le trovate sulle OTA — le Online Travel Agency, i grandi portali di prenotazione su cui si confrontano i prezzi — non le trovate sugli IBT, gli Internet Booking Tool con cui molte aziende prenotano in autonomia, e non le trovate nemmeno sui siti delle compagnie aeree." },
  { type: "p", text: "Il vantaggio più immediato è il prezzo, spesso molto competitivo rispetto alle tariffe pubbliche. Ma non è l'unico: le tariffe VFR (Visiting Friends and Relatives), per esempio, accanto a un prezzo più basso prevedono in genere una franchigia bagaglio più generosa e regole di cambio più flessibili." },

  { type: "h2", text: "Non vi vendiamo un biglietto. Vi costruiamo un viaggio senza attriti." },
  { type: "p", text: "Il nostro lavoro non finisce con l'emissione: comincia prima e si chiude quando siete rientrati a casa." },
  { type: "p", text: "Prima della partenza anticipiamo tutto ciò che può compromettere la serenità del viaggio: documenti e requisiti d'ingresso, tempi minimi di connessione, coincidenze fragili, regole bagaglio, coperture assicurative adeguate al percorso." },
  { type: "p", text: "Durante il viaggio gestiamo in modo proattivo gli imprevisti — cancellazioni, overbooking, riprotezioni: quello che in gergo si chiama IROPS, irregular operations — per ridurre al minimo il disagio. Non aspettiamo che ci chiamiate dall'aeroporto." },

  { type: "h2", text: "Non tutti gli aerei vi trattano allo stesso modo" },
  { type: "p", text: "Potete volare in Business class, sulla poltrona più confortevole disponibile sul mercato, e scendere comunque a destinazione sentendovi uno straccio. Spesso non è colpa della poltrona. È la fusoliera." },
  { type: "p", text: "Un aereo con fusoliera in alluminio non può essere pressurizzato oltre un certo limite: la cabina viaggia a un'altitudine equivalente di circa 2.400 metri, con un'umidità che sulle lunghe percorrenze scende spesso sotto il 10% — più secca di molti deserti. Il risultato: meno ossigeno nel sangue, disidratazione, mal di testa, jet lag più lungo." },
  { type: "p", text: "Una fusoliera in materiale composito — è il caso di Boeing 787 e Airbus A350 — regge pressioni maggiori e non teme la corrosione. Risultato: cabina equivalente a circa 1.800 metri, umidità fino al 15-20%, rumorosità inferiore, filtrazione dell'aria migliore e sistemi che attenuano le turbolenze prima che le sentiate. Sullo stesso volo di dieci ore, la differenza allo sbarco è tangibile." },
  { type: "p", text: "Il punto è che questa variabile non compare in nessun motore di ricerca e non entra in nessun confronto di prezzo. Sulla stessa rotta, nello stesso giorno, con la stessa classe di servizio e a parità di tariffa, potete trovare macchine completamente diverse a seconda del numero di volo." },
  { type: "p", text: "Noi vi sappiamo consigliare anche su questo: tipo di aeromobile effettivamente operato, configurazione della cabina, posizione della poltrona, orario di partenza e struttura delle coincidenze rispetto al vostro fuso e ai vostri impegni all'arrivo." },
  { type: "p", text: "Perché il viaggio non finisce quando atterrate. Finisce quando siete in grado di fare quello per cui siete partiti.", italic: true },

  { type: "h2", text: "Il valore del denaro che spendete" },
  { type: "p", text: "Da subito. Vi apriamo l'accesso a tariffe competitive con molti vettori e verso molte destinazioni nel mondo." },
  { type: "p", text: "Se volate molto. Quando nei vostri spostamenti emergono compagnie e rotte ricorrenti, negoziamo per voi accordi dedicati sui vostri flussi reali." },
  { type: "p", text: "Se siete una PMI senza grandi volumi. Gestiamo la vostra iscrizione ai programmi aziendali delle compagnie: programmi che maturano un credito a ogni volo, riutilizzabile per l'acquisto di altri biglietti. La partecipazione non esclude l'accumulo di punti sui frequent flyer individuali: i due binari corrono in parallelo." },
  { type: "p", text: "Sui frequent flyer. Vi affianchiamo anche qui, per accumulare più in fretta dove è possibile e per trasformare i punti in viaggi premio effettivamente prenotabili — che è la parte in cui la maggior parte dei viaggiatori si arrende." },

  { type: "h2", text: "Anche quando non viaggiate per lavoro" },
  { type: "p", text: "Lo stesso impegno e la stessa esperienza valgono per i viaggi di piacere. E non solo sul volo: disponiamo di tariffe negoziate e confidenziali anche con hotel e autonoleggi, e sappiamo individuare le coperture assicurative con il miglior rapporto tra costo e protezione effettiva per il vostro prossimo viaggio." },

  { type: "h2", text: "L'operatore umano resta al centro" },
  { type: "p", text: "Al centro del servizio c'è una persona. Sempre." },
  { type: "p", text: "Ai nostri operatori stiamo affiancando IVA — Intelligent Vacation Assistant, che potete vedere all'opera nel video in questa pagina: non un sostituto, ma una sorta di esoscheletro che amplifica le capacità di chi lavora sulla vostra pratica. Human in the loop: la tecnologia lavora dietro le quinte, la responsabilità e la relazione restano di chi vi risponde." },

  { type: "h2", text: "Provateci, senza impegno" },
  { type: "p", text: "Compilate il modulo qui sotto per mettere alla prova il servizio: nessun vincolo da parte vostra." },
  { type: "p", text: "Le informazioni richieste possono sembrare molte. In realtà sono esattamente quelle che ci servono — e nulla di più — per costruire la soluzione migliore già alla prima proposta: cosa desiderate, ma anche cosa potete ottenere in base a cittadinanza, residenza e documenti. È il primo passo per rendere il vostro viaggio il più possibile frictionless." },
];


const blocksEs: Block[] = [
  { type: "h2", text: "El precio de un vuelo no existe" },
  { type: "p", text: "Existen al menos cuatro. El mismo asiento, el mismo avión, el mismo día. Lo único que cambia es la puerta por la que se entra." },
  { type: "p", text: "Está la tarifa publicada, la que se ve en el sitio de la aerolínea. Están las tarifas negociadas y confidenciales, que por definición no se publican en ninguna parte. Están los contratos corporativos, reservados a quien mueve volúmenes serios. Y están los programas que las aerolíneas dedican a las pequeñas y medianas empresas — sin volumen mínimo, y que casi ninguna pyme sabe que existen." },
  { type: "p", text: "En el corredor Sudamérica–Europa, quien paga menos rara vez es quien buscó más. Es quien tuvo acceso.", italic: true },

  { type: "h2", text: "De dónde viene el acceso" },
  { type: "p", text: "Calliphora Travel es la marca comercial de CAVALLINODIECI S.r.l., empresa que opera desde 2004 en organización de viajes, intermediación y emisión de boletos aéreos — con su denominación actual desde 2008 — con todas las licencias exigidas por la ley italiana." },
  { type: "p", text: "Un único interlocutor, desde la primera consulta hasta el regreso a casa: vuelos, hoteles, alquiler de autos, traslados y seguro de viaje." },

  { type: "h2", text: "Tarifas negociadas y confidenciales" },
  { type: "p", text: "Veinte años de relación con las aerolíneas se traducen en algo concreto: acceso a tarifas negociadas y confidenciales. El nombre lo dice todo — por definición no pueden publicarse. No las va a encontrar en las OTAs, las agencias online donde se comparan precios. No las va a encontrar en los IBT, las herramientas de autorreserva que usan muchas empresas. Y tampoco en los sitios de las propias aerolíneas." },
  { type: "p", text: "El precio es la ventaja más visible, pero no la única. Las tarifas VFR (visita a familiares y amigos), por ejemplo, suelen incluir una franquicia de equipaje más generosa y reglas de cambio más flexibles que las tarifas publicadas, además de un precio menor." },

  { type: "h2", text: "No le vendemos un boleto. Le armamos un viaje sin fricciones." },
  { type: "p", text: "Nuestro trabajo no termina con la emisión. Empieza mucho antes y se cierra cuando usted ya está de vuelta." },
  { type: "p", text: "Antes de la salida anticipamos lo que puede arruinar un viaje: documentación y requisitos de ingreso, tiempos mínimos de conexión, conexiones frágiles, reglas de equipaje, coberturas de seguro ajustadas al itinerario real." },
  { type: "p", text: "En tránsito gestionamos las contingencias de forma proactiva — cancelaciones, denegación de embarque, reprogramaciones: lo que la industria llama IROPS, irregular operations — para que el daño a su agenda sea el menor posible. No esperamos a que nos llame desde el aeropuerto." },

  { type: "h2", text: "No todos los aviones lo tratan igual" },
  { type: "p", text: "Se puede volar en clase ejecutiva, en el asiento más cómodo del mercado, y aterrizar destrozado. Muchas veces no es el asiento. Es el fuselaje." },
  { type: "p", text: "Un fuselaje de aluminio sólo admite cierta presurización: la cabina equivale a unos 2.400 metros de altitud, con una humedad que en tramos largos baja del 10% — más seco que muchos desiertos. Menos oxígeno en sangre, deshidratación, dolor de cabeza, un jet lag más largo." },
  { type: "p", text: "Un fuselaje de material compuesto — el Boeing 787 y el Airbus A350 — soporta mayores diferenciales de presión y no se corroe. El resultado: una cabina equivalente a unos 1.800 metros, humedad del 15–20%, menos ruido, mejor filtrado del aire y sistemas que amortiguan la turbulencia antes de que usted la sienta. Diez horas después, la diferencia se siente en el cuerpo." },
  { type: "p", text: "Esta variable no aparece en ningún buscador ni en ningún comparador de precios. En la misma ruta, el mismo día, en la misma clase y con la misma tarifa, el avión puede ser una máquina completamente distinta según el número de vuelo." },
  { type: "p", text: "También asesoramos sobre esto: qué avión opera realmente, configuración de cabina, ubicación del asiento, horario de salida y estructura de conexiones en relación con su huso horario y con lo que tiene que hacer al llegar." },
  { type: "p", text: "Porque el viaje no termina cuando aterriza. Termina cuando usted puede hacer aquello por lo que viajó.", italic: true },

  { type: "h2", text: "Que su dinero rinda" },
  { type: "p", text: "Desde el primer viaje. Acceso a tarifas competitivas con una amplia gama de aerolíneas y destinos." },
  { type: "p", text: "Si vuela seguido. Cuando ciertas aerolíneas y rutas se repiten en su patrón de viaje, negociamos acuerdos dedicados construidos sobre sus flujos reales." },
  { type: "p", text: "Si es una pyme sin volumen. Gestionamos su inscripción en los programas corporativos de las aerolíneas: esquemas que acumulan un crédito en cada vuelo, canjeable contra boletos futuros. La inscripción no anula la acumulación individual de viajero frecuente — las dos corren en paralelo." },
  { type: "p", text: "Sobre los programas de viajero frecuente. También lo acompañamos aquí: acumular más rápido donde es posible, y convertir los puntos en boletos premio efectivamente reservables — la etapa donde la mayoría se rinde." },

  { type: "h2", text: "No sólo para negocios" },
  { type: "p", text: "El mismo compromiso vale para los viajes de placer. Y no sólo en el aire: tenemos tarifas negociadas y confidenciales con hoteles y rentadoras de autos, y podemos identificar la cobertura de seguro con la mejor relación entre costo y protección real para su próximo viaje." },

  { type: "h2", text: "Siempre hay una persona a cargo" },
  { type: "p", text: "Hay alguien con nombre y apellido en su expediente. Siempre." },
  { type: "p", text: "Estamos equipando a nuestros consultores con IVA — Intelligent Vacation Assistant: no un reemplazo, sino un exoesqueleto que amplía la capacidad de las personas que gestionan su reserva. Human in the loop: la tecnología trabaja detrás de escena, el criterio y la relación quedan en manos de quien le responde." },

  { type: "h2", text: "Pruébenos, sin compromiso" },
  { type: "p", text: "Complete el formulario para poner el servicio a prueba. Nada lo obliga a nada." },
  { type: "p", text: "La información que pedimos puede parecer mucha. Es exactamente la que necesitamos — y nada más — para acercarle la solución correcta en la primera propuesta: lo que usted quiere, pero también aquello a lo que tiene derecho según nacionalidad, residencia y documentos. Es el primer paso hacia un viaje realmente sin fricciones." },
];

const blocksEn: Block[] = [
  { type: "h2", text: "Air Ticketing Service" },
  { type: "p", text: "We don't sell you a ticket to fly from A to B: we offer a frictionless travel experience — before, during and after your trip. This has been our philosophy since 2004, the year the Calliphora brand was born — under a different corporate name at first, and since 2008 under the current CAVALLINODIECI S.r.l. — and ever since, we have operated in travel organization and intermediation and in air ticketing with all the required legal authorizations.", italic: true },
  { type: "p", text: "We are a single desk that follows you from your first request to your return home: air ticketing, hotel accommodation, car rental, transfers, insurance coverage." },

  { type: "h2", text: "Negotiated, confidential fares" },
  { type: "p", text: "Twenty years of relationships with carriers translate into something very concrete: access to negotiated, confidential fares. The name says it all: by definition, they cannot be published. You won't find them on OTAs — the Online Travel Agencies, the big booking portals where prices are compared — you won't find them on IBTs, the Internet Booking Tools many companies use to book on their own, and you won't find them on the airlines' own websites either." },
  { type: "p", text: "The most immediate advantage is the price, often highly competitive compared with published fares. But it's not the only one: VFR fares (Visiting Friends and Relatives), for instance, typically combine a lower price with a more generous baggage allowance and more flexible change rules." },

  { type: "h2", text: "We don't sell you a ticket. We build you a frictionless journey." },
  { type: "p", text: "Our work doesn't end with ticket issuance: it starts earlier and closes only when you're back home." },
  { type: "p", text: "Before departure, we anticipate everything that could compromise the peace of mind of your trip: documents and entry requirements, minimum connection times, fragile connections, baggage rules, insurance coverage suited to your itinerary." },
  { type: "p", text: "During the trip, we proactively manage disruptions — cancellations, overbooking, rebooking: what the industry calls IROPS, irregular operations — to keep your inconvenience to a minimum. We don't wait for you to call us from the airport." },

  { type: "h2", text: "Not all aircraft treat you the same way" },
  { type: "p", text: "You can fly Business class, in the most comfortable seat on the market, and still arrive at your destination feeling like a wreck. Often it's not the seat's fault. It's the fuselage." },
  { type: "p", text: "An aircraft with an aluminium fuselage cannot be pressurized beyond a certain limit: the cabin flies at an equivalent altitude of about 2,400 metres, with humidity that on long-haul routes often drops below 10% — drier than many deserts. The result: less oxygen in your blood, dehydration, headaches, longer jet lag." },
  { type: "p", text: "A composite fuselage — as on the Boeing 787 and Airbus A350 — withstands higher pressures and doesn't fear corrosion. The result: a cabin equivalent to about 1,800 metres, humidity of up to 15–20%, lower noise, better air filtration, and systems that dampen turbulence before you feel it. On the same ten-hour flight, the difference when you disembark is tangible." },
  { type: "p", text: "The point is that this variable doesn't appear in any search engine and never enters any price comparison. On the same route, on the same day, in the same class of service and at the same fare, you can find completely different machines depending on the flight number." },
  { type: "p", text: "We can advise you on this too: the aircraft type actually operated, cabin configuration, seat position, departure time, and the structure of your connections relative to your time zone and your commitments on arrival." },
  { type: "p", text: "Because the journey doesn't end when you land. It ends when you're able to do what you travelled for.", italic: true },

  { type: "h2", text: "The value of the money you spend" },
  { type: "p", text: "From day one. We open access to competitive fares with many carriers and to many destinations worldwide." },
  { type: "p", text: "If you fly a lot. When recurring airlines and routes emerge in your travel patterns, we negotiate dedicated agreements for you, based on your actual flows." },
  { type: "p", text: "If you're an SME without large volumes. We manage your enrolment in the airlines' corporate programmes: schemes that earn a credit on every flight, which you can reuse to purchase further tickets. Participation doesn't exclude earning points on individual frequent-flyer accounts: the two tracks run in parallel." },
  { type: "p", text: "On frequent-flyer programmes. We support you here as well — helping you accrue faster where possible and turn points into award trips that are actually bookable, which is where most travellers give up." },

  { type: "h2", text: "Even when you're not travelling for business" },
  { type: "p", text: "The same commitment and the same experience apply to leisure travel. And not just on the flight: we also hold negotiated, confidential rates with hotels and car rental companies, and we know how to identify the insurance coverage with the best ratio of cost to actual protection for your next trip." },

  { type: "h2", text: "The human operator stays at the centre" },
  { type: "p", text: "At the centre of the service there is a person. Always." },
  { type: "p", text: "Alongside our operators, we are introducing IVA — the Intelligent Vacation Assistant, which you can see at work in the video on this page: not a replacement, but a kind of exoskeleton that amplifies the capabilities of the person handling your file. Human in the loop: the technology works behind the scenes; the responsibility and the relationship remain with the person who answers you." },

  { type: "h2", text: "Try us, with no commitment" },
  { type: "p", text: "Fill in the form below to put the service to the test: no obligation on your part." },
  { type: "p", text: "The information requested may seem like a lot. In fact, it is exactly what we need — and nothing more — to build the best solution with our very first proposal: what you want, but also what you can obtain based on citizenship, residency and documents. It's the first step towards making your trip as frictionless as possible." },
];

const footer: Record<UILang, { line1: string; line2: string }> = {
  es: {
    line1: "Calliphora Travel — marca de Cavallinodieci S.r.l. · Via del Cavallino 10, 14100 Asti (AT), Italia",
    line2: "IVA IT01416950051 · Licencia n.º 2/08 (Municipio de Asti) · REA AT-113765",
  },
  it: {
    line1: "Calliphora Travel — marchio di Cavallinodieci S.r.l. · Via del Cavallino 10, 14100 Asti (AT), Italia",
    line2: "P.IVA IT01416950051 · Licenza n. 2/08 (Comune di Asti) · REA AT-113765",
  },
  en: {
    line1: "Calliphora Travel — a brand of Cavallinodieci S.r.l. · Via del Cavallino 10, 14100 Asti (AT), Italy",
    line2: "VAT IT01416950051 · Licence no. 2/08 (Municipality of Asti) · REA AT-113765",
  },
  pt: {
    line1: "Calliphora Travel — marca de Cavallinodieci S.r.l. · Via del Cavallino 10, 14100 Asti (AT), Itália",
    line2: "NIF IT01416950051 · Licença n.º 2/08 (Município de Asti) · REA AT-113765",
  },
};

const ui: Record<UILang, { h1: string; cta: string }> = {
  es: { h1: "Vuelos y gestión de viajes", cta: "Solicitar cotización" },
  it: { h1: "Servizio di Biglietteria Aerea", cta: "Richiedi un preventivo" },
  en: { h1: "Air Ticketing Service", cta: "Request a quote" },
  pt: { h1: "Business Travel & Travel Management", cta: "Solicitar um orçamento" },
};

const blocksByLang: Record<UILang, Block[]> = {
  es: blocksEs,
  it: blocksIt as Block[],
  en: blocksEn as Block[],
  pt: blocksPt as Block[],
};

export default function Voli() {
  useCanonical("/voli", {
    title: "Vuelos y gestión de viajes — Calliphora Travel",
    description:
      "Tarifas aéreas negociadas y confidenciales, hoteles, traslados, alquiler de autos y asistencia proactiva en viaje. Agencia italiana habilitada desde 2004.",
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [lang, setLang] = useState<UILang>("es");
  const t = ui[lang];
  const blocks = blocksByLang[lang];

  return (
    <div className="theme-calliphora min-h-screen bg-background text-foreground">
      <header className="fixed top-0 inset-x-0 z-50 bg-background/90 backdrop-blur border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <a href="https://www.calliphora.travel" className="flex items-center" aria-label="Calliphora Travel">
            <img src={CALLIPHORA_LOGO} alt="Calliphora Travel" className="h-10 w-auto" />
          </a>
          <div className="flex items-center gap-3">
          <UILangSwitcher value={lang} onChange={setLang} />
          <Button asChild size="sm" className="rounded-full">
            <Link to="/formfly">
              {t.cta}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          </div>
        </div>
      </header>

      <main className="container max-w-3xl pt-28 md:pt-36 pb-16 md:pb-24">
        <span className="inline-block text-xs uppercase tracking-widest text-accent font-semibold mb-3">
          Calliphora Travel
        </span>
        <article className="space-y-6">
          {blocks.map((b, i) =>
            b.type === "h2" ? (
              <h2 key={i} className="text-2xl md:text-3xl mt-10 mb-2 text-foreground">
                {b.text}
              </h2>
            ) : (
              <p
                key={i}
                className={`text-base md:text-lg leading-relaxed text-muted-foreground text-justify${b.italic ? " italic" : ""}`}
              >
                {b.text}
              </p>
            ),
          )}
        </article>

        <div className="mt-12 text-center">
          <Button asChild size="lg" className="rounded-full">
            <Link to="/formfly">
              {t.cta}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <BeforeYouProceed lang={lang} className="mt-10" />

        <footer className="mt-12 border-t border-border pt-6 text-sm text-muted-foreground text-center space-y-1">
          <p>{footer[lang].line1}</p>
          <p>{footer[lang].line2}</p>
        </footer>
      </main>
    </div>
  );
}
