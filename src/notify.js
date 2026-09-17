// Two channels, deliberately unequal.
//
//   ntfy  - fires straight from the Worker. Depends on nothing you own, so it
//           still works when umbricor is down. Its topic is its only secret
//           (ntfy.sh has no topic reservation on the free tier), so it carries
//           an opaque subject number and NEVER a name or location.
//   signal- queued here, drained by umbricor over a pull. End-to-end encrypted,
//           carries the full detail.

const PRIORITY = { info: '2', soft: '4', hard: '5', duress: '5' };
const TAGS = {
  info: 'white_check_mark',
  soft: 'warning',
  hard: 'rotating_light',
  duress: 'rotating_light,sos',
};

// Opaque by construction: subject number only, no name, no place.
function ntfyBody(person, severity) {
  const who = person ? `subject ${person.subject_no}` : 'system';
  switch (severity) {
    case 'duress': return `ARF: ${who} — ACT NOW`;
    case 'hard':   return `ARF: ${who} escalated`;
    case 'soft':   return `ARF: ${who} overdue`;
    default:       return `ARF: ${who} ok`;
  }
}

async function pushNtfy(env, person, severity) {
  if (!env.NTFY_TOPIC) return null;
  const res = await fetch(`https://ntfy.sh/${env.NTFY_TOPIC}`, {
    method: 'POST',
    headers: {
      Priority: PRIORITY[severity] || '3',
      Tags: TAGS[severity] || 'bell',
      Title: 'whose.dog',
    },
    body: ntfyBody(person, severity),
  });
  return res.ok ? Math.floor(Date.now() / 1000) : null;
}

// Queue first, push second: a failed ntfy must never lose the alert, because
// Signal is the channel that carries the detail anyway.
export async function queueAlert(env, ctx, person, severity, body) {
  const now = Math.floor(Date.now() / 1000);
  const row = await env.DB.prepare(
    `INSERT INTO alert_queue (person_id, severity, body, created_at)
     VALUES (?,?,?,?) RETURNING id`,
  ).bind(person?.id ?? null, severity, body, now).first();

  const send = (async () => {
    const sentAt = await pushNtfy(env, person, severity).catch(() => null);
    if (sentAt) {
      await env.DB.prepare('UPDATE alert_queue SET ntfy_sent_at = ? WHERE id = ?')
        .bind(sentAt, row.id).run();
    }
  })();

  if (ctx?.waitUntil) ctx.waitUntil(send); else await send;
  return row.id;
}

// Pull endpoint for umbricor. Claim-then-confirm so a crash mid-send
// redelivers rather than silently dropping.
export async function handlePoll(request, env) {
  const auth = request.headers.get('authorization') || '';
  const token = auth.replace(/^Bearer\s+/i, '');
  if (!env.POLLER_TOKEN || token !== env.POLLER_TOKEN) {
    return new Response('no', { status: 404 });
  }
  const now = Math.floor(Date.now() / 1000);

  if (request.method === 'POST') {
    const { ack } = await request.json();
    if (Array.isArray(ack) && ack.length) {
      const ph = ack.map(() => '?').join(',');
      await env.DB.prepare(
        `UPDATE alert_queue SET delivered_at = ? WHERE id IN (${ph})`,
      ).bind(now, ...ack).run();
    }
    await env.DB.prepare(
      'INSERT INTO health (k,v) VALUES (\'poller_seen\',?) ' +
      'ON CONFLICT(k) DO UPDATE SET v = excluded.v',
    ).bind(now).run();
    return Response.json({ ok: true });
  }

  // Redeliver anything claimed but unconfirmed for over 5 minutes.
  const { results } = await env.DB.prepare(
    `SELECT q.id, q.severity, q.body, q.created_at, p.display_name, p.alias
       FROM alert_queue q LEFT JOIN people p ON p.id = q.person_id
      WHERE q.delivered_at IS NULL
        AND (q.claimed_at IS NULL OR q.claimed_at < ?)
      ORDER BY q.created_at LIMIT 50`,
  ).bind(now - 300).all();

  if (results.length) {
    const ph = results.map(() => '?').join(',');
    await env.DB.prepare(
      `UPDATE alert_queue SET claimed_at = ? WHERE id IN (${ph})`,
    ).bind(now, ...results.map((r) => r.id)).run();
  }
  await env.DB.prepare(
    'INSERT INTO health (k,v) VALUES (\'poller_seen\',?) ' +
    'ON CONFLICT(k) DO UPDATE SET v = excluded.v',
  ).bind(now).run();

  return Response.json({ alerts: results });
}
