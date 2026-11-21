package main

import (
	"context"
	"log"
	"os"
	"os/signal"
	"strconv"
	"syscall"
	"time"

	_ "github.com/jackc/pgx/v5/stdlib"

	"github.com/baguskristiansianturi/pluits/backend/internal/database"
	"github.com/baguskristiansianturi/pluits/backend/internal/email"
	"github.com/baguskristiansianturi/pluits/backend/internal/identity"
)

func main() {
	databaseURL := os.Getenv("DATABASE_URL")
	if databaseURL == "" { log.Fatal("DATABASE_URL is required") }
	encodedKey := os.Getenv("PLUITS_OUTBOX_ENCRYPTION_KEY")
	key, err := identity.DecodeEncryptionKey(encodedKey)
	if err != nil { log.Fatal("PLUITS_OUTBOX_ENCRYPTION_KEY must be configured as base64-encoded 32-byte key material") }
	baseURL := os.Getenv("PLUITS_PUBLIC_BASE_URL")
	host, port := os.Getenv("PLUITS_SMTP_HOST"), os.Getenv("PLUITS_SMTP_PORT")
	from := os.Getenv("PLUITS_SMTP_FROM")
	username, password := os.Getenv("PLUITS_SMTP_USERNAME"), os.Getenv("PLUITS_SMTP_PASSWORD")
	if host == "" || port == "" || from == "" { log.Fatal("PLUITS_SMTP_HOST, PLUITS_SMTP_PORT and PLUITS_SMTP_FROM are required") }

	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer stop()
	startup, cancel := context.WithTimeout(ctx, 10*time.Second)
	db, err := database.Open(startup, "pgx", databaseURL, database.DefaultPoolConfig())
	cancel()
	if err != nil { log.Fatalf("connect database: %v", err) }
	defer db.Close()

	sender, err := email.NewSMTPClient(email.SMTPConfig{
		Host:host, Port:port, Username:username, Password:password, From:from, Timeout:15*time.Second,
	})
	if err != nil { log.Fatal("invalid SMTP configuration") }
	keyVersion := int16(1)
	if raw := os.Getenv("PLUITS_OUTBOX_KEY_VERSION"); raw != "" {
		parsed, parseErr := strconv.ParseInt(raw, 10, 16)
		if parseErr != nil || parsed < 1 { log.Fatal("PLUITS_OUTBOX_KEY_VERSION must be a positive integer") }
		keyVersion = int16(parsed)
	}
	worker, err := email.NewOutboxWorker(db, sender, map[int16][]byte{keyVersion:key}, baseURL)
	if err != nil { log.Fatalf("configure email outbox worker: %v", err) }

	ticker := time.NewTicker(5*time.Second)
	defer ticker.Stop()
	log.Printf("PLUITS email outbox worker started")
	for {
		if _, err := worker.ProcessBatch(ctx); err != nil { log.Printf("email outbox batch failed: %v", err) }
		select {
		case <-ctx.Done(): return
		case <-ticker.C:
		}
	}
}
