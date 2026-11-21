import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const compose = await readFile(new URL('../../backend/compose.yaml', import.meta.url), 'utf8');
const caddy = await readFile(new URL('../../backend/infra/Caddyfile', import.meta.url), 'utf8');
const backup = await readFile(new URL('../../backend/infra/backup/backup-loop.sh', import.meta.url), 'utf8');
const runtime = await readFile(new URL('../../src/config/runtime.js', import.meta.url), 'utf8');

test('only the HTTPS edge publishes public ports', () => {
  assert.match(compose, /edge:\s*\n[\s\S]*?ports:\s*\n\s*- "80:80"\s*\n\s*- "443:443"/);
  assert.doesNotMatch(compose.match(/database:[\s\S]*?(?=\n  migrate:)/)?.[0] || '', /ports:/);
  assert.doesNotMatch(compose.match(/api:[\s\S]*?(?=\n  email-worker:)/)?.[0] || '', /ports:/);
  assert.match(compose, /data:\s*\n\s*internal: true/);
});

test('Caddy is the HTTPS reverse proxy for the private Go API', () => {
  assert.match(caddy, /reverse_proxy api:8080/);
  assert.match(caddy, /Strict-Transport-Security/);
});

test('database backups are encrypted before being written to persistent storage', () => {
  assert.match(backup, /pg_dump --format=custom/);
  assert.match(backup, /age --encrypt --recipient/);
  assert.match(backup, /sha256sum/);
  assert.match(backup, /PLUITS_BACKUP_RETENTION_DAYS/);
});

test('browser auth is fixed to the PLUITS first-party adapter', () => {
  assert.match(runtime, /AUTH_PROVIDER = 'first-party'/);
  assert.doesNotMatch(runtime, /VITE_AUTH_PROVIDER/);
});
