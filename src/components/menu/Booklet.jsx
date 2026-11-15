import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { categories } from '@/data/menu';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useApp } from '@/context/AppContext';
import { BackCoverPage, CatDishesPage, CatIntroPage, ClosingPage, ContactPage, ContentsPage, CoverPage, Paper, WelcomePage } from './BookletPages';

// Page map (26 pages = 13 sheets): 0 cover | 1 welcome | 2 contents | 3..22 category intro+dishes x10 | 23 closing | 24 contact | 25 back cover
const TOTAL = 26;
const SHEETS = TOTAL / 2;
const catSpread = (i) => i + 2; // number of sheets flipped to show category i's spread

function renderPage(i, { onOpenDish, jump }) {
  let content;
  if (i === 0) content = <CoverPage />;
  else if (i === 1) content = <WelcomePage />;
  else if (i === 2) content = <ContentsPage onJump={jump} />;
  else if (i <= 22) {
    const c = categories[Math.floor((i - 3) / 2)];
    content = (i - 3) % 2 === 0 ? <CatIntroPage cat={c} /> : <CatDishesPage cat={c} onOpen={onOpenDish} />;
  } else if (i === 23) content = <ClosingPage />;
  else if (i === 24) content = <ContactPage />;
  else content = <BackCoverPage />;
  return <Paper side={i % 2 ? 'left' : 'right'} dark={i === 0 || i === 25}>{content}</Paper>;
}

export default function Booklet({ onOpenDish, initialCategory = -1 }) {
  const isMobile = useIsMobile();
  const { play } = useApp();
  const startSpread = initialCategory >= 0 ? catSpread(initialCategory) : 0;
  const [flipped, setFlipped] = useState(startSpread);
  const [turning, setTurning] = useState(null);
  const [idx, setIdx] = useState(initialCategory >= 0 ? 3 + initialCategory * 2 : 0);
  const [dir, setDir] = useState(1);
  const timer = useRef(null);
  const startX = useRef(null);

  useEffect(() => {
    if (initialCategory >= 0) { setFlipped(catSpread(initialCategory)); setIdx(3 + initialCategory * 2); }
  }, [initialCategory]);
  useEffect(() => () => clearTimeout(timer.current), []);

  const jump = useCallback((i) => { setFlipped(catSpread(i)); setDir(1); setIdx(3 + i * 2); play('flip'); }, [play]);

  const go = useCallback((d) => {
    if (isMobile) {
      const n = Math.min(TOTAL - 1, Math.max(0, idx + d));
      if (n === idx) return;
      setDir(d); setIdx(n); play('flip'); return;
    }
    const n = Math.min(SHEETS, Math.max(0, flipped + d));
    if (n === flipped) return;
    setTurning(d > 0 ? flipped : flipped - 1);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setTurning(null), 1100);
    setFlipped(n); play('flip');
  }, [isMobile, idx, flipped, play]);

  useEffect(() => {
    const k = (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [go]);

  const ctx = { onOpenDish, jump };
  const onDown = (e) => { startX.current = e.clientX; };
  const onUp = (e) => {
    if (startX.current == null) return;
    const dx = e.clientX - startX.current; startX.current = null;
    if (Math.abs(dx) > 70) go(dx < 0 ? 1 : -1);
  };

  const atStart = isMobile ? idx === 0 : flipped === 0;
  const atEnd = isMobile ? idx === TOTAL - 1 : flipped === SHEETS;
  const label = isMobile ? `Page ${idx + 1} of ${TOTAL}` : `Spread ${flipped + 1} of ${SHEETS + 1}`;

  return (
    <div className="flex flex-col items-center" onPointerDown={onDown} onPointerUp={onUp}>
      {isMobile ? (
        <div className="relative" style={{ width: 'min(92vw, 420px)', height: 'min(74vh, 620px)', perspective: 1600 }}>
          <AnimatePresence mode="wait" initial={false} custom={dir}>
            <motion.div
              key={idx}
              initial={{ rotateY: dir > 0 ? 75 : -75, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: dir > 0 ? -75 : 75, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              style={{ transformOrigin: dir > 0 ? 'left center' : 'right center' }}
              className="absolute inset-0 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.55)]"
            >
              {renderPage(idx, ctx)}
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        <div
          className="relative"
          style={{
            '--pw': 'min(500px, 43vw)',
            width: 'calc(var(--pw) * 2)', height: 'calc(var(--pw) * 1.32)', perspective: 2400,
            transform: flipped === 0 ? 'translateX(calc(var(--pw) * -0.5))' : flipped === SHEETS ? 'translateX(calc(var(--pw) * 0.5))' : 'translateX(0)',
            transition: 'transform 1s cubic-bezier(.645,.045,.355,1)',
          }}
        >
          <div className="pointer-events-none absolute -bottom-6 left-[5%] right-[5%] h-8 rounded-full bg-black/40 blur-2xl" />
          {Array.from({ length: SHEETS }).map((_, k) => {
            const isFlipped = k < flipped;
            return (
              <div
                key={k}
                className="absolute top-0 h-full w-1/2"
                style={{
                  left: '50%', transformOrigin: 'left center', transformStyle: 'preserve-3d',
                  transform: `rotateY(${isFlipped ? -180 : 0}deg)`,
                  transition: 'transform 1s cubic-bezier(.645,.045,.355,1)',
                  zIndex: turning === k ? 200 : isFlipped ? k + 1 : SHEETS - k,
                }}
              >
                <div className="absolute inset-0 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]" style={{ backfaceVisibility: 'hidden' }}>{renderPage(k * 2, ctx)}</div>
                <div className="absolute inset-0 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>{renderPage(k * 2 + 1, ctx)}</div>
              </div>
            );
          })}
          {!atStart && <button aria-label="Previous page" onClick={() => go(-1)} className="absolute left-0 top-0 z-[300] h-full w-[9%] cursor-w-resize transition hover:bg-gradient-to-r hover:from-gold/20 hover:to-transparent" />}
          {!atEnd && <button aria-label="Next page" onClick={() => go(1)} className="absolute right-0 top-0 z-[300] h-full w-[9%] cursor-e-resize transition hover:bg-gradient-to-l hover:from-gold/20 hover:to-transparent" />}
        </div>
      )}

      <div className="mt-12 flex items-center gap-6 text-ivory">
        <button onClick={() => go(-1)} disabled={atStart} aria-label="Previous" className="grid h-11 w-11 place-items-center border border-gold/50 transition hover:bg-gold hover:text-espresso disabled:opacity-30"><ChevronLeft size={18} /></button>
        <p className="min-w-[8.5rem] text-center text-[0.68rem] uppercase tracking-[0.25em] text-taupe" aria-live="polite">{label}</p>
        <button onClick={() => go(1)} disabled={atEnd} aria-label="Next" className="grid h-11 w-11 place-items-center border border-gold/50 transition hover:bg-gold hover:text-espresso disabled:opacity-30"><ChevronRight size={18} /></button>
      </div>
    </div>
  );
}
