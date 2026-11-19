import { routeHref } from '../../config/paths.js';
import { renderBrand } from '../../design-system/page-shell.js';
import { renderPublicFooter } from './public-footer.js';
import '../../design-system/page-shell.css';
import './public-info-page.css';

const PAGES = {
  about:{title:'Tentang PLUITS',intro:'PLUITS adalah ekosistem digital yang menghubungkan orang, komunitas, tempat, usaha, dan layanan dalam satu pengalaman.',status:'Informasi PLUITS',sections:[
    ['Satu ekosistem yang saling terhubung','PLUITS dikembangkan untuk membantu pengguna berbagi cerita, menemukan hal menarik, mengenal bisnis, dan menjelajahi layanan dalam satu tempat.'],
    ['Untuk pengguna','Temukan komunitas, tempat, produk, dan informasi yang relevan dengan kebutuhan Anda.'],
    ['Untuk pelaku usaha','Bangun kehadiran digital dan perkenalkan usaha kepada lebih banyak orang.'],
    ['Berkembang secara bertahap','Fitur dan layanan PLUITS dikembangkan bertahap. Ketersediaan setiap layanan akan ditampilkan secara jelas di dalam platform.']
  ]},
  help:{title:'Pusat Bantuan',intro:'Temukan panduan untuk menggunakan PLUITS dan mendapatkan bantuan saat mengalami kendala.',status:'Pusat Bantuan',sections:[
    ['Akun dan akses','Panduan pendaftaran, masuk, konfirmasi email, pemulihan kata sandi, profil, dan pengaturan akun.'],
    ['Social dan komunitas','Panduan membuat konten, berinteraksi, mengelola privasi, memblokir akun, serta melaporkan konten.'],
    ['Discover dan direktori','Panduan mencari tempat, usaha, dan informasi yang tersedia di PLUITS.'],
    ['Marketplace','Informasi untuk pembeli dan penjual mengenai katalog, pesanan, pembayaran, pengiriman, pembatalan, dan pengembalian dana. Fitur transaksi mengikuti ketersediaan layanan.'],
    ['Butuh bantuan lebih lanjut?','Kunjungi halaman Hubungi Kami. Kanal dukungan resmi akan ditampilkan setelah siap digunakan.']
  ]},
  faq:{title:'Pertanyaan Umum',intro:'Jawaban singkat mengenai PLUITS dan layanan yang sedang dikembangkan.',status:'Pertanyaan Umum',sections:[
    ['Apa itu PLUITS?','PLUITS adalah ekosistem digital yang menghubungkan Social, Discover, Marketplace, dan layanan lain yang dikembangkan secara bertahap.'],
    ['Apakah satu akun dapat digunakan di seluruh PLUITS?','PLUITS dirancang dengan satu identitas akun untuk mengakses pengalaman yang terhubung. Akses setiap fitur tetap mengikuti ketersediaan dan hak akun.'],
    ['Apakah Marketplace sudah menerima pembayaran?','Metode pembayaran sedang dipersiapkan. Jangan melakukan pembayaran di luar instruksi resmi yang ditampilkan pada halaman transaksi PLUITS.'],
    ['Apakah PLUITS tersedia di Android dan iOS?','Aplikasi Android dan iOS sedang dipersiapkan. Tautan unduhan akan tersedia setelah aplikasi resmi diterbitkan.'],
    ['Bagaimana cara menghapus akun?','Informasi dan mekanisme penghapusan akun sedang dipersiapkan. Halaman Penghapusan Akun akan diperbarui sebelum aplikasi tersedia untuk publik.'],
    ['Bagaimana menghubungi PLUITS?','Silakan kunjungi halaman Hubungi Kami untuk melihat status kanal dukungan resmi.']
  ]},
  contact:{title:'Hubungi Kami',intro:'PLUITS sedang menyiapkan kanal dukungan resmi untuk pertanyaan, bantuan, dan pengaduan.',status:'Kanal dukungan sedang disiapkan',sections:[
    ['Dukungan pengguna','Kanal untuk pertanyaan akun, akses, penggunaan fitur, dan kendala teknis akan diumumkan di halaman ini.'],
    ['Pengaduan dan keamanan','Laporan terkait konten, akun, dugaan penipuan, atau keselamatan akan diarahkan melalui kanal pelaporan resmi setelah tersedia.'],
    ['Privasi dan data pribadi','Kontak khusus privasi akan dicantumkan bersama Kebijakan Privasi final sebelum layanan diluncurkan secara luas.'],
    ['Informasi penting','PLUITS tidak mencantumkan alamat email, nomor telepon, atau alamat kantor yang belum ditetapkan sebagai kontak resmi.']
  ]},
  guidelines:{title:'Pedoman Komunitas',intro:'Pedoman untuk membantu menjaga ruang PLUITS tetap aman, saling menghormati, dan bermanfaat.',status:'Rancangan kebijakan — belum final',sections:[
    ['Saling menghormati','Jangan melakukan pelecehan, perundungan, ancaman, ujaran kebencian, atau membagikan informasi pribadi orang lain tanpa izin.'],
    ['Konten yang diperbolehkan','Bagikan konten yang Anda miliki atau berhak gunakan. Jangan mengunggah materi ilegal, menyesatkan, berbahaya, atau melanggar hak pihak lain.'],
    ['Keaslian dan identitas','Jangan menyamar sebagai orang, bisnis, atau organisasi lain. Jangan membuat klaim verifikasi atau afiliasi yang tidak benar.'],
    ['Spam dan penyalahgunaan','Jangan melakukan spam, manipulasi interaksi, penipuan, atau aktivitas yang mengganggu layanan.'],
    ['Pelaporan dan peninjauan','Fitur pelaporan, moderasi, peninjauan, dan banding akan mengikuti kemampuan operasional yang benar-benar tersedia. Dokumen ini belum menjadi kebijakan final.']
  ]},
  marketplaceInfo:{title:'Cara Kerja Marketplace',intro:'Marketplace PLUITS dirancang untuk membantu pengguna menemukan produk dan layanan dari pelaku usaha.',status:'Informasi layanan — ketersediaan bertahap',sections:[
    ['Temukan usaha dan penawaran','Jelajahi toko, produk, menu, dan layanan yang ditampilkan oleh pelaku usaha. Ketersediaan katalog dapat berbeda menurut merchant dan wilayah.'],
    ['Periksa informasi sebelum memesan','Baca detail produk atau layanan, harga, ketersediaan, ketentuan merchant, serta informasi pengiriman atau pemenuhan pesanan.'],
    ['Buat pesanan','Jika checkout tersedia, ikuti ringkasan pesanan dan instruksi pembayaran yang tampil pada halaman transaksi.'],
    ['Pantau pesanan','Status pesanan dan komunikasi terkait akan ditampilkan melalui fitur yang tersedia pada saat transaksi.'],
    ['Peran PLUITS','PLUITS menyediakan platform untuk mempertemukan pengguna dan merchant. Tanggung jawab atas produk, stok, deskripsi, dan pemenuhan pesanan mengikuti peran masing-masing pihak serta ketentuan yang berlaku.']
  ]},
  sellerTerms:{title:'Ketentuan Penjual',intro:'Informasi dasar bagi pelaku usaha yang ingin menawarkan produk atau layanan melalui PLUITS.',status:'Rancangan ketentuan — belum final',sections:[
    ['Informasi usaha yang benar','Penjual bertanggung jawab atas keakuratan identitas usaha, deskripsi, harga, stok, foto, area layanan, dan informasi lain yang ditampilkan.'],
    ['Produk dan layanan','Penjual hanya boleh menawarkan produk atau layanan yang sah dan mematuhi peraturan serta kebijakan platform.'],
    ['Pesanan dan pelanggan','Penjual bertanggung jawab menindaklanjuti pesanan, memberikan informasi yang benar, dan memenuhi pesanan sesuai kesepakatan yang ditampilkan.'],
    ['Pembayaran dan biaya','Metode pembayaran, biaya layanan, pencairan dana, dan kewajiban pajak akan diatur dalam ketentuan final setelah mitra dan alur operasional ditetapkan.'],
    ['Status dokumen','Dokumen ini merupakan rancangan informasi. Ketentuan yang mengikat harus diselesaikan dan ditinjau sebelum fitur merchant diluncurkan.']
  ]},
  paymentPolicy:{title:'Pembayaran',intro:'Informasi mengenai metode pembayaran yang direncanakan untuk transaksi di Marketplace PLUITS.',status:'Metode pembayaran belum aktif',sections:[
    ['Metode pembayaran','PLUITS merencanakan dukungan QRIS, kartu Visa dan Mastercard, transfer bank dan Virtual Account, GoPay, OVO, DANA, ShopeePay, serta kanal lain yang tersedia dari mitra pembayaran.'],
    ['Mitra pembayaran','PLUITS sedang merencanakan penggunaan Midtrans. Metode yang benar-benar tersedia akan mengikuti aktivasi, persetujuan, dan cakupan layanan mitra.'],
    ['Konfirmasi transaksi','Jangan menganggap pesanan telah dibayar sebelum status pembayaran terkonfirmasi pada halaman transaksi PLUITS.'],
    ['Keamanan','Jangan membagikan kata sandi, kode OTP, atau informasi rahasia kartu kepada pihak lain. PLUITS tidak meminta kode OTP melalui pesan pribadi.'],
    ['Status layanan','Pembayaran belum aktif. Daftar metode ini adalah rencana dan bukan konfirmasi bahwa transaksi sudah dapat dilakukan.']
  ]},
  refundPolicy:{title:'Pembatalan & Pengembalian Dana',intro:'Informasi awal mengenai pembatalan pesanan, pengembalian dana, dan penanganan kendala transaksi.',status:'Rancangan kebijakan — belum final',sections:[
    ['Sebelum memesan','Periksa deskripsi, variasi, harga, ketersediaan, alamat, jadwal, dan ketentuan merchant sebelum menyelesaikan pesanan.'],
    ['Permintaan pembatalan','Ketersediaan pembatalan bergantung pada status pesanan, jenis produk atau layanan, dan ketentuan merchant yang akan ditampilkan saat fitur aktif.'],
    ['Pengembalian dana','Alur, metode, waktu proses, dan pengecualian pengembalian dana belum ditetapkan. Informasi final akan ditampilkan sebelum transaksi diaktifkan.'],
    ['Sengketa transaksi','PLUITS sedang menyiapkan alur pengaduan dan penanganan sengketa. Jangan menganggap perlindungan atau jaminan refund tersedia sebelum ketentuannya diterbitkan.']
  ]},
  shippingPolicy:{title:'Pengiriman',intro:'Informasi dasar mengenai pengiriman dan pemenuhan pesanan Marketplace.',status:'Rancangan kebijakan — mengikuti merchant',sections:[
    ['Informasi pengiriman','Pilihan pengiriman, biaya, estimasi, dan area layanan akan ditampilkan berdasarkan merchant dan mitra logistik yang tersedia.'],
    ['Tanggung jawab merchant','Merchant bertanggung jawab menyiapkan pesanan dan memberikan informasi pengiriman yang benar sesuai layanan yang dipilih.'],
    ['Pelacakan pesanan','Informasi pelacakan hanya tersedia jika didukung oleh metode pengiriman yang digunakan.'],
    ['Kendala pengiriman','Proses pelaporan barang terlambat, rusak, atau tidak diterima akan mengikuti ketentuan final saat fitur transaksi tersedia.']
  ]},
  accountDeletion:{title:'Penghapusan Akun',intro:'Informasi tentang cara meminta penghapusan akun PLUITS dan data yang terkait.',status:'Mekanisme penghapusan akun belum tersedia',sections:[
    ['Hak pengguna','Pengguna harus memiliki cara yang jelas untuk meminta penghapusan akun dan data terkait, dengan pengecualian penyimpanan yang diwajibkan oleh hukum atau diperlukan untuk kepentingan yang sah.'],
    ['Melalui aplikasi','Sebelum aplikasi Android dan iOS diterbitkan, PLUITS perlu menyediakan jalur penghapusan akun yang mudah ditemukan di dalam pengaturan akun.'],
    ['Melalui website','Halaman permintaan penghapusan akun eksternal perlu tersedia dan dapat diakses publik tanpa harus masuk ke akun. Mekanisme permintaan dan verifikasi masih harus dibangun.'],
    ['Status saat ini','Halaman ini adalah persiapan informasi, bukan formulir penghapusan akun yang aktif. PLUITS belum menyatakan bahwa permintaan penghapusan dapat diproses melalui halaman ini.'],
    ['Penyimpanan yang diwajibkan','Kebijakan final perlu menjelaskan data yang dihapus, data yang harus disimpan untuk kewajiban hukum atau keamanan, alasan penyimpanan, dan jangka waktunya.']
  ]},
  safety:{title:'Keamanan & Keselamatan',intro:'Panduan awal untuk menjaga akun, interaksi, dan aktivitas Anda tetap aman di PLUITS.',status:'Panduan keselamatan',sections:[
    ['Lindungi akun','Gunakan kata sandi yang kuat, jangan membagikan OTP, dan segera amankan akun jika Anda melihat aktivitas yang tidak dikenal.'],
    ['Waspadai penipuan','Periksa identitas pihak yang berinteraksi dengan Anda. Jangan mengirim uang melalui instruksi yang tidak tercantum di alur transaksi resmi.'],
    ['Laporkan masalah','Gunakan fitur pelaporan yang tersedia pada konten atau akun. Kanal pengaduan tambahan akan diumumkan setelah siap.'],
    ['Privasi pribadi','Hindari membagikan alamat rumah, dokumen identitas, informasi keuangan, atau lokasi sensitif secara terbuka.']
  ]},
  cookies:{title:'Kebijakan Cookie',intro:'Informasi mengenai cookie dan teknologi serupa yang mungkin digunakan pada website PLUITS.',status:'Perlu disesuaikan dengan inventaris teknologi',sections:[
    ['Penggunaan teknologi','Website dapat menggunakan penyimpanan browser atau teknologi serupa untuk menjalankan fungsi penting, menjaga sesi, dan mengingat preferensi. Penggunaan aktual harus dikonfirmasi melalui audit teknologi.'],
    ['Teknologi pihak ketiga','Jika analitik, iklan, atau layanan pihak ketiga digunakan, jenis teknologi dan tujuan pemrosesannya harus dijelaskan secara spesifik.'],
    ['Pengaturan pengguna','Kontrol cookie dan preferensi harus disediakan sesuai teknologi yang benar-benar digunakan dan ketentuan hukum yang berlaku.'],
    ['Status dokumen','Dokumen ini belum final. PLUITS tidak menyatakan penggunaan cookie iklan atau analitik tertentu sebelum audit implementasi selesai.']
  ]}
};

export function mountPublicInfoPage({root,type}) {
  const page=PAGES[type];
  if(!page) return;
  const sections=page.sections.map(([heading,copy])=>'<section class="public-info-section"><h2>'+heading+'</h2><p>'+copy+'</p></section>').join('');
  root.innerHTML='<div class="pl-page-shell public-info-shell"><header class="pl-page-header">'+renderBrand({href:routeHref('home'),label:'PLUITS — Beranda'})+'<a class="public-info-home-link" href="'+routeHref('home')+'">Beranda</a></header><main class="pl-page-main public-info-main"><article class="public-info-article"><span class="public-info-status">'+page.status+'</span><h1>'+page.title+'</h1><p class="public-info-intro">'+page.intro+'</p>'+sections+'<p class="public-info-updated">Informasi ini akan diperbarui mengikuti ketersediaan layanan dan kebijakan resmi PLUITS.</p></article></main>'+renderPublicFooter()+'</div>';
}
