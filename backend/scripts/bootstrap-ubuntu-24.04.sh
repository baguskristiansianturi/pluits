#!/usr/bin/env bash
set -Eeuo pipefail

REPO_URL="https://github.com/baguskristiansianturi/pluits.git"
INSTALL_DIR="${PLUITS_INSTALL_DIR:-/opt/pluits}"

if [[ "${EUID}" -ne 0 ]]; then
  echo "Run with sudo: sudo bash backend/scripts/bootstrap-ubuntu-24.04.sh" >&2
  exit 1
fi

if [[ ! -r /etc/os-release ]]; then
  echo "Cannot identify the Linux distribution." >&2
  exit 1
fi
# shellcheck disable=SC1091
source /etc/os-release
if [[ "${ID:-}" != "ubuntu" || "${VERSION_ID:-}" != "24.04" ]]; then
  echo "This bootstrap is tested only for Ubuntu 24.04 LTS; detected ${PRETTY_NAME:-unknown}." >&2
  exit 1
fi

DEPLOY_USER="${SUDO_USER:-}"
if [[ -z "$DEPLOY_USER" || "$DEPLOY_USER" == "root" ]]; then
  echo "Run this script with sudo from your normal SSH user, not from a root login." >&2
  exit 1
fi
if ! id "$DEPLOY_USER" >/dev/null 2>&1; then
  echo "The invoking SSH user does not exist." >&2
  exit 1
fi

echo "Installing Docker Engine, Compose v2 and Git..."
apt-get update
DEBIAN_FRONTEND=noninteractive apt-get install -y ca-certificates curl git docker.io docker-compose-v2
systemctl enable --now docker

if ! getent group docker >/dev/null; then
  groupadd docker
fi
usermod -aG docker "$DEPLOY_USER"

if [[ -e "$INSTALL_DIR" && ! -d "$INSTALL_DIR/.git" ]]; then
  if [[ -n "$(find "$INSTALL_DIR" -mindepth 1 -maxdepth 1 -print -quit 2>/dev/null)" ]]; then
    echo "$INSTALL_DIR exists and is not an empty Git checkout; refusing to overwrite it." >&2
    exit 1
  fi
fi

install -d -o "$DEPLOY_USER" -g "$DEPLOY_USER" "$INSTALL_DIR"
if [[ ! -d "$INSTALL_DIR/.git" ]]; then
  runuser -u "$DEPLOY_USER" -- git clone --branch main --depth 1 "$REPO_URL" "$INSTALL_DIR"
else
  echo "Existing PLUITS Git checkout found; leaving its current revision unchanged."
fi

if [[ ! -f "$INSTALL_DIR/backend/.env" ]]; then
  install -o "$DEPLOY_USER" -g "$DEPLOY_USER" -m 0600 \
    "$INSTALL_DIR/backend/.env.example" "$INSTALL_DIR/backend/.env"
else
  chown "$DEPLOY_USER:$DEPLOY_USER" "$INSTALL_DIR/backend/.env"
  chmod 0600 "$INSTALL_DIR/backend/.env"
fi

install -d -o 10001 -g 10001 -m 0700 /srv/pluits/backups

echo
echo "Bootstrap complete."
echo "Install directory: $INSTALL_DIR"
echo "Environment file: $INSTALL_DIR/backend/.env (placeholders still need real values)."
echo "Docker access was added to $DEPLOY_USER. Disconnect and reconnect SSH before using Docker."
echo "Do not enable public signup yet. Configure DNS, firewall, SMTP and secrets, then run the deployment workflow."
echo "Allow inbound TCP 80/443 and UDP 443 in the VPS firewall. Keep SSH access restricted and PostgreSQL/API ports 5432/8080 private."
