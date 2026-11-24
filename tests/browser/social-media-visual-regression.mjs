import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const base = 'http://127.0.0.1:4173/pluits/';
const output = 'artifacts/social-media-browser-audit';
await mkdir(output, { recursive: true });

const viewports = [
  { name: 'mobile', width: 360, height: 800 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 }
];
const routes = [
  { path: 'social/', name: 'social-home' },
  { path: 'blog/', name: 'social-blog' },
  { path: 'discover/', name: 'social-discover' },
  { path: 'messages/', name: 'social-messages' },
  { path: 'profile/', name: 'social-profile' },
  { path: 'settings/', name: 'social-settings' },
  { path: 'marketplace/', name: 'marketplace' },
  { path: 'hangout-leisure/', name: 'venue' },
  { path: 'restaurant/', name: 'restaurant' },
  { path: 'login/', name: 'auth' },
  { path: 'terms/', name: 'legal' }
];

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
const pageErrors = [];
page.on('pageerror', error => pageErrors.push(error.message));

try {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto(base + 'social/', { waitUntil: 'domcontentloaded' });
  await page.locator('.global-home-page').waitFor({ state: 'visible', timeout: 20000 });
  if (!(await page.getByText('Orang yang mungkin Anda kenal').count())) {
    throw new Error('Social Home people discovery did not render.');
  }
  for (const selector of ['.global-products', '.global-feature-rail', '.global-local-rail', '.global-calendar-block', '.global-about']) {
    if (await page.locator(selector).count()) throw new Error('Sibling-domain content remains on Social Home: ' + selector);
  }
  const blogLink = page.locator('.global-content-tab-link[href="/pluits/blog/"]');
  await blogLink.waitFor({ state: 'visible' });
  await blogLink.click();
  await page.locator('.sm-blog-page').waitFor({ state: 'visible' });
  if (!page.url().endsWith('/pluits/blog/')) throw new Error('Social Home Blog link did not open the Blog route.');

  const search = page.locator('[data-sm-blog-search]');
  await search.fill('kota');
  if (await page.locator('.sm-blog-card').count() !== 1) throw new Error('Blog search did not filter the article preview.');
  await search.fill('');
  await page.locator('[data-sm-blog-category="Cerita"]').click();
  if (await page.locator('.sm-blog-card').count() !== 1) throw new Error('Blog category filter did not isolate its category.');

  for (const viewport of viewports) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    for (const route of routes) {
      const response = await page.goto(base + route.path, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(500);
      const mounted = await page.locator('.pl-page-shell').count();
      if (!mounted) {
        const diagnostics = await page.evaluate(() => ({
          title: document.title,
          url: location.href,
          appText: document.querySelector('#app')?.innerText?.slice(0, 500) || '',
          appHtml: document.querySelector('#app')?.innerHTML?.slice(0, 1200) || ''
        }));
        throw new Error('Route ' + route.name + ' did not mount a page shell at ' + viewport.name + '. HTTP=' + response?.status() + ' diagnostics=' + JSON.stringify(diagnostics) + ' pageErrors=' + pageErrors.join(' | '));
      }
      const dimensions = await page.evaluate(() => ({
        viewport: document.documentElement.clientWidth,
        document: document.documentElement.scrollWidth
      }));
      if (dimensions.document > dimensions.viewport + 1) {
        throw new Error(route.name + ' has horizontal page overflow at ' + viewport.name + ': ' + JSON.stringify(dimensions));
      }
      if (route.name === 'social-blog' && !(await page.locator('.sm-blog-page').count())) {
        throw new Error('Blog route did not mount its owned page at ' + viewport.name);
      }
      if (route.name === 'social-home' && !(await page.locator('.global-home-page').count())) {
        throw new Error('Social Home route did not mount at ' + viewport.name);
      }
      await page.screenshot({
        path: output + '/' + route.name + '-' + viewport.name + '.png',
        fullPage: true,
        animations: 'disabled'
      });
    }
  }

  if (pageErrors.length) throw new Error('Browser page errors: ' + pageErrors.join(' | '));
  console.log('Social Media browser audit passed: 11 routes × 3 viewports; Blog route, search, category filter, and no-overflow checks passed.');
} finally {
  await browser.close();
}
