import './reel-media.css';
export function isReelPost(post) {
  const orientation = String(post?.orientation || post?.mediaOrientation || post?.media_orientation || '').toLowerCase();
  const duration = Number(post?.durationSeconds ?? post?.duration_seconds ?? 0);
  return post?.type === 'video' && orientation === 'vertical' && duration > 0 && duration <= 60;
}
export function getVideoContentKind(post) { return isReelPost(post) ? 'reel' : 'video'; }
export function renderVideoMedia(post, escapeHtml) {
  const reel = isReelPost(post);
  const duration = Number(post.durationSeconds ?? post.duration_seconds ?? 0);
  const videoAttributes = reel
    ? ' data-reel-candidate data-reel-autoplay muted loop playsinline preload="metadata" aria-label="Buka Reel ' + escapeHtml(post.authorName) + '"'
    : ' controls playsinline preload="none" aria-label="Video postingan ' + escapeHtml(post.authorName) + '"';
  return '<video class="pl-post-media pl-post-video sm-reel-video' + (reel ? ' is-reel-autoplay' : ' is-long-video') + '" data-social-video' + videoAttributes + ' src="' + escapeHtml(post.mediaUrl) + '" poster="' + escapeHtml(post.poster || '') + '"></video>'
    + (reel ? '' : '<span class="sm-reel-video-note">Video · ' + duration + ' detik</span>');
}
function markAsNonReel(video) {
  video.pause(); video.removeAttribute('data-reel-autoplay'); video.removeAttribute('data-reel-candidate'); video.controls = true;
  video.classList.remove('is-reel-autoplay'); video.classList.add('is-long-video');
  const card = video.closest('[data-post-card]');
  if (card) { card.classList.remove('is-reel'); card.classList.remove('is-vertical'); card.classList.add('is-horizontal'); card.dataset.contentKind = 'video'; card.dataset.contentOrientation = 'horizontal'; }
}
function validatePortraitVideo(video) {
  if (!video.videoWidth || !video.videoHeight) return false;
  const isPortrait = video.videoHeight > video.videoWidth;
  if (!isPortrait) markAsNonReel(video); else video.dataset.reelValidated = 'true';
  const item = video.closest('[data-reel-item]');
  if (item && !isPortrait) {
    item.hidden = true;
    const viewer = item.parentElement;
    if (viewer && !viewer.querySelector('[data-reel-item]:not([hidden])')) { const empty = viewer.querySelector('[data-reels-empty]'); if (empty) empty.hidden = false; }
  }
  return isPortrait;
}
// Only verified portrait media can autoplay. Horizontal, square, unknown, and failed media retain their poster and ordinary playback behavior.
export function mountReelPlayback(root) {
  if (!root || typeof window === 'undefined') return () => {};
  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const observed = new Set();
  const observer = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const video = entry.target;
      if (reducedMotion || video.dataset.reelValidated !== 'true' || !entry.isIntersecting || entry.intersectionRatio < 0.65) { video.pause(); return; }
      observed.forEach((other) => { if (other !== video) other.pause(); });
      video.muted = true; const playback = video.play(); if (playback && typeof playback.catch === 'function') playback.catch(() => {});
    });
  }, { threshold: [0, 0.35, 0.65, 0.9] }) : null;
  const observeVideos = (scope) => scope.querySelectorAll?.('video[data-reel-candidate]').forEach((video) => {
    if (observed.has(video)) return;
    observed.add(video);
    video.addEventListener('loadedmetadata', () => validatePortraitVideo(video), { once: true });
    video.addEventListener('error', () => video.pause(), { once: true });
    if (video.readyState >= 1) validatePortraitVideo(video);
    observer?.observe(video);
  });
  observeVideos(root);
  const mutations = typeof MutationObserver === 'undefined' ? null : new MutationObserver((records) => records.forEach((record) => record.addedNodes.forEach((node) => {
    if (node.nodeType !== 1) return;
    if (node.matches?.('video[data-reel-candidate]')) observeVideos({ querySelectorAll: () => [node] }); else observeVideos(node);
  })));
  mutations?.observe(root, { childList: true, subtree: true });
  return () => { mutations?.disconnect(); observer?.disconnect(); observed.forEach((video) => video.pause()); observed.clear(); };
}
