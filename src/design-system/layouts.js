export const LAYOUT_REGISTRY = Object.freeze([
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
