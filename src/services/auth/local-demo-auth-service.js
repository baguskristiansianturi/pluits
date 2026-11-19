const STORAGE_KEY = 'pluits-local-demo-session-v1';

const demoSession = () => ({
  access_token: 'local-demo-session',
  token_type: 'bearer',
  user: {
    id: 'pluits-local-demo-user',
    email: 'demo@pluits.local',
    user_metadata: {
      full_name: 'Bagus',
      display_name: 'Bagus',
      username: 'bagus-demo',
      account_level: 'regular',
      demo_mode: true
    },
    app_metadata: { provider: 'local-demo' }
  }
});

export function createLocalDemoAuthService(storage = globalThis.localStorage) {
  const listeners = new Set();
  const readSession = () => {
    try {
      return storage?.getItem(STORAGE_KEY) ? JSON.parse(storage.getItem(STORAGE_KEY)) : null;
    } catch {
      return null;
    }
  };
  const emit = (event, session) => listeners.forEach((callback) => callback(event, session));

  return Object.freeze({
    isLocalDemo: true,
    async getSession() {
      return readSession();
    },
    subscribe(callback) {
      listeners.add(callback);
      return () => listeners.delete(callback);
    },
    demoSignIn() {
      const session = demoSession();
      storage?.setItem(STORAGE_KEY, JSON.stringify(session));
      emit('SIGNED_IN', session);
      return session;
    },
    async signOut() {
      storage?.removeItem(STORAGE_KEY);
      emit('SIGNED_OUT', null);
    },
    getErrorMessage(error) {
      return error?.message || 'Mode pengujian lokal belum dapat dijalankan.';
    }
  });
}
