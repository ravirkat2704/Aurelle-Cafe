import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import SmartImage from '@/components/common/SmartImage';

export default function Lightbox({ items, index, onClose, onIndex }) {
  const open = index != null;
  useEffect(() => {
    if (!open) return undefined;
    const k = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onIndex((index + 1) % items.length);
      if (e.key === 'ArrowLeft') onIndex((index - 1 + items.length) % items.length);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', k);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', k); };
  }, [open, index, items.length, onClose, onIndex]);

  const it = open ? items[index] : null;
  return (
    <AnimatePresence>
      {it && (
        <motion.div className="fixed inset-0 z-[130] flex items-center justify-center bg-espresso/95 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} role="dialog" aria-modal="true" aria-label="Gallery viewer">
          <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center border border-gold/50 text-ivory hover:bg-gold hover:text-espresso"><X size={20} /></button>
          <button onClick={(e) => { e.stopPropagation(); onIndex((index - 1 + items.length) % items.length); }} aria-label="Previous" className="absolute left-3 z-10 grid h-11 w-11 place-items-center border border-gold/50 text-ivory hover:bg-gold hover:text-espresso md:left-8"><ChevronLeft /></button>
          <button onClick={(e) => { e.stopPropagation(); onIndex((index + 1) % items.length); }} aria-label="Next" className="absolute right-3 z-10 grid h-11 w-11 place-items-center border border-gold/50 text-ivory hover:bg-gold hover:text-espresso md:right-8"><ChevronRight /></button>
          <AnimatePresence mode="wait">
            <motion.figure key={it.id} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.3 }} className="max-h-[88vh] max-w-[92vw]" onClick={(e) => e.stopPropagation()}>
              {it.type === 'video'
                ? <video src={it.src} poster={it.thumb} controls autoPlay playsInline className="max-h-[80vh] max-w-[92vw]" />
                : <SmartImage src={it.full} alt={it.alt} eager className="max-h-[80vh] max-w-[92vw] object-contain" />}
              <figcaption className="mt-4 text-center text-xs uppercase tracking-[0.25em] text-taupe">{it.category} · {index + 1} / {items.length}</figcaption>
            </motion.figure>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
