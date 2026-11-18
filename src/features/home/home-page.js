import { routeHref } from '../../config/paths.js';
import '../../design-system/page-shell.css';
import { renderBrand, renderPageFooter } from '../../design-system/page-shell.js';
import { renderIcon } from '../../design-system/icons.js';
import './home-page.css';

const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[char]));
const contentTabs = [{id:'feed',label:'Feed'},{id:'reels',label:'Reels'},{id:'live',label:'Live'},{id:'blog',label:'Blog'}];
const emptyRail = (label) => '<div class="global-empty-rail"><span class="global-empty-mark" aria-hidden="true">PL</span><div><strong>' + label + '</strong><p>Konten akan ditampilkan setelah sumber data PLUITS terhubung.</p></div></div>';
const heading = (title, note, action, href) => '<div class="global-section-heading"><div><h2>' + title + '</h2><p>' + note + '</p></div>' + (action ? '<a href="' + href + '">' + action + ' <span aria-hidden="true">→</span></a>' : '') + '</div>';
const rail = (label, count = 4) => '<div class="global-bleed-wrap"><div class="global-rail" aria-label="' + label + '">' + Array.from({length:count},()=>'<div class="global-rail-placeholder" aria-hidden="true"><span></span><i></i><i></i></div>').join('') + '</div></div>';

function bottomNav() {
  return '<nav class="global-bottom-nav" aria-label="Navigasi utama">' +
    '<a href="' + routeHref('circle') + '">' + renderIcon('book') + '<span>Beranda</span></a>' +
    '<a href="' + routeHref('discover') + '">' + renderIcon('eye') + '<span>Jelajah</span></a>' +
    '<button type="button" class="global-create-button" data-open-create aria-label="Buat konten"><span>+</span></button>' +
    '<a href="' + routeHref('dashboard') + '" aria-label="Pesan">' + renderIcon('message') + '<span>Pesan</span></a>' +
    '<a href="' + routeHref('dashboard') + '" aria-label="Akun">' + renderIcon('lock') + '<span>Akun</span></a></nav>';
}
function createSheet() {
  return '<div class="global-create-backdrop" data-create-backdrop hidden><section class="global-create-sheet" role="dialog" aria-modal="true" aria-labelledby="create-title"><button type="button" class="global-create-close" data-close-create aria-label="Tutup">×</button><span class="global-kicker">MULAI SESUATU</span><h2 id="create-title">Buat di PLUITS</h2><p>Pilih format yang ingin disiapkan. Publikasi akan diaktifkan setelah layanan terkait tersedia.</p><div class="global-create-options"><button disabled>Feed <small>Belum tersedia</small></button><button disabled>Reels <small>Belum tersedia</small></button><button disabled>Story <small>Belum tersedia</small></button><button disabled>Live <small>Belum tersedia</small></button><button disabled>Blog <small>Belum tersedia</small></button></div><a href="' + routeHref('dashboard') + '">Buka Dashboard pengelolaan →</a></section></div>';
}

export function mountHomePage({root,user=null,onSignOut}={}) {
  const account = user ? '<a class="global-account-chip" href="' + routeHref('dashboard') + '">' + escapeHtml(user.user_metadata?.full_name || user.email?.split('@')[0] || 'Akun') + '</a>' : '<a href="' + routeHref('login') + '">Masuk</a>';
  const actions = '<div class="global-header-actions">' + account + '<a href="' + routeHref('discover') + '" aria-label="Cari">Cari</a><a href="' + routeHref('dashboard') + '" aria-label="Keranjang">Keranjang</a><a href="' + routeHref('dashboard') + '" aria-label="Notifikasi">Notifikasi</a>' + (user ? '<button type="button" data-sign-out>Keluar</button>' : '') + '</div>';
  const discovery = [
    ['top-global','Top Global','Sorotan aktivitas dari seluruh Indonesia.','Lihat Semua'],
    ['nearby','Di Sekitar Anda','Temukan hal menarik berdasarkan lokasi Anda.','Lihat Semua'],
    ['people','Orang yang Mungkin Anda Kenal','Temukan akun dan komunitas baru.','Jelajahi']
  ].map(([id,title,note,cta]) => '<section class="global-section" id="' + id + '">' + heading(title,note,cta,routeHref('discover')) + rail(title,id==='people'?5:4) + '</section>').join('');
  const streams = contentTabs.map((tab,index) => '<section class="global-content-section" id="content-' + tab.id + '" data-content-section="' + tab.id + '"><div class="global-content-intro"><span class="global-kicker">' + String(index+1).padStart(2,'0') + ' / SOCIAL CONTENT</span><h2>' + tab.label + '</h2><p>Konten dari Circle, minat, dan topik yang relevan akan mengisi bagian ini.</p></div>' + emptyRail(tab.label + ' belum tersedia') + '<div class="global-inline-block"><span>RUANG REKOMENDASI</span><strong>Temukan lebih banyak ' + tab.label + '</strong><p>Blok rekomendasi dan rail dapat muncul di antara konten kategori ini.</p><a href="' + routeHref('discover') + '">Jelajahi konten →</a></div></section>').join('');

  root.innerHTML = '<div class="pl-page-shell home-page global-home-page">' +
    '<header class="pl-page-header global-header" data-global-header><div class="global-brand-group">' + renderBrand({href:routeHref('home'),label:'PLUITS Global Home'}) + '<a class="global-favorite-link" href="' + routeHref('dashboard') + '">Favorit</a></div>' + actions + '</header>' +
    '<main class="pl-page-main home-main global-home-main"><section class="global-home-intro"><span class="global-kicker">PLUITS · INDONESIA</span><h1>Temukan apa yang sedang terjadi.</h1><p>Jelajahi cerita, orang, tempat, komunitas, dan aktivitas dari seluruh Indonesia.</p></section>' +
    discovery +
    '<section class="global-section global-stories" id="stories">' + heading('Stories','Momen terbaru dari akun yang Anda ikuti.','Circle',routeHref('circle')) + '<div class="global-bleed-wrap"><div class="global-story-rail" aria-label="Stories"><div class="global-story-placeholder"><span>+</span><small>Story Anda</small></div><div class="global-story-placeholder"><span></span><small>Belum ada Story</small></div><div class="global-story-placeholder"><span></span><small>Ikuti akun</small></div><div class="global-story-placeholder"><span></span><small>Jelajahi</small></div><div class="global-story-placeholder"><span></span><small>Komunitas</small></div></div></div></section>' +
    '<nav class="global-content-tabs" data-content-tabs aria-label="Kategori konten">' + contentTabs.map((tab,i)=>'<button type="button" data-content-tab="' + tab.id + '" class="' + (i===0?'is-active':'') + '" aria-controls="content-' + tab.id + '">' + tab.label + '</button>').join('') + '</nav>' +
    streams +
    '<section class="global-section global-products" id="local-products">' + heading('Produk Lokal','Temukan produk dari pelaku usaha di berbagai daerah.','Kunjungi Marketplace',routeHref('discover')) + emptyRail('Katalog produk lokal belum terhubung') + '</section>' +
    '<section class="global-section global-features" id="all-features">' + heading('Semua Fitur','Jelajahi layanan dan ruang yang terhubung di PLUITS.') + '<div class="global-feature-grid">' + ['Social & Community','Marketplace','Restaurant & Café','Tickets & Accommodation','Geo Directory','Logistics & Transportation','Digital Wallet','More services'].map(label=>'<a href="' + routeHref('discover') + '"><span aria-hidden="true">↗</span><strong>' + label + '</strong></a>').join('') + '</div></section></main>' +
    renderPageFooter({copyright:'© 2026 PLUITS. All rights reserved.',attribution:'One connected digital ecosystem.',groups:[{title:'Jelajahi',items:[{label:'Global Home',route:'home'},{label:'Jelajah',route:'discover'},{label:'Beranda Circle',route:'circle'}]},{title:'Akun',items:[{label:'Dashboard',route:'dashboard'},{label:'Masuk',route:'login'}]},{title:'Informasi',items:[{label:'Ketentuan Layanan',route:'terms'},{label:'Kebijakan Privasi',route:'privacy'}]}]}) + bottomNav() + createSheet() + '</div>';

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
  const backdrop=root.querySelector('[data-create-backdrop]');
  const openCreate=()=>{backdrop.hidden=false;root.querySelector('[data-close-create]')?.focus();};
  root.querySelector('[data-open-create]')?.addEventListener('click',openCreate);
  root.querySelector('[data-close-create]')?.addEventListener('click',()=>{backdrop.hidden=true;});
  backdrop?.addEventListener('click',event=>{if(event.target===backdrop)backdrop.hidden=true;});
  if (window.location.hash.includes('create=1')) openCreate();
  root.querySelector('[data-sign-out]')?.addEventListener('click',async event=>{event.currentTarget.disabled=true;try{await onSignOut?.();}catch{event.currentTarget.disabled=false;}});
  return ()=>{window.removeEventListener('scroll',updateSticky);observer?.disconnect();};
}
