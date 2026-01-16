import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const EuMercosur = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="container mx-auto px-6">
          <Link to="/">
            <Button variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10 mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Torna alla Home
            </Button>
          </Link>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight max-w-4xl">
            UE–Mercosur: non è (solo) un accordo commerciale. È un cambio di fase storico
          </h1>
          <p className="text-primary-foreground/80 mt-4 text-lg">17 Gennaio 2026</p>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-6 py-12 md:py-16">
        <article className="max-w-3xl mx-auto prose prose-lg prose-slate dark:prose-invert">
          <p className="lead text-xl text-muted-foreground leading-relaxed">
            Il 17 gennaio 2026 non è una data qualsiasi. Con la firma dell'Accordo di Associazione tra Unione Europea e Mercosur ad Asunción, si chiude uno dei negoziati più lunghi e complessi della storia commerciale contemporanea e, soprattutto, se ne apre un altro: quello dell'implementazione reale, concreta, operativa.
          </p>

          <p>
            Dopo oltre venticinque anni di trattative, veti incrociati, stop politici e rilanci diplomatici, l'accordo esce finalmente dalla dimensione astratta dei comunicati ufficiali e diventa una variabile strategica con cui imprese, investitori e istituzioni dovranno confrontarsi da subito.
          </p>

          <p className="font-semibold text-foreground">
            Per chi opera lungo l'asse Europa–Brasile, questo passaggio segna la fine dell'ambiguità e l'inizio di una nuova normalità.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Perché questo accordo arriva adesso</h2>
          
          <p>
            Il tempismo non è casuale. L'Europa si muove in un contesto di frammentazione globale, de-globalizzazione selettiva e crescente insicurezza delle catene di fornitura. La guerra in Ucraina ha mostrato quanto possa essere rischiosa la dipendenza da pochi fornitori; la competizione USA-Cina ha reso evidente che la neutralità commerciale non è più un'opzione.
          </p>

          <p>
            In questo scenario, il Mercosur rappresenta per l'Europa una combinazione rara: sicurezza alimentare, abbondanza di materie prime critiche, mercato in crescita e affinità regolatoria potenziale. Per il Mercosur, invece, l'UE rimane il partner capace di esportare standard, tecnologia, capitale e know-how industriale.
          </p>

          <p>
            Non si tratta quindi di "libero scambio" nel senso classico, ma di una scelta geopolitica reciproca: diversificare, riequilibrare, ridurre il rischio sistemico.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">L'aspetto meno raccontato: l'architettura giuridica</h2>

          <p>
            Uno degli elementi più innovativi – e meno compresi nel dibattito pubblico – è la struttura "a due pilastri" dell'accordo. La parte commerciale rientra nella competenza esclusiva europea e può entrare in vigore in via provvisoria senza passare dai 27 parlamenti nazionali. Questo significa una cosa molto concreta: le imprese non devono aspettare anni per vedere gli effetti sui dazi, sulle regole di origine e sull'accesso ai mercati.
          </p>

          <p>
            È una lezione appresa dal passato (CETA docet) e un segnale politico chiaro: Bruxelles ha deciso che il commercio strategico non può più essere ostaggio della politica interna di singoli Stati membri.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Agricoltura: meno ideologia, più numeri</h2>

          <p>
            Gran parte dell'opposizione europea all'accordo si è concentrata sull'agricoltura, spesso con toni allarmistici. Ma i dati raccontano una storia diversa. Non c'è alcuna liberalizzazione indiscriminata: per i prodotti sensibili valgono quote precise, limitate, monitorate.
          </p>

          <p>
            La carne bovina, ad esempio, entra con una quota che rappresenta una frazione minima del consumo europeo totale. Non è un accordo di volume, ma di valore. Favorisce i prodotti premium, tracciabili, conformi agli standard sanitari UE. Tutto il resto resta fuori.
          </p>

          <p>
            Questo cambia radicalmente la strategia per gli esportatori sudamericani: meno commodity, più posizionamento; meno quantità, più margine.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Industria e macchinari: qui si gioca la partita vera</h2>

          <p>
            Se l'agricoltura è il capitolo più mediatico, l'industria è quello strutturalmente più rilevante. Per il Mercosur – e per il Brasile in particolare – l'apertura graduale ai beni industriali europei è uno shock competitivo, ma anche un'opportunità storica di modernizzazione.
          </p>

          <p>
            Macchinari, chimica, farmaceutica, componentistica: l'abbattimento dei dazi riduce il costo del capitale produttivo e accelera il rinnovo tecnologico. La protezione temporale di 10-15 anni per alcuni settori non è un cuscinetto per dormire, ma una finestra per adattarsi. Chi la spreca, difficilmente avrà una seconda occasione.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Appalti pubblici e servizi: il capitolo sottovalutato</h2>

          <p>
            C'è poi un capitolo quasi assente dal dibattito pubblico, ma di enorme valore: l'accesso reciproco agli appalti pubblici. Per la prima volta, aziende brasiliane ed europee potranno competere su basi paritarie nei bandi federali dell'altra parte.
          </p>

          <p>
            In Europa significa un mercato da migliaia di miliardi; in Brasile significa trasparenza, standardizzazione e fine di molte barriere informali. È una rivoluzione silenziosa, che favorisce chi è strutturato, compliant e pronto a giocare su scala internazionale.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Sostenibilità: non uno slogan, ma una clausola vincolante</h2>

          <p>
            Il nodo ambientale non è stato risolto con dichiarazioni di principio, ma con uno strumento giuridico vincolante. L'Accordo di Parigi diventa "elemento essenziale": se uno Stato lo viola in modo grave, l'altra parte può sospendere l'intero accordo commerciale.
          </p>

          <p>
            È un precedente potente. E si affianca a normative autonome come l'EUDR sulla deforestazione, che resterà pienamente applicabile. In altre parole: l'accordo apre porte, ma solo a chi dimostra tracciabilità, conformità e responsabilità.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Conclusione: un ponte in un mondo di muri</h2>

          <p>
            L'accordo UE–Mercosur non è perfetto. È asimmetrico, politicamente fragile, tecnicamente complesso. Ma in un mondo che alza barriere, rappresenta il più grande ponte economico costruito negli ultimi decenni tra due continenti.
          </p>

          <p className="font-semibold text-foreground">
            Per le imprese, il messaggio è chiaro: non è il momento di chiedersi se l'accordo entrerà in vigore, ma come posizionarsi per sfruttarlo. Chi aspetta rischia di arrivare tardi; chi pianifica ora può trasformare un trattato in vantaggio competitivo reale.
          </p>

          <div className="mt-16 pt-8 border-t border-border">
            <Link to="/#contact">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Contattaci per una consulenza
              </Button>
            </Link>
          </div>
        </article>
      </main>

      {/* Footer */}
      <footer className="bg-muted py-8 mt-16">
        <div className="container mx-auto px-6 text-center text-muted-foreground">
          <p>© 2026 Monello Brasil Consult. Tutti i diritti riservati.</p>
        </div>
      </footer>
    </div>
  );
};

export default EuMercosur;
