import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('social home uses the first-party Go API for feed and text post creation', async () => {
  const source = await readFile(new URL('../../src/features/home/home-page.js', import.meta.url), 'utf8');
  assert.match(source, /API_BASE_URL\s*\+\s*'\/v1\/social\/feed/);
  assert.match(source, /API_BASE_URL\s*\+\s*'\/v1\/social\/posts'/);
  assert.match(source, /Authorization:\s*'Bearer '\s*\+\s*accessToken/);
  assert.match(source, /visibility:\s*composer\.elements\.visibility\.value/);
  assert.match(source, /maxlength="5000"/);
});

test('authenticated session token is passed only to the social home feature', async () => {
  const source = await readFile(new URL('../../src/app/create-app.js', import.meta.url), 'utf8');
  assert.match(source, /mountHomePage\(\{\s*root,\s*user:\s*session\?\.user\s*\|\|\s*null,\s*accessToken:\s*session\?\.access_token/);
});


test('authenticated profile loads only the current account posts from the Go API', async () => {
  const profile = await readFile(new URL('../../src/features/social/social-pages.js', import.meta.url), 'utf8');
  const app = await readFile(new URL('../../src/app/create-app.js', import.meta.url), 'utf8');
  assert.match(profile, /API_BASE_URL\s*\+\s*'\/v1\/social\/posts\/me'/);
  assert.match(profile, /Authorization:\s*'Bearer '\s*\+\s*accessToken/);
  assert.match(profile, /post\.visibility\s*===\s*'private'/);
  assert.match(profile, /controller\.abort\(\)/);
  assert.match(app, /mountProfilePage\(\{\s*root,\s*user:\s*session\?\.user\s*\|\|\s*null,\s*accessToken:\s*session\?\.access_token/);
});
