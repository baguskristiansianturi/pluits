import test from 'node:test';
import assert from 'node:assert/strict';
import { createAuthService, getAuthErrorMessage } from '../src/services/auth/auth-service.js';

function createFakeSupabase(overrides = {}) {
  const calls = [];
  const auth = {
    getSession: async () => ({ data: { session: { user: { id: 'user-1' } } }, error: null }),
    onAuthStateChange: (callback) => {
      calls.push(['onAuthStateChange', callback]);
      return { data: { subscription: { unsubscribe() {} } } };
    },
    signUp: async (payload) => {
      calls.push(['signUp', payload]);
      return { data: { user: { id: 'user-2' }, session: null }, error: null };
    },
    resend: async (payload) => {
      calls.push(['resend', payload]);
      return { error: null };
    },
    signInWithPassword: async (payload) => {
      calls.push(['signInWithPassword', payload]);
      return { data: { session: { access_token: 'session-token' } }, error: null };
    },
    resetPasswordForEmail: async (email, options) => {
      calls.push(['resetPasswordForEmail', email, options]);
      return { error: null };
    },
    updateUser: async (payload) => {
      calls.push(['updateUser', payload]);
      return { error: null };
    },
    signOut: async () => {
      calls.push(['signOut']);
      return { error: null };
    },
    ...overrides
  };
  return { supabase: { auth }, calls };
}

test('registration sends the established full_name metadata and canonical redirect', async () => {
  const { supabase, calls } = createFakeSupabase();
  const service = createAuthService(supabase, { appUrl: 'https://example.test/pluits/' });

  const result = await service.register({
    fullName: 'Bagus Test',
    email: '  TEST@example.com ',
    password: 'unique-password',
    termsAccepted: true
  });

  const call = calls.find(([name]) => name === 'signUp');
  assert.equal(call[1].email, 'test@example.com');
  assert.equal(call[1].options.data.full_name, 'Bagus Test');
  assert.equal(call[1].options.emailRedirectTo, 'https://example.test/pluits/');
  assert.equal(result.confirmationRequired, true);
});

test('registration cannot proceed without terms acknowledgement', async () => {
  const { supabase, calls } = createFakeSupabase();
  const service = createAuthService(supabase, { appUrl: 'https://example.test/pluits/' });

  await assert.rejects(
    service.register({ fullName: 'Bagus', email: 'bagus@example.com', password: 'unique-password', termsAccepted: false }),
    /Persetujuan/
  );
  assert.equal(calls.some(([name]) => name === 'signUp'), false);
});

test('login normalizes email and returns the Supabase session', async () => {
  const { supabase, calls } = createFakeSupabase();
  const service = createAuthService(supabase, { appUrl: 'https://example.test/pluits/' });

  const session = await service.signIn({ email: ' USER@Example.com ', password: 'secret-password' });
  const call = calls.find(([name]) => name === 'signInWithPassword');
  assert.equal(call[1].email, 'user@example.com');
  assert.equal(session.access_token, 'session-token');
});

test('password recovery uses the canonical app URL with auth=reset', async () => {
  const { supabase, calls } = createFakeSupabase();
  const service = createAuthService(supabase, { appUrl: 'https://example.test/pluits/' });

  await service.requestPasswordReset('USER@example.com');
  const call = calls.find(([name]) => name === 'resetPasswordForEmail');
  assert.equal(call[1], 'user@example.com');
  assert.equal(call[2].redirectTo, 'https://example.test/pluits/?auth=reset');
});

test('registration rejects passwords shorter than eight characters', async () => {
  const { supabase, calls } = createFakeSupabase();
  const service = createAuthService(supabase, { appUrl: 'https://example.test/pluits/' });

  await assert.rejects(
    service.register({ fullName: 'Bagus', email: 'bagus@example.com', password: 'short', termsAccepted: true }),
    /minimal 8/
  );
  assert.equal(calls.some(([name]) => name === 'signUp'), false);
});


test('auth errors distinguish network failures and service outages',()=>{
  assert.match(getAuthErrorMessage(new TypeError('Failed to fetch')),/tidak dapat terhubung/i);
  assert.match(getAuthErrorMessage({status:503,message:'service unavailable'}),/gangguan/i);
  assert.match(getAuthErrorMessage({status:429,message:'too many requests'}),/terlalu sering/i);
});
