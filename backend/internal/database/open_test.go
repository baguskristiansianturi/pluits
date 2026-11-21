package database

import (
	"context"
	"testing"
	"time"
)

func TestDefaultPoolConfig(t *testing.T) {
	cfg := DefaultPoolConfig()
	if cfg.MaxOpenConnections != 20 || cfg.MaxIdleConnections != 5 {
		t.Fatalf("unexpected pool defaults: %+v", cfg)
	}
	if cfg.ConnMaxLifetime != 30*time.Minute || cfg.ConnMaxIdleTime != 5*time.Minute {
		t.Fatalf("unexpected pool lifetimes: %+v", cfg)
	}
}

func TestOpenRejectsMissingInputs(t *testing.T) {
	if _, err := Open(context.Background(), "pgx", "", DefaultPoolConfig()); err == nil {
		t.Fatal("expected missing DSN to fail")
	}
	if _, err := Open(context.Background(), "", "postgres://invalid", DefaultPoolConfig()); err == nil {
		t.Fatal("expected missing driver to fail")
	}
	if _, err := Open(context.Background(), "pgx", "postgres://invalid", PoolConfig{MaxOpenConnections: 1, MaxIdleConnections: 2}); err == nil {
		t.Fatal("expected invalid pool limits to fail")
	}
}
