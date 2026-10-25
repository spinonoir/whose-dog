// Recipe page at /roasted-asparagus. Public. Split from the filet mignon, so
// it shares that palette.

import * as R from '../recipe.js';
import { theme } from './filet-mignon.js';

const ingredients = [
  ['Roasted asparagus', '', [
    ['300g', 'fresh asparagus', 'woody ends trimmed'],
    ['15g', 'extra virgin olive oil'],
    ['4g', 'kosher salt'],
    ['2g', 'black pepper', 'cracked'],
    ['10g', 'Parmigiano-Reggiano', 'freshly grated'],
    ['5g', 'fresh lemon juice'],
  ]],
  ['Equipment', '', [
    ['', 'Rimmed baking sheet'],
  ]],
];

const method = [
  ['Roast', [
    'Preheat your oven to 120°C (250°F). If you’re making the <a href="/filet-mignon">filet mignon</a>, it’s already at this temperature.',
    'Toss <b>300g</b> trimmed asparagus with <b>15g</b> olive oil, <b>4g</b> kosher salt, and <b>2g</b> black pepper on a baking sheet.',
    'Roast for <b>12–15 minutes</b>. With the filets, slide the sheet in beside them for the last 12–15 minutes of their roast.',
  ]],
  ['Finish', [
    'Remove from the oven and finish with <b>5g</b> fresh lemon juice and <b>10g</b> grated Parmigiano-Reggiano.',
    'Serve immediately.',
  ]],
];

const page = () => R.page({
  title: 'Roasted Asparagus',
  theme,
  key: 'asparagus-checks',
  servings: 2,
  body: `${R.hero({
    path: 'roasted-asparagus',
    eyebrow: 'Side &middot; oven',
    title: 'Roasted Asparagus with&nbsp;Parmesan',
    lede: 'Asparagus roasted gently with olive oil, salt, and pepper, then brightened with fresh lemon juice and a shower of Parmigiano-Reggiano straight out of the oven.',
    facts: [
      ['Serves', R.serves(2, 'plate')],
      ['Roast', '120°C &middot; 12–15 min'],
    ],
  })}
${R.toc([['ingredients', 'Ingredients'], ['method', 'Method']])}
<main class="wrap">
  <h2 id="ingredients">Ingredients <small>by weight</small></h2>${R.ingredients(ingredients)}
  <h2 id="method">Method</h2>${R.method(method)}
</main>`,
});

export function handleRoastedAsparagus() {
  return R.respond(page());
}
