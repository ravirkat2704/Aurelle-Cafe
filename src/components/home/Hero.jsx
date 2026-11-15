import { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from '@/animations/gsapSetup';
import { useApp } from '@/context/AppContext';
import { media } from '@/config/media';
import SmartImage from '@/components/common/SmartImage';

const lines = ['An Escape', 'from the', 'Ordinary.'];

export default function Hero() {
  const root = useRef(null);
  const { introDone } = useApp();
  const [videoOk, setVideoOk] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const saveData = typeof navigator !== 'undefined' && navigator.connection?.saveData;

  // GSAP timeline owns the hero entrance; it waits for the loader to finish.
  useLayoutEffect(() => {
    if (!introDone) return undefined;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      if (reduce) { gsap.set('[data-hero]', { opacity: 1 }); return; }
      gsap.timeline({ defaults: { ease: 'power4.out' } })
        .fromTo('.hero-bg', { scale: 1.18 }, { scale: 1.04, duration: 2.6, ease: 'power2.out' }, 0)
        .fromTo('.hero-brand', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 }, 0.2)
        .fromTo('.hl', { yPercent: 115, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1.3, stagger: 0.14 }, 0.35)
        .fromTo('.hero-sub', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1 }, 0.95)
        .fromTo('.hero-cta', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 }, 1.1)
        .fromTo('.hero-scroll', { opacity: 0 }, { opacity: 1, duration: 1 }, 1.5);
      gsap.to('.hero-parallax', { yPercent: 12, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true } });
    }, root);
    return () => ctx.revert();
  }, [introDone]);

  return (
    <section ref={root} className="relative flex min-h-[100svh] items-end overflow-hidden bg-espresso text-ivory">
      <div className="hero-parallax absolute inset-0">
        <SmartImage src={media.hero.poster} alt="" eager className="hero-bg absolute inset-0 h-full w-full animate-kenburns object-cover" />
        {!saveData && !videoFailed && (
          <video className={`hero-bg absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${videoOk ? 'opacity-100' : 'opacity-0'}`} src={media.hero.video} poster={media.hero.poster} autoPlay muted loop playsInline preload="metadata" onCanPlay={() => setVideoOk(true)} onError={() => setVideoFailed(true)} aria-hidden="true" />
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/55 to-espresso/70" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(33,23,19,0.65)_100%)]" />

      <div className="container-x relative z-10 pb-24 pt-40 md:pb-28">
        <p data-hero className="hero-brand eyebrow opacity-0">AURELLE · Café, Kitchen &amp; Banquets</p>
        <h1 className="display mt-6 text-[clamp(3.4rem,11vw,10rem)] text-ivory" aria-label="An Escape from the Ordinary.">
          {lines.map((l, i) => (
            <span key={l} className="block overflow-hidden pb-[0.08em]" aria-hidden="true">
              <span data-hero className={`hl block opacity-0 ${i === 1 ? 'italic text-gold' : ''}`}>{l}</span>
            </span>
          ))}
        </h1>
        <p data-hero className="hero-sub mt-8 max-w-md font-serif text-xl leading-relaxed text-cream/90 opacity-0 md:text-2xl">Exceptional flavours, thoughtfully crafted experiences and spaces made for unforgettable moments.</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link data-hero to="/menu" className="hero-cta btn btn-gold opacity-0">Explore Our Menu</Link>
          <Link data-hero to="/banquets" className="hero-cta btn btn-outline opacity-0">Discover Banquets</Link>
        </div>
      </div>

      <div data-hero className="hero-scroll absolute bottom-8 right-6 z-10 hidden flex-col items-center gap-3 opacity-0 md:flex lg:right-14">
        <span className="text-[0.6rem] uppercase tracking-[0.3em] text-gold [writing-mode:vertical-rl]">Scroll</span>
        <span className="h-14 w-px animate-scrollline bg-gold" />
      </div>
    </section>
  );
}
