package main

import (
	"context"
	"errors"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	_ "github.com/jackc/pgx/v5/stdlib"

	"github.com/baguskristiansianturi/pluits/backend/internal/config"
	"github.com/baguskristiansianturi/pluits/backend/internal/database"
	"github.com/baguskristiansianturi/pluits/backend/internal/httpapi"
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

	server := &http.Server{
		Addr:              ":" + cfg.Port,
		Handler:           mux,
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
