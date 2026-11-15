import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const migration = await readFile(new URL('../../supabase/migrations/20261115123729_prevent_false_actioned_user_reports.sql', import.meta.url), 'utf8');
const page = await readFile(new URL('../../src/pages/admin/moderation.js', import.meta.url), 'utf8');

test('user reports cannot be marked actioned without account enforcement', () => {
  assert.match(migration, /p_decision='actioned' and v_report\.target_type='user'/);
  assert.match(migration, /Account-level moderation is not available yet/);
});

test('moderation UI does not offer a false action button for user reports', () => {
  assert.match(page, /x\.target_type==='user'\?/);
  assert.match(page, /Tindakan akun belum tersedia/);
});
