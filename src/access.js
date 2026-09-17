// Cloudflare Access JWT verification.
//
// The Cf-Access-Jwt-Assertion header is NOT trustworthy on its own -- anyone can
// send that header to the Worker's origin. It must be cryptographically verified
// against the team's signing keys, and the audience must match this application.
// Fails closed: if Access isn't configured, the dashboard is unreachable.

let cachedKeys = null;
let cachedAt = 0;
const KEY_TTL_MS = 3600_000;

function b64urlToBytes(s) {
  const pad = s.length % 4 ? '='.repeat(4 - (s.length % 4)) : '';
  const b64 = s.replace(/-/g, '+').replace(/_/g, '/') + pad;
  return Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
}

async function signingKeys(teamDomain) {
  const now = Date.now();
  if (cachedKeys && now - cachedAt < KEY_TTL_MS) return cachedKeys;
  const res = await fetch(`https://${teamDomain}/cdn-cgi/access/certs`);
  if (!res.ok) throw new Error('access certs unavailable');
  const { keys } = await res.json();
  cachedKeys = keys;
  cachedAt = now;
  return keys;
}

export async function verifyAccess(request, env) {
  // Local-dev escape hatch. Requires BOTH an explicit opt-in var (which lives
  // only in gitignored .dev.vars and is never deployed) AND a loopback
  // hostname, so setting the var in production still grants nothing.
  if (env.DEV_ALLOW_UNVERIFIED_ADMIN === 'yes-i-know') {
    const host = new URL(request.url).hostname;
    if (host === 'localhost' || host === '127.0.0.1' || host === '[::1]') {
      return { email: 'dev@localhost', sub: 'dev' };
    }
  }

  const team = env.ACCESS_TEAM_DOMAIN;
  const aud = env.ACCESS_AUD;
  if (!team || !aud) return null;            // fail closed

  const jwt = request.headers.get('cf-access-jwt-assertion');
  if (!jwt) return null;

  const [h, p, s] = jwt.split('.');
  if (!h || !p || !s) return null;

  let header, payload;
  try {
    header = JSON.parse(new TextDecoder().decode(b64urlToBytes(h)));
    payload = JSON.parse(new TextDecoder().decode(b64urlToBytes(p)));
  } catch { return null; }

  const now = Math.floor(Date.now() / 1000);
  if (payload.exp && payload.exp < now) return null;
  if (payload.nbf && payload.nbf > now) return null;
  if (payload.iss !== `https://${team}`) return null;

  const auds = Array.isArray(payload.aud) ? payload.aud : [payload.aud];
  if (!auds.includes(aud)) return null;

  const jwk = (await signingKeys(team)).find((k) => k.kid === header.kid);
  if (!jwk) return null;

  const key = await crypto.subtle.importKey(
    'jwk', jwk, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['verify'],
  );
  const ok = await crypto.subtle.verify(
    'RSASSA-PKCS1-v1_5', key, b64urlToBytes(s),
    new TextEncoder().encode(`${h}.${p}`),
  );
  if (!ok) return null;

  return { email: payload.email || null, sub: payload.sub || null };
}
