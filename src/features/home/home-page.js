import { routeHref } from '../../config/paths.js';
import '../../design-system/page-shell.css';
import { renderPageHeader } from '../../design-system/page-shell.js';
import { renderIcon } from '../../design-system/icons.js';
import './home-page.css';

const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[char]));
const contentTabs = [{id:'feed',label:'Feed'},{id:'reels',label:'Reels'},{id:'live',label:'Live'},{id:'blog',label:'Blog'}];
const demoCards = {
  global:[['TRENDING','Cerita dari Bali','Momen dan cerita yang sedang ramai','sunset'],['KOMUNITAS','Ruang kreatif','Temukan komunitas dengan minat serupa','creative'],['KULINER','Rasa Nusantara','Rekomendasi tempat dan pengalaman lokal','food'],['JELAJAH','Akhir pekan','Inspirasi perjalanan di Indonesia','travel']],
  nearby:[['DENPASAR','Sudut kota hari ini','Tempat menarik di sekitar Anda','city'],['KULINER','Tempat ngopi','Ruang santai untuk bertemu','coffee'],['AKTIVITAS','Agenda lokal','Aktivitas menarik di sekitar','event'],['KOMUNITAS','Teman sekitar','Kenali komunitas di area Anda','people']],
  people:[['CONTOH PROFIL','Ayu Pratiwi','Travel · Bali','person-a'],['CONTOH PROFIL','Raka Mahendra','Photography · Jakarta','person-b'],['CONTOH PROFIL','Nadia Putri','Food & Lifestyle · Bandung','person-c'],['CONTOH PROFIL','Dimas Saputra','Creative · Yogyakarta','person-d'],['CONTOH PROFIL','Sinta Maharani','Community · Surabaya','person-e']]
};
const heading = (title, note, action, href) => '<div class="global-section-heading"><div><h2>' + title + '</h2><p>' + note + '</p></div>' + (action ? '<a href="' + href + '">' + action + ' <span aria-hidden="true">→</span></a>' : '') + '</div>';
function demoRail(items,label) {
  return '<div class="global-bleed-wrap"><div class="global-demo-rail" aria-label="' + label + '">' + items.map((item,index)=>'<article class="global-demo-card global-demo-card--' + item[3] + '"><div class="global-demo-art"><span>' + item[0] + '</span><i>' + (index+1).toString().padStart(2,'0') + '</i></div><div class="global-demo-copy"><strong>' + item[1] + '</strong><p>' + item[2] + '</p></div></article>').join('') + '</div></div>';
}
function storyRail() {
  const items=[['B','Bagus','story-a'],['A','Ayu','story-b'],['R','Raka','story-c'],['N','Nadia','story-d'],['D','Dimas','story-e'],['S','Sinta','story-f']];
  return '<div class="global-bleed-wrap"><div class="global-story-rail" aria-label="Stories contoh">' + items.map((item,index)=>'<div class="global-story-item"><span class="global-story-ring global-story-ring--' + item[2] + '">' + item[0] + '</span><small>' + item[1] + (index===0?' · Anda':'') + '</small></div>').join('') + '</div></div>';
}
function bottomNav() {
  return '<nav class="global-bottom-nav" aria-label="Navigasi utama">' +
    '<a href="' + routeHref('social') + '" class="is-active" aria-current="page">' + renderIcon('book') + '<span>Beranda</span></a>' +
    '<a href="' + routeHref('discover') + '">' + renderIcon('eye') + '<span>Jelajah</span></a>' +
    '<a class="global-create-button" href="' + routeHref('dashboard') + '" aria-label="Buka Ruang Kerja" title="Ruang Kerja"><span>+</span></a>' +
    '<a href="' + routeHref('messages') + '" aria-label="Pesan">' + renderIcon('message') + '<span>Pesan</span></a>' +
    '<a href="' + routeHref('profile') + '" aria-label="Profil">' + renderIcon('user') + '<span>Profil</span></a></nav>';
}
function createSheet() {
  return '<div class="global-create-backdrop" data-create-backdrop hidden><section class="global-create-sheet" role="dialog" aria-modal="true" aria-labelledby="create-title"><button type="button" class="global-create-close" data-close-create aria-label="Tutup">×</button><span class="global-kicker">MULAI SESUATU</span><h2 id="create-title">Buat di PLUITS</h2><p>Pilih format yang ingin disiapkan. Publikasi akan diaktifkan setelah layanan terkait tersedia.</p><div class="global-create-options"><button disabled>Feed <small>Belum tersedia</small></button><button disabled>Reels <small>Belum tersedia</small></button><button disabled>Story <small>Belum tersedia</small></button><button disabled>Live <small>Belum tersedia</small></button><button disabled>Blog <small>Belum tersedia</small></button></div><a href="' + routeHref('dashboard') + '">Buka Dashboard pengelolaan →</a></section></div>';
}
function renderPostCard(post) {
  const media = post.mediaUrl
    ? (post.media_type === 'video'
      ? '<video class="global-post-media" src="' + escapeHtml(post.mediaUrl) + '" controls playsinline preload="none"></video>'
      : '<img class="global-post-media" src="' + escapeHtml(post.mediaUrl) + '" alt="Konten dari ' + escapeHtml(post.authorName) + '" loading="lazy">')
    : '<div class="global-post-media-fallback">' + renderIcon(post.media_type === 'video' ? 'play' : 'image') + '<span>Media tidak dapat dimuat</span></div>';
  const avatar = post.avatarUrl
    ? '<img src="' + escapeHtml(post.avatarUrl) + '" alt="" loading="lazy">'
    : '<span>' + escapeHtml((post.authorName || 'P').slice(0,1).toUpperCase()) + '</span>';
  const caption = post.caption ? '<p class="global-post-caption">' + escapeHtml(post.caption) + '</p>' : '';
  const kind = post.content_kind === 'reel' ? 'REELS' : 'FEED';
  const date = post.created_at ? new Date(post.created_at).toLocaleDateString('id-ID',{day:'numeric',month:'short'}) : '';
  return '<article class="global-post-card"><header class="global-post-author"><span class="global-post-avatar">' + avatar + '</span><span class="global-post-author-copy"><strong>' + escapeHtml(post.authorName) + '</strong><small>@' + escapeHtml(post.username || 'pengguna') + ' · ' + date + '</small></span><span class="global-post-kind">' + kind + '</span></header>' + media + caption + '<footer class="global-post-actions"><span>' + renderIcon('heart') + ' Suka</span><span>' + renderIcon('message') + ' Komentar</span><span>' + renderIcon('arrow') + ' Bagikan</span></footer></article>';
}
function renderFeedState(message,loading=false) {
  return '<div class="global-feed-state' + (loading?' is-loading':'') + '">' + (loading?'<span class="global-feed-spinner" aria-hidden="true"></span>':'<span class="global-feed-state-icon">' + renderIcon('image') + '</span>') + '<strong>' + message + '</strong>' + (!loading?'<p>Konten publik yang sudah diterbitkan akan muncul di sini.</p>':'') + '</div>';
}
function demoContent(kind) {
  if(kind==='live')return '<article class="global-live-demo"><div class="global-live-art"><span class="global-live-indicator">LIVE · CONTOH</span><div class="global-live-orbit">PL</div><strong>Temukan siaran langsung</strong><small>Pratinjau tampilan ruang Live</small></div><div class="global-live-meta"><strong>Live bersama komunitas</strong><p>Contoh kartu siaran untuk menguji hierarki informasi dan tombol interaksi.</p><span>0 penonton · Tampilan demo</span></div></article>';
  return '<div class="global-blog-demo-grid"><article class="global-blog-demo"><div class="global-blog-art global-blog-art--one"><span>JURNAL PERJALANAN</span></div><div><small>CONTOH ARTIKEL · 6 MENIT BACA</small><strong>Menemukan sisi lain dari sebuah kota</strong><p>Pratinjau kartu artikel untuk menguji tampilan Blog di Global Home.</p></div></article><article class="global-blog-demo"><div class="global-blog-art global-blog-art--two"><span>CATATAN HARIAN</span></div><div><small>CONTOH ARTIKEL · 4 MENIT BACA</small><strong>Cerita kecil yang layak dibagikan</strong><p>Contoh visual sementara, bukan artikel yang sudah dipublikasikan.</p></div></article></div>';
}
export function mountHomePage({root,user=null,onSignOut}={}) {
  const account = '<a class="global-icon-button" href="' + routeHref(user?'profile':'login') + '" aria-label="' + (user?'Akun':'Masuk') + '" title="' + (user?'Akun':'Masuk') + '">' + renderIcon('user') + '</a>';
  const actions = '<div class="global-header-actions">' + account + '<a class="global-icon-button" href="' + routeHref('discover') + '" aria-label="Cari" title="Cari">' + renderIcon('search') + '</a><a class="global-icon-button" href="' + routeHref('dashboard') + '" aria-label="Keranjang" title="Keranjang">' + renderIcon('cart') + '</a><a class="global-icon-button" href="' + routeHref('dashboard') + '" aria-label="Notifikasi" title="Notifikasi">' + renderIcon('bell') + '</a></div>';
  const discovery = [
    ['top-global','Top Global','Sorotan aktivitas dari seluruh Indonesia.','Lihat Semua',demoCards.global],
    ['nearby','Di Sekitar Anda','Temukan hal menarik berdasarkan lokasi Anda.','Lihat Semua',demoCards.nearby],
    ['people','Orang yang Mungkin Anda Kenal','Temukan akun dan komunitas baru.','Jelajahi',demoCards.people]
  ].map(([id,title,note,cta,cards]) => '<section class="global-section" id="' + id + '">' + heading(title,note,cta,routeHref('discover')) + demoRail(cards,title) + '</section>').join('');
  const streams = contentTabs.map((tab,index) => {
    const body=tab.id==='feed'?'<div class="global-post-list" data-live-feed>' + renderFeedState('Memuat postingan publik…',true) + '</div>'
      :tab.id==='reels'?'<div class="global-post-list global-reels-list" data-live-reels>' + renderFeedState('Memuat Reels…',true) + '</div>'
      :demoContent(tab.id);
    const note=tab.id==='feed'?'Postingan publik dari seluruh akun PLUITS.':tab.id==='reels'?'Video pendek dari kreator PLUITS.':tab.id==='live'?'Siaran dan percakapan langsung.':'Artikel dan cerita dari penulis PLUITS.';
    return '<section class="global-content-section" id="content-' + tab.id + '" data-content-section="' + tab.id + '"><div class="global-content-intro"><span class="global-kicker">' + String(index+1).padStart(2,'0') + ' / SOCIAL CONTENT</span><h2>' + tab.label + '</h2><p>' + note + '</p></div>' + body + '</section>';
  }).join('');
  const pageHeaderMarkup=renderPageHeader({brandHref:routeHref('home'),rightContent:'<div class="global-header-tools"><a class="global-icon-button global-favorite-link" href="' + routeHref('dashboard') + '" aria-label="Favorit" title="Favorit">' + renderIcon('heart') + '</a>' + actions + '</div>',className:'global-header',dataGlobalHeader:true});
  root.innerHTML = '<div class="pl-page-shell home-page global-home-page">' +
    pageHeaderMarkup +
    '<main class="pl-page-main home-main global-home-main"><section class="global-home-intro"><span class="global-kicker">PLUITS · INDONESIA</span><h1>Beranda Anda di PLUITS.</h1><p>Ikuti cerita, temukan orang, dan terhubung dengan komunitas dalam satu ruang sosial.</p></section>' +
    discovery +
    '<section class="global-section global-stories" id="stories">' + heading('Stories','Momen terbaru dari akun yang Anda ikuti.') + storyRail() + '</section>' +
    '<nav class="global-content-tabs" data-content-tabs aria-label="Kategori konten">' + contentTabs.map((tab,i)=>'<button type="button" data-content-tab="' + tab.id + '" class="' + (i===0?'is-active':'') + '" aria-controls="content-' + tab.id + '">' + tab.label + '</button>').join('') + '</nav>' +
    streams +
    '<section class="global-section global-products" id="local-products">' + heading('Produk Lokal','Temukan produk dari pelaku usaha di berbagai daerah.','Kunjungi Marketplace',routeHref('discover')) + '<div class="global-product-demo-rail">' + [['GADGET','Audio personal','product-a'],['FASHION','Gaya harian','product-b'],['HOME','Ruang nyaman','product-c'],['CREATIVE','Karya lokal','product-d']].map((item,i)=>'<article class="global-product-demo"><div class="global-product-art global-product-art--' + (i+1) + '"><span>' + item[0] + '</span></div><small>CONTOH PRODUK</small><strong>' + item[1] + '</strong><span>Pratinjau katalog</span></article>').join('') + '</div></section>' +
    '<section class="global-section global-features" id="all-features">' + heading('Semua Fitur','Jelajahi layanan dan ruang yang terhubung di PLUITS.') + '<div class="global-feature-grid">' + [['Social & Community','message'],['Marketplace','cart'],['Restaurant & Café','book'],['Tickets & Accommodation','image'],['Geo Directory','mapPin'],['Logistics & Transportation','arrow'],['Digital Wallet','lock'],['More services','sparkles']].map(([label,icon])=>'<a href="' + routeHref('discover') + '">' + renderIcon(icon) + '<strong>' + label + '</strong></a>').join('') + '</div></section></main>' +
    bottomNav() + '</div>';
  const header=root.querySelector('[data-global-header]');
  const tabs=root.querySelector('[data-content-tabs]');
  const updateSticky=()=>{if(header&&tabs)header.classList.toggle('is-released',tabs.getBoundingClientRect().top<=header.offsetHeight);};
  window.addEventListener('scroll',updateSticky,{passive:true}); updateSticky();
  const buttons=[...root.querySelectorAll('[data-content-tab]')];
  buttons.forEach(button=>button.addEventListener('click',()=>{root.querySelector('#content-'+button.dataset.contentTab)?.scrollIntoView({behavior:'smooth',block:'start'});buttons.forEach(item=>item.classList.toggle('is-active',item===button));}));
  let observer=null;
  if ('IntersectionObserver' in window) {
    observer=new IntersectionObserver(entries=>{const current=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(current)buttons.forEach(button=>button.classList.toggle('is-active',button.dataset.contentTab===current.target.dataset.contentSection));},{rootMargin:'-100px 0px -55% 0px',threshold:[0,.15,.35,.6]});
    root.querySelectorAll('[data-content-section]').forEach(section=>observer.observe(section));
  }
  const controller=new AbortController();
  const feedTarget=root.querySelector('[data-live-feed]');
  const reelsTarget=root.querySelector('[data-live-reels]');
  if(feedTarget)feedTarget.innerHTML=renderFeedState('Feed menunggu layanan backend PLUITS');
  if(reelsTarget)reelsTarget.innerHTML=renderFeedState('Reels menunggu layanan backend PLUITS');
  return ()=>{controller.abort();window.removeEventListener('scroll',updateSticky);observer?.disconnect();};
}
