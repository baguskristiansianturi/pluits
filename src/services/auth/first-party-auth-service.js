const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const STORAGE_KEY = 'pluits-first-party-refresh-v1';

function normalizeEmail(value) { return String(value || '').trim().toLowerCase(); }
function assertEmail(email) {
  if (!EMAIL_PATTERN.test(email)) throw new Error('Masukkan alamat email yang valid.');
}
function assertPassword(password) {
  if (String(password || '').length < 12) throw new Error('Password minimal 12 karakter.');
}

export function createFirstPartyAuthService({ apiBaseUrl, appUrl, storage = globalThis.sessionStorage } = {}) {
  if (!apiBaseUrl || !appUrl) throw new TypeError('API base URL and canonical app URL are required.');
  const parsed = new URL(apiBaseUrl);
  if (parsed.protocol !== 'https:' && parsed.hostname !== 'localhost' && parsed.hostname !== '127.0.0.1') {
    throw new TypeError('The first-party API must use HTTPS.');
  }
  const base = parsed.toString().replace(/\/$/, '');
  const listeners = new Set();
  let session = null;

  function emit(event, nextSession) {
    session = nextSession;
    listeners.forEach((callback) => callback(event, session));
  }

  async function request(path, { method = 'POST', body, accessToken } = {}) {
    const headers = { Accept: 'application/json' };
    if (body !== undefined) headers['Content-Type'] = 'application/json';
    if (accessToken) headers.Authorization = 'Bearer ' + accessToken;
    let response;
    try {
      response = await fetch(base + path, {
        method,
        headers,
        body: body === undefined ? undefined : JSON.stringify(body),
        mode: 'cors',
        credentials: 'omit',
        cache: 'no-store'
      });
    } catch (cause) {
      const error = new Error('Koneksi ke layanan akun PLUITS gagal.');
      error.cause = cause;
      throw error;
    }
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      const error = new Error(payload.error || payload.message || 'Permintaan belum berhasil.');
      error.status = response.status;
      error.code = payload.error;
      throw error;
    }
    return payload;
  }

  function toSession(tokens, email = session?.user?.email || '') {
    if (!tokens?.access_token || !tokens?.refresh_token) throw new Error('Respons sesi dari server tidak lengkap.');
    storage?.setItem(STORAGE_KEY, tokens.refresh_token);
    return {
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      token_type: 'bearer',
      expires_at: Math.floor(new Date(tokens.access_expires_at).getTime() / 1000),
      user: {
        id: tokens.account_id,
        email: tokens.email || email,
        user_metadata: {},
        app_metadata: { provider: 'pluits-first-party' }
      }
    };
  }

  return Object.freeze({
    isFirstParty: true,
    getErrorMessage(error) {
      if (error?.code === 'invalid_credentials') return 'Email atau password belum cocok.';
      if (error?.code === 'invalid_session') return 'Sesi akun berakhir. Silakan masuk kembali.';
      if (error?.code === 'rate_limit_exceeded' || error?.status === 429) return 'Permintaan terlalu sering. Tunggu sebentar lalu coba lagi.';
      if (error?.code === 'invalid_registration') return 'Data pendaftaran belum memenuhi ketentuan.';
      if (error?.code === 'verification_invalid_or_expired') return 'Tautan verifikasi tidak valid atau sudah kedaluwarsa. Minta tautan baru.';
      if (error?.code === 'reset_token_invalid_or_expired') return 'Tautan pemulihan tidak valid atau sudah kedaluwarsa. Minta tautan baru.';
      if (error?.status >= 500) return 'Layanan akun PLUITS sedang mengalami gangguan. Coba kembali beberapa saat lagi.';
      return error?.message || 'Permintaan belum berhasil. Periksa koneksi lalu coba lagi.';
    },
    async getSession() {
      const refreshToken = storage?.getItem(STORAGE_KEY);
      if (!refreshToken) return null;
      try {
        const tokens = await request('/v1/identity/refresh', { body: { refresh_token: refreshToken } });
        const nextSession = toSession(tokens, tokens.email);
        emit('TOKEN_REFRESHED', nextSession);
        return nextSession;
      } catch {
        storage?.removeItem(STORAGE_KEY);
        session = null;
        return null;
      }
    },
    subscribe(callback) {
      listeners.add(callback);
      return () => listeners.delete(callback);
    },
    async register({ fullName, email, password, termsAccepted }) {
      const displayName = String(fullName || '').trim();
      const normalizedEmail = normalizeEmail(email);
      if (displayName.length < 2 || displayName.length > 80) throw new Error('Nama tampilan harus terdiri dari 2 sampai 80 karakter.');
      assertEmail(normalizedEmail);
      assertPassword(password);
      if (termsAccepted !== true) throw new Error('Persetujuan Ketentuan Layanan dan Kebijakan Privasi diperlukan.');
      await request('/v1/identity/register', {
        body: { email: normalizedEmail, password, display_name: displayName, terms_accepted: true }
      });
      return { email: normalizedEmail, user: null, session: null, confirmationRequired: true };
    },
    async verifyEmail(token) {
      if (!token) throw new Error('Token verifikasi tidak ditemukan.');
      return request('/v1/identity/verify-email', { body: { token } });
    },
    async resendConfirmation(email) {
      const normalizedEmail = normalizeEmail(email);
      assertEmail(normalizedEmail);
      await request('/v1/identity/resend-verification', { body: { email: normalizedEmail } });
    },
    async signIn({ email, password }) {
      const normalizedEmail = normalizeEmail(email);
      assertEmail(normalizedEmail);
      if (!password) throw new Error('Masukkan password akun Anda.');
      const tokens = await request('/v1/identity/login', { body: { email: normalizedEmail, password } });
      const nextSession = toSession(tokens, normalizedEmail);
      emit('SIGNED_IN', nextSession);
      return nextSession;
    },
    async requestPasswordReset(email) {
      const normalizedEmail = normalizeEmail(email);
      assertEmail(normalizedEmail);
      await request('/v1/identity/password-reset/request', { body: { email: normalizedEmail } });
    },
    async updatePassword(password) {
      assertPassword(password);
      const token = new URL(window.location.href).searchParams.get('token');
      if (!token) throw new Error('Token pemulihan tidak ditemukan. Minta tautan pemulihan baru.');
      await request('/v1/identity/password-reset/complete', { body: { token, password } });
      storage?.removeItem(STORAGE_KEY);
      emit('SIGNED_OUT', null);
    },
    async signOut() {
      if (session?.access_token) {
        try { await request('/v1/identity/logout', { accessToken: session.access_token }); }
        finally { storage?.removeItem(STORAGE_KEY); emit('SIGNED_OUT', null); }
      } else {
        storage?.removeItem(STORAGE_KEY);
        emit('SIGNED_OUT', null);
      }
    }
  });
}
