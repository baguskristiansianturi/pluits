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
  assert.ok(liveSource.includes('data-content-kind="live"'));
  assert.doesNotMatch(source, /global-product-demo-rail|global-marketplace-cta|global-products|global-features|global-calendar-block|global-about|global-live-demo-grid|global-blog-demo-grid/);
});
test('Social Home responsive styles and content-module styles cover their own surfaces', async () => {
  const css = await readFile(homeCss, 'utf8');
  const postCss = await readFile(new URL('../../src/features/social/feed/social-post-card.css', import.meta.url), 'utf8');
  const storiesCss = await readFile(new URL('../../src/features/social/stories/stories-rail.css', import.meta.url), 'utf8');
  const liveCss = await readFile(new URL('../../src/features/social/live/live-preview.css', import.meta.url), 'utf8');
  const reelsCss = await readFile(new URL('../../src/features/social/reels/reel-media.css', import.meta.url), 'utf8');
  assert.match(css, /@media\s*\(max-width:\s*359px\)/);
  assert.match(css, /@media\s*\(max-width:\s*767px\)/);
  assert.match(css, /@media\s*\(min-width:\s*768px\)\s*and\s*\(max-width:\s*1023px\)/);
  assert.match(css, /@media\s*\(min-width:\s*1024px\)/);
  assert.match(css, /\.global-search-backdrop\[hidden\]\s*\{\s*display:none\s*\}/);
  assert.match(css, /\.global-people-rail[\s\S]*?scroll-snap-type:\s*x\s+mandatory/);
  assert.match(css, /\.global-content-tabs button\s*\{[^}]*display:flex[^}]*align-items:center[^}]*justify-content:center/s);
  assert.ok(postCss.includes('.pl-post-card.is-reel') && postCss.includes('aspect-ratio:9/16'));
  assert.match(storiesCss, /\.sm-stories-rail/);
  assert.match(liveCss, /\.sm-live-preview-grid/);
  assert.match(reelsCss, /\.sm-reel-video/);
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


test('Social Home mobile layout is owned by Social Home and Stories modules', async () => {
  const source = await readFile(homeJs, 'utf8');
  const css = await readFile(homeCss, 'utf8');
  const storiesCss = await readFile(new URL('../../src/features/social/stories/stories-rail.css', import.meta.url), 'utf8');
  assert.equal((source.match(/class="global-social-area"/g) || []).length, 1);
  assert.ok(css.includes('.global-people-rail'));
  assert.ok(css.includes('.global-content-section'));
  assert.ok(css.includes('.global-post-list'));
  assert.ok(css.includes('.global-home-search-entry'));
  assert.ok(storiesCss.includes('.sm-stories-rail'));
  assert.ok(storiesCss.includes('.sm-story-ring'));
  assert.ok(source.includes('data-open-quick-search'));
});
test('Social Home owns the header-to-content transition after its search entry', async () => {
  const shell = await readFile(new URL('../../src/design-system/page-shell.css', import.meta.url), 'utf8');
  const home = await readFile(homeCss, 'utf8');
  assert.doesNotMatch(shell, /\.pl-page-shell\.home-page/);
  assert.match(home, /\.global-home-page\s*>\s*\.global-home-main\s*\{[^}]*padding-block-start:\s*0/s);
  assert.match(home, /\.global-home-search-entry\s*\{[^}]*min-height:\s*58px/s);
});
test('Social Home mobile geometry uses the platform gutter while component rails remain feature-owned', async () => {
  const css = await readFile(homeCss, 'utf8');
  const storiesCss = await readFile(new URL('../../src/features/social/stories/stories-rail.css', import.meta.url), 'utf8');
  assert.match(css, /SOCIAL-HOME-GEOMETRY-004/);
  assert.match(css, /var\(--pl-page-gutter\)/);
  assert.match(css, /\.global-bleed-wrap\s*\{[^}]*width:\s*calc\(100% \+ var\(--pl-page-gutter\)\)/s);
  assert.ok(css.includes('.global-people-rail'));
  assert.ok(storiesCss.includes('.sm-stories-rail'));
  assert.match(css, /\.global-post-card\s*\{[^}]*border-radius:\s*var\(--pl-radius-card\)/s);
});
test('Social Home has one canonical mobile geometry owner and registered carousel fixtures', async () => {
  const css = await readFile(homeCss, 'utf8');
  const readme = await readFile(new URL('../../src/features/social/home/README.md', import.meta.url), 'utf8');
  const registry = await readFile(new URL('../../src/features/social/home/HOME-CAROUSEL-REGISTRY.md', import.meta.url), 'utf8');
  const storiesCss = await readFile(new URL('../../src/features/social/stories/stories-rail.css', import.meta.url), 'utf8');
  assert.equal((css.match(/SOCIAL-HOME-GEOMETRY-004/g) || []).length, 1);
  assert.match(css, /var\(--pl-page-gutter\)/);
  assert.ok(css.includes('.global-people-rail'));
  assert.ok(storiesCss.includes('.sm-stories-rail'));
  assert.match(readme, /SOCIAL-HOME-GEOMETRY-004/);
  assert.match(registry, /SOCIAL-BLOG-ENTRY-001/);
});
test('Social Home section actions remain accessible without sibling-domain distance widgets', async () => {
  const css = await readFile(homeCss, 'utf8');
  assert.match(css, /\.global-section-heading a:hover\s*\{[^}]*color:var\(--pl-color-brand\)/);
  assert.match(css, /\.global-section-heading a:active\s*\{[^}]*color:var\(--pl-color-brand\)/);
  assert.match(css, /\.global-section-heading a:focus-visible\s*\{/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.doesNotMatch(css, /global-local-distance|global-local-rail|global-feature-card|global-product-demo/);
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
  const reels = await readFile(new URL('../../src/features/social/reels/reel-media.js', import.meta.url), 'utf8');
  assert.match(home, /data-content-stream/);
  assert.match(home, /data-feed-refresh/);
  assert.ok(home.includes("data-content-tab=\"' + tab.id"));
  assert.doesNotMatch(home, /label:'Feed'/);
  assert.match(homeStyles, /\.global-content-tabs\s*\{position:sticky;top:0/);
  assert.match(homeStyles, /\.global-header\s*\{position:relative;top:auto/);
  assert.match(postStyles, /width:100vw;max-width:none;margin-inline:calc\(50% - 50vw\)/);
  assert.ok(postStyles.includes('.pl-post-card.is-horizontal') && postStyles.includes('aspect-ratio:16/9'));
  assert.ok(postStyles.includes('.pl-post-card.is-vertical') && postStyles.includes('aspect-ratio:4/5'));
  assert.match(card, /durationSeconds:43/);
  assert.match(card, /durationSeconds:78/);
  assert.match(reels, /Number\(post\.durationSeconds \|\| 0\) <= 60/);
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
  assert.doesNotMatch(home, /window\.scrollTo\(\{top:0,behavior:'smooth'\}\)/);
  assert.match(home, /await loadFeed\(\)/);
  assert.doesNotMatch(home, /window\.setTimeout\(resolve,1500\)/);
  assert.match(homeStyles, /global-content-refresh/);
});

test('social content filters use a refined icon-first tab and labeled actions with Blog opening its own route', async () => {
  const home = await readFile(homeJs, 'utf8');
  const styles = await readFile(homeCss, 'utf8');
  assert.match(home, /\{id:'all',icon:'grid',label:'Semua'\},\{id:'reels',icon:'film',label:'Reel'\},\{id:'blog',icon:'book',label:'Blog'\},\{id:'live',icon:'radio',label:'Live'\}/);
  assert.ok(home.includes("tab.id==='blog'?'<a class=\"global-content-tab-link\""));
  assert.match(home, /renderIcon\(tab\.id==='all'\?'sparkles':tab\.id==='reels'\?'play':tab\.id==='live'\?'radio':'refresh'\)/);
  assert.match(home, /tab\.id==='all'\?'':'<span>' \+ tab\.label/);
  assert.match(home, /'Perbarui feed'/);
  assert.match(styles, /\.global-home-page \.global-content-tabs\s*\{[^}]*position:\s*sticky/s);
  assert.match(home, /composerMarkup \+ '<nav class="global-content-tabs"/);
  assert.match(home, /filter==='blog'&&kind==='blog'/);
  assert.match(styles, /\.global-content-tabs button\s*\{[^}]*display:flex/s);
  assert.match(home, /routeHref\('blog'\)/);
});
test('Social responsive rules are owned by Social stylesheets, not the shared mobile contract',async()=>{
 const [contract,home,social]=await Promise.all([
  readFile(new URL('../../src/design-system/mobile-layout-contract.css',import.meta.url),'utf8'),
  readFile(new URL('../../src/features/social/home/home-page.css',import.meta.url),'utf8'),
  readFile(new URL('../../src/features/social/social-pages.css',import.meta.url),'utf8')
 ]);
 assert.ok(!contract.includes('.global-') && !contract.includes('.social-'));
 assert.ok(home.includes('.global-people-rail') && home.includes('.global-content-section:has(.global-post-list)'));
 assert.ok(social.includes('.social-profile-entity-list.is-carousel') && social.includes('.social-profile-page .social-profile-tab-panel'));
});
