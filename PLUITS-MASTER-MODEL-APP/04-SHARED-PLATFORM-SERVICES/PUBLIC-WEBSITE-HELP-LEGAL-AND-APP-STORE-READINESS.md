# Public Website, Help Center, Legal Pages & App Store Readiness

Status: PRODUCT / COMPLIANCE PREPARATION — not legal advice and not evidence of store approval.
Last updated: 19 November 2026.

## 1. Purpose and scope

This document is the source of truth for the public PLUITS website information architecture, footer navigation, public help and policy pages, and readiness work for Google Play and Apple App Store.

Public information pages must explain the service in ordinary language. They are not technical documentation. Internal implementation notes, API behavior, database policies, provider contracts, and reviewer-only instructions belong in internal documentation.

No page may claim that a feature, protection, payment channel, response time, verification, refund, or deletion workflow exists until its implementation and operational process have been verified.

## 2. Footer navigation taxonomy

The public footer uses five plain-link groups. No dropdown is required at this stage: the list is short enough to scan, works on mobile, and is accessible without interaction.

| Group | Public links | Purpose |
|---|---|---|
| PLUITS | Tentang PLUITS, Hubungi Kami, Masuk, Daftar | Company/service identity and account entry |
| Bantuan | Pusat Bantuan, Pertanyaan Umum, Keamanan & Keselamatan, Penghapusan Akun | User assistance and safety |
| Jelajahi | Beranda, Social, Discover, Marketplace | Main product areas |
| Marketplace | Cara Kerja Marketplace, Ketentuan Penjual, Pembayaran, Pembatalan & Pengembalian Dana, Pengiriman | Buyer and seller transaction information |
| Kebijakan | Ketentuan Layanan, Kebijakan Privasi, Pedoman Komunitas, Kebijakan Cookie | Terms, privacy and conduct rules |

The common public footer is rendered through the existing shared `renderPageFooter()` renderer via `src/features/public-info/public-footer.js`. The homepage and all public information pages must use this same footer configuration. Payment method labels remain in the existing footer below the link groups.

## 3. Public page inventory and status

| Page | Canonical route | Status / publication rule |
|---|---|---|
| Tentang PLUITS | `#/about` | Public informational page |
| Pusat Bantuan | `#/help` | Initial hub; expand as product journeys ship |
| Pertanyaan Umum | `#/faq` | Initial FAQ; review against actual behavior |
| Hubungi Kami | `#/contact` | In preparation; do not invent support contacts |
| Ketentuan Layanan | `#/terms` | Draft until operator identity, jurisdiction and product rules reviewed |
| Kebijakan Privasi | `#/privacy` | Draft until complete data inventory, vendors, retention and controls verified |
| Pedoman Komunitas | `#/guidelines` | Draft; moderation/report/appeal process must match implementation |
| Keamanan & Keselamatan | `#/safety` | Initial guidance; do not claim unimplemented reporting/SLA |
| Cara Kerja Marketplace | `#/marketplace-info` | Informational; distinguish available vs planned capabilities |
| Ketentuan Penjual | `#/seller-terms` | Draft until seller onboarding, settlement, fees and liability reviewed |
| Pembayaran | `#/payment-policy` | Planned methods only; payment not active until provider integration/activation |
| Pembatalan & Pengembalian Dana | `#/refund-policy` | Draft until cancellation/refund operations and provider flows are implemented |
| Pengiriman | `#/shipping-policy` | Draft until logistics providers, tracking and responsibilities are defined |
| Penghapusan Akun | `#/account-deletion` | Preparation page only; external request workflow and in-app deletion must be built |
| Pilihan Privasi | `#/privacy-choices` | Preparation page; data access/correction/deletion controls must be implemented |
| Pengaduan & Sengketa | `#/complaints` | Preparation page; staffed intake, case handling and escalation must be built |
| Kebijakan Produk | `#/prohibited-items` | Draft; prohibited/restricted categories and listing enforcement require legal and operational review |
| Kebijakan Cookie | `#/cookies` | Must be finalized only after auditing actual cookies, local storage and third-party scripts |

Do not hide draft status. Draft labels are not acceptable substitutes for final policies when submitting a public app-store release.

## 4. Page content standards

Every public page should have:
- A clear common-language title and short introduction.
- Plain, specific sections that answer user questions.
- Accurate status when a feature or policy is not final.
- Working links to relevant features and support.
- A last-updated date once content is governed and versioned.
- Consistent public footer and accessible mobile layout.

Policy pages must additionally identify the operating entity, effective date, version, scope, user rights/obligations, contact route, and change history. Legal policies require qualified legal review before being treated as binding.

## 5. Google Play readiness

Before release, complete and verify at least:
- Public HTTPS privacy-policy URL, accessible worldwide without sign-in or geofencing, and accessible from inside the app.
- Privacy policy names the app and developer/operator and accurately describes data collection, use, sharing, security, retention and deletion.
- Accurate Data safety declarations, including data handled by SDKs and third-party services.
- Account deletion initiation inside the app and a separate external web resource for account-deletion requests; explain lawful retention exceptions.
- App content declarations: ads, target audience, content rating, sensitive permissions and reviewer access where applicable.
- Accurate store listing, screenshots, app access instructions, and working support/contact information.
- Review all permissions against actual feature need and provide prominent disclosures/consent when required.

Official references:
- Google Play — Prepare your app for review: https://support.google.com/googleplay/android-developer/answer/9859455
- Google Play — User Data policy and Data safety: https://support.google.com/googleplay/android-developer/answer/10144311
- Google Play — Account deletion requirements: https://support.google.com/googleplay/android-developer/answer/13327111

## 5A. Midtrans payment-channel reference\n\nThe footer and payment information page must reflect the current official Midtrans catalogue, not a generic list copied from other gateways. The currently documented categories include Visa, Mastercard, JCB, American Express; Permata, BCA, BNI and BRI Virtual Accounts; Mandiri Bill Payment; GoPay, ShopeePay and QRIS; Indomaret, Alfamart, Alfamidi and DAN+DAN; and Akulaku / Kredivo cardless credit. OVO, DANA and LinkAja are listed as apps that can pay a QRIS transaction, not as separate direct e-wallet channels in the current Midtrans channel table.\n\nActivation, eligibility, fees, settlement, refunds and available methods must be confirmed in the PLUITS merchant account and signed agreement. The public footer is a forward-looking display until PLUITS has completed activation.\n\nOfficial references:\n- Midtrans — supported payment methods: https://docs.midtrans.com/docs/apa-saja-metode-pembayaran-yang-disediakan-oleh-midtrans\n- Midtrans — activating payment methods: https://docs.midtrans.com/docs/payment-methods\n- Midtrans — QRIS compatible apps: https://docs.midtrans.com/docs/apps-or-partners-that-can-be-used-for-paying-qris-transaction-in-midtrans\n\n## 6. Apple App Store readiness

Before release, complete and verify at least:
- Public privacy-policy URL in App Store Connect and an in-app path to the policy.
- Support URL with working and current support information.
- App Privacy details that match actual data collection and third-party SDK behavior.
- In-app account deletion initiation for apps that support account creation; a web link alone is not a substitute.
- Complete app metadata, age rating, screenshots, review notes, and a working demo account or full-featured demo mode for account-based features.
- All submitted URLs and app flows must be functional; remove placeholder or incomplete content before review.
- Review payment classification carefully: digital content, app features and subscriptions can be subject to store billing rules; physical goods and real-world services follow different rules and applicable exceptions.

Official references:
- Apple App Review Guidelines: https://developer.apple.com/app-store/review/guidelines/
- Apple App Privacy Details: https://developer.apple.com/app-store/app-privacy-details/
- Apple account deletion guidance: https://developer.apple.com/go/?id=ar-ad-support
- Google Play payments policy: https://support.google.com/googleplay/android-developer/answer/9858738

## 7. PLUITS-specific release blockers

These are not solved merely by creating web pages:
1. Confirm the legal operating entity, registered address and official support/privacy contacts.
2. Complete a data inventory from frontend, Supabase schema/RLS, edge functions, storage, analytics and SDKs.
3. Define data retention/deletion rules, backup behavior and legally required exceptions.
4. Build user-facing account deletion in the web/app account settings and external deletion request page; implement deletion across Auth, profile, content, media, messages, marketplace and related records.
5. Implement report, block, moderation, appeal and support handling before promising these processes.
6. Finalize marketplace merchant terms, product restrictions, payment settlement, fees, cancellations, refunds, disputes, delivery and consumer responsibilities.
7. Select and activate payment provider. Midtrans is the planned direction only; verify payment methods and settlement/refund capabilities against the signed merchant agreement and live account.
8. Determine whether any digital goods, subscriptions or paid app functionality are offered. Do not assume an external payment gateway can be used for every in-app purchase on iOS or Google Play.
9. Prepare store metadata, privacy labels/Data safety form, age/content ratings, reviewer credentials, support URLs and screenshots.
10. Perform legal review for Indonesia and other launch jurisdictions.

## 8. Ownership and source of truth

- Footer link taxonomy and public page content: `src/features/public-info/`.
- Canonical route names: `src/config/paths.js`.
- Route dispatch: `src/app/create-app.js`.
- Shared page chrome: `src/design-system/page-shell.js` and `page-shell.css`.
- This document governs page inventory, readiness status and release checklist.
- The older `PLUITS-SHARING-INBOX/.../HELP-CENTER-LEGAL-CONTENT-BLUEPRINT.md` remains historical input; update this canonical document when decisions change.

## 9. Release gate

A page is not READY merely because its route loads. Mark each item separately:
- CONTENT_APPROVED
- LEGAL_REVIEWED (where required)
- IMPLEMENTED
- TESTED
- DEPLOYED
- PUBLISHED

Never infer legal approval, functional account deletion, operational customer support, payment protection, or app-store acceptance from the existence of a page.
