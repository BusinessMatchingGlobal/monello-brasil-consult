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
import brazilianCoffeeEudrImage from "@/assets/brazilian-coffee-eudr.jpg";
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

  const coffeeEudrArticle = language === "pt" ? {
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
