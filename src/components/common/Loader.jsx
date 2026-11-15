import { useLayoutEffect, useRef } from 'react';
import { gsap } from '@/animations/gsapSetup';

// Signature loader: the A monogram draws itself, steam rises, the wordmark settles.
export default function Loader({ onDone }) {
  const root = useRef(null);
  useLayoutEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fail = setTimeout(onDone, 6000);
    const ctx = gsap.context(() => {
      if (reduce) { gsap.to(root.current, { opacity: 0, duration: 0.3, delay: 0.4, onComplete: onDone }); return; }
      const tl = gsap.timeline({ onComplete: () => gsap.to(root.current, { yPercent: -100, duration: 0.9, ease: 'power4.inOut', onComplete: onDone }) });
      tl.fromTo('.ld-ring', { strokeDashoffset: 320 }, { strokeDashoffset: 0, duration: 1.2, ease: 'power2.inOut' })
        .fromTo('.ld-a', { strokeDashoffset: 300 }, { strokeDashoffset: 0, duration: 1.2, ease: 'power2.inOut' }, '-=0.8')
        .fromTo('.ld-steam', { opacity: 0, y: 8 }, { opacity: 0.8, y: -4, stagger: 0.18, duration: 0.7 }, '-=0.4')
        .fromTo('.ld-word span', { opacity: 0, y: 18 }, { opacity: 1, y: 0, stagger: 0.06, duration: 0.6 }, '-=0.5')
        .to({}, { duration: 0.35 });
    }, root);
    return () => { clearTimeout(fail); ctx.revert(); };
  }, [onDone]);

  return (
    <div ref={root} className="fixed inset-0 z-[200] grid place-items-center bg-espresso" role="status" aria-label="Loading AURELLE">
      <div className="text-center">
        <svg viewBox="0 0 120 130" className="mx-auto h-28 w-28" fill="none" stroke="#C5A16A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path className="ld-steam" d="M52 16c-5-5 5-9 0-14M62 16c-5-5 5-9 0-14M72 16c-5-5 5-9 0-14" strokeWidth="1.2" opacity="0" />
          <circle className="ld-ring" cx="60" cy="74" r="50" pathLength="320" strokeDasharray="320" strokeDashoffset="320" />
          <path className="ld-a" d="M38 104 60 42l22 62M46 84h28" pathLength="300" strokeDasharray="300" strokeDashoffset="300" strokeWidth="2.2" />
        </svg>
        <p className="ld-word mt-6 flex justify-center font-serif text-3xl tracking-[0.4em] text-ivory">
          {'AURELLE'.split('').map((c, i) => <span key={i} className="inline-block opacity-0">{c}</span>)}
        </p>
      </div>
    </div>
  );
}
