export function bindRecommendationFollowActions({documentRef=document,supabaseClient,user,notify=()=>{}}={}){
 documentRef.querySelectorAll('[data-people-demo-follow]').forEach(button=>button.addEventListener('click',()=>{
  const followed=button.getAttribute('aria-pressed')==='true';
  button.setAttribute('aria-pressed',String(!followed));
  button.setAttribute('aria-label',followed?'Ikuti':'Mengikuti');
  button.title=followed?'Ikuti':'Mengikuti';
  button.innerHTML='<span aria-hidden="true">'+(followed?'+':'✓')+'</span>';
 }));
 documentRef.querySelectorAll('[data-people-follow]').forEach(button=>button.addEventListener('click',async()=>{
  if(button.disabled)return;
  const target=button.dataset.peopleFollow,state=button.dataset.followState||'';
  button.disabled=true;
  try{
   if(state==='accepted'||state==='pending'){
    const {error}=await supabaseClient.from('user_follows').delete().eq('follower_id',user.id).eq('following_id',target);
    if(error)throw error;
    button.dataset.followState='';button.setAttribute('aria-pressed','false');button.setAttribute('aria-label','Ikuti akun');button.title='Ikuti';button.innerHTML='<span aria-hidden="true">+</span>';
    notify('Anda berhenti mengikuti akun ini.');
   }else{
    const {error}=await supabaseClient.from('user_follows').insert({follower_id:user.id,following_id:target});
    if(error&&error.code!=='23505')throw error;
    const privateTarget=button.dataset.profileVisibility==='private';
    button.dataset.followState=privateTarget?'pending':'accepted';
    button.setAttribute('aria-pressed','true');button.setAttribute('aria-label',privateTarget?'Permintaan terkirim':'Mengikuti');button.title=privateTarget?'Permintaan terkirim':'Mengikuti';button.innerHTML='<span aria-hidden="true">✓</span>';
    notify(privateTarget?'Permintaan mengikuti berhasil dikirim.':'Anda sekarang mengikuti akun ini.');
   }
  }catch(error){notify(error.message||'Tidak dapat memperbarui hubungan.','error');}
  finally{button.disabled=false;}
 }));
}
