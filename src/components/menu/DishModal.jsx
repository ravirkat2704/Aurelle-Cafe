import { useEffect, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import SmartImage from '@/components/common/SmartImage';
import { dishImage, getCategory, menuItems } from '@/data/menu';
import { buildWhatsAppLink } from '@/utilities/whatsapp';
import { useApp } from '@/context/AppContext';
import { PriceTag, SignatureStar, Spicy, VegMark } from './MenuBits';

export default function DishModal({ item, onClose, onSelect }) {
  const { play } = useApp();
  const id = item?.id;

  useEffect(() => {
    if (!id) return undefined;
    const k = (e) => { if (e.key === 'Escape') { play('close'); onClose(); } };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', k);
    play('open');
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', k); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const similar = useMemo(() => {
    if (!item) return [];
    const same = menuItems.filter((i) => i.categoryId === item.categoryId && i.id !== item.id);
    const tagged = menuItems.filter((i) => i.categoryId !== item.categoryId && i.tags.some((t) => item.tags.includes(t)));
    return [...same, ...tagged].slice(0, 3);
  }, [item]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div key="overlay" className="fixed inset-0 z-[120] flex items-end justify-center bg-espresso/85 backdrop-blur-sm md:items-center md:p-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => { play('close'); onClose(); }}>
          <motion.div
            role="dialog" aria-modal="true" aria-label={item.name}
            className="relative grid max-h-[92vh] w-full max-w-5xl overflow-y-auto bg-ivory md:grid-cols-2"
            initial={{ y: 60, opacity: 0, scale: 0.97 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 40, opacity: 0 }} transition={{ type: 'spring', stiffness: 220, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => { play('close'); onClose(); }} aria-label="Close" className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center bg-espresso text-ivory transition hover:bg-caramel"><X size={18} /></button>
            <div className="relative min-h-[260px] md:min-h-[560px]">
              <SmartImage src={dishImage(item, 1200)} alt={`${item.name} (illustrative photograph)`} className="absolute inset-0 h-full w-full object-cover" />
              <p className="absolute bottom-3 left-3 bg-espresso/70 px-2 py-1 text-[0.6rem] uppercase tracking-[0.2em] text-ivory/80">Illustrative image</p>
            </div>
            <div className="flex flex-col p-7 md:p-10">
              <p className="eyebrow !text-caramel">{getCategory(item.categoryId)?.name}</p>
              <h2 className="mt-3 font-serif text-4xl leading-none md:text-5xl">{item.name}</h2>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-coffee">
                <span className="inline-flex items-center gap-2"><VegMark /> Vegetarian</span>
                {item.spicy > 0 && <span className="inline-flex items-center gap-1"><Spicy level={item.spicy} /> Spicy</span>}
                {item.signature && <span className="inline-flex items-center gap-1"><SignatureStar /> Signature</span>}
                {item.recommended && <span className="border border-caramel/50 px-2 py-0.5 text-[0.6rem] uppercase tracking-[0.2em] text-caramel">Recommended</span>}
              </div>
              <p className="mt-6 text-[0.95rem] leading-relaxed text-coffee">{item.description}</p>
              {item.ingredients?.length ? (
                <p className="mt-4 text-sm text-coffee"><span className="text-[0.65rem] uppercase tracking-[0.2em] text-caramel">Ingredients </span>{item.ingredients.join(', ')}</p>
              ) : (
                <p className="mt-4 text-xs text-taupe">Ingredients and allergen details are being confirmed by the kitchen. Please ask before ordering if you have allergies.</p>
              )}
              <div className="mt-6 flex items-center justify-between border-y border-espresso/10 py-4">
                <span className="text-[0.65rem] uppercase tracking-[0.25em] text-taupe">Price</span>
                <PriceTag price={item.price} className="!text-2xl" />
              </div>
              <a href={buildWhatsAppLink(`Hello AURELLE, I would like to know more about the ${item.name}.`)} target="_blank" rel="noreferrer" className="btn btn-dark mt-6 self-start"><MessageCircle size={15} /> Ask about this dish</a>
              {similar.length > 0 && (
                <div className="mt-8">
                  <p className="text-[0.65rem] uppercase tracking-[0.25em] text-taupe">You may also like</p>
                  <ul className="mt-3 grid grid-cols-3 gap-3">
                    {similar.map((s) => (
                      <li key={s.id}>
                        <button onClick={() => onSelect(s)} className="group block w-full text-left">
                          <SmartImage src={dishImage(s, 300)} alt="" className="aspect-square w-full object-cover transition duration-500 group-hover:opacity-80" />
                          <span className="mt-2 block font-serif text-sm leading-tight group-hover:text-caramel">{s.name}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
