import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const client = await readFile(new URL('../../src/lib/supabase/client.js', import.meta.url), 'utf8');

test('the new browser client pins Supabase JS and uses the existing project publishable key', () => {
  assert.match(client, /@supabase\/supabase-js@2\.119\.0/);
  assert.match(client, /ytndswhqxayqpftszwfh\.supabase\.co/);
  assert.match(client, /sb_publishable_/);
  assert.doesNotMatch(client, /service_role|sb_secret_/i);
});
