import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('../..', import.meta.url)));
const read = path => readFileSync(resolve(root, path), 'utf8');

test('all route-level page families are catalogued under src/pages', () => {
  const catalog = read('src/pages/README.md');
  const required = [
    'home/index.js','account/index.js','messages/index.js','marketplace/index.js',
    'seller/index.js','directory/index.js','trip/index.js','search/discovery.js',
    'blog/index.js','blog-studio/index.js','help/index.js','misc/index.js',
    'admin/moderation.js'
  ];
  for (const path of required) {
    assert.ok(existsSync(resolve(root, 'src/pages', path)), 'Missing page module: ' + path);
    assert.ok(catalog.includes(path), 'Page catalog must list: ' + path);
  }
});

test('Inbox page, feature modules, router and navigation retain one canonical owner', () => {
  const page = read('src/pages/messages/index.js');
  const sidebar = read('src/features/inbox/inbox-sidebar.js');
  const router = read('src/app/router.js');
  const routes = read('src/components/social/navigation-routes.js');
  const inboxDocs = read('src/pages/messages/README.md');
  assert.match(page, /messagesPage/);
  assert.match(page, /bindMessagesPage/);
  assert.match(sidebar, /pl-msg-conversations/);
  assert.match(router, /pages\/messages\/index\.js/);
  assert.match(routes, /inbox/);
  assert.match(inboxDocs, /Canonical route/);
  assert.equal(router.includes('../pages/inbox-personal/'), false);
  assert.equal(router.includes('../pages/inbox-toko/'), false);
});
