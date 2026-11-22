import { assetUrl } from '../config/runtime.js';
import { routeHref } from '../config/paths.js';
import { renderIcon } from './icons.js';
const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[char]));
const resolveHref = (href, route) => href || (route ? routeHref(route) : routeHref('home'));
export function renderBrand({ href, label = 'PLUITS' } = {}) {
  return '<a class="pluits-brand" href="' + escapeHtml(resolveHref(href)) + '" aria-label="' + escapeHtml(label) + '">' +
    '<img src="' + assetUrl('assets/brand/pluits-logo.svg') + '" alt=""><span>PLUITS</span></a>';
}
export function renderNavbar({ items = [], active = '', ariaLabel = 'Navigasi utama', className = '' } = {}) {
  const links = items.map((item) => {
    const href = resolveHref(item.href, item.route);
    const current = item.id && item.id === active;
    return '<a class="pl-navbar-link' + (current ? ' is-active' : '') + '" href="' + escapeHtml(href) + '"' +
      (current ? ' aria-current="page"' : '') + '>' + escapeHtml(item.label) + '</a>';
  }).join('');
  return '<nav class="pl-navbar' + (className ? ' ' + escapeHtml(className) : '') + '" aria-label="' + escapeHtml(ariaLabel) + '">' + links + '</nav>';
}
export function renderPageHeader({ note = 'EKOSISTEM DIGITAL TERINTEGRASI', label = 'PLUITS', brandHref, items = [], active = '', navLabel = 'Navigasi utama', rightContent = '', variant = '', className = '', dataGlobalHeader = false } = {}) {
  const classes = ['pl-page-header', variant ? 'pl-page-header--' + variant : '', className].filter(Boolean).map(escapeHtml).join(' ');
  return '<header class="' + classes + '"' + (dataGlobalHeader ? ' data-global-header' : '') + '>' +
    renderBrand({ href: brandHref, label }) + (items.length ? renderNavbar({ items, active, ariaLabel: navLabel }) : '') +
    (rightContent || '<span class="pl-page-header-note">' + escapeHtml(note) + '</span>') + '</header>';
}
export function renderPageFooter({ copyright = '© 2026 PLUITS. All rights reserved.', attribution = 'One connected digital ecosystem.', groups = [], legalLinks = [] } = {}) {
  const groupMarkup = groups.map((group) => '<section class="pl-footer-group"><h2>' + escapeHtml(group.title) + '</h2><ul>' +
    (group.items || []).map((item) => '<li><a href="' + escapeHtml(resolveHref(item.href, item.route)) + '">' + escapeHtml(item.label) + '</a></li>').join('') +
    '</ul></section>').join('');
  const legalMarkup = legalLinks.length ? '<nav class="pl-footer-legal" aria-label="Informasi hukum">' + legalLinks.map((item) =>
    '<a href="' + escapeHtml(resolveHref(item.href, item.route)) + '">' + escapeHtml(item.label) + '</a>').join('') + '</nav>' : '';
  return '<footer class="pl-page-footer' + (groups.length ? ' pl-page-footer--expanded' : '') + '">' +
    (groups.length ? '<div class="pl-footer-groups">' + groupMarkup + '</div>' : '') +
    '<div class="pl-footer-bottom"><span>' + escapeHtml(copyright) + '</span>' + (legalMarkup || '<span>' + escapeHtml(attribution) + '</span>') + '</div></footer>';
}


export function renderBottomNavigation(active = '') {
  const items = [
    { id: 'social', route: 'social', label: 'Beranda', icon: 'book' },
    { id: 'discover', route: 'discover', label: 'Jelajah', icon: 'eye' },
    { id: 'create', route: 'dashboard', label: '', icon: '' },
    { id: 'messages', route: 'messages', label: 'Pesan', icon: 'message' },
    { id: 'profile', route: 'profile', label: 'Profil', icon: 'user' }
  ];
  return '<nav class="global-bottom-nav pl-global-bottom-nav" aria-label="Navigasi utama">' +
    items.map((item) => item.id === 'create'
      ? '<a class="global-create-button" href="' + routeHref(item.route) + '" aria-label="Buka Ruang Kerja" title="Ruang Kerja"><span aria-hidden="true">+</span></a>'
      : '<a href="' + routeHref(item.route) + '" class="' + (active === item.id ? 'is-active' : '') + '"' + (active === item.id ? ' aria-current="page"' : '') + '>' + renderIcon(item.icon) + '<span>' + item.label + '</span></a>'
    ).join('') + '</nav>';
}
