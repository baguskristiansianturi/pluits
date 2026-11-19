import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('GitHub Pages deploys only a validated development preview, never production code from main', async () => {
  const validation = await readFile(new URL('../../.github/workflows/deploy.yml', import.meta.url), 'utf8');
  const preview = await readFile(new URL('../../.github/workflows/pages.yml', import.meta.url), 'utf8');

  assert.match(validation, /pull_request:\s*\n\s*branches:\s*\n\s*- main/);
  assert.match(validation, /push:\s*\n\s*branches:[\s\S]*- main[\s\S]*- development\/preview/);
  assert.match(validation, /npm test/);
  assert.match(validation, /npm run build/);
  assert.doesNotMatch(validation, /actions\/deploy-pages/);

  assert.match(preview, /workflow_run:/);
  assert.match(preview, /workflows:\s*\n\s*- Validate PLUITS/);
  assert.match(preview, /head_branch == 'development\/preview'/);
  assert.match(preview, /conclusion == 'success'/);
  assert.match(preview, /ref: \$\{\{ github\.event\.workflow_run\.head_sha \}\}/);
  assert.match(preview, /VITE_PLUITS_DEMO_MODE:\s*'true'/);
  assert.match(preview, /actions\/upload-pages-artifact/);
  assert.match(preview, /actions\/deploy-pages/);
});
