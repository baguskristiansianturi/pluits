import test from 'node:test';
import assert from 'node:assert/strict';
import { renderIcon, socialIcon } from '../../src/design-system/icons/index.js';
import { icon as generalIcons } from '../../src/design-system/icons/registry.js';
import { icon as appIcons } from '../../src/design-system/icons/app-registry.js';
import { SOCIAL_ICON_NAMES } from '../../src/design-system/icons/social-registry.js';

const registeredNames = [...new Set([...Object.keys(generalIcons), ...Object.keys(appIcons), ...SOCIAL_ICON_NAMES])];

test('every registered icon resolves to a local, sized, decorative SVG', () => {
  assert.ok(registeredNames.length > 40);
  for (const name of registeredNames) {
    const markup = renderIcon(name);
    assert.match(markup, /^<svg\b/, name + ' must render an SVG');
    assert.match(markup, /\bwidth="20"/, name + ' must have a default width');
    assert.match(markup, /\bheight="20"/, name + ' must have a default height');
    assert.match(markup, /\baria-hidden="true"/, name + ' must be decorative');
    assert.match(markup, /\bfocusable="false"/, name + ' must not enter keyboard focus');
    assert.match(markup, /viewBox="0 0 24 24"/, name + ' must use the standard viewBox');
  }
});

test('legacy icon markup receives styling, dimensions and accessibility attributes', () => {
  const markup = renderIcon('search', { size: 32, className: 'toolbar-icon active' });
  assert.match(markup, /^<svg\b/);
  assert.match(markup, /class="pl-icon toolbar-icon active"/);
  assert.match(markup, /\bwidth="32"/);
  assert.match(markup, /\bheight="32"/);
  assert.match(markup, /\baria-hidden="true"/);
  assert.match(markup, /\bfocusable="false"/);
});

test('icon facade clamps requested sizes and preserves caller classes safely', () => {
  const markup = renderIcon('store', { size: 100, className: 'toolbar-icon active' });
  assert.match(markup, /width="48"/);
  assert.match(markup, /height="48"/);
  assert.match(markup, /class="pl-icon toolbar-icon active"/);
  assert.doesNotMatch(markup, /<script|onload=/i);
});

test('unknown icon names fail closed without injecting arbitrary markup', () => {
  assert.equal(renderIcon('not-a-real-icon'), '');
  assert.equal(socialIcon('not-a-real-icon'), '');
  assert.doesNotMatch(renderIcon('store', { className: '" onload="alert(1)' }), /onload=/i);
});
