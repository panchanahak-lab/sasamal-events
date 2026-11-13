import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { useStore } from '@/stores/useStore';

export function CulturalBannerSection() {
  const { setQuoteModalOpen } = useStore();

  return (
    <section className="py-12 sm:py-16 bg-[#FAF7F2] overflow-hidden">
      <Container>
        <div className="relative rounded-[28px] overflow-hidden bg-gradient-to-r from-[#6B1D2F] via-[#5C1423] to-[#4A0E1A] text-white shadow-xl border border-[#C5A46D]/30">
          {/* Subtle Traditional Golden Mandala Line Art Motif (Left edge) */}
          <div className="absolute -left-16 -top-16 w-64 h-64 border-2 border-[#F6BD38]/20 rounded-full pointer-events-none" />
          <div className="absolute -left-8 -top-8 w-48 h-48 border border-[#F6BD38]/25 rounded-full pointer-events-none" />
          <div className="absolute -left-24 -bottom-24 w-80 h-80 border border-[#F6BD38]/15 rounded-full pointer-events-none" />

          {/* Grid Layout: Left Content & Right Authentic Imagery (Matching Reference Screenshot) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Left Column: Heading, Description & Vibrant Yellow Button */}
            <div className="lg:col-span-6 p-8 sm:p-12 lg:p-14 z-10">
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight tracking-tight">
                Design Your Celebration<br />
                Inspired by Indian Art
              </h2>

              <p className="text-sm sm:text-base text-rose-100/90 leading-relaxed mb-7 max-w-md font-light">
                Choose your occasion, pick an art inspiration and let us create a unique celebration for you.
              </p>

              <button
                type="button"
                onClick={() => setQuoteModalOpen(true)}
                className="inline-flex items-center gap-2 bg-[#F6BD38] hover:bg-[#e2ad2b] text-black font-semibold text-sm sm:text-base px-6 py-3 rounded-full transition-all shadow-md hover:shadow-lg"
              >
                <span>Plan My Event</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Right Column: Traditional Brass Urli, Floating Lotus Flowers, Diya & Marigold Garlands */}
            <div className="lg:col-span-6 h-64 sm:h-80 lg:h-full min-h-[300px] lg:min-h-[360px] relative overflow-hidden">
              <img
                src="/images/cultural-banner-urli.jpg"
                alt="Indian Art & Cultural Celebration Decor by Sasamal Events"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
              {/* Soft gradient fade on left of image blending seamlessly into maroon background */}
              <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#6B1D2F] via-[#6B1D2F]/50 to-transparent hidden lg:block" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
