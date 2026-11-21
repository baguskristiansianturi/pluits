package httpapi

import (
	"context"
	"encoding/json"
	"errors"
	"io"
	"net"
	"net/http"
	"strings"
	"time"

	"github.com/baguskristiansianturi/pluits/backend/internal/identity"
)

type RequestLimiter interface {
	Allow(context.Context, string, string, int, time.Duration) (bool, error)
}

type IdentityHandler struct {
	service *identity.Service
	limiter RequestLimiter
}

func NewIdentityHandler(service *identity.Service, limiters ...RequestLimiter) *IdentityHandler {
	handler := &IdentityHandler{service: service}
	if len(limiters) > 0 { handler.limiter = limiters[0] }
	return handler
}

func (h *IdentityHandler) allowRequest(w http.ResponseWriter, r *http.Request, scope string, limit int, window time.Duration) bool {
	peer := r.RemoteAddr
	if host, _, err := net.SplitHostPort(peer); err == nil { peer = host }
	return h.allowIdentifier(w, r, scope, peer, limit, window)
}

func (h *IdentityHandler) allowIdentifier(w http.ResponseWriter, r *http.Request, scope, identifier string, limit int, window time.Duration) bool {
	if h.limiter == nil {
		writeJSON(w, http.StatusServiceUnavailable, map[string]string{"status":"unavailable"})
		return false
	}
	allowed, err := h.limiter.Allow(r.Context(), scope, identifier, limit, window)
	if err != nil {
		writeJSON(w, http.StatusServiceUnavailable, map[string]string{"status":"unavailable"})
		return false
	}
	if !allowed {
		writeJSON(w, http.StatusTooManyRequests, map[string]string{"error":"rate_limit_exceeded"})
		return false
	}
	return true
}

func (h *IdentityHandler) Register(mux *http.ServeMux) {
	mux.HandleFunc("POST /v1/identity/register", h.register)
	mux.HandleFunc("POST /v1/identity/verify-email", h.verifyEmail)
	mux.HandleFunc("POST /v1/identity/resend-verification", h.resendVerification)
	mux.HandleFunc("POST /v1/identity/login", h.login)
	mux.HandleFunc("POST /v1/identity/refresh", h.refresh)
	mux.HandleFunc("POST /v1/identity/logout", h.logout)
	mux.HandleFunc("POST /v1/identity/password-reset/request", h.requestPasswordReset)
	mux.HandleFunc("POST /v1/identity/password-reset/complete", h.completePasswordReset)
}

type registerRequest struct {
	Email string `json:"email"`
	Password string `json:"password"`
	DisplayName string `json:"display_name"`
	TermsAccepted bool `json:"terms_accepted"`
}

type verifyEmailRequest struct {
	Token string `json:"token"`
}

type loginRequest struct {
	Email string `json:"email"`
	Password string `json:"password"`
}

type passwordResetRequest struct { Email string `json:"email"` }
type passwordResetCompleteRequest struct { Token string `json:"token"`; Password string `json:"password"` }

type refreshRequest struct {
	RefreshToken string `json:"refresh_token"`
}

func decodeJSON(w http.ResponseWriter, r *http.Request, target any) error {
	if r.Header.Get("Content-Type") != "application/json" {
		return errors.New("content type must be application/json")
	}
	decoder := json.NewDecoder(r.Body)
	decoder.DisallowUnknownFields()
	if err := decoder.Decode(target); err != nil { return err }
	var extra any
	if err := decoder.Decode(&extra); !errors.Is(err, io.EOF) {
		if err == nil { return errors.New("request must contain one JSON value") }
		return err
	}
	return nil
}

func (h *IdentityHandler) register(w http.ResponseWriter, r *http.Request) {
	if h.service == nil || h.limiter == nil {
		writeJSON(w, http.StatusServiceUnavailable, map[string]string{"status":"unavailable"})
		return
	}
	if !h.allowRequest(w, r, "identity.register", 5, time.Hour) { return }
	var input registerRequest
	if err := decodeJSON(w, r, &input); err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error":"invalid_request"})
		return
	}
	if !input.TermsAccepted { writeJSON(w, http.StatusBadRequest, map[string]string{"error":"terms_required"}); return }
	if email, emailErr := identity.NormalizeEmail(input.Email); emailErr == nil {
		if !h.allowIdentifier(w, r, "identity.register.email", email.Canonical, 3, time.Hour) { return }
	}
	result, err := h.service.Register(r.Context(), identity.RegistrationInput{
		Email: input.Email, Password: input.Password, DisplayName: input.DisplayName,
		TermsVersion: "2026-11-21", PrivacyVersion: "2026-11-21",
	})
	if err != nil {
		if strings.Contains(err.Error(), "invalid email") || strings.Contains(err.Error(), "password") || strings.Contains(err.Error(), "display name") {
			writeJSON(w, http.StatusBadRequest, map[string]string{"error":"invalid_registration"})
			return
		}
		writeJSON(w, http.StatusServiceUnavailable, map[string]string{"status":"unavailable"})
		return
	}
	if !result.Accepted {
		writeJSON(w, http.StatusServiceUnavailable, map[string]string{"status":"unavailable"})
		return
	}
	writeJSON(w, http.StatusAccepted, map[string]string{
		"status":"accepted",
		"message":"If the address can be registered, verification instructions will be sent.",
	})
}

func (h *IdentityHandler) verifyEmail(w http.ResponseWriter, r *http.Request) {
	if h.service == nil {
		writeJSON(w, http.StatusServiceUnavailable, map[string]string{"status":"unavailable"})
		return
	}
	if !h.allowRequest(w, r, "identity.verify", 20, time.Hour) { return }
	var input verifyEmailRequest
	if err := decodeJSON(w, r, &input); err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error":"invalid_request"})
		return
	}
	if err := h.service.VerifyEmail(r.Context(), input.Token); err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error":"verification_invalid_or_expired"})
		return
	}
	writeJSON(w, http.StatusOK, map[string]string{"status":"verified"})
}

func (h *IdentityHandler) login(w http.ResponseWriter, r *http.Request) {
	if h.service == nil { writeJSON(w, http.StatusServiceUnavailable, map[string]string{"status":"unavailable"}); return }
	if !h.allowRequest(w, r, "identity.login", 10, 15*time.Minute) { return }
	var input loginRequest
	if err := decodeJSON(w, r, &input); err != nil { writeJSON(w, http.StatusBadRequest, map[string]string{"error":"invalid_request"}); return }
	if email, emailErr := identity.NormalizeEmail(input.Email); emailErr == nil {
		if !h.allowIdentifier(w, r, "identity.login.email", email.Canonical, 5, 15*time.Minute) { return }
	}
	tokens, err := h.service.Login(r.Context(), input.Email, input.Password)
	if errors.Is(err, identity.ErrInvalidCredentials) { writeJSON(w, http.StatusUnauthorized, map[string]string{"error":"invalid_credentials"}); return }
	if err != nil { writeJSON(w, http.StatusServiceUnavailable, map[string]string{"status":"unavailable"}); return }
	writeJSON(w, http.StatusOK, tokens)
}

func (h *IdentityHandler) refresh(w http.ResponseWriter, r *http.Request) {
	if h.service == nil { writeJSON(w, http.StatusServiceUnavailable, map[string]string{"status":"unavailable"}); return }
	if !h.allowRequest(w, r, "identity.refresh", 60, time.Minute) { return }
	var input refreshRequest
	if err := decodeJSON(w, r, &input); err != nil { writeJSON(w, http.StatusBadRequest, map[string]string{"error":"invalid_request"}); return }
	tokens, err := h.service.Refresh(r.Context(), input.RefreshToken)
	if errors.Is(err, identity.ErrInvalidSession) { writeJSON(w, http.StatusUnauthorized, map[string]string{"error":"invalid_session"}); return }
	if err != nil { writeJSON(w, http.StatusServiceUnavailable, map[string]string{"status":"unavailable"}); return }
	writeJSON(w, http.StatusOK, tokens)
}

func (h *IdentityHandler) logout(w http.ResponseWriter, r *http.Request) {
	if h.service == nil { writeJSON(w, http.StatusServiceUnavailable, map[string]string{"status":"unavailable"}); return }
	if !h.allowRequest(w, r, "identity.logout", 30, time.Minute) { return }
	const prefix = "Bearer "
	header := r.Header.Get("Authorization")
	if !strings.HasPrefix(header, prefix) { writeJSON(w, http.StatusUnauthorized, map[string]string{"error":"invalid_session"}); return }
	if err := h.service.Logout(r.Context(), strings.TrimSpace(strings.TrimPrefix(header, prefix))); err != nil {
		writeJSON(w, http.StatusUnauthorized, map[string]string{"error":"invalid_session"})
		return
	}
	writeJSON(w, http.StatusOK, map[string]string{"status":"logged_out"})
}

func (h *IdentityHandler) requestPasswordReset(w http.ResponseWriter, r *http.Request) {
	if h.service == nil { writeJSON(w, http.StatusServiceUnavailable, map[string]string{"status":"unavailable"}); return }
	if !h.allowRequest(w, r, "identity.password_reset", 5, time.Hour) { return }
	var input passwordResetRequest
	if err := decodeJSON(w, r, &input); err != nil { writeJSON(w, http.StatusBadRequest, map[string]string{"error":"invalid_request"}); return }
	if email, emailErr := identity.NormalizeEmail(input.Email); emailErr == nil {
		if !h.allowIdentifier(w, r, "identity.password_reset.email", email.Canonical, 3, time.Hour) { return }
	}
	if err := h.service.RequestPasswordReset(r.Context(), input.Email); err != nil {
		writeJSON(w, http.StatusServiceUnavailable, map[string]string{"status":"unavailable"})
		return
	}
	writeJSON(w, http.StatusAccepted, map[string]string{"status":"accepted","message":"If the address is eligible, password recovery instructions will be sent."})
}

func (h *IdentityHandler) completePasswordReset(w http.ResponseWriter, r *http.Request) {
	if h.service == nil { writeJSON(w, http.StatusServiceUnavailable, map[string]string{"status":"unavailable"}); return }
	if !h.allowRequest(w, r, "identity.password_reset_complete", 10, time.Hour) { return }
	var input passwordResetCompleteRequest
	if err := decodeJSON(w, r, &input); err != nil { writeJSON(w, http.StatusBadRequest, map[string]string{"error":"invalid_request"}); return }
	if err := h.service.ResetPassword(r.Context(), input.Token, input.Password); err != nil {
		if errors.Is(err, identity.ErrInvalidVerification) { writeJSON(w, http.StatusBadRequest, map[string]string{"error":"reset_token_invalid_or_expired"}); return }
		if strings.Contains(err.Error(), "password") { writeJSON(w, http.StatusBadRequest, map[string]string{"error":"invalid_password"}); return }
		writeJSON(w, http.StatusServiceUnavailable, map[string]string{"status":"unavailable"})
		return
	}
	writeJSON(w, http.StatusOK, map[string]string{"status":"password_updated"})
}

func (h *IdentityHandler) resendVerification(w http.ResponseWriter, r *http.Request) {
	if h.service == nil { writeJSON(w, http.StatusServiceUnavailable, map[string]string{"status":"unavailable"}); return }
	if !h.allowRequest(w, r, "identity.resend_verification", 5, time.Hour) { return }
	var input passwordResetRequest
	if err := decodeJSON(w, r, &input); err != nil { writeJSON(w, http.StatusBadRequest, map[string]string{"error":"invalid_request"}); return }
	if email, emailErr := identity.NormalizeEmail(input.Email); emailErr == nil {
		if !h.allowIdentifier(w, r, "identity.resend_verification.email", email.Canonical, 3, time.Hour) { return }
	}
	if err := h.service.ResendVerification(r.Context(), input.Email); err != nil {
		writeJSON(w, http.StatusServiceUnavailable, map[string]string{"status":"unavailable"})
		return
	}
	writeJSON(w, http.StatusAccepted, map[string]string{"status":"accepted","message":"If the account requires verification, a new email will be sent."})
}
