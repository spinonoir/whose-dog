// Shared shell and building blocks for the public recipe pages.
// Each page supplies its own palette; layout and behaviour live here.

import { byPath, pairsOf } from './catalog.js';

const tokens = (t) =>
  `--bg:${t.bg};--paper:${t.paper};--fg:${t.fg};--mut:${t.mut};--line:${t.line};--accent:${t.accent};--accent-soft:${t.soft};--done:${t.done}`;

const css = (theme) => `
:root{${tokens(theme.light)};--qw:${theme.qw || '5.2em'};
--serif:"Iowan Old Style","Palatino Linotype",Palatino,"Book Antiqua",Georgia,serif;
--sans:ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){${tokens(theme.dark)}}}
:root[data-theme="dark"]{${tokens(theme.dark)}}
*{box-sizing:border-box}
html{scroll-behavior:smooth;scroll-padding-top:72px}
body{margin:0;background:var(--bg);color:var(--fg);font:17px/1.6 var(--sans);-webkit-font-smoothing:antialiased}
a{color:var(--accent)}
.wrap{max-width:880px;margin:0 auto;padding:0 16px}
header.hero{padding:28px 0 28px;border-bottom:1px solid var(--line)}
.eyebrow{font:600 .78rem/1 var(--sans);letter-spacing:.14em;text-transform:uppercase;color:var(--accent);margin:0 0 14px}
.crumb{display:inline-block;font-size:.86rem;color:var(--mut);text-decoration:none;margin:0 0 22px}
.crumb:hover{color:var(--accent)}
h1{font:600 clamp(2.1rem,6vw,3.4rem)/1.05 var(--serif);letter-spacing:-.015em;margin:0 0 18px;text-wrap:balance}
.lede{font:1.12rem/1.6 var(--serif);color:var(--mut);max-width:62ch;margin:0}
.facts{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));background:var(--paper);border:1px solid var(--line);border-radius:14px;overflow:hidden;margin:28px 0 0}
.facts div{padding:14px 16px;box-shadow:1px 1px 0 var(--line)}
.facts dt{font-size:.72rem;letter-spacing:.1em;text-transform:uppercase;color:var(--mut);margin:0 0 4px}
.facts dd{margin:0;font:600 1.05rem/1.3 var(--serif)}
.tags{display:flex;flex-wrap:wrap;gap:4px 14px;margin:16px 0 0;font:600 .86rem/1.4 var(--sans)}
.tags a{color:var(--accent);text-decoration:none}
.tags a:hover{text-decoration:underline}
.pairs{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin:20px 0 0}
.pairs span{font-size:.72rem;letter-spacing:.1em;text-transform:uppercase;color:var(--mut);margin-right:4px}
.pairs a{font-size:.9rem;font-weight:600;text-decoration:none;color:var(--fg);background:var(--paper);border:1px solid var(--line);border-radius:999px;padding:6px 14px}
.pairs a::after{content:" →";color:var(--accent)}
.pairs a:hover{border-color:var(--accent);color:var(--accent)}
.srv{display:inline-flex;align-items:center;gap:8px}
.srv button{width:28px;height:28px;padding:0;border-radius:50%;border:1px solid var(--line);background:var(--bg);color:var(--accent);font:600 1rem/1 var(--sans);cursor:pointer;display:grid;place-content:center}
.srv button:hover:not(:disabled){border-color:var(--accent)}
.srv button:disabled{color:var(--done);cursor:default}
.srv button[hidden]{display:none}
.srv output{min-width:1.2em;text-align:center;font-variant-numeric:tabular-nums}
nav.toc{position:sticky;top:0;z-index:5;background:color-mix(in srgb,var(--bg) 88%,transparent);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);border-bottom:1px solid var(--line)}
nav.toc .wrap{display:flex;gap:6px;align-items:center;overflow-x:auto;padding-top:10px;padding-bottom:10px;scrollbar-width:none}
nav.toc a{flex:none;font-size:.86rem;color:var(--fg);text-decoration:none;padding:6px 12px;border-radius:999px;border:1px solid var(--line)}
nav.toc a:hover{border-color:var(--accent);color:var(--accent)}
nav.toc button{flex:none;margin-left:auto;font:inherit;font-size:.86rem;color:var(--mut);background:none;border:0;padding:6px 4px;cursor:pointer}
nav.toc button:hover{color:var(--accent)}
main.wrap{padding-top:12px;padding-bottom:72px}
h2{font:600 1.75rem/1.2 var(--serif);margin:56px 0 18px;display:flex;align-items:baseline;gap:12px}
h2 small{font:500 .8rem/1 var(--sans);color:var(--mut);letter-spacing:.04em}
h3{font:600 1.18rem/1.3 var(--serif);margin:0 0 10px}
ul,ol{list-style:none;margin:0;padding:0}
label{display:flex;gap:12px;align-items:flex-start;cursor:pointer}
input[type=checkbox]{appearance:none;-webkit-appearance:none;flex:none;width:20px;height:20px;margin:3px 0 0;border:1.5px solid var(--done);border-radius:6px;background:var(--paper);display:grid;place-content:center;cursor:pointer;transition:background .15s,border-color .15s}
input[type=checkbox]::after{content:"";width:10px;height:6px;border:2px solid #fff;border-top:0;border-right:0;transform:rotate(-45deg) translate(1px,-1px) scale(0);transition:transform .15s}
input[type=checkbox]:checked{background:var(--accent);border-color:var(--accent)}
input[type=checkbox]:checked::after{transform:rotate(-45deg) translate(1px,-1px) scale(1)}
input[type=checkbox]:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
li:has(input:checked) > label > span{color:var(--done)}
li:has(input:checked) b{color:inherit}
.card{background:var(--paper);border:1px solid var(--line);border-radius:16px;padding:8px 20px}
.mise li{padding:14px 0;border-top:1px solid var(--line)}
.mise li:first-child{border-top:0}
.lead{font-weight:600}
.ingredients{display:grid;grid-template-columns:1fr 1fr;gap:20px;align-items:start}
.ingredients .tall-l{grid-column:1;grid-row:1 / span 2}
.ingredients .tall-r{grid-column:2;grid-row:1 / span 2}
.group{background:var(--paper);border:1px solid var(--line);border-radius:16px;padding:20px}
.group .sub{margin:-6px 0 10px;color:var(--mut);font-size:.88rem}
.ing li{padding:7px 0;border-top:1px dashed var(--line)}
.ing li:first-child{border-top:0}
.ing .q{flex:none;min-width:var(--qw);font:600 .95rem/1.6 ui-monospace,SFMono-Regular,Menlo,monospace;font-variant-numeric:tabular-nums;color:var(--accent)}
li:has(input:checked) .q{color:var(--done)}
.ing .n i{display:block;font-style:normal;font-size:.85rem;color:var(--mut)}
.stage{margin:0 0 36px}
.stage h3{display:flex;align-items:center;gap:12px;font-size:1.3rem;margin-bottom:14px}
.num{flex:none;width:34px;height:34px;border-radius:50%;background:var(--accent-soft);color:var(--accent);display:grid;place-content:center;font:600 1rem/1 var(--sans)}
.steps li{padding:12px 0;border-top:1px solid var(--line)}
.steps li:first-child{border-top:0}
.sn{flex:none;min-width:2.3em;font:600 .82rem/1.9 var(--sans);font-variant-numeric:tabular-nums;color:var(--mut)}
.flag{display:inline-block;font:700 .7rem/1 var(--sans);letter-spacing:.08em;text-transform:uppercase;background:var(--accent);color:#fff;padding:4px 7px;border-radius:5px;margin-right:6px;vertical-align:2px}
.flag.soft{background:var(--accent-soft);color:var(--accent)}
li:has(input:checked) .flag{background:var(--done);color:#fff}
.vars{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.var{background:var(--paper);border:1px solid var(--line);border-left:4px solid var(--accent);border-radius:12px;padding:18px 20px}
.var p{margin:0;font-size:.96rem}
footer{color:var(--mut);font-size:.82rem;text-align:center;padding:0 0 48px}
footer a{color:inherit}
${theme.extra || ''}
@media (max-width:720px){
  body{font-size:16px}
  header.hero{padding-top:20px}
  .ingredients,.vars{grid-template-columns:1fr}
  .ingredients .tall-l,.ingredients .tall-r{grid-column:auto;grid-row:auto}
  .card{padding:4px 16px}.group{padding:16px}
  ${theme.extraNarrow || ''}
}
@media print{
  nav.toc,footer,.srv button,.pairs{display:none}
  body{background:#fff;color:#000;font-size:11pt}
  .card,.group,.var{border-color:#ccc;break-inside:avoid}
  .stage{break-inside:avoid-page}
  ${theme.extraPrint || ''}
}`;

// Checkmarks persist per page in this browser only. Pages without a reset
// button (the index) simply have nothing to wire up.
const script = (key) => `
<script>
(() => {
  const KEY = '${key}';
  let saved = {};
  try { saved = JSON.parse(localStorage.getItem(KEY)) || {}; } catch {}
  const boxes = document.querySelectorAll('input[data-k]');
  boxes.forEach((b) => {
    b.checked = !!saved[b.dataset.k];
    b.addEventListener('change', () => {
      if (b.checked) saved[b.dataset.k] = 1; else delete saved[b.dataset.k];
      try { localStorage.setItem(KEY, JSON.stringify(saved)); } catch {}
    });
  });
  const reset = document.getElementById('reset');
  if (reset) reset.addEventListener('click', () => {
    saved = {};
    boxes.forEach((b) => { b.checked = false; });
    try { localStorage.removeItem(KEY); } catch {}
  });
})();
</script>`;

// Opt-in servings scaler. A page that passes `servings` to page() gets its
// ingredient quantities, plus any bare amount in <b> inside notes and steps,
// rewritten in the browser when the reader changes the count. Only the
// quantity column may use a word unit ("2 handful{s}"); a bolded amount must
// be a bare number or weight, so times, temperatures, and per-piece amounts
// written as "150g–200g" or "~70g" stay put. `{s}` or `{es}` marks a plural
// that follows the count: the row's quantity in an ingredient list, otherwise
// the servings themselves.
const QTY = /^(~?)(\d+(?:\.\d+)?)(?:–(\d+(?:\.\d+)?))?(g|kg|ml| [a-z]+)?(?:\{(e?s)\})?$/;
const BOLD = /^()(\d+(?:\.\d+)?)(?:–(\d+(?:\.\d+)?))?(g|kg|ml)?()$/;

const amount = (tag, cls, q, re) => {
  const m = q.match(re);
  if (!m) return null;
  const [, pre, a, b, u = '', pl] = m;
  const text = `${pre}${a}${b ? `–${b}` : ''}${u}${pl && a !== '1' ? pl : ''}`;
  const data = { p: pre, a, b, u, pl };
  return `<${tag} class="${cls}"${Object.entries(data).filter(([, v]) => v).map(([k, v]) => ` data-${k}="${v}"`).join('')}>${text}</${tag}>`;
};

const scalable = (body) => body
  .replace(/<span class="q">([^<]*)<\/span>/g, (all, q) => amount('span', 'q', q, QTY) || all)
  .replace(/<b>([^<]*)<\/b>/g, (all, q) => amount('b', 'amt', q, BOLD) || all)
  .replace(/\{(e?s)\}/g, '<span class="pl">$1</span>');

const scaler = (key) => `
<script>
(() => {
  const el = document.querySelector('.srv');
  if (!el) return;
  const BASE = +el.dataset.base, KEY = '${key}:serves';
  let n = BASE;
  try { n = +localStorage.getItem(KEY) || BASE; } catch {}
  const fmt = (x) => String(x >= 10 ? Math.round(x) : Math.round(x * 2) / 2);
  const render = () => {
    const r = n / BASE;
    el.querySelector('output').value = n;
    el.querySelector('[data-d="-1"]').disabled = n <= 1;
    el.querySelector('[data-d="1"]').disabled = n >= 12;
    document.querySelectorAll('[data-a]').forEach((e) => {
      const d = e.dataset, a = fmt(d.a * r);
      e.textContent = (d.p || '') + a + (d.b ? '–' + fmt(d.b * r) : '') + (d.u || '') + (d.pl && a !== '1' ? d.pl : '');
    });
    document.querySelectorAll('.pl').forEach((p) => {
      const q = p.closest('li')?.querySelector('.q[data-a]');
      p.hidden = (q ? fmt(q.dataset.a * r) : String(n)) === '1';
    });
  };
  el.querySelectorAll('button').forEach((b) => {
    b.hidden = false;
    b.addEventListener('click', () => {
      n = Math.min(12, Math.max(1, n + +b.dataset.d));
      try { localStorage.setItem(KEY, n); } catch {}
      render();
    });
  });
  render();
})();
</script>`;

// The stepper for a hero fact, e.g. ['Serves', R.serves(2, 'bowl')] or
// ['Makes', R.serves(1, 'batch', 'es')].
export const serves = (n, unit, pl = 's') => `<span class="srv" data-base="${n}"><button type="button" data-d="-1" aria-label="Fewer servings" hidden>&minus;</button><output>${n}</output><button type="button" data-d="1" aria-label="More servings" hidden>+</button><span>${unit}{${pl}}</span></span>`;

export const box = (k) => `<input type="checkbox" data-k="${k}">`;

export const tagLinks = (tags) => tags.map((t) => `<a href="/?tag=${t}">#${t}</a>`).join(' ');

// `path` looks the recipe up in the catalog for its #tags and pairings.
export const hero = ({ path, eyebrow, title, lede, facts }) => {
  const entry = byPath.get(path);
  if (!entry) throw new Error(`recipe ${path} is not in the catalog`);
  const pairs = pairsOf(path);
  return `
<header class="hero"><div class="wrap">
  <a class="crumb" href="/">&larr; All recipes</a>
  <p class="eyebrow">${eyebrow}</p>
  <h1>${title}</h1>
  <p class="lede">${lede}</p>
  <p class="tags">${tagLinks(entry.tags)}</p>
  <dl class="facts">${facts.map(([k, v]) => `
    <div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}
  </dl>${pairs.length ? `
  <nav class="pairs" aria-label="Pairs with"><span>Pairs with</span>${pairs.map((r) => `<a href="/${r.path}">${r.title}</a>`).join('')}</nav>` : ''}
</div></header>`;
};

export const toc = (links) => `
<nav class="toc"><div class="wrap">${links.map(([id, label]) => `
  <a href="#${id}">${label}</a>`).join('')}
  <button type="button" id="reset">Clear checks</button>
</div></nav>`;

export const mise = (items, p = 'm') => `
<ul class="card mise">${items.map(([t, d], i) => `
<li><label>${box(`${p}${i}`)}<span><b class="lead">${t}.</b> ${d}</span></label></li>`).join('')}
</ul>`;

export const ingList = (items, p) => `
  <ul class="ing">${items.map(([q, name, note], i) => `
    <li><label>${box(`${p}.${i}`)}<span class="q">${q}</span><span class="n">${name}${note ? ` <i>${note}</i>` : ''}</span></label></li>`).join('')}
  </ul>`;

// groups: [title, sub, items, layout?] where layout is 'tall-l' or 'tall-r'
// to let one long list span both rows of the two-column grid.
export const ingredients = (groups, p = 'i') => `
<div class="ingredients">${groups.map(([title, sub, items, layout], g) => `
<div class="group${layout ? ` ${layout}` : ''}">
  <h3>${title}</h3>${sub ? `<p class="sub">${sub}</p>` : ''}${ingList(items, `${p}${g}`)}
</div>`).join('')}
</div>`;

export const steps = (list, num, p) => `
  <ol class="steps">${list.map((t, i) => `
    <li><label>${box(`${p}.${i}`)}<span class="sn">${num(i)}</span><span>${t}</span></label></li>`).join('')}
  </ol>`;

export const method = (stages, p = 's') => stages.map(([title, list], s) => `
<section class="stage" id="stage-${s + 1}">
  <h3><span class="num">${s + 1}</span>${title}</h3>${steps(list, (i) => `${s + 1}.${i + 1}`, `${p}${s}`)}
</section>`).join('');

export const variations = (items) => `
<div class="vars">${items.map(([t, d]) => `
<div class="var"><h3>${t}</h3><p>${d}</p></div>`).join('')}
</div>`;

export const page = ({
  title, theme, key, body, servings,
  footer = servings ? 'Checkmarks and servings are saved on this device.' : 'Checkmarks are saved on this device.',
}) => `<!DOCTYPE html>
<html lang="en"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow,noarchive">
<title>${title}</title>
<style>${css(theme)}
</style></head><body>${servings ? scalable(body) : body}
<footer>${footer}</footer>${key ? script(key) : ''}${servings ? scaler(key) : ''}
</body></html>`;

const headers = {
  'content-type': 'text/html; charset=utf-8',
  'x-robots-tag': 'noindex, nofollow',
  'cache-control': 'public, max-age=300',
  'referrer-policy': 'no-referrer',
  'content-security-policy':
    "default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline'; frame-ancestors 'none'",
};

export const respond = (html) => new Response(html, { headers });
