// The watcher. Runs every 5 minutes.
//
// Its whole job is suppressing false positives: a missed check-in means "no
// signal", not "compromised", and an alert channel you learn to ignore is worse
// than no channel at all. Hence the ladder, quiet hours, and expiring pauses.

import { queueAlert } from './notify.js';

const NUDGE_LEAD_SEC = 1800;      // warn them 30 min before they're due
const POLLER_STALE_SEC = 900;

// Local wall-clock minutes for a timezone, via Intl (available in Workers).
function localMinutes(tz, nowSec) {
  try {
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: tz, hour: '2-digit', minute: '2-digit', hour12: false,
    }).formatToParts(new Date(nowSec * 1000));
    const h = +parts.find((p) => p.type === 'hour').value;
    const m = +parts.find((p) => p.type === 'minute').value;
    return h * 60 + m;
  } catch {
    return null;   // bad tz: treat as never quiet rather than never alerting
  }
}

function inQuietHours(person, nowSec) {
  const { quiet_start: s, quiet_end: e } = person;
  if (s == null || e == null) return false;
  const m = localMinutes(person.timezone, nowSec);
  if (m == null) return false;
  return s <= e ? (m >= s && m < e) : (m >= s || m < e);  // handles overnight wrap
}

async function nudge(env, person, secsLeft) {
  if (!person.reminder_topic) return;
  const mins = Math.max(1, Math.round(secsLeft / 60));
  await fetch(`https://ntfy.sh/${person.reminder_topic}`, {
    method: 'POST',
    headers: { Title: 'whose.dog', Tags: 'dog', Priority: '3' },
    body: `Check-in due in ${mins} min.`,
  }).catch(() => {});
}

async function setState(env, person, state) {
  await env.DB.prepare('UPDATE people SET alert_state = ? WHERE id = ?')
    .bind(state, person.id).run();
}

async function logEvent(env, kind, personId, detail) {
  await env.DB.prepare(
    'INSERT INTO events (at, actor, kind, person_id, detail) VALUES (?,?,?,?,?)',
  ).bind(Math.floor(Date.now() / 1000), 'cron', kind, personId ?? null, detail ?? null).run();
}

export async function runWatcher(env, ctx) {
  const now = Math.floor(Date.now() / 1000);

  // Expire pauses first, so a pause can never quietly become permanent.
  const expired = await env.DB.prepare(
    `UPDATE people SET status = 'active', paused_until = NULL
      WHERE status = 'paused' AND paused_until IS NOT NULL AND paused_until <= ?
      RETURNING id, display_name, alias`,
  ).bind(now).all();
  for (const p of expired.results || []) {
    await logEvent(env, 'pause_expired', p.id, p.alias);
    await queueAlert(env, ctx, p, 'info',
      `Travel pause expired for ${p.display_name} (${p.alias}); they are being watched again.`);
  }

  const { results: people } = await env.DB.prepare(
    `SELECT * FROM people WHERE status = 'active'`,
  ).all();

  for (const p of people) {
    // Duress latches until an admin clears it. It is never auto-resolved.
    if (p.alert_state === 'duress') continue;

    const base = p.last_ok_at ?? p.created_at;
    const deadline = base + p.cadence_sec;
    const hard = deadline + p.grace_sec;
    const quiet = inQuietHours(p, now);

    if (now >= hard + p.grace_sec && p.alert_state !== 'missed') {
      await setState(env, p, 'missed');
      await logEvent(env, 'missed', p.id, `${Math.round((now - deadline) / 60)}m late`);
      await queueAlert(env, ctx, p, 'hard',
        `MISSED: ${p.display_name} (${p.alias}) is ${Math.round((now - deadline) / 3600)}h ` +
        `past their deadline (cadence ${Math.round(p.cadence_sec / 3600)}h, grace ` +
        `${Math.round(p.grace_sec / 3600)}h). Last OK ` +
        `${p.last_ok_at ? new Date(p.last_ok_at * 1000).toISOString() : 'never'}.`);

    } else if (now >= hard && p.alert_state !== 'overdue' && p.alert_state !== 'missed') {
      await setState(env, p, 'overdue');
      await logEvent(env, 'overdue', p.id, null);
      // Soft alerts hold until quiet hours end; hard ones never do.
      if (!quiet) {
        await queueAlert(env, ctx, p, 'soft',
          `Overdue: ${p.display_name} (${p.alias}) passed their grace window. ` +
          `Last OK ${p.last_ok_at ? new Date(p.last_ok_at * 1000).toISOString() : 'never'}.`);
      }

    } else if (now >= deadline - NUDGE_LEAD_SEC && now < deadline
               && p.alert_state === 'green' && !quiet) {
      await setState(env, p, 'due_soon');
      await nudge(env, p, deadline - now);
    }
  }

  // Heartbeat of the watcher itself, and of the Signal bridge.
  await env.DB.prepare(
    "INSERT INTO health (k,v) VALUES ('cron_ran',?) ON CONFLICT(k) DO UPDATE SET v = excluded.v",
  ).bind(now).run();

  const seen = await env.DB.prepare("SELECT v FROM health WHERE k = 'poller_seen'").first();
  if (seen && now - seen.v > POLLER_STALE_SEC) {
    const last = await env.DB.prepare("SELECT v FROM health WHERE k = 'poller_warned'").first();
    if (!last || now - last.v > 3600) {
      await env.DB.prepare(
        "INSERT INTO health (k,v) VALUES ('poller_warned',?) ON CONFLICT(k) DO UPDATE SET v = excluded.v",
      ).bind(now).run();
      await queueAlert(env, ctx, null, 'hard',
        `Signal bridge on umbricor has not polled for ` +
        `${Math.round((now - seen.v) / 60)} min. Signal alerts are NOT being delivered.`);
    }
  }

  // Retention: coarse data still ages out.
  await env.DB.prepare('DELETE FROM checkins WHERE at < ?').bind(now - 90 * 86400).run();
  await env.DB.prepare('DELETE FROM events WHERE at < ?').bind(now - 180 * 86400).run();
  await env.DB.prepare('DELETE FROM alert_queue WHERE delivered_at IS NOT NULL AND created_at < ?')
    .bind(now - 30 * 86400).run();
}
