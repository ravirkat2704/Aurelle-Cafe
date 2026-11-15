import { lazy, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import Loader from '@/components/common/Loader';
import { useApp } from '@/context/AppContext';
import { ScrollTrigger } from '@/animations/gsapSetup';

// Route-level code splitting
const Home = lazy(() => import('@/pages/Home'));
const Story = lazy(() => import('@/pages/Story'));
const Menu = lazy(() => import('@/pages/Menu'));
const Banquets = lazy(() => import('@/pages/Banquets'));
const Gallery = lazy(() => import('@/pages/Gallery'));
const Contact = lazy(() => import('@/pages/Contact'));
const { Privacy, Terms } = { Privacy: lazy(() => import('@/pages/Privacy')), Terms: lazy(() => import('@/pages/Terms')) };
const NotFound = lazy(() => import('@/pages/NotFound'));

function ScrollManager() {
  const { pathname, hash, search } = useLocation();
  useEffect(() => {
    if (hash) {
      const t = setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 400);
      return () => clearTimeout(t);
    }
    if (!search.includes('dish=')) window.scrollTo(0, 0);
    const r = setTimeout(() => ScrollTrigger.refresh(), 500);
    return () => clearTimeout(r);
  }, [pathname, hash, search]);
  return null;
}

export default function App() {
  const { introDone, finishIntro } = useApp();
  return (
    <>
      {!introDone && <Loader onDone={finishIntro} />}
      <ScrollManager />
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="our-story" element={<Story />} />
          <Route path="menu" element={<Menu />} />
          <Route path="banquets" element={<Banquets />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy-policy" element={<Privacy />} />
          <Route path="terms-and-conditions" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
