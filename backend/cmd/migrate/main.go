package main

import (
	"context"
	"database/sql"
	"flag"
	"fmt"
	"log"
	"os"
	"time"

	_ "github.com/jackc/pgx/v5/stdlib"

	"github.com/baguskristiansianturi/pluits/backend/internal/migrate"
)

func main() {
	flag.Usage = func() {
		fmt.Fprintln(flag.CommandLine.Output(), "Usage: go run ./cmd/migrate -command=up")
		flag.PrintDefaults()
	}
	command := flag.String("command", "", "migration command: up")
	flag.Parse()

	if *command != "up" {
		flag.Usage()
		os.Exit(2)
	}
	dsn := os.Getenv("DATABASE_URL")
	if dsn == "" {
		log.Fatal("DATABASE_URL is required")
	}

	ctx, cancel := context.WithTimeout(context.Background(), 2*time.Minute)
	defer cancel()
	db, err := sql.Open("pgx", dsn)
	if err != nil {
		log.Fatalf("open database: %v", err)
	}
	defer db.Close()
	db.SetMaxOpenConns(2)
	db.SetMaxIdleConns(1)

	if err := db.PingContext(ctx); err != nil {
		log.Fatalf("database unavailable: %v", err)
	}
	if err := migrate.Up(ctx, db); err != nil {
		log.Fatalf("apply migrations: %v", err)
	}
	log.Print("PLUITS database migrations are up to date")
}
