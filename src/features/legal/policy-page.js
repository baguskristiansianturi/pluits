import { assetUrl } from '../../config/runtime.js';
import './policy-page.css';

export function mountPolicyPage({ root, type }) {
  const isTerms = type === 'terms';
  const title = isTerms ? 'Ketentuan Layanan' : 'Kebijakan Privasi';
  const summary = isTerms
    ? 'Dokumen Ketentuan Layanan PLUITS masih dalam penyusunan dan belum disahkan sebagai dokumen final.'
    : 'Dokumen Kebijakan Privasi PLUITS masih dalam penyusunan dan belum disahkan sebagai dokumen final.';

  root.innerHTML =
    '<main class="policy-page">' +
      '<a class="pluits-brand" href="#/register"><img src="' + assetUrl('assets/brand/pluits-logo.svg') + '" alt="" width="34" height="34"><span>PLUITS</span></a>' +
      '<section class="policy-card"><span class="policy-status">DRAFT · BELUM FINAL</span><h1>' + title + '</h1><p>' + summary + '</p><p>Halaman ini disediakan agar status dokumen terlihat jelas selama pengujian internal. Pendaftaran publik belum dinyatakan siap sampai isi kebijakan, persetujuan, dan pencatatan consent ditinjau.</p><a href="#/register">Kembali ke pendaftaran</a></section>' +
    '</main>';
}
