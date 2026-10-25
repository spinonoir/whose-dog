#!/usr/bin/env bash
# Pushes secrets and deploys. Auth comes from .secrets/cf-api-token.
# Secrets are piped from .secrets/ so they never appear in argv or shell history.
set -euo pipefail
cd "$(dirname "$0")"

need() { [ -f "$1" ] || { echo "missing $1"; exit 1; }; }
need .secrets/seed-key
need .secrets/poller-token
need .secrets/ntfy-topic
need .secrets/cf-api-token
need .secrets/cf-account-id

# Non-interactive auth: wrangler picks these up instead of `wrangler login`.
export CLOUDFLARE_API_TOKEN="$(tr -d '\n' < .secrets/cf-api-token)"
export CLOUDFLARE_ACCOUNT_ID="$(tr -d '\n' < .secrets/cf-account-id)"

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
