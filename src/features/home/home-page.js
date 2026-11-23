import { routeHref } from '../../config/paths.js';
import '../../design-system/page-shell.css';
import { renderPageHeader } from '../../design-system/page-shell.js';
import { renderIcon } from '../../design-system/icons.js';
import { API_BASE_URL } from '../../config/runtime.js';
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
  const items=[['+','Cerita Anda','story-own',''],['Ayu','Ayu','story-b','photo-1534528741775-53994a69daeb'],['Raka','Raka','story-c','photo-1500648767791-00dcc994a43e'],['Nadia','Nadia','story-d','photo-1531123897727-8f129e1688ce'],['Dimas','Dimas','story-e','photo-1506794778202-cad84cf45f1d'],['Sinta','Sinta','story-f','photo-1544005313-94ddf0286df2']];
  return '<div class="global-bleed-wrap"><div class="global-story-rail" aria-label="Stories contoh">' + items.map((item,index)=>'<div class="global-story-item"><span class="global-story-ring global-story-ring--' + item[2] + '">' + (item[3]?'<img src="https://images.unsplash.com/' + item[3] + '?auto=format&fit=crop&w=160&h=160&q=75" alt="" loading="lazy">':'<b>+</b>') + '</span><small>' + item[1] + '</small></div>').join('') + '</div></div>';
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
    : '';
  const avatar = post.avatarUrl
    ? '<img src="' + escapeHtml(post.avatarUrl) + '" alt="" loading="lazy">'
    : '<span>' + escapeHtml((post.authorName || 'P').slice(0,1).toUpperCase()) + '</span>';
  const caption = post.caption ? '<p class="global-post-caption">' + escapeHtml(post.caption) + '</p>' : '';
  const kind = post.isDemo ? 'DEMO · ' + (post.content_kind === 'reel' ? 'REELS' : 'FEED') : (post.visibility === 'private' ? 'PRIVAT · ' : '') + (post.content_kind === 'reel' ? 'REELS' : 'FEED');
  const date = post.created_at ? new Date(post.created_at).toLocaleDateString('id-ID',{day:'numeric',month:'short'}) : (post.isDemo?'Contoh hari ini':'');
  return '<article class="global-post-card' + (post.isDemo?' is-demo':'') + (post.content_kind==='reel'?' is-reel':'') + '"><header class="global-post-author"><span class="global-post-avatar">' + avatar + '</span><span class="global-post-author-copy"><strong>' + escapeHtml(post.authorName) + '</strong><small>@' + escapeHtml(post.username || 'pengguna') + ' · ' + date + '</small></span><span class="global-post-kind">' + kind + '</span></header>' + media + caption + (post.isDemo?'<div class="global-demo-disclaimer">Konten ilustrasi untuk pengujian tampilan, bukan postingan pengguna.</div>':'') + '<footer class="global-post-actions"><span>' + renderIcon('heart') + ' ' + (post.isDemo?post.likes+' suka':'Suka') + '</span><span>' + renderIcon('message') + ' ' + (post.isDemo?post.comments+' komentar':'Komentar') + '</span><span>' + renderIcon('arrow') + ' Bagikan</span></footer></article>';
}
const demoFeedPosts = [
  {authorName:'Ayu Pratiwi',username:'ayu.pratiwi',avatarUrl:'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=75',caption:'Senja di pesisir Bali selalu punya cara sendiri untuk membuat kita berhenti sejenak. 🌅\n\nSudut favorit untuk menikmati sore dan cerita baru.',mediaUrl:'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1100&q=85',created_at:'',likes:245,comments:48,isDemo:true},
  {authorName:'Raka Mahendra',username:'raka.visual',avatarUrl:'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=75',caption:'Mencari detail kecil di tengah hiruk pikuk kota. Kadang perspektif baru datang dari berjalan lebih pelan. 📷',mediaUrl:'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1100&q=85',created_at:'',likes:182,comments:23,isDemo:true},
  {authorName:'Nadia Putri',username:'nadia.tastes',avatarUrl:'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=120&h=120&q=75',caption:'Akhir pekan, secangkir kopi, dan tempat nyaman untuk bertukar cerita. Ada rekomendasi tempat serupa?',mediaUrl:'https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=1100&q=85',created_at:'',likes:136,comments:19,isDemo:true}
];
const demoReels = [
  {authorName:'Dimas Saputra',username:'dimas.moves',avatarUrl:'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&h=120&q=75',caption:'Potongan suasana pagi di Ubud. 🌿',mediaUrl:'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=700&h=1000&q=85',content_kind:'reel',likes:324,comments:31,isDemo:true},
  {authorName:'Sinta Maharani',username:'sinta.explores',avatarUrl:'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&h=1000&q=85',caption:'Warna-warni pasar lokal yang selalu menarik untuk dijelajahi.',mediaUrl:'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=700&h=1000&q=85',content_kind:'reel',likes:291,comments:27,isDemo:true}
];
function renderDemoFeed(kind='feed') {
  const posts=kind==='reels'?demoReels:demoFeedPosts;
  return posts.map(renderPostCard).join('');
}
function renderFeedState(message,loading=false) {
  return '<div class="global-feed-state' + (loading?' is-loading':'') + '">' + (loading?'<span class="global-feed-spinner" aria-hidden="true"></span>':'<span class="global-feed-state-icon">' + renderIcon('image') + '</span>') + '<strong>' + message + '</strong>' + (!loading?'<p>Konten publik yang sudah diterbitkan akan muncul di sini.</p>':'') + '</div>';
}
function demoContent(kind) {
  if(kind==='live')return '<div class="global-live-demo-grid"><article class="global-live-demo"><div class="global-live-art global-live-art--one"><span class="global-live-indicator">LIVE · DEMO</span><div class="global-live-orbit">PL</div><strong>Suasana sore di Bali</strong><small>Pratinjau siaran komunitas</small></div><div class="global-live-meta"><strong>Ngobrol santai menjelang senja</strong><p>Ruang obrolan terbuka untuk berbagi cerita dan rekomendasi.</p><span>128 penonton · Simulasi</span></div></article><article class="global-live-demo"><div class="global-live-art global-live-art--two"><span class="global-live-indicator">LIVE · DEMO</span><div class="global-live-orbit">PL</div><strong>Eksplorasi kuliner lokal</strong><small>Pratinjau siaran kreator</small></div><div class="global-live-meta"><strong>Jelajah rasa Nusantara</strong><p>Tur singkat mengenal hidangan dan ruang lokal.</p><span>86 penonton · Simulasi</span></div></article></div>';
  return '<div class="global-blog-demo-grid"><article class="global-blog-demo"><div class="global-blog-art global-blog-art--one"><span>JURNAL PERJALANAN</span></div><div><small>CONTOH ARTIKEL · 6 MENIT BACA</small><strong>Menemukan sisi lain dari sebuah kota</strong><p>Pratinjau kartu artikel untuk menguji tampilan Blog di Global Home.</p></div></article><article class="global-blog-demo"><div class="global-blog-art global-blog-art--two"><span>CATATAN HARIAN</span></div><div><small>CONTOH ARTIKEL · 4 MENIT BACA</small><strong>Cerita kecil yang layak dibagikan</strong><p>Contoh visual sementara, bukan artikel yang sudah dipublikasikan.</p></div></article></div>';
}
export function mountHomePage({root,user=null,onSignOut,accessToken=null}={}) {
  const account = '<a class="global-icon-button" href="' + routeHref(user?'profile':'login') + '" aria-label="' + (user?'Akun':'Masuk') + '" title="' + (user?'Akun':'Masuk') + '">' + renderIcon('user') + '</a>';
  const actions = '<div class="global-header-actions">' + account + '<a class="global-icon-button" href="' + routeHref('discover') + '" aria-label="Cari" title="Cari">' + renderIcon('search') + '</a><a class="global-icon-button" href="' + routeHref('dashboard') + '" aria-label="Keranjang" title="Keranjang">' + renderIcon('cart') + '</a><a class="global-icon-button" href="' + routeHref('dashboard') + '" aria-label="Notifikasi" title="Notifikasi">' + renderIcon('bell') + '</a></div>';
  const discovery = '<section class="global-section global-people-section" id="people"><div class="global-section-heading"><div><h2>Orang yang mungkin Anda kenal</h2><p>Temukan kenalan baru dari sekitar Anda.</p></div><a href="' + routeHref('discover') + '?mode=people">Lihat semua <span aria-hidden="true">→</span></a></div><div class="global-bleed-wrap"><div class="global-people-rail" aria-label="Rekomendasi orang">' + [['Ayu Pratiwi','Bali','photo-1534528741775-53994a69daeb'],['Raka Mahendra','Jakarta','photo-1500648767791-00dcc994a43e'],['Nadia Putri','Bandung','photo-1531123897727-8f129e1688ce'],['Dimas Saputra','Yogyakarta','photo-1506794778202-cad84cf45f1d'],['Sinta Maharani','Surabaya','photo-1544005313-94ddf0286df2']].map((person,i)=>'<a class="global-person-card" href="' + routeHref('discover') + '?mode=people"><img src="https://images.unsplash.com/' + person[2] + '?auto=format&fit=crop&w=480&q=80" alt="Foto profil contoh ' + person[0] + '" loading="lazy"><span class="global-person-overlay"><strong>' + person[0] + '</strong><small>' + person[1] + ' · Contoh profil</small></span><span class="global-person-add" aria-hidden="true">+</span></a>').join('') + '</div></div></section>';
  const nearby = '<section class="global-section global-nearby" id="nearby">' + heading('Jelajahi di sekitar Anda','Temukan tempat, kuliner, aktivitas, dan layanan berdasarkan lokasi pilihan Anda.','Jelajahi peta',routeHref('discover')) + demoRail(demoCards.nearby,'Kategori sekitar · pratinjau') + '</section>';
  const streams = contentTabs.map((tab,index) => {
    const body=tab.id==='feed'?'<div class="global-post-list" data-live-feed>' + renderDemoFeed('feed') + '</div>'
      :tab.id==='reels'?'<div class="global-post-list global-reels-list" data-live-reels>' + renderDemoFeed('reels') + '</div>'
      :demoContent(tab.id);
    const note=tab.id==='feed'?'Postingan publik dari seluruh akun PLUITS.':tab.id==='reels'?'Video pendek dari kreator PLUITS.':tab.id==='live'?'Siaran dan percakapan langsung.':'Artikel dan cerita dari penulis PLUITS.';
    return '<section class="global-content-section" id="content-' + tab.id + '" data-content-section="' + tab.id + '"><div class="global-content-intro"><span class="global-kicker">' + String(index+1).padStart(2,'0') + ' / SOCIAL CONTENT</span><h2>' + tab.label + '</h2><p>' + note + '</p></div>' + body + '</section>';
  }).join('');
  const composerMarkup = user
    ? (API_BASE_URL
      ? '<section class="global-composer" aria-labelledby="global-composer-title"><div class="global-composer-heading"><span class="global-composer-avatar">' + escapeHtml((user.user_metadata?.display_name || user.user_metadata?.full_name || 'P').slice(0,1).toUpperCase()) + '</span><div><strong id="global-composer-title">Bagikan cerita Anda</strong><small>Mulai percakapan dengan komunitas PLUITS</small></div></div><form data-social-composer><label class="global-composer-label" for="global-post-caption">Apa yang ingin Anda ceritakan?</label><textarea id="global-post-caption" name="caption" maxlength="5000" rows="3" required placeholder="Tulis sesuatu yang bermakna…"></textarea><div class="global-composer-footer"><label class="global-composer-visibility"><span>Visibilitas</span><select name="visibility"><option value="public">Publik</option><option value="private">Hanya saya</option></select></label><span data-composer-count>0 / 5.000</span><button type="submit" data-composer-submit>Terbitkan</button></div><p class="global-composer-status" data-composer-status role="status" aria-live="polite"></p></form></section>'
      : '<section class="global-composer is-unavailable"><strong>Bagikan cerita Anda</strong><p>Layanan posting belum terhubung ke server PLUITS.</p></section>')
    : '<section class="global-composer is-guest"><strong>Setiap cerita punya ruang.</strong><p>Masuk atau buat akun untuk mulai membagikan cerita Anda.</p><a href="' + routeHref('login') + '">Masuk ke PLUITS →</a></section>';
  const pageHeaderMarkup=renderPageHeader({brandHref:routeHref('home'),rightContent:'<div class="global-header-tools"><a class="global-icon-button global-favorite-link" href="' + routeHref('dashboard') + '" aria-label="Favorit" title="Favorit">' + renderIcon('heart') + '</a>' + actions + '</div>',className:'global-header',dataGlobalHeader:true});
  root.innerHTML = '<div class="pl-page-shell home-page global-home-page">' +
    pageHeaderMarkup +
    '<nav class="global-quick-search" aria-label="Pencarian cepat"><a href="' + routeHref('discover') + '"><span>' + renderIcon('search') + '</span><strong>Orang</strong></a><a href="' + routeHref('discover') + '"><span>' + renderIcon('mapPin') + '</span><strong>Tempat</strong></a><a href="' + routeHref('marketplace') + '"><span>' + renderIcon('store') + '</span><strong>Produk</strong></a><a href="' + routeHref('discover') + '"><span>' + renderIcon('utensils') + '</span><strong>Kuliner</strong></a><a href="' + routeHref('discover') + '"><span>' + renderIcon('briefcase') + '</span><strong>Layanan</strong></a><a href="' + routeHref('discover') + '"><span>' + renderIcon('calendar') + '</span><strong>Aktivitas</strong></a></nav>' +
    '<main class="pl-page-main home-main global-home-main"><div class="global-location-row"><span>' + renderIcon('mapPin') + '</span><span><small>Lokasi eksplorasi</small><strong>Atur lokasi Anda</strong></span><a href="' + routeHref('marketplace') + '">Ubah</a></div><section class="global-home-intro"><div class="global-home-hero"><span class="global-kicker">PLUITS · SATU APLIKASI, SEJUTA KEMUNGKINAN</span><h1>Selamat datang di PLUITS!</h1><p>Temukan cerita, teman, dan hal menarik di sekitar Anda.</p><a class="global-home-search" href="' + routeHref('discover') + '">' + renderIcon('search') + '<span>Mau ke mana atau butuh apa?</span>' + renderIcon('arrow') + '</a></div></section>' +
    '<section class="global-section global-service-shortcuts" aria-label="Layanan PLUITS"><div class="global-service-rail">' + [['Transportasi','arrow'],['Tiket','fileText'],['Sewa Mobil','map'],['Akomodasi','image'],['Kurir','briefcase'],['Kuliner','utensils']].map(([label,icon])=>'<a class="global-service-shortcut" href="' + routeHref('discover') + '">' + renderIcon(icon) + '<strong>' + label + '</strong></a>').join('') + '</div></section>' +
    '<div class="global-social-area">' + discovery +
    '<section class="global-section global-stories" id="stories">' + heading('Cerita dari circle Anda','Pratinjau story teman; konten akun akan tampil saat layanan Stories terhubung.') + storyRail() + '</section>' +
    '<nav class="global-content-tabs" data-content-tabs aria-label="Kategori konten">' + contentTabs.map((tab,i)=>'<button type="button" data-content-tab="' + tab.id + '" class="' + (i===0?'is-active':'') + '" aria-controls="content-' + tab.id + '">' + tab.label + '</button>').join('') + '</nav>' + composerMarkup +
    streams + '</div>' + nearby +
    '<section class="global-section global-products" id="local-products">' + heading('Produk lokal pilihan','Temukan pilihan dari sekitar Anda. Katalog dan cakupan lokasi diatur di Marketplace.','Lihat semua',routeHref('marketplace')) + '<div class="global-product-location"><span>' + renderIcon('mapPin') + '</span><div><strong>Jelajahi berdasarkan lokasi</strong><small>Marketplace dimulai dari cakupan lokasi pilihan; kota lain dan global dapat dipilih di sana.</small></div></div><div class="global-product-demo-rail">' + [['GADGET','Audio personal','product-a'],['FASHION','Gaya harian','product-b'],['HOME','Ruang nyaman','product-c'],['KARYA LOKAL','Kerajinan pilihan','product-d']].map((item,i)=>'<article class="global-product-demo"><div class="global-product-art global-product-art--' + (i+1) + '"><span>' + item[0] + '</span></div><small>PRATINJAU KATEGORI</small><strong>' + item[1] + '</strong><span>Produk aktual tampil di Marketplace</span></article>').join('') + '</div><a class="global-marketplace-cta" href="' + routeHref('marketplace') + '"><span class="global-marketplace-mark">' + renderIcon('store') + '</span><span><strong>Jelajahi Marketplace PLUITS</strong><small>Produk lokal, toko, kafe, restoran, dan lainnya</small></span><b>Belanja sekarang ' + renderIcon('arrow') + '</b></a></section>' +
    '<section class="global-section global-features" id="all-features">' + heading('Layanan PLUITS','Akses cepat ke layanan yang saling terhubung.','Jelajahi semua',routeHref('discover')) + '<div class="global-feature-rail">' + [['Transportasi','arrow'],['Kurir','briefcase'],['Tiket','fileText'],['Sewa Mobil','map'],['Akomodasi','image'],['Kuliner','book']].map(([label,icon])=>'<a class="global-feature-card" href="' + routeHref('discover') + '">' + renderIcon(icon) + '<strong>' + label + '</strong><span>Jelajahi layanan</span></a>').join('') + '</div></section>' + '<section class="global-about" aria-labelledby="global-about-title"><span class="global-kicker">SATU RUANG UNTUK BANYAK KEMUNGKINAN</span><h2 id="global-about-title">Terhubung, menemukan, dan bertransaksi bersama PLUITS.</h2><p>Mulai dari cerita teman, tempat menarik, produk lokal, hingga layanan sehari-hari—semuanya terhubung dalam satu ekosistem.</p><a href="' + routeHref('about') + '">Kenali PLUITS <span aria-hidden="true">→</span></a></section></main>' +
    bottomNav() + '</div>';
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
  const loadFeed = async () => {
    if (!feedTarget) return;
    if (!API_BASE_URL) { feedTarget.innerHTML=renderDemoFeed('feed'); return; }
    feedTarget.innerHTML=renderFeedState('Memuat postingan publik…',true);
    try {
      const response=await fetch(API_BASE_URL+'/v1/social/feed?limit=20',{headers:{Accept:'application/json'},mode:'cors',credentials:'omit',cache:'no-store',signal:controller.signal});
      if(!response.ok)throw new Error('Feed belum dapat dimuat.');
      const payload=await response.json();
      const posts=Array.isArray(payload.posts)?payload.posts:[];
      feedTarget.innerHTML=posts.length?posts.map(post=>renderPostCard({authorName:post.author_name,username:post.username,caption:post.caption,content_kind:post.content_kind,created_at:post.created_at})).join(''):renderDemoFeed('feed');
    } catch(error) {
      if(error.name!=='AbortError')feedTarget.innerHTML=renderDemoFeed('feed');
    }
  };
  const composer=root.querySelector('[data-social-composer]');
  if(composer){
    const captionField=composer.querySelector('[name="caption"]');
    const count=composer.querySelector('[data-composer-count]');
    const status=composer.querySelector('[data-composer-status]');
    const submit=composer.querySelector('[data-composer-submit]');
    captionField?.addEventListener('input',()=>{if(count)count.textContent=Array.from(captionField.value).length.toLocaleString('id-ID')+' / 5.000';});
    composer.addEventListener('submit',async event=>{
      event.preventDefault();
      const caption=captionField.value.trim();
      if(!caption){status.textContent='Tuliskan cerita terlebih dahulu.';captionField.focus();return;}
      if(!accessToken){status.textContent='Sesi akun tidak tersedia. Silakan masuk kembali.';return;}
      submit.disabled=true;status.textContent='Menerbitkan postingan…';
      try{
        const response=await fetch(API_BASE_URL+'/v1/social/posts',{method:'POST',headers:{Accept:'application/json','Content-Type':'application/json',Authorization:'Bearer '+accessToken},body:JSON.stringify({caption,visibility:composer.elements.visibility.value}),mode:'cors',credentials:'omit',cache:'no-store',signal:controller.signal});
        const payload=await response.json().catch(()=>({}));
        if(!response.ok)throw new Error(payload.error==='rate_limit_exceeded'?'Terlalu sering menerbitkan postingan. Coba lagi nanti.':'Postingan belum berhasil diterbitkan.');
        const post=payload;
        const card=renderPostCard({authorName:post.author_name,username:post.username,caption:post.caption,content_kind:post.content_kind,created_at:post.created_at});
        feedTarget?.insertAdjacentHTML('afterbegin',card);
        captionField.value='';if(count)count.textContent='0 / 5.000';
        status.textContent=post.visibility==='private'?'Postingan privat tersimpan dan hanya terlihat oleh Anda.':'Postingan berhasil diterbitkan.';
      }catch(error){if(error.name!=='AbortError')status.textContent=error.message||'Postingan belum berhasil diterbitkan.';}
      finally{submit.disabled=false;}
    });
  }
  loadFeed();
  if(reelsTarget)reelsTarget.innerHTML=renderDemoFeed('reels');
  return ()=>{controller.abort();observer?.disconnect();};
}
