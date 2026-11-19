import { COMPANY_PAGES } from './pages/company/index.js';
import { SUPPORT_PAGES } from './pages/support/index.js';
import { COMMUNITY_PAGES } from './pages/community/index.js';
import { MARKETPLACE_PAGES } from './pages/marketplace/index.js';
import { PRIVACY_PAGES } from './pages/privacy/index.js';

export const PUBLIC_INFO_PAGES = Object.freeze({
  ...COMPANY_PAGES,
  ...SUPPORT_PAGES,
  ...COMMUNITY_PAGES,
  ...MARKETPLACE_PAGES,
  ...PRIVACY_PAGES
});
