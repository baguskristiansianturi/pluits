export const LAYOUT_REGISTRY = Object.freeze([
  {
    id: 'LAY-SHARED-PAGE-SHELL-001',
    name: 'Shared Account and Legal Page Shell',
    status: 'IMPLEMENTED',
    owner: 'platform-ui-foundation',
    purpose: 'Shared brand header, page frame, responsive geometry, and footer for login, registration, terms, and privacy pages',
    slots: ['brand-header', 'page-content', 'optional-footer']
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
