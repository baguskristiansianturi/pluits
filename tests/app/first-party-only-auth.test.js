import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('browser bootstrap has no Supabase or synthetic authentication fallback', async () => {
  const main = await readFile(new URL('../../src/main.js', import.meta.url), 'utf8');
  const runtime = await readFile(new URL('../../src/config/runtime.js', import.meta.url), 'utf8');
  assert.match(main, /createFirstPartyAuthService/);
  assert.doesNotMatch(main, /supabase|local-demo|pluits-demo/i);
  assert.match(runtime, /VITE_AUTH_PROVIDER \|\| 'first-party'/);
});
