import { getLogoAsset } from '../../design-system/assets/logo-registry.js';

export const BRAND_LOGO_SRC = getLogoAsset('logo-mark').src;

/**
 * Render the single canonical PLUITS brand component.
 * All pages use the same repository-owned logo artwork and fixed design token.
 * Layout may size the surrounding link, but must not resize the logo mark.
 */
export function renderBrandLogo({ href = '#/', className = '', label = 'Beranda PLUITS', wordmark = false } = {}) {
  const classes = ['pluits-brand-mark', className].filter(Boolean).join(' ');
  const wordmarkMarkup = wordmark ? '<span class="pluits-brand-wordmark">PLUITS</span>' : '';
  return `<a class="${classes}" href="${href}" aria-label="${label}"><img src="${BRAND_LOGO_SRC}" alt="" width="40" height="40" decoding="async" fetchpriority="high">${wordmarkMarkup}</a>`;
}
