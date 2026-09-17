-- whose.dog check-in system
-- Heartbeat + duress channel for a small trusted group.

PRAGMA foreign_keys = ON;

-- One row per participant. Cadence is per-person and tunable at runtime.
CREATE TABLE IF NOT EXISTS people (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  alias         TEXT    NOT NULL UNIQUE,      -- what they type at /arf
  display_name  TEXT    NOT NULL,             -- admin dashboard only
  subject_no    INTEGER NOT NULL UNIQUE,      -- opaque id used in ntfy alerts
  timezone      TEXT    NOT NULL DEFAULT 'UTC',
  reminder_topic TEXT,                         -- their own ntfy topic, for nudges
  cadence_sec   INTEGER NOT NULL DEFAULT 43200,  -- 12h
  grace_sec     INTEGER NOT NULL DEFAULT 7200,   -- 2h
  quiet_start   INTEGER,                       -- local minutes past midnight
  quiet_end     INTEGER,
  status        TEXT    NOT NULL DEFAULT 'pending'
                CHECK (status IN ('pending','active','paused','revoked')),
  paused_until  INTEGER,                       -- unix sec; pauses always expire
  locked_until  INTEGER,                       -- brute-force lockout
  fail_count    INTEGER NOT NULL DEFAULT 0,
  last_ok_at    INTEGER,
  alert_state   TEXT    NOT NULL DEFAULT 'green'
                CHECK (alert_state IN ('green','due_soon','overdue','missed','duress')),
  created_at    INTEGER NOT NULL
);

-- Seeds are AES-GCM encrypted with SEED_KEY. A D1 dump alone yields nothing usable.
-- last_counter kills replay of an observed code.
CREATE TABLE IF NOT EXISTS secrets (
  person_id     INTEGER PRIMARY KEY REFERENCES people(id) ON DELETE CASCADE,
  normal_seed   BLOB    NOT NULL,
  duress_seed   BLOB    NOT NULL,
  last_counter  INTEGER NOT NULL DEFAULT 0,
  -- Separate counters: a duress code must never be refused because a normal
  -- check-in just consumed that time step. Under coercion, a visible failure
  -- is exactly the outcome this feature exists to avoid.
  last_counter_duress INTEGER NOT NULL DEFAULT 0,
  rotated_at    INTEGER NOT NULL
);

-- Coarse network data only: country + ASN, never a full IP.
CREATE TABLE IF NOT EXISTS checkins (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  person_id     INTEGER NOT NULL REFERENCES people(id) ON DELETE CASCADE,
  at            INTEGER NOT NULL,
  result        TEXT    NOT NULL CHECK (result IN ('ok','duress','fail','locked')),
  early_by_sec  INTEGER,                       -- vs. their deadline; negative = late
  country       TEXT,
  asn           INTEGER,
  ua_hash       TEXT
);
CREATE INDEX IF NOT EXISTS idx_checkins_person_at ON checkins(person_id, at DESC);
CREATE INDEX IF NOT EXISTS idx_checkins_at ON checkins(at);

-- Single-use enrollment links, short TTL.
CREATE TABLE IF NOT EXISTS enroll_tokens (
  token_hash    TEXT    PRIMARY KEY,
  person_id     INTEGER NOT NULL REFERENCES people(id) ON DELETE CASCADE,
  expires_at    INTEGER NOT NULL,
  consumed_at   INTEGER
);

CREATE TABLE IF NOT EXISTS backup_codes (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  person_id     INTEGER NOT NULL REFERENCES people(id) ON DELETE CASCADE,
  code_hash     TEXT    NOT NULL,
  used_at       INTEGER
);
CREATE INDEX IF NOT EXISTS idx_backup_person ON backup_codes(person_id);

-- Durable alert queue. ntfy fires straight from the Worker; Signal alerts wait
-- here until umbricor drains them, so a box reboot delays but never drops one.
CREATE TABLE IF NOT EXISTS alert_queue (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  person_id     INTEGER REFERENCES people(id) ON DELETE SET NULL,
  severity      TEXT    NOT NULL CHECK (severity IN ('info','soft','hard','duress')),
  body          TEXT    NOT NULL,             -- full detail; Signal only
  created_at    INTEGER NOT NULL,
  ntfy_sent_at  INTEGER,
  claimed_at    INTEGER,
  delivered_at  INTEGER
);
CREATE INDEX IF NOT EXISTS idx_queue_undelivered ON alert_queue(delivered_at, created_at);

CREATE TABLE IF NOT EXISTS events (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  at            INTEGER NOT NULL,
  actor         TEXT,
  kind          TEXT    NOT NULL,
  person_id     INTEGER REFERENCES people(id) ON DELETE SET NULL,
  detail        TEXT
);
CREATE INDEX IF NOT EXISTS idx_events_at ON events(at DESC);

-- Heartbeat of the system itself, so a dead watcher is distinguishable
-- from ten people going quiet at once.
CREATE TABLE IF NOT EXISTS health (
  k             TEXT PRIMARY KEY,
  v             INTEGER NOT NULL
);
