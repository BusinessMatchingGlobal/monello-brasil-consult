# Architecture rules

- Router Link targets are prefix-free because BrowserRouter owns the language basename; use pathForLang only with native anchors.
- Header and footer navigation share language-aware data in siteNavigation; service anchor IDs come from the same list to prevent link drift.
- Language-exclusive editorial pages declare only their published languages in route metadata and hreflang, so unavailable translations are not advertised.
- Before-you-choose Portuguese editorial content is stored separately from its renderer to preserve supplied copy and stable section anchors.
- Page chrome is shared: SiteContactForm (with hidden page field) and SiteFooter are the only contact form and footer; content pages without their own Nav, including privacy and the practical business guide, are wrapped by SiteLayout to prevent inconsistent header/footer. Dedicated travel-request and direct-access tourism pages retain their intentional standalone layouts.
