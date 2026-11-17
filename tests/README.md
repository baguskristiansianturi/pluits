# Frontend V2 Tests

- auth-service.test.js: Auth service contract and validation.
- routes.test.js: Route resolution and session guard behavior.
- scripts/verify-architecture.mjs: module ownership and dependency direction.
- scripts/verify-production-surface.mjs: browser-secret and deployment-gate checks.

Browser/device UAT is still required after deployment. Automated Node tests do not prove that Supabase SMTP, Auth redirect configuration, or real-account login works on a phone.

Additional retained backend and repository contract tests:
- app/marketplace-read-permissions.test.js
- app/post-moderation-guard.test.js
- app/moderation-report-action.test.js
- backend/media-storage-read-policy.test.js
- architecture/change-scope-checklist.test.js
- app/deployment-workflow.test.js
- app/pwa-manifest.test.js
- app/supabase-sdk-pinning.test.js
- app/signup-release-gate.test.js
- backend/auth-trigger-boundaries.test.js

Legacy frontend-only tests were removed with the legacy runtime. Database security/migration tests and repository governance checks are retained.

CI acceptance includes both new frontend tests and retained backend/security migration contracts; a passing build alone is not sufficient for user acceptance.
