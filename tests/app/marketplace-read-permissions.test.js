import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const migration = await readFile(new URL('../../supabase/migrations/20261115122348_enforce_marketplace_order_payment_read_permissions.sql', import.meta.url), 'utf8');

test('marketplace order reads require buyer ownership or order/payment permission', () => {
  assert.match(migration, /buyer_user_id = \(select auth\.uid\(\)\)/);
  assert.match(migration, /private\.has_store_permission\(store_id, 'orders\.manage'\)/);
  assert.match(migration, /private\.has_store_permission\(store_id, 'payments\.manage'\)/);
  assert.doesNotMatch(migration, /sm\.member_status\s*=\s*'active'/);
});

test('marketplace payment metadata is restricted to buyers and payment operators', () => {
  assert.match(migration, /buyer_user_id = \(select auth\.uid\(\)\)/);
  assert.match(migration, /private\.has_store_permission\(o\.store_id, 'payments\.manage'\)/);
  assert.doesNotMatch(migration, /private\.has_store_permission\(o\.store_id, 'orders\.manage'\)/);
});
