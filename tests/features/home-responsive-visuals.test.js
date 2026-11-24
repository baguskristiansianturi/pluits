import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const homeJs = new URL('../../src/features/social/home/home-page.js', import.meta.url);
const homeCss = new URL('../../src/features/social/home/home-page.css', import.meta.url);
const discoverJs = new URL('../../src/features/social/social-pages.js', import.meta.url);
const discoverCss = new URL('../../src/features/social/social-pages.css', import.meta.url);

test('social home keeps illustrative content separated from interactive demo post fixtures', async () => {
  const source = await readFile(homeJs, 'utf8');
  const cardSource = await readFile(new URL('../../src/features/social/feed/social-post-card.js', import.meta.url), 'utf8');
  const storiesSource = await readFile(new URL('../../src/features/social/stories/stories-rail.js', import.meta.url), 'utf8');
  const liveSource = await readFile(new URL('../../src/features/social/live/live-preview.js', import.meta.url), 'utf8');
  assert.match(source, /renderSocialPostCard as renderPostCard/);
  assert.match(source, /renderDemoFeed\('feed'\)/);
  assert.match(cardSource, /export const demoFeedPosts = \[/);
  assert.match(cardSource, /export function renderDemoFeed/);
  assert.match(cardSource, /Contoh postingan/);
  assert.match(cardSource, /data contoh/);
  assert.match(source, /renderStoriesRail\(\)/);
  assert.match(source, /renderLivePreview\(\)/);
  assert.match(storiesSource, /export function renderStoriesRail/);
  assert.match(liveSource, /export function renderLivePreview/);
  assert.match(liveSource, /data-content-kind=\\'live\\'/);
  assert.doesNotMatch(source, /global-product-demo-rail|global-marketplace-cta|global-products|global-features|global-calendar-block|global-about|global-live-demo-grid|global-blog-demo-grid/);
});
test('social home responsive styles cover narrow mobile, tablet, desktop and horizontal carousels', async () => {
  const css = await readFile(homeCss, 'utf8');
  assert.match(css, /@media\s*\(max-width:\s*359px\)/);
  assert.match(css, /@media\s*\(max-width:\s*767px\)/);
  assert.match(css, /@media\s*\(min-width:\s*768px\)\s*and\s*\(max-width:\s*1023px\)/);
  assert.match(css, /@media\s*\(min-width:\s*1024px\)/);
  assert.match(css, /\.global-search-backdrop\[hidden\]\{display:none\}/);
  assert.match(css, /\.global-people-rail[\s\S]*?scroll-snap-type:\s*x\s+mandatory/);
  assert.match(css, /\.global-content-tabs button\{[^}]*display:flex[^}]*align-items:center[^}]*justify-content:center/);
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


test('social home mobile layout keeps recommendation inset, feed full-bleed, and the new search entry', async () => {
  const source = await readFile(homeJs, 'utf8');
  const css = await readFile(homeCss, 'utf8');
  assert.equal((source.match(/class="global-social-area"/g) || []).length, 1,
    'social content must have one parent wrapper (no accidental nested duplicate)');
  assert.match(css, /global-location-row\{margin:14px 0 18px\}/);
  assert.match(css, /\.global-demo-rail,\.global-story-rail,\.global-people-rail,[\s\S]*?padding:0 var\(--pl-page-gutter\) 9px/s);
  assert.match(css, /\.global-content-section\s*\{[^}]*width:100vw[^}]*margin:0 calc\(50% - 50vw\) 14px/s);
  assert.match(css, /\.global-post-list\s*\{[^}]*width:100%[^}]*max-width:none/s);
  assert.match(css, /\.global-post-card\s*\{[^}]*width:100%[^}]*max-width:none/s);
  assert.match(source, /data-open-quick-search/);
  assert.match(css, /\.global-home-search-entry\{[^}]*min-height:58px/s);
  assert.doesNotMatch(source, /class="global-quick-search"/);
});
test('social home owns the header-to-content transition after its search entry', async () => {
  const shell = await readFile(new URL('../../src/design-system/page-shell.css', import.meta.url), 'utf8');
  const home = await readFile(homeCss, 'utf8');
  assert.doesNotMatch(shell, /\.pl-page-shell\.home-page/);
  assert.match(home, /\.global-home-page\s*>\s*\.global-home-main\s*\{[^}]*padding-block-start:\s*0/s);
  assert.match(home, /\.global-location-row\s*\{\s*margin:\s*14px 0 18px/s);
  assert.match(home, /\.global-home-search-entry\{[^}]*min-height:58px/s);
});


test('authenticated home uses 10px mobile content gutters, edge-bleed carousels and 10px card corners', async () => {
  const css = await readFile(homeCss, 'utf8');
  assert.match(css, /SOCIAL-HOME-GEOMETRY-004/);
  assert.match(css, /var\(--pl-page-gutter\)/);
  assert.doesNotMatch(css, /--home-gutter/);
  assert.match(css, /\.global-bleed-wrap\s*\{[^}]*width:\s*calc\(100% \+ var\(--pl-page-gutter\)\)[^}]*margin-left:\s*0[^}]*margin-right:\s*calc\(-1 \* var\(--pl-page-gutter\)\)/s);
  assert.match(css, /\.global-local-rail,\.global-product-demo-rail,\.global-feature-rail,\.global-service-rail\s*\{[^}]*width:\s*calc\(100% \+ var\(--pl-page-gutter\)\)/s);
  assert.match(css, /\.global-post-card\s*\{[^}]*border-radius:\s*var\(--pl-radius-card\)/s);
  assert.match(css, /\.global-feature-card,[\s\S]*?border-radius:\s*var\(--pl-radius-card\)/);
});

test('Social Home has one canonical mobile geometry owner and registered carousel fixtures', async () => {
  const css = await readFile(homeCss, 'utf8');
  const readme = await readFile(new URL('../../src/features/social/home/README.md', import.meta.url), 'utf8');
  const registry = await readFile(new URL('../../src/features/social/home/HOME-CAROUSEL-REGISTRY.md', import.meta.url), 'utf8');
  assert.equal((css.match(/SOCIAL-HOME-GEOMETRY-004/g) || []).length, 1);
  assert.match(css, /var\(--pl-page-gutter\)/);
  assert.match(css, /\.global-bleed-wrap\s*\{[^}]*width:\s*calc\(100% \+ var\(--pl-page-gutter\)\)[^}]*margin-left:\s*0[^}]*margin-right:\s*calc\(-1 \* var\(--pl-page-gutter\)\)/s);
  assert.match(css, /\.global-local-rail,\.global-product-demo-rail,\.global-feature-rail,\.global-service-rail\s*\{[^}]*width:calc\(100% \+ var\(--pl-page-gutter\)\)/s);
  assert.match(css, /scroll-snap-type:\s*x mandatory/);
  assert.match(registry, /HOME-DISCOVERY-INTEREST-001/);
  assert.match(registry, /HOME-DISCOVERY-NEARBY-001/);
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
  assert.match(shell, /\.pl-page-shell\.pl-page-shell--standard-content\s*>\s*\.pl-page-main\s*\{[^}]*width:\s*min\(100%,\s*var\(--pl-container-wide\)\)[^}]*padding-inline:\s*0/s);
  assert.match(homeMarkup, /pl-page-shell pl-page-shell--surface pl-page-shell--standard-content home-page global-home-page/);
  assert.match(discoverMarkup, /pl-page-shell pl-page-shell--surface pl-page-shell--standard-content social-shell/);

  assert.doesNotMatch(home, /\.global-home-page\s*\{[^}]*background:/s);
  assert.doesNotMatch(discover, /\.social-shell\s*\{[^}]*background:/s);
  assert.doesNotMatch(home, /\.global-home-main\s*\{[^}]*padding-inline:/s);
  assert.doesNotMatch(discover, /\.social-main\s*\{[^}]*(?:^|;)\s*(?:width|max-width|padding-inline):/s);
});


test('shared page header background and divider bleed to viewport edges independently of content width', async () => {
  const shell = await readFile(new URL('../../src/design-system/page-shell.css', import.meta.url), 'utf8');
  assert.match(shell, /\.pl-page-header\s*\{[^}]*position:\s*relative[^}]*isolation:\s*isolate/s);
  assert.match(shell, /\.pl-page-header::before\s*\{[^}]*left:\s*calc\(50%\s*-\s*50vw\)[^}]*width:\s*100vw[^}]*background:\s*var\(--pl-color-surface\)/s);
  assert.match(shell, /\.pl-page-header::before\s*\{[^}]*border-bottom:\s*var\(--pl-shell-divider-width\)\s+solid\s+var\(--pl-shell-divider-color\)/s);
});


test('Social Home contains only Social Media experiences and links outward only by explicit interaction', async () => {
  const source = await readFile(homeJs, 'utf8');
  const css = await readFile(homeCss, 'utf8');
  assert.ok(source.includes('Orang yang mungkin Anda kenal'));
  assert.ok(source.includes('Cerita dari circle Anda'));
  assert.ok(source.includes('data-content-tabs'));
  assert.ok(source.includes("routeHref('blog')"));
  assert.ok(source.includes('data-social-composer'));
  for (const removed of ['const recommendationItems', 'const nearbyItems', 'global-products', 'global-features', 'global-calendar-block', 'global-about', "routeHref('marketplace')", 'Keranjang', 'Notifikasi', 'Produk lokal pilihan', 'Restoran & kafe', 'Transportasi']) {
    assert.ok(!source.includes(removed), 'Social Home must not own external domain content: ' + removed);
  }
  assert.ok(css.includes('.global-social-area'));
});

test('Nearby discovery preserves radius fallback and fair exposure requirements', async () => {
  const spec = await readFile(new URL('../../src/features/social/home/PAGE-SOCIAL-HOME-001.md', import.meta.url), 'utf8');
  const registry = await readFile(new URL('../../src/features/social/home/HOME-CAROUSEL-REGISTRY.md', import.meta.url), 'utf8');
  assert.match(spec, /perluas bertahap/);
  assert.match(spec, /Jelajah/);
  assert.match(spec, /kesempatan/);
  assert.match(registry, /Fair exposure/);
  assert.match(registry, /never fill gaps with fabricated listings/);
});


test('homepage Explore actions use soft interactive styling and nearby distance is plain readable text', async () => {
  const css = await readFile(homeCss, 'utf8');
  const exploreRule = css.match(/\.global-section-heading a,\.global-inline-block a\{[^}]*\}/)?.[0] || '';
  const distanceRule = css.match(/\.global-local-distance\{[^}]*\}/g)?.at(-1) || '';
  assert.match(exploreRule, /color:var\(--pl-color-muted\)/);
  assert.match(exploreRule, /transition:color/);
  assert.match(css, /\.global-section-heading a:hover\{[^}]*color:var\(--pl-color-brand\)/);
  assert.match(css, /\.global-section-heading a:active\{[^}]*color:var\(--pl-color-brand\)/);
  assert.match(css, /\.global-section-heading a:focus-visible\{/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(distanceRule, /padding:0/);
  assert.match(distanceRule, /border:0/);
  assert.match(distanceRule, /border-radius:0/);
  assert.match(distanceRule, /background:transparent/);
  assert.match(distanceRule, /text-shadow:/);
});


test('social post demo contains four distinct posts, sample comments/replies and fully wired interaction controls', async () => {
  const cardSource = await readFile(new URL('../../src/features/social/feed/social-post-card.js', import.meta.url), 'utf8');
  const cardCss = await readFile(new URL('../../src/features/social/feed/social-post-card.css', import.meta.url), 'utf8');
  const reelsSource = await readFile(new URL('../../src/features/social/reels/reel-media.js', import.meta.url), 'utf8');
  const reelsCss = await readFile(new URL('../../src/features/social/reels/reel-media.css', import.meta.url), 'utf8');
  assert.match(cardSource, /id:'demo-post-alya'/);
  assert.match(cardSource, /id:'demo-post-raka'/);
  assert.match(cardSource, /id:'demo-post-nadia'/);
  assert.match(cardSource, /id:'demo-post-dimas'/);
  assert.match(cardSource, /verification:'unverified'/);
  assert.match(cardSource, /membership:'Gold'/);
  assert.match(cardSource, /premium:true/);
  assert.match(cardSource, /membership:'Silver'/);
  assert.match(cardSource, /membership:'Platinum'/);
  assert.match(cardSource, /membership:'PLUITS Priority'/);
  assert.match(reelsSource, /data-video-limit="10"/);
  assert.match(reelsSource, /export function isReelPost/);
  assert.match(reelsSource, /export function renderVideoMedia/);
  assert.match(reelsCss, /\.sm-reel-video/);
  assert.match(cardSource, /data-reaction-trigger/);
  assert.match(cardSource, /data-gift-toggle/);
  assert.match(cardSource, /data-comment-form/);
  assert.match(cardSource, /data-reply-comment/);
  assert.match(cardSource, /data-share-toggle/);
  assert.match(cardSource, /data-post-more/);
  assert.match(cardSource, /data-comment-like/);
  assert.match(cardSource, /data-post-comment-count/);
  assert.match(cardCss, /pl-post-verification--warning/);
  assert.match(cardCss, /pl-post-tier--priority/);
  assert.match(cardCss, /pl-post-reaction-picker/);
  assert.match(cardCss, /pl-post-gift-panel/);
  assert.match(cardCss, /pl-post-comment-replies/);
  assert.match(cardCss, /pl-post-more/);
});


test('social post card keeps the established card while comments align by reply author and media actions overlay', async () => {
  const cardSource = await readFile(new URL('../../src/features/social/feed/social-post-card.js', import.meta.url), 'utf8');
  const cardCss = await readFile(new URL('../../src/features/social/feed/social-post-card.css', import.meta.url), 'utf8');
  assert.match(cardSource, /renderReplies\(replies, postOwner\)/);
  assert.match(cardSource, /reply\.name === postOwner/);
  assert.match(cardSource, /pl-post-reply ' \+ sideClass/);
  assert.match(cardSource, /data-gift-received-toggle/);
  assert.match(cardSource, /data-overlay-like-count/);
  assert.match(cardSource, /data-overlay-comment-count/);
  assert.doesNotMatch(cardSource, /pl-post-action-row/);
  assert.match(cardCss, /\.pl-post-media-actions\{[^}]*flex-direction:column/);
  assert.match(cardCss, /\.pl-post-reply\.is-right\{[^}]*margin-left:auto/);
  assert.match(cardCss, /\.pl-post-reply\.is-owner\{[^}]*margin-right:auto/);
  assert.match(cardCss, /\.pl-post-received-gifts\{[^}]*position:absolute/);
  assert.match(cardCss, /\.pl-post-media-overlay \.pl-post-gift-panel\[hidden\]\{display:none\}/);
});


test('social post comment and reply profiles carry account tier and verification markers', async () => {
  const cardSource = await readFile(new URL('../../src/features/social/feed/social-post-card.js', import.meta.url), 'utf8');
  const cardCss = await readFile(new URL('../../src/features/social/feed/social-post-card.css', import.meta.url), 'utf8');
  assert.match(cardSource, /function resolveDemoProfile\(person\)/);
  assert.match(cardSource, /function renderCommentProfile\(person, kind = 'comment'\)/);
  assert.match(cardSource, /renderCommentProfile\(comment\)/);
  assert.match(cardSource, /renderCommentProfile\(reply, 'reply'\)/);
  assert.match(cardSource, /pl-post-comment-profile-status/);
  assert.match(cardCss, /\.pl-post-comment-profile \.pl-post-tier/);
  assert.match(cardCss, /\.pl-post-comment-profile-status \.pl-post-verification/);
  assert.match(cardCss, /\.pl-post-comment-profile--reply \.pl-post-tier/);
});

test('social stream uses one mixed timeline, icon filters, full-bleed media and a bounded sticky bar', async () => {
  const home = await readFile(homeJs, 'utf8');
  const homeStyles = await readFile(homeCss, 'utf8');
  const postStyles = await readFile(new URL('../../src/features/social/feed/social-post-card.css', import.meta.url), 'utf8');
  const card = await readFile(new URL('../../src/features/social/feed/social-post-card.js', import.meta.url), 'utf8');
  assert.match(home, /data-content-stream/);
  assert.match(home, /data-feed-refresh/);
  assert.match(home, /data-content-tab="\' \+ tab\.id/);
  assert.doesNotMatch(home, /label:'Feed'/);
  assert.match(homeStyles, /\.global-content-tabs\{position:sticky;top:0/);
  assert.match(homeStyles, /\.global-header\{position:relative;top:auto/);
  assert.match(postStyles, /width:100vw;max-width:none;margin-inline:calc\(50% - 50vw\)/);
  assert.match(postStyles, /\.pl-post-card\.is-horizontal[\s\S]*?aspect-ratio:16\/9/);
  assert.match(postStyles, /\.pl-post-card\.is-vertical[\s\S]*?aspect-ratio:4\/5/);
  assert.match(card, /durationSeconds:43/);
  assert.match(card, /durationSeconds:78/);
  assert.match(card, /durationSeconds \|\| 0\) <= 60/);
});

test('social feed preview renders twenty mixed posts with commentable blog cards and orientation-aware interactions', async () => {
  const card = await readFile(new URL('../../src/features/social/feed/social-post-card.js', import.meta.url), 'utf8');
  const css = await readFile(new URL('../../src/features/social/feed/social-post-card.css', import.meta.url), 'utf8');
  const home = await readFile(homeJs, 'utf8');
  assert.equal((card.match(/id:'demo-post-/g) || []).length, 20);
  assert.match(card, /type:'blog'/);
  assert.match(card, /blogTitle:/);
  assert.match(card, /data-blog-expand/);
  assert.match(card, /data-comment-form/);
  assert.match(card, /data-content-kind=.*blog/);
  assert.match(card, /pl-post-horizontal-controls/);
  assert.match(card, /data-content-orientation/);
  assert.match(css, /\.pl-post-card\.is-horizontal[\s\S]*?aspect-ratio:16\/9/);
  assert.match(css, /\.pl-post-card\.is-vertical[\s\S]*?aspect-ratio:4\/5/);
  assert.match(css, /\.pl-post-horizontal-controls \.pl-post-media-actions\{[^}]*flex-direction:row/);
  assert.match(css, /\.pl-post-media-actions\{[^}]*flex-direction:column/);
  assert.match(css, /\.pl-post-blog-body/);
  assert.match(home, /renderDemoFeed\('feed'\)/);
  assert.doesNotMatch(home, /demoContent\('blog'\)/);
});


test('social feed limits caption and comment previews and progressively reveals feed posts', async () => {
  const card = await readFile(new URL('../../src/features/social/feed/social-post-card.js', import.meta.url), 'utf8');
  const cardCss = await readFile(new URL('../../src/features/social/feed/social-post-card.css', import.meta.url), 'utf8');
  const home = await readFile(homeJs, 'utf8');
  const homeStyles = await readFile(homeCss, 'utf8');
  assert.match(card, /data-caption-expand/);
  assert.match(card, /data-comments-more/);
  assert.match(card, /data-comment-extra/);
  assert.match(card, /data-feed-page-hidden/);
  assert.match(card, /data-feed-more/);
  assert.match(card, /index>=6/);
  assert.match(cardCss, /-webkit-line-clamp:5/);
  assert.match(cardCss, /pl-post-comments-more/);
  assert.match(home, /Tampilkan postingan lainnya/);
  assert.match(home, /window\.scrollTo\(\{top:0,behavior:'smooth'\}\)/);
  assert.match(home, /window\.setTimeout\(resolve,1500\)/);
  assert.match(homeStyles, /global-content-refresh/);
});

test('social content filters use icon and label pairs in the requested order', async () => {
  const home = await readFile(homeJs, 'utf8');
  const styles = await readFile(homeCss, 'utf8');
  assert.match(home, /\{id:'all',icon:'grid',label:'Semua'\},\{id:'reels',icon:'film',label:'Reel'\},\{id:'blog',icon:'book',label:'Blog'\},\{id:'live',icon:'radio',label:'Live'\}/);
  assert.match(home, /renderIcon\(tab\.icon\) \+ '<span>' \+ tab\.label/);
  assert.match(home, /filter==='blog'&&kind==='blog'/);
  assert.match(styles, /\.global-content-tabs button\{[^}]*display:flex/);
});


test('Social responsive rules are owned by Social stylesheets, not the shared mobile contract',async()=>{
 const [contract,home,social]=await Promise.all([
  readFile(new URL('../../src/design-system/mobile-layout-contract.css',import.meta.url),'utf8'),
  readFile(new URL('../../src/features/social/home/home-page.css',import.meta.url),'utf8'),
  readFile(new URL('../../src/features/social/social-pages.css',import.meta.url),'utf8')
 ]);
 assert.ok(!contract.includes('.global-') && !contract.includes('.social-'));
 assert.ok(home.includes('.global-demo-rail') && home.includes('.global-content-section:has(.global-post-list)'));
 assert.ok(social.includes('.social-profile-entity-list.is-carousel') && social.includes('.social-profile-page .social-profile-tab-panel'));
});
