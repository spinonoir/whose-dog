// Recipe page at /green-beans. Public. Split from the chicken thighs, so it
// shares that palette.

import * as R from '../recipe.js';
import { theme } from './chicken-thighs.js';

const ingredients = [
  ['Blistered green beans', '', [
    ['300g', 'fresh green beans', 'trimmed'],
    ['15g', 'olive oil'],
    ['10g', 'garlic', 'finely minced'],
    ['3g', 'fresh lemon zest', 'approx. <b>1</b> lemon'],
    ['5g', 'kosher salt'],
  ]],
  ['Equipment', '', [
    ['', 'Cuisinart 8- or 10-inch stainless skillet'],
  ]],
];

const method = [
  ['Blister the beans', [
    'Place an 8- or 10-inch Cuisinart stainless skillet over medium-high heat. Add <b>15g</b> olive oil and heat until shimmering.',
    'Add <b>300g</b> trimmed green beans and <b>5g</b> kosher salt in an even layer.',
    'Sear undisturbed for <b>2 minutes</b> to blister and char the skins, then toss and sauté for another 3–4 minutes until crisp-tender.',
  ]],
  ['Aromatize &amp; plate', [
    'Turn off the burner under the skillet. Immediately toss in <b>10g</b> minced garlic and <b>3g</b> lemon zest.',
    'Stir continuously for 30 seconds, using the residual heat to cook the garlic until fragrant without burning.',
    'Plate and serve immediately.',
  ]],
];

const page = () => R.page({
  title: 'Blistered Green Beans',
  theme,
  key: 'greenbeans-checks',
  servings: 2,
  body: `${R.hero({
    path: 'green-beans',
    eyebrow: 'Side &middot; stovetop',
    title: 'Blistered Green&nbsp;Beans',
    lede: 'Green beans seared undisturbed in a hot skillet until the skins blister and char, then tossed off the heat with garlic and lemon zest so the garlic cooks through without burning.',
    facts: [
      ['Serves', R.serves(2, 'plate')],
      ['Blister', '2 min undisturbed'],
      ['Sauté', '3–4 min'],
      ['Garlic', '30 s off the heat'],
    ],
  })}
${R.toc([['ingredients', 'Ingredients'], ['method', 'Method']])}
<main class="wrap">
  <h2 id="ingredients">Ingredients <small>by weight</small></h2>${R.ingredients(ingredients)}
  <h2 id="method">Method</h2>${R.method(method)}
</main>`,
});

export function handleGreenBeans() {
  return R.respond(page());
}
