const stories = [
  { name: 'Cerita Anda', tone: 'own', image: '' },
  { name: 'Ayu', tone: 'ayu', image: 'photo-1534528741775-53994a69daeb' },
  { name: 'Raka', tone: 'raka', image: 'photo-1500648767791-00dcc994a43e' },
  { name: 'Nadia', tone: 'nadia', image: 'photo-1531123897727-8f129e1688ce' },
  { name: 'Dimas', tone: 'dimas', image: 'photo-1506794778202-cad84cf45f1d' },
  { name: 'Sinta', tone: 'sinta', image: 'photo-1544005313-94ddf0286df2' }
];

export function renderStoriesRail() {
  return '<div class="sm-stories-rail-wrap"><div class="sm-stories-rail" aria-label="Stories">'
    + stories.map((story) => '<div class="sm-story-item"><span class="sm-story-ring sm-story-ring--' + story.tone + '">'
      + (story.image ? '<img src="https://images.unsplash.com/' + story.image + '?auto=format&fit=crop&w=160&h=160&q=75" alt="" loading="lazy" decoding="async">' : '<b aria-hidden="true">+</b>')
      + '</span><small>' + story.name + '</small></div>').join('')
    + '</div></div>';
}
