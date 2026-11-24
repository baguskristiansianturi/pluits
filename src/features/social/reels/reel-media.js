import './reel-media.css';

export function isReelPost(post) {
  return post?.type === 'video' && Number(post.durationSeconds || 0) <= 60;
}

export function getVideoContentKind(post) {
  return isReelPost(post) ? 'reel' : 'video';
}

export function renderVideoMedia(post, escapeHtml) {
  const label = isReelPost(post) ? 'Reels' : 'Video';
  const duration = Number(post.durationSeconds || 0);
  return '<video class="pl-post-media pl-post-video sm-reel-video" data-demo-video data-video-limit="10" src="' + escapeHtml(post.mediaUrl) + '" poster="' + escapeHtml(post.poster || '') + '" controls playsinline preload="none" aria-label="' + label + ' postingan ' + escapeHtml(post.authorName) + '"></video>'
    + '<span class="sm-reel-video-note">' + (isReelPost(post) ? 'Reels · video singkat' : 'Video · ' + duration + ' detik') + '</span>';
}
