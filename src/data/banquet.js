import { pick } from '../config/media.js';

export const eventTypes = [
  'Birthday Celebration',
  'Anniversary Celebration',
  'Family Gathering',
  'Corporate Event',
  'Private Celebration',
  'Small Party',
  'Social Gathering',
  'Other Special Occasion',
];

export const eventCards = eventTypes.map((label, i) => ({
  label,
  image: pick('celebration', i, 700),
  blurb: [
    'Candles, cake and people who matter.',
    'An evening that honours the years.',
    'Long tables and longer conversations.',
    'Gatherings that feel considered.',
    'Intimate occasions, thoughtfully hosted.',
    'Relaxed company, easy plans.',
    'Good food and good company.',
    'Tell us what you are imagining.',
  ][i],
}));

// Venue facts: every `value` stays null until the owner confirms. The UI shows "shared on enquiry" for nulls.
export const venueInfo = [
  { key: 'photos', label: 'Venue photographs', value: null },
  { key: 'capacity', label: 'Hall capacity', value: null },
  { key: 'seating', label: 'Seating arrangements', value: null },
  { key: 'facilities', label: 'Event facilities', value: null },
  { key: 'decor', label: 'Decoration options', value: null },
  { key: 'catering', label: 'Catering options', value: null },
  { key: 'packages', label: 'Packages', value: null },
  { key: 'pricing', label: 'Pricing', value: null },
  { key: 'services', label: 'Event services', value: null },
];

// Add more entries only once multiple spaces are confirmed. The form shows a venue field when length > 1.
export const spaces = [{ id: 'main', name: 'Banquet space' }];

export const celebrationThemes = [
  { id: 'golden', title: 'Golden Birthday', mood: 'Warm light, gilded details, a cake worth the pause.', event: 'Birthday Celebration', image: pick('celebration', 0, 900) },
  { id: 'floral', title: 'Floral Anniversary', mood: 'Soft florals and candlelight for a slower evening.', event: 'Anniversary Celebration', image: pick('banquet', 1, 900) },
  { id: 'family', title: 'The Long Family Table', mood: 'One generous table, many generations.', event: 'Family Gathering', image: pick('banquet', 0, 900) },
  { id: 'corporate', title: 'Evening for the Team', mood: 'Understated, polished and easy to host.', event: 'Corporate Event', image: pick('banquet', 2, 900) },
  { id: 'festive', title: 'Festive Gathering', mood: 'Colour, music and a room that feels alive.', event: 'Social Gathering', image: pick('celebration', 1, 900) },
];
