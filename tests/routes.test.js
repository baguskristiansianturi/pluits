import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {resolveRoute,resolveAuthenticatedRoute} from '../src/app/routes.js';
import {APP_ROUTES,routeHref} from '../src/config/paths.js';
import {PUBLIC_INFO_PAGES} from '../src/features/public-info/pages/index.js';
test('Social app and account settings routes',()=>{assert.deepEqual(Object.keys(APP_ROUTES),['venue','restaurant','home','marketplace','social','blog','circle','discover','dashboard','messages','profile','settings','register','login','forgot','reset','terms','privacy','about','help','faq','contact','guidelines','marketplaceInfo','sellerTerms','paymentPolicy','refundPolicy','shippingPolicy','accountDeletion','safety','cookies','privacyChoices','complaints','prohibitedItems']);assert.equal(resolveRoute('/pluits/',''),'home');assert.equal(resolveRoute('/pluits/hangout-leisure/',''),'venue');assert.equal(resolveRoute('/pluits/restaurant/',''),'restaurant');assert.equal(routeHref('restaurant'),'/pluits/restaurant/');assert.equal(resolveRoute('/pluits/circle/',''),'circle');assert.equal(resolveRoute('/pluits/discover/',''),'discover');assert.equal(resolveRoute('/pluits/social/',''),'social');assert.equal(resolveRoute('/pluits/blog/',''),'blog');assert.equal(routeHref('blog'),'/pluits/blog/');assert.equal(resolveRoute('/pluits/messages/',''),'messages');assert.equal(resolveRoute('/pluits/profile/',''),'profile');assert.equal(resolveRoute('/pluits/settings/',''),'settings');assert.equal(routeHref('home'),'/pluits/');assert.equal(routeHref('settings'),'/pluits/settings/');});
test('public routes remain accessible without an account session',()=>{for(const route of ['dashboard','social','blog','messages','settings','profile','discover','marketplace'])assert.equal(resolveAuthenticatedRoute(route,false),route);assert.equal(resolveAuthenticatedRoute('settings',true),'settings');assert.equal(resolveAuthenticatedRoute('home',true),'home');assert.equal(resolveAuthenticatedRoute('circle',false),'social');assert.equal(resolveAuthenticatedRoute('login',true),'social');assert.equal(resolveAuthenticatedRoute('register',false),'register');});
test('shared brand always returns to public business homepage',async()=>{const shell=await readFile(new URL('../src/design-system/page-shell.js',import.meta.url),'utf8');assert.match(shell,/routeHref\('home'\)/);});
test('social app surfaces have native app navigation and no website footer',async()=>{const social=await readFile(new URL('../src/features/social/social-pages.js',import.meta.url),'utf8');assert.match(social,/global-bottom-nav/);assert.match(social,/mountSettingsPage/);assert.doesNotMatch(social,/renderPageFooter/);assert.match(social,/data-sign-out/);assert.match(social,/routeHref\('settings'\)/);});
test('login routes authenticated users to the social app',async()=>{const app=await readFile(new URL('../src/app/create-app.js',import.meta.url),'utf8');assert.match(app,/navigate\('social'\)/);assert.match(app,/mountSettingsPage/);assert.match(app,/onSignOut:\s*\(\)\s*=>\s*authService\.signOut\(\)/);});
test('foundation spacing token remains the single shared contract',async()=>{const [tokens,shell]=await Promise.all([readFile(new URL('../src/design-system/tokens.css',import.meta.url),'utf8'),readFile(new URL('../src/design-system/page-shell.css',import.meta.url),'utf8')]);assert.equal((tokens.match(/--pl-shell-header-content-gap:/g)||[]).length,1);assert.ok(tokens.includes('--pl-shell-header-content-gap: 50px;'));assert.ok(shell.includes('padding-block-start: var(--pl-shell-header-content-gap);'));});
test('profile avatar shortcut opens the same Create destination as the center plus navigation',async()=>{const social=await readFile(new URL('../src/features/social/social-pages.js',import.meta.url),'utf8');const css=await readFile(new URL('../src/features/social/social-pages.css',import.meta.url),'utf8');assert.match(social,/social-profile-avatar-story-link[^]*?routeHref\('dashboard'\)/);assert.match(social,/social-profile-story-plus/);assert.match(social,/social-plus.*routeHref\('dashboard'\)/s);assert.match(css,/\.social-profile-avatar-story-link/);assert.match(css,/\.social-profile-story-plus/);});
test('profile screen keeps identity and follow stats while removing account promo copy and profile action buttons',async()=>{const social=await readFile(new URL('../src/features/social/social-pages.js',import.meta.url),'utf8');const css=await readFile(new URL('../src/features/social/social-pages.css',import.meta.url),'utf8');assert.ok(social.includes('renderProfileCoverMenu'));assert.ok(social.includes('<small>Followers</small>'));assert.ok(social.includes('<small>Following</small>'));assert.ok(social.includes('social-profile-gear'));for(const removed of ['social-account-badge','social-account-upgrade','Cerita, aktivitas, dan koneksi saya di PLUITS','social-profile-bio','social-profile-stats','Bagikan profil','Ikuti · segera tersedia'])assert.ok(!social.includes(removed),removed+' should be removed');assert.match(css,/\.social-profile-card\{[^}]*border:0/s);});

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

test('every footer destination resolves through the canonical route registry',async()=>{
 const footer=await readFile(new URL('../src/features/public-info/public-footer.js',import.meta.url),'utf8');
 const footerRoutes=[...footer.matchAll(/route:'([^']+)'/g)].map(match=>match[1]);
 assert.ok(footerRoutes.length>0);
 for(const route of footerRoutes){
  assert.ok(Object.hasOwn(APP_ROUTES,route),'footer route '+route+' must be registered');
  assert.ok(!routeHref(route).includes('#'),'footer route '+route+' must use a clean pathname');
 }
});

test('legal policy content is separated into dedicated page folders',async()=>{
 const [registry,terms,privacy]=await Promise.all([
  readFile(new URL('../src/features/legal/pages/index.js',import.meta.url),'utf8'),
  readFile(new URL('../src/features/legal/pages/terms/index.js',import.meta.url),'utf8'),
  readFile(new URL('../src/features/legal/pages/privacy/index.js',import.meta.url),'utf8')
 ]);
 assert.match(registry,/TERMS_POLICY/);
 assert.match(registry,/PRIVACY_POLICY/);
 assert.match(terms,/export const TERMS_POLICY/);
 assert.match(privacy,/export const PRIVACY_POLICY/);
});

test('profile settings shortcut opens the account settings center',async()=>{
 const social=await readFile(new URL('../src/features/social/social-pages.js',import.meta.url),'utf8');
 const css=await readFile(new URL('../src/features/social/social-pages.css',import.meta.url),'utf8');
 assert.ok(social.includes('class="social-profile-gear"'));
 assert.ok(social.includes("routeHref('settings')"));
 assert.match(social,/Buka Pusat Pengaturan Akun/);
 assert.match(css,/\.social-profile-card > \.social-profile-gear/);
});
test('account settings include privacy, display name and username controls',async()=>{
 const social=await readFile(new URL('../src/features/social/social-pages.js',import.meta.url),'utf8');
 assert.match(social,/id:'privacy',label:'Privasi'/);
 assert.match(social,/value="public"/);
 assert.match(social,/value="private"/);
 assert.match(social,/value="friends"/);
 assert.match(social,/id:'displayName',label:'Nama Profil'/);
 assert.match(social,/id:'username',label:'Nama Pengguna'/);
 assert.match(social,/pluits:account-settings:v1/);
 assert.match(social,/\^\[a-z0-9\.\_\]\{3,30\}\$/);
});

test('Social Home no longer embeds external merchant listings; venue remains a separate route owner',async()=>{
 const home=await readFile(new URL('../src/features/home/home-page.js',import.meta.url),'utf8');
 const provider=await readFile(new URL('../src/features/venue/venue-provider-page.js',import.meta.url),'utf8');
 const app=await readFile(new URL('../src/app/create-app.js',import.meta.url),'utf8');
 assert.doesNotMatch(home,/The Garden Table|global-local-card|routeHref\\('restaurant'\\)/);
 assert.match(provider,/mountVenueProviderPage/);
 assert.match(app,/route === 'restaurant'.*mountVenueProviderPage/s);
});



test('Social Media Blog is a standalone route with module-owned CSS and no cross-feature imports',async()=>{
 const [blog,css,app,home]=await Promise.all([
  readFile(new URL('../src/features/social/blog/blog-page.js',import.meta.url),'utf8'),
  readFile(new URL('../src/features/social/blog/blog-page.css',import.meta.url),'utf8'),
  readFile(new URL('../src/app/create-app.js',import.meta.url),'utf8'),
  readFile(new URL('../src/features/home/home-page.js',import.meta.url),'utf8')
 ]);
 assert.ok(app.includes("route === 'blog'") && app.includes('mountBlogPage'));
 assert.ok(blog.includes('export function mountBlogPage'));
 assert.ok(blog.includes("../../design-system/page-shell.css"));
 assert.ok(blog.includes("../../design-system/icons.js"));
 assert.ok(!blog.includes('features/home') && !blog.includes('features/marketplace') && !blog.includes('features/venue') && !blog.includes('features/dashboard'));
 assert.ok(css.startsWith('/* Social Media Blog owns every selector'));
 assert.ok(!css.includes('body{') && !css.includes('html{') && !css.includes(':root') && !css.includes('.global-') && !css.includes('.social-'));
 assert.ok(home.includes("routeHref('blog')"));
});
