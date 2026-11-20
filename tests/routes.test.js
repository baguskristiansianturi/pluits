import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {resolveRoute,resolveAuthenticatedRoute} from '../src/app/routes.js';
import {APP_ROUTES,routeHref} from '../src/config/paths.js';
test('Social app and account settings routes',()=>{assert.deepEqual(Object.keys(APP_ROUTES),['home','venue','marketplace','product','social','circle','discover','dashboard','messages','profile','settings','register','login','forgot','reset','terms','privacy','about','help','faq','contact','guidelines','marketplaceInfo','sellerTerms','paymentPolicy','refundPolicy','shippingPolicy','accountDeletion','safety','cookies','privacyChoices','complaints','prohibitedItems']);assert.equal(resolveRoute('', ''),'home');assert.equal(resolveRoute('#/home',''),'home');assert.equal(resolveRoute('#/venue',''),'venue');assert.equal(resolveRoute('#/circle',''),'circle');assert.equal(resolveRoute('#/discover',''),'discover');assert.equal(resolveRoute('#/social',''),'social');assert.equal(resolveRoute('#/messages',''),'messages');assert.equal(resolveRoute('#/profile',''),'profile');assert.equal(resolveRoute('#/settings',''),'settings');assert.equal(routeHref('home'),'#/home');assert.equal(routeHref('venue'),'#/venue');assert.equal(routeHref('settings'),'#/settings');});
test('authenticated app routes require a session',()=>{for(const route of ['dashboard','social','messages','profile','settings'])assert.equal(resolveAuthenticatedRoute(route,false),'login');assert.equal(resolveAuthenticatedRoute('settings',true),'settings');assert.equal(resolveAuthenticatedRoute('home',true),'home');assert.equal(resolveAuthenticatedRoute('circle',true),'social');assert.equal(resolveAuthenticatedRoute('login',true),'social');});
test('shared brand always returns to public business homepage',async()=>{const shell=await readFile(new URL('../src/design-system/page-shell.js',import.meta.url),'utf8');assert.match(shell,/routeHref\('home'\)/);});
test('social app surfaces have native app navigation and no website footer',async()=>{const social=await readFile(new URL('../src/features/social/social-pages.js',import.meta.url),'utf8');assert.match(social,/global-bottom-nav/);assert.match(social,/mountSettingsPage/);assert.doesNotMatch(social,/renderPageFooter/);assert.match(social,/data-sign-out/);assert.match(social,/routeHref\('settings'\)/);});
test('login routes authenticated users to the social app',async()=>{const app=await readFile(new URL('../src/app/create-app.js',import.meta.url),'utf8');assert.match(app,/navigate\('social'\)/);assert.match(app,/mountSettingsPage/);assert.match(app,/onSignOut:\(\)=>authService\.signOut\(\)/);});
test('foundation spacing token remains the single shared contract',async()=>{const [tokens,shell]=await Promise.all([readFile(new URL('../src/design-system/tokens.css',import.meta.url),'utf8'),readFile(new URL('../src/design-system/page-shell.css',import.meta.url),'utf8')]);assert.equal((tokens.match(/--pl-shell-header-content-gap:/g)||[]).length,1);assert.ok(tokens.includes('--pl-shell-header-content-gap: 50px;'));assert.ok(shell.includes('padding-block-start: var(--pl-shell-header-content-gap);'));});
test('profile screen uses a borderless identity card and profile controls',async()=>{const social=await readFile(new URL('../src/features/social/social-pages.js',import.meta.url),'utf8');const css=await readFile(new URL('../src/features/social/social-pages.css',import.meta.url),'utf8');assert.match(social,/social-profile-gear/);assert.match(social,/social-account-badge/);assert.match(social,/Pengikut/);assert.match(social,/Mengikuti/);assert.match(social,/Diikuti/);assert.match(social,/Pengaturan Profil Cepat/);assert.match(social,/Privasi profil · Publik \/ Privat/);assert.match(css,/\.social-profile-card\{[^}]*border:0/s);});

test('public information routes resolve and are publicly accessible',async()=>{const {readFile:read}=await import('node:fs/promises');const paths=await read(new URL('../src/config/paths.js',import.meta.url),'utf8');const app=await read(new URL('../src/app/create-app.js',import.meta.url),'utf8');for(const route of ['about','help','faq','contact','guidelines','marketplaceInfo','sellerTerms','paymentPolicy','refundPolicy','shippingPolicy','accountDeletion','safety','cookies','privacyChoices','complaints','prohibitedItems']){assert.ok(paths.includes(route+':'));assert.ok(app.includes("'"+route+"'"));}});
test('public footer uses canonical shared renderer and contains all key policy/help routes',async()=>{const footer=await readFile(new URL('../src/features/public-info/public-footer.js',import.meta.url),'utf8');const home=await readFile(new URL('../src/features/home/business-home-page.js',import.meta.url),'utf8');assert.match(footer,/renderPageFooter/);assert.match(home,/renderPublicFooter/);for(const label of ['Pusat Bantuan','Hubungi Kami','Kebijakan Privasi','Penghapusan Akun','Pembatalan & Pengembalian Dana'])assert.ok(footer.includes(label));});

test('hyphenated public URLs resolve to their registered route keys',()=>{assert.equal(resolveRoute('#/marketplace-info',''),'marketplaceInfo');assert.equal(resolveRoute('#/seller-terms',''),'sellerTerms');assert.equal(resolveRoute('#/payment-policy',''),'paymentPolicy');assert.equal(resolveRoute('#/account-deletion',''),'accountDeletion');assert.equal(resolveRoute('#/privacy-choices',''),'privacyChoices');assert.equal(resolveRoute('#/complaints',''),'complaints');assert.equal(resolveRoute('#/prohibited-items',''),'prohibitedItems');});
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
 const policy=await readFile(new URL('../src/features/legal/policy-page.js',import.meta.url),'utf8');
 const css=await readFile(new URL('../src/features/legal/policy-page.css',import.meta.url),'utf8');
 assert.match(policy,/Rancangan privasi/);
 assert.match(policy,/audit data dan tinjauan hukum/);
 assert.match(policy,/aria-label="Daftar isi"/);
 assert.match(policy,/Penghapusan akun/);
 assert.match(policy,/Penyedia dan pembagian data/);
 assert.match(policy,/belum berlaku sebagai dokumen final/);
 assert.match(css,/\.policy-section\s*\{/);
 assert.match(css,/\.policy-contents\s*\{/);
});

test('public homepage does not expose a development workspace entry',async()=>{const home=await readFile(new URL('../src/features/home/business-home-page.js',import.meta.url),'utf8');assert.doesNotMatch(home,/Ruang Kerja|business-workspace-entry|pluits-demo/);});

test('Marketplace homepage is a separate public route',async()=>{assert.equal(resolveRoute('#/marketplace',''),'marketplace');assert.equal(routeHref('marketplace'),'#/marketplace');const app=await readFile(new URL('../src/app/create-app.js',import.meta.url),'utf8');assert.match(app,/mountMarketplaceHomePage/);});

test('Marketplace product details are publicly routable',async()=>{assert.equal(resolveRoute('#/product?id=3',''),'product');assert.equal(routeHref('product'),'#/product');const app=await readFile(new URL('../src/app/create-app.js',import.meta.url),'utf8');const detail=await readFile(new URL('../src/features/marketplace/marketplace-product-page.js',import.meta.url),'utf8');assert.match(app,/mountMarketplaceProductPage/);assert.match(detail,/PRODUCTS\.find/);});
\ntest('Venue & Service Operations homepage is a separate public experience',async()=>{assert.equal(resolveRoute('#/venue',''),'venue');assert.equal(routeHref('venue'),'#/venue');const app=await readFile(new URL('../src/app/create-app.js',import.meta.url),'utf8');const page=await readFile(new URL('../src/features/venue/venue-home-page.js',import.meta.url),'utf8');assert.match(app,/mountVenueHomePage/);assert.match(page,/Restaurant & Café/);assert.match(page,/Fitness & Sports/);assert.match(page,/Geo Directory/);assert.match(page,/Marketplace/);});\n