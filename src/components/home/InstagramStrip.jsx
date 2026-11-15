import { Instagram } from 'lucide-react';
import SmartImage from '@/components/common/SmartImage';
import { business } from '@/config/business';
import { instagramTiles } from '@/data/content';

// Ready for a future Instagram API integration (swap instagramTiles for fetched media). No scraping.
export default function InstagramStrip() {
  const Tile = ({ src, i }) => (
    <div className="group relative aspect-square overflow-hidden bg-cream">
      <SmartImage src={src} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 grid place-items-center bg-espresso/0 text-ivory opacity-0 transition duration-500 group-hover:bg-espresso/50 group-hover:opacity-100"><Instagram size={26} /></div>
    </div>
  );
  return (
    <section className="bg-ivory py-24">
      <div className="container-x">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <h2 className="display text-4xl md:text-5xl">Moments, shared.</h2>
          {business.instagram && <a href={business.instagram} target="_blank" rel="noreferrer" className="btn btn-line">Follow on Instagram</a>}
        </div>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6">
          {instagramTiles.map((s, i) => <Tile key={i} src={s} i={i} />)}
        </div>
        {import.meta.env.DEV && !business.instagram && <p className="mt-4 text-xs text-taupe">Dev note: placeholder grid. Add the official Instagram URL in config/business.js and connect the API.</p>}
      </div>
    </section>
  );
}
