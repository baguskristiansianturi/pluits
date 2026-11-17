# Platform Wrapper & User Journeys

Khusus aplikasi utama PLUITS sebagai pembungkus/portal ekosistem: homepage utama, global navigation, app launcher, account/membership, notifikasi lintas aplikasi, deep links dan journey lintas aplikasi. Homepage wrapper tidak menggantikan homepage internal tiap aplikasi.

## Global Home
- Public visitor page: `PAGE-GLOBAL-HOME-PUBLIC`, route `#/home`, layout `LAY-GLOBAL-HOME-001`.
- The page introduces the platform, previews ecosystem domains, explains the single-identity direction, and provides login/registration entry points.
- Ecosystem cards and Android availability must reflect actual release state. Do not claim planned services are live or invent a Google Play listing.
- Authenticated Global Home: `PAGE-GLOBAL-HOME-AUTHENTICATED`, selected at the same `#/home` route whenever a valid session is active. It greets the active account and acts as the cross-ecosystem platform entry point; it is not Circle or the Social Media personal space.
- The internal development workspace remains a separate protected route and is not the authenticated Global Home.
- These are two content states of one Global Home route and implementation: one renderer, one feature stylesheet, and the same shared header/brand/shell. See [Public Global Homepage](./PAGE-GLOBAL-HOME-PUBLIC.md) and [Authenticated Global Home](./PAGE-GLOBAL-HOME-AUTHENTICATED.md) for state-specific content and validation contracts.
