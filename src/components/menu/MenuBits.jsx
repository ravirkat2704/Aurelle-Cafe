import { Flame, Star } from 'lucide-react';

export const VegMark = ({ className = '' }) => (
  <span title="Vegetarian" aria-label="Vegetarian" className={`inline-grid h-3.5 w-3.5 shrink-0 place-items-center border border-emerald-700 ${className}`}>
    <span className="h-1.5 w-1.5 rounded-full bg-emerald-700" />
  </span>
);

export const Spicy = ({ level = 1 }) => (
  <span title="Spicy" aria-label={`Spice level ${level}`} className="inline-flex text-[#a8432a]">
    {Array.from({ length: level }).map((_, i) => <Flame key={i} size={13} fill="currentColor" />)}
  </span>
);

export const SignatureStar = () => <Star size={13} className="shrink-0 text-caramel" fill="currentColor" aria-label="Signature dish" />;

export const PriceTag = ({ price, className = '' }) => (
  price != null
    ? <span className={`font-serif text-lg ${className}`}>₹{price}</span>
    : <span className={`text-[0.6rem] uppercase tracking-[0.2em] text-taupe ${className}`}>On request</span>
);
