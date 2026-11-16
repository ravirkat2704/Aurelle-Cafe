import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Volume2, VolumeX, X } from 'lucide-react';
import { business, navLinks } from '@/config/business';
import { useApp } from '@/context/AppContext';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const { soundOn, toggleSound, play } = useApp();

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on(); window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [open]);

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-[60] transition-all duration-500 ${open ? 'bg-espresso py-3' : scrolled ? 'bg-espresso/95 py-3 backdrop-blur-md' : 'bg-transparent py-5'}`}>
        <div className="container-x flex items-center justify-between">
          <Link to="/" className="leading-none text-ivory" aria-label="AURELLE home">
            <span className="block font-serif text-2xl tracking-[0.35em]">{business.brand}</span>
            <span className="mt-1 block text-[0.55rem] uppercase tracking-[0.35em] text-gold">{business.descriptor}</span>
          </Link>

          <nav className="hidden items-center gap-9 lg:flex" aria-label="Main">
            {navLinks.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.to === '/'} className={({ isActive }) => `relative text-[0.72rem] uppercase tracking-[0.22em] transition-colors hover:text-gold ${isActive ? 'text-gold' : 'text-ivory/85'}`}>
                {({ isActive }) => (<>{l.label}{isActive && <motion.span layoutId="nav-underline" className="absolute -bottom-2 left-0 h-px w-full bg-gold" />}</>)}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button onClick={toggleSound} className="grid h-10 w-10 place-items-center text-ivory/80 transition hover:text-gold" aria-label={soundOn ? 'Turn sound off' : 'Turn sound on'} aria-pressed={soundOn}>
              {soundOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </button>
            <Link to="/banquets#enquiry" onClick={() => play('click')} className="btn btn-gold hidden !px-5 !py-3 md:inline-flex">Plan Your Celebration</Link>
            <button onClick={() => setOpen((v) => !v)} className="grid h-10 w-10 place-items-center text-ivory lg:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu is a SIBLING of the header (not a child) so the header's backdrop-blur can't trap a fixed overlay. Fully opaque, above all page content. */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[55] flex flex-col justify-between overflow-y-auto bg-espresso px-8 pb-10 pt-28 lg:hidden"
          >
            <nav className="flex flex-col" aria-label="Mobile">
              {navLinks.map((l, i) => (
                <motion.div key={l.to} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 + i * 0.06, duration: 0.5 }}>
                  <NavLink to={l.to} end={l.to === '/'} onClick={() => setOpen(false)} className={({ isActive }) => `block border-b border-ivory/10 py-3.5 font-serif text-4xl ${isActive ? 'text-gold' : 'text-ivory'}`}>{l.label}</NavLink>
                </motion.div>
              ))}
            </nav>
            <div className="mt-10">
              <Link to="/banquets#enquiry" onClick={() => setOpen(false)} className="btn btn-gold w-full">Plan Your Celebration</Link>
              <a href={`tel:${business.phone.tel}`} className="mt-5 block text-center text-xs tracking-[0.2em] text-taupe">{business.phone.display}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
