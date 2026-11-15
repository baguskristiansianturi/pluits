import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';

const roots = ['src/components', 'src/features', 'src/pages'];
const globalStyleFiles = ['src/style.css', 'src/styles/brand.css', 'src/styles/page-transitions.css', 'src/styles/social-components.css', 'src/styles/social-navigation.css', 'styles/home-layout.css'];
const legacyGlobalSelectors = new Set(readFileSync('scripts/global-style-legacy-selectors.txt', 'utf8').split(/\r?\n/).map(value => value.trim()).filter(Boolean));
const allowedRoots = /^(?:\.pl-|\.ua-|\.ds-|\.plds-|\.pluits-|#pl-)/;
const approvedPageRootSelectors = new Set([
  'html:has(.pl-msg)',
  'body:has(.pl-msg)',
  '#app:has(.pl-msg)'
]);
const keyframeStep = /^(?:from|to|\d+(?:\.\d+)?%)$/i;
const files = [];

function walk(directory) {
  for (const entry of readdirSync(directory)) {
    const fullPath = path.join(directory, entry);
    if (statSync(fullPath).isDirectory()) walk(fullPath);
    else if (entry.endsWith('.css')) files.push(fullPath);
  }
}

for (const root of roots) walk(root);

function splitSelectorList(input) {
  const selectors = [];
  let start = 0;
  let depth = 0;
  let quote = '';
  for (let i = 0; i < input.length; i += 1) {
    const char = input[i];
    if (quote) {
      if (char === quote && input[i - 1] !== '\\') quote = '';
      continue;
    }
    if (char === '"' || char === "'") quote = char;
    else if (char === '(' || char === '[') depth += 1;
    else if (char === ')' || char === ']') depth -= 1;
    else if (char === ',' && depth === 0) {
      selectors.push(input.slice(start, i).trim());
      start = i + 1;
    }
  }
  selectors.push(input.slice(start).trim());
  return selectors.filter(Boolean);
}

const violations = [];
for (const file of files) {
  const css = readFileSync(file, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
  // Check qualified rules, including rules nested inside @media/@supports.
  // At-rules and keyframe percentage steps are not page selectors.
  for (const match of css.matchAll(/(?:^|[{}])\s*([^@{}][^{}]*)\s*\{/g)) {
    const selectorBlock = match[1].trim();
    if (!selectorBlock || selectorBlock.startsWith('@')) continue;
    for (const selector of splitSelectorList(selectorBlock)) {
      if (keyframeStep.test(selector)) continue;
      if (!allowedRoots.test(selector) && !approvedPageRootSelectors.has(selector)) {
        violations.push(path.relative(process.cwd(), file) + ': ' + selector);
      }
    }
  }
}


// Global legacy styles are grandfathered by exact selector, not by filename.
// This prevents new broad selectors from silently entering the app-wide cascade.
for (const file of globalStyleFiles) {
  const css = readFileSync(file, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
  for (const match of css.matchAll(/(?:^|[{}])\s*([^@{}][^{}]*)\s*\{/g)) {
    const selectorBlock = match[1].trim();
    if (!selectorBlock || selectorBlock.startsWith('@')) continue;
    for (const selector of splitSelectorList(selectorBlock)) {
      if (keyframeStep.test(selector) || allowedRoots.test(selector)) continue;
      if (!legacyGlobalSelectors.has(selector)) {
        violations.push(path.relative(process.cwd(), file) + ': new unscoped global selector: ' + selector);
      }
    }
  }
}

assert.deepEqual(
  violations,
  [],
  'Component, feature and page CSS must be scoped to an owned root. Global styles may only retain exact selectors in scripts/global-style-legacy-selectors.txt; new broad selectors require explicit baseline review. Page-root exceptions must be exact and reviewed:\n- ' + violations.join('\n- ')
);
console.log('CSS ownership verified across ' + files.length + ' component, feature and page stylesheets.');
