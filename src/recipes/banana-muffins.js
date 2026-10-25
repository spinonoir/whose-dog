// Recipe page at /banana-muffins. Public.

import * as R from '../recipe.js';

const mise = [
  ['Bananas', 'Use heavily speckled or black bananas.'],
  ['Butter', 'Brown in a light-colored pan so milk solid browning is clearly visible.'],
  ['Resting', 'Allow mixed batter to rest 15–20 minutes before baking to let the flour hydrate fully.'],
];

const ingredients = [
  ['Wet ingredients &amp; leavening base', '', [
    ['350g', 'peeled ripe bananas', 'approx. <b>3–4</b> medium bananas'],
    ['115g', 'unsalted butter', 'yields ~<b>95g</b> browned butter'],
    ['130g', 'dark brown sugar'],
    ['50g', 'granulated sugar'],
    ['100g', 'large eggs', '<b>2</b> standard large eggs, room temperature'],
    ['5g', 'vanilla bean paste or pure extract'],
  ], 'tall-l'],
  ['Dry ingredients', '', [
    ['220g', 'all-purpose flour'],
    ['4g', 'baking soda'],
    ['3g', 'baking powder'],
    ['3g', 'fine sea salt', 'or <b>4g</b> Diamond Crystal kosher salt'],
    ['2g', 'ground cinnamon'],
  ]],
  ['Optional mix-ins', '', [
    ['100g', 'bittersweet chocolate chunks (60–70%) or toasted walnuts'],
  ]],
];

const method = [
  ['Brown the butter', [
    'In a stainless steel pan or skillet over medium heat, melt <b>115g</b> unsalted butter. Swirl periodically as it foams and crackles.',
    'Once the crackling subsides and browned milk solids settle on the bottom with a nutty aroma (4–5 minutes), remove immediately from heat.',
    'Scrape all solids and liquid fat into a heatproof bowl; cool to room temperature (~25°C).',
  ]],
  ['Reduce banana liquid', [
    'Place <b>350g</b> peeled ripe bananas in a microwave-safe bowl. Cover with a paper towel and microwave on high for 3 minutes.',
    'Transfer pulp into a fine-mesh sieve resting over a small saucepan and drain for 10 minutes (pressing lightly with a spatula).',
    'Simmer the extracted banana liquid over medium heat until reduced to ~<b>30g</b> of thick syrup.',
    'Stir reduced syrup back into the mashed banana pulp.',
  ]],
  ['Whisk dry components', [
    'In a separate bowl, thoroughly whisk together <b>220g</b> all-purpose flour, <b>4g</b> baking soda, <b>3g</b> baking powder, <b>3g</b> fine sea salt, and <b>2g</b> ground cinnamon.',
  ]],
  ['Emulsify wet components', [
    'To the warm mashed banana mixture, add the cooled brown butter, <b>130g</b> dark brown sugar, and <b>50g</b> granulated sugar. Whisk vigorously until the mixture is glossy and emulsified.',
    'Whisk in <b>100g</b> eggs and <b>5g</b> vanilla until homogeneous.',
  ]],
  ['Combine &amp; rest', [
    'Pour the dry ingredient blend into the wet mixture. Fold gently using a rubber spatula just until flour pockets disappear.',
    'Fold in <b>100g</b> chopped walnuts or chocolate chunks if using.',
    'Let the batter rest undisturbed at room temperature for <b>15–20 minutes</b>.',
  ]],
  ['Portion &amp; bake', [
    'Preheat oven to 425°F (218°C). Line <b>1</b> standard 12-cup muffin tin{s} with paper liners or spray thoroughly with pan release.',
    'Divide rested batter evenly among <b>10–12</b> muffin cups (<b>~70–80g</b> per well, filled roughly 85–90% to the rim).',
    'Place pan into the oven and bake at <b>425°F (218°C) for 5 minutes</b>.',
    'Without opening the oven door, drop temperature setting to <b>350°F (177°C)</b> and bake for an additional <b>13–16 minutes</b>.',
    '<span class="flag">Doneness</span> Tops should be deep golden with set cracks; a cake tester or toothpick inserted into the center should emerge clean or with a few moist crumbs.',
  ]],
  ['Cool', [
    'Cool muffins in the pan for 5 minutes, then transfer immediately to a wire cooling rack to prevent condensation on the bottoms.',
  ]],
];

const variations = [
  ['Miso caramel', 'Whisk <b>15g</b> white miso directly into the warm browned butter before emulsifying with sugar.'],
  ['Cardamom espresso', 'Sift <b>2g</b> fine espresso powder and <b>1g</b> ground cardamom alongside the cinnamon into the dry mixture.'],
];

const theme = {
  light: { bg: '#fbf7ec', paper: '#fffdf8', fg: '#2b2418', mut: '#776b58', line: '#ebe1c9', accent: '#a8651a', soft: '#f5e7c8', done: '#b3a891' },
  dark: { bg: '#15120b', paper: '#1d1910', fg: '#efe7d6', mut: '#a39886', line: '#332b1d', accent: '#e0a246', soft: '#3a2c14', done: '#6b6253' },
  qw: '4.2em',
};

const page = () => R.page({
  title: 'Banana Bread Muffins',
  theme,
  key: 'bananamuffin-checks',
  servings: 1,
  body: `${R.hero({
    path: 'banana-muffins',
    eyebrow: 'Muffins &middot; 10–12 per batch',
    title: 'Brown Butter Banana Bread&nbsp;Muffins',
    lede: 'Bakery-style banana muffins formulated by weight, utilizing a banana reduction to intensify flavor without excess moisture and a two-stage high-heat blast for domed tops.',
    facts: [
      ['Makes', R.serves(1, 'batch', 'es')],
      ['Prep', '25 min'],
      ['Rest', '15–20 min'],
      ['Blast', '218°C &middot; 5 min'],
      ['Bake', '177°C &middot; 13–16 min'],
      ['Portion', '~70–80g per cup'],
    ],
  })}
${R.toc([['mise', 'Mise en place'], ['ingredients', 'Ingredients'], ['method', 'Method'], ['variations', 'Variations']])}
<main class="wrap">
  <h2 id="mise">Advance notes</h2>${R.mise(mise)}
  <h2 id="ingredients">Ingredients <small>by weight</small></h2>${R.ingredients(ingredients)}
  <h2 id="method">Method</h2>${R.method(method)}
  <h2 id="variations">Modern fusions</h2>${R.variations(variations)}
</main>`,
});

export function handleBananaMuffin() {
  return R.respond(page());
}
