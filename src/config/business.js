// Central business configuration. Replace every `verified: false` item with owner-approved details.
export const business = {
  brand: 'AURELLE',
  descriptor: 'Café, Kitchen & Banquets',
  tagline: 'Where Every Moment Becomes an Experience.',
  siteUrl: 'https://www.example.com', // TODO: confirm domain
  phone: { display: '+91 81413 14134', tel: '+918141314134', verified: false },
  whatsapp: { number: '918141314134', verified: false },
  email: null, // TODO: obtain from owner
  instagram: null, // TODO: confirm official account URL
  hours: null, // TODO: confirm with owner
  menuPdf: null, // e.g. '/menu.pdf' once an approved PDF exists (shows "Download Menu")
  address: {
    lines: ['Krishna Empire', 'AV Road, Near Pramukh Pujan Jewels', 'Vallabh Vidyanagar', 'Anand, Gujarat – 388120, India'],
    verified: false,
  },
  mapQuery: 'Krishna Empire, AV Road, Vallabh Vidyanagar, Anand, Gujarat 388120',
};

export const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/our-story', label: 'Our Story' },
  { to: '/menu', label: 'Menu' },
  { to: '/banquets', label: 'Banquets' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
];
