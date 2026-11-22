#!/usr/bin/env bash
set -Eeuo pipefail

REPO_ROOT="${PLUITS_REPO_ROOT:-/opt/pluits}"
DEPLOY_BRANCH="${PLUITS_DEPLOY_BRANCH:-main}"
BACKEND_DIR="$REPO_ROOT/backend"
COMPOSE_FILE="$BACKEND_DIR/compose.yaml"
ENV_FILE="$BACKEND_DIR/.env"

if [[ ! -d "$REPO_ROOT/.git" ]]; then
  echo "PLUITS Git checkout not found at $REPO_ROOT. Run bootstrap-ubuntu-24.04.sh first." >&2
  exit 1
fi
if [[ ! -f "$ENV_FILE" ]]; then
  echo "Missing $ENV_FILE. Copy .env.example and configure real production values first." >&2
  exit 1
fi

required_keys=(
  POSTGRES_DB
  POSTGRES_USER
  POSTGRES_PASSWORD
  PLUITS_OUTBOX_ENCRYPTION_KEY
  PLUITS_RATE_LIMIT_KEY
  PLUITS_API_DOMAIN
  PLUITS_TLS_CONTACT_EMAIL
  PLUITS_ALLOWED_ORIGINS
  PLUITS_SMTP_HOST
  PLUITS_SMTP_FROM
  PLUITS_BACKUP_AGE_RECIPIENT
)
for key in "${required_keys[@]}"; do
  value="$(sed -n "s/^$key=//p" "$ENV_FILE" | tail -n 1)"
  if [[ -z "$value" || "$value" == *replace* || "$value" == *example* ]]; then
    echo "Production configuration is incomplete: set $key in backend/.env." >&2
    exit 1
  fi
done

echo "Fetching $DEPLOY_BRANCH..."
git -C "$REPO_ROOT" fetch --prune origin "$DEPLOY_BRANCH"
git -C "$REPO_ROOT" reset --hard "origin/$DEPLOY_BRANCH"

cd "$BACKEND_DIR"
docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" config --quiet

echo "Building and starting the PLUITS backend stack..."
docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" up -d --build --remove-orphans
docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" ps

echo "Deployment commands completed. Check API readiness at https://<PLUITS_API_DOMAIN>/health/ready."
echo "Public signup must remain disabled until email, backups, off-host replication and restore checks pass."
