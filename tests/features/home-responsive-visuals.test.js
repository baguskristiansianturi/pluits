import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const homeJs = new URL('../../src/features/home/home-page.js', import.meta.url);
const homeCss = new URL('../../src/features/home/home-page.css', import.meta.url);
const discoverJs = new URL('../../src/features/social/social-pages.js', import.meta.url);
const discoverCss = new URL('../../src/features/social/social-pages.css', import.meta.url);

test('social home keeps rich test content visually clean without technical demo labels', async () => {
  const source = await readFile(homeJs, 'utf8');
  assert.match(source, /const demoFeedPosts\s*=\s*\[/);
  assert.match(source, /const demoReels\s*=\s*\[/);
  assert.match(source, /function renderDemoFeed/);
  assert.doesNotMatch(source, /DEMO · |LIVE · DEMO|Konten ilustrasi|Contoh profil|Foto profil contoh|Simulasi|Pratinjau/);
  assert.match(source, /function storyRail\(\)/);
  assert.match(source, /global-live-demo-grid/);
  assert.match(source, /global-blog-demo-grid/);
  assert.match(source, /global-product-demo-rail/);
  assert.match(source, /global-marketplace-cta/);
});

test('social home responsive styles cover narrow mobile, tablet, desktop and horizontal carousels', async () => {
  const css = await readFile(homeCss, 'utf8');
  assert.match(css, /@media\s*\(max-width:\s*359px\)/);
  assert.match(css, /@media\s*\(max-width:\s*767px\)/);
  assert.match(css, /@media\s*\(min-width:\s*768px\)\s*and\s*\(max-width:\s*1023px\)/);
  assert.match(css, /@media\s*\(min-width:\s*1024px\)/);
  assert.match(css, /\.global-quick-search[\s\S]*?overflow-x:\s*auto/);
  assert.match(css, /\.global-people-rail[\s\S]*?scroll-snap-type:\s*x\s+mandatory/);
  assert.match(css, /\.global-content-tabs[\s\S]*?grid-template-columns:\s*repeat\(4,minmax\(0,1fr\)\)/);
  assert.match(css, /\.global-post-card\.is-reel[\s\S]*?aspect-ratio:\s*9\/16/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /SOCIAL-HOME-GEOMETRY-004/);
  assert.match(css, /font-family:-apple-system,BlinkMacSystemFont/);
  assert.match(css, /\.global-post-list\s*\{[^}]*display:grid[^}]*width:100%[^}]*gap:12px/s);
  assert.match(css, /\.global-person-card[\s\S]*?aspect-ratio:3\/4\.15/);
});

test('people discovery has responsive portrait cards and all distance scopes', async () => {
  const js = await readFile(discoverJs, 'utf8');
  const css = await readFile(discoverCss, 'utf8');
  for (const value of ['100m','500m','1km','5km','10km','25km','50km','100km','250km','500km','1000km','indonesia','global']) {
    assert.ok(js.includes('value="' + value + '"'), 'missing distance option ' + value);
  }
  assert.match(css, /\.social-people-card\.is-featured[\s\S]*?aspect-ratio/);
  assert.match(css, /\.social-people-grid[\s\S]*?grid-template-columns:\s*repeat\(2,minmax\(0,1fr\)\)/);
  assert.match(css, /\.social-category-grid article:nth-child\(1\):before/);
  assert.match(css, /@media\s*\(max-width:\s*359px\)/);
});


test('social home mobile layout keeps recommendation inset, feed full-bleed, and quick search compact', async () => {
  const source = await readFile(homeJs, 'utf8');
  const css = await readFile(homeCss, 'utf8');
  assert.equal((source.match(/class="global-social-area"/g) || []).length, 1,
    'social content must have one parent wrapper (no accidental nested duplicate)');
  assert.match(css, /global-location-row\s*\{\s*margin:\s*30px 0 8px/);
  assert.match(css, /\.global-demo-rail,\.global-story-rail,\.global-people-rail,[\s\S]*?padding:0 10px 9px/s);
  assert.match(css, /\.global-content-section\s*\{[^}]*width:100vw[^}]*margin:0 calc\(50% - 50vw\) 14px/s);
  assert.match(css, /\.global-post-list\s*\{[^}]*width:100%[^}]*max-width:none/s);
  assert.match(css, /\.global-post-card\s*\{[^}]*width:100%[^}]*max-width:none/s);
  assert.match(css, /\.global-quick-search\s*\{[^}]*width:100vw[^}]*padding:5px 10px 6px/s);
  assert.match(css, /global-quick-search > a\s*\{[^}]*min-height:\s*34px[^}]*background:\s*#fff/s);
});


test('social home owns the header-to-content transition after its service shortcut rail', async () => {
  const shell = await readFile(new URL('../../src/design-system/page-shell.css', import.meta.url), 'utf8');
  const home = await readFile(homeCss, 'utf8');
  assert.match(shell, /\.pl-page-shell\.home-page\s*>\s*\.pl-page-main\s*\{\s*padding-block-start:\s*0/s);
  assert.match(home, /\.global-location-row\s*\{\s*margin:\s*30px 0 8px/s);
  assert.match(home, /\.global-search-submit\s*\{[^}]*white-space:\s*nowrap/s);
});


test('authenticated home uses 10px mobile content gutters, edge-bleed carousels and 10px card corners', async () => {
  const css = await readFile(homeCss, 'utf8');
  assert.match(css, /SOCIAL-HOME-GEOMETRY-004/);
  assert.match(css, /var\(--pl-page-gutter\)/);
  assert.match(css, /\.global-bleed-wrap\s*\{[^}]*width:\s*calc\(100% \+ var\(--pl-page-gutter\)\)[^}]*margin-left:\s*0[^}]*margin-right:\s*calc\(-1 \* var\(--pl-page-gutter\)\)/s);
  assert.match(css, /\.global-local-rail,\.global-product-demo-rail,\.global-feature-rail,\.global-service-rail\s*\{[^}]*width:\s*calc\(100% \+ var\(--pl-page-gutter\)\)/s);
  assert.match(css, /\.global-post-card\s*\{[^}]*border-radius:\s*var\(--pl-radius-card\)/s);
  assert.match(css, /\.global-feature-card,[\s\S]*?border-radius:\s*var\(--pl-radius-card\)/);
});

test('Social Home has one canonical mobile geometry owner and registered carousel fixtures', async () => {
  const css = await readFile(homeCss, 'utf8');
  const readme = await readFile(new URL('../../src/features/home/README.md', import.meta.url), 'utf8');
  const registry = await readFile(new URL('../../src/features/home/HOME-CAROUSEL-REGISTRY.md', import.meta.url), 'utf8');
  assert.equal((css.match(/SOCIAL-HOME-GEOMETRY-004/g) || []).length, 1);
  assert.match(css, /var\(--pl-page-gutter\)/);
  assert.match(css, /\.global-bleed-wrap\s*\{[^}]*width:\s*calc\(100% \+ var\(--pl-page-gutter\)\)[^}]*margin-left:\s*0[^}]*margin-right:\s*calc\(-1 \* var\(--pl-page-gutter\)\)/s);
  assert.match(css, /\.global-local-rail,\.global-product-demo-rail,\.global-feature-rail,\.global-service-rail\s*\{[^}]*width:calc\(100% \+ var\(--pl-page-gutter\)\)/s);
  assert.match(css, /scroll-snap-type:\s*x mandatory/);
  assert.match(registry, /HOME-CAROUSEL-DEMO-001/);
  assert.match(registry, /HOME-CAROUSEL-STORIES-001/);
  assert.match(registry, /HOME-CAROUSEL-PEOPLE-001/);
  assert.match(registry, /HOME-CAROUSEL-PRODUCT-001/);
  assert.match(readme, /SOCIAL-HOME-GEOMETRY-004/);
});


test('Social Home and Discover share one page surface and one standard content frame', async () => {
  const shell = await readFile(new URL('../../src/design-system/page-shell.css', import.meta.url), 'utf8');
  const home = await readFile(homeCss, 'utf8');
  const discover = await readFile(discoverCss, 'utf8');
  const homeMarkup = await readFile(homeJs, 'utf8');
  const discoverMarkup = await readFile(discoverJs, 'utf8');

  assert.match(shell, /\.pl-page-shell--surface\s*\{\s*background:\s*var\(--pl-color-surface\)/);
  assert.match(shell, /\.pl-page-shell--standard-content\s*>\s*\.pl-page-main\s*\{[^}]*width:\s*min\(100%,\s*var\(--pl-container-wide\)\)[^}]*padding-inline:\s*0/s);
  assert.match(homeMarkup, /pl-page-shell pl-page-shell--surface pl-page-shell--standard-content home-page global-home-page/);
  assert.match(discoverMarkup, /pl-page-shell pl-page-shell--surface pl-page-shell--standard-content social-shell/);

  assert.doesNotMatch(home, /\.global-home-page\s*\{[^}]*background:/s);
  assert.doesNotMatch(discover, /\.social-shell\s*\{[^}]*background:/s);
  assert.doesNotMatch(home, /\.global-home-main\s*\{[^}]*padding-inline:/s);
  assert.doesNotMatch(discover, /\.social-main\s*\{[^}]*padding-inline:/s);
});
