// Editable site copy and sample content. Replace with verified client information.
import { pick } from '../config/media.js';

export const cravings = [
  { id: 'cheesy', label: 'Something cheesy', note: 'Melty and comforting' },
  { id: 'spicy', label: 'Something spicy', note: 'With a little fire' },
  { id: 'refreshing', label: 'Something refreshing', note: 'Cool and bright' },
  { id: 'sweet', label: 'Something sweet', note: 'A soft landing' },
  { id: 'filling', label: 'Something filling', note: 'Properly satisfying' },
];

export const pillars = [
  { title: 'Great food', text: 'A wide vegetarian menu with something for every appetite.' },
  { title: 'Beautiful ambience', text: 'A room that makes you want to stay a little longer.' },
  { title: 'Memorable gatherings', text: 'Celebrations hosted with care, from small to special.' },
  { title: 'Thoughtful hospitality', text: 'Attentive without being intrusive.' },
  { title: 'Presentation that matters', text: 'Every plate arrives looking considered.' },
];

export const values = [
  { title: 'Flavour first', text: 'Everything starts with how it tastes, then how it looks.' },
  { title: 'Warm hospitality', text: 'Guests are welcomed, not processed.' },
  { title: 'Considered details', text: 'From the plate to the lighting, nothing is accidental.' },
  { title: 'Room for moments', text: 'Spaces designed for birthdays, anniversaries and ordinary Tuesdays.' },
  { title: 'Consistency', text: 'The same care on the hundredth visit as the first.' },
];

export const whyUs = [
  { icon: 'Leaf', title: 'Diverse vegetarian menu', text: 'Pizza, Indian, Chinese, continental and more under one roof.' },
  { icon: 'ChefHat', title: 'Quality-focused kitchen', text: 'Dishes prepared with attention to taste and presentation.' },
  { icon: 'Armchair', title: 'Comfortable ambience', text: 'A café setting that suits long conversations.' },
  { icon: 'HeartHandshake', title: 'Thoughtful hospitality', text: 'A team that pays attention to the little things.' },
  { icon: 'PartyPopper', title: 'Celebration venue', text: 'Banquet space for birthdays, gatherings and special occasions.' },
  { icon: 'Sparkles', title: 'Memorable experiences', text: 'Food and setting that leave an impression.' },
];

// Sample testimonials are shown ONLY in development builds. Replace with real, permitted reviews before launch.
export const testimonials = [
  { id: 't1', quote: 'Sample testimonial text for layout purposes only.', name: 'Sample guest', rating: null, source: null, sample: true },
  { id: 't2', quote: 'Another placeholder to preview the carousel.', name: 'Sample guest', rating: null, source: null, sample: true },
  { id: 't3', quote: 'Replace these with real feedback you have permission to publish.', name: 'Sample guest', rating: null, source: null, sample: true },
];

// Offers are centrally managed. Leave empty until real offers exist. Shape: { id, title, text, validTill }
export const offers = [];

export const instagramTiles = [
  pick('plated', 0, 600), pick('coffee', 1, 600), pick('desserts', 0, 600),
  pick('interior', 2, 600), pick('pizza', 1, 600), pick('celebration', 0, 600),
];

export const story = {
  headline: 'Rooted in Flavour. Made for Moments.',
  intro: 'AURELLE is a café, kitchen and banquet space built around one simple belief: a good table is where good moments begin.',
  philosophy: 'Our menu spans many kitchens, but one idea holds it together: honest vegetarian cooking, presented with care. We would rather do familiar dishes beautifully than chase novelty.',
  ambience: 'Warm light, deep wood tones and quiet details create a space that feels as good over a morning coffee as it does at a late celebration.',
};
