import '../../../styles/home-layout.css';
import {bindPublicPostFeed} from '../../features/public-home/post-feed.js';
import {bindPublicBlogFeed} from '../../features/public-home/blog-feed.js';
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
 bindPublicNavbar();
 const target=document.querySelector('#pl-public-feed');if(!target||!stillOnRequestedHome())return;
 let viewer=null;
 try{
  const {data:{user:actualViewer}}=await db.auth.getUser();
  viewer=actualViewer||null;
 }catch(authError){
  console.warn('PLUITS public home viewer session:',authError);
 }
 if(!stillOnRequestedHome())return;
 // Public content must remain available even when session lookup or social feed fails.
 const accountActions=document.querySelector('.pl-public-navbar-actions');
 if(viewer&&accountActions)accountActions.innerHTML='<a href="#/circle">Circle</a><a class="pl-social-signup" href="#/profile">Profil</a>';
 bindHomeNearby({personalize:false});
 try{
  if(stillOnRequestedHome())await bindPublicPostFeed({target,db,viewer});
 }catch(postError){
  console.error('PLUITS community social content:',postError);
 }
 try{
  if(stillOnRequestedHome())await bindPublicBlogFeed({target,db});
 }catch(blogError){
  console.error('PLUITS community blog content:',blogError);
 }
}
