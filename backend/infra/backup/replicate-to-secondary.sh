#!/usr/bin/env bash
set -euo pipefail
umask 077

: "${PLUITS_BACKUP_SOURCE_DIR:=/srv/pluits/backups}"
: "${PLUITS_BACKUP_REMOTE_HOST:?Set PLUITS_BACKUP_REMOTE_HOST}"
: "${PLUITS_BACKUP_REMOTE_USER:?Set PLUITS_BACKUP_REMOTE_USER}"
: "${PLUITS_BACKUP_REMOTE_DIR:?Set PLUITS_BACKUP_REMOTE_DIR}"
: "${PLUITS_BACKUP_SSH_KEY:?Set PLUITS_BACKUP_SSH_KEY}"
: "${PLUITS_BACKUP_KNOWN_HOSTS:?Set PLUITS_BACKUP_KNOWN_HOSTS}"
port="${PLUITS_BACKUP_REMOTE_PORT:-22}"

[[ "$port" =~ ^[0-9]+$ ]] && (( port >= 1 && port <= 65535 )) || { echo "Invalid SSH port" >&2; exit 2; }
[[ "$PLUITS_BACKUP_REMOTE_USER" =~ ^[a-z_][a-z0-9_-]*[$]?$ ]] || { echo "Invalid remote user" >&2; exit 2; }
[[ "$PLUITS_BACKUP_REMOTE_HOST" =~ ^[A-Za-z0-9.-]+$ ]] || { echo "Invalid remote host" >&2; exit 2; }
[[ "$PLUITS_BACKUP_REMOTE_DIR" =~ ^/srv/pluits-backups/[A-Za-z0-9._/-]+$ ]] || { echo "Remote directory must be under /srv/pluits-backups" >&2; exit 2; }
[[ "$PLUITS_BACKUP_REMOTE_DIR" != *"/../"* && "$PLUITS_BACKUP_REMOTE_DIR" != */.. ]] || { echo "Remote directory traversal is not allowed" >&2; exit 2; }
[[ -d "$PLUITS_BACKUP_SOURCE_DIR" && -r "$PLUITS_BACKUP_SOURCE_DIR" ]] || { echo "Backup source directory is not readable" >&2; exit 2; }
[[ -r "$PLUITS_BACKUP_SSH_KEY" && -r "$PLUITS_BACKUP_KNOWN_HOSTS" ]] || { echo "SSH key and pinned known_hosts must be readable" >&2; exit 2; }

shopt -s nullglob
files=("$PLUITS_BACKUP_SOURCE_DIR"/pluits-postgres-*.dump.age)
(("${#files[@]}" > 0)) || { echo "No encrypted backup files found" >&2; exit 1; }
for file in "${files[@]}"; do
  (cd "$PLUITS_BACKUP_SOURCE_DIR" && sha256sum --check --status "${file##*/}.sha256") || {
    echo "Backup checksum failed: ${file##*/}" >&2
    exit 1
  }
done

ssh_cmd=(ssh -i "$PLUITS_BACKUP_SSH_KEY" -p "$port" -o IdentitiesOnly=yes -o BatchMode=yes -o StrictHostKeyChecking=yes -o UserKnownHostsFile="$PLUITS_BACKUP_KNOWN_HOSTS")
rsync -a --delete-delay --partial --checksum --protect-args \
  -e "${ssh_cmd[*]}" \
  "$PLUITS_BACKUP_SOURCE_DIR/" \
  "$PLUITS_BACKUP_REMOTE_USER@$PLUITS_BACKUP_REMOTE_HOST:$PLUITS_BACKUP_REMOTE_DIR/"

echo "Encrypted PLUITS backups replicated successfully to $PLUITS_BACKUP_REMOTE_HOST"
