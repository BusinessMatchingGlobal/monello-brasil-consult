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
