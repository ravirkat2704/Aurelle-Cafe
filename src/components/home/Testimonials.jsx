import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { testimonials } from '@/data/content';

// Sample testimonials render only in development. In production the section stays hidden until real reviews are added.
const list = testimonials.filter((t) => !t.sample || import.meta.env.DEV);

export default function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (list.length < 2) return undefined;
    const t = setInterval(() => setI((v) => (v + 1) % list.length), 6000);
    return () => clearInterval(t);
  }, []);
  if (!list.length) return null;
  const t = list[i];
  return (
    <section className="bg-ivory py-28">
      <div className="container-x text-center">
        <Quote className="mx-auto text-gold" size={36} strokeWidth={1.2} />
        <div className="mx-auto mt-8 min-h-[190px] max-w-3xl" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.figure key={t.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.5 }}>
              <blockquote className="font-serif text-3xl italic leading-snug md:text-4xl">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="mt-6 text-xs uppercase tracking-[0.25em] text-caramel">{t.name}{t.source ? ` · ${t.source}` : ''}</figcaption>
              {t.sample && <p className="mt-2 text-[0.65rem] uppercase tracking-[0.2em] text-red-500">Sample content: development only</p>}
            </motion.figure>
          </AnimatePresence>
        </div>
        <div className="mt-6 flex justify-center gap-2">
          {list.map((x, n) => <button key={x.id} aria-label={`Show testimonial ${n + 1}`} onClick={() => setI(n)} className={`h-1.5 transition-all ${n === i ? 'w-8 bg-caramel' : 'w-3 bg-espresso/20'}`} />)}
        </div>
      </div>
    </section>
  );
}
