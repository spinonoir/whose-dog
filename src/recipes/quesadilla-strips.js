// Recipe page at /quesadilla-strips. Public. A side, sharing the ramen's palette.

import * as R from '../recipe.js';
import { theme } from './birria-ramen.js';

const ingredients = [
  ['Quesadillas', '', [
    ['4', 'corn tortilla{s}'],
    ['120g', 'Oaxaca cheese', 'shredded'],
  ]],
  ['Equipment', '', [
    ['', 'Ninja DoubleStack XL air fryer'],
  ]],
];

const method = [
  ['Assemble', [
    'Spread <b>120g</b> shredded Oaxaca cheese evenly over half of the <b>4</b> corn tortillas and top with the rest, two tortillas per quesadilla.',
  ]],
  ['Air fry &amp; slice', [
    'Place the quesadillas in the Ninja DoubleStack XL baskets and air fry at <b>190°C (375°F)</b> for 4–5 minutes until the cheese is fully melted and the tortillas are crisp.',
    'Cut into thick strips for dipping directly into ramen or birria consommé.',
  ]],
];

const page = () => R.page({
  title: 'Quesadilla Strips',
  theme,
  key: 'quesadilla-checks',
  servings: 2,
  body: `${R.hero({
    path: 'quesadilla-strips',
    eyebrow: 'Side &middot; for dipping',
    title: 'Oaxaca Quesadilla&nbsp;Strips',
    lede: 'Oaxaca cheese melted between corn tortillas in the air fryer until crisp, then cut into thick strips for dragging through hot consommé.',
    facts: [
      ['Makes', R.serves(2, 'quesadilla')],
      ['Air fry', '190°C &middot; 4–5 min'],
    ],
  })}
${R.toc([['ingredients', 'Ingredients'], ['method', 'Method']])}
<main class="wrap">
  <h2 id="ingredients">Ingredients <small>by weight</small></h2>${R.ingredients(ingredients)}
  <h2 id="method">Method</h2>${R.method(method)}
</main>`,
});

export function handleQuesadillaStrips() {
  return R.respond(page());
}
