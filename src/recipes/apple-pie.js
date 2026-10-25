// Recipe page at /apple-pie. Public.

import * as R from '../recipe.js';

const mise = [
  ['Temperature control', 'Keep your <b>226g</b> of butter strictly cold. If the kitchen is warm, chill your mixing bowl.'],
  ['Dough resting', 'Refrigerate the dough for at least 1 hour to relax the gluten and harden the butter.'],
  ['Slicing', 'Slice apples consistently to 1/4-inch (6mm) thickness to ensure even cooking.'],
];

const ingredients = [
  ['Double pie crust', '', [
    ['315g', 'all-purpose flour'],
    ['226g', 'unsalted butter', 'cubed and ice-cold'],
    ['10g', 'granulated sugar'],
    ['5g', 'kosher salt'],
    ['60–120g', 'ice water'],
  ]],
  ['Apple filling', '', [
    ['~1360g', 'whole apples', 'even mix of Pink Lady, Gala, Honeycrisp; yields exactly <b>900g</b> peeled, cored, and sliced'],
    ['100g', 'granulated sugar'],
    ['50g', 'light brown sugar'],
    ['25g', 'cornstarch or tapioca starch'],
    ['15g', 'bourbon'],
    ['15g', 'unsalted butter', 'cubed and kept cold'],
    ['5g', 'lemon juice'],
    ['2g', 'ground cinnamon'],
    ['1g', 'ground cardamom'],
    ['0.5g', 'kosher salt'],
  ], 'tall-r'],
  ['Finish &amp; equipment', '', [
    ['1', 'large egg{s}', 'beaten with a splash of water, for egg wash'],
    ['', 'parchment paper or heavy-duty foil'],
    ['', 'pie weights', 'or dried beans / sugar'],
  ]],
];

const method = [
  ['Prepare the dough', [
    'In a large bowl, whisk together the <b>315g</b> all-purpose flour, <b>10g</b> granulated sugar, and <b>5g</b> kosher salt.',
    'Add the <b>226g</b> cold, cubed butter. Use a pastry blender to cut the butter into the flour until the largest pieces are the size of peas.',
    'Drizzle <b>60g</b> of ice water over the mixture. Toss gently with a fork. Squeeze a handful of the dough; if it crumbles, add water 10g at a time until it just holds together.',
    'Divide evenly into <b>2</b> flat disks. Wrap tightly in plastic wrap and refrigerate for at least 1 hour.',
  ]],
  ['Roll &amp; chill bottom crust', [
    'For each pie, roll one disk out to a 12-inch circle. Drape it into a 9-inch pie dish.',
    'Fold the overhang under itself to create a thick rim that sits flush with the edge of the pie dish. Crimp the edges now.',
    'Place the lined pie dish{es} in the freezer for <b>15–20 minutes</b> so the crimped edges freeze solid (this prevents them from slumping during the blind bake).',
  ]],
  ['Partial blind bake (par-bake)', [
    'Preheat oven to 425°F (220°C).',
    'Line the frozen pie crust{s} tightly with parchment paper or foil, ensuring it covers the crimped edges to protect them. Fill to the brim with pie weights.',
    'Bake for <b>15 minutes</b>. The edges should look set but still pale.',
    'Carefully remove the parchment and weights. Return the empty crust{s} to the oven for <b>3 to 5 minutes</b> just to dry out the bottom.',
    'Remove from the oven and let the crust{s} cool to room temperature while you prepare the filling. <span class="flag">Caution</span><b>Do not add raw filling or the raw lattice to a hot crust, or the butter will melt instantly.</b>',
  ]],
  ['Macerate the apples', [
    'Peel, core, and slice the apples. Weigh the prepared slices to ensure exactly <b>900g</b>.',
    'Combine the <b>900g</b> slices, <b>100g</b> granulated sugar, <b>50g</b> light brown sugar, <b>15g</b> bourbon, <b>5g</b> lemon juice, <b>2g</b> cinnamon, <b>1g</b> cardamom, and <b>0.5g</b> salt.',
    'Toss to coat and let sit at room temperature for <b>30 to 45 minutes</b> to extract juices.',
  ]],
  ['Thicken the syrup', [
    'Strain the macerated apples, reserving the liquid in a small saucepan. Leave the apples in the bowl.',
    'Whisk the <b>25g</b> of starch into the cold liquid until smooth.',
    'Simmer over medium heat, whisking constantly, until the liquid bubbles and thickens into a glossy syrup.',
    'Pour the syrup back over the apples and toss until evenly coated.',
  ]],
  ['Assemble the lattice', [
    'Pour the coated apple filling into the <em>cooled</em> par-baked bottom crust{s}. Scatter the <b>15g</b> cold, cubed butter over the fruit.',
    'Roll out the remaining dough disk{s} and cut into strips.',
    'Because the bottom rim is already baked and set, brush a generous layer of egg wash directly onto the par-baked crimped edge. This acts as your glue.',
    'Weave the lattice over the filling. Trim the ends of the strips so they sit flush with the inner edge of the crimp. Press the strip ends firmly into the egg-washed rim to adhere them.',
    'Brush the lattice strips evenly with the remaining egg wash.',
  ]],
  ['Final bake', [
    'Reduce your oven temperature to 375°F (190°C). Place a baking sheet on the lower rack.',
    'Bake for <b>45 to 55 minutes</b>. Since the bottom crust and edges already have a head start, you may need to apply a foil ring or pie shield to the edges after 15–20 minutes to prevent burning.',
    '<span class="flag">Doneness</span> The pie is done when the filling is actively bubbling up through the lattice and the raw lattice strips are golden brown.',
    'Let cool completely on a wire rack for <b>3 to 4 hours</b> before slicing.',
  ]],
];

const theme = {
  light: { bg: '#faf5ef', paper: '#fffdfa', fg: '#2c211d', mut: '#7a6a62', line: '#ece0d6', accent: '#a8392b', soft: '#f5dfd8', done: '#b5a79e' },
  dark: { bg: '#16110f', paper: '#1e1715', fg: '#efe5df', mut: '#a5968e', line: '#352925', accent: '#e8735f', soft: '#3d201b', done: '#6d615b' },
  qw: '5.2em',
};

const page = () => R.page({
  title: 'Bourbon Apple Lattice Pie',
  theme,
  key: 'applepie-checks',
  servings: 1,
  body: `${R.hero({
    path: 'apple-pie',
    eyebrow: 'Pie &middot; 9-inch lattice',
    title: 'Spiced Bourbon Triple-Apple Lattice&nbsp;Pie',
    lede: 'Pink Lady, Gala, and Honeycrisp apples macerated with bourbon and cardamom, their juices thickened into a glossy syrup under a woven lattice. The bottom crust is par-baked first so it sets before the filling goes in.',
    facts: [
      ['Makes', R.serves(1, 'pie')],
      ['Par-bake', '220°C &middot; ~20 min'],
      ['Macerate', '30–45 min'],
      ['Bake', '190°C &middot; 45–55 min'],
      ['Cool', '3–4 h'],
    ],
  })}
${R.toc([['mise', 'Mise en place'], ['ingredients', 'Ingredients'], ['method', 'Method']])}
<main class="wrap">
  <h2 id="mise">Advance prep</h2>${R.mise(mise)}
  <h2 id="ingredients">Ingredients <small>by weight</small></h2>${R.ingredients(ingredients)}
  <h2 id="method">Method</h2>${R.method(method)}
</main>`,
});

export function handleApplePie() {
  return R.respond(page());
}
