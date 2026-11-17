# Frontend V2 Tests

- auth-service.test.js: Auth service contract and validation.
- routes.test.js: Route resolution and session guard behavior.
- verify-architecture.mjs: module ownership and dependency direction.
- verify-production-surface.mjs: browser-secret and deployment-gate checks.

Browser/device UAT is still required after deployment. Automated Node tests do not prove that Supabase SMTP, Auth redirect configuration, or real-account login works on a phone.
