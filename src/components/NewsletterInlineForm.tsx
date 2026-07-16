import { useState } from "react";
import { useT } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { NewsletterPopup } from "@/components/NewsletterPopup";

export function NewsletterInlineForm({ compact = false }: { compact?: boolean }) {
  const { t } = useT();
  const n = t.newsletter;
  const [open, setOpen] = useState(false);
  return (
    <div className={compact ? "w-full max-w-md" : "w-full md:max-w-md"}>
      <Button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-full"
      >
        <Mail className="mr-2 h-4 w-4" /> {n.cta}
      </Button>
      <NewsletterPopup open={open} onOpenChange={setOpen} source="Custo Brasil newsletter page" />
    </div>
  );
}