import { copyFile, mkdir, readFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';

const configPath = resolve('src/config/paths.js');
const sourceHtml = resolve('dist/index.html');
const outputRoot = resolve('dist');
const source = await readFile(configPath, 'utf8');
const routesBlock = source.match(/export const APP_ROUTES = Object\.freeze\(\{([\s\S]*?)\}\);/);

if (!routesBlock) throw new Error('Could not read APP_ROUTES from src/config/paths.js.');

const routes = [...routesBlock[1].matchAll(/([A-Za-z_$][\w$]*):\s*'([^']*)'/g)]
  .map((match) => ({ key: match[1], slug: match[2] }));
const slugs = routes.map(({ slug }) => slug).filter(Boolean);

if (new Set(slugs).size !== slugs.length) {
  throw new Error('Every PLUITS route must have a unique URL slug.');
}

for (const slug of slugs) {
  const routeDirectory = join(outputRoot, slug);
  await mkdir(routeDirectory, { recursive: true });
  await copyFile(sourceHtml, join(routeDirectory, 'index.html'));
}

await copyFile(sourceHtml, join(outputRoot, '404.html'));
console.log('Generated ' + slugs.length + ' direct-load PLUITS route pages for GitHub Pages.');
