/** Canonical, human-readable PLUITS page URLs. GitHub Pages is hosted under /pluits/. */
export const SITE_BASE = '/pluits/';
export const ROUTES = Object.freeze({
  publicHome: SITE_BASE,
  home: SITE_BASE + 'circle/',
  discover: SITE_BASE + 'discover/',
  create: SITE_BASE + 'create/',
  inbox: SITE_BASE + 'inbox/',
  activity: SITE_BASE + 'notifications/',
  profile: SITE_BASE + 'profile/',
  login: SITE_BASE + 'login/',
  contacts: SITE_BASE + 'followers/',
  saved: SITE_BASE + 'saved/',
  places: SITE_BASE + 'places/',
  marketplace: SITE_BASE + 'marketplace/',
  trip: SITE_BASE + 'trips/',
  reels: SITE_BASE + 'reels/',
  register: SITE_BASE + 'register/',
  settings: SITE_BASE + 'settings/',
  editProfile: SITE_BASE + 'profile/edit/'
});
export const NAVIGATION_CONTEXTS = Object.freeze({
  social: Object.freeze(['home','discover','create','inbox','profile']),
  inbox: Object.freeze(['home','discover','create','activity','profile']),
  store: Object.freeze(['storeHome','savedProducts','cart','account']),
  checkout: Object.freeze([])
});
const PROTECTED = new Set(['home','create','inbox','activity','profile','contacts','saved','settings','editProfile']);
export function getRoute(name, authenticated = true) {
  if (!Object.hasOwn(ROUTES, name)) throw new Error(`Unknown PLUITS route: ${name}`);
  return !authenticated && PROTECTED.has(name) ? ROUTES.login : ROUTES[name];
}

/** Convert historic hash routes to one readable path. Used for old links and bookmarks. */
export function canonicalizeLegacyRoute(value = '') {
  const raw = String(value).replace(/^#?\/?/, '');
  const [pathname, query = ''] = raw.split('?');
  const parts = pathname.split('/').filter(Boolean);
  const [a,b,c] = parts;
  let path = SITE_BASE;
  const fixed = {
    '': '', circle: 'circle/', home: 'circle/', feed: 'circle/', explore: 'circle/',
    search: 'discover/', discover: 'discover/', inbox: 'inbox/', message: 'inbox/', messages: 'inbox/',
    login: 'login/', register: 'register/', profile: 'profile/', places: 'places/',
    marketplace: 'marketplace/', trip: 'trips/', trips: 'trips/', reels: 'reels/',
    followers: 'followers/', following: 'following/', saved: 'saved/', notifications: 'notifications/',
    help: 'help/', blog: 'blog/', terms: 'terms/', privacy: 'privacy/', guidelines: 'guidelines/'
  };
  if (a === 'account') {
    const accountMap = {
      explore:'circle/', home:'circle/', feed:'circle/', create:'create/', compose:'create/',
      inbox:'inbox/', message:'inbox/', messages:'inbox/', activity:'notifications/',
      profile:'profile/', followers:'followers/', following:'following/', requests:'follow-requests/',
      saved:'saved/', reels:'reels/', settings:'settings/', auth:'login/', login:'login/',
      register:'register/', blog:'blog-studio/', wallet:'wallet/', addresses:'addresses/', reel:'reels/create/', story:'stories/create/', preview:'profile/preview/', drafts:'create/drafts/'
    };
    path += accountMap[b] || (b ? b + '/' : '');
    if (b === 'profile' && c === 'edit') path = SITE_BASE + 'profile/edit/';
    else if (b === 'profile' && c) path += encodeURIComponent(c) + '/';
    else if (b === 'post' && c) path = SITE_BASE + 'posts/' + encodeURIComponent(c) + '/';
  } else if (a === 'inbox' && b === 'settings') path += 'inbox/settings/';
  else if (a === 'market-cart' || a === 'cart') path += 'marketplace/cart/';
  else if (a === 'market-checkout' || a === 'checkout') path += 'marketplace/checkout/';
  else if (a === 'market-orders' || a === 'orders') path += 'marketplace/orders/';
  else if (a === 'market-order' || a === 'order') path += 'marketplace/orders/' + (b ? encodeURIComponent(b) + '/' : '');
  else if (a === 'market-product') path += 'marketplace/product/' + (b ? encodeURIComponent(b) + '/' : '');
  else if (a === 'place') path += 'places/' + (b ? encodeURIComponent(b) + '/' : '') + (c === 'claim' ? 'claim/' : '');
  else if (a?.startsWith('@')) path += encodeURIComponent(a) + '/';
  else if (a && fixed[a] !== undefined) path += fixed[a] + (b ? encodeURIComponent(b) + '/' : '');
  else if (a) path += encodeURIComponent(a) + '/' + parts.slice(1).map(encodeURIComponent).join('/') + (parts.length > 1 ? '/' : '');
  return path + (query ? '?' + query : '');
}

/** Resolve the current browser address into the router's historic internal route key. */
export function getInternalRoute(locationLike = window.location) {
  let raw;
  if (locationLike.hash && locationLike.hash.startsWith('#/')) raw = locationLike.hash.slice(2);
  else {
    const pathname = locationLike.pathname || SITE_BASE;
    raw = pathname.startsWith(SITE_BASE) ? pathname.slice(SITE_BASE.length) : pathname.replace(/^\/+/, '');
    if (locationLike.search) raw += locationLike.search;
  }
  const [path, query = ''] = raw.replace(/\/$/, '').split('?');
  const parts = path.split('/').filter(Boolean);
  const [a,b,c] = parts;
  const reverse = {
    circle:'circle', discover:'search', create:'account/create', inbox:'inbox',
    notifications:'account/activity', profile:'profile', login:'login', register:'register',
    followers:'account/followers', following:'account/following', 'follow-requests':'account/requests',
    saved:'account/saved', places:'places', marketplace:'marketplace', trips:'trip',
    reels:'account/reels', settings:'account/settings', 'profile/edit':'profile/edit'
  };
  let internal = reverse[path] || '';
  if (path === 'inbox/settings') internal = 'inbox/settings';
  else if (a === 'profile' && b === 'edit') internal = 'profile/edit';
  else if (a === 'profile' && b === 'preview') internal = 'account/preview';
  else if (a === 'reels' && b === 'create') internal = 'account/reel';
  else if (a === 'stories' && b === 'create') internal = 'account/story';
  else if (a === 'create' && b === 'drafts') internal = 'account/drafts';
  else if (a === 'trips' && b === 'itinerary') internal = 'trip/itinerary/' + (c || '');
  else if (a === 'trips') internal = 'trip';
  else if (a === 'marketplace' && b === 'cart') internal = 'market-cart';
  else if (a === 'marketplace' && b === 'checkout') internal = 'market-checkout';
  else if (a === 'marketplace' && b === 'orders' && c) internal = 'market-order/' + c;
  else if (a === 'marketplace' && b === 'orders') internal = 'market-orders';
  else if (a === 'marketplace' && b === 'product') internal = 'market-product/' + (c || '');
  else if (a === 'places' && b) internal = 'place/' + b;
  else if (a === 'posts' && b) internal = 'account/post/' + b;
  else if (a === 'blog-studio') internal = 'account/blog';
  else if (['wallet','addresses'].includes(a)) internal = 'account/' + a;
  else if (a === 'blog' && b) internal = 'blog/' + b;
  else if (a?.startsWith('@')) internal = a;
  else if (!internal && a) internal = a + (parts.length > 1 ? '/' + parts.slice(1).join('/') : '');
  return internal + (query ? '?' + query : '');
}
