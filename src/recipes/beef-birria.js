// Recipe page at /beef-birria. Public. A three-day project with three ways to
// serve, so it has a day-by-day plan up top and the serving options as tabs.

import * as R from '../recipe.js';

const days = [
  ['Day 1', 'The adobo &amp; seal', [
    'Toast and hydrate the dried chiles.',
    'Blend the adobo until perfectly smooth.',
    'Portion the chuck roast into 150g–200g blocks to maximize the surface area for the sear.',
    'Vacuum seal the meat and adobo together; the vacuum pressure forces the marinade deep into the muscle fibers.',
    'Refrigerate for exactly 24 hours.',
  ], [['#adobo', 'Part 1'], ['#braise-1', 'Steps 2.1–2.2']]],
  ['Day 2', 'The braise', [
    'Aggressively sear the short rib fat caps first to harvest the tallow needed to sear the chuck blocks.',
    'Deglaze, assemble, and execute the 5-to-6-hour braise at 225°F.',
  ], [['#braise-2', 'Steps 2.3–2.10']]],
  ['Day 3', 'The optimal serve', [
    'Chill the strained consommé and shredded meat overnight so the fat forms a clean plug on top for easy removal and storage.',
    'The remaining flavors in the meat deeply meld.',
  ], [['#serve', 'Part 3']], 'Optional'],
];

const adoboIng = [
  ['45g', 'dried guajillo chiles', 'stemmed and seeded'],
  ['5g', 'dried chiles de árbol', 'stemmed'],
  ['15g', 'pasilla chile powder'],
  ['794g', 'crushed tomatoes', 'preferably Mutti or Cento'],
  ['150g', 'white onion', 'roughly chopped'],
  ['20g', 'fresh garlic cloves', 'peeled'],
  ['120g', 'apple cider vinegar'],
  ['60g', 'soy sauce'],
  ['15g', 'toasted sesame oil'],
  ['12g', 'unsweetened cocoa powder'],
  ['25g', 'kosher salt'],
  ['3g', 'ground cumin'],
];

// [title, day tag, anchor, steps]. Step numbers run continuously across a part.
const adoboStages = [
  ['Toast, hydrate &amp; blend', 'Day 1', 'adobo-1', [
    'Toast <b>45g</b> guajillo chiles and <b>5g</b> chiles de árbol in a dry skillet over medium heat for 1–2 minutes until fragrant. Submerge in boiling water for 15 minutes to hydrate, then drain.',
    'In a blender, combine the hydrated chiles, <b>794g</b> crushed tomatoes, <b>150g</b> white onion, <b>20g</b> garlic, <b>15g</b> pasilla powder, <b>120g</b> apple cider vinegar, <b>60g</b> soy sauce, <b>15g</b> sesame oil, <b>12g</b> cocoa powder, <b>25g</b> kosher salt, and <b>3g</b> ground cumin. Blend on high until completely smooth.',
  ]],
  ['Make ahead', 'Optional', 'adobo-2', [
    '<span class="flag soft">To freeze</span> Pour the blended adobo into a vacuum-sealable bag, seal it, and freeze completely flat on a baking sheet for efficient space management.',
    '<span class="flag soft">To thaw</span> Submerge the flat frozen bag in a bowl of cold tap water for 30 minutes before marinating.',
  ]],
];

const braiseIng = [
  ['980g', 'boneless chuck pot roast'],
  ['1200g', 'bone-in chuck short ribs', 'leave fat caps intact'],
  ['1 batch{es}', 'adobo base', 'from Part 1, thawed if frozen'],
  ['800g', 'beef broth'],
  ['1', 'whole canela stick{s}', 'Mexican cinnamon'],
];

const braiseStages = [
  ['Portion &amp; marinate', 'Day 1', 'braise-1', [
    'Break down the <b>980g</b> boneless chuck roast into <b>150g–200g</b> blocks. Leave the <b>1200g</b> bone-in short ribs completely intact to protect the meat structure.',
    'Place all meat into vacuum-sealable bags. Pour the adobo over the meat, ensuring full coverage. Vacuum seal and refrigerate for <b>exactly 24 hours</b>.',
  ]],
  ['Render &amp; sear', 'Day 2', 'braise-2', [
    'Preheat oven to <b>225°F (107°C)</b>.',
    'Remove the meat from the bags, scraping excess adobo back into a bowl (reserve this). Heat a heavy cast-iron Dutch oven on the stove over medium-high heat.',
    'Place the <b>1200g</b> short ribs fat-cap down into the dry pot. Sear hard for 5–7 minutes to aggressively render the thick fat caps. Remove short ribs and set aside.',
    'Working in batches, sear the <b>150g–200g</b> chuck blocks in the rendered short rib fat until deeply browned on all sides. Remove and set aside.',
  ]],
  ['Deglaze &amp; braise', 'Day 2', 'braise-3', [
    'Deglaze the Dutch oven with the <b>800g</b> beef broth, scraping up all the fond. Stir in the reserved adobo marinade and drop in the <b>1</b> canela stick{s}.',
    'Return the <b>1200g</b> short ribs and <b>980g</b> chuck blocks to the pot. Cover with a heavy lid, transfer to the 225°F oven, and braise for <b>5 to 6 hours</b>. <span class="flag">Doneness</span>Probe-tender, <b>195°F–205°F</b> internal.',
  ]],
  ['Skim, shred &amp; strain', 'Day 2', 'braise-4', [
    'Carefully remove the meat. Discard the short rib bones and canela. Let the braising liquid sit off the heat for 10 minutes. A thick layer of bright red fat will rise. Gently skim this tallow off using a ladle and <b>reserve it in a wide bowl</b>.',
    'Shred the <b>980g</b> chuck and remaining short rib meat. Strain the remaining braising liquid through a fine-mesh sieve into a clean pot for the finished consommé.',
  ]],
];

// [letter, title, blurb, need, extra list, steps, note?]
const options = [
  ['A', 'Traditional quesabirria tacos', 'Tallow-dipped, cheese-crisped, consommé on the side', [
    'corn tortillas', 'reserved red tallow', 'freshly grated El Mexicano Oaxaca cheese', 'shredded birria', 'diced white onion', 'fresh cilantro', 'lime wedges',
  ], ['Cilantro lime crema', 'blend together', [
    ['240g', 'Mexican crema'],
    ['40g', 'cilantro'],
    ['30g', 'lime juice'],
    ['3g', 'garlic'],
    ['2.5g', 'salt'],
  ]], [
    'Heat a cast-iron skillet over medium heat. Dip a corn tortilla entirely into the reserved red tallow and place it in the skillet.',
    'Scatter a generous handful of grated Oaxaca cheese across the tortilla.',
    'Once melting, add a heavy portion of hot, shredded birria to one half.',
    'Fold the tortilla and fry until the exterior is deep red and crisped.',
    'Serve garnished with a side of hot consommé topped with diced onion and cilantro. Drizzle the tacos with the cilantro lime crema.',
  ]],
  ['B', 'Birria ramen fusion', 'Fresh noodles under boiling consommé, soft egg', [
    'fresh ramen noodles', 'boiling hot consommé', 'shredded birria', 'soft-boiled egg', 'sliced scallions', 'fresh cilantro', 'lime juice',
  ], null, [
    'Boil fresh ramen noodles for 2–3 minutes. Drain vigorously.',
    'Place noodles in a deep, pre-warmed bowl.',
    'Ladle <b>300g–400g</b> of boiling hot, strained consommé over the noodles.',
    'Top with hot shredded birria, a halved soft-boiled egg, heavily garnished with scallions and cilantro. Finish with fresh lime juice.',
  ], '<b>Out of consommé?</b> The <a href="/birria-ramen">birria ramen fusion</a> rebuilds it from tallow and spices, and turns leftover beef into a full bowl with ajitama, bok choy, and pickled greens.'],
  ['C', 'Smothered brioche biscuits', 'Consommé gravy soaked into the crumb, pickled radish', [
    'large structural brioche or buttermilk biscuits', 'hot shredded birria', 'hot consommé', 'quick-pickled radish salad',
  ], null, [
    'Simmer <b>250g</b> of the consommé in a saucepan until slightly reduced into a light gravy.',
    'Split a warm biscuit in half and place it open-faced on a wide plate.',
    'Pile hot shredded birria high on both biscuit halves.',
    'Ladle the reduced consommé directly over the meat and biscuits so it soaks into the crumb.',
    'Top with the bright, acidic quick-pickled radish salad to cut the rich fat.',
  ]],
];

const history = [
  'Originating in the Mexican state of Jalisco, birria was born out of necessity. During the colonial era, the region was overrun by goats. The meat was notoriously tough, bony, and gamey, leading locals to call the dish “birria,” a colloquialism for something of little value or a mess.',
  'To make the meat palatable, it was slow-roasted in underground pit ovens (<i>píib</i>) and smothered in a heavy, highly acidic, and spiced adobo to mask the gaminess.',
  'As the dish migrated north to Tijuana in the 20th century, taqueros adapted the recipe for beef (<i>res</i>), utilizing fatty cuts like chuck and short ribs. This Tijuana-style beef birria gave rise to the modern quesabirria phenomenon, where tortillas are plunged into the rendered red tallow before being crisped on a hot plancha.',
];

const renderDays = () => `
<div class="days">${days.map(([d, title, items, links, tag]) => `
  <div class="day${tag ? ' optional' : ''}">
    <p class="dn">${d}${tag ? ` <span class="day-tag">${tag}</span>` : ''}</p>
    <h3>${title}</h3>
    <ul>${items.map((t) => `<li>${t}</li>`).join('')}</ul>
    <p class="go">${links.map(([href, label]) => `<a href="${href}">${label} &rarr;</a>`).join(' ')}</p>
  </div>`).join('')}
</div>`;

const renderStages = (n, stages, p) => {
  let at = 0;
  return stages.map(([title, day, id, list], s) => {
    const start = at;
    at += list.length;
    return `
<section class="stage" id="${id}">
  <h3>${title}<span class="day-tag">${day}</span></h3>${R.steps(list, (i) => `${n}.${start + i + 1}`, `${p}${s}`)}
</section>`;
  }).join('');
};

const ingCard = (items, p, cols) => `
<div class="group part-ing">
  <h3>Ingredients</h3>${R.ingList(items, p).replace('class="ing"', `class="ing${cols ? ' cols' : ''}"`)}
</div>`;

const need = (items, p) => `
  <ul class="ing">${items.map((t, i) => `
    <li><label>${R.box(`${p}.${i}`)}<span class="n">${t}</span></label></li>`).join('')}
  </ul>`;

const renderOptions = () => `
<div class="tabs" role="tablist" aria-label="Serving options">${options.map(([l, title, blurb], i) => `
  <button type="button" class="tab" role="tab" id="tab-${l}" aria-controls="opt-${l}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">
    <span class="tl">${l}</span><span><b>${title}</b><i>${blurb}</i></span>
  </button>`).join('')}
</div>${options.map(([l, title, , needs, extra, list, note], i) => `
<div class="opt" id="opt-${l}" role="tabpanel" aria-labelledby="tab-${l}"${i ? ' hidden' : ''}>
  <h3 class="ot"><span class="num">${l}</span>${title}</h3>
  <div class="opt-grid">
    <div class="group">
      <h3>You’ll need</h3>${need(needs, `o${l}n`)}${extra ? `
      <p class="sub-h">${extra[0]} <span>&middot; ${extra[1]}</span></p>${R.ingList(extra[2], `o${l}x`)}` : ''}
    </div>
    <div>${R.steps(list, (j) => `${l}.${j + 1}`, `o${l}s`)}${note ? `
      <p class="note">${note}</p>` : ''}
    </div>
  </div>
</div>`).join('')}`;

// Tabs: the server renders A selected so the page reads fine before this runs.
const tabScript = `
<script>
(() => {
  const KEY = 'birria-option';
  const tabs = [...document.querySelectorAll('[role=tab]')];
  const pick = (tab, save) => {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute('aria-selected', on);
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
    if (save) try { localStorage.setItem(KEY, tab.id); } catch {}
  };
  let first = null;
  try { first = document.getElementById(localStorage.getItem(KEY)); } catch {}
  if (first && tabs.includes(first)) pick(first);
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => pick(t, true));
    t.addEventListener('keydown', (e) => {
      const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
      if (!d) return;
      e.preventDefault();
      const next = tabs[(i + d + tabs.length) % tabs.length];
      pick(next, true);
      next.focus();
    });
  });
})();
</script>`;

const theme = {
  light: { bg: '#f9f4f1', paper: '#fffcfa', fg: '#2a1c1a', mut: '#7a6763', line: '#ecdfda', accent: '#9b2226', soft: '#f5dedb', done: '#b6a6a2' },
  dark: { bg: '#150e0d', paper: '#1d1514', fg: '#f0e4e1', mut: '#a6938f', line: '#362725', accent: '#ef6f6c', soft: '#3d1d1d', done: '#6e5f5c' },
  qw: '4.6em',
  extra: `
.lead-in{font:1.05rem/1.6 var(--serif);color:var(--mut);max-width:62ch;margin:-4px 0 20px}
.days{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
.day{background:var(--paper);border:1px solid var(--line);border-top:4px solid var(--accent);border-radius:14px;padding:16px 18px;display:flex;flex-direction:column}
.day.optional{border-top-style:dashed}
.day .dn{font:700 .74rem/1 var(--sans);letter-spacing:.12em;text-transform:uppercase;color:var(--accent);margin:0 0 10px;display:flex;align-items:center;gap:8px}
.day ul{flex:1}
.day li{position:relative;padding:0 0 6px 16px;font-size:.92rem;line-height:1.5}
.day li::before{content:"";position:absolute;left:2px;top:.6em;width:6px;height:6px;border-radius:50%;background:var(--accent)}
.day .go{margin:10px 0 0;font-size:.86rem;font-weight:600;display:flex;gap:14px;flex-wrap:wrap}
.day .go a{text-decoration:none}
.day .go a:hover{text-decoration:underline}
.note{margin:16px 0 0;padding:12px 16px;border-radius:12px;background:var(--accent-soft);font-size:.93rem}
h2 .pn{flex:none;align-self:center;width:36px;height:36px;border-radius:50%;background:var(--accent);color:#fff;display:grid;place-content:center;font:600 1rem/1 var(--sans)}
.part-ing{margin:0 0 32px}
.ing.cols{columns:2;column-gap:32px}
.ing.cols li{break-inside:avoid}
.day-tag{font:600 .66rem/1 var(--sans);letter-spacing:.08em;text-transform:uppercase;color:var(--accent);background:var(--accent-soft);padding:5px 8px;border-radius:999px;white-space:nowrap}
.stage h3 .day-tag{margin-left:2px}
.fork{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.fork > div{background:var(--paper);border:1px solid var(--line);border-radius:14px;padding:16px 20px}
.fork .rec{border:1.5px solid var(--accent)}
.fork h3{margin:10px 0 6px}
.fork p{margin:0;font-size:.95rem}
.tabs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin:0 0 28px}
.tab{display:flex;gap:12px;align-items:flex-start;text-align:left;font:inherit;color:var(--fg);background:var(--paper);border:1.5px solid var(--line);border-radius:14px;padding:14px 16px;cursor:pointer;transition:border-color .15s,background .15s}
.tab:hover{border-color:var(--accent)}
.tab[aria-selected="true"]{border-color:var(--accent);background:var(--accent-soft)}
.tab:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.tab .tl{flex:none;width:30px;height:30px;border-radius:50%;border:1.5px solid var(--accent);color:var(--accent);display:grid;place-content:center;font:700 .9rem/1 var(--sans)}
.tab[aria-selected="true"] .tl{background:var(--accent);color:#fff}
.tab b{display:block;font:600 1.02rem/1.3 var(--serif)}
.tab i{display:block;font-style:normal;font-size:.84rem;line-height:1.4;color:var(--mut);margin-top:3px}
.opt .ot{display:flex;align-items:center;gap:12px;font-size:1.3rem;margin:0 0 16px}
.opt-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.5fr);gap:24px;align-items:start}
.sub-h{font:600 .74rem/1.3 var(--sans);letter-spacing:.1em;text-transform:uppercase;color:var(--accent);margin:20px 0 6px}
.sub-h span{color:var(--mut);letter-spacing:.04em;text-transform:none;font-weight:500}
.story{background:var(--paper);border:1px solid var(--line);border-radius:16px;padding:22px 26px;font:1.04rem/1.7 var(--serif)}
.story p{margin:0 0 1em}
.story p:last-child{margin:0}`,
  extraNarrow: 'h2{flex-wrap:wrap;row-gap:6px}h2 small{flex-basis:100%}.days,.fork,.tabs,.opt-grid{grid-template-columns:1fr}.ing.cols{columns:1}.story{padding:18px}',
  extraPrint: '.tabs{display:none}.opt[hidden]{display:block!important}.opt{margin:0 0 32px;break-inside:avoid-page}.day,.fork > div{break-inside:avoid}',
};

const page = () => R.page({
  title: 'Cocoa Beef Birria',
  theme,
  key: 'birria-checks',
  servings: 1,
  body: `${R.hero({
    path: 'beef-birria',
    eyebrow: 'Three-day project &middot; three ways to serve',
    title: 'Cocoa-Infused Beef&nbsp;Birria',
    lede: 'A dual-cut beef birria, 2.18 kg per batch: boneless chuck roast for shreddable volume and bone-in short ribs for deep, collagen-rich texture. A 24-hour vacuum marination and an ultra-low 225°F braise break the tough connective tissues down into a profoundly rich consommé.',
    facts: [
      ['Makes', R.serves(1, 'batch', 'es')],
      ['Meat', '2.18 kg per batch'],
      ['Marinate', '24 h, vacuum-sealed'],
      ['Braise', '107°C &middot; 5–6 h'],
      ['Pull at', '91–96°C <span style="white-space:nowrap">(195–205°F)</span>'],
      ['Serve', 'Tacos, ramen, or biscuits'],
    ],
  })}
${R.toc([['plan', 'The plan'], ['adobo', 'Adobo'], ['braise', 'Braise'], ['serve', 'Serve'], ['history', 'History']])}
<main class="wrap">
  <h2 id="plan">The plan <small>three days</small></h2>
  <p class="lead-in">Birria is a multi-day project. Rushing the process sacrifices flavor depth and meat texture.</p>${renderDays()}
  <p class="note"><b>Make ahead:</b> the adobo freezes flat in a vacuum bag and thaws in 30 minutes in cold water, so Part 1 can be done any time before Day 1.</p>

  <h2 id="adobo"><span class="pn">1</span>The adobo base <small>make-ahead &amp; freezable</small></h2>${ingCard(adoboIng, 'a', true)}${renderStages(1, adoboStages, 'as')}

  <h2 id="braise"><span class="pn">2</span>The 225°F braise <small>&amp; consommé</small></h2>${ingCard(braiseIng, 'b')}${renderStages(2, braiseStages, 'bs')}
  <section class="stage" id="rest">
    <h3>Then: serve now, or wait a day</h3>
    <div class="fork">
      <div><span class="flag soft">Day 2</span><h3>Serve now</h3><p>You can serve immediately after cooking. Go straight to <a href="#serve">Part 3</a>.</p></div>
      <div class="rec"><span class="flag">Recommended &middot; Day 3</span><h3>Chill overnight</h3><p>Chilling the strained consommé and shredded meat overnight allows the fat to form a clean plug on top for easy removal and storage, while the remaining flavors in the meat deeply meld.</p></div>
    </div>
  </section>

  <h2 id="serve"><span class="pn">3</span>Plating &amp; serving <small>pick one</small></h2>${renderOptions()}

  <h2 id="history">The history of birria</h2>
  <div class="story">${history.map((p) => `<p>${p}</p>`).join('')}</div>
</main>${tabScript}`,
});

export function handleBirria() {
  return R.respond(page());
}
