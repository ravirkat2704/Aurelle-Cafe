import { Link } from 'react-router-dom';
import { categories } from '@/data/menu';
import { business } from '@/config/business';

export default function MenuTeaser() {
  return (
    <section className="bg-ivory py-28 md:py-40">
      <div className="container-x grid items-center gap-16 lg:grid-cols-2">
        <div className="relative mx-auto h-[420px] w-[300px] [perspective:1200px]">
          <div className="absolute inset-0 translate-x-3 translate-y-3 bg-cream shadow-lg" />
          <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-[#F5ECDF] shadow-lg" />
          <Link to="/menu" aria-label="Open the menu booklet" className="group absolute inset-0 origin-left bg-chocolate p-8 text-center text-ivory shadow-[0_40px_70px_-25px_rgba(33,23,19,0.8)] transition duration-700 [transform:rotateY(-14deg)] hover:[transform:rotateY(-32deg)]">
            <span className="absolute inset-3 border border-gold/50" />
            <span className="relative flex h-full flex-col items-center justify-center">
              <svg viewBox="0 0 120 130" className="h-16 w-16" fill="none" stroke="#C5A16A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="60" cy="74" r="50" /><path d="M38 104 60 42l22 62M46 84h28" strokeWidth="2.2" /></svg>
              <span className="mt-5 font-serif text-2xl tracking-[0.3em]">{business.brand}</span>
              <span className="mt-6 font-serif text-4xl italic">The Menu</span>
              <span className="mt-8 text-[0.6rem] uppercase tracking-[0.3em] text-gold">Open the booklet</span>
            </span>
          </Link>
        </div>
        <div>
          <p data-reveal className="eyebrow !text-caramel">The menu</p>
          <h2 data-reveal className="display mt-5 text-5xl md:text-7xl">Turn the page on <em className="font-normal italic text-caramel">every craving.</em></h2>
          <p data-reveal className="mt-7 max-w-lg font-serif text-xl leading-relaxed text-coffee">Ten chapters, from pizza to desserts, bound into a booklet you can leaf through. Prefer to scan? Switch to cards, search and filters at any time.</p>
          <ul className="mt-8 flex flex-wrap gap-2">
            {categories.map((c) => (
              <li key={c.id}><Link to={`/menu?cat=${c.id}`} className="inline-block border border-espresso/20 px-4 py-2 text-xs tracking-wide transition hover:border-caramel hover:bg-caramel hover:text-ivory">{c.name}</Link></li>
            ))}
          </ul>
          <Link to="/menu" className="btn btn-dark mt-10">Open the menu</Link>
        </div>
      </div>
    </section>
  );
}
