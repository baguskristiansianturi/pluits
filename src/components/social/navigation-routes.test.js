import test from 'node:test';
import assert from 'node:assert/strict';
import { ROUTES, canonicalizeLegacyRoute, getInternalRoute } from './navigation-routes.js';

test('primary navigation paths resolve to their intended pages', () => {
  const cases = [
    [ROUTES.profile, 'profile'],
    [ROUTES.inbox, 'inbox'],
    [ROUTES.create, 'create'],
    [ROUTES.discover, 'search'],
    [ROUTES.home, 'circle']
  ];
  for (const [pathname, expected] of cases) {
    assert.equal(getInternalRoute({ pathname, search: '', hash: '' }), expected, pathname);
  }
});

test('legacy primary navigation links canonicalize to the same destinations', () => {
  const cases = [
    ['#/account/profile', ROUTES.profile],
    ['#/account/inbox', ROUTES.inbox],
    ['#/account/create', ROUTES.create],
    ['#/search', ROUTES.discover],
    ['#/account/explore', ROUTES.home]
  ];
  for (const [legacy, expected] of cases) {
    assert.equal(canonicalizeLegacyRoute(legacy), expected, legacy);
  }
});
