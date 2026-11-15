import { useRef } from 'react';
import Seo, { localBusinessJsonLd } from '@/components/common/Seo';
import useReveal from '@/animations/useReveal';
import Hero from '@/components/home/Hero';
import Signature from '@/components/home/Signature';
import SignatureDishes from '@/components/home/SignatureDishes';
import MenuTeaser from '@/components/home/MenuTeaser';
import FindCraving from '@/components/home/FindCraving';
import BanquetPreview from '@/components/home/BanquetPreview';
import WhyUs from '@/components/home/WhyUs';
import Offers from '@/components/home/Offers';
import Testimonials from '@/components/home/Testimonials';
import InstagramStrip from '@/components/home/InstagramStrip';

const ld = localBusinessJsonLd();

export default function Home() {
  const ref = useRef(null);
  useReveal(ref);
  return (
    <div ref={ref}>
      <Seo title={null} description="AURELLE is a vegetarian café, kitchen and banquet venue in Vallabh Vidyanagar, Anand. Explore the menu and plan your celebration." path="/" jsonLd={ld} />
      <Hero />
      <Signature />
      <SignatureDishes />
      <MenuTeaser />
      <FindCraving />
      <BanquetPreview />
      <WhyUs />
      <Offers />
      <Testimonials />
      <InstagramStrip />
    </div>
  );
}
