import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Phone, ChevronLeft, ChevronRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { useStore } from '@/stores/useStore';

export interface HeroSlide {
  id: string;
  name: string;
  themeTag: string;
  image: string;
  alt: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'garden-mandap',
    name: 'Garden Type Mandap',
    themeTag: 'Lush Garden Floral Style',
    image: '/images/hero-mandap.jpg',
    alt: 'Royal Garden Wedding Mandap Decoration by Sasamal Events',
  },
  {
    id: 'village-theme',
    name: 'Village Theme Heritage',
    themeTag: 'Traditional Rustic Marigold Decor',
    image: '/images/hero-village-theme.jpg',
    alt: 'Authentic Indian Village Theme Wedding Mandap with Marigolds and Brass Urlis',
  },
  {
    id: 'minimal-luxury',
    name: 'Minimal Luxury',
    themeTag: 'Ivory & Champagne Gold Elegance',
    image: '/images/theme-minimal-luxury.jpg',
    alt: 'Minimal Luxury Wedding Stage Decor with Floral Arch and Royal Seating',
  },
  {
    id: 'destination-wedding',
    name: 'Destination Wedding',
    themeTag: 'Scenic Lakeside Palace Grandeur',
    image: '/images/hero-destination-wedding.jpg',
    alt: 'Luxury Destination Wedding Mandap on Lakeside Palace Terrace at Sunset',
  },
  {
    id: 'enchanted-garden',
    name: 'Enchanted Garden',
    themeTag: 'Fairy Lights & Hanging Wisteria',
    image: '/images/theme-enchanted-garden.jpg',
    alt: 'Enchanted Garden Twilight Wedding Setting with Floral Canopy and Fairy Lights',
  },
];

export function HeroSection() {
  const { setQuoteModalOpen } = useStore();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoSlideTimerRef = useRef<number | null>(null);

  // Auto-slide every 5 seconds
  useEffect(() => {
    // Preload all slide images into browser cache
    HERO_SLIDES.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });
  }, []);

  useEffect(() => {
    if (isPaused) return;

    autoSlideTimerRef.current = window.setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);

    return () => {
      if (autoSlideTimerRef.current) {
        clearInterval(autoSlideTimerRef.current);
      }
    };
  }, [isPaused]);

  const handlePrevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleNextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handleSelectSlide = (index: number) => {
    setCurrentSlideIndex(index);
  };

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
    <section
      className="relative min-h-[580px] lg:min-h-[660px] max-h-[820px] flex items-center overflow-hidden pt-28 pb-12 w-full select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Image Slider with Smooth Crossfade */}
      <div className="absolute inset-0 z-0">
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === currentSlideIndex;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-0' : 'opacity-0 pointer-events-none'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                className={`w-full h-full object-cover object-center transition-transform duration-7000 ease-out ${
                  isActive ? 'scale-100' : 'scale-105'
                }`}
                loading="eager"
              />
            </div>
          );
        })}

        {/* Directional gradient overlay: dark left panel for text legibility, glowing wedding backdrop on right */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#1C1617]/95 via-[#1C1617]/70 sm:via-[#1C1617]/50 to-black/25 pointer-events-none" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/50 via-transparent to-black/25 pointer-events-none" />
      </div>

      {/* Prev / Next Chevrons on Desktop */}
      <button
        type="button"
        onClick={handlePrevSlide}
        className="hidden md:flex absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/35 hover:bg-[#6B1D2F] text-white/80 hover:text-white items-center justify-center backdrop-blur-md border border-white/20 transition-all hover:scale-105 shadow-lg"
        aria-label="Previous wedding theme slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        type="button"
        onClick={handleNextSlide}
        className="hidden md:flex absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/35 hover:bg-[#6B1D2F] text-white/80 hover:text-white items-center justify-center backdrop-blur-md border border-white/20 transition-all hover:scale-105 shadow-lg"
        aria-label="Next wedding theme slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

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

        {/* Carousel / Slider Pagination Dots with Active Theme Indicator */}
        <div className="flex flex-col items-center justify-center gap-2.5 pt-12 sm:pt-16 z-20 relative">
          {/* Active Wedding Theme Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/45 backdrop-blur-md border border-white/20 text-[11px] sm:text-xs text-rose-100 font-medium transition-all shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#F6BD38] animate-pulse" />
            <span>Theme: <strong className="text-white font-bold">{HERO_SLIDES[currentSlideIndex].name}</strong></span>
          </div>

          {/* Interactive Pagination Dots */}
          <div className="flex items-center gap-2.5 mt-0.5">
            {HERO_SLIDES.map((slide, index) => {
              const isActive = index === currentSlideIndex;
              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => handleSelectSlide(index)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    isActive
                      ? 'w-7 h-2.5 bg-[#F6BD38] ring-2 ring-white/60 shadow-md'
                      : 'w-2.5 h-2.5 bg-white/60 hover:bg-white hover:scale-125'
                  }`}
                  aria-label={`Go to slide ${index + 1}: ${slide.name}`}
                />
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
