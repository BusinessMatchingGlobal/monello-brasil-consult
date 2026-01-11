import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, CheckCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NewsletterSectionProps {
  title: string;
  subtitle: string;
  placeholder: string;
  buttonText: string;
  successMessage: string;
  privacyText: string;
}

export const NewsletterSection = ({
  title,
  subtitle,
  placeholder,
  buttonText,
  successMessage,
  privacyText,
}: NewsletterSectionProps) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      toast({
        title: "Email non valida",
        description: "Inserisci un indirizzo email valido.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // TODO: Sostituire con l'integrazione del servizio newsletter scelto
    // Esempio per Mailchimp: usa il loro API endpoint
    // Esempio per Brevo: usa il loro API endpoint
    // Esempio per Lovable Cloud: crea una edge function + tabella subscribers
    
    // Simulazione per demo
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setIsLoading(false);
    setIsSubscribed(true);
    setEmail("");
    
    toast({
      title: "Iscrizione completata!",
      description: successMessage,
    });
  };

  if (isSubscribed) {
    return (
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-xl mx-auto text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Grazie per l'iscrizione!
            </h3>
            <p className="text-muted-foreground">{successMessage}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="max-w-xl mx-auto text-center">
          <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-foreground mb-3">{title}</h2>
          <p className="text-muted-foreground mb-6">{subtitle}</p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder={placeholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading} className="whitespace-nowrap">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Invio...
                </>
              ) : (
                buttonText
              )}
            </Button>
          </form>
          
          <p className="text-xs text-muted-foreground mt-4">
            {privacyText}
          </p>
        </div>
      </div>
    </section>
  );
};
