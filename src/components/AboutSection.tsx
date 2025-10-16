interface AboutSectionProps {
  title: string;
  description: string;
  stats: {
    clients: string;
    years: string;
    projects: string;
    team: string;
  };
}

export const AboutSection = ({ title, description, stats }: AboutSectionProps) => {
  const statsList = [
    { value: "200+", label: stats.clients },
    { value: "15+", label: stats.years },
    { value: "500+", label: stats.projects },
    { value: "50+", label: stats.team },
  ];

  return (
    <section id="about" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-center">{title}</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-16 text-center">
            {description}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            {statsList.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl bg-background border border-border/50 hover:border-primary/30 transition-colors"
              >
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm md:text-base text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
