import { routeHref } from '../../config/paths.js';
import '../../design-system/page-shell.css';
import { renderBrand, renderPageFooter } from '../../design-system/page-shell.js';
import { renderIcon } from '../../design-system/icons.js';
import './business-home.css';

const cards = [
  ['Marketplace','Jelajahi produk dan katalog dari berbagai pelaku usaha.','cart'],
  ['Store','Bangun dan kelola toko produk fisik maupun digital.','book'],
  ['Restaurant & Café','Temukan dan kelola bisnis kuliner.','message'],
  ['Service & Professional','Hubungkan layanan dan keahlian dengan pelanggan.','user'],
  ['Tickets & Accommodation','Akses layanan perjalanan dan akomodasi.','mapPin'],
  ['Logistics & Transportation','Temukan solusi transportasi dan logistik.','arrow']
];
export function mountBusinessHomePage({root,user=null}={}) {
  root.innerHTML = '<div class="pl-page-shell business-home"><header class="pl-page-header business-home-header">'+renderBrand({href:routeHref('home'),label:'PLUITS'})+'<nav><a href="'+routeHref('discover')+'">Jelajah</a>'+(user?'<a class="business-home-account" href="'+routeHref('social')+'">Beranda Sosial</a>':'<a class="business-home-account" href="'+routeHref('login')+'">Masuk</a>')+'</nav></header><main class="pl-page-main business-home-main"><section class="business-home-hero"><span class="business-home-kicker">ONE CONNECTED DIGITAL ECOSYSTEM</span><h1>Pusat bisnis dan layanan digital dalam satu ekosistem.</h1><p>PLUITS menghubungkan pelaku usaha, penyedia layanan, dan pelanggan melalui berbagai ruang bisnis yang saling terintegrasi.</p><div class="business-home-cta"><a href="'+routeHref(user?'dashboard':'register')+'">'+(user?'Kelola Aktivitas':'Mulai Bersama PLUITS')+'</a><a href="'+routeHref('discover')+'">Jelajahi PLUITS</a></div></section><section class="business-home-section"><div><span class="business-home-kicker">PLUITS BUSINESS ECOSYSTEM</span><h2>Jelajahi pusat bisnis PLUITS</h2><p>Berbagai kebutuhan usaha dan layanan terhubung melalui satu platform.</p></div><div class="business-home-grid">'+cards.map(([title,desc,icon])=>'<article><span>'+renderIcon(icon)+'</span><h3>'+title+'</h3><p>'+desc+'</p><a href="'+routeHref('discover')+'">Jelajahi <b>→</b></a></article>').join('')+'</div></section><section class="business-home-social"><div><span class="business-home-kicker">PLUITS SOCIAL</span><h2>Terhubung dengan komunitas PLUITS.</h2><p>Berbagi cerita, temukan kreator, dan ikuti aktivitas komunitas melalui ruang sosial personal.</p></div><a href="'+routeHref(user?'social':'login')+'">'+(user?'Buka Beranda Sosial':'Masuk ke akun')+' →</a></section></main>'+renderPageFooter({copyright:'© 2026 PLUITS. All rights reserved.',attribution:'One connected digital ecosystem.',groups:[{title:'Bisnis',items:[{label:'Marketplace',route:'discover'},{label:'Jelajah',route:'discover'}]},{title:'Akun',items:[{label:'Masuk',route:'login'},{label:'Daftar',route:'register'}]},{title:'Informasi',items:[{label:'Ketentuan Layanan',route:'terms'},{label:'Kebijakan Privasi',route:'privacy'}]}]})+'</div>';
}
