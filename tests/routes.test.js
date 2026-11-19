import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {resolveRoute,resolveAuthenticatedRoute} from '../src/app/routes.js';
import {APP_ROUTES,routeHref} from '../src/config/paths.js';
import {PUBLIC_INFO_PAGES} from '../src/features/public-info/pages/index.js';
test('Social app and account settings routes',()=>{assert.deepEqual(Object.keys(APP_ROUTES),['home','social','circle','discover','dashboard','messages','profile','settings','register','login','forgot','reset','terms','privacy','about','help','faq','contact','guidelines','marketplaceInfo','sellerTerms','paymentPolicy','refundPolicy','shippingPolicy','accountDeletion','safety','cookies','privacyChoices','complaints','prohibitedItems']);assert.equal(resolveRoute('/pluits/',''),'home');assert.equal(resolveRoute('/pluits/circle/',''),'circle');assert.equal(resolveRoute('/pluits/discover/',''),'discover');assert.equal(resolveRoute('/pluits/social/',''),'social');assert.equal(resolveRoute('/pluits/messages/',''),'messages');assert.equal(resolveRoute('/pluits/profile/',''),'profile');assert.equal(resolveRoute('/pluits/settings/',''),'settings');assert.equal(routeHref('home'),'/pluits/');assert.equal(routeHref('settings'),'/pluits/settings/');});
test('authenticated app routes require a session',()=>{for(const route of ['dashboard','social','messages','profile','settings'])assert.equal(resolveAuthenticatedRoute(route,false),'login');assert.equal(resolveAuthenticatedRoute('settings',true),'settings');assert.equal(resolveAuthenticatedRoute('home',true),'home');assert.equal(resolveAuthenticatedRoute('circle',true),'social');assert.equal(resolveAuthenticatedRoute('login',true),'social');});
test('shared brand always returns to public business homepage',async()=>{const shell=await readFile(new URL('../src/design-system/page-shell.js',import.meta.url),'utf8');assert.match(shell,/routeHref\('home'\)/);});
test('social app surfaces have native app navigation and no website footer',async()=>{const social=await readFile(new URL('../src/features/social/social-pages.js',import.meta.url),'utf8');assert.match(social,/global-bottom-nav/);assert.match(social,/mountSettingsPage/);assert.doesNotMatch(social,/renderPageFooter/);assert.match(social,/data-sign-out/);assert.match(social,/routeHref\('settings'\)/);});
test('login routes authenticated users to the social app',async()=>{const app=await readFile(new URL('../src/app/create-app.js',import.meta.url),'utf8');assert.match(app,/navigate\('social'\)/);assert.match(app,/mountSettingsPage/);assert.match(app,/onSignOut:\(\)=>authService\.signOut\(\)/);});
test('foundation spacing token remains the single shared contract',async()=>{const [tokens,shell]=await Promise.all([readFile(new URL('../src/design-system/tokens.css',import.meta.url),'utf8'),readFile(new URL('../src/design-system/page-shell.css',import.meta.url),'utf8')]);assert.equal((tokens.match(/--pl-shell-header-content-gap:/g)||[]).length,1);assert.ok(tokens.includes('--pl-shell-header-content-gap: 50px;'));assert.ok(shell.includes('padding-block-start: var(--pl-shell-header-content-gap);'));});
test('profile screen uses a borderless identity card and profile controls',async()=>{const social=await readFile(new URL('../src/features/social/social-pages.js',import.meta.url),'utf8');const css=await readFile(new URL('../src/features/social/social-pages.css',import.meta.url),'utf8');assert.match(social,/social-profile-gear/);assert.match(social,/social-account-badge/);assert.match(social,/Pengikut/);assert.match(social,/Mengikuti/);assert.match(social,/Diikuti/);assert.match(social,/Pengaturan Profil Cepat/);assert.match(social,/Privasi profil · Publik \/ Privat/);assert.match(css,/\.social-profile-card\{[^}]*border:0/s);});

test('public information routes resolve and are publicly accessible',async()=>{const {readFile:read}=await import('node:fs/promises');const paths=await read(new URL('../src/config/paths.js',import.meta.url),'utf8');const app=await read(new URL('../src/app/create-app.js',import.meta.url),'utf8');for(const route of ['about','help','faq','contact','guidelines','marketplaceInfo','sellerTerms','paymentPolicy','refundPolicy','shippingPolicy','accountDeletion','safety','cookies','privacyChoices','complaints','prohibitedItems']){assert.ok(paths.includes(route+':'));assert.ok(app.includes("'"+route+"'"));}});
test('public footer uses canonical shared renderer and contains all key policy/help routes',async()=>{const footer=await readFile(new URL('../src/features/public-info/public-footer.js',import.meta.url),'utf8');const home=await readFile(new URL('../src/features/home/business-home-page.js',import.meta.url),'utf8');assert.match(footer,/renderPageFooter/);assert.match(home,/renderPublicFooter/);for(const label of ['Pusat Bantuan','Hubungi Kami','Kebijakan Privasi','Penghapusan Akun','Pembatalan & Pengembalian Dana'])assert.ok(footer.includes(label));});

test('hyphenated public URLs resolve to their registered route keys',()=>{assert.equal(resolveRoute('/pluits/marketplace-info/',''),'marketplaceInfo');assert.equal(resolveRoute('/pluits/seller-terms/',''),'sellerTerms');assert.equal(resolveRoute('/pluits/payment-policy/',''),'paymentPolicy');assert.equal(resolveRoute('/pluits/account-deletion/',''),'accountDeletion');assert.equal(resolveRoute('/pluits/privacy-choices/',''),'privacyChoices');assert.equal(resolveRoute('/pluits/complaints/',''),'complaints');assert.equal(resolveRoute('/pluits/prohibited-items/',''),'prohibitedItems');});
test('authentication pages use the same complete public footer',async()=>{const auth=await readFile(new URL('../src/features/auth/auth-page.js',import.meta.url),'utf8');assert.match(auth,/renderPublicFooter/);assert.doesNotMatch(auth,/renderPageFooter/);});


test('shared page headers and brand sizing follow one responsive foundation',async()=>{
 const read=path=>readFile(new URL(path,import.meta.url),'utf8');
 const [tokens,shell,global,home,business,dashboard,social,homePage,businessPage,authPage,dashboardPage]=await Promise.all([
  read('../src/design-system/tokens.css'),
  read('../src/design-system/page-shell.css'),
  read('../src/styles/global.css'),
  read('../src/features/home/home-page.css'),
  read('../src/features/home/business-home.css'),
  read('../src/features/dashboard/dashboard-page.css'),
  read('../src/features/social/social-pages.css'),
  read('../src/features/home/home-page.js'),
  read('../src/features/home/business-home-page.js'),
  read('../src/features/auth/auth-page.js'),
  read('../src/features/dashboard/dashboard-page.js')
 ]);
 assert.match(tokens,/--pl-shell-header-height:\s*82px/);
 assert.match(tokens,/--pl-shell-header-height-mobile:\s*68px/);
 assert.match(tokens,/--pl-brand-logo-size:\s*34px/);
 assert.match(tokens,/--pl-brand-lockup-gap:\s*4px/);
 assert.match(shell,/\.pl-page-header\s*\{[^}]*height:\s*var\(--pl-shell-header-height\)/s);
 assert.match(shell,/\.pl-page-header\s*\{[^}]*height:\s*var\(--pl-shell-header-height-mobile\)/s);
 assert.match(global,/\.pluits-brand img\s*\{[^}]*width:\s*var\(--pl-brand-logo-size\)[^}]*height:\s*var\(--pl-brand-logo-size\)/s);
 for(const css of [home,business,dashboard,social]) assert.doesNotMatch(css,/\.pl-page-header[^}]*min-height\s*:/s);
 assert.doesNotMatch(home,/\.global-header\s*\{[^}]*min-height\s*:/s);
 assert.match(homePage,/className:'global-header'/);assert.match(homePage,/dataGlobalHeader:true/);
 assert.match(businessPage,/renderPageHeader\(/);
 assert.match(authPage,/renderPageHeader\(/);
 assert.match(dashboardPage,/renderPageHeader\(/);
});


test('legal policy pages contain structured draft disclosures and accessible section navigation',async()=>{
 const [policy,terms,privacy,css]=await Promise.all([
  readFile(new URL('../src/features/legal/policy-page.js',import.meta.url),'utf8'),
  readFile(new URL('../src/features/legal/pages/terms/index.js',import.meta.url),'utf8'),
  readFile(new URL('../src/features/legal/pages/privacy/index.js',import.meta.url),'utf8'),
  readFile(new URL('../src/features/legal/policy-page.css',import.meta.url),'utf8')
 ]);
 assert.match(terms,/Ketentuan Layanan/);
 assert.match(privacy,/Rancangan privasi/);
 assert.match(privacy,/audit data dan tinjauan hukum/);
 assert.match(policy,/aria-label="Daftar isi"/);
 assert.match(privacy,/Penghapusan akun/);
 assert.match(privacy,/Penyedia dan pembagian data/);
 assert.match(terms,/belum berlaku sebagai dokumen final/);
 assert.match(css,/\.policy-section\s*\{/);
 assert.match(css,/\.policy-contents\s*\{/);
});

test('public homepage does not expose a development workspace entry',async()=>{const home=await readFile(new URL('../src/features/home/business-home-page.js',import.meta.url),'utf8');assert.doesNotMatch(home,/Ruang Kerja|business-workspace-entry|pluits-demo/);});

test('every configured route has a clean direct URL and round-trips to its route key',()=>{
 for(const [key,slug] of Object.entries(APP_ROUTES)){
  const href=routeHref(key);
  assert.equal(href,slug?'/pluits/'+slug+'/':'/pluits/');
  assert.equal(resolveRoute(href,''),key);
  assert.doesNotMatch(href,/#/);
 }
});

test('every public footer information page is owned by a grouped page module',()=>{
 const expected=['about','help','faq','contact','guidelines','marketplaceInfo','sellerTerms','paymentPolicy','refundPolicy','shippingPolicy','accountDeletion','safety','cookies','privacyChoices','complaints','prohibitedItems'];
 assert.deepEqual(Object.keys(PUBLIC_INFO_PAGES).sort(),expected.sort());
 for(const key of expected){
  const page=PUBLIC_INFO_PAGES[key];
  assert.ok(page.title,key+' title');
  assert.ok(page.intro,key+' intro');
  assert.ok(page.status,key+' status');
  assert.ok(Array.isArray(page.sections) && page.sections.length>0,key+' sections');
 }
});
