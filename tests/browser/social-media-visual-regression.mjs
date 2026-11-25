import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const base = 'http://127.0.0.1:4173/pluits/';
const output = 'artifacts/social-media-browser-audit';
await mkdir(output, { recursive: true });

const viewports = [
  { name: 'mobile-smallest', width: 320, height: 800 },
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
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto(base + 'social/', { waitUntil: 'domcontentloaded' });
  await page.locator('.global-home-page').waitFor({ state: 'visible', timeout: 20000 });
  if (!(await page.getByText('Orang yang mungkin Anda kenal').count())) {
    throw new Error('Social Home people discovery did not render.');
  }
  const contentTabNav = page.locator('[data-content-tabs]');
  await contentTabNav.waitFor({ state: 'visible' });
  const tabLayout = await contentTabNav.evaluate(nav => {
    const items = [...nav.children];
    const rects = items.map(item => item.getBoundingClientRect());
    const labels = items.map(item => {
      const span = item.querySelector('span:not(.ui-icon)');
      return span ? getComputedStyle(span).position === 'absolute' && span.getBoundingClientRect().width <= 1 : false;
    });
    return {
      count: items.length,
      sameRow: rects.every(rect => Math.abs(rect.top - rects[0].top) <= 1),
      widths: rects.map(rect => Math.round(rect.width)),
      heights: rects.map(rect => Math.round(rect.height)),
      labelsVisible: labels.slice(1).every((visible, index) => {
        const span = items[index + 1].querySelector('span:not(.ui-icon)');
        return span && getComputedStyle(span).position !== 'absolute' && span.getBoundingClientRect().width > 1;
      }),
      labelsFit: items.slice(1).every(item => {
        const span = item.querySelector('span:not(.ui-icon)');
        return span && span.getBoundingClientRect().right <= item.getBoundingClientRect().right + 1;
      }),
      firstTabIconOnly: !items[0].querySelector('span:not(.ui-icon)'),
      refreshColor: getComputedStyle(items[4]).color,
      firstTabColor: getComputedStyle(items[0]).color,
      headerPosition: getComputedStyle(document.querySelector('[data-global-header]')).position
    };
  });
  if (Math.max(...tabLayout.widths) - Math.min(...tabLayout.widths) > 1 ||
      Math.max(...tabLayout.heights) - Math.min(...tabLayout.heights) > 1) {
    throw new Error('All five Social Home tabs must use equal-width and equal-height cells at 320px: ' + JSON.stringify(tabLayout));
  }
  if (tabLayout.count !== 5 || !tabLayout.sameRow || !tabLayout.labelsVisible || !tabLayout.labelsFit || !tabLayout.firstTabIconOnly) {
    throw new Error('Social Home tabs must show four labels, one icon-only first tab, and remain on one row at 320px: ' + JSON.stringify(tabLayout));
  }
  if (tabLayout.headerPosition !== 'sticky') {
    throw new Error('Social Home header must be sticky before the content-tab handoff.');
  }
  if (tabLayout.refreshColor === tabLayout.firstTabColor) {
    throw new Error('Refresh icon must use a distinct accent color.');
  }
  const handoff = await page.evaluate(async () => {
    const nav = document.querySelector('[data-content-tabs]');
    const header = document.querySelector('[data-global-header]');
    const area = document.querySelector('.global-social-area');
    const target = window.scrollY + nav.getBoundingClientRect().top;
    window.scrollTo(0, target);
    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    return {
      active: document.querySelector('.global-home-page').classList.contains('has-content-tabs-pinned'),
      tabsTop: Math.round(nav.getBoundingClientRect().top),
      tabsPosition: getComputedStyle(nav).position,
      computedTop: getComputedStyle(nav).top,
      marginTop: getComputedStyle(nav).marginTop,
      rootClass: document.querySelector('.global-home-page').className,
      headerHeight: Math.round(header.getBoundingClientRect().height)
    };
  });
  if (!handoff.active || handoff.tabsTop > 2 || handoff.tabsPosition !== 'sticky') {
    throw new Error('Content tabs did not take over the sticky layer: ' + JSON.stringify(handoff));
  }
  const sustainedSticky = await page.evaluate(async () => {
    const nav = document.querySelector('[data-content-tabs]');
    window.scrollBy(0, 260);
    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    return {
      top: Math.round(nav.getBoundingClientRect().top),
      active: document.querySelector('.global-home-page').classList.contains('has-content-tabs-pinned'),
      transform: getComputedStyle(nav).transform,
      columns: getComputedStyle(nav).gridTemplateColumns
    };
  });
  if (sustainedSticky.top > 2 || !sustainedSticky.active || sustainedSticky.transform !== 'none') {
    throw new Error('Content tabs must remain visible at the top after the header disappears: ' + JSON.stringify(sustainedSticky));
  }
  const composerBeforeTabs = await page.evaluate(() => {
    const composer = document.querySelector('.global-composer');
    const tabs = document.querySelector('[data-content-tabs]');
    return !composer || composer.compareDocumentPosition(tabs) & Node.DOCUMENT_POSITION_FOLLOWING;
  });
  if (!composerBeforeTabs) throw new Error('Composer copy must not appear below the content tabs.');
  const handback = await page.evaluate(async () => {
    const area = document.querySelector('.global-social-area');
    const nav = document.querySelector('[data-content-tabs]');
    const shell = document.querySelector('.global-home-page');
    window.scrollTo(0, document.documentElement.scrollHeight);
    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    return {
      active: shell.classList.contains('has-content-tabs-pinned'),
      areaBottom: Math.round(area.getBoundingClientRect().bottom),
      tabsHeight: Math.round(nav.getBoundingClientRect().height),
      bottomChromeSpace: parseFloat(getComputedStyle(shell).paddingBottom) || 0,
      scrollY: Math.round(window.scrollY),
      maxScroll: document.documentElement.scrollHeight - window.innerHeight
    };
  });
  await page.waitForTimeout(220);
  const headerTransform = await page.locator('[data-global-header]').evaluate(header => getComputedStyle(header).transform);
  if (handback.active || headerTransform !== 'none') {
    throw new Error('Social Home header did not return after the content container ended: ' + JSON.stringify({ ...handback, headerTransform }));
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
      const diagnostics = await page.evaluate(() => ({
        title: document.title,
        url: location.href,
        appText: document.querySelector('#app')?.innerText?.slice(0, 500) || '',
        appHtml: document.querySelector('#app')?.innerHTML?.slice(0, 1200) || ''
      }));
      if (!diagnostics.appText.trim()) {
        throw new Error('Route ' + route.name + ' rendered an empty application at ' + viewport.name + '. HTTP=' + response?.status() + ' diagnostics=' + JSON.stringify(diagnostics) + ' pageErrors=' + pageErrors.join(' | '));
      }
      if (!diagnostics.url.endsWith('/pluits/' + route.path)) {
        throw new Error('Route ' + route.name + ' redirected unexpectedly: ' + diagnostics.url);
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
