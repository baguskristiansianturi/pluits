import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const migration = await readFile(new URL('../../supabase/migrations/20261110115836_allow_post_media_storage_reads.sql', import.meta.url), 'utf8');

test('post media storage reads authorize media linked through post_media records', () => {
  assert.match(migration, /from public\.post_media pm/);
});
