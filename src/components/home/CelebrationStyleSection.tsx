import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/stores/useStore';

export function CelebrationStyleSection() {
  const { setQuoteModalOpen } = useStore();

  return (
    <section className="py-20 sm:py-24 bg-[#FAF7F2] border-t border-b border-[#C5A46D]/15 overflow-hidden">
      <Container>
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-16">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#C5A46D] block mb-2">
            Curated Aesthetics
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-[#6B1D2F] tracking-tight mb-4">
            Discover Your Celebration Style
          </h2>
          <p className="text-base sm:text-lg text-[#77716B] leading-relaxed max-w-2xl mx-auto">
            From timeless traditions to contemporary elegance, find the perfect theme for your special occasion.
          </p>
          <div className="w-16 h-0.5 bg-[#C5A46D] mx-auto rounded-full mt-4" />
        </div>

        {/* Two Large Theme Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Card 1: Minimal Luxury */}
          <div className="group bg-white rounded-3xl overflow-hidden border border-[#C5A46D]/25 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-warm-gray/10">
                <img
                  src="https://images.unsplash.com/photo-1478146059778-26028b07395a?w=1000&q=80&fit=crop"
                  alt="Minimal Luxury Celebration Theme with Ivory and Champagne Gold"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#6B1D2F] text-xs font-bold uppercase tracking-wider shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 text-[#C5A46D]" />
                    Theme 01
                  </span>
                </div>
              </div>

              <div className="p-7 sm:p-9">
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#292725] group-hover:text-[#6B1D2F] transition-colors mb-3">
                  Minimal Luxury
                </h3>
                <p className="text-base text-[#77716B] leading-relaxed">
                  A timeless and elegant celebration style with ivory tones, champagne gold accents and a refined decor aesthetic.
                </p>
              </div>
            </div>

            <div className="px-7 sm:px-9 pb-8 pt-0">
              <Button
                variant="maroon"
                size="md"
                onClick={() => setQuoteModalOpen(true)}
                className="w-full sm:w-auto shadow-sm"
              >
                <span>Explore Theme</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </div>
          </div>

          {/* Card 2: Enchanted Garden */}
          <div className="group bg-white rounded-3xl overflow-hidden border border-[#C5A46D]/25 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-warm-gray/10">
                <img
                  src="https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=1000&q=80&fit=crop"
                  alt="Enchanted Garden Outdoor Celebration Theme"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#6B1D2F] text-xs font-bold uppercase tracking-wider shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 text-[#C5A46D]" />
                    Theme 02
                  </span>
                </div>
              </div>

              <div className="p-7 sm:p-9">
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#292725] group-hover:text-[#6B1D2F] transition-colors mb-3">
                  Enchanted Garden
                </h3>
                <p className="text-base text-[#77716B] leading-relaxed">
                  A nature-inspired celebration with lush greenery, hanging florals and magical lighting.
                </p>
              </div>
            </div>

            <div className="px-7 sm:px-9 pb-8 pt-0">
              <Button
                variant="maroon"
                size="md"
                onClick={() => setQuoteModalOpen(true)}
                className="w-full sm:w-auto shadow-sm"
              >
                <span>Explore Theme</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
