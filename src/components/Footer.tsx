interface FooterProps {
  copyright: string;
  privacy: string;
  terms: string;
}

export const Footer = ({ copyright, privacy, terms }: FooterProps) => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
              <span className="text-accent-foreground font-bold text-xl">CB</span>
            </div>
            <span className="text-xl font-bold">Consul Brasil</span>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-6 text-sm">
            <p className="text-primary-foreground/80">{copyright}</p>
            <div className="flex gap-6">
              <a href="#privacy" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                {privacy}
              </a>
              <a href="#terms" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                {terms}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
