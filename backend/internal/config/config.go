package config

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

type Config struct {
	Port        string
	DatabaseURL string
}

func Load() (Config, error) {
	port := strings.TrimSpace(os.Getenv("PORT"))
	if port == "" {
		port = "8080"
	}
	if _, err := strconv.Atoi(port); err != nil {
		return Config{}, fmt.Errorf("PORT must be a valid TCP port number: %w", err)
	}

	return Config{
		Port:        port,
		DatabaseURL: strings.TrimSpace(os.Getenv("DATABASE_URL")),
	}, nil
}
