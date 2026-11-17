import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('../..', import.meta.url)));

test('change-scope safety checklist is present and defines required ownership and verification gates', () => {
  const file = resolve(root, 'PLUITS-MASTER-MODEL-APP/03-APPLICATION-MODULARIZATION/CHANGE-SCOPE-SAFETY-CHECKLIST.md');
  assert.equal(existsSync(file), true);
  const content = readFileSync(file, 'utf8');
  for (const phrase of [
    'Before editing',
    'Define the change boundary',
    'During implementation',
    'Required verification',
    'Pull request evidence',
    'Completion states',
    'Scope rule',
    'Protected surfaces',
    'NOT TESTED',
    'ACCEPTED'
  ]) assert.ok(content.includes(phrase), 'Missing change-control requirement: ' + phrase);
});
