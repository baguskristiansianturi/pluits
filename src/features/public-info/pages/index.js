import { COMPANY_PAGES } from './company/index.js';
import { SUPPORT_PAGES } from './support/index.js';
import { COMMUNITY_PAGES } from './community/index.js';
import { MARKETPLACE_PAGES } from './marketplace/index.js';
import { PRIVACY_PAGES } from './privacy/index.js';

export const PUBLIC_INFO_PAGES = Object.freeze({
  ...COMPANY_PAGES,
  ...SUPPORT_PAGES,
  ...COMMUNITY_PAGES,
  ...MARKETPLACE_PAGES,
  ...PRIVACY_PAGES
});
