import SmartImage from '@/components/common/SmartImage';

export default function PageHero({ eyebrow, title, text, image, children }) {
  return (
    <section className="relative flex min-h-[62vh] items-end overflow-hidden bg-espresso text-ivory">
      {image && <SmartImage src={image} alt="" eager className="absolute inset-0 h-full w-full object-cover opacity-45" />}
      <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/60 to-espresso/80" />
      <div className="container-x relative pb-16 pt-44">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="display mt-5 max-w-4xl text-5xl md:text-7xl lg:text-8xl">{title}</h1>
        {text && <p className="mt-6 max-w-xl font-serif text-xl text-cream/85 md:text-2xl">{text}</p>}
        {children}
      </div>
    </section>
  );
}
