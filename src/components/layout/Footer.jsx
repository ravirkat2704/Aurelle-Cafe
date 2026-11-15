import { Link } from 'react-router-dom';
import { Instagram, MapPin, Phone } from 'lucide-react';
import { business, navLinks } from '@/config/business';
import { categories } from '@/data/menu';
import FooterArt from './FooterArt';

export default function Footer() {
  const year = new Date().getFullYear();
  const W = 'min(100vw,1000px)';
  return (
    <footer className="relative bg-espresso text-ivory" style={{ marginTop: `calc(${W} * 0.14)` }}>
      <div className="pointer-events-none absolute left-1/2 w-[min(100%,1000px)] -translate-x-1/2" style={{ top: `calc(${W} * -0.133)` }}>
        <FooterArt />
      </div>
      <div className="container-x relative pb-10" style={{ paddingTop: `calc(${W} * 0.17)` }}>
        <div className="grid gap-12 border-b border-ivory/10 pb-14 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="font-serif text-4xl tracking-[0.3em]">{business.brand}</p>
            <p className="mt-2 text-[0.6rem] uppercase tracking-[0.35em] text-gold">{business.descriptor}</p>
            <p className="mt-6 max-w-xs font-serif text-xl italic text-cream/85">{business.tagline}</p>
          </div>
          <div className="lg:col-span-2">
            <h3 className="eyebrow">Explore</h3>
            <ul className="mt-5 space-y-3 text-sm text-ivory/80">
              {navLinks.map((l) => <li key={l.to}><Link className="transition hover:text-gold" to={l.to}>{l.label}</Link></li>)}
            </ul>
          </div>
          <div className="lg:col-span-3">
            <h3 className="eyebrow">The Menu</h3>
            <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 text-sm text-ivory/80">
              {categories.map((c) => <li key={c.id}><Link className="transition hover:text-gold" to={`/menu?cat=${c.id}`}>{c.name}</Link></li>)}
            </ul>
          </div>
          <div className="lg:col-span-3">
            <h3 className="eyebrow">Visit & Enquire</h3>
            <address className="mt-5 space-y-3 text-sm not-italic text-ivory/80">
              <p className="flex gap-3"><MapPin size={16} className="mt-0.5 shrink-0 text-gold" /><span>{business.address.lines.join(', ')}</span></p>
              <p className="flex gap-3"><Phone size={16} className="shrink-0 text-gold" /><a href={`tel:${business.phone.tel}`} className="hover:text-gold">{business.phone.display}</a></p>
              {business.instagram && <p className="flex gap-3"><Instagram size={16} className="shrink-0 text-gold" /><a href={business.instagram} target="_blank" rel="noreferrer" className="hover:text-gold">Instagram</a></p>}
            </address>
            <Link to="/banquets#enquiry" className="btn btn-outline mt-6 !px-5 !py-3">Banquet enquiries</Link>
          </div>
        </div>
        <div className="flex flex-col items-start justify-between gap-4 pt-8 text-xs text-taupe md:flex-row md:items-center">
          <p>© {year} {business.brand} {business.descriptor}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="hover:text-gold">Privacy Policy</Link>
            <Link to="/terms-and-conditions" className="hover:text-gold">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
