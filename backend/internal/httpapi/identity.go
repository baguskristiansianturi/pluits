package httpapi

import (
	"encoding/json"
	"errors"
	"io"
	"net/http"
	"strings"

	"github.com/baguskristiansianturi/pluits/backend/internal/identity"
)

type IdentityHandler struct { service *identity.Service }

func NewIdentityHandler(service *identity.Service) *IdentityHandler {
	return &IdentityHandler{service: service}
}

func (h *IdentityHandler) Register(mux *http.ServeMux) {
	mux.HandleFunc("POST /v1/identity/register", h.register)
	mux.HandleFunc("POST /v1/identity/verify-email", h.verifyEmail)
	mux.HandleFunc("POST /v1/identity/login", h.login)
	mux.HandleFunc("POST /v1/identity/refresh", h.refresh)
	mux.HandleFunc("POST /v1/identity/logout", h.logout)
}

type registerRequest struct {
	Email string `json:"email"`
	Password string `json:"password"`
	DisplayName string `json:"display_name"`
}

type verifyEmailRequest struct {
	Token string `json:"token"`
}

type loginRequest struct {
	Email string `json:"email"`
	Password string `json:"password"`
}

type refreshRequest struct {
	RefreshToken string `json:"refresh_token"`
}

func decodeJSON(w http.ResponseWriter, r *http.Request, target any) error {
	if r.Header.Get("Content-Type") != "application/json" {
		return errors.New("content type must be application/json")
	}
	decoder := json.NewDecoder(io.LimitReader(r.Body, maxJSONRequestBody))
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
	if h.service == nil {
		writeJSON(w, http.StatusServiceUnavailable, map[string]string{"status":"unavailable"})
		return
	}
	var input registerRequest
	if err := decodeJSON(w, r, &input); err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error":"invalid_request"})
		return
	}
	result, err := h.service.Register(r.Context(), identity.RegistrationInput{
		Email: input.Email, Password: input.Password, DisplayName: input.DisplayName,
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
	var input loginRequest
	if err := decodeJSON(w, r, &input); err != nil { writeJSON(w, http.StatusBadRequest, map[string]string{"error":"invalid_request"}); return }
	tokens, err := h.service.Login(r.Context(), input.Email, input.Password)
	if errors.Is(err, identity.ErrInvalidCredentials) { writeJSON(w, http.StatusUnauthorized, map[string]string{"error":"invalid_credentials"}); return }
	if err != nil { writeJSON(w, http.StatusServiceUnavailable, map[string]string{"status":"unavailable"}); return }
	writeJSON(w, http.StatusOK, tokens)
}

func (h *IdentityHandler) refresh(w http.ResponseWriter, r *http.Request) {
	if h.service == nil { writeJSON(w, http.StatusServiceUnavailable, map[string]string{"status":"unavailable"}); return }
	var input refreshRequest
	if err := decodeJSON(w, r, &input); err != nil { writeJSON(w, http.StatusBadRequest, map[string]string{"error":"invalid_request"}); return }
	tokens, err := h.service.Refresh(r.Context(), input.RefreshToken)
	if errors.Is(err, identity.ErrInvalidSession) { writeJSON(w, http.StatusUnauthorized, map[string]string{"error":"invalid_session"}); return }
	if err != nil { writeJSON(w, http.StatusServiceUnavailable, map[string]string{"status":"unavailable"}); return }
	writeJSON(w, http.StatusOK, tokens)
}

func (h *IdentityHandler) logout(w http.ResponseWriter, r *http.Request) {
	if h.service == nil { writeJSON(w, http.StatusServiceUnavailable, map[string]string{"status":"unavailable"}); return }
	const prefix = "Bearer "
	header := r.Header.Get("Authorization")
	if !strings.HasPrefix(header, prefix) { writeJSON(w, http.StatusUnauthorized, map[string]string{"error":"invalid_session"}); return }
	if err := h.service.Logout(r.Context(), strings.TrimSpace(strings.TrimPrefix(header, prefix))); err != nil {
		writeJSON(w, http.StatusUnauthorized, map[string]string{"error":"invalid_session"})
		return
	}
	writeJSON(w, http.StatusOK, map[string]string{"status":"logged_out"})
}
