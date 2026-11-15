import { supabase as db } from '../../lib/supabase/client.js';
import './messages.css';
import { socialIcon } from '../../components/common/social-icons.js';
import {renderBrandLogo} from '../../components/common/brand.js';
import { renderSocialMobileNav } from '../../components/social/navigation.js';
import { renderInboxSidebar } from '../../features/inbox/inbox-sidebar.js';
import { renderMessageMarkup, formatMessageDuration } from '../../features/inbox/message-ui.js';
import { getInboxPreferences } from '../../features/inbox/preferences.js';


const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
let currentUser = null;
let currentProfile = null;
let currentConversation = null;
let conversationCache = [];
let realtimeChannel = null;
let presenceSyncHandler = null;
let contactsCache = [];
const avatarUrlCache = new Map();
let onlineUserIds = new Set();
let sendingQueue = false;
let networkListenersBound = false;
let activeInboxTab = 'primary';
const notifiedIncomingMessageIds = new Set();

const queueKey = () => 'pluits:dm:outbox:v1:' + currentUser.id;
const contactsKey = () => 'pluits:dm:contacts:v2:' + currentUser.id;
const threadsKey = () => 'pluits:dm:threads:v1:' + currentUser.id;
function readQueue() {
  try { const rows = JSON.parse(localStorage.getItem(queueKey()) || '[]'); return Array.isArray(rows) ? rows : []; }
  catch { return []; }
}
function writeQueue(rows) {
  try { if(rows.length>50)return false; localStorage.setItem(queueKey(), JSON.stringify(rows)); return true; }
  catch { return false; }
}
function queueFor(conversationId) { return readQueue().filter(row => row.conversation_id === conversationId || (String(conversationId).startsWith('draft:') && row.recipient_user_id === String(conversationId).slice(6))); }
function formatTime(value) {
  return new Date(value).toLocaleString('id-ID', {dateStyle:'short',timeStyle:'short'});
}
function formatDuration(value) { return formatMessageDuration(value); }
function messageMarkup(row, pending = false, receipt = null) {
  return renderMessageMarkup(row, { currentUserId: currentUser?.id, pending, receipt });
}
async function hydrateVoicePlayers(container) {
  const players=[...container.querySelectorAll('audio[data-voice-path]')];
  await Promise.all(players.map(async player=>{
    const {data,error}=await db.storage.from('pluits-message-media').createSignedUrl(player.dataset.voicePath,3600);
    if(!error&&data?.signedUrl) player.src=data.signedUrl;
    else { const note=document.createElement('span');note.className='pl-msg-audio-error';note.textContent='Audio tidak dapat dimuat';player.replaceWith(note); }
    const speed=player.parentElement?.querySelector('[data-voice-speed]');
    if(speed) speed.onclick=()=>{
      const rates=[1,1.5,2];
      const current=rates.indexOf(Number(player.playbackRate)||1);
      player.playbackRate=rates[(current+1)%rates.length];
      speed.textContent=player.playbackRate+'×';
    };
    if(!player.closest('.pl-msg-bubble')?.classList.contains('mine')&&player.dataset.messageId) {
      player.addEventListener('ended',()=>db.rpc('mark_message_played',{p_message_id:player.dataset.messageId}));
    }
  }));
}
async function hydrateMessageMedia(container) {
  const images=[...container.querySelectorAll('[data-image-path]')];
  const files=[...container.querySelectorAll('[data-file-path]')];
  await Promise.all([...images.map(async node=>{
    const {data,error}=await db.storage.from('pluits-message-media').createSignedUrl(node.dataset.imagePath,1800);
    if(error||!data?.signedUrl){node.alt='Foto tidak dapat dimuat';node.closest('.pl-msg-image-wrap')?.classList.add('is-error');return;}
    node.src=data.signedUrl;node.closest('.pl-msg-image-wrap')?.querySelector('.pl-msg-image-loading')?.remove();
  }),...files.map(async node=>{
    const {data,error}=await db.storage.from('pluits-message-media').createSignedUrl(node.dataset.filePath,1800);
    if(error||!data?.signedUrl){node.textContent='File tidak dapat dimuat';return;}
    node.href=data.signedUrl;
  })]);
}
function bindAttachmentComposer(chat,conversationId) {
  const form=chat.querySelector('#pl-msg-compose'),input=chat.querySelector('#pl-msg-attachment-input');
  const status=chat.querySelector('.pl-msg-chat-status'),trigger=chat.querySelector('[data-attachment-trigger]');
  if(!form||!input||!trigger)return;
  trigger.onclick=()=>input.click();
  input.onchange=async()=>{
    const files=[...input.files||[]];input.value='';
    for(const file of files){
      const image=file.type.startsWith('image/');
      const allowedImages=['image/jpeg','image/png','image/webp','image/gif'];
      const allowedFiles=['application/pdf','text/plain','application/zip','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document','application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','application/vnd.ms-powerpoint','application/vnd.openxmlformats-officedocument.presentationml.presentation'];
      if(!(allowedImages.includes(file.type)||allowedFiles.includes(file.type))){if(status)status.textContent='Format file tidak didukung: '+file.name;continue;}
      if(file.size>20*1024*1024){if(status)status.textContent='Ukuran file maksimal 20 MB: '+file.name;continue;}
      if(!navigator.onLine){if(status)status.textContent='Lampiran membutuhkan koneksi internet.';continue;}
      const ext=(file.name.split('.').pop()||'bin').toLowerCase().replace(/[^a-z0-9]/g,'').slice(0,8);
      const path=conversationId+'/'+currentUser.id+'/'+crypto.randomUUID()+'.'+ext;
      if(status)status.textContent='Mengunggah '+file.name+'…';
      const uploaded=await db.storage.from('pluits-message-media').upload(path,file,{contentType:file.type,upsert:false});
      if(uploaded.error){if(status)status.textContent='Upload gagal: '+uploaded.error.message;continue;}
      const {error}=await db.from('user_messages').insert({conversation_id:conversationId,sender_id:currentUser.id,body:'',message_type:image?'image':'file',media_path:path,media_mime_type:file.type,media_name:file.name,client_message_id:crypto.randomUUID()});
      if(error){await db.storage.from('pluits-message-media').remove([path]);if(status)status.textContent='Gagal mengirim lampiran: '+error.message;continue;}
    }
    await openConversation(conversationId);await loadConversations();
  };
}
function bindVoiceRecorder(chat, conversationId) {
  const button=chat.querySelector('[data-voice-record]');
  const status=chat.querySelector('.pl-msg-chat-status');
  if(!button)return;
  if(!navigator.mediaDevices?.getUserMedia||typeof MediaRecorder==='undefined'){
    button.disabled=true;button.title='Perekaman suara tidak didukung browser ini';return;
  }
  let recorder=null,stream=null,chunks=[],startedAt=0,limitTimer=null,clockTimer=null;
  let starting=false,releasedWhileStarting=false,cancelled=false,pointerId=null;
  const stopTracks=()=>{stream?.getTracks().forEach(track=>track.stop());stream=null;};
  const setIdle=()=>{
    clearTimeout(limitTimer);clearInterval(clockTimer);stopTracks();
    button.disabled=false;button.classList.remove('is-recording');
    button.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="2.5" width="6" height="12" rx="3"/><path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v4m-4 0h8"/></svg>';button.setAttribute('aria-label','Rekam pesan suara');
    recorder=null;starting=false;pointerId=null;
  };
  const uploadVoice=async(blob,duration)=>{
    if(!navigator.onLine){if(status)status.textContent='Koneksi terputus. Pesan suara belum dapat dikirim.';setIdle();return;}
    const mime=String(blob.type||'audio/webm').split(';')[0].toLowerCase();
    const ext=({'audio/webm':'webm','audio/mp4':'m4a','audio/ogg':'ogg','audio/mpeg':'mp3','audio/wav':'wav','audio/3gpp':'3gp'})[mime];
    if(!ext){if(status)status.textContent='Format audio perangkat ini belum didukung.';setIdle();return;}
    if(blob.size>10*1024*1024){if(status)status.textContent='Pesan suara melebihi batas 10 MB.';setIdle();return;}
    button.disabled=true;
    if(status)status.textContent='';
    const path=conversationId+'/'+currentUser.id+'/'+crypto.randomUUID()+'.'+ext;
    try{
      const uploaded=await db.storage.from('pluits-message-media').upload(path,blob,{contentType:mime,upsert:false});
      if(uploaded.error)throw uploaded.error;
      const saved=await db.from('user_messages').insert({
        conversation_id:conversationId,sender_id:currentUser.id,body:'',
        message_type:'voice',media_path:path,media_duration_seconds:duration,
        media_mime_type:mime,client_message_id:crypto.randomUUID()
      });
      if(saved.error){await db.storage.from('pluits-message-media').remove([path]);throw saved.error;}
      if(status)status.textContent='Pesan suara terkirim.';
      await openConversation(conversationId);await loadConversations();
    }catch(error){if(status)status.textContent='Gagal mengirim pesan suara: '+(error?.message||'Coba lagi.');}
    finally{setIdle();}
  };
  const stopRecording=()=>{
    if(recorder&&recorder.state!=='inactive')recorder.stop();
  };
  const beginRecording=async()=>{
    if(starting||recorder)return;
    if(!navigator.onLine){if(status)status.textContent='Pesan suara membutuhkan koneksi internet.';return;}
    starting=true;releasedWhileStarting=false;cancelled=false;
    button.classList.add('is-recording');
    if(status)status.textContent='Meminta izin mikrofon…';
    try{
      stream=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true,noiseSuppression:true,autoGainControl:true}});
      const preferred=['audio/webm;codecs=opus','audio/mp4','audio/ogg;codecs=opus','audio/webm'];
      const mimeType=preferred.find(type=>MediaRecorder.isTypeSupported(type));
      recorder=new MediaRecorder(stream,mimeType?{mimeType}:undefined);
      chunks=[];startedAt=Date.now();
      recorder.ondataavailable=event=>{if(event.data?.size)chunks.push(event.data);};
      recorder.onerror=()=>{if(status)status.textContent='Perekaman gagal. Periksa izin mikrofon.';setIdle();};
      recorder.onstop=()=>{
        const duration=Math.min(180,Math.max(0,Math.round((Date.now()-startedAt)/1000)));
        const blob=new Blob(chunks,{type:recorder?.mimeType||mimeType||'audio/webm'});
        stopTracks();clearInterval(clockTimer);clearTimeout(limitTimer);
        if(cancelled){setIdle();if(status)status.textContent='Rekaman dibatalkan.';return;}
        if(duration<1||!blob.size){setIdle();if(status)status.textContent='Tahan tombol sedikit lebih lama untuk merekam.';return;}
        void uploadVoice(blob,duration);
      };
      recorder.start(200);starting=false;
      button.innerHTML='<span class="pl-msg-live-wave" aria-hidden="true">'+Array.from({length:11},(_,i)=>'<i style="--wave-delay:'+(-i*0.07)+'s"></i>').join('')+'</span><span class="pl-msg-recording-time">0:00</span>';
      if(status)status.textContent='';
      let seconds=0;
      clockTimer=setInterval(()=>{seconds=Math.floor((Date.now()-startedAt)/1000);const clock=button.querySelector('.pl-msg-recording-time');if(clock)clock.textContent=Math.floor(seconds/60)+':'+String(seconds%60).padStart(2,'0');button.setAttribute('aria-label','Merekam '+seconds+' detik. Lepaskan untuk mengirim.');if(seconds>=180)stopRecording();},500);
      limitTimer=setTimeout(stopRecording,180000);
      if(releasedWhileStarting)stopRecording();
    }catch(error){
      setIdle();
      if(status)status.textContent='Mikrofon tidak dapat diakses. Izinkan akses mikrofon di browser.';
    }
  };
  const pressStart=event=>{
    if(event.button!==undefined&&event.button!==0)return;
    event.preventDefault();
    if(button.disabled||starting||recorder)return;
    pointerId=event.pointerId;
    try{button.setPointerCapture?.(pointerId);}catch{}
    void beginRecording();
  };
  const pressEnd=event=>{
    if(pointerId!==null&&event.pointerId!==undefined&&event.pointerId!==pointerId)return;
    if(starting){releasedWhileStarting=true;return;}
    stopRecording();
  };
  button.addEventListener('pointerdown',pressStart);
  button.addEventListener('pointerup',pressEnd);
  button.addEventListener('pointercancel',()=>{cancelled=true;stopRecording();});
  button.addEventListener('lostpointercapture',()=>{if(recorder?.state==='recording')stopRecording();});
  button.addEventListener('contextmenu',event=>event.preventDefault());
  button.addEventListener('keydown',event=>{
    if((event.key===' '||event.key==='Enter')&&!event.repeat){event.preventDefault();void beginRecording();}
  });
  button.addEventListener('keyup',event=>{
    if(event.key===' '||event.key==='Enter'){event.preventDefault();if(starting)releasedWhileStarting=true;else stopRecording();}
  });
}
function emptyStateMarkup({variant='message',title,description,action=''}) {
  const art = variant==='login'
    ? '<circle cx="60" cy="48" r="19" fill="#dce9f4"/><path d="M28 104c3-20 15-30 32-30s29 10 32 30" fill="#c8d9e9"/><rect x="76" y="14" width="34" height="25" rx="8" fill="#fff" stroke="#c5d6e5"/><path d="M84 23h18M84 29h12" stroke="#8ca8c2" stroke-width="2" stroke-linecap="round"/>'
    : variant==='requests'
    ? '<rect x="25" y="30" width="72" height="50" rx="12" fill="#fff" stroke="#c5d6e5" stroke-width="2"/><path d="m29 37 32 23 32-23" fill="none" stroke="#9db5ca" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><circle cx="91" cy="23" r="10" fill="#d9e8f4"/><path d="M87 23h8M91 19v8" stroke="#6485a4" stroke-width="2" stroke-linecap="round"/>'
    : variant==='blocked'
    ? '<rect x="32" y="29" width="58" height="58" rx="16" fill="#fff" stroke="#c5d6e5" stroke-width="2"/><path d="M47 50v-7a14 14 0 0 1 28 0v7" fill="none" stroke="#8ca8c2" stroke-width="4" stroke-linecap="round"/><rect x="43" y="49" width="36" height="27" rx="7" fill="#dce9f4"/><path d="m53 58 16 10m0-10L53 68" stroke="#6f8ca8" stroke-width="2.5" stroke-linecap="round"/>'
    : '<rect x="20" y="28" width="67" height="47" rx="12" fill="#fff" stroke="#c5d6e5" stroke-width="2"/><path d="M29 39h46M29 48h30" stroke="#a5bacd" stroke-width="3" stroke-linecap="round"/><path d="m55 75 12 12 12-12" fill="#dce9f4"/><rect x="65" y="55" width="35" height="25" rx="9" fill="#dce9f4" stroke="#b7ccde"/><path d="M74 64h17M74 70h11" stroke="#6f8ca8" stroke-width="2" stroke-linecap="round"/>';
  return '<div class="pl-msg-empty-state pl-msg-empty-state-'+variant+'"><div class="pl-msg-empty-art" aria-hidden="true"><svg viewBox="0 0 120 112" role="img" focusable="false"><circle cx="60" cy="56" r="48" fill="#edf3f8"/><circle cx="17" cy="26" r="5" fill="#dce8f2"/><circle cx="105" cy="88" r="4" fill="#dce8f2"/>'+art+'</svg></div><strong>'+title+'</strong><p>'+description+'</p>'+action+'</div>';
}

export function messagesPage() {
  return `<main class="pl-msg ua-social-app">
    <header class="pl-msg-head">
      ${renderBrandLogo({href:'#/account/explore',className:'pl-msg-brand',size:40,label:'PLUITS Beranda'})}
      <span class="pl-msg-mobile-title">Inbox</span>
      <form id="pl-msg-search" class="pl-msg-head-search" role="search">
        <div class="pl-msg-search-field"><span class="pl-msg-search-symbol">${socialIcon('search',{size:18})}</span><input name="q" type="search" placeholder="Cari username atau nama…"  autocomplete="off" aria-label="Cari berdasarkan nama atau nama pengguna"></div>
        <button type="submit" aria-label="Search">${socialIcon('search',{size:18})}</button>
        <div id="pl-msg-search-results" class="pl-msg-search-results" hidden></div>
      </form>
      <button type="button" class="pl-msg-new-chat" data-new-chat aria-label="Mulai percakapan baru">＋</button>
      <div class="pl-msg-head-menu">
        <button type="button" class="pl-msg-menu-toggle" aria-label="Pengaturan pesan" aria-expanded="false" aria-controls="pl-msg-head-menu">⋮</button>
        <nav class="pl-msg-head-menu-panel" id="pl-msg-head-menu" aria-label="Menu pesan" hidden>
          <a href="#/inbox/settings">Pengaturan pesan</a>
        </nav>
      </div>
    </header>
    <section class="pl-msg-content plds-container plds-container--wide">
      <section class="pl-msg-people" aria-label="Kontak online">
        <div class="pl-msg-people-heading">
          <div><strong>Kontak Inbox</strong><small>Terpisah dari pertemanan sosial · <span id="pl-msg-online-count">0 online</span> · <span id="pl-msg-offline-count">0 offline</span></small></div>
          <span class="pl-msg-network" id="pl-msg-network" role="status">● Connected</span>
        </div>
        <div class="pl-msg-people-strip" id="pl-msg-people-strip"><span class="pl-msg-online-empty">Memuat kontak…</span></div>
        <div id="pl-msg-contacts" hidden></div>
      </section>
      <div class="pl-msg-heading">
        <div><small>PLUITS MESSAGES</small><h1>Inbox</h1><p>Semua percakapan pribadi Anda dalam satu tempat.</p></div>
      </div>
      <div class="pl-msg-layout" id="pl-msg-layout">
        ${renderInboxSidebar()}
        <section class="pl-msg-chat" id="pl-msg-chat">${emptyStateMarkup({variant:'message',title:'Pesan Anda dimulai di sini',description:'Pilih percakapan di sebelah kiri atau cari seseorang untuk mulai mengirim pesan.'})}</section>
      </div>
      <p class="pl-msg-offline-note">If your connection drops, outgoing messages are saved on this device and retried when you are back online. A message is not sent until the server confirms it.</p>
      ${renderSocialMobileNav({active:'messages',user:{id:'inbox'},navClass:'pl-msg-mobile-nav'})}
    </section>
  </main>`;
}
function bindInboxTabs(root=document) {
  const tabs=[...root.querySelectorAll('[data-inbox-tab]')];
  const list=root.querySelector('#pl-msg-conversations');
  tabs.forEach(tab=>tab.onclick=()=>{
    activeInboxTab=tab.dataset.inboxTab;
    tabs.forEach(item=>{const active=item===tab;item.classList.toggle('is-active',active);item.setAttribute('aria-selected',String(active));});
    if(list)loadConversations();
  });
  (tabs.find(tab=>tab.dataset.inboxTab===activeInboxTab)||tabs[0])?.click();
}
function updateNetworkStatus() {
  const node = document.querySelector('#pl-msg-network');
  if (node) { node.textContent = navigator.onLine ? '● Connected' : '○ Offline'; node.classList.toggle('is-offline', !navigator.onLine); }
}
function updateInboxUnreadBadge(count=0) {
  const link=document.querySelector('.pl-msg-mobile-nav .pl-mobile-inbox');
  if(!link)return;
  let badge=link.querySelector('[data-inbox-nav-badge]');
  if(!badge){badge=document.createElement('i');badge.className='pl-nav-unread';badge.dataset.inboxNavBadge='';link.appendChild(badge);}
  badge.textContent=count>99?'99+':String(count);
  badge.hidden=!count;
  link.setAttribute('aria-label',count?('Inbox, '+count+' pesan belum dibaca'):'Inbox');
}
function showIncomingMessageNotification(message) {
  if(!message?.id||notifiedIncomingMessageIds.has(message.id))return;
  notifiedIncomingMessageIds.add(message.id);
  if(notifiedIncomingMessageIds.size>150)notifiedIncomingMessageIds.clear();
  const isOpen=document.querySelector('#pl-msg-layout')?.classList.contains('is-chat-open')&&currentConversation===message.conversation_id;
  if(isOpen)return;
  let toast=document.querySelector('#pl-msg-incoming-toast');
  if(!toast){
    toast=document.createElement('button');toast.type='button';toast.id='pl-msg-incoming-toast';toast.className='pl-msg-incoming-toast';toast.setAttribute('aria-live','polite');
    document.querySelector('.pl-msg')?.appendChild(toast);
  }
  const sender=conversationCache.find(item=>item.id===message.conversation_id)?.other;
  const senderName=sender?.display_name||sender?.username||'Pesan baru';
  const preview=message.body||(message.message_type==='image'?'Mengirim foto':message.message_type==='voice'?'Mengirim pesan suara':message.message_type==='file'?'Mengirim dokumen':'Anda menerima pesan baru');
  toast.innerHTML='<span class="pl-msg-toast-avatar">'+esc(senderName.slice(0,1).toUpperCase())+'</span><span><b>'+esc(senderName)+'</b><small>'+esc(preview)+'</small></span><span class="pl-msg-toast-mark">●</span>';
  toast.hidden=false;
  toast.onclick=()=>{toast.hidden=true;void openConversation(message.conversation_id);};
  if(typeof Notification!=='undefined'&&Notification.permission==='granted'&&document.visibilityState==='hidden'){
    try{const notification=new Notification(senderName,{body:preview,tag:'pluits-'+message.conversation_id});notification.onclick=()=>{window.focus();void openConversation(message.conversation_id);notification.close();};}catch{}
  }
}

function contactAvatar(person, imageUrl='') {
  const name=person.display_name||person.username||'P';
  const avatar=imageUrl?'<img src="'+esc(imageUrl)+'" alt="" loading="lazy">':'<span>'+esc(name.slice(0,1).toUpperCase())+'</span>';
  return '<span class="pl-msg-avatar">'+avatar+'</span>';
}
async function hydrateThreadAvatars(container,conversations=[]) {
  await Promise.all(conversations.map(async conversation=>{
    const node=container.querySelector('[data-thread-avatar="'+conversation.other.id+'"]');
    if(!node)return;
    const url=await signedAvatar(conversation.other.avatar_path);
    if(url&&node.isConnected)node.innerHTML='<img src="'+esc(url)+'" alt="" loading="lazy">';
  }));
}
async function hydrateChatAvatar(container,person) {
  const node=container.querySelector('[data-chat-avatar]');
  if(!node||!person)return;
  const url=await signedAvatar(person.avatar_path);
  if(url&&node.isConnected)node.innerHTML=contactAvatar(person,url);
}
async function signedAvatar(path) {
  if(!path||!navigator.onLine)return '';
  const key=(currentUser?.id||'anonymous')+':'+path;
  const cached=avatarUrlCache.get(key);
  if(cached&&cached.expiresAt>Date.now())return cached.url;
  const {data,error}=await db.storage.from('pluits-user-media').createSignedUrl(path,1800);
  const url=error?'':data?.signedUrl||'';
  if(url)avatarUrlCache.set(key,{url,expiresAt:Date.now()+25*60*1000});
  return url;
}
async function renderPeopleCounts(people=contactsCache) {
  const rows=Array.isArray(people)?people:[];
  const online=rows.filter(person=>onlineUserIds.has(person.id)).length;
  const offline=Math.max(0,rows.length-online);
  const onlineNode=document.querySelector('#pl-msg-online-count');
  const offlineNode=document.querySelector('#pl-msg-offline-count');
  if(onlineNode)onlineNode.textContent=online+' online';
  if(offlineNode)offlineNode.textContent=offline+' offline';
}
async function renderPeopleStrip(people=contactsCache, withSignedImages=false) {
  const strip=document.querySelector('#pl-msg-people-strip');if(!strip)return;
  const onlinePeople=(people||[]).filter(person=>onlineUserIds.has(person.id));
  renderPeopleCounts(people);
  const ownAvatar=withSignedImages?await signedAvatar(currentProfile?.avatar_path):'';
  const selfItem=currentProfile
    ? '<button type="button" class="pl-msg-person pl-msg-person-self" data-start-chat="'+esc(currentUser.id)+'" aria-label="Kirim pesan ke diri sendiri">'+contactAvatar(currentProfile,ownAvatar)+'<small>Pesan ke diri sendiri</small></button>'
    : '';
  const items=await Promise.all(onlinePeople.map(async person=>{
    const url=withSignedImages?await signedAvatar(person.avatar_path):'';
    return '<button type="button" class="pl-msg-person" data-start-chat="'+esc(person.id)+'" aria-label="Start conversation with '+esc(person.display_name||person.username)+', online">'+contactAvatar(person,url)+'<span class="pl-msg-online-dot" aria-hidden="true"></span><small>'+esc(person.display_name||person.username||'Contact')+'</small></button>';
  }));
  strip.classList.toggle('has-many',onlinePeople.length>=5);
  strip.innerHTML=selfItem+items.join()||'<span class="pl-msg-online-empty">Cari username untuk memulai percakapan</span>';
  bindStartChat(strip);
}

function renderContactList(box,people,withSignedImages=false) {
  if(!box)return;
  box.innerHTML=(people||[]).map(person=>'<button type="button" class="pl-msg-contact" data-start-chat="'+person.id+'">'+contactAvatar(person,withSignedImages?person.avatar_url||'':'')+'<span><b>'+esc(person.display_name||person.username)+'</b><small>@'+esc(person.username)+'</small></span><span class="pl-msg-contact-action">Message</span></button>').join('')||'<p class="pl-msg-empty">No contacts to show yet. Search for a username to start a conversation.</p>';
  bindStartChat(box);
}
async function loadContacts() {
  const box=document.querySelector('#pl-msg-contacts');
  const {data:ownMemberships,error}=await db.from('user_conversation_members')
    .select('conversation_id').eq('user_id',currentUser.id);
  if(error) {
    try {
      const cached=JSON.parse(localStorage.getItem(contactsKey())||'[]');
      contactsCache=cached;
      renderContactList(box,cached,false);await renderPeopleStrip(cached,false);
      if(!cached.length&&box)box.innerHTML='<p class="pl-msg-empty">Kontak Inbox belum tersimpan di perangkat ini. Hubungkan internet untuk memuatnya.</p>';
    } catch { if(box)box.textContent='Kontak offline tidak tersedia.'; }
    return;
  }
  const conversationIds=[...new Set((ownMemberships||[]).map(row=>row.conversation_id))];
  const {data:memberRows,error:memberError}=conversationIds.length
    ? await db.from('user_conversation_members').select('user_id').in('conversation_id',conversationIds)
    : {data:[],error:null};
  if(memberError){if(box)box.textContent=memberError.message;return;}
  const ids=[...new Set((memberRows||[]).map(row=>row.user_id).filter(id=>id!==currentUser.id))];
  if(!ids.length) {
    contactsCache=[];
    try{localStorage.setItem(contactsKey(),'[]');}catch{}
    if(box)box.innerHTML='<p class="pl-msg-empty">Belum ada kontak percakapan. Cari username untuk memulai chat baru.</p>';
    await renderPeopleStrip([],false);return;
  }
  const {data:profiles,error:profileError}=await db.rpc('get_user_profile_directory_by_ids',{p_ids:ids});
  if(profileError){if(box)box.textContent=profileError.message;return;}
  const people=profiles||[];
  contactsCache=people;
  try{localStorage.setItem(contactsKey(),JSON.stringify(people.map(({id,display_name,username,avatar_path})=>({id,display_name,username,avatar_path}))));}catch{}
  const enriched=await Promise.all(people.map(async person=>({...person,avatar_url:await signedAvatar(person.avatar_path)})));
  renderContactList(box,enriched,true);
  await renderPeopleStrip(people,true);
}
function bindStartChat(box) {
  box.querySelectorAll('[data-start-chat]').forEach(button=>button.onclick=async()=>{
    if(!navigator.onLine){await openDraftConversation(button.dataset.startChat);return;}
    button.disabled=true;
    const {data:id,error}=await db.rpc('start_direct_conversation',{p_other_user_id:button.dataset.startChat});
    if(error){alert(error.message);button.disabled=false;return;}
    const isSelf=button.dataset.startChat===currentUser.id;
    const fallbackPerson=isSelf
      ? {...currentProfile,display_name:'Pesan untuk diri sendiri',is_self:true}
      : (contactsCache.find(person=>person.id===button.dataset.startChat)||{id:button.dataset.startChat,display_name:'Percakapan baru',username:''});
    if(!conversationCache.some(item=>item.id===id))conversationCache.unshift({id,updated_at:new Date().toISOString(),other:fallbackPerson,last:null,unread:false});
    await loadConversations();
    if(!conversationCache.some(item=>item.id===id))conversationCache.unshift({id,updated_at:new Date().toISOString(),other:fallbackPerson,last:null,unread:false});
    await openConversation(id);
  });
}
export async function bindMessagesPage() {
  const app=document.querySelector('#app'); if(!app)return;
  const {data:{user},error:authError}=await db.auth.getUser();
  if(authError) { app.querySelector('#pl-msg-chat').textContent=authError.message; return; }
  currentUser=user;
  if(!user) { const layout=app.querySelector('#pl-msg-layout'); layout.classList.add('is-auth-empty'); layout.innerHTML=emptyStateMarkup({variant:'login',title:'Masuk untuk mulai berkirim pesan',description:'Hubungkan diri dengan teman dan komunitas Anda melalui percakapan pribadi.',action:'<a class="pl-msg-empty-action" href="#/account/login">Masuk ke PLUITS</a>'}); app.querySelector('.pl-msg-people')?.setAttribute('hidden',''); return; }
  if(realtimeChannel) { await db.removeChannel(realtimeChannel); realtimeChannel=null; }
  onlineUserIds=new Set();contactsCache=[];
  const {data:ownProfile}=await db.from('user_profiles').select('id,display_name,username,avatar_path').eq('id',user.id).maybeSingle();
  currentProfile=ownProfile||{id:user.id,display_name:user.user_metadata?.full_name||'Anda',username:'akun'};
  await loadConversations();
  if(presenceSyncHandler) window.removeEventListener('pluits:presence-sync',presenceSyncHandler);
  presenceSyncHandler=event=>{
    const state=event.detail||{};
    onlineUserIds=new Set(Object.values(state).flat().map(entry=>entry.user_id).filter(Boolean));
    const presenceNode=document.querySelector('#pl-msg-chat-presence');
    const activeThread=conversationCache.find(item=>item.id===currentConversation);
    if(presenceNode&&activeThread?.other?.id)presenceNode.textContent=activeThread.other.is_self?'Catatan pribadi':onlineUserIds.has(activeThread.other.id)?'Online':'Tidak online';
    void renderPeopleStrip(contactsCache,true);
  };
  window.addEventListener('pluits:presence-sync',presenceSyncHandler);
  presenceSyncHandler({detail:window.__pluitsPresenceState||{}});
  await loadContacts();
  bindInboxTabs(app);
  const routeQuery=location.search || (location.hash.includes('?') ? location.hash.slice(location.hash.indexOf('?')+1) : '');
  const requestedConversation=new URLSearchParams(routeQuery).get('conversation');
  if(requestedConversation&&conversationCache.some(item=>item.id===requestedConversation)) await openConversation(requestedConversation);
  const search=app.querySelector('#pl-msg-search');
  search.onsubmit=async event=>{
    event.preventDefault();
    const query=String(new FormData(search).get('q')||'').trim().replace(/^@/,'').replace(/[(),]/g,' ').replace(/\s+/g,' ').trim();
    const box=app.querySelector('#pl-msg-search-results');
    if(query.length<2){box.hidden=false;box.innerHTML='<p class="pl-msg-search-hint">Type at least two characters to search.</p>';return;}
    const {data,error}=await db.from('user_profiles').select('id,display_name,username').or('username.ilike.%'+query+'%,display_name.ilike.%'+query+'%').limit(8);
    if(error){box.hidden=false;box.textContent=error.message;return;}
    box.hidden=false;
    box.innerHTML=data?.length?data.map(person=>'<button class="pl-msg-contact" data-start-chat="'+person.id+'"><b>'+esc(person.id===user.id?'Pesan ke diri sendiri':person.display_name||person.username)+'</b><small>@'+esc(person.username)+(person.id===user.id?' · Akun Anda':'')+'</small><span>'+(person.id===user.id?'Message yourself':'Message')+'</span></button>').join(''):'<p class="pl-msg-search-hint">Tidak ada akun yang ditemukan.</p>';
    bindStartChat(box);
  };
  app.querySelector('[data-new-chat]')?.addEventListener('click',()=>{const field=app.querySelector('#pl-msg-search input');field?.focus();field?.scrollIntoView({block:'nearest'});});
  const headMenu=app.querySelector('.pl-msg-head-menu');
  const menuToggle=app.querySelector('.pl-msg-menu-toggle');
  const menuPanel=app.querySelector('#pl-msg-head-menu');
  const closeHeadMenu=()=>{
    if(!menuPanel||!menuToggle)return;
    menuPanel.hidden=true;
    menuToggle.setAttribute('aria-expanded','false');
  };
  const placeHeadMenu=()=>{
    if(!headMenu||!menuToggle||!menuPanel||menuPanel.hidden)return;
    const rect=menuToggle.getBoundingClientRect();
    const viewport=window.visualViewport;
    const width=Math.min(248,(viewport?.width||window.innerWidth)-24);
    const left=Math.max(12,Math.min(rect.right-width,(viewport?.width||window.innerWidth)-width-12));
    menuPanel.style.width=width+'px';
    menuPanel.style.left=left+'px';
    menuPanel.style.right='auto';
    menuPanel.style.maxHeight=Math.max(120,(viewport?.height||window.innerHeight)-24)+'px';
    menuPanel.style.top='auto';
    menuPanel.style.bottom='auto';
    const panelHeight=Math.min(menuPanel.scrollHeight,(viewport?.height||window.innerHeight)-24);
    const below=(viewport?.height||window.innerHeight)-rect.bottom-8;
    if(below>=Math.min(panelHeight,150)){
      menuPanel.style.top=(rect.bottom+8)+'px';
    }else{
      menuPanel.style.top=Math.max(12,rect.top-panelHeight-8)+'px';
    }
  };
  menuToggle?.addEventListener('click',()=>{
    const opening=menuPanel.hidden;
    if(!opening){closeHeadMenu();return;}
    menuPanel.hidden=false;
    menuToggle.setAttribute('aria-expanded','true');
    placeHeadMenu();
  });
  app.addEventListener('click',event=>{
    if(!event.target.closest('.pl-msg-head-search')){const results=app.querySelector('#pl-msg-search-results');if(results)results.hidden=true;}
    if(headMenu&&!headMenu.contains(event.target))closeHeadMenu();
  });
  window.addEventListener('resize',placeHeadMenu,{passive:true});
  window.addEventListener('scroll',placeHeadMenu,{passive:true,capture:true});
  window.visualViewport?.addEventListener('resize',placeHeadMenu,{passive:true});
  app.addEventListener('keydown',event=>{if(event.key==='Escape')closeHeadMenu();});
  updateNetworkStatus();
  if(!networkListenersBound){window.addEventListener('online',onOnline);window.addEventListener('offline',updateNetworkStatus);networkListenersBound=true;}
  realtimeChannel=db.channel('pluits-dm-'+user.id)
    .on('postgres_changes',{event:'INSERT',schema:'public',table:'user_messages'},payload=>{
      const incoming=payload.new;
      const conversationId=incoming?.conversation_id;
      if(conversationId&&incoming?.sender_id!==currentUser.id){
        void db.rpc('mark_conversation_delivered',{p_conversation_id:conversationId});
        showIncomingMessageNotification(incoming);
      }
      if(conversationId===currentConversation&&document.querySelector('#pl-msg-layout')?.classList.contains('is-chat-open')) void openConversation(currentConversation);
      else void loadConversations();
    })
    .on('postgres_changes',{event:'UPDATE',schema:'public',table:'user_messages'},payload=>{
      if(payload.new?.conversation_id===currentConversation&&document.querySelector('#pl-msg-layout')?.classList.contains('is-chat-open')) openConversation(currentConversation);
      else loadConversations();
    })
    .on('postgres_changes',{event:'INSERT',schema:'public',table:'user_message_receipts'},payload=>{
      if(currentConversation&&document.querySelector('#pl-msg-layout')?.classList.contains('is-chat-open')) openConversation(currentConversation);
      else loadConversations();
    })
    .on('postgres_changes',{event:'UPDATE',schema:'public',table:'user_message_receipts'},payload=>{
      if(currentConversation&&document.querySelector('#pl-msg-layout')?.classList.contains('is-chat-open')) openConversation(currentConversation);
      else loadConversations();
    })
    .on('postgres_changes',{event:'*',schema:'public',table:'user_message_hidden'},payload=>{
      if(currentConversation&&document.querySelector('#pl-msg-layout')?.classList.contains('is-chat-open')) openConversation(currentConversation);
      else loadConversations();
    })
    .on('postgres_changes',{event:'UPDATE',schema:'public',table:'user_conversation_members'},payload=>{
      if(payload.new?.conversation_id===currentConversation&&document.querySelector('#pl-msg-layout')?.classList.contains('is-chat-open')) openConversation(currentConversation);
      else loadConversations();
    }).subscribe();
  await flushOutbox();
}
function bindTextComposer(form) {
  const textarea=form?.querySelector('textarea');
  if(!textarea)return;
  const preferences=getInboxPreferences();
  textarea.addEventListener('keydown',event=>{
    if(preferences.enterToSend&&event.key==='Enter'&&!event.shiftKey&&!event.isComposing){
      event.preventDefault();
      form.requestSubmit();
    }
  });
  textarea.addEventListener('input',()=>{
    textarea.style.height='auto';
    textarea.style.height=Math.min(textarea.scrollHeight,120)+'px';
  });
}
function onOnline() { updateNetworkStatus(); flushOutbox(); }
async function openDraftConversation(recipientId) {
  currentConversation='draft:'+recipientId;
  let person=null;
  try { person=recipientId===currentUser.id?currentProfile:(JSON.parse(localStorage.getItem(contactsKey())||'[]')).find(item=>item.id===recipientId)||null; } catch {}
  if(!person){document.querySelector('#pl-msg-chat').innerHTML='<div class="pl-msg-empty">Kontak ini belum tersimpan di perangkat. Hubungkan internet untuk memulai percakapan.</div>';return;}
  const chat=document.querySelector('#pl-msg-chat');if(!chat)return;
  document.querySelector('#pl-msg-layout')?.classList.add('is-chat-open');
  const queued=queueFor(currentConversation);
  const preferences=getInboxPreferences();
  chat.dataset.theme=preferences.theme;chat.dataset.fontSize=preferences.fontSize;
  chat.innerHTML='<header class="pl-msg-chat-head"><button type="button" class="pl-msg-back" data-chat-back aria-label="Kembali ke Pesan">‹</button><div><b>'+esc(person.display_name||person.username)+'</b><small>@'+esc(person.username)+'</small></div><span>Offline draft</span></header>'+
    '<div class="pl-msg-stream"><div class="pl-msg-empty">A new conversation will be created when you reconnect. Message history is not available offline.</div>'+queued.map(row=>messageMarkup(row,true)).join('')+'</div>'+
    '<form id="pl-msg-compose"><textarea name="body" rows="2" maxlength="5000" placeholder="Tulis pesan…" required></textarea><button type="submit">Save message</button></form>'+
    '<p class="pl-msg-chat-status" role="status">'+queued.length+' messages waiting for connection. Drafts are saved only on this device.</p>';
  chat.querySelector('[data-chat-back]')?.addEventListener('click',()=>document.querySelector('#pl-msg-layout')?.classList.remove('is-chat-open'));
  const draftForm=chat.querySelector('#pl-msg-compose');
  bindTextComposer(draftForm);
  draftForm.onsubmit=async event=>{
    event.preventDefault();const form=event.currentTarget,body=String(new FormData(form).get('body')||'').trim();if(!body)return;
    if(navigator.onLine){
      const {data:id,error}=await db.rpc('start_direct_conversation',{p_other_user_id:recipientId});
      if(error){chat.querySelector('.pl-msg-chat-status').textContent=error.message;return;}
      await loadConversations();await openConversation(id);
      const liveForm=document.querySelector('#pl-msg-compose');if(liveForm){liveForm.querySelector('textarea').value=body;liveForm.requestSubmit();}
      return;
    }
    const queue=readQueue();queue.push({client_message_id:crypto.randomUUID(),conversation_id:null,recipient_user_id:recipientId,sender_id:currentUser.id,body,created_at:new Date().toISOString()});
    if(!writeQueue(queue)){chat.querySelector('.pl-msg-chat-status').textContent='The 50-message queue limit was reached or device storage is unavailable. Message was not saved.';return;}
    await openDraftConversation(recipientId);
  };
  chat.querySelector('.pl-msg-stream').scrollTop=chat.querySelector('.pl-msg-stream').scrollHeight;
}
async function loadConversations() {
  const list=document.querySelector('#pl-msg-conversations'); if(!list)return;
  const {data:members,error}=await db.from('user_conversation_members').select('conversation_id,last_read_at').eq('user_id',currentUser.id);
  if(!['primary','unread'].includes(activeInboxTab))return;
  if(error){
    try { const cached=JSON.parse(localStorage.getItem(threadsKey())||'[]'); conversationCache=cached; const visible=activeInboxTab==='unread'?cached.filter(item=>item.unread):cached; list.innerHTML=visible.length?visible.map(item=>'<button class="pl-msg-thread '+(item.unread?'is-unread':'')+'" data-open-chat="'+item.id+'"><b>'+esc(item.other.display_name||item.other.username)+'</b><small>@'+esc(item.other.username)+'</small><p>History available when online</p></button>').join(''):emptyStateMarkup({variant:'message',title:activeInboxTab==='unread'?'Tidak ada pesan belum dibaca':'Inbox offline belum tersedia',description:activeInboxTab==='unread'?'Semua percakapan sudah dibaca.':'Hubungkan internet untuk memuat daftar percakapan.'}); list.querySelectorAll('[data-open-chat]').forEach(button=>button.onclick=()=>openConversation(button.dataset.openChat)); }
    catch { list.textContent='Kotak masuk offline tidak tersedia.'; }
    return;
  }
  const ids=(members||[]).map(row=>row.conversation_id);
  if(navigator.onLine&&ids.length) await Promise.all(ids.map(conversationId=>db.rpc('mark_conversation_delivered',{p_conversation_id:conversationId})));
  if(!ids.length){conversationCache=[];updateInboxUnreadBadge(0);list.innerHTML=emptyStateMarkup({variant:'message',title:activeInboxTab==='unread'?'Tidak ada pesan belum dibaca':'Belum ada percakapan',description:activeInboxTab==='unread'?'Semua percakapan sudah dibaca.':'Pilih kontak atau cari nama pengguna untuk memulai percakapan.'});return;}
  const [convs,memberRows,msgRows,unreadRows]=await Promise.all([
    db.from('user_conversations').select('id,title,direct_key,updated_at').in('id',ids).order('updated_at',{ascending:false}),
    db.from('user_conversation_members').select('conversation_id,user_id,last_read_at').in('conversation_id',ids),
    db.from('user_messages').select('id,conversation_id,body,sender_id,created_at,message_type,deleted_at').in('conversation_id',ids).order('created_at',{ascending:false}).limit(200),
    db.rpc('get_unread_conversation_ids')
  ]);
  if(!['primary','unread'].includes(activeInboxTab))return;
  if(convs.error||memberRows.error||msgRows.error){
    try { const cached=JSON.parse(localStorage.getItem(threadsKey())||'[]'); conversationCache=cached; const visible=activeInboxTab==='unread'?cached.filter(item=>item.unread):cached; list.innerHTML=visible.length?visible.map(item=>'<button class="pl-msg-thread '+(item.unread?'is-unread':'')+'" data-open-chat="'+item.id+'"><b>'+esc(item.other.display_name||item.other.username)+'</b><small>@'+esc(item.other.username)+'</small><p>History available when online</p></button>').join(''):emptyStateMarkup({variant:'message',title:activeInboxTab==='unread'?'Tidak ada pesan belum dibaca':'Inbox offline belum tersedia',description:activeInboxTab==='unread'?'Semua percakapan sudah dibaca.':'Hubungkan internet untuk memuat daftar percakapan.'}); list.querySelectorAll('[data-open-chat]').forEach(button=>button.onclick=()=>openConversation(button.dataset.openChat)); }
    catch { list.textContent='Offline inbox is not available.'; }
    return;
  }
  const otherIds=[...new Set((memberRows.data||[]).map(row=>row.user_id).filter(id=>id!==currentUser.id))];
  const profiles=otherIds.length?await db.rpc('get_user_profile_directory_by_ids',{p_ids:otherIds}):{data:[],error:null};
  if(!['primary','unread'].includes(activeInboxTab))return;
  if(profiles.error){list.textContent=profiles.error.message;return;}
  const pmap=new Map((profiles.data||[]).map(person=>[person.id,person]));
  const recentIds=(msgRows.data||[]).map(message=>message.id).filter(Boolean);
  const hiddenPreview=recentIds.length?await db.from('user_message_hidden').select('message_id').eq('user_id',currentUser.id).in('message_id',recentIds):{data:[],error:null};
  const hiddenPreviewIds=new Set((hiddenPreview.data||[]).map(row=>row.message_id));
  const latest=new Map(); for(const message of msgRows.data||[]) if(!hiddenPreviewIds.has(message.id)&&!latest.has(message.conversation_id))latest.set(message.conversation_id,message);
  conversationCache=(convs.data||[]).map(conversation=>{
    const other=(memberRows.data||[]).find(row=>row.conversation_id===conversation.id&&row.user_id!==currentUser.id);
    const self=(memberRows.data||[]).find(row=>row.conversation_id===conversation.id&&row.user_id===currentUser.id);
    const last=latest.get(conversation.id);
    const unread=unreadRows.error
      ? (msgRows.data||[]).some(message=>message.conversation_id===conversation.id&&!message.deleted_at&&!hiddenPreviewIds.has(message.id)&&message.sender_id!==currentUser.id&&(!self?.last_read_at||new Date(message.created_at)>new Date(self.last_read_at)))
      : new Set((unreadRows.data||[]).map(row=>row.conversation_id)).has(conversation.id);
    const isSelfConversation=conversation.direct_key==='self:'+currentUser.id;
     const otherProfile=isSelfConversation?{...currentProfile,display_name:'Pesan untuk diri sendiri',is_self:true}:pmap.get(other?.user_id)||{display_name:'Akun Pluits',username:'akun'};
     return {...conversation,other:otherProfile,last,unread};
  });
  updateInboxUnreadBadge(conversationCache.filter(item=>item.unread).length);
  try { localStorage.setItem(threadsKey(),JSON.stringify(conversationCache.map(item=>({id:item.id,updated_at:item.updated_at,other:item.other,unread:item.unread})))); } catch {}
  const visibleConversations=activeInboxTab==='unread'?conversationCache.filter(item=>item.unread):conversationCache;
  list.innerHTML=visibleConversations.length?visibleConversations.map(conversation=>{
    const pending=queueFor(conversation.id).length;
    const avatar=contactAvatar(conversation.other).replace('class="pl-msg-avatar"','class="pl-msg-avatar" data-thread-avatar="'+esc(conversation.other.id||'')+'"');
    return '<button class="pl-msg-thread '+(currentConversation===conversation.id?'active':'')+(conversation.unread?' is-unread':'')+'" data-open-chat="'+conversation.id+'">'+avatar+'<span class="pl-msg-thread-copy"><span class="pl-msg-thread-head"><b>'+esc(conversation.other.display_name||conversation.other.username)+'</b><time>'+formatTime(conversation.last?.created_at||conversation.updated_at)+'</time></span><small>@'+esc(conversation.other.username)+'</small><p>'+esc(conversation.last?.deleted_at?'Pesan ini dihapus':conversation.last?.message_type==='voice'?'Pesan suara':conversation.last?.message_type==='image'?'Foto':conversation.last?.message_type==='file'?'Dokumen':conversation.last?.body||'Belum ada pesan')+(pending?' · '+pending+' menunggu':'')+'</p></span>'+(conversation.unread?'<i class="pl-msg-unread-badge" aria-label="Belum dibaca"></i>':'')+'</button>';
  }).join(''):emptyStateMarkup({variant:'message',title:activeInboxTab==='unread'?'Tidak ada pesan belum dibaca':'Belum ada percakapan',description:activeInboxTab==='unread'?'Semua percakapan sudah dibaca.':'Pilih kontak atau cari nama pengguna untuk memulai percakapan.'});
  list.querySelectorAll('[data-open-chat]').forEach(button=>button.onclick=()=>openConversation(button.dataset.openChat));
  list.hidden=false;
}
function bindMessageActions(chat,conversationId) {
  const status=chat.querySelector('.pl-msg-chat-status'),selected=new Set(),bar=chat.querySelector('[data-selection-bar]');
  const update=()=>{
    chat.classList.toggle('is-selecting',selected.size>0);
    if(bar){bar.hidden=!selected.size;bar.querySelector('[data-selection-count]').textContent=selected.size+' dipilih';}
    chat.querySelectorAll('[data-message-id]').forEach(article=>{const box=article.querySelector('[data-select-message]');if(box)box.checked=selected.has(article.dataset.messageId);article.classList.toggle('is-selected',selected.has(article.dataset.messageId));});
  };
  let longPressed=false;
  chat.querySelectorAll('.pl-msg-bubble[data-message-id]').forEach(article=>{
    let timer=null;
    const openMenu=()=>{const menu=article.querySelector('[data-message-menu]');if(menu){menu.hidden=false;longPressed=true;}};
    article.addEventListener('contextmenu',event=>{event.preventDefault();openMenu();});
    article.addEventListener('touchstart',()=>{timer=setTimeout(openMenu,520);},{passive:true});
    ['touchend','touchmove','touchcancel'].forEach(name=>article.addEventListener(name,()=>clearTimeout(timer),{passive:true}));
    article.addEventListener('click',event=>{if(longPressed){longPressed=false;return;}if(!selected.size||event.target.closest('button,a,input,[data-message-menu]'))return;selected.has(article.dataset.messageId)?selected.delete(article.dataset.messageId):selected.add(article.dataset.messageId);update();});
  });
  chat.querySelectorAll('[data-select-message]').forEach(box=>box.onchange=()=>{const id=box.closest('[data-message-id]')?.dataset.messageId;if(!id)return;box.checked?selected.add(id):selected.delete(id);update();});
  chat.querySelectorAll('[data-message-action]').forEach(button=>button.onclick=async()=>{
    const article=button.closest('[data-message-id]'),messageId=article?.dataset.messageId;if(!messageId)return;
    const action=button.dataset.messageAction;article.querySelector('[data-message-menu]')?.setAttribute('hidden','');
    if(action==='select'){selected.add(messageId);update();return;}
    if(action==='star'){const existing=await db.from('user_message_stars').select('message_id').eq('user_id',currentUser.id).eq('message_id',messageId).maybeSingle();const result=existing.data?await db.from('user_message_stars').delete().eq('user_id',currentUser.id).eq('message_id',messageId):await db.from('user_message_stars').insert({user_id:currentUser.id,message_id:messageId});if(status)status.textContent=result.error?'Gagal mengubah tanda pesan: '+result.error.message:existing.data?'Tanda pesan dihapus.':'Pesan ditandai.';if(!result.error)await openConversation(conversationId);return;}
    if(action==='reply'){const area=chat.querySelector('#pl-msg-compose textarea');if(area){area.dataset.replyTo=messageId;area.placeholder='Balas pesan terpilih…';area.focus();}if(status)status.textContent='Mode balas aktif. Tulis balasan Anda.';return;}
    if(action==='forward'){const dialog=chat.querySelector('#pl-msg-forward-dialog');if(dialog){dialog.dataset.messageId=messageId;dialog.showModal();}return;}
    if(action==='copy'){try{await navigator.clipboard.writeText(article.dataset.messageBody||'');if(status)status.textContent='Pesan disalin.';}catch{if(status)status.textContent='Browser tidak mengizinkan penyalinan pesan.';}return;}
    if(action==='hide'){const {error}=await db.rpc('hide_message_for_me',{p_message_id:messageId});if(error){if(status)status.textContent=error.message;return;}await openConversation(conversationId);const note=document.querySelector('#pl-msg-chat .pl-msg-chat-status');if(note){note.innerHTML='Pesan dihapus dari tampilan Anda. <button type="button" data-undo-hide>Urungkan</button>';note.querySelector('[data-undo-hide]').onclick=async()=>{const restored=await db.rpc('undo_hide_message_for_me',{p_message_id:messageId});if(restored.error||!restored.data){note.textContent=restored.error?.message||'Waktu urungkan sudah habis.';return;}await openConversation(conversationId);};}return;}
    if(action==='delete-everyone'){if(!window.confirm('Hapus pesan ini untuk semua peserta?'))return;const {data:mediaPath,error}=await db.rpc('delete_message_for_everyone',{p_message_id:messageId});if(error){if(status)status.textContent=error.message;return;}if(mediaPath)await db.storage.from('pluits-message-media').remove([mediaPath]);await openConversation(conversationId);await loadConversations();}
  });
  chat.querySelector('[data-selection-cancel]')?.addEventListener('click',()=>{selected.clear();update();});
  chat.querySelector('[data-selection-delete]')?.addEventListener('click',async()=>{if(!selected.size||!window.confirm('Hapus '+selected.size+' pesan untuk Anda?'))return;for(const id of selected){const {error}=await db.rpc('hide_message_for_me',{p_message_id:id});if(error){if(status)status.textContent=error.message;break;}}selected.clear();await openConversation(conversationId);});
  chat.querySelector('[data-selection-forward]')?.addEventListener('click',()=>{if(selected.size!==1){if(status)status.textContent='Pilih satu pesan untuk diteruskan.';return;}const dialog=chat.querySelector('#pl-msg-forward-dialog');dialog.dataset.messageId=[...selected][0];dialog.showModal();});
  const dialog=chat.querySelector('#pl-msg-forward-dialog');
  dialog?.querySelector('[data-forward-send]')?.addEventListener('click',async()=>{const messageId=dialog.dataset.messageId,target=dialog.querySelector('select')?.value,source=chat.querySelector('[data-message-id="'+CSS.escape(messageId)+'"]');if(!target||!source)return;const type=source.dataset.messageType||'text',body=source.dataset.messageBody||'',path=source.dataset.mediaPath||'';let payload={conversation_id:target,sender_id:currentUser.id,body:body?'Diteruskan: '+body:'',message_type:type,client_message_id:crypto.randomUUID()};if(path){const signed=await db.storage.from('pluits-message-media').createSignedUrl(path,300);if(signed.error){if(status)status.textContent='Media sumber tidak dapat dibuka.';return;}const downloaded=await fetch(signed.data.signedUrl);if(!downloaded.ok){if(status)status.textContent='Media gagal diunduh untuk diteruskan.';return;}const blob=await downloaded.blob(),mime=blob.type||source.dataset.mediaMime||'application/octet-stream',name=source.dataset.mediaName||'lampiran',ext=(name.split('.').pop()||'bin').toLowerCase().replace(/[^a-z0-9]/g,'').slice(0,8),newPath=target+'/'+currentUser.id+'/'+crypto.randomUUID()+'.'+ext;const uploaded=await db.storage.from('pluits-message-media').upload(newPath,blob,{contentType:mime,upsert:false});if(uploaded.error){if(status)status.textContent='Media gagal diunggah: '+uploaded.error.message;return;}payload.media_path=newPath;payload.media_mime_type=mime;payload.media_name=name;if(type==='voice')payload.media_duration_seconds=Number(source.dataset.mediaDuration)||1;}const {error}=await db.from('user_messages').insert(payload);if(error){if(payload.media_path)await db.storage.from('pluits-message-media').remove([payload.media_path]);if(status)status.textContent='Gagal meneruskan pesan: '+error.message;return;}dialog.close();if(status)status.textContent='Pesan diteruskan.';await loadConversations();});
  dialog?.querySelector('[data-forward-cancel]')?.addEventListener('click',()=>dialog.close());
  chat.querySelectorAll('[data-contact-action]').forEach(button=>button.onclick=async()=>{const otherId=button.dataset.userId,action=button.dataset.contactAction;if(!otherId)return;if(action==='block'){if(!window.confirm('Blokir akun ini? Akun tersebut tidak dapat memulai atau mengirim pesan kepada Anda.'))return;const {error}=await db.rpc('block_user',{p_blocked_user_id:otherId});if(status)status.textContent=error?'Gagal memblokir: '+error.message:'Akun berhasil diblokir.';if(!error){chat.querySelector('#pl-msg-compose')?.setAttribute('hidden','');chat.querySelector('[data-contact-menu]')?.removeAttribute('open');}}if(action==='report'){const details=window.prompt('Jelaskan alasan laporan (opsional):','');if(details===null)return;const {error}=await db.rpc('report_content',{p_target_type:'user',p_target_id:otherId,p_reason:'other',p_details:details});if(status)status.textContent=error?'Laporan gagal: '+error.message:'Laporan akun telah dikirim untuk ditinjau.';}});
}

async function openConversation(id) {
  if(String(id).startsWith('draft:'))return openDraftConversation(String(id).slice(6));
  currentConversation=id;
  const chat=document.querySelector('#pl-msg-chat'); if(!chat)return;
  document.querySelector('#pl-msg-layout')?.classList.add('is-chat-open');
  chat.innerHTML='<div class="pl-msg-empty">Memuat pesan…</div>';
  const thread=conversationCache.find(item=>item.id===id);
  const [messages,members]=await Promise.all([
    db.from('user_messages').select('id,sender_id,body,created_at,deleted_at,message_type,media_path,media_duration_seconds,media_mime_type,media_name,reply_to_id').eq('conversation_id',id).order('created_at',{ascending:true}).limit(150),
    db.from('user_conversation_members').select('user_id,last_read_at').eq('conversation_id',id)
  ]);
  const messageIds=(messages.data||[]).map(message=>message.id);
  const [receipts,hidden,stars]=messageIds.length?await Promise.all([
    db.from('user_message_receipts').select('message_id,delivered_at,read_at,played_at').in('message_id',messageIds),
    db.from('user_message_hidden').select('message_id').eq('user_id',currentUser.id).in('message_id',messageIds),
    db.from('user_message_stars').select('message_id').eq('user_id',currentUser.id).in('message_id',messageIds)
  ]):[{data:[],error:null},{data:[],error:null},{data:[],error:null}];
  const receiptByMessage=new Map((receipts.data||[]).map(receipt=>[receipt.message_id,receipt]));
  const hiddenIds=new Set((hidden.data||[]).map(row=>row.message_id));
  const starredIds=new Set((stars.data||[]).map(row=>row.message_id));
  let visibleMessages=(messages.data||[]).filter(message=>!hiddenIds.has(message.id)).map(message=>({...message,is_starred:starredIds.has(message.id)}));
  const replyIds=[...new Set(visibleMessages.map(message=>message.reply_to_id).filter(Boolean))];
  if(replyIds.length){const replies=await db.from('user_messages').select('id,body,deleted_at,message_type').in('id',replyIds);const replyMap=new Map((replies.data||[]).map(row=>[row.id,row]));visibleMessages=visibleMessages.map(row=>({...row,reply_preview:row.reply_to_id?(replyMap.get(row.reply_to_id)?.deleted_at?'Pesan dihapus':replyMap.get(row.reply_to_id)?.body||'Lampiran') : ''}));}
  if((messages.error||members.error)&&navigator.onLine){chat.textContent=(messages.error||members.error).message;return;}
  const queued=queueFor(id);
  const preferences=getInboxPreferences();
  chat.dataset.theme=preferences.theme;chat.dataset.fontSize=preferences.fontSize;
  chat.innerHTML='<header class="pl-msg-chat-head"><button type="button" class="pl-msg-back" data-chat-back aria-label="Kembali ke Inbox">‹</button><span class="pl-msg-chat-avatar" data-chat-avatar>'+contactAvatar(thread?.other||{display_name:'P'})+'</span><div><b>'+esc(thread?.other.display_name||thread?.other.username||'Conversation')+'</b><small>@'+esc(thread?.other.username||'')+' · <span id="pl-msg-chat-presence">'+(thread?.other?.is_self?'Catatan pribadi':thread?.other?.id&&onlineUserIds.has(thread.other.id)?'Online':'Tidak online')+'</span></small></div>'+(thread?.other?.is_self?'':'<details class="pl-msg-contact-menu" data-contact-menu><summary aria-label="Opsi kontak"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="5" cy="12" r="1.7"/><circle cx="12" cy="12" r="1.7"/><circle cx="19" cy="12" r="1.7"/></svg></summary><div><button type="button" data-contact-action="report" data-user-id="'+esc(thread?.other?.id||'')+'">Laporkan akun</button><button type="button" data-contact-action="block" data-user-id="'+esc(thread?.other?.id||'')+'">Blokir akun</button></div></details>')+'</header>'+
    '<div class="pl-msg-stream">'+(visibleMessages.length?visibleMessages.map(message=>messageMarkup(message,false,receiptByMessage.get(message.id))).join('') : emptyStateMarkup({variant:'message',title:'Belum ada pesan',description:'Kirim pesan pertama untuk memulai percakapan.'}))+queued.map(row=>messageMarkup(row,true)).join('')+'</div>'+
    '<div class="pl-msg-selection-bar" data-selection-bar hidden><span data-selection-count>0 dipilih</span><button type="button" data-selection-forward>Teruskan</button><button type="button" data-selection-delete>Hapus</button><button type="button" data-selection-cancel>Batal</button></div>'+
    '<form id="pl-msg-compose"><input id="pl-msg-attachment-input" type="file" hidden multiple accept="image/jpeg,image/png,image/webp,image/gif,application/pdf,text/plain,application/zip,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation"><button type="button" class="pl-msg-attach" data-attachment-trigger aria-label="Lampirkan foto atau dokumen" title="Lampirkan foto atau dokumen"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m8 12.5 7.8-7.8a4 4 0 0 1 5.7 5.7l-9.9 9.9a6 6 0 0 1-8.5-8.5l9.2-9.2"/></svg></button><textarea name="body" rows="1" maxlength="5000" placeholder="Ketik pesan"></textarea><button type="button" class="pl-msg-voice" data-voice-record aria-label="Rekam pesan suara" title="Pesan suara"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="2.5" width="6" height="12" rx="3"/><path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v4m-4 0h8"/></svg></button><button type="submit" class="pl-msg-send" aria-label="Kirim pesan" title="Kirim"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 12 16-8-6 16-3-6-7-2Z"/><path d="m11 14 9-10"/></svg></button></form>'+
    '<dialog class="pl-msg-forward-dialog" id="pl-msg-forward-dialog"><h3>Teruskan pesan</h3><label>Pilih percakapan<select>'+conversationCache.map(item=>'<option value="'+esc(item.id)+'">'+esc(item.other.display_name||item.other.username)+'</option>').join('')+'</select></label><div><button type="button" data-forward-cancel>Batal</button><button type="button" data-forward-send>Kirim</button></div></dialog>'+
    '<p class="pl-msg-chat-status" role="status">'+(queued.length?queued.length+' pesan menunggu koneksi.':'')+'</p>';
  chat.querySelector('[data-chat-back]')?.addEventListener('click',()=>document.querySelector('#pl-msg-layout')?.classList.remove('is-chat-open'));
  await hydrateVoicePlayers(chat);
  await hydrateMessageMedia(chat);
  const selfMember=(members.data||[]).find(member=>member.user_id===currentUser.id);
  const readAt=selfMember?.last_read_at;
  const latestIncoming=visibleMessages.filter(message=>message.sender_id!==currentUser.id).at(-1);
  if(navigator.onLine) {
    await db.rpc('mark_conversation_delivered',{p_conversation_id:id});
    if(latestIncoming&&(!readAt||new Date(readAt)<new Date(latestIncoming.created_at))) {
      await db.rpc('mark_conversation_read',{p_conversation_id:id});
    }
  }
  hydrateChatAvatar(chat,thread?.other);
  bindMessageActions(chat,id);
  bindVoiceRecorder(chat,id);
  bindAttachmentComposer(chat,id);
  const form=chat.querySelector('#pl-msg-compose');
  bindTextComposer(form);
  form.onsubmit=async event=>{
    event.preventDefault();
    const body=String(new FormData(form).get('body')||'').trim(); if(!body)return;
    const textarea=form.querySelector('textarea');
    const item={client_message_id:crypto.randomUUID(),conversation_id:id,sender_id:currentUser.id,body,reply_to_id:textarea?.dataset.replyTo||null,created_at:new Date().toISOString()};
    const button=form.querySelector('[type="submit"]'); button.disabled=true;
    if(!navigator.onLine) {
      const queue=readQueue(); queue.push(item);
      if(!writeQueue(queue)){alert('Penyimpanan offline di perangkat tidak tersedia. Pesan belum disimpan.');button.disabled=false;return;}
      form.reset();if(textarea){delete textarea.dataset.replyTo;textarea.placeholder='Ketik pesan';} await openConversation(id); await loadConversations(); updateNetworkStatus(); return;
    }
    const {created_at,...messagePayload}=item;
    const {error}=await db.from('user_messages').upsert(messagePayload,{onConflict:'sender_id,client_message_id',ignoreDuplicates:true});
    if(error) {
      if(!navigator.onLine) {
        const queue=readQueue();queue.push(item);
        if(!writeQueue(queue)){alert('Pesan gagal dikirim dan tidak dapat disimpan offline: '+error.message);button.disabled=false;return;}
      } else {alert(error.message);button.disabled=false;return;}
    }
    form.reset(); await openConversation(id); await loadConversations();
  };
  const stream=chat.querySelector('.pl-msg-stream'); stream.scrollTop=stream.scrollHeight;
  await loadConversations();
}
async function flushOutbox() {
  if(sendingQueue||!currentUser||!navigator.onLine)return;
  sendingQueue=true; updateNetworkStatus();
  try {
    const queue=readQueue(),remaining=[];
    for(const item of queue) {
      if(!navigator.onLine){remaining.push(item,...queue.slice(queue.indexOf(item)+1));break;}
      let targetConversation=item.conversation_id;
      if(!targetConversation&&item.recipient_user_id){
        const started=await db.rpc('start_direct_conversation',{p_other_user_id:item.recipient_user_id});
        if(started.error){remaining.push(item);continue;}
        targetConversation=started.data;
        if(currentConversation==='draft:'+item.recipient_user_id)currentConversation=targetConversation;
      }
      const {created_at,recipient_user_id,...messagePayload}=item;
      messagePayload.conversation_id=targetConversation;
      const {error}=await db.from('user_messages').upsert(messagePayload,{onConflict:'sender_id,client_message_id',ignoreDuplicates:true});
      if(error) remaining.push({...item,conversation_id:targetConversation});
    }
    writeQueue(remaining);
    if(currentConversation) await openConversation(currentConversation);
    await loadConversations();
  } finally { sendingQueue=false; }
}
