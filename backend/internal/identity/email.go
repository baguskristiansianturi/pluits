package identity

import (
	"errors"
	"net/mail"
	"strings"
	"unicode/utf8"
)

type EmailAddress struct {
	Original  string
	Canonical string
}

func NormalizeEmail(input string) (EmailAddress, error) {
	trimmed := strings.TrimSpace(input)
	if trimmed == "" || len(trimmed) > 320 || !utf8.ValidString(trimmed) {
		return EmailAddress{}, errors.New("invalid email address")
	}
	parsed, err := mail.ParseAddress(trimmed)
	if err != nil || parsed.Address != trimmed || strings.ContainsAny(trimmed, " \t\r\n") {
		return EmailAddress{}, errors.New("invalid email address")
	}
	parts := strings.Split(parsed.Address, "@")
	if len(parts) != 2 || parts[0] == "" || parts[1] == "" {
		return EmailAddress{}, errors.New("invalid email address")
	}
	return EmailAddress{Original: trimmed, Canonical: strings.ToLower(trimmed)}, nil
}
