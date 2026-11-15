import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppFab from '@/components/layout/WhatsAppFab';
import ErrorBoundary from '@/components/common/ErrorBoundary';

export default function MainLayout() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:bg-gold focus:px-4 focus:py-2 focus:text-espresso">Skip to content</a>
      <Navbar />
      <main id="main">
        <ErrorBoundary>
          <Suspense fallback={<div className="grid min-h-screen place-items-center bg-espresso font-serif text-2xl tracking-[0.4em] text-gold">AURELLE</div>}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
