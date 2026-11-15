import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Shuffle } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const slots = [
  { y: 0, rotate: 0, scale: 1, opacity: 1 },
  { y: 16, rotate: 3, scale: 0.96, opacity: 1 },
  { y: 30, rotate: -3, scale: 0.92, opacity: 1 },
  { y: 42, rotate: 2, scale: 0.88, opacity: 0.7 },
];

// A stack of cards: drag the top card away, or press Shuffle, and it slides to the back.
export default function ShuffleDeck({ cards, renderCard, onTopClick, className = 'h-[470px] w-[min(88vw,340px)]', label = 'Shuffle' }) {
  const { play } = useApp();
  const [order, setOrder] = useState(() => cards.map((_, i) => i));
  const [leaving, setLeaving] = useState(false);
  useEffect(() => setOrder(cards.map((_, i) => i)), [cards]);

  const next = () => { play('flip'); setOrder((o) => [...o.slice(1), o[0]]); };
  const shuffle = () => { if (leaving || cards.length < 2) return; setLeaving(true); setTimeout(() => { next(); setLeaving(false); }, 260); };

  if (!cards.length) return null;
  return (
    <div className="flex flex-col items-center gap-8">
      <div className={`relative ${className}`}>
        {cards.map((card, idx) => {
          const pos = order.indexOf(idx);
          const slot = slots[Math.min(pos, 3)];
          const top = pos === 0;
          return (
            <motion.div
              key={card.id}
              className="absolute inset-0 select-none overflow-hidden bg-ivory text-espresso shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]"
              style={{ zIndex: 20 - pos, pointerEvents: pos > 3 ? 'none' : 'auto', cursor: top ? 'grab' : 'default' }}
              animate={{ ...slot, x: top && leaving ? 280 : 0, rotate: top && leaving ? 14 : slot.rotate, opacity: pos > 3 ? 0 : top && leaving ? 0.4 : slot.opacity }}
              transition={{ type: 'spring', stiffness: 220, damping: 24 }}
              drag={top ? 'x' : false}
              dragSnapToOrigin
              dragElastic={0.6}
              onDragEnd={(_, info) => { if (Math.abs(info.offset.x) > 90) next(); }}
              onTap={() => { if (top && onTopClick) onTopClick(card); }}
              aria-hidden={!top}
            >
              {renderCard(card, top)}
            </motion.div>
          );
        })}
      </div>
      {cards.length > 1 && (
        <button onClick={shuffle} className="btn btn-outline" aria-label="Shuffle to the next card"><Shuffle size={15} /> {label}</button>
      )}
    </div>
  );
}
