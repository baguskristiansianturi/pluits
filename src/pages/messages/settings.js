import './settings.css';
import { getInboxPreferences, saveInboxPreferences } from '../../features/inbox/preferences.js';

const sections=[
 {id:'appearance',icon:'◐',title:'Tampilan & wallpaper',description:'Personalisasi ruang percakapan di perangkat ini.',content:`
  <label class="pl-dm-setting-control"><span><strong>Tema Inbox</strong><small>Pilih tampilan terang atau gelap.</small></span><select data-pref="theme"><option value="light">Terang</option><option value="dark">Gelap</option></select></label>
  <label class="pl-dm-setting-control"><span><strong>Ukuran teks</strong><small>Atur kenyamanan membaca pesan.</small></span><select data-pref="fontSize"><option value="small">Kecil</option><option value="normal">Normal</option><option value="large">Besar</option></select></label>
  <label class="pl-dm-setting-control"><span><strong>Wallpaper chat</strong><small>Pilih latar ruang percakapan.</small></span><select data-pref="wallpaper"><option value="none">Transparan / default</option><option value="sand">Warm sand</option><option value="mist">Soft mist</option><option value="ocean">Ocean blue</option><option value="midnight">Midnight</option></select></label>
  <label class="pl-dm-setting-control pl-dm-wallpaper-upload"><span><strong>Wallpaper sendiri</strong><small>Gunakan gambar dari perangkat ini (maks. 1,3 MB).</small></span><input type="file" accept="image/png,image/jpeg,image/webp" data-wallpaper-file></label>
  <button class="pl-dm-setting-reset" type="button" data-wallpaper-reset>Hapus wallpaper pribadi</button>`},
 {id:'writing',icon:'⌨',title:'Penulisan pesan',description:'Sesuaikan cara Anda menulis dan mengirim pesan.',content:`
  <label class="pl-dm-setting-control"><span><strong>Enter untuk mengirim</strong><small>Matikan untuk menggunakan Enter sebagai baris baru.</small></span><input type="checkbox" data-pref="enterToSend"></label>`},
 {id:'notifications',icon:'♧',title:'Notifikasi',description:'Kelola izin notifikasi pada browser ini.',content:`
  <div class="pl-dm-setting-info"><strong>Izin notifikasi browser</strong><small data-notification-status>Memeriksa dukungan browser…</small></div>
  <button class="pl-dm-setting-action" type="button" data-notification-enable>Aktifkan izin notifikasi</button>
  <p class="pl-dm-setting-note">Izin browser bukan berarti push notification sudah aktif saat aplikasi ditutup. Layanan push PLUITS memerlukan service worker dan server push.</p>`},
 {id:'privacy',icon:'◇',title:'Privasi & keamanan',description:'Informasi perlindungan akun dan percakapan.',content:`
  <div class="pl-dm-setting-info"><strong>Akses percakapan</strong><small>Keanggotaan percakapan dan kebijakan Row Level Security Supabase membatasi siapa yang dapat membaca pesan.</small></div>
  <div class="pl-dm-setting-info"><strong>PIN khusus Inbox</strong><small>Belum diaktifkan. Fitur ini perlu penguncian yang diverifikasi server dan mekanisme pemulihan; PIN lokal yang mudah dilewati tidak akan dipasang sebagai fitur keamanan palsu.</small></div>
  <div class="pl-dm-setting-info"><strong>Enkripsi end-to-end</strong><small>Belum tersedia. Pesan dan lampiran belum menggunakan protokol Signal E2EE. Jangan mengirim informasi sangat sensitif melalui Inbox untuk saat ini.</small></div>
  <div class="pl-dm-setting-info"><strong>Perangkat & sesi</strong><small>Kelola sesi akun melalui pengaturan keamanan akun PLUITS.</small></div>`},
 {id:'data',icon:'▤',title:'Data & penyimpanan',description:'Informasi pengelolaan data Inbox.',content:`
  <div class="pl-dm-setting-info"><strong>Draft offline</strong><small>Pesan yang menunggu koneksi disimpan sementara pada perangkat ini.</small></div>
  <div class="pl-dm-setting-info"><strong>Wallpaper pribadi</strong><small>Gambar wallpaper disimpan lokal di browser ini dan tidak diunggah ke server.</small></div>`}
];

export function messageSettingsPage(){
 return `<main class="pl-dm-settings">
  <header class="pl-dm-settings-head"><a class="pl-dm-settings-back" href="#/inbox" aria-label="Kembali ke Inbox"><span aria-hidden="true">‹</span><small>Inbox</small></a><div class="pl-dm-settings-head-copy"><span>PLUITS · WORKSPACE</span><h1>Pengaturan Inbox</h1></div></header>
  <div class="pl-dm-settings-body">
   <div class="pl-dm-settings-intro"><span class="pl-dm-settings-eyebrow">PREFERENSI & KONTROL</span><h2>Atur ruang kerja pesan</h2><p>Kelola tampilan, penulisan, notifikasi, privasi, dan data. Preferensi personal tersimpan di browser perangkat ini.</p></div>
   <div class="pl-dm-settings-groups">${sections.map((section,index)=>`<details class="pl-dm-settings-group" id="dm-setting-${section.id}" ${index===0||index===1?'open':''}><summary><span class="pl-dm-settings-icon" aria-hidden="true">${section.icon}</span><span class="pl-dm-settings-group-copy"><strong>${section.title}</strong><small>${section.description}</small></span><span class="pl-dm-settings-chevron" aria-hidden="true">⌄</span></summary><div class="pl-dm-settings-items">${section.content}</div></details>`).join('')}</div>
   <p class="pl-dm-settings-footnote" id="pl-dm-settings-status" role="status" aria-live="polite">Preferensi tersimpan otomatis di perangkat ini.</p>
  </div>
 </main>`;
}
export function bindMessageSettingsPage(){
 const preferences=getInboxPreferences();
 document.querySelectorAll('[data-pref]').forEach(control=>{
  const key=control.dataset.pref;
  if(control.type==='checkbox')control.checked=Boolean(preferences[key]);else control.value=preferences[key];
  control.addEventListener('change',()=>{
   saveInboxPreferences({[key]:control.type==='checkbox'?control.checked:control.value});
   const status=document.querySelector('#pl-dm-settings-status');if(status)status.textContent='Perubahan tersimpan.';
  });
 });
 const status=document.querySelector('#pl-dm-settings-status');
 const file=document.querySelector('[data-wallpaper-file]');
 file?.addEventListener('change',()=>{
  const image=file.files?.[0];if(!image)return;
  if(!/^image\/(png|jpeg|webp)$/.test(image.type)||image.size>1300000){file.value='';if(status)status.textContent='Pilih PNG, JPG, atau WebP maksimal 1,3 MB.';return;}
  const reader=new FileReader();
  reader.onload=()=>{if(typeof reader.result!=='string')return;saveInboxPreferences({wallpaper:reader.result});if(status)status.textContent='Wallpaper pribadi tersimpan di perangkat ini.';};
  reader.onerror=()=>{if(status)status.textContent='Gambar tidak dapat dibaca.';};
  reader.readAsDataURL(image);
 });
 document.querySelector('[data-wallpaper-reset]')?.addEventListener('click',()=>{
  saveInboxPreferences({wallpaper:'none'});const select=document.querySelector('[data-pref="wallpaper"]');if(select)select.value='none';if(file)file.value='';if(status)status.textContent='Wallpaper pribadi dihapus.';
 });
 const notificationStatus=document.querySelector('[data-notification-status]');
 const refreshNotification=()=>{if(!notificationStatus)return;notificationStatus.textContent=!('Notification'in window)?'Browser ini tidak mendukung notifikasi.':Notification.permission==='granted'?'Izin diberikan. Push saat aplikasi ditutup belum tersedia.':Notification.permission==='denied'?'Izin diblokir di pengaturan browser.':'Belum diizinkan.';};
 refreshNotification();
 document.querySelector('[data-notification-enable]')?.addEventListener('click',async()=>{
  if(!('Notification'in window)){if(status)status.textContent='Browser tidak mendukung Notification API.';return;}
  try{await Notification.requestPermission();refreshNotification();if(status)status.textContent='Status izin notifikasi diperbarui.';}catch{if(status)status.textContent='Permintaan izin tidak dapat dilakukan.';}
 });
 document.querySelectorAll('.pl-dm-settings-group').forEach(group=>group.addEventListener('toggle',()=>group.classList.toggle('is-open',group.open)));
}
