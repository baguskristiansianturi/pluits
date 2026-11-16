import {renderPostCard} from '../posts/post-card.js';
import {renderPostActions} from '../posts/post-actions.js';
import {loadPostComments} from '../posts/comments.js';
import {bindPostLikeInteractions} from '../posts/like-interactions.js';
import {bindPostGalleries,normalizeFeedMediaFrames} from '../posts/post-media-layout.js';
import {socialIcon} from '../../components/common/social-icons.js';
import {createSignedUrlMap} from '../../services/storage/signed-urls.js';
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const avatar=(url,name,size='')=>url?'<img class="ua-avatar '+size+'" src="'+esc(url)+'" alt="Foto profil">':'<span class="ua-avatar ua-avatar-fallback '+size+'">'+esc(String(name||'P').trim().slice(0,1).toUpperCase())+'</span>';
const notify=message=>{let el=document.querySelector('.pl-public-toast');if(!el){el=document.createElement('div');el.className='pl-public-toast';el.setAttribute('role','status');document.body.append(el);}el.textContent=message;el.classList.add('is-visible');clearTimeout(el._hideTimer);el._hideTimer=setTimeout(()=>el.classList.remove('is-visible'),2200);};
export async function bindPublicPostFeed({target,db,viewer}={}){
 const {data:rows,error}=await db.from('user_posts').select('id,user_id,caption,media_path,media_type,tags,created_at,profile_context,professional_profile_id,business_store_id').eq('visibility','public').eq('moderation_status','published').order('created_at',{ascending:false}).limit(30);
 if(error)throw error;
 if(!rows?.length){target.innerHTML='<div class="pl-feed-empty"><h3>Belum ada postingan publik</h3><p>Konten komunitas yang dibagikan secara publik akan muncul di sini.</p><a href="#/account/auth?mode=register">Buat akun Pluits</a></div>';return;}
 const ids=[...new Set(rows.map(x=>x.user_id))],postIds=rows.map(p=>p.id);
 const [profiles,mediaRows,likes,comments,saves]=await Promise.all([
  db.from('user_profiles').select('id,display_name,username,avatar_path,visibility').in('id',ids),
  db.from('post_media').select('id,post_id,user_id,media_path,media_type,position,duration_ms').in('post_id',postIds).order('position',{ascending:true}),
  db.from('post_likes').select('post_id,user_id').in('post_id',postIds),
  db.from('post_comments').select('post_id').in('post_id',postIds),
  viewer?db.from('post_saves').select('post_id,user_id').in('post_id',postIds).eq('user_id',viewer.id):Promise.resolve({data:[],error:null})
 ]);
 const queryError=profiles.error||mediaRows.error||likes.error||comments.error||saves.error;if(queryError)throw queryError;
 const profileMap=new Map((profiles.data||[]).map(p=>[p.id,p])),grouped=new Map();
 (mediaRows.data||[]).forEach(item=>{const list=grouped.get(item.post_id)||[];list.push(item);grouped.set(item.post_id,list);});
 const likeRows=likes.data||[],commentRows=comments.data||[],savedIds=new Set((saves.data||[]).map(x=>x.post_id));
 const paths=[...(profiles.data||[]).map(p=>p.avatar_path),...(mediaRows.data||[]).map(m=>m.media_path),...rows.map(p=>p.media_path)].filter(Boolean);
 const urls=await createSignedUrlMap(db.storage,'pluits-user-media',paths,1800);
 const cards=rows.map(post=>{
  const owner=profileMap.get(post.user_id)||{display_name:'Pengguna PLUITS',username:'pengguna'};
  if(owner.visibility==='private')return '';
  const gallery=grouped.get(post.id)||[],source=gallery.length?gallery:(post.media_path?[{media_path:post.media_path,media_type:post.media_type,position:0}]:[]);
  const media=source.map(item=>({...item,url:urls.get(item.media_path)||''})).filter(item=>item.url);
  return renderPostCard({...post,owner,media,avatarUrl:urls.get(owner.avatar_path)||'',likes:likeRows.filter(x=>x.post_id===post.id).length,liked:!!viewer&&likeRows.some(x=>x.post_id===post.id&&x.user_id===viewer.id),comments:commentRows.filter(x=>x.post_id===post.id).length,saved:savedIds.has(post.id),storyItems:[]},{user:viewer,avatar,socialIcon,renderActions:renderPostActions,esc});
 }).filter(Boolean);
 target.innerHTML=cards.length?'<div class="ua-profile-post-feed pl-public-post-feed">'+cards.join('')+'</div>':'<div class="pl-feed-empty"><h3>Belum ada postingan publik</h3><p>Konten publik komunitas PLUITS akan muncul di sini.</p></div>';
 target.querySelectorAll('.ua-post-card').forEach(card=>{
  const postId=card.dataset.postId;
  bindPostLikeInteractions({card,postId,user:viewer,supabaseClient:db,notify,socialIcon,documentRef:document});
  card.querySelector('[data-action="comments"]')?.addEventListener('click',async()=>{
   const box=card.querySelector('.ua-comments');if(!box)return;box.hidden=!box.hidden;
   if(!box.hidden&&!box.dataset.loaded){box.dataset.loaded='1';await loadPostComments({postId,box,supabaseClient:db,user:viewer,notify,escapeHtml:esc,socialIcon,documentRef:document});}
  });
  card.querySelector('[data-action="share"]')?.addEventListener('click',async()=>{
   const url=location.origin+location.pathname+'#/account/post/'+postId;
   try{if(navigator.share)await navigator.share({title:'Postingan PLUITS',url});else if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(url);notify('Tautan disalin.');}else location.hash='/account/post/'+postId;}catch{}
  });
  card.querySelector('[data-action="save"]')?.addEventListener('click',async event=>{
   const button=event.currentTarget;if(!viewer){location.hash='#/account/auth?mode=login';return;}if(button.disabled)return;button.disabled=true;
   try{const saved=button.classList.contains('is-saved');const result=saved?await db.from('post_saves').delete().eq('post_id',postId).eq('user_id',viewer.id):await db.from('post_saves').insert({post_id:postId,user_id:viewer.id});if(result.error)throw result.error;button.classList.toggle('is-saved',!saved);notify(saved?'Postingan dihapus dari koleksi.':'Postingan disimpan.');}
   catch(error){notify(error.message||'Postingan belum berhasil disimpan.');}finally{button.disabled=false;}
  });
  card.querySelector('[data-post-menu]')?.addEventListener('click',event=>{const menu=card.querySelector('.ua-post-menu');if(!menu)return;menu.hidden=!menu.hidden;event.currentTarget.setAttribute('aria-expanded',String(!menu.hidden));});
  card.querySelector('[data-action="report"]')?.addEventListener('click',async()=>{
   if(!viewer){location.hash='#/account/auth?mode=login';return;}const reason=prompt('Alasan laporan: spam, harassment, hate, violence, nudity, scam, misinformation, atau other','other');if(!reason)return;
   if(!['spam','harassment','hate','violence','nudity','scam','misinformation','other'].includes(reason)){notify('Pilih alasan laporan yang tersedia.');return;}
   const {error}=await db.from('content_reports').insert({reporter_user_id:viewer.id,target_type:'post',target_id:postId,reason});notify(error?.message||'Laporan berhasil dikirim untuk ditinjau.');
  });
  card.querySelector('[data-action="mute-user"]')?.addEventListener('click',async()=>{
   if(!viewer){location.hash='#/account/auth?mode=login';return;}const ownerId=card.dataset.ownerId;if(!confirm('Sembunyikan semua konten dari akun ini?'))return;
   const {error}=await db.from('user_hidden_content').upsert({viewer_id:viewer.id,target_type:'user',target_id:ownerId},{onConflict:'viewer_id,target_type,target_id',ignoreDuplicates:true});
   if(error)notify(error.message);else{notify('Konten akun ini disembunyikan.');target.querySelectorAll('.ua-post-card[data-owner-id="'+ownerId+'"]').forEach(item=>item.remove());}
  });
 });
 normalizeFeedMediaFrames(target);bindPostGalleries(target);
}
