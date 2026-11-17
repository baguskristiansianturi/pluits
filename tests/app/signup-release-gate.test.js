import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const runtime = await readFile(new URL('../../src/config/runtime.js', import.meta.url), 'utf8');
const authPage = await readFile(new URL('../../src/features/auth/auth-page.js', import.meta.url), 'utf8');

test('public signup is disabled by default and requires an explicit build flag', () => {
  assert.match(runtime, /VITE_PUBLIC_SIGNUP_ENABLED === 'true'/);
  assert.match(authPage, /if \(isRegister && !PUBLIC_SIGNUP_ENABLED\)/);
  assert.match(authPage, /Pendaftaran belum dibuka/);
});
