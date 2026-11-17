import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveRoute, resolveAuthenticatedRoute } from '../src/app/routes.js';

test('unknown and empty paths start at registration', () => {
  assert.equal(resolveRoute('', ''), 'register');
  assert.equal(resolveRoute('#/old-home', ''), 'register');
});

test('auth routes and password recovery callback resolve correctly', () => {
  assert.equal(resolveRoute('#/login', ''), 'login');
  assert.equal(resolveRoute('#/forgot', ''), 'forgot');
  assert.equal(resolveRoute('#/register', ''), 'register');
  assert.equal(resolveRoute('#/workspace', '?auth=reset'), 'reset');
});

test('workspace is guarded by a session', () => {
  assert.equal(resolveAuthenticatedRoute('workspace', false), 'login');
  assert.equal(resolveAuthenticatedRoute('workspace', true), 'workspace');
});

test('signed-in users are sent to workspace from guest auth screens', () => {
  assert.equal(resolveAuthenticatedRoute('register', true), 'workspace');
  assert.equal(resolveAuthenticatedRoute('login', true), 'workspace');
  assert.equal(resolveAuthenticatedRoute('forgot', true), 'workspace');
});
