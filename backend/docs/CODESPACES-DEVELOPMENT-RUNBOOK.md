# PLUITS Backend — GitHub Codespaces Development Runbook

Status: DEVELOPMENT ONLY. This environment is temporary and is not approved for real user accounts, production data, or public signup.

## Purpose

Run the existing Go API and PostgreSQL migrations from a browser-accessible development environment while the PLUITS frontend remains on GitHub Pages. No custom domain or paid hosting is required for this disposable development setup. It does not provision production infrastructure.

## Create the Codespace

1. Open https://github.com/codespaces while signed in to the GitHub account with access to this repository.
2. Choose **New codespace** and select `baguskristiansianturi/pluits`, branch `main`.
3. Keep the configured 2-core machine if offered. Codespaces usage is quota-limited; stop the Codespace when finished.
4. Wait for the dev container to finish creating. The setup runs `go test ./...` in `backend/`.
5. Open the integrated terminal.

## Initialize the disposable development database

From the repository root:

```sh
cd backend
DATABASE_URL='postgres://pluits:pluits_dev_only@database:5432/pluits?sslmode=disable' go run ./cmd/migrate -command=up
```

The PostgreSQL service is private to the Codespaces Docker network. Its named volume survives a container restart, but it is not a durable backup and can disappear when the Codespace is deleted or rebuilt.

## Run the API for health and integration development

From the repository root:

```sh
cd backend
DATABASE_URL='postgres://pluits:pluits_dev_only@database:5432/pluits?sslmode=disable' PORT=8080 go run ./cmd/api
```

Codespaces forwards port 8080 privately. Use the forwarded HTTPS URL to inspect:

- `/health/live`
- `/health/ready`

Keep port visibility set to **Private**. Do not change it to Public.

## Important limitations

- This is a disposable development environment, not production hosting.
- Do not store real user data, production credentials, or valuable account records here.
- The identity routes require separate encryption and rate-limit keys. They are intentionally not enabled by this base setup.
- Real registration also requires an SMTP STARTTLS sender and a persistent, backed-up database. Do not bypass email verification or expose verification tokens to create the first real account.
- Do not point the production GitHub Pages frontend at this temporary API until the identity release gates, CORS, SMTP delivery, persistence, backup/restore, and account-registration restrictions have been reviewed.
- Supabase is not used by this development environment or by the PLUITS target architecture.
- Stop the Codespace when finished to avoid consuming its monthly compute quota.

## Next release gate

After Codespaces health checks pass, complete the first-party identity configuration and one-account allowlist on a persistent PLUITS-controlled environment. Only then connect a controlled frontend preview and perform the first real registration.
