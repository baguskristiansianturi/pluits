# Platform Wrapper & User Journeys

Khusus aplikasi utama PLUITS sebagai pembungkus/portal ekosistem: homepage utama, global navigation, app launcher, account/membership, notifikasi lintas aplikasi, deep links dan journey lintas aplikasi. Homepage wrapper tidak menggantikan homepage internal tiap aplikasi.

## Global Home
- Public visitor page: `PAGE-GLOBAL-HOME-PUBLIC`, route `#/home`, layout `LAY-GLOBAL-HOME-001`.
- The page introduces the platform, previews ecosystem domains, explains the single-identity direction, and provides login/registration entry points.
- Ecosystem cards and Android availability must reflect actual release state. Do not claim planned services are live or invent a Google Play listing.
- Authenticated Global Home is a separate state and remains pending. Until implemented and accepted, authenticated requests to `#/home` return to the current internal development workspace.
- See [Public Global Homepage](./PAGE-GLOBAL-HOME-PUBLIC.md) for content order, responsive rules, dependencies, change impact and validation status.
