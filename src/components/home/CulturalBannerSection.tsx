import React from 'react';
import { Sparkles, Calendar, ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/stores/useStore';

export function CulturalBannerSection() {
  const { setQuoteModalOpen } = useStore();

  return (
    <section className="py-16 sm:py-20 bg-[#FAF8F3] overflow-hidden">
      <Container>
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#6B1D2F] via-[#521321] to-[#400E19] text-white p-8 sm:p-14 lg:p-16 shadow-2xl border border-[#C5A46D]/40">
          {/* Subtle Indian Traditional Decorative Mandala / Rangoli Filigree Background Motifs */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full border border-[#C5A46D]/20 opacity-40 pointer-events-none" />
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-64 h-64 rounded-full border border-[#C5A46D]/25 opacity-30 pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-80 h-80 rounded-full border border-[#C5A46D]/20 opacity-40 pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-64 h-64 rounded-full border border-[#C5A46D]/25 opacity-30 pointer-events-none" />

          {/* Golden Ambient Blur Accent */}
          <div className="absolute -top-24 right-1/4 w-96 h-96 bg-[#C5A46D]/15 rounded-full blur-3xl pointer-events-none" />

          {/* Banner Content */}
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            {/* Tag / Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#C5A46D]/40 text-[#D4B887] text-xs font-bold tracking-widest uppercase mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A46D]" />
              <span>Cultural Artistry & Heritage</span>
            </div>

            {/* Main Heading */}
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight tracking-tight">
              Design Your Celebration Inspired by Indian Art
            </h2>

            {/* Description */}
            <p className="text-base sm:text-lg text-white/90 leading-relaxed mb-8 max-w-2xl mx-auto font-light">
              Choose your occasion, pick an art inspiration and let us create a unique celebration for you.
            </p>

            {/* CTA Button */}
            <div className="flex justify-center">
              <Button
                variant="gold"
                size="lg"
                onClick={() => setQuoteModalOpen(true)}
                className="shadow-xl hover:shadow-2xl text-white font-bold px-8 py-3.5 text-sm sm:text-base rounded-full"
              >
                <Calendar className="w-4 h-4 mr-2" />
                <span>Plan My Event</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
