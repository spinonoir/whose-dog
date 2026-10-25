// Recipe page at /birria-ramen. Public.
// Quantities are for SERVES bowls; the page scales them in the browser.

import * as R from '../recipe.js';

const SERVES = 2;

const ingredients = [
  ['Consommé reconstruction base', '', [
    ['700g', 'beef broth', 'low sodium'],
    ['40g', 'plain beef tallow'],
    ['60g', 'crushed tomatoes'],
    ['10g', 'soy sauce'],
    ['10g', 'peach cider vinegar'],
    ['6g', 'pasilla powder'],
    ['4g', 'garlic/onion powder blend'],
    ['2g', 'cumin', 'omit if using generic chili powder'],
    ['2g', 'cocoa powder'],
    ['300g', 'leftover shredded birria beef', 'from the <a href="/beef-birria">cocoa birria</a>'],
  ], 'tall-l'],
  ['Noodles', '', [
    ['320–360g', 'fresh jajangmyeon (짜장면) noodles'],
  ]],
  ['Produce, garnish &amp; crunch', '', [
    ['200g', 'brown beech or baby oyster mushrooms', 'woody bases removed'],
    ['200g', 'baby bok choy or yu choy'],
    ['60g', 'daikon radish', 'thinly sliced'],
    ['60g', 'gat-kimchi or pickled mustard greens (suan cai)', 'rinsed and chopped'],
    ['30g', 'crispy fried shallots'],
    ['2 handful{s}', 'scallions &amp; fresh cilantro', 'generous, chopped'],
  ]],
  ['Quick ajitama', 'Marinated soft egg', [
    ['2', 'large egg{s}'],
    ['100g', 'soy sauce'],
    ['100g', 'mirin'],
    ['100g', 'water'],
    ['30g', 'sugar'],
  ]],
];

const method = [
  ['Mise en place &amp; prep work', [
    'In a small container, whisk <b>100g</b> soy sauce, <b>100g</b> mirin, <b>100g</b> water, and <b>30g</b> sugar until dissolved.',
    'Boil the eggs in water for <b>exactly 6 minutes and 15 seconds</b>. Transfer immediately to an ice bath, peel, and submerge in the marinade.',
    'Bring a small pot of salted water to a boil. Submerge <b>200g</b> baby bok choy for 60 seconds until bright green. Remove, shock in cold water, squeeze dry, and set aside.',
    'Thoroughly wash <b>60g</b> gat-kimchi or pickled mustard greens under cold water to strip excess salinity. Squeeze completely dry and chop.',
    'Slice off the bottom <b>30–40g</b> of woody base from your <b>200g</b> of mushroom clusters. Separate into individual strands.',
  ]],
  ['Consommé reconstruction <small>spice blooming</small>', [
    'Place a medium saucepan over medium heat and melt the <b>40g</b> plain beef tallow.',
    'Once the tallow is hot but not smoking, drop in the <b>6g</b> pasilla powder, <b>4g</b> garlic/onion powder, <b>2g</b> cumin, and <b>2g</b> cocoa powder. Stir continuously for 45 to 60 seconds until the tallow turns deep red and fragrant. <span class="flag">Watch</span>Do not let the cocoa burn.',
    'Immediately pour in the <b>700g</b> beef broth to stop the cooking process. Whisk in the <b>60g</b> crushed tomatoes, <b>10g</b> soy sauce, and <b>10g</b> peach cider vinegar.',
    'Bring the mixture to a gentle simmer for <b>10 minutes</b> to fully emulsify the fat and hydrate the tomato.',
    'In the last 3 minutes of simmering, drop in the <b>200g</b> mushroom strands and <b>300g</b> leftover shredded birria beef to warm through. Keep the pot hot.',
  ]],
  ['Noodle boil &amp; plating architecture', [
    'Bring a large, separate pot of <b>unsalted</b> water to a rolling boil.',
    'Drop in <b>320–360g</b> fresh jajangmyeon noodles. Boil rapidly for <b>3 to 4 minutes</b>.',
    'Drain the noodles in a colander and briefly rinse under warm water to strip the heavy surface starch. Shake vigorously until completely dry.',
    'Divide the dry noodles between large, pre-warmed serving bowls, placing them in the center.',
    'Ladle the hot reconstructed consommé (with the <b>300g</b> beef and <b>200g</b> mushrooms) evenly over the noodles.',
    'Divide the <b>200g</b> blanched bok choy, <b>60g</b> chopped pickled greens, and <b>60g</b> thinly sliced daikon around the perimeter of each bowl.',
    'Slice each ajitama in half and place one egg on top of each bowl.',
    'Garnish heavily with fresh chopped scallions, cilantro, and <b>30g</b> crispy fried shallots. Serve with <a href="/quesadilla-strips">quesadilla strips</a> for dipping.',
  ]],
];

export const theme = {
  light: { bg: '#f5f7f2', paper: '#fdfefb', fg: '#1f261f', mut: '#66705f', line: '#dfe5d8', accent: '#3f7d4e', soft: '#dcebdc', done: '#a7b0a1' },
  dark: { bg: '#0f140f', paper: '#161c16', fg: '#e6ece2', mut: '#98a491', line: '#29322a', accent: '#7cc48d', soft: '#1f3324', done: '#5f6a5c' },
  qw: '6em',
  extra: '.stage h3 small{font:500 .8rem/1 var(--sans);color:var(--mut);letter-spacing:.04em}',
};

const page = () => R.page({
  title: 'Birria Ramen',
  theme,
  key: 'birriaramen-checks',
  servings: SERVES,
  body: `${R.hero({
    path: 'birria-ramen',
    eyebrow: 'Ramen &middot; leftover birria',
    title: 'Birria Ramen Fusion',
    lede: 'Leftover birria beef in a consommé rebuilt from scratch: pasilla, cumin, and cocoa bloomed in plain beef tallow, then loosened with broth, tomato, and peach cider vinegar. Served over alkaline jajangmyeon noodles with a quick-marinated soft egg, blanched bok choy, and rinsed pickled greens.',
    facts: [
      ['Serves', R.serves(SERVES, 'bowl')],
      ['Egg', '6 min 15 s'],
      ['Consommé', '10 min simmer'],
      ['Noodles', '3–4 min'],
    ],
  })}
${R.toc([['ingredients', 'Ingredients'], ['stage-1', 'Prep'], ['stage-2', 'Consommé'], ['stage-3', 'Noodles &amp; bowl']])}
<main class="wrap">
  <h2 id="ingredients">Ingredients <small>by weight</small></h2>${R.ingredients(ingredients)}
  <h2 id="method">Method</h2>${R.method(method)}
</main>`,
});

export function handleBirriaRamen() {
  return R.respond(page());
}
