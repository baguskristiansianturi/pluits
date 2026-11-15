import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { ROUTES } from '../../src/components/social/navigation-routes.js';

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
    circle: '#/account/explore',
    discover: '#/search',
    create: '#/account/create',
    messages: '#/inbox',
    profile: '#/account/profile',
    reels: '#/account/reels',
    activity: '#/account/activity',
    contacts: '#/account/followers',
    saved: '#/account/saved',
    settings: '#/account/settings',
    places: '#/places',
    marketplace: '#/marketplace',
    trip: '#/trip',
  });
});

test('every primary navigation destination is handled by the router and page module', () => {
  const routeContracts = [
    [ROUTES.home, "r==='account'", "section==='explore'"],
    [ROUTES.discover, "r==='search'", 'discoverySearch'],
    [ROUTES.create, "r==='account'", "section==='create'"],
    [ROUTES.inbox, "r==='message'||r==='messages'||r==='inbox'", 'messagesPage'],
    [ROUTES.profile, "r==='account'", "section==='profile'"],
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
    assert.ok(url.startsWith('#/'), `Expected hash URL for ${url}`);
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
  assert.equal(ROUTES.editProfile, '#/account/profile/edit');
  assert.ok(router.includes("r==='account'"));
  assert.ok(account.includes("parameter==='edit'"));
});
