import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import SmartImage from '@/components/common/SmartImage';
import { categories, dishImage, getCategory } from '@/data/menu';
import { PriceTag, SignatureStar, Spicy, VegMark } from './MenuBits';

const tints = ['#F7F1E8', '#F4EADB', '#F6EDE0', '#F3E9DC', '#F7EEE2', '#F4EBDD', '#F5ECDF', '#F2EADF', '#F6EDE1', '#F4E8DA'];

function TiltCard({ children, onClick, label }) {
  const x = useMotionValue(0); const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [7, -7]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-7, 7]), { stiffness: 200, damping: 20 });
  return (
    <motion.button
      type="button" onClick={onClick} aria-label={label}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); x.set((e.clientX - r.left) / r.width - 0.5); y.set((e.clientY - r.top) / r.height - 0.5); }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className="group relative block w-full overflow-hidden bg-espresso text-left shadow-[0_18px_40px_-22px_rgba(33,23,19,0.7)] transition-shadow duration-500 hover:shadow-[0_30px_60px_-20px_rgba(33,23,19,0.8)]"
    >
      {children}
    </motion.button>
  );
}

export default function CardsView({ items, onOpen, activeCat, setActiveCat, searching }) {
  const tint = tints[Math.max(0, categories.findIndex((c) => c.id === activeCat))] || tints[0];
  const tabs = [{ id: 'all', name: 'All' }, ...categories];
  return (
    <motion.div animate={{ backgroundColor: tint }} transition={{ duration: 0.8 }} className="py-12">
      <div className="container-x">
        {!searching && (
          <div className="no-scrollbar -mx-5 mb-10 flex gap-8 overflow-x-auto px-5 sm:mx-0 sm:px-0" role="tablist" aria-label="Menu categories">
            {tabs.map((t) => (
              <button key={t.id} role="tab" aria-selected={activeCat === t.id} onClick={() => setActiveCat(t.id)} className={`relative shrink-0 pb-3 font-serif text-xl transition ${activeCat === t.id ? 'text-espresso' : 'text-taupe hover:text-coffee'}`}>
                {t.name}
                {activeCat === t.id && <motion.span layoutId="cat-underline" className="absolute inset-x-0 bottom-0 h-px bg-caramel" />}
              </button>
            ))}
          </div>
        )}
        <AnimatePresence mode="wait">
          <motion.div key={`${activeCat}-${items.length}-${searching}`} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.4 }}>
            {items.length === 0 ? (
              <p className="py-20 text-center font-serif text-2xl text-coffee">No dishes match those filters. Try clearing one.</p>
            ) : (
              <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {items.map((it) => (
                  <li key={it.id}>
                    <TiltCard onClick={() => onOpen(it)} label={`View ${it.name}`}>
                      <div className="relative aspect-[4/5] overflow-hidden">
                        <SmartImage src={dishImage(it, 700)} alt={`${it.name} (illustrative photograph)`} className="h-full w-full object-cover transition duration-[900ms] group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/20 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 p-5 text-ivory">
                          <p className="text-[0.6rem] uppercase tracking-[0.25em] text-gold">{getCategory(it.categoryId)?.name}</p>
                          <div className="mt-2 flex items-start justify-between gap-3">
                            <h3 className="flex flex-wrap items-center gap-2 font-serif text-2xl leading-tight"><VegMark className="!border-emerald-400" />{it.name}{it.signature && <SignatureStar />}{it.spicy > 0 && <Spicy level={it.spicy} />}</h3>
                            <PriceTag price={it.price} className="shrink-0 !text-ivory/80" />
                          </div>
                          <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-ivory/80 transition-all duration-500 md:max-h-0 md:translate-y-2 md:opacity-0 md:group-hover:max-h-24 md:group-hover:translate-y-0 md:group-hover:opacity-100">{it.description}</p>
                        </div>
                      </div>
                    </TiltCard>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
