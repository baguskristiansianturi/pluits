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
  assert.deepEqual(Object.keys(APP_ROUTES), ['home','dashboard','register','login','forgot','reset','workspace','terms','privacy']);
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
test('Dashboard is a separate protected route for signed-in users', () => {
  assert.equal(resolveAuthenticatedRoute('dashboard', false), 'login');
  assert.equal(resolveAuthenticatedRoute('dashboard', true), 'dashboard');
});

test('workspace is guarded by a session and remains separate from Dashboard', () => {
  assert.equal(resolveAuthenticatedRoute('workspace', false), 'login');
  assert.equal(resolveAuthenticatedRoute('workspace', true), 'workspace');
  assert.notEqual(routeHref('dashboard'), routeHref('workspace'));
});
test('the same global home route renders for guests and active users without redirecting away', () => {
  assert.equal(resolveAuthenticatedRoute('home', false), 'home');
  assert.equal(resolveAuthenticatedRoute('home', true), 'home');
});
test('signed-in users are sent to Global Home from guest auth screens', () => {
  assert.equal(resolveAuthenticatedRoute('register', true), 'home');
  assert.equal(resolveAuthenticatedRoute('login', true), 'home');
  assert.equal(resolveAuthenticatedRoute('forgot', true), 'home');
});

test('navbar-to-content spacing has one global design-system rule', async () => {
  const [tokens, shellCss] = await Promise.all([
    readFile(new URL('../src/design-system/tokens.css', import.meta.url), 'utf8'),
    readFile(new URL('../src/design-system/page-shell.css', import.meta.url), 'utf8')
  ]);
  assert.equal((tokens.match(/--pl-shell-header-content-gap:/g) || []).length, 1);
  assert.ok(tokens.includes('--pl-shell-header-content-gap: 50px;'));
  assert.ok(shellCss.includes('.pl-page-shell > .pl-page-main'));
  assert.ok(shellCss.includes('padding-block-start: var(--pl-shell-header-content-gap);'));
  assert.ok(!shellCss.includes('--pl-shell-header-content-gap-mobile'));
});

test('Global Home keeps one public-facing landing composition for guests and signed-in users', async () => {
  const [home, shell, main, css] = await Promise.all([
    readFile(new URL('../src/features/home/home-page.js', import.meta.url), 'utf8'),
    readFile(new URL('../src/design-system/page-shell.js', import.meta.url), 'utf8'),
    readFile(new URL('../src/main.js', import.meta.url), 'utf8'),
    readFile(new URL('../src/features/home/home-page.css', import.meta.url), 'utf8')
  ]);
  assert.match(home, /home-hero/);
  assert.match(home, /home-ecosystem-grid/);
  assert.match(home, /home-identity-section/);
  assert.match(home, /home-mobile-section/);
  assert.match(home, /isAuthenticated \?/);
  assert.match(home, /data-sign-out/);
  assert.doesNotMatch(home, /global-home-welcome|global-home-profile-strip|AKUN AKTIF/);
  assert.doesNotMatch(home, /if \(user\)/);
  assert.match(shell, /routeHref\('home'\)/);
  assert.doesNotMatch(css, /\.home-page--authenticated|\.global-home-/);
  assert.doesNotMatch(main, /authenticated-home\.css/);
});

test('signed-in profile avatar on Global Home opens the protected Dashboard route', async () => {
  const [home, app, dashboard] = await Promise.all([
    readFile(new URL('../src/features/home/home-page.js', import.meta.url), 'utf8'),
    readFile(new URL('../src/app/create-app.js', import.meta.url), 'utf8'),
    readFile(new URL('../src/features/dashboard/dashboard-page.js', import.meta.url), 'utf8')
  ]);
  assert.match(home, /class="home-account-link" href="' \+ routeHref\('dashboard'\)/);
  assert.match(home, /aria-label="Buka Dashboard pengguna"/);
  assert.match(app, /mountDashboardPage/);
  assert.match(dashboard, /DASHBOARD PENGGUNA/);
  assert.match(dashboard, /Aktivitas Anda/);
  assert.match(dashboard, /Pemberitahuan/);
});
