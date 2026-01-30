import { Link } from "react-router-dom";

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
          <div className="flex items-center gap-3">
            <img 
              src="/images/logo-bmg.jpg" 
              alt="Business Matching Global" 
              className="h-10 w-auto object-contain rounded"
            />
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-6 text-sm">
            <p className="text-primary-foreground/80">{copyright}</p>
            <div className="flex gap-6">
              <Link to="/privacy" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                {privacy}
              </Link>
              <Link to="/terms" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                {terms}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
