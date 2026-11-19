import { routeHref } from '../../config/paths.js';
import './policy-page.css';
import '../../design-system/page-shell.css';
import { renderPageHeader } from '../../design-system/page-shell.js';
import { renderPublicFooter } from '../public-info/public-footer.js';

import { LEGAL_POLICIES } from './pages/index.js';

export function mountPolicyPage({ root, type }) {
  const policy = LEGAL_POLICIES[type];
  if (!policy) return;
  const sections = policy.sections.map(([heading, copy], index) =>
    '<section class="policy-section" id="policy-section-' + (index + 1) + '"><h2>' + (index + 1) + '. ' + heading + '</h2><p>' + copy + '</p></section>'
  ).join('');
  const contents = policy.sections.map(([heading], index) =>
    '<a href="#policy-section-' + (index + 1) + '">' + (index + 1) + '. ' + heading + '</a>'
  ).join('');
  root.innerHTML =
    '<div class="pl-page-shell policy-shell">' +
      renderPageHeader({ note: 'EKOSISTEM DIGITAL TERINTEGRASI', label: 'PLUITS — kebijakan' }) +
      '<main class="pl-page-main policy-page"><article class="policy-card">' +
        '<span class="policy-status">' + policy.status + '</span>' +
        '<h1>' + policy.title + '</h1><p class="policy-intro">' + policy.intro + '</p>' +
        '<nav class="policy-contents" aria-label="Daftar isi"><strong>Dalam dokumen ini</strong>' + contents + '</nav>' +
        sections +
        '<p class="policy-disclaimer">Status dokumen: rancangan persiapan produk. Belum menjadi ketentuan final atau bukti kepatuhan. Versi final harus disetujui operator PLUITS dan ditinjau penasihat hukum sebelum peluncuran publik.</p>' +
        '<a class="policy-back-link" href="' + routeHref('home') + '">Kembali ke Beranda</a>' +
      '</article></main>' +
      renderPublicFooter() +
    '</div>';
}
