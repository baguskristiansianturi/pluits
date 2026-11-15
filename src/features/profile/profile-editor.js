export function validatePersonalUsername(value){
 const username=String(value||'').trim().toLowerCase();
 if(!/^[a-z0-9](?:[a-z0-9._-]{1,28}[a-z0-9])$/.test(username)||username.includes('..'))return 'Username 3–30 karakter; gunakan huruf kecil, angka, titik, garis bawah, atau tanda hubung. Awal/akhir harus huruf atau angka.';
 if(/\.(com|co|co\.id|id|net|org|biz|info|xyz|app|dev|io|me|asia|site|online|store|shop)$/i.test(username))return 'Username tidak boleh menggunakan akhiran seperti nama domain (.com, .co.id, .id, dan sejenisnya).';
 return '';
}
export function validatePersonalDisplayName(value){
 const name=String(value||'').trim();
 if(name.length<2||name.length>80)return 'Nama tampilan harus 2–80 karakter.';
 const first=name.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g,' ').trim().split(' ')[0];
 const entityWords=new Set(['toko','warung','restoran','restaurant','hotel','cafe','kafe','shop','store','market','service','jasa','layanan','tour','travel','transport','clinic','klinik','salon','barbershop','company','perusahaan','official','group','foundation','yayasan','community','komunitas','supplier','distributor','contractor','bengkel','laundry']);
 return entityWords.has(first)?'Nama akun personal tidak boleh diawali nama jenis toko, organisasi, atau layanan. Gunakan nama diri; usaha dapat dibuat melalui Toko/Organisasi.':'';
}
export function bindProfileEditor({
 documentRef=document,
 user,
 getProfile,
 setProfile,
 supabaseClient,
 getImageFrame,
 setImageFrame,
 readImageFrame,
 notify=()=>{},
 updateSEO=()=>{}
}={}){
 const form=documentRef.querySelector('#ua-profile-form');
 form?.addEventListener('submit',async event=>{
  event.preventDefault();
  const fields=new FormData(form),note=documentRef.querySelector('#ua-profile-note'),button=form.querySelector('button[type="submit"]');
  const username=String(fields.get('username')||'').trim().toLowerCase(),displayName=String(fields.get('display_name')||'').trim();
  const usernameError=validatePersonalUsername(username),nameError=validatePersonalDisplayName(displayName);
  if(usernameError){note.textContent=usernameError;form.elements.username.focus();return;}
  if(nameError){note.textContent=nameError;form.elements.display_name.focus();return;}
  const previous={...getProfile()};
  const payload={display_name:displayName,username,bio:String(fields.get('bio')||'').trim(),public_city:String(fields.get('public_city')||'').trim()||null,public_province:String(fields.get('public_province')||'').trim()||null,visibility:String(fields.get('visibility')),show_store:fields.get('show_store')==='on',updated_at:new Date().toISOString()};
  const paintIdentity=person=>{
   documentRef.querySelectorAll('.ua-profile-identity h2,.ua-ac-identity-copy strong').forEach(element=>element.textContent=person.display_name);
   documentRef.querySelectorAll('.ua-username').forEach(element=>element.textContent='@'+person.username);
   documentRef.querySelectorAll('.ua-profile-identity p').forEach(element=>element.textContent=person.bio||'Bio belum ditambahkan.');
   documentRef.querySelectorAll('.ua-location').forEach(element=>element.textContent=person.public_city&&person.public_province?'⌖ '+person.public_city+', '+person.public_province:'');
  };
  button.disabled=true;note.textContent='Menyimpan…';
  setProfile({...getProfile(),...payload});paintIdentity(getProfile());
  const {data,error}=await supabaseClient.from('user_profiles').update(payload).eq('id',user.id).select().single();
  button.disabled=false;
  if(error){setProfile(previous);paintIdentity(previous);note.textContent=error.code==='23505'?'Username sudah digunakan orang lain. Pilih username yang berbeda.':error.message;notify(note.textContent,'error');return;}
  setProfile(data);paintIdentity(data);
  const nextImageFrame=readImageFrame(form,getImageFrame());
  const {error:frameError}=await supabaseClient.from('user_profile_image_frames').upsert({user_id:user.id,...nextImageFrame,updated_at:new Date().toISOString()},{onConflict:'user_id'});
  if(frameError){note.textContent='Profil tersimpan, tetapi pengaturan bingkai foto belum tersimpan: '+frameError.message;notify(note.textContent,'error');}
  else{setImageFrame(nextImageFrame);note.textContent='Profil dan pengaturan foto tersimpan.';notify('Profil berhasil diperbarui.');}
  updateSEO({title:data.display_name+' (@'+data.username+') — Pluits',description:(data.bio||'Profil komunitas '+data.display_name+' di Pluits.').slice(0,160),path:'#/@'+encodeURIComponent(data.username)});
  if(previous.username!==data.username)note.textContent='Tersimpan. Alamat profil baru: @'+data.username;
 });
}
