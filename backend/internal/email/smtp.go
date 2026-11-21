package email

import (
	"context"
	"crypto/tls"
	"errors"
	"fmt"
	"net"
	"net/mail"
	"net/smtp"
	"strings"
	"time"
)

type SMTPConfig struct {
	Host string
	Port string
	Username string
	Password string
	From string
	Timeout time.Duration
}

type SMTPClient struct { config SMTPConfig }

func NewSMTPClient(config SMTPConfig) (*SMTPClient, error) {
	if strings.TrimSpace(config.Host) == "" || strings.TrimSpace(config.Port) == "" || strings.TrimSpace(config.From) == "" {
		return nil, errors.New("SMTP host, port and sender address are required")
	}
	if _, err := mail.ParseAddress(config.From); err != nil { return nil, errors.New("invalid SMTP sender address") }
	if config.Timeout <= 0 { config.Timeout = 15 * time.Second }
	return &SMTPClient{config:config}, nil
}

func (c *SMTPClient) Send(ctx context.Context, message Message) error {
	to, err := mail.ParseAddress(message.To)
	if err != nil || to.Address != message.To { return errors.New("invalid recipient address") }
	from, err := mail.ParseAddress(c.config.From)
	if err != nil { return errors.New("invalid sender address") }
	if strings.ContainsAny(message.Subject, "\r\n") { return errors.New("invalid email subject") }

	dialer := net.Dialer{Timeout:c.config.Timeout}
	conn, err := dialer.DialContext(ctx, "tcp", net.JoinHostPort(c.config.Host, c.config.Port))
	if err != nil { return fmt.Errorf("connect SMTP: %w", err) }
	defer conn.Close()
	if deadline, ok := ctx.Deadline(); ok { _ = conn.SetDeadline(deadline) } else { _ = conn.SetDeadline(time.Now().Add(c.config.Timeout)) }

	client, err := smtp.NewClient(conn, c.config.Host)
	if err != nil { return fmt.Errorf("initialize SMTP: %w", err) }
	defer client.Close()
	if ok, _ := client.Extension("STARTTLS"); !ok { return errors.New("SMTP server does not offer required STARTTLS") }
	if err := client.StartTLS(&tls.Config{ServerName:c.config.Host, MinVersion:tls.VersionTLS12}); err != nil {
		return fmt.Errorf("establish SMTP TLS: %w", err)
	}
	if c.config.Username != "" {
		if err := client.Auth(smtp.PlainAuth("", c.config.Username, c.config.Password, c.config.Host)); err != nil {
			return errors.New("SMTP authentication failed")
		}
	}
	if err := client.Mail(from.Address); err != nil { return fmt.Errorf("SMTP sender rejected: %w", err) }
	if err := client.Rcpt(to.Address); err != nil { return fmt.Errorf("SMTP recipient rejected: %w", err) }
	writer, err := client.Data()
	if err != nil { return fmt.Errorf("SMTP message rejected: %w", err) }
	body := "From: " + from.Address + "\r\nTo: " + to.Address + "\r\nSubject: " + message.Subject + "\r\nMIME-Version: 1.0\r\nContent-Type: text/plain; charset=UTF-8\r\nContent-Transfer-Encoding: 8bit\r\n\r\n" + strings.ReplaceAll(message.Body, "\n", "\r\n")
	if _, err := writer.Write([]byte(body)); err != nil { _ = writer.Close(); return fmt.Errorf("write SMTP message: %w", err) }
	if err := writer.Close(); err != nil { return fmt.Errorf("finish SMTP message: %w", err) }
	return client.Quit()
}
