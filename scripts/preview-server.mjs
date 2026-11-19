import { createServer } from 'node:http';
import { createReadStream, statSync } from 'node:fs';
import { resolve, extname, sep } from 'node:path';
import { timingSafeEqual } from 'node:crypto';

const root = resolve('dist');
const username = process.env.PREVIEW_USERNAME;
const password = process.env.PREVIEW_PASSWORD;
if (!username || !password) throw new Error('Preview access credentials are required.');

const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8'
};

function same(a, b) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

createServer((req, res) => {
  const header = req.headers.authorization || '';
  let authorized = false;
  if (header.startsWith('Basic ')) {
    try {
      const decoded = Buffer.from(header.slice(6), 'base64').toString('utf8');
      const split = decoded.indexOf(':');
      authorized = split >= 0 &&
        same(decoded.slice(0, split), username) &&
        same(decoded.slice(split + 1), password);
    } catch {}
  }

  if (!authorized) {
    res.writeHead(401, {
      'WWW-Authenticate': 'Basic realm="PLUITS Development Preview", charset="UTF-8"',
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex, nofollow'
    });
    res.end('Akses preview PLUITS memerlukan autentikasi.');
    return;
  }

  const pathname = new URL(req.url || '/', 'http://localhost').pathname;
  if (pathname === '/') {
    res.writeHead(302, { Location: '/pluits/', 'Cache-Control': 'no-store' });
    res.end();
    return;
  }
  if (pathname !== '/pluits' && !pathname.startsWith('/pluits/')) {
    res.writeHead(404, { 'X-Robots-Tag': 'noindex, nofollow' });
    res.end('Not found');
    return;
  }

  const relative = decodeURIComponent(pathname.slice('/pluits'.length)).replace(/^\/+/, '');
  const candidate = resolve(root, relative || 'index.html');
  if (candidate !== root && !candidate.startsWith(root + sep)) {
    res.writeHead(400); res.end('Bad request'); return;
  }

  let file = candidate;
  try {
    if (statSync(file).isDirectory()) file = resolve(file, 'index.html');
    if (!statSync(file).isFile()) throw new Error('Not a file');
  } catch {
    file = resolve(root, 'index.html');
  }

  res.writeHead(200, {
    'Content-Type': types[extname(file).toLowerCase()] || 'application/octet-stream',
    'Cache-Control': extname(file) === '.html' ? 'no-store' : 'public, max-age=300',
    'X-Robots-Tag': 'noindex, nofollow',
    'X-Content-Type-Options': 'nosniff'
  });
  createReadStream(file).pipe(res);
}).listen(Number(process.env.PORT) || 10000, '0.0.0.0');
