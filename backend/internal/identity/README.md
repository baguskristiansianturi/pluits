# First-party identity security primitives

Implemented building blocks:
- Argon2id password hashing with per-hash parameter encoding and bounded verification parameters.
- 32-byte cryptographically random opaque tokens; persist only their SHA-256 hashes.
- AES-256-GCM encryption for short-lived secrets placed in the asynchronous email outbox.
- PostgreSQL outbox migration stores encrypted payloads, delivery state and retry metadata, not plaintext verification tokens.

Security boundaries:
- The 32-byte outbox encryption key must be supplied through deployment secret configuration and must never be committed or stored in PostgreSQL.
- Key rotation must retain the key version needed to decrypt pending messages until they are delivered or expired.
- Raw verification tokens must never appear in API responses, logs, analytics or error messages.
- Email delivery worker, provider adapter, account registration/verification handlers, session rotation and recovery flows are not yet implemented. Do not enable account creation in production until these are completed and tested end-to-end.
- Rate limiting must be shared across API instances before public exposure.
