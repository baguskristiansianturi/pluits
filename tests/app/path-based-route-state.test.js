import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { getInternalRoute, canonicalizeLegacyRoute } from '../../src/components/social/navigation-routes.js';

const address = (pathname, search = '') => ({ pathname, search, hash: '' });

test('path-based route queries reach the correct destination modules', () => {
  assert.equal(getInternalRoute(address('/pluits/places/', '?category=restaurant')), 'places?category=restaurant');
  assert.equal(getInternalRoute(address('/pluits/places/', '?from=nearby')), 'places?from=nearby');
  assert.equal(getInternalRoute(address('/pluits/inbox/', '?conversation=conversation-42')), 'inbox?conversation=conversation-42');
  assert.equal(getInternalRoute(address('/pluits/seller/register/')), 'seller/register');
  assert.equal(getInternalRoute(address('/pluits/professional/')), 'account/professional');
  assert.equal(canonicalizeLegacyRoute('#/account/professional'), '/pluits/professional/');
});

test('directory actions use the canonical place slug and path query', async () => {
  const directory = await readFile(new URL('../../src/pages/directory/index.js', import.meta.url), 'utf8');
  const router = await readFile(new URL('../../src/app/router.js', import.meta.url), 'utf8');
  assert.match(directory, /const routeSearchParams = \(\) => new URLSearchParams\(location\.search/);
  assert.match(directory, /export function bindPlacePage\(slug=''/);
  assert.match(directory, /eq\('slug',placeSlug\)/);
  assert.match(directory, /routeAddress=window\.location\.pathname\+window\.location\.search\+window\.location\.hash/);
  assert.match(router, /await mod\.bindPlacePage\(v\|\|''\)/);
});

test('Inbox and Seller Center read route state from readable URLs', async () => {
  const inbox = await readFile(new URL('../../src/pages/messages/index.js', import.meta.url), 'utf8');
  const seller = await readFile(new URL('../../src/pages/seller/index.js', import.meta.url), 'utf8');
  const account = await readFile(new URL('../../src/pages/account/index.js', import.meta.url), 'utf8');
  const accountContext = await readFile(new URL('../../src/pages/account/account-context.js', import.meta.url), 'utf8');
  assert.match(inbox, /const routeQuery=location\.search/);
  assert.match(inbox, /new URLSearchParams\(routeQuery\)/);
  assert.match(seller, /const currentSellerRoute=.*location\.pathname.*location\.hash.*toLowerCase\(\)/);
  assert.match(seller, /authView\(currentSellerRoute\(\)\.includes\('register'\)/);
  assert.ok(account.includes("section==='professional'?professionalPage"));
  assert.ok(accountContext.includes("location.hash=next==='professional'?'/account/professional'"));
});

test('account post actions preserve the active route after mutations', async () => {
  const account = await readFile(new URL('../../src/pages/account/index.js', import.meta.url), 'utf8');
  assert.match(account, /function currentAccountView\(\)/);
  assert.match(account, /function refreshCurrentAccount\(/);
  assert.match(account, /await refreshCurrentAccount\(\{postId:id\}\)/);
  assert.match(account, /await refreshCurrentAccount\(\{deleted:true\}\)/);
  assert.match(account, /canonicalizeLegacyRoute\('#\/account\/post\/'\+id\)/);
  assert.doesNotMatch(account, /location\.hash\.(?:includes|split)/);
});
