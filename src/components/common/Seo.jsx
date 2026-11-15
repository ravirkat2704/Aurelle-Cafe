import { useEffect } from 'react';
import { business } from '@/config/business';

const setMeta = (attr, key, content) => {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el); }
  el.setAttribute('content', content);
};

export function localBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: business.brand,
    description: 'Vegetarian café, kitchen and banquet venue in Vallabh Vidyanagar, Anand.',
    servesCuisine: ['Vegetarian', 'Indian', 'Italian', 'Chinese'],
    telephone: business.phone.tel,
    url: business.siteUrl,
    address: { '@type': 'PostalAddress', streetAddress: 'Krishna Empire, AV Road, Near Pramukh Pujan Jewels', addressLocality: 'Vallabh Vidyanagar, Anand', addressRegion: 'Gujarat', postalCode: '388120', addressCountry: 'IN' },
  };
}

export default function Seo({ title, description, path = '/', jsonLd }) {
  useEffect(() => {
    const full = title ? `${title} | ${business.brand}` : `${business.brand} — ${business.descriptor}`;
    document.title = full;
    const desc = description || business.tagline;
    setMeta('name', 'description', desc);
    setMeta('property', 'og:title', full);
    setMeta('property', 'og:description', desc);
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:url', `${business.siteUrl}${path}`);
    setMeta('name', 'twitter:card', 'summary_large_image');
    let link = document.head.querySelector('link[rel="canonical"]');
    if (!link) { link = document.createElement('link'); link.rel = 'canonical'; document.head.appendChild(link); }
    link.href = `${business.siteUrl}${path}`;
    let s = document.getElementById('ld-json');
    if (jsonLd) {
      if (!s) { s = document.createElement('script'); s.type = 'application/ld+json'; s.id = 'ld-json'; document.head.appendChild(s); }
      s.textContent = JSON.stringify(jsonLd);
    } else if (s) s.remove();
  }, [title, description, path, jsonLd]);
  return null;
}
