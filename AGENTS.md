# Architecture rules

- Router Link targets are prefix-free because BrowserRouter owns the language basename; use pathForLang only with native anchors.
- Language-exclusive editorial pages declare only their published languages in route metadata and hreflang, so unavailable translations are not advertised.
- Before-you-choose Portuguese editorial content is stored separately from its renderer to preserve supplied copy and stable section anchors.
- Before-you-choose reuses the existing ContactForm and full homepage footer so contact handling and legal/membership details remain consistent.