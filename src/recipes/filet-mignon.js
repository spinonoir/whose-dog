// Recipe page at /filet-mignon. Public.

import * as R from '../recipe.js';

const mise = [
  ['Dry-brine ahead', 'Salt the steaks on a wire cooling rack at least 1–2 hours ahead (or uncovered in the refrigerator overnight); that is, do stage 1 early. This draws out surface moisture and pulls the salt deep into the muscle fibers.'],
  ['Temper', 'Bring the steaks to room temperature for 30 minutes before roasting.'],
];

const ingredients = [
  ['Filet mignon &amp; pan sauce', '', [
    ['450g', 'center-cut filet mignon', 'approx. <b>2</b> steaks, 225g each, 1.5–2 inches thick'],
    ['6g', 'kosher salt', 'approx. 1.25% by mass'],
    ['3g', 'black pepper', 'freshly cracked'],
    ['15g', 'neutral high-smoke-point oil', 'avocado or grapeseed'],
    ['45g', 'unsalted butter'],
    ['15g', 'garlic cloves', 'lightly crushed'],
    ['8g', 'fresh rosemary sprigs'],
    ['8g', 'fresh thyme sprigs'],
    ['60g', 'dry red wine or beef stock', 'for deglazing'],
  ]],
  ['Equipment', '', [
    ['', 'Butcher’s twine'],
    ['', 'Wire rack', 'set over a rimmed baking sheet'],
    ['', 'Cuisinart 10-inch stainless skillet'],
    ['', 'Probe thermometer'],
  ]],
];

const method = [
  ['Mise en place &amp; seasoning', [
    'Tie butcher’s twine snugly around the circumference of each 225g filet to keep a uniform shape and even thickness.',
    'Pat the meat thoroughly dry with paper towels. Season all surfaces with <b>6g</b> kosher salt and <b>3g</b> black pepper.',
    'Place the steaks on a wire cooling rack set over a rimmed baking sheet.',
  ]],
  ['Low-temp oven roast', [
    'Preheat your oven to 120°C (250°F).',
    'Slide the sheet pan with the elevated wire rack onto the center rack of the oven.',
    'Roast gently for <b>25–35 minutes</b>. <span class="flag">Pull at</span> <b>43°C (110°F)</b> for rare or <b>46°C (115°F)</b> for medium-rare.',
    'Making the <a href="/roasted-asparagus">roasted asparagus</a>? It goes into this oven alongside the steaks for the final 12–15 minutes.',
  ]],
  ['Hard sear', [
    'Remove the filets from the oven. Set the Cuisinart 10-inch skillet over high heat and add <b>15g</b> neutral oil.',
    'Once the oil shimmers and begins to lightly smoke, place the filets in the pan.',
    'Sear for <b>60 seconds</b> without moving the meat to develop a deep, caramelized crust.',
  ]],
  ['Baste <small>arrosé</small>', [
    'Flip the steaks. Immediately add <b>45g</b> unsalted butter, <b>15g</b> crushed garlic, <b>8g</b> rosemary, and <b>8g</b> thyme. Reduce heat to medium-high.',
    'Tilt the skillet handle slightly upward to pool the melted butter, and continuously spoon the foaming, herb-infused butter over the steaks for <b>60–90 seconds</b>.',
    '<span class="flag">Pull at</span> <b>52°C (125°F)</b> internal for medium-rare.',
  ]],
  ['Rest', [
    'Transfer the filets to a clean wire rack to rest for <b>5–7 minutes</b>. Carryover heat will raise the core to ~54–57°C (130–135°F) while the muscle fibers relax and retain moisture.',
  ]],
  ['Pan reduction', [
    'Pour off all but approximately 15g of fat from the skillet, leaving the browned fond intact.',
    'Return the skillet to medium heat. Pour in <b>60g</b> red wine or beef stock, scraping up the browned bits with a wooden spatula.',
    'Simmer for <b>2 minutes</b> until reduced by half into a glossy, concentrated pan reduction.',
  ]],
  ['Plate &amp; serve', [
    'Snip and remove the butcher’s twine from the filets.',
    'Plate the steaks, spoon the pan sauce over the meat, and serve immediately with the <a href="/roasted-asparagus">roasted asparagus</a>.',
  ]],
];

export const theme = {
  light: { bg: '#f8f3f5', paper: '#fffcfd', fg: '#2a1c22', mut: '#77656d', line: '#ebdfe4', accent: '#7b2d4f', soft: '#f1dde6', done: '#b4a5ac' },
  dark: { bg: '#140e11', paper: '#1c1519', fg: '#efe3e8', mut: '#a5939b', line: '#352830', accent: '#e07aa6', soft: '#3a1c2a', done: '#6d5f65' },
  extra: '.stage h3 small{font:500 .8rem/1 var(--sans);color:var(--mut);letter-spacing:.04em;font-style:italic}',
};

const page = () => R.page({
  title: 'Reverse-Sear Filet Mignon',
  theme,
  key: 'filet-checks',
  servings: 2,
  body: `${R.hero({
    path: 'filet-mignon',
    eyebrow: 'Main &middot; steak &amp; pan sauce',
    title: 'Reverse-Sear Filet&nbsp;Mignon',
    lede: 'Center-cut filets dry-brined, roasted low and slow to an even edge-to-edge pink, then hard-seared and butter-basted with rosemary, thyme, and garlic. The fond becomes a quick red wine pan reduction.',
    facts: [
      ['Serves', R.serves(2, 'plate')],
      ['Roast', '120°C &middot; 25–35 min'],
      ['Out of oven', '43–46°C <span style="white-space:nowrap">(110–115°F)</span>'],
      ['Sear', '60 s + 60–90 s baste'],
      ['Pull at', '52°C (125°F), rest 5–7 min'],
    ],
  })}
${R.toc([['mise', 'Prep'], ['ingredients', 'Ingredients'], ['stage-2', 'Roast'], ['stage-3', 'Sear'], ['stage-6', 'Sauce'], ['stage-7', 'Plate']])}
<main class="wrap">
  <h2 id="mise">Prep tip</h2>${R.mise(mise)}
  <h2 id="ingredients">Ingredients <small>by weight</small></h2>${R.ingredients(ingredients)}
  <h2 id="method">Method</h2>${R.method(method)}
</main>`,
});

export function handleFiletMignon() {
  return R.respond(page());
}
