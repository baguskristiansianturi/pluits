package main

import (
	"context"
	"database/sql"
	"errors"
	"log"
	"net/http"
	"os"
	"os/signal"
	"strconv"
	"syscall"
	"time"

	_ "github.com/jackc/pgx/v5/stdlib"

	"github.com/baguskristiansianturi/pluits/backend/internal/config"
	"github.com/baguskristiansianturi/pluits/backend/internal/database"
	"github.com/baguskristiansianturi/pluits/backend/internal/httpapi"
	"github.com/baguskristiansianturi/pluits/backend/internal/identity"
)

func main() {
	cfg, err := config.Load()
	if err != nil {
		log.Fatalf("load configuration: %v", err)
	}

	var db *sql.DB
	if cfg.DatabaseURL != "" {
		startupCtx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		db, err = database.Open(startupCtx, "pgx", cfg.DatabaseURL, database.DefaultPoolConfig())
		cancel()
		if err != nil {
			log.Fatalf("connect database: %v", err)
		}
		defer db.Close()
	}

	mux := http.NewServeMux()
	httpapi.NewHealthHandler(db).Register(mux)
	mux.Handle("GET /v1/identity/me", httpapi.NewAccountMeHandler(db))
	var identityService *identity.Service
	var identityLimiter *identity.RateLimiter
	if encodedKey := os.Getenv("PLUITS_OUTBOX_ENCRYPTION_KEY"); encodedKey != "" {
		if db == nil { log.Fatal("DATABASE_URL is required when identity encryption is configured") }
		key, keyErr := identity.DecodeEncryptionKey(encodedKey)
		if keyErr != nil { log.Fatal("PLUITS_OUTBOX_ENCRYPTION_KEY must be base64-encoded 32-byte key material") }
		keyVersion := int64(1)
		if raw := os.Getenv("PLUITS_OUTBOX_KEY_VERSION"); raw != "" {
			keyVersion, keyErr = strconv.ParseInt(raw, 10, 16)
			if keyErr != nil || keyVersion < 1 { log.Fatal("PLUITS_OUTBOX_KEY_VERSION must be a positive integer") }
		}
		identityService, err = identity.NewService(db, key, int16(keyVersion))
		if err != nil { log.Fatalf("configure identity service: %v", err) }
	}
	if encodedKey := os.Getenv("PLUITS_RATE_LIMIT_KEY"); encodedKey != "" {
		if db == nil { log.Fatal("DATABASE_URL is required when identity rate limiting is configured") }
		key, keyErr := identity.DecodeEncryptionKey(encodedKey)
		if keyErr != nil { log.Fatal("PLUITS_RATE_LIMIT_KEY must be base64-encoded 32-byte key material") }
		identityLimiter, err = identity.NewRateLimiter(db, key)
		if err != nil { log.Fatalf("configure identity rate limiter: %v", err) }
	}
	if identityLimiter != nil {
		httpapi.NewIdentityHandler(identityService, identityLimiter).Register(mux)
	} else {
		httpapi.NewIdentityHandler(identityService).Register(mux)
	}

	server := &http.Server{
		Addr:              ":" + cfg.Port,
		Handler:           httpapi.SecureHandler(mux),
		ReadHeaderTimeout: 5 * time.Second,
		ReadTimeout:       15 * time.Second,
		WriteTimeout:      30 * time.Second,
		IdleTimeout:       60 * time.Second,
	}

	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer stop()

	go func() {
		<-ctx.Done()
		shutdownCtx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		if err := server.Shutdown(shutdownCtx); err != nil {
			log.Printf("graceful shutdown: %v", err)
		}
	}()

	log.Printf("PLUITS API starting on %s", server.Addr)
	if err := server.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
		log.Fatalf("serve API: %v", err)
	}
}
