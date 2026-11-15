import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SmartImage from '@/components/common/SmartImage';
import ShuffleDeck from '@/components/common/ShuffleDeck';
import { VegMark, Spicy } from '@/components/menu/MenuBits';
import { cravings } from '@/data/content';
import { dishImage, getCategory, menuItems } from '@/data/menu';
import { useApp } from '@/context/AppContext';

const shuffled = (arr) => [...arr].sort(() => Math.random() - 0.5);

// "Find Your Craving": choose a mood, a shuffled deck of matching dishes is dealt.
export default function FindCraving() {
  const [active, setActive] = useState('cheesy');
  const [seed, setSeed] = useState(0);
  const navigate = useNavigate();
  const { play } = useApp();
  const cards = useMemo(() => shuffled(menuItems.filter((i) => i.tags.includes(active))).slice(0, 5), [active, seed]);

  return (
    <section id="craving" className="overflow-hidden bg-chocolate py-28 text-ivory md:py-36">
      <div className="container-x grid items-center gap-16 lg:grid-cols-2">
        <div>
          <p data-reveal className="eyebrow">Find your craving</p>
          <h2 data-reveal className="display mt-5 text-5xl md:text-7xl">What are you in the <em className="font-normal italic text-gold">mood for?</em></h2>
          <p data-reveal className="mt-6 max-w-md font-serif text-xl text-cream/85">Pick a feeling and we will deal a hand from the menu. Drag the top card away, or shuffle for another.</p>
          <div className="mt-10 flex flex-wrap gap-3" role="radiogroup" aria-label="Choose a craving">
            {cravings.map((c, i) => (
              <motion.button key={c.id} role="radio" aria-checked={active === c.id} whileHover={{ y: -4 }} onClick={() => { setActive(c.id); setSeed((s) => s + 1); play('click'); }}
                className={`border px-5 py-3 text-left transition ${active === c.id ? 'border-gold bg-gold text-espresso' : 'border-ivory/25 hover:border-gold'}`} style={{ rotate: `${(i - 2) * 0.8}deg` }}>
                <span className="block font-serif text-lg leading-none">{c.label}</span>
                <span className={`mt-1 block text-[0.65rem] uppercase tracking-[0.2em] ${active === c.id ? 'text-espresso/70' : 'text-taupe'}`}>{c.note}</span>
              </motion.button>
            ))}
          </div>
        </div>
        <div className="flex justify-center">
          <ShuffleDeck
            key={`${active}-${seed}`}
            cards={cards}
            onTopClick={(d) => navigate(`/menu?dish=${d.id}`)}
            renderCard={(d) => (
              <div className="flex h-full flex-col">
                <SmartImage src={dishImage(d, 700)} alt={`${d.name} (illustrative photograph)`} className="h-[62%] w-full object-cover" draggable={false} />
                <div className="flex flex-1 flex-col justify-center px-6">
                  <p className="text-[0.6rem] uppercase tracking-[0.25em] text-caramel">{getCategory(d.categoryId)?.name}</p>
                  <h3 className="mt-1 flex items-center gap-2 font-serif text-2xl leading-tight"><VegMark />{d.name}{d.spicy > 0 && <Spicy level={d.spicy} />}</h3>
                  <p className="mt-2 line-clamp-2 text-xs text-coffee/80">{d.description}</p>
                  <p className="mt-3 text-[0.6rem] uppercase tracking-[0.25em] text-taupe">Tap to view</p>
                </div>
              </div>
            )}
          />
        </div>
      </div>
    </section>
  );
}
