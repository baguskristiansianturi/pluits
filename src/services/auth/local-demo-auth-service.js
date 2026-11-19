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
      const session = readSession() || demoSession();
      storage?.setItem(STORAGE_KEY, JSON.stringify(session));
      emit('INITIAL_SESSION', session);
      return session;
    },
    async updateProfile(updates = {}) {
      const session = readSession() || demoSession();
      const displayName = String(updates.display_name || updates.full_name || session.user.user_metadata.display_name || '').trim();
      const username = String(updates.username || session.user.user_metadata.username || '').trim().toLowerCase().replace(/^@/, '');
      if (displayName.length < 2 || displayName.length > 80) throw new Error('Nama tampilan harus terdiri dari 2 sampai 80 karakter.');
      if (!/^[a-z0-9][a-z0-9._-]{2,29}$/.test(username)) throw new Error('Username harus 3–30 karakter dan hanya memakai huruf kecil, angka, titik, garis bawah, atau tanda hubung.');
      session.user.user_metadata = {
        ...session.user.user_metadata,
        ...updates,
        display_name: displayName,
        full_name: displayName,
        username
      };
      storage?.setItem(STORAGE_KEY, JSON.stringify(session));
      emit('USER_UPDATED', session);
      return session.user;
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
