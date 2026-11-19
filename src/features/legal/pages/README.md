# Legal Page Modules

Owner: `src/features/legal/pages/`.

- `terms/index.js` owns the Terms of Service content.
- `privacy/index.js` owns the Privacy Policy content.
- Parent `index.js` is the explicit registry consumed by the shared legal page renderer.

The shared page frame, section navigation, disclaimer, header/footer and styles remain in `../policy-page.js` and `../policy-page.css`. Do not duplicate those shared elements in page content modules.

Both documents remain drafts until the operator identity, contact details, data processing practices, operational capabilities and legal review are completed. Moving content into separate files does not approve either policy.
