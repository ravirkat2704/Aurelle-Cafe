// DRAFT MENU. Names/descriptions are representative only. Prices are intentionally null until the owner approves them.
// To publish a price: set `price: 349`. To approve a signature dish: set `sig: 1`. Add `ingredients: [...]` only when verified.
import { pick } from '../config/media.js';

const cat = (id, name, kicker, tagline, pool, blurb) => ({ id, name, kicker, tagline, pool, blurb });

export const categories = [
  cat('pizza', 'Pizza', 'Chapter one', 'Baked golden, shared slowly.', 'pizza', 'From timeless classics to house favourites.'),
  cat('burgers-wraps', 'Burgers & Wraps', 'Chapter two', 'Handheld, generous, unapologetic.', 'burgers', 'Stacked fresh and made for hungry afternoons.'),
  cat('indian-main', 'Indian Main Course', 'Chapter three', 'Rich gravies and warm breads.', 'indian', 'Comfort from the tandoor and the tawa.'),
  cat('continental', 'Continental', 'Chapter four', 'Creamy, cheesy, comforting.', 'continental', 'Pasta and baked favourites.'),
  cat('chinese', 'Chinese', 'Chapter five', 'Wok-tossed and full of fire.', 'chinese', 'Indo-Chinese street classics, done properly.'),
  cat('starters', 'Starters', 'Chapter six', 'Small plates to begin with.', 'starters', 'Crisp, shareable and made for the table.'),
  cat('sizzlers', 'Sizzlers', 'Chapter seven', 'Served loud, served hot.', 'sizzlers', 'The dish that arrives with a little theatre.'),
  cat('beverages', 'Beverages', 'Chapter eight', 'Cool, bright, refreshing.', 'beverages', 'Mocktails and coolers for every mood.'),
  cat('coffee-shakes', 'Coffee & Shakes', 'Chapter nine', 'Brewed, blended, poured.', 'coffee', 'Café classics from hot to cold.'),
  cat('desserts', 'Desserts', 'Chapter ten', 'A sweet and slow finish.', 'desserts', 'Because the last bite deserves attention.'),
];

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const d = (categoryId, name, description, o = {}) => ({
  id: `${categoryId}-${slug(name)}`,
  categoryId,
  name,
  description,
  price: o.price ?? null,
  veg: true,
  spicy: o.spicy || 0,
  signature: !!o.sig,
  recommended: !!o.rec,
  tags: o.tags || [],
  ingredients: o.ingredients || null,
  image: o.img ?? 0,
});

export const menuItems = [
  d('pizza', 'Margherita Pizza', 'The timeless classic: simple, balanced and always satisfying.', { rec: 1, tags: ['cheesy'], img: 0 }),
  d('pizza', 'Signature Power Pizza', 'Our generously loaded house special, built for big appetites.', { sig: 1, tags: ['filling', 'cheesy'], img: 1 }),
  d('pizza', 'Veggie Pizza', 'A colourful garden-style pizza with fresh vegetable toppings.', { tags: ['filling'], img: 2 }),
  d('pizza', 'Farmhouse Pizza', 'Hearty, vegetable-forward and made to share.', { tags: ['filling', 'cheesy'], img: 1 }),
  d('pizza', 'Spiced Paneer Pizza', 'A bold, spiced favourite with a satisfying kick.', { spicy: 2, tags: ['spicy', 'cheesy'], img: 2 }),

  d('burgers-wraps', 'Paneer Burger', 'Crisp-edged paneer in a soft toasted bun.', { rec: 1, tags: ['filling'], img: 0 }),
  d('burgers-wraps', 'Mexican Burger', 'A lively, lightly spiced burger with southwestern character.', { spicy: 1, tags: ['spicy', 'filling'], img: 1 }),
  d('burgers-wraps', 'Veg Crunch Burger', 'Golden, crunchy and simple the way it should be.', { tags: ['filling'], img: 2 }),
  d('burgers-wraps', 'Paneer Tikka Wrap', 'Smoky tandoori flavours rolled to go.', { spicy: 1, tags: ['spicy'], img: 0 }),
  d('burgers-wraps', 'Cheese Veg Wrap', 'Warm, melty and wonderfully easy to eat.', { tags: ['cheesy'], img: 1 }),

  d('indian-main', 'Paneer Butter Masala', 'Velvety tomato gravy with soft paneer, made for naan.', { rec: 1, tags: ['filling'], img: 0 }),
  d('indian-main', 'Paneer Lababdar', 'A rich, aromatic gravy with a gentle heat.', { sig: 1, spicy: 1, tags: ['filling', 'spicy'], img: 1 }),
  d('indian-main', 'Dal Tadka', 'Slow-cooked lentils finished with a sizzling tempering.', { tags: ['filling'], img: 2 }),
  d('indian-main', 'Chur Chur Naan Platter', 'Flaky, buttery naan served in a generous platter.', { rec: 1, tags: ['filling'], img: 0 }),
  d('indian-main', 'Veg Kolhapuri', 'Bold, fiery and full of character.', { spicy: 2, tags: ['spicy', 'filling'], img: 2 }),

  d('continental', 'White Sauce Pasta', 'Creamy, comforting and generously sauced.', { tags: ['cheesy', 'filling'], img: 0 }),
  d('continental', 'Red Sauce Pasta', 'Tangy tomato sauce with a little spice.', { spicy: 1, tags: ['spicy'], img: 1 }),
  d('continental', 'Baked Veg Pasta', 'Oven-finished until bubbling and golden.', { tags: ['cheesy', 'filling'], img: 2 }),
  d('continental', 'Cheesy Garlic Bread', 'Warm, garlicky and impossible to stop at one.', { tags: ['cheesy'], img: 1 }),
  d('continental', 'Mac & Cheese', 'Pure, creamy comfort in a bowl.', { tags: ['cheesy', 'filling'], img: 0 }),

  d('chinese', 'Veg Fried Rice', 'Wok-tossed rice with a smoky finish.', { tags: ['filling'], img: 0 }),
  d('chinese', 'Hakka Noodles', 'Classic, glossy and just right with a side of gravy.', { tags: ['filling'], img: 1 }),
  d('chinese', 'Veg Manchurian', 'Crisp dumplings in a tangy, savoury sauce.', { spicy: 1, rec: 1, tags: ['spicy'], img: 2 }),
  d('chinese', 'Schezwan Noodles', 'Fiery, aromatic and not for the timid.', { spicy: 2, tags: ['spicy', 'filling'], img: 1 }),
  d('chinese', 'Veg Spring Rolls', 'Golden rolls with a crisp, light shell.', { tags: [], img: 2 }),

  d('starters', 'Paneer Tikka', 'Char-grilled and gently spiced, the way a starter should be.', { rec: 1, spicy: 1, tags: ['spicy'], img: 0 }),
  d('starters', 'Crispy Corn', 'Crunchy kernels tossed with seasoning.', { tags: [], img: 1 }),
  d('starters', 'Loaded Nachos', 'Crunchy chips piled with warm, cheesy toppings.', { tags: ['cheesy'], img: 2 }),
  d('starters', 'French Fries', 'Golden, hot and salted just so.', { tags: [], img: 0 }),
  d('starters', 'Hara Bhara Kebab', 'Soft inside, crisp outside, full of green flavour.', { tags: [], img: 1 }),

  d('sizzlers', 'Veg Sizzler', 'Arrives hissing and fragrant on a hot platter.', { sig: 1, tags: ['filling'], img: 0 }),
  d('sizzlers', 'Paneer Sizzler', 'A substantial platter built around paneer.', { tags: ['filling'], img: 1 }),
  d('sizzlers', 'Oriental Sizzler', 'Indo-Chinese flavours on a sizzling plate.', { spicy: 1, tags: ['spicy', 'filling'], img: 2 }),

  d('beverages', 'Virgin Mojito', 'Cool mint and lime, shaken and poured over ice.', { rec: 1, tags: ['refreshing'], img: 0 }),
  d('beverages', 'Blue Lagoon', 'A bright, citrusy mocktail that looks as good as it tastes.', { tags: ['refreshing'], img: 1 }),
  d('beverages', 'Fresh Lime Soda', 'Sweet, salted or somewhere in between.', { tags: ['refreshing'], img: 2 }),
  d('beverages', 'Peach Iced Tea', 'Light, fruity and chilled.', { tags: ['refreshing'], img: 0 }),
  d('beverages', 'Watermelon Cooler', 'Cooling and lightly sweet.', { tags: ['refreshing'], img: 1 }),

  d('coffee-shakes', 'Cold Coffee', 'Smooth, chilled and just sweet enough.', { rec: 1, tags: ['sweet', 'refreshing'], img: 0 }),
  d('coffee-shakes', 'Cappuccino', 'A classic café pour with a soft foam crown.', { tags: [], img: 1 }),
  d('coffee-shakes', 'Chocolate Milkshake', 'Thick, cold and chocolatey.', { tags: ['sweet'], img: 2 }),
  d('coffee-shakes', 'Oreo Shake', 'Cookies and cream, blended until creamy.', { tags: ['sweet'], img: 2 }),
  d('coffee-shakes', 'Iced Latte', 'Espresso and milk over ice.', { tags: ['refreshing'], img: 0 }),

  d('desserts', 'Sizzling Brownie', 'A warm brownie served with theatre and ice cream.', { sig: 1, tags: ['sweet'], img: 0 }),
  d('desserts', 'Brownie with Ice Cream', 'Fudgy and warm with cold cream melting over it.', { rec: 1, tags: ['sweet'], img: 1 }),
  d('desserts', 'Belgian Waffle', 'Crisp edges, soft centre, sweet finish.', { tags: ['sweet'], img: 2 }),
  d('desserts', 'Ice Cream Sundae', 'Scoops, sauce and a little crunch.', { tags: ['sweet', 'refreshing'], img: 1 }),
  d('desserts', 'Warm Gulab Jamun', 'A familiar favourite, served warm.', { tags: ['sweet'], img: 2 }),
];

export const getCategory = (id) => categories.find((c) => c.id === id);
export const itemsByCategory = (id) => menuItems.filter((i) => i.categoryId === id);
export const dishImage = (item, w = 700) => pick(getCategory(item.categoryId)?.pool, item.image, w);
export const categoryImage = (cat, w = 900) => pick(cat.pool, 0, w);
