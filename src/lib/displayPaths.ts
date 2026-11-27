import { localizeFamilyPath } from "@/data/serviceFamilyMetadata";
import { SITUATIONS } from "@/data/situations";

/** Italian twin of a prefix-free path: DE/ES/FR Europe → Brazil pages use the Italian route set. */
export function toItalianPath(path: string): string {
  const [pathname, hash] = path.split("#");
  const situation = SITUATIONS.find(s => Object.values(s.content).some(c => c?.slug === pathname));
  const base = situation?.content.it?.slug ?? localizeFamilyPath(pathname, "it");
  return base + (hash ? `#${hash}` : "");
}
