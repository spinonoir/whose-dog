// Recipe page at /chili-flatbread. Public. Split from the butternut soup
// dinner, so it shares that palette.

import * as R from '../recipe.js';
import { theme } from './butternut-soup.js';

const mise = [
  ['Dough first', 'The dough needs a 1-hour rest. Mix it before any other prep.'],
  ['Pizza stone', 'Set the stone in the oven and preheat to 260°C (500°F) at least 45 minutes before baking.'],
];

const ingredients = [
  ['Dough', '', [
    ['250g', 'all-purpose or bread flour'],
    ['160g', 'warm water'],
    ['5g', 'kosher salt'],
    ['3g', 'instant yeast'],
    ['10g', 'olive oil'],
  ]],
  ['Toppings', '', [
    ['150g', 'low-moisture mozzarella', 'shredded'],
    ['30g', 'chili oil', 'crisp / flake style'],
    ['15g', 'fresh garlic', 'minced'],
  ]],
  ['Equipment', '', [
    ['', 'Pizza stone', 'plus parchment or a floured peel'],
  ]],
];

const method = [
  ['Dough', [
    'In a bowl, combine the <b>250g</b> flour, <b>160g</b> warm water, <b>5g</b> salt, <b>3g</b> instant yeast, and <b>10g</b> olive oil.',
    'Knead for 5 minutes until smooth and elastic.',
    'Cover with a damp towel and rest at room temperature for <b>1 hour</b>.',
    'Place the pizza stone in the oven and preheat to 260°C (500°F).',
  ]],
  ['Shape &amp; bake', [
    'Divide the rested dough into <b>2</b> pieces and stretch each into a thin oval on parchment or a floured peel.',
    'Spread the <b>30g</b> chili oil and <b>15g</b> minced garlic evenly across the dough, then top with the <b>150g</b> shredded mozzarella.',
    'Transfer directly onto the hot pizza stone, one or two at a time, and bake for <b>6–8 minutes</b> until the cheese is bubbling and the crust is blistered.',
  ]],
];

const page = () => R.page({
  title: 'Chili-Garlic Flatbread',
  theme,
  key: 'flatbread-checks',
  servings: 2,
  body: `${R.hero({
    path: 'chili-flatbread',
    eyebrow: 'Side &middot; pizza stone',
    title: 'Chili-Garlic Mozzarella&nbsp;Flatbread',
    lede: 'A quick yeasted dough stretched into thin ovals, spread with chili crisp and garlic, covered in mozzarella, and baked on a screaming-hot stone until blistered.',
    facts: [
      ['Makes', R.serves(2, 'flatbread')],
      ['Dough rest', '1 h'],
      ['Bake', '260°C &middot; 6–8 min'],
    ],
  })}
${R.toc([['mise', 'Prep'], ['ingredients', 'Ingredients'], ['method', 'Method']])}
<main class="wrap">
  <h2 id="mise">Mise en place</h2>${R.mise(mise)}
  <h2 id="ingredients">Ingredients <small>by weight</small></h2>${R.ingredients(ingredients)}
  <h2 id="method">Method</h2>${R.method(method)}
</main>`,
});

export function handleChiliFlatbread() {
  return R.respond(page());
}
