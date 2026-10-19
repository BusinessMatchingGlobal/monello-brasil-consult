# Architecture rules

- Router Link targets are prefix-free because BrowserRouter owns the language basename; use pathForLang only with native anchors.
- Language-exclusive editorial pages declare only their published languages in route metadata and hreflang, so unavailable translations are not advertised.
- Before-you-choose Portuguese editorial content is stored separately from its renderer to preserve supplied copy and stable section anchors.
- Before-you-choose reuses the existing ContactForm and full homepage footer so contact handling and legal/membership details remain consistent.- Page chrome is shared: SiteContactForm (with hidden page field) and SiteFooter are the only contact form and footer; pages without their own Nav are wrapped by the SiteLayout route, so new pages get consistent header/footer.
