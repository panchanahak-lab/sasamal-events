import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';

export function CelebrationStyleSection() {
  const handleScrollToQuote = (e: React.MouseEvent) => {
    e.preventDefault();
    const elem = document.getElementById('quote-modal');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-[#FEF8F5] overflow-hidden">
      <Container>
        {/* Section Heading with Decorative Gold Flanking Lines */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-4 mb-2.5">
            <span className="w-12 h-0.5 bg-[#FDC33E] rounded-full" />
            <h2 className="font-heading text-2xl sm:text-4xl lg:text-[40px] font-bold text-[#6B1D2F] tracking-tight">
              Discover Your Celebration Style
            </h2>
            <span className="w-12 h-0.5 bg-[#FDC33E] rounded-full" />
          </div>
          <p className="text-sm sm:text-base text-[#544244] leading-relaxed max-w-xl mx-auto font-normal">
            From timeless traditions to contemporary elegance, find the perfect theme for your special occasion.
          </p>
        </div>

        {/* Two Large Theme Cards (Side by Side on Desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Card 1: Minimal Luxury */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between border border-[#dac0c2]/30">
            {/* Image */}
            <div className="aspect-[16/9] w-full overflow-hidden bg-[#f3ede9]">
              <img
                src="/images/theme-minimal-luxury.jpg"
                alt="Minimal Luxury Celebration Theme"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>

            {/* Card Content & Action Button */}
            <div className="p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              <div className="max-w-md">
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#6B1D2F] mb-1">
                  Minimal Luxury
                </h3>
                <p className="text-xs sm:text-sm text-[#544244] leading-relaxed">
                  A timeless and elegant celebration style with ivory tones, champagne gold accents and a refined decor aesthetic.
                </p>
              </div>

              <a
                href="#quote-modal"
                onClick={handleScrollToQuote}
                className="self-start sm:self-center shrink-0 inline-flex items-center gap-2 bg-[#6B1D2F] hover:bg-[#4E1220] text-white px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-colors shadow-sm"
              >
                <span>Explore Theme</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Card 2: Enchanted Garden */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between border border-[#dac0c2]/30">
            {/* Image */}
            <div className="aspect-[16/9] w-full overflow-hidden bg-[#f3ede9]">
              <img
                src="/images/theme-enchanted-garden.jpg"
                alt="Enchanted Garden Celebration Theme"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>

            {/* Card Content & Action Button */}
            <div className="p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              <div className="max-w-md">
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#6B1D2F] mb-1">
                  Enchanted Garden
                </h3>
                <p className="text-xs sm:text-sm text-[#544244] leading-relaxed">
                  A nature-inspired celebration with lush greenery, hanging florals and magical lighting.
                </p>
              </div>

              <a
                href="#quote-modal"
                onClick={handleScrollToQuote}
                className="self-start sm:self-center shrink-0 inline-flex items-center gap-2 bg-[#6B1D2F] hover:bg-[#4E1220] text-white px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-colors shadow-sm"
              >
                <span>Explore Theme</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
