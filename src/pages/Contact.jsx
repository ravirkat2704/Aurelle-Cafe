import { Clock, MapPin, MessageCircle, Navigation, Phone } from 'lucide-react';
import Seo, { localBusinessJsonLd } from '@/components/common/Seo';
import PageHero from '@/components/common/PageHero';
import GeneralForm from '@/components/forms/GeneralForm';
import { business } from '@/config/business';
import { pick } from '@/config/media';
import { buildWhatsAppLink, waMessages } from '@/utilities/whatsapp';

const ld = localBusinessJsonLd();

export default function Contact() {
  const q = encodeURIComponent(business.mapQuery);
  return (
    <div>
      <Seo title="Contact" description="Find AURELLE on AV Road, Vallabh Vidyanagar, Anand. Call, WhatsApp or send an enquiry." path="/contact" jsonLd={ld} />
      <PageHero eyebrow="Contact" title="We would love to hear from you." text="Questions about the menu, a celebration or just finding us? Reach out any way you like." image={pick('interior', 1, 1800)} />

      <section className="bg-ivory py-24 md:py-32">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="font-serif text-4xl">Visit us</h2>
            <address className="mt-6 flex gap-4 font-serif text-2xl not-italic leading-snug text-coffee">
              <MapPin className="mt-1 shrink-0 text-caramel" size={22} />
              <span>{business.address.lines.map((l) => <span key={l} className="block">{l}</span>)}</span>
            </address>
            <ul className="mt-8 space-y-4 text-sm text-coffee">
              <li className="flex items-center gap-4"><Phone size={18} className="text-caramel" /><a href={`tel:${business.phone.tel}`} className="hover:text-caramel">{business.phone.display}</a></li>
              {business.email && <li className="flex items-center gap-4"><span className="w-[18px] text-caramel">@</span><a href={`mailto:${business.email}`} className="hover:text-caramel">{business.email}</a></li>}
              <li className="flex items-center gap-4"><Clock size={18} className="text-caramel" /><span>{business.hours || 'Please call or message us to confirm opening hours.'}</span></li>
            </ul>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href={`https://www.google.com/maps/dir/?api=1&destination=${q}`} target="_blank" rel="noreferrer" className="btn btn-dark"><Navigation size={15} /> Get directions</a>
              <a href={`tel:${business.phone.tel}`} className="btn btn-line"><Phone size={15} /> Call now</a>
              <a href={buildWhatsAppLink(waMessages.general)} target="_blank" rel="noreferrer" className="btn btn-line"><MessageCircle size={15} /> WhatsApp</a>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="aspect-[4/3] w-full overflow-hidden bg-cream">
              <iframe title="Map showing the AURELLE location" src={`https://www.google.com/maps?q=${q}&output=embed`} className="h-full w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream py-24 md:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4"><h2 className="font-serif text-4xl">Send an enquiry</h2><p className="mt-4 text-coffee">For celebrations and events, the banquet enquiry form on the Banquets page is the quickest route.</p></div>
          <div className="lg:col-span-8"><GeneralForm /></div>
        </div>
      </section>
    </div>
  );
}
