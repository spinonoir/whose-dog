// Recipe page at /lemongrass-drumsticks. Public. Split from the butternut
// soup dinner, so it shares that palette.

import * as R from '../recipe.js';
import { theme } from './butternut-soup.js';

const mise = [
  ['Score the meat', 'Cut 2–3 deep slashes down to the bone on each drumstick so the marinade penetrates and the meat cooks faster.'],
];

const ingredients = [
  ['Lemongrass chicken drumsticks', '', [
    ['800g', 'chicken drumsticks', 'bone-in, skin-on, scored'],
    ['30g', 'soy sauce'],
    ['15g', 'fish sauce'],
    ['15g', 'fresh lemongrass', 'minced, or lemongrass paste'],
    ['10g', 'fresh garlic', 'minced'],
    ['10g', 'brown sugar'],
    ['10g', 'neutral oil'],
  ]],
  ['Equipment', '', [
    ['', 'Ninja DoubleStack XL air fryer'],
    ['', 'Probe thermometer'],
  ]],
];

const method = [
  ['Marinate', [
    'In a mixing bowl, combine the <b>30g</b> soy sauce, <b>15g</b> fish sauce, <b>15g</b> minced lemongrass, <b>10g</b> minced garlic, <b>10g</b> brown sugar, and <b>10g</b> neutral oil.',
    'Toss the <b>800g</b> scored drumsticks in the marinade, massaging it deep into the cuts. Set aside.',
  ]],
  ['Air fry', [
    'Set the Ninja DoubleStack XL to 190°C (380°F).',
    'Arrange the <b>800g</b> marinated drumsticks in a single layer with space between them.',
    'Air fry for <b>20 minutes</b>, flipping halfway.',
    'Raise the temperature to 200°C (400°F) for 3–5 minutes to aggressively crisp the skin.',
    '<span class="flag">Doneness</span> Remove when the internal temperature reaches <b>80–85°C (175–185°F)</b>. Let rest briefly before serving.',
  ]],
];

const page = () => R.page({
  title: 'Lemongrass Drumsticks',
  theme,
  key: 'drumsticks-checks',
  servings: 1,
  body: `${R.hero({
    path: 'lemongrass-drumsticks',
    eyebrow: 'Air fryer &middot; chicken',
    title: 'Lemongrass Chicken&nbsp;Drumsticks',
    lede: 'Drumsticks scored to the bone and marinated in soy, fish sauce, lemongrass, garlic, and brown sugar, then air-fried and finished with a short blast of higher heat for crackling skin.',
    facts: [
      ['Makes', R.serves(1, 'batch', 'es')],
      ['Air fry', '190°C &middot; 20 min'],
      ['Crisp', '200°C &middot; 3–5 min'],
      ['Pull at', '80–85°C <span style="white-space:nowrap">(175–185°F)</span>'],
    ],
  })}
${R.toc([['mise', 'Prep'], ['ingredients', 'Ingredients'], ['method', 'Method']])}
<main class="wrap">
  <h2 id="mise">Mise en place</h2>${R.mise(mise)}
  <h2 id="ingredients">Ingredients <small>by weight</small></h2>${R.ingredients(ingredients)}
  <h2 id="method">Method</h2>${R.method(method)}
</main>`,
});

export function handleLemongrassDrumsticks() {
  return R.respond(page());
}
