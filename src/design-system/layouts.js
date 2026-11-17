export const LAYOUT_REGISTRY = Object.freeze([
  {
    id: 'LAY-SHARED-PAGE-SHELL-001',
    name: 'Shared Account and Legal Page Shell',
    status: 'IMPLEMENTED',
    owner: 'platform-ui-foundation',
    purpose: 'Reusable brand, configurable navigation, responsive page header, and configurable footer across PLUITS experience shells',
    slots: ['brand', 'optional-navigation', 'header-actions', 'page-content', 'optional-footer'],
    exports: ['renderBrand', 'renderNavbar', 'renderPageHeader', 'renderPageFooter']
  },
  {
    id: 'LAY-AUTH-SPLIT-001',
    name: 'Auth Split Panel',
    status: 'PROVISIONAL',
    owner: 'platform-ui-foundation',
    purpose: 'Pendaftaran, masuk, dan pemulihan akun',
    slots: ['brand-header', 'intro-panel', 'form-card', 'footer']
  },
  {
    id: 'LAY-WORKSPACE-BOARD-001',
    name: 'Workspace Board',
    status: 'PROVISIONAL',
    owner: 'platform-ui-foundation',
    purpose: 'Ruang kerja pengguna setelah autentikasi',
    slots: ['workspace-header', 'welcome', 'stage-board', 'working-agreement', 'documentation']
  }
]);
