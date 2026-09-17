#!/usr/bin/env node
// Signal bridge. Runs on umbricor, pulls from the Worker, sends via signal-cli.
//
// Pull, not push: the Worker never opens a connection into the house. Works
// behind NAT, survives IP changes, and exposes no inbound port.
//
// Claim-then-ack: alerts are only marked delivered after signal-cli exits 0, so
// a crash mid-send redelivers rather than silently dropping an alert.

import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
const run = promisify(execFile);

const {
  ARF_URL, ARF_TOKEN, SIGNAL_ACCOUNT, SIGNAL_TO,
} = process.env;

for (const [k, v] of Object.entries({ ARF_URL, ARF_TOKEN, SIGNAL_ACCOUNT })) {
  if (!v) { console.error(`missing env ${k}`); process.exit(2); }
}

const PREFIX = { duress: '\u{1F6A8} DURESS', hard: '\u{1F534} ALERT', soft: '\u{1F7E1} overdue', info: '\u{1F7E2}' };

async function send(text) {
  const args = ['-a', SIGNAL_ACCOUNT, 'send', '-m', text];
  // No recipient configured -> Note to Self.
  if (SIGNAL_TO) args.push(SIGNAL_TO); else args.push('--note-to-self');
  await run('signal-cli', args, { timeout: 120_000 });
}

const res = await fetch(`${ARF_URL}/_poll`, {
  headers: { authorization: `Bearer ${ARF_TOKEN}` },
});
if (!res.ok) {
  console.error(`poll failed: ${res.status}`);
  process.exit(1);
}

const { alerts } = await res.json();
if (!alerts?.length) process.exit(0);

const delivered = [];
for (const a of alerts) {
  const when = new Date(a.created_at * 1000).toISOString().replace('T', ' ').slice(0, 16);
  try {
    await send(`${PREFIX[a.severity] || ''} [${when}Z]\n${a.body}`);
    delivered.push(a.id);
  } catch (err) {
    // Leave unacked; the Worker redelivers after its 5-minute claim expires.
    console.error(`send failed for alert ${a.id}:`, err.message);
  }
}

if (delivered.length) {
  await fetch(`${ARF_URL}/_poll`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${ARF_TOKEN}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({ ack: delivered }),
  });
}
console.log(`delivered ${delivered.length}/${alerts.length}`);
