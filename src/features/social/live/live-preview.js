const previewSessions = [
  { id: 'sore-bali', title: 'Ngobrol santai menjelang senja', description: 'Ruang obrolan terbuka untuk berbagi cerita dan rekomendasi.', viewers: 'Pratinjau sesi', art: 'one', headline: 'Suasana sore di Bali', subline: 'Berbagi cerita dan momen bersama' },
  { id: 'jelajah-rasa', title: 'Jelajah rasa Nusantara', description: 'Tur singkat mengenal hidangan dan ruang lokal.', viewers: 'Pratinjau sesi', art: 'two', headline: 'Eksplorasi kuliner lokal', subline: 'Menjelajahi rasa dan cerita lokal' }
];

export function renderLivePreview() {
  return '<div class="sm-live-preview-grid">' + previewSessions.map((session) =>
    '<article class="sm-live-preview-card" data-content-kind="live" data-live-preview-id="' + session.id + '"><div class="sm-live-preview-art sm-live-preview-art--' + session.art + '"><span class="sm-live-indicator">PREVIEW</span><div class="sm-live-orbit">PL</div><strong>' + session.headline + '</strong><small>' + session.subline + '</small></div><div class="sm-live-preview-meta"><strong>' + session.title + '</strong><p>' + session.description + '</p><span>' + session.viewers + '</span></div></article>'
  ).join('') + '</div>';
}
