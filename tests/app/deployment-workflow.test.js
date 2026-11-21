import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('GitHub Pages production deploys from main while development preview only validates', async () => {
  const production = await readFile(new URL('../../.github/workflows/deploy.yml', import.meta.url), 'utf8');
  const preview = await readFile(new URL('../../.github/workflows/pages.yml', import.meta.url), 'utf8');
  const vite = await readFile(new URL('../../vite.config.js', import.meta.url), 'utf8');

  assert.match(production, /push:\s*\n\s*branches:\s*\n\s*- main/);
  assert.match(production, /npm test/);
  assert.match(production, /npm run build/);
  assert.match(production, /actions\/configure-pages/);
  assert.match(production, /actions\/upload-pages-artifact/);
  assert.match(production, /actions\/deploy-pages/);
  assert.match(production, /name: github-pages/);
  assert.match(vite, /base: '\/pluits\//);

  assert.match(preview, /push:\s*\n\s*branches:\s*\n\s*- development\/preview/);
  assert.match(preview, /name: Validate PLUITS development preview/);
  assert.match(preview, /npm test/);
  assert.match(preview, /npm run build/);
  assert.doesNotMatch(preview, /pages:\s*write/);
  assert.doesNotMatch(preview, /id-token:\s*write/);
  assert.doesNotMatch(preview, /actions\/configure-pages/);
  assert.doesNotMatch(preview, /actions\/upload-pages-artifact/);
  assert.doesNotMatch(preview, /actions\/deploy-pages/);
  assert.doesNotMatch(preview, /environment:/);
});
