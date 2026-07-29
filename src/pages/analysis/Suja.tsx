import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useT } from "@/lib/i18n";
import { getArticleBySlug } from "@/lib/analysis";
import { AnalysisFooter } from "@/components/AnalysisFooter";
import { useCanonical } from "@/lib/useCanonical";
import { ShareBlock } from "@/components/ShareBlock";
import { LangSwitcher } from "@/components/LangSwitcher";

const content = {
  it: {
    back: "Torna alle analisi",
    body: [
      { h: "Stesso crimine, due architetture" },
      { p: "Cinquantacinque anni di lavoro domestico non retribuito. Il risarcimento: un appartamento ammobiliato e circa 8.500 euro in contanti." },
      { p: "Nel luglio del 2026, gli ispettori del lavoro di Fortaleza hanno liberato una donna di 62 anni, trattenuta dalla stessa famiglia per tre generazioni, dal 1971, come collaboratrice domestica non retribuita. Niente stipendio, niente ferie, mai imparato a leggere e scrivere, nessun contatto con il mondo esterno. Prima di lei, anche sua madre aveva prestato servizio presso la stessa famiglia. Il caso è venuto alla luce nell'unico modo in cui questi casi vengono alla luce in Brasile: grazie a una segnalazione anonima." },
      { p: "I media europei leggeranno questa notizia come sempre fanno con il Brasile: come conferma di una vergogna lontana e tropicale." },
      { p: "Sei settimane prima, nel cuore di Milano." },
      { p: "Nel maggio 2026, la Procura ha posto la Caddell Construction, il colosso con sede in Alabama che sta costruendo il nuovo Consolato Generale degli Stati Uniti a Piazzale Accursio (un appalto da 200 milioni di dollari), sotto controllo giudiziario d'urgenza per caporalato. L'indagine ha portato alla luce quello che gli stessi magistrati hanno definito «para-schiavismo»: centinaia di lavoratori indiani, reclutati tramite un'agenzia di Nuova Delhi, che hanno pagato una quota di 5.000 euro per ottenere questo «privilegio»; salari reali di 1-2 euro l'ora, nascosti dietro un meccanismo di doppia busta paga tra India e Italia; turni di 12 ore al giorno, sei giorni alla settimana, senza riposo né malattia. Nel periodo di massima attività, i lavoratori erano 450-500. Due dirigenti sono in custodia cautelare, uno dei quali è stato fermato all'aeroporto di Bergamo mentre tentava di lasciare il Paese. La gip ha scritto che lo sfruttamento era «consuetudine aziendale». I pubblici ministeri stanno ora richiedendo permessi di soggiorno per motivi umanitari per almeno un centinaio di lavoratori che collaborano alle indagini." },
      { p: "Stesso reato. Stesso semestre. Due emisferi. La questione non è se il Brasile abbia un problema di schiavitù e l'Europa no. La questione è ciò che accade dopo la scoperta del reato, perché a quel punto i due sistemi divergono completamente." },
      { h: "Brasile: l'architettura di cui l'Europa non sa di avere bisogno" },
      { p: "I dati brasiliani sull'attività ispettiva del 2025, pubblicati dal Ministero del Lavoro nel gennaio 2026, mostrano un sistema in movimento: 2.772 lavoratori liberati in 1.594 operazioni di ispezione, con un aumento del 38% rispetto al 2024 e il terzo dato annuale più alto dall'inizio delle ispezioni sistematiche nel 1995. Oltre 68.000 persone liberate in trent'anni." },
      { p: "Per la prima volta nella storia, le liberazioni in contesto urbano (68%) hanno superato quelle in contesto rurale. Lo stereotipo della schiavitù come fenomeno limitato alle fazende remote è ormai superato dai dati." },
      { p: "Il lavoro domestico è diventato una priorità dichiarata dell'attività di controllo: nel 2025 sono state effettuate 122 ispezioni mirate, contro le 22 del 2024 — cinque volte tanto." },
      { p: "L'83% delle persone liberate si autodichiara nero. La continuità coloniale non è retorica: è il profilo demografico dei casi trattati." },
      { p: "Al centro di questa architettura si trova uno strumento senza eguali in Europa: il Cadastro de Empregadores, la cosiddetta «lista suja». Si tratta di un registro pubblico, gratuito e aggiornato semestralmente, che include i nomi dei datori di lavoro — aziende e privati — condannati in via definitiva per aver sottoposto i lavoratori a condizioni analoghe alla schiavitù. I nomi rimangono pubblicati per due anni. Nel 2020, il Supremo Tribunale Federale ne ha confermato la costituzionalità (ADPF 509) come misura di trasparenza attiva, non come sanzione. Le banche e la grande distribuzione brasiliane lo utilizzano già per la verifica del merito creditizio e dei fornitori." },
      { p: "L'aggiornamento di aprile 2026 indica la direzione che sta prendendo l'enforcement: su 169 nuove iscrizioni, la categoria più numerosa è stata quella dei servizi domestici (23 inserimenti), davanti ad allevamento bovino e caffè. Lo stesso aggiornamento includeva BYD, a seguito di un accordo da 40 milioni di real con i procuratori del lavoro in merito alle condizioni del cantiere della sua fabbrica in Bahia. Il meccanismo raggiunge tanto le famiglie di Fortaleza quanto i più grandi attori industriali del pianeta." },
      { p: "Il sistema presenta però un collo di bottiglia costituzionale: l'articolo 5 sancisce l'inviolabilità del domicilio, motivo per cui ogni liberazione in ambito domestico inizia con una denuncia anonima — e le 4.516 segnalazioni ricevute nel 2025 tramite il Disque 100, un record, contano quanto le ispezioni stesse. E presenta un rischio di governance che vale la pena menzionare con onestà: gli interventi ministeriali che hanno scavalcato gli auditor sulle inclusioni nella lista suja — in primo luogo il caso JBS Aves — hanno provocato proteste da parte del corpo ispettivo all'inizio del 2026. Lo strumento è potente; la sua indipendenza è contestata. Le controparti serie monitorano entrambe le cose." },
      { h: "Italia: risanamento senza un registro" },
      { p: "Ora, la risposta italiana — perché l'Italia dispone di uno strumento di cui il Brasile è sprovvisto." },
      { p: "Al di là del quadro penale contro il caporalato (Legge 199/2016, articolo 603-bis del Codice Penale), la Procura di Milano ha sperimentato per prima una soluzione più chirurgica: sottoporre aziende sane e non indagate ad amministrazione giudiziaria — una misura preventiva mutuata dal Codice antimafia (articolo 34, Decreto Legislativo 159/2011) — per aver agevolato colposamente lo sfruttamento lungo le proprie catene di subappalto. Il settore della moda mostra il modello su larga scala. Alviero Martini, Armani Operations, Manufactures Dior, Valentino, Loro Piana, Tod's: case di lusso le cui filiere sfociavano in laboratori dove una giacca di cashmere, venduta al dettaglio a 3.000 euro, veniva confezionata per circa 100 euro. Nel febbraio 2026, la Procura di Prato ha esteso il modello oltre Milano con il caso Piazza Italia: lavoratori pagati meno di 4 euro all'ora, sette giorni su sette, con margini stimati al 300% rispetto al costo di produzione. A dicembre 2025, altri tredici marchi figuravano nei fascicoli milanesi. Il caso Caddell a Piazzale Accursio rientra nella stessa filosofia di enforcement: spostare la responsabilità a monte della catena, verso il committente." },
      { p: "E lo strumento corregge. Loro Piana è entrata in amministrazione giudiziaria nel luglio 2025 e ne è uscita nell'aprile 2026, con il tribunale che ha definito «virtuoso» il percorso di riorganizzazione della filiera — governance rafforzata, audit indipendenti, interruzione dei rapporti con i fornitori non conformi. Nove mesi: dal commissariamento a modello di riferimento." },
      { p: "Ma ecco l'asimmetria: quando il risanamento si conclude, non esiste un registro. Non esiste un elenco pubblico in cui una banca, un general contractor o un responsabile acquisti possa verificare se un'azienda sia stata ritenuta responsabile di sfruttamento del lavoro, o lo abbia agevolato colposamente. In Italia, l'unico strumento pubblico permanente è la Rete del lavoro agricolo di qualità: una lista bianca volontaria, limitata al settore agricolo." },
      { p: "Leggiamo quindi il contrasto con precisione. Il Brasile pubblica i nomi dei colpevoli due volte all'anno, in ogni settore, famiglie comprese, con l'avallo del Supremo Tribunale Federale — uno strumento di memoria che informa l'intero mercato, ma non corregge nessuno. Milano commissaria e riabilita un committente alla volta — uno strumento di risanamento che corregge l'azienda, ma non lascia alcuna traccia consultabile per il mercato. Due strumenti sofisticati, perfettamente complementari. Nessuna delle due giurisdizioni ha adottato lo strumento dell'altra." },
      { p: "E i meccanismi di sfruttamento erano quasi identici nei due casi: debito di reclutamento (5.000 euro a Nuova Delhi; aliciamento nel Maranhão), dipendenza abitativa (residence aziendali fuori Milano; alojamentos nei cantieri brasiliani), vulnerabilità linguistica, occultamento salariale. Ciò che l'articolo 149 del Codice Penale brasiliano definisce «condizione analoga alla schiavitù», i pubblici ministeri di Milano lo chiamano «para-schiavismo». Stesso fenomeno. Diversa architettura di risposta istituzionale." },
      { h: "La traduzione per il business" },
      { p: "Con la CSDDD modificata (post-Omnibus, Direttiva 2026/470), la due diligence obbligatoria dell'UE si applica ormai solo ai gruppi più grandi — oltre 5.000 dipendenti e 1,5 miliardi di euro di fatturato, con obblighi effettivi dal 2029. Ma questi gruppi acquistano caffè, carne bovina, minerali e manufatti brasiliani, e la direttiva elenca esplicitamente il livello di enforcement in una determinata area geografica tra i fattori di rischio da valutare. I loro obblighi si riverseranno contrattualmente su ogni importatore europeo di medie dimensioni presente nelle loro filiere." },
      { p: "Milano ha appena dimostrato che la geografia del rischio di lavoro forzato include la Lombardia. Il Brasile dimostra, due volte all'anno, come è fatto uno strumento di trasparenza per quel rischio." },
      { p: "La lista suja — pubblica, gratuita, aggiornata ogni sei mesi — è lo strumento di screening di filiera più economico disponibile per il mercato brasiliano. In quindici anni di lavoro sul corridoio Italia-Brasile, non ho ancora incontrato un importatore europeo che l'abbia consultata prima di firmare un contratto di fornitura." },
      { p: "Un cantiere del governo statunitense a Milano ha impiegato per due anni manodopera pagata 2 euro l'ora, prima che qualcuno intervenisse. Il Brasile pubblica due volte all'anno un registro che documenta esattamente questo tipo di condotta, consultabile gratuitamente. Con quale dei due sistemi preferirebbe lavorare il vostro ufficio compliance — e perché l'Europa non ne ha ancora uno?" },
      { h: "Fonti" },
      { p: "MTE/SIT, Balanço 2025 delle azioni di contrasto al lavoro in condizioni analoghe alla schiavitù (28 gennaio 2026)" },
      { p: "MTE, aggiornamento del Cadastro de Empregadores (\"lista suja\"), 6 aprile 2026 — Portaria Interministerial 18/2024" },
      { p: "STF, ADPF 509 (2020) — costituzionalità del Cadastro" },
      { p: "Procura di Milano, decreto di controllo giudiziario d'urgenza, Caddell Construction Co. LLC (26 maggio 2026); copertura: Il Sole 24 Ore, Il Fatto Quotidiano, Open, MilanoToday (maggio-luglio 2026)" },
      { p: "L. 199/2016; art. 603-bis c.p.; art. 27-quinquies TUI (distacco); art. 34 d.lgs. 159/2011 (amministrazione giudiziaria)" },
      { p: "Tribunale di Milano, amministrazioni giudiziarie filiera moda (Alviero Martini 2024; Armani Operations 2024; Manufactures Dior 2024; Valentino 2025; Loro Piana lug. 2025, revoca apr. 2026; Tod's); Tribunale di Prato, Piazza Italia (feb. 2026) — copertura: Il Fatto Quotidiano, Il Post, Pambianconews, Sky TG24" },
      { p: "InPACTO, Balanço do combate ao trabalho escravo 2025" },
      { p: "Direttiva (UE) 2026/470 (Omnibus I), Gazzetta ufficiale UE, 26 febbraio 2026" },
      { p: "Código Penal, art. 149; Constituição Federal, art. 5º, XI; LC 150/2015" },
      { p: "Nota importante: i procedimenti italiani citati sono in corso o si sono conclusi con misure di prevenzione; per le persone fisiche indagate vale la presunzione di innocenza." },
    ],
  },
  en: {
    back: "Back to analysis",
    body: [
      { h: "Same crime, two architectures" },
      { p: "Fifty-five years of unpaid domestic work. The settlement: a furnished apartment and roughly €8,500 in cash." },
      { p: "In July 2026, labor inspectors in Fortaleza freed a 62-year-old woman held by the same family across three generations — since 1971 — as an unpaid domestic worker. No salary, no holidays, no literacy, no contact with the outside world. Her mother had served the same family before her. The case surfaced the only way these cases ever surface in Brazil: an anonymous tip." },
      { p: "European media will read this the way European media always reads Brazil: as confirmation of a distant, tropical shame." },
      { p: "Six weeks earlier, in the heart of Milan." },
      { p: "In May 2026, prosecutors placed Caddell Construction — the Alabama-based giant building the new United States Consulate General at Piazzale Accursio, a $200 million contract — under emergency judicial control for caporalato. The investigation describes what magistrates themselves call \"para-slavery\": hundreds of Indian workers recruited through an agency in New Delhi, each paying a €5,000 fee for the privilege; real wages of €1–2 per hour concealed behind a double-payslip mechanism between India and Italy; twelve-hour days, six days a week, no rest, no sick leave. At peak, 450–500 workers. Two managers are in pre-trial detention — one arrested at Bergamo airport while attempting to leave the country. The investigating judge wrote that exploitation was \"company custom.\" Prosecutors are now requesting humanitarian residence permits for at least a hundred workers cooperating with the investigation." },
      { p: "Same crime. Same semester. Two hemispheres. The story is not that Brazil has a slavery problem and Europe doesn't. The story is what happens after the crime is discovered — because there, the two systems diverge completely." },
      { h: "Brazil: the architecture Europe doesn't know it needs" },
      { p: "Brazil's 2025 enforcement data, released by the Ministry of Labor in January 2026, shows a system in motion:" },
      { p: "2,772 workers rescued in 1,594 inspection operations — up 38% on 2024, the third-highest annual figure since systematic inspections began in 1995. Over 68,000 people rescued in thirty years." },
      { p: "For the first time ever, urban rescues (68%) exceeded rural ones. The stereotype of slave labor as a remote-fazenda phenomenon is now statistically obsolete." },
      { p: "Domestic work became a declared enforcement priority: 122 targeted inspections in 2025 against 22 in 2024 — a fivefold increase." },
      { p: "83% of those rescued self-declare as Black. The colonial continuity is not rhetoric; it is the demographic profile of the caseload." },
      { p: "At the center of this architecture sits an instrument with no equivalent anywhere in Europe: the Cadastro de Empregadores — the \"lista suja.\" A public, free, semi-annually updated register of employers — companies and private individuals — with final administrative convictions for submitting workers to conditions analogous to slavery. Names stay published for two years. Brazil's Supreme Court confirmed its constitutionality in 2020 (ADPF 509) as active transparency, not sanction. Brazilian banks and retailers already use it in credit and supplier screening." },
      { p: "The April 2026 update tells you where enforcement is heading: of 169 new entries, the single largest category was domestic services (23 inclusions) — ahead of cattle ranching and coffee. The same update included BYD, following a R$40 million settlement with labor prosecutors over conditions at its Bahia factory construction site. The mechanism reaches households in Fortaleza and the largest industrial players on the planet alike." },
      { p: "The system has a constitutional bottleneck — Article 5 makes the home inviolable, which is why every domestic rescue starts with an anonymous complaint, and why 2025's record 4,516 hotline denunciations matter as much as the inspections. And it has governance risk worth naming honestly: ministerial interventions overriding auditors on lista suja inclusions — the JBS Aves case above all — triggered protests from the inspection corps in early 2026. The tool is powerful; its independence is contested. Serious counterparties monitor both." },
      { h: "Italy: remediation without a register" },
      { p: "Now look at the Italian response — because Italy does have an instrument, and it is one Brazil lacks." },
      { p: "Beyond the criminal anti-caporalato framework (Law 199/2016, Article 603-bis of the Criminal Code), Milan prosecutors have pioneered something more surgical: placing healthy, non-indicted companies under judicial administration — a preventive measure borrowed from the anti-mafia code (Article 34, Legislative Decree 159/2011) — for negligently facilitating exploitation down their subcontracting chains. The fashion sector shows the model at scale. Alviero Martini, Armani Operations, Manufactures Dior, Valentino, Loro Piana, Tod's: luxury houses whose supply chains ended in workshops where a cashmere jacket retailing at €3,000 was assembled for roughly €100. In February 2026, Prato prosecutors extended the model beyond Milan with Piazza Italia — workers at under €4 per hour, seven days a week, margins estimated at 300% over production cost. By December 2025, thirteen more brands sat in the Milan files. The Caddell case at Piazzale Accursio belongs to the same enforcement philosophy: move liability up the chain, to the principal." },
      { p: "And the instrument corrects. Loro Piana entered judicial administration in July 2025 and exited in April 2026, with the court calling its supply-chain overhaul — reinforced governance, independent audits, terminated non-compliant suppliers — a \"virtuous\" path. Nine months from seizure to benchmark." },
      { p: "But here is the asymmetry: when the remediation ends, there is no register. No public list where a bank, a general contractor or a procurement officer can check whether a company was found responsible for, or negligently facilitated, labor exploitation. Italy's only standing public instrument is the Rete del lavoro agricolo di qualità — a voluntary white list, limited to agriculture." },
      { p: "So read the contrast precisely. Brazil publishes the names of the guilty, twice a year, across every sector, households included, validated by its Supreme Court — an instrument of memory that informs the entire market but corrects no one. Milan seizes and rehabilitates one principal at a time — an instrument of remediation that corrects the company but leaves no consultable trace for the market. Two sophisticated tools, perfectly complementary. Neither jurisdiction has adopted the other's." },
      { p: "And the mechanics of exploitation were nearly identical in both cases: recruitment debt (€5,000 in New Delhi; aliciamento in Maranhão), housing dependency (company residences outside Milan; alojamentos on Brazilian sites), linguistic vulnerability, wage concealment. What Article 149 of the Brazilian Criminal Code calls \"condition analogous to slavery,\" the Milan prosecutors call \"para-schiavismo.\" Same phenomenon. Different institutional response architecture." },
      { h: "The business translation" },
      { p: "Under the amended CSDDD (post-Omnibus, Directive 2026/470), mandatory EU due diligence now applies only to the largest groups — 5,000+ employees, €1.5 billion turnover, compliance from 2029. But those groups buy Brazilian coffee, beef, minerals and manufactured goods, and the directive explicitly lists the level of law enforcement in a given geography among the risk factors to weigh. Their obligations will cascade contractually onto every mid-sized European importer in their chains." },
      { p: "Milan just demonstrated that the geography of forced-labor risk includes Lombardy. Brazil demonstrates, twice a year, what a transparency instrument for that risk looks like." },
      { p: "The lista suja — public, free, updated every six months — is the cheapest supply-chain screening instrument available for the Brazilian market. In fifteen years of corridor work, I have yet to meet a European importer who consulted it before signing a supply contract." },
      { p: "A U.S. government construction site in Milan ran on €2-an-hour labor for two years before anyone intervened. Brazil publishes a register of exactly this conduct, twice a year, at zero cost to consult. Which of the two systems would your compliance department rather work with — and why does Europe still not have one?" },
      { h: "Sources" },
      { p: "MTE/SIT, Balanço 2025 of actions to combat work in conditions analogous to slavery (28 January 2026)" },
      { p: "MTE, update of the Cadastro de Empregadores (\"lista suja\"), 6 April 2026 — Interministerial Ordinance 18/2024" },
      { p: "STF, ADPF 509 (2020) — constitutionality of the Cadastro" },
      { p: "Milan Prosecutor's Office, urgent judicial control decree, Caddell Construction Co. LLC (26 May 2026); coverage: Il Sole 24 Ore, Il Fatto Quotidiano, Open, MilanoToday (May–July 2026)" },
      { p: "Law 199/2016; art. 603-bis c.p.; art. 27-quinquies of the TUI (secondment); art. 34 of Legislative Decree 159/2011 (judicial administration)" },
      { p: "Milan Court, judicial administrations of the fashion supply chain (Alviero Martini 2024; Armani Operations 2024; Manufactures Dior 2024; Valentino 2025; Loro Piana Jul. 2025, revocation Apr. 2026; Tod's); Prato Court, Piazza Italia (Feb. 2026) — coverage: Il Fatto Quotidiano, Il Post, Pambianconews, Sky TG24" },
      { p: "InPACTO, Balanço do combate ao trabalho escravo 2025" },
      { p: "Directive (EU) 2026/470 (Omnibus I), Official Journal, 26 February 2026" },
      { p: "Código Penal, art. 149; Constituição Federal, art. 5º, XI; LC 150/2015" },
      { p: "Important note: the Italian proceedings cited are ongoing or have been concluded with preventive measures; for the individuals under investigation, the presumption of innocence applies." },
      { p: "Note: the Italian proceedings referred to above are either ongoing or have been resolved through preventive measures; all individuals under investigation are presumed innocent." },
    ],
  },
  pt: {
    back: "Voltar às análises",
    body: [
      { h: "Mesmo crime, duas arquiteturas" },
      { p: "Cinquenta e cinco anos de trabalho doméstico não remunerado. O acordo: um apartamento mobiliado e cerca de 8.500 euros em dinheiro." },
      { p: "Em julho de 2026, auditores-fiscais do trabalho em Fortaleza resgataram uma mulher de 62 anos, mantida pela mesma família, por três gerações, desde 1971, como trabalhadora doméstica sem remuneração. Sem salário, sem férias, sem saber ler nem escrever, sem contato com o mundo exterior. Antes dela, sua mãe havia servido à mesma família. O caso veio à tona da única maneira como esses casos sempre vêm à tona no Brasil: por meio de uma denúncia anônima." },
      { p: "A mídia europeia interpretará o caso da maneira como sempre interpreta o Brasil: como a confirmação de uma vergonha distante e tropical." },
      { p: "Seis semanas antes, no coração de Milão." },
      { p: "Em maio de 2026, o Ministério Público de Milão colocou a Caddell Construction — gigante sediada no Alabama, responsável pela construção do novo Consulado Geral dos Estados Unidos no Piazzale Accursio, um contrato de US$ 200 milhões — sob controle judicial de emergência por caporalato (intermediação ilícita e exploração de mão de obra, o \"gato\" italiano). A investigação descreve o que os próprios magistrados chamam de \"para-escravidão\": centenas de trabalhadores indianos recrutados por meio de uma agência em Nova Délhi, cada um pagando uma taxa de 5 mil euros pelo \"privilégio\"; salários reais de 1 a 2 euros por hora, ocultados por um mecanismo de holerite duplo entre a Índia e a Itália; jornadas de 12 horas, seis dias por semana, sem descanso e sem licença médica. No pico, entre 450 e 500 trabalhadores. Dois gerentes estão em prisão preventiva — um deles detido no aeroporto de Bérgamo enquanto tentava deixar o país. A juíza responsável pelas investigações preliminares (gip) escreveu que a exploração era \"costume da empresa\". Os promotores agora solicitam autorizações de residência por motivos humanitários para pelo menos cem trabalhadores que cooperam com a investigação." },
      { p: "Mesmo crime. Mesmo semestre. Dois hemisférios. A questão não é se o Brasil tem um problema de escravidão e a Europa não. A questão é o que acontece depois que o crime é descoberto — porque é nesse ponto que os dois sistemas divergem completamente." },
      { h: "Brasil: a arquitetura que a Europa não sabe que precisa" },
      { p: "Os dados da fiscalização brasileira em 2025, divulgados pelo Ministério do Trabalho em janeiro de 2026, mostram um sistema em movimento: 2.772 trabalhadores resgatados em 1.594 operações de fiscalização — aumento de 38% em relação a 2024 e o terceiro maior número anual desde o início das fiscalizações sistemáticas, em 1995. Mais de 68 mil pessoas resgatadas em trinta anos." },
      { p: "Pela primeira vez na história, os resgates urbanos (68%) superaram os rurais. O estereótipo do trabalho escravo como fenômeno restrito a fazendas remotas está, estatisticamente, obsoleto." },
      { p: "O trabalho doméstico tornou-se prioridade declarada da fiscalização: 122 inspeções direcionadas em 2025, contra 22 em 2024 — cinco vezes mais." },
      { p: "83% das pessoas resgatadas se autodeclaram negras. A continuidade colonial não é retórica: é o perfil demográfico do conjunto de casos." },
      { p: "No centro dessa arquitetura está um instrumento sem equivalente em toda a Europa: o Cadastro de Empregadores — a \"lista suja\". Um registro público, gratuito e atualizado semestralmente, com os nomes de empregadores — empresas e pessoas físicas — com condenações administrativas definitivas por submeter trabalhadores a condições análogas à escravidão. Os nomes permanecem publicados por dois anos. Em 2020, o Supremo Tribunal Federal confirmou sua constitucionalidade (ADPF 509), enquadrando-o como transparência ativa, não como sanção. Bancos e varejistas brasileiros já o utilizam na análise de crédito e na seleção de fornecedores." },
      { p: "A atualização de abril de 2026 mostra para onde a fiscalização está caminhando: das 169 novas entradas, a categoria mais representativa foi a de serviços domésticos (23 inclusões), à frente da pecuária e do café. A mesma atualização incluiu a BYD, após acordo de R$ 40 milhões com o Ministério Público do Trabalho sobre as condições no canteiro de obras de sua fábrica na Bahia. O mecanismo alcança tanto famílias em Fortaleza quanto os maiores players industriais do planeta." },
      { p: "O sistema enfrenta, porém, um gargalo constitucional: o artigo 5º torna o domicílio inviolável. Por isso, todo resgate no trabalho doméstico começa com uma denúncia anônima — e as 4.516 denúncias recebidas pelo Disque 100 em 2025, um recorde, importam tanto quanto as próprias fiscalizações. E há um risco de governança que vale mencionar com franqueza: intervenções ministeriais que se sobrepuseram aos auditores-fiscais em inclusões na lista suja — sobretudo no caso JBS Aves — provocaram protestos do corpo de fiscalização no início de 2026. A ferramenta é poderosa; sua independência é contestada. Contrapartes sérias monitoram as duas coisas." },
      { h: "Itália: remediação sem registro" },
      { p: "Agora, a resposta italiana — porque a Itália tem um instrumento que falta ao Brasil." },
      { p: "Além da lei penal contra o caporalato (Lei 199/2016, artigo 603-bis do Código Penal italiano), o Ministério Público de Milão foi pioneiro em uma medida mais cirúrgica: colocar empresas saudáveis e não indiciadas sob administração judicial — medida preventiva emprestada do código antimáfia (artigo 34, Decreto Legislativo 159/2011) — por facilitarem, por negligência, a exploração em suas cadeias de subcontratação. O setor da moda ilustra o modelo em escala. Alviero Martini, Armani Operations, Manufactures Dior, Valentino, Loro Piana, Tod's: maisons de luxo cujas cadeias de fornecimento terminavam em oficinas onde um casaco de cashmere, vendido a 3 mil euros na loja, era confeccionado por cerca de 100 euros. Em fevereiro de 2026, o Ministério Público de Prato estendeu o modelo para além de Milão com o caso Piazza Italia: trabalhadores recebendo menos de 4 euros por hora, sete dias por semana, com margens estimadas em 300% sobre o custo de produção. Em dezembro de 2025, mais treze marcas figuravam nos autos de Milão. O caso Caddell, no Piazzale Accursio, segue a mesma filosofia de enforcement: subir a responsabilidade pela cadeia, até o contratante principal." },
      { p: "E o instrumento corrige. A Loro Piana entrou em administração judicial em julho de 2025 e saiu em abril de 2026, com o tribunal classificando como \"virtuosa\" a reformulação de sua cadeia de fornecimento — governança reforçada, auditorias independentes, desligamento de fornecedores não conformes. Nove meses: da intervenção judicial à referência do setor." },
      { p: "Mas eis a assimetria: quando a remediação termina, não há registro. Não existe lista pública em que um banco, uma construtora ou um gestor de compras possa verificar se uma empresa foi considerada responsável por exploração de mão de obra, ou por tê-la facilitado por negligência. O único instrumento público permanente da Itália é a Rete del Lavoro Agricolo di Qualità — uma lista branca, voluntária, limitada à agricultura." },
      { p: "Observe, então, o contraste com precisão. O Brasil publica os nomes dos culpados duas vezes por ano, em todos os setores, famílias incluídas, com validação de sua Suprema Corte — um instrumento de memória, que informa todo o mercado, mas não corrige ninguém. Milão intervém e reabilita um contratante de cada vez — um instrumento de remediação, que corrige a empresa, mas não deixa rastro consultável para o mercado. Duas ferramentas sofisticadas, perfeitamente complementares. Nenhuma das duas jurisdições adotou a da outra." },
      { p: "E os mecanismos de exploração eram quase idênticos nos dois casos: dívida de recrutamento (5 mil euros em Nova Délhi; aliciamento no Maranhão), dependência de moradia (residências da empresa fora de Milão; alojamentos nos canteiros brasileiros), vulnerabilidade linguística, ocultação salarial. O que o artigo 149 do Código Penal brasileiro chama de \"condição análoga à escravidão\", os promotores de Milão chamam de \"para-escravidão\". Mesmo fenômeno. Arquitetura de resposta institucional diferente." },
      { h: "A tradução para os negócios" },
      { p: "Com a CSDDD alterada (pós-Omnibus, Diretiva 2026/470), a devida diligência obrigatória da UE agora se aplica apenas aos maiores grupos — mais de 5 mil funcionários e faturamento de 1,5 bilhão de euros, com conformidade a partir de 2029. Mas esses grupos compram café, carne bovina, minérios e manufaturados do Brasil, e a diretiva lista explicitamente o nível de aplicação da lei em uma determinada geografia entre os fatores de risco a avaliar. Suas obrigações se estenderão contratualmente a todos os importadores europeus de médio porte em suas cadeias." },
      { p: "Milão acaba de demonstrar que a geografia do risco de trabalho forçado inclui a Lombardia. O Brasil demonstra, duas vezes por ano, como funciona um instrumento de transparência para esse risco." },
      { p: "A lista suja — pública, gratuita, atualizada a cada seis meses — é o instrumento de triagem de cadeia de fornecimento mais barato disponível para o mercado brasileiro. Em quinze anos de trabalho no corredor Itália-Brasil, ainda não encontrei um importador europeu que a tenha consultado antes de assinar um contrato de fornecimento." },
      { p: "Uma obra do governo dos EUA em Milão rodou com mão de obra a 2 euros por hora durante dois anos, até que alguém interviesse. O Brasil publica, duas vezes por ano e com consulta gratuita, um registro exatamente dessa conduta. Com qual dos dois sistemas a sua área de compliance preferiria trabalhar — e por que a Europa ainda não tem um?" },
      { h: "Fontes" },
      { p: "MTE/SIT, Balanço 2025 das ações de combate ao trabalho análogo à escravidão (28 de janeiro de 2026)" },
      { p: "MTE, Atualização do Cadastro de Empregadores (\"Lista Suja\"), 6 de abril de 2026 — Portaria Interministerial 18/2024" },
      { p: "STF, ADPF 509 (2020) — constitucionalidade do Cadastro" },
      { p: "Ministério Público de Milão, decreto de controle judicial de urgência, Caddell Construction Co. LLC (26 de maio de 2026) — cobertura: Il Sole 24 Ore, Il Fatto Quotidiano, Open, MilanoToday (maio–julho de 2026)" },
      { p: "Lei italiana 199/2016; art. 603-bis do Código Penal italiano; art. 27-quinquies do TUI (destacamento); art. 34 do Decreto Legislativo 159/2011 (administração judicial)" },
      { p: "Tribunal de Milão, administrações judiciais do setor da moda (Alviero Martini 2024; Armani Operations 2024; Manufactures Dior 2024; Valentino 2025; Loro Piana jul. 2025, revogação abr. 2026; Tod's); Tribunal de Prato, Piazza Italia (fev. 2026) — cobertura: Il Fatto Quotidiano, Il Post, Pambianconews, Sky TG24" },
      { p: "InPACTO, Balanço do combate ao trabalho escravo 2025" },
      { p: "Diretiva (UE) 2026/470 (Omnibus I), Jornal Oficial da UE, 26 de fevereiro de 2026" },
      { p: "Código Penal brasileiro, art. 149; Constituição Federal, art. 5º, XI; LC 150/2015" },
      { p: "Nota: os procedimentos italianos citados estão em andamento ou foram concluídos com medidas preventivas; vale a presunção de inocência para as pessoas físicas investigadas." },
    ],
  },
} as const;

export default function Suja() {
  const { lang } = useT();
  const article = getArticleBySlug("suja");
  const c = content[lang];
  const desc =
    lang === "it"
      ? "Stesso crimine, due architetture: la lista suja brasiliana e l'amministrazione giudiziaria italiana a confronto sul lavoro forzato."
      : lang === "pt"
      ? "Mesmo crime, duas arquiteturas: a lista suja brasileira e a administração judicial italiana no combate ao trabalho forçado."
      : "Same crime, two architectures: Brazil's lista suja and Italy's judicial administration in the fight against forced labor.";
  useCanonical("/suja", {
    title: `${article?.title[lang] ?? "Suja"} — Business Matching Global`,
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
          {c.back}
        </Link>
          <LangSwitcher />
        </div>
        <article className="prose-invert">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4">
            {article?.title[lang]}
          </h1>
          <p className="text-xs text-foreground/70 mb-10 tabular-nums">{article?.date}</p>
          <div className="space-y-5 text-foreground/85 text-justify leading-relaxed">
            {c.body.map((block, i) =>
              "h" in block ? (
                <h2 key={i} className="text-xl md:text-2xl font-semibold text-foreground text-left mt-8 mb-2">
                  {block.h}
                </h2>
              ) : (
                <p key={i}>{block.p}</p>
              )
            )}
          </div>
        </article>
        <ShareBlock title={article?.title[lang] ?? "Suja"} />
        <AnalysisFooter />
      </div>
    </main>
  );
}
