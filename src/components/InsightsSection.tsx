import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { Language } from "@/components/LanguageSwitcher";

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
    en: null,
    it: null,
  };
  const ajvarContent = ajvarTranslations[language];
  const ajvarArticle = ajvarContent ? {
    ...ajvarContent,
    hashtags: ["#Ajvar", "#CaviarVermelho", "#FoodInnovation", "#FoodBusiness", "#Gastronomia", "#ChurrascoBrasileiro", "#ProdutosGourmet", "#CleanLabel", "#PlantBased", "#SlowFood", "#CulturaAlimentar", "#BrasilGourmet", "#MinasGerais", "#QueijoCanastra", "#Balcãs"],
    image: ajvarCaviarVermelhoImage,
    category: "Food Innovation",
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
                <CardTitle className="text-2xl md:text-3xl mb-4 text-foreground">
                  {coffeeEudrArticle.title}
                </CardTitle>
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
                <CardTitle className="text-2xl md:text-3xl mb-4 text-foreground">
                  {madeiraEudrArticle.title}
                </CardTitle>
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
                <CardTitle className="text-2xl md:text-3xl mb-4 text-foreground">
                  {ajvarArticle.title}
                </CardTitle>
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
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
