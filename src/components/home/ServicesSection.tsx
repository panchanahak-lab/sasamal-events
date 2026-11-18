import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';

export interface ServiceCardData {
  id: string;
  title: string;
  images: string[];
  link: string;
  icon: (props: { className?: string }) => React.JSX.Element;
}

// 1. Ring Ceremony Icon: Interlocking rings with diamond
function RingIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="14" r="5" />
      <circle cx="16" cy="14" r="5" />
      <path d="M12 9l1-3 2 1-1 3" />
      <path d="M14 6l1.5-1.5" />
    </svg>
  );
}

// 2. Haldi Ceremony Icon: Traditional Urli bowl with marigold flowers
function HaldiIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 13c0 4.418 4.03 8 9 8s9-3.582 9-8H3z" />
      <path d="M12 4v4" />
      <circle cx="12" cy="7" r="2" fill="currentColor" fillOpacity="0.2" />
      <circle cx="8" cy="10" r="1.5" fill="currentColor" fillOpacity="0.3" />
      <circle cx="16" cy="10" r="1.5" fill="currentColor" fillOpacity="0.3" />
      <path d="M7 13h10" />
    </svg>
  );
}

// 3. Mandap Decoration Icon: Traditional royal mandap structure
function MandapIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8l9-5 9 5v2H3V8z" />
      <path d="M5 10v10" />
      <path d="M9 10v10" />
      <path d="M15 10v10" />
      <path d="M19 10v10" />
      <path d="M2 20h20" />
      <path d="M9 14h6" />
    </svg>
  );
}

// 4. Birthday Celebration Icon: Birthday cake with candles
function BirthdayIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 14h16v6H4z" />
      <path d="M6 10h12v4H6z" />
      <path d="M9 6v4" />
      <path d="M12 6v4" />
      <path d="M15 6v4" />
      <path d="M9 5c0-.5.5-1 1-1s1 .5 1 1" />
      <path d="M12 5c0-.5.5-1 1-1s1 .5 1 1" />
      <path d="M15 5c0-.5.5-1 1-1s1 .5 1 1" />
    </svg>
  );
}

// 5. Family Functions Icon: Family gathering silhouette
function FamilyIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="7" r="3" />
      <path d="M5 20v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2" />
      <circle cx="5" cy="9" r="2" />
      <path d="M1 20v-1a3 3 0 0 1 3-3" />
      <circle cx="19" cy="9" r="2" />
      <path d="M23 20v-1a3 3 0 0 0-3-3" />
    </svg>
  );
}

// 6. Private Functions Icon (Romantic couple celebration: Heart with balloons & sparkles)
function PrivateCelebrationIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {/* Heart Balloon */}
      <path d="M12 14c-2.5-3-5-4.5-5-6.5a3.5 3.5 0 0 1 6-2.3 3.5 3.5 0 0 1 6 2.3c0 2-2.5 3.5-5 6.5l-1 1-1-1z" fill="currentColor" fillOpacity="0.15" />
      {/* String & Bow */}
      <path d="M12 15v5" />
      <path d="M10 20c1 1 3 1 4 0" />
      {/* Sparkles / Ambient glow */}
      <circle cx="4" cy="6" r="1.5" fill="currentColor" />
      <circle cx="20" cy="8" r="1" fill="currentColor" />
    </svg>
  );
}

interface CardImageSliderProps {
  images: string[];
  alt: string;
  intervalMs?: number;
}

function CardImageSlider({ images, alt, intervalMs = 2800 }: CardImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Preload images for instant crossfading
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
      className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-warm-gray/10 shadow-inner select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Sliding Images with Smooth Crossfade */}
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

      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors pointer-events-none z-[1]" />

      {/* Navigation Chevrons on Hover (Desktop) */}
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-black/45 hover:bg-[#6B1D2F] text-white/90 hover:text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm shadow-md hover:scale-110"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-black/45 hover:bg-[#6B1D2F] text-white/90 hover:text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm shadow-md hover:scale-110"
            aria-label="Next image"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </>
      )}

      {/* Discrete Pagination Dots at Bottom Center */}
      {images.length > 1 && (
        <div className="absolute bottom-2.5 inset-x-0 z-10 flex items-center justify-center gap-1.5 pointer-events-auto">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/45 backdrop-blur-sm shadow-sm">
            {images.map((_, dotIndex) => {
              const isActive = dotIndex === currentIndex;
              return (
                <button
                  key={dotIndex}
                  type="button"
                  onClick={(e) => handleSelect(e, dotIndex)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    isActive
                      ? 'w-4 h-1.5 bg-[#F6BD38] shadow-sm'
                      : 'w-1.5 h-1.5 bg-white/70 hover:bg-white hover:scale-125'
                  }`}
                  aria-label={`Go to image ${dotIndex + 1}`}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export const servicesData: ServiceCardData[] = [
  {
    id: 'ring-ceremony',
    title: 'Ring Ceremony',
    images: [
      '/images/hero-ring-ceremony.jpg',
      '/images/ring-ceremony-2.jpg',
      '/images/ring-ceremony.jpg',
    ],
    link: '/services#engagement-ring-ceremony',
    icon: RingIcon,
  },
  {
    id: 'haldi-ceremony',
    title: 'Haldi Ceremony',
    images: [
      '/images/haldi-ceremony-2.jpg',
      '/images/haldi-ceremony.jpg',
      '/images/cultural-banner-urli.jpg',
    ],
    link: '/services#haldi-mehendi-decorations',
    icon: HaldiIcon,
  },
  {
    id: 'mandap-decoration',
    title: 'Mandap Decoration',
    images: [
      '/images/hero-mandap.jpg',
      '/images/hero-destination-wedding.jpg',
      '/images/mandap-decoration.jpg',
    ],
    link: '/services#wedding-mandap-decorations',
    icon: MandapIcon,
  },
  {
    id: 'birthday-celebration',
    title: 'Birthday Celebration',
    images: [
      '/images/hero-birthday-celebration.jpg',
      '/images/birthday-celebration-2.jpg',
      '/images/birthday-celebration-3.jpg',
    ],
    link: '/packages',
    icon: BirthdayIcon,
  },
  {
    id: 'family-functions',
    title: 'Family Functions',
    images: [
      '/images/family-functions-2.jpg',
      '/images/family-functions.jpg',
      '/images/hero-village-theme.jpg',
    ],
    link: '/services#family-functions',
    icon: FamilyIcon,
  },
  {
    id: 'private-functions',
    title: 'Private Functions',
    images: [
      '/images/hero-private-functions.jpg',
      '/images/private-functions-2.jpg',
      '/images/private-functions.jpg',
    ],
    link: '/services#special-events',
    icon: PrivateCelebrationIcon,
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-16 sm:py-24 bg-[#FAF7F2]">
      <Container>
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center justify-center gap-3 mb-2.5">
            <div className="w-8 h-px bg-[#C5A46D]/60" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#6B1D2F]">
              Our Services
            </span>
            <div className="w-8 h-px bg-[#C5A46D]/60" />
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-[#6B1D2F] tracking-tight">
            Celebrations We Create
          </h2>
        </div>

        {/* Six Service Cards Grid (2 rows of 3 columns, matching reference screenshot) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {servicesData.map((service, cardIndex) => {
            const IconComponent = service.icon;
            // Stagger auto-slide timing between 2400ms and 3600ms so cards don't all flip in lockstep
            const intervalMs = 2400 + (cardIndex * 350) % 1400;

            return (
              <Link
                key={service.id}
                to={service.link}
                className="group bg-white rounded-[26px] overflow-hidden border border-[#C5A46D]/25 shadow-sm hover:shadow-xl hover:border-[#6B1D2F]/40 transition-all duration-300 p-4 sm:p-5 flex flex-col justify-between"
              >
                {/* Card Top Header: Icon + Title + Circle Arrow (Exact Reference Layout) */}
                <div className="flex items-center justify-between gap-3 mb-3.5">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-[#FAF5EB] border border-[#C5A46D]/30 flex items-center justify-center text-[#B68B42] shrink-0 group-hover:scale-105 group-hover:bg-[#6B1D2F] group-hover:text-white transition-all">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 className="font-heading text-lg sm:text-xl font-bold text-[#292725] group-hover:text-[#6B1D2F] transition-colors truncate">
                      {service.title}
                    </h3>
                  </div>

                  {/* Circular Arrow Button */}
                  <div className="w-8 h-8 rounded-full border border-gray-200 group-hover:border-[#6B1D2F] group-hover:bg-[#6B1D2F] group-hover:text-white flex items-center justify-center text-[#6B1D2F] transition-all shrink-0">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>

                {/* Card Bottom Photograph: Interactive Multi-Image Auto-Slider */}
                <CardImageSlider
                  images={service.images}
                  alt={service.title}
                  intervalMs={intervalMs}
                />
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
