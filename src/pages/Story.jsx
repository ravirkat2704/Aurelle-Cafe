import { useRef } from 'react';
import { Link } from 'react-router-dom';
import Seo from '@/components/common/Seo';
import PageHero from '@/components/common/PageHero';
import SmartImage from '@/components/common/SmartImage';
import useReveal from '@/animations/useReveal';
import { pick } from '@/config/media';
import { story, values } from '@/data/content';

export default function Story() {
  const ref = useRef(null);
  useReveal(ref);
  return (
    <div ref={ref}>
      <Seo title="Our Story" description="The philosophy, hospitality and ambience behind AURELLE café, kitchen and banquets." path="/our-story" />
      <PageHero eyebrow="Our story" title={story.headline} text={story.intro} image={pick('interior', 2, 1800)} />

      <section className="bg-cream py-28 md:py-36">
        <div className="container-x grid items-center gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p data-reveal className="eyebrow !text-caramel">Food philosophy</p>
            <h2 data-reveal className="display mt-5 text-4xl md:text-6xl">Familiar dishes, made <em className="font-normal italic text-caramel">beautifully.</em></h2>
            <p data-reveal className="mt-7 font-serif text-xl leading-relaxed text-coffee">{story.philosophy}</p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <div data-mask className="aspect-[4/5] overflow-hidden"><SmartImage src={pick('plated', 0, 1200)} alt="A carefully plated vegetarian dish" className="h-full w-full object-cover" /></div>
          </div>
        </div>
      </section>

      <section className="relative h-[60vh] overflow-hidden bg-espresso">
        <SmartImage data-parallax="0.15" src={pick('interior', 3, 1800)} alt="Coffee bar detail" className="absolute -top-[10%] h-[120%] w-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-espresso/45" />
        <p className="container-x relative z-10 flex h-full items-center font-serif text-3xl italic leading-snug text-ivory md:text-5xl"><span className="max-w-3xl">{story.ambience}</span></p>
      </section>

      <section className="bg-espresso py-28 text-ivory md:py-36">
        <div className="container-x">
          <p data-reveal className="eyebrow">What we hold to</p>
          <h2 data-reveal className="display mt-5 text-4xl md:text-6xl">Our values</h2>
          <ul className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-5">
            {values.map((v) => (
              <li key={v.title} data-reveal className="border-t border-gold/40 pt-5">
                <h3 className="font-serif text-2xl">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-taupe">{v.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-ivory py-28 text-center">
        <div className="container-x">
          <h2 data-reveal className="display text-4xl md:text-6xl">Come and sit a while.</h2>
          <div data-reveal className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/menu" className="btn btn-dark">Explore the menu</Link>
            <Link to="/banquets" className="btn btn-line">Discover banquets</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
