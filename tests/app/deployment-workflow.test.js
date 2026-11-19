import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('GitHub Pages production deploys from main after tests and build', async () => {
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
  assert.match(preview, /if: github\.ref == 'refs\/heads\/development\/preview'/);
  assert.match(preview, /VITE_PLUITS_DEMO_MODE:\s*'true'/);
  assert.match(preview, /npm test/);
  assert.match(preview, /npm run build/);
  assert.match(preview, /actions\/upload-pages-artifact/);
  assert.match(preview, /actions\/deploy-pages/);
});
