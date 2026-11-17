const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;

function normalizeEmail(value) {
  return String(value || '').trim().toLowerCase();
}

function assertEmail(email) {
  if (!EMAIL_PATTERN.test(email)) {
    throw new Error('Masukkan alamat email yang valid.');
  }
}

function assertPassword(password) {
  if (String(password || '').length < MIN_PASSWORD_LENGTH) {
    throw new Error('Password minimal 8 karakter.');
  }
}

export function getAuthErrorMessage(error) {
  const code = String(error?.code || '').toLowerCase();
  const message = String(error?.message || '').toLowerCase();

  if (code.includes('email_not_confirmed') || message.includes('email not confirmed')) {
    return 'Email akun ini belum dikonfirmasi. Periksa email atau minta pengiriman ulang.';
  }
  if (message.includes('invalid login credentials') || code.includes('invalid_credentials')) {
    return 'Email atau password belum cocok. Periksa kembali atau gunakan Lupa password.';
  }
  if (message.includes('already registered') || message.includes('user already exists')) {
    return 'Email ini sudah terdaftar. Silakan masuk atau gunakan pemulihan password.';
  }
  if (message.includes('email address not authorized') || message.includes('not authorized')) {
    return 'Layanan email Supabase belum mengizinkan alamat ini. Konfigurasi SMTP perlu diperiksa.';
  }
  if (message.includes('rate limit') || message.includes('too many requests')) {
    return 'Permintaan terlalu sering. Tunggu sebentar sebelum mencoba lagi.';
  }
  if (message.includes('weak password') || message.includes('password should')) {
    return 'Password belum memenuhi aturan keamanan Supabase.';
  }
  if (message.includes('invalid email')) {
    return 'Format email belum benar. Periksa kembali alamat email Anda.';
  }
  return 'Permintaan belum berhasil. Periksa koneksi lalu coba lagi.';
}

/**
 * Auth service is injected with the single Supabase client.
 * It owns authentication calls, not page rendering or DOM state.
 */
export function createAuthService(supabase, { appUrl } = {}) {
  if (!supabase?.auth) {
    throw new TypeError('A Supabase client with Auth is required.');
  }
  if (!appUrl) {
    throw new TypeError('The canonical application URL is required.');
  }

  const auth = supabase.auth;
  const passwordResetUrl = new URL('?auth=reset', appUrl).toString();

  return Object.freeze({
    getErrorMessage: getAuthErrorMessage,

    async getSession() {
      const { data, error } = await auth.getSession();
      if (error) throw error;
      return data.session;
    },

    subscribe(callback) {
      const { data } = auth.onAuthStateChange(callback);
      return () => data.subscription.unsubscribe();
    },

    async register({ fullName, email, password, termsAccepted }) {
      const displayName = String(fullName || '').trim();
      const normalizedEmail = normalizeEmail(email);

      if (displayName.length < 2 || displayName.length > 80) {
        throw new Error('Nama tampilan harus terdiri dari 2 sampai 80 karakter.');
      }
      assertEmail(normalizedEmail);
      assertPassword(password);
      if (termsAccepted !== true) {
        throw new Error('Persetujuan Ketentuan Layanan dan Kebijakan Privasi diperlukan.');
      }

      const { data, error } = await auth.signUp({
        email: normalizedEmail,
        password,
        options: {
          data: { full_name: displayName },
          emailRedirectTo: appUrl
        }
      });

      if (error) throw error;
      return {
        email: normalizedEmail,
        user: data.user,
        session: data.session,
        confirmationRequired: !data.session
      };
    },

    async resendConfirmation(email) {
      const normalizedEmail = normalizeEmail(email);
      assertEmail(normalizedEmail);
      const { error } = await auth.resend({
        type: 'signup',
        email: normalizedEmail,
        options: { emailRedirectTo: appUrl }
      });
      if (error) throw error;
    },

    async signIn({ email, password }) {
      const normalizedEmail = normalizeEmail(email);
      assertEmail(normalizedEmail);
      if (!password) throw new Error('Masukkan password akun Anda.');

      const { data, error } = await auth.signInWithPassword({
        email: normalizedEmail,
        password
      });

      if (error) throw error;
      return data.session;
    },

    async requestPasswordReset(email) {
      const normalizedEmail = normalizeEmail(email);
      assertEmail(normalizedEmail);
      const { error } = await auth.resetPasswordForEmail(normalizedEmail, {
        redirectTo: passwordResetUrl
      });
      if (error) throw error;
    },

    async updatePassword(password) {
      assertPassword(password);
      const { error } = await auth.updateUser({ password });
      if (error) throw error;
    },

    async signOut() {
      const { error } = await auth.signOut();
      if (error) throw error;
    }
  });
}
