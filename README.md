# arf — whose.dog check-in

Heartbeat + duress check-in for a small trusted group (≤10 people).

## What this does and does not tell you

- A valid code proves someone **holds the seed**, not that they are safe.
- A missed check-in means **no signal**, not "compromised". The watcher's ladder,
  quiet hours and expiring pauses exist to keep false positives from training you
  to ignore alerts.
- The **duress seed** is the part that carries real signal. Rehearse it.

## Layout

| Path | What |
|---|---|
| `/` | Innocuous landing page. Every unknown path returns this too, as a byte-identical 404. |
| `/arf` | Check-in. Alias + 6-digit code, or a backup code. |
| `/e/<token>` | One-time enrolment. 30-min TTL, single use. |
| `/admin` | Dashboard, behind Cloudflare Access (verified JWT, fails closed). |
| `/_poll` | Pull endpoint for the Signal bridge. 404s without a bearer token. |

## Deploy

```sh
npx wrangler d1 create whosedog          # put the id into wrangler.toml
npx wrangler d1 execute whosedog --file=./schema.sql --remote

npx wrangler secret put SEED_KEY         # openssl rand -base64 32
npx wrangler secret put NTFY_TOPIC       # cat .secrets/ntfy-topic
npx wrangler secret put POLLER_TOKEN     # openssl rand -hex 32
npx wrangler secret put ACCESS_TEAM_DOMAIN   # <team>.cloudflareaccess.com
npx wrangler secret put ACCESS_AUD           # Access app AUD tag

npx wrangler deploy
```

Then in the dashboard: add a custom domain `whose.dog` to this Worker, and put a
Cloudflare Access application in front of `whose.dog/admin`.

**`SEED_KEY` protects against a D1 leak, not against Cloudflare account takeover** —
the key and the data live in the same account. Hardware-key 2FA on that account is
the control that actually matters.

## Signal bridge (umbricor)

Register the dedicated number once:

```sh
# Solve the captcha at https://signalcaptchas.org/registration/generate.html
signal-cli -a +1XXXXXXXXXX register --captcha 'signalcaptcha://...'
signal-cli -a +1XXXXXXXXXX verify 123456
signal-cli -a +1XXXXXXXXXX send --note-to-self -m "arf bridge online"
```

Then:

```sh
mkdir -p ~/.config/arf && cat > ~/.config/arf/bridge.env <<'EOF'
ARF_URL=https://whose.dog
ARF_TOKEN=<POLLER_TOKEN>
SIGNAL_ACCOUNT=+1XXXXXXXXXX
SIGNAL_TO=+1YYYYYYYYYY      # omit to use Note to Self
EOF
chmod 600 ~/.config/arf/bridge.env

mkdir -p ~/.config/systemd/user
cp bridge/arf-bridge.{service,timer} ~/.config/systemd/user/
systemctl --user daemon-reload
systemctl --user enable --now arf-bridge.timer
```

`loginctl enable-linger regret` is already set, so the timer survives logout.

## Operating notes

- **Pauses always expire.** Max 720h. A pause that never ends is a blind spot.
- **Duress latches.** It stays red until an admin clears it — never auto-resolves.
- **ntfy carries subject numbers only**, never names. Its topic is its only secret
  (ntfy.sh has no free-tier topic reservation), so a leak reveals nothing useful.
  Signal carries the detail.
- **Full IPs are never stored.** Country + ASN only, 90-day retention.
- Tell participants what is recorded. A heartbeat that logs coarse location is
  something they should knowingly agree to.

## Still open

- **External heartbeat.** If the Worker or its cron dies, that looks exactly like
  everyone going quiet at once. Point healthchecks.io (or similar) at a ping from
  the cron. Until this exists, the system has a silent failure mode.
- Duress rehearsal / sandbox mode.
- Seed rotation UI (revoke + re-enrol works today).
