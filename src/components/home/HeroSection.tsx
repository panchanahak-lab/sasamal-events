import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
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
    <section className="relative min-h-[600px] lg:min-h-[720px] max-h-[860px] flex items-center justify-center overflow-hidden pt-24 pb-16 w-full">
      {/* Background Image: Premium Wedding Mandap with Floral Arrangements & Warm Lighting */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=85&fit=crop"
          alt="Traditional Indian Wedding Mandap with Floral Decoration"
          className="w-full h-full object-cover object-center filter brightness-[0.72]"
        />
        {/* Warm Indian Traditional Gradient Overlay: Maroon, Charcoal & Golden Warmth */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#292725]/90 via-[#4F1321]/60 to-[#292725]/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#292725]/95 via-transparent to-black/30" />
      </div>

      {/* Hero Content Container */}
      <Container className="relative z-10 py-12 sm:py-20">
        <div className="max-w-3xl text-left">
          {/* Subtle Golden Sub-badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#C5A46D]/40 text-white/90 text-xs sm:text-sm font-medium mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A46D]" />
            <span className="text-[#FAF8F3]">Navi Mumbai's Premier Event Decorators</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-heading text-2xl sm:text-4xl lg:text-6xl font-bold text-white mb-6 leading-[1.2] tracking-tight break-words">
            Celebrating Life's Special Moments with the Colours & Culture of India
          </h1>

          {/* Description */}
          <p className="text-base sm:text-xl text-[#FAF8F3]/90 leading-relaxed mb-10 max-w-2xl font-light">
            Elegant decorations for weddings, pre-wedding ceremonies, birthdays, family functions and more.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a href="#services" onClick={handleScrollToServices}>
              <Button
                variant="maroon"
                size="lg"
                className="w-full sm:w-auto shadow-xl hover:shadow-2xl border border-[#C5A46D]/40 px-8 py-3.5 text-sm sm:text-base font-semibold"
              >
                <span>Explore Services</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </a>

            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-2 border-[#C5A46D] text-[#FAF8F3] hover:bg-[#C5A46D] hover:text-white px-8 py-3.5 text-sm sm:text-base font-semibold transition-all backdrop-blur-sm"
              onClick={() => setQuoteModalOpen(true)}
            >
              Get a Quote
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
