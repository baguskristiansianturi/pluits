package httpapi

import (
	"database/sql"
	"encoding/json"
	"errors"
	"io"
	"net/http"
	"strconv"
	"strings"
	"time"
	"unicode/utf8"
)

type SocialHandler struct {
	db *sql.DB
	limiter RequestLimiter
}

func NewSocialHandler(db *sql.DB, limiter RequestLimiter) *SocialHandler {
	return &SocialHandler{db: db, limiter: limiter}
}

func (h *SocialHandler) Register(mux *http.ServeMux) {
	mux.HandleFunc("GET /v1/social/feed", h.publicFeed)
	mux.Handle("GET /v1/social/posts/me", RequireAccount(h.db, http.HandlerFunc(h.myPosts)))
	mux.Handle("POST /v1/social/posts", RequireAccount(h.db, http.HandlerFunc(h.createPost)))
}

type socialPostRequest struct {
	Caption string `json:"caption"`
	Visibility string `json:"visibility"`
}

type socialPostResponse struct {
	ID string `json:"id"`
	AccountID string `json:"account_id"`
	AuthorName string `json:"author_name"`
	Username string `json:"username,omitempty"`
	Caption string `json:"caption"`
	ContentKind string `json:"content_kind"`
	Visibility string `json:"visibility,omitempty"`
	CreatedAt time.Time `json:"created_at"`
}

func decodeSocialPost(r *http.Request) (socialPostRequest, error) {
	var input socialPostRequest
	if r.Header.Get("Content-Type") != "application/json" { return input, errors.New("invalid content type") }
	decoder := json.NewDecoder(r.Body)
	decoder.DisallowUnknownFields()
	if err := decoder.Decode(&input); err != nil { return input, err }
	var extra any
	if err := decoder.Decode(&extra); !errors.Is(err, io.EOF) {
		if err == nil { return input, errors.New("multiple JSON values") }
		return input, err
	}
	input.Caption = strings.TrimSpace(input.Caption)
	if !utf8.ValidString(input.Caption) || len([]rune(input.Caption)) == 0 || len([]rune(input.Caption)) > 5000 {
		return input, errors.New("invalid caption")
	}
	if input.Visibility == "" { input.Visibility = "public" }
	if input.Visibility != "public" && input.Visibility != "private" {
		return input, errors.New("invalid visibility")
	}
	return input, nil
}

func (h *SocialHandler) publicFeed(w http.ResponseWriter, r *http.Request) {
	if h.db == nil { writeJSON(w, http.StatusServiceUnavailable, map[string]string{"status":"unavailable"}); return }
	limit := 20
	if raw := r.URL.Query().Get("limit"); raw != "" {
		value, err := strconv.Atoi(raw)
		if err != nil || value < 1 || value > 50 { writeJSON(w, http.StatusBadRequest, map[string]string{"error":"invalid_limit"}); return }
		limit = value
	}
	rows, err := h.db.QueryContext(r.Context(), `
		SELECT p.id::text, p.account_id::text, profile.display_name,
		       COALESCE(profile.username, ''), p.caption, p.content_kind, p.created_at
		FROM pluits.social_posts p
		JOIN pluits.accounts a ON a.id = p.account_id AND a.status = 'active'
		JOIN pluits.personal_profiles profile ON profile.account_id = p.account_id
		WHERE p.visibility = 'public'
		  AND p.publication_status = 'published'
		  AND profile.profile_visibility = 'public'
		ORDER BY p.created_at DESC, p.id DESC
		LIMIT $1
	`, limit)
	if err != nil { writeJSON(w, http.StatusServiceUnavailable, map[string]string{"status":"unavailable"}); return }
	defer rows.Close()
	posts := make([]socialPostResponse, 0, limit)
	for rows.Next() {
		var post socialPostResponse
		if err := rows.Scan(&post.ID, &post.AccountID, &post.AuthorName, &post.Username, &post.Caption, &post.ContentKind, &post.CreatedAt); err != nil {
			writeJSON(w, http.StatusServiceUnavailable, map[string]string{"status":"unavailable"}); return
		}
		posts = append(posts, post)
	}
	if err := rows.Err(); err != nil { writeJSON(w, http.StatusServiceUnavailable, map[string]string{"status":"unavailable"}); return }
	writeJSON(w, http.StatusOK, map[string]any{"posts":posts})
}

func (h *SocialHandler) myPosts(w http.ResponseWriter, r *http.Request) {
	if h.db == nil { writeJSON(w, http.StatusServiceUnavailable, map[string]string{"status":"unavailable"}); return }
	accountID := AccountIDFromContext(r.Context())
	rows, err := h.db.QueryContext(r.Context(), `
		SELECT p.id::text, p.account_id::text, profile.display_name,
		       COALESCE(profile.username, ''), p.caption, p.content_kind, p.visibility, p.created_at
		FROM pluits.social_posts p
		JOIN pluits.personal_profiles profile ON profile.account_id = p.account_id
		WHERE p.account_id = $1
		ORDER BY p.created_at DESC, p.id DESC
		LIMIT 50
	`, accountID)
	if err != nil { writeJSON(w, http.StatusServiceUnavailable, map[string]string{"status":"unavailable"}); return }
	defer rows.Close()
	posts := make([]socialPostResponse, 0)
	for rows.Next() {
		var post socialPostResponse
		if err := rows.Scan(&post.ID, &post.AccountID, &post.AuthorName, &post.Username, &post.Caption, &post.ContentKind, &post.Visibility, &post.CreatedAt); err != nil {
			writeJSON(w, http.StatusServiceUnavailable, map[string]string{"status":"unavailable"}); return
		}
		posts = append(posts, post)
	}
	if err := rows.Err(); err != nil { writeJSON(w, http.StatusServiceUnavailable, map[string]string{"status":"unavailable"}); return }
	writeJSON(w, http.StatusOK, map[string]any{"posts":posts})
}

func (h *SocialHandler) createPost(w http.ResponseWriter, r *http.Request) {
	if h.db == nil || h.limiter == nil { writeJSON(w, http.StatusServiceUnavailable, map[string]string{"status":"unavailable"}); return }
	accountID := AccountIDFromContext(r.Context())
	allowed, err := h.limiter.Allow(r.Context(), "social.create_post", accountID, 10, time.Hour)
	if err != nil { writeJSON(w, http.StatusServiceUnavailable, map[string]string{"status":"unavailable"}); return }
	if !allowed { writeJSON(w, http.StatusTooManyRequests, map[string]string{"error":"rate_limit_exceeded"}); return }
	input, err := decodeSocialPost(r)
	if err != nil { writeJSON(w, http.StatusBadRequest, map[string]string{"error":"invalid_post"}); return }
	var post socialPostResponse
	err = h.db.QueryRowContext(r.Context(), `
		INSERT INTO pluits.social_posts (account_id, caption, visibility)
		SELECT a.id, $2, $3
		FROM pluits.accounts a
		JOIN pluits.personal_profiles profile ON profile.account_id = a.id
		WHERE a.id = $1 AND a.status = 'active'
		RETURNING id::text, account_id::text, caption, content_kind, visibility, created_at
	`, accountID, input.Caption, input.Visibility).Scan(&post.ID, &post.AccountID, &post.Caption, &post.ContentKind, &post.Visibility, &post.CreatedAt)
	if errors.Is(err, sql.ErrNoRows) { writeJSON(w, http.StatusForbidden, map[string]string{"error":"account_not_active"}); return }
	if err != nil { writeJSON(w, http.StatusServiceUnavailable, map[string]string{"status":"unavailable"}); return }
	err = h.db.QueryRowContext(r.Context(),
		"SELECT display_name, COALESCE(username, '') FROM pluits.personal_profiles WHERE account_id = $1",
		accountID,
	).Scan(&post.AuthorName, &post.Username)
	if err != nil { writeJSON(w, http.StatusServiceUnavailable, map[string]string{"status":"unavailable"}); return }
	writeJSON(w, http.StatusCreated, post)
}
