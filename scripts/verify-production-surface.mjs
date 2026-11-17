import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const sourceRoot = 'src';
const packageJson = JSON.parse(await readFile('package.json', 'utf8'));
const indexHtml = await readFile('index.html', 'utf8');
const workflow = await readFile('.github/workflows/deploy.yml', 'utf8');

async function walk(directory) {
  const output = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) output.push(...await walk(path));
    else if (/\.(js|css)$/.test(entry.name)) output.push(path);
  }
  return output;
}

const runtimeFiles = await walk(sourceRoot);
const runtime = (await Promise.all(runtimeFiles.map((path) => readFile(path, 'utf8')))).join('\n');

if (/service[_-]?role\s*[:=]\s*['"]|sb_secret_[A-Za-z0-9]+/i.test(runtime)) {
  throw new Error('A privileged Supabase secret appears in browser runtime code.');
}
if (!runtime.includes('@supabase/supabase-js@2.119.0')) {
  throw new Error('The Supabase browser SDK must remain version-pinned.');
}
if (!indexHtml.includes('/src/main.js')) {
  throw new Error('index.html must load the new frontend entry point.');
}
if (!packageJson.scripts?.test?.includes('verify:architecture')) {
  throw new Error('npm test must run the architecture boundary gate.');
}
if (!workflow.includes('npm test') || !workflow.includes('npm run build')) {
  throw new Error('GitHub Actions must test and build before deployment.');
}
if (runtimeFiles.some((path) => /pages\/account|components\/social|style\.css/.test(path))) {
  throw new Error('Legacy frontend runtime paths remain in the new source tree.');
}

console.log('Production surface checks passed (' + runtimeFiles.length + ' runtime files).');
