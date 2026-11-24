import { routeHref } from '../../config/paths.js';
import '../../design-system/page-shell.css';
import { renderPageHeader } from '../../design-system/page-shell.js';
import { renderIcon } from '../../design-system/icons.js';
import './blog-page.css';

const articles = [
  { id:'kota', category:'Perjalanan', read:'6 menit baca', title:'Menemukan sisi lain dari sebuah kota', excerpt:'Kisah perjalanan, tempat menarik, dan pengalaman yang layak dibagikan.', author:'Tim Editorial PLUITS', date:'Contoh artikel', art:'journey' },
  { id:'harian', category:'Cerita', read:'4 menit baca', title:'Cerita kecil yang layak dibagikan', excerpt:'Catatan kecil tentang keseharian, inspirasi, dan hal-hal sederhana.', author:'Komunitas PLUITS', date:'Contoh artikel', art:'journal' },
  { id:'ruang', category:'Panduan', read:'5 menit baca', title:'Mengenal ruang lokal dari sudut pandang warga', excerpt:'Panduan ringan untuk melihat lingkungan, kebiasaan, dan cerita di balik sebuah tempat.', author:'Tim Editorial PLUITS', date:'Contoh artikel', art:'local' }
];

const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

export function mountBlogPage({ root, user = null } = {}) {
  let activeCategory = 'Semua';
  let query = '';

  const renderCards = () => {
    const filtered = articles.filter((article) => {
      const matchesCategory = activeCategory === 'Semua' || article.category === activeCategory;
      const haystack = (article.title + ' ' + article.excerpt + ' ' + article.category).toLocaleLowerCase('id-ID');
      return matchesCategory && haystack.includes(query.toLocaleLowerCase('id-ID'));
    });
    const list = root.querySelector('[data-sm-blog-list]');
    if (!list) return;
    list.innerHTML = filtered.length
      ? filtered.map((article) => '<article class="sm-blog-card"><div class="sm-blog-card-art sm-blog-card-art--' + article.art + '" aria-hidden="true"><span>' + escapeHtml(article.category) + '</span></div><div class="sm-blog-card-copy"><div class="sm-blog-card-meta"><span>' + escapeHtml(article.category) + '</span><span>' + escapeHtml(article.read) + '</span></div><h2>' + escapeHtml(article.title) + '</h2><p>' + escapeHtml(article.excerpt) + '</p><div class="sm-blog-card-byline"><span>' + escapeHtml(article.author) + '</span><span>' + escapeHtml(article.date) + '</span></div></div></article>').join('')
      : '<div class="sm-blog-empty" role="status"><strong>Belum ada artikel yang cocok.</strong><p>Coba kata kunci atau kategori lain.</p></div>';
    const count = root.querySelector('[data-sm-blog-count]');
    if (count) count.textContent = filtered.length + ' artikel';
  };

  root.innerHTML = '<div class="pl-page-shell pl-page-shell--surface pl-page-shell--standard-content sm-blog-page">'
    + renderPageHeader({ brandHref: routeHref('social'), label: 'PLUITS — Social Media', rightContent: '<a class="sm-blog-account" href="' + routeHref(user ? 'profile' : 'login') + '">' + renderIcon('user') + '<span>' + (user ? 'Profil' : 'Masuk') + '</span></a>', className: 'sm-blog-header' })
    + '<main class="pl-page-main sm-blog-main"><a class="sm-blog-back" href="' + routeHref('social') + '">' + renderIcon('arrow') + '<span>Kembali ke Social Home</span></a>'
    + '<section class="sm-blog-hero"><span class="sm-blog-eyebrow">SOCIAL MEDIA · BLOG</span><h1>Ruang untuk cerita yang lebih panjang.</h1><p>Artikel, catatan, perjalanan, dan gagasan dari komunitas PLUITS.</p></section>'
    + '<section class="sm-blog-library" aria-label="Koleksi artikel"><div class="sm-blog-tools"><div class="sm-blog-categories" role="group" aria-label="Filter kategori">' + ['Semua','Perjalanan','Cerita','Panduan'].map((category) => '<button type="button" data-sm-blog-category="' + category + '" class="' + (category === activeCategory ? 'is-active' : '') + '" aria-pressed="' + String(category === activeCategory) + '">' + category + '</button>').join('') + '</div><label class="sm-blog-search"><span class="sr-only">Cari artikel</span>' + renderIcon('search') + '<input type="search" data-sm-blog-search placeholder="Cari artikel…" autocomplete="off"></label></div>'
    + '<div class="sm-blog-list-heading"><h2>Jelajahi Blog</h2><span data-sm-blog-count>3 artikel</span></div><div class="sm-blog-grid" data-sm-blog-list></div>'
    + '<p class="sm-blog-preview-note">Konten di halaman ini masih berupa data pratinjau frontend. Artikel terbit, akun penulis, komentar, dan penyimpanan belum terhubung ke layanan backend.</p></section></main></div>';

  root.querySelectorAll('[data-sm-blog-category]').forEach((button) => button.addEventListener('click', () => {
    activeCategory = button.dataset.smBlogCategory;
    root.querySelectorAll('[data-sm-blog-category]').forEach((item) => {
      const selected = item === button;
      item.classList.toggle('is-active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    renderCards();
  }));
  root.querySelector('[data-sm-blog-search]')?.addEventListener('input', (event) => {
    query = event.target.value.trim();
    renderCards();
  });
  renderCards();
  return () => {};
}
