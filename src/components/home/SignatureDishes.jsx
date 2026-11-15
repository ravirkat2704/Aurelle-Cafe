import { Link } from 'react-router-dom';
import SmartImage from '@/components/common/SmartImage';
import { dishImage, getCategory, menuItems } from '@/data/menu';
import { PriceTag } from '@/components/menu/MenuBits';

export default function SignatureDishes() {
  const dishes = menuItems.filter((i) => i.signature).slice(0, 4);
  return (
    <section className="overflow-hidden bg-espresso py-28 text-ivory md:py-40">
      <div className="container-x">
        <div className="mb-20 max-w-2xl">
          <p data-reveal className="eyebrow">Signature dishes</p>
          <h2 data-reveal className="display mt-5 text-5xl md:text-7xl">Plates worth the <em className="font-normal italic text-gold">pause.</em></h2>
        </div>
        <div className="space-y-28 md:space-y-40">
          {dishes.map((d, i) => (
            <article key={d.id} className="grid items-center gap-10 lg:grid-cols-12">
              <div className={`relative lg:col-span-7 ${i % 2 ? 'lg:order-2 lg:col-start-6' : ''}`}>
                <div data-mask className="aspect-[5/4] overflow-hidden">
                  <SmartImage src={dishImage(d, 1400)} alt={`${d.name} (illustrative photograph)`} className="h-full w-full object-cover" />
                </div>
                <span className={`pointer-events-none absolute -top-10 font-serif text-[7rem] leading-none text-gold/25 md:text-[11rem] ${i % 2 ? '-right-2 md:-right-8' : '-left-2 md:-left-8'}`} aria-hidden="true">{i + 1}</span>
              </div>
              <div className={`lg:col-span-4 ${i % 2 ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-9'}`}>
                <p data-reveal className="eyebrow">{getCategory(d.categoryId)?.name}</p>
                <h3 data-reveal className="display mt-4 text-4xl md:text-6xl">{d.name}</h3>
                <p data-reveal className="mt-5 font-serif text-xl leading-relaxed text-cream/85">{d.description}</p>
                {d.price != null && <p data-reveal className="mt-4"><PriceTag price={d.price} className="!text-gold" /></p>}
                <Link data-reveal to={`/menu?dish=${d.id}`} className="btn btn-outline mt-8">View this dish</Link>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-28 text-center"><Link to="/menu" className="btn btn-gold">Explore the full menu</Link></div>
      </div>
    </section>
  );
}
