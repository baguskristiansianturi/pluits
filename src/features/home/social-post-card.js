import { renderIcon } from '../../design-system/icons.js';
import { routeHref } from '../../config/paths.js';
import './social-post-card.css';

const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[char]));

export const demoFeedPosts = [
  {
    id:'demo-post-alya',authorName:'Alya Prameswari',username:'alya.prameswari',avatar:'photo-1534528741775-53994a69daeb',
    verification:'verified',membership:'Premium',membershipMark:'✦',time:'Baru saja',type:'photo',
    caption:'Golden hour, little moments, and a view I never get tired of. 🌅\\n\\nSudut favorit untuk menikmati sore dan cerita baru. #Bali #Sunset',
    mediaUrl:'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1100&q=85',
    likes:2486,likeLabel:'2,4 rb',giftCount:32,commentsCount:184,
    comments:[
      {id:'a-c1',name:'Raka Mahendra',username:'raka.visual',avatar:'photo-1500648767791-00dcc994a43e',text:'Warna langitnya cantik banget! 🌅',likes:18,replies:[{name:'Alya Prameswari',text:'Iya, datang pas matahari mulai turun.'}]},
      {id:'a-c2',name:'Nadia Putri',username:'nadia.tastes',avatar:'photo-1531123897727-8f129e1688ce',text:'Simpan dulu tempatnya, next weekend ke sini.',likes:7,replies:[]}
    ]
  },
  {
    id:'demo-post-raka',authorName:'Raka Mahendra',username:'raka.visual',avatar:'photo-1500648767791-00dcc994a43e',
    verification:'unverified',membership:'Platinum',membershipMark:'Pt',time:'1 jam lalu',type:'video',
    caption:'Mencari detail kecil di tengah kota. Kadang perspektif baru datang dari berjalan lebih pelan. 📷 #StreetStory',
    mediaUrl:'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    poster:'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1000&q=85',
    likes:846,likeLabel:'846',giftCount:18,commentsCount:72,
    comments:[
      {id:'r-c1',name:'Dimas Wirawan',username:'dimas.w',avatar:'photo-1506794778202-cad84cf45f1d',text:'Kameranya bergerak smooth banget.',likes:11,replies:[{name:'Raka Mahendra',text:'Terima kasih, coba pakai gerakan pelan.'},{name:'Dimas Wirawan',text:'Noted, mau coba juga!'}]},
      {id:'r-c2',name:'Sinta Maharani',username:'sinta.explores',avatar:'photo-1544005313-94ddf0286df2',text:'Mood kota yang tenang, suka!',likes:4,replies:[]}
    ]
  },
  {
    id:'demo-post-nadia',authorName:'Nadia Putri',username:'nadia.tastes',avatar:'photo-1531123897727-8f129e1688ce',
    verification:'verified',membership:'Silver',membershipMark:'S',time:'1 hari lalu',type:'photo',
    caption:'Akhir pekan, secangkir kopi, dan tempat nyaman untuk bertukar cerita. Ada rekomendasi tempat serupa? ☕ #CoffeeMood',
    mediaUrl:'https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=1100&q=85',
    likes:1132,likeLabel:'1,1 rb',giftCount:11,commentsCount:96,
    comments:[
      {id:'n-c1',name:'Alya Prameswari',username:'alya.prameswari',avatar:'photo-1534528741775-53994a69daeb',text:'Coba coffee shop kecil di Sanur, cozy banget.',likes:9,replies:[{name:'Nadia Putri',text:'Aku catat ya, makasih rekomendasinya!'}]},
      {id:'n-c2',name:'Bagas Putra',username:'bagas.p',avatar:'photo-1500648767791-00dcc994a43e',text:'Buku + kopi = weekend terbaik.',likes:3,replies:[]}
    ]
  },
  {
    id:'demo-post-dimas',authorName:'Dimas Wirawan',username:'dimas.w',avatar:'photo-1506794778202-cad84cf45f1d',
    verification:'verified',membership:'PLUITS Priority',membershipMark:'★',time:'3 hari lalu',type:'video',
    caption:'Potongan suasana pagi di Ubud. Alam selalu punya cara untuk mengingatkan kita agar pelan-pelan. 🌿 #ExploreBali',
    mediaUrl:'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    poster:'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1000&q=85',
    likes:3602,likeLabel:'3,6 rb',giftCount:74,commentsCount:312,
    comments:[
      {id:'d-c1',name:'Nadia Putri',username:'nadia.tastes',avatar:'photo-1531123897727-8f129e1688ce',text:'Pagi yang bikin ingin langsung berangkat ke Bali.',likes:22,replies:[{name:'Dimas Wirawan',text:'Yuk, kapan-kapan jalan bareng circle!'}]},
      {id:'d-c2',name:'Raka Mahendra',username:'raka.visual',avatar:'photo-1500648767791-00dcc994a43e',text:'Shot terakhirnya favoritku.',likes:6,replies:[]}
    ]
  }
];

export const demoReels = demoFeedPosts.filter((post) => post.type === 'video');

const reactions = [
  {id:'like',emoji:'👍',label:'Like'},
  {id:'love',emoji:'❤️',label:'Love'},
  {id:'haha',emoji:'😂',label:'Haha'},
  {id:'wow',emoji:'😮',label:'Wow'},
  {id:'sad',emoji:'😢',label:'Sad'},
  {id:'angry',emoji:'😡',label:'Angry'}
];
const gifts = [
  {id:'tulip',emoji:'🌷',name:'Tulip',coins:10},
  {id:'rose',emoji:'🌹',name:'Rose',coins:25},
  {id:'bouquet',emoji:'💐',name:'Bouquet',coins:50},
  {id:'diamond',emoji:'💎',name:'Diamond',coins:100}
];
let demoWallet = 500;

function avatarMarkup(post) {
  const image = post.avatar ? '<img src="https://images.unsplash.com/' + escapeHtml(post.avatar) + '?auto=format&fit=crop&w=120&h=120&q=75" alt="" loading="lazy">' : '<span>' + escapeHtml((post.authorName || 'P').slice(0,1)) + '</span>';
  const tierClass = post.membership === 'Premium' ? 'premium' : post.membership === 'Silver' ? 'silver' : post.membership === 'Gold' ? 'gold' : post.membership === 'Platinum' ? 'platinum' : 'priority';
  return '<span class="pl-post-avatar-wrap"><span class="pl-post-avatar">' + image + '</span><span class="pl-post-tier pl-post-tier--' + tierClass + '" title="' + escapeHtml(post.membership) + '" aria-label="Membership ' + escapeHtml(post.membership) + '">' + escapeHtml(post.membershipMark || '•') + '</span></span>';
}
function statusMarkup(post) {
  return post.verification === 'unverified'
    ? '<span class="pl-post-verification pl-post-verification--warning" title="Belum terverifikasi. Periksa informasi akun sebelum mempercayainya." aria-label="Akun belum terverifikasi"><span aria-hidden="true">!</span></span>'
    : '<span class="pl-post-verification pl-post-verification--verified" title="Akun terverifikasi" aria-label="Akun terverifikasi">' + renderIcon('check') + '</span>';
}
function renderReplies(replies) {
  return (replies || []).map((reply) => '<div class="pl-post-reply"><strong>' + escapeHtml(reply.name) + '</strong><span>' + escapeHtml(reply.text) + '</span></div>').join('');
}
function renderComment(comment) {
  return '<article class="pl-post-comment" data-comment-id="' + escapeHtml(comment.id) + '"><div class="pl-post-comment-avatar">' + (comment.avatar ? '<img src="https://images.unsplash.com/' + escapeHtml(comment.avatar) + '?auto=format&fit=crop&w=80&h=80&q=70" alt="" loading="lazy">' : escapeHtml(comment.name.slice(0,1))) + '</div><div class="pl-post-comment-body"><div class="pl-post-comment-bubble"><strong>' + escapeHtml(comment.name) + '</strong><p>' + escapeHtml(comment.text) + '</p></div><div class="pl-post-comment-tools"><button type="button" data-comment-like>♡ <span>' + Number(comment.likes || 0) + '</span></button><button type="button" data-reply-comment>Balas</button><button type="button" data-comment-more aria-label="Opsi komentar">' + renderIcon('moreVertical') + '</button></div><div class="pl-post-comment-replies">' + renderReplies(comment.replies) + '</div></div></article>';
}
function renderReactionPicker() {
  return '<div class="pl-post-reaction-picker" data-reaction-picker hidden>' + reactions.map((reaction) => '<button type="button" data-reaction="' + reaction.id + '" aria-label="' + reaction.label + '" title="' + reaction.label + '">' + reaction.emoji + '<span>' + reaction.label + '</span></button>').join('') + '</div>';
}
function renderGiftPanel(post) {
  return '<section class="pl-post-gift-panel" data-gift-panel hidden><div class="pl-post-panel-heading"><strong>Kirim apresiasi</strong><span>Untuk ' + escapeHtml(post.authorName) + '</span></div><div class="pl-post-gift-grid">' + gifts.map((gift) => '<button type="button" class="pl-post-gift-choice" data-gift="' + gift.id + '" data-coins="' + gift.coins + '" data-emoji="' + gift.emoji + '"><span class="pl-post-gift-emoji">' + gift.emoji + '</span><strong>' + gift.name + '</strong><small>' + gift.coins + ' koin</small></button>').join('') + '</div><button type="button" class="pl-post-gift-send" data-gift-send disabled>Pilih hadiah</button></section>';
}
function renderMenu() {
  return '<div class="pl-post-menu" data-post-menu hidden><button type="button" data-post-save>Simpan postingan</button><button type="button" data-post-hide>Sembunyikan dari feed</button><button type="button" data-post-report>Laporkan postingan</button></div>';
}
function renderSharePanel(post) {
  return '<section class="pl-post-share-panel" data-share-panel hidden><strong>Bagikan postingan</strong><button type="button" data-share-circle>Bagikan ke Circle</button><button type="button" data-share-copy>Salin tautan demo</button><button type="button" data-share-close>Tutup</button></section>';
}
function renderMedia(post) {
  if (post.type === 'video') {
    return '<div class="pl-post-media-wrap pl-post-media-wrap--video"><video class="pl-post-media pl-post-video" data-demo-video data-video-limit="10" src="' + escapeHtml(post.mediaUrl) + '" poster="' + escapeHtml(post.poster || '') + '" controls playsinline preload="none" aria-label="Video postingan ' + escapeHtml(post.authorName) + '"></video><span class="pl-post-video-limit">Video demo · maksimal 10 detik</span></div>';
  }
  return '<div class="pl-post-media-wrap"><img class="pl-post-media" src="' + escapeHtml(post.mediaUrl) + '" alt="Foto postingan ' + escapeHtml(post.authorName) + '" loading="lazy" decoding="async"></div>';
}
export function renderSocialPostCard(post) {
  if (!post.isDemo) {
    return '<article class="global-post-card"><header class="global-post-author"><span class="global-post-avatar">' + escapeHtml((post.authorName || 'P').slice(0,1)) + '</span><span class="global-post-author-copy"><strong>' + escapeHtml(post.authorName || 'Pengguna PLUITS') + '</strong><small>@' + escapeHtml(post.username || 'pengguna') + ' · ' + escapeHtml(post.created_at ? new Date(post.created_at).toLocaleDateString('id-ID',{day:'numeric',month:'short'}) : '') + '</small></span></header><p class="global-post-caption">' + escapeHtml(post.caption || '') + '</p></article>';
  }
  return '<article class="global-post-card pl-post-card is-demo" data-post-card data-post-id="' + escapeHtml(post.id) + '" data-base-likes="' + post.likes + '" data-base-gifts="' + post.giftCount + '" data-base-comments="' + post.commentsCount + '">' +
    '<header class="global-post-author pl-post-author"><span class="global-post-avatar pl-post-avatar-shell">' + avatarMarkup(post) + '</span><span class="global-post-author-copy pl-post-author-copy"><strong>' + escapeHtml(post.authorName) + ' ' + statusMarkup(post) + '</strong><small>@' + escapeHtml(post.username) + ' · ' + escapeHtml(post.time) + '</small></span><button type="button" class="pl-post-more" data-post-more aria-label="Opsi postingan">' + renderIcon('moreVertical') + '</button>' + renderMenu() + '</header>' +
    '<p class="global-post-caption pl-post-caption">' + escapeHtml(post.caption).replace(/\\n/g,'<br>') + '</p>' + renderMedia(post) +
    '<div class="pl-post-social-proof"><button type="button" data-reaction-summary aria-label="Lihat reaksi">' + renderIcon('heart') + '<span data-post-like-count>' + escapeHtml(post.likeLabel) + '</span> <small>reaksi</small></button><span><b data-post-comment-count>' + post.commentsCount + '</b> komentar · <b data-post-gift-count>' + post.giftCount + '</b> gift</span></div>' +
    '<div class="pl-post-action-area"><div class="pl-post-action-row"><div class="pl-post-reaction-action"><button type="button" class="pl-post-action" data-reaction-trigger aria-expanded="false">♡ <span>Like</span></button>' + renderReactionPicker() + '</div><button type="button" class="pl-post-action" data-comment-focus>' + renderIcon('message') + '<span>Komentar</span></button><button type="button" class="pl-post-action pl-post-action--gift" data-gift-toggle>' + renderIcon('sparkles') + '<span>Gift</span></button><button type="button" class="pl-post-action" data-share-toggle>' + renderIcon('arrow') + '<span>Bagikan</span></button></div>' + renderGiftPanel(post) + renderSharePanel(post) + '</div>' +
    '<section class="pl-post-comments" data-comments-section><div class="pl-post-comments-heading"><strong>Komentar</strong><button type="button" data-comments-toggle aria-expanded="true">Sembunyikan</button></div><div class="pl-post-comments-list" data-comment-list>' + post.comments.map(renderComment).join('') + '</div><form class="pl-post-comment-form" data-comment-form><input type="text" maxlength="500" placeholder="Tulis komentar..." aria-label="Tulis komentar" data-comment-input><button type="submit">Kirim</button></form></section>' +
    '<div class="pl-post-demo-label">Contoh UI · interaksi demo · perubahan tidak disimpan setelah reload</div></article>';
}
export function renderDemoFeed(kind = 'feed') {
  const posts = kind === 'reels' ? demoReels : demoFeedPosts;
  return '<section class="pl-post-demo-stream" data-demo-stream><div class="pl-post-demo-stream-heading"><div><span class="global-kicker">UJI UI / UX</span><h3>' + (kind === 'reels' ? 'Video singkat' : 'Contoh postingan') + '</h3><p>Konten, angka, komentar, dan status akun di bawah ini adalah data contoh.</p></div><span class="pl-post-demo-wallet">✦ <b data-demo-wallet>' + demoWallet + '</b> koin demo</span></div>' + posts.map((post) => renderSocialPostCard(Object.assign({},post,{isDemo:true}))).join('') + '</section>';
}
function formatCount(value) {
  return new Intl.NumberFormat('id-ID',{notation:'compact',maximumFractionDigits:1}).format(value);
}
function getPost(button) { return button.closest('[data-post-card]'); }
function showToast(root,message) {
  let toast=root.querySelector('[data-post-toast]');
  if(!toast){toast=document.createElement('div');toast.className='pl-post-toast';toast.dataset.postToast='';toast.setAttribute('role','status');toast.setAttribute('aria-live','polite');root.appendChild(toast);}
  toast.textContent=message;toast.classList.add('is-visible');
  clearTimeout(toast._hideTimer);toast._hideTimer=window.setTimeout(()=>toast.classList.remove('is-visible'),2200);
}
function closePanels(card,except) {
  card.querySelectorAll('[data-reaction-picker],[data-gift-panel],[data-share-panel],[data-post-menu]').forEach((panel)=>{if(panel!==except)panel.hidden=true;});
  card.querySelectorAll('[data-reaction-trigger],[data-gift-toggle],[data-share-toggle],[data-post-more]').forEach((button)=>button.setAttribute('aria-expanded','false'));
}
function createReplyForm(comment) {
  if(comment.querySelector('[data-reply-form]'))return;
  const form=document.createElement('form');form.className='pl-post-reply-form';form.dataset.replyForm='';
  form.innerHTML='<input type="text" maxlength="400" placeholder="Tulis balasan..." aria-label="Tulis balasan" data-reply-input><button type="submit">Balas</button>';
  comment.querySelector('.pl-post-comment-replies').appendChild(form);
  form.querySelector('input')?.focus();
}
export function mountSocialPostInteractions(root) {
  if(!root)return ()=>{};
  const controller=new AbortController();
  root.addEventListener('click',(event)=>{
    const button=event.target.closest('button');
    if(!button||!root.contains(button))return;
    const card=getPost(button);
    if(!card)return;
    if(button.matches('[data-reaction-trigger]')){
      const picker=card.querySelector('[data-reaction-picker]');closePanels(card,picker);picker.hidden=!picker.hidden;button.setAttribute('aria-expanded',String(!picker.hidden));return;
    }
    if(button.matches('[data-reaction]')){
      const picker=card.querySelector('[data-reaction-picker]'),trigger=card.querySelector('[data-reaction-trigger]');
      const selected=button.dataset.reaction,was=card.dataset.myReaction===selected;
      card.dataset.myReaction=was?'':selected;
      const item=reactions.find((reaction)=>reaction.id===selected);
      trigger.innerHTML=(was?'♡':item.emoji)+' <span>'+(was?'Like':item.label)+'</span>';trigger.classList.toggle('is-active',!was);
      trigger.setAttribute('aria-expanded','false');picker.hidden=true;
      const count=Number(card.dataset.baseLikes)+(card.dataset.myReaction?1:0);card.querySelector('[data-post-like-count]').textContent=formatCount(count);
      showToast(root,was?'Reaksi dibatalkan.':'Reaksi '+item.label+' ditambahkan (demo).');return;
    }
    if(button.matches('[data-comment-focus]')){
      card.querySelector('[data-comment-input]')?.focus();card.querySelector('[data-comments-section]')?.scrollIntoView({behavior:'smooth',block:'nearest'});return;
    }
    if(button.matches('[data-gift-toggle]')){
      const panel=card.querySelector('[data-gift-panel]');closePanels(card,panel);panel.hidden=!panel.hidden;button.setAttribute('aria-expanded',String(!panel.hidden));return;
    }
    if(button.matches('[data-gift]')){
      const panel=card.querySelector('[data-gift-panel]');panel.querySelectorAll('[data-gift]').forEach((item)=>item.classList.toggle('is-selected',item===button));
      panel.dataset.selectedGift=button.dataset.gift;panel.dataset.selectedCoins=button.dataset.coins;panel.dataset.selectedEmoji=button.dataset.emoji;
      const send=panel.querySelector('[data-gift-send]');send.disabled=false;send.textContent='Kirim '+button.dataset.emoji+' · '+button.dataset.coins+' koin demo';return;
    }
    if(button.matches('[data-gift-send]')){
      const panel=card.querySelector('[data-gift-panel]'),cost=Number(panel.dataset.selectedCoins||0);
      if(!cost){showToast(root,'Pilih hadiah terlebih dahulu.');return;}
      if(demoWallet<cost){showToast(root,'Koin demo tidak cukup.');return;}
      demoWallet-=cost;root.querySelectorAll('[data-demo-wallet]').forEach((wallet)=>wallet.textContent=demoWallet);
      const count=card.querySelector('[data-post-gift-count]');count.textContent=Number(count.textContent)+1;
      closePanels(card);panel.querySelectorAll('[data-gift]').forEach((item)=>item.classList.remove('is-selected'));panel.querySelector('[data-gift-send]').disabled=true;panel.querySelector('[data-gift-send]').textContent='Pilih hadiah';
      showToast(root,'Hadiah terkirim! Saldo demo tersisa '+demoWallet+' koin.');return;
    }
    if(button.matches('[data-share-toggle]')){
      const panel=card.querySelector('[data-share-panel]');closePanels(card,panel);panel.hidden=!panel.hidden;button.setAttribute('aria-expanded',String(!panel.hidden));return;
    }
    if(button.matches('[data-share-circle]')){closePanels(card);showToast(root,'Postingan dibagikan ke Circle (demo).');return;}
    if(button.matches('[data-share-copy]')){
      const url=window.location.origin+routeHref('social')+'?demo-post='+encodeURIComponent(card.dataset.postId);
      if(navigator.clipboard?.writeText)navigator.clipboard.writeText(url).then(()=>showToast(root,'Tautan demo disalin.')).catch(()=>showToast(root,'Tautan demo: '+url));
      else showToast(root,'Tautan demo: '+url);
      return;
    }
    if(button.matches('[data-share-close]')){closePanels(card);return;}
    if(button.matches('[data-post-more]')){
      const menu=card.querySelector('[data-post-menu]');closePanels(card,menu);menu.hidden=!menu.hidden;button.setAttribute('aria-expanded',String(!menu.hidden));return;
    }
    if(button.matches('[data-post-save]')){button.textContent=button.dataset.saved==='true'?'Simpan postingan':'Postingan tersimpan';button.dataset.saved=button.dataset.saved==='true'?'false':'true';showToast(root,button.dataset.saved==='true'?'Postingan disimpan pada preview.':'Postingan dihapus dari simpanan preview.');return;}
    if(button.matches('[data-post-hide]')){card.classList.toggle('is-demo-hidden');showToast(root,card.classList.contains('is-demo-hidden')?'Postingan disembunyikan dari preview.':'Postingan ditampilkan kembali.');return;}
    if(button.matches('[data-post-report]')){showToast(root,'Laporan dicatat sebagai simulasi UI, tidak dikirim ke server.');closePanels(card);return;}
    if(button.matches('[data-reaction-summary]')){showToast(root,'Reaksi contoh: Like, Love, Haha, Wow, Sad, dan Angry.');return;}
    if(button.matches('[data-comments-toggle]')){const list=card.querySelector('[data-comment-list]'),collapsed=list.hidden;list.hidden=!collapsed;button.textContent=collapsed?'Sembunyikan':'Tampilkan';button.setAttribute('aria-expanded',String(collapsed));return;}
    if(button.matches('[data-comment-like]')){const count=button.querySelector('span'),active=button.classList.toggle('is-active');count.textContent=Math.max(0,Number(count.textContent)+(active?1:-1));button.firstChild.textContent=active?'♥ ':'♡ ';return;}
    if(button.matches('[data-reply-comment]')){createReplyForm(button.closest('[data-comment-id]'));return;}
    if(button.matches('[data-comment-more]')){const comment=button.closest('[data-comment-id]');let menu=comment.querySelector('[data-comment-menu]');if(!menu){menu=document.createElement('div');menu.className='pl-post-comment-menu';menu.dataset.commentMenu='';menu.innerHTML='<button type="button" data-comment-copy>Salin komentar</button><button type="button" data-comment-report>Laporkan komentar</button>';comment.querySelector('.pl-post-comment-tools').appendChild(menu);}menu.hidden=!menu.hidden;return;}
    if(button.matches('[data-comment-copy]')){showToast(root,'Teks komentar siap disalin pada preview.');return;}
    if(button.matches('[data-comment-report]')){showToast(root,'Laporan komentar simulasi.');return;}
  },{signal:controller.signal});
  root.addEventListener('submit',(event)=>{
    const form=event.target.closest('[data-comment-form],[data-reply-form]');
    if(!form||!root.contains(form))return;
    event.preventDefault();
    const card=getPost(form),input=form.querySelector('input'),value=input.value.trim();
    if(!value){input.focus();return;}
    if(form.matches('[data-comment-form]')){
      const list=card.querySelector('[data-comment-list]'),comment=document.createElement('article');comment.className='pl-post-comment';comment.dataset.commentId='demo-new-'+Date.now();
      comment.innerHTML='<div class="pl-post-comment-avatar">A</div><div class="pl-post-comment-body"><div class="pl-post-comment-bubble"><strong>Anda</strong><p></p></div><div class="pl-post-comment-tools"><button type="button" data-comment-like>♡ <span>0</span></button><button type="button" data-reply-comment>Balas</button><button type="button" data-comment-more aria-label="Opsi komentar">'+renderIcon('moreVertical')+'</button></div><div class="pl-post-comment-replies"></div></div>';
      comment.querySelector('p').textContent=value;list.appendChild(comment);input.value='';
      const count=card.querySelector('[data-post-comment-count]');count.textContent=Number(count.textContent)+1;
      showToast(root,'Komentar ditambahkan ke preview.');return;
    }
    const reply=document.createElement('div');reply.className='pl-post-reply';const strong=document.createElement('strong');strong.textContent='Anda';const span=document.createElement('span');span.textContent=value;reply.append(strong,span);form.before(reply);form.remove();showToast(root,'Balasan ditambahkan ke preview.');
  },{signal:controller.signal});
  root.addEventListener('timeupdate',(event)=>{const video=event.target;if(!video?.matches?.('[data-demo-video]'))return;const limit=Number(video.dataset.videoLimit||10);if(video.currentTime>=limit){video.pause();video.currentTime=limit;showToast(root,'Preview video dibatasi hingga 10 detik.');}},{capture:true,signal:controller.signal});
  return ()=>controller.abort();
}
