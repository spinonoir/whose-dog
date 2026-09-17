// RFC 6238 TOTP over Web Crypto. 30s step, 6 digits, SHA-1 (what authenticator
// apps actually implement).

const STEP = 30;
const DIGITS = 6;
const B32 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

export function randomSeed(bytes = 20) {
  const b = new Uint8Array(bytes);
  crypto.getRandomValues(b);
  return b;
}

export function base32Encode(bytes) {
  let bits = 0, value = 0, out = '';
  for (const byte of bytes) {
    value = (value << 8) | byte;
    bits += 8;
    while (bits >= 5) {
      out += B32[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }
  if (bits > 0) out += B32[(value << (5 - bits)) & 31];
  return out;
}

export function base32Decode(str) {
  const clean = str.toUpperCase().replace(/=+$/, '').replace(/\s/g, '');
  let bits = 0, value = 0;
  const out = [];
  for (const ch of clean) {
    const idx = B32.indexOf(ch);
    if (idx === -1) throw new Error('bad base32');
    value = (value << 5) | idx;
    bits += 5;
    if (bits >= 8) {
      out.push((value >>> (bits - 8)) & 255);
      bits -= 8;
    }
  }
  return new Uint8Array(out);
}

async function hotp(seed, counter) {
  const key = await crypto.subtle.importKey(
    'raw', seed, { name: 'HMAC', hash: 'SHA-1' }, false, ['sign'],
  );
  const buf = new ArrayBuffer(8);
  new DataView(buf).setBigUint64(0, BigInt(counter), false);
  const mac = new Uint8Array(await crypto.subtle.sign('HMAC', key, buf));
  const offset = mac[mac.length - 1] & 0x0f;
  const bin =
    ((mac[offset] & 0x7f) << 24) |
    ((mac[offset + 1] & 0xff) << 16) |
    ((mac[offset + 2] & 0xff) << 8) |
    (mac[offset + 3] & 0xff);
  return String(bin % 10 ** DIGITS).padStart(DIGITS, '0');
}

// Timing-safe compare. Both sides are fixed-length digit strings.
function sameCode(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

// Returns the matching counter, or null. Caller MUST reject a counter <=
// last_counter to stop replay of a shoulder-surfed code.
export async function verify(seed, code, { now = Date.now(), window = 1 } = {}) {
  if (!/^\d{6}$/.test(code)) return null;
  const counter = Math.floor(now / 1000 / STEP);
  let found = null;
  // Check every offset regardless of an early hit: constant work, no early return.
  for (let off = -window; off <= window; off++) {
    const candidate = await hotp(seed, counter + off);
    if (sameCode(candidate, code)) found = counter + off;
  }
  return found;
}

export function otpauthURI(alias, seedB32, label) {
  const issuer = encodeURIComponent('whose.dog');
  const acct = encodeURIComponent(`${alias}${label ? ` (${label})` : ''}`);
  return `otpauth://totp/${issuer}:${acct}?secret=${seedB32}` +
    `&issuer=${issuer}&algorithm=SHA1&digits=${DIGITS}&period=${STEP}`;
}
