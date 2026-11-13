import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { FloatingActionBar } from './FloatingActionBar';
import { QuoteModal } from '@/components/booking/QuoteModal';

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden bg-[#FEF8F5]">
      <Navbar />
      <main className="flex-1 w-full overflow-x-hidden">
        <Outlet />
      </main>
      <Footer />
      <FloatingActionBar />
      <QuoteModal />
    </div>
  );
}
