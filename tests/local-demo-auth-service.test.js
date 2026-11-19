import test from 'node:test';
import assert from 'node:assert/strict';
import { createLocalDemoAuthService } from '../src/services/auth/local-demo-auth-service.js';

function memoryStorage() {
  const values = new Map();
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, String(value)),
    removeItem: (key) => values.delete(key)
  };
}

test('local demo login creates an isolated local session and notifies the app', async () => {
  const service = createLocalDemoAuthService(memoryStorage());
  let eventName = '';
  let receivedSession = null;
  service.subscribe((event, session) => { eventName = event; receivedSession = session; });
  const session = service.demoSignIn();
  assert.equal(eventName, 'SIGNED_IN');
  assert.equal(receivedSession, session);
  assert.equal((await service.getSession()).user.app_metadata.provider, 'local-demo');
  assert.equal(session.user.id, 'pluits-local-demo-user');
});

test('local demo sign-out clears only the local session', async () => {
  const service = createLocalDemoAuthService(memoryStorage());
  service.demoSignIn();
  await service.signOut();
  assert.equal(await service.getSession(), null);
});
