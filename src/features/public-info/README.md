# Public Information Pages

Owner: `src/features/public-info/`.

## Purpose
Owns the public informational pages, Help Center entry points, Marketplace information pages, and the shared public website footer configuration.

## Files
- `public-footer.js` — the single footer navigation configuration used by the public homepage, account pages, Terms, Privacy, and public information pages. It calls the canonical `renderPageFooter()` renderer and appends the planned payment-method labels.
- `public-info-page.js` — content and mount function for public information routes.
- `public-info-page.css` — page-local content styling only.

## Route ownership
Routes are registered in `src/config/paths.js` and dispatched by `src/app/create-app.js`. Route path slugs may be hyphenated; `src/app/routes.js` maps canonical paths back to route keys.

## Content truthfulness
- Informational pages may describe the product direction in ordinary language.
- Legal, marketplace, payment, refund, seller and cookie policies remain clearly marked as drafts or preparation until their content is verified, approved and operationally supported.
- The account deletion page is currently an informational preparation page, not a functioning deletion request form. Do not represent it as App Store / Google Play ready.
- Contact details must not be invented. The Contact page must be updated with real, monitored channels before release.
- Midtrans is the planned payment provider only. Footer methods are forward-looking; activation and eligibility must be confirmed for the PLUITS merchant account.
- Do not claim escrow, buyer protection, guaranteed refunds, verification, moderation SLAs, or other controls unless implemented and verified.

## Shared design boundaries
Use `renderBrand()`, `renderPageFooter()`, shared page-shell CSS and design tokens. Do not redefine header/footer geometry or introduce a parallel design system. Social app surfaces intentionally retain their native app navigation and do not receive the public website footer.

## Validation
Run `npm test` and `npm run build`. Check every public route on mobile and desktop, verify all footer links, verify public accessibility without authentication, and ensure Social/dashboard/authenticated route behavior is unchanged.
