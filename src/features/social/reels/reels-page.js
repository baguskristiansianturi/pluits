import { routeHref } from '../../../config/paths.js';
import { demoReels } from '../feed/social-post-card.js';
import { mountReelPlayback } from './reel-media.js';
import './reels-page.css';

const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[char]));

export function mountReelsPage({ root } = {}) {
  if (!root) return () => {};
  const requestedId = new URLSearchParams(window.location.search).get('id');
  const reels = [...demoReels];
  root.innerHTML = '<main class="sm-reels-page" aria-label="Reels"><header class="sm-reels-topbar"><a href="' + routeHref('social') + '" aria-label="Kembali ke beranda">‹</a><strong>Reels</strong><a href="' + routeHref('social') + '">Beranda</a></header><section class="sm-reels-viewer" aria-label="Daftar Reel">' + reels.map((reel) => '<article class="sm-reels-item" data-reel-item="' + escapeHtml(reel.id) + '"><video class="sm-reels-player" data-reel-autoplay src="' + escapeHtml(reel.mediaUrl) + '" poster="' + escapeHtml(reel.poster || '') + '" controls muted loop playsinline preload="metadata" aria-label="Reel dari ' + escapeHtml(reel.authorName) + '"></video><div class="sm-reels-caption"><strong>' + escapeHtml(reel.authorName) + ' · @' + escapeHtml(reel.username) + '</strong><p>' + escapeHtml(reel.caption) + '</p></div></article>').join('') + '</section></main>';
  const target = requestedId && root.querySelector('[data-reel-item="' + CSS.escape(requestedId) + '"]');
  if (target) requestAnimationFrame(() => target.scrollIntoView({ block: 'start' }));
  const unmountPlayback = mountReelPlayback(root);
  return () => unmountPlayback();
}
