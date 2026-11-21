import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const migration = await readFile(new URL('../../backend/legacy-schema-reference/sql/migrations/20261115123634_protect_user_post_moderation_status.sql', import.meta.url), 'utf8');

test('post owners cannot set internal moderation states or reverse moderator decisions', () => {
  assert.match(migration, /before insert or update of moderation_status on public\.user_posts/i);
  assert.match(migration, /new\.moderation_status := 'published'/);
  assert.match(migration, /new\.moderation_status is distinct from old\.moderation_status/);
  assert.match(migration, /Only a Pluits moderator can change post moderation status/);
});

test('moderators and service role retain the ability to apply moderation decisions', () => {
  assert.match(migration, /v_app_role in \('admin', 'moderator'\) or v_request_role = 'service_role'/);
  assert.match(migration, /set search_path = ''/);
  assert.doesNotMatch(migration, /security definer/i);
});
