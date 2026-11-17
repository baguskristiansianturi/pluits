import { readdir, readFile, stat } from 'node:fs/promises';
import { join, relative, resolve } from 'node:path';

const root = resolve('src');
const required = [
  'main.js',
  'app/create-app.js',
  'app/routes.js',
  'config/runtime.js',
  'design-system/tokens.css',
  'design-system/icons.js',
  'design-system/layouts.js',
  'features/auth/auth-page.js',
  'features/workspace/workspace-page.js',
  'services/auth/auth-service.js',
  'lib/supabase/client.js'
];

for (const path of required) {
  try {
    await stat(join(root, path));
  } catch {
    throw new Error('Required frontend module is missing: src/' + path);
  }
}

async function walk(directory) {
  const output = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) output.push(...await walk(path));
    else if (entry.name.endsWith('.js')) output.push(path);
  }
  return output;
}

const files = await walk(root);
const failures = [];

for (const file of files) {
  const source = await readFile(file, 'utf8');
  const owner = relative(root, file).split('/')[0];
  const imports = [...source.matchAll(/(?:from\s*|import\s*)['"]([^'"]+)['"]/g)].map((match) => match[1]);

  for (const specifier of imports) {
    if (!specifier.startsWith('.')) continue;
    const target = resolve(file, '..', specifier);
    const targetRelative = relative(root, target).replaceAll('\\', '/');
    const targetOwner = targetRelative.split('/')[0];

    if (owner === 'services' && ['app', 'features', 'components', 'design-system', 'styles'].includes(targetOwner)) {
      failures.push(relative(process.cwd(), file) + ' imports UI/application layer: ' + specifier);
    }
    if (owner === 'features' && ['app', 'pages'].includes(targetOwner)) {
      failures.push(relative(process.cwd(), file) + ' imports app/page layer: ' + specifier);
    }
    if (owner === 'lib' && ['app', 'features', 'services', 'components', 'design-system'].includes(targetOwner)) {
      failures.push(relative(process.cwd(), file) + ' imports an upper layer: ' + specifier);
    }
  }
}

if (failures.length) {
  throw new Error('Frontend module-boundary violations:\n' + failures.join('\n'));
}

console.log('Frontend architecture checks passed (' + files.length + ' JavaScript modules).');
