import { assetUrl } from '../config/runtime.js';
import { routeHref } from '../config/paths.js';

export function renderPageHeader({ note = 'EKOSISTEM DIGITAL TERINTEGRASI', label = 'PLUITS' } = {}) {
  return '<header class="pl-page-header">' +
    '<a class="pluits-brand" href="' + routeHref('login') + '" aria-label="' + label + '">' +
      '<img src="' + assetUrl('assets/brand/pluits-logo.svg') + '" alt="" width="34" height="34">' +
      '<span>PLUITS</span>' +
    '</a>' +
    '<span class="pl-page-header-note">' + note + '</span>' +
  '</header>';
}

export function renderPageFooter() {
  return '<footer class="pl-page-footer"><span>© 2026 PLUITS. Hak cipta dilindungi.</span><span>PLUITS · Ekosistem Digital</span></footer>';
}
