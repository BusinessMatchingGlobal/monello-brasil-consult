import { useT } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { openIubendaNewsletter } from "@/lib/consent";

export function NewsletterInlineForm({ compact = false }: { compact?: boolean }) {
  const { t } = useT();
  const n = t.newsletter;
  return (
    <div className={compact ? "w-full max-w-md" : "w-full md:max-w-md"}>
      <Button
        type="button"
        onClick={() => openIubendaNewsletter()}
        className="rounded-full"
      >
        <Mail className="mr-2 h-4 w-4" /> {n.cta}
      </Button>
    </div>
  );
}