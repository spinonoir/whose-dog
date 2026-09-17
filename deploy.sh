#!/usr/bin/env bash
# Pushes secrets and deploys. Run AFTER `npx wrangler login`.
# Secrets are piped from .secrets/ so they never appear in argv or shell history.
set -euo pipefail
cd "$(dirname "$0")"

need() { [ -f "$1" ] || { echo "missing $1"; exit 1; }; }
need .secrets/seed-key
need .secrets/poller-token
need .secrets/ntfy-topic

echo "==> secrets"
tr -d '\n' < .secrets/seed-key     | npx wrangler secret put SEED_KEY
tr -d '\n' < .secrets/poller-token | npx wrangler secret put POLLER_TOKEN
tr -d '\n' < .secrets/ntfy-topic   | npx wrangler secret put NTFY_TOPIC

# Set only once the Access application exists; until then /admin fails closed.
if [ -f .secrets/access-team-domain ] && [ -f .secrets/access-aud ]; then
  tr -d '\n' < .secrets/access-team-domain | npx wrangler secret put ACCESS_TEAM_DOMAIN
  tr -d '\n' < .secrets/access-aud         | npx wrangler secret put ACCESS_AUD
else
  echo "    (skipping ACCESS_* -- /admin stays closed until these are set)"
fi

echo "==> deploy"
npx wrangler deploy
