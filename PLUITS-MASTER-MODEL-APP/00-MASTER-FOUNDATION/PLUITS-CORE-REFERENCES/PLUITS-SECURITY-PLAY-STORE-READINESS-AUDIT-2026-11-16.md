# PLUITS — Security & Google Play Readiness Audit
**Review date:** 16 November 2026  
**Scope:** Read-only checkpoint of GitHub `main` and live Supabase project `ytndswhqxayqpftszwfh`.  
**Status:** Initial audit completed; **NOT production-ready / NOT Play Store submission-ready**. No database, Auth, Storage, application, or deployment settings were changed during this review.

## Executive summary

The platform has several sound security foundations, but release blockers remain in account/data governance and migration provenance.

| Area | Verified state | Assessment |
|---|---|---|
| Public database tables | 72 tables; all 72 have RLS enabled | Positive baseline; policy correctness still needs actor-based tests |
| Forced RLS | 0 tables | Review table-owner/service-role access assumptions; not automatically a vulnerability |
| Supabase Security Advisor | 21 authenticated-callable SECURITY DEFINER warnings; 1 leaked-password-protection warning | Must review and test before production |
| Storage | 3 buckets; all private | Positive baseline; policies are complex and need adversarial tests |
| Edge Functions | 0 deployed | No Edge Function attack surface observed; client-side workflows still require review |
| Client Supabase credentials | Browser uses publishable key; repository search found no `service_role` literal | Positive; repository text search is not a complete secret scan |
| Account security UI | Password update and TOTP MFA enrollment/verification exist | Positive; MFA is optional and no enforcement policy was verified |
| Privacy policy / account deletion | No dedicated policy or account-deletion route/file found in the inspected repository paths/searches | **Play Store blocker** until implemented and published |
| Migration provenance | 113 SQL migration files in GitHub vs 120 live migration records; exact version/name reconciliation shows drift | **Critical release blocker**; do not reset or replay production migrations |

## Findings and required actions

### P0 — Migration history is not reconciled
- GitHub `main` contains 113 files under `supabase/migrations/`; live Supabase records 120 migration entries.
- A comparison by exact migration version shows substantial divergence in version identifiers and names. Some appear to be timestamp/name variants of similar changes, but that is not proof that the SQL is identical.
- **Action:** recover/verify the exact SQL for every live migration, build a signed-off manifest mapping live version → repository file → SQL checksum, and retain a backup. Do not run `db reset`, replay migrations, or apply guessed replacements to production.

### P0 — Privacy policy and account deletion are not evidenced
- No dedicated public privacy-policy page/document or account-deletion flow was found in the inspected repository paths and code searches.
- Google Play requires an active, publicly accessible privacy-policy URL and, where users can create accounts, an in-app account deletion path plus a web resource for requesting deletion. Data Safety declarations must accurately cover PLUITS and its SDKs/processors.
- **Action:** publish a PLUITS-specific privacy policy; add authenticated in-app account deletion with re-authentication/confirmation, data deletion or legally justified retention handling, and a public web deletion-request page. Document retention, backups, moderation/legal holds, and third-party processing.

### P1 — 21 authenticated-callable SECURITY DEFINER RPCs
Supabase Security Advisor reports 21 public functions callable by the `authenticated` role as `SECURITY DEFINER`. The functions include account blocking, Inbox conversation creation, marketplace orders/payments/fulfillment, trip requests, store/profile submission and moderation review.

- This warning is not proof of an exploit. Several functions do perform `auth.uid()` and resource/role checks; some review functions check `auth.jwt()->'app_metadata'->>'role'`.
- Anonymous execution was false for the inspected functions. All 21 remain callable by signed-in users, so each function body is a privileged authorization boundary.
- One additional SECURITY DEFINER trigger function is not exposed as an authenticated RPC and is not part of the 21 Advisor findings.
- **Action:** perform per-function authorization review and negative tests (anonymous, unrelated authenticated user, owner/member, buyer/provider, moderator/admin). Confirm fixed search paths and fully qualified object references. Revoke client EXECUTE only where the function is not intended as a client RPC. Do not bulk-convert these functions to SECURITY INVOKER.

### P1 — Leaked-password protection is disabled
- Supabase Auth Advisor reports leaked-password protection disabled.
- **Action:** enable leaked-password protection in Supabase Auth password/security settings before public onboarding. Verify password length/strength, email confirmation, reset flow, rate limits, session expiry/revocation, and MFA policy.

### P1 — RLS is enabled but authorization coverage is incomplete
- All 72 public tables have RLS enabled; no public base table without RLS was found.
- No table has FORCE ROW LEVEL SECURITY enabled. Table owners and privileged roles can bypass ordinary RLS; verify that all application paths use the intended role and that privileged credentials never reach clients.
- **Action:** test policies as anonymous, account A, account B, owner, staff, buyer, provider, moderator, and admin. Include cross-user and cross-store IDOR probes for SELECT/INSERT/UPDATE/DELETE, views, RPCs, and Realtime. Review views for `security_invoker` behavior.

### P1 — Private Storage buckets need full adversarial tests
Live buckets:
- `pluits-store-media`: private, 10 MiB limit, JPEG/PNG/WebP.
- `pluits-user-media`: private, 50 MiB limit, image and video MIME allowlist.
- `pluits-message-media`: private, 20 MiB limit, audio/image/document MIME allowlist.

Storage policies constrain uploads and reads by user folder, store permissions, conversation membership, or public published-content references. Two overlapping owner-folder upload/update/delete policy families exist for `pluits-user-media`; they appear similarly restrictive but should be consolidated only after regression tests.
- **Action:** test guessed object paths, cross-user reads, cross-conversation reads, revoked membership, deleted messages, private posts/stories, unpublished products, and signed URL expiry. Verify server-side MIME/content validation; MIME allowlists alone do not prove file contents are safe.

### P2 — MFA is available but not enforced
The account security page supports TOTP enrollment, challenge/verification, and unenrollment. No evidence was found in this review that MFA is required for administrators, moderators, or store owners.
- **Action:** consider mandatory MFA for privileged roles and step-up verification for sensitive account/payment/security actions.

### P2 — Performance and operational hardening
Supabase Performance Advisor also reports two unindexed foreign keys and two RLS init-plan warnings, plus unused-index notices. Unused-index warnings are informational on a low-traffic database; do not delete indexes without workload evidence.
- **Action:** add the missing FK indexes where query plans justify them; optimize the two RLS policies using cached `(select auth.uid())` patterns; re-run advisors after changes.

## Google Play release checklist

1. Privacy policy URL, in-app account deletion, and public deletion-request URL.
2. Accurate Data Safety form covering PLUITS data flows, Supabase, analytics/ads (if any), embedded WebViews, and every third-party SDK.
3. Play Console app-access instructions and stable reviewer/demo account for gated features.
4. Content rating, target audience, ads declaration, permissions declaration, and store listing assets.
5. Android app must provide a stable, useful experience; a thin website wrapper alone may be rejected for limited functionality/quality.
6. Test crashes, network loss/reconnect, authentication, session expiry, notifications, media upload/playback, chat privacy, deep links, back navigation, and small-screen layouts on real devices.
7. For new personal developer accounts created after 13 November 2023, complete the required closed test with at least 12 opted-in testers continuously for 14 days before applying for production access.
8. Review Google Play pre-launch report and resolve critical crashes/compatibility findings. This is not a substitute for a penetration test.

## Verification boundaries

- This was a read-only review of live metadata, advisor findings, selected function definitions, Storage policies, repository paths, and selected source files.
- No authenticated multi-account penetration test, browser automation, Android device test, malware scan of uploaded files, full secret scanner, legal review, or external penetration test was performed.
- Google Play's review is not a guarantee that the app is free of vulnerabilities; PLUITS should commission an independent security assessment before handling meaningful user/payment data.
- Do not describe PLUITS as secure, audited, or Play Store-ready until the P0/P1 findings and test evidence above are closed.

## Recommended execution order

1. Reconcile and checksum the 120 live migrations against repository history (no production replay).
2. Implement privacy policy and account deletion end-to-end.
3. Enable leaked-password protection and review Auth configuration.
4. Complete the 21-RPC authorization matrix and cross-account RLS/Storage tests.
5. Fix verified issues in small migrations with rollback plans; re-run Supabase advisors.
6. Run full application tests, build, browser UAT, and Android closed testing.
7. Complete Play Console declarations and submit only after the release gate is signed off.
