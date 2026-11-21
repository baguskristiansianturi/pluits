#!/usr/bin/env bash
set -euo pipefail
umask 077

: "${DATABASE_URL:?DATABASE_URL is required}"
: "${PLUITS_BACKUP_AGE_RECIPIENT:?PLUITS_BACKUP_AGE_RECIPIENT is required}"
interval="${PLUITS_BACKUP_INTERVAL_SECONDS:-86400}"
retention="${PLUITS_BACKUP_RETENTION_DAYS:-14}"

[[ "$interval" =~ ^[0-9]+$ ]] && (( interval >= 3600 )) || { echo "Backup interval must be at least 3600 seconds" >&2; exit 2; }
[[ "$retention" =~ ^[0-9]+$ ]] && (( retention >= 1 )) || { echo "Backup retention must be at least one day" >&2; exit 2; }
[[ "$PLUITS_BACKUP_AGE_RECIPIENT" =~ ^age1[0-9a-z]+$ ]] || { echo "A valid age public recipient is required" >&2; exit 2; }

mkdir -p /backups

while true; do
  timestamp="$(date -u +%Y%m%dT%H%M%SZ)"
  final="/backups/pluits-postgres-${timestamp}.dump.age"
  temporary="${final}.partial"

  echo "Starting encrypted PostgreSQL backup: ${timestamp}"
  if pg_dump --format=custom --compress=6 --no-owner --no-acl "$DATABASE_URL" \
      | age --encrypt --recipient "$PLUITS_BACKUP_AGE_RECIPIENT" > "$temporary"; then
    test -s "$temporary"
    mv "$temporary" "$final"
    sha256sum "$final" > "${final}.sha256"
    echo "Encrypted backup completed: ${final}"
    find /backups -type f -name 'pluits-postgres-*.dump.age*' -mtime +"$retention" -delete
  else
    rm -f "$temporary"
    echo "Backup failed; it will retry after the configured interval" >&2
  fi

  sleep "$interval"
done
