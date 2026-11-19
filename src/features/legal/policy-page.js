import { routeHref } from '../../config/paths.js';
import './policy-page.css';
import '../../design-system/page-shell.css';
import { renderPageHeader } from '../../design-system/page-shell.js';
import { renderPublicFooter } from '../public-info/public-footer.js';

const POLICIES = {
  terms: {
    title: 'Ketentuan Layanan',
    status: 'Rancangan ketentuan · belum berlaku sebagai dokumen final',
    intro: 'Dokumen ini menjelaskan kerangka penggunaan PLUITS. Sebelum berlaku, versi final harus mencantumkan identitas operator, alamat resmi, yurisdiksi, kontak, dan aturan operasional yang telah disetujui.',
    sections: [
      ['Tentang PLUITS','PLUITS adalah platform digital yang dikembangkan untuk menghubungkan pengguna, komunitas, informasi tempat, pelaku usaha, produk, dan layanan. Ketersediaan fitur dapat berbeda menurut tahap pengembangan dan wilayah.'],
      ['Akun dan keamanan','Pengguna wajib memberikan informasi yang benar, menjaga kerahasiaan kredensial, dan bertanggung jawab atas aktivitas akunnya. Jangan membagikan kata sandi atau kode verifikasi.'],
      ['Perilaku pengguna','Dilarang melakukan penipuan, spam, pelecehan, ancaman, penyamaran, pelanggaran privasi, manipulasi, atau aktivitas yang melanggar hukum maupun hak pihak lain.'],
      ['Konten pengguna','Pengguna bertanggung jawab atas konten yang dibuat atau diunggah dan wajib memiliki hak yang diperlukan. Lisensi untuk menampilkan konten, moderasi, penghapusan, dan mekanisme keberatan harus ditetapkan secara jelas pada versi final.'],
      ['Marketplace dan penyedia','Informasi produk, harga, stok, identitas usaha, dan pemenuhan pesanan harus akurat. Peran PLUITS sebagai platform tidak otomatis menjadikan PLUITS sebagai penjual atau penyedia barang/jasa.'],
      ['Pembayaran dan transaksi','Metode pembayaran, biaya, pencairan dana, pembatalan, refund, pengiriman, dan sengketa hanya berlaku sesuai alur yang benar-benar diaktifkan serta ketentuan yang ditampilkan sebelum transaksi. Halaman ini tidak mengaktifkan pembayaran atau menjanjikan perlindungan pembeli/refund.'],
      ['Ketersediaan layanan','Fitur dapat berubah, dibatasi, dihentikan sementara, atau diperbarui untuk pemeliharaan, keamanan, kepatuhan, dan pengembangan. Tidak ada jaminan bahwa seluruh fitur selalu tersedia tanpa gangguan.'],
      ['Pelaporan dan penegakan','Proses pelaporan, moderasi, pembatasan, dan banding harus mengikuti kemampuan operasional yang benar-benar tersedia. Tidak ada SLA yang dijanjikan oleh dokumen rancangan ini.'],
      ['Penghentian dan penghapusan akun','Pengguna harus memperoleh cara yang jelas untuk meminta penghapusan akun. Pengecualian penyimpanan untuk kewajiban hukum, keamanan, atau sengketa harus dijelaskan pada kebijakan final.'],
      ['Perubahan dan kontak','Versi final akan memuat tanggal berlaku, riwayat perubahan, identitas operator, dan kontak resmi. Perubahan material akan diberitahukan sesuai hukum yang berlaku.']
    ]
  },
  privacy: {
    title: 'Kebijakan Privasi',
    status: 'Rancangan privasi · menunggu audit data dan tinjauan hukum',
    intro: 'Privasi merupakan bagian dari rancangan PLUITS. Ini adalah kerangka transparansi, bukan pernyataan final seluruh pemrosesan data. Sebelum publikasi, setiap kategori harus dicocokkan dengan kode aplikasi, Supabase, penyimpanan media, log, analitik, dan seluruh SDK/vendor yang digunakan.',
    sections: [
      ['Pengelola data','Identitas badan usaha/operator PLUITS, alamat terdaftar, kontak privasi, dan yurisdiksi pemrosesan harus dicantumkan sebelum dokumen berlaku. Informasi tersebut belum ditetapkan pada halaman ini.'],
      ['Kategori data','Bergantung pada fitur, data dapat mencakup informasi akun dan autentikasi; profil dan preferensi; konten, foto, video, komentar, dan interaksi; pesan dan laporan; informasi toko, produk, pesanan atau layanan; data perangkat, log keamanan dan diagnostik; serta lokasi apabila pengguna memberikan izin. Daftar final wajib diverifikasi terhadap implementasi.'],
      ['Tujuan pemrosesan','Data dapat digunakan untuk membuat dan mengamankan akun, menyediakan fitur yang diminta, menampilkan konten sesuai pengaturan, memproses komunikasi atau transaksi yang tersedia, mencegah penyalahgunaan, menjaga stabilitas layanan, dan memenuhi kewajiban hukum. Dasar dan tujuan spesifik harus dijelaskan per kategori pada versi final.'],
      ['Lokasi dan izin perangkat','Izin lokasi, kamera, foto, mikrofon, dan notifikasi hanya boleh diminta ketika fitur terkait membutuhkannya. Pengguna perlu memperoleh penjelasan dan pilihan menolak izin yang tidak wajib. Penggunaan lokasi presisi/latar belakang dan retensinya harus diaudit sebelum rilis.'],
      ['Penyedia dan pembagian data','Nama penyedia infrastruktur/layanan, kategori data yang diterima, tujuan, lokasi pemrosesan, dan ketentuan transfer harus dicantumkan berdasarkan kontrak dan konfigurasi aktual. Draft ini tidak membuat klaim bahwa data tidak pernah dibagikan.'],
      ['Penyimpanan dan keamanan','PLUITS perlu menerapkan kontrol akses dan perlindungan sesuai risiko. Retensi setiap kategori, penghapusan dari sistem aktif, backup, log, dan pengecualian hukum harus ditetapkan melalui inventaris data. Draft ini tidak menjanjikan enkripsi atau tenggat penghapusan yang belum diverifikasi.'],
      ['Hak dan pilihan pengguna','Hak akses, koreksi, pembatasan, keberatan, dan penghapusan mengikuti hukum yang berlaku. Mekanisme permintaan, verifikasi identitas, tenggat, dan kontak privasi harus tersedia sebelum kebijakan final diterbitkan.'],
      ['Penghapusan akun','Aplikasi yang menyediakan pembuatan akun harus menyediakan jalur penghapusan yang mudah ditemukan di dalam aplikasi dan mekanisme permintaan melalui halaman web eksternal. Halaman PLUITS saat ini masih berupa informasi persiapan, bukan formulir aktif.'],
      ['Anak dan batas usia','Target usia dan perlakuan terhadap data anak harus ditetapkan berdasarkan fitur, wilayah, dan kewajiban hukum. PLUITS tidak menyatakan target usia final melalui dokumen rancangan ini.'],
      ['Perubahan dan kontak privasi','Versi final akan mencantumkan tanggal berlaku, ringkasan perubahan, identitas operator, dan kanal pertanyaan/permintaan data. Kontak resmi belum dicantumkan karena belum dikonfirmasi.']
    ]
  }
};

export function mountPolicyPage({ root, type }) {
  const policy = POLICIES[type];
  if (!policy) return;
  const sections = policy.sections.map(([heading, copy], index) =>
    '<section class="policy-section" id="policy-section-' + (index + 1) + '"><h2>' + (index + 1) + '. ' + heading + '</h2><p>' + copy + '</p></section>'
  ).join('');
  const contents = policy.sections.map(([heading], index) =>
    '<a href="#policy-section-' + (index + 1) + '">' + (index + 1) + '. ' + heading + '</a>'
  ).join('');
  root.innerHTML =
    '<div class="pl-page-shell policy-shell">' +
      renderPageHeader({ note: 'EKOSISTEM DIGITAL TERINTEGRASI', label: 'PLUITS — kebijakan' }) +
      '<main class="pl-page-main policy-page"><article class="policy-card">' +
        '<span class="policy-status">' + policy.status + '</span>' +
        '<h1>' + policy.title + '</h1><p class="policy-intro">' + policy.intro + '</p>' +
        '<nav class="policy-contents" aria-label="Daftar isi"><strong>Dalam dokumen ini</strong>' + contents + '</nav>' +
        sections +
        '<p class="policy-disclaimer">Status dokumen: rancangan persiapan produk. Belum menjadi ketentuan final atau bukti kepatuhan. Versi final harus disetujui operator PLUITS dan ditinjau penasihat hukum sebelum peluncuran publik.</p>' +
        '<a class="policy-back-link" href="' + routeHref('home') + '">Kembali ke Beranda</a>' +
      '</article></main>' +
      renderPublicFooter() +
    '</div>';
}
