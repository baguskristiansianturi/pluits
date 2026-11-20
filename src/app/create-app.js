import { resolveAuthenticatedRoute, resolveRoute } from './routes.js';
import { restoreInitialSession } from './restore-initial-session.js';
import { createPreviewTools } from './preview-tools.js';
import { routeHref } from '../config/paths.js';
import { mountHomePage } from '../features/home/home-page.js';
import { mountBusinessHomePage } from '../features/home/business-home-page.js';
import { mountMarketplaceHomePage } from '../features/marketplace/marketplace-home-page.js';
import { mountMarketplaceProductPage } from '../features/marketplace/marketplace-product-page.js';
import { mountDiscoverPage, mountMessagesPage, mountProfilePage, mountSettingsPage } from '../features/social/social-pages.js';
import { mountDashboardPage } from '../features/dashboard/dashboard-page.js';
import { mountAuthPage } from '../features/auth/auth-page.js';
import { mountPolicyPage } from '../features/legal/policy-page.js';
import { mountPublicInfoPage } from '../features/public-info/public-info-page.js';
export function createApp({root,authService}) {
 let session=null,ready=false,cleanupPage=null,previewCleanup=null;
 const attachPreviewTools=()=>{if(authService.isLocalDemo)previewCleanup=createPreviewTools(root);};
 const navigate=route=>{const next=routeHref(route);if(window.location.hash===next){render();return;}window.location.hash=next;};
 function render(){
  cleanupPage?.();cleanupPage=null;
  previewCleanup?.();previewCleanup=null;
  if(!ready){root.innerHTML='<main class="app-loading" role="status">Menyiapkan PLUITS…</main>';return;}
  const requested=resolveRoute(window.location.hash,window.location.search);
  const route=resolveAuthenticatedRoute(requested,Boolean(session));
  if(route!==requested){navigate(route);return;}
  if(route==='home'){mountBusinessHomePage({root,user:session?.user||null});attachPreviewTools();return;}
  if(route==='marketplace'){cleanupPage=mountMarketplaceHomePage({root,user:session?.user||null});attachPreviewTools();return;}
  if(route==='product'){cleanupPage=mountMarketplaceProductPage({root,user:session?.user||null});attachPreviewTools();return;}
  if(route==='social'){cleanupPage=mountHomePage({root,user:session?.user||null,onSignOut:()=>authService.signOut()});attachPreviewTools();return;}
  if(route==='circle'){navigate('social');return;}
  if(route==='messages'){mountMessagesPage({root,user:session?.user||null});attachPreviewTools();return;}
  if(route==='profile'){cleanupPage=mountProfilePage({root,user:session?.user||null});attachPreviewTools();return;}
  if(route==='settings'){cleanupPage=mountSettingsPage({root,user:session?.user||null,onSignOut:()=>authService.signOut(),onUpdateProfile:updates=>authService.updateProfile?.(updates)});attachPreviewTools();return;}
  if(route==='discover'){mountDiscoverPage({root,user:session?.user||null});attachPreviewTools();return;}
  if(route==='dashboard'){mountDashboardPage({root,user:session.user,onSignOut:()=>authService.signOut()});attachPreviewTools();return;}
  if(route==='terms'||route==='privacy'){mountPolicyPage({root,type:route});attachPreviewTools();return;}
  if(['about','help','faq','contact','guidelines','marketplaceInfo','sellerTerms','paymentPolicy','refundPolicy','shippingPolicy','accountDeletion','safety','cookies','privacyChoices','complaints','prohibitedItems'].includes(route)){mountPublicInfoPage({root,type:route});attachPreviewTools();return;}
  mountAuthPage({root,mode:route,authService,hasRecoverySession:Boolean(session),onAuthenticated(nextSession){session=nextSession;navigate('social');}});
  attachPreviewTools();
 }
 const unsubscribe=authService.subscribe((event,nextSession)=>{
  session=nextSession;
  if(event==='PASSWORD_RECOVERY'){const url=new URL(window.location.href);url.searchParams.set('auth','reset');window.history.replaceState(null,'',url);}
  if(event==='SIGNED_OUT'&&ready&&['dashboard','social','messages','profile','settings'].includes(resolveRoute(window.location.hash,window.location.search))){navigate('home');return;}
  if(ready&&['INITIAL_SESSION','SIGNED_IN','SIGNED_OUT','PASSWORD_RECOVERY','USER_UPDATED'].includes(event))render();
 });
 const onRouteChange=()=>render();window.addEventListener('hashchange',onRouteChange);window.addEventListener('popstate',onRouteChange);
 const initialSession = authService.isLocalDemo
  ? Promise.resolve(authService.demoSignIn())
  : restoreInitialSession(authService);
 initialSession.then(initial=>{session=initial;ready=true;if(initial&&!window.location.hash){window.location.hash=routeHref('social');return;}render();});
 return ()=>{cleanupPage?.();unsubscribe();window.removeEventListener('hashchange',onRouteChange);window.removeEventListener('popstate',onRouteChange);};
}