import { routeHref } from '../../../config/paths.js';
import { renderIcon } from '../../../design-system/icons.js';
import { renderPageHeader } from '../../../design-system/page-shell.js';
import { demoReels } from '../feed/social-post-card.js';
import { mountReelPlayback } from './reel-media.js';
import './reels-page.css';
const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[char]));
const iconButton = (icon, label, attributes = '') => '<button type="button" class="sm-reels-icon-button" aria-label="' + label + '" title="' + label + '" ' + attributes + '>' + renderIcon(icon) + '</button>';
function renderReelActions(reel) {
  return '<aside class="sm-reels-actions" aria-label="Interaksi Reel">'
    + '<a class="sm-reels-action-avatar" href="' + routeHref('profile') + '" aria-label="Lihat profil ' + escapeHtml(reel.authorName) + '">' + renderIcon('user') + '<span class="sm-reels-follow-dot">+</span></a>'
    + '<button type="button" class="sm-reels-action" data-reel-auth-action aria-label="Suka Reel"><span class="ui-icon">' + renderIcon('heart') + '</span><small>Suka</small></button>'
    + '<button type="button" class="sm-reels-action" data-reel-auth-action aria-label="Komentar Reel"><span class="ui-icon">' + renderIcon('message') + '</span><small>Komentar</small></button>'
    + '<button type="button" class="sm-reels-action" data-reel-share aria-label="Bagikan Reel"><span class="ui-icon">' + renderIcon('arrow') + '</span><small>Bagikan</small></button>'
    + '<button type="button" class="sm-reels-action" data-reel-more aria-label="Opsi lainnya"><span class="ui-icon">' + renderIcon('moreVertical') + '</span><small>Lainnya</small></button>'
    + '<div class="sm-reels-more-menu" data-reel-more-menu hidden><button type="button" data-reel-share>Salin / bagikan tautan</button><button type="button" data-reel-auth-action>Laporkan</button></div></aside>';
}
function renderTopBar() {
  const actions = '<div class="sm-reels-header-actions"><a class="sm-reels-icon-button" href="' + routeHref('discover') + '" aria-label="Cari" title="Cari">' + renderIcon('search') + '</a>'
    + iconButton('bell', 'Notifikasi', 'data-reels-notifications-toggle aria-expanded="false"')
    + iconButton('menu', 'Menu', 'data-reels-menu-toggle aria-expanded="false"') + '</div>';
  return renderPageHeader({ brandHref: routeHref('social'), label: 'PLUITS', rightContent: actions, className: 'sm-reels-header' });
}
export function mountReelsPage({ root } = {}) {
  if (!root) return () => {};
  const requestedId = new URLSearchParams(window.location.search).get('id');
  const reels = demoReels.filter((reel) => reel.orientation === 'vertical' && Number(reel.durationSeconds || 0) > 0 && Number(reel.durationSeconds || 0) <= 60);
  const items = reels.map((reel) => '<article class="sm-reels-item" data-reel-item="' + escapeHtml(reel.id) + '"><video class="sm-reels-player" data-reel-candidate data-reel-autoplay data-reel-viewer-player src="' + escapeHtml(reel.mediaUrl) + '" poster="' + escapeHtml(reel.poster || '') + '" muted loop playsinline preload="metadata" aria-label="Reel dari ' + escapeHtml(reel.authorName) + '"></video>'
    + renderReelActions(reel) + '<div class="sm-reels-caption"><strong>' + escapeHtml(reel.authorName) + ' · @' + escapeHtml(reel.username) + '</strong><p>' + escapeHtml(reel.caption) + '</p></div></article>').join('');
  root.innerHTML = '<div class="sm-reels-page" aria-label="Reels">' + renderTopBar()
    + '<main class="sm-reels-viewer" aria-label="Daftar Reel">' + items
    + '<div class="sm-reels-empty" data-reels-empty' + (items ? ' hidden' : '') + '><span class="ui-icon">' + renderIcon('film') + '</span><strong>Belum ada Reel vertikal</strong><p>Video horizontal dan video berdurasi lebih dari 60 detik tetap berada di feed sebagai video biasa.</p><a href="' + routeHref('social') + '">Kembali ke Beranda</a></div></main>'
    + '<section class="sm-reels-notifications" data-reels-notifications hidden aria-label="Notifikasi"><strong>Notifikasi</strong><p>Aktivitas akun, komunitas, dan hal lain yang perlu Anda ketahui akan muncul di sini.</p><span>Belum ada notifikasi baru</span></section>'
    + '<div class="sm-reels-drawer-backdrop" data-reels-drawer-backdrop hidden><nav class="sm-reels-drawer" aria-label="Menu PLUITS"><div class="sm-reels-drawer-heading"><strong>Menu</strong><button type="button" data-reels-menu-close aria-label="Tutup menu">×</button></div>'
    + '<a href="' + routeHref('social') + '">' + renderIcon('grid') + ' Beranda</a><a href="' + routeHref('discover') + '">' + renderIcon('search') + ' Jelajahi</a><a href="' + routeHref('blog') + '">' + renderIcon('book') + ' Blog</a><a href="' + routeHref('messages') + '">' + renderIcon('message') + ' Pesan</a><a href="' + routeHref('profile') + '">' + renderIcon('user') + ' Profil</a><a href="' + routeHref('settings') + '">' + renderIcon('settings') + ' Pengaturan</a></nav></div>'
    + '<p class="sm-reels-feedback" data-reels-feedback role="status" aria-live="polite"></p></div>';
  const target = requestedId && [...root.querySelectorAll('[data-reel-item]')].find((item) => item.dataset.reelItem === requestedId);
  if (target) requestAnimationFrame(() => target.scrollIntoView({ block: 'start' }));
  const unmountPlayback = mountReelPlayback(root);
  const notifications = root.querySelector('[data-reels-notifications]');
  const notificationToggle = root.querySelector('[data-reels-notifications-toggle]');
  const drawer = root.querySelector('[data-reels-drawer-backdrop]');
  const menuToggle = root.querySelector('[data-reels-menu-toggle]');
  const feedback = root.querySelector('[data-reels-feedback]');
  const closeDrawer = () => { if (drawer) drawer.hidden = true; menuToggle?.setAttribute('aria-expanded', 'false'); };
  const showFeedback = (message) => { if (feedback) feedback.textContent = message; };
  notificationToggle?.addEventListener('click', () => {
    const opening = notifications.hidden; notifications.hidden = !opening; notificationToggle.setAttribute('aria-expanded', String(opening)); closeDrawer();
  });
  menuToggle?.addEventListener('click', () => {
    drawer.hidden = false; menuToggle.setAttribute('aria-expanded', 'true'); notifications.hidden = true; notificationToggle?.setAttribute('aria-expanded', 'false');
  });
  root.querySelector('[data-reels-menu-close]')?.addEventListener('click', closeDrawer);
  drawer?.addEventListener('click', (event) => { if (event.target === drawer) closeDrawer(); });
  root.addEventListener('keydown', (event) => { if (event.key === 'Escape') { closeDrawer(); notifications.hidden = true; notificationToggle?.setAttribute('aria-expanded', 'false'); } });
  root.addEventListener('click', async (event) => {
    const authAction = event.target.closest('[data-reel-auth-action]');
    if (authAction) { window.location.href = routeHref('login'); return; }
    const more = event.target.closest('[data-reel-more]');
    if (more) { const menu = more.closest('[data-reel-item]')?.querySelector('[data-reel-more-menu]'); if (menu) menu.hidden = !menu.hidden; return; }
    const share = event.target.closest('[data-reel-share]');
    if (share) {
      const item = share.closest('[data-reel-item]') || root.querySelector('[data-reel-item]:not([hidden])');
      const url = window.location.origin + window.location.pathname + (item?.dataset.reelItem ? '?id=' + encodeURIComponent(item.dataset.reelItem) : '');
      try {
        if (navigator.share) await navigator.share({ title: 'PLUITS Reel', url });
        else if (navigator.clipboard?.writeText) { await navigator.clipboard.writeText(url); showFeedback('Tautan Reel disalin.'); }
        else showFeedback(url);
      } catch (error) { if (error?.name !== 'AbortError') showFeedback('Tautan Reel: ' + url); }
    }
  });
  return () => unmountPlayback();
}
