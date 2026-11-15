import { useLayoutEffect } from 'react';
import { gsap, ScrollTrigger } from './gsapSetup';

// GSAP owns scroll reveals. Mark static elements with data-reveal ("up" | "left" | "right" | "fade"),
// data-mask (clip-path image reveal) or data-parallax="0.15". Cleaned up on unmount.
export default function useReveal(scope) {
  useLayoutEffect(() => {
    const el = scope.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-reveal]').forEach((n) => {
        const k = n.dataset.reveal || 'up';
        const from = k === 'left' ? { x: -60 } : k === 'right' ? { x: 60 } : k === 'fade' ? {} : { y: 48 };
        gsap.from(n, { opacity: 0, ...from, duration: 1.1, ease: 'power3.out', delay: parseFloat(n.dataset.delay || 0), scrollTrigger: { trigger: n, start: 'top 90%', once: true } });
      });
      gsap.utils.toArray('[data-mask]').forEach((n) => {
        gsap.fromTo(n, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 1.4, ease: 'power4.inOut', scrollTrigger: { trigger: n, start: 'top 88%', once: true } });
        const im = n.querySelector('img, [role="img"]');
        if (im) gsap.fromTo(im, { scale: 1.3 }, { scale: 1, duration: 1.8, ease: 'power3.out', scrollTrigger: { trigger: n, start: 'top 88%', once: true } });
      });
      gsap.utils.toArray('[data-parallax]').forEach((n) => {
        const s = parseFloat(n.dataset.parallax || 0.12);
        gsap.to(n, { yPercent: -s * 100, ease: 'none', scrollTrigger: { trigger: n.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
      });
    }, el);
    const t = setTimeout(() => ScrollTrigger.refresh(), 700);
    return () => { clearTimeout(t); ctx.revert(); };
  }, [scope]);
}
