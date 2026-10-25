// Recipe page at /pumpkin-pie. Public.

import * as R from '../recipe.js';

const mise = [
  ['Ceramic pan release &amp; bottom heat', 'Coat ceramic pie dishes with softened butter. Position a heavy baking stone or sheet on the lowest rack during preheat to drive immediate conductive heat through the ceramic base.'],
  ['Enzyme inactivation prep', 'Keep fresh ginger frozen solid so it microplanes without peeling. It must be simmered in the purée above 70°C (158°F) to denature the <em>zingibain</em> protease enzyme that breaks down custard proteins.'],
  ['Purée reduction target', 'Set your digital kitchen scale next to the cooktop. The combined purée must be reduced in a wide skillet until a dragged spatula leaves a clean, dry trail and the total mass reaches exactly <b>900g</b>.'],
  ['Pastry temperature control', 'Cut butter into 1 cm cubes and chill in the freezer for 10–15 minutes. Mix ice water and vinegar with ice cubes to keep the liquid below 4°C (40°F).'],
  ['Spice processing', 'Grate whole nutmeg using a Microplane. Crush whole cloves in a mortar and pestle, then pass through a fine-mesh tea strainer to discard woody stems.'],
];

const ingredients = [
  ['All-butter crust', 'One 9-inch / 23 cm shell per pie', [
    ['225g', 'all-purpose flour', '~11.5% protein'],
    ['155g', 'unsalted butter', 'cold, cubed into 1 cm pieces'],
    ['4g', 'fine sea salt'],
    ['8g', 'granulated sugar'],
    ['70g', 'ice water'],
    ['7g', 'apple cider vinegar'],
    ['10g', 'softened butter', 'for greasing; 5g per dish'],
    ['1200–1600g', 'uncooked dry rice', '600–800g per shell, for blind baking'],
  ]],
  ['Produce foundation', '', [
    ['850g', 'raw sugar pie pumpkin or kabocha', 'approx. <b>1</b> medium squash'],
    ['600g', 'raw orange sweet potatoes / Garnet yams', 'approx. <b>2</b> medium'],
    ['8g', 'frozen fresh ginger root', 'unpeeled, finely microplaned'],
  ]],
  ['Spiced custard filling', '', [
    ['900g', 'concentrated pumpkin &amp; sweet potato purée', 'reduced 1:1 blend; 450g per pie'],
    ['260g', 'dark brown sugar'],
    ['100g', 'granulated sugar'],
    ['8g', 'ground cinnamon'],
    ['3g', 'ground dried ginger'],
    ['2g', 'freshly grated whole nutmeg', 'via Microplane'],
    ['1g', 'freshly ground whole cloves', 'mortar-crushed and sifted'],
    ['6g', 'fine sea salt'],
    ['360g', 'heavy cream', '36% milk fat'],
    ['180g', 'whole milk'],
    ['200g', 'whole eggs', 'approx. <b>4</b> large'],
    ['54g', 'egg yolks', 'approx. <b>3</b> large'],
    ['10g', 'pure vanilla extract'],
    ['30g', 'straight bourbon whiskey'],
  ], 'tall-r'],
];

const method = [
  ['Produce preparation &amp; roasting', [
    'Position a rack in the center of the oven and preheat to 200°C (400°F). Line a large, rimmed baking sheet with parchment paper.',
    'Place <b>850g</b> raw pumpkin upright on a cutting board, halve vertically with a heavy chef’s knife, and scrape out all seeds and stringy pulp with a spoon.',
    'Wash <b>600g</b> sweet potatoes and pierce each potato 6–8 times across the surface with a fork to vent internal steam.',
    'Arrange the pumpkin halves cut-side down on the parchment paper. Place the pierced sweet potatoes beside them.',
    'Roast at 200°C (400°F) for 45–55 minutes until the pumpkin collapses and a paring knife glides through the thickest part of the sweet potatoes with zero resistance.',
    'Remove from the oven and rest for 10–15 minutes until cool enough to handle.',
  ]],
  ['Purée emulsification &amp; stovetop reduction', [
    'Scoop the soft pumpkin flesh out of its skin into a bowl. Peel the skins off the sweet potatoes and discard the peel.',
    'Transfer the roasted pumpkin flesh and sweet potato flesh into a food processor or blender. Process on high for 2 minutes until glossy and silky.',
    'Tare a wide skillet on your digital kitchen scale, transfer the blended purée into it, and record the starting weight.',
    'Microplane <b>8g</b> frozen fresh ginger root directly into the purée.',
    'Set the skillet over medium-low heat. Cook for 12–18 minutes, stirring continuously with a silicone spatula across the bottom and sides to drive off water vapor and deactivate the ginger’s <em>zingibain</em> enzyme.',
    'Continue simmering until dragging a spatula leaves an open, dry trail on the pan floor that does not immediately fill with liquid. Return the skillet to the scale periodically until the purée registers exactly <b>900g</b>. Remove from heat and cover.',
  ]],
  ['All-butter crust fabrication', [
    'In a large bowl, whisk together <b>225g</b> all-purpose flour, <b>4g</b> fine sea salt, and <b>8g</b> granulated sugar.',
    'Add <b>155g</b> cold, cubed butter. Using clean fingers, press and slide each butter cube to flatten it into a thin, nickel-sized flake coated in flour. Do not break down past this sheeted stage.',
    'Whisk together <b>70g</b> ice water and <b>7g</b> apple cider vinegar. Drizzle half over the flour and toss with a fork. Add the remainder and toss until large, shaggy clumps form with no dry flour remaining at the base of the bowl.',
    'Divide the dough into equal portions of roughly 230g, one per pie. Compress each firmly into a 2 cm thick flat disc, wrap tightly in plastic wrap, and refrigerate for at least 2 hours (or up to 48 hours).',
  ]],
  ['Par-baking the shells', [
    'Place a heavy baking stone or heavy rimmed baking sheet on the <b>lowest rack</b> of your oven. Preheat the oven to 190°C (375°F).',
    'Grease the interior floors and fluted sides of <b>2</b> 9-inch ceramic pie dish{es} with <b>10g</b> softened butter (5g per dish).',
    'On a lightly floured surface, roll one chilled dough disc from the center outward, rotating 45 degrees between passes, to a 30 cm (12-inch) round roughly 3 mm thick.',
    'Roll the pastry around your rolling pin and unroll over the greased dish. Ease the dough into the corners without stretching. Trim overhang to 1.5 cm, tuck the rim under itself, and crimp the perimeter. Repeat with the remaining dough.',
    'Freeze the shaped shells for 25 minutes until the butter is rigid.',
    'Line each frozen shell with a crumpled, smoothed sheet of parchment paper. Fill each completely to the brim with 600–800g uncooked dry rice.',
    'Place the dishes directly onto the preheated baking stone/sheet on the lowest rack.',
    'Bake at 190°C (375°F) for 20 minutes until the crimped edges feel firm and dry. Gather the parchment corners and lift out the rice.',
    'Return the uncovered shells directly to the stone/sheet on the lowest rack for 8–10 minutes, until the bottom floor turns matte, dry, and pale golden. Transfer to wire racks to cool completely.',
  ]],
  ['Custard emulsification', [
    'Lower the oven temperature to 165°C (325°F) and position the baking sheet on the lower-middle rack.',
    'Transfer the <b>900g</b> warm purée (sitting below 40°C / 105°F) to your stand mixer bowl fitted with the flat paddle attachment.',
    'Add <b>260g</b> dark brown sugar, <b>100g</b> granulated sugar, <b>8g</b> ground cinnamon, <b>3g</b> ground dried ginger, <b>2g</b> freshly grated nutmeg, <b>1g</b> sifted ground cloves, and <b>6g</b> fine sea salt.',
    'Mix on <b>Stir / Speed 1</b> for 2 minutes until glossy and the sugar crystals dissolve completely.',
    'With the mixer running on low, add <b>360g</b> heavy cream and <b>180g</b> whole milk. Mix for 45 seconds until combined, then scrape down the bowl sides and paddle.',
    'In a separate bowl, whisk together <b>200g</b> whole eggs, <b>54g</b> egg yolks, <b>10g</b> pure vanilla extract, and <b>30g</b> straight bourbon whiskey until homogeneous. Do not whip air into the eggs.',
    'With the mixer running on <b>Stir / Speed 1</b>, stream the egg mixture into the purée base in a steady pour. Mix for 30–45 seconds just until incorporated and uniform.',
    'Set a fine-mesh sieve over the cooled pie shells and divide the custard evenly between them (approx. 940–950g custard per pie), catching any chalazae or stray fibers.',
    'Pop any surface bubbles using the corner of a clean paper towel or a rapid sweep of a culinary torch.',
  ]],
  ['Baking &amp; stabilization', [
    'Place the filled pies onto the baking sheet on the lower-middle rack.',
    'Bake at 165°C (325°F) for <b>55 to 65 minutes</b>.',
    '<span class="flag">Doneness</span> Check at 55 minutes. The edges of the custard should be puffed and matte, while a 5 cm (2-inch) center ring maintains a gentle, gelatin-like wobble when the pan is nudged. Insert a digital probe thermometer into the center; pull the pies when the internal temperature reads <b>79°C–81°C (175°F–178°F)</b>.',
    'Cool the pies in their dishes on wire racks at room temperature for <b>3 full hours</b> to let carryover heat set the custard without surface cracking.',
    'Transfer to the refrigerator for at least <b>3 hours</b> (preferably overnight) to firm the starches and fats completely. Slice using a thin chef’s knife dipped in hot water and wiped dry between cuts.',
  ]],
];

const variations = [
  ['Shiro miso &amp; brown butter', 'Replace <b>60g</b> of the heavy cream with <b>80g</b> browned unsalted butter (foamed and cooked until milk solids turn dark amber). Whisk <b>40g</b> white (shiro) miso into the warm purée during step 5.3, omitting the <b>6g</b> fine sea salt to maintain salinity balance.'],
  ['Thai red curry &amp; coconut milk', 'Replace <b>360g</b> heavy cream and <b>180g</b> whole milk entirely with <b>540g</b> full-fat canned coconut milk (both cream and liquid). Sauté <b>20g</b> Thai red curry paste directly into the vegetable purée during the stovetop reduction in step 2.5, and whisk <b>4g</b> microplaned fresh makrut lime zest into the custard base.'],
];

const theme = {
  light: { bg: '#fbf6ee', paper: '#fffdf9', fg: '#2d241c', mut: '#7a6c5d', line: '#eadfce', accent: '#c4602b', soft: '#f6e3d3', done: '#b3a796' },
  dark: { bg: '#16120d', paper: '#1e1913', fg: '#efe6d8', mut: '#a3968a', line: '#332a20', accent: '#e9884f', soft: '#3a2617', done: '#6b6157' },
  qw: '5.6em',
};

const page = () => R.page({
  title: 'Pumpkin &amp; Sweet Potato Pie',
  theme,
  key: 'pumpkin-checks',
  servings: 2,
  body: `${R.hero({
    path: 'pumpkin-pie',
    eyebrow: 'Custard pie &middot; 9-inch',
    title: 'Roasted Pumpkin &amp; Sweet&nbsp;Potato&nbsp;Pie',
    lede: 'Roasted sugar pumpkin and sweet potato in an exact 1:1 ratio. The custard is calibrated with reduced free milk water and an extra egg yolk for a firm, clean-slicing set without weeping. The all-butter crust is par-baked on a preheated steel over buttered ceramic for a fully crisped floor.',
    facts: [
      ['Makes', R.serves(2, 'pie')],
      ['Roast', '200°C &middot; 45–55 min'],
      ['Par-bake', '190°C &middot; ~30 min'],
      ['Bake', '165°C &middot; 55–65 min'],
      ['Pull at', '79–81°C <span style="white-space:nowrap">(175–178°F)</span>'],
      ['Rest', '3 h room + 3 h cold'],
    ],
  })}
${R.toc([['mise', 'Mise en place'], ['ingredients', 'Ingredients'], ['method', 'Method'], ['variations', 'Variations']])}
<main class="wrap">
  <h2 id="mise">Advance prep</h2>${R.mise(mise)}
  <h2 id="ingredients">Ingredients <small>by weight</small></h2>${R.ingredients(ingredients)}
  <h2 id="method">Method</h2>${R.method(method)}
  <h2 id="variations">Fusion variations</h2>${R.variations(variations)}
</main>`,
});

export function handlePumpkin() {
  return R.respond(page());
}
