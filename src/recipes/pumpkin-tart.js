// Recipe page at /pumpkin-tart. Public. Four components, so it opens with
// the tripping points and closes with a timeline checklist.

import * as R from '../recipe.js';

// [title, trip point, consequence, fix]
const trips = [
  ['Pâte sucrée temperature &amp; gluten',
    'Overworking the flour, or working with butter that is too warm (above 21°C / 70°F).',
    'The pastry shrinks down the sides of the tart ring during baking and loses its crisp, short texture.',
    'Cream the butter and sugar only until combined. Once the flour is in, stop mixing the second the dough comes together. Honor both chilling stages: 1 hour after rolling, 30 minutes after lining the ring.'],
  ['Kabocha thickness &amp; poaching window',
    'Mandoline slices thicker than 1.5 mm, or poached longer than 90 seconds.',
    'Slices thicker than 1.5 mm snap when bent into the rosette. Over-poached slices turn to mush and tear when shingled.',
    'Test one slice on the mandoline first. Poach in batches for exactly 60 to 90 seconds: the slice should bend across your finger without cracking and stay translucent, not soft.'],
  ['Custard fill line',
    'Filling the pre-baked shell to the brim with custard.',
    'No clearance is left for the kabocha or the gelée, and liquid runs off over the crust rim.',
    'Fill the shell strictly two-thirds full, leaving 3–4 mm of clearance below the top rim.'],
  ['Gelée pouring temperature',
    'Pouring the maple gelée while it is still warm (above 28°C / 82°F).',
    'The hot syrup melts the custard surface, clouds the gelée with fat, and dislodges the rosette.',
    'Cool the gelée to 24–26°C (75–78°F). It should feel cool to the touch and slightly viscous before you pour it gently over the back of an inverted spoon.'],
];

const mise = [
  ['Pastry butter', 'Cut <b>125g</b> unsalted butter into cubes. Leave at room temperature until pliable (18–20°C / 64–68°F), but not shiny or melting.'],
  ['Pumpkin straining', 'If using canned or freshly made purée, let <b>300g</b> pumpkin purée rest in a fine-mesh sieve lined with cheesecloth or a paper towel for 15 minutes to drain off loose liquid.'],
  ['Kabocha prep', 'Halve a whole kabocha squash. Scoop out the seeds and fibers. Peel the dark green skin completely with a sharp Y-peeler, leaving only vibrant orange flesh. Slice into flat wedges matching the width of your mandoline blade.'],
  ['Egg weighing', 'Whisk whole eggs and separate yolks to measure exactly <b>50g</b> beaten egg for the dough, <b>100g</b> whole egg for the filling, and <b>1</b> yolk (~18g) for the filling.'],
];

const ingredients = [
  ['Sweet pastry', 'Pâte sucrée &middot; makes two discs, one to freeze', [
    ['125g', 'unsalted butter', 'pliable, 19°C'],
    ['80g', 'icing sugar', 'sifted'],
    ['30g', 'ground almonds', 'almond flour'],
    ['50g', 'beaten whole egg'],
    ['250g', 'plain all-purpose flour'],
    ['2g', 'fine sea salt'],
  ]],
  ['Spiced pumpkin custard', '', [
    ['300g', 'pumpkin purée', 'drained'],
    ['100g', 'double cream', 'or heavy cream, 36–40% fat'],
    ['80g', 'light brown sugar'],
    ['100g', 'whole egg'],
    ['1', 'large egg yolk{s}', '~18g each'],
    ['15g', 'cornflour', 'cornstarch'],
    ['5g', 'vanilla bean paste'],
    ['1.5g', 'ground cinnamon'],
    ['1g', 'ground ginger'],
    ['0.5g', 'ground nutmeg'],
    ['2g', 'fine sea salt'],
  ], 'tall-r'],
  ['Poached kabocha rosette', '', [
    ['200g', 'kabocha squash flesh', 'peeled and seeded'],
    ['200g', 'water'],
    ['50g', 'pure maple syrup'],
    ['50g', 'granulated sugar'],
    ['10g', 'fresh lemon juice'],
  ]],
  ['Maple gelée glaze', '', [
    ['150g', 'pure maple syrup', 'Grade A amber or dark'],
    ['50g', 'water'],
    ['4g', 'sheet gelatin (gold grade) or powdered gelatin'],
    ['25g', 'cold water', 'for blooming powder, if using'],
  ]],
  ['Equipment', '', [
    ['', 'KitchenAid stand mixer', 'paddle attachment; creams the dough without aerating it'],
    ['', 'Samsung electric range', 'stable simmering and oven temperature'],
    ['', 'Perforated tart ring', '8-inch (20 cm), 2–2.5 cm deep; the perforations let steam escape for crisp, straight walls'],
    ['', 'Japanese mandoline', 'set to 1.0–1.5 mm, with the hand guard'],
    ['', 'Cuisinart 3-quart sauté pan', 'wide enough to poach the squash in a single layer'],
    ['', 'Cuisinart 1.5-quart saucepan', 'for the gelée'],
    ['', 'Fine-mesh sieve (chinois)', 'strains air pockets and fibers from the custard'],
    ['', 'Wire cooling racks', 'cool the crust without condensation'],
    ['', 'Digital gram scale'],
    ['', 'Instant-read thermometer', 'crucial for the gelée pouring point'],
  ]],
];

const method = [
  ['Sweet pastry <small>pâte sucrée</small>', [
    'In the KitchenAid bowl with the paddle attachment, cream <b>125g</b> unsalted butter and <b>80g</b> sifted icing sugar on speed 2 for 90 seconds until smooth and homogeneous.',
    'Add <b>30g</b> ground almonds and <b>50g</b> beaten whole egg. Mix on speed 2 until emulsified, roughly 30 seconds.',
    'Add <b>250g</b> plain flour and <b>2g</b> fine sea salt. Mix on speed 1 just until the flour is incorporated and a dough forms. <span class="flag">Watch</span>Do not knead.',
    'Turn out onto parchment and divide into <b>2</b> equal portions (~268g each). Shape into flat discs, and freeze one disc per tart for future use.',
    'Place the remaining dough between two sheets of baking parchment. Roll evenly to <b>2.5 mm</b> using guide rings.',
    'Transfer the rolled sheet on a flat tray to the refrigerator and chill for <b>60 minutes</b>.',
    'Lightly butter the 8-inch (20 cm) perforated tart ring{s} and place on a baking sheet lined with a silicone mat or parchment. Cut the base circle and side strips (or press the sheet into the ring), trimming the excess flush with the top edge using a paring knife angled outward.',
    'Chill the lined ring{s} in the refrigerator for <b>30 minutes</b>.',
    'Preheat the oven to 160°C (320°F).',
    'Bake the shell{s} for <b>20 to 25 minutes</b> until light golden-brown and dry to the touch; a perforated ring needs no pie weights. Cool completely on a wire rack.',
  ]],
  ['Spiced pumpkin custard', [
    'In a medium mixing bowl, whisk together <b>300g</b> drained pumpkin purée, <b>100g</b> double cream, <b>80g</b> light brown sugar, <b>100g</b> whole egg, <b>1</b> egg yolk{s} (~18g each), <b>15g</b> cornflour, <b>5g</b> vanilla bean paste, <b>1.5g</b> ground cinnamon, <b>1g</b> ground ginger, <b>0.5g</b> ground nutmeg, and <b>2g</b> fine sea salt until smooth.',
    'Pass the custard through a fine-mesh sieve into a measuring pitcher with a pouring spout. Tap the pitcher against the counter to release trapped air bubbles.',
    'Pour the custard into the cooled shell{s} until it sits <b>3–4 mm</b> below the top edge, approximately two-thirds full.',
    'Reduce the oven to 150°C (300°F).',
    'Bake for <b>25 to 35 minutes</b>. <span class="flag">Doneness</span> Check at 25 minutes: the edges must be set while the center 2 inches show a gentle, uniform wobble when nudged.',
    'Cool completely on a wire rack, about 1 hour, then refrigerate for <b>45 minutes</b> to firm the custard surface.',
  ]],
  ['Poached kabocha rosette', [
    'Set the mandoline to 1.0 mm (maximum 1.5 mm). Using the safety guard, slice <b>200g</b> of the prepared kabocha wedges into thin, flexible crescents.',
    'In the 3-quart sauté pan, combine <b>200g</b> water, <b>50g</b> maple syrup, <b>50g</b> granulated sugar, and <b>10g</b> lemon juice over medium heat. Bring to a gentle simmer (85–90°C / 185–194°F) until the sugars dissolve.',
    'Working in batches of about a third at a time, lower the kabocha slices into the simmering liquid. Poach for <b>60 to 90 seconds</b> until flexible and semi-translucent.',
    'Remove immediately with a spider strainer or slotted spoon. Lay the slices flat in a single layer on parchment or wire racks to cool and drain. <span class="flag">Watch</span>Do not stack hot slices.',
    'Retrieve the chilled tart. Starting at the outer crust wall, lay poached slices overlapping by half their width in a ring, curved edge facing outward.',
    'Create a second concentric ring overlapping the first, working inward.',
    'For the center, overlap 2 small, pliable slices end-to-end, roll tightly into a small spiral bud, and insert into the center void.',
    'Return the assembled tart to the refrigerator for <b>20 minutes</b> to chill the squash layer.',
  ]],
  ['Maple gelée glaze', [
    'Submerge <b>4g</b> gelatin sheets in ice-cold water for 5 to 7 minutes until soft (or hydrate <b>4g</b> powdered gelatin in <b>25g</b> cold water for 5 minutes).',
    'In the 1.5-quart saucepan, combine <b>150g</b> maple syrup and <b>50g</b> water. Heat over low to 60°C (140°F): steaming, but not boiling.',
    'Remove from the heat. Squeeze the excess water from the sheets (or add the bloomed gelatin mass) and whisk into the warm maple liquid until dissolved.',
    'Let it cool at room temperature, monitoring with the thermometer until it reaches <b>24–26°C (75–78°F)</b>.',
    'Invert a soup spoon just above the center of the chilled kabocha layer. Slowly pour the cooled gelée over the back of the spoon so it cascades gently over the squash without disturbing the rosette. Fill flush to the crust rim.',
    'Transfer carefully to the refrigerator and chill undisturbed for at least <b>2 hours</b>, until the gelée sets to a firm, glassy finish. Slice with a hot, dry chef’s knife.',
  ]],
];

const variations = [
  ['Chai &amp; black cardamom', 'Steep <b>2</b> crushed black cardamom pods, <b>4</b> green cardamom pods, and <b>5g</b> Assam black tea in the <b>100g</b> double cream at 80°C for 20 minutes. Strain, re-weigh to <b>100g</b> (topping off with fresh cream if absorbed), and whisk into the pumpkin custard.'],
  ['Toasted black sesame pâte', 'Replace the <b>30g</b> ground almonds in the pastry with <b>30g</b> finely milled toasted black sesame seeds. Whisk <b>10g</b> toasted sesame paste (neri goma) into the custard base for deep nutty bitterness against the sweet maple.'],
  ['Bourbon &amp; charred orange gelée', 'Substitute <b>20g</b> of the water in the maple gelée with <b>20g</b> high-proof bourbon, and add the finely pared zest of half an orange while warming; strain before pouring.'],
];

// Counted back from slicing, using the step durations: dough chill 60 min,
// ring chill 30, shell bake 25 + cool 30, custard bake 35 + cool 60 + chill
// 45, rosette chill 20, gelée cool ~30, set 120.
const timeline = [
  ['T−8:30', 'Advance prep: cube the butter and leave it out to soften; drain the pumpkin purée; peel and wedge the kabocha; weigh the eggs.'],
  ['T−7:45', 'Cream the dough and roll it between parchment to 2.5 mm; chill 60 min.'],
  ['T−6:30', 'Line the perforated ring; chill 30 min. Preheat the oven to 160°C.'],
  ['T−5:45', 'Bake the shell for 20–25 min, then cool completely on a wire rack, about 30 min.'],
  ['T−5:05', 'While the shell cools, whisk and strain the custard. Lower the oven to 150°C.'],
  ['T−4:50', 'Fill the shell two-thirds full; bake for 25–35 min until the center has a slight wobble.'],
  ['T−4:15', 'Cool the tart on a wire rack, about 1 hour.'],
  ['T−3:45', 'While it cools, slice the kabocha to 1.0–1.5 mm; poach 60–90 s per batch in the maple bath; cool flat.'],
  ['T−3:15', 'Refrigerate the tart 45 min to firm the custard surface.'],
  ['T−2:45', 'Bloom the gelatin; warm the maple liquid to 60°C; let it cool toward 24–26°C, about 30 min.'],
  ['T−2:30', 'Shingle the kabocha rosette over the chilled custard; return to the fridge for 20 min.'],
  ['T−2:00', 'Pour the cooled gelée over an inverted spoon to the pastry rim; chill undisturbed at least 2 hours.'],
  ['T−0', 'Slice with a hot, dry chef’s knife.'],
];

const renderTrips = () => `
<div class="vars trips">${trips.map(([t, trip, cons, fix], i) => `
<div class="var"><h3><span class="tn">${i + 1}</span>${t}</h3><dl>
  <dt>Trip point</dt><dd>${trip}</dd>
  <dt>Consequence</dt><dd>${cons}</dd>
  <dt>Fix</dt><dd>${fix}</dd>
</dl></div>`).join('')}
</div>`;

const theme = {
  light: { bg: '#faf7ee', paper: '#fffdf7', fg: '#2a2516', mut: '#776d55', line: '#ebe3cc', accent: '#8f6a0e', soft: '#f3e9c6', done: '#b3aa90' },
  dark: { bg: '#14120b', paper: '#1c1a11', fg: '#efe9d6', mut: '#a59c84', line: '#322d1d', accent: '#e3b94a', soft: '#382e12', done: '#6b6450' },
  extra: `
.stage h3 small{font:500 .8rem/1 var(--sans);color:var(--mut);letter-spacing:.04em;font-style:italic}
.trips h3{display:flex;align-items:center;gap:10px}
.trips .tn{flex:none;width:26px;height:26px;border-radius:50%;background:var(--accent-soft);color:var(--accent);display:grid;place-content:center;font:600 .85rem/1 var(--sans)}
.trips dl{margin:0;font-size:.94rem}
.trips dt{font:700 .7rem/1 var(--sans);letter-spacing:.1em;text-transform:uppercase;color:var(--accent);margin:12px 0 4px}
.trips dt:first-child{margin-top:0}
.trips dd{margin:0}
.lead-in{font:1.05rem/1.6 var(--serif);color:var(--mut);max-width:62ch;margin:-4px 0 20px}`,
};

const page = () => R.page({
  title: 'Pumpkin Kabocha Tart',
  theme,
  key: 'pumpkintart-checks',
  servings: 1,
  body: `${R.hero({
    path: 'pumpkin-tart',
    eyebrow: 'Tart &middot; four components',
    title: 'Spiced Pumpkin Tart with Poached Kabocha &amp; Maple&nbsp;Gelée',
    lede: 'A multi-texture autumn tart in four parts: an almond-enriched pâte sucrée shell, a velvety spiced pumpkin custard, a concentric rosette of thinly shaved, poached kabocha, and a crystal-clear maple gelée that seals the surface.',
    facts: [
      ['Makes', R.serves(1, 'tart')],
      ['Shell', '160°C &middot; 20–25 min'],
      ['Custard', '150°C &middot; 25–35 min'],
      ['Poach', '60–90 s per batch'],
      ['Pour gelée at', '24–26°C <span style="white-space:nowrap">(75–78°F)</span>'],
      ['Set', '2 h chill'],
      ['Start', '~8½ h before slicing'],
    ],
  })}
${R.toc([['trips', 'Tripping points'], ['mise', 'Prep'], ['ingredients', 'Ingredients'], ['method', 'Method'], ['variations', 'Variations'], ['timeline', 'Timeline']])}
<main class="wrap">
  <h2 id="trips">Tripping points <small>read first</small></h2>${renderTrips()}
  <h2 id="mise">Advance prep</h2>${R.mise(mise)}
  <h2 id="ingredients">Ingredients <small>by weight</small></h2>${R.ingredients(ingredients)}
  <h2 id="method">Method</h2>${R.method(method)}
  <h2 id="variations">Fusion variations</h2>${R.variations(variations)}
  <h2 id="timeline">Timeline <small>checklist</small></h2>
  <p class="lead-in">Times count back from when you want to slice. Most of the 8½ hours is hands-off chilling and cooling.</p>${R.mise(timeline, 'tl')}
</main>`,
});

export function handlePumpkinTart() {
  return R.respond(page());
}
