import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import Seo from '@/components/common/Seo';
import PageHero from '@/components/common/PageHero';
import SmartImage from '@/components/common/SmartImage';
import Lightbox from '@/components/gallery/Lightbox';
import { galleryCategories, galleryItems } from '@/data/gallery';
import { pick } from '@/config/media';

const ratios = { portrait: 'aspect-[3/4]', landscape: 'aspect-[4/3]', square: 'aspect-square' };

export default function Gallery() {
  const [cat, setCat] = useState('All');
  const [open, setOpen] = useState(null);
  const items = useMemo(() => galleryItems
    .filter((g) => cat === 'All' || g.category === cat)
    .map((g) => ({ ...g, thumb: pick(g.pool, g.i, 800), full: pick(g.pool, g.i, 1800) })), [cat]);

  return (
    <div>
      <Seo title="Gallery" description="A look at the food, drinks, interiors, dining and celebrations at AURELLE." path="/gallery" />
      <PageHero eyebrow="Gallery" title="A look inside." text="Food, drinks, interiors and celebrations. Imagery is illustrative until our own photography is added." image={pick('interior', 4, 1800)} />
      <section className="bg-ivory py-16 md:py-24">
        <div className="container-x">
          <div className="no-scrollbar -mx-5 mb-12 flex gap-3 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0" role="tablist" aria-label="Gallery categories">
            {galleryCategories.map((c) => (
              <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)} className={`shrink-0 border px-5 py-2.5 text-[0.7rem] uppercase tracking-[0.2em] transition ${cat === c ? 'border-espresso bg-espresso text-ivory' : 'border-espresso/20 hover:border-caramel'}`}>{c}</button>
            ))}
          </div>
          <motion.ul key={cat} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="columns-2 gap-4 md:columns-3 lg:columns-4 [&>li]:mb-4">
            {items.map((g, i) => (
              <li key={g.id} className="break-inside-avoid">
                <button onClick={() => setOpen(i)} className={`group relative block w-full overflow-hidden bg-cream ${ratios[g.ratio]}`} aria-label={`Open ${g.alt}`}>
                  <SmartImage src={g.thumb} alt={g.alt} className="h-full w-full object-cover transition duration-[900ms] group-hover:scale-110" />
                  <span className="absolute inset-0 bg-espresso/0 transition duration-500 group-hover:bg-espresso/30" />
                  {g.type === 'video' && <span className="absolute inset-0 grid place-items-center text-ivory"><Play size={36} /></span>}
                </button>
              </li>
            ))}
          </motion.ul>
        </div>
      </section>
      <Lightbox items={items} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
    </div>
  );
}
