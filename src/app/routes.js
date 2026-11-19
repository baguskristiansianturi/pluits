import { APP_ROUTES } from '../config/paths.js';

const ROUTE_KEYS_BY_PATH = new Map(
  Object.entries(APP_ROUTES).map(([key, path]) => [path, key])
);
const BASE_PATH = new URL(import.meta.env.BASE_URL, window.location.origin).pathname;

export function resolveRoute(pathname = window.location.pathname, search = window.location.search) {
  const query = new URLSearchParams(String(search || '').replace(/^\?/, ''));
  if (query.get('auth') === 'reset') return 'reset';

  let path = String(pathname || '/');
  if (path.startsWith(BASE_PATH)) path = path.slice(BASE_PATH.length);
  path = path.replace(/^\/+|\/+$/g, '');

  if (!path) return 'home';
  return ROUTE_KEYS_BY_PATH.get(path) || 'register';
}

export function resolveAuthenticatedRoute(route, hasSession) {
  if (['dashboard', 'social', 'messages', 'profile', 'settings'].includes(route) && !hasSession) return 'login';
  if (route === 'circle') return 'social';
  if (hasSession && ['register', 'login', 'forgot'].includes(route)) return 'social';
  return route;
}
