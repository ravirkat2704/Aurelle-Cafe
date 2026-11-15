import { Armchair, ChefHat, HeartHandshake, Leaf, PartyPopper, Sparkles } from 'lucide-react';

const Icons = { Armchair, ChefHat, HeartHandshake, Leaf, PartyPopper, Sparkles };
import { whyUs } from '@/data/content';

export default function WhyUs() {
  return (
    <section className="bg-espresso py-28 text-ivory md:py-36">
      <div className="container-x">
        <p data-reveal className="eyebrow">Why AURELLE</p>
        <h2 data-reveal className="display mt-5 max-w-3xl text-5xl md:text-7xl">Small details, <em className="font-normal italic text-gold">done properly.</em></h2>
        <ul className="mt-16 grid gap-px bg-gold/20 sm:grid-cols-2 lg:grid-cols-3">
          {whyUs.map((w) => {
            const Icon = Icons[w.icon] || Icons.Sparkles;
            return (
              <li key={w.title} data-reveal className="group bg-espresso p-9 transition duration-500 hover:bg-chocolate">
                <Icon size={28} strokeWidth={1.2} className="text-gold transition duration-500 group-hover:-translate-y-1" />
                <h3 className="mt-6 font-serif text-2xl">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-taupe">{w.text}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
