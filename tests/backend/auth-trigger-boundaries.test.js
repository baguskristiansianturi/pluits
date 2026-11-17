import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const authService = await readFile(new URL('../../src/services/auth/auth-service.js', import.meta.url), 'utf8');

test('frontend signup delegates profile and wallet creation to existing Auth database triggers', () => {
  assert.match(authService, /auth\.signUp/);
  assert.doesNotMatch(authService, /\.from\(['"]profiles['"]\)|\.from\(['"]user_profiles['"]\)|\.from\(['"]wallets?['"]\)/);
});
