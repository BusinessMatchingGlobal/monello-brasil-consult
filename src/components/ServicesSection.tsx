import { TrendingUp, Settings, Zap, Target } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ServicesSectionProps {
  title: string;
  subtitle: string;
  services: {
    strategy: { title: string; description: string };
    operations: { title: string; description: string };
    digital: { title: string; description: string };
    growth: { title: string; description: string };
  };
}

export const ServicesSection = ({ title, subtitle, services }: ServicesSectionProps) => {
  const servicesList = [
    {
      icon: Target,
      title: services.strategy.title,
      description: services.strategy.description,
      gradient: "from-primary to-primary/80",
    },
    {
      icon: Settings,
      title: services.operations.title,
      description: services.operations.description,
      gradient: "from-accent to-accent/80",
    },
    {
      icon: Zap,
      title: services.digital.title,
      description: services.digital.description,
      gradient: "from-primary to-primary/80",
    },
    {
      icon: TrendingUp,
      title: services.growth.title,
      description: services.growth.description,
      gradient: "from-accent to-accent/80",
    },
  ];

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{title}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesList.map((service, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/30"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <CardHeader>
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
