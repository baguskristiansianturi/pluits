import './reel-media.css';

export function isReelPost(post) {
  return post?.type === 'video' && Number(post.durationSeconds || 0) <= 60;
}

export function getVideoContentKind(post) {
  return isReelPost(post) ? 'reel' : 'video';
}

export function renderVideoMedia(post, escapeHtml) {
  const reel = isReelPost(post);
  const label = reel ? 'Reels' : 'Video';
  const duration = Number(post.durationSeconds || 0);
  const videoAttributes = reel
    ? ' data-reel-autoplay muted loop playsinline preload="metadata" aria-label="Buka Reel ' + escapeHtml(post.authorName) + '"'
    : ' controls playsinline preload="none" aria-label="Video postingan ' + escapeHtml(post.authorName) + '"';
  return '<video class="pl-post-media pl-post-video sm-reel-video' + (reel ? ' is-reel-autoplay' : ' is-long-video') + '" data-social-video' + videoAttributes + ' src="' + escapeHtml(post.mediaUrl) + '" poster="' + escapeHtml(post.poster || '') + '"></video>'
    + (reel ? '' : '<span class="sm-reel-video-note">Video · ' + duration + ' detik</span>');
}

// Reels owns playback timing. Only the most visible short video may play;
// every other video pauses as soon as it leaves the viewing threshold.
export function mountReelPlayback(root) {
  if (!root || !('IntersectionObserver' in window)) return () => {};
  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const observed = new Set();
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const video = entry.target;
      if (reducedMotion || !entry.isIntersecting || entry.intersectionRatio < 0.65) {
        video.pause();
        return;
      }
      observed.forEach((other) => { if (other !== video) other.pause(); });
      video.muted = true;
      const playback = video.play();
      if (playback && typeof playback.catch === 'function') playback.catch(() => {});
    });
  }, { threshold: [0, 0.35, 0.65, 0.9] });
  const observeVideos = (scope) => scope.querySelectorAll?.('video[data-reel-autoplay]').forEach((video) => {
    if (observed.has(video)) return;
    observed.add(video);
    observer.observe(video);
  });
  observeVideos(root);
  const mutations = new MutationObserver((records) => records.forEach((record) => record.addedNodes.forEach((node) => {
    if (node.nodeType !== 1) return;
    if (node.matches?.('video[data-reel-autoplay]')) observeVideos({ querySelectorAll: () => [node] });
    else observeVideos(node);
  })));
  mutations.observe(root, { childList: true, subtree: true });
  return () => { mutations.disconnect(); observer.disconnect(); observed.forEach((video) => video.pause()); observed.clear(); };
}
