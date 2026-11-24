# Social Feed

Owner: Social Media domain.

- `social-post-card.js`: post-card rendering, illustrative fixtures, and user interaction handlers.
- `social-post-card.css`: Feed card presentation owned by the Feed surface.

Feed is an aggregation/distribution surface. It may display approved read models from Blog, Reels, Stories and Live, but it does not own their draft, publishing, expiry, media processing or live-session lifecycles. Interactions that affect another content module must call that module's documented contract.
