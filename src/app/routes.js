import { APP_ROUTES } from '../config/paths.js';
const ROUTES = new Set(Object.keys(APP_ROUTES));
const ROUTE_KEYS_BY_PATH = new Map(Object.entries(APP_ROUTES).map(([key, path]) => [path, key]));
export function resolveRoute(hash = '', search = '') {
  const query = new URLSearchParams(String(search || '').replace(/^\?/, ''));
  if (query.get('auth') === 'reset') return 'reset';
  const raw = String(hash || '').replace(/^#\/?/, '').split('?')[0];
  if (!raw) return 'home';
  const route = raw.replace(/^\/+|\/+$/g, '');
  return ROUTES.has(route) ? route : (ROUTE_KEYS_BY_PATH.get(route) || 'register');
}
export function resolveAuthenticatedRoute(route, hasSession, developerPreview = false) {
  // Frontend-only preview grants navigation through every app route with a mock identity.
  // It does not modify or bypass Supabase/backend authorization.
  if (developerPreview) return route;
  if (['dashboard','social','messages','profile','settings'].includes(route) && !hasSession) return 'login';
  if (route === 'circle') return 'social';
  if (hasSession && ['register', 'login', 'forgot'].includes(route)) return 'social';
  return route;
}