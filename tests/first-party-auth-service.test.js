import test from 'node:test';
import assert from 'node:assert/strict';
import { createFirstPartyAuthService } from '../src/services/auth/first-party-auth-service.js';

function createStorage() {
  const values = new Map();
  return {
    getItem(key) { return values.get(key) || null; },
    setItem(key, value) { values.set(key, String(value)); },
    removeItem(key) { values.delete(key); }
  };
}

test('first-party signup sends accepted legal consent to the Go API', async () => {
  const storage = createStorage();
  const calls = [];
  globalThis.fetch = async (url, options) => {
    calls.push({ url, options });
    return new Response(JSON.stringify({ status: 'accepted' }), { status: 202, headers: { 'Content-Type': 'application/json' } });
  };
  const service = createFirstPartyAuthService({ apiBaseUrl: 'https://api.pluits.example', appUrl: 'https://pluits.example/', storage });
  const result = await service.register({ fullName: 'Bagus Test', email: ' TEST@example.com ', password: 'a-long-unique-password', termsAccepted: true });
  assert.equal(result.confirmationRequired, true);
  assert.equal(calls[0].url, 'https://api.pluits.example/v1/identity/register');
  assert.deepEqual(JSON.parse(calls[0].options.body), {
    email: 'test@example.com', password: 'a-long-unique-password', display_name: 'Bagus Test', terms_accepted: true
  });
});

test('first-party login stores only the refresh token in tab-scoped storage', async () => {
  const storage = createStorage();
  globalThis.fetch = async () => new Response(JSON.stringify({
    account_id: 'account-1', email: 'bagus@example.test', display_name: 'Bagus Test', access_token: 'access-secret',
    refresh_token: 'refresh-secret', access_expires_at: '2026-11-21T12:15:00Z'
  }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  const service = createFirstPartyAuthService({ apiBaseUrl: 'https://api.pluits.example', appUrl: 'https://pluits.example/', storage });
  const session = await service.signIn({ email: 'BAGUS@example.test', password: 'a-long-unique-password' });
  assert.equal(session.user.id, 'account-1');
  assert.equal(session.user.email, 'bagus@example.test');
  assert.equal(session.user.user_metadata.full_name, 'Bagus Test');
  assert.equal(session.access_token, 'access-secret');
  assert.equal(storage.getItem('pluits-first-party-refresh-v1'), 'refresh-secret');
});

test('first-party provider refuses non-HTTPS API endpoints outside localhost', () => {
  assert.throws(() => createFirstPartyAuthService({ apiBaseUrl: 'http://api.pluits.example', appUrl: 'https://pluits.example/', storage: createStorage() }), /HTTPS/);
});

test('first-party provider sends verification and password recovery requests', async () => {
  const calls = [];
  globalThis.fetch = async (url, options) => {
    calls.push({ url, options });
    return new Response(JSON.stringify({ status: 'accepted' }), { status: 202, headers: { 'Content-Type': 'application/json' } });
  };
  const service = createFirstPartyAuthService({ apiBaseUrl: 'https://api.pluits.example', appUrl: 'https://pluits.example/', storage: createStorage() });
  await service.verifyEmail('one-time-token');
  await service.requestPasswordReset('bagus@example.test');
  assert.equal(calls[0].url, 'https://api.pluits.example/v1/identity/verify-email');
  assert.deepEqual(JSON.parse(calls[0].options.body), { token: 'one-time-token' });
  assert.equal(calls[1].url, 'https://api.pluits.example/v1/identity/password-reset/request');
});
