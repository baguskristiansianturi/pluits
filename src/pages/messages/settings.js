import './settings.css';
import { getInboxPreferences, saveInboxPreferences } from '../../features/inbox/preferences.js';

const groups = [
  {id:'chat',icon:'◉',title:'Tampilan chat',description:'Atur tampilan percakapan pada perangkat ini.',items:
    `<label class="pl-dm-setting-control"><span><strong>Tema percakapan</strong><small>Terang atau gelap saat membuka chat.</small></span><select data-inbox-preference="theme"><option value="light">Terang</option><option value="dark">Gelap</option></select></label>
    <label class="pl-dm-setting-control"><span><strong>Ukuran teks</strong><small>Ukuran tulisan di dalam percakapan.</small></span><select data-inbox-preference="fontSize"><option value="small">Kecil</option><option value="normal">Normal</option><option value="large">Besar</option></select></label>`},
  {id:'composer',icon:'⌨',title:'Penulisan pesan',description:'Atur perilaku tombol Enter pada kolom pesan.',items:
    `<label class="pl-dm-setting-control"><span><strong>Enter untuk mengirim</strong><small>Jika mati, Enter membuat baris baru. Tombol kirim tetap tersedia.</small></span><input type="checkbox" data-inbox-preference="enterToSend"></label>`},
  {id:'privacy',icon:'◇',title:'Privasi & keamanan',description:'Kontrol yang saat ini berlaku pada Inbox PLUITS.',items:
    `<div class="pl-dm-setting-info"><strong>Receipt pesan</strong><small>Status terkirim, diterima, dan dibaca dikelola oleh server. Pengaturan untuk mematikan read receipt belum tersedia.</small></div>
    <div class="pl-dm-setting-info"><strong>Perlindungan percakapan</strong><small>RLS dan keanggotaan percakapan membatasi akses pesan. Enkripsi end-to-end belum tersedia; jangan menganggap chat PLUITS setara dengan WhatsApp dalam hal ini.</small></div>`},
  {id:'notifications',icon:'♧',title:'Notifikasi',description:'Status dukungan pemberitahuan pesan.',items:
    `<div class="pl-dm-setting-info"><strong>Notifikasi saat aplikasi terbuka</strong><small>Sinkronisasi pesan berjalan melalui Supabase Realtime. Push notification saat browser ditutup belum tersedia.</small></div>`},
  {id:'future',icon:'＋',title:'Fitur berikutnya',description:'Fitur yang belum aktif dan tidak ditampilkan sebagai tombol palsu.',items:
    `<div class="pl-dm-setting-info"><strong>Lampiran foto, video, dan dokumen</strong><small>Belum tersedia pada percakapan.</small></div>
    <div class="pl-dm-setting-info"><strong>Balas, teruskan, reaksi, edit, dan pin pesan</strong><small>Belum tersedia.</small></div>
    <div class="pl-dm-setting-info"><strong>Grup, panggilan, perangkat tertaut, dan pesan sementara</strong><small>Belum tersedia.</small></div>`}
];

export function messageSettingsPage(){
  return `<main class="pl-dm-settings">
    <header class="pl-dm-settings-head">
      <a class="pl-dm-settings-back" href="#/inbox" aria-label="Kembali ke Inbox"><span aria-hidden="true">‹</span><small>Inbox</small></a>
      <div class="pl-dm-settings-head-copy"><span>PLUITS · INBOX</span><h1>Pengaturan Inbox</h1></div>
    </header>
    <div class="pl-dm-settings-body">
      <div class="pl-dm-settings-intro">
        <span class="pl-dm-settings-eyebrow">PREFERENSI PESAN</span>
        <h2>Atur pengalaman chat</h2>
        <p>Preferensi tampilan dan penulisan disimpan otomatis di perangkat ini.</p>
      </div>
      <div class="pl-dm-settings-groups">
        ${groups.map(group=>`<details class="pl-dm-settings-group" id="dm-setting-${group.id}" ${group.id==='chat'||group.id==='composer'?'open':''}>
          <summary><span class="pl-dm-settings-icon" aria-hidden="true">${group.icon}</span><span class="pl-dm-settings-group-copy"><strong>${group.title}</strong><small>${group.description}</small></span><span class="pl-dm-settings-chevron" aria-hidden="true">⌄</span></summary>
          <div class="pl-dm-settings-items">${group.items}</div>
        </details>`).join('')}
      </div>
      <p class="pl-dm-settings-footnote" role="status" id="pl-dm-settings-status">Pengaturan perangkat ini tidak disinkronkan ke perangkat lain.</p>
    </div>
  </main>`;
}

export function bindMessageSettingsPage(){
  const preferences=getInboxPreferences();
  document.querySelectorAll('[data-inbox-preference]').forEach(control=>{
    const key=control.dataset.inboxPreference;
    if(control.type==='checkbox')control.checked=Boolean(preferences[key]);
    else control.value=preferences[key];
    control.addEventListener('change',()=>{
      const value=control.type==='checkbox'?control.checked:control.value;
      saveInboxPreferences({[key]:value});
      const status=document.querySelector('#pl-dm-settings-status');
      if(status)status.textContent='Preferensi tersimpan di perangkat ini.';
    });
  });
  document.querySelectorAll('.pl-dm-settings-group').forEach(group=>{
    group.addEventListener('toggle',()=>group.classList.toggle('is-open',group.open));
  });
}
