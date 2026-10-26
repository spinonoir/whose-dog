// The recipe index at / and the path-to-page registry the router uses. Public.
// To add a recipe, write its page in recipes/, add its entry to catalog.js,
// and map its path to the page here.

import * as R from './recipe.js';
import { catalog, allTags } from './catalog.js';
import { handleBirria } from './recipes/beef-birria.js';
import { handleBirriaRamen } from './recipes/birria-ramen.js';
import { handleQuesadillaStrips } from './recipes/quesadilla-strips.js';
import { handleButternutSoup } from './recipes/butternut-soup.js';
import { handleLemongrassDrumsticks } from './recipes/lemongrass-drumsticks.js';
import { handleChiliFlatbread } from './recipes/chili-flatbread.js';
import { handleChickenThighs } from './recipes/chicken-thighs.js';
import { handleGreenBeans } from './recipes/green-beans.js';
import { handleFiletMignon } from './recipes/filet-mignon.js';
import { handleRoastedAsparagus } from './recipes/roasted-asparagus.js';
import { handleBuffaloWings } from './recipes/buffalo-wings.js';
import { handleChickenParm } from './recipes/chicken-parm.js';
import { handleAppleSlaw } from './recipes/apple-slaw.js';
import { handleApplePie } from './recipes/apple-pie.js';
import { handlePumpkin } from './recipes/pumpkin-pie.js';
import { handlePumpkinTart } from './recipes/pumpkin-tart.js';
import { handleBananaMuffin } from './recipes/banana-muffins.js';

const pages = {
  'beef-birria': handleBirria,
  'birria-ramen': handleBirriaRamen,
  'quesadilla-strips': handleQuesadillaStrips,
  'butternut-soup': handleButternutSoup,
  'lemongrass-drumsticks': handleLemongrassDrumsticks,
  'chili-flatbread': handleChiliFlatbread,
  'chicken-thighs': handleChickenThighs,
  'green-beans': handleGreenBeans,
  'filet-mignon': handleFiletMignon,
  'roasted-asparagus': handleRoastedAsparagus,
  'buffalo-wings': handleBuffaloWings,
  'apple-slaw': handleAppleSlaw,
  'chicken-parm': handleChickenParm,
  'apple-pie': handleApplePie,
  'pumpkin-pie': handlePumpkin,
  'pumpkin-tart': handlePumpkinTart,
  'banana-muffins': handleBananaMuffin,
};

export const recipes = catalog.map((r) => {
  if (!pages[r.path]) throw new Error(`no page for recipe ${r.path}`);
  return { ...r, handle: pages[r.path] };
});

const theme = {
  light: { bg: '#faf6f0', paper: '#fffdf9', fg: '#2b241d', mut: '#786c60', line: '#e9dfd2', accent: '#8a5a2b', soft: '#f3e6d6', done: '#b3a796' },
  dark: { bg: '#15120e', paper: '#1d1914', fg: '#efe7db', mut: '#a3978a', line: '#332b22', accent: '#d9a26a', soft: '#382a1b', done: '#6b6157' },
  extra: `
.home{padding-top:56px;padding-bottom:8px}
.home h1{margin-bottom:14px}
.cards{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px;padding:24px 0 0}
.rc{display:flex;flex-direction:column;background:var(--paper);border:1px solid var(--line);border-top:4px solid var(--c);border-radius:16px;padding:20px 22px;color:var(--fg);text-decoration:none;transition:border-color .15s,transform .15s}
.rc:hover{border-color:var(--c);transform:translateY(-2px)}
.rc:focus-visible{outline:2px solid var(--c);outline-offset:3px}
.rc .k{font:700 .72rem/1 var(--sans);letter-spacing:.12em;text-transform:uppercase;color:var(--c);margin:0 0 10px}
.rc h2{font-size:1.4rem;margin:0 0 10px;display:block;text-wrap:balance}
.rc p{margin:0 0 16px;color:var(--mut);font-size:.95rem;flex:1}
.rc ul{display:flex;flex-wrap:wrap;gap:6px 16px;font-size:.84rem;font-weight:600}
.rc ul li + li::before{content:"·";margin-right:16px;color:var(--mut)}
.rc .t{margin:12px 0 0;font-size:.8rem;color:var(--mut)}
.filter{display:flex;flex-wrap:wrap;gap:6px;padding:24px 0 0}
.filter a{font-size:.84rem;color:var(--fg);text-decoration:none;padding:5px 11px;border-radius:999px;border:1px solid var(--line);background:var(--paper)}
.filter a:hover{border-color:var(--accent);color:var(--accent)}
.filter a[aria-current]{background:var(--accent);border-color:var(--accent);color:#fff}
.count{margin:16px 0 0;font-size:.9rem;color:var(--mut)}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]) .rc{--c:var(--cd)}}
:root[data-theme="dark"] .rc{--c:var(--cd)}`,
  extraNarrow: '.home{padding-top:36px}.cards{grid-template-columns:1fr;gap:14px;padding-top:24px}',
};

// `tag` filters the cards; the chips are plain links so it works without script.
const page = (tag) => {
  const shown = tag ? recipes.filter((r) => r.tags.includes(tag)) : recipes;
  return R.page({
  title: 'whose.dog recipes',
  theme,
  footer: 'Checkmarks on each recipe are saved on this device.',
  body: `
<header class="home wrap">
  <p class="eyebrow">whose.dog</p>
  <h1>Recipes</h1>
  <p class="lede">Everything is measured by weight. Each recipe has checkboxes so you can keep your place while you cook.</p>
  <nav class="filter" aria-label="Filter by tag">
    <a href="/"${tag ? '' : ' aria-current="page"'}>All</a>${allTags.map((t) => `
    <a href="/?tag=${t}"${t === tag ? ' aria-current="page"' : ''}>#${t}</a>`).join('')}
  </nav>${tag ? `
  <p class="count">${shown.length} recipe${shown.length === 1 ? '' : 's'} tagged #${tag}</p>` : ''}
</header>
<main class="wrap">
  <div class="cards">${shown.map((r) => `
    <a class="rc" href="/${r.path}" style="--c:${r.accent[0]};--cd:${r.accent[1]}">
      <p class="k">${r.kind}</p>
      <h2>${r.title}</h2>
      <p>${r.blurb}</p>
      <ul>${r.meta.map((m) => `<li>${m}</li>`).join('')}</ul>
      <p class="t">${r.tags.map((t) => `#${t}`).join(' ')}</p>
    </a>`).join('')}
  </div>
</main>`,
  });
};

// Unknown tags fall back to the full list.
export function handleHome(tag) {
  return R.respond(page(allTags.includes(tag) ? tag : null));
}
