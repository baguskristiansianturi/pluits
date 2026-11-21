package database

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
	"time"
)

type PoolConfig struct {
	MaxOpenConnections int
	MaxIdleConnections int
	ConnMaxLifetime    time.Duration
	ConnMaxIdleTime    time.Duration
}

func DefaultPoolConfig() PoolConfig {
	return PoolConfig{
		MaxOpenConnections: 20,
		MaxIdleConnections: 5,
		ConnMaxLifetime:    30 * time.Minute,
		ConnMaxIdleTime:    5 * time.Minute,
	}
}

func Open(ctx context.Context, driverName, databaseURL string, cfg PoolConfig) (*sql.DB, error) {
	if databaseURL == "" {
		return nil, errors.New("database URL is required")
	}
	if driverName == "" {
		return nil, errors.New("database driver name is required")
	}
	if cfg.MaxOpenConnections < 1 || cfg.MaxIdleConnections < 0 || cfg.MaxIdleConnections > cfg.MaxOpenConnections {
		return nil, errors.New("invalid database connection pool limits")
	}

	db, err := sql.Open(driverName, databaseURL)
	if err != nil {
		return nil, fmt.Errorf("open database: %w", err)
	}
	db.SetMaxOpenConns(cfg.MaxOpenConnections)
	db.SetMaxIdleConns(cfg.MaxIdleConnections)
	db.SetConnMaxLifetime(cfg.ConnMaxLifetime)
	db.SetConnMaxIdleTime(cfg.ConnMaxIdleTime)

	if err := db.PingContext(ctx); err != nil {
		_ = db.Close()
		return nil, fmt.Errorf("ping database: %w", err)
	}
	return db, nil
}
