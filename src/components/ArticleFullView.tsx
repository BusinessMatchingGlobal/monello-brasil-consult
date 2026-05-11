import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ShareButtons } from "@/components/ShareButtons";

interface ArticleFullViewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  image: string;
  category?: string;
  fullText: string[];
  hashtags?: string[];
  url?: string;
}

export const ArticleFullView = ({
  open,
  onOpenChange,
  title,
  description,
  image,
  category,
  fullText,
  hashtags,
  url,
}: ArticleFullViewProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-[95vw] h-[92vh] p-0 overflow-hidden flex flex-col">
        <div className="relative h-56 md:h-72 flex-shrink-0 overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover" />
          {category && (
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-primary text-primary-foreground text-sm font-semibold rounded-full">
                {category}
              </span>
            </div>
          )}
        </div>
        <div className="flex-1 overflow-y-auto px-6 md:px-10 py-8">
          <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
            {title}
          </h1>
          {description && (
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6 italic">
              {description}
            </p>
          )}
          <div className="space-y-4 text-base leading-relaxed text-foreground/90">
            {fullText.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          {hashtags && hashtags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-8 text-sm text-muted-foreground">
              {hashtags.map((tag, i) => (
                <span key={i}>{tag}</span>
              ))}
            </div>
          )}
          <div className="mt-6">
            <ShareButtons url={url} title={title} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
