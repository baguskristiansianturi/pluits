export const APP_BASE_URL = new URL(
  import.meta.env.BASE_URL || '/',
  window.location.origin
).toString();

export function assetUrl(path) {
  return new URL(String(path).replace(/^\/+/, ''), APP_BASE_URL).toString();
}

export const PASSWORD_RESET_URL = new URL('?auth=reset', APP_BASE_URL).toString();
