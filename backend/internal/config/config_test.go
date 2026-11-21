package config

import "testing"

func TestLoadUsesDefaultPort(t *testing.T) {
	t.Setenv("PORT", "")
	t.Setenv("DATABASE_URL", "")
	cfg, err := Load()
	if err != nil {
		t.Fatal(err)
	}
	if cfg.Port != "8080" {
		t.Fatalf("expected default port 8080, got %s", cfg.Port)
	}
}

func TestLoadRejectsInvalidPort(t *testing.T) {
	for _, port := range []string{"0", "65536", "-1", "abc", "8080x"} {
		t.Run(port, func(t *testing.T) {
			t.Setenv("PORT", port)
			if _, err := Load(); err == nil {
				t.Fatalf("expected port %q to be rejected", port)
			}
		})
	}
}

func TestLoadAcceptsValidPortAndDatabaseURL(t *testing.T) {
	t.Setenv("PORT", "9000")
	t.Setenv("DATABASE_URL", "postgres://localhost/pluits")
	cfg, err := Load()
	if err != nil {
		t.Fatal(err)
	}
	if cfg.Port != "9000" || cfg.DatabaseURL != "postgres://localhost/pluits" {
		t.Fatalf("unexpected config: %+v", cfg)
	}
}
