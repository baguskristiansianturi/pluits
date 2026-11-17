import { assetUrl } from '../../config/runtime.js';
import { renderIcon } from '../../design-system/icons.js';

function passwordField({ id, label, autocomplete, placeholder, help }) {
  return '<div class="auth-field">' +
    '<label for="' + id + '">' + label + '</label>' +
    '<div class="auth-password-wrap">' +
    '<input id="' + id + '" name="password" type="password" autocomplete="' + autocomplete + '" minlength="8" placeholder="' + placeholder + '" required>' +
    '<button class="auth-password-toggle" type="button" data-toggle-password aria-label="Tampilkan password" aria-pressed="false">' + renderIcon('eye') + '</button>' +
    '</div>' +
    (help ? '<small class="auth-field-help">' + help + '</small>' : '') +
    '</div>';
}

export function mountAuthPage({ root, mode, authService, hasRecoverySession, onAuthenticated }) {
  const isRegister = mode === 'register';
  const isForgot = mode === 'forgot';
  const isReset = mode === 'reset';
  const title = isRegister ? 'Buat akun PLUITS' : isForgot ? 'Pulihkan akun' : isReset ? 'Atur password baru' : 'Selamat datang kembali';
  const intro = isRegister
    ? 'Mulai dengan informasi dasar. Detail profil dapat dilengkapi setelah akun aktif.'
    : isForgot
      ? 'Masukkan email akun untuk menerima tautan pemulihan.'
      : isReset
        ? 'Buat password baru untuk melanjutkan akses akun.'
        : 'Masuk untuk melanjutkan ke ruang kerja PLUITS.';

  let fields = '';
  if (isRegister) {
    fields =
      '<div class="auth-field"><label for="auth-name">Nama tampilan</label><input id="auth-name" name="full_name" type="text" autocomplete="name" minlength="2" maxlength="80" placeholder="Nama yang ingin ditampilkan" required></div>' +
      '<div class="auth-field"><label for="auth-email">Alamat email</label><input id="auth-email" name="email" type="email" autocomplete="email" inputmode="email" autocapitalize="none" spellcheck="false" placeholder="nama@email.com" required></div>' +
      passwordField({ id: 'auth-password', label: 'Password', autocomplete: 'new-password', placeholder: 'Minimal 8 karakter', help: 'Gunakan password yang unik dan tidak dipakai di akun penting lainnya.' }) +
      '<label class="auth-consent"><input name="terms" type="checkbox" required><span>Saya menyetujui <a href="#/terms">Ketentuan Layanan</a> dan telah membaca <a href="#/privacy">Kebijakan Privasi</a>.</span></label>';
  } else if (isForgot) {
    fields = '<div class="auth-field"><label for="auth-email">Alamat email</label><input id="auth-email" name="email" type="email" autocomplete="email" inputmode="email" autocapitalize="none" spellcheck="false" placeholder="nama@email.com" required></div>';
  } else if (isReset) {
    fields = passwordField({ id: 'auth-password', label: 'Password baru', autocomplete: 'new-password', placeholder: 'Minimal 8 karakter', help: 'Pilih password baru yang tidak pernah digunakan sebelumnya.' });
  } else {
    fields =
      '<div class="auth-field"><label for="auth-email">Alamat email</label><input id="auth-email" name="email" type="email" autocomplete="username" inputmode="email" autocapitalize="none" spellcheck="false" placeholder="nama@email.com" required></div>' +
      passwordField({ id: 'auth-password', label: 'Password', autocomplete: 'current-password', placeholder: 'Password akun', help: '' });
  }

  const switcher = isForgot || isReset ? '' :
    '<nav class="auth-tabs" aria-label="Jenis akses"><a href="#/login" class="' + (!isRegister ? 'is-active' : '') + '"' + (!isRegister ? ' aria-current="page"' : '') + '>Masuk</a><a href="#/register" class="' + (isRegister ? 'is-active' : '') + '"' + (isRegister ? ' aria-current="page"' : '') + '>Daftar</a></nav>';

  const submitText = isRegister ? 'Buat akun' : isForgot ? 'Kirim tautan pemulihan' : isReset ? 'Simpan password baru' : 'Masuk';
  const footLink = isRegister
    ? 'Sudah punya akun? <a href="#/login">Masuk</a>'
    : isForgot || isReset
      ? '<a href="#/login">Kembali ke Masuk</a>'
      : 'Belum punya akun? <a href="#/register">Daftar</a>';

  root.innerHTML =
    '<div class="auth-page">' +
      '<header class="auth-header">' +
        '<a class="pluits-brand" href="#/register" aria-label="PLUITS">' +
          '<img src="' + assetUrl('assets/brand/pluits-logo.svg') + '" alt="" width="34" height="34">' +
          '<span>PLUITS</span>' +
        '</a>' +
        '<span class="auth-header-note">RUANG KERJA PENGEMBANGAN</span>' +
      '</header>' +
      '<main class="auth-main">' +
        '<aside class="auth-intro-panel">' +
          '<span class="auth-eyebrow">SATU AKUN · BANYAK KEMUNGKINAN</span>' +
          '<h1>Bangun pengalaman digital yang saling terhubung.</h1>' +
          '<p>PLUITS menyatukan komunitas, tempat, usaha, layanan, dan perjalanan dalam satu ekosistem.</p>' +
          '<ul class="auth-benefits">' +
            '<li>' + renderIcon('check') + '<span>Satu akun untuk seluruh ekosistem PLUITS</span></li>' +
            '<li>' + renderIcon('check') + '<span>Identitas dan pengaturan akun terpusat</span></li>' +
            '<li>' + renderIcon('check') + '<span>Pengembangan dilakukan bertahap dan teruji</span></li>' +
          '</ul>' +
          '<div class="auth-intro-foot"><span class="auth-orbit" aria-hidden="true"></span><span>PLUITS · CONNECTED EXPERIENCES</span></div>' +
        '</aside>' +
        '<section class="auth-card" aria-labelledby="auth-title">' +
          '<div class="auth-card-heading">' +
            '<span class="auth-step-label">' + (isRegister ? 'MULAI DI SINI' : isForgot ? 'BANTUAN AKUN' : isReset ? 'KEAMANAN AKUN' : 'AKUN PLUITS') + '</span>' +
            '<h2 id="auth-title">' + title + '</h2>' +
            '<p>' + intro + '</p>' +
          '</div>' +
          switcher +
          (isRegister ? '<div class="auth-preview-notice">Tahap pengujian awal. Pendaftaran publik belum dibuka sampai konfigurasi email dan dokumen kebijakan selesai diverifikasi.</div>' : '') +
          '<form class="auth-form" data-auth-form>' +
            fields +
            '<p class="auth-status" data-auth-status role="status" aria-live="polite"></p>' +
            '<button class="auth-submit" type="submit">' + submitText + renderIcon('arrow') + '</button>' +
          '</form>' +
          '<section class="auth-pending" data-auth-pending hidden aria-live="polite">' +
            '<div class="auth-pending-icon">' + renderIcon('mail') + '</div>' +
            '<span class="auth-step-label">SATU LANGKAH LAGI</span>' +
            '<h3>Periksa email kamu</h3>' +
            '<p>Permintaan konfirmasi akun telah diterima untuk:</p>' +
            '<strong data-pending-email></strong>' +
            '<ol><li>Buka email konfirmasi dari Supabase/PLUITS.</li><li>Tekan tautan konfirmasi.</li><li>Kamu akan kembali ke PLUITS untuk melanjutkan.</li></ol>' +
            '<p class="auth-status" data-resend-status role="status" aria-live="polite"></p>' +
            '<button class="auth-secondary" type="button" data-resend>Permintaan kirim ulang email</button>' +
            '<a class="auth-text-link" href="#/login">Kembali ke Masuk</a>' +
          '</section>' +
          (isReset ? '<p class="auth-recovery-note">' + (hasRecoverySession ? 'Sesi pemulihan terdeteksi.' : 'Buka halaman ini melalui tautan pemulihan yang dikirim ke email akun.') + '</p>' : '') +
          '<p class="auth-switch-copy">' + footLink + '</p>' +
          '<p class="auth-security-note">' + renderIcon('lock') + '<span>Autentikasi ditangani oleh Supabase. Data akun lama tetap menggunakan database yang sama.</span></p>' +
        '</section>' +
      '</main>' +
      '<footer class="auth-footer"><span>© 2026 PLUITS</span><span>Fondasi baru · Tahap 01</span></footer>' +
    '</div>';

  const form = root.querySelector('[data-auth-form]');
  const submit = form?.querySelector('[type="submit"]');
  const status = root.querySelector('[data-auth-status]');
  const pending = root.querySelector('[data-auth-pending]');
  const resend = root.querySelector('[data-resend]');
  const resendStatus = root.querySelector('[data-resend-status]');
  let pendingEmail = '';

  const showStatus = (target, text, type = 'error') => {
    if (!target) return;
    target.textContent = text;
    target.className = 'auth-status is-' + type;
  };

  root.querySelectorAll('[data-toggle-password]').forEach((button) => {
    button.addEventListener('click', () => {
      const input = button.parentElement?.querySelector('input');
      if (!input) return;
      const reveal = input.type === 'password';
      input.type = reveal ? 'text' : 'password';
      button.innerHTML = renderIcon(reveal ? 'eyeOff' : 'eye');
      button.setAttribute('aria-label', reveal ? 'Sembunyikan password' : 'Tampilkan password');
      button.setAttribute('aria-pressed', String(reveal));
    });
  });

  resend?.addEventListener('click', async () => {
    if (!pendingEmail || resend.disabled) return;
    resend.disabled = true;
    resend.textContent = 'Meminta pengiriman…';
    try {
      await authService.resendConfirmation(pendingEmail);
      showStatus(resendStatus, 'Permintaan diterima. Email belum tentu langsung masuk; periksa Inbox dan Spam.', 'success');
      resend.textContent = 'Permintaan terkirim';
    } catch (error) {
      showStatus(resendStatus, authService.getErrorMessage?.(error) || 'Email belum dapat dikirim. Coba lagi nanti.');
      resend.disabled = false;
      resend.textContent = 'Coba kirim ulang';
    }
  });

  form?.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const values = new FormData(form);
    submit.disabled = true;
    submit.textContent = 'Memproses…';
    showStatus(status, '', 'info');

    try {
      if (isRegister) {
        const result = await authService.register({
          fullName: values.get('full_name'),
          email: values.get('email'),
          password: values.get('password'),
          termsAccepted: values.get('terms') === 'on'
        });
        if (result.session) {
          onAuthenticated?.(result.session);
          return;
        }
        pendingEmail = result.email;
        form.hidden = true;
        pending.hidden = false;
        root.querySelector('[data-pending-email]').textContent = pendingEmail;
        showStatus(status, 'Permintaan pendaftaran diterima.', 'success');
      } else if (isForgot) {
        await authService.requestPasswordReset(values.get('email'));
        showStatus(status, 'Jika alamat tersebut terdaftar, tautan pemulihan akan dikirim. Periksa Inbox dan Spam.', 'success');
        submit.textContent = 'Permintaan terkirim';
      } else if (isReset) {
        await authService.updatePassword(values.get('password'));
        showStatus(status, 'Password berhasil diperbarui. Silakan masuk kembali.', 'success');
        submit.textContent = 'Password diperbarui';
      } else {
        const nextSession = await authService.signIn({
          email: values.get('email'),
          password: values.get('password')
        });
        onAuthenticated?.(nextSession);
      }
    } catch (error) {
      showStatus(status, authService.getErrorMessage?.(error) || 'Permintaan belum berhasil. Periksa kembali data dan koneksi.');
      submit.disabled = false;
      submit.textContent = submitText;
    }
  });

  if (isReset && !hasRecoverySession) {
    showStatus(status, 'Sesi pemulihan belum ditemukan. Gunakan tautan terbaru dari email atau minta tautan baru.', 'info');
  }
}
