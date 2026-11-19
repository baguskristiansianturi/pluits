import { routeHref } from '../../config/paths.js';
import './policy-page.css';
import '../../design-system/page-shell.css';
import { renderPageHeader } from '../../design-system/page-shell.js';
import { renderPublicFooter } from '../public-info/public-footer.js';

export function mountPolicyPage({ root, type }) {
  const isTerms = type === 'terms';
  const title = isTerms ? 'Ketentuan Layanan' : 'Kebijakan Privasi';
  const summary = isTerms
    ? 'Dokumen Ketentuan Layanan PLUITS masih dalam penyusunan dan belum disahkan sebagai dokumen final.'
    : 'Dokumen Kebijakan Privasi PLUITS masih dalam penyusunan dan belum disahkan sebagai dokumen final.';

  root.innerHTML =
    '<div class="pl-page-shell policy-shell">' +
      renderPageHeader({ note: 'EKOSISTEM DIGITAL TERINTEGRASI', label: 'PLUITS — halaman kebijakan' }) +
      '<main class="pl-page-main policy-page">' +
      '<section class="policy-card"><span class="policy-status">DRAFT · BELUM FINAL</span><h1>' + title + '</h1><p>' + summary + '</p><p>Halaman ini disediakan agar status dokumen terlihat jelas selama pengujian internal. Pendaftaran publik belum dinyatakan siap sampai isi kebijakan, persetujuan, dan pencatatan consent ditinjau.</p><a href="' + routeHref('login') + '">Kembali ke Masuk</a></section>' +
      '</main>' +
      renderPublicFooter() +
    '</div>';
}
