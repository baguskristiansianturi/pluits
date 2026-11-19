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
  assert.equal(eventName, 'INITIAL_SESSION');
  assert.equal(receivedSession, session);
  assert.equal((await service.getSession()).user.app_metadata.provider, 'local-demo');
  assert.equal(session.user.id, 'pluits-local-demo-user');
});

test('local demo profile edits persist across preview reloads without a backend', async () => {
  const storage = memoryStorage();
  const service = createLocalDemoAuthService(storage);
  service.demoSignIn();
  await service.updateProfile({ display_name: 'Bagus Kristian', username: 'bagus.kristian', bio: 'Profil pengujian', city: 'Denpasar' });
  const nextService = createLocalDemoAuthService(storage);
  const session = await nextService.getSession();
  assert.equal(session.user.user_metadata.display_name, 'Bagus Kristian');
  assert.equal(session.user.user_metadata.username, 'bagus.kristian');
  assert.equal(session.user.user_metadata.bio, 'Profil pengujian');
  assert.equal(session.user.user_metadata.city, 'Denpasar');
});

test('local demo profile rejects invalid usernames', async () => {
  const service = createLocalDemoAuthService(memoryStorage());
  service.demoSignIn();
  await assert.rejects(service.updateProfile({ display_name: 'Bagus', username: 'x' }), /Username harus 3–30 karakter/);
});

test('local demo sign-out clears only the local session', async () => {
  const service = createLocalDemoAuthService(memoryStorage());
  service.demoSignIn();
  await service.signOut();
  assert.equal(await service.getSession(), null);
});
