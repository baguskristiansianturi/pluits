import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolveRoute, resolveAuthenticatedRoute } from '../src/app/routes.js';
import { APP_ROUTES, routeHref } from '../src/config/paths.js';

test('empty URL starts at public home while unknown routes retain safe registration fallback', () => {
  assert.equal(resolveRoute('', ''), 'home');
  assert.equal(resolveRoute('#/old-home', ''), 'register');
  assert.equal(resolveRoute('#/workspace', ''), 'register');
});

test('auth routes and password recovery callback resolve correctly', () => {
  assert.equal(resolveRoute('#/login', ''), 'login');
  assert.equal(resolveRoute('#/forgot', ''), 'forgot');
  assert.equal(resolveRoute('#/register', ''), 'register');
  assert.equal(resolveRoute('#/home', '?auth=reset'), 'reset');
});

test('the public route registry contains one Dashboard and no Workspace page', () => {
  assert.deepEqual(Object.keys(APP_ROUTES), ['home','dashboard','register','login','forgot','reset','terms','privacy']);
  for (const [route, path] of Object.entries(APP_ROUTES)) {
    assert.equal(routeHref(route), '#/' + path);
    assert.equal(resolveRoute(routeHref(route), ''), route);
  }
  assert.throws(() => routeHref('workspace'), /Unknown PLUITS route/);
});

test('shared brand renderer defaults to the global home route', async () => {
  const source = await readFile(new URL('../src/design-system/page-shell.js', import.meta.url), 'utf8');
  assert.match(source, /routeHref\('home'\)/);
});

test('legal document addresses resolve through the same route registry', () => {
  assert.equal(resolveRoute(routeHref('terms'), ''), 'terms');
  assert.equal(resolveRoute(routeHref('privacy'), ''), 'privacy');
});

test('Dashboard is the only protected post-login destination', () => {
  assert.equal(resolveAuthenticatedRoute('dashboard', false), 'login');
  assert.equal(resolveAuthenticatedRoute('dashboard', true), 'dashboard');
  assert.equal(resolveRoute('#/workspace', ''), 'register');
});

test('the same global home route renders for guests and active users without redirecting away', () => {
  assert.equal(resolveAuthenticatedRoute('home', false), 'home');
  assert.equal(resolveAuthenticatedRoute('home', true), 'home');
});

test('authenticated users are sent to Dashboard from guest auth screens', () => {
  assert.equal(resolveAuthenticatedRoute('register', true), 'dashboard');
  assert.equal(resolveAuthenticatedRoute('login', true), 'dashboard');
  assert.equal(resolveAuthenticatedRoute('forgot', true), 'dashboard');
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
  assert.match(app, /navigate\('dashboard'\)/);
  assert.match(app, /mountDashboardPage/);
  assert.doesNotMatch(app, /mountWorkspacePage|workspace-page/);
  assert.match(dashboard, /PUSAT KENDALI PLUITS/);
  assert.match(dashboard, /Social Media/);
  assert.match(dashboard, /Marketplace/);
  assert.match(dashboard, /data-resize="left"/);
  assert.match(dashboard, /data-resize="right"/);
  assert.match(dashboard, /data-toggle-left/);
  assert.match(dashboard, /data-toggle-right/);
  assert.match(dashboard, /data-select-tab/);
  assert.match(dashboard, /Profil Sosial/);
  assert.match(dashboard, /Akun Bisnis/);
  assert.match(dashboard, /Transaksi/);
});

test('Dashboard provides personal, business, transaction, and social management surfaces', async () => {
  const dashboard = await readFile(new URL('../src/features/dashboard/dashboard-page.js', import.meta.url), 'utf8');
  const css = await readFile(new URL('../src/features/dashboard/dashboard-page.css', import.meta.url), 'utf8');
  for (const label of ['Store','Service','Pembelian','Penjualan','Privasi','Alamat','Rekening','Feed','Story','Reels','Live','Blog','AURELIA','STAVERO','BREWNOX','ROVANTA','LUNELLE']) {
    assert.ok(dashboard.includes(label), 'Dashboard is missing ' + label);
  }
  assert.match(css, /grid-template-columns:var\(--dashboard-left-width/);
  assert.match(css, /max-width:767px/);
  assert.match(dashboard, /data-social-view="inbox"/);
  assert.match(dashboard, /data-notifications/);
});

test('Dashboard shows truthful empty states and does not fabricate user activity or transactions', async () => {
  const dashboard = await readFile(new URL('../src/features/dashboard/dashboard-page.js', import.meta.url), 'utf8');
  for (const emptyState of ['Belum ada proyek aktif','Belum ada Story','Belum ada aktivitas','Inbox belum terhubung','Belum ada notifikasi','Belum ada pembelian','Belum ada penjualan']) {
    assert.ok(dashboard.includes(emptyState), 'Missing truthful empty state: ' + emptyState);
  }
  assert.doesNotMatch(dashboard, /\b\d+\s*(posts|orders|products|notifications)\b/i);
  assert.doesNotMatch(dashboard, /fake|dummy|mock data/i);
});
