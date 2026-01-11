import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher, Language } from "@/components/LanguageSwitcher";

interface NavigationProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  translations: {
    home: string;
    services: string;
    insights: string;
    about: string;
    contact: string;
    turismo?: string;
  };
}

export const Navigation = ({ currentLanguage, onLanguageChange, translations }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: translations.home, href: "#home", isExternal: false },
    { label: translations.services, href: "#services", isExternal: false },
    { label: translations.insights, href: "#insights", isExternal: false },
    { label: translations.about, href: "#about", isExternal: false },
    ...(translations.turismo ? [{ label: translations.turismo, href: "/turismo", isExternal: true }] : []),
    { label: translations.contact, href: "#contact", isExternal: false },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">CB</span>
            </div>
            <span className="text-2xl font-bold text-foreground hidden sm:inline">Consul Brasil</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              item.isExternal ? (
                <Link
                  key={item.href}
                  to={item.href}
                  className="text-foreground/80 hover:text-primary font-medium transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-foreground/80 hover:text-primary font-medium transition-colors"
                >
                  {item.label}
                </a>
              )
            ))}
            <LanguageSwitcher currentLanguage={currentLanguage} onLanguageChange={onLanguageChange} />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden">
            <LanguageSwitcher currentLanguage={currentLanguage} onLanguageChange={onLanguageChange} />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border">
            {navItems.map((item) => (
              item.isExternal ? (
                <Link
                  key={item.href}
                  to={item.href}
                  className="block py-3 text-foreground/80 hover:text-primary font-medium transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  className="block py-3 text-foreground/80 hover:text-primary font-medium transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              )
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};
