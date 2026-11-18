export const APP_ROUTES = Object.freeze({ home:'home', dashboard:'dashboard', register:'register', login:'login', forgot:'forgot', reset:'reset', terms:'terms', privacy:'privacy' });
export function routeHref(route) {
  const path = APP_ROUTES[route];
  if (!path) throw new TypeError('Unknown PLUITS route: ' + route);
  return '#/' + path;
}
