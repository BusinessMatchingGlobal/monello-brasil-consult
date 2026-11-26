import type { AnchorHTMLAttributes } from "react";
import { Link, useHref } from "react-router-dom";
import { useT } from "@/lib/i18n";
import { pathForLang } from "@/lib/langPath";

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { to: string };

/** Use a full navigation when a localized link leaves the current router basename. */
export function SiteNavigationLink({ to, ...props }: Props) {
  const { lang } = useT();
  const routerHref = useHref(to);
  const href = pathForLang(lang, to);
  if (routerHref !== href) return <a {...props} href={href} />;
  return <Link {...props} to={to} />;
}
