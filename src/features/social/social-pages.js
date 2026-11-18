import { routeHref } from '../../config/paths.js';
import '../../design-system/page-shell.css';
import { renderBrand } from '../../design-system/page-shell.js';
import { renderIcon } from '../../design-system/icons.js';
import './social-pages.css';

function bottomNav(active){
 return '<nav class="global-bottom-nav" aria-label="Navigasi aplikasi">'
 + '<a href="'+routeHref('social')+'" class="'+(active==='social'?'is-active':'')+'">'+renderIcon('book')+'<span>Beranda</span></a>'
 + '<a href="'+routeHref('discover')+'" class="'+(active==='discover'?'is-active':'')+'">'+renderIcon('eye')+'<span>Jelajah</span></a>'
 + '<a class="social-plus" href="'+routeHref('dashboard')+'" aria-label="Buka Ruang Kerja"><span>+</span></a>'
 + '<a href="'+routeHref('messages')+'" class="'+(active==='messages'?'is-active':'')+'">'+renderIcon('message')+'<span>Pesan</span></a>'
 + '<a href="'+routeHref('profile')+'" class="'+(active==='profile'?'is-active':'')+'">'+renderIcon('user')+'<span>Profil</span></a></nav>';
}
function shell(title,subtitle,active,content){
 return '<div class="pl-page-shell social-shell"><header class="pl-page-header social-header"><div class="social-brand">'+renderBrand({href:routeHref('home'),label:'PLUITS'})+'<span>'+title+'</span></div><a href="'+routeHref('profile')+'">Profil</a></header><main class="pl-page-main social-main"><section class="social-intro"><span class="social-kicker">PLUITS · '+title.toUpperCase()+'</span><h1>'+title+'</h1><p>'+subtitle+'</p></section>'+content+'</main>'+bottomNav(active)+'</div>';
}
function emptyPanel(title,text){return '<section class="social-empty-panel"><span>'+renderIcon('eye')+'</span><strong>'+title+'</strong><p>'+text+'</p></section>';}
export function mountCircleHomePage({root}={}){root.innerHTML=shell('Beranda Circle','Ruang personal yang mengikuti Circle, minat, dan konteks lokasi Anda.','social','<section class="social-home-section"><div class="social-section-heading"><h2>Circle Anda</h2><a href="'+routeHref('discover')+'">Temukan akun →</a></div>'+emptyPanel('Belum ada aktivitas Circle','Postingan dan pembaruan dari akun dalam Circle Anda akan muncul di sini.')+'</section><section class="social-home-section"><div class="social-section-heading"><h2>Di sekitar Anda</h2><span>Berbasis lokasi</span></div>'+emptyPanel('Rekomendasi lokasi belum tersedia','Aktifkan izin lokasi jika ingin melihat rekomendasi yang lebih akurat. Anda tetap dapat menggunakan PLUITS tanpa memberikan izin lokasi.')+'</section>');}
export function mountDiscoverPage({root}={}){root.innerHTML=shell('Jelajah','Temukan orang, cerita, tempat, komunitas, dan layanan dari seluruh wilayah PLUITS.','discover','<section class="social-home-section"><div class="social-section-heading"><h2>Jelajahi Indonesia</h2><span>Cakupan global</span></div>'+emptyPanel('Konten Jelajah belum tersedia','Konten publik dan direktori akan ditampilkan setelah sumber data PLUITS terhubung.')+'</section><section class="social-home-section"><div class="social-section-heading"><h2>Kategori</h2></div><div class="social-category-grid">'+['Orang & Komunitas','Feed & Reels','Blog','Tempat & Restoran','Produk Lokal','Transportasi & Layanan'].map(label=>'<article><strong>'+label+'</strong><span>Segera terhubung</span></article>').join('')+'</div></section>');}
export function mountMessagesPage({root}={}) {
 root.innerHTML=shell('Pesan','Pusat percakapan dan komunikasi Anda di PLUITS.','messages','<section class="social-home-section"><div class="social-section-heading"><h2>Kotak masuk</h2></div>'+emptyPanel('Belum ada percakapan','Pesan dari pengguna dan aktivitas komunikasi akan tampil di sini setelah layanan pesan diaktifkan.')+'</section>');
}
export function mountProfilePage({root,user=null}={}) {
 const safe=value=>String(value??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 const metadata=user?.user_metadata||{};
 const name=safe(metadata.display_name||metadata.full_name||metadata.name||'Pengguna PLUITS');
 const username=safe(metadata.username||'nama_pengguna');
 const level=String(metadata.account_level||'regular').toLowerCase();
 const allowedLevels=['regular','silver','gold','platinum','priority'];
 const accountLevel=allowedLevels.includes(level)?level:'regular';
 const verified=Boolean(metadata.is_verified||metadata.verified||user?.email_confirmed_at);
 const badgeLabel=accountLevel==='regular'?'Regular':accountLevel.charAt(0).toUpperCase()+accountLevel.slice(1);
 const initial=name.trim().charAt(0).toUpperCase()||'P';
 const profileContent='<section class="social-profile-page">'
  +'<section class="social-profile-card" aria-label="Identitas profil">'
  +'<a class="social-profile-gear" href="'+routeHref('settings')+'" aria-label="Pusat pengaturan akun" title="Pusat pengaturan akun">'+renderIcon('settings')+'</a>'
  +'<div class="social-profile-avatar-wrap"><div class="social-profile-avatar">'+initial+'</div><div class="social-account-line"><span class="social-account-badge is-'+accountLevel+'">'+badgeLabel+'</span>'+(accountLevel==='regular'&&verified?'<span class="social-account-verified" role="img" aria-label="Terverifikasi" title="Terverifikasi"><svg viewBox="0 0 20 20" aria-hidden="true"><path fill="currentColor" d="M10 1.4 12 3l2.6-.1 1 2.4 2.2 1.4-.7 2.5.7 2.5-2.2 1.4-1 2.4-2.6-.1-2 1.6-2-1.6-2.6.1-1-2.4-2.2-1.4.7-2.5-.7-2.5 2.2-1.4 1-2.4 2.6.1L10 1.4Z"/><path d="m6.5 10 2.2 2.2 4.8-4.8" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>':'')+(accountLevel==='regular'?'<a class="social-account-upgrade" href="#/settings">Upgrade</a>':'')+'</div></div>'
  +'<div class="social-profile-identity"><h1>'+name+'</h1><p>@'+username+'</p></div>'
  +'<div class="social-profile-stats"><div><strong>—</strong><span>Pengikut</span></div><div><strong>—</strong><span>Mengikuti</span></div><div><strong>—</strong><span>Diikuti</span></div></div>'
  +'<div class="social-profile-actions"><a class="social-profile-primary" href="#/settings">Upgrade / Langganan</a><button type="button" class="social-profile-secondary" data-profile-quick aria-expanded="false">Pengaturan Profil Cepat</button></div>'
  +'<section class="social-profile-quick-panel" data-profile-quick-panel hidden><div class="social-profile-quick-heading"><strong>Pengaturan Profil Cepat</strong><span>Kelola informasi dan visibilitas profil Anda</span></div>'
  +'<a href="'+routeHref('settings')+'"><span>'+renderIcon('image')+'Foto profil</span><b>Kelola →</b></a>'
  +'<a href="'+routeHref('settings')+'"><span>'+renderIcon('book')+'Bio</span><b>Kelola →</b></a>'
  +'<a href="'+routeHref('settings')+'"><span>'+renderIcon('mapPin')+'Alamat</span><b>Kelola →</b></a>'
  +'<a href="'+routeHref('settings')+'"><span>'+renderIcon('mail')+'Kontak</span><b>Kelola →</b></a>'
  +'<a href="'+routeHref('settings')+'"><span>'+renderIcon('lock')+'Privasi profil · Publik / Privat</span><b>Kelola →</b></a></section>'
  +'</section>'
  +'<div class="social-profile-tabs" role="tablist" aria-label="Konten profil">'
  +'<button type="button" class="is-active is-icon-only" role="tab" id="profile-tab-feed" aria-label="Feed" aria-controls="profile-panel-feed" aria-selected="true" data-profile-tab="feed">'+renderIcon('grid')+'</button>'
  +'<button type="button" role="tab" id="profile-tab-reels" aria-controls="profile-panel-reels" aria-selected="false" data-profile-tab="reels">'+renderIcon('play')+'<span>Reels</span></button>'
  +'<button type="button" role="tab" id="profile-tab-trips" aria-controls="profile-panel-trips" aria-selected="false" data-profile-tab="trips">'+renderIcon('mapPin')+'<span>Trips</span></button>'
  +'<button type="button" role="tab" id="profile-tab-blog" aria-controls="profile-panel-blog" aria-selected="false" data-profile-tab="blog">'+renderIcon('book')+'<span>Blog</span></button>'
  +'<button type="button" role="tab" id="profile-tab-store" aria-controls="profile-panel-store" aria-selected="false" data-profile-tab="store">'+renderIcon('store')+'<span>Toko / Layanan</span></button>'
  +'</div>'
  +'<section class="social-profile-tab-panel is-active" role="tabpanel" id="profile-panel-feed" aria-labelledby="profile-tab-feed" data-profile-panel="feed">'+emptyPanel('Belum ada postingan','Postingan foto dan konten Feed yang dipublikasikan akan tampil di sini.')+'</section>'
  +'<section class="social-profile-tab-panel" role="tabpanel" id="profile-panel-reels" aria-labelledby="profile-tab-reels" data-profile-panel="reels" hidden>'+emptyPanel('Belum ada Reels','Video pendek yang dipublikasikan akan tampil di sini.')+'</section>'
  +'<section class="social-profile-tab-panel" role="tabpanel" id="profile-panel-trips" aria-labelledby="profile-tab-trips" data-profile-panel="trips" hidden>'+emptyPanel('Belum ada Trips','Perjalanan dan cerita perjalanan yang dipublikasikan akan tampil di sini.')+'</section>'
  +'<section class="social-profile-tab-panel" role="tabpanel" id="profile-panel-blog" aria-labelledby="profile-tab-blog" data-profile-panel="blog" hidden>'+emptyPanel('Belum ada Blog','Artikel blog yang dipublikasikan akan tampil di sini.')+'</section>'
  +'<section class="social-profile-tab-panel" role="tabpanel" id="profile-panel-store" aria-labelledby="profile-tab-store" data-profile-panel="store" hidden>'+emptyPanel('Belum ada produk atau layanan unggulan','Pemilik profil dapat memilih produk atau layanan unggulan dari tokonya. Bagian ini hanya menampilkan pilihan unggulan, bukan seluruh katalog.')+'</section>'
  +'</section>';
 root.innerHTML='<div class="pl-page-shell social-shell"><header class="pl-page-header social-header"><div class="social-brand">'+renderBrand({href:routeHref('home'),label:'PLUITS'})+'<span>Profil</span></div><a href="'+routeHref('settings')+'">Pengaturan akun</a></header><main class="pl-page-main social-main">'+profileContent+'</main>'+bottomNav('profile')+'</div>';
 root.addEventListener('click',event=>{
  const tab=event.target.closest('[data-profile-tab]');
  if(tab&&root.contains(tab)){
   const selected=tab.dataset.profileTab;
   root.querySelectorAll('[data-profile-tab]').forEach(item=>{
    const active=item===tab;
    item.classList.toggle('is-active',active);
    item.setAttribute('aria-selected',String(active));
   });
   root.querySelectorAll('[data-profile-panel]').forEach(panel=>{
    const active=panel.dataset.profilePanel===selected;
    panel.classList.toggle('is-active',active);
    panel.hidden=!active;
   });
   return;
  }
  const quick=event.target.closest('[data-profile-quick]');
  if(!quick||!root.contains(quick))return;
  const panel=root.querySelector('[data-profile-quick-panel]');
  const expanded=quick.getAttribute('aria-expanded')==='true';
  quick.setAttribute('aria-expanded',String(!expanded));
  panel.hidden=expanded;
 });
}
export function mountSettingsPage({root,user=null,onSignOut}={}) {
 const safe=value=>String(value??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 const email=safe(user?.email||'Email tidak tersedia');
 const sections=[
  {id:'account',label:'Akun',icon:'user',title:'Akun & keamanan',desc:'Informasi akun yang digunakan untuk masuk ke PLUITS.'},
  {id:'privacy',label:'Privasi',icon:'lock',title:'Privasi & visibilitas',desc:'Kontrol profil publik dan bagaimana orang menemukan Anda.'},
  {id:'notifications',label:'Notifikasi',icon:'bell',title:'Notifikasi',desc:'Preferensi pemberitahuan dari aktivitas PLUITS.'},
  {id:'app',label:'Aplikasi',icon:'book',title:'Preferensi aplikasi',desc:'Pengaturan pengalaman penggunaan aplikasi PLUITS.'}
 ];
 let active='account';
 const render=()=>{
  const selected=sections.find(item=>item.id===active)||sections[0];
  const detail=active==='account'
   ? '<div class="social-settings-detail-row"><span>Email akun</span><strong>'+email+'</strong></div><div class="social-settings-detail-row"><span>Metode masuk</span><strong>Email & kata sandi</strong></div><div class="social-settings-note">Perubahan email dan kata sandi dikelola melalui alur keamanan akun. Kami tidak menampilkan atau menyimpan kata sandi di halaman ini.</div>'
   : active==='privacy'
   ? '<div class="social-settings-detail-row"><span>Visibilitas profil</span><strong>Pengaturan server belum tersedia</strong></div><div class="social-settings-note">Kontrol publik / privat belum diaktifkan karena belum ada penyimpanan preferensi privasi yang terhubung. Status profil tidak akan diubah hanya dari tampilan ini.</div>'
   : active==='notifications'
   ? '<div class="social-settings-detail-row"><span>Notifikasi aplikasi</span><strong>Belum terhubung</strong></div><div class="social-settings-note">Preferensi notifikasi akan tersedia setelah layanan notifikasi PLUITS diaktifkan.</div>'
   : '<div class="social-settings-detail-row"><span>Pengalaman aplikasi</span><strong>Versi aplikasi web</strong></div><div class="social-settings-note">PLUITS menggunakan tampilan aplikasi yang responsif. Pengaturan bahasa dan tampilan lanjutan belum diaktifkan.</div>';
  root.innerHTML=shell('Pengaturan','Pusat pengaturan akun dan pengalaman aplikasi Anda.','profile',
   '<section class="social-settings-layout"><nav class="social-settings-menu" aria-label="Kategori pengaturan">'+sections.map(item=>'<button type="button" data-settings-tab="'+item.id+'" class="'+(active===item.id?'is-active':'')+'">'+renderIcon(item.icon)+'<span>'+item.label+'</span><b>›</b></button>').join('')+'</nav>'
   +'<section class="social-settings-panel"><div class="social-settings-panel-heading"><span class="social-kicker">PENGATURAN PLUITS</span><h2>'+selected.title+'</h2><p>'+selected.desc+'</p></div>'+detail+'</section>'
   +'<section class="social-settings-account"><div><strong>Keluar dari PLUITS</strong><p>Akhiri sesi akun pada perangkat ini.</p></div><button type="button" class="social-signout-button" data-sign-out>'+renderIcon('logout')+'<span>Keluar</span></button></section>'
   +'<a class="social-settings-back" href="'+routeHref('profile')+'">← Kembali ke Profil</a></section>');
 };
 render();
 root.addEventListener('click',async event=>{
  const tab=event.target.closest('[data-settings-tab]');
  if(tab&&root.contains(tab)){active=tab.dataset.settingsTab;render();return;}
  const signout=event.target.closest('[data-sign-out]');
  if(signout&&root.contains(signout)){
   if(!onSignOut||!window.confirm('Keluar dari akun PLUITS pada perangkat ini?'))return;
   signout.disabled=true;signout.textContent='Memproses…';
   try{const result=await onSignOut();if(result?.error)throw result.error;}
   catch(error){signout.disabled=false;signout.textContent='Keluar';window.alert(error?.message||'Tidak dapat keluar. Silakan coba lagi.');}
  }
 });
}
