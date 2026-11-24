# Social Home

Owner: Social Media domain. Entry point: `mountHomePage()` in `home-page.js`.

Social Home owns people discovery, Circle Stories, Feed aggregation, the Social content controls, the composer, and user-initiated navigation to Blog/other Social Media experiences. It does not render sibling-domain merchant/product listings, venue cards, transport/ticketing/service promotions, platform calendar blocks or general ecosystem marketing.

- `home-page.js`: Social Home composition and interactions.
- `home-page.css`: Social Home-owned responsive styles.
- `PAGE-SOCIAL-HOME-001.md`: current product specification and domain-boundary amendment.
- `HOME-CAROUSEL-REGISTRY.md`: active carousel inventory and ownership.

The current Social Home still has legacy `.global-*` selectors. This naming/cascade cleanup is not considered complete until root scoping and browser regression are verified.


The responsive rail geometry contract is tracked by `SOCIAL-HOME-GEOMETRY-004` in `home-page.css`; its values consume the shared page-gutter token without placing Social selectors in the platform mobile contract.
