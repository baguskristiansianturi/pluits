export function bindProfileImageUpload({
 inputId,
 column,
 label,
 documentRef=document,
 supabaseClient,
 bucket,
 userId,
 notify=()=>{},
 onProfileUpdated=()=>{},
 refreshProfile=()=>{}
}={}){
 const input=documentRef.getElementById(inputId);
 if(!input||!supabaseClient||!userId)return;
 input.addEventListener('change',async()=>{
  const file=input.files?.[0];
  if(!file)return;
  if(file.size>8*1024*1024){notify('Foto maksimal 8 MB.','error');return;}
  if(!['image/jpeg','image/png','image/webp'].includes(file.type)){notify('Gunakan JPG, PNG, atau WebP.','error');return;}
  try{
   notify('Mengunggah '+label+'…','info');
   const ext=file.name.split('.').pop().toLowerCase();
   const path=userId+'/'+(crypto.randomUUID?crypto.randomUUID():Date.now()+'-'+Math.random().toString(36).slice(2))+'.'+ext;
   const {error}=await supabaseClient.storage.from(bucket).upload(path,file,{contentType:file.type,upsert:false});
   if(error)throw error;
   const {data,error:updateError}=await supabaseClient.from('user_profiles').update({[column]:path,updated_at:new Date().toISOString()}).eq('id',userId).select().single();
   if(updateError)throw updateError;
   onProfileUpdated(data);
   notify(label==='avatar'?'Foto profil diperbarui.':'Foto sampul diperbarui.');
   await refreshProfile();
  }catch(error){
   notify(error.message||'Upload gagal.','error');
  }
 });
}
