import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const changeMap = await readFile(new URL('../../src/CHANGE-MAP.md', import.meta.url), 'utf8');

test('frontend Change Map records ownership, backend contracts, protected surfaces, and verification', () => {
  for (const phrase of [
    'Source-of-truth and ownership',
    'Runtime route map',
    'Backend contracts and protected surfaces',
    'Change rules',
    'Required verification',
    'NOT TESTED / NOT READY'
  ]) assert.ok(changeMap.includes(phrase), 'Missing Change Map section: ' + phrase);
});
