import { Linkedin, Facebook } from "lucide-react";

interface ShareButtonsProps {
  url?: string;
  title: string;
  label?: string;
}

export const ShareButtons = ({ url, title, label = "Share:" }: ShareButtonsProps) => {
  const shareUrl = url ?? (typeof window !== "undefined" ? window.location.href : "https://businessmatching.global");
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  const linkedinHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  const facebookHref = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`;

  return (
    <div className="flex items-center gap-2 mt-3">
      <span className="text-xs text-muted-foreground">{label}</span>
      <a
        href={linkedinHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
      >
        <Linkedin className="h-4 w-4" />
      </a>
      <a
        href={facebookHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Facebook"
        className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
      >
        <Facebook className="h-4 w-4" />
      </a>
    </div>
  );
};
