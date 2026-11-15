export async function renderPublicProfilePage({
 username,
 user,
 supabaseClient,
 signed,
 hydratePosts,
 setProfileReels=()=>{},
 postGrid=()=> '',
 profileMenuMarkup=()=> '',
 avatar=()=> '',
 escapeHtml=value=>String(value??''),
 updateSEO=()=>{},
 renderOwnProfile=async()=> '',
 historyRef=history,
 locationRef=location
}={}){
 const {data,error}=await supabaseClient.rpc('get_user_profile_directory',{p_username:username});
 if(error)throw error;
 const target=Array.isArray(data)?data[0]:data;
 if(!target)throw new Error('Profil tidak ditemukan atau tidak tersedia.');
 const isOwner=!!user&&target.id===user.id;
 if(isOwner){
  historyRef.replaceState(null,'',locationRef.pathname+locationRef.search+'#/account/profile');
  return renderOwnProfile();
 }
 updateSEO({title:target.display_name+' (@'+target.username+') — Pluits',description:(target.bio||'Lihat foto, video, dan aktivitas '+target.display_name+' di Pluits.').slice(0,160),path:'#/@'+encodeURIComponent(target.username)});
 let relation=null;
 if(user){
  const {data:follow,error:followError}=await supabaseClient.from('user_follows').select('follower_id,following_id,status').eq('follower_id',user.id).eq('following_id',target.id).maybeSingle();
  if(followError)throw followError;
  relation=follow;
 }
 const {data:countsData,error:countsError}=await supabaseClient.rpc('get_user_follow_counts',{p_user_id:target.id});
 if(countsError)throw countsError;
 const counts=Array.isArray(countsData)?countsData[0]:(countsData||{});
 const [avatarUrl,coverUrl]=await Promise.all([signed(target.avatar_path),signed(target.cover_path)]);
 let posts=[];
 if(target.visibility==='public'||isOwner||relation?.status==='accepted'){
  const {data:rows,error:postsError}=await supabaseClient.from('user_posts').select('*').eq('user_id',target.id).eq('visibility','public').eq('moderation_status','published').order('created_at',{ascending:false}).limit(60);
  if(postsError)throw postsError;
  posts=await hydratePosts(rows||[]);
 }
 const canSeeCounts=target.visibility==='public'||isOwner||relation?.status==='accepted';
 const reels=posts.filter(post=>post.media?.length===1&&post.media[0].media_type==='video'&&Number(post.media[0].duration_ms||0)>0&&Number(post.media[0].duration_ms||0)<=60000);
 setProfileReels(reels);
 const followLabel=isOwner?'Edit profil':relation?.status==='accepted'?'Mengikuti':relation?.status==='pending'?'Permintaan terkirim':target.visibility==='private'?'Minta mengikuti':'Ikuti';
 const action=isOwner?'<a class="ua-primary ua-inline" href="#/account/profile">Edit profil</a>':user?'<button type="button" class="ua-primary ua-inline" data-follow-target="'+target.id+'" data-follow-state="'+(relation?.status||'')+'" data-follow-username="'+escapeHtml(target.username)+'" '+(relation?.status==='pending'&&relation.follower_id!==user.id?'disabled':'')+'>'+followLabel+'</button>':'<a class="ua-primary ua-inline" href="#/account/login">Masuk untuk mengikuti</a>';
 const postsMarkup=target.visibility==='private'&&!isOwner&&relation?.status!=='accepted'?'<div class="ua-empty"><strong>Akun ini privat</strong><p>Ajukan permintaan mengikuti untuk melihat postingan akun ini.</p></div>':posts.length?postGrid(posts):'<div class="ua-empty"><strong>Belum ada postingan</strong><p>Postingan publik akan tampil di sini.</p></div>';
 return `<section class="ua-profile-card ua-public-profile">
  ${profileMenuMarkup()}
  <div class="ua-cover" ${coverUrl?`style="background-image:url('${coverUrl}')"`:''}><span>PLUITS PROFILE</span></div>
  <div class="ua-profile-content"><div class="ua-profile-avatar">${avatar(avatarUrl,target.display_name,'large')}</div>
   <div class="ua-profile-identity"><div class="ua-profile-name-row"><div><h2>${escapeHtml(target.display_name)}</h2><div class="ua-username">@${escapeHtml(target.username)}</div></div></div>
    <p>${escapeHtml(target.bio||'')}</p><div class="ua-location">${target.public_city&&target.public_province?'⌖ '+escapeHtml(target.public_city)+', '+escapeHtml(target.public_province):''}</div>
    <div class="ua-profile-stats"><span><strong>${canSeeCounts?posts.length:'—'}</strong><span>Postingan</span></span><span><strong>${canSeeCounts?(counts.followers_count??0):'—'}</strong><span>Pengikut</span></span><span><strong>${canSeeCounts?(counts.following_count??0):'—'}</strong><span>Mengikuti</span></span></div>
    ${action}
   </div>
  </div>
 </section>
 <nav class="ua-profile-tabs" role="tablist" aria-label="Konten profil" data-profile-username="${escapeHtml(target.username)}" data-profile-owner-id="${target.id}">
  <button class="active" type="button" role="tab" aria-selected="true" data-profile-tab="posts" title="Feed"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg><span>Feed</span></button>
  <button type="button" role="tab" aria-selected="false" data-profile-tab="reels" title="Reels"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="m10 8 6 4-6 4z"/></svg><span>Reels</span></button>
  <button type="button" role="tab" aria-selected="false" data-profile-tab="trip" title="Trip"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg><span>Trip</span></button>
  <button type="button" role="tab" aria-selected="false" data-profile-tab="blog" title="Blog"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 1 4 17.5z"/><path d="M4 17.5A2.5 2.5 0 0 1 6.5 15H20M8 7h8M8 10h8"/></svg><span>Blog</span></button>
 </nav>
 <section id="ua-profile-tab-content" class="ua-profile-tab-content" role="tabpanel">${postsMarkup}</section>`;
}
