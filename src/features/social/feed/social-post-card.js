import { renderIcon } from '../../../design-system/icons.js';
import { routeHref } from '../../../config/paths.js';
import './social-post-card.css';
import { getVideoContentKind, isReelPost, renderVideoMedia } from '../reels/reel-media.js';

const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[char]));

export const demoFeedPosts = [
  {
    id:'demo-post-alya',authorName:'Alya Prameswari',username:'alya.prameswari',avatar:'photo-1534528741775-53994a69daeb',
    verification:'verified',membership:'Gold',membershipMark:'G',premium:true,time:'Baru saja',type:'photo',
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
    verification:'unverified',membership:'Platinum',membershipMark:'Pt',time:'1 jam lalu',type:'video',durationSeconds:43,
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
    verification:'verified',membership:'PLUITS Priority',membershipMark:'★',time:'3 hari lalu',type:'video',durationSeconds:78,
    caption:'Potongan suasana pagi di Ubud. Alam selalu punya cara untuk mengingatkan kita agar pelan-pelan. 🌿 #ExploreBali',
    mediaUrl:'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    poster:'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1000&q=85',
    likes:3602,likeLabel:'3,6 rb',giftCount:74,commentsCount:312,
    comments:[
      {id:'d-c1',name:'Nadia Putri',username:'nadia.tastes',avatar:'photo-1531123897727-8f129e1688ce',text:'Pagi yang bikin ingin langsung berangkat ke Bali.',likes:22,replies:[{name:'Dimas Wirawan',text:'Yuk, kapan-kapan jalan bareng circle!'}]},
      {id:'d-c2',name:'Raka Mahendra',username:'raka.visual',avatar:'photo-1500648767791-00dcc994a43e',text:'Shot terakhirnya favoritku.',likes:6,replies:[]}
    ]
  },

  ...[
    {id:'demo-post-05',authorName:'Sinta Maharani',username:'sinta.explores',avatar:'photo-1544005313-94ddf0286df2',type:'blog',orientation:'horizontal',blogCategory:'JURNAL PERJALANAN',readTime:'5 menit baca',blogTitle:'Pagi yang pelan di Ubud',blogExcerpt:'Ada perjalanan yang tidak perlu dikejar. Cukup berjalan, mendengar suara alam, lalu memberi waktu untuk benar-benar hadir.',blogBody:'Pagi di Ubud selalu punya cara sendiri untuk membuat waktu terasa lebih lapang. Kabut tipis bergerak di antara pepohonan, suara sungai terdengar dari kejauhan, dan warung kecil mulai menyiapkan kopi.\n\nSaya memilih berjalan tanpa daftar tujuan. Beberapa momen terbaik justru muncul ketika kita tidak terburu-buru.\n\nCatatan kecil: bawa alas kaki yang nyaman, hormati ruang warga lokal, dan sisakan waktu untuk menikmati suasana.',mediaUrl:'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1600&h=900&q=85',caption:'Catatan perjalanan sederhana dari Ubud. Semoga bisa jadi inspirasi untuk perjalanan berikutnya. #Bali #TravelJournal'},
    {id:'demo-post-06',authorName:'Bagas Putra',username:'bagas.p',avatar:'photo-1500648767791-00dcc994a43e',type:'blog',orientation:'horizontal',blogCategory:'KULINER',readTime:'4 menit baca',blogTitle:'Mencari rasa lokal di sudut Denpasar',blogExcerpt:'Bukan soal tempat yang paling ramai, melainkan cerita di balik sepiring makanan dan orang-orang yang menjaganya.',blogBody:'Saya suka menemukan tempat makan yang tidak banyak bicara tentang dirinya sendiri. Menu ditulis sederhana, dapur bekerja dengan tenang, dan pelanggan datang karena sudah mengenal rasanya.\n\nDi sudut Denpasar, pengalaman seperti ini masih mudah ditemukan jika kita mau sedikit melambat dan bertanya kepada warga sekitar.\n\nDatanglah dengan rasa ingin tahu dan hargai kebiasaan setempat.',mediaUrl:'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1600&h=900&q=85',caption:'Kuliner selalu punya cerita yang lebih panjang dari daftar menu. #FoodStory #Denpasar'},
    {id:'demo-post-07',authorName:'Ayu Prameswari',username:'ayu.prameswari',avatar:'photo-1534528741775-53994a69daeb',type:'blog',orientation:'horizontal',blogCategory:'FOTOGRAFI',readTime:'6 menit baca',blogTitle:'Belajar melihat cahaya sebelum menekan shutter',blogExcerpt:'Foto yang berkesan sering dimulai dari kesabaran mengamati arah cahaya, bukan dari kamera yang paling mahal.',blogBody:'Sebelum mengambil gambar, coba berhenti sejenak dan perhatikan dari mana cahaya datang. Lihat bagaimana bayangan membentuk ruang dan bagaimana warna berubah ketika matahari bergerak.\n\nSaya sering memilih satu sudut lalu menunggu. Kadang hanya beberapa menit, kadang lebih lama. Hasilnya tidak selalu sempurna, tetapi proses mengamati membuat kita lebih peka.\n\nMulailah dari kamera yang ada di tangan. Latihan melihat adalah hal yang paling penting.',mediaUrl:'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1600&h=900&q=85',caption:'Sedikit catatan untuk teman-teman yang suka memotret. #Photography #CreativeNotes'},
    {id:'demo-post-08',authorName:'Raka Mahendra',username:'raka.visual',avatar:'photo-1500648767791-00dcc994a43e',type:'blog',orientation:'horizontal',blogCategory:'KOMUNITAS',readTime:'3 menit baca',blogTitle:'Circle tumbuh dari hal-hal sederhana',blogExcerpt:'Saling menyapa, berbagi rekomendasi, dan hadir ketika teman membutuhkan. Komunitas tidak harus dimulai dari acara besar.',blogBody:'Circle yang kuat tidak selalu dibangun lewat acara besar. Ia tumbuh dari percakapan kecil yang konsisten dan rasa aman untuk menjadi diri sendiri.\n\nMulai dengan mendengarkan, memberi ruang bagi pendapat berbeda, dan menjaga kepercayaan. Dari situ, kegiatan bersama akan terasa lebih alami.',mediaUrl:'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1600&h=900&q=85',caption:'Untuk circle yang saling menguatkan. #Community #Circle'},
    {id:'demo-post-09',authorName:'Nadia Putri',username:'nadia.tastes',avatar:'photo-1531123897727-8f129e1688ce',type:'video',orientation:'vertical',durationSeconds:38,mediaUrl:'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',poster:'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&h=1600&q=85',caption:'Tiga puluh detik menikmati suasana sore. #Reel #SlowLiving'},
    {id:'demo-post-10',authorName:'Dimas Wirawan',username:'dimas.w',avatar:'photo-1506794778202-cad84cf45f1d',type:'video',orientation:'horizontal',durationSeconds:96,mediaUrl:'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',poster:'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1600&h=900&q=85',caption:'Perjalanan panjang dengan pemandangan yang tidak ingin dilewatkan. #Video #Bali'},
    {id:'demo-post-11',authorName:'Sinta Maharani',username:'sinta.explores',avatar:'photo-1544005313-94ddf0286df2',type:'video',orientation:'vertical',durationSeconds:54,mediaUrl:'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',poster:'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&h=1600&q=85',caption:'Potongan kecil dari perjalanan akhir pekan. #Reel #Explore'},
    {id:'demo-post-12',authorName:'Bagas Putra',username:'bagas.p',avatar:'photo-1500648767791-00dcc994a43e',type:'video',orientation:'horizontal',durationSeconds:132,mediaUrl:'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',poster:'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1600&h=900&q=85',caption:'Cerita perjalanan dalam format video yang lebih panjang. #VideoStory'},
    {id:'demo-post-13',authorName:'Ayu Prameswari',username:'ayu.prameswari',avatar:'photo-1534528741775-53994a69daeb',type:'photo',orientation:'horizontal',mediaUrl:'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1600&h=900&q=85',caption:'Garis cakrawala dan ruang untuk bernapas. #Landscape #Bali'},
    {id:'demo-post-14',authorName:'Raka Mahendra',username:'raka.visual',avatar:'photo-1500648767791-00dcc994a43e',type:'photo',orientation:'horizontal',mediaUrl:'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1600&h=900&q=85',caption:'Jalan panjang yang berakhir di pemandangan seperti ini. #TravelPhotography'},
    {id:'demo-post-15',authorName:'Nadia Putri',username:'nadia.tastes',avatar:'photo-1531123897727-8f129e1688ce',type:'photo',orientation:'horizontal',mediaUrl:'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&h=900&q=85',caption:'Laut, langit, dan warna yang selalu berbeda. #OceanMood'},
    {id:'demo-post-16',authorName:'Dimas Wirawan',username:'dimas.w',avatar:'photo-1506794778202-cad84cf45f1d',type:'photo',orientation:'horizontal',mediaUrl:'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1600&h=900&q=85',caption:'Cahaya pagi yang membuat perjalanan terasa istimewa. #MorningLight'},
    {id:'demo-post-17',authorName:'Sinta Maharani',username:'sinta.explores',avatar:'photo-1544005313-94ddf0286df2',type:'photo',orientation:'vertical',mediaUrl:'https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=1000&h=1250&q=85',caption:'Sudut kecil yang ingin kusimpan lebih lama. #TravelDiary'},
    {id:'demo-post-18',authorName:'Bagas Putra',username:'bagas.p',avatar:'photo-1500648767791-00dcc994a43e',type:'photo',orientation:'vertical',mediaUrl:'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&h=1250&q=85',caption:'Langkah singkat, cerita baru. #ExploreBali'},
    {id:'demo-post-19',authorName:'Ayu Prameswari',username:'ayu.prameswari',avatar:'photo-1534528741775-53994a69daeb',type:'photo',orientation:'vertical',mediaUrl:'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1000&h=1250&q=85',caption:'Memandang jauh, lalu pulang dengan pikiran lebih ringan. #Nature'},
    {id:'demo-post-20',authorName:'Raka Mahendra',username:'raka.visual',avatar:'photo-1500648767791-00dcc994a43e',type:'photo',orientation:'vertical',mediaUrl:'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1000&h=1250&q=85',caption:'Menemukan ketenangan di antara pepohonan. #Wilderness'}
  ].map((fixture,index)=>Object.assign({
    verification:index%3===0?'verified':'unverified',
    membership:['Silver','Gold','Platinum','PLUITS Priority'][index%4],
    membershipMark:['S','G','Pt','★'][index%4],
    premium:index%4===1,
    time:(index+2)+' jam lalu',
    likes:420+index*137,
    likeLabel:String(420+index*137),
    giftCount:3+(index%9),
    commentsCount:12+(index*7),
    comments:[{id:fixture.id+'-comment',name:'Alya Prameswari',username:'alya.prameswari',avatar:'photo-1534528741775-53994a69daeb',text:'Suka dengan cerita dan sudut pandangnya!',likes:3+(index%8),replies:[{name:fixture.authorName,text:'Terima kasih sudah mampir dan ikut berbagi cerita.'}]}]
  },fixture))

];

export const demoReels = demoFeedPosts.filter((post) => post.type === 'video' && Number(post.durationSeconds || 0) <= 60);

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
  const tierClass = post.membership === 'Premium' ? 'premium' : post.membership === 'Silver' ? 'silver' : post.membership === 'Gold' ? 'gold' : post.membership === 'Platinum' ? 'platinum' : post.membership === 'PLUITS Priority' ? 'priority' : '';
  const premiumMark = post.premium ? '<span class="pl-post-premium-mark" title="Premium" aria-label="Premium">✦</span>' : '';
  const tierMark = post.membership ? '<span class="pl-post-tier pl-post-tier--' + tierClass + '" title="' + escapeHtml(post.membership) + '" aria-label="Membership ' + escapeHtml(post.membership) + '">' + escapeHtml(post.membershipMark || '•') + '</span>' : '';
  return '<span class="pl-post-avatar-wrap"><span class="pl-post-avatar">' + image + '</span>' + premiumMark + tierMark + '</span>';
}
function statusMarkup(post) {
  return post.verification === 'unverified'
    ? '<span class="pl-post-verification pl-post-verification--warning" title="Belum terverifikasi. Periksa informasi akun sebelum mempercayainya." aria-label="Akun belum terverifikasi"><span aria-hidden="true">!</span></span>'
    : '<span class="pl-post-verification pl-post-verification--verified" title="Akun terverifikasi" aria-label="Akun terverifikasi">' + renderIcon('check') + '</span>';
}
function commentAvatarMarkup(person, size = 80) {
  return person.avatar
    ? '<img src="https://images.unsplash.com/' + escapeHtml(person.avatar) + '?auto=format&fit=crop&w=' + size + '&h=' + size + '&q=70" alt="" loading="lazy">'
    : escapeHtml((person.name || 'P').slice(0,1));
}
function resolveDemoProfile(person) {
  const match = demoFeedPosts.find((post) => (person.username && post.username === person.username) || post.authorName === person.name);
  return Object.assign({
    authorName: person.name || 'Pengguna PLUITS',
    username: person.username || '',
    avatar: person.avatar || '',
    verification: 'unverified',
    membership: '',
    membershipMark: '',
    premium: false
  }, match || {}, person);
}
function renderCommentProfile(person, kind = 'comment') {
  const profile = resolveDemoProfile(person);
  const avatar = avatarMarkup(profile);
  const status = statusMarkup(profile);
  return '<span class="pl-post-comment-profile pl-post-comment-profile--' + kind + '" title="' + escapeHtml(profile.authorName) + '">' + avatar + '<span class="pl-post-comment-profile-status">' + status + '</span></span>';
}
function renderReplies(replies, postOwner) {
  return (replies || []).map((reply) => {
    const isOwner = reply.name === postOwner;
    const sideClass = isOwner ? 'is-owner' : 'is-right';
    const avatar = '<span class="pl-post-reply-profile">' + renderCommentProfile(reply, 'reply') + '</span>';
    const bubble = '<div class="pl-post-reply-bubble"><strong>' + escapeHtml(reply.name) + '</strong><span>' + escapeHtml(reply.text) + '</span></div>';
    return '<div class="pl-post-reply ' + sideClass + '">' + (isOwner ? avatar + bubble : bubble + avatar) + '</div>';
  }).join('');
}
function renderComment(comment, postOwner) {
  return '<article class="pl-post-comment" data-comment-id="' + escapeHtml(comment.id) + '">' + renderCommentProfile(comment) + '<div class="pl-post-comment-body"><div class="pl-post-comment-bubble"><strong>' + escapeHtml(comment.name) + '</strong><p>' + escapeHtml(comment.text) + '</p></div><div class="pl-post-comment-tools"><button type="button" data-comment-like aria-pressed="false" aria-label="Sukai komentar">' + renderIcon('heart') + ' <span>' + Number(comment.likes || 0) + '</span></button><button type="button" data-reply-comment>Balas</button><button type="button" data-comment-more aria-label="Opsi komentar">' + renderIcon('moreVertical') + '</button></div><div class="pl-post-comment-replies">' + renderReplies(comment.replies, postOwner) + '</div></div></article>';
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
function renderCaption(value) {
  const escaped = escapeHtml(value).replace(/\\n/g,'<br>');
  return escaped.replace(/(^|\s)(#[\p{L}\p{N}_]+|@[\p{L}\p{N}._]+)/gu,'$1<span class="pl-post-tag">$2</span>');
}
function renderMedia(post) {
  const horizontal=post.orientation==='horizontal'||post.type==='blog';
  const media=post.type==='video'
    ? renderVideoMedia(post, escapeHtml)
    : '<img class="pl-post-media" src="'+escapeHtml(post.mediaUrl)+'" alt="'+(post.type==='blog'?'Sampul artikel ':'Foto postingan ')+escapeHtml(post.authorName)+'" loading="lazy" decoding="async">';
  const actions='<div class="pl-post-media-actions">'+
    '<button type="button" class="pl-post-media-action pl-post-media-action--reaction" data-reaction-trigger aria-expanded="false" aria-label="Like"><span class="pl-post-media-action-icon" data-reaction-icon>'+renderIcon('heart')+'</span><span class="pl-post-media-action-count" data-overlay-like-count>'+escapeHtml(post.likeLabel)+'</span></button>'+
    '<button type="button" class="pl-post-media-action" data-comment-focus aria-label="Komentar"><span class="pl-post-media-action-icon">'+renderIcon('message')+'</span><span class="pl-post-media-action-count" data-overlay-comment-count>'+post.commentsCount+'</span></button>'+
    '<button type="button" class="pl-post-media-action pl-post-media-action--gift" data-gift-toggle aria-expanded="false" aria-label="Kirim gift"><span class="pl-post-media-action-icon">'+renderIcon('sparkles')+'</span><span class="pl-post-media-action-label">Gift</span></button>'+
    '<button type="button" class="pl-post-media-action" data-share-toggle aria-expanded="false" aria-label="Bagikan"><span class="pl-post-media-action-icon">'+renderIcon('arrow')+'</span><span class="pl-post-media-action-label">Bagikan</span></button>'+
    renderReactionPicker()+'</div>';
  const giftsReceived='<button type="button" class="pl-post-received-gifts" data-gift-received-toggle aria-expanded="false" aria-label="'+post.giftCount+' gift diterima"><span class="pl-post-received-gifts-icon">'+renderIcon('sparkles')+'</span><span data-post-gift-count>'+post.giftCount+'</span><span>gift</span></button>';
  const panels=renderGiftPanel(post)+renderSharePanel(post);
  const blog=post.type==='blog'
    ? '<section class="pl-post-blog-body"><div class="pl-post-blog-meta"><span>'+escapeHtml(post.blogCategory||'BLOG')+'</span><span>'+escapeHtml(post.readTime||'4 menit baca')+'</span></div><h2>'+escapeHtml(post.blogTitle||'Cerita dari komunitas')+'</h2><p>'+escapeHtml(post.blogExcerpt||post.caption)+'</p><div class="pl-post-blog-full" data-blog-full hidden>'+escapeHtml(post.blogBody||post.blogExcerpt||post.caption).replace(/\\n/g,'<br>')+'</div><button type="button" class="pl-post-blog-read" data-blog-expand aria-expanded="false">Baca selengkapnya '+renderIcon('chevronDown')+'</button></section>'
    : '';
  const mediaWrap='<div class="pl-post-media-wrap'+(post.type==='video'?' pl-post-media-wrap--video':'')+'">'+media+'</div>';
  if(horizontal){
    return mediaWrap+blog+'<div class="pl-post-horizontal-controls">'+actions+giftsReceived+panels+'</div>';
  }
  return '<div class="pl-post-media-stage">'+mediaWrap+'<div class="pl-post-media-overlay">'+actions+giftsReceived+panels+'</div></div>';
}
export function renderSocialPostCard(post) {
  if (!post.isDemo) {
    return '<article class="global-post-card"><header class="global-post-author"><span class="global-post-avatar">' + escapeHtml((post.authorName || 'P').slice(0,1)) + '</span><span class="global-post-author-copy"><strong>' + escapeHtml(post.authorName || 'Pengguna PLUITS') + '</strong><small>@' + escapeHtml(post.username || 'pengguna') + ' · ' + escapeHtml(post.created_at ? new Date(post.created_at).toLocaleDateString('id-ID',{day:'numeric',month:'short'}) : '') + '</small></span></header><p class="global-post-caption">' + escapeHtml(post.caption || '') + '</p></article>';
  }
  return '<article class="global-post-card pl-post-card is-demo' + (isReelPost(post) ? ' is-reel' : '') + (post.orientation === 'horizontal' || post.type === 'blog' ? ' is-horizontal' : ' is-vertical') + (post.type === 'blog' ? ' is-blog' : '') + '" data-post-card data-content-kind="' + (post.type === 'blog' ? 'blog' : post.type === 'video' ? getVideoContentKind(post) : 'photo') + '" data-content-orientation="' + (post.orientation || 'vertical') + '" data-post-id="' + escapeHtml(post.id) + '" data-base-likes="' + post.likes + '" data-base-gifts="' + post.giftCount + '" data-base-comments="' + post.commentsCount + '">' +
    '<header class="global-post-author pl-post-author"><span class="global-post-avatar pl-post-avatar-shell">' + avatarMarkup(post) + '</span><span class="global-post-author-copy pl-post-author-copy"><strong>' + escapeHtml(post.authorName) + ' ' + statusMarkup(post) + '</strong><small>@' + escapeHtml(post.username) + ' · ' + escapeHtml(post.time) + '</small></span><button type="button" class="pl-post-more" data-post-more aria-label="Opsi postingan">' + renderIcon('moreVertical') + '</button>' + renderMenu() + '</header>' +
    '<div class="global-post-caption pl-post-caption" data-caption-content>' + renderCaption(post.caption) + '</div><button type="button" class="pl-post-caption-more" data-caption-expand' + (String(post.caption||'').length<=150?' hidden':'') + ' aria-expanded="false">Selengkapnya ' + renderIcon('chevronDown') + '</button>' + renderMedia(post) +
    '<div class="pl-post-social-proof"><button type="button" data-reaction-summary aria-label="Lihat reaksi">' + renderIcon('heart') + '<span data-post-like-count>' + escapeHtml(post.likeLabel) + '</span> <small>reaksi</small></button><span><b data-post-comment-count>' + post.commentsCount + '</b> komentar</span></div>' +
    '<section class="pl-post-comments" data-comments-section><div class="pl-post-comments-heading"><strong>Komentar</strong><button type="button" data-comments-toggle aria-expanded="true">Sembunyikan</button></div><div class="pl-post-comments-list" data-comment-list>' + post.comments.map((comment,index) => { const markup=renderComment(comment, post.authorName); return index>=6 ? markup.replace('class="pl-post-comment"','class="pl-post-comment" hidden data-comment-extra') : markup; }).join('') + '</div><button type="button" class="pl-post-comments-more" data-comments-more' + (post.comments.length<=6?' hidden':'') + '>Lihat semua komentar (' + Math.max(0,post.comments.length-6) + ')</button><form class="pl-post-comment-form" data-comment-form><input type="text" maxlength="500" placeholder="Tulis komentar..." aria-label="Tulis komentar" data-comment-input><button type="submit">Kirim</button></form></section>' +
    '</article>';
}
export function renderDemoFeed(kind = 'feed') {
  const posts = kind === 'reels' ? demoReels : demoFeedPosts;
  return '<section class="pl-post-demo-stream" data-demo-stream>' + posts.map((post,index) => { const markup=renderSocialPostCard(Object.assign({},post,{isDemo:true})); return index>=6 ? markup.replace('data-post-card','data-post-card hidden data-feed-page-hidden') : markup; }).join('') + '<div class="pl-post-feed-more-wrap"><button type="button" class="pl-post-feed-more" data-feed-more' + (posts.length<=6?' hidden':'') + '>Tampilkan postingan lainnya</button></div></section>';
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
  card.querySelectorAll('[data-reaction-trigger],[data-gift-toggle],[data-gift-received-toggle],[data-share-toggle],[data-post-more]').forEach((button)=>button.setAttribute('aria-expanded','false'));
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
  demoWallet=500;
  root.querySelectorAll('[data-demo-wallet]').forEach((wallet)=>wallet.textContent=demoWallet);
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
      const reactionIcon=trigger.querySelector('[data-reaction-icon]');reactionIcon.innerHTML=was?renderIcon('heart'):item.emoji;trigger.classList.toggle('is-active',!was);
      trigger.setAttribute('aria-label',was?'Like':item.label);trigger.setAttribute('aria-expanded','false');picker.hidden=true;
      const count=Number(card.dataset.baseLikes)+(card.dataset.myReaction?1:0);card.querySelector('[data-post-like-count]').textContent=formatCount(count);card.querySelectorAll('[data-overlay-like-count]').forEach((node)=>node.textContent=formatCount(count));
      showToast(root,was?'Reaksi dibatalkan.':'Reaksi '+item.label+' ditambahkan.');return;
    }
    if(button.matches('[data-caption-expand]')){const expanded=card.classList.toggle('is-caption-expanded');button.setAttribute('aria-expanded',String(expanded));button.innerHTML=(expanded?'Tampilkan lebih sedikit ':'Selengkapnya ')+renderIcon(expanded?'chevronUp':'chevronDown');return;}
    if(button.matches('[data-comments-more]')){const extras=card.querySelectorAll('[data-comment-extra]'),expanded=button.dataset.expanded==='true';extras.forEach(item=>{item.hidden=expanded;});button.dataset.expanded=String(!expanded);button.textContent=expanded?'Lihat semua komentar ('+extras.length+')':'Tampilkan lebih sedikit komentar';return;}
    if(button.matches('[data-blog-expand]')){const body=card.querySelector('[data-blog-full]');body.hidden=!body.hidden;button.setAttribute('aria-expanded',String(!body.hidden));button.innerHTML=(body.hidden?'Baca selengkapnya ':'Tutup cerita ')+renderIcon(body.hidden?'chevronDown':'chevronUp');return;}
    if(button.matches('[data-comment-focus]')){
      card.querySelector('[data-comment-input]')?.focus();card.querySelector('[data-comments-section]')?.scrollIntoView({behavior:'smooth',block:'nearest'});return;
    }
    if(button.matches('[data-gift-toggle],[data-gift-received-toggle]')){
      const panel=card.querySelector('[data-gift-panel]');closePanels(card,panel);panel.hidden=!panel.hidden;button.setAttribute('aria-expanded',String(!panel.hidden));return;
    }
    if(button.matches('[data-gift]')){
      const panel=card.querySelector('[data-gift-panel]');panel.querySelectorAll('[data-gift]').forEach((item)=>item.classList.toggle('is-selected',item===button));
      panel.dataset.selectedGift=button.dataset.gift;panel.dataset.selectedCoins=button.dataset.coins;panel.dataset.selectedEmoji=button.dataset.emoji;
      const send=panel.querySelector('[data-gift-send]');send.disabled=false;send.textContent='Kirim '+button.dataset.emoji+' · '+button.dataset.coins+' koin';return;
    }
    if(button.matches('[data-gift-send]')){
      const panel=card.querySelector('[data-gift-panel]'),cost=Number(panel.dataset.selectedCoins||0);
      if(!cost){showToast(root,'Pilih hadiah terlebih dahulu.');return;}
      if(demoWallet<cost){showToast(root,'Koin tidak cukup.');return;}
      demoWallet-=cost;root.querySelectorAll('[data-demo-wallet]').forEach((wallet)=>wallet.textContent=demoWallet);
      const count=card.querySelector('[data-post-gift-count]');count.textContent=Number(count.textContent)+1;
      closePanels(card);panel.querySelectorAll('[data-gift]').forEach((item)=>item.classList.remove('is-selected'));panel.querySelector('[data-gift-send]').disabled=true;panel.querySelector('[data-gift-send]').textContent='Pilih hadiah';
      showToast(root,'Hadiah terkirim! Sisa saldo '+demoWallet+' koin.');return;
    }
    if(button.matches('[data-share-toggle]')){
      const panel=card.querySelector('[data-share-panel]');closePanels(card,panel);panel.hidden=!panel.hidden;button.setAttribute('aria-expanded',String(!panel.hidden));return;
    }
    if(button.matches('[data-share-circle]')){closePanels(card);showToast(root,'Postingan dibagikan ke Circle.');return;}
    if(button.matches('[data-share-copy]')){
      const url=window.location.origin+routeHref('social')+'?demo-post='+encodeURIComponent(card.dataset.postId);
      if(navigator.clipboard?.writeText)navigator.clipboard.writeText(url).then(()=>showToast(root,'Tautan disalin.')).catch(()=>showToast(root,'Tautan: '+url));
      else showToast(root,'Tautan: '+url);
      return;
    }
    if(button.matches('[data-share-close]')){closePanels(card);return;}
    if(button.matches('[data-post-more]')){
      const menu=card.querySelector('[data-post-menu]');closePanels(card,menu);menu.hidden=!menu.hidden;button.setAttribute('aria-expanded',String(!menu.hidden));return;
    }
    if(button.matches('[data-post-save]')){button.textContent=button.dataset.saved==='true'?'Simpan postingan':'Postingan tersimpan';button.dataset.saved=button.dataset.saved==='true'?'false':'true';showToast(root,button.dataset.saved==='true'?'Postingan disimpan .':'Postingan dihapus dari simpanan .');return;}
    if(button.matches('[data-post-hide]')){card.classList.toggle('is-demo-hidden');showToast(root,card.classList.contains('is-demo-hidden')?'Postingan disembunyikan dari .':'Postingan ditampilkan kembali.');return;}
    if(button.matches('[data-post-report]')){showToast(root,'Laporan dicatat.');closePanels(card);return;}
    if(button.matches('[data-reaction-summary]')){showToast(root,'Reaksi contoh: Like, Love, Haha, Wow, Sad, dan Angry.');return;}
    if(button.matches('[data-comments-toggle]')){const list=card.querySelector('[data-comment-list]'),collapsed=list.hidden;list.hidden=!collapsed;button.textContent=collapsed?'Sembunyikan':'Tampilkan';button.setAttribute('aria-expanded',String(collapsed));return;}
    if(button.matches('[data-comment-like]')){const count=button.querySelector('span'),active=button.classList.toggle('is-active');count.textContent=Math.max(0,Number(count.textContent)+(active?1:-1));button.setAttribute('aria-pressed',String(active));return;}
    if(button.matches('[data-reply-comment]')){createReplyForm(button.closest('[data-comment-id]'));return;}
    if(button.matches('[data-comment-more]')){const comment=button.closest('[data-comment-id]');let menu=comment.querySelector('[data-comment-menu]');if(!menu){menu=document.createElement('div');menu.className='pl-post-comment-menu';menu.dataset.commentMenu='';menu.innerHTML='<button type="button" data-comment-copy>Salin komentar</button><button type="button" data-comment-report>Laporkan komentar</button>';comment.querySelector('.pl-post-comment-tools').appendChild(menu);}menu.hidden=!menu.hidden;return;}
    if(button.matches('[data-comment-copy]')){showToast(root,'Teks komentar siap disalin .');return;}
    if(button.matches('[data-comment-report]')){showToast(root,'Laporan komentar .');return;}
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
      const count=card.querySelector('[data-post-comment-count]');count.textContent=Number(count.textContent)+1;card.querySelectorAll('[data-overlay-comment-count]').forEach((node)=>node.textContent=count.textContent);
      showToast(root,'Komentar ditambahkan ke .');return;
    }
    const reply=document.createElement('div');reply.className='pl-post-reply is-right';const bubble=document.createElement('div');bubble.className='pl-post-reply-bubble';const strong=document.createElement('strong');strong.textContent='Anda';const span=document.createElement('span');span.textContent=value;bubble.append(strong,span);const avatar=document.createElement('div');avatar.className='pl-post-reply-avatar';avatar.textContent='A';reply.append(bubble,avatar);form.before(reply);form.remove();showToast(root,'Balasan ditambahkan ke .');
  },{signal:controller.signal});
  root.addEventListener('play',(event)=>{const video=event.target;if(!video?.matches?.('[data-demo-video]'))return;const limit=Number(video.dataset.videoLimit||10);if(video.currentTime>=limit){video.currentTime=0;video.dataset.demoCapped='false';}},{capture:true,signal:controller.signal});
  root.addEventListener('timeupdate',(event)=>{const video=event.target;if(!video?.matches?.('[data-demo-video]')||video.dataset.demoCapped==='true')return;const limit=Number(video.dataset.videoLimit||10);if(video.currentTime>=limit){video.dataset.demoCapped='true';video.pause();video.currentTime=limit;showToast(root,'Preview video dibatasi hingga 10 detik.');}},{capture:true,signal:controller.signal});
  return ()=>controller.abort();
}
