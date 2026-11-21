import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('development preview validates in isolation and cannot deploy to GitHub Pages', async () => {
  const productionWorkflow = await readFile(new URL('../../.github/workflows/deploy.yml', import.meta.url), 'utf8');
  const previewWorkflow = await readFile(new URL('../../.github/workflows/pages.yml', import.meta.url), 'utf8');

  assert.match(productionWorkflow, /pull_request:/);
  assert.match(productionWorkflow, /push:/);
  assert.match(productionWorkflow, /npm test/);
  assert.match(productionWorkflow, /npm run build/);
  assert.doesNotMatch(productionWorkflow, /actions\/configure-pages/);
  assert.doesNotMatch(productionWorkflow, /actions\/upload-pages-artifact/);
  assert.doesNotMatch(productionWorkflow, /actions\/deploy-pages/);

  assert.match(previewWorkflow, /push:\s*\n\s*branches:\s*\n\s*- development\/preview/);
  assert.match(previewWorkflow, /name: Validate PLUITS development preview/);
  assert.match(previewWorkflow, /VITE_PLUITS_DEMO_MODE:\s*'true'/);
  assert.match(previewWorkflow, /npm test/);
  assert.match(previewWorkflow, /npm run build/);
  assert.doesNotMatch(previewWorkflow, /pages:\s*write/);
  assert.doesNotMatch(previewWorkflow, /id-token:\s*write/);
  assert.doesNotMatch(previewWorkflow, /actions\/configure-pages/);
  assert.doesNotMatch(previewWorkflow, /actions\/upload-pages-artifact/);
  assert.doesNotMatch(previewWorkflow, /actions\/deploy-pages/);
  assert.doesNotMatch(previewWorkflow, /environment:/);
});
