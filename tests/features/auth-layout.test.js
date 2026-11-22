import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('account form is the first task on mobile while desktop keeps the two-column layout', async () => {
  const css = await readFile(new URL('../../src/features/auth/auth-page.css', import.meta.url), 'utf8');
  assert.match(css, /grid-template-areas:\s*"intro form"/);
  assert.match(css, /grid-template-areas:\s*"form"\s*"intro"/);
  assert.match(css, /\.auth-intro-panel\s*\{[^}]*grid-area:\s*intro/s);
  assert.match(css, /\.auth-card\s*\{[^}]*grid-area:\s*form/s);
});

test('account controls expose a visible keyboard focus state', async () => {
  const css = await readFile(new URL('../../src/features/auth/auth-page.css', import.meta.url), 'utf8');
  assert.match(css, /\.auth-page :is\(a, button, input\):focus-visible/);
});
