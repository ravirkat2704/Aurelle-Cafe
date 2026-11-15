import { Suspense, lazy } from 'react';
import SmartImage from '@/components/common/SmartImage';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import { useIsMobile, usePrefersReducedMotion } from '@/hooks/useIsMobile';
import { pick } from '@/config/media';
import { pillars } from '@/data/content';

const FloatingBeans = lazy(() => import('./FloatingBeans'));

export default function Signature() {
  const mobile = useIsMobile();
  const reduce = usePrefersReducedMotion();
  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="container-x grid items-center gap-16 py-28 md:py-40 lg:grid-cols-12">
        <div className="relative lg:col-span-6">
          <div data-mask className="aspect-[4/5] overflow-hidden">
            <SmartImage src={pick('interior', 1, 1200)} alt="Warm, softly lit café interior" className="h-full w-full object-cover" />
          </div>
          <div data-mask className="absolute -bottom-14 -right-4 hidden aspect-square w-[42%] overflow-hidden border-[10px] border-cream md:block lg:-right-16">
            <SmartImage src={pick('plated', 0, 700)} alt="A beautifully plated dish" className="h-full w-full object-cover" />
          </div>
        </div>
        <div className="relative lg:col-span-5 lg:col-start-8">
          {!mobile && !reduce && (
            <div className="pointer-events-none absolute -right-10 -top-44 hidden h-72 w-72 lg:block" aria-hidden="true">
              <ErrorBoundary silent><Suspense fallback={null}><FloatingBeans /></Suspense></ErrorBoundary>
            </div>
          )}
          <p data-reveal className="eyebrow !text-caramel">The AURELLE experience</p>
          <h2 data-reveal className="display mt-5 text-5xl md:text-7xl">More Than a Café. <em className="font-normal italic text-caramel">A Feeling.</em></h2>
          <p data-reveal className="mt-8 max-w-md font-serif text-xl leading-relaxed text-coffee">It begins with food worth lingering over, a room that holds the light just right, and people who make you feel expected.</p>
          <p data-reveal className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-coffee/80">Whether it is a quiet coffee, a long lunch or a celebration for fifty, every detail from the plating to the pace is considered.</p>
        </div>
      </div>
      <div className="bg-espresso py-14 text-ivory">
        <ul className="container-x grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {pillars.map((p) => (
            <li key={p.title} data-reveal className="border-t border-gold/40 pt-5">
              <h3 className="font-serif text-2xl">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-taupe">{p.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
