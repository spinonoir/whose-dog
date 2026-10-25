// Recipe page at /butternut-soup. Public.

import * as R from '../recipe.js';

const mise = [
  ['Full dinner', 'Making it with the <a href="/lemongrass-drumsticks">drumsticks</a> and <a href="/chili-flatbread">flatbread</a>? Mix the flatbread dough first, since it needs a 1-hour rest. The drumsticks air-fry while the soup simmers, and the flatbread bakes while you blend.'],
  ['Squash hack', 'Microwave the whole butternut squash for 3 minutes to soften the skin before peeling and cubing.'],
];

const ingredients = [
  ['Thai red curry butternut squash soup', '', [
    ['800g', 'butternut squash', 'peeled, seeded, cubed; approx. <b>1</b> medium squash'],
    ['400g', 'full-fat coconut milk', '1 standard can; reserve a spoonful for garnish'],
    ['480g', 'chicken or vegetable broth'],
    ['100g', 'yellow onion or shallots', 'chopped'],
    ['50g', 'Thai red curry paste'],
    ['15g', 'fresh ginger', 'minced'],
    ['15g', 'fresh garlic', 'minced'],
    ['15g', 'coconut oil'],
    ['15g', 'fish sauce'],
    ['15g', 'fresh lime juice'],
    ['10g', 'brown sugar'],
    ['', 'fresh cilantro', 'to garnish'],
  ], 'tall-l'],
  ['Equipment', '', [
    ['', 'Lodge enameled cast iron Dutch oven'],
    ['', 'KitchenAid immersion blender'],
  ]],
];

const method = [
  ['Soup base', [
    'Set the Dutch oven over medium heat and add the <b>15g</b> coconut oil.',
    'Once hot, add the <b>100g</b> chopped onions and cook for 4 minutes.',
    'Add the <b>15g</b> minced ginger and <b>15g</b> minced garlic and sauté for 1 minute.',
    'Add the <b>50g</b> red curry paste and stir constantly for <b>2 minutes</b> to toast the spices and release their oils.',
  ]],
  ['Simmer', [
    'Add the <b>800g</b> cubed squash and stir to coat it in the curry base.',
    'Pour in the <b>400g</b> coconut milk (less the reserved spoonful) and <b>480g</b> broth. Bring to a boil.',
    'Reduce to medium-low, cover, and simmer for <b>20–25 minutes</b> until the squash is completely tender.',
  ]],
  ['Blend &amp; serve', [
    'Take the Dutch oven off the heat. Submerge the immersion blender and blend until the soup is completely velvety.',
    'Stir in the <b>15g</b> fish sauce, <b>15g</b> lime juice, and <b>10g</b> brown sugar.',
    'Ladle into bowls and top with a drizzle of the reserved coconut milk and fresh cilantro.',
  ]],
];

export const theme = {
  light: { bg: '#f8f7ef', paper: '#fefefa', fg: '#25261c', mut: '#6e6f5c', line: '#e4e3d3', accent: '#6b7320', soft: '#ebedd2', done: '#acab98' },
  dark: { bg: '#12130d', paper: '#1a1b14', fg: '#eceadc', mut: '#a3a28c', line: '#2e3024', accent: '#b5c060', soft: '#2e331b', done: '#646450' },
};

const page = () => R.page({
  title: 'Red Curry Butternut Soup',
  theme,
  key: 'butternut-checks',
  servings: 1,
  body: `${R.hero({
    path: 'butternut-soup',
    eyebrow: 'Soup &middot; coconut red curry',
    title: 'Thai Red Curry Butternut Squash&nbsp;Soup',
    lede: 'Butternut squash simmered in coconut milk and broth over a base of onion, ginger, garlic, and red curry paste toasted in coconut oil, then blended velvety and finished with fish sauce, lime, and brown sugar.',
    facts: [
      ['Makes', R.serves(1, 'batch', 'es')],
      ['Curry paste', '2 min toast'],
      ['Simmer', '20–25 min'],
    ],
  })}
${R.toc([['mise', 'Prep'], ['ingredients', 'Ingredients'], ['method', 'Method']])}
<main class="wrap">
  <h2 id="mise">Mise en place</h2>${R.mise(mise)}
  <h2 id="ingredients">Ingredients <small>by weight</small></h2>${R.ingredients(ingredients)}
  <h2 id="method">Method</h2>${R.method(method)}
</main>`,
});

export function handleButternutSoup() {
  return R.respond(page());
}
