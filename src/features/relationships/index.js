export async function renderFollowListPage({kind='followers',user,supabaseClient,navProfile=()=>'',avatar=()=>'',escapeHtml=value=>String(value??'')}={}){
 const incoming=kind==='followers';
 const {data,error}=await supabaseClient.from('user_follows').select('follower_id,following_id,status,created_at').eq(incoming?'following_id':'follower_id',user.id).order('created_at',{ascending:false}).limit(100);
 if(error)throw error;
 const rows=data||[],ids=[...new Set(rows.map(row=>incoming?row.follower_id:row.following_id))];
 const profiles=ids.length?await supabaseClient.rpc('get_user_profile_directory_by_ids',{p_ids:ids}):{data:[],error:null};
 if(profiles.error)throw profiles.error;
 const people=new Map((profiles.data||[]).map(person=>[person.id,person]));
 const title=incoming?'Pengikut':'Mengikuti';
 return `<div class="ua-page-heading"><div><span class="ua-eyebrow">JARINGAN KOMUNITAS</span><h1>${title}</h1><p>${incoming?'Kelola pengikut dan permintaan mengikuti akun Anda.':'Akun yang Anda ikuti dan permintaan yang masih menunggu.'}</p></div><a class="ua-outline" href="#/account/profile">Kembali ke profil</a></div>
 ${navProfile()}
 <section class="ua-panel ua-follow-list">${rows.length?rows.map(row=>{
  const id=incoming?row.follower_id:row.following_id,person=people.get(id);
  if(!person)return '';
  const pending=row.status==='pending';
  return `<article class="ua-follow-row"><a href="#/@${encodeURIComponent(person.username)}" class="ua-follow-person">${avatar('',person.display_name)}<span><strong>${escapeHtml(person.display_name)}</strong><small>@${escapeHtml(person.username)}</small></span></a><div class="ua-follow-actions">${pending?incoming?`<button class="ua-primary ua-inline" data-follow-accept="${id}">Terima</button><button class="ua-outline" data-follow-remove="${id}">Tolak</button>`:`<span class="ua-follow-pending">Menunggu</span><button class="ua-outline" data-follow-remove="${id}">Batalkan</button>`:`<span class="ua-follow-pending">Mengikuti</span><button class="ua-outline" data-follow-remove="${id}">${incoming?'Hapus':'Berhenti'}</button>`}</div></article>`;
 }).join(''):'<div class="ua-empty"><strong>Belum ada data</strong><p>Aktivitas mengikuti akun akan tampil di sini.</p></div>'}</section>`;
}
export function bindRelationshipFollowActions({documentRef=document,supabaseClient,user,notify=()=>{},mountAccount=()=>{},locationRef=location}={}){
 documentRef.querySelectorAll('[data-follow-target]').forEach(button=>button.addEventListener('click',async()=>{
  if(button.disabled)return;
  const target=button.dataset.followTarget,state=button.dataset.followState,username=button.dataset.followUsername;
  button.disabled=true;
  try{
   if(state==='accepted'||state==='pending'){
    const {error}=await supabaseClient.from('user_follows').delete().eq('follower_id',user.id).eq('following_id',target);
    if(error)throw error;
    notify(state==='pending'?'Permintaan mengikuti dibatalkan.':'Anda berhenti mengikuti akun ini.');
   }else{
    const {error}=await supabaseClient.from('user_follows').insert({follower_id:user.id,following_id:target});
    if(error&&error.code!=='23505')throw error;
    notify('Permintaan mengikuti berhasil dikirim.');
   }
   await mountAccount('user',username);
  }catch(error){notify(error.message||'Tidak dapat memperbarui hubungan.','error');button.disabled=false;}
 }));
 documentRef.querySelectorAll('[data-follow-accept]').forEach(button=>button.addEventListener('click',async()=>{
  const follower=button.dataset.followAccept;button.disabled=true;
  const {error}=await supabaseClient.from('user_follows').update({status:'accepted'}).eq('follower_id',follower).eq('following_id',user.id).eq('status','pending');
  if(error){notify(error.message,'error');button.disabled=false;}else{notify('Permintaan mengikuti diterima.');await mountAccount('followers');}
 }));
 documentRef.querySelectorAll('[data-follow-remove]').forEach(button=>button.addEventListener('click',async()=>{
  const other=button.dataset.followRemove,incoming=locationRef.hash.includes('/followers')||locationRef.hash.includes('/requests');
  const followerId=incoming?other:user.id,followingId=incoming?user.id:other;
  const result=await supabaseClient.from('user_follows').delete().eq('follower_id',followerId).eq('following_id',followingId);
  if(result.error){notify(result.error.message,'error');return;}
  notify(incoming?'Pengikut dihapus.':'Anda berhenti mengikuti akun ini.');
  await mountAccount(incoming?'followers':'following');
 }));
}
