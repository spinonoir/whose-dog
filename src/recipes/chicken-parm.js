// Recipe page at /chicken-parm. Public.

import * as R from '../recipe.js';

const mise = [
  ['No dry patches', 'Spray the breaded cutlets until no dry flour or crumbs show. Anything left dry stays pale and powdery in the air fryer instead of turning golden.'],
  ['Sauce the center', 'Spoon the sauce onto the middle of each cutlet and leave the edges bare, so the rim of the crust stays crunchy under the cheese.'],
];

const ingredients = [
  ['Chicken cutlets', 'Three-stage dredge', [
    ['680g', 'boneless, skinless chicken breasts', 'sliced horizontally into <b>6</b> thin cutlets and pounded to 1/2 inch'],
    ['60g', 'all-purpose flour'],
    ['2', 'large egg{s}', 'lightly beaten'],
    ['100g', 'panko breadcrumbs'],
    ['35g', 'Parmigiano-Reggiano', 'finely grated'],
    ['3g', 'garlic powder'],
    ['1g', 'Italian seasoning'],
    ['6g', 'fine sea salt', 'split between flour, egg, and crumbs'],
    ['1g', 'black pepper'],
    ['', 'olive or avocado oil spray'],
  ], 'tall-l'],
  ['Crushed tomato &amp; basil sauce', '', [
    ['400g', 'crushed canned tomatoes', 'about half a 28-oz can'],
    ['15g', 'garlic', 'about 3 cloves, minced'],
    ['18g', 'olive oil'],
    ['5g', 'fresh basil', '10–12 leaves, torn'],
    ['', 'salt and black pepper', 'to taste'],
    ['', 'crushed red pepper flakes', 'a pinch, optional'],
  ]],
  ['Assembly', '', [
    ['4', 'Telera roll{s}', 'split, or 1 French loaf cut into sections and split'],
    ['150–180g', 'low-moisture mozzarella', 'sliced or shredded'],
    ['30g', 'unsalted butter', 'softened, optional, for toasting'],
    ['', 'Parmesan', 'a pinch per sandwich'],
    ['', 'fresh basil leaves', 'whole, to finish'],
  ]],
  ['Equipment', '', [
    ['', 'Ninja DoubleStack XL air fryer'],
    ['', 'Cuisinart 1.5-quart saucepan'],
    ['', 'Three shallow dishes', 'for dredging'],
    ['', 'Wire rack'],
    ['', 'Probe thermometer'],
  ]],
];

const method = [
  ['Simmer the sauce', [
    'Warm <b>18g</b> olive oil in the Cuisinart 1.5-quart saucepan over medium-low heat.',
    'Add <b>15g</b> minced garlic, and the red pepper flakes if using. Sauté for 30–45 seconds until fragrant, without letting it brown.',
    'Pour in <b>400g</b> crushed tomatoes and season with salt and pepper.',
    'Simmer gently, uncovered, for <b>8–10 minutes</b> until slightly reduced and thickened.',
    'Turn off the heat, stir in <b>5g</b> torn basil, cover, and set aside.',
  ]],
  ['Set up the dredging station', [
    '<span class="flag soft">Dish 1</span> Whisk <b>60g</b> flour with a pinch of salt and pepper.',
    '<span class="flag soft">Dish 2</span> Whisk <b>2</b> eggs with a splash of water and a pinch of salt.',
    '<span class="flag soft">Dish 3</span> Combine <b>100g</b> panko, <b>35g</b> Parmesan, <b>3g</b> garlic powder, <b>1g</b> Italian seasoning, <b>3g</b> salt, and a pinch of pepper.',
  ]],
  ['Bread the chicken', [
    'Pat the <b>6</b> cutlets thoroughly dry with paper towels.',
    'Dredge each cutlet in the flour and shake off all the excess.',
    'Dip it fully in the egg wash and let the excess drip off for a couple of seconds.',
    'Press it firmly into the panko-Parmesan mixture until evenly and thoroughly crusted.',
  ]],
  ['Air fry in batches', [
    'Preheat the Ninja DoubleStack XL to <b>200°C (400°F)</b> for 3 minutes.',
    'Lay 2–3 cutlets per batch in the baskets in a single layer, without overlapping.',
    'Spray both sides generously with oil until no dry flour or crumb patches remain.',
    'Air fry at <b>200°C (400°F)</b> for <b>8 minutes</b>.',
    'Flip, spray any dry spots, and cook for another <b>3–4 minutes</b> until deep golden brown and crisp.',
    '<span class="flag">Doneness</span> The thickest part should read at least <b>74°C (165°F)</b>.',
    'Move the cooked cutlets to a wire rack while the next batch cooks.',
  ]],
  ['Melt the cheese &amp; toast the rolls', [
    'Set the bottom halves of the rolls in the baskets. If they won’t fit, put the cutlets straight in the baskets instead.',
    'Lay a cutlet on each bottom half, two if you want to use all six.',
    'Spoon <b>~30g</b> (2 tablespoons) of warm sauce onto the center of each cutlet, leaving the edges bare.',
    'Top with <b>150–180g</b> mozzarella, divided, and a pinch of Parmesan on each.',
    'Air fry at <b>190°C (375°F)</b> for <b>2–3 minutes</b> until the mozzarella is fully melted and bubbling.',
    'Butter the cut sides of the tops if you like, and add them to the baskets for the last 60 seconds to warm and toast.',
  ]],
  ['Finish &amp; serve', [
    'Scatter fresh basil leaves over the melted cheese.',
    'Add the toasted tops, press down gently, and slice on the diagonal. Serve hot.',
  ]],
];

export const theme = {
  light: { bg: '#f3f7f4', paper: '#fcfefd', fg: '#1a2620', mut: '#5c6f64', line: '#d9e5dd', accent: '#1f6b45', soft: '#d6eadd', done: '#a1b3a8' },
  dark: { bg: '#0c140f', paper: '#131c16', fg: '#e1ece5', mut: '#91a69a', line: '#24332a', accent: '#5fcf94', soft: '#143022', done: '#596b60' },
};

const page = () => R.page({
  title: 'Air Fryer Chicken Parm Sandwiches',
  theme,
  key: 'chicken-parm-checks',
  servings: 4,
  body: `${R.hero({
    path: 'chicken-parm',
    eyebrow: 'Air fryer &middot; sandwiches',
    title: 'Air Fryer Chicken Parmesan&nbsp;Sandwiches',
    lede: 'Thin cutlets in a panko-Parmesan crust, air-fried until crisp, then sauced with a quick crushed tomato and basil sauce, blanketed in melted mozzarella, and stacked on toasted Telera rolls.',
    facts: [
      ['Makes', R.serves(4, 'sandwich', 'es')],
      ['Prep', '15 min'],
      ['Air fry', '200°C &middot; 11–12 min per batch'],
      ['Pull at', '74°C (165°F)'],
    ],
  })}
${R.toc([['mise', 'Tips'], ['ingredients', 'Ingredients'], ['stage-1', 'Sauce'], ['stage-2', 'Dredge'], ['stage-3', 'Bread'], ['stage-4', 'Air fry'], ['stage-5', 'Melt'], ['stage-6', 'Serve']])}
<main class="wrap">
  <h2 id="mise">Crust tips</h2>${R.mise(mise)}
  <h2 id="ingredients">Ingredients <small>by weight</small></h2>${R.ingredients(ingredients)}
  <h2 id="method">Method</h2>${R.method(method)}
</main>`,
});

export function handleChickenParm() {
  return R.respond(page());
}
