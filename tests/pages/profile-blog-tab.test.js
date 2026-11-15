import {readAccountCss} from '../helpers/account-css.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('Profile content tabs expose Feed, Reels, Trip and Blog with consistent SVG icons', async () => {
  const source = await readFile(new URL('../../src/pages/account/index.js', import.meta.url), 'utf8');
  const profilePage = await readFile(new URL('../../src/features/profile/profile-page.js', import.meta.url), 'utf8');
  const publicProfilePage = await readFile(new URL('../../src/features/profile/public-profile-page.js', import.meta.url), 'utf8');
  const blogFeature = await readFile(new URL('../../src/features/profile/profile-blog-tab.js', import.meta.url), 'utf8');
  const css = readAccountCss();
  for (const tab of ['posts', 'reels', 'trip', 'blog']) assert.match(profilePage, new RegExp('data-profile-tab="' + tab + '"'));
  assert.match(source, /<svg viewBox="0 0 24 24" aria-hidden="true">/);
  assert.match(source, /async function profileBlogMarkup\(\)/);
  assert.match(source, /renderProfileBlogTab\(/);
  assert.match(blogFeature, /blog_public_routes/);
  assert.match(profilePage, /data-profile-username=/);
  assert.match(publicProfilePage, /data-profile-username=/);
  assert.match(source, /bindProfileTabs\(\);return;/);
  assert.match(blogFeature, /Kunjungi Blog/);
  assert.doesNotMatch(source, /data-profile-tab="tagged"/);
  assert.match(css, /grid-template-columns:repeat\(4,minmax\(0,1fr\)\)!important/);
  assert.match(css, /ua-profile-blog-card/);
  assert.match(css, /ua-public-profile \.ua-profile-tabs/);
});
