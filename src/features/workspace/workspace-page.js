import { assetUrl } from '../../config/runtime.js';
import '../../design-system/page-shell.css';
import { renderPageHeader } from '../../design-system/page-shell.js';
import { renderIcon } from '../../design-system/icons.js';
import { LAYOUT_REGISTRY } from '../../design-system/layouts.js';
import './workspace-page.css';

const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[char]));

const stages = [
  { number: '01', title: 'Pendaftaran Akun', description: 'Fondasi autentikasi, tampilan, responsivitas, dan koneksi backend.', status: 'Sedang diuji', current: true },
  { number: '02', title: 'Global Home', description: 'Halaman awal PLUITS sebelum pengguna masuk ke pengalaman personal.', status: 'Tahap berikutnya' },
  { number: '03', title: 'Profil Utama', description: 'Identitas dan pengaturan akun utama yang digunakan lintas ekosistem.', status: 'Menunggu' },
  { number: '04', title: 'Social Media', description: 'Pengalaman sosial PLUITS dan integrasinya dengan ekosistem lain.', status: 'Menunggu' }
];

export function mountWorkspacePage({ root, user, onSignOut }) {
  const name = escapeHtml(user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Pengguna');
  const email = escapeHtml(user?.email || '');
  const initial = escapeHtml(name.slice(0, 1).toUpperCase());
  const stageCards = stages.map((stage) =>
    '<article class="stage-card' + (stage.current ? ' is-current' : '') + '">' +
      '<div class="stage-card-top"><span class="stage-number">' + stage.number + '</span><span class="stage-status">' + stage.status + '</span></div>' +
      '<h3>' + stage.title + '</h3><p>' + stage.description + '</p>' +
      (stage.current ? '<span class="stage-current-mark">' + renderIcon('check') + ' Fokus sekarang</span>' : '') +
    '</article>'
  ).join('');

  root.innerHTML =
    '<div class="workspace-page">' +
      renderPageHeader({
        label: 'PLUITS ruang kerja',
        variant: 'workspace',
        rightContent: '<div class="workspace-header-right"><span class="workspace-label">RUANG KERJA</span><div class="workspace-user"><span class="workspace-avatar">' + initial + '</span><span class="workspace-user-name">' + name + '</span></div><button class="workspace-signout" type="button" data-sign-out>' + renderIcon('logout') + '<span>Keluar</span></button></div>'
      }) +
      '<main class="workspace-main">' +
        '<section class="workspace-welcome">' +
          '<div><span class="workspace-eyebrow">WORKSPACE · INTERNAL</span><h1>Selamat datang, ' + name + '.</h1><p>Ini adalah ruang kerja awal untuk membangun PLUITS bersama, tahap demi tahap.</p><span class="workspace-account">' + email + '</span></div>' +
          '<div class="workspace-welcome-mark"><img src="' + assetUrl('assets/brand/pluits-logo.svg') + '" alt="" width="104" height="104"></div>' +
        '</section>' +
        '<section class="workspace-section">' +
          '<div class="section-heading"><div><span class="workspace-eyebrow">ROADMAP PEMBANGUNAN</span><h2>Urutan pekerjaan</h2></div><span class="section-meta">4 tahap utama</span></div>' +
          '<div class="stage-grid">' + stageCards + '</div>' +
        '</section>' +
        '<section class="workspace-lower-grid">' +
          '<article class="work-method-card">' +
            '<div class="workspace-card-icon">' + renderIcon('message') + '</div>' +
            '<span class="workspace-eyebrow">CARA KITA BEKERJA</span>' +
            '<h2>Diskusi dulu, implementasi setelah jelas.</h2>' +
            '<p>Setiap ide dan koreksi dari percakapan dicatat sebagai bahan mentah di Sharing Inbox. Setelah ditinjau dan disetujui, barulah disusun ke Master Model.</p>' +
            '<ol class="work-steps"><li>Sharing dan klarifikasi kebutuhan</li><li>Audit struktur dan dependensi</li><li>Persetujuan model dan spesifikasi</li><li>Implementasi, pengujian, dan deploy</li></ol>' +
          '</article>' +
          '<article class="workspace-docs-card">' +
            '<div class="workspace-card-icon">' + renderIcon('book') + '</div>' +
            '<span class="workspace-eyebrow">DOKUMENTASI RESMI</span>' +
            '<h2>Satu sumber aturan kerja.</h2>' +
            '<p>Dokumen ini menjadi acuan agar setiap perubahan mengikuti struktur, pemilik modul, dan batasan yang benar.</p>' +
            '<a class="workspace-doc-link" href="https://github.com/baguskristiansianturi/pluits/tree/main/PLUITS-MASTER-MODEL-APP" target="_blank" rel="noopener noreferrer">Buka Master Model ' + renderIcon('arrow') + '</a>' +
            '<a class="workspace-doc-link" href="https://github.com/baguskristiansianturi/pluits/tree/main/PLUITS-SHARING-INBOX" target="_blank" rel="noopener noreferrer">Buka Sharing Inbox ' + renderIcon('arrow') + '</a>' +
          '</article>' +
        '</section>' +
        '<section class="workspace-ai-note"><div><span class="workspace-eyebrow">PENGUJIAN ALUR KERJA AI</span><h2>Setiap perubahan harus punya jejak.</h2><p>AI wajib membaca aturan, memeriksa struktur aktual, menentukan lokasi perubahan, menguji dampaknya, lalu melaporkan commit dan status deployment. Tidak boleh mengarang path, melewati audit, atau mengubah modul yang tidak diminta.</p></div><span class="workspace-ai-badge">FOUNDATION V0.1</span></section>' +
        '<p class="workspace-footnote">Layout: ' + LAYOUT_REGISTRY[1].id + ' · Status: provisional · Ruang kerja ini belum menjadi Global Home atau dashboard operasional final.</p>' +
      '</main>' +
    '</div>';

  const signOut = root.querySelector('[data-sign-out]');
  signOut?.addEventListener('click', async () => {
    signOut.disabled = true;
    signOut.innerHTML = 'Keluar…';
    try {
      await onSignOut?.();
    } catch {
      signOut.disabled = false;
      signOut.innerHTML = renderIcon('logout') + '<span>Keluar</span>';
      const notice = document.createElement('p');
      notice.className = 'workspace-signout-error';
      notice.textContent = 'Belum berhasil keluar. Periksa koneksi lalu coba lagi.';
      root.querySelector('.pl-page-header--workspace')?.after(notice);
    }
  });
}
