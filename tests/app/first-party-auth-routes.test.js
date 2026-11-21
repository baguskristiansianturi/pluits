import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveRoute } from '../src/app/routes.js';

test('first-party verification links resolve to the verification screen', () => {
  assert.equal(resolveRoute('/pluits/', '?auth=verify&token=one-time'), 'verify');
});

test('first-party password reset links preserve the reset route', () => {
  assert.equal(resolveRoute('/pluits/', '?auth=reset&token=one-time'), 'reset');
});
