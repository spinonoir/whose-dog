// Recipe page at /buffalo-wings. Public.

import * as R from '../recipe.js';

const mise = [
  ['Dry overnight', 'Dry the wings uncovered in the refrigerator on a wire cooling rack for 8–24 hours before cooking. The baking powder elevates the skin’s surface pH, accelerating moisture evaporation and blistered browning.'],
];

const ingredients = [
  ['Wings', '', [
    ['1000g', 'chicken wings', 'flats and drumettes separated'],
    ['12g', 'kosher salt'],
    ['5g', 'baking powder', 'aluminum-free'],
  ]],
  ['Buffalo sauce', '', [
    ['115g', 'unsalted butter'],
    ['120g', 'Frank’s RedHot sauce'],
    ['10g', 'white vinegar'],
    ['3g', 'garlic powder'],
  ]],
  ['Equipment', '', [
    ['', 'Ninja DoubleStack XL air fryer'],
    ['', 'Cuisinart 1.5-quart saucepan'],
    ['', 'Wire rack', 'set over a rimmed baking sheet'],
    ['', 'Large stainless steel bowl', 'for tossing'],
  ]],
];

const method = [
  ['Dry &amp; season the wings', [
    'Pat <b>1000g</b> chicken wings thoroughly dry with paper towels.',
    'In a large mixing bowl, toss the wings with <b>12g</b> kosher salt and <b>5g</b> baking powder until evenly coated.',
    'Arrange on a wire rack set over a rimmed baking sheet and refrigerate uncovered for <b>8 to 24 hours</b>.',
  ]],
  ['Air fry', [
    'Preheat the Ninja DoubleStack XL to 200°C (400°F).',
    'Arrange the wings in the baskets in a single layer without overcrowding. If you’ve scaled up, cook in rounds.',
    'Air fry for <b>20–25 minutes</b>, shaking and rearranging the baskets halfway through, until the skin is deeply blistered and crisp.',
  ]],
  ['Emulsify the buffalo sauce', [
    'While the wings cook, melt <b>115g</b> unsalted butter in the Cuisinart 1.5-quart saucepan over medium heat.',
    'Whisk in <b>120g</b> hot sauce, <b>10g</b> white vinegar, and <b>3g</b> garlic powder.',
    'Bring to a gentle simmer for 60 seconds, then remove from heat and keep warm so the emulsion does not break.',
  ]],
  ['Sauce &amp; serve', [
    'Transfer the hot wings directly from the air fryer into a large stainless steel bowl.',
    'Pour the warm buffalo sauce over the wings and toss until fully coated.',
    'Plate immediately alongside the chilled <a href="/apple-slaw">celery-apple slaw</a>.',
  ]],
];

export const theme = {
  light: { bg: '#f3f5f8', paper: '#fcfdfe', fg: '#1b222b', mut: '#5f6b78', line: '#dbe2ea', accent: '#2c5d8f', soft: '#dbe6f2', done: '#a2adb9' },
  dark: { bg: '#0d1117', paper: '#141a21', fg: '#e2e8ef', mut: '#94a1af', line: '#252e39', accent: '#79aee0', soft: '#16273a', done: '#5b6672' },
};

const page = () => R.page({
  title: 'Air-Fried Buffalo Wings',
  theme,
  key: 'wings-checks',
  servings: 1,
  body: `${R.hero({
    path: 'buffalo-wings',
    eyebrow: 'Air fryer &middot; wings',
    title: 'Air-Fried Buffalo&nbsp;Wings',
    lede: 'Wings dried overnight with salt and baking powder so the skin blisters and crisps in the air fryer, then tossed in a warm butter and Frank’s RedHot emulsion.',
    facts: [
      ['Makes', R.serves(1, 'batch', 'es')],
      ['Dry', '8–24 h, uncovered'],
      ['Air fry', '200°C &middot; 20–25 min'],
      ['Sauce', '60 s simmer'],
    ],
  })}
${R.toc([['mise', 'Tip'], ['ingredients', 'Ingredients'], ['stage-1', 'Dry'], ['stage-2', 'Air fry'], ['stage-3', 'Sauce'], ['stage-4', 'Serve']])}
<main class="wrap">
  <h2 id="mise">Prep tip</h2>${R.mise(mise)}
  <h2 id="ingredients">Ingredients <small>by weight</small></h2>${R.ingredients(ingredients)}
  <h2 id="method">Method</h2>${R.method(method)}
</main>`,
});

export function handleBuffaloWings() {
  return R.respond(page());
}
