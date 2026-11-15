# PLUITS — Launch Readiness Audit

**Tanggal audit:** 15 November 2026  
**Scope release:** Social First Release (P0)  
**Environment:** GitHub Pages + Supabase project `ytndswhqxayqpftszwfh`  
**Decision:** **DEPLOYED, NOT YET ACCEPTED FOR PUBLIC LAUNCH**

## 1. Executive assessment

PLUITS has a working production deployment and a substantial Social Media foundation. The current frontend build and automated regression suite pass. The live database is active, all inspected public base tables have RLS enabled, private Storage buckets are in place, and the three public views use `security_invoker=true`.

That is not the same as launch acceptance. The release still lacks founder Android UAT, two-account authorization/Realtime tests, final legal policies, a review of existing public test-like content, and a controlled Auth security setting. Marketplace, Trip transactions and real-money wallet are not ready and must remain outside the launch promise.

**Recommended launch boundary:** launch only the Social First Release after the P0 gates in section 5 are closed. Do not announce the whole PLUITS ecosystem as fully operational.

## 2. Work completed in this audit

### Frontend integrity
- Removed synthetic recommendation people from the live Circle path.
- Removed fabricated Story cards from Circle.
- Removed local sample products from the Circle product shelf and replaced them with honest empty/error states.
- Removed the local showcase-product fallback from Marketplace product detail.
- Removed the hardcoded Top 10 Trending fallback. Top 10 now renders only from eligible live directory activity and is omitted when there are no real ranking rows.
- Added regression coverage for real-only Circle content, live-only Top 10, published Marketplace product detail, permission isolation and SDK pinning.
- Pinned the browser Supabase SDK to `@supabase/supabase-js@2.119.0`. It is still loaded from esm.sh at runtime, not bundled into the application.

### Database authorization
- Applied migration `20261115122348_enforce_marketplace_order_payment_read_permissions`.
- Marketplace orders are readable by the buyer or store members with `orders.manage` / `payments.manage`.
- Payment metadata is readable by the buyer or store members with `payments.manage`.
- This removes the prior behavior where any active store member could read order/payment rows regardless of the role permission matrix.
- Live policy inspection confirms the two policies call `private.has_store_permission`.
- No user account, post, message, media, order or payment row was deleted or rewritten.

### Deployment evidence
- Verified commit: `8f4245bcf5ff158ade4e04dbeafbd44e61c925cb`.
- GitHub Actions run: `43713663249` (#2176), SUCCESS.
- Automated tests: **148 passed, 0 failed**.
- Vite production build: SUCCESS.
- Build-output verification: SUCCESS.
- Pages artifact upload and GitHub Pages deployment: SUCCESS.
- Android UAT and founder acceptance: NOT TESTED / PENDING.

## 3. Current live Supabase snapshot

| Area | Verified state |
|---|---|
| Project | ACTIVE_HEALTHY |
| PostgreSQL | 17.11.0.018 |
| Region | ap-southeast-1 |
| Public base tables | 69 |
| RLS | 69/69 tables enabled |
| Public views | 3/3 use `security_invoker=true` |
| Storage | 3/3 buckets private |
| Edge Functions | 0 deployed |
| Live migrations | 106 |
| Health Advisor | 0 lints |

### Security Advisor
- 22 warnings for authenticated-callable `SECURITY DEFINER` RPCs.
- 1 warning: leaked-password protection is disabled.
- Current privilege inspection found no anonymous EXECUTE grants for the reviewed public SECURITY DEFINER functions. The warning count is not proof of exploitability, but every function still needs body, search_path, authz, validation and negative-test review.
- Leaked-password protection must be enabled through a controlled Supabase Auth security change before public launch.

### Performance Advisor
- 2 auth RLS init-plan warnings.
- 2 multiple-permissive-policy warnings.
- 1 unindexed foreign-key INFO notice.
- 87 unused-index INFO notices.
- Do not drop unused indexes without workload evidence.

### Migration parity — operational blocker
- Repository `supabase/migrations/`: 99 SQL files.
- Live migration history: 106 entries.
- Exact version + name matches: 56.
- Same name but different timestamp prefix: 20.
- Live migration names with no exact repository filename: 30.
- Repository migration filenames not represented by an exact live migration name: 23.

The 15 November Marketplace policy migration has an exact matching version/name/file. Older migration parity is not clean. **Do not run `supabase db push`, migration replay, reset or bulk repair** until every live migration is reconciled against `supabase_migrations.schema_migrations.statements` and a reviewed recovery plan is prepared. Never delete or rewrite applied migration history.

## 4. Production data integrity review

Current counts and status:
- 3 public profiles.
- 5 public/published posts under one profile; some captions are empty or appear test-like.
- 1 Story exists but is expired and private.
- 1 store is draft/unverified with online sales disabled.
- 1 product is draft.
- 0 Marketplace orders.
- 0 Marketplace payment records.
- 0 Trip service requests.
- 1 public/published blog post.

The five public posts need an owner decision before launch. No account or post was changed. Do not delete or privatize existing user content without the owner's explicit confirmation.

The draft store/product are not eligible for the public catalog under the current published/verified filters. Marketplace and Trip therefore have no evidence of real transaction readiness.

## 5. Launch blockers and release gates

### P0 — must close before Social First Release public launch
1. **Founder Android UAT:** real photo/video selection, upload, progress, playback, refresh persistence, failure/retry and media cleanup.
2. **Two-account tests:** public/private profile, posts and media; follow/private follow; block/report; comments; DM membership; notification recipient scope; RLS negative tests.
3. **DM reconnect:** realtime delivery, offline outbox, reconnect and exactly-once behavior.
4. **Existing public content review:** confirm whether the five public/published posts are genuine and should remain public. No data mutation until confirmed.
5. **Auth security:** enable leaked-password protection in Supabase Auth and test sign-up/password-change behavior.
6. **Legal publication gate:** Privacy Policy, Terms and Community Guidelines are currently internal drafts marked NOT PUBLISHED / LEGAL REVIEW REQUIRED. Reconcile the data inventory, retention, user rights, operator identity, age/jurisdiction rules and moderation commitments; obtain appropriate legal review before publishing final terms.
7. **Founder acceptance:** record device/browser, test steps, expected/actual result and explicit ACCEPTED status.

### P1 — close or clearly label before broader promotion
- Verify global unread notification badge, notification routing/deep links and announcement recipient targeting.
- Verify SMS provider for phone OTP and TOTP enrollment/verification; otherwise label unavailable.
- Complete English translation before claiming a fully bilingual experience.
- Define and staff human moderation/appeal operations. No AI moderation pipeline is currently evidenced as active.
- Measure responsive behavior, accessibility, upload/playback performance and error rates across the device matrix.
- Verify backup/PITR, recovery, monitoring, incident response, rate limits and operational support coverage.

### Not launch-ready / outside current P0
- Marketplace: no real orders/payment records; staff permission management and transaction UAT are incomplete.
- Trip: no service requests; provider workflow and UAT are incomplete.
- Wallet: account/request scaffold only; no production ledger, settlement, payout or reconciliation.
- External email/SMS automations: no Edge Functions are deployed; do not promise workflows that have not been configured and tested.

## 6. Rollback and operational safety

The Marketplace read-policy migration changes authorization policies only; it does not alter data or table structure. Emergency rollback would restore the previous buyer-or-active-store-member read behavior. That rollback would weaken least privilege by allowing active catalog/general staff to read order/payment data. It must require explicit approval and should not be used as a routine workaround.

No rollback was executed. No user content was deleted or rewritten.

## 7. Final release classification

| Dimension | Status |
|---|---|
| Frontend implementation | IMPLEMENTED |
| Exact verified commit deployment | DEPLOYED |
| Automated regression/build | TESTED — 148/148 |
| Supabase metadata and advisor inspection | TESTED |
| Two-account authorization/Realtime | NOT TESTED |
| Android real-device UAT | NOT TESTED |
| Legal policies | BLOCKED — internal draft |
| Existing public content review | PENDING OWNER DECISION |
| Founder acceptance | PENDING |
| Social First Release public launch | **NOT YET ACCEPTED** |
| Full Marketplace / Trip / wallet launch | **NOT READY** |

**Next sequence:** owner review of existing public content → enable Auth leaked-password protection → run Android and two-account UAT → close migration parity before any future CLI DDL → finalize legal documents and moderation operations → founder acceptance → Social First Release launch.
