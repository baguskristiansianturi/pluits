import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const bootstrap = await readFile(new URL('../../src/main.js', import.meta.url), 'utf8');
const adapter = await readFile(new URL('../../src/services/auth/first-party-auth-service.js', import.meta.url), 'utf8');

test('browser identity bootstrap is owned by the PLUITS first-party API', () => {
  assert.match(bootstrap, /createFirstPartyAuthService/);
  assert.doesNotMatch(bootstrap, /local-demo|pluits-demo/i);
});

test('registration delegates profile and workspace creation to the Go identity API', () => {
  assert.match(adapter, /\/v1\/identity\/register/);
  assert.match(adapter, /display_name/);
  assert.match(adapter, /terms_accepted/);
  assert.doesNotMatch(adapter, /\.from\(/);
});
