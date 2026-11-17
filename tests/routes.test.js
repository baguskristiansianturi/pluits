import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolveRoute, resolveAuthenticatedRoute } from '../src/app/routes.js';
import { APP_ROUTES, routeHref } from '../src/config/paths.js';
test('empty URL starts at public home while unknown routes retain safe registration fallback', () => {
  assert.equal(resolveRoute('', ''), 'home');
  assert.equal(resolveRoute('#/old-home', ''), 'register');
});
test('auth routes and password recovery callback resolve correctly', () => {
  assert.equal(resolveRoute('#/login', ''), 'login');
  assert.equal(resolveRoute('#/forgot', ''), 'forgot');
  assert.equal(resolveRoute('#/register', ''), 'register');
  assert.equal(resolveRoute('#/workspace', '?auth=reset'), 'reset');
});
test('all page addresses come from one route registry', () => {
  assert.deepEqual(Object.keys(APP_ROUTES), ['home','register','login','forgot','reset','workspace','terms','privacy']);
  for (const [route, path] of Object.entries(APP_ROUTES)) { assert.equal(routeHref(route), '#/' + path); assert.equal(resolveRoute(routeHref(route), ''), route); }
});
test('shared brand renderer defaults to the global home route', async () => {
  const source = await readFile(new URL('../src/design-system/page-shell.js', import.meta.url), 'utf8');
  assert.match(source, /routeHref\('home'\)/);
});
test('legal document addresses resolve through the same route registry', () => {
  assert.equal(resolveRoute(routeHref('terms'), ''), 'terms');
  assert.equal(resolveRoute(routeHref('privacy'), ''), 'privacy');
});
test('workspace is guarded by a session', () => {
  assert.equal(resolveAuthenticatedRoute('workspace', false), 'login');
  assert.equal(resolveAuthenticatedRoute('workspace', true), 'workspace');
});
test('guest home remains public and authenticated home returns to current internal workspace', () => {
  assert.equal(resolveAuthenticatedRoute('home', false), 'home');
  assert.equal(resolveAuthenticatedRoute('home', true), 'workspace');
});
test('signed-in users are sent to workspace from guest auth screens', () => {
  assert.equal(resolveAuthenticatedRoute('register', true), 'workspace');
  assert.equal(resolveAuthenticatedRoute('login', true), 'workspace');
  assert.equal(resolveAuthenticatedRoute('forgot', true), 'workspace');
});

test('shared navbar-to-content gap is 25px and enforced by the shell on every page', async () => {
  const [tokens, shellCss, ...pages] = await Promise.all([
    readFile(new URL('../src/design-system/tokens.css', import.meta.url), 'utf8'),
    readFile(new URL('../src/design-system/page-shell.css', import.meta.url), 'utf8'),
    readFile(new URL('../src/features/home/home-page.js', import.meta.url), 'utf8'),
    readFile(new URL('../src/features/auth/auth-page.js', import.meta.url), 'utf8'),
    readFile(new URL('../src/features/legal/policy-page.js', import.meta.url), 'utf8'),
    readFile(new URL('../src/features/workspace/workspace-page.js', import.meta.url), 'utf8')
  ]);
  assert.match(tokens, /--pl-shell-header-content-gap:\\s*25px/);
  assert.match(tokens, /--pl-shell-header-content-gap-mobile:\\s*25px/);
  assert.match(shellCss, /\\.pl-page-shell > \\.pl-page-main\\s*\\{[\\s\\S]*?padding-block-start:\\s*var\\(--pl-shell-header-content-gap\\)/);
  for (const page of pages) {
    assert.match(page, /<main class="pl-page-main [^"]+"/);
    assert.match(page, /<div class="pl-page-shell/);
  }
});
