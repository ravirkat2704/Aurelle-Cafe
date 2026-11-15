import { useRef } from 'react';
import { MessageCircle } from 'lucide-react';
import Seo from '@/components/common/Seo';
import PageHero from '@/components/common/PageHero';
import SmartImage from '@/components/common/SmartImage';
import CelebrationDeck from '@/components/common/CelebrationDeck';
import BanquetForm from '@/components/forms/BanquetForm';
import useReveal from '@/animations/useReveal';
import { pick } from '@/config/media';
import { eventCards, venueInfo } from '@/data/banquet';
import { buildWhatsAppLink, waMessages } from '@/utilities/whatsapp';

export default function Banquets() {
  const ref = useRef(null);
  useReveal(ref);
  return (
    <div ref={ref}>
      <Seo title="Banquets & Celebrations" description="Host birthdays, anniversaries, family gatherings and corporate events at AURELLE. Send a banquet enquiry." path="/banquets" />
      <PageHero eyebrow="Banquets & celebrations" title="Celebrate Life’s Finest Moments." text="Beautiful spaces, thoughtful hospitality and memorable experiences for every special occasion." image={pick('banquet', 0, 1800)}>
        <div className="mt-8 flex flex-wrap gap-4">
          <a href="#enquiry" className="btn btn-gold">Send Banquet Enquiry</a>
          <a href={buildWhatsAppLink(waMessages.banquet)} target="_blank" rel="noreferrer" className="btn btn-outline"><MessageCircle size={15} /> WhatsApp us</a>
        </div>
      </PageHero>

      <section className="bg-cream py-28 md:py-36">
        <div className="container-x">
          <p data-reveal className="eyebrow !text-caramel">Occasions</p>
          <h2 data-reveal className="display mt-5 max-w-3xl text-4xl md:text-6xl">An occasion for <em className="font-normal italic text-caramel">every reason.</em></h2>
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {eventCards.map((e, i) => (
              <li key={e.label} data-reveal data-delay={(i % 4) * 0.08} className={`group relative overflow-hidden bg-espresso ${i % 3 === 0 ? 'aspect-[3/4]' : 'aspect-[4/5]'}`}>
                <SmartImage src={e.image} alt={`${e.label} (illustrative photograph)`} className="h-full w-full object-cover opacity-80 transition duration-[900ms] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-ivory"><h3 className="font-serif text-2xl leading-tight">{e.label}</h3><p className="mt-1 text-xs text-cream/75">{e.blurb}</p></div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="overflow-hidden bg-chocolate py-28 text-ivory md:py-36">
        <div className="container-x grid items-center gap-16 lg:grid-cols-2">
          <div>
            <p data-reveal className="eyebrow">Celebration inspiration</p>
            <h2 data-reveal className="display mt-5 text-4xl md:text-6xl">Shuffle through <em className="font-normal italic text-gold">ideas.</em></h2>
            <p data-reveal className="mt-6 max-w-md font-serif text-xl text-cream/85">Drag the top card aside to see the next styling idea. Tap one to start an enquiry for that kind of event.</p>
            <p data-reveal className="mt-4 max-w-md text-xs text-taupe">Images are illustrative inspiration, not photographs of our venue.</p>
          </div>
          <div className="flex justify-center"><CelebrationDeck /></div>
        </div>
      </section>

      <section className="bg-ivory py-28 md:py-36">
        <div className="container-x">
          <p data-reveal className="eyebrow !text-caramel">The venue</p>
          <h2 data-reveal className="display mt-5 max-w-3xl text-4xl md:text-6xl">Everything you will want to <em className="font-normal italic text-caramel">know.</em></h2>
          <ul className="mt-14 grid gap-px bg-espresso/10 sm:grid-cols-2 lg:grid-cols-3">
            {venueInfo.map((v) => (
              <li key={v.key} data-reveal className="bg-ivory p-8">
                <h3 className="font-serif text-2xl">{v.label}</h3>
                <p className={`mt-3 text-sm ${v.value ? 'text-coffee' : 'text-taupe'}`}>{v.value || 'Shared on enquiry. Ask our team for the latest details.'}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-espresso py-28 text-ivory md:py-36">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p data-reveal className="eyebrow">Banquet enquiry</p>
            <h2 data-reveal className="display mt-5 text-4xl md:text-6xl">Tell us about your day.</h2>
            <p data-reveal className="mt-6 font-serif text-xl text-cream/85">Share a few details and our team will contact you to talk through dates, menus and arrangements.</p>
            <p data-reveal className="mt-4 text-xs text-taupe">This is an enquiry form, not a table reservation.</p>
          </div>
          <div className="lg:col-span-8"><BanquetForm /></div>
        </div>
      </section>
    </div>
  );
}
