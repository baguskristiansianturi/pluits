# Account stylesheet slices

The former `user-account.css` file was split into ordered, page-owned slices without changing selector text or rule order.

## Import order
1. `01-account-shell-and-settings.css`
2. `02-profile-and-social-controls.css`
3. `03-feed-and-media-layout.css`
4. `04-profile-and-post-overrides.css`
5. `05-creation-studio.css`
6. `06-circle-home-discovery.css`
7. `07-top-ten-and-content-shelves.css`
8. `08-nearby-and-feed-overrides.css`

## Important
- `user-account.css` is the sole aggregator and must keep this order.
- The split is mechanical: all original CSS bytes and declaration order are preserved.
- These files are still legacy Account-page slices, not yet fully independent feature stylesheets.
- Do not move selectors or change values during a slice-only extraction.
- A future semantic migration must map each selector to its page/feature owner, update imports and CSS boundary checks, and test every affected route.
