import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { useStore } from '@/stores/useStore';

export function CelebrationStyleSection() {
  const { setQuoteModalOpen } = useStore();

  return (
    <section className="py-16 sm:py-24 bg-[#FAF7F2] overflow-hidden">
      <Container>
        {/* Section Heading with Decorative Gold Flanking Lines */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center justify-center gap-4 mb-2.5">
            <div className="w-12 sm:w-16 h-px bg-[#C5A46D]/70" />
            <h2 className="font-heading text-2xl sm:text-4xl lg:text-[40px] font-bold text-[#6B1D2F] tracking-tight">
              Discover Your Celebration Style
            </h2>
            <div className="w-12 sm:w-16 h-px bg-[#C5A46D]/70" />
          </div>
          <p className="text-sm sm:text-base text-[#77716B] leading-relaxed max-w-xl mx-auto font-normal">
            From timeless traditions to contemporary elegance, find the perfect theme for your special occasion.
          </p>
        </div>

        {/* Two Large Theme Cards (Side by Side on Desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Card 1: Minimal Luxury */}
          <div className="group bg-white rounded-[26px] overflow-hidden border border-[#C5A46D]/25 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            {/* Image */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-warm-gray/10">
              <img
                src="/images/theme-minimal-luxury.jpg"
                onError={(e) => {
                  // Fallback if local image is still processing
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1000&q=80&fit=crop';
                }}
                alt="Minimal Luxury Celebration Style"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
            </div>

            {/* Card Content & Action Button (Aligned to match reference screenshot) */}
            <div className="p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              <div className="max-w-md">
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#6B1D2F] mb-1.5">
                  Minimal Luxury
                </h3>
                <p className="text-xs sm:text-sm text-[#77716B] leading-relaxed">
                  A timeless and elegant celebration style with ivory tones, champagne gold accents and a refined decor aesthetic.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setQuoteModalOpen(true)}
                className="bg-[#6B1D2F] hover:bg-[#521321] text-white rounded-full px-5 py-2.5 text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-all shadow-sm hover:shadow shrink-0 self-start sm:self-center"
              >
                <span>Explore Theme</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 2: Enchanted Garden */}
          <div className="group bg-white rounded-[26px] overflow-hidden border border-[#C5A46D]/25 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            {/* Image */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-warm-gray/10">
              <img
                src="/images/theme-enchanted-garden.jpg"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=1000&q=80&fit=crop';
                }}
                alt="Enchanted Garden Celebration Style"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
            </div>

            {/* Card Content & Action Button */}
            <div className="p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              <div className="max-w-md">
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#6B1D2F] mb-1.5">
                  Enchanted Garden
                </h3>
                <p className="text-xs sm:text-sm text-[#77716B] leading-relaxed">
                  A nature-inspired celebration with lush greenery, hanging florals and magical lighting.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setQuoteModalOpen(true)}
                className="bg-[#6B1D2F] hover:bg-[#521321] text-white rounded-full px-5 py-2.5 text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-all shadow-sm hover:shadow shrink-0 self-start sm:self-center"
              >
                <span>Explore Theme</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
