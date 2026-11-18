import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { useStore } from '@/stores/useStore';

interface StyleImageSliderProps {
  images: string[];
  alt: string;
  intervalMs?: number;
}

function StyleImageSlider({ images, alt, intervalMs = 3200 }: StyleImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [images]);

  useEffect(() => {
    if (isHovered || images.length <= 1) return;

    const timer = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isHovered, images.length, intervalMs]);

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handleSelect = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex(index);
  };

  return (
    <div
      className="relative aspect-[16/10] w-full overflow-hidden bg-warm-gray/10 select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {images.map((src, index) => {
        const isActive = index === currentIndex;
        return (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              isActive ? 'opacity-100 z-0' : 'opacity-0 pointer-events-none'
            }`}
          >
            <img
              src={src}
              alt={`${alt} ${index + 1}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
            />
          </div>
        );
      })}

      <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors pointer-events-none z-[1]" />

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/45 hover:bg-[#6B1D2F] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm shadow-md hover:scale-110"
            aria-label="Previous theme image"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/45 hover:bg-[#6B1D2F] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm shadow-md hover:scale-110"
            aria-label="Next theme image"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <div className="absolute bottom-3 inset-x-0 z-10 flex items-center justify-center gap-1.5 pointer-events-auto">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/45 backdrop-blur-sm shadow-sm">
              {images.map((_, dotIndex) => {
                const isActive = dotIndex === currentIndex;
                return (
                  <button
                    key={dotIndex}
                    type="button"
                    onClick={(e) => handleSelect(e, dotIndex)}
                    className={`transition-all duration-300 rounded-full cursor-pointer ${
                      isActive
                        ? 'w-5 h-1.5 bg-[#F6BD38] shadow-sm'
                        : 'w-1.5 h-1.5 bg-white/70 hover:bg-white hover:scale-125'
                    }`}
                    aria-label={`Go to theme slide ${dotIndex + 1}`}
                  />
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export function CelebrationStyleSection() {
  const { setQuoteModalOpen } = useStore();

  const minimalLuxuryImages = [
    '/images/theme-minimal-luxury.jpg',
    '/images/ring-ceremony.jpg',
  ];

  const enchantedGardenImages = [
    '/images/theme-enchanted-garden.jpg',
    '/images/hero-mandap.jpg',
  ];

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
            {/* Sliding Image Showcase */}
            <StyleImageSlider
              images={minimalLuxuryImages}
              alt="Minimal Luxury Celebration Style"
              intervalMs={3000}
            />

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
            {/* Sliding Image Showcase */}
            <StyleImageSlider
              images={enchantedGardenImages}
              alt="Enchanted Garden Celebration Style"
              intervalMs={3400}
            />

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
