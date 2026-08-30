import { useEffect } from "react";
import { Mail } from "lucide-react";
import { useT } from "@/lib/i18n";
import { useCanonical } from "@/lib/useCanonical";
import { Nav, ContactForm } from "./AboutUs";

const EMAIL = "info@businessmatching.global";

type Block = { type: "h2" | "p" | "li"; text: string; italic?: boolean };

const blocksIt: Block[] = [
  { type: "p", text: "Che cosa deve attraversare l'Atlantico: il prodotto finito, i componenti, il metodo, il marchio, una licenza — o nulla?" },
  { type: "p", text: "È la domanda da cui partiamo, e quasi nessuno la fa prima di aver già deciso la risposta. In alcuni casi, invece di esportare direttamente, conviene produrre su licenza in loco." },

  { type: "h2", text: "Una friggitrice ad aria" },
  { type: "p", text: "Philips ha portato in Brasile la friggitrice ad aria e ne ha brevettato la tecnologia: il flusso d'aria calda, il fondo del cestello sagomato a stella. Ha creato la categoria dal nulla." },
  { type: "p", text: "In Brasile airfryer si dice di qualunque friggitrice senza olio, come fosse una parola del vocabolario. Nessuno la associa più a chi l'ha inventata. Un brevetto protegge una via per arrivare al risultato, non il risultato: e quando le vie sono molte, il vantaggio dura il tempo che serve a trovarne un'altra. Philips ha creato un mercato ed è finita a giocarci dentro come tutti gli altri." },
  { type: "p", text: "Non si tratta di un furto. È una storia di scelte sbagliate su cosa proteggere." },
  { type: "p", text: "Un brevetto non protegge un'idea né un risultato: protegge l'invenzione così come è rivendicata, descritta riga per riga nel testo depositato. Tutto ciò che sta fuori da quelle righe è terreno libero. Alcuni elementi, però, possono essere protetti anche senza brevetto — come segreto industriale, know-how o informazione riservata — a condizione che siano state adottate misure di protezione effettive." },

  { type: "h2", text: "Due mestieri diversi" },
  { type: "p", text: "Esportare un prodotto significa scommettere su dazi, cambio, logistica e tempi doganali: variabili che non controlli e che possono cambiare in un decreto." },
  { type: "p", text: "Trasferire il metodo — cioè autorizzare un'impresa locale a fabbricare con la tua tecnologia, in cambio di un compenso — significa scommettere su una cosa sola: la tua capacità di restare avanti." },
  { type: "p", text: "Licenza: contratto con cui un'impresa autorizza un'altra a fabbricare o usare la propria tecnologia in un territorio definito, per un tempo definito. Royalty: il compenso periodico, di solito una percentuale sul venduto. Entry fee: la somma pagata all'ingresso, prima che la produzione cominci." },
  { type: "p", text: "Per molte PMI europee il Brasile è il caso da manuale: dazi e costo logistico mettono il prodotto finito fuori mercato, mentre lo stesso prodotto fabbricato in loco sarebbe competitivo. Vale, identica, nella direzione opposta: un metodo brasiliano che in Europa non arriverebbe mai come merce." },

  { type: "h2", text: "Perché il Brasile e non l'America Latina" },
  { type: "p", text: "\"America Latina\" non è un mercato, è una categoria geografica. Chi la tratta come un blocco unico finisce per spendere in cinque Paesi quello che sarebbe bastato per entrare bene in uno." },
  { type: "p", text: "Le proporzioni, in valore assoluto. Il Brasile concentra da solo circa la metà del prodotto interno lordo sudamericano. Ma il dato che conta per chi vende non è la ricchezza media: è quante persone possono permettersi il vostro prodotto — e lì la disuguaglianza brasiliana, che di solito si cita come problema, diventa aritmetica a vostro favore. Anche con una stima prudente della fascia ad alta capacità di spesa si parla di decine di milioni di persone: una platea più numerosa dell'intera popolazione del Cile, e diverse volte quella di Paraguay e Uruguay messi insieme. La sola area metropolitana di San Paolo supera i venti milioni di abitanti. Un segmento di nicchia in Brasile è più grande di un mercato intero altrove — con una lingua sola, una moneta sola, un solo regime doganale." },
  { type: "p", text: "Il Brasile non è un mercato omogeneo: è un arcipelago di mercati. Ventisei stati più il Distretto Federale, ciascuno con la propria imposta sulla circolazione delle merci, le proprie aliquote e i propri regimi agevolati per chi importa o si insedia sul suo territorio. Ne discende una cosa che sorprende quasi tutti gli europei: far arrivare la stessa merce in un porto invece che in un altro, o insediarsi in uno stato invece che nel confinante, cambia il carico fiscale, a volte in misura decisiva per il margine. Gli stati competono tra loro per attirare importazioni e stabilimenti, e questa competizione è ancora aperta — per ora. La riforma tributaria sostituisce progressivamente le imposte statali con un'imposta unica sul consumo, spostando il gettito verso lo stato di destinazione: la transizione si completa nei primi anni Trenta, e con essa la convenienza a scegliere l'ingresso in funzione fiscale è destinata a ridursi. Chi struttura la propria presenza mentre la finestra è aperta consolida un vantaggio; chi arriva dopo troverà un campo più piatto." },
  { type: "p", text: "E la scelta non è mai solo fiscale. Il Paese è grande quanto un continente e la logistica interna costa: sdoganare dove conviene fiscalmente ma a duemila chilometri dal proprio mercato di riferimento significa restituire in trasporto quello che si era risparmiato in imposte, con l'aggiunta di tempi e rischi. Lo stesso vale per il luogo di produzione. La decisione giusta è il punto di equilibrio tra i due conti, e si calcola caso per caso: dove sono i vostri clienti, quanto pesa il prodotto rispetto al suo valore, quale stato ha oggi il regime più favorevole per la vostra categoria merceologica." },
  { type: "p", text: "La difficoltà è il motivo per andarci, non per evitarlo. Dazi, complessità tributaria, certificazioni obbligatorie, logistica interna costosa: tutto vero. Ma una barriera funziona in entrambe le direzioni. Dove entrare è facile ci sono già tutti, e l'essere arrivati non vale niente. In Brasile la stessa difficoltà che oggi vi tiene fuori, domani tiene fuori chi verrebbe dopo di voi." },
  { type: "p", text: "È l'unico mercato della regione dove il trasferimento di metodo ha senso pieno, perché serve una base industriale capace di fabbricare su licenza. Il Messico ne ha una, ma è costruita attorno agli Stati Uniti: si produce lì per riesportare a nord, non per servire il mercato interno. È una logica diversa, e confonderle significa sbagliare progetto." },
  { type: "p", text: "Gli altri Paesi contano come base, non come mercato. Paraguay, Uruguay e Argentina offrono regimi di maquila, zone franche, costi industriali più bassi — e stanno dentro il Mercosur, quindi la merce prodotta lì può raggiungere il Brasile senza dazio esterno comune, rispettando le regole di origine e i relativi adempimenti documentali, salve le eccezioni previste. Non cinque mercati invece di uno: una base di costo che serve l'unico mercato che conta." },
  { type: "p", text: "Le regole cambiano mentre state decidendo. Un mercato non è solo domanda e concorrenza: è un insieme di regole, e in Brasile cambiano più spesso che in Europa. Un esempio in corso, aggiornato ad agosto 2026: la riforma tributaria ha istituito l'Imposto Seletivo — quello che i brasiliani chiamano imposto do pecado — rinviando a una legge successiva la definizione delle aliquote. Entra in vigore il 1° gennaio 2027 secondo la legge complementare già approvata e, per il principio dei novanta giorni, il testo sulle aliquote dovrebbe essere pubblicato entro l'inizio di ottobre 2026 — termine così stretto che si discute di fissarle con decreto d'urgenza anziché con legge ordinaria. Riguarda categorie precise — tabacco, bevande alcoliche, bevande zuccherate, veicoli, minerali estratti, scommesse — e se il vostro prodotto non è in quella lista non vi tocca. Ma domani sarà un'altra norma: una certificazione che diventa obbligatoria, una regola di etichettatura, un incentivo statale che apre o si chiude. Quasi tutte si vedono arrivare con mesi di anticipo, a condizione che qualcuno stia guardando dal lato giusto del corridoio. Chi è già dentro ha il tempo di adattarsi, e spesso ci guadagna: il costo di adeguarsi è uguale per tutti, ma pesa molto di più su chi deve ancora entrare." },
  { type: "p", text: "Le certificazioni sono un fossato, non solo un costo. Registrazioni INMETRO, ANVISA, MAPA o ANATEL a seconda del prodotto: mesi di lavoro e spese certe. È la ragione per cui molti rinunciano, ed è esattamente perché vale la pena farlo — una volta ottenute, obbligano ogni concorrente futuro allo stesso percorso mentre voi siete già a scaffale. Con un'avvertenza che è la chiave di volta applicata a questo caso: evitate che il distributore controlli in esclusiva registrazioni, autorizzazioni o dossier regolatori indispensabili alla continuità dell'operazione. La titolarità diretta da parte dell'impresa straniera non è sempre possibile — dipende dal prodotto, dall'autorità competente e da chi risponde legalmente di fabbricazione, importazione e distribuzione. Dove non lo è, vanno disciplinati per contratto l'accesso ai documenti, il diritto di trasferimento, la collaborazione alla migrazione e le conseguenze della cessazione. Chi detiene il registro detiene l'accesso al mercato, e cambiare distributore deve restare una vostra decisione invece che una trattativa." },
  { type: "p", text: "Quando la risposta non è il Brasile, e lo diciamo volentieri: volumi piccoli destinati a restare tali; prodotti di servizio o digitali, dove Cile e Uruguay sono molto più semplici; obiettivo di rifornire il mercato nordamericano, dove il Messico vince senza discussione." },

  { type: "h2", text: "La domanda che viene prima del contratto" },
  { type: "p", text: "Il metodo sta dentro l'oggetto o dentro le persone?" },
  { type: "p", text: "Se sta dentro l'oggetto — un elettrodomestico, uno stampo, una formulazione semplice — qualunque partner serio lo smonta e lo ricostruisce in pochi mesi. In quel caso la licenza non protegge: quello che stai vendendo è tempo di mercato e marchio. E allora il denaro va preso davanti: entry fee alto, royalty modeste, durata corta." },
  { type: "p", text: "Se sta dentro le persone e dentro una relazione continua — agronomia, controllo qualità, protocolli di processo, taratura, formazione tecnica — il trasferimento regge. Regge perché ogni anno esiste una versione nuova che il licenziatario, da solo, non saprebbe produrre." },

  { type: "h2", text: "Un frigorifero a querosene" },
  { type: "p", text: "Nel 1947, in un'officina di Brusque, in Santa Catarina, arrivò da riparare un frigorifero importato che funzionava a querosene. In Brasile, all'epoca, i frigoriferi erano solo d'importazione e stavano nelle case dei molto ricchi. I due meccanici lo smontarono pezzo per pezzo, studiarono ogni componente e decisero di costruirne uno proprio. Ne fabbricarono trentuno in quel capannone; nel 1950 l'officina diventò fabbrica a Joinville e prese il nome Consul. Il primo modello raffreddava per assorbimento, alimentato a querosene — la tecnologia adatta a un Paese dove la rete elettrica non arrivava ancora nella maggior parte delle case. Da lì sono nati un'industria nazionale dei compressori, la fusione con Brastemp e infine uno dei maggiori poli mondiali della refrigerazione." },
  { type: "p", text: "È il rovescio esatto della friggitrice. Là il produttore c'era e ha protetto la cosa sbagliata; qui non c'era affatto: vendeva un apparecchio importato, caro, progettato per un altro Paese. Nessuno lo ha copiato per malizia. È stato ricostruito perché nessuno stava rispondendo al problema vero, che non era fare freddo, ma fare freddo dove non c'è corrente." },
  { type: "p", text: "Da cui la regola: l'adattamento locale avviene comunque. L'unica variabile è se avviene con te o senza di te. Chi arriva con un catalogo tradotto e un listino in euro lascia ad altri il lavoro di adattamento — e quegli altri, dopo, non hanno più bisogno di lui." },

  { type: "h2", text: "La chiave di volta" },
  { type: "p", text: "Nell'arco, la chiave di volta è la pietra centrale: toglila e crolla tutto, per quanto perfette siano le altre pietre." },
  { type: "p", text: "In una licenza è il pezzo che non consegni. Non un pezzo qualsiasi tenuto per sé, ma quello la cui assenza ferma la produzione o ne peggiora il risultato in modo che il cliente finale se ne accorga. La semente esclusiva dietro un metodo agronomico trasferito per intero. Il ceppo di fermento dietro un processo caseario insegnato tutto. I parametri di taratura, il software di controllo, la certificazione, il marchio." },
  { type: "p", text: "Si riconosce da tre condizioni, che devono valere insieme:" },
  { type: "li", text: "Se manca, il prodotto non esce, o esce peggio in modo percepibile." },
  { type: "li", text: "Non è replicabile in loco a costo ragionevole. Se il licenziatario se la costruisce in casa con due tecnici e sei mesi, non è una chiave di volta: è un ritardo." },
  { type: "li", text: "Te la può comprare a un prezzo equo. È la condizione che quasi tutti sbagliano. Se la fai pagare troppo, sei tu a finanziare la ricerca del sostituto. La chiave di volta si difende restando conveniente, non stringendo." },
  { type: "p", text: "E ha sempre un tempo di dimezzamento. Non esiste quella definitiva: esiste quella che ti compra gli anni necessari a costruire la successiva." },
  { type: "p", text: "C'è anche una ragione fiscale, recente, per tenere il metodo vivo: le nuove regole brasiliane sui prezzi di trasferimento riconoscono il diritto alla royalty solo a chi dimostra di sviluppare, mantenere e proteggere attivamente ciò che ha dato in licenza. Chi trasferisce tutto e smette di innovare non perde solo il potere negoziale — mette a rischio la deducibilità del compenso dall'altra parte del tavolo." },

  { type: "h2", text: "Le formalità che in Brasile non si saltano" },
  { type: "p", text: "La protezione industriale è territoriale. Un brevetto o un marchio europeo, in Brasile, semplicemente non esistono. Vanno depositati all'INPI brasiliano, e il marchio va depositato prima di aprire le conversazioni: il rischio più frequente non è la copia del prodotto, è il partner che registra il marchio a proprio nome." },
  { type: "p", text: "L'averbação o registro all'INPI va valutata in funzione del contratto e degli effetti che volete ottenere. Fino a pochi anni fa era il passaggio obbligato per rimettere royalty all'estero e per dedurle: la riforma valutaria del 2021 e le regole sui prezzi di trasferimento del 2023 hanno cambiato il quadro, e oggi la rimessa dipende essenzialmente dalla prova del pagamento dell'imposta dovuta. Resta però rilevante per la certezza giuridica e, in determinate ipotesi, per produrre effetti verso terzi. È esattamente il tipo di punto su cui la risposta giusta dipende dalla struttura concreta, e va verificata con i professionisti incaricati. In particolare la deducibilità fiscale delle royalty e dei pagamenti per tecnologia, dopo le modifiche legislative del 2021 e del 2023, richiede un'analisi specifica del contratto, della natura del pagamento e del regime tributario applicabile: la posizione non è uniforme in tutti i casi." },
  { type: "p", text: "I pagamenti transfrontalieri hanno un costo fiscale proprio: ritenute alla fonte, CIDE sulle rimesse e altri effetti che variano secondo la natura del contratto, le parti coinvolte e la struttura del compenso. Vanno messi nel conto economico prima di negoziare la percentuale, non dopo." },
  { type: "p", text: "Nel testo: perimetro d'uso e territorio delimitati, minimi garantiti, diritto di verifica sui numeri di vendita, proprietà dei miglioramenti sviluppati in loco, riservatezza e divieto d'uso del know-how che sopravvivono alla fine del contratto, penale. E l'arbitrato, che nei contratti internazionali offre di norma maggiore prevedibilità procedurale del contenzioso ordinario — ma sede, istituzione, lingua, legge applicabile, misure d'urgenza e strategia di esecuzione vanno scelti caso per caso: un lodo pronunciato all'estero, per essere eseguito in Brasile, passa dall'omologazione del Superior Tribunal de Justiça." },

  { type: "h2", text: "Perché lo sentite dire di rado" },
  { type: "p", text: "Non è un segreto tecnico. Il licensing è materia da manuale, e le grandi imprese lo praticano da sempre. Quello che manca è chi lo porti alla piccola e media impresa: l'ecosistema costruito attorno a lei — camere di commercio, bandi, voucher, fiere, contributi all'internazionalizzazione — è nato per far uscire merce e misura il proprio risultato in merce uscita. Nessuno di quei soggetti ha un motivo per dire all'imprenditore che forse il suo prodotto non deve entrare come prodotto." },
  { type: "p", text: "E vale anche il rovescio, che diciamo volentieri: il trasferimento di metodo non è sempre la risposta giusta. Ne servono tre insieme — una controparte industriale che esista davvero e sappia fabbricare; un volume che giustifichi la produzione locale; un metodo abbastanza vivo da alimentare il rapporto anno dopo anno. Su una nicchia da poche centinaia di pezzi l'anno la licenza non ha senso e l'esportazione sì. Quando è così, lo diciamo prima, non dopo." },

  { type: "h2", text: "Tre obiezioni, dette apertamente" },
  { type: "p", text: "\"Serve qualcuno che stia in azienda e conosca il prodotto.\" Vero — e quel qualcuno non siamo noi. Ma il vostro prodotto lo conoscete già voi meglio di chiunque altro: l'informazione che vi manca non è nel vostro capannone, è dall'altra parte del corridoio. Le due presenze non competono, si sommano." },
  { type: "p", text: "\"Un metodo collaudato funziona su qualsiasi mercato.\" Un metodo di lavoro sì, la conoscenza di un mercato no. Chi copre trenta Paesi con la stessa procedura vi restituirà una procedura ordinata, costruita su dati che potreste acquistare da soli. Noi copriamo un corridoio solo, e ci viviamo dentro. La domanda da fare a chiunque si proponga — noi compresi: quante volte è stato fisicamente in quel mercato negli ultimi dodici mesi, in che lingua parla con le controparti, di quali associazioni locali è socio." },
  { type: "p", text: "\"Ci serve chi porta trattative, non analisi.\" Legittimo. Ma chi viene remunerato per far accadere l'export difficilmente concluderà che quel mercato non fa per voi. Noi possiamo, e a volte succede. Il primo lavoro che consegniamo è un verdetto — procedere, approfondire, lasciar perdere — e costa poche centinaia di euro proprio perché serve a farvi risparmiare le decine di migliaia che verrebbero dopo." },

  { type: "h2", text: "Come lavoriamo" },
  { type: "p", text: "Lavoriamo tra l'Europa e il Brasile e comprendiamo sia le esigenze di imprese, professionisti e clienti europei e internazionali, sia la complessa realtà normativa, amministrativa, fiscale e culturale del mercato brasiliano. La nostra competenza nasce da un percorso internazionale che unisce diritto, commercio internazionale, europrogettazione, attività imprenditoriale e conoscenza pratica dei mercati europei e brasiliani." },
  { type: "p", text: "Il nostro obiettivo è aiutarvi a comprendere meglio il contesto in cui volete operare, riducendo l'impatto del cosiddetto Custo Brasil: burocrazia, complessità regolatoria, asimmetrie informative, difficoltà interpretative e rischi operativi che possono rallentare o complicare le decisioni. Il nostro lavoro è indipendente, riservato e orientato a fornire informazioni affidabili, selezionate e realmente utili per decidere in modo informato. Niente rumore, niente riempitivi: solo le risposte che servono, nei tempi giusti." },
  { type: "p", text: "Non ci limitiamo a dire che serve un avvocato. Componiamo e coordiniamo il team — studio legale in Brasile e in Europa, consulente di proprietà industriale, fiscalista, perito tecnico dove occorre — e teniamo insieme l'architettura dell'operazione dal primo giorno all'ultima firma." },
  { type: "p", text: "È la differenza che conta davvero: chi ha in mente l'architettura completa sa cosa chiedere, a chi e in che ordine. Un parere legale eccellente su una domanda mal posta costa uguale e non protegge da nulla." },
  { type: "p", text: "In concreto:" },
  { type: "li", text: "disegniamo l'architettura dell'operazione — cosa si trasferisce, in quante fasi, cosa resta fuori e perché;" },
  { type: "li", text: "verifichiamo la controparte prima che il tavolo si apra: assetto societario, storia, contenziosi, capacità industriale reale, e cosa sa già fare da sola;" },
  { type: "li", text: "individuiamo la chiave di volta credibile nel caso specifico, e per quanti anni può reggere;" },
  { type: "li", text: "traduciamo la strategia in istruzioni precise per i professionisti incaricati, e rileggiamo il loro lavoro rispetto all'obiettivo commerciale, non solo rispetto alla norma;" },
  { type: "li", text: "teniamo il ritmo tra fusi orari, lingue, uffici e autorità diverse." },
  { type: "p", text: "Ogni passaggio ha un esito dichiarato, un tempo di consegna e un documento che resta in mano vostra: il primo è un verdetto — procedere, approfondire, lasciar perdere — con le ragioni scritte. Nessuna fase successiva parte prima che la precedente sia stata consegnata e discussa." },
  { type: "p", text: "Cosa significa selezionare. In Brasile esercitano circa 1,3 milioni di avvocati: uno ogni 164 abitanti, la proporzione più alta al mondo. Non è un problema di qualità, è un problema di scelta — e vale allo stesso modo per commercialisti, fiscalisti, agenti di proprietà industriale e periti tecnici. L'iscrizione all'albo dice che il professionista può esercitare; non dice che abbia mai visto un contratto di trasferimento di tecnologia, un'averbação all'INPI o una controparte europea dall'altro lato del tavolo. Noi selezioniamo sulla competenza dimostrata nella materia specifica — operazioni concluse, casi seguiti, capacità di lavorare tra due lingue e due ordinamenti — non sul requisito formale. Chi non conosce il Paese quel filtro non può applicarlo, perché non sa nemmeno quali domande fare." },
  { type: "p", text: "E se avete già un export manager? Tanto meglio: non prendiamo il suo posto, siamo la sua controparte dall'altra parte del corridoio. Parliamo la stessa lingua — obiettivi commerciali, margini, tempi di consegna — ma il mercato lo conosciamo da dentro: chi c'è davvero, come si fabbrica in loco, cosa chiedono le autorità, quale distributore ha smesso di pagare i fornitori l'anno scorso." },
  { type: "p", text: "Il nostro lavoro è mettergli in mano dati e valutazioni aggiornate e indipendenti. Indipendenti in senso concreto: sui servizi di analisi il compenso è fisso e non dipende dall'esito, quindi non abbiamo alcun motivo per restituire un quadro più incoraggiante di quello che è. Dove offriamo anche rappresentanza commerciale, con una componente variabile sul venduto, si tratta di un incarico distinto: non lo abbiniamo all'analisi sulla stessa operazione, e se le due cose si incontrano lo diciamo prima. Chi si occupa di export lavora meglio quando le informazioni su cui decide sono verificate e recenti — e peggio quando sono di seconda mano o di due anni fa." },
  { type: "p", text: "Di solito è un investimento piccolo rispetto a ciò che protegge: una verifica fatta in tempo costa una frazione di un container fermo in dogana, di un distributore scelto male o di un marchio registrato da qualcun altro." },
  { type: "p", text: "Non pubblichiamo nomi di clienti né casi riconoscibili. Chi ci chiede di verificare le proprie controparti si aspetta la stessa discrezione, e la ottiene." },
  { type: "p", text: "Trattiamo ogni conversazione come coperta da riservatezza dal primo messaggio, che esista o meno un documento firmato. Se preferite formalizzarlo, l'accordo bilaterale è pronto e lo firmiamo prima di entrare nel merito." },
  { type: "p", text: "I pareri legali e fiscali sono resi da professionisti abilitati nei rispettivi ordinamenti, selezionati da noi per il caso specifico e abituati a lavorare tra Brasile ed Europa; rispondono direttamente al cliente. Noi teniamo insieme il disegno." },
];

export default function Method() {
  useCanonical("/method", {
    title: "Trasferire il metodo, non solo il prodotto | Business Matching Global",
    description:
      "Licenza, royalty e trasferimento di tecnologia verso il Brasile: quando conviene produrre in loco invece di esportare, e come proteggere la chiave di volta.",
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <div className="container max-w-3xl pt-32 md:pt-40 pb-16 md:pb-24">
        <h1 className="font-display text-4xl md:text-5xl leading-tight mb-8">
          Trasferire il metodo, non solo il prodotto
        </h1>
        <article className="space-y-6">
          {blocks.map((b, i) =>
            b.type === "h2" ? (
              <h2 key={i} className="font-display text-2xl md:text-3xl mt-10 mb-2 text-foreground">
                {b.text}
              </h2>
            ) : b.type === "li" ? (
              <p
                key={i}
                className="text-base md:text-lg leading-relaxed text-muted-foreground text-justify pl-5 border-l-2 border-border"
              >
                {b.text}
              </p>
            ) : (
              <p key={i} className="text-base md:text-lg leading-relaxed text-muted-foreground text-justify">
                {b.text}
              </p>
            )
          )}
        </article>

        <div className="mt-14 pt-10 border-t border-border">
          <h2 className="font-display text-2xl md:text-3xl mb-3">→ Parliamone</h2>
          <p className="text-base md:text-lg text-muted-foreground">
            Scrivici a{" "}
            <a href={`mailto:${EMAIL}`} className="text-primary underline hover:text-primary/80 inline-flex items-center gap-1">
              <Mail className="h-4 w-4" /> {EMAIL}
            </a>{" "}
            oppure usa il modulo qui sotto.
          </p>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
