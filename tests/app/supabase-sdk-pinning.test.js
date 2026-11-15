import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const client = await readFile(new URL('../../src/lib/supabase/client.js', import.meta.url), 'utf8');
const uploader = await readFile(new URL('../../src/features/media/storage-upload.js', import.meta.url), 'utf8');

test('critical Supabase SDK runtime dependency is pinned to an exact release', () => {
  assert.match(client, /@supabase\/supabase-js@2\.119\.0/);
  assert.doesNotMatch(client, /@supabase\/supabase-js@2['"]/);
  assert.match(uploader, /tus-js-client@4\.3\.1/);
});
