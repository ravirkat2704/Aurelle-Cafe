import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BookOpen, Download, LayoutGrid, Search, X } from 'lucide-react';
import Seo from '@/components/common/Seo';
import PageHero from '@/components/common/PageHero';
import Booklet from '@/components/menu/Booklet';
import CardsView from '@/components/menu/CardsView';
import DishModal from '@/components/menu/DishModal';
import FindCraving from '@/components/home/FindCraving';
import { business } from '@/config/business';
import { categories, menuItems } from '@/data/menu';
import { pick } from '@/config/media';
import { useApp } from '@/context/AppContext';

const chips = [
  { key: 'veg', label: 'Vegetarian' },
  { key: 'spicy', label: 'Spicy' },
  { key: 'signature', label: 'Signature' },
  { key: 'recommended', label: 'Recommended' },
];

export default function Menu() {
  const [params, setParams] = useSearchParams();
  const catParam = params.get('cat');
  const dishId = params.get('dish');
  const { play } = useApp();
  const [view, setView] = useState('booklet');
  const [q, setQ] = useState('');
  const [filters, setFilters] = useState({ veg: false, spicy: false, signature: false, recommended: false });
  const [activeCat, setActiveCat] = useState(catParam || 'all');

  useEffect(() => { if (catParam) setActiveCat(catParam); }, [catParam]);

  const selected = useMemo(() => menuItems.find((i) => i.id === dishId) || null, [dishId]);
  const open = (it) => { setParams((p) => { const n = new URLSearchParams(p); n.set('dish', it.id); return n; }); };
  const close = () => setParams((p) => { const n = new URLSearchParams(p); n.delete('dish'); return n; });

  const searching = q.trim().length > 0 || Object.values(filters).some(Boolean);
  const effective = searching ? 'cards' : view;

  const items = useMemo(() => {
    const term = q.trim().toLowerCase();
    return menuItems.filter((i) => {
      if (!searching && activeCat !== 'all' && i.categoryId !== activeCat) return false;
      if (term && !`${i.name} ${i.description} ${categories.find((c) => c.id === i.categoryId)?.name}`.toLowerCase().includes(term)) return false;
      if (filters.veg && !i.veg) return false;
      if (filters.spicy && !i.spicy) return false;
      if (filters.signature && !i.signature) return false;
      if (filters.recommended && !i.recommended) return false;
      return true;
    });
  }, [q, filters, activeCat, searching]);

  const initialCategory = catParam ? categories.findIndex((c) => c.id === catParam) : -1;
  const tab = (key, label, Icon) => (
    <button onClick={() => { setView(key); play('click'); }} aria-pressed={view === key && !searching} className={`inline-flex items-center gap-2 px-5 py-3 text-[0.7rem] uppercase tracking-[0.2em] transition ${view === key && !searching ? 'bg-gold text-espresso' : 'text-ivory/80 hover:text-gold'}`}><Icon size={15} />{label}</button>
  );

  return (
    <div>
      <Seo title="Menu" description="Explore the AURELLE menu: pizza, burgers, Indian, continental, Chinese, starters, sizzlers, beverages, coffee, shakes and desserts." path="/menu" />
      <PageHero eyebrow="The menu" title="Ten chapters of vegetarian cooking." text="Leaf through the booklet or switch to cards, search and filters." image={pick('plated', 1, 1800)} />

      <section className="bg-espresso text-ivory">
        <div className="container-x flex flex-col gap-5 border-b border-ivory/10 py-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="inline-flex border border-gold/40" role="group" aria-label="Menu view">{tab('booklet', 'Booklet', BookOpen)}{tab('cards', 'Cards', LayoutGrid)}</div>
          <div className="flex flex-1 flex-wrap items-center gap-3 lg:justify-end">
            <label className="relative w-full sm:w-72">
              <span className="sr-only">Search the menu</span>
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search dishes" className="w-full border border-ivory/20 bg-transparent py-3 pl-10 pr-9 text-sm text-ivory outline-none placeholder:text-taupe focus:border-gold" />
              {q && <button onClick={() => setQ('')} aria-label="Clear search" className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-taupe hover:text-gold"><X size={14} /></button>}
            </label>
            {chips.map((c) => (
              <button key={c.key} aria-pressed={filters[c.key]} onClick={() => setFilters((f) => ({ ...f, [c.key]: !f[c.key] }))} className={`border px-4 py-2.5 text-[0.68rem] uppercase tracking-[0.18em] transition ${filters[c.key] ? 'border-gold bg-gold text-espresso' : 'border-ivory/25 text-ivory/80 hover:border-gold'}`}>{c.label}</button>
            ))}
            {business.menuPdf && <a href={business.menuPdf} download className="btn btn-outline !px-4 !py-2.5"><Download size={14} /> Download menu</a>}
          </div>
        </div>

        {effective === 'booklet' ? (
          <div className="overflow-x-clip py-16 md:py-24">
            <Booklet onOpenDish={open} initialCategory={initialCategory} />
          </div>
        ) : (
          <div className="bg-ivory text-espresso">
            <div className="container-x pt-8 text-xs text-taupe" aria-live="polite">{items.length} {items.length === 1 ? 'dish' : 'dishes'} shown. Draft menu: prices and availability to be confirmed.</div>
            <CardsView items={items} onOpen={open} activeCat={activeCat} setActiveCat={setActiveCat} searching={searching} />
          </div>
        )}
      </section>

      <FindCraving />
      <DishModal item={selected} onClose={close} onSelect={open} />
    </div>
  );
}
