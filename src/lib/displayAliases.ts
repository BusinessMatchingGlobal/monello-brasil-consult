import { translations } from "./i18n";
import { homepageCopy } from "@/data/homepage";
import { homepageSeo } from "@/data/homepageSeo";
import { familyCopy } from "@/data/serviceFamilies";
import { getServicesCatalog } from "@/data/servicesCatalog";

/**
 * Portuguese → Italian pairs taken from parallel copy modules. The DE/ES/FR
 * catalogue stores shared copy once, under its Italian source; Brazil → Europe
 * variant copy has its own Portuguese entry and always wins. A pair is skipped
 * when the two texts point at different markets, so a translation can never
 * flip the commercial direction.
 */
const normalise = (text: string) => text.replace(/\s+/g, " ").trim();
const mentionsEurope = (t: string) => /\bEuropa\b|europe/i.test(t);
const mentionsBrazil = (t: string) => /\bBrasil(e)?\b|brasilian|brasileir/i.test(t);

function walk(pt: unknown, it: unknown, out: Map<string, string>) {
  if (typeof pt === "string" && typeof it === "string") {
    const p = normalise(pt);
    const i = normalise(it);
    if (!p || p === i) return;
    if (mentionsEurope(p) !== mentionsEurope(i) || mentionsBrazil(p) !== mentionsBrazil(i)) return;
    if (!out.has(p)) out.set(p, i);
    // Multi-line copy is often rendered one line per element.
    const pl = pt.split("\n"), il = it.split("\n");
    if (pl.length > 1 && pl.length === il.length) pl.forEach((line, n) => walk(line, il[n], out));
    return;
  }
  if (Array.isArray(pt) && Array.isArray(it)) {
    if (pt.length === it.length) pt.forEach((v, n) => walk(v, it[n], out));
    return;
  }
  if (pt && it && typeof pt === "object" && typeof it === "object") {
    for (const key of Object.keys(pt)) walk((pt as Record<string, unknown>)[key], (it as Record<string, unknown>)[key], out);
  }
}

let cache: Map<string, string> | null = null;
export function portugueseToItalian(): Map<string, string> {
  if (cache) return cache;
  cache = new Map();
  walk(translations.pt, translations.it, cache);
  walk(homepageCopy.pt, homepageCopy.it, cache);
  walk(homepageSeo.pt, homepageSeo.it, cache);
  walk(familyCopy.pt, familyCopy.it, cache);
  walk(getServicesCatalog("pt"), getServicesCatalog("it"), cache);
  return cache;
}
