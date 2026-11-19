import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = (path) => readFile(new URL(path, import.meta.url), 'utf8');

test('preview build activates local demo mode without statically loading Supabase', async () => {
  const main = await read('../../src/main.js');
  const home = await read('../../src/features/home/home-page.js');
  const social = await read('../../src/features/social/social-pages.js');

  assert.match(main, /VITE_PLUITS_DEMO_MODE === 'true'/);
  assert.match(main, /createLocalDemoAuthService/);
  assert.doesNotMatch(main, /import\s+\{\s*supabase\s*\}\s+from/);
  assert.match(main, /await import\('\.\/lib\/supabase\/client\.js'\)/);
  assert.match(home, /if\(isLocalDemo\)/);
  assert.match(home, /await import\('\.\.\/\.\.\/lib\/supabase\/client\.js'\)/);
  assert.match(social, /provider==='local-demo'/);
  assert.match(social, /await import\('\.\.\/\.\.\/lib\/supabase\/client\.js'\)/);
});

test('preview profile supports local edits and stores only in browser storage', async () => {
  const auth = await read('../../src/services/auth/local-demo-auth-service.js');
  const settings = await read('../../src/features/social/social-pages.js');
  const app = await read('../../src/app/create-app.js');

  assert.match(auth, /async updateProfile/);
  assert.match(auth, /storage\?\.setItem\(STORAGE_KEY/);
  assert.match(settings, /data-demo-profile-form/);
  assert.match(settings, /onUpdateProfile/);
  assert.match(app, /onUpdateProfile:updates=>authService\.updateProfile/);
});

test('all registered protected destinations remain reachable in demo session', async () => {
  const routes = await read('../../src/config/paths.js');
  const resolver = await read('../../src/app/routes.js');
  const previewNav = await read('../../src/app/preview-tools.js');
  for (const route of ['social','circle','discover','dashboard','messages','profile','settings']) {
    assert.ok(routes.includes(route+':'));
  }
  assert.match(resolver, /if \(\['dashboard','social','messages','profile','settings'\]\.includes\(route\) && !hasSession\)/);
  for (const route of ['home','login','register','terms','privacy','about','help','faq','contact','guidelines','marketplaceInfo','sellerTerms','paymentPolicy','refundPolicy','shippingPolicy','accountDeletion','safety','cookies','privacyChoices','complaints','prohibitedItems','social','discover','messages','profile','settings','dashboard']) assert.ok(previewNav.includes("['"+route+"'"));
});
