import { APP_ROUTES } from '../config/paths.js';

const ROUTE_KEYS_BY_PATH = new Map(
  Object.entries(APP_ROUTES).map(([key, path]) => [path, key])
);
const PUBLIC_BASE_URL = import.meta.env?.BASE_URL || '/pluits/';
const BASE_PATH = new URL(PUBLIC_BASE_URL, 'https://pluits.invalid').pathname;

export function resolveRoute(pathname = window.location.pathname, search = window.location.search) {
  const query = new URLSearchParams(String(search || '').replace(/^\?/, ''));
  if (query.get('auth') === 'reset') return 'reset';
  if (query.get('auth') === 'verify') return 'verify';

  let path = String(pathname || '/');
  if (path.startsWith(BASE_PATH)) path = path.slice(BASE_PATH.length);
  path = path.replace(/^\/+|\/+$/g, '');

  if (!path) return 'home';
  return ROUTE_KEYS_BY_PATH.get(path) || 'register';
}

// Frontend preview mode: every page remains directly browsable without a
// session. Authentication is intentionally not a navigation prerequisite.
// Login, registration and recovery routes remain available as UI pages.
export function resolveAuthenticatedRoute(route) {
  if (route === 'circle') return 'social';
  return route;
}
