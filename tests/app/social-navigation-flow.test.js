import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { ROUTES, canonicalizeLegacyRoute, getInternalRoute } from '../../src/components/social/navigation-routes.js';

const router = await readFile(new URL('../../src/app/router.js', import.meta.url), 'utf8');
const account = await readFile(new URL('../../src/pages/account/index.js', import.meta.url), 'utf8');
const navigation = await readFile(new URL('../../src/components/social/navigation.js', import.meta.url), 'utf8');

test('primary social navigation has canonical destinations', () => {
  assert.deepEqual({
    circle: ROUTES.home,
    discover: ROUTES.discover,
    create: ROUTES.create,
    messages: ROUTES.inbox,
    profile: ROUTES.profile,
    reels: ROUTES.reels,
    activity: ROUTES.activity,
    contacts: ROUTES.contacts,
    saved: ROUTES.saved,
    settings: ROUTES.settings,
    places: ROUTES.places,
    marketplace: ROUTES.marketplace,
    trip: ROUTES.trip,
  }, {
    circle: '/pluits/circle/',
    discover: '/pluits/discover/',
    create: '/pluits/create/',
    messages: '/pluits/inbox/',
    profile: '/pluits/profile/',
    reels: '/pluits/reels/',
    activity: '/pluits/notifications/',
    contacts: '/pluits/followers/',
    saved: '/pluits/saved/',
    settings: '/pluits/settings/',
    places: '/pluits/places/',
    marketplace: '/pluits/marketplace/',
    trip: '/pluits/trips/',
  });
});

test('every primary navigation destination is handled by the router and page module', () => {
  const routeContracts = [
    [ROUTES.home, "r==='circle'", "mountUserAccount('explore')"],
    [ROUTES.discover, "r==='search'", 'discoverySearch'],
    [ROUTES.create, "r==='account'", "section==='create'"],
    [ROUTES.inbox, "r==='inbox'", 'messagesPage'],
    [ROUTES.profile, "r==='profile'", "mountUserAccount('profile'"],
    [ROUTES.reels, "r==='account'", "section==='reels'"],
    [ROUTES.activity, "r==='account'", "section==='activity'"],
    [ROUTES.contacts, "r==='account'", "section==='followers'"],
    [ROUTES.saved, "r==='account'", "section==='saved'"],
    [ROUTES.settings, "r==='account'&&v==='settings'", "section==='settings'"],
    [ROUTES.places, "r==='places'", 'directoryPage'],
    [ROUTES.marketplace, "r==='marketplace'", 'marketplacePage'],
    [ROUTES.trip, "r==='trip'", 'tripPage'],
  ];
  for (const [url, routerMarker, pageMarker] of routeContracts) {
    assert.ok(url.startsWith('/pluits/'), `Expected readable canonical URL for ${url}`);
    assert.ok(router.includes(routerMarker), `Router does not dispatch ${url}`);
    assert.ok(account.includes(pageMarker) || router.includes(pageMarker), `No page handler found for ${url}`);
  }
});

test('desktop and mobile social navigation use the shared route registry', () => {
  for (const key of ['home', 'discover', 'create', 'inbox', 'profile', 'reels', 'contacts', 'saved', 'activity', 'settings', 'places', 'marketplace', 'trip']) {
    assert.ok(navigation.includes(`ROUTES.${key}`) || navigation.includes(`getRoute('${key}'`), `Navigation bypasses canonical route: ${key}`);
  }
});

test('profile edit keeps its nested URL and is dispatched through the account route', () => {
  assert.equal(ROUTES.editProfile, '/pluits/profile/edit/');
  assert.ok(router.includes("r==='account'"));
  assert.ok(account.includes("parameter==='edit'"));
});

test('legacy hash bookmarks resolve to readable canonical page URLs', () => {
  assert.equal(canonicalizeLegacyRoute('#/account/explore'), '/pluits/circle/');
  assert.equal(canonicalizeLegacyRoute('#/inbox'), '/pluits/inbox/');
  assert.equal(canonicalizeLegacyRoute('#/account/profile'), '/pluits/profile/');
  assert.equal(canonicalizeLegacyRoute('#/account/activity'), '/pluits/notifications/');
  assert.equal(canonicalizeLegacyRoute('#/account/profile/edit'), '/pluits/profile/edit/');
});

test('direct page URLs dispatch to their intended internal page controllers', () => {
  const address = pathname => ({ pathname, search: '', hash: '' });
  assert.equal(getInternalRoute(address('/pluits/circle/')), 'circle');
  assert.equal(getInternalRoute(address('/pluits/inbox/')), 'inbox');
  assert.equal(getInternalRoute(address('/pluits/create/')), 'create');
  assert.equal(getInternalRoute(address('/pluits/profile/')), 'profile');
  assert.equal(getInternalRoute(address('/pluits/discover/')), 'search');
  assert.equal(getInternalRoute(address('/pluits/notifications/')), 'account/activity');
});

test('GitHub Pages build includes a direct-route fallback document', async () => {
  const config = await readFile(new URL('../../vite.config.js', import.meta.url), 'utf8');
  assert.match(config, /github-pages-spa-fallback/);
  assert.match(config, /copyFileSync\(index, resolve\('dist\/404\.html'\)\)/);
});


test('public username and Blog links retain their complete canonical route', () => {
  const address = pathname => ({ pathname, search: '', hash: '' });
  assert.equal(canonicalizeLegacyRoute('#/@bagus'), '/pluits/@bagus/');
  assert.equal(canonicalizeLegacyRoute('#/@bagus/blog/catatan/cerita-pertama'), '/pluits/@bagus/blog/catatan/cerita-pertama/');
  assert.equal(canonicalizeLegacyRoute('#/%40bagus/blog/catatan/cerita-pertama'), '/pluits/@bagus/blog/catatan/cerita-pertama/');
  assert.equal(getInternalRoute(address('/pluits/@bagus/')), '@bagus');
  assert.equal(getInternalRoute(address('/pluits/%40bagus/blog/catatan/cerita-pertama/')), '@bagus/blog/catatan/cerita-pertama');
});


test('nested trip, marketplace and place routes retain all dynamic segments', () => {
  const address = pathname => ({ pathname, search: '', hash: '' });
  assert.equal(canonicalizeLegacyRoute('#/trips/itinerary/42'), '/pluits/trips/itinerary/42/');
  assert.equal(getInternalRoute(address('/pluits/trips/itinerary/42/')), 'trip/itinerary/42');
  assert.equal(canonicalizeLegacyRoute('#/marketplace/orders/order-42'), '/pluits/marketplace/orders/order-42/');
  assert.equal(getInternalRoute(address('/pluits/marketplace/orders/order-42/')), 'market-order/order-42');
  assert.equal(canonicalizeLegacyRoute('#/marketplace/product/item-42'), '/pluits/marketplace/product/item-42/');
  assert.equal(getInternalRoute(address('/pluits/marketplace/product/item-42/')), 'market-product/item-42');
  assert.equal(canonicalizeLegacyRoute('#/place/pantai-kuta/claim'), '/pluits/places/pantai-kuta/claim/');
  assert.equal(getInternalRoute(address('/pluits/places/pantai-kuta/claim/')), 'place/pantai-kuta/claim');
});
