const shell = (title, body, extra = '') => `<!DOCTYPE html>
<html lang="en"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow,noarchive">
<title>${title}</title>
<style>
:root{--bg:#faf7f2;--fg:#2b2724;--mut:#7d7469;--line:#e4dcd0;--accent:#b5784a}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--bg:#17150f;--fg:#ece5da;--mut:#9a9186;--line:#2f2a22;--accent:#d29765}}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--fg);font:16px/1.6 ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,sans-serif;
display:flex;min-height:100vh;align-items:center;justify-content:center;padding:32px 16px}
.card{width:100%;max-width:460px}
h1{font-size:1.5rem;margin:0 0 .35em;letter-spacing:-.01em}
p{margin:0 0 1em;color:var(--mut)}
label{display:block;font-size:.82rem;text-transform:uppercase;letter-spacing:.07em;color:var(--mut);margin:0 0 .4em}
input{width:100%;padding:.75em .85em;font-size:1rem;background:transparent;color:var(--fg);
border:1px solid var(--line);border-radius:10px;margin-bottom:1em;font-family:inherit}
input:focus{outline:2px solid var(--accent);outline-offset:1px;border-color:transparent}
#code{font:600 1.5rem/1 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.35em;text-align:center}
button{width:100%;padding:.8em;font-size:1rem;font-weight:600;font-family:inherit;color:#fff;
background:var(--accent);border:0;border-radius:10px;cursor:pointer}
button:disabled{opacity:.5;cursor:default}
.msg{padding:.85em 1em;border-radius:10px;border:1px solid var(--line);margin-bottom:1em;font-size:.94rem}
.dog{font-size:2.6rem;line-height:1;margin-bottom:.3em}
small{color:var(--mut);font-size:.82rem}
${extra}
</style></head><body><div class="card">${body}</div></body></html>`;

// Public face of the domain. Plausible, static, advertises nothing.
export const landing = () => shell('whose.dog', `
<div class="dog">&#128054;</div>
<h1>whose.dog</h1>
<p>Found a dog with no tag? Lost one? This is a small private noticeboard a few
neighbours use to sort that out amongst ourselves.</p>
<p>We aren't a shelter and we don't keep records. If you've found a dog, the
fastest path is your nearest vet &mdash; almost all of them scan for a microchip
free of charge, and a chip is the only thing that reliably reunites a dog with
its person.</p>
<p><small>If you were given a link for this site, use that link. There's nothing
else to find from here.</small></p>`);

export const checkin = (path, msg = '', alias = '') => shell('whose.dog', `
<div class="dog">&#128062;</div>
<h1>Check in</h1>
${msg ? `<div class="msg">${msg}</div>` : ''}
<form method="POST" action="/${path}" autocomplete="off">
  <label for="alias">Name</label>
  <input id="alias" name="alias" value="${alias}" required autocapitalize="none"
         autocorrect="off" spellcheck="false" autocomplete="username">
  <label for="code">Code</label>
  <input id="code" name="code" inputmode="text" maxlength="11"
         pattern="([0-9]{6}|[2-9A-HJ-NP-Za-hj-np-z]{5}-[2-9A-HJ-NP-Za-hj-np-z]{5})"
         required autocomplete="one-time-code" autofocus>
  <p><small>Your 6-digit code, or one backup code.</small></p>
  <button type="submit">Check in</button>
</form>`);

// Deliberately identical for a normal AND a duress check-in.
export const accepted = () => shell('whose.dog', `
<div class="dog">&#128062;</div>
<h1>Checked in</h1>
<p>Thanks &mdash; you're all set.</p>`);

export const enroll = (token, name, normalURI, duressURI, normalB32, duressB32, codes) =>
  shell('whose.dog &mdash; setup', `
<h1>Hello, ${name}</h1>
<p>This sets up your check-in. It takes about two minutes and you'll need an
authenticator app &mdash; Aegis, 1Password, Bitwarden and Google Authenticator all work.</p>
<p><strong>This page can only be opened once.</strong> Don't close it until you've
finished both steps and saved your backup codes.</p>

<h2 style="font-size:1.05rem;margin:1.6em 0 .4em">1. Your normal code</h2>
<p>Scan this. Label it something ordinary.</p>
<div id="qr1" class="qr"></div>
<p><small>Manual entry: <code>${normalB32}</code></small></p>

<h2 style="font-size:1.05rem;margin:1.6em 0 .4em">2. Your duress code</h2>
<p>Scan this as a <em>second, separate</em> entry. Use it instead of your normal
code if you're checking in under pressure, being watched, or being made to. The
screen looks exactly the same either way &mdash; nobody beside you can tell which
one you used.</p>
<div id="qr2" class="qr"></div>
<p><small>Manual entry: <code>${duressB32}</code></small></p>

<h2 style="font-size:1.05rem;margin:1.6em 0 .4em">3. Backup codes</h2>
<p>If you lose your phone, each of these works once. Print them or write them down
&mdash; somewhere that isn't the phone.</p>
<pre style="border:1px solid var(--line);border-radius:10px;padding:1em;overflow:auto">${codes.join('\n')}</pre>

<h2 style="font-size:1.05rem;margin:1.6em 0 .4em">4. Confirm</h2>
<p>Enter your <em>normal</em> code to finish.</p>
<form method="POST" action="/e/${token}" autocomplete="off">
  <input type="hidden" name="confirm" value="1">
  <input id="code" name="code" inputmode="numeric" pattern="[0-9]{6}" maxlength="6" required>
  <button type="submit">Finish setup</button>
</form>
<script src="https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.js"></script>
<script>
for (const [el,uri] of [['qr1',${JSON.stringify(normalURI)}],['qr2',${JSON.stringify(duressURI)}]]) {
  const q = qrcode(0,'M'); q.addData(uri); q.make();
  document.getElementById(el).innerHTML = q.createSvgTag({cellSize:4,margin:2});
}
</script>`, `
body{align-items:flex-start}.card{max-width:520px}
.qr{background:#fff;padding:12px;border-radius:10px;display:inline-block;margin-bottom:.6em}
.qr svg{display:block;width:180px;height:180px}
code{font-family:ui-monospace,Menlo,monospace;word-break:break-all}
pre{font-family:ui-monospace,Menlo,monospace;font-size:.9rem;line-height:1.7}`);

export const done = () => shell('whose.dog', `
<div class="dog">&#128054;</div><h1>You're set up</h1>
<p>Check in at the link you were given. You'll be reminded before you're due.</p>`);

export const gone = () => shell('whose.dog', `
<h1>Link expired</h1><p>This setup link has already been used or has run out. Ask for a new one.</p>`);
