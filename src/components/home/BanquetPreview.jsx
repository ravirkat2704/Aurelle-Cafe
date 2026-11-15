import { Link } from 'react-router-dom';
import SmartImage from '@/components/common/SmartImage';
import { pick } from '@/config/media';
import { eventTypes } from '@/data/banquet';

export default function BanquetPreview() {
  return (
    <section className="overflow-hidden bg-cream py-28 md:py-40">
      <div className="container-x grid items-center gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p data-reveal className="eyebrow !text-caramel">Banquets &amp; celebrations</p>
          <h2 data-reveal className="display mt-5 text-5xl md:text-7xl">Celebrate life&rsquo;s <em className="font-normal italic text-caramel">finest moments.</em></h2>
          <p data-reveal className="mt-7 max-w-md font-serif text-xl leading-relaxed text-coffee">Beautiful spaces, thoughtful hospitality and memorable experiences for every special occasion.</p>
          <ul data-reveal className="mt-8 flex flex-wrap gap-2">
            {eventTypes.map((t) => <li key={t} className="border border-espresso/20 px-3 py-1.5 text-xs">{t}</li>)}
          </ul>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/banquets" className="btn btn-dark">Explore banquets</Link>
            <Link to="/banquets#enquiry" className="btn btn-line">Send an enquiry</Link>
          </div>
        </div>
        <div className="relative lg:col-span-7">
          <div data-mask className="aspect-[4/3] overflow-hidden"><SmartImage src={pick('banquet', 0, 1400)} alt="An elegantly set banquet hall" className="h-full w-full object-cover" /></div>
          <div data-mask className="absolute -bottom-10 -left-4 hidden aspect-[3/4] w-[34%] overflow-hidden border-[10px] border-cream md:block lg:-left-14"><SmartImage src={pick('celebration', 0, 700)} alt="A celebration cake" className="h-full w-full object-cover" /></div>
        </div>
      </div>
    </section>
  );
}
