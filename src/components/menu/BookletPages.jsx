import { Link } from 'react-router-dom';
import { Download, MessageCircle } from 'lucide-react';
import SmartImage from '@/components/common/SmartImage';
import { business } from '@/config/business';
import { categories, categoryImage, dishImage, itemsByCategory } from '@/data/menu';
import { buildWhatsAppLink, waMessages } from '@/utilities/whatsapp';
import { PriceTag, SignatureStar, Spicy, VegMark } from './MenuBits';

// A single paper page. `side` controls which edge gets the spine shadow.
export function Paper({ side = 'right', dark = false, children }) {
  const shade = side === 'left' ? 'linear-gradient(to left, rgba(33,23,19,.30), transparent)' : 'linear-gradient(to right, rgba(33,23,19,.30), transparent)';
  return (
    <div className={`relative h-full w-full overflow-hidden ${dark ? 'bg-chocolate text-ivory' : 'bg-[#F5ECDF] text-espresso'}`}>
      <div className={`pointer-events-none absolute inset-y-0 z-20 w-12 ${side === 'left' ? 'right-0' : 'left-0'}`} style={{ background: shade }} />
      <div className="relative h-full overflow-y-auto no-scrollbar">{children}</div>
    </div>
  );
}

export const CoverPage = () => (
  <div className="relative flex h-full flex-col items-center justify-center p-8 text-center">
    <div className="absolute inset-4 border border-gold/50" />
    <div className="absolute inset-6 border border-gold/20" />
    <svg viewBox="0 0 120 130" className="h-20 w-20" fill="none" stroke="#C5A16A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="60" cy="74" r="50" /><path d="M38 104 60 42l22 62M46 84h28" strokeWidth="2.2" /></svg>
    <p className="mt-6 font-serif text-3xl tracking-[0.35em]">{business.brand}</p>
    <p className="mt-2 text-[0.6rem] uppercase tracking-[0.35em] text-gold">{business.descriptor}</p>
    <div className="my-8 h-px w-16 bg-gold/60" />
    <p className="font-serif text-5xl italic">The Menu</p>
    <p className="mt-10 max-w-[16rem] text-[0.7rem] leading-relaxed text-taupe">Draft edition. Dishes, descriptions and prices are being confirmed.</p>
    <p className="absolute bottom-10 text-[0.6rem] uppercase tracking-[0.3em] text-gold/80">Click the edge or swipe to turn</p>
  </div>
);

export const WelcomePage = () => (
  <div className="flex h-full flex-col justify-center p-9">
    <p className="eyebrow !text-caramel">Welcome</p>
    <h2 className="mt-4 font-serif text-4xl leading-tight">A table, set with intention.</h2>
    <p className="mt-5 text-sm leading-relaxed text-coffee">Turn the pages to wander through ten chapters of our vegetarian kitchen. Tap any dish to see it up close.</p>
    <dl className="mt-8 space-y-3 text-xs text-coffee">
      <div className="flex items-center gap-3"><VegMark /><dd>Vegetarian</dd></div>
      <div className="flex items-center gap-3"><Spicy level={1} /><dd>Spicy (more flames, more heat)</dd></div>
      <div className="flex items-center gap-3"><SignatureStar /><dd>Signature dish</dd></div>
    </dl>
    <p className="mt-8 border-t border-espresso/10 pt-4 text-[0.7rem] leading-relaxed text-taupe">Prices, availability and ingredients are subject to confirmation. Please tell your server about any allergies.</p>
  </div>
);

export const ContentsPage = ({ onJump }) => (
  <div className="p-9">
    <p className="eyebrow !text-caramel">Contents</p>
    <ol className="mt-6 divide-y divide-espresso/10">
      {categories.map((c, i) => (
        <li key={c.id}>
          <button onClick={() => onJump(i)} className="group flex w-full items-baseline justify-between py-3 text-left">
            <span className="font-serif text-2xl transition group-hover:text-caramel">{c.name}</span>
            <span className="text-[0.65rem] tracking-[0.2em] text-taupe">{String(i + 1).padStart(2, '0')}</span>
          </button>
        </li>
      ))}
    </ol>
  </div>
);

export const CatIntroPage = ({ cat }) => {
  const count = itemsByCategory(cat.id).length;
  return (
    <div className="flex h-full flex-col">
      <div className="relative h-[58%] shrink-0">
        <SmartImage src={categoryImage(cat, 800)} alt={`${cat.name} (illustrative photograph)`} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-transparent to-espresso/20" />
        <p className="absolute left-7 top-6 text-[0.65rem] uppercase tracking-[0.3em] text-ivory/90">{cat.kicker}</p>
      </div>
      <div className="flex flex-1 flex-col justify-center px-8 py-5">
        <h3 className="font-serif text-4xl leading-none">{cat.name}</h3>
        <p className="mt-3 font-serif text-lg italic text-coffee">{cat.tagline}</p>
        <p className="mt-3 text-sm text-coffee/80">{cat.blurb}</p>
        <p className="mt-4 text-[0.62rem] uppercase tracking-[0.25em] text-taupe">{count} dishes</p>
      </div>
    </div>
  );
};

export const CatDishesPage = ({ cat, onOpen }) => (
  <ul className="divide-y divide-espresso/10 px-6 py-5">
    {itemsByCategory(cat.id).map((it) => (
      <li key={it.id}>
        <button onClick={() => onOpen(it)} className="group flex w-full items-center gap-4 py-3 text-left" aria-label={`View ${it.name}`}>
          <SmartImage src={dishImage(it, 200)} alt="" className="h-14 w-14 shrink-0 object-cover transition duration-500 group-hover:scale-105" />
          <span className="min-w-0 flex-1">
            <span className="flex flex-wrap items-center gap-2">
              <VegMark />
              <span className="font-serif text-lg leading-tight transition group-hover:text-caramel">{it.name}</span>
              {it.signature && <SignatureStar />}
              {it.spicy > 0 && <Spicy level={it.spicy} />}
            </span>
            <span className="mt-1 line-clamp-2 block text-xs leading-snug text-coffee/70">{it.description}</span>
          </span>
          <PriceTag price={it.price} />
        </button>
      </li>
    ))}
  </ul>
);

export const ClosingPage = () => (
  <div className="flex h-full flex-col justify-center p-9">
    <p className="eyebrow !text-caramel">Still deciding?</p>
    <h3 className="mt-4 font-serif text-4xl leading-tight">Let a card choose for you.</h3>
    <p className="mt-4 text-sm text-coffee">Tell us what you are craving and we will deal a few dishes from the menu.</p>
    <Link to="/#craving" className="btn btn-dark mt-6 self-start">Find your craving</Link>
    <div className="my-8 h-px bg-espresso/10" />
    <p className="font-serif text-2xl italic">Celebrating something?</p>
    <p className="mt-2 text-sm text-coffee">Our banquet space is made for the occasions that matter.</p>
    <Link to="/banquets" className="mt-4 self-start border-b border-caramel pb-1 text-[0.7rem] uppercase tracking-[0.2em] text-caramel">Explore banquets</Link>
  </div>
);

export const ContactPage = () => (
  <div className="flex h-full flex-col justify-center p-9">
    <p className="eyebrow !text-caramel">Find us</p>
    <address className="mt-5 font-serif text-2xl not-italic leading-snug">{business.address.lines.map((l) => <span key={l} className="block">{l}</span>)}</address>
    <p className="mt-5 text-sm text-coffee">{business.phone.display}</p>
    <a href={buildWhatsAppLink(waMessages.menu)} target="_blank" rel="noreferrer" className="btn btn-dark mt-6 self-start"><MessageCircle size={15} /> Ask about the menu</a>
    {business.menuPdf && <a href={business.menuPdf} download className="btn btn-line mt-3 self-start"><Download size={15} /> Download menu</a>}
  </div>
);

export const BackCoverPage = () => (
  <div className="relative grid h-full place-items-center p-8 text-center">
    <div className="absolute inset-4 border border-gold/40" />
    <div>
      <p className="font-serif text-2xl tracking-[0.35em] text-gold">{business.brand}</p>
      <p className="mt-3 font-serif italic text-ivory/80">{business.tagline}</p>
    </div>
  </div>
);
