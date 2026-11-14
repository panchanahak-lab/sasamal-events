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
    <section className="relative w-full py-16 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* GOND ART BACKGROUND (Mahua Tree of Life, Dotted Lines & Stippling Branches) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Gond Mahua Tree of Life on Left Side */}
        <div className="absolute -left-16 bottom-0 w-80 h-96 text-[#7a5900]/18 anim-sway-gond">
          <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 240 320">
            {/* Curved central trunk with rhythmic Gond stippling / dashes */}
            <path d="M120 320 C110 240 80 180 100 110 C110 70 140 30 150 10" strokeWidth="2.5" />
            <path d="M128 320 C118 240 92 185 110 115 C118 80 145 40 155 20" strokeDasharray="3 4" strokeWidth="1" />
            {/* Gond branching limbs with stippled leaf clusters */}
            <path d="M96 175 C60 160 30 130 20 90" strokeWidth="1.8" />
            <path d="M102 140 C140 130 180 110 210 70" strokeWidth="1.8" />
            <path d="M110 95 C80 80 60 50 50 20" strokeWidth="1.5" />
            {/* Stylized Gond tribal bird perched on branch */}
            <path d="M60 130 C75 115 90 120 95 132 C85 140 70 142 60 130 Z" fill="currentColor" fillOpacity="0.1" strokeWidth="1.5" />
            <circle cx="88" cy="124" fill="currentColor" r="1.8" />
            <path d="M95 125 L102 122" strokeWidth="1.2" />
            {/* Floating Gond tribal dot clusters / Mahua florets */}
            <g fill="currentColor">
              <circle cx="30" cy="85" r="2.5" />
              <circle cx="22" cy="78" r="2" />
              <circle cx="38" cy="80" r="1.8" />
              <circle cx="205" cy="65" r="2.5" />
              <circle cx="215" cy="60" r="2" />
              <circle cx="198" cy="72" r="1.8" />
              <circle cx="55" cy="15" r="2.2" />
              <circle cx="48" cy="24" r="1.8" />
            </g>
          </svg>
        </div>

        {/* Gond Stylized Deer & Foliage on Right Side */}
        <div className="absolute -right-12 top-10 w-72 h-80 text-[#6B1D2F]/12 anim-sway-gond" style={{ animationDelay: '-5s' }}>
          <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 200 240">
            {/* Graceful Gond Deer Silhouette with line-dash patterning */}
            <path d="M140 180 L140 120 C140 100 120 90 105 85 L90 60 C85 52 75 55 76 65 L82 85 C65 95 60 115 60 140 L60 180" strokeWidth="1.8" />
            <path d="M85 60 C90 40 105 30 115 20 M92 50 C102 38 120 35 130 30" strokeWidth="1.4" />
            {/* Characteristic linear stipple infill lines */}
            <path d="M72 105 C85 105 120 108 130 115" strokeDasharray="2 3" strokeWidth="1" />
            <path d="M70 120 C85 120 120 122 132 130" strokeDasharray="2 3" strokeWidth="1" />
            <path d="M72 135 C85 135 120 138 130 145" strokeDasharray="2 3" strokeWidth="1" />
            <circle cx="80" cy="68" fill="currentColor" r="2" />
          </svg>
        </div>
      </div>

      {/* Header */}
      <div className="relative z-10 flex flex-col items-center text-center mb-12 sm:mb-16">
        <div className="flex items-center justify-center gap-3 mb-2">
          <span className="w-12 h-0.5 bg-[#FDC33E] rounded-full" />
          <h2 className="font-heading text-2xl sm:text-4xl lg:text-[40px] font-bold text-[#6B1D2F] tracking-tight">
            Discover Your Celebration Style
          </h2>
          <span className="w-12 h-0.5 bg-[#FDC33E] rounded-full" />
        </div>
        <p className="text-sm sm:text-base text-[#544244] max-w-xl mx-auto">
          From timeless traditions to contemporary elegance, find the perfect theme for your special occasion.
        </p>
      </div>

      {/* 2 Themes Grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Theme 1: Minimal Luxury */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between border border-[#dac0c2]/30">
          <div className="aspect-[16/9] w-full overflow-hidden bg-[#f3ede9]">
            <img
              src="/images/theme-minimal-luxury.jpg"
              alt="Minimal Luxury Celebration Theme"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>
          <div className="p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="max-w-md">
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#6B1D2F] mb-1">
                Minimal Luxury
              </h3>
              <p className="text-xs sm:text-sm text-[#544244] leading-relaxed">
                A timeless and elegant celebration style with ivory tones, champagne gold accents and a refined decor aesthetic.
              </p>
            </div>
            <button
              onClick={handleScrollToQuote}
              type="button"
              className="self-start sm:self-center shrink-0 inline-flex items-center gap-2 bg-[#6B1D2F] hover:bg-[#4E1220] text-white px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-colors shadow-sm"
            >
              <span>Explore Theme</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Theme 2: Enchanted Garden */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between border border-[#dac0c2]/30">
          <div className="aspect-[16/9] w-full overflow-hidden bg-[#f3ede9]">
            <img
              src="/images/theme-enchanted-garden.jpg"
              alt="Enchanted Garden Celebration Theme"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>
          <div className="p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="max-w-md">
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#6B1D2F] mb-1">
                Enchanted Garden
              </h3>
              <p className="text-xs sm:text-sm text-[#544244] leading-relaxed">
                A nature-inspired celebration with lush greenery, hanging florals and magical lighting.
              </p>
            </div>
            <button
              onClick={handleScrollToQuote}
              type="button"
              className="self-start sm:self-center shrink-0 inline-flex items-center gap-2 bg-[#6B1D2F] hover:bg-[#4E1220] text-white px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-colors shadow-sm"
            >
              <span>Explore Theme</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
