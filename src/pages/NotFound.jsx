import { Link } from 'react-router-dom';
import Seo from '@/components/common/Seo';

export default function NotFound() {
  return (
    <section className="grid min-h-screen place-items-center bg-espresso px-6 text-center text-ivory">
      <Seo title="Page not found" path="/404" />
      <div>
        <p className="eyebrow">404</p>
        <h1 className="display mt-4 text-5xl md:text-7xl">This page isn&rsquo;t on the menu.</h1>
        <div className="mt-10 flex justify-center gap-4"><Link to="/" className="btn btn-gold">Back home</Link><Link to="/menu" className="btn btn-outline">See the menu</Link></div>
      </div>
    </section>
  );
}
