import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useT } from "@/lib/i18n";
import { useCanonical } from "@/lib/useCanonical";
import logoBMG from "@/assets/logo-business-matching-global-transparent.png.asset.json";

type Block = { type: "h2"; text: string } | { type: "p"; text: string; italic?: boolean };

const blocks: Block[] = [
  { type: "p", text: "Un viaggio non comincia al gate. Comincia da chi ve lo prepara.", italic: true },
  { type: "p", text: "Il servizio travel di Business Matching Global nasce dalla partnership con CAVALLINODIECI S.r.l., società del nostro gruppo che opera nell'organizzazione e nell'intermediazione di viaggi e nella biglietteria aerea dal 2004 — dal 2008 con l'attuale ragione sociale — con le regolari autorizzazioni di legge." },
  { type: "p", text: "Da questa collaborazione nasce un desk unico, che vi segue dalla prima richiesta al ritorno a casa: biglietteria aerea, sistemazioni alberghiere, noleggio auto, trasferimenti, coperture assicurative." },

  { type: "h2", text: "Tariffe negoziate e confidenziali" },
  { type: "p", text: "Vent'anni di rapporti con i vettori si traducono in qualcosa di molto concreto: l'accesso a tariffe negoziate e confidenziali. Il nome dice già tutto: per definizione non possono essere pubblicate. Non le trovate sulle OTA — le Online Travel Agency, i grandi portali di prenotazione online su cui si confrontano i prezzi — non le trovate sugli IBT, gli Internet Booking Tool con cui molte aziende prenotano in autonomia, e non le trovate nemmeno sui siti delle compagnie aeree." },
  { type: "p", text: "Il vantaggio più immediato è il prezzo, spesso molto competitivo rispetto alle tariffe pubbliche. Ma non è l'unico. Le tariffe VFR (Visiting Friends and Relatives), per esempio, accanto a un prezzo più basso prevedono in genere una franchigia bagaglio più generosa e regole di cambio più flessibili rispetto alle tariffe pubbliche." },

  { type: "h2", text: "Non vi vendiamo un biglietto. Vi costruiamo un viaggio senza attriti." },
  { type: "p", text: "Il nostro lavoro non finisce con l'emissione: comincia prima e si chiude quando siete rientrati a casa." },
  { type: "p", text: "Prima della partenza anticipiamo gli elementi che possono compromettere la serenità del viaggio: documenti e requisiti d'ingresso, tempi minimi di connessione, coincidenze fragili, regole bagaglio, coperture assicurative adeguate al percorso." },
  { type: "p", text: "Durante il viaggio gestiamo in modo proattivo gli imprevisti — cancellazioni, overbooking, riprotezioni: quello che in gergo si chiama IROPS, irregular operations — per ridurre al minimo il disagio che dovrete sopportare. Non aspettiamo che ci chiamiate dall'aeroporto." },

  { type: "h2", text: "Non tutti gli aerei vi trattano allo stesso modo" },
  { type: "p", text: "Potete volare in Business class, sulla poltrona che offre il massimo comfort disponibile sul mercato, e scendere comunque a destinazione sentendovi uno straccio. Spesso non è colpa della poltrona. È la fusoliera." },
  { type: "p", text: "Un aereo con fusoliera in alluminio non può essere pressurizzato oltre un certo limite: la cabina viaggia a un'altitudine equivalente di circa 2.400 metri, con un'umidità che sulle lunghe percorrenze scende spesso sotto il 10% — più secca di molti deserti. Meno ossigeno nel sangue, disidratazione, mal di testa, jet lag più lungo." },
  { type: "p", text: "Una fusoliera in materiale composito — è il caso di Boeing 787 e Airbus A350 — regge pressioni maggiori e non teme la corrosione. Risultato: cabina equivalente a circa 1.800 metri, umidità che può arrivare al 15-20%, rumorosità inferiore, filtrazione dell'aria migliore, e sistemi che attenuano le turbolenze prima che le sentiate. Sullo stesso volo di dieci ore, la differenza al momento dello sbarco è tangibile." },
  { type: "p", text: "Il punto è che questa variabile non compare in nessun motore di ricerca e non entra in nessun confronto di prezzo. Sulla stessa rotta, nello stesso giorno, con la stessa classe di servizio e a parità di tariffa, potete trovare macchine completamente diverse a seconda del numero di volo." },
  { type: "p", text: "Noi vi sappiamo consigliare anche su questo: tipo di aeromobile effettivamente operato, configurazione della cabina, posizione della poltrona, orario di partenza e struttura delle coincidenze rispetto al vostro fuso e ai vostri impegni all'arrivo." },
  { type: "p", text: "Perché il viaggio non finisce quando atterrate. Finisce quando siete in grado di fare quello per cui siete partiti.", italic: true },

  { type: "h2", text: "Il valore del denaro che spendete" },
  { type: "p", text: "Da subito. Vi apriamo l'accesso a tariffe competitive con molti vettori e verso molte destinazioni nel mondo." },
  { type: "p", text: "Se volate molto. Quando emergono compagnie e rotte ricorrenti nei vostri spostamenti, negoziamo per voi accordi dedicati sui vostri flussi reali." },
  { type: "p", text: "Se siete una PMI senza grandi volumi. Gestiamo la vostra iscrizione ai programmi aziendali delle diverse compagnie: programmi che maturano un credito a ogni volo, da riutilizzare per l'acquisto di altri biglietti. La partecipazione a questi programmi non esclude l'accumulo di punti sui frequent flyer individuali: i due binari corrono in parallelo." },
  { type: "p", text: "Sui frequent flyer. Vi affianchiamo anche qui, per accumulare più in fretta dove è possibile e per trasformare i punti in viaggi premio effettivamente prenotabili — che è la parte in cui la maggior parte dei viaggiatori si arrende." },

  { type: "h2", text: "Anche quando non viaggiate per lavoro" },
  { type: "p", text: "Lo stesso impegno e la stessa esperienza valgono per i viaggi di piacere. E non solo sul volo: disponiamo di tariffe negoziate e confidenziali anche con hotel e autonoleggi, e sappiamo individuare le coperture assicurative con il miglior rapporto tra costo e protezione effettiva per il vostro prossimo viaggio." },

  { type: "h2", text: "L'operatore umano resta al centro" },
  { type: "p", text: "Al centro del servizio c'è una persona. Sempre." },
  { type: "p", text: "Stiamo affiancando ai nostri operatori IVA — Intelligent Vacation Assistant, che potete vedere all'opera nel video in questa pagina: non un sostituto, ma una sorta di esoscheletro che amplifica le capacità di chi lavora sulla vostra pratica. Human in the loop: la tecnologia lavora dietro le quinte, la responsabilità e la relazione restano di chi vi risponde." },

  { type: "h2", text: "Provateci, senza impegno" },
  { type: "p", text: "Compilate il modulo qui sotto per mettere alla prova il servizio: nessun vincolo da parte vostra." },
  { type: "p", text: "Le informazioni richieste possono sembrare molte. In realtà sono esattamente quelle che ci servono — e nulla di più — per costruire la soluzione migliore già alla prima proposta: cosa desiderate, ma anche cosa potete ottenere in base a cittadinanza, residenza e documenti. È il primo passo per rendere il vostro viaggio il più possibile frictionless." },
];

export default function BusinessTravel() {
  const { lang, setLang } = useT();
  useCanonical("/BT", {
    title: "Business Travel & Travel Management — Business Matching Global",
    description: "Desk travel dedicato: biglietteria aerea con tariffe negoziate e confidenziali, hotel, noleggio auto, trasferimenti e coperture assicurative.",
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (lang !== "it") setLang("it");
  }, [lang, setLang]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed top-0 inset-x-0 z-50 bg-background/90 backdrop-blur border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="flex items-center" aria-label="Business Matching Global">
            <img src={logoBMG.url} alt="Business Matching Global" className="h-10 w-auto" />
          </Link>
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" /> Home
          </Link>
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
              Richiedi un preventivo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <p className="mt-10 pt-6 border-t border-border text-sm text-muted-foreground text-justify">
          I servizi di organizzazione e intermediazione di viaggi e la biglietteria aerea sono erogati da CAVALLINODIECI S.r.l., in possesso delle autorizzazioni previste dalla normativa vigente.
        </p>
      </main>
    </div>
  );
}
