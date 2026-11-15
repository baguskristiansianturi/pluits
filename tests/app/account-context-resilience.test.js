import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('missing optional account context tables do not block personal account pages', async () => {
  const source = await readFile(new URL('../../src/pages/account/account-context.js', import.meta.url), 'utf8');
  assert.match(source, /function isMissingOptionalTable\(error,table\)/);
  assert.match(source, /code==='42P01'\|\|code==='PGRST205'/);
  assert.match(source, /prefResult\.error&&!isMissingOptionalTable\(prefResult\.error,'account_context_preferences'\)/);
  assert.match(source, /professionalResult\.error&&!isMissingOptionalTable\(professionalResult\.error,'professional_profiles'\)/);
  assert.match(source, /if\(error&&!isMissingOptionalTable\(error,'account_content_preferences'\)\)throw error/);
  assert.match(source, /These context tables are optional during staged rollout/);
});
