import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import almenaraImage from "@/assets/almenara-panorama.jpg";
import strategyImage from "@/assets/strategy-abstract.jpg";
import innovationImage from "@/assets/innovation-bg.jpg";

interface InsightsSectionProps {
  title: string;
  subtitle: string;
  readMore: string;
  articles: {
    article1: { title: string; description: string; url: string };
    article2: { title: string; description: string; url: string };
    article3: { title: string; description: string; url: string };
  };
}

export const InsightsSection = ({ title, subtitle, readMore, articles }: InsightsSectionProps) => {
  const insights = [
    {
      title: articles.article1.title,
      description: articles.article1.description,
      url: articles.article1.url,
      image: almenaraImage,
      category: "Strategy",
    },
    {
      title: articles.article2.title,
      description: articles.article2.description,
      url: articles.article2.url,
      image: innovationImage,
      category: "Innovation",
    },
    {
      title: articles.article3.title,
      description: articles.article3.description,
      url: articles.article3.url,
      image: strategyImage,
      category: "Growth",
    },
  ];

  return (
    <section id="insights" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{title}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {insights.map((insight, index) => (
            <Card
              key={index}
              className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-border/50"
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
