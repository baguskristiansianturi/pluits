# PLUITS — Android & iOS App Store Release Package

Status: PREPARATION / RELEASE BLOCKERS TRACKED
Updated: 19 November 2026
Owner: PLUITS product and engineering

This document is the release source of truth for preparing the existing PLUITS web product for Android Google Play and Apple App Store distribution. A checklist item is not complete merely because a placeholder or document exists. Evidence, implementation, testing, and operational ownership are required.

## 1. Product identity — decisions required before store submission

| Field | Current decision |
|---|---|
| Product name | PLUITS |
| Public website | https://baguskristiansianturi.github.io/pluits/ |
| Public logo | Existing PLUITS brand asset; preserve the current brand mark |
| Android application ID | NOT DECIDED — reserve a permanent reverse-domain ID before first production build |
| iOS Bundle ID | NOT DECIDED — reserve a permanent identifier in Apple Developer |
| Developer / legal operator | NOT CONFIRMED — must match store account and policy disclosures |
| Support URL | PREPARATION — Help/Contact pages exist, but no verified monitored support channel is published |
| Privacy URL | DRAFT — public route exists; content awaits data inventory and legal review |
| Terms URL | DRAFT — public route exists; content awaits operator and legal review |
| Account deletion URL | NOT FUNCTIONAL — informational page only; external request workflow must be built |
| Store availability | Not published; footer labels remain Coming Soon |

Do not guess or reserve an application identifier based on a temporary assumption. Once selected, keep it stable across signing, build pipelines, store records, deep links, and release documentation.

## 2. Public website URLs

Current public route inventory:
- About: `#/about`
- Help Center: `#/help`
- FAQ: `#/faq`
- Contact: `#/contact`
- Safety: `#/safety`
- Terms: `#/terms`
- Privacy: `#/privacy`
- Community Guidelines: `#/guidelines`
- Account deletion information: `#/account-deletion`
- Privacy choices: `#/privacy-choices`
- Complaints: `#/complaints`
- Marketplace policies: `#/marketplace-info`, `#/seller-terms`, `#/payment-policy`, `#/refund-policy`, `#/shipping-policy`, `#/prohibited-items`

The current website is a hash-routed static frontend. For store submission, verify that each submitted URL is reachable over HTTPS without login, renders correctly in an external browser, and can be opened by store reviewers. Prefer stable canonical URLs with server-side or static route fallback if the platform requires conventional paths. A hash route must not be assumed to satisfy a form that expects a standalone public URL without testing it in the relevant console.

## 3. Android release package

### Identity and build
- [ ] Confirm permanent Android applicationId / package name.
- [ ] Configure release signing key and secure backup/ownership process; never commit private signing material.
- [ ] Configure versionCode and user-facing versionName.
- [ ] Produce signed Android App Bundle (AAB) for production.
- [ ] Configure supported Android API level, device compatibility, architecture, and permissions based on actual app requirements.
- [ ] Verify deep links, authentication redirect, password reset, and external browser return paths.
- [ ] Test install, update, upgrade, sign-in, sign-out, offline/poor network, and uninstall/reinstall flows.

### Store listing assets
- [ ] App name and short description.
- [ ] Full description and category.
- [ ] High-resolution app icon following current Play Console specifications.
- [ ] Phone screenshots captured from the real release candidate.
- [ ] Tablet screenshots only if tablet support is declared.
- [ ] Feature graphic following current Play Console specifications.
- [ ] Support website, privacy URL, and developer contact details.
- [ ] Localized listing text and screenshots for every language actually supported.
- [ ] No mock feature, fake review, unimplemented screen, or Coming Soon claim presented as available functionality.

### Policy and review declarations
- [ ] Privacy policy and Data safety form match app code, backend, analytics, and every SDK/vendor.
- [ ] Account creation, account deletion, data deletion, and retention disclosures match real behavior.
- [ ] Complete App content, target audience, ads, content rating, app access, and sensitive-permission declarations.
- [ ] Reviewer access instructions and test credentials are valid, monitored, and do not expose production user data.
- [ ] Complete required testing tracks and any account-specific testing requirements shown in Play Console.
- [ ] Review current Google Play policy and target API requirements immediately before submission.

## 4. iOS release package

### Identity and build
- [ ] Confirm permanent Bundle ID and register it in Apple Developer.
- [ ] Configure signing certificates, provisioning profiles, and App Store Connect app record.
- [ ] Configure version and build number.
- [ ] Produce an archive and signed release build using supported Apple tooling.
- [ ] Verify required device families and orientations.
- [ ] Test universal links/deep links, authentication, password reset, privacy permissions, and external browser return.
- [ ] Test install, update, sign-in, sign-out, network failure, and account deletion.

### Store listing assets
- [ ] App name, subtitle, description, keywords, category, and support URL.
- [ ] App icon matching current Apple asset requirements.
- [ ] Actual iPhone screenshots for the device sizes required by App Store Connect.
- [ ] iPad screenshots only if iPad is supported/listed.
- [ ] Privacy Policy URL and App Privacy disclosures.
- [ ] Age rating, copyright, seller/developer identity, and review notes.
- [ ] Localized listing metadata only for supported languages.
- [ ] No placeholder, dead link, fake feature, or misleading Coming Soon content in the submitted build.

### Review declarations and functionality
- [ ] Account deletion can be initiated from inside the app.
- [ ] Privacy labels match app code, backend, and third-party SDK behavior.
- [ ] Reviewer can access all relevant account-based features through a working demo account or demo mode.
- [ ] Permission prompts explain why the feature needs the permission.
- [ ] User-generated content has effective objectionable-content controls, reporting, blocking, and a moderation response process.
- [ ] Payment treatment is reviewed separately for digital goods/features/subscriptions versus physical goods and real-world services.
- [ ] Current App Review Guidelines and platform-specific requirements are checked before submission.

## 5. Shared product requirements

| Area | Required release evidence |
|---|---|
| Authentication | Registration, verification, login, recovery, logout, expired session and error states tested |
| Account deletion | In-app initiation, external web request, identity verification, deletion across associated records/media, lawful retention explanation, completion notification |
| Privacy | Data inventory, purposes, vendors, retention, security controls, user rights, privacy contact, final approved policy |
| UGC / Social | Content filtering, report content/user, block user, moderation workflow, appeal/feedback where offered |
| Support | Public support URL, monitored channel, ownership, intake process, and realistic response expectations |
| Marketplace | Merchant terms, prohibited products, payment/settlement, cancellation/refund, delivery, disputes and buyer/seller responsibilities |
| Permissions | Every camera, photo, microphone, location, notification, and tracking permission justified by a real feature |
| Reliability | Crash/error monitoring, graceful network failures, accessibility, responsive UI, performance and release rollback plan |
| Security | RLS review, storage access, secret handling, dependency review, abuse controls and incident response |

## 6. Current PLUITS status

### Prepared in repository
- Shared public footer with About, Help, FAQ, Contact, Safety, legal, account-deletion, privacy, and marketplace navigation.
- Public information routes and policy routes.
- Structured Terms and Privacy draft pages with section navigation and visible draft warnings.
- Existing public app-store badges showing Coming Soon.

### Still blocking a store submission
1. Confirm legal operator identity and official contact details.
2. Audit actual data processing across frontend, Supabase Auth/database/storage, edge functions, logs, analytics, and third-party SDKs.
3. Finalize and legally review Privacy Policy, Terms, Community Guidelines, and marketplace terms.
4. Implement in-app and external account deletion end to end; informational text is not sufficient.
5. Implement and operationalize user-generated-content reporting, blocking, moderation, and support workflows.
6. Publish monitored support contact and test the full support intake.
7. Decide permanent Android applicationId and iOS Bundle ID.
8. Build native app packages, signing, store metadata, screenshots, and reviewer access.
9. Complete Google Play Data safety and Apple App Privacy declarations from the verified data map.
10. Complete platform testing, release review, and store submission.

## 7. Asset planning

Create and maintain source assets in a dedicated release directory only after the actual native app identity and target device support are confirmed. Do not generate store screenshots from marketing mockups; capture them from the real release candidate.

Required asset families:
- App icon source master and platform exports.
- Android feature graphic.
- Android phone screenshots.
- iPhone screenshots.
- iPad screenshots if supported.
- Optional promotional video only if the team can maintain accurate current footage.
- Store listing copy and localization source files.

Always re-check the current official pixel dimensions, file formats, transparency rules, screenshot device slots, and upload limits in Play Console and App Store Connect at the time of export. Platform specifications can change; do not hard-code stale dimensions into the product design system.

## 8. Official references

- Google Play app preparation: https://support.google.com/googleplay/android-developer/answer/9859455
- Google Play User Data / Data safety: https://support.google.com/googleplay/android-developer/answer/10144311
- Google Play account deletion: https://support.google.com/googleplay/android-developer/answer/13327111
- Apple App Review Guidelines: https://developer.apple.com/app-store/review/guidelines/
- Apple App Privacy: https://developer.apple.com/app-store/app-privacy-details/
- Apple account deletion guidance: https://developer.apple.com/support/offering-account-deletion-in-your-app/
- Apple App Store Connect: https://appstoreconnect.apple.com/

## 9. Release status vocabulary

Track each requirement independently as NOT_STARTED, IN_PROGRESS, IMPLEMENTED, TESTED, APPROVED, or BLOCKED. Mark a release gate complete only when evidence is linked. A route loading is not proof that a support service, deletion process, policy, or store requirement is ready.
