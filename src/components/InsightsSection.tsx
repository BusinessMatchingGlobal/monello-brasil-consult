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
