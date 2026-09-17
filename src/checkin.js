import { verify } from './totp.js';
import { openSeed, sha256hex } from './crypto.js';
import * as H from './html.js';
import { queueAlert } from './notify.js';

const MIN_RESPONSE_MS = 450;   // pad every path to the same wall time
const MAX_FAILS = 5;
const LOCKOUT_SEC = 900;

// One message for every failure mode. A wrong alias, a wrong code, a locked
// account and a revoked person are indistinguishable from outside.
const REJECT = 'That didn’t work. Check the code and try again.';

async function settle(started, response) {
  const elapsed = Date.now() - started;
  if (elapsed < MIN_RESPONSE_MS) {
    await new Promise((r) => setTimeout(r, MIN_RESPONSE_MS - elapsed));
  }
  return response;
}

export async function handleCheckin(request, env, ctx) {
  const started = Date.now();
  const path = env.CHECKIN_PATH;

  if (request.method === 'GET') return new Response(H.checkin(path), htmlHeaders());

  const form = await request.formData();
  const alias = String(form.get('alias') || '').trim().toLowerCase().slice(0, 64);
  const code = String(form.get('code') || '').trim();
  const now = Math.floor(Date.now() / 1000);

  const reject = () =>
    settle(started, new Response(H.checkin(path, REJECT, alias), htmlHeaders(400)));

  const person = await env.DB.prepare(
    `SELECT id, alias, display_name, subject_no, cadence_sec, grace_sec, status,
            paused_until, locked_until, fail_count, last_ok_at, alert_state
       FROM people WHERE alias = ?`,
  ).bind(alias).first();

  // Burn comparable work on an unknown alias so response time can't enumerate.
  if (!person || person.status === 'revoked' || person.status === 'pending') {
    await verify(new Uint8Array(20), code.padStart(6, '0').slice(0, 6));
    return reject();
  }

  if (person.locked_until && person.locked_until > now) {
    await logCheckin(env, person.id, now, 'locked', null, request);
    return reject();
  }

  const sec = await env.DB.prepare(
    `SELECT normal_seed, duress_seed, last_counter, last_counter_duress
       FROM secrets WHERE person_id = ?`,
  ).bind(person.id).first();
  if (!sec) return reject();

  // Backup code path: single-use, for a lost phone. Never a duress signal.
  if (/^[0-9A-Za-z]{5}-[0-9A-Za-z]{5}$/.test(code)) {
    const hash = await sha256hex(code.toUpperCase());
    const hit = await env.DB.prepare(
      'SELECT id FROM backup_codes WHERE person_id = ? AND code_hash = ? AND used_at IS NULL',
    ).bind(person.id, hash).first();
    if (!hit) {
      const fails = person.fail_count + 1;
      await env.DB.prepare(
        'UPDATE people SET fail_count = ?, locked_until = ? WHERE id = ?',
      ).bind(fails, fails >= MAX_FAILS ? now + LOCKOUT_SEC : null, person.id).run();
      await logCheckin(env, person.id, now, 'fail', null, request);
      return reject();
    }
    const left = await env.DB.prepare(
      'SELECT count(*) n FROM backup_codes WHERE person_id = ? AND used_at IS NULL',
    ).bind(person.id).first();
    await env.DB.batch([
      env.DB.prepare('UPDATE backup_codes SET used_at = ? WHERE id = ?').bind(now, hit.id),
      env.DB.prepare(
        `UPDATE people SET last_ok_at = ?, fail_count = 0, locked_until = NULL,
                alert_state = 'green' WHERE id = ?`,
      ).bind(now, person.id),
    ]);
    await logCheckin(env, person.id, now, 'ok', null, request);
    // Worth knowing about: it means they lost their phone, or someone else has it.
    await queueAlert(env, ctx, person, 'soft',
      `${person.display_name} (${person.alias}) checked in with a BACKUP CODE ` +
      `(${left.n - 1} remaining). Expect a lost/replaced phone — confirm out of band.`);
    return settle(started, new Response(H.accepted(), htmlHeaders()));
  }

  const normal = await openSeed(env.SEED_KEY, sec.normal_seed);
  const duress = await openSeed(env.SEED_KEY, sec.duress_seed);

  // Always evaluate both seeds: identical work whichever one they used.
  const nCounter = await verify(normal, code);
  const dCounter = await verify(duress, code);
  const counter = dCounter ?? nCounter;
  const isDuress = dCounter !== null;

  if (counter === null) {
    const fails = person.fail_count + 1;
    const lock = fails >= MAX_FAILS ? now + LOCKOUT_SEC : null;
    await env.DB.prepare(
      'UPDATE people SET fail_count = ?, locked_until = ? WHERE id = ?',
    ).bind(fails, lock, person.id).run();
    await logCheckin(env, person.id, now, 'fail', null, request);
    if (lock) {
      // A brute-force attempt against one named person IS the signal.
      await queueAlert(env, ctx, person, 'hard',
        `${person.display_name} (${person.alias}) locked out after ${fails} failed ` +
        `check-in attempts. Origin ${geo(request).country || '??'} ASN ${geo(request).asn || '??'}.`);
    }
    return reject();
  }

  // Replay guard, per seed. A spent code cannot be spent again inside the window.
  const lastSpent = isDuress ? sec.last_counter_duress : sec.last_counter;
  if (counter <= lastSpent) {
    await logCheckin(env, person.id, now, 'fail', null, request);
    return reject();
  }

  const deadline = person.last_ok_at
    ? person.last_ok_at + person.cadence_sec
    : now;
  const earlyBy = deadline - now;

  await env.DB.batch([
    env.DB.prepare(
      isDuress
        ? 'UPDATE secrets SET last_counter_duress = ? WHERE person_id = ?'
        : 'UPDATE secrets SET last_counter = ? WHERE person_id = ?',
    ).bind(counter, person.id),
    env.DB.prepare(
      `UPDATE people SET last_ok_at = ?, fail_count = 0, locked_until = NULL,
              alert_state = ? WHERE id = ?`,
    ).bind(now, isDuress ? 'duress' : 'green', person.id),
  ]);
  await logCheckin(env, person.id, now, isDuress ? 'duress' : 'ok', earlyBy, request);

  if (isDuress) {
    const g = geo(request);
    await queueAlert(env, ctx, person, 'duress',
      `DURESS code used by ${person.display_name} (${person.alias}) at ` +
      `${new Date(now * 1000).toISOString()}. Origin ${g.country || '??'} ASN ${g.asn || '??'}. ` +
      `They were shown the normal confirmation screen.`);
  } else if (person.alert_state !== 'green') {
    await queueAlert(env, ctx, person, 'info',
      `${person.display_name} (${person.alias}) checked in and is green again.`);
  }

  // Byte-identical for normal and duress.
  return settle(started, new Response(H.accepted(), htmlHeaders()));
}

function geo(request) {
  const cf = request.cf || {};
  return { country: cf.country || null, asn: cf.asn ?? null };
}

// Coarse network data only. Full IPs are never written to the database.
async function logCheckin(env, personId, at, result, earlyBy, request) {
  const g = geo(request);
  const ua = request.headers.get('user-agent') || '';
  await env.DB.prepare(
    `INSERT INTO checkins (person_id, at, result, early_by_sec, country, asn, ua_hash)
     VALUES (?,?,?,?,?,?,?)`,
  ).bind(personId, at, result, earlyBy, g.country, g.asn,
    (await sha256hex(ua)).slice(0, 16)).run();
}

export function htmlHeaders(status = 200) {
  return {
    status,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'x-robots-tag': 'noindex, nofollow',
      'cache-control': 'no-store, private',
      'referrer-policy': 'no-referrer',
      'content-security-policy':
        "default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; frame-ancestors 'none'",
    },
  };
}
