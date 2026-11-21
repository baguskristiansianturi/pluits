# Legacy Database Schema Reference

This directory contains the historical SQL definitions formerly stored under `supabase/`.

**Status: ARCHIVE ONLY — NOT CONNECTED, NOT DEPLOYABLE, AND MUST NOT BE APPLIED TO ANY SUPABASE PROJECT.**

Purpose:
- Preserve unique historical domain rules while they are translated into PLUITS-owned PostgreSQL migrations.
- Provide traceability for schema, indexes, constraints, triggers, authorization policies, RPC behavior and storage rules.
- Support domain-by-domain parity reviews and regression test design.

Rules:
- The Go API and PostgreSQL migrations under `backend/` are the only active backend implementation.
- Never restore a Supabase SDK/client, Auth provider, database URL, Storage bucket, Realtime channel or Edge Function dependency.
- Do not bulk-run archived SQL on the new database. Translate and review each domain migration, remove provider-specific assumptions, and add tests before implementation.
- Do not delete this archive until every unique rule has been migrated or explicitly retired in the PLUITS domain migration register.
- This archive contains no live database credentials and is not a data backup.
