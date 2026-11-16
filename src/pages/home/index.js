import '../../../styles/home-layout.css';
import {bindPublicPostFeed} from '../../features/public-home/post-feed.js';
import {bindPublicNavbar} from '../../features/public-home/navbar.js';
import {homeNearbySection,bindHomeNearby} from '../directory/index.js';
import {createSignedUrlMap} from '../../services/storage/signed-urls.js';
import { supabase as db } from '../../lib/supabase/client.js';
import {renderPublicHomeLayout} from '../../features/public-home/layout.js';

const safe=v=>String(v??'').replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
export function home(){
 const guestMode=(location.hash||'').startsWith('#/guest');
 const image=(id)=>'https://images.unsplash.com/'+id+'?auto=format&fit=crop&w=900&q=82';
 return renderPublicHomeLayout({image,nearbyContent:homeNearbySection()});
}
export async function bindHome(){
 const requestHash=location.hash||'#/';
 const routeVersion=window.__pluitsRouteVersion||0;
 const stillOnRequestedHome=()=>((location.hash||'#/')===requestHash)&&((window.__pluitsRouteVersion||0)===routeVersion);
 const guestMode=requestHash.startsWith('#/guest');
 bindPublicNavbar();
 const target=document.querySelector('#pl-public-feed');if(!target||!stillOnRequestedHome())return;
 try{
  const {data:{user:actualViewer}}=await db.auth.getUser();
  if(!stillOnRequestedHome())return;
  const viewer=actualViewer;
  // The global homepage is public and remains available to signed-in users.
  // Keep the active session so public posts can show personalized actions.
  const accountActions=document.querySelector('.pl-public-navbar-actions');
  if(viewer&&accountActions)accountActions.innerHTML='<a href="#/circle">Circle</a><a class="pl-social-signup" href="#/profile">Profil</a>';
  bindHomeNearby({personalize:false});

  await bindPublicPostFeed({target,db,viewer});
 }catch(err){target.innerHTML='<div class="pl-feed-empty"><h3>Feed belum dapat dimuat</h3><p>Silakan muat ulang halaman beberapa saat lagi.</p><a href="#/account/explore">Buka Explore setelah masuk</a></div>';}
}