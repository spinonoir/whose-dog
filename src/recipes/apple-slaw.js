// Recipe page at /apple-slaw. Public. Split from the buffalo wings, so it
// shares that palette.

import * as R from '../recipe.js';
import { theme } from './buffalo-wings.js';

const ingredients = [
  ['Slaw', '', [
    ['200g', 'celery', 'thinly sliced on the bias'],
    ['150g', 'Granny Smith apple', 'julienned'],
    ['50g', 'walnuts', 'toasted and chopped'],
  ]],
  ['Dressing', '', [
    ['30g', 'mayonnaise'],
    ['15g', 'Dijon mustard'],
    ['10g', 'fresh lemon juice'],
    ['', 'kosher salt &amp; black pepper', 'to taste'],
  ]],
];

const method = [
  ['Assemble the slaw', [
    'In a mixing bowl, whisk together <b>30g</b> mayonnaise, <b>15g</b> Dijon mustard, and <b>10g</b> lemon juice.',
    'Fold in <b>200g</b> sliced celery, <b>150g</b> julienned Granny Smith apple, and <b>50g</b> toasted walnuts.',
    'Season with kosher salt and cracked black pepper to taste. Keep chilled until serving.',
  ]],
];

const page = () => R.page({
  title: 'Celery-Apple Slaw',
  theme,
  key: 'slaw-checks',
  servings: 1,
  body: `${R.hero({
    path: 'apple-slaw',
    eyebrow: 'Side &middot; no cook',
    title: 'Celery-Apple&nbsp;Slaw',
    lede: 'Celery sliced on the bias, julienned Granny Smith, and toasted walnuts folded into a sharp Dijon-mayo dressing. Cool and crunchy against anything hot and rich.',
    facts: [
      ['Makes', R.serves(1, 'batch', 'es')],
      ['Time', '~10 min, no cooking'],
    ],
  })}
${R.toc([['ingredients', 'Ingredients'], ['method', 'Method']])}
<main class="wrap">
  <h2 id="ingredients">Ingredients <small>by weight</small></h2>${R.ingredients(ingredients)}
  <h2 id="method">Method</h2>${R.method(method)}
</main>`,
});

export function handleAppleSlaw() {
  return R.respond(page());
}
