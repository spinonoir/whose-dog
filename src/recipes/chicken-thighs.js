// Recipe page at /chicken-thighs. Public.

import * as R from '../recipe.js';

const mise = [
  ['Cold-pan start', 'Start bone-in, skin-on thighs in a cold cast-iron vessel. Gradual thermal ramping slowly melts and renders out the thick subcutaneous fat layer, yielding thin, shatteringly crisp skin without scorching the exterior before the meat cooks through.'],
];

const ingredients = [
  ['Chicken thighs', '', [
    ['800g', 'bone-in, skin-on chicken thighs', 'approx. <b>4</b> thighs'],
    ['15g', 'kosher salt'],
    ['3g', 'black pepper', 'freshly cracked'],
    ['15g', 'neutral high-smoke-point oil', 'grapeseed or canola'],
    ['30g', 'unsalted butter'],
    ['10g', 'fresh thyme sprigs'],
    ['15g', 'garlic cloves', 'lightly crushed'],
  ]],
  ['Equipment', '', [
    ['', 'Lodge cast-iron Dutch oven', 'or a heavy Cuisinart stainless skillet'],
    ['', 'Wire rack'],
    ['', 'Probe thermometer'],
  ]],
];

const method = [
  ['Mise en place &amp; prep', [
    'Trim any ragged, overhanging skin flaps from the <b>800g</b> chicken thighs so they sit flat.',
    'Use paper towels to pat the skin and flesh completely dry.',
    'Evenly distribute <b>15g</b> kosher salt and <b>3g</b> black pepper over all surfaces.',
  ]],
  ['Cold-pan render &amp; sear', [
    'Preheat your oven to 200°C (400°F) now, so it is hot when the skin is done.',
    'Pour <b>15g</b> neutral oil into your <b>unheated</b> Lodge cast-iron Dutch oven or heavy Cuisinart stainless skillet.',
    'Arrange the <b>800g</b> seasoned thighs skin-side down in the cold pan in a single layer.',
    'Place the pan over medium-low heat. Let it come up to temperature gradually, rendering the fat undisturbed for <b>15–20 minutes</b> until the skin turns deep golden-brown and releases cleanly from the pan surface.',
  ]],
  ['Baste &amp; oven roast', [
    'Flip the thighs skin-side up. Add <b>30g</b> unsalted butter, <b>10g</b> fresh thyme sprigs, and <b>15g</b> crushed garlic cloves to the pan.',
    'Tilt the pan slightly and spoon the foaming butter over the crisp skin for 2 minutes.',
    'Transfer the pan into the preheated oven and roast for <b>10–12 minutes</b>.',
    '<span class="flag">Doneness</span> Pull when a probe reads <b>79°C (175°F)</b> at the thickest section near the bone. Transfer the thighs to a wire rack to rest for 5 minutes.',
    'Serve immediately, with <a href="/green-beans">blistered green beans</a> made while the thighs rest.',
  ]],
];

export const theme = {
  light: { bg: '#f3f6f6', paper: '#fcfefe', fg: '#1c2627', mut: '#5f6f70', line: '#dae3e3', accent: '#2f6f73', soft: '#d8e9e9', done: '#a3b1b1' },
  dark: { bg: '#0d1414', paper: '#141c1d', fg: '#e3ecec', mut: '#93a5a6', line: '#263233', accent: '#6cc0c4', soft: '#17302f', done: '#5b6a6b' },
};

const page = () => R.page({
  title: 'Cast-Iron Chicken Thighs',
  theme,
  key: 'chicken-checks',
  servings: 2,
  body: `${R.hero({
    path: 'chicken-thighs',
    eyebrow: 'Main &middot; cast iron',
    title: 'Cast-Iron Seared Chicken&nbsp;Thighs',
    lede: 'Bone-in thighs started skin-down in a cold pan so the fat renders slowly into thin, shatteringly crisp skin, then butter-basted with thyme and garlic and finished in the oven.',
    facts: [
      ['Serves', R.serves(2, 'plate')],
      ['Render', '15–20 min, cold start'],
      ['Roast', '200°C &middot; 10–12 min'],
      ['Pull at', '79°C (175°F)'],
    ],
  })}
${R.toc([['mise', 'Tip'], ['ingredients', 'Ingredients'], ['stage-1', 'Prep'], ['stage-2', 'Sear'], ['stage-3', 'Roast']])}
<main class="wrap">
  <h2 id="mise">Searing tip</h2>${R.mise(mise)}
  <h2 id="ingredients">Ingredients <small>by weight</small></h2>${R.ingredients(ingredients)}
  <h2 id="method">Method</h2>${R.method(method)}
</main>`,
});

export function handleChickenThighs() {
  return R.respond(page());
}
