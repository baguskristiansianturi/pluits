import { assetUrl, PUBLIC_SIGNUP_ENABLED } from '../../config/runtime.js';
import { routeHref } from '../../config/paths.js';
import { renderIcon } from '../../design-system/icons.js';
import '../../design-system/page-shell.css';
import { renderPageHeader, renderPageFooter } from '../../design-system/page-shell.js';

function passwordField({ id, label, autocomplete, placeholder, help, minLength = 0 }) {
  const minLengthAttribute = minLength ? ' minlength="' + minLength + '"' : '';
  return '<div class="auth-field">' +
    '<label for="' + id + '">' + label + '</label>' +
    '<div class="auth-password-wrap">' +
    '<input id="' + id + '" name="password" type="password" autocomplete="' + autocomplete + '"' + minLengthAttribute + ' placeholder="' + placeholder + '" required>' +
    '<button class="auth-password-toggle" type="button" data-toggle-password aria-label="Tampilkan kata sandi" aria-pressed="false">' + renderIcon('eye') + '</button>' +
    '</div>' +
    (help ? '<small class="auth-field-help">' + help + '</small>' : '') +
    '</div>';
}

export function mountAuthPage({ root, mode, authService, hasRecoverySession, onAuthenticated }) {
  const isRegister = mode === 'register';
  const isForgot = mode === 'forgot';
  const isReset = mode === 'reset';
  const title = isRegister ? 'Buat akun PLUITS' : isForgot ? 'Pulihkan akses akun' : isReset ? 'Buat kata sandi baru' : 'Masuk ke PLUITS';
  const intro = isRegister
    ? 'Buat identitas PLUITS Anda untuk mulai terhubung dengan ekosistem kami.'
    : isForgot
      ? 'Masukkan alamat email yang terhubung dengan akun Anda. Kami akan mengirimkan petunjuk pemulihan.'
      : isReset
        ? 'Gunakan kata sandi baru untuk mengamankan kembali akun Anda.'
        : 'Masuk untuk melanjutkan ke Dashboard PLUITS dan mengelola aktivitas Anda.';

  let fields = '';
  if (isRegister) {
    fields =
      '<div class="auth-field"><label for="auth-name">Nama tampilan</label><input id="auth-name" name="full_name" type="text" autocomplete="name" minlength="2" maxlength="80" placeholder="Nama yang akan ditampilkan" required></div>' +
      '<div class="auth-field"><label for="auth-email">Alamat email</label><input id="auth-email" name="email" type="email" autocomplete="email" inputmode="email" autocapitalize="none" spellcheck="false" placeholder="nama@email.com" required></div>' +
      passwordField({ id: 'auth-password', label: 'Kata sandi', autocomplete: 'new-password', minLength: 8, placeholder: 'Minimal 8 karakter', help: 'Gunakan kata sandi yang kuat dan berbeda dari akun lain.' }) +
      '<label class="auth-consent"><input name="terms" type="checkbox" required><span>Saya menyetujui <a href="' + routeHref('terms') + '">Ketentuan Layanan</a> dan telah membaca <a href="' + routeHref('privacy') + '">Kebijakan Privasi</a>.</span></label>';
  } else if (isForgot) {
    fields = '<div class="auth-field"><label for="auth-email">Alamat email</label><input id="auth-email" name="email" type="email" autocomplete="email" inputmode="email" autocapitalize="none" spellcheck="false" placeholder="nama@email.com" required></div>';
  } else if (isReset) {
    fields = passwordField({ id: 'auth-password', label: 'Kata sandi baru', autocomplete: 'new-password', minLength: 8, placeholder: 'Minimal 8 karakter', help: 'Pilih kata sandi baru yang belum pernah digunakan pada akun ini.' });
  } else {
    fields =
      '<div class="auth-field"><label for="auth-email">Alamat email</label><input id="auth-email" name="email" type="email" autocomplete="username" inputmode="email" autocapitalize="none" spellcheck="false" placeholder="nama@email.com" required></div>' +
      passwordField({ id: 'auth-password', label: 'Kata sandi', autocomplete: 'current-password', placeholder: 'Masukkan kata sandi', help: '' });
  }

  const switcher = isForgot || isReset ? '' :
    '<nav class="auth-tabs" aria-label="Jenis akses"><a href="' + routeHref('login') + '" class="' + (!isRegister ? 'is-active' : '') + '"' + (!isRegister ? ' aria-current="page"' : '') + '>Masuk</a><a href="' + routeHref('register') + '" class="' + (isRegister ? 'is-active' : '') + '"' + (isRegister ? ' aria-current="page"' : '') + '>Daftar</a></nav>';

  const submitText = isRegister ? 'Buat akun' : isForgot ? 'Kirim tautan pemulihan' : isReset ? 'Simpan kata sandi baru' : 'Masuk';
  const footLink = isRegister
    ? 'Sudah punya akun? <a href="' + routeHref('login') + '">Masuk</a>'
    : isForgot || isReset
      ? '<a href="' + routeHref('login') + '">Kembali ke Masuk</a>'
      : 'Belum punya akun? <a href="' + routeHref('register') + '">Daftar</a>';

  root.innerHTML =
    '<div class="pl-page-shell auth-page">' +
      renderPageHeader({ note: 'EKOSISTEM DIGITAL TERINTEGRASI', label: 'PLUITS — halaman masuk' }) +
      '<main class="pl-page-main auth-main">' +
        '<aside class="auth-intro-panel">' +
          '<span class="auth-eyebrow">SATU IDENTITAS · SATU EKOSISTEM</span>' +
          '<h1>Terhubung dalam satu ekosistem digital.</h1>' +
          '<p>PLUITS menghubungkan orang, komunitas, tempat, usaha, dan layanan melalui satu pengalaman digital yang terintegrasi.</p>' +
          '<ul class="auth-benefits">' +
            '<li>' + renderIcon('check') + '<span>Satu identitas untuk mengakses ekosistem PLUITS</span></li>' +
            '<li>' + renderIcon('check') + '<span>Pengelolaan identitas dan akses akun dalam satu tempat</span></li>' +
            '<li>' + renderIcon('check') + '<span>Pengalaman yang dirancang untuk terus berkembang</span></li>' +
          '</ul>' +
          '<div class="auth-intro-foot"><span class="auth-orbit" aria-hidden="true"></span><span>PLUITS · CONNECTED EXPERIENCES</span></div>' +
        '</aside>' +
        '<section class="auth-card" aria-labelledby="auth-title">' +
          '<div class="auth-card-heading">' +
            '<span class="auth-step-label">' + (isRegister ? 'REGISTRASI AKUN' : isForgot ? 'PEMULIHAN AKUN' : isReset ? 'KEAMANAN AKUN' : 'AKSES AKUN') + '</span>' +
            '<h2 id="auth-title">' + title + '</h2>' +
            '<p>' + intro + '</p>' +
          '</div>' +
          switcher +
          (isRegister ? '<div class="auth-preview-notice">Pendaftaran akun baru belum tersedia. Untuk saat ini, akses PLUITS hanya dapat digunakan oleh akun yang telah terdaftar.</div>' : '') +
          '<form class="auth-form" data-auth-form>' +
            fields +
            '<p class="auth-status" data-auth-status role="status" aria-live="polite"></p>' +
            '<button class="auth-submit" type="submit">' + submitText + renderIcon('arrow') + '</button>' +
          '</form>' +
          '<section class="auth-pending" data-auth-pending hidden aria-live="polite">' +
            '<div class="auth-pending-icon">' + renderIcon('mail') + '</div>' +
            '<span class="auth-step-label">SATU LANGKAH LAGI</span>' +
            '<h3>Periksa kotak masuk email Anda</h3>' +
            '<p>Tautan konfirmasi akun telah diminta untuk alamat email berikut:</p>' +
            '<strong data-pending-email></strong>' +
            '<ol><li>Buka email konfirmasi dari PLUITS.</li><li>Pilih tautan konfirmasi di dalam email.</li><li>Setelah konfirmasi selesai, kembali ke PLUITS untuk masuk.</li></ol>' +
            '<p class="auth-status" data-resend-status role="status" aria-live="polite"></p>' +
            '<button class="auth-secondary" type="button" data-resend>Kirim ulang email konfirmasi</button>' +
            '<a class="auth-text-link" href="' + routeHref('login') + '">Kembali ke Masuk</a>' +
          '</section>' +
          (isReset ? '<p class="auth-recovery-note">' + (hasRecoverySession ? 'Sesi pemulihan terdeteksi.' : 'Buka halaman ini melalui tautan pemulihan yang dikirim ke email akun.') + '</p>' : '') +
          '<p class="auth-switch-copy">' + footLink + '</p>' +
          '<p class="auth-security-note">' + renderIcon('lock') + '<span>Jaga kerahasiaan kata sandi dan jangan bagikan tautan pemulihan akun kepada siapa pun.</span></p>' +
        '</section>' +
      '</main>' +
      renderPageFooter() +
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

  if (isRegister && !PUBLIC_SIGNUP_ENABLED) {
    submit.disabled = true;
    submit.textContent = 'Pendaftaran belum dibuka';
    showStatus(status, 'Pendaftaran akun baru belum tersedia. Silakan masuk menggunakan akun PLUITS yang telah terdaftar.', 'info');
  }

  root.querySelectorAll('[data-toggle-password]').forEach((button) => {
    button.addEventListener('click', () => {
      const input = button.parentElement?.querySelector('input');
      if (!input) return;
      const reveal = input.type === 'password';
      input.type = reveal ? 'text' : 'password';
      button.innerHTML = renderIcon(reveal ? 'eyeOff' : 'eye');
      button.setAttribute('aria-label', reveal ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi');
      button.setAttribute('aria-pressed', String(reveal));
    });
  });

  resend?.addEventListener('click', async () => {
    if (!pendingEmail || resend.disabled) return;
    resend.disabled = true;
    resend.textContent = 'Meminta pengiriman…';
    try {
      await authService.resendConfirmation(pendingEmail);
      showStatus(resendStatus, 'Permintaan pengiriman ulang diterima. Periksa kotak masuk dan folder spam.', 'success');
      resend.textContent = 'Permintaan terkirim';
    } catch (error) {
      showStatus(resendStatus, authService.getErrorMessage?.(error) || 'Email belum dapat dikirim. Coba lagi nanti.');
      resend.disabled = false;
      resend.textContent = 'Coba kirim ulang';
    }
  });

  form?.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (isRegister && !PUBLIC_SIGNUP_ENABLED) return;
    if (!form.reportValidity()) return;

    const values = new FormData(form);
    submit.disabled = true;
    submit.textContent = 'Sedang memproses…';
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
        showStatus(status, 'Jika alamat email tersebut terdaftar, petunjuk pemulihan akan dikirim. Periksa kotak masuk dan folder spam.', 'success');
        submit.textContent = 'Permintaan terkirim';
      } else if (isReset) {
        await authService.updatePassword(values.get('password'));
        showStatus(status, 'Kata sandi berhasil diperbarui. Silakan masuk kembali.', 'success');
        submit.textContent = 'Kata sandi diperbarui';
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
