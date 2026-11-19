import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('Profile route imports the shared brand renderer it uses', async () => {
  const social = await readFile(new URL('../../src/features/social/social-pages.js', import.meta.url), 'utf8');
  const app = await readFile(new URL('../../src/app/create-app.js', import.meta.url), 'utf8');
  assert.match(social, /import \{ renderPageHeader, renderBrand \} from '\.\.\/\.\.\/design-system\/page-shell\.js'/);
  assert.match(social, /renderBrand\(\{href:routeHref\('home'\),label:'PLUITS'\}\)/);
  assert.match(app, /if\(route==='profile'\)\{cleanupPage=mountProfilePage/);
});
