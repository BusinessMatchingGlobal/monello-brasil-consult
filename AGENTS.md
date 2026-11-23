# Architecture rules

- Service family metadata owns localized paths; family cards reuse the original catalogs through an explicit partition, with Export Desk retaining its four catalog levels, to preserve copy and prevent duplication.

- Homepage editorial copy lives in its own localized data module; optional SiteContactForm copy overrides are presentation-only and opt-in, so homepage updates do not alter internal pages or submission behaviour.
- Homepage SEO uses dedicated localized data, while the prerender composer copies all captured JSON-LD (including removals) to preserve page-specific schemas and exclude absent homepage FAQs.

- Router Link targets are prefix-free because BrowserRouter owns the language basename; use pathForLang only with native anchors.
- Webinar pages are hosted externally on swarmigenza.com; the old on-site webinar URLs redirect there with a full navigation, preserving query and hash.
- Header and footer navigation share language-aware data in siteNavigation; service anchor IDs come from the same list to prevent link drift.
- Language-exclusive editorial pages declare only their published languages in route metadata and hreflang, so unavailable translations are not advertised.
- Before-you-choose Portuguese editorial content is stored separately from its renderer to preserve supplied copy and stable section anchors.
- Before-entrusting-Brazil copy stays in a dedicated EN/IT data module; its renderer links numbered citations to references and adds no contact form or extra CTA, preserving the supplied editorial text.
- Page chrome is shared: SiteContactForm (with hidden page field) and SiteFooter are the only contact form and footer; content pages without their own Nav, including privacy and the practical business guide, are wrapped by SiteLayout to prevent inconsistent header/footer. Dedicated travel-request and direct-access tourism pages retain their intentional standalone layouts.
- Public sign-up is disabled and the admin page offers login only, because admin roles are tied to fixed email addresses.
- newsletter-subscribe never overwrites an existing signup with caller input; it only re-sends the stored confirmation link, with a cooldown, so strangers cannot hijack another person's subscription.
- assistant-weekly-digest accepts only service-role (scheduler) tokens, so signed-in users cannot read visitor questions or trigger the email.
- ask-bmg stays public but is capped per visitor and site-wide per day via assistant_bump_rate_limit, to bound AI costs.
- Exported CSV cells go through csvSafe to neutralise spreadsheet formulas.
