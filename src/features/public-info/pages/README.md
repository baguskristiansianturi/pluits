# Public Information Page Modules

This folder is the page-content owner for public informational routes linked from the PLUITS website footer.

## Ownership map

- `company/` — About PLUITS.
- `support/` — Help Center, FAQ, Contact, Account Deletion information, Safety, and Complaints.
- `community/` — Community Guidelines.
- `marketplace/` — Marketplace overview, seller terms, payment, refund/cancellation, shipping, and prohibited-products information.
- `privacy/` — Cookie policy and privacy choices information.
- `index.js` — explicit registry joining the page groups. It does not own page copy or render markup.

Legal Terms and Privacy are owned separately by `src/features/legal/` because they are policy documents with their own structured section navigation and draft disclosures.

## Page contract

Each page record exports:
- `title`
- `intro`
- `status`
- `sections` as ordered heading/body pairs

The shared page frame, header, footer, typography and scoped styles remain in `../public-info-page.js` and `../public-info-page.css`. Do not duplicate shared shell code or copy styles into each content module.

## URL and route ownership

Canonical route names and clean URL slugs live in `src/config/paths.js`. Route parsing and authentication guards live in `src/app/routes.js`. Page dispatch lives in `src/app/create-app.js`. The production build creates a static `index.html` entry point for every route so GitHub Pages supports direct URL access and refresh.

## Adding or changing a page

1. Add the page content to the correct domain folder.
2. Register it in that folder's `index.js` export and the parent `pages/index.js` registry.
3. Add or update its route in `src/config/paths.js` and dispatch in `src/app/create-app.js` when it is a new page.
4. Add its footer destination in `public-footer.js` only if it belongs in the footer.
5. Add direct-load and content-presence tests.
6. Run `npm test` and `npm run build`; verify the generated route directory and direct page URL.
7. Keep legal, payment, support, privacy and account-deletion claims truthful about what is actually operational.

Do not create a new global `src/pages/` folder. Pages remain inside their owning feature module, consistent with the PLUITS frontend module boundaries.
