import { randomSeed, base32Encode, base32Decode, otpauthURI, verify } from './totp.js';
import { sealSeed, openSeed, sha256hex, backupCode, randomToken } from './crypto.js';
import { htmlHeaders } from './checkin.js';
import * as H from './html.js';

const BACKUP_COUNT = 6;

export async function handleEnroll(request, env, token) {
  const now = Math.floor(Date.now() / 1000);
  const hash = await sha256hex(token);

  const row = await env.DB.prepare(
    `SELECT t.person_id, t.expires_at, t.consumed_at, p.display_name, p.alias, p.status
       FROM enroll_tokens t JOIN people p ON p.id = t.person_id
      WHERE t.token_hash = ?`,
  ).bind(hash).first();

  if (!row || row.consumed_at || row.expires_at < now) {
    return new Response(H.gone(), htmlHeaders(410));
  }

  // Seeds are minted once and kept stable, so refreshing this page doesn't
  // invalidate a QR they've already scanned.
  let sec = await env.DB.prepare(
    'SELECT normal_seed, duress_seed FROM secrets WHERE person_id = ?',
  ).bind(row.person_id).first();

  if (!sec) {
    const n = randomSeed(), d = randomSeed();
    await env.DB.prepare(
      `INSERT INTO secrets (person_id, normal_seed, duress_seed, rotated_at)
       VALUES (?,?,?,?)`,
    ).bind(row.person_id, await sealSeed(env.SEED_KEY, n),
      await sealSeed(env.SEED_KEY, d), now).run();
    sec = await env.DB.prepare(
      'SELECT normal_seed, duress_seed FROM secrets WHERE person_id = ?',
    ).bind(row.person_id).first();
  }

  const normal = await openSeed(env.SEED_KEY, sec.normal_seed);
  const duress = await openSeed(env.SEED_KEY, sec.duress_seed);

  if (request.method === 'POST') {
    const form = await request.formData();
    const code = String(form.get('code') || '').trim();
    const counter = await verify(normal, code);
    if (counter === null) {
      return renderEnroll(env, request, token, row, normal, duress,
        'That code didn’t match. Check you scanned the first QR, and try the current code.');
    }
    await env.DB.batch([
      env.DB.prepare("UPDATE people SET status = 'active', last_ok_at = ? WHERE id = ?")
        .bind(now, row.person_id),
      env.DB.prepare('UPDATE secrets SET last_counter = ? WHERE person_id = ?')
        .bind(counter, row.person_id),
      env.DB.prepare('UPDATE enroll_tokens SET consumed_at = ? WHERE token_hash = ?')
        .bind(now, hash),
      env.DB.prepare(
        'INSERT INTO events (at, actor, kind, person_id, detail) VALUES (?,?,?,?,?)',
      ).bind(now, 'enroll', 'enrolled', row.person_id, row.alias),
    ]);
    return new Response(H.done(), htmlHeaders());
  }

  return renderEnroll(env, request, token, row, normal, duress);
}

async function renderEnroll(env, request, token, row, normal, duress, msg) {
  const now = Math.floor(Date.now() / 1000);
  // Backup codes are reissued on each render: only the set on screen is live.
  const codes = Array.from({ length: BACKUP_COUNT }, backupCode);
  const stmts = [env.DB.prepare('DELETE FROM backup_codes WHERE person_id = ?')
    .bind(row.person_id)];
  for (const c of codes) {
    stmts.push(env.DB.prepare(
      'INSERT INTO backup_codes (person_id, code_hash) VALUES (?,?)',
    ).bind(row.person_id, await sha256hex(c)));
  }
  await env.DB.batch(stmts);

  const nB32 = base32Encode(normal), dB32 = base32Encode(duress);
  const body = H.enroll(
    token, row.display_name,
    otpauthURI(row.alias, nB32),
    otpauthURI(row.alias, dB32, 'backup'),
    nB32, dB32, codes,
  );
  const withMsg = msg
    ? body.replace('<h1>', `<div class="msg">${msg}</div><h1>`)
    : body;
  // The QR library is the one external script; CSP is widened just for it.
  return new Response(withMsg, {
    status: 200,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'x-robots-tag': 'noindex, nofollow',
      'cache-control': 'no-store, private',
      'referrer-policy': 'no-referrer',
      'content-security-policy':
        "default-src 'none'; script-src 'unsafe-inline' https://cdn.jsdelivr.net; " +
        "style-src 'unsafe-inline'; img-src data:; form-action 'self'; frame-ancestors 'none'",
    },
  });
}

// Called by the admin dashboard. Returns the one-time link to hand over.
export async function mintEnrollToken(env, personId, ttlSec = 1800) {
  const token = randomToken(32);
  const now = Math.floor(Date.now() / 1000);
  await env.DB.prepare(
    `INSERT INTO enroll_tokens (token_hash, person_id, expires_at)
     VALUES (?,?,?)`,
  ).bind(await sha256hex(token), personId, now + ttlSec).run();
  return token;
}
