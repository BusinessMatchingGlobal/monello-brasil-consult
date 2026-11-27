import type { SiteLang } from "@/lib/displayLang";
import { FREQUENT_QUESTIONS } from "./frequentQuestions";
// Owner-approved copy, imported verbatim from the editorial files (single source per language).
import en from "../../editorial-review/faq/en.json";
import pt from "../../editorial-review/faq/pt-BR.json";
import de from "../../editorial-review/faq/de.json";
import es from "../../editorial-review/faq/es.json";
import fr from "../../editorial-review/faq/fr.json";

export type FaqContent = {
  title: string;
  subtitle: string;
  sections: ReadonlyArray<{ title: string; intro?: string; items: ReadonlyArray<{ q: string; a: string }> }>;
  contact: string;
  closing: string;
};

export const FAQ_CONTENT: Record<SiteLang, FaqContent> = { it: FREQUENT_QUESTIONS, en, pt, de, es, fr };
