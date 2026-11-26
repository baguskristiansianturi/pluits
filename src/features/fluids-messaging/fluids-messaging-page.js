import { renderBrand } from '../../design-system/page-shell.js';
import { routeHref } from '../../config/paths.js';
import { fluidsIcon as icon } from './fluids-icons.js';
import './fluids-messaging.css';

const TABS=[
 {id:'chat',label:'Chat',icon:'chat'},
 {id:'story',label:'Story',icon:'story'},
 {id:'create',label:'+',icon:'plus'},
 {id:'contacts',label:'Kontak',icon:'contacts'},
 {id:'calls',label:'Panggilan',icon:'call'}
];
const DEMO_CONTACTS=[
 {name:'Ayu Pratiwi',detail:'Kontak contoh · belum terhubung'},
 {name:'Raka Mahendra',detail:'Kontak contoh · belum terhubung'},
 {name:'Nadia Putri',detail:'Kontak contoh · belum terhubung'}
];
const escapeHtml=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function mountFluidsMessagingPage({root,user=null}={}){
 let active='chat',menuOpen=false,composeOpen=false,selectedFile=null,selectedRecipient='';
 const render=()=>{
  const heading=active==='chat'?['Chat','Pesan pribadi dan percakapan Anda.']:active==='story'?['Story','Bagikan momen singkat kepada kontak Anda.']:active==='contacts'?['Kontak','Temukan dan pilih orang untuk memulai percakapan.']:active==='calls'?['Panggilan','Riwayat panggilan dan komunikasi suara.']:['Kirim file','Pilih media atau dokumen untuk dibagikan.'];
  const nav=TABS.map(tab=>tab.id==='create'
   ?'<button type="button" class="fluids-create" data-fluids-tab="create" aria-label="Buat pesan atau kirim file"><span class="fluids-create-disc">'+icon('plus')+'</span><small>+</small></button>'
   :'<button type="button" data-fluids-tab="'+tab.id+'" class="'+(active===tab.id?'is-active':'')+'" '+(active===tab.id?'aria-current="page"':'')+'>'+icon(tab.icon)+'<small>'+tab.label+'</small></button>').join('');
  let content='';
  if(active==='chat'){
   content='<div class="fluids-search">'+icon('search')+'<input type="search" aria-label="Cari percakapan" placeholder="Cari chat atau kontak"></div><section class="fluids-empty"><span class="fluids-empty-mark">'+icon('chat')+'</span><strong>Belum ada percakapan</strong><p>Chat yang sudah Anda mulai akan muncul di sini. Pilih Kontak untuk memulai percakapan baru.</p></section>';
  }else if(active==='story'){
   content='<section class="fluids-story-note"><strong>Story Fluids</strong><p>Story dirancang untuk berbagi foto atau video singkat dengan kontrol audiens dan masa tayang. Fitur publikasi belum terhubung.</p><button type="button" class="fluids-send-preview" data-story-create>'+icon('plus')+' Buat Story</button></section>';
  }else if(active==='contacts'){
   content='<div class="fluids-search">'+icon('search')+'<input type="search" aria-label="Cari kontak" placeholder="Cari nama atau username"></div><div class="fluids-contact-list">'+DEMO_CONTACTS.map((c,i)=>'<button type="button" class="fluids-contact-row" data-contact="'+i+'"><span class="fluids-avatar">'+escapeHtml(c.name.split(' ').map(x=>x[0]).join(''))+'</span><span class="fluids-contact-copy"><strong>'+escapeHtml(c.name)+'</strong><small>'+escapeHtml(c.detail)+'</small></span></button>').join('')+'</div><p class="fluids-prototype-note">Nama di atas adalah placeholder desain, bukan daftar kontak atau pengguna yang terhubung.</p>';
  }else if(active==='calls'){
   content='<section class="fluids-empty"><span class="fluids-empty-mark">'+icon('call')+'</span><strong>Belum ada riwayat panggilan</strong><p>Panggilan suara dan video akan tersedia setelah layanan komunikasi real-time dan izin perangkat siap.</p></section>';
  }else{
   content='<section class="fluids-empty"><span class="fluids-empty-mark">'+icon('attach')+'</span><strong>Siapkan file untuk dikirim</strong><p>Pilih gambar atau dokumen, lalu tentukan kontak penerima sebelum mengirim.</p></section>';
  }
  root.innerHTML='<div class="fluids-shell"><header class="fluids-header">'+renderBrand({href:routeHref('social'),label:'PLUITS'})+'<button type="button" class="fluids-header-action" data-fluids-menu aria-label="Pengaturan perpesanan" aria-expanded="'+menuOpen+'">'+icon('more')+'</button>'+(menuOpen?'<div class="fluids-menu" role="menu"><button type="button" data-fluids-settings>'+icon('settings')+' Pengaturan perpesanan</button><button type="button" data-fluids-privacy>'+icon('contacts')+' Privasi & keamanan</button></div>':'')+'</header><main class="fluids-main"><div class="fluids-page-heading"><div><h1>'+heading[0]+'</h1><p>'+heading[1]+'</p></div></div>'+content+'</main><nav class="fluids-bottom-nav" aria-label="Navigasi perpesanan">'+nav+'</nav>'+(composeOpen?composeMarkup():'')+'</div>';
  root.querySelectorAll('[data-fluids-tab]').forEach(btn=>btn.addEventListener('click',()=>{const id=btn.dataset.fluidsTab;if(id==='create'){composeOpen=true;menuOpen=false;render();return;}active=id;menuOpen=false;render();}));
  root.querySelector('[data-fluids-menu]')?.addEventListener('click',()=>{menuOpen=!menuOpen;render();});
  root.querySelector('[data-fluids-settings]')?.addEventListener('click',()=>{menuOpen=false;active='chat';render();});
  root.querySelector('[data-fluids-privacy]')?.addEventListener('click',()=>{menuOpen=false;active='chat';render();});
  root.querySelector('[data-story-create]')?.addEventListener('click',()=>{composeOpen=true;render();});
  root.querySelectorAll('[data-contact]').forEach(btn=>btn.addEventListener('click',()=>{active='chat';selectedRecipient=DEMO_CONTACTS[Number(btn.dataset.contact)]?.name||'';render();}));
  root.querySelector('[data-fluids-close-compose]')?.addEventListener('click',()=>{composeOpen=false;selectedFile=null;selectedRecipient='';render();});
  root.querySelectorAll('[data-fluids-file-kind]').forEach(btn=>btn.addEventListener('click',()=>{const input=root.querySelector('[data-fluids-file-input]');if(input){input.accept=btn.dataset.fluidsFileKind==='image'?'image/*':'.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt';input.click();}}));
  root.querySelector('[data-fluids-file-input]')?.addEventListener('change',event=>{selectedFile=event.target.files?.[0]||null;render();});
  root.querySelectorAll('[data-fluids-recipient]').forEach(btn=>btn.addEventListener('click',()=>{selectedRecipient=btn.dataset.fluidsRecipient;render();}));
  root.querySelector('[data-fluids-send]')?.addEventListener('click',()=>{composeOpen=false;active='chat';render();});
 };
 function composeMarkup(){
  return '<div class="fluids-compose-panel" role="dialog" aria-modal="true" aria-label="Pilih file dan penerima"><section class="fluids-compose-card"><div class="fluids-compose-top"><h2>Bagikan file</h2><button type="button" class="fluids-header-action" data-fluids-close-compose aria-label="Tutup">'+icon('close')+'</button></div><div class="fluids-compose-actions"><button type="button" data-fluids-file-kind="image">'+icon('image')+' Foto / gambar</button><button type="button" data-fluids-file-kind="document">'+icon('file')+' Dokumen</button></div><input type="file" hidden data-fluids-file-input accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt">'+(selectedFile?'<div class="fluids-selected-file">'+icon('attach')+' '+escapeHtml(selectedFile.name)+'</div>':'')+'<div class="fluids-recipient-label">Pilih kontak penerima</div><div class="fluids-recipient-list">'+DEMO_CONTACTS.map(c=>'<button type="button" data-fluids-recipient="'+escapeHtml(c.name)+'" aria-pressed="'+(selectedRecipient===c.name)+'"><span class="fluids-avatar">'+escapeHtml(c.name.split(' ').map(x=>x[0]).join(''))+'</span>'+escapeHtml(c.name)+(selectedRecipient===c.name?' ✓':'')+'</button>').join('')+'</div><button type="button" class="fluids-send-preview" data-fluids-send '+(!selectedFile||!selectedRecipient?'disabled':'')+'>'+icon('send')+' Siap kirim</button><p class="fluids-prototype-note">Frontend preview saja. File tidak diunggah dan pesan tidak dikirim ke pengguna nyata.</p></section></div>';
 }
 render();
 return ()=>{root.innerHTML='';};
}
