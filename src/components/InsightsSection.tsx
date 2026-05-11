import { ArrowRight, Search, X } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import diVincenzoImage from "@/assets/di-vincenzo-cheese.jpg";
import almenaraImage from "@/assets/almenara-panorama.jpg";
import brazilInvestmentImage from "@/assets/brazil-investment.jpg";
import custoBrasilImage from "@/assets/custo-brasil.jpg";
import industrialMachineryImage from "@/assets/industrial-machinery.jpg";
import cosmeticsBrazilImage from "@/assets/cosmetics-brazil.jpg";
import consumerDefenseImage from "@/assets/consumer-defense-code.jpg";
import euMercosurSigningImage from "@/assets/eu-mercosur-signing.jpg";
import brazilianCoffeeEudrImage from "@/assets/brazilian-coffee-eudr.webp";
import madeiraTropicalEudrImage from "@/assets/madeira-tropical-eudr.jpg";
import ajvarCaviarVermelhoImage from "@/assets/ajvar-caviar-vermelho.jpg";
import euMercosurPlaybookImage from "@/assets/eu-mercosur-playbook.jpg";
import perfumeryIPImage from "@/assets/perfumery-ip.webp";
import { Language } from "@/components/LanguageSwitcher";
import { ShareButtons } from "@/components/ShareButtons";
import { ArticleFullView } from "@/components/ArticleFullView";

interface InsightsSectionProps {
  title: string;
  subtitle: string;
  readMore: string;
  language: Language;
  articles: {
    article1: { title: string; description: string; url: string };
    article2: { title: string; description: string; url: string };
    article3: { title: string; description: string; url: string };
    article4: { title: string; description: string; url: string };
    article5: { title: string; description: string; url: string };
    article6: { title: string; description: string; url: string };
    article7: { title: string; description: string; url: string };
  };
}

const featuredArticleTranslations = {
  it: {
    title: "Finalmente una luce in un periodo buio.",
    description: "Dopo oltre 25 anni di negoziati, la firma dell'Accordo di Associazione UE–Mercosur segna una svolta strategica per il commercio internazionale e per il settore agroalimentare europeo. Abbiamo pubblicato un'analisi strategica e tecnica che va oltre la retorica, chiarendo cosa prevede realmente l'accordo: tutele per i settori sensibili, clausole di salvaguardia, reciprocità sugli standard e nuove opportunità per le filiere europee di qualità.",
    cta: "👉 Leggi l'articolo completo su LinkedIn",
    hashtags: ["#EUMercosur", "#Agroalimentare", "#TradePolicy", "#Europa", "#Mercosur", "#ConsulBrasil"],
  },
  en: {
    title: "Finally, a light in a dark time.",
    description: "After more than 25 years of negotiations, the signing of the EU–Mercosur Association Agreement marks a strategic turning point for international trade and for the European agri-food sector. We have published a strategic and technical analysis that goes beyond rhetoric, explaining what the agreement actually provides: protections for sensitive sectors, safeguard clauses, reciprocity on standards, and new opportunities for Europe's quality-driven value chains.",
    cta: "👉 Read the full article on LinkedIn",
    hashtags: ["#EUMercosur", "#AgriFood", "#TradePolicy", "#Europe", "#Mercosur", "#ConsulBrasil"],
  },
  pt: {
    title: "Finalmente, uma luz em tempos sombrios.",
    description: "Após mais de 25 anos de negociações, a assinatura do Acordo de Associação UE–Mercosul representa uma virada estratégica para o comércio internacional e para o setor agroalimentar europeu. Publicamos uma análise estratégica e técnica que vai além da retórica, explicando o que o acordo realmente prevê: proteção para setores sensíveis, cláusulas de salvaguarda, reciprocidade de padrões e novas oportunidades para as cadeias europeias de qualidade.",
    cta: "👉 Leia o artigo completo no LinkedIn",
    hashtags: ["#EUMercosur", "#Agroalimentar", "#TradePolicy", "#Europa", "#Mercosul", "#ConsulBrasil"],
  },
};

export const InsightsSection = ({ title, subtitle, readMore, language, articles }: InsightsSectionProps) => {
  type OpenArticle = {
    title: string;
    description?: string;
    image: string;
    category?: string;
    fullText: string[];
    hashtags?: string[];
    url?: string;
  };
  const [openArticle, setOpenArticle] = useState<OpenArticle | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const matches = (...parts: (string | string[] | undefined)[]) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    const terms = q.split(/\s+/).filter(Boolean);
    const haystack = parts
      .flatMap((p) => (Array.isArray(p) ? p : [p]))
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return terms.every((t) => haystack.includes(t));
  };
  const featuredContent = featuredArticleTranslations[language];
  const featuredArticle = {
    title: featuredContent.title,
    description: featuredContent.description,
    cta: featuredContent.cta,
    hashtags: featuredContent.hashtags,
    url: "https://www.linkedin.com/pulse/strategic-analysis-impact-assessment-eumercosur-economic-j3rrf/",
    image: euMercosurSigningImage,
    category: "Trade Policy",
  };

  const coffeeEudrTranslations: Record<string, { title: string; description: string; fullText: string[] } | null> = {
    pt: {
      title: "Café Brasileiro e EUDR: por que estar pronto agora vale mais do que esperar a última prorrogação",
      description: "A União Europeia confirmou em dezembro de 2025 a nova arquitetura do EUDR: aplicação plena a partir de 30 de dezembro de 2026 para grandes e médios operadores, e 30 de junho de 2027 para os pequenos. Para muitos exportadores, o instinto foi respirar — e adiar. Para os grandes players brasileiros, é o oposto: 12 a 18 meses não é \"muito tempo\", é o tempo mínimo para mapear cadeias de fornecedores, validar polígonos, treinar cooperativas e blindar a primeira milha contra rejeição na alfândega europeia.",
      fullText: [
        "E o ponto crítico continua: as plataformas hoje em uso no Brasil têm vulnerabilidades estruturais que, à luz do EUDR e da classificação do país como risco \"standard\", podem custar contêineres retidos, multas de até 4% do faturamento UE e — pior — exclusão do comprador.",
        "Os três pontos cegos das soluções atuais",
        "1. A fragilidade autodeclaratória do CAR. A coluna vertebral da rastreabilidade brasileira hoje é o Cadastro Ambiental Rural. Mas ele é, por desenho, autodeclaratório: menos de 11% dos registros foram efetivamente validados pelos órgãos competentes, e as sobreposições de polígonos seguem gerando insegurança jurídica. Para um auditor europeu — e mais ainda para o sistema TRACES da DG ENV — um dado que depende exclusivamente da declaração do produtor, sem verificação independente e sem timestamp imutável, tem valor probatório baixo.",
        "2. Falsos positivos no café sob sombra e em sistemas agroflorestais. Os algoritmos satelitais convencionais — incluindo os que alimentam plataformas de monitoramento de uso corrente — frequentemente classificam plantios sombreados como \"floresta nativa\" e podas de manejo legal como \"alerta de desmatamento\". Resultado: lotes inteiros de produtores em plena conformidade ficam bloqueados em alertas que ninguém quer perder tempo desfazendo na hora do embarque.",
        "3. O vácuo de dados entre o cafezal e o porto. Entre a colheita e o contêiner, a cadeia atual ainda depende de papelada física, NFs eletrônicas convencionais e planilhas — todas vulneráveis a erro humano e manipulação a posteriori. É exatamente onde a UE concentra seu olhar: a integridade do dado da primeira milha.",
        "A nova fronteira: identidade física verificável e dado íntegro desde a origem",
        "Existe hoje uma classe de tecnologia que muda a equação — e que, por enquanto, está pouquíssimo difundida no mercado brasileiro de café. O ponto não é \"mais um app de cadastro\". É outra coisa:",
        "Identidade única por assinatura GNSS, gravada no momento exato da origem. Em vez de etiquetas que descolam ou QR codes que se reimprimem, a tecnologia gera uma marca física derivada diretamente de sinais das constelações de satélites de navegação (Galileo, GPS, GLONASS, BeiDou), com precisão de 2 metros de geolocalização e 1 segundo de timestamp. Cada lote nasce com um identificador globalmente único, decodificável sem banco de dados externo. Tentou clonar ou adulterar? A leitura por IA detecta o forjamento na hora.",
        "Ground-truthing real, não declaratório. Aplicativos de campo coletam fotos georreferenciadas e provas físicas que desmentem alertas satelitais errados. O produtor de café sob sombra deixa de ser refém do algoritmo: a evidência de solo entra no dossiê de Due Diligence com o mesmo peso da imagem orbital.",
        "Geração e envio automatizado da DDS para o TRACES. Em vez de PDFs avulsos e dupla digitação, a plataforma alimenta diretamente o sistema oficial da União Europeia, reduzindo em até 80% a carga administrativa do operador — e eliminando a janela onde a maioria dos erros acontece (o copia-e-cola).",
        "Arquitetura descentralizada e GDPR-nativa. Cada elo da cadeia mantém seu próprio controle de dados, mas o trilho de auditoria é íntegro de ponta a ponta: o que entra no sistema na fazenda não pode ser reescrito no porto. Cada operador compartilha apenas o que é necessário ao elo seguinte — nem mais, nem menos.",
        "De obrigação regulatória a vantagem competitiva",
        "O EUDR não é uma barreira protecionista. É a formalização de uma tendência que o specialty já vive há anos: rastreabilidade verificável como prêmio de mercado. Os exportadores e cooperativas que se prepararem agora — não no segundo semestre de 2026, quando todo mundo correr — entram em 2027 com um ativo: a capacidade de provar origem, sem depender da boa-fé do trader nem de uma autodeclaração no CAR.",
        "A tecnologia para isso já está disponível, operacional na Europa e pronta para o Brasil — cobrindo café, mas também madeira, cacau, soja, óleo de palma, gomma e bovinos do Anexo I.",
      ],
    },
    it: {
      title: "Caffè brasiliano e EUDR: perché essere pronti adesso vale più che aspettare l'ultima proroga",
      description: "L'Unione Europea ha confermato a dicembre 2025 la nuova struttura dell'EUDR: piena applicazione a partire dal 30 dicembre 2026 per gli operatori di grandi e medie dimensioni, e dal 30 giugno 2027 per quelli di piccole dimensioni. Per molti esportatori, l'istinto è stato quello di tirare un sospiro di sollievo e rimandare. Per i grandi operatori brasiliani è l'opposto: 12-18 mesi non sono \"molto tempo\", sono il tempo minimo per mappare le catene di fornitura, convalidare i poligoni, formare le cooperative e blindare il primo miglio contro il rifiuto alla dogana europea.",
      fullText: [
        "E il punto critico rimane: le piattaforme oggi in uso in Brasile presentano vulnerabilità strutturali che, alla luce dell'EUDR e della classificazione del paese come rischio \"standard\", possono costare container trattenuti, multe fino al 4% del fatturato UE e — peggio — l'esclusione dell'acquirente.",
        "I tre punti ciechi delle soluzioni attuali",
        "1. La fragilità autodichiarativa del CAR. La spina dorsale della tracciabilità brasiliana oggi è il Cadastro Ambiental Rural. Ma è, per sua natura, autodichiarativo: meno dell'11% delle registrazioni è stato effettivamente convalidato dagli organi competenti, e le sovrapposizioni dei poligoni continuano a generare incertezza giuridica. Per un revisore europeo — e ancor più per il sistema TRACES della DG ENV — un dato che dipende esclusivamente dalla dichiarazione del produttore, senza verifica indipendente e senza timestamp immutabile, ha basso valore probatorio.",
        "2. Falsi positivi nel caffè coltivato all'ombra e nei sistemi agroforestali. Gli algoritmi satellitari convenzionali — compresi quelli che alimentano le piattaforme di monitoraggio di uso corrente — classificano spesso le piantagioni ombreggiate come \"foresta nativa\" e le potature di gestione legale come \"allerta di deforestazione\". Risultato: interi lotti di produttori pienamente conformi rimangono bloccati in allarmi che nessuno vuole perdere tempo a risolvere al momento della spedizione.",
        "3. Il vuoto di dati tra la piantagione di caffè e il porto. Tra il raccolto e il container, la catena attuale dipende ancora da documenti cartacei, fatture elettroniche convenzionali e fogli di calcolo — tutti vulnerabili all'errore umano e alla manipolazione a posteriori. È esattamente qui che l'UE concentra la sua attenzione: l'integrità dei dati del primo miglio.",
        "La nuova frontiera: identità fisica verificabile e dati integri fin dall'origine",
        "Esiste oggi una classe di tecnologia che cambia l'equazione — e che, per ora, è pochissimo diffusa nel mercato brasiliano del caffè. Il punto non è \"l'ennesima app di registrazione\". È un'altra cosa:",
        "Identità unica tramite firma GNSS, registrata nel momento esatto dell'origine. Invece di etichette che si staccano o codici QR che si ristampano, la tecnologia genera un marchio fisico derivato direttamente dai segnali delle costellazioni di satelliti di navigazione (Galileo, GPS, GLONASS, BeiDou), con una precisione di 2 metri di geolocalizzazione e 1 secondo di timestamp. Ogni lotto nasce con un identificativo unico a livello globale, decodificabile senza database esterni. Hai provato a clonarlo o a falsificarlo? La lettura tramite IA rileva immediatamente la contraffazione.",
        "Verifica sul campo reale, non dichiarativa. Le app sul campo raccolgono foto georeferenziate e prove fisiche che smentiscono gli allarmi satellitari errati. Il produttore di caffè all'ombra non è più ostaggio dell'algoritmo: le prove sul terreno entrano nel dossier di Due Diligence con lo stesso peso dell'immagine orbitale.",
        "Generazione e invio automatizzato del DDS a TRACES. Invece di PDF sparsi e doppia digitazione, la piattaforma alimenta direttamente il sistema ufficiale dell'Unione Europea, riducendo fino all'80% il carico amministrativo dell'operatore — ed eliminando la fase in cui si verifica la maggior parte degli errori (il copia-incolla).",
        "Architettura decentralizzata e nativa GDPR. Ogni anello della catena mantiene il proprio controllo dei dati, ma la traccia di audit è integra dall'inizio alla fine: ciò che entra nel sistema in azienda non può essere riscritto al porto. Ogni operatore condivide solo ciò che è necessario all'anello successivo — né più, né meno.",
        "Da obbligo normativo a vantaggio competitivo",
        "L'EUDR non è una barriera protezionistica. È la formalizzazione di una tendenza che il settore specialty vive già da anni: la tracciabilità verificabile come premio di mercato. Gli esportatori e le cooperative che si preparano ora — non nel secondo semestre del 2026, quando tutti correranno — entrano nel 2027 con un vantaggio: la capacità di provare l'origine, senza dipendere dalla buona fede del trader né da un'autodichiarazione nel CAR.",
        "La tecnologia per farlo è già disponibile, operativa in Europa e pronta per il Brasile — che copre il caffè, ma anche il legno, il cacao, la soia, l'olio di palma, la gomma e i bovini dell'Allegato I.",
      ],
    },
    en: {
      title: "Brazilian coffee and the EUDR: why being ready now is better than waiting for a last-minute extension",
      description: "In December 2025, the European Union confirmed the new EUDR framework, with full implementation starting on 30 December 2026 for large and medium-sized operators and on 30 June 2027 for small operators. Many exporters initially breathed a sigh of relief and decided to postpone action. For major Brazilian players, however, it's the opposite. Twelve to eighteen months isn't 'a long time'; it's the minimum time needed to map supply chains, validate polygons, train cooperatives and protect the first mile against rejection at European customs.",
      fullText: [
        "The critical issue remains that the platforms currently in use in Brazil have structural vulnerabilities. In light of the EUDR and Brazil's classification as a 'standard' risk, these vulnerabilities could result in detained containers, fines of up to 4% of EU revenue and, worse still, exclusion by the buyer.",
        "The three blind spots of current solutions",
        "1. The self-declaratory fragility of the CAR. The backbone of Brazilian traceability today is the Rural Environmental Registry (CAR). However, it is self-declaratory by design: fewer than 11% of records have been effectively validated by the relevant authorities, and overlapping polygons continue to generate legal uncertainty. For a European auditor — and even more so for DG ENV's TRACES system — data that relies exclusively on the producer's declaration, without independent verification or an immutable timestamp, has low probative value.",
        "2. False positives in shade-grown coffee and agroforestry systems. Conventional satellite algorithms — including those powering commonly used monitoring platforms — often misclassify shaded plantations as 'native forest' and legal pruning as 'deforestation alerts'. The result is that entire lots from fully compliant producers are flagged in alerts that no one wants to waste time resolving at the time of shipment.",
        "3. The data vacuum between the coffee farm and the port. Currently, the supply chain still relies on physical paperwork, conventional electronic invoices and spreadsheets between harvest and the container, all of which are vulnerable to human error and post-hoc manipulation. This is precisely the area on which the EU is focusing its attention: ensuring the integrity of first-mile data.",
        "The new frontier is verifiable physical identity and data integrity from the source.",
        "There is now a class of technology that changes the equation, but which is very rarely used in the Brazilian coffee market for the time being. The point is not 'just another registration app'. It offers a unique identity via GNSS signature, recorded at the exact moment of origin. Rather than labels that can be peeled off or QR codes that can be reprinted, this technology generates a physical mark derived directly from signals from navigation satellite constellations (Galileo, GPS, GLONASS and BeiDou). This provides an accuracy of 2 metres for geolocation and 1 second for the timestamp. Each batch is given a globally unique identifier that can be decoded without an external database. Attempting to clone or tamper with it? AI scanning detects forgery on the spot.",
        "This is real ground-truthing, not just declarative. Field apps collect georeferenced photos and physical evidence that refute erroneous satellite alerts. Shade-grown coffee producers are no longer at the mercy of algorithms: ground-based evidence is included in Due Diligence dossiers with the same weight as orbital images.",
        "The DDS is automatically generated and submitted to TRACES. Rather than using standalone PDFs and entering data twice, the platform feeds directly into the European Union's official system, reducing the operator's administrative burden by up to 80% and eliminating the stage at which most errors occur (copy and paste).",
        "The architecture is decentralised and GDPR-native. Each link in the chain controls its own data, but the audit trail remains intact from start to finish: what enters the system at the farm cannot be altered at the port. Each operator only shares what is necessary for the next link — no more, no less.",
        "From regulatory obligation to competitive advantage: the EUDR is not a protectionist barrier. Rather, it formalises a trend that the specialty sector has experienced for years: verifiable traceability as a market premium. Exporters and cooperatives that prepare now, rather than waiting until the second half of 2026 when everyone else is rushing around, will enter 2027 with a valuable asset: the ability to prove origin independently, without relying on traders' good faith or self-declarations in the CAR.",
        "This technology is already available and operational in Europe, ready for implementation in Brazil, covering not only coffee, but also timber, cocoa, soybeans, palm oil, gum and cattle from Annex I.",
      ],
    },
  };
  const coffeeContent = coffeeEudrTranslations[language];
  const coffeeEudrArticle = coffeeContent ? {
    ...coffeeContent,
    hashtags: ["#EUDR", "#BrazilianCoffee", "#CoffeeTraceability", "#DeforestationFree", "#DueDiligence", "#SupplyChainIntegrity", "#Agritech", "#ESG", "#EuropeanUnion", "#TRACES", "#GeospatialData", "#GNSS", "#Compliance", "#Exportacao", "#AgroBrasil"],
    image: brazilianCoffeeEudrImage,
    category: "EUDR",
  } : null;

  const madeiraEudrTranslations: Record<string, { title: string; description: string; fullText: string[] } | null> = {
    pt: {
      title: "Madeira Tropical Brasileira e EUDR: o fim da era do \"DOF de gaveta\"",
      description: "A União Europeia confirmou em dezembro de 2025 a nova arquitetura do EUDR: aplicação plena para grandes e médios operadores em 30 de dezembro de 2026. Para a madeira tropical brasileira — ipê, jatobá, cumaru, garapa, sucupira, angelim, massaranduba — isso significa duas coisas. Primeiro: o EUTR (Regulamento UE 995/2010) continua vigente para produtos colocados no mercado antes da entrada do EUDR até 31 de dezembro de 2027. Ou seja, a fiscalização não diminui — ela apenas migra de regime. Segundo: o Brasil foi classificado como risco \"standard\", o que significa due diligence completa para cada lote e controles alfandegários proporcionais ao risco.",
      fullText: [
      "O problema central da madeira brasileira na pauta europeia não é novo, mas agora ganhou peso jurídico inédito: a lavagem de madeira.",
      "Os pontos cegos do sistema brasileiro de rastreabilidade florestal",
      "1. DOF, SISFLORA e SINAFLOR — sistemas que dependem da declaração. O Documento de Origem Florestal e os sistemas estaduais (SISFLORA-PA, SISFLORA-MT) e federal (SINAFLOR) cobrem o trânsito legal da madeira no papel. Mas casos consolidados de fraude — créditos fictícios em Plano de Manejo Florestal Sustentável, volumes inflados em árvores que nunca existiram, \"esquentamento\" de toras vindas de áreas embargadas — mostraram que a integridade do dado depende da fiscalização local, e esta é estruturalmente subdimensionada frente à extensão da floresta amazônica.",
      "2. A ruptura do elo físico-digital. Entre a tora derrubada na floresta e o contêiner no porto de Belém ou Paranaguá, a identidade física da madeira é atestada por plaquetas plásticas, tinta, RFID e códigos de barras — todos passíveis de cair, ser substituídos ou serem aplicados a uma tora diferente daquela registrada. O \"DNA\" da árvore desaparece no primeiro carregamento.",
      "3. O comprador europeu não confia mais. Após casos como a Operação Arquimedes, a Operação Castanheira e a sequência de embargos a empresas brasileiras documentados pela DG ENV, importadores europeus de madeira tropical aplicam due diligence reforçada mesmo sobre fornecedores de longa data. O custo do compliance virou critério de seleção — e quem não automatiza, perde margem.",
      "A nova fronteira: marcação física não-clonável, ligada à coordenada de origem",
      "Existe hoje uma tecnologia que resolve o gap específico da madeira: o vácuo entre a árvore na floresta e o tronco no pátio. O conceito não é satelital nem documental — é físico:",
      "Marca direta na face da tora, gerada por sinais GNSS no momento exato do corte. Em vez de plaquetas, RFID ou tinta, a tecnologia imprime um código único no anel da madeira, derivado em tempo real dos sinais das constelações Galileo, GPS, GLONASS e BeiDou — com precisão de 2 metros e timestamp de 1 segundo. O código nasce com a tora, na coordenada exata onde ela caiu. Não há banco de dados externo a ser hackeado: a identidade está literalmente gravada na madeira.",
      "Resistência ao ambiente da cadeia florestal. A marcação foi projetada para sobreviver ao que destrói tudo o resto: abrasão durante o transporte, exposição a chuva e sol, manipulação em pátios de toras, corte em serraria. Onde plaquetas caem e RFIDs falham, a marca permanece.",
      "Leitura por IA com detecção de adulteração. Aplicativos de campo decodificam o marker em segundos, mesmo em condições adversas, e identificam tentativas de clonagem ou adulteração. Cada leitura verifica autenticidade contra os dados de origem GNSS embutidos no próprio código.",
      "Geração automatizada da DDS para o TRACES. O dado coletado na floresta alimenta diretamente o sistema oficial da União Europeia, gerando a Declaração de Devida Diligência sem intervenção manual entre o pátio e a alfândega.",
      "Arquitetura descentralizada e auditável. Cada elo da cadeia (manejador, transportadora, serraria, exportador) mantém controle GDPR-compliant dos próprios dados, mas o trilho de auditoria é íntegro de ponta a ponta. O importador europeu vê exatamente o que precisa ver — nem mais, nem menos.",
      "De vulnerabilidade reputacional a ativo de mercado",
      "A madeira tropical brasileira tem hoje a oportunidade de inverter o sinal da sua marca no mercado europeu. Não com mais papelada, mas com prova física verificável de origem legal — algo que nenhum competidor asiático ou africano oferece com a mesma maturidade tecnológica.",
      "Para operadores conectados a planos de manejo certificados (PMFS legal, FSC, PEFC, Cerflor), essa tecnologia transforma o ônus do compliance em prêmio de preço — porque o que o comprador europeu paga agora é a verificabilidade, não só a legalidade.",
      ],
    },
    en: {
      title: "Brazilian Tropical Timber and the EUDR: The End of the 'Drawer DOF' Era",
      description: "In December 2025, the European Union confirmed the new structure of the EUDR, with full implementation for large and medium-sized operators set to take place on 30 December 2026. For Brazilian tropical timbers such as ipê, jatobá, cumaru, garapa, sucupira, angelim and massaranduba, this means two things. First, the EUTR (EU Regulation 995/2010) will remain in effect for products placed on the market before the EUDR comes into force until 31 December 2027. In other words, enforcement does not decrease — it merely shifts to a different regime. Secondly, Brazil has been classified as 'standard' risk, meaning full due diligence is required for each shipment, with customs controls proportionate to the risk.",
      fullText: [
        "The central issue regarding Brazilian timber on the European agenda is not new, but it has now gained unprecedented legal weight in the form of timber laundering.",
        "The blind spots of the Brazilian forest traceability system",
        "1. DOF, SISFLORA and SINAFLOR — systems that rely on declarations. The Document of Forest Origin (DOF) and the state (SISFLORA-PA and SISFLORA-MT) and federal (SINAFLOR) systems are designed to ensure the legal transit of timber. However, well-documented cases of fraud, such as fictitious credits in Sustainable Forest Management Plans and inflated volumes of non-existent trees, have shown that data integrity depends on local enforcement. This is a challenge given the vastness of the Amazon rainforest and the structural under-staffing of local enforcement.",
        "2. Breakdown of the physical-digital link. Between the log felled in the forest and the container at the ports of Belém or Paranaguá, the timber's physical identity is verified using plastic tags, ink, RFID and barcodes — all of which can fall off, be replaced or be applied to a different log to the one registered. The tree's 'DNA' disappears with the first shipment.",
        "3. European buyers no longer trust. Following cases such as Operation Archimedes and Operation Castanheira, as well as the series of embargoes on Brazilian companies documented by DG ENV, European importers of tropical timber now apply enhanced due diligence, even to long-standing suppliers. The cost of compliance has become a selection criterion, and those who do not automate lose margin.",
        "The new frontier is non-clonable physical marking linked to the origin coordinates.",
        "There is now technology that bridges the gap in the timber supply chain between the tree in the forest and the log in the yard. The concept is neither satellite-based nor documentary — it is physical:",
        "Direct marking on the face of the log, generated by GNSS signals at the exact moment of cutting. Rather than using tags, RFID or ink, this technology imprints a unique code on the wood's rings. This code is derived in real time from signals received from the Galileo, GPS, GLONASS and BeiDou constellations, with an accuracy of two metres and a one-second timestamp. The code is created when the log is felled, at its exact coordinates. There is no external database that can be hacked because the identity is literally engraved in the wood.",
        "It is resistant to the forestry supply chain environment. The marking is designed to survive abrasion during transport, exposure to rain and sun, handling in log yards and cutting at the sawmill — things that destroy everything else. Where tags fall off and RFIDs fail, the mark remains.",
        "AI-powered reading with tamper detection. Field apps can decode the marker in seconds, even under adverse conditions, and identify any cloning or tampering attempts. Each reading verifies the product's authenticity against the GNSS source data embedded in the code itself.",
        "Automated DDS generation for TRACES. Data collected in the forest is fed directly into the European Union's official system, generating the Due Diligence Statement without the need for manual intervention between the yard and customs.",
        "Decentralised and auditable architecture. Each link in the chain (manager, transporter, sawmill and exporter) maintains control of its own GDPR-compliant data, and the complete audit trail is accessible from end to end. European importers only see the information they need — no more, no less.",
        "From Reputational Vulnerability to Market Asset",
        "Brazilian tropical timber now has the opportunity to improve its brand image in the European market. This will not be achieved through more paperwork, but rather through verifiable physical proof of legal origin, which no Asian or African competitor can offer with the same technological maturity.",
        "For operators linked to certified management plans (such as legal PMFS, FSC, PEFC and Cerflor), this technology can transform the burden of compliance into a price premium because European buyers are now paying for verifiability, not just legality.",
      ],
    },
    it: {
      title: "Legname tropicale brasiliano e EUDR: la fine dell'era del \"DOF da cassetto\"",
      description: "Nel dicembre 2025, l'Unione Europea ha confermato la nuova struttura dell'EUDR, che prevede l'applicazione piena per gli operatori di grandi e medie dimensioni a partire dal 30 dicembre 2026. Per il legno tropicale brasiliano, come l'ipê, il jatobá, il cumaru, la garapa, la sucupira, l'angelim e la massaranduba, ciò significa due cose. In primo luogo, l'EUTR (Regolamento UE 995/2010) rimane in vigore per i prodotti immessi sul mercato prima dell'entrata in vigore dell'EUDR fino al 31 dicembre 2027. In altre parole, i controlli non diminuiscono, ma cambiano semplicemente regime. In secondo luogo, il Brasile è stato classificato come Paese a rischio \"standard\", il che significa che sarà necessaria una due diligence completa per ogni lotto e che i controlli doganali saranno proporzionali al rischio.",
      fullText: [
        "Il problema centrale del legno brasiliano nell'agenda europea non è nuovo, ma ora ha acquisito un peso giuridico senza precedenti: il riciclaggio del legno.",
        "I punti ciechi del sistema brasiliano di tracciabilità forestale",
        "1. DOF, SISFLORA e SINAFLOR, sistemi che dipendono dalle dichiarazioni. Il Documento di Origine Forestale e i sistemi statali (SISFLORA-PA e SISFLORA-MT) e federali (SINAFLOR) dovrebbero garantire il transito legale del legno, ma non è così. Tuttavia, casi consolidati di frode, come crediti fittizi nel Piano di Gestione Forestale Sostenibile, volumi gonfiati di alberi inesistenti e \"riciclaggio\" di tronchi provenienti da aree soggette a embargo, hanno dimostrato che l'integrità dei dati dipende dalla vigilanza locale, che è strutturalmente sottodimensionata rispetto all'estensione della foresta amazzonica.",
        "2. La rottura del collegamento fisico-digitale. Tra il tronco abbattuto nella foresta e il container nel porto di Belém o Paranaguá, l'identità fisica del legno è attestata da placchette di plastica, inchiostro, RFID e codici a barre, tutti soggetti a cadere, essere sostituiti o essere applicati a un tronco diverso da quello registrato. Il \"DNA\" dell'albero scompare al primo carico.",
        "3. L'acquirente europeo non si fida più. Dopo casi come l'Operazione Archimede, l'Operazione Castanheira e la serie di embarghi alle aziende brasiliane documentati dalla DG ENV, gli importatori europei di legno tropicale applicano una due diligence rafforzata anche ai fornitori storici. Il costo della conformità è diventato un criterio di selezione e chi non automatizza rischia di perdere margine.",
        "La nuova frontiera è la marcatura fisica non clonabile, collegata alle coordinate di origine.",
        "Oggi esiste una tecnologia che risolve il problema specifico del legno: il vuoto tra l'albero nella foresta e il tronco nel piazzale. Il concetto non è satellitare né documentale, ma fisico: marcatura diretta sulla superficie del tronco generata dai segnali GNSS nel momento esatto del taglio. Invece di targhette, RFID o inchiostro, la tecnologia imprime un codice unico sull'anello del legno, derivato in tempo reale dai segnali delle costellazioni Galileo, GPS, GLONASS e BeiDou, con una precisione di 2 metri e un timestamp di 1 secondo. Il codice nasce con il tronco, nelle coordinate esatte in cui è caduto. Non c'è un database esterno da hackerare: l'identità è letteralmente incisa nel legno.",
        "Resistente all'ambiente della filiera forestale. La marcatura è stata progettata per resistere a ciò che distrugge tutto il resto: l'abrasione durante il trasporto, l'esposizione a pioggia e sole, la movimentazione nei piazzali dei tronchi e il taglio in segheria. Dove le targhette cadono e gli RFID falliscono, il marchio rimane.",
        "Lettura tramite IA con rilevamento delle manomissioni. Le app da campo decodificano il marcatore in pochi secondi, anche in condizioni avverse, e rilevano i tentativi di clonazione o manomissione. Ogni lettura verifica l'autenticità del codice confrontandola con i dati GNSS di origine incorporati nel codice stesso.",
        "Generazione automatizzata della DDS per TRACES. I dati raccolti nel bosco vengono trasmessi direttamente al sistema ufficiale dell'Unione Europea, generando la Dichiarazione di Due Diligence senza necessità di intervento manuale tra il piazzale e la dogana.",
        "Architettura decentralizzata e verificabile. Ogni anello della catena (gestore, trasportatore, segheria, esportatore) mantiene il controllo dei propri dati in conformità con il GDPR, ma la traccia di audit è integra dall'inizio alla fine. L'importatore europeo vede esattamente ciò che deve vedere, né più né meno.",
        "Da vulnerabilità reputazionale a asset di mercato",
        "Il legno tropicale brasiliano ha oggi l'opportunità di trasformare la propria immagine sul mercato europeo. Non più scartoffie, ma una prova fisica e verificabile dell'origine legale, qualcosa che nessun concorrente asiatico o africano può offrire con la stessa maturità tecnologica.",
        "Per gli operatori collegati a piani di gestione certificati (PMFS legale, FSC, PEFC, Cerflor), questa tecnologia trasforma l'onere della conformità in un premio di prezzo, perché ciò che l'acquirente europeo paga ora è la verificabilità, non solo la legalità.",
      ],
    },
  };
  const madeiraContent = madeiraEudrTranslations[language];
  const madeiraEudrArticle = madeiraContent ? {
    ...madeiraContent,
    hashtags: ["#EUDR", "#MadeiraTropical", "#BrazilianTimber", "#Traceability", "#DueDiligence", "#DeforestationFree", "#LegalTimber", "#ForestCompliance", "#SupplyChainTransparency", "#TRACES", "#DDS", "#Amazonia", "#SustainableForestry", "#FSC", "#PEFC", "#Cerflor", "#ESG", "#RegTech", "#ForestTech", "#ComercioExterior"],
    image: madeiraTropicalEudrImage,
    category: "EUDR",
  } : null;

  const ajvarTranslations: Record<string, { title: string; description: string; fullText: string[] } | null> = {
    pt: {
      title: "O caviar vermelho que ainda não chegou ao Brasil",
      description: "Existe uma palavra turca, havyar, que viajou em duas direções na história. Para o oeste, deu origem ao caviar europeu — as ovas salgadas que conhecemos. Para os Bálcãs, deu origem ao ajvar: uma pasta espessa de pimentões vermelhos assados na lenha, espremidos lentamente até virarem creme. Mesma palavra, mesma ideia — concentrar até virar precioso —, dois produtos completamente diferentes.",
      fullText: [
        "O ajvar é o que sobra quando você submete três quilos de pimentão vermelho a fogo, lenha, paciência e sal. O resultado é uma pasta densa, defumada, levemente doce, que nos Bálcãs é parte da despensa nacional do mesmo modo que a goiabada é da brasileira: zimnica, conserva de inverno, ritual familiar de fim de verão. Quando os pimentões amadurecem em setembro, famílias inteiras se reúnem em torno de fogueiras nos quintais para queimar, descascar, moer e cozinhar — uma operação coletiva que termina em dúzias de potes selados para os meses frios.",
        "A pergunta interessante não é \"o que é ajvar\". É: por que esse produto, que depende inteiramente de fogo, fumaça e pimentão vermelho, ainda não fez parte da cultura brasileira do churrasco?",
        "A resposta provavelmente está no fato de que ninguém ainda contou essa história aqui. Porque o paladar brasileiro, contrariamente ao que se possa imaginar, já sabe exatamente como comer ajvar. Ele só não sabe o nome.",
        "O vinagrete e seu primo defumado",
        "Pense no vinagrete que acompanha o churrasco: tomate, cebola, pimentão, vinagre, azeite. É um molho fresco, ácido, com pedaços. Agora imagine uma versão dele que passou pelo carvão. Que perdeu a água, ganhou fumaça, virou pasta. Que troca a frescura pela profundidade, o crocante pelo cremoso. Esse é o ajvar — não como invasor estrangeiro do churrasco, mas como sua versão concentrada, seu vinagrete envelhecido no fogo. Os ingredientes-base são quase os mesmos. O que muda é o tempo e o método.",
        "Essa proximidade não é detalhe. É o que torna o ajvar tão diferente, por exemplo, de um kimchi ou de um zaatar — produtos magníficos, mas culturalmente distantes do paladar médio brasileiro. O ajvar entra por uma porta que já está aberta.",
        "Mas atenção: nem todo ajvar é ajvar",
        "Aqui é necessário um aviso. O que circula na maior parte dos supermercados europeus sob o rótulo ajvar é, em geral, um produto industrial cuja relação com o original é a mesma que existe entre o queijo ralado em sachê e um Parmigiano Reggiano envelhecido. A palavra é a mesma. O produto, não.",
        "A versão de massa nasce de outra lógica produtiva: pimentões genéricos em vez das variedades tradicionais (a Kurtovska Kapija, a Rog — pimentões alongados, carnudos, naturalmente doces, que dispensam adição de açúcar); aromatizante de fumaça em vez de fogo de lenha de verdade; cozimento curto em caldeiras industriais em vez das três a quatro horas de redução lenta; óleos vegetais refinados em vez de azeite; e, com frequência, polpa de tomate como diluente para cortar custos — algo que, na tradição balcânica, é considerado adulteração pura e simples.",
        "O resultado é um produto razoável como molho industrial, mas que perde quase tudo o que justifica o nome: a defumação real, a textura aveludada da redução longa, a doçura natural do pimentão tostado, a complexidade que só vem de tempo e fogo direto. É o ajvar reduzido a uma silhueta de si mesmo — comestível, mas distante do original como um café solúvel está de um espresso bem extraído.",
        "Para o consumidor brasileiro que vai descobrir o produto agora, essa distinção é decisiva. Ajvar industrial confirma o estereótipo: \"molho estrangeiro, nada de especial\". Ajvar artesanal — pimentão certo, fogo de lenha, redução lenta, azeite de verdade — é uma categoria à parte. A mesma palavra, dois produtos completamente diferentes. Vale a pena saber qual está no pote antes de formar opinião.",
        "Queijo coalho, dadinho de tapioca: a química do encontro",
        "O queijo coalho, espetado e grelhado, pede uma contrapartida ácida e salgada. Geralmente recebe melado, geleia de pimenta, mel — soluções doces. O ajvar oferece uma alternativa: salgada, defumada, cor intensa de pimentão maduro. Mesma função, registro diferente. Quem já comeu coalho com geleia de pimenta entende imediatamente o que ajvar faz no prato.",
        "O dadinho de tapioca segue lógica parecida. A geleia de pimenta que o acompanha quase sempre cumpre o papel de contraste agridoce. O ajvar, menos doce e mais complexo, mantém o contraste sem cair na mesma nota açucarada — um upgrade sensorial dentro do mesmo gesto.",
        "Da Canastra à panela: a versatilidade fora do churrasco",
        "Reduzir o ajvar ao churrasco seria perdê-lo pela metade. Seu lugar mais cotidiano — e talvez o mais natural — é a despensa, o petisco e a cozinha de toda semana.",
        "Com o queijo da Canastra. O encontro mais elegante que o ajvar pode ter no Brasil é provavelmente com um Canastra bem curado. O paralelo é o das tábuas italianas que combinam Parmigiano com mostarda di frutta ou geleia de figo: um queijo intenso, salgado, com cristais de envelhecimento, pede um contraponto doce-defumado que corte a salinidade sem competir. Geleias adoçam demais. Mel é redundante. O ajvar oferece exatamente o que falta — profundidade vegetal, fumaça, doçura discreta dos pimentões maduros. Para o queijo Minas meia-cura, mais delicado, vale uma colher menor, mas a mesma lógica. E para um pão de queijo recém-saído do forno, aberto e recheado com uma colherada de ajvar: um encontro mineiro-balcânico que parece feito para acontecer.",
        "Na massa. Nos Bálcãs, o ajvar não é molho de massa — é conserva de inverno. Mas a química funciona muito bem nessa direção. Um rigatoni al ajvar, feito apenas com ajvar, um pouco da água de cozimento da massa, pimenta e queijo ralado para finalizar, é um prato de dez minutos com perfil de molho de quatro horas. A redução longa que o ajvar já passou fez todo o trabalho que normalmente um molho de tomate exige no fogão. Para uma versão mais rica, uma colher de creme de leite fresco, e o resultado se aproxima de uma vodka sauce sem o álcool e com fumaça no lugar.",
        "Como base de petiscos. A consistência de pasta densa abre possibilidades que poucos condimentos têm: bruschetta sobre pão tostado com fio de azeite; misturado a cream cheese ou ricota fresca como dip para vegetais e biscoitos; substituto do molho de tomate em pizzas individuais — o resultado é mais escuro, mais concentrado, e pede mussarela de búfala em vez da convencional; recheio de sanduíche com vegetais grelhados e queijo branco; companhia de ovos mexidos na manhã seguinte; marinada para frango antes da grelha, com alho e azeite. Em todos esses contextos, o ajvar não disputa destaque — ele constrói camada de sabor por baixo, do mesmo jeito que um bom tomate seco italiano ou uma tapenade de azeitona faz na cozinha mediterrânea.",
        "Antigo, mas alinhado com o presente",
        "Há algo curioso no ajvar olhado com olhos contemporâneos. Foi inventado por camponesas balcânicas que não tinham geladeira, precisavam salvar a colheita do pimentão antes do inverno, e trabalhavam com o que tinham — fogo, óleo, sal. Sem qualquer intenção, criaram uma receita que atende a praticamente todas as exigências da alimentação moderna mais atenta.",
        "A versão autêntica é vegetal por construção, não por adaptação: pimentão, berinjela, azeite e sal. Nenhum ingrediente animal, nenhum aditivo industrial — não porque alguém quis fazer uma versão \"vegana\", mas porque a tradição nunca incluiu nada disso. É naturalmente sem glúten, baixo em carboidratos, compatível com dieta cetogênica. Rico em vitamina C (mais do que a laranja), em betacaroteno e em licopeno — o pigmento vermelho que a ciência hoje associa a benefícios cardiovasculares.",
        "A ironia interessante é que, num mercado em que produtos industriais se reformulam constantemente para parecerem \"limpos\" — clean label, plant-based, free-from —, o ajvar artesanal não precisa fingir nada. Ele já é tudo isso, há séculos, simplesmente porque foi feito assim desde sempre. É a forma mais antiga de \"comida do futuro\" que se possa imaginar.",
        "Não é cozinha étnica. É um ingrediente esperando lugar.",
        "A tentação fácil seria apresentar o ajvar como \"especialidade balcânica\", colocá-lo na prateleira dos produtos exóticos e esperar que curiosos o descubram. Seria um erro de leitura. O ajvar não é cozinha étnica no Brasil — é um ingrediente que faltava num sistema gastronômico que já tem todas as referências para entendê-lo. Pimentão, fogo, lenha, fumaça, espessura de pasta, função de acompanhar carne grelhada: nada disso é estrangeiro.",
        "O que é estrangeiro é a palavra. E talvez o método de produção lento — três horas de fogo direto, cozimento prolongado, redução progressiva — que num mundo de molhos industriais virou raridade.",
        "Os Bálcãs chamam o ajvar de \"caviar vermelho\" não por marketing, mas porque entendem que o que está em jogo é uma transformação preciosa: muito vegetal, muito tempo, muito fogo, para um pouco de creme final. É o tipo de produto que, quando bem feito, justifica sozinho um pedaço de pão.",
        "A verdadeira pergunta, então, não é se o ajvar vai chegar ao Brasil. É quando, como, e por meio de quem.",
      ],
    },
    en: {
      title: "Red caviar that hasn't yet reached Brazil",
      description: "There is a Turkish word, havyar, which has travelled in two directions throughout history. To the west, it gave rise to European caviar — the salted roe we know today. In the Balkans, it gave rise to ajvar: a thick paste made from red bell peppers that are roasted over a wood fire and slowly pressed until they become a cream. The same word, the same idea — concentrating until it becomes precious — two completely different products.",
      fullText: [
        "Ajvar is what remains when three kilograms of red peppers are subjected to fire, wood, patience and salt. The result is a dense, smoky, slightly sweet paste that, in the Balkans, is a staple of the national cuisine, just as guava paste is in Brazil. It is known as 'zimnica', a winter preserve and a family ritual at the end of summer. When the peppers ripen in September, families gather in their backyards around bonfires to roast, peel, grind and cook the peppers together, yielding dozens of sealed jars to see them through the cold months.",
        "The interesting question isn't \"what is ajvar?\". Rather, it is why this product, which depends entirely on fire, smoke and red bell peppers, has not yet become part of Brazilian barbecue culture.",
        "The answer likely lies in the fact that this story has yet to be told here. Because, contrary to what one might imagine, the Brazilian palate already knows exactly how to eat ajvar. It just doesn't know the name.",
        "Think of the vinaigrette that accompanies barbecued food: tomato, onion, bell pepper, vinegar and olive oil. It's a fresh, tangy sauce with chunks. Now imagine a version of it that's been cooked over charcoal. It has lost its water, gained smoke and turned into a paste. It trades freshness for depth and crunch for creaminess. This is ajvar, not a foreign invader of the barbecue, but its concentrated form: a vinaigrette aged over the fire. The base ingredients are almost the same. What changes are the time and the method.",
        "This similarity is no small detail. It is what sets ajvar apart from kimchi or zaatar, for example — magnificent products, but culturally distant from the average Brazilian palate. Ajvar walks through an open door.",
        "However, not all ajvar is ajvar, so beware!",
        "A warning is necessary here. Most ajvar sold in European supermarkets is an industrial product, and its relationship to the original is similar to that between grated cheese in a packet and aged Parmigiano Reggiano. The word is the same. The product is not.",
        "The mass-produced version stems from a different production logic: generic bell peppers instead of traditional varieties such as the elongated, meaty, naturally sweet Kurtovska Kapija and Rog peppers, which require no added sugar; smoke flavoring instead of a real wood fire; short cooking in industrial kettles instead of three to four hours of slow reduction; refined vegetable oils instead of olive oil; and often, tomato pulp as a diluent to cut costs — something that, in the Balkan tradition, is considered pure and simple adulteration.",
        "The result is a passable industrial sauce that loses almost everything that justifies its name: real smoking, a velvety texture from long reduction, natural sweetness from roasted peppers and complexity from time and direct heat. It is ajvar reduced to a shadow of its former self — edible, but as far from the original as instant coffee is from a well-extracted espresso.",
        "For Brazilian consumers discovering the product now, this distinction is crucial. Industrial ajvar confirms the stereotype: 'Foreign sauce, nothing special.' Artisanal ajvar — made with the right peppers, a wood fire, a slow reduction and real olive oil — is in a category of its own. The same word, two completely different products. It's important to know which type of ajvar is in the jar before forming an opinion.",
        "Coalho cheese and tapioca cubes: a culinary pairing with a scientific basis.",
        "Coalho cheese, when skewered and grilled, calls for an acidic and salty accompaniment. It is usually served with sweet solutions such as molasses, pepper jelly or honey. Ajvar offers an alternative: salty and smoky with an intense colour from the ripe peppers. Same function, different profile. Anyone who has tried coalho with pepper jelly will immediately understand the purpose of ajvar on the plate.",
        "The same logic applies to tapioca cubes. The pepper jelly that accompanies them almost always plays the role of a sweet-and-sour contrast. Ajvar, which is less sweet and more complex, maintains the contrast without resorting to the same sugary note — a sensory upgrade within the same gesture.",
        "From Canastra to the pan: ajvar's versatility extends beyond the barbecue.",
        "Reducing ajvar to just barbecue would be missing half the story. Its most everyday — and perhaps most natural — place is in the pantry as a snack and in the kitchen every week.",
        "With Canastra cheese. The most elegant pairing ajvar can have in Brazil is with a well-aged Canastra. It's similar to Italian cheese boards that pair Parmigiano with mostarda di frutta or fig jam: an intense, salty, aged cheese calls for a sweet, smoky counterpoint that cuts through the saltiness without competing. Jams are too sweet. Honey is redundant. Ajvar offers exactly what's missing: vegetal depth, smokiness and the subtle sweetness of ripe peppers. For the more delicate semi-cured Minas cheese, a smaller amount works better, but the same logic applies. And what about cheese bread fresh from the oven, split open and stuffed with ajvar? A Minas-Balkan pairing made in heaven.",
        "On pasta. In the Balkans, ajvar isn't a pasta sauce; it's a winter preserve. However, it works very well as a pasta sauce. Rigatoni al ajvar, made with ajvar, a little pasta cooking water, pepper and grated cheese, is a ten-minute dish with the flavour of a four-hour sauce. The ajvar's lengthy preparation process means that it does all the work that a tomato sauce normally requires on the stove. For a richer version, add a spoonful of fresh cream and the result resembles a vodka sauce without the alcohol, with a smoky flavour instead.",
        "It can also be used as a base for appetisers. Its thick, paste-like consistency opens up possibilities that few condiments have. It can be used for bruschetta on toasted bread with a drizzle of olive oil, mixed with cream cheese or fresh ricotta as a dip for vegetables and crackers, or as a substitute for tomato sauce on individual pizzas. The result is darker and more concentrated and calls for buffalo mozzarella instead of the conventional kind. It can also be used as a sandwich filling with grilled vegetables and white cheese, as a companion to scrambled eggs the next morning, or as a marinade for chicken before grilling with garlic and olive oil. In all these contexts, ajvar doesn't compete for the spotlight — it adds an extra layer of flavour, just as sun-dried tomatoes or olive tapenade do in Mediterranean cuisine.",
        "Old-fashioned yet contemporary",
        "There is something curious about ajvar when viewed through a contemporary lens. It was invented by Balkan peasant women who had no refrigerators and needed to preserve the pepper harvest before winter. They worked with what they had: fire, oil and salt. Without intending to, they created a recipe that meets virtually all the requirements of the most mindful modern diet.",
        "The authentic version is plant-based by design, not adaptation: bell peppers, aubergines, olive oil and salt. There are no animal ingredients or industrial additives — not because someone wanted to make a 'vegan' version, but because the tradition never included any of that. Ajvar is naturally gluten-free, low in carbohydrates and compatible with a ketogenic diet. It is rich in vitamin C (more than oranges), beta-carotene and lycopene — the red pigment that science now associates with cardiovascular benefits.",
        "Interestingly, in a market where industrial products are constantly reformulated to appear 'clean' — clean label, plant-based, free-from — artisanal ajvar doesn't need to pretend to be anything. It has always been made this way, so it has always been clean, plant-based and free from additives. It is the oldest form of 'food of the future' one could imagine.",
        "It's not just ethnic cuisine. It's an ingredient waiting to find its place.",
        "The easy temptation would be to present ajvar as a 'Balkan speciality', place it on the shelf of exotic products and wait for curious customers to discover it. However, that would be a misreading. Ajvar is not an ethnic cuisine in Brazil; it is an ingredient missing from a gastronomic system with all the necessary references to understand it. Bell peppers, fire, firewood, smoke, a paste-like consistency and serving as an accompaniment to grilled meat are all familiar concepts.",
        "What is foreign is the word. So too is the slow production method, involving three hours of cooking over direct heat and gradual reduction, which has become a rarity in a world of industrial sauces.",
        "In the Balkans, ajvar is called 'red caviar' not for marketing purposes, but because the precious transformation of lots of vegetables, time and heat into a little final creaminess is understood. When done right, it's the kind of product that justifies a slice of bread all on its own.",
        "So the real question isn't whether ajvar will make it to Brazil. It's a matter of when, how and through whom.",
      ],
    },
    it: {
      title: "Il caviale rosso che non è ancora arrivato in Brasile",
      description: "Esiste una parola turca, havyar, che nel corso della storia ha preso due direzioni diverse. Verso ovest ha dato origine al caviale europeo, le uova di pesce salate che conosciamo. Verso i Balcani, invece, ha dato origine all'ajvar, una pasta densa di peperoni rossi arrostiti sulla legna e spremuti lentamente fino a ottenere una crema. Stessa parola, stessa idea — concentrare fino a renderlo prezioso —, ma due prodotti completamente diversi.",
      fullText: [
        "L'ajvar è ciò che resta quando si sottopongono tre chili di peperoni rossi al fuoco, alla legna, alla pazienza e al sale. Il risultato è una pasta densa, affumicata e leggermente dolce che nei Balcani fa parte della dispensa nazionale, proprio come la goiabada fa parte di quella brasiliana: zimnica, conserva invernale e rituale familiare di fine estate. Quando a settembre i peperoni maturano, intere famiglie si riuniscono attorno ai falò nei cortili per bruciarli, sbucciarli, macinarli e cuocerli, in un'operazione collettiva che si conclude con decine di barattoli sigillati per i mesi freddi.",
        "La domanda interessante non è \"cos'è l'ajvar\". La domanda è: perché questo prodotto, che dipende interamente dal fuoco, dal fumo e dal peperone rosso, non è ancora entrato a far parte della cultura brasiliana del churrasco?",
        "La risposta sta probabilmente nel fatto che nessuno ha ancora raccontato questa storia qui. Il palato brasiliano, contrariamente a quanto si possa immaginare, sa già esattamente come mangiare l'ajvar. Semplicemente, non ne conosce il nome.",
        "La vinaigrette e il suo cugino affumicato",
        "Pensate alla vinaigrette che accompagna il churrasco: pomodoro, cipolla, peperone, aceto e olio d'oliva. È una salsa fresca e acida con pezzetti. Ora immaginate una sua versione che è passata sulla brace. Ha perso l'acqua, ha guadagnato fumo ed è diventata una pasta. Scambia la freschezza con la profondità e la croccantezza con la cremosità. Questo è l'ajvar, non un invasore straniero del churrasco, ma la sua versione concentrata, la sua vinaigrette invecchiata sul fuoco. Gli ingredienti di base sono quasi gli stessi. Ciò che cambia sono il tempo e il metodo.",
        "Questa vicinanza non è un dettaglio. È ciò che rende l'ajvar così diverso, per esempio, da un kimchi o da uno zaatar, prodotti eccellenti, ma culturalmente distanti dal palato medio brasiliano. L'ajvar entra da una porta già aperta.",
        "Ma attenzione: non tutto l'ajvar è ajvar.",
        "Qui è necessario un avvertimento. Ciò che circola nella maggior parte dei supermercati europei sotto l'etichetta \"ajvar\" è, in generale, un prodotto industriale il cui rapporto con l'originale è lo stesso che esiste tra il formaggio grattugiato in bustina e un Parmigiano Reggiano stagionato. Il nome è lo stesso. Il prodotto, no.",
        "La versione industriale segue un'altra logica produttiva: peperoni generici al posto delle varietà tradizionali (come la Kurtovska Kapija o la Rog, peperoni allungati, carnosi e naturalmente dolci, che non richiedono l'aggiunta di zucchero); aroma di affumicatura al posto del vero fuoco a legna; cottura breve in calderoni industriali al posto delle tre o quattro ore di lenta riduzione; oli vegetali raffinati al posto dell'olio d'oliva e, spesso, polpa di pomodoro come diluente per tagliare i costi, cosa che nella tradizione balcanica è considerata pura e semplice adulterazione.",
        "Il risultato è un prodotto accettabile come salsa industriale, ma che perde quasi tutto ciò che giustifica il nome: l'affumicatura vera e propria, la consistenza vellutata della lunga cottura, la dolcezza naturale del peperone tostato e la complessità che deriva solo dal tempo e dal fuoco diretto. L'ajvar è ridotto a una pallida imitazione di se stesso: commestibile, ma lontano dall'originale quanto un caffè solubile lo è da un espresso ben estratto.",
        "Per il consumatore brasiliano che scopre il prodotto ora, questa distinzione è fondamentale. L'ajvar industriale conferma lo stereotipo: \"salsa straniera, niente di speciale\". L'ajvar artigianale, con i suoi peperoni giusti, il fuoco a legna, la lenta riduzione e il vero olio d'oliva, è una categoria a sé stante. La stessa parola, due prodotti completamente diversi. Vale la pena di sapere cosa c'è nel barattolo prima di farsi un'opinione.",
        "Formaggio coalho e cubetti di tapioca: la chimica dell'incontro",
        "Il formaggio coalho, infilzato e grigliato, richiede un contrappunto acido e salato. Generalmente viene accompagnato da melassa, marmellata di peperoncino o miele, soluzioni dolci. L'ajvar offre un'alternativa: salata, affumicata e dal colore intenso del peperone maturo. Stessa funzione, registro diverso. Chi ha già mangiato il coalho con la marmellata di peperoncino, capirà immediatamente il ruolo dell'ajvar nel piatto.",
        "I cubetti di tapioca seguono una logica simile. La marmellata di peperoncino che li accompagna svolge quasi sempre il ruolo di contrasto agrodolce. L'ajvar, meno dolce e più complesso, mantiene il contrasto senza cadere nella stessa nota zuccherina, offrendo un'esperienza sensoriale più raffinata.",
        "Da Canastra alla pentola: la versatilità al di fuori del barbecue",
        "Ridurre l'ajvar al barbecue significherebbe perderne la metà. Il suo posto più quotidiano, e forse il più naturale, è la dispensa, lo spuntino e la cucina di ogni giorno.",
        "Con il formaggio Canastra. In Brasile, l'abbinamento più elegante che l'ajvar possa avere è probabilmente con una Canastra ben stagionata. Il parallelo è quello dei taglieri italiani che combinano il Parmigiano con la mostarda di frutta o la marmellata di fichi: un formaggio intenso e salato, con cristalli di stagionatura, richiede un contrappunto dolce e affumicato che ne smorzi la salinità senza competere. Le marmellate sono troppo dolci. Il miele è ridondante. L'ajvar offre esattamente ciò che manca: profondità vegetale, affumicatura e la discreta dolcezza dei peperoni maturi. Per il formaggio Minas semistagionato, più delicato, è sufficiente un cucchiaio più piccolo, ma la logica è la stessa. E per un panino al formaggio appena sfornato, aperto e farcito con un cucchiaio di ajvar, si ottiene un incontro tra il Minas e i Balcani che sembra fatto apposta.",
        "Nella pasta. Nei Balcani, l'ajvar non è una salsa per la pasta, ma una conserva invernale. Ma la chimica funziona molto bene in questa direzione. Un piatto di rigatoni all'ajvar, fatto solo con ajvar, un po' dell'acqua di cottura della pasta, pepe e formaggio grattugiato per finire, è un piatto da dieci minuti che ha il sapore di una salsa fatta cuocere per quattro ore. La lunga cottura a cui è stato sottoposto l'ajvar ha svolto il lavoro che normalmente una salsa di pomodoro richiederebbe sui fornelli. Per una versione più ricca, aggiungete un cucchiaio di panna fresca e otterrete una salsa simile alla vodka sauce, ma senza alcol e con un tocco affumicato.",
        "È perfetto anche come base per stuzzichini. La sua consistenza densa apre a possibilità che pochi condimenti hanno: bruschetta su pane tostato con un filo d'olio, mescolato a crema di formaggio o ricotta fresca come salsa per verdure e cracker, sostituto della salsa di pomodoro nelle pizze individuali (il risultato è più scuro e concentrato e richiede mozzarella di bufala al posto di quella convenzionale), ripieno di panini con verdure grigliate e formaggio bianco, accompagnamento per le uova strapazzate la mattina seguente, marinata per il pollo prima della grigliata con aglio e olio d'oliva. In tutti questi contesti, l'ajvar non cerca di mettersi in mostra, ma crea una base di sapore, proprio come fa un buon pomodoro secco italiano o una tapenade di olive nella cucina mediterranea.",
        "Antico, ma in sintonia con il presente",
        "C'è qualcosa di curioso nell'ajvar visto con occhi contemporanei. È stato inventato dalle contadine balcaniche che, non avendo il frigorifero, dovevano conservare il raccolto di peperoni prima dell'inverno e lavoravano con ciò che avevano a disposizione: il fuoco, l'olio e il sale. Senza alcuna intenzione, hanno creato una ricetta che soddisfa praticamente tutte le esigenze dell'alimentazione moderna più attenta.",
        "La versione autentica è vegetale per definizione, non per adattamento: peperoni, melanzane, olio d'oliva e sale. Nessun ingrediente di origine animale, nessun additivo industriale: non perché qualcuno abbia voluto creare una versione \"vegana\", ma perché la tradizione non ha mai incluso nulla di tutto ciò. È naturalmente senza glutine, a basso contenuto di carboidrati e compatibile con la dieta chetogenica. È ricco di vitamina C (più dell'arancia), di beta-carotene e di licopene, il pigmento rosso che la scienza oggi associa a benefici cardiovascolari.",
        "L'ironia è che, in un mercato in cui i prodotti industriali vengono costantemente riformulati per sembrare \"puliti\" — clean label, plant-based, free-from —, l'ajvar artigianale non ha bisogno di fingere nulla. È già tutto questo da secoli, semplicemente perché è sempre stato fatto così. È la forma più antica di \"cibo del futuro\" che si possa immaginare.",
        "Non si tratta di cucina etnica. È un ingrediente in cerca di un posto.",
        "La tentazione più facile sarebbe quella di presentare l'ajvar come \"specialità balcanica\", metterlo sullo scaffale dei prodotti esotici e aspettare che i curiosi lo scoprano. Sarebbe un errore di interpretazione. L'ajvar non è cucina etnica in Brasile: è un ingrediente che mancava in un sistema gastronomico che ha già tutti gli strumenti per comprenderlo. Peperoni, fuoco, legna, fumo, consistenza densa e funzione di accompagnamento alla carne alla griglia: nulla di tutto ciò è straniero.",
        "Ciò che è straniero è la parola. Forse è il metodo di produzione lento, con tre ore di fuoco diretto, cottura prolungata e riduzione progressiva, che in un mondo di salse industriali è diventato una rarità.",
        "I Balcani chiamano l'ajvar \"caviale rosso\" non per motivi di marketing, ma perché comprendono che ciò che è in gioco è una trasformazione preziosa: tanta verdura, tanto tempo e tanto fuoco per ottenere una piccola quantità di crema finale. È un prodotto che, se ben fatto, giustifica da solo un pezzo di pane.",
        "La vera domanda, quindi, non è se l'ajvar arriverà in Brasile, ma come e tramite chi. La vera domanda è: quando, come e tramite chi.",
      ],
    },
  };
  const ajvarContent = ajvarTranslations[language];
  const ajvarArticle = ajvarContent ? {
    ...ajvarContent,
    hashtags: ["#Ajvar", "#CaviarVermelho", "#FoodInnovation", "#FoodBusiness", "#Gastronomia", "#ChurrascoBrasileiro", "#ProdutosGourmet", "#CleanLabel", "#PlantBased", "#SlowFood", "#CulturaAlimentar", "#BrasilGourmet", "#MinasGerais", "#QueijoCanastra", "#Balcãs"],
    image: ajvarCaviarVermelhoImage,
    category: "Food Innovation",
  } : null;

  const euMercosurPlaybookTranslations: Record<string, { title: string; description: string; fullText: string[] } | null> = {
    pt: {
      title: "O Acordo UE-Mercosul já está em vigor: um guia prático para os exportadores agroalimentares italianos interessados no Brasil",
      description: "Porque é que 1 de maio de 2026 marca a mudança estrutural mais significativa no comércio entre a Itália e o Brasil numa geração e o que a sua empresa precisa de fazer agora para aproveitar realmente a oportunidade.",
      fullText: [
        "Após mais de vinte e cinco anos de negociações, o Acordo Comercial Provisório (iTA) entre a UE e o Mercosul entrou provisoriamente em vigor em 1 de maio de 2026. Para as empresas italianas dos setores dos alimentos, vinhos e agroalimentar, este não é um marco diplomático abstrato. Trata-se de uma alteração imediata à economia das exportações para o Brasil, a Argentina, o Uruguai e o Paraguai, e de uma oportunidade em que a posição importa mais do que a perfeição.",
        "Escrevo de Belo Horizonte, onde trabalho diariamente na interseção entre a Itália e o Brasil, auxiliando empresas italianas que desejam entrar no mercado brasileiro, orientando-as através das etapas práticas — e muitas vezes frustrantes — da alfândega, do registo sanitário e da distribuição. A imagem abaixo ilustra o que tenho vindo a explicar aos clientes, parceiros e consórcios neste momento.",
        "1. Por que razão a aplicação provisória muda tudo?",
        "O Acordo Comercial Provisório foi assinado a 17 de Janeiro de 2026, juntamente com o Acordo de Parceria UE-Mercosul (EMPA), de âmbito mais vasto. O iTA abrange apenas a liberalização do comércio e dos investimentos e está a ser aplicado provisoriamente desde 1 de maio de 2026, sem aguardar a ratificação por parte dos 27 parlamentos nacionais da UE.",
        "Esta é a inovação jurídica que as PME italianas precisam de interiorizar. O Conselho Europeu autorizou a aplicação provisória assim que um país do Mercosul tivesse concluído os seus procedimentos internos de ratificação. Todos os quatro o fizeram até março de 2026. A ratificação completa do EMPA pode demorar anos e continua a ser alvo de debate no Parlamento Europeu e de possíveis decisões do TJUE. No entanto, os benefícios comerciais já estão em vigor.",
        "Em termos práticos, os exportadores beneficiam de reduções tarifárias, proteção de indicações geográficas e simplificação aduaneira. As empresas que demorarem a posicionar-se cederão a vantagem de pioneirismo aos concorrentes franceses, espanhóis e alemães, que já estão a avançar com a distribuição no Brasil.",
        "2. Desmantelamento tarifário: onde está o dinheiro de verdade",
        "O acordo elimina os direitos aduaneiros sobre 91% dos produtos da UE exportados para o Mercosul, com um cronograma de aplicação total gradual ao longo de 15 anos. No que se refere ao setor agroalimentar italiano, o impacto concentra-se em categorias historicamente penalizadas por algumas das tarifas mais elevadas do mundo.",
        "Vinhos e bebidas destiladas. As tarifas brasileiras sobre vinhos e bebidas destiladas da UE chegaram, historicamente, aos 27–35%, o que representa uma desvantagem estrutural em relação aos vinhos chilenos e argentinos, que são vendidos localmente sem tarifas. No âmbito do iTA, essas tarifas serão eliminadas progressivamente, com reduções mais rápidas para os vinhos brancos e espumantes de elevada qualidade. Para os produtores de Prosecco, Franciacorta, Asti e vinhos tranquilos premium, esta é a mudança mais impactante das últimas três décadas de política comercial sul-americana.",
        "Azeite. A atual tarifa brasileira de 10% sobre o azeite da UE está a ser progressivamente eliminada. O Brasil é um dos maiores importadores mundiais de azeite e o azeite extra-virgem italiano compete atualmente em termos de qualidade, mas não em termos de preço. A eliminação da tarifa reduz significativamente essa diferença e abre espaço para azeites IGP/DOP premium, que anteriormente não conseguiam justificar o custo de importação.",
        "Queijos e laticínios. O acesso é liberalizado principalmente através de contingentes tarifários (TRQ), com um contingente inicial de cerca de 3.000 toneladas de queijos europeus isentas de impostos e uma expansão progressiva a partir daí. Para os queijos DOP italianos, este é o avanço pelo qual os Consorzi têm lutado há duas décadas. A margem por quilo de laticínios premium no Brasil é alta; o obstáculo tem sido a tarifa, não a disposição do consumidor em pagar mais.",
        "Chocolate e confeitaria. O atual imposto brasileiro de 20% sobre o chocolate e os confeitos de açúcar está a ser progressivamente reduzido, com contingentes preferenciais superiores a 10 000 toneladas. Os produtores italianos de chocolate de gama alta, panettone, torrone e pastelaria têm um caminho claro para um mercado que já manifesta um forte interesse pelas categorias de produtos de luxo europeus.",
        "Uma observação prática: a redução gradual das tarifas é específica para cada produto. Antes de se comprometer com uma estratégia de distribuição no Brasil, classifique o código HS do seu produto de acordo com o apêndice do Anexo 2-A do iTA, a fim de compreender exatamente quando o seu produto terá uma tarifa zero e não quando \"vinho\" ou \"queijo\" tiverem uma tarifa zero de forma agregada.",
        "3. Proteção contra nomes de origem italiana: um ponto de viragem para 57 IG italianas",
        "O acordo protege 344 Indicações Geográficas europeias nos países do Mercosul, incluindo 57 indicações italianas, o que representa o maior número já garantido num acordo comercial da UE. A lista italiana parece um inventário do património nacional: Parmigiano Reggiano, Grana Padano, Gorgonzola, Mozzarella di Bufala Campana, Prosciutto di Parma, Prosciutto di San Daniele, Pomodoro San Marzano, Aceto Balsamico di Modena, Prosecco, Chianti, Chianti Classico, Barolo, Brunello di Montalcino, Franciacorta e dezenas de outras.",
        "O Brasil e os restantes países do Mercosul comprometem-se a proibir imitações e o uso de símbolos, bandeiras ou termos evocativos enganosos que explorem a reputação dos produtos italianos. Para um produtor italiano que assistiu ao \"Parmesão\", \"Presunto tipo Parma\" e \"Prosecco\" colonizarem as prateleiras brasileiras durante décadas — muitas vezes produzidos por multinacionais europeias que operam localmente — esta não é uma mudança superficial. Trata-se da criação de um enquadramento jurídico no qual os Consórcios podem finalmente agir.",
        "Dito isto, o acordo é realista em relação à produção local pré-existente. Foram negociados períodos de transição de coexistência: Parmigiano Reggiano: 7 anos de coexistência com a designação local \"Parmesão\", findos os quais se aplicará o uso exclusivo; Prosecco: 10 anos de coexistência com o termo \"Proseco\"; Prosciutto di Parma: 7 anos para eliminar gradualmente o \"Presunto tipo Parma\".",
        "Estas transições não são pontos fracos, mas sim proteções realistas que tornaram o acordo possível. A implicação estratégica para os produtores italianos é clara: os próximos sete a dez anos constituem uma oportunidade para construir autoridade da marca e educar o consumidor no Brasil, de modo a que, quando a exclusividade entrar em vigor, o \"Parmigiano Reggiano\" seja reconhecido como o original e não como um concorrente novato do \"Parmesão\" já estabelecido localmente.",
        "4. Simplificações alfandegárias e burocráticas",
        "Duas mudanças operacionais merecem atenção, pois encurtam o tempo de comercialização e reduzem a burocracia.",
        "REX (Sistema de Exportadores Registados). Os exportadores italianos registados no REX podem autocertificar a origem dos seus produtos diretamente na fatura comercial. O tradicional certificado de circulação EUR.1 deixa de ser necessário. Para as PME, que anteriormente tinham de gerir a documentação de origem através das câmaras de comércio em cada remessa, isto representa uma redução significativa nas despesas administrativas e no risco de atrasos. O registo é simples e deve ser concluído antes da primeira remessa e não após o pedido já ter sido iniciado.",
        "Mecanismo de \"pré-listagem\" para estabelecimentos. As autoridades brasileiras podem autorizar instalações de produção italianas a exportar com base em inspeções realizadas pelas autoridades sanitárias italianas (o sistema ASL). Na prática, isto reduz os prazos anteriormente intermináveis para a aprovação do estabelecimento, particularmente no caso de produtos de origem animal. Para os produtores de lacticínios, carnes curadas e proteínas processadas, a pré-listagem faz a diferença entre entrar no mercado em meses em vez de anos.",
        "5. O que ainda precisa de fazer para exportar \"agora\"?",
        "A redução de tarifas, por si só, não coloca o seu produto nas prateleiras dos supermercados brasileiros. O iTA abre a porta, mas a estrutura regulatória brasileira continua a controlar quem passa por ela. Três requisitos permanecem inegociáveis.",
        "Autorização RADAR para o seu importador. O importador brasileiro deve possuir uma autorização RADAR válida emitida pela Receita Federal, numa das três categorias (Expressa, Limitada ou Ilimitada), consoante o volume de transações. Sem esta autorização, não haverá autorização alfandegária. Se o seu parceiro brasileiro for uma nova entidade ou tiver operado abaixo do limite, verifique o estado do RADAR antes de assinar o contrato e não depois de o contentor ter sido expedido.",
        "Registo no MAPA/ANVISA. Os produtos de origem animal e as bebidas exigem registo no Ministério da Agricultura (MAPA), ao passo que os alimentos, os produtos dietéticos e os produtos de saúde exigem registo na Agência Nacional de Vigilância Sanitária (ANVISA). O registo deve ser concluído antes do embarque e os prazos variam substancialmente consoante a categoria do produto. Este é o aspeto mais subestimado pelos exportadores italianos. Incorpore-o no plano do projeto desde o primeiro dia.",
        "A rotulagem deve estar em português brasileiro. A rotulagem deve estar em português do Brasil (e não em português europeu), conter os dados de identificação do importador e incluir informações nutricionais no formato prescrito pela regulamentação brasileira, a qual difere em pormenores importantes do esquema do Regulamento 1169/2011 da UE. Um rótulo válido para o mercado da UE não é válido para o mercado brasileiro. É necessário planear um SKU de rotulagem específico para o Brasil.",
        "Uma última nota sobre a estratégia: o iTA é estruturalmente favorável ao setor agroalimentar italiano, mas também ao setor agroalimentar europeu em geral. A dinâmica competitiva não será Itália contra Brasil, mas sim Itália contra França, Espanha e Alemanha, na luta por espaço nas prateleiras brasileiras e pela preferência dos consumidores. O setor automóvel alemão e o setor alimentar espanhol têm vindo a preparar-se para este momento há dois anos. As PME italianas que agirem em 2026 definirão a próxima década da presença da Itália na América do Sul.",
        "As 57 IG protegidas constituem um ativo jurídico extraordinário. No entanto, só se tornarão um ativo comercial quando combinadas com distribuição, investimento em marketing e educação do consumidor no local. A estrutura jurídica já está em vigor. A execução depende de nós.",
      ],
    },
    it: {
      title: "L'accordo UE-Mercosur è entrato in vigore: una guida pratica per gli esportatori agroalimentari italiani che puntano al Brasile",
      description: "Perché il 1° maggio 2026 segna il cambiamento strutturale più significativo nel commercio tra Italia e Brasile degli ultimi trent'anni e cosa deve fare la tua azienda per cogliere davvero questa opportunità.",
      fullText: [
        "Dopo oltre venticinque anni di negoziati, l'Accordo commerciale provvisorio UE-Mercosur è entrato in vigore il 1° maggio 2026. Per le aziende italiane dei settori alimentare, vinicolo e agroalimentare, questa non è una semplice pietra miliare diplomatica. Si tratta di un cambiamento immediato nelle dinamiche economiche delle esportazioni verso Brasile, Argentina, Uruguay e Paraguay e di una finestra in cui il posizionamento è più importante della perfezione.",
        "Scrivo questo da Belo Horizonte, dove lavoro quotidianamente all'incrocio tra Italia e Brasile, assistendo le aziende italiane che vogliono entrare nel mercato brasiliano attraverso le pratiche doganali, la registrazione sanitaria e la distribuzione, spesso frustranti. L'immagine qui sotto è ciò che sto dicendo in questo momento ai miei clienti, partner e consorzi.",
        "1. L'applicazione provvisoria cambia tutto",
        "L'accordo commerciale provvisorio è stato firmato il 17 gennaio 2026 insieme all'Accordo di partenariato UE-Mercosur (EMPA). L'iTA riguarda solo la liberalizzazione del commercio e degli investimenti e, cosa fondamentale, è stato applicato in via provvisoria dal 1° maggio 2026, senza attendere la ratifica da parte di tutti i 27 parlamenti nazionali dell'UE.",
        "Questa è l'innovazione giuridica che le PMI italiane devono interiorizzare. Il Consiglio europeo ha autorizzato l'applicazione provvisoria non appena uno dei paesi del Mercosur ha completato le proprie procedure interne di ratifica. Tutti e quattro lo hanno fatto entro marzo 2026. La ratifica completa dell'EMPA potrebbe richiedere anni ed è ancora oggetto di dibattito al Parlamento europeo e di potenziali sentenze della Corte di giustizia dell'Unione europea. I benefici commerciali, tuttavia, sono già operativi.",
        "Per gli esportatori, la traduzione pratica è semplice: le riduzioni tariffarie, la protezione delle indicazioni geografiche e le semplificazioni doganali non sono \"in arrivo\", ma sono già in vigore. Le aziende che ritardano il posizionamento cederanno il vantaggio del primo arrivato ai concorrenti francesi, spagnoli e tedeschi, che si stanno già muovendo per conquistare la distribuzione brasiliana.",
        "2. Smantellamento tariffario: dove si trovano i veri guadagni?",
        "L'accordo elimina i dazi sul 91% delle merci dell'UE esportate verso il Mercosur, con un calendario graduale di 15 anni per la piena attuazione. Per l'agroalimentare italiano, l'impatto si concentra su categorie storicamente penalizzate da alcune delle tariffe più elevate al mondo.",
        "Vini e distillati. I dazi brasiliani su vino e alcolici dell'UE hanno storicamente raggiunto il 27-35%, creando uno svantaggio strutturale rispetto ai vini cileni e argentini, che vengono venduti localmente senza dazi. Nell'ambito dell'iTA, questi dazi vengono eliminati progressivamente, con riduzioni accelerate per i vini bianchi e gli spumanti di alta qualità. Per i produttori di Prosecco, Franciacorta, Asti e vini fermi premium, si tratta del cambiamento più significativo degli ultimi trent'anni di politica commerciale sudamericana.",
        "Olio d'oliva. L'attuale dazio brasiliano del 10% sull'olio d'oliva dell'UE verrà progressivamente eliminato. Il Brasile è uno dei principali importatori mondiali di olio d'oliva e l'extravergine italiano, seppur di alta qualità, è svantaggiato sul prezzo al dettaglio. L'eliminazione dei dazi riduce significativamente tale divario e apre uno spazio agli oli IGP/DOP di alta qualità che in precedenza non potevano giustificare il costo dello sbarco.",
        "Formaggi e latticini. L'accesso è liberalizzato principalmente attraverso contingenti tariffari (TRQ), con un contingente iniziale esente da dazi di circa 3.000 tonnellate per i formaggi europei e un'espansione progressiva successiva. Per i formaggi DOP italiani, questa è la svolta verso cui i consorzi spingono da due decenni. Il margine al chilo sui latticini di alta gamma in Brasile è elevato; il collo di bottiglia è stato il dazio, non la disponibilità dei consumatori a pagare.",
        "Cioccolato e dolciumi. L'attuale dazio brasiliano del 20% su cioccolato e dolciumi a base di zucchero viene progressivamente ridotto con contingenti preferenziali superiori a 10.000 tonnellate. I produttori italiani di cioccolato di alta qualità, panettoni, torroni e pasticceria hanno dunque una chiara opportunità di accesso a un mercato che ha già dimostrato di apprezzare i prodotti di piacere europei.",
        "Una nota pratica: la riduzione graduale dei dazi è specifica per prodotto. Prima di impegnarsi in una strategia di distribuzione in Brasile, è necessario classificare il proprio codice HS in base all'allegato 2-A dell'iTA per capire esattamente quando il proprio prodotto raggiungerà il dazio zero, non quando lo raggiungeranno \"vino\" o \"formaggio\" in generale.",
        "3. Protezione contro l'Italian Sounding: una svolta per 57 IG italiane",
        "L'accordo protegge 344 Indicazioni Geografiche europee nei Paesi del Mercosur, tra cui 57 indicazioni italiane, il numero più alto mai garantito in un accordo commerciale dell'UE. L'elenco italiano è un vero e proprio inventario del patrimonio nazionale: Parmigiano Reggiano, Grana Padano, Gorgonzola, Mozzarella di Bufala Campana, Prosciutto di Parma, Prosciutto di San Daniele, Pomodoro San Marzano, Aceto Balsamico di Modena, Prosecco, Chianti, Chianti Classico, Barolo, Brunello di Montalcino, Franciacorta e molti altri.",
        "Il Brasile e gli altri Paesi del Mercosur si impegnano a vietare le imitazioni e l'uso di simboli, bandiere o termini evocativi fuorvianti che sfruttano la reputazione dei prodotti italiani. Per un produttore italiano che ha visto \"Parmesão\", \"Presunto tipo Parma\" e \"Proseco\" colonizzare gli scaffali brasiliani per decenni, spesso prodotti da multinazionali europee operanti a livello locale, questo non è un cambiamento di facciata. Si tratta della creazione di un terreno giuridico su cui i Consorzi possono finalmente agire.",
        "Detto questo, l'accordo è realistico riguardo alla produzione locale preesistente. Sono stati negoziati dei periodi di transizione per la coesistenza: Parmigiano Reggiano: 7 anni di coesistenza con il termine locale \"Parmesão\", dopodiché si applica l'uso esclusivo; Prosecco: 10 anni di coesistenza con il termine \"Proseco\"; Prosciutto di Parma: 7 anni per eliminare gradualmente il \"Presunto tipo Parma\".",
        "Questi periodi di transizione non sono punti deboli, ma guardrail realistici che hanno reso possibile l'accordo. L'implicazione strategica per i produttori italiani è chiara: nei prossimi 7-10 anni dovranno costruire l'autorevolezza del marchio e educare i consumatori brasiliani, in modo che, quando arriverà l'esclusività, il \"Parmigiano Reggiano\" sia riconosciuto come l'originale e non come il concorrente emergente del \"Parmesão\", ormai radicato localmente.",
        "4. Semplificazioni doganali e burocratiche",
        "Due cambiamenti operativi meritano attenzione, in quanto accorciano i tempi di immissione sul mercato e riducono gli attriti documentali.",
        "REX (sistema degli esportatori registrati). Gli esportatori italiani registrati nel REX possono autocertificare l'origine dei propri prodotti direttamente sulla fattura commerciale. Il tradizionale certificato di circolazione EUR.1 non è più richiesto. Per le PMI, che in precedenza dovevano gestire la documentazione di origine tramite le Camere di Commercio per ogni spedizione, si tratta di una significativa riduzione dei costi amministrativi e del rischio legato ai tempi. La registrazione è semplice e deve essere completata prima della prima spedizione e non dopo l'effettuazione dell'ordine.",
        "Meccanismo di \"pre-listing\" per gli stabilimenti. Le autorità brasiliane possono autorizzare gli stabilimenti di produzione italiani all'esportazione sulla base delle ispezioni condotte dalle autorità sanitarie italiane (il sistema ASL). In pratica, ciò riduce i tempi, in precedenza interminabili, per l'approvazione dello stabilimento, in particolare per i prodotti di origine animale. Per i produttori di latticini, salumi e proteine trasformate, il pre-listing fa la differenza tra un tempo di ingresso nel mercato misurato in anni e uno misurato in mesi.",
        "5. Cosa devi ancora fare per esportare \"ora\"?",
        "I tagli tariffari, di per sé, non fanno sì che il tuo prodotto finisca sugli scaffali dei supermercati brasiliani. L'iTA apre la porta, ma l'architettura normativa brasiliana controlla ancora chi la attraversa. Tre requisiti rimangono non negoziabili.",
        "Autorizzazione RADAR per il vostro importatore. L'importatore brasiliano deve essere in possesso di un'autorizzazione RADAR valida, rilasciata dalla Receita Federal, in una delle tre categorie (Expressa, Limitada o Ilimitada), a seconda del volume delle transazioni. Senza di essa, non è possibile effettuare lo sdoganamento. Se la vostra controparte brasiliana è una nuova entità o ha operato al di sotto della soglia, verificate lo stato RADAR prima di firmare il contratto e non dopo che il container è stato spedito.",
        "Registrazione MAPA/ANVISA. I prodotti di origine animale e le bevande richiedono la registrazione presso il Ministero dell'Agricoltura (MAPA), mentre gli alimenti, i prodotti dietetici e sanitari devono essere registrati presso l'Agenzia Nazionale di Vigilanza Sanitaria (ANVISA). La registrazione deve essere completata prima della spedizione e i tempi di elaborazione variano notevolmente a seconda della categoria di prodotto. Questo è il collo di bottiglia più sottovalutato dagli esportatori italiani. Inseritelo nel piano di progetto fin dal primo giorno.",
        "Etichettatura in portoghese brasiliano. L'etichetta deve essere in portoghese brasiliano (non in portoghese europeo) e riportare i dati identificativi dell'importatore. Inoltre, deve includere le informazioni nutrizionali nel formato prescritto dalla normativa brasiliana, che differisce in alcuni dettagli importanti dallo schema del Regolamento UE 1169/2011. Un'etichetta valida per il mercato UE non lo è per quello brasiliano. Prevedete uno SKU dedicato all'etichettatura brasiliana.",
        "Una nota conclusiva sulla strategia: l'iTA è strutturalmente favorevole all'agroalimentare italiano, ma lo è anche per tutto l'agroalimentare europeo. La dinamica competitiva non sarà Italia contro Brasile, ma Italia contro Francia, Spagna e Germania per conquistare uno spazio sugli scaffali e l'attenzione dei consumatori brasiliani. Il settore automobilistico tedesco e quello alimentare spagnolo si stanno preparando a questo momento da due anni. Le PMI italiane che si muoveranno nel 2026 definiranno il prossimo decennio della presenza italiana in Sud America.",
        "Le 57 IG protette rappresentano una risorsa legale straordinaria. Diventano una risorsa commerciale solo se abbinate a una strategia di distribuzione, a investimenti in marketing e a un'attività di educazione dei consumatori sul campo. Il quadro giuridico è ora in vigore. L'attuazione dipende da noi.",
      ],
    },
    en: {
      title: "The EU–Mercosur Agreement Is Live: A Practical Playbook for Italian Agri-Food Exporters Looking at Brazil",
      description: "Why 1 May 2026 marks the most significant structural shift in Italy–Brazil trade in a generation — and what your company needs to do now to actually capture the opportunity.",
      fullText: [
        "After more than twenty-five years of negotiations, the EU–Mercosur Interim Trade Agreement (iTA) entered into provisional application on 1 May 2026. For Italian food, wine and agri-food businesses, this is not an abstract diplomatic milestone. It is an immediate change in the economics of exporting to Brazil, Argentina, Uruguay and Paraguay — and a window in which positioning matters more than perfection.",
        "I write this from Belo Horizonte, where I work daily at the Italy–Brazil intersection: assisting Italian companies that want to enter the Brazilian market through the practical, often frustrating, layers of customs, sanitary registration and distribution. The picture below is what I am telling clients, partners and Consorzi right now.",
        "1. Why provisional application changes everything",
        "The interim Trade Agreement was signed on 17 January 2026, alongside the broader EU–Mercosur Partnership Agreement (EMPA). The iTA covers trade and investment liberalisation only — and crucially, it has been provisionally applied since 1 May 2026, without waiting for ratification by all 27 EU national parliaments.",
        "This is the legal innovation Italian SMEs need to internalise. The European Council authorised provisional application as soon as one Mercosur country completed its internal ratification procedures. All four did by March 2026. Full ratification of the EMPA may take years and is still subject to debate in the European Parliament and potential CJEU rulings. The commercial benefits, however, are operational today.",
        "The practical translation for exporters is simple: the tariff reductions, the geographical indication protections and the customs simplifications are not \"coming\" — they are in force. Companies that delay positioning will cede first-mover advantage to French, Spanish and German competitors who are already moving on Brazilian distribution.",
        "2. Tariff dismantling: where the real money sits",
        "The agreement eliminates duties on 91% of EU goods exported to Mercosur, with a 15-year staging schedule for full implementation. For Italian agri-food, the impact concentrates on categories historically punished by some of the world's highest tariffs.",
        "Wine and spirits. Brazilian duties on EU wine and spirits have historically reached 27–35% — a structural disadvantage against Chilean and Argentinian wines selling locally tariff-free. Under the iTA, these tariffs are eliminated progressively, with accelerated cuts for high-quality white wines and sparkling wines. For producers of Prosecco, Franciacorta, Asti and premium still wines, this is the single most consequential change in three decades of South American trade policy.",
        "Olive oil. The current 10% Brazilian duty on EU olive oil is being progressively eliminated. Brazil is one of the world's top importers of olive oil, and Italian extra virgin currently competes on quality but loses on shelf price. Tariff removal narrows that gap meaningfully — and opens space for premium PGI/PDO oils that previously could not justify the landed cost.",
        "Cheese and dairy. Access is liberalised primarily through tariff-rate quotas (TRQs), with an initial duty-free contingent of approximately 3,000 tonnes for European cheeses and progressive expansion thereafter. For Italian PDO cheeses, this is the breakthrough Consorzi have been pushing toward for two decades. Margin per kilo on premium dairy in Brazil is high; the bottleneck has been the duty, not consumer willingness to pay.",
        "Chocolate and confectionery. The current 20% Brazilian duty on chocolate and sugar confectionery is being progressively reduced, with preferential quotas in excess of 10,000 tonnes. Italian producers of premium chocolate, panettone, torrone and pasticceria have a clear runway into a market that already shows strong appetite for European indulgence categories.",
        "A practical note: tariff staging is product-specific. Before committing to a Brazilian distribution strategy, classify your HS code against the iTA's Annex 2-A appendix to understand exactly when your product hits zero duty, not when \"wine\" or \"cheese\" does in aggregate.",
        "3. Protection against Italian Sounding: a turning point for 57 Italian GIs",
        "The agreement protects 344 European Geographical Indications in Mercosur countries, including 57 Italian indications — the largest number ever secured in an EU trade agreement. The Italian list reads like a national heritage inventory: Parmigiano Reggiano, Grana Padano, Gorgonzola, Mozzarella di Bufala Campana, Prosciutto di Parma, Prosciutto di San Daniele, Pomodoro San Marzano, Aceto Balsamico di Modena, Prosecco, Chianti, Chianti Classico, Barolo, Brunello di Montalcino, Franciacorta and dozens more.",
        "Brazil and the other Mercosur countries commit to prohibiting imitations and the use of misleading symbols, flags or evocative terms that exploit the reputation of Italian products. For an Italian producer who has watched \"Parmesão\", \"Presunto tipo Parma\" and \"Proseco\" colonise Brazilian shelves for decades — often produced by European multinationals operating locally — this is not a cosmetic shift. It is the construction of legal terrain on which Consorzi can finally act.",
        "That said, the agreement is realistic about pre-existing local production. Coexistence transition periods have been negotiated: Parmigiano Reggiano: 7-year coexistence with the local term \"Parmesão\", after which exclusive use applies. Prosecco: 10-year coexistence with the term \"Proseco\". Prosciutto di Parma: 7 years to phase out \"Presunto tipo Parma\".",
        "These transitions are not weaknesses — they are realistic guardrails that made the deal possible. The strategic implication for Italian producers is clear: the next 7 to 10 years are the window to build brand authority and consumer education in Brazil, so that when exclusivity arrives, \"Parmigiano Reggiano\" is recognised as the original and not the upstart competitor of the locally-established \"Parmesão\".",
        "4. Customs and bureaucratic simplifications",
        "Two operational changes deserve attention because they shorten time-to-market and reduce documentary friction.",
        "REX (Registered Exporter system). Italian exporters registered in REX can self-certify the origin of their products directly on the commercial invoice. The traditional EUR.1 movement certificate is no longer required. For SMEs that previously had to manage origin documentation through chambers of commerce on every shipment, this is a meaningful reduction in administrative overhead and timing risk. Registration is straightforward and should be completed before the first shipment, not after the order is on the table.",
        "\"Pre-listing\" mechanism for establishments. Brazilian authorities can authorise Italian production facilities to export based on inspections conducted by Italian sanitary authorities (the ASL system). In practical terms, this reduces the previously interminable timelines for stabilimento approval, particularly for products of animal origin. For dairy, cured meat and processed protein producers, pre-listing is the difference between a market-entry timeline measured in years and one measured in months.",
        "5. What you still need to do to export \"now\"",
        "Tariff cuts do not, by themselves, put your product on a Brazilian supermarket shelf. The iTA opens the door; Brazilian regulatory architecture still controls who walks through it. Three requirements remain non-negotiable.",
        "RADAR authorisation for your importer. The Brazilian importer must hold a valid RADAR authorisation issued by the Receita Federal — in one of three categories (Expressa, Limitada or Ilimitada) depending on transaction volume. Without it, no customs clearance occurs. If your Brazilian counterpart is a new entity or has been operating below the threshold, verify RADAR status before signing the contract, not after the container has shipped.",
        "MAPA / ANVISA registration. Products of animal origin and beverages require registration with the Ministry of Agriculture (MAPA); food, dietary and health products require registration with the National Health Surveillance Agency (ANVISA). Registration must be completed before shipment, and timelines vary substantially by product category. This is the single most underestimated bottleneck for Italian exporters. Build it into the project plan from day one.",
        "Brazilian Portuguese labelling. Labelling must be in Brazilian Portuguese (not European Portuguese), must carry the importer's identifying data, and must include nutritional information in the format prescribed by Brazilian regulation (which differs in important details from the EU Regulation 1169/2011 schema). A label valid for the EU market is not valid for the Brazilian market. Plan for a dedicated Brazilian labelling SKU.",
        "A closing note on strategy",
        "The iTA is structurally favourable to Italian agri-food, but it is favourable to all European agri-food. The competitive dynamic will not be Italy versus Brazil; it will be Italy versus France, Spain and Germany for Brazilian shelf space and Brazilian consumer mind-share. The German automotive sector and the Spanish food sector have been preparing for this moment for two years. Italian SMEs that move in 2026 will define the next decade of Italy's presence in South America.",
        "The 57 protected GIs are an extraordinary legal asset. They become a commercial asset only when paired with distribution, marketing investment and consumer education on the ground. The legal framework is now in place. The execution is up to us.",
      ],
    },
  };
  const euMercosurPlaybookContent = euMercosurPlaybookTranslations[language];
  const euMercosurPlaybookArticle = euMercosurPlaybookContent ? {
    ...euMercosurPlaybookContent,
    hashtags: ["#EUMercosur", "#ItalyBrazil", "#AgriFood", "#MadeInItaly", "#GeographicalIndications", "#TradePolicy", "#Export", "#FoodAndWine", "#BusinessMatching", "#ConsulBrasil"],
    image: euMercosurPlaybookImage,
    category: "Trade Policy",
  } : null;

  const perfumeryIPTranslations: Record<string, { title: string; description: string; fullText: string[] } | null> = {
    it: {
      title: "L'arte senza protezione: perché la profumeria sfugge alla proprietà intellettuale e cosa possono ancora fare gli autori?",
      description: "Poche discipline creative occupano una posizione più strana nel diritto della proprietà intellettuale rispetto alla profumeria. Una fragranza può richiedere anni per essere composta, può portare la firma inconfondibile del suo autore e può influenzare i mercati in modo decisivo quanto una canzone di successo, eppure, quando un concorrente decide di clonarla, l'autore originale spesso scopre che quasi ogni strumento legale che associamo alla protezione creativa si arena da qualche parte tra il banco degli imputati e l'aula di tribunale. L'industria delle imitazioni esiste non perché la legge non l'abbia notata, ma perché, così come è attualmente strutturata, fatica a trovare in un profumo qualcosa che possa essere protetto.",
      fullText: [
        "Questo articolo analizza le ragioni di ciò, le contromisure sviluppate dal settore e il perimetro realistico di protezione per un autore che voglia difendere un'opera olfattiva seria.",
        "1. La linea di frattura concettuale: arte contro savoir-faire",
        "Il primo problema è più antico della profumeria stessa. I moderni sistemi di proprietà intellettuale mantengono una distinzione fondamentale tra l'espressione tutelabile e l'abilità, il metodo o il know-how non tutelabili. Il primo è l'oggetto naturale del diritto d'autore, dei diritti di design e dei marchi, mentre il secondo è lasciato di proposito nel pubblico dominio. Se i metodi per fare le cose potessero essere monopolizzati in virtù del fatto di essere eseguiti in modo eccellente, nessuno potrebbe cucinare un piatto regionale, rifinire un mobile o riparare un orologio senza chiedere il permesso a chi lo ha fatto per primo. Il sistema ha scelto l'apertura sul come e riserva l'esclusività al cosa, ovvero all'oggetto espressivo specifico.",
        "Il profumo si colloca in modo un po' scomodo su questa linea di demarcazione. Una composizione di fragranze comporta vere e proprie scelte autoriali — proporzione, contrasto, arco narrativo, tensione sensoriale — che ricordano molto le scelte di un compositore o di un pittore. Tuttavia, è anche il risultato di un processo tecnico: chimica, dosaggio, macerazione e test di stabilità. I legislatori e i tribunali hanno esaminato ripetutamente il profumo e hanno concluso che ciò che vedono principalmente è la seconda categoria. La conseguenza è che, per impostazione predefinita, la legge tratta il profumiere come un artigiano altamente qualificato piuttosto che come un autore. Di conseguenza, la protezione che ne deriva è modellata di conseguenza.",
        "2. Perché nessun singolo diritto di proprietà intellettuale si adatta perfettamente",
        "Il diritto d'autore è la sede naturale di una forma d'arte ed è il diritto che è stato più attivamente oggetto di contenzioso in relazione alle fragranze, principalmente in Francia, che è stata il campo di battaglia europeo per questa questione.",
        "I tribunali francesi di primo grado e diverse corti d'appello, in momenti diversi, hanno riconosciuto che una fragranza originale può costituire un'opera dell'ingegno. Tuttavia, la Corte Suprema francese (Cour de cassation) ha costantemente respinto tale posizione. La sentenza di riferimento è Bsiri-Barbir contro Haarmann & Reimer (Cass. 1re civ., 13 giugno 2006), in cui la Corte ha stabilito che una fragranza è il risultato della semplice applicazione del know-how e, pertanto, non costituisce, di per sé, una forma di espressione tutelabile. La Corte ha ribadito questo approccio nella sentenza Lancôme del 10 dicembre 2013, inquadrando la questione in termini di requisito di precisione: un diritto d'autore deve essere attribuito a una creazione identificabile con sufficiente precisione da poter essere comunicata e, secondo la Corte, un odore, soggettivo, che evolve sulla pelle e dipende da chi lo percepisce, non soddisfa tale requisito.",
        "Quella che un tempo era una posizione nazionale francese si è da allora consolidata in qualcosa di più vicino alla dottrina europea. Nella causa Levola Hengelo (C-310/17 del 13 novembre 2018), la Corte di Giustizia dell'Unione Europea, pronunciandosi sulla possibilità che il gusto di un prodotto alimentare potesse essere protetto dal diritto d'autore ai sensi della Direttiva InfoSoc, ha stabilito che l'oggetto del diritto d'autore deve essere identificabile con sufficiente precisione e obiettività, anche se non in modo permanente. I sapori, e per analogia gli odori, non superano questo test perché la loro identificazione dipende da impressioni sensoriali soggettive che variano a seconda del consumatore e delle condizioni di percezione. La sentenza Levola non ha deciso un caso relativo a un profumo, ma il principio enunciato è lo stesso su cui si era già basata la Cour de cassation e che ora è stato elevato a norma UE armonizzata vincolante per i tribunali nazionali.",
        "Il controesempio più citato si trova appena oltre il confine. Nel caso Lancôme Parfums et Beauté contro Kecofa (Hoge Raad, 16 giugno 2006), la Corte Suprema olandese ha stabilito che il profumo Trésor era suscettibile di protezione del diritto d'autore, in quanto percepibile, sufficientemente concreto e originale. Decisa dieci giorni dopo Bsiri-Barbir e dodici anni prima di Levola, la sentenza Kecofa si trova ora in una posizione dottrinale scomoda. Non è mai stata seguita in Francia e ha avuto un'influenza limitata altrove, inoltre sarebbe difficile da conciliare con il ragionamento odierno della Corte di Giustizia dell'Unione Europea. È meglio interpretarla non come una norma europea stabile, ma come la prova che, per un momento, era immaginabile un altro percorso dottrinale.",
        "Il disaccordo dottrinale non riguarda in realtà l'odore, ma piuttosto la possibilità di estendere la legge sulla forma a qualcosa che non ha una concretizzazione visiva o testuale stabile. Finché un tribunale non sarà convinto che una fragranza abbia una forma sufficientemente precisa e oggettiva da poter essere definita indipendentemente da qualsiasi percettore, il diritto d'autore rimarrà una via controversa e fragile.",
        "Brevetto",
        "In linea di principio, un brevetto garantirebbe vent'anni di esclusività, anche contro la ricreazione indipendente. Il compromesso è la pubblicazione. La richiesta di brevetto richiede la divulgazione dell'invenzione in modo sufficientemente dettagliato da consentirne la riproduzione da parte di un esperto del settore; una volta scaduto il termine, tale divulgazione diventa la base su cui ogni concorrente può legalmente copiare l'opera. Per una fragranza di lusso, la cui vita commerciale si misura spesso in decenni e la cui identità dipende dalla percezione di inimitabilità, si tratta di un affare poco allettante. In questo settore, i brevetti sono utilizzati principalmente per le singole molecole, le cosiddette \"captive\", di cui si parlerà più avanti, piuttosto che per le composizioni finali.",
        "Marchio",
        "In teoria, un profumo può essere registrato come marchio. In passato, l'ostacolo era rappresentato dalla difficoltà di rappresentazione grafica: un segno doveva essere rappresentabile graficamente e un odore, descritto a parole, raffigurato come cromatogramma o specificato da una formula chimica, è stato ripetutamente ritenuto non conforme a tale requisito. La riforma dei marchi dell'UE (Regolamento 2017/1001 e Direttiva 2015/2436, in vigore dal mese di ottobre 2017) ha formalmente eliminato il requisito della rappresentazione grafica. L'ostacolo più profondo, tuttavia, rimane: il segno deve comunque essere rappresentato in modo chiaro, preciso, autonomo, facilmente accessibile, intelligibile, duraturo e oggettivo, secondo i criteri Sieckmann, ora slegati dalla parola \"grafico\". Le attuali linee guida dell'EUIPO trattano i marchi olfattivi come effettivamente non registrabili, in quanto nessuna tecnologia di rappresentazione oggi disponibile in commercio soddisfa tali standard per gli odori. La riforma ha quindi modificato il vocabolario giuridico senza cambiare il risultato pratico.",
        "Segreto commerciale",
        "È qui che risiede effettivamente la maggior parte della protezione per quanto riguarda la composizione delle fragranze. Ai sensi della Direttiva UE sui segreti commerciali (2016/943), attuata in tutti gli Stati membri (in Italia tramite gli articoli 98-99 del Codice della proprietà industriale e in Francia tramite gli articoli L. 151-1 e seguenti del Codice di commercio), un know-how può essere tutelato come segreto commerciale se è segreto, nel senso che non è generalmente noto o facilmente accessibile agli addetti ai lavori, ha un valore commerciale in quanto segreto e se sono state adottate misure ragionevoli per mantenerne la segretezza. Il vantaggio del segreto commerciale è che non richiede né la registrazione né la divulgazione. Lo svantaggio è decisivo: la direttiva esclude espressamente dal suo ambito di applicazione le informazioni ottenute tramite scoperta indipendente, osservazione, studio, smontaggio o test di un prodotto acquisito legalmente, in altre parole, il reverse engineering legale. Se un concorrente acquista il prodotto sul mercato libero e ne comprende il funzionamento, la protezione legale decade, a meno che l'analisi non sia contrattualmente vietata o, di fatto, le informazioni non siano affatto \"facilmente accessibili\" agli addetti ai lavori.",
        "3. Il problema del reverse engineering: GC-MS e il crollo della segretezza",
        "Il motivo per cui il segreto commerciale è così fragile in questo settore è che la tecnica analitica dominante, la gascromatografia accoppiata alla spettrometria di massa (GC-MS), spesso perfezionata in GC×GC-MS o accoppiata all'olfattometria, produce, in un laboratorio competente e nel giro di poche ore, un inventario utilizzabile dei composti volatili presenti in una fragranza e delle loro proporzioni approssimative. La giurisprudenza italiana e francese, in merito al criterio della \"facile accessibilità\", ha costantemente sostenuto che un'informazione perde la sua qualità di segreto quando diventa abitualmente ottenibile dagli addetti ai lavori. Se il reverse engineering è facile per una persona di normale competenza, il segreto cessa di essere tale dal punto di vista giuridico.",
        "Ecco perché le imitazioni sono un settore legale e non clandestino. Un rivenditore che analizza una fragranza disponibile sul mercato e offre una composizione simile, con un nome diverso, in una confezione diversa e senza richiamare il marchio dell'originale, nella maggior parte delle giurisdizioni non commette alcun reato perseguibile. I limiti che vengono applicati sono quelli relativi al marchio e alla concorrenza sleale (il dupe non deve spacciarsi per l'originale, non deve sfruttare il suo nome e non deve copiare la sua veste grafica), non quelli relativi alla fragranza stessa.",
        "La questione legale più complessa, e che merita maggiore attenzione strategica, è la seguente: a che punto il reverse engineering smette di essere facile? La giurisprudenza italiana e francese ha lasciato un certo margine di manovra in questo ambito. Quando la decodifica di una composizione richiede un investimento sproporzionato, come strumentazione rara, tempi lunghi e l'interpretazione da parte di esperti che va oltre l'analisi di un campione in una libreria standard, le informazioni risultanti possono rimanere un segreto commerciale protetto e chi se ne appropria potrebbe essere ritenuto responsabile di appropriazione indebita o concorrenza sleale. Questo è il cardine dottrinale su cui ruota l'intera strategia difensiva del settore.",
        "4. Rendere difficile l'analisi: la chimica dell'autodifesa",
        "Sapendo che la facilità di analisi è ciò che indebolisce la loro posizione giuridica, le case di profumeria, in particolare le grandi maison e i principali fornitori di fragranze, hanno messo in atto una serie di contromisure stratificate progettate per spingere l'analisi GC-MS dal lato \"facile\" della linea a quello \"difficile\".",
        "Molecole captive. Una molecola captive è un nuovo odore sintetizzato internamente e protetto da brevetto, che non viene venduto sul mercato libero. Finché il brevetto è in vigore, solo i profumieri del titolare possono utilizzarla. Poiché si tratta di una molecola nuova, non è ancora presente in nessuna libreria spettrometrica commerciale; un analista che rileva un picco non identificato potrebbe erroneamente identificarlo e, anche se alla fine ne deduce la struttura, non può legalmente produrla o acquistarla. Hedione (Firmenich, 1962, utilizzato per la prima volta su larga scala in Eau Sauvage di Dior nel 1966), Calone (1966), Iso E Super (IFF, anni '70) e Ambroxan illustrano questa logica, anche se non tutti sono rimasti \"captive\" nel senso stretto del termine una volta scaduti i brevetti e proliferati gli equivalenti commerciali. La loro ubiquità post-brevetto è di per sé una lezione: una volta che un ingrediente protetto entra nel dominio pubblico, migra in quasi tutte le composizioni moderne, esattamente ciò che vent'anni di esclusività sono progettati per sovvenzionare.",
        "Ingredienti naturali complessi. Un olio essenziale di alta qualità non è una vetta, ma una foresta di vette: spesso si tratta di diverse centinaia di composti in proporzioni variabili, che cambiano a seconda della cultivar, dell'anno di raccolta e della tecnica di estrazione. Se utilizzati in grandi quantità, i naturali complessi agiscono come rumore analitico, rendendo difficile per un analista distinguere un singolo ingrediente complesso da una miscela deliberata di ingredienti più semplici aggiunti per imitarne il profilo.",
        "Chiralità. Molte molecole odorose esistono sotto forma di enantiomeri, ovvero forme speculari con la stessa massa ma odori radicalmente diversi. Uno spettrometro di massa standard non è in grado di distinguerli. Un profumiere che specifica un particolare rapporto enantiomerico fornisce al copista un risultato chimicamente corretto, ma olfattivamente errato, a meno che il copista non investa in uno spettrometro di massa chirale, che è più raro e costoso.",
        "Tra le pratiche difensive documentate, vi sono anche i marcatori in tracce e le esche: sostanze aggiunte al di sotto della soglia olfattiva, ma visibili allo strumento. Questi marcatori hanno una funzione probatoria: se compaiono nel prodotto di un concorrente, costituiscono una forte prova forense di copia piuttosto che di creazione indipendente. Come esche, invece, possono indurre il copista a includere ingredienti che non contribuiscono in alcun modo all'odore, ma che consumano il budget della formulazione. Quanto sistematicamente queste pratiche siano impiegate nel settore è, per loro natura, non del tutto visibile dall'esterno.",
        "Basi precomposte. Una \"base\" è una premiscela interna, a volte essa stessa una piccola composizione di dozzine di materiali, utilizzata come singolo ingrediente nella formula finale. Il GC-MS legge il prodotto finito come un elenco piatto di composti; l'architettura di ciascun composto e da quale base provenga, nonché il modo in cui le basi sono state invecchiate prima dell'integrazione, sono invisibili allo strumento e rimangono un sapere tecnico.",
        "L'effetto cumulativo è quello di spostare il costo della copia da un esercizio analitico di routine a un progetto di ricerca e, cosa altrettanto importante, di spostare la caratterizzazione giuridica di qualsiasi copia riuscita da \"reverse engineering lecito\" a qualcosa che potrebbe iniziare ad assomigliare a un'appropriazione indebita.",
        "5. Le difese che non hanno nulla a che vedere con la chimica",
        "Le forme di protezione più durature in questo settore non sono affatto legali, in primo luogo. Sono strutturali.",
        "Controllo delle materie prime. Diverse grandi case profumiere stipulano contratti per raccolti esclusivi: particolari campi di gelsomino di Grasse, specifici appezzamenti di rosa bulgara e iris monorigine da produttori specifici. Uno spettrometro può identificare la specie, ma non può replicare la complessità molecolare di un particolare terroir. Una copia realizzata con equivalenti di livello commerciale è riconoscibile sulla pelle in pochi minuti.",
        "Maturazione e processo. Le composizioni che macerano per settimane prima della filtrazione si comportano in modo diverso sulla pelle rispetto a quelle assemblate il giorno prima dell'imbottigliamento. Questo è empiricamente osservabile e difficile da imitare ai livelli di prezzo ai quali le imitazioni sono commercialmente sostenibili.",
        "Trade dress e diritti di design. Il flacone, il meccanismo del tappo, la scatola, la tipografia e il sistema di chiusura possono essere tutti registrati come disegni o, laddove abbiano acquisito un carattere distintivo, come marchi tridimensionali. Anche quando il liquido non è tutelabile, l'oggetto che lo contiene di solito lo è e un prodotto contraffatto, costretto a presentarsi in un packaging generico, perde gran parte del suo appeal commerciale nei segmenti di mercato che contano per l'originale.",
        "Narrazione e paternità. Il modello dell'\"editore di profumi\", in cui il nome del profumiere compare sul flacone come il nome dell'autore su un libro, è in parte una scelta di branding commerciale e in parte una strategia di proprietà intellettuale: spinge il prodotto oltre la linea di demarcazione tra cosmetico e opera d'autore, il che è importante quando i tribunali dovranno successivamente decidere come caratterizzare la controversia.",
        "6. L'imitazione silenziosa: il parassitismo come strategia di ripiego",
        "Lo scenario più difficile, nonché il più comune, è l'imitazione silenziosa: un concorrente riproduce una fragranza in modo sufficientemente fedele da poter essere riconosciuta sulla pelle, la commercializza con un nome generico e in una confezione neutra, senza mai fare riferimento all'originale. I diritti di marchio e di design non hanno alcun effetto. Il diritto d'autore non è applicabile nella maggior parte delle giurisdizioni e, dopo la sentenza Levola, è sempre meno applicabile ai sensi del diritto dell'UE. Il segreto commerciale è stato confutato dall'analisi giuridica.",
        "L'unica teoria giuridica rimasta è quella della concorrenza sleale nella sua variante del parassitismo, dottrina ben sviluppata nella giurisprudenza francese e italiana che punisce l'appropriazione sistematica dell'investimento creativo ed economico altrui per risparmiarsi il costo di uno sviluppo indipendente. L'attore deve dimostrare che l'originale ha un'identità distinta, che il prodotto del convenuto vi corrisponde in modi commercialmente rilevanti e che il convenuto ha tratto profitto dall'investimento dell'attore invece di crearne uno proprio. Si tratta di un caso che richiede un'analisi approfondita dei fatti e il cui esito è incerto, ma è la teoria sulla base della quale viene attualmente discussa una parte significativa delle controversie in materia di proprietà intellettuale relative ai profumi, nonché la teoria più chiaramente disponibile per gli autori che non dispongono di alcun diritto registrato sulla composizione stessa.",
        "I casi di parassitismo sono anche quelli in cui il pacchetto di prove, ovvero ciò che l'autore può dimostrare riguardo all'esistenza precedente, all'originalità e alla paternità dell'opera, diventa determinante.",
        "7. Ancorare la fragranza a un testo",
        "Una linea di condotta emersa tra i profumieri d'autore, come gli scritti riflessivi di Jean-Claude Ellena sulla profumeria, la \"piramide poetica\" esplicita di Meo Fusciuni e l'apparato letterario che circonda le composizioni storiche di Chanel, tratta la fragranza e il testo che l'accompagna come un'unica opera d'autore indivisibile. Il testo è inequivocabilmente protetto dal diritto d'autore. La fragranza, di per sé, potrebbe non esserlo. Tuttavia, la relazione tra i due diventa la prova del processo creativo dell'autore: la scelta del contrasto tra un accordo e l'altro non è più una scelta tecnica che la legge ignora, ma una traduzione deliberata di una specifica decisione letteraria o concettuale.",
        "Un fascicolo depositato contenente il testo di partenza, il \"protocollo di traduzione\" dell'autore che spiega quali scelte olfattive corrispondono a quali elementi testuali e l'identità visiva dell'opera — flacone, confezione, nome — crea una cornice artistica attorno alla composizione. Tuttavia, la cornice da sola non conferisce all'autore il diritto d'autore sull'odore. In sede di contenzioso, svolge tre funzioni utili: documenta la paternità e la priorità, caratterizza l'autore come tale (il che influenza il modo in cui un tribunale inquadra la controversia) e aumenta l'apparente gravità della presunta violazione, passando da \"qualcuno ha copiato un odore\" a \"qualcuno si è appropriato di un'opera integrata\".",
        "Tuttavia, questa non è una risposta completa al problema del \"silent-dupe\". Un convenuto che copia solo la composizione chimica, senza alcun riferimento al testo circostante, può comunque sostenere che ciò che ha copiato era lo strato non protetto. Tuttavia, l'involucro migliora significativamente la posizione dell'attore in una causa per parassitismo ed è la cosa più vicina che l'attuale sistema giuridico offre al diritto d'autore sull'opera nel suo complesso.",
        "8. La frontiera digitale: impronta olfattiva e priorità con data e ora",
        "Il filone più recente della pratica difensiva cerca di affrontare alla radice l'ansia di \"precisione\" della legge, producendo una rappresentazione oggettiva e riproducibile della fragranza che possa essere datata e registrata.",
        "Dal punto di vista analitico, gli strumenti e le piattaforme progettati per l'olfatto digitale, come gli array di sensori a risonanza plasmonica di superficie di Aryballe, che sono i più noti sul mercato, con iniziative parallele nelle principali case di profumi e nel campo della chemometria accademica, producono una firma digitale multidimensionale di una fragranza finita che è riproducibile, comparabile e molto più compatta di un set di dati completo GC×GC-MS. Questa firma non è la formula. È qualcosa di più simile a un'impronta olfattiva: una rappresentazione abbastanza precisa da verificare l'identità e abbastanza ambigua da non rivelare la composizione.",
        "Per quanto riguarda la registrazione, il regolamento eIDAS prevede già timestamp elettronici qualificati con efficacia giuridica transfrontaliera. La legislazione italiana ha ulteriormente aperto la strada al riconoscimento di determinati timestamp basati su DLT, ai sensi dell'articolo 8-ter del decreto-legge 135/2018 (convertito dalla legge 12/2019), a condizione che siano soddisfatti i requisiti tecnici pertinenti, inizialmente ancorati alle linee guida dell'AgID. Meccanismi simili stanno emergendo in tutta l'UE e l'EUIPO sta sviluppando un registro basato su blockchain e un'infrastruttura di portafoglio IP per i disegni e i marchi. I fornitori commerciali permettono a un autore di registrare l'hash crittografico di un file senza rivelarne il contenuto.",
        "La lezione pratica non è che \"la blockchain protegge il profumo\". La lezione è che un hash conforme, contrassegnato da data e ora, dell'impronta digitale, del testo di partenza, del protocollo di traduzione e di qualsiasi materiale visivo associato, può stabilire una priorità ineccepibile senza rivelare alcunché. Se in seguito compare un prodotto simile, la domanda passa da \"hai copiato?\" a \"dato che l'originale è stato registrato in questa data, come spieghi la somiglianza?\". Questo cambiamento è importante in un'azione per parassitismo, dove l'onere è in parte probatorio e in parte narrativo.",
        "9. Una sintesi realistica",
        "Attualmente, il perimetro onesto della protezione dei profumi si presenta all'incirca così.",
        "Ciò che non funziona, o funziona solo marginalmente, è il diritto d'autore sulla composizione (al di fuori dei Paesi Bassi del 2006 e ora in tensione con Levola), il marchio sull'odore, il brevetto sulla composizione finita e il segreto commerciale contro un'analisi commerciale competente.",
        "Ciò che funziona, a determinate condizioni: il segreto commerciale contro la violazione contrattuale (dipendenti, produttori a contratto, fornitori, a condizione che siano in atto e rigorosamente documentati, ai sensi della Direttiva 2016/943, gli accordi di non divulgazione e i controlli di processo); il brevetto sulle singole molecole innovative (il modello captive, disponibile solo per le entità che possiedono una solida competenza chimica); i diritti di design e i marchi sul packaging e sul nome; le rivendicazioni di concorrenza sleale e parassitismo contro le copie fedeli, in particolare quando l'autore può dimostrare un'identità consolidata e un investimento precedente documentato.",
        "Per rendere l'analisi realmente difficile, si può ricorrere a composti captivi, a sostanze naturali complesse, alla chiralità e ai marcatori, piuttosto che fare affidamento sulla loro illegalità. Inoltre, si può controllare la fornitura di materie prime inimitabili, in modo che la replica fisica rimanga imperfetta anche quando si ottiene la replica chimica. Un'altra strategia è quella di ancorare la fragranza a un testo d'autore e registrare l'opera integrata. Infine, si può produrre e registrare un'impronta digitale che stabilisca la priorità senza rivelare la composizione.",
        "Nessuna di queste misure, da sola, conferisce all'autore quel tipo di esclusività assoluta che un romanziere ha su un romanzo o un compositore su una partitura. Insieme, però, queste misure modificano la posizione processuale in un modo su cui, in pratica, fanno effettivamente affidamento i profumieri d'autore di successo. L'arte non è indifesa come categoria. L'autore non è indifeso in quanto parte in causa.",
        "Il punto fondamentale è che la profumeria è insolita non perché i suoi prodotti sono evanescenti, ma perché è una delle ultime discipline creative il cui risultato è identico alle sue note di lavoro: la formula e l'esperienza non sono separabili come lo sono un manoscritto e un libro stampato. Finché la legge non svilupperà un concetto più adeguato di cosa sia una \"forma\" quando la forma è un modello di molecole percepito nel tempo, la protezione delle opere olfattive continuerà a essere costruita in modo indiretto, attraverso contratti, catene di approvvigionamento, leggi sul packaging, la dottrina della concorrenza sleale e il lento accumulo di prove che l'opera è, di fatto, un'opera.",
        "Questo non è poco. È la vera legge del profumo.",
      ],
    },
    pt: {
      title: "A Arte Desprotegida: Porque é que a perfumaria resiste à propriedade intelectual e o que os criadores ainda podem fazer?",
      description: "Poucas disciplinas criativas ocupam uma posição mais estranha na lei da propriedade intelectual do que a perfumaria. Uma fragrância pode demorar anos a ser criada, pode ostentar a assinatura inconfundível do seu autor e pode influenciar os mercados tanto quanto uma música de sucesso. No entanto, quando um concorrente decide copiá-la, o autor original frequentemente descobre que quase todas as ferramentas jurídicas associadas à proteção da criação falham em algum ponto entre o laboratório e o tribunal. A indústria das imitações não existe porque a lei tenha deixado de a perceber, mas porque a lei, tal como está estruturada atualmente, tem dificuldade em identificar algo num perfume que saiba como proteger.",
      fullText: [
        "Este artigo investiga as razões para tal, as contramedidas desenvolvidas pela indústria e o perímetro realista de proteção para um autor que deseja defender uma obra olfativa séria.",
        "1. A falha conceitual: arte versus savoir-faire",
        "O primeiro problema é mais antigo do que a própria perfumaria. Os sistemas modernos de propriedade intelectual preservam uma distinção básica entre a expressão protegível e a habilidade, o método ou o know-how não protegidos. A primeira é o objeto natural dos direitos de autor, dos direitos de design e das marcas registadas; a segunda é propositadamente deixada no domínio público. Se os métodos de fazer as coisas pudessem ser monopolizados com base na excelência da sua execução, ninguém poderia cozinhar um prato regional, terminar um móvel ou consertar um relógio sem pedir autorização à pessoa que o fez primeiro. O sistema optou pela abertura do \"como\" e reserva a exclusividade ao \"o quê\" — o objeto expressivo específico.",
        "O perfume encaixa-se de forma um tanto estranha nesta divisão. A composição de uma fragrância envolve escolhas criativas reais — proporção, contraste, arco narrativo, tensão sensorial — semelhantes às de um compositor ou pintor. No entanto, é também, inegavelmente, o resultado de um processo técnico: química, dosagem, maceração e testes de estabilidade. Os legisladores e os tribunais têm analisado repetidamente o perfume e concluído que o que veem principalmente é a segunda categoria. A consequência é que a lei trata o perfumista, por norma, como um artesão altamente qualificado e não como um autor. A proteção que se segue é moldada de acordo com isso.",
        "2. Por que razão nenhum direito de propriedade intelectual se encaixa perfeitamente?",
        "Direito de autor",
        "O direito de autor é o lar natural de uma forma de arte e tem sido o direito mais ativamente litigado em relação às fragrâncias, principalmente na França, que tem sido o campo de batalha europeu para esta questão.",
        "Os tribunais franceses de primeira instância e vários tribunais de recurso aceitaram, em diferentes momentos, que uma fragrância original pode constituir uma obra da mente. No entanto, a Suprema Corte francesa (Cour de cassation) tem rejeitado consistentemente essa posição. A decisão mais relevante neste sentido é a de Bsiri-Barbir v. Haarmann & Reimer (Cass. 1re civ., 13 de junho de 2006), na qual o tribunal sustentou que uma fragrância é o produto da simples aplicação de um saber-fazer e, por conseguinte, não constitui, por si só, uma forma de expressão passível de proteção. O Tribunal reafirmou esta abordagem na decisão Lancôme, de 10 de dezembro de 2013, enquadrando a questão em termos de um requisito de precisão: os direitos de autor devem incidir sobre uma criação identificável com precisão suficiente para poder ser comunicada e um aroma, que é subjetivo, evolui na pele e depende de quem o percebe, não atinge, na opinião do Tribunal, esse limiar.",
        "O que antes era uma posição nacional francesa consolidou-se, desde então, em algo mais próximo da doutrina europeia. No caso Levola Hengelo (C-310/17, de 13 de novembro de 2018), o Tribunal de Justiça da União Europeia decidiu que o sabor de um produto alimentar não pode ser protegido por direitos de autor nos termos da Diretiva InfoSoc, uma vez que o objeto dos direitos de autor deve ser identificável com suficiente precisão e objetividade, mesmo que não de forma permanente. Os sabores — e, por clara analogia, os aromas — não passam neste teste, visto a sua identificação depender de impressões sensoriais subjetivas que variam de acordo com o consumidor e as condições de perceção. Embora o caso Levola não tenha versado sobre um perfume, o princípio que anunciou é exatamente o princípio no qual a Cour de cassation já se baseava, e que foi agora elevado a um padrão harmonizado da UE, vinculativo para os tribunais nacionais.",
        "O contra-exemplo mais citado está logo além da fronteira. No caso Lancôme Parfums et Beauté v. Kecofa (Hoge Raad, 16 de junho de 2006), o tribunal holandês de última instância decidiu que o perfume Trésor estava protegido por direitos de autor, por ser perceptível, suficientemente concreto e original. Decidido dez dias após Bsiri-Barbir — e doze anos antes de Levola —, o caso Kecofa encontra-se agora numa posição doutrinária delicada. Nunca foi seguido em França, teve repercussão limitada noutros locais e seria difícil de conciliar com o raciocínio atual do TJUE. É preferível interpretá-lo não como uma regra europeia estável, mas como prova de que, por um momento, outro caminho doutrinário era imaginável.",
        "A discordância doutrinária não se refere realmente ao cheiro, mas sim à questão de saber se a lei da forma pode ser alargada para abranger algo que não tem uma forma visual ou textual estável. Até que um tribunal se convença de que uma fragrância tem uma forma precisa e objetiva o suficiente para ser definida independentemente de qualquer observador, os direitos de autor continuarão a ser um caminho contestado e frágil.",
        "Patente",
        "Uma patente concederia, em princípio, vinte anos de exclusividade, inclusive contra recriações independentes. A contrapartida é a publicação. O registo de uma patente exige a divulgação da invenção com detalhes suficientes para que um especialista a possa reproduzir; uma vez expirado o prazo, essa divulgação torna-se a base sobre a qual todos os concorrentes podem copiar legalmente a obra. No caso de uma fragrância de luxo, cuja vida comercial é frequentemente medida em décadas e cuja identidade depende da perceção de inimitabilidade, esta é uma situação pouco atraente. As patentes são utilizadas neste setor sobretudo para moléculas individuais — as chamadas \"captives\", discutidas abaixo — e não para composições acabadas.",
        "Marca registada",
        "Um perfume pode, teoricamente, ser registado como marca registada. Historicamente, o obstáculo era enquadrado como um problema de representação gráfica: um sinal tinha de ser representável graficamente e um cheiro, descrito em palavras, representado por um cromatograma ou especificado por fórmula química, era repetidamente considerado como não satisfazendo esse requisito. A reforma das marcas registadas da UE (Regulamento 2017/1001 e Diretiva 2015/2436, em vigor desde outubro de 2017) removeu formalmente o requisito de representação gráfica. No entanto, o obstáculo mais profundo permaneceu: o sinal deve continuar a ser representado de forma clara, precisa, autónoma, facilmente acessível, inteligível, duradoura e objetiva, ou seja, de acordo com os critérios Sieckmann, agora desvinculados da palavra \"gráfico\". As orientações atuais do EUIPO consideram as marcas olfativas efetivamente não registáveis, com base no argumento de que atualmente não existe nenhuma tecnologia de representação que cumpra estes critérios para os odores. A reforma alterou, portanto, o vocabulário jurídico sem alterar o resultado prático.",
        "Segredo comercial",
        "A proteção real da composição de fragrâncias reside, na prática, no segredo comercial. De acordo com a Diretiva da UE sobre Segredos Comerciais (2016/943), implementada nos Estados-Membros — em Itália, através dos artigos 98–99 do Código da Propriedade Industrial e, em França, através dos artigos L. 151-1 e seguintes do Código Comercial —, um know-how qualifica-se como segredo comercial protegível se for: (i) secreto, ou seja, não ser de conhecimento geral nem facilmente acessível às pessoas do setor; (ii) ter valor comercial por ser secreto; e (iii) ser alvo de medidas razoáveis para o manter em segredo. A vantagem do segredo comercial é não requerer registo nem divulgação. A desvantagem é decisiva: a diretiva exclui expressamente do seu âmbito de aplicação as informações obtidas por meio de descoberta independente e observação, estudo, desmontagem ou teste de um produto adquirido legalmente — ou seja, engenharia reversa lícita. Se um concorrente adquirir o produto no mercado e descobrir como este é fabricado, a proteção legal entra em colapso, a menos que a análise tenha sido contratualmente proibida ou que, com base nos factos, a informação não fosse de forma alguma \"facilmente acessível\" ao setor.",
        "3. O problema da engenharia reversa: GC-MS e o colapso do sigilo",
        "A razão pela qual o segredo comercial é um escudo tão frágil neste setor é que a técnica analítica dominante — a cromatografia gasosa acoplada à espectrometria de massa (GC-MS), frequentemente refinada para GC×GC-MS ou acoplada à olfatometria — permite, num laboratório competente e em poucas horas, elaborar um inventário viável dos compostos voláteis presentes numa fragrância e das respetivas proporções aproximadas. A jurisprudência italiana e francesa sobre o critério de \"facilmente acessível\" tem consistentemente sustentado que a informação perde a qualidade de segredo assim que se torna rotineiramente obtida por especialistas na área. Quando a engenharia reversa é fácil para alguém com conhecimentos comuns, deixa de haver segredo no sentido jurídico.",
        "É por isso que as imitações constituem uma indústria legal e não clandestina. Um revendedor que analisa uma fragrância disponível no mercado e oferece uma composição semelhante, sob um nome e uma embalagem diferentes e sem invocar a marca do produto original, não está, na maioria das jurisdições, a cometer qualquer infração passível de ação judicial. Os limites aplicados são os limites das marcas registadas e da concorrência desleal (a imitação não deve passar-se pelo original, não deve aproveitar-se do nome deste, nem copiar a sua identidade visual), e não limites em torno da fragrância em si.",
        "A questão jurídica mais complexa e que mais merece atenção estratégica é a seguinte: em que ponto é que a engenharia reversa deixa de ser fácil? A jurisprudência italiana e francesa deixou alguma margem de manobra neste aspeto. Quando a decodificação de uma composição exige um investimento desproporcional — instrumentação rara, prazos longos, interpretação especializada que vai para além da simples comparação de uma amostra com uma biblioteca padrão —, as informações resultantes podem permanecer como segredo comercial protegido e a apropriação indevida das mesmas pode constituir um ato de concorrência desleal. Esta é a questão central em torno da qual gira toda a estratégia defensiva do setor.",
        "4. Dificultando a análise: a química da autodefesa",
        "Conscientes de que a facilidade de análise enfraquece a sua posição jurídica, as casas de perfumaria — particularmente as grandes marcas e os principais fornecedores de fragrâncias — desenvolveram um conjunto de contramedidas em camadas, concebidas para empurrar a análise por GC-MS do lado \"fácil\" da linha para o lado \"difícil\".",
        "Moléculas cativas. Uma molécula cativa é um odorizante inovador sintetizado internamente, protegido por patente e deliberadamente não comercializado no mercado aberto. Enquanto a patente estiver em vigor, apenas os perfumistas do proprietário poderão utilizá-la. Como a molécula é nova, não consta em nenhuma biblioteca comercial de espectrometria; um analista pode identificá-la erroneamente como um pico não identificado e, mesmo que a sua estrutura seja eventualmente deduzida, não pode legalmente produzi-la ou comprá-la. A hediona (Firmenich, 1962, utilizada pela primeira vez em larga escala no Eau Sauvage da Dior, em 1966), o calone (1966), o iso E super (IFF, década de 1970) e o ambroxan ilustram esta lógica, mesmo que nem todos tenham permanecido cativos no sentido estrito contemporâneo após o vencimento das respetivas patentes e a proliferação de equivalentes comerciais. A sua onipresença após o termo da patente é, por si só, a lição: uma vez que um ingrediente cativo entra no domínio público, este é utilizado em quase todas as composições modernas, o que é precisamente o que os vinte anos de exclusividade se destinam a subsidiar.",
        "Ingredientes naturais complexos. Um óleo essencial de elevada qualidade não é um pico, mas sim uma floresta de picos: frequentemente, são várias centenas de compostos em proporções variáveis, que mudam de acordo com a cultivar, o ano da colheita e a técnica de extração. Quando utilizados em grande quantidade, os ingredientes naturais complexos atuam como ruído analítico, dificultando a distinção entre um único ingrediente complexo e uma mistura deliberada de ingredientes mais simples adicionados para imitar o seu perfil.",
        "Quiralidade. Muitas moléculas odoríferas existem sob a forma de enantiómeros, ou seja, formas espelhadas com a mesma massa, mas com odores radicalmente diferentes. Um espectrómetro de massa padrão não consegue distingui-las. Um perfumista que especifique uma determinada proporção enantiomérica fornece ao copiador um resultado quimicamente correto, mas olfativamente incorreto, a menos que o copiador invista num GC quiral, que é mais raro e mais dispendioso.",
        "As práticas defensivas documentadas também incluem marcadores de rasto e iscas: substâncias adicionadas abaixo do limiar olfativo, mas visíveis pelo instrumento. Como marcadores, têm uma função probatória: se o marcador aparecer no produto de um concorrente, isso constitui uma forte prova forense de cópia em vez de criação independente. Como iscas, podem levar o copiador a incluir ingredientes que não contribuem para o aroma, mas que consomem o orçamento da formulação. A extensão a que estas práticas são sistematicamente aplicadas em toda a indústria não é totalmente visível de fora.",
        "Bases pré-compostas. Uma \"base\" é uma pré-mistura interna, por vezes ela própria uma pequena composição de dezenas de materiais, utilizada como um único ingrediente na fórmula final. O GC-MS analisa o produto acabado como uma lista simples de compostos; a origem de cada composto e a forma como as bases foram envelhecidas antes da integração são invisíveis para o instrumento e permanecem um saber-fazer no sentido estrito.",
        "O efeito cumulativo é transferir o custo da cópia de um exercício analítico de rotina para um projeto de investigação e, igualmente importante, alterar a caracterização jurídica de qualquer cópia bem-sucedida de \"engenharia reversa lícita\" para algo que pode começar a parecer apropriação indevida.",
        "5. As defesas que nada têm a ver com química",
        "As formas mais duradouras de proteção neste setor não são, em primeiro lugar, de natureza jurídica. São estruturais.",
        "Controlo de matérias-primas. Várias grandes empresas contratam colheitas exclusivas: campos específicos de jasmim de Grasse, parcelas específicas de rosa búlgara, íris de origem única de produtores nomeados. Um espectrómetro pode identificar as espécies, mas não consegue replicar a complexidade molecular de um terroir específico. Uma imitação construída com equivalentes de nível comercial pode ser identificada na pele em minutos.",
        "Maturação e processo. As composições que maceram por semanas antes da filtragem comportam-se de maneira diferente na pele do que as composições montadas no dia anterior ao engarrafamento. Esta diferença é empiricamente observável e difícil de imitar nas faixas de preço em que as imitações são comercialmente viáveis.",
        "Direitos de imagem comercial e de design. O frasco, o mecanismo da tampa, a caixa, a tipografia e o sistema de fecho podem ser registados como desenhos ou, quando adquirem caráter distintivo, como marcas tridimensionais. Mesmo quando o líquido não é protegível, o objeto que o contém geralmente é, e uma imitação forçada a apresentar-se numa embalagem genérica perde grande parte do seu apelo comercial nos segmentos que importam para o produto original.",
        "Narrativa e autoria. O modelo do \"editor de perfumes\" — em que o nome do perfumista aparece no frasco, tal como o nome do autor aparece num livro — é, em parte, uma escolha de marca comercial e, em parte, uma estratégia de Propriedade Intelectual (PI): leva o produto para além da linha divisória entre cosméticos e obra de autoria, o que é importante quando os tribunais precisam de decidir posteriormente como caracterizar a disputa.",
        "6. A imitação silenciosa: o parasitismo como teoria de recurso",
        "O cenário mais difícil, e o mais comum, é a imitação silenciosa: um concorrente reproduz uma fragrância de forma suficientemente fiel para ser reconhecível na pele, vende-a sob um nome genérico numa embalagem neutra e nunca faz referência ao original. Os direitos de marca e de desenho não surtem efeito. Os direitos de autor não estão disponíveis na maioria das jurisdições e, após o caso Levola, estão cada vez menos disponíveis no âmbito do direito da UE. O segredo comercial foi refutado pela análise jurídica.",
        "A teoria jurídica restante é a da concorrência desleal na sua variante de parasitismo — a doutrina, bem desenvolvida na jurisprudência francesa e italiana, que pune a apropriação sistemática do investimento criativo e económico de outrem para evitar o custo do desenvolvimento independente. O autor deve demonstrar que a obra original tem uma identidade distinta, que o produto do arguido lhe é semelhante de formas comercialmente relevantes e que o arguido se aproveitou do investimento do autor em vez de construir o seu próprio. Trata-se de um caso que exige a apresentação de muitos factos e cuja vitória é incerta, mas é a teoria sob a qual uma parte significativa dos litígios de propriedade intelectual relacionados com fragrâncias é atualmente julgada e a teoria mais claramente disponível para os autores que não possuem nenhum direito registado sobre a composição em si.",
        "Os casos de parasitismo são aqueles em que o conjunto de provas — o que o autor pode demonstrar sobre a existência prévia, a originalidade e a autoria da obra — se torna determinante.",
        "7. A associação da fragrância a um texto",
        "Entre os perfumistas de autor, surgiu a prática de associar a fragrância a um texto, como nos reflexivos textos de Jean-Claude Ellena sobre perfumaria, na \"pirâmide poética\" de Meo Fusciuni ou no aparato literário que envolve as composições tradicionais da Chanel. Nesta prática, a fragrância e o texto são vistos como uma única obra de autoria indivisível. O texto está inequivocamente protegido por direitos de autor. A fragrância, por si só, talvez não seja. No entanto, a relação entre ambos constitui prova do processo criativo do autor: a opção pelo contraste entre este acorde e aquele deixa de ser uma escolha técnica que a lei desconsidera para se tornar uma tradução deliberada de uma decisão literária ou conceitual específica.",
        "Um arquivo registado que contenha o texto-fonte, o \"protocolo de tradução\" do autor que explique quais as escolhas olfativas correspondentes a quais elementos textuais e a identidade visual da obra — frasco, embalagem, nome — cria uma envolvente artística em torno da composição. Por si só, este invólucro não confere ao autor direitos de autor sobre o cheiro. Num litígio, cumpre três funções úteis: documenta a autoria e a prioridade, caracteriza o autor como tal (o que influencia a forma como um tribunal enquadra a disputa) e eleva a gravidade aparente da suposta violação de \"alguém copiou um cheiro\" para \"alguém se apropriou de uma obra integrada\".",
        "Esta não é, porém, uma resposta completa para o problema da \"cópia silenciosa\". Um arguido que copie apenas a composição química, sem referência ao texto circundante, ainda pode argumentar que copiou a camada desprotegida. No entanto, o invólucro melhora significativamente a posição do autor numa ação por parasitismo e é o que mais se aproxima do que o sistema jurídico atual oferece em termos de direitos de autor sobre a obra no seu todo.",
        "8. A fronteira digital: impressão digital olfativa e prioridade com registo de data e hora",
        "A vertente mais recente da prática defensiva tenta abordar a ansiedade da lei em relação à \"precisão\" na sua raiz, produzindo uma representação objetiva e reproduzível da fragrância que possa ser registada com data e hora.",
        "Do ponto de vista analítico, os instrumentos e as plataformas concebidos para a olfação digital — os conjuntos de sensores de ressonância de plasmónio de superfície da Aryballe são o exemplo mais conhecido destinado ao consumidor, com esforços paralelos nas principais empresas de fragrâncias e na quimiometria académica — produzem uma assinatura digital multidimensional de uma fragrância finalizada que é reproduzível, comparável e muito mais compacta do que um conjunto de dados completo de GC×GC-MS. Esta assinatura não é a fórmula. É algo mais próximo de uma impressão digital olfativa: uma representação precisa o suficiente para verificar a identidade e ambígua o suficiente para não revelar a composição.",
        "No que diz respeito ao registo, o Regulamento eIDAS já prevê carimbos de data e hora eletrónicos qualificados com efeito jurídico transfronteiriço. A legislação italiana foi ainda mais longe ao reconhecer certos carimbos de data e hora baseados em DLT, nos termos do artigo 8.º-ter do decreto-lei n.º 135/2018 (convertido na lei n.º 12/2019), desde que sejam cumpridos os requisitos técnicos relevantes, inicialmente ancorados nas orientações da AgID. Mecanismos semelhantes estão a surgir por toda a UE e o EUIPO tem vindo a desenvolver uma infraestrutura de registo e carteira de PI baseada em blockchain para desenhos e marcas. Os fornecedores comerciais permitem que um autor registe o hash criptográfico de um ficheiro sem divulgar o seu conteúdo.",
        "A lição prática não é que \"a blockchain protege o perfume\". O que é importante é que um hash com carimbo de data/hora, que corresponde à impressão digital, ao texto original, ao protocolo de tradução e a qualquer material visual associado, pode estabelecer uma prioridade incontestável sem divulgar nada disso. Se um produto semelhante surgir posteriormente, a questão passa de \"copiou?\" para \"considerando que o original foi registado nesta data, como explica a semelhança?\" — e, num processo por parasitismo, em que o ónus é em parte probatório e em parte narrativo, esta mudança é importante.",
        "9. Uma síntese realista",
        "A proteção de fragrâncias, conforme a lei atualmente, tem um perímetro mais ou menos assim.",
        "O que não funciona, ou funciona apenas marginalmente: direitos de autor sobre a composição (fora da Holanda, em 2006, e agora em tensão com a Levola); marca registada sobre o aroma; patente sobre a composição final; segredo comercial contra análise comercial competente.",
        "O que funciona, embora condicionalmente: segredo comercial contra violação contratual (funcionários, fabricantes contratados e fornecedores, desde que os acordos de confidencialidade e os controlos de processo estejam em vigor e devidamente documentados nos termos da Diretiva 2016/943); patente sobre moléculas novas individuais (um modelo restrito, disponível apenas para entidades com capacidade química avançada); direitos de design e marcas registadas sobre a embalagem e o nome; alegações de concorrência desleal e parasitismo contra cópias próximas, particularmente quando o autor conseguir demonstrar uma identidade estabelecida e um investimento prévio devidamente documentado.",
        "O que altera a equação: tornar a análise verdadeiramente difícil (compostos cativos, naturais complexos, quiralidade, marcadores) em vez de confiar na ilegalidade; controlar o fornecimento de matérias-primas inimitáveis para que a replicação física permaneça imperfeita mesmo quando a replicação química é alcançada; associar a fragrância a um texto de autoria e registar a obra integrada; produzir e registar uma impressão digital que estabeleça a prioridade sem divulgar a composição.",
        "Nenhuma destas etapas, isoladamente, confere ao autor o tipo de exclusividade absoluta que um romancista tem sobre um romance ou um compositor sobre uma partitura. Juntas, alteram a postura no litígio de uma forma que, na prática, é aquilo em que os perfumistas de autor bem-sucedidos se baseiam. A arte não está desprotegida enquanto categoria. O autor não está indefeso como litigante.",
        "O aspeto mais relevante é que a perfumaria é incomum não porque os seus produtos sejam efémeros, mas porque é uma das últimas disciplinas criativas cuja produção é idêntica às suas notas de trabalho — a fórmula e a experiência não podem ser separadas da mesma forma que um manuscrito e um livro impresso. Até que a lei desenvolva um conceito mais adequado do que é uma \"forma\" quando esta é um padrão de moléculas percebido ao longo do tempo, a proteção das obras olfativas continuará a ser construída de forma indireta, a partir de contratos, cadeias de abastecimento, legislação sobre embalagens, doutrina da concorrência desleal e do lento acúmulo de evidências de que a obra é, de facto, uma obra.",
        "Isso não é pouca coisa. É, cada vez mais, a verdadeira lei do perfume.",
      ],
    },
    en: {
      title: "The Unprotected Art: Why Perfumery Resists Intellectual Property, and What Authors Can Still Do (v2)",
      description: "Few creative disciplines occupy a stranger position in intellectual property law than perfumery. A fragrance can take years to compose, can carry the unmistakable signature of its author, and can move markets as decisively as a hit song — and yet, when a competitor decides to clone it, the original author often discovers that almost every legal tool we associate with creative protection breaks down somewhere between the bench and the courtroom. The dupe industry exists not because the law has failed to notice it, but because the law, as currently constructed, struggles to find anything in a perfume that it knows how to own.",
      fullText: [
        "This article traces why that is, what counter-measures the industry has developed, and where the realistic perimeter of protection now sits for an author who wants to defend a serious olfactory work.",
        "1. The conceptual fault line: art versus savoir-faire",
        "The first problem is older than perfumery itself. Modern intellectual property systems preserve a basic distinction between protectable expression and unprotected skill, method or know-how. The first is the natural object of copyright, design rights and trademarks; the second is left in the public domain on purpose. If methods of doing things could be monopolised on the strength of being done excellently, no one could cook a regional dish, finish a piece of furniture, or repair a watch without seeking permission from whoever did it first. The system has chosen openness on the how, and reserves exclusivity for the what — the specific expressive object.",
        "Perfume falls awkwardly across this divide. A fragrance composition involves real authorial choices — proportion, contrast, narrative arc, sensory tension — that look very much like the choices of a composer or a painter. But it is also, undeniably, the output of a technical process: chemistry, dosage, maceration, stability testing. Lawmakers and courts have repeatedly looked at perfume and concluded that what they are mostly seeing is the second category. The consequence is that the law treats the perfumer, by default, as a highly skilled artisan rather than as an author. The protection that follows is shaped accordingly.",
        "2. Why no single IP right fits cleanly",
        "Copyright",
        "Copyright is the natural home for an art form, and it is the right that has been most actively litigated in connection with fragrance — primarily in France, which has been the European battleground for the question.",
        "French courts of first instance and several courts of appeal have, at different moments, accepted that an original fragrance can constitute a work of the mind. The French Supreme Court (Cour de cassation) has consistently rejected that position. The leading decision is Bsiri-Barbir v. Haarmann & Reimer (Cass. 1re civ., 13 June 2006), in which the Court held that a fragrance is the product of the simple implementation of savoir-faire and therefore not, in itself, a protectable form of expression. The Court reaffirmed this approach in the Lancôme decision of 10 December 2013, framing the issue in terms of a precision requirement: a copyright must attach to a creation identifiable with sufficient precision to be communicated, and a smell — subjective, evolving on the skin, dependent on the perceiver — does not, in the Court's view, meet that threshold.",
        "What was once a national French position has since hardened into something closer to European doctrine. In Levola Hengelo (C-310/17, 13 November 2018), the Court of Justice of the European Union, ruling on whether the taste of a food product could be protected by copyright under the InfoSoc Directive, held that the subject matter of copyright must be identifiable with sufficient precision and objectivity, even if not permanently. Tastes — and, by clear analogy, smells — fail this test because their identification depends on subjective sensory impressions that vary with the consumer and the conditions of perception. Levola did not decide a perfume case, but the principle it announced is exactly the principle on which the Cour de cassation had already rested, now elevated to a harmonised EU standard binding on national courts.",
        "The most cited counter-example sits just over the border. In Lancôme Parfums et Beauté v. Kecofa (Hoge Raad, 16 June 2006), the Dutch Supreme Court held that the scent of Trésor was capable of copyright protection because it was perceptible, sufficiently concrete, and original. Decided ten days after Bsiri-Barbir — and twelve years before Levola — Kecofa now sits in an awkward doctrinal corner. It has never been followed in France, has had limited traction elsewhere, and would be difficult to reconcile with the CJEU's reasoning today. It is best read not as a stable European rule but as proof that, for a moment, another doctrinal path was imaginable.",
        "The doctrinal disagreement is not really about smell; it is about whether the law of form can be stretched to cover something that has no stable visual or textual instantiation. Until a court is convinced that a fragrance has a form precise and objective enough to be defined independently of any one perceiver, copyright will remain a contested and fragile route.",
        "Patent",
        "A patent would, in principle, give twenty years of exclusivity, including against independent re-creation. The trade-off is publication. Filing a patent requires disclosing the invention in enough detail for a skilled person to reproduce it; once the term expires, that disclosure becomes the basis on which every competitor can legally copy the work. For a luxury fragrance, whose commercial life is often measured in decades and whose identity depends on the perception of inimitability, this is an unattractive bargain. Patents are used in this industry overwhelmingly for individual molecules — captives, discussed below — rather than for finished compositions.",
        "Trademark",
        "A scent can, theoretically, be registered as a trademark. Historically, the obstacle was framed as a problem of graphic representation: a sign had to be representable graphically, and a smell — described in words, depicted as a chromatogram, or specified by chemical formula — was repeatedly found not to satisfy that requirement. The EU trademark reform (Regulation 2017/1001 and Directive 2015/2436, in force from October 2017) formally removed the graphic-representation requirement. The deeper obstacle, however, remained: the sign must still be represented in a manner that is clear, precise, self-contained, easily accessible, intelligible, durable and objective — the substance of the Sieckmann criteria, now untethered from the word \"graphic.\" The EUIPO's current guidance treats olfactory marks as effectively unregistrable, on the ground that no representation technology generally available today meets that standard for smells. The reform has therefore changed the legal vocabulary without changing the practical outcome.",
        "Trade secret",
        "This is where most of the real-world protection of fragrance composition actually lives. Under the EU Trade Secrets Directive (2016/943), implemented across member states — in Italy via Articles 98–99 of the Industrial Property Code, in France via Articles L. 151-1 ff. of the Commercial Code — a piece of know-how qualifies as a protectable trade secret if it is (i) secret in the sense of not being generally known or readily accessible to persons in the field, (ii) of commercial value because it is secret, and (iii) the subject of reasonable steps to keep it secret. The advantage of trade secret is that it requires no registration and no disclosure. The disadvantage is decisive: the Directive expressly excludes from its scope information obtained through independent discovery and observation, study, disassembly or testing of a lawfully acquired product — in other words, lawful reverse engineering. If a competitor buys the product on the open market and figures out how it is made, the legal protection collapses, unless either the analysis was contractually prohibited or, on the facts, the information was not \"readily accessible\" to the field at all.",
        "3. The reverse-engineering problem: GC-MS and the collapse of secrecy",
        "The reason trade secret is such a fragile shield in this industry is that the dominant analytical technique — gas chromatography coupled with mass spectrometry (GC-MS), often refined to GC×GC-MS or coupled with olfactometry — produces, in a competent laboratory and within hours, a workable inventory of the volatile compounds in a fragrance and their approximate proportions. Italian and French case law on the \"readily accessible\" criterion has consistently held that information loses the quality of secret once it becomes routinely obtainable by specialists in the field. Where reverse engineering is easy for someone of ordinary skill, the secret ceases to be a secret in the legal sense.",
        "This is why dupes are a legal industry, not a clandestine one. A reseller who analyses a market-available fragrance and offers a similar composition — under a different name, in different packaging, without invoking the original's brand — is, in most jurisdictions, doing nothing actionable. The boundaries that are enforced are trademark and unfair-competition boundaries (the dupe must not pass itself off as the original, must not freeride on its name, must not lift its trade dress), not boundaries around the fragrance itself.",
        "The harder legal question, and the one most worth strategic attention, is this: at what point does reverse engineering stop being easy? Italian and French jurisprudence have left some room here. Where decoding a composition requires disproportionate investment — rare instrumentation, long timelines, expert interpretation that goes beyond running a sample through a standard library — the resulting information may remain a protected trade secret, and someone who appropriates it may face liability for misappropriation or for unfair competition. This is the doctrinal hinge on which the whole defensive strategy of the industry turns.",
        "4. Making the analysis difficult: the chemistry of self-defence",
        "Knowing that ease of analysis is what dissolves their legal position, perfumery houses — particularly the large maisons and the major fragrance suppliers — have built a layered set of counter-measures designed to push GC-MS analysis from the \"easy\" side of the line to the \"hard\" side.",
        "Captive molecules. A captive is a novel odorant synthesised in-house, protected by patent, and deliberately not sold on the open market. While the patent runs, only the proprietor's perfumers can use it. Because the molecule is new, it is not yet in any commercial spectrometry library; an analyst sees an unidentified peak, may misidentify it, and even if its structure is eventually deduced, cannot legally produce or buy it. Hedione (Firmenich, 1962, first used at scale in Dior's Eau Sauvage, 1966), Calone (1966), Iso E Super (IFF, 1970s) and Ambroxan illustrate the logic, even if not all of them remained captives in the strict contemporary sense once their patents lapsed and commercial equivalents proliferated. Their post-patent ubiquity is itself the lesson: once a captive enters the public domain, it migrates into nearly every modern composition, which is precisely what twenty years of exclusivity is designed to subsidise.",
        "Complex naturals. A high-grade essential oil is not a peak; it is a forest of peaks — often several hundred compounds in varying proportions that shift with cultivar, harvest year, and extraction technique. Used generously, complex naturals act as analytical noise, making it difficult for an analyst to distinguish between a single complex ingredient and a deliberate mixture of simpler ones added to mimic its profile.",
        "Chirality. Many odorant molecules exist as enantiomers — mirror-image forms with the same mass but radically different smells. A standard mass spectrometer does not distinguish them. A perfumer who specifies a particular enantiomeric ratio gives the copyist a chemically correct but olfactively wrong result, unless the copyist invests in chiral GC, which is rarer and more expensive.",
        "Documented defensive practices also include trace markers and decoys: substances added below the olfactory threshold but visible to the instrument. As markers, they have an evidentiary function — if the marker shows up in a competitor's product, that is strong forensic evidence of copying rather than independent creation. As decoys, they can lead the copyist to include ingredients that contribute nothing to the smell but consume formulation budget. How systematically these practices are deployed across the industry is, by their nature, not fully visible from outside.",
        "Pre-compounded bases. A \"base\" is an internal pre-mix — sometimes itself a small composition of dozens of materials — used as a single ingredient in the final formula. The GC-MS reads the finished product as a flat list of compounds; the architecture of which compound came from which base, and how those bases were aged before integration, is invisible to the instrument and remains savoir-faire in the strict sense.",
        "The cumulative effect is to shift the cost of copying from a routine analytical exercise to a research project — and, as importantly, to shift the legal characterisation of any successful copying from \"lawful reverse engineering\" to something that may begin to look like misappropriation.",
        "5. The defences that have nothing to do with chemistry",
        "The most durable forms of protection in this industry are not legal at all in the first instance. They are structural.",
        "Control of raw materials. Several major houses contract for exclusive harvests — particular fields of Grasse jasmine, specific Bulgarian rose plots, single-origin iris orris from named producers. A spectrometer can identify the species; it cannot replicate the molecular complexity of a particular terroir. A dupe built on commodity-grade equivalents is identifiable, on skin, in minutes.",
        "Maturation and process. Compositions that macerate for weeks before filtration behave differently on skin than compositions assembled the day before bottling. This is empirically observable and difficult to imitate at the price points at which dupes are commercially viable.",
        "Trade dress and design rights. The bottle, the cap mechanism, the box, the typography, the closure system can all be registered as designs or, where they have acquired distinctiveness, as three-dimensional marks. Even when the liquid is not protectable, the object that contains it usually is, and a dupe forced to present itself in generic packaging loses much of its commercial appeal in the segments that matter to the original.",
        "Narrative and authorship. The \"editor of perfumes\" model — perfumer's name on the bottle as an author's name appears on a book — is in part a commercial branding choice and in part an IP strategy: it pushes the product across the categorical line from cosmetic to authored work, which matters when courts later have to decide how to characterise the dispute.",
        "6. The silent dupe: parasitism as a fallback theory",
        "The hardest scenario, and the most common, is the silent dupe: a competitor reproduces a fragrance closely enough to be recognisable on skin, sells it under a generic name in neutral packaging, and never references the original. Trademark and design rights bite nothing. Copyright is unavailable in most jurisdictions and, after Levola, increasingly unavailable as a matter of EU law. Trade secret has been defeated by lawful analysis.",
        "The remaining legal theory is unfair competition in its parasitism variant — the doctrine, well developed in French and Italian case law, that punishes the systematic appropriation of another's creative and economic investment to save oneself the cost of independent development. The plaintiff must show that the original has a distinct identity, that the defendant's product corresponds to it in commercially relevant ways, and that the defendant has freeridden on the plaintiff's investment rather than building its own. This is a fact-intensive case to bring and an uncertain one to win, but it is the theory under which a meaningful share of fragrance IP disputes are now actually litigated, and the theory most clearly available to authors who lack any registered right over the composition itself.",
        "Parasitism cases are also where the evidence package — what the author can show about the prior existence, originality, and authorship of the work — becomes determinative.",
        "7. Anchoring the fragrance to a text",
        "A line of practice that has emerged among auteur perfumers — Jean-Claude Ellena's reflective writing on perfumery, Meo Fusciuni's explicit \"poetic pyramid\", the literary apparatus that surrounds Chanel's heritage compositions — treats the fragrance and an accompanying text as a single, indivisible authored work. The text is unambiguously protected by copyright. The fragrance, on its own, may not be. But the relationship between the two becomes evidence of the author's creative process: the choice of contrast between this accord and that one is no longer a technical choice that the law dismisses, but a deliberate translation of a specific literary or conceptual decision.",
        "A registered file containing the source text, the author's \"translation protocol\" explaining which olfactory choices correspond to which textual elements, and the visual identity of the work — bottle, packaging, name — creates an artistic envelope around the composition. Standing alone, the envelope does not give the author copyright over the smell. In litigation, it does three useful things: it documents authorship and priority, it characterises the author as an author (which influences how a court frames the dispute), and it raises the apparent gravity of the alleged infringement from \"someone copied a smell\" to \"someone appropriated an integrated work.\"",
        "This is not a complete answer to the silent-dupe problem. A defendant who copies only the chemistry, with no reference to the surrounding text, can still argue that what they copied was the unprotected layer. But the envelope significantly improves the plaintiff's posture in a parasitism claim, and it is the closest thing the current legal system offers to copyright over the work as a whole.",
        "8. The digital frontier: olfactory fingerprinting and timestamped priority",
        "The most recent strand of defensive practice tries to address the law's \"precision\" anxiety at its root by producing an objective, reproducible representation of the fragrance that can be timestamped and registered.",
        "On the analytical side, instruments and platforms designed for digital olfaction — Aryballe's surface-plasmon-resonance sensor arrays are the best-known consumer-facing example, with parallel efforts in the major fragrance houses and in academic chemometrics — produce a multidimensional digital signature of a finished fragrance that is reproducible, comparable, and far more compact than a full GC×GC-MS dataset. This signature is not the formula. It is something closer to an olfactory fingerprint: a representation precise enough to verify identity, ambiguous enough not to disclose composition.",
        "On the registration side, the eIDAS Regulation already provides for qualified electronic time-stamps with cross-border legal effect. Italian law has further opened the door to recognising certain DLT-based timestamps under Article 8-ter of Decree-Law 135/2018 (converted by Law 12/2019), provided that the relevant technical requirements — initially anchored to AgID guidance — are met. Comparable mechanisms are emerging across the EU, and the EUIPO has been developing blockchain-based registry and IP-wallet infrastructure for designs and marks. Commercial providers let an author register the cryptographic hash of a file without disclosing its contents.",
        "The practical lesson is not that \"blockchain protects perfume.\" It is that a compliant timestamped hash of the fingerprint, the source text, the translation protocol and any associated visual material can establish unimpeachable priority without disclosing any of it. If a similar product appears later, the question shifts from \"did you copy?\" to \"given that the original was registered on this date, how do you account for the resemblance?\" — and in a parasitism action, where the burden is partly evidential and partly narrative, that shift matters.",
        "9. A realistic synthesis",
        "The honest perimeter of fragrance protection, as the law currently stands, looks roughly like this.",
        "What does not work, or works only marginally: copyright over the composition (outside the Netherlands of 2006, and now in tension with Levola); trademark over the smell; patent over the finished composition; trade secret against competent commercial analysis.",
        "What works, conditionally: trade secret against contractual breach (employees, contract manufacturers, suppliers — provided that the NDAs and process controls are in place and rigorously documented under Directive 2016/943); patent over individual novel molecules (the captive model, available only to entities with serious chemistry capability); design rights and trademarks over packaging and name; unfair-competition and parasitism claims against close copies, particularly where the author can show an established identity and a documented prior investment.",
        "What changes the equation: making analysis genuinely difficult (captives, complex naturals, chirality, markers) rather than relying on it being illegal; controlling the supply of inimitable raw materials so that physical replication remains imperfect even when chemical replication is achieved; anchoring the fragrance to an authored text and registering the integrated work; producing and registering a digital fingerprint that establishes priority without disclosing composition.",
        "None of these steps, alone, gives the author the kind of clean exclusivity that a novelist has over a novel or a composer has over a score. Together, they shift the litigation posture in a way that, in practice, is what successful auteur perfumers actually rely on. The art is unprotected as a category. The author is not undefended as a litigant.",
        "The deeper point is that perfumery is unusual not because its products are evanescent, but because it is one of the last creative disciplines whose output is identical to its working notes — the formula and the experience are not separable in the way a manuscript and a printed book are. Until the law develops a more comfortable concept of what a \"form\" is when the form is a pattern of molecules perceived over time, the protection of olfactory works will continue to be built sideways, out of contracts, supply chains, packaging law, unfair-competition doctrine, and the slow accumulation of evidence that the work is, in fact, a work.",
        "That is not nothing. It is, increasingly, the actual law of perfume.",
      ],
    },
  };
  const perfumeryIPContent = perfumeryIPTranslations[language];
  const perfumeryIPArticle = perfumeryIPContent ? {
    ...perfumeryIPContent,
    hashtags: ["#IntellectualProperty", "#PerfumeLaw", "#FragranceIndustry", "#Perfumery", "#CopyrightLaw", "#TradeSecrets", "#LegalTech", "#BrandProtection", "#AntiCounterfeiting", "#OlfactoryArt", "#DigitalEvidence", "#BlockchainForIP", "#IPStrategy", "#LuxuryLaw", "#BeautyTech", "#FragranceCreation", "#UnfairCompetition", "#CreativeIndustries", "#InnovationLaw"],
    image: perfumeryIPImage,
    category: "IP Law",
  } : null;

  const insights = [
    {
      title: articles.article1.title,
      description: articles.article1.description,
      url: articles.article1.url,
      image: diVincenzoImage,
      category: "Food",
    },
    {
      title: articles.article2.title,
      description: articles.article2.description,
      url: articles.article2.url,
      image: almenaraImage,
      category: "Strategy",
    },
    {
      title: articles.article3.title,
      description: articles.article3.description,
      url: articles.article3.url,
      image: brazilInvestmentImage,
      category: "Investment",
    },
    {
      title: articles.article4.title,
      description: articles.article4.description,
      url: articles.article4.url,
      image: custoBrasilImage,
      category: "Strategy",
    },
    {
      title: articles.article5.title,
      description: articles.article5.description,
      url: articles.article5.url,
      image: industrialMachineryImage,
      category: "Export",
    },
    {
      title: articles.article6.title,
      description: articles.article6.description,
      url: articles.article6.url,
      image: cosmeticsBrazilImage,
      category: "Beauty",
    },
    {
      title: articles.article7.title,
      description: articles.article7.description,
      url: articles.article7.url,
      image: consumerDefenseImage,
      category: "Legal",
    },
  ];

  return (
    <section id="insights" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{title}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
        </div>

        {/* Featured Article */}
        <Card className="mb-12 overflow-hidden hover:shadow-xl transition-all duration-300 border-border/50">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="relative h-64 md:h-auto overflow-hidden">
              <img
                src={featuredArticle.image}
                alt={featuredArticle.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-primary text-primary-foreground text-sm font-semibold rounded-full">
                  {featuredArticle.category}
                </span>
              </div>
            </div>
            <div className="p-8 flex flex-col justify-center">
              <CardTitle className="text-2xl md:text-3xl mb-4 text-foreground">
                {featuredArticle.title}
              </CardTitle>
              <CardDescription className="text-base leading-relaxed mb-6 text-muted-foreground">
                {featuredArticle.description}
              </CardDescription>
              <div className="flex flex-wrap gap-2 mb-6 text-sm text-muted-foreground">
                {featuredArticle.hashtags.map((tag, index) => (
                  <span key={index}>{tag}</span>
                ))}
              </div>
              <ShareButtons url={featuredArticle.url} title={featuredArticle.title} />
              <Button 
                variant="default" 
                className="w-fit"
                asChild
              >
                <a href={featuredArticle.url} target="_blank" rel="noopener noreferrer">
                  {featuredArticle.cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </Card>

        {/* Coffee EUDR Featured Article — Portuguese only */}
        {coffeeEudrArticle && (
          <Card className="mb-12 overflow-hidden hover:shadow-xl transition-all duration-300 border-border/50">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative h-64 md:h-auto overflow-hidden">
                <img
                  src={coffeeEudrArticle.image}
                  alt={coffeeEudrArticle.title}
                  loading="lazy"
                  width={1280}
                  height={800}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-primary text-primary-foreground text-sm font-semibold rounded-full">
                    {coffeeEudrArticle.category}
                  </span>
                </div>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <button
                  type="button"
                  onClick={() => setOpenArticle(coffeeEudrArticle as OpenArticle)}
                  className="text-left mb-4"
                >
                  <CardTitle className="text-2xl md:text-3xl text-foreground hover:text-primary transition-colors cursor-pointer">
                    {coffeeEudrArticle.title}
                  </CardTitle>
                </button>
                <CardDescription className="text-base leading-relaxed mb-4 text-muted-foreground">
                  {coffeeEudrArticle.description}
                </CardDescription>
                <div className="space-y-3 mb-6 text-sm leading-relaxed text-muted-foreground max-h-72 overflow-y-auto pr-2">
                  {coffeeEudrArticle.fullText.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                  {coffeeEudrArticle.hashtags.map((tag, index) => (
                    <span key={index}>{tag}</span>
                  ))}
                </div>
                <ShareButtons title={coffeeEudrArticle.title} />
              </div>
            </div>
          </Card>
        )}

        {/* Madeira Tropical EUDR Featured Article — Portuguese only */}
        {madeiraEudrArticle && (
          <Card className="mb-12 overflow-hidden hover:shadow-xl transition-all duration-300 border-border/50">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative h-64 md:h-auto overflow-hidden">
                <img
                  src={madeiraEudrArticle.image}
                  alt={madeiraEudrArticle.title}
                  loading="lazy"
                  width={1280}
                  height={800}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-primary text-primary-foreground text-sm font-semibold rounded-full">
                    {madeiraEudrArticle.category}
                  </span>
                </div>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <button
                  type="button"
                  onClick={() => setOpenArticle(madeiraEudrArticle as OpenArticle)}
                  className="text-left mb-4"
                >
                  <CardTitle className="text-2xl md:text-3xl text-foreground hover:text-primary transition-colors cursor-pointer">
                    {madeiraEudrArticle.title}
                  </CardTitle>
                </button>
                <CardDescription className="text-base leading-relaxed mb-4 text-muted-foreground">
                  {madeiraEudrArticle.description}
                </CardDescription>
                <div className="space-y-3 mb-6 text-sm leading-relaxed text-muted-foreground max-h-72 overflow-y-auto pr-2">
                  {madeiraEudrArticle.fullText.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                  {madeiraEudrArticle.hashtags.map((tag, index) => (
                    <span key={index}>{tag}</span>
                  ))}
                </div>
                <ShareButtons title={madeiraEudrArticle.title} />
              </div>
            </div>
          </Card>
        )}

        {/* Ajvar Featured Article — Portuguese only */}
        {ajvarArticle && (
          <Card className="mb-12 overflow-hidden hover:shadow-xl transition-all duration-300 border-border/50">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative h-64 md:h-auto overflow-hidden">
                <img
                  src={ajvarArticle.image}
                  alt={ajvarArticle.title}
                  loading="lazy"
                  width={1280}
                  height={800}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-primary text-primary-foreground text-sm font-semibold rounded-full">
                    {ajvarArticle.category}
                  </span>
                </div>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <button
                  type="button"
                  onClick={() => setOpenArticle(ajvarArticle as OpenArticle)}
                  className="text-left mb-4"
                >
                  <CardTitle className="text-2xl md:text-3xl text-foreground hover:text-primary transition-colors cursor-pointer">
                    {ajvarArticle.title}
                  </CardTitle>
                </button>
                <CardDescription className="text-base leading-relaxed mb-4 text-muted-foreground">
                  {ajvarArticle.description}
                </CardDescription>
                <div className="space-y-3 mb-6 text-sm leading-relaxed text-muted-foreground max-h-72 overflow-y-auto pr-2">
                  {ajvarArticle.fullText.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                  {ajvarArticle.hashtags.map((tag, index) => (
                    <span key={index}>{tag}</span>
                  ))}
                </div>
                <ShareButtons title={ajvarArticle.title} />
              </div>
            </div>
          </Card>
        )}

        {/* EU–Mercosur Playbook Featured Article — English only */}
        {euMercosurPlaybookArticle && (
          <Card className="mb-12 overflow-hidden hover:shadow-xl transition-all duration-300 border-border/50">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative h-64 md:h-auto overflow-hidden">
                <img
                  src={euMercosurPlaybookArticle.image}
                  alt={euMercosurPlaybookArticle.title}
                  loading="lazy"
                  width={1280}
                  height={800}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-primary text-primary-foreground text-sm font-semibold rounded-full">
                    {euMercosurPlaybookArticle.category}
                  </span>
                </div>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <button
                  type="button"
                  onClick={() => setOpenArticle(euMercosurPlaybookArticle as OpenArticle)}
                  className="text-left mb-4"
                >
                  <CardTitle className="text-2xl md:text-3xl text-foreground hover:text-primary transition-colors cursor-pointer">
                    {euMercosurPlaybookArticle.title}
                  </CardTitle>
                </button>
                <CardDescription className="text-base leading-relaxed mb-4 text-muted-foreground">
                  {euMercosurPlaybookArticle.description}
                </CardDescription>
                <div className="space-y-3 mb-6 text-sm leading-relaxed text-muted-foreground max-h-72 overflow-y-auto pr-2">
                  {euMercosurPlaybookArticle.fullText.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                  {euMercosurPlaybookArticle.hashtags.map((tag, index) => (
                    <span key={index}>{tag}</span>
                  ))}
                </div>
                <ShareButtons title={euMercosurPlaybookArticle.title} />
              </div>
            </div>
          </Card>
        )}

        {perfumeryIPArticle && (
          <Card className="mb-12 overflow-hidden hover:shadow-xl transition-all duration-300 border-border/50">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative h-64 md:h-auto overflow-hidden">
                <img
                  src={perfumeryIPArticle.image}
                  alt={perfumeryIPArticle.title}
                  loading="lazy"
                  width={1280}
                  height={800}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-primary text-primary-foreground text-sm font-semibold rounded-full">
                    {perfumeryIPArticle.category}
                  </span>
                </div>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <button
                  type="button"
                  onClick={() => setOpenArticle(perfumeryIPArticle as OpenArticle)}
                  className="text-left mb-4"
                >
                  <CardTitle className="text-2xl md:text-3xl text-foreground hover:text-primary transition-colors cursor-pointer">
                    {perfumeryIPArticle.title}
                  </CardTitle>
                </button>
                <CardDescription className="text-base leading-relaxed mb-4 text-muted-foreground">
                  {perfumeryIPArticle.description}
                </CardDescription>
                <div className="space-y-3 mb-6 text-sm leading-relaxed text-muted-foreground max-h-72 overflow-y-auto pr-2">
                  {perfumeryIPArticle.fullText.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                  {perfumeryIPArticle.hashtags.map((tag, index) => (
                    <span key={index}>{tag}</span>
                  ))}
                </div>
                <ShareButtons title={perfumeryIPArticle.title} />
              </div>
            </div>
          </Card>
        )}

        <div className="flex overflow-x-auto gap-8 pb-4 snap-x snap-mandatory lg:grid lg:grid-cols-7 lg:overflow-visible">
          {insights.map((insight, index) => (
            <Card
              key={index}
              className="group flex-shrink-0 w-[300px] lg:w-auto overflow-hidden hover:shadow-xl transition-all duration-300 border-border/50 snap-start"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={insight.image}
                  alt={insight.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-accent text-accent-foreground text-sm font-semibold rounded-full">
                    {insight.category}
                  </span>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {insight.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed mb-4">
                  {insight.description}
                </CardDescription>
                <Button 
                  variant="ghost" 
                  className="group/btn p-0 h-auto text-primary hover:text-primary/80"
                  asChild
                >
                  <a href={insight.url} target="_blank" rel="noopener noreferrer">
                    {readMore}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </Button>
                <ShareButtons url={insight.url} title={insight.title} />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      {openArticle && (
        <ArticleFullView
          open={!!openArticle}
          onOpenChange={(o) => !o && setOpenArticle(null)}
          title={openArticle.title}
          description={openArticle.description}
          image={openArticle.image}
          category={openArticle.category}
          fullText={openArticle.fullText}
          hashtags={openArticle.hashtags}
          url={openArticle.url}
        />
      )}
    </section>
  );
};
