/**
 * Public homepage visual registry.
 * Replace a photo by changing only its src and keep its descriptive alt text current.
 * Images are served from Unsplash CDN; source collection links are retained for editorial review.
 */
export const HOME_VISUALS = Object.freeze({
  hero: {
    src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1400&auto=format&fit=crop&q=82',
    alt: 'A group of friends sharing a moment together outdoors',
    source: 'https://unsplash.com/s/photos/friends-community'
  },
  community: {
    src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&auto=format&fit=crop&q=80',
    alt: 'Friends enjoying time together by the coast',
    source: 'https://unsplash.com/s/photos/friends-community'
  },
  discovery: {
    src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1000&auto=format&fit=crop&q=82',
    alt: 'A scenic road leading through a dramatic natural landscape',
    source: 'https://unsplash.com/s/photos/travel-destination'
  },
  business: {
    src: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&auto=format&fit=crop&q=82',
    alt: 'A small business owner welcoming a customer at the counter',
    source: 'https://unsplash.com/s/photos/small-business-owner'
  },
  food: {
    src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1000&auto=format&fit=crop&q=82',
    alt: 'A carefully prepared meal served in a restaurant',
    source: 'https://unsplash.com/s/photos/restaurant-food'
  },
  coffee: {
    src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&auto=format&fit=crop&q=80',
    alt: 'Coffee drinks shared at a cafe table',
    source: 'https://unsplash.com/s/photos/coffee-cafe'
  },
  collaboration: {
    src: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=900&auto=format&fit=crop&q=80',
    alt: 'A team collaborating in a bright creative workspace',
    source: 'https://unsplash.com/s/photos/team-collaboration'
  }
});
