import { routeHref } from '../../config/paths.js';
import '../../design-system/page-shell.css';
import { renderPageHeader } from '../../design-system/page-shell.js';
import { renderPublicFooter } from '../public-info/public-footer.js';
import { renderIcon } from '../../design-system/icons.js';
import './business-partners-page.css';

const CATEGORIES = [
  { id:'accommodation', name:'Akomodasi', icon:'mapPin', description:'Hotel, villa, homestay, dan pilihan tempat menginap.' },
  { id:'transportation', name:'Transportasi', icon:'mapPin', description:'Layanan perjalanan, kendaraan, dan transportasi lokal.' },
  { id:'courier', name:'Kurir', icon:'store', description:'Pengiriman barang dan layanan logistik.' },
  { id:'store', name:'Toko', icon:'store', description:'Toko, produk, dan kebutuhan dari berbagai pelaku usaha.' },
  { id:'restaurant', name:'Restoran & Café', icon:'store', description:'Temukan restoran, café, dan pengalaman kuliner.' },
  { id:'health', name:'Kesehatan', icon:'heart', description:'Dokter, dokter gigi, klinik, dan layanan kesehatan.' },
  { id:'education', name:'Pendidikan & Kursus', icon:'book', description:'Kursus, pelatihan, bimbingan belajar, dan pendidikan.' },
  { id:'professional', name:'Jasa Profesional', icon:'briefcase', description:'Konsultan, jasa hukum, akuntansi, kreatif, dan profesional lainnya.' },
  { id:'halal', name:'Layanan Halal', icon:'check', description:'Konsultasi, pendampingan, dan layanan terkait kebutuhan halal.' },
  { id:'general-services', name:'Layanan Umum', icon:'settings', description:'Laundry, kebersihan, perawatan, dan berbagai layanan sehari-hari.' },
  { id:'property', name:'Properti', icon:'grid', description:'Informasi jual, beli, sewa, dan listing properti.' }
];

function categoryCard(category) {
  return '<article class="business-partner-card" id="partner-' + category.id + '">' +
    '<div class="business-partner-card-icon">' + renderIcon(category.icon) + '</div>' +
    '<div class="business-partner-card-copy"><h2>' + category.name + '</h2><p>' + category.description + '</p></div>' +
    '<span class="business-partner-status">Coming Soon</span>' +
  '</article>';
}

export function mountBusinessPartnersPage({ root } = {}) {
  root.innerHTML = '<div class="pl-page-shell business-partners-page">' +
    renderPageHeader({ variant:'business-home', brandHref:routeHref('home'), label:'PLUITS — Business Partners', rightContent:'<a class="business-partners-back" href="' + routeHref('home') + '">Kembali ke Beranda</a>' }) +
    '<main class="pl-page-main business-partners-main">' +
      '<section class="business-partners-hero"><span class="business-eyebrow">PLUITS BUSINESS NETWORK</span><h1>Business Partners</h1><p>Temukan bisnis, penyedia layanan, dan mitra profesional dalam satu ekosistem. Kategori akan dibuka secara bertahap seiring kesiapan setiap layanan.</p></section>' +
      '<section class="business-partners-directory" aria-label="Kategori Business Partners"><div class="business-partners-directory-heading"><div><span class="business-eyebrow">JELAJAHI KATEGORI</span><h2>Temukan yang Anda butuhkan.</h2></div><span class="business-partners-count">11 kategori direncanakan</span></div><div class="business-partners-grid">' + CATEGORIES.map(categoryCard).join('') + '</div></section>' +
      '<section class="business-partners-note"><span>' + renderIcon('eye') + '</span><p>Kategori dan layanan akan tersedia secara bertahap. Status Coming Soon berarti modul terkait masih dalam persiapan.</p></section>' +
    '</main>' + renderPublicFooter() + '</div>';
}
