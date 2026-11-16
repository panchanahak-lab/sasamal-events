import React from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { useStore } from '@/stores/useStore';

export function HeroSection() {
  const { setQuoteModalOpen } = useStore();

  const handleScrollToServices = (e: React.MouseEvent) => {
    e.preventDefault();
    const elem = document.getElementById('services');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/services';
    }
  };

  return (
    <section className="relative min-h-[580px] lg:min-h-[660px] max-h-[820px] flex items-center overflow-hidden pt-28 pb-12 w-full">
      {/* Background Image: Outdoor Floral Wedding Mandap */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-mandap.jpg"
          alt="Celebrating Life's Special Moments with Sasamal Events"
          className="w-full h-full object-cover object-center"
        />
        {/* Directional gradient overlay: dark left panel for text legibility, glowing garden mandap on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1C1617]/95 via-[#1C1617]/70 sm:via-[#1C1617]/50 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
      </div>

      {/* Hero Content Container */}
      <Container className="relative z-10 w-full py-8 sm:py-12">
        <div className="max-w-2xl text-left">
          {/* Main Heading (Exact Approved Layout & Yellow/Gold Accent) */}
          <h1 className="font-heading text-3xl sm:text-5xl lg:text-[54px] font-bold text-white mb-5 leading-[1.18] tracking-tight">
            Celebrating<br />
            Life's Special Moments<br />
            with the Colours &<br />
            <span className="text-[#F6BD38]">Culture of India</span>
          </h1>

          {/* Subtitle Description */}
          <p className="text-sm sm:text-lg text-white/90 leading-relaxed mb-8 max-w-xl font-light">
            Elegant decorations for weddings, pre-wedding ceremonies, birthdays, family functions and more.
          </p>

          {/* Action Buttons (Solid Maroon Pill + Pure White Pill with Phone/Quote Icon) */}
          <div className="flex flex-wrap items-center gap-4">
            <a href="#services" onClick={handleScrollToServices}>
              <button
                type="button"
                className="bg-[#6B1D2F] hover:bg-[#521321] text-white rounded-full px-6 sm:px-7 py-3 text-sm font-semibold transition-all inline-flex items-center gap-2 shadow-lg hover:shadow-xl"
              >
                <span>Explore Services</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </a>

            <button
              type="button"
              onClick={() => setQuoteModalOpen(true)}
              className="bg-white hover:bg-gray-100 text-[#6B1D2F] rounded-full px-6 sm:px-7 py-3 text-sm font-semibold transition-all inline-flex items-center gap-2 shadow-lg hover:shadow-xl"
            >
              <Phone className="w-4 h-4 text-[#6B1D2F]" />
              <span>Get a Quote</span>
            </button>
          </div>
        </div>

        {/* Carousel / Slider Pagination Dots (Centered at bottom of banner) */}
        <div className="flex justify-center items-center gap-2 pt-12 sm:pt-16">
          <span className="w-3 h-3 rounded-full bg-[#6B1D2F] ring-2 ring-white/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/70" />
        </div>
      </Container>
    </section>
  );
}
