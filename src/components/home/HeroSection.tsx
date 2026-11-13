import React from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { useStore } from '@/stores/useStore';

export function HeroSection() {
  const { setQuoteModalOpen } = useStore();

  const handleScrollToServices = (e: React.MouseEvent) => {
    e.preventDefault();
    const elem = document.getElementById('services-section');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/services';
    }
  };

  const handleScrollToQuote = (e: React.MouseEvent) => {
    e.preventDefault();
    const elem = document.getElementById('quote-modal');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    } else {
      setQuoteModalOpen(true);
    }
  };

  return (
    <section className="relative w-full -mt-20 overflow-hidden bg-[#6B1D2F]">
      <div
        className="relative w-full min-h-[580px] lg:min-h-[660px] bg-cover bg-center flex items-center"
        style={{ backgroundImage: `url('/images/hero-mandap.jpg')` }}
      >
        {/* Scrim gradients matching Stitch code.html for contrast & luxury warmth */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#6B1D2F] via-[#6B1D2F]/85 to-transparent/30 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#4E051A]/90 via-transparent to-[#4E051A]/40 pointer-events-none" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 pt-32 pb-16 w-full">
          <div className="max-w-2xl text-white">
            {/* Kicker badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FDC33E]/20 backdrop-blur-sm text-[#FDE8B3] mb-4 border border-[#FDC33E]/30">
              <span className="material-symbols-outlined text-[16px]">celebration</span>
              <span className="text-xs uppercase tracking-widest text-[#FDE8B3] font-bold">
                Curators of Royal Celebrations
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-heading text-3xl sm:text-5xl lg:text-[54px] font-bold text-white mb-4 leading-[1.18] tracking-tight">
              Celebrating<br />
              Life's Special Moments<br />
              with the Colours &<br />
              <span className="text-[#FDC33E] drop-shadow-sm">Culture of India</span>
            </h1>

            {/* Subtitle Description */}
            <p className="text-sm sm:text-lg text-[#FDE8B3]/90 leading-relaxed mb-8 max-w-xl font-normal">
              Elegant decorations for weddings, pre-wedding ceremonies, birthdays, family functions and milestones.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#services-section"
                onClick={handleScrollToServices}
                className="inline-flex items-center gap-2 bg-[#4E051A] hover:bg-[#4E1220] text-white px-7 py-3.5 rounded-full text-sm font-semibold transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#6B1D2F]/40 border border-white/10"
              >
                <span>Explore Services</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#quote-modal"
                onClick={handleScrollToQuote}
                className="inline-flex items-center gap-2 bg-[#FFFDF9] hover:bg-white text-[#4E1220] px-6 py-3.5 rounded-full text-sm font-semibold transition-all shadow-md hover:shadow-lg"
              >
                <Phone className="w-4 h-4 text-[#6B1D2F]" />
                <span>Get a Quote</span>
              </a>
            </div>
          </div>

          {/* Carousel Indicators */}
          <div className="flex items-center justify-center sm:justify-start gap-2.5 mt-12 sm:mt-16">
            <button aria-label="Slide 1" className="w-3 h-3 rounded-full bg-[#6B1D2F] ring-2 ring-white/70 transition-all" />
            <button aria-label="Slide 2" className="w-2.5 h-2.5 rounded-full bg-white/70 hover:bg-white transition-all" />
            <button aria-label="Slide 3" className="w-2.5 h-2.5 rounded-full bg-white/70 hover:bg-white transition-all" />
          </div>
        </div>
      </div>
    </section>
  );
}
