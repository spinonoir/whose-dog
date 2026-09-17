import { verifyAccess } from './access.js';
import { mintEnrollToken } from './enroll.js';
import { randomToken } from './crypto.js';

const esc = (s) => String(s ?? '').replace(/[&<>"']/g,
  (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const H = (n) => Math.round(n / 3600);
const ago = (t) => {
  if (!t) return 'never';
  const d = Math.floor(Date.now() / 1000) - t;
  if (d < 3600) return `${Math.floor(d / 60)}m ago`;
  if (d < 86400) return `${Math.floor(d / 3600)}h ago`;
  return `${Math.floor(d / 86400)}d ago`;
};

export async function handleAdmin(request, env, sub) {
  const who = await verifyAccess(request, env);
  if (!who) return new Response('Not found', { status: 404 });

  if (request.method === 'POST') return doAction(request, env, who);
  return dashboard(env, sub, new URL(request.url).searchParams.get('link'));
}

async function doAction(request, env, who) {
  const f = await request.formData();
  const action = String(f.get('action') || '');
  const id = Number(f.get('id') || 0);
  const now = Math.floor(Date.now() / 1000);
  const log = (kind, pid, detail) => env.DB.prepare(
    'INSERT INTO events (at, actor, kind, person_id, detail) VALUES (?,?,?,?,?)',
  ).bind(now, who.email || 'admin', kind, pid || null, detail || null).run();

  let redirect = '/admin';

  if (action === 'create') {
    const alias = String(f.get('alias') || '').trim().toLowerCase().slice(0, 64);
    const name = String(f.get('display_name') || '').trim().slice(0, 128);
    if (!/^[a-z0-9_-]{2,64}$/.test(alias) || !name) {
      return new Response('bad alias or name', { status: 400 });
    }
    const max = await env.DB.prepare('SELECT COALESCE(MAX(subject_no),0) n FROM people').first();
    const r = await env.DB.prepare(
      `INSERT INTO people (alias, display_name, subject_no, timezone, reminder_topic,
                           cadence_sec, grace_sec, quiet_start, quiet_end, created_at)
       VALUES (?,?,?,?,?,?,?,?,?,?) RETURNING id`,
    ).bind(alias, name, max.n + 1,
      String(f.get('timezone') || 'UTC'),
      `arf-${randomToken(12)}`,
      Math.max(900, Number(f.get('cadence_h') || 12) * 3600),
      Math.max(300, Number(f.get('grace_h') || 2) * 3600),
      f.get('quiet_start') ? Number(f.get('quiet_start')) : null,
      f.get('quiet_end') ? Number(f.get('quiet_end')) : null,
      now).first();
    await log('created', r.id, alias);
    const token = await mintEnrollToken(env, r.id);
    redirect = `/admin?link=${encodeURIComponent(token)}`;

  } else if (action === 'relink') {
    const token = await mintEnrollToken(env, id);
    await log('relink', id, null);
    redirect = `/admin?link=${encodeURIComponent(token)}`;

  } else if (action === 'pause') {
    const hours = Math.min(720, Math.max(1, Number(f.get('hours') || 24)));
    await env.DB.prepare(
      "UPDATE people SET status='paused', paused_until=?, alert_state='green' WHERE id=?",
    ).bind(now + hours * 3600, id).run();
    await log('paused', id, `${hours}h`);

  } else if (action === 'resume') {
    await env.DB.prepare(
      "UPDATE people SET status='active', paused_until=NULL, last_ok_at=? WHERE id=?",
    ).bind(now, id).run();
    await log('resumed', id, null);

  } else if (action === 'clear') {
    await env.DB.prepare("UPDATE people SET alert_state='green', last_ok_at=? WHERE id=?")
      .bind(now, id).run();
    await log('duress_cleared', id, null);

  } else if (action === 'unlock') {
    await env.DB.prepare('UPDATE people SET fail_count=0, locked_until=NULL WHERE id=?')
      .bind(id).run();
    await log('unlocked', id, null);

  } else if (action === 'revoke') {
    await env.DB.prepare("UPDATE people SET status='revoked' WHERE id=?").bind(id).run();
    await env.DB.prepare('DELETE FROM secrets WHERE person_id=?').bind(id).run();
    await log('revoked', id, null);

  } else if (action === 'cadence') {
    await env.DB.prepare('UPDATE people SET cadence_sec=?, grace_sec=? WHERE id=?')
      .bind(Math.max(900, Number(f.get('cadence_h') || 12) * 3600),
        Math.max(300, Number(f.get('grace_h') || 2) * 3600), id).run();
    await log('cadence', id, `${f.get('cadence_h')}h/${f.get('grace_h')}h`);
  }

  return new Response(null, { status: 303, headers: { location: redirect } });
}

async function dashboard(env, sub, freshLink) {
  const { results: people } = await env.DB.prepare(
    'SELECT * FROM people WHERE status != \'revoked\' ORDER BY subject_no',
  ).all();
  const health = await env.DB.prepare('SELECT k, v FROM health').all();
  const hm = Object.fromEntries((health.results || []).map((r) => [r.k, r.v]));
  const now = Math.floor(Date.now() / 1000);

  const rows = people.map((p) => {
    const base = p.last_ok_at ?? p.created_at;
    const due = base + p.cadence_sec;
    const state = p.status === 'paused' ? 'paused' : p.alert_state;
    return `<tr class="s-${state}">
      <td>${p.subject_no}</td>
      <td><strong>${esc(p.display_name)}</strong><br><small>${esc(p.alias)}</small></td>
      <td><span class="pill p-${state}">${state.replace('_', ' ')}</span>
          ${p.locked_until > now ? '<span class="pill p-missed">locked</span>' : ''}
          ${p.status === 'pending' ? '<span class="pill">not enrolled</span>' : ''}</td>
      <td>${ago(p.last_ok_at)}</td>
      <td>${p.status === 'paused' ? '&mdash;' : (due > now ? `in ${H(due - now)}h` : `${H(now - due)}h late`)}</td>
      <td><small>${H(p.cadence_sec)}h / ${H(p.grace_sec)}h</small></td>
      <td class="act">
        <form method=POST><input type=hidden name=id value=${p.id}>
          ${p.alert_state === 'duress' ? '<button name=action value=clear class=warn>Clear duress</button>' : ''}
          ${p.status === 'paused'
            ? '<button name=action value=resume>Resume</button>'
            : '<button name=action value=pause>Pause 24h</button>'}
          ${p.locked_until > now ? '<button name=action value=unlock>Unlock</button>' : ''}
          <button name=action value=relink>New link</button>
          <button name=action value=revoke class=danger>Revoke</button>
        </form></td></tr>`;
  }).join('');

  const cronAge = hm.cron_ran ? Math.floor((now - hm.cron_ran) / 60) : null;
  const pollAge = hm.poller_seen ? Math.floor((now - hm.poller_seen) / 60) : null;

  return new Response(`<!DOCTYPE html><html lang=en><head><meta charset=utf-8>
<meta name=viewport content="width=device-width,initial-scale=1">
<meta name=robots content="noindex,nofollow"><title>arf &mdash; admin</title><style>
:root{--bg:#faf7f2;--fg:#2b2724;--mut:#7d7469;--line:#e4dcd0;--accent:#b5784a;--card:#fff}
@media(prefers-color-scheme:dark){:root:not([data-theme=light]){--bg:#17150f;--fg:#ece5da;--mut:#9a9186;--line:#2f2a22;--accent:#d29765;--card:#1e1b14}}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--fg);
font:15px/1.5 ui-sans-serif,system-ui,-apple-system,sans-serif;padding:24px 16px}
.wrap{max-width:1000px;margin:0 auto}h1{font-size:1.3rem;margin:0 0 .2em}
table{width:100%;border-collapse:collapse;background:var(--card);border-radius:12px;overflow:hidden;margin:1em 0}
th,td{padding:.6em .7em;text-align:left;border-bottom:1px solid var(--line);vertical-align:top}
th{font-size:.72rem;text-transform:uppercase;letter-spacing:.06em;color:var(--mut)}
small{color:var(--mut)}
.pill{display:inline-block;padding:.1em .5em;border-radius:99px;font-size:.72rem;border:1px solid var(--line)}
.p-green{background:#1f7a4620;color:#1f7a46;border-color:#1f7a4640}
.p-due_soon{background:#9a7b0020;color:#9a7b00;border-color:#9a7b0040}
.p-overdue{background:#a8560020;color:#a85600;border-color:#a8560040}
.p-missed,.p-duress{background:#a3121220;color:#c0392b;border-color:#a3121240;font-weight:700}
.p-paused{color:var(--mut)}
tr.s-duress{outline:2px solid #c0392b;outline-offset:-2px}
button{font:inherit;font-size:.8rem;padding:.3em .6em;margin:0 .15em .25em 0;border:1px solid var(--line);
background:transparent;color:var(--fg);border-radius:7px;cursor:pointer}
button.danger{color:#c0392b}button.warn{background:#c0392b;color:#fff;border-color:#c0392b}
.act form{display:flex;flex-wrap:wrap}
.panel{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:1em;margin:1em 0}
input,select{font:inherit;padding:.45em .55em;border:1px solid var(--line);border-radius:7px;
background:transparent;color:var(--fg);margin:0 .4em .5em 0}
.hl{background:#9a7b0018;border:1px solid #9a7b0050;padding:1em;border-radius:12px;margin:1em 0}
code{font-family:ui-monospace,Menlo,monospace;word-break:break-all;font-size:.85rem}
.health{font-size:.8rem;color:var(--mut)}.bad{color:#c0392b;font-weight:600}
@media(max-width:700px){th:nth-child(6),td:nth-child(6){display:none}}
</style></head><body><div class=wrap>
<h1>arf</h1>
<div class=health>
 watcher: ${cronAge === null ? '<span class=bad>never run</span>' : (cronAge > 15 ? `<span class=bad>${cronAge}m ago</span>` : `${cronAge}m ago`)}
 &middot; signal bridge: ${pollAge === null ? '<span class=bad>never seen</span>' : (pollAge > 15 ? `<span class=bad>${pollAge}m ago</span>` : `${pollAge}m ago`)}
</div>
${freshLink ? `<div class=hl><strong>One-time setup link &mdash; expires in 30 minutes.</strong>
<p><code>https://whose.dog/e/${esc(freshLink)}</code></p>
<p><small>Hand this over on a channel you trust. It is shown once and works once.</small></p></div>` : ''}
<table><thead><tr><th>#</th><th>Who</th><th>State</th><th>Last OK</th><th>Due</th><th>Cadence</th><th></th></tr></thead>
<tbody>${rows || '<tr><td colspan=7><small>Nobody enrolled yet.</small></td></tr>'}</tbody></table>
<div class=panel><form method=POST>
<input type=hidden name=action value=create>
<input name=alias placeholder="alias (a-z0-9)" required pattern="[a-z0-9_-]{2,64}">
<input name=display_name placeholder="display name" required>
<input name=timezone placeholder="Area/City" value="UTC">
<input name=cadence_h type=number min=1 max=168 value=12 title="cadence hours" style="width:5.5em">
<input name=grace_h type=number min=1 max=48 value=2 title="grace hours" style="width:5em">
<input name=quiet_start type=number min=0 max=1439 placeholder="quiet from" style="width:7em">
<input name=quiet_end type=number min=0 max=1439 placeholder="quiet to" style="width:6em">
<button type=submit>Add person</button>
<div><small>Quiet hours in local minutes past midnight (1380 = 23:00, 420 = 07:00).
Hard alerts and duress ignore them.</small></div>
</form></div>
</div></body></html>`, {
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'x-robots-tag': 'noindex, nofollow',
      'cache-control': 'no-store, private',
    },
  });
}
