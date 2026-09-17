// Seed encryption at rest (AES-256-GCM) and hashing helpers.
//
// Scope of protection, stated plainly: this defends against a D1 dump or
// database leak. It does NOT defend against Cloudflare account takeover --
// SEED_KEY lives in the same account as the data. Hardware-key 2FA on the
// Cloudflare account is the control that actually matters here.

const enc = new TextEncoder();

async function aesKey(b64) {
  const raw = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
  if (raw.length !== 32) throw new Error('SEED_KEY must be 32 bytes base64');
  return crypto.subtle.importKey('raw', raw, { name: 'AES-GCM' }, false,
    ['encrypt', 'decrypt']);
}

export async function sealSeed(b64key, seed) {
  const key = await aesKey(b64key);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ct = new Uint8Array(
    await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, seed),
  );
  const out = new Uint8Array(iv.length + ct.length);
  out.set(iv, 0);
  out.set(ct, iv.length);
  return out;
}

export async function openSeed(b64key, blob) {
  const key = await aesKey(b64key);
  const buf = blob instanceof Uint8Array ? blob : new Uint8Array(blob);
  const iv = buf.slice(0, 12);
  const ct = buf.slice(12);
  return new Uint8Array(
    await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, ct),
  );
}

export async function sha256hex(s) {
  const d = await crypto.subtle.digest('SHA-256', enc.encode(s));
  return [...new Uint8Array(d)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

export function randomToken(bytes = 32) {
  const b = new Uint8Array(bytes);
  crypto.getRandomValues(b);
  return btoa(String.fromCharCode(...b))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

// Human-transcribable backup codes: 10 chars, no ambiguous glyphs.
const CODE_ALPHA = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
export function backupCode() {
  const b = new Uint8Array(10);
  crypto.getRandomValues(b);
  const s = [...b].map((x) => CODE_ALPHA[x % CODE_ALPHA.length]).join('');
  return `${s.slice(0, 5)}-${s.slice(5)}`;
}

export function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}
