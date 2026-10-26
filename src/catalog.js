// Every public recipe: its path, index card copy, #tags, and pairings.
// Pages render their own tags and "Pairs with" links from here, and the router
// in home.js maps each path to its page. `was` is the recipe's old one-word
// path, kept as a redirect so links shared before the rename still work.
//
// accent: [light, dark], matching each page's own palette. A side shares the
// palette of the main it was split from.

export const catalog = [
  {
    path: 'beef-birria', was: 'birria', accent: ['#9b2226', '#ef6f6c'],
    kind: 'Braise &middot; three days',
    title: 'Cocoa-Infused Beef Birria',
    blurb: 'Chuck and short ribs marinated for 24 hours in a cocoa-chile adobo, then braised low into a rich consommé. Serve it as quesabirria tacos, ramen, or smothered biscuits.',
    meta: ['2.18 kg beef', '107°C &middot; 5–6 h'],
    tags: ['main', 'beef', 'mexican', 'braise'],
    pairs: ['quesadilla-strips'],
  },
  {
    path: 'birria-ramen', was: 'birriaramen', accent: ['#3f7d4e', '#7cc48d'],
    kind: 'Ramen &middot; leftovers',
    title: 'Birria Ramen Fusion',
    blurb: 'Leftover birria in a tallow-bloomed consommé rebuilt from scratch, over jajangmyeon noodles with a soft ajitama, bok choy, and pickled greens.',
    meta: ['Two bowls', '10 min consommé'],
    tags: ['main', 'beef', 'noodles', 'leftovers'],
    pairs: ['quesadilla-strips'],
  },
  {
    path: 'quesadilla-strips', accent: ['#3f7d4e', '#7cc48d'],
    kind: 'Side &middot; air fryer',
    title: 'Oaxaca Quesadilla Strips',
    blurb: 'Corn tortillas and Oaxaca cheese air-fried until crisp, then cut into thick strips for dipping into consommé.',
    meta: ['Two quesadillas', '190°C &middot; 4–5 min'],
    tags: ['side', 'mexican', 'air-fryer'],
  },
  {
    path: 'butternut-soup', was: 'butternut', accent: ['#6b7320', '#b5c060'],
    kind: 'Soup',
    title: 'Thai Red Curry Butternut Squash Soup',
    blurb: 'Butternut squash simmered in coconut milk and toasted red curry paste, blended velvety and finished with fish sauce and lime.',
    meta: ['800g squash', '20–25 min simmer'],
    tags: ['main', 'soup', 'thai', 'fall'],
    pairs: ['lemongrass-drumsticks', 'chili-flatbread'],
  },
  {
    path: 'lemongrass-drumsticks', accent: ['#6b7320', '#b5c060'],
    kind: 'Air fryer',
    title: 'Lemongrass Chicken Drumsticks',
    blurb: 'Scored drumsticks marinated in soy, fish sauce, and lemongrass, then air-fried and finished hot for crackling skin.',
    meta: ['800g drumsticks', '190°C &rarr; 200°C'],
    tags: ['main', 'chicken', 'thai', 'air-fryer'],
    pairs: ['chili-flatbread'],
  },
  {
    path: 'chili-flatbread', accent: ['#6b7320', '#b5c060'],
    kind: 'Side &middot; pizza stone',
    title: 'Chili-Garlic Mozzarella Flatbread',
    blurb: 'A quick yeasted dough stretched thin, topped with chili crisp, garlic, and mozzarella, and baked on a 260°C stone.',
    meta: ['Two flatbreads', '260°C &middot; 6–8 min'],
    tags: ['side', 'bread', 'baking'],
  },
  {
    path: 'chicken-thighs', was: 'chicken', accent: ['#2f6f73', '#6cc0c4'],
    kind: 'Main &middot; cast iron',
    title: 'Cast-Iron Seared Chicken Thighs',
    blurb: 'Thighs started skin-down in a cold pan for thin, crackling skin, then butter-basted with thyme and garlic and finished in the oven.',
    meta: ['Two plates', '200°C &middot; 10–12 min'],
    tags: ['main', 'chicken', 'cast-iron'],
    pairs: ['green-beans', 'roasted-asparagus'],
  },
  {
    path: 'green-beans', accent: ['#2f6f73', '#6cc0c4'],
    kind: 'Side &middot; stovetop',
    title: 'Blistered Green Beans',
    blurb: 'Green beans seared hard in a hot skillet until charred in spots, then finished off the heat with garlic and lemon zest.',
    meta: ['Two plates', '5–6 min'],
    tags: ['side', 'vegetables'],
  },
  {
    path: 'filet-mignon', was: 'filet', accent: ['#7b2d4f', '#e07aa6'],
    kind: 'Main &middot; reverse sear',
    title: 'Reverse-Sear Filet Mignon',
    blurb: 'Dry-brined filets roasted low to an even pink, then hard-seared and butter-basted, with a red wine pan reduction.',
    meta: ['Two plates', '120°C &middot; 25–35 min'],
    tags: ['main', 'beef', 'steak'],
    pairs: ['roasted-asparagus', 'green-beans'],
  },
  {
    path: 'roasted-asparagus', accent: ['#7b2d4f', '#e07aa6'],
    kind: 'Side &middot; oven',
    title: 'Roasted Asparagus with Parmesan',
    blurb: 'Asparagus roasted gently with olive oil, salt, and pepper, then finished with lemon juice and Parmigiano-Reggiano.',
    meta: ['Two plates', '120°C &middot; 12–15 min'],
    tags: ['side', 'vegetables'],
  },
  {
    path: 'buffalo-wings', was: 'wings', accent: ['#2c5d8f', '#79aee0'],
    kind: 'Air fryer',
    title: 'Air-Fried Buffalo Wings',
    blurb: 'Wings dried overnight with salt and baking powder, air-fried until blistered, and tossed in a warm butter and hot sauce emulsion.',
    meta: ['1 kg wings', '200°C &middot; 20–25 min'],
    tags: ['main', 'chicken', 'air-fryer'],
    pairs: ['apple-slaw'],
  },
  {
    path: 'apple-slaw', accent: ['#2c5d8f', '#79aee0'],
    kind: 'Side &middot; no cook',
    title: 'Celery-Apple Slaw',
    blurb: 'Celery, Granny Smith apple, and toasted walnuts in a Dijon-mayo dressing, crisp and sharp enough to cut through rich food.',
    meta: ['400g slaw', 'No cooking'],
    tags: ['side', 'salad', 'no-cook'],
  },
  {
    path: 'chicken-parm', accent: ['#1f6b45', '#5fcf94'],
    kind: 'Sandwich &middot; air fryer',
    title: 'Air Fryer Chicken Parmesan Sandwiches',
    blurb: 'Panko-Parmesan cutlets air-fried crisp, topped with a quick crushed tomato and basil sauce and melted mozzarella on toasted Telera rolls.',
    meta: ['680g chicken', '200°C &middot; 11–12 min'],
    tags: ['main', 'chicken', 'air-fryer', 'sandwich'],
  },
  {
    path: 'apple-pie', was: 'applepie', accent: ['#a8392b', '#e8735f'],
    kind: 'Pie',
    title: 'Spiced Bourbon Triple-Apple Lattice Pie',
    blurb: 'Pink Lady, Gala, and Honeycrisp with bourbon and cardamom under a woven lattice, on a par-baked bottom crust.',
    meta: ['One 9-inch pie', '190°C &middot; 45–55 min'],
    tags: ['dessert', 'pie', 'baking', 'fall'],
  },
  {
    path: 'pumpkin-pie', was: 'pumpkin', accent: ['#c4602b', '#e9884f'],
    kind: 'Pie',
    title: 'Roasted Pumpkin &amp; Sweet Potato Pie',
    blurb: 'Roasted pumpkin and sweet potato at 1:1 in a bourbon-spiked custard, on a par-baked all-butter crust.',
    meta: ['Two 9-inch pies', '165°C &middot; 55–65 min'],
    tags: ['dessert', 'pie', 'baking', 'fall'],
  },
  {
    path: 'pumpkin-tart', was: 'pumpkintart', accent: ['#8f6a0e', '#e3b94a'],
    kind: 'Tart &middot; four components',
    title: 'Spiced Pumpkin Tart with Poached Kabocha &amp; Maple Gelée',
    blurb: 'Almond pâte sucrée, a spiced pumpkin custard, a rosette of shaved poached kabocha, and a glassy maple gelée to seal it.',
    meta: ['One 8-inch tart', '~8½ h, mostly chilling'],
    tags: ['dessert', 'tart', 'baking', 'fall'],
  },
  {
    path: 'banana-muffins', was: 'bananamuffin', accent: ['#a8651a', '#e0a246'],
    kind: 'Muffins',
    title: 'Brown Butter Banana Bread Muffins',
    blurb: 'Brown butter and a reduced banana syrup, started hot and finished lower for tall, domed tops.',
    meta: ['10–12 muffins', '218°C &rarr; 177°C'],
    tags: ['breakfast', 'baking'],
  },
];

export const byPath = new Map(catalog.map((r) => [r.path, r]));

// A pairing is listed once, on either recipe, and shows on both pages.
export const pairsOf = (path) => catalog.filter((r) => r.path !== path
  && ((r.pairs || []).includes(path) || (byPath.get(path)?.pairs || []).includes(r.path)));

export const allTags = [...new Set(catalog.flatMap((r) => r.tags))].sort();
