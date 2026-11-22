-- First-party text posts for the PLUITS social feed.
-- Media upload, comments, reactions, and follower-scoped delivery are separate capabilities.
CREATE TABLE pluits.social_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id UUID NOT NULL REFERENCES pluits.accounts(id) ON DELETE RESTRICT,
    content_kind TEXT NOT NULL DEFAULT 'feed' CHECK (content_kind = 'feed'),
    caption TEXT NOT NULL,
    visibility TEXT NOT NULL DEFAULT 'public'
        CHECK (visibility IN ('public', 'private')),
    publication_status TEXT NOT NULL DEFAULT 'published'
        CHECK (publication_status IN ('published', 'draft')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CHECK (length(btrim(caption)) BETWEEN 1 AND 5000)
);

CREATE INDEX social_posts_public_feed_idx
    ON pluits.social_posts (created_at DESC, id DESC)
    WHERE visibility = 'public' AND publication_status = 'published';

CREATE INDEX social_posts_owner_idx
    ON pluits.social_posts (account_id, created_at DESC, id DESC);
