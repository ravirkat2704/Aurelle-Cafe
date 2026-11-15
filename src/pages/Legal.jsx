import Seo from '@/components/common/Seo';
import PageHero from '@/components/common/PageHero';

export default function Legal({ title, path, intro, sections }) {
  return (
    <div>
      <Seo title={title} description={intro} path={path} />
      <PageHero eyebrow="Legal" title={title} />
      <section className="bg-ivory py-20">
        <div className="container-x max-w-3xl">
          <p className="mb-10 border border-caramel/40 bg-cream p-4 text-xs text-coffee">Template text. Have it reviewed by a legal professional and replace the bracketed items with verified business details before launch.</p>
          <p className="font-serif text-xl leading-relaxed text-coffee">{intro}</p>
          {sections.map((s) => (
            <div key={s.h} className="mt-10"><h2 className="font-serif text-3xl">{s.h}</h2><p className="mt-3 leading-relaxed text-coffee">{s.p}</p></div>
          ))}
        </div>
      </section>
    </div>
  );
}
