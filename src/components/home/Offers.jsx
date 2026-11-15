import { offers } from '@/data/content';

// Renders only when real offers exist in data/content.js. No invented discounts.
export default function Offers() {
  if (!offers.length) return null;
  return (
    <section className="bg-cream py-24">
      <div className="container-x">
        <p className="eyebrow !text-caramel">Current offers</p>
        <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {offers.map((o) => (
            <li key={o.id} className="border border-espresso/15 bg-ivory p-8">
              <h3 className="font-serif text-3xl">{o.title}</h3>
              <p className="mt-3 text-sm text-coffee">{o.text}</p>
              {o.validTill && <p className="mt-4 text-[0.65rem] uppercase tracking-[0.2em] text-taupe">Valid till {o.validTill}</p>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
