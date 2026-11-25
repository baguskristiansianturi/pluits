import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const read = (path) => readFile(new URL(path, import.meta.url), 'utf8');

test('only explicitly vertical short videos qualify as Reels', async () => {
  const source = await read('../../src/features/social/reels/reel-media.js');
  assert.match(source, /orientation === 'vertical'/);
  assert.match(source, /duration > 0 && duration <= 60/);
  assert.match(source, /video\.videoHeight > video\.videoWidth/);
  assert.match(source, /markAsNonReel\(video\)/);
  assert.match(source, /reelValidated/);
  assert.match(source, /data-reel-candidate/);
  const feed = await read('../../src/features/social/feed/social-post-card.js');
  assert.match(feed, /post\.mediaType==='video'\|\|post\.media_type==='video'/);
  assert.match(source, /post\?\.type === 'video'/);
});

test('Reels autoplay only after portrait metadata validation and while visible', async () => {
  const source = await read('../../src/features/social/reels/reel-media.js');
  assert.match(source, /intersectionRatio < 0\.65/);
  assert.match(source, /video\.pause\(\)/);
  assert.match(source, /video\.muted = true/);
  assert.match(source, /video\.play\(\)/);
  assert.match(source, /prefers-reduced-motion/);
  assert.match(source, /loadedmetadata/);
  assert.match(source, /video\.videoHeight > video\.videoWidth/);
});

test('short Reels loop silently while long and non-portrait videos require user playback', async () => {
  const source = await read('../../src/features/social/reels/reel-media.js');
  assert.match(source, /data-reel-autoplay muted loop playsinline preload="metadata"/);
  assert.match(source, /controls playsinline preload="none"/);
  assert.match(source, /video\.controls = true/);
  assert.doesNotMatch(source, /data-video-limit|data-demo-video|currentTime\s*>?=/);
});

test('dedicated viewer uses shared header, right action rail and safe fallback states', async () => {
  const [page, styles, shell] = await Promise.all([
    read('../../src/features/social/reels/reels-page.js'),
    read('../../src/features/social/reels/reels-page.css'),
    read('../../src/design-system/page-shell.js')
  ]);
  assert.match(page, /renderPageHeader/);
  assert.match(page, /renderIcon\('search'\)/);
  assert.match(page, /renderIcon\('bell'\)/);
  assert.match(page, /data-reels-menu-toggle/);
  assert.match(page, /data-reels-notifications/);
  assert.match(page, /sm-reels-actions/);
  assert.match(page, /data-reel-share/);
  assert.match(page, /data-reel-auth-action/);
  assert.match(page, /new URLSearchParams\(window\.location\.search\)/);
  assert.match(styles, /linear-gradient\(180deg/);
  assert.match(styles, /\.sm-reels-actions/);
  assert.match(styles, /\.sm-reels-caption/);
  assert.match(shell, /renderBrand\(/);
  assert.match(styles, /\.pluits-brand span\{display:none\}/);
});

test('selecting a Reel opens its dedicated viewer with the selected post', async () => {
  const [feed, page, app, routes] = await Promise.all([
    read('../../src/features/social/feed/social-post-card.js'),
    read('../../src/features/social/reels/reels-page.js'),
    read('../../src/app/create-app.js'),
    read('../../src/config/paths.js')
  ]);
  assert.match(feed, /routeHref\('reels'\)/);
  assert.match(feed, /video\[data-reel-autoplay\]/);
  assert.match(page, /data-reel-item/);
  assert.match(page, /mountReelPlayback/);
  assert.match(app, /route === 'reels'.*mountReelsPage/s);
  assert.match(routes, /reels:\s*'reels'/);
});

test('existing feed and Reel card geometry remain owned by their original stylesheets', async () => {
  const [homeCss, postCss, reelCss] = await Promise.all([
    read('../../src/features/social/home/home-page.css'),
    read('../../src/features/social/feed/social-post-card.css'),
    read('../../src/features/social/reels/reel-media.css')
  ]);
  assert.match(homeCss, /grid-template-columns:\s*repeat\(5,\s*minmax\(0,\s*1fr\)\)/);
  assert.match(postCss, /\.pl-post-card\{/);
  assert.match(reelCss, /\.sm-reel-video\s*\{/);
  assert.doesNotMatch(reelCss, /object-fit:\s*cover/);
});
