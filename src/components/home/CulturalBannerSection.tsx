import React from 'react';
import { Container } from '@/components/ui/Container';

export function CulturalBannerSection() {
  const handleScrollToQuote = (e: React.MouseEvent) => {
    e.preventDefault();
    const elem = document.getElementById('quote-modal');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full py-10 sm:py-16 px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="relative w-full rounded-2xl overflow-hidden bg-[#6B1D2F] text-white shadow-xl">
        {/* Mandala Background Watermark SVG Pattern on the left edge */}
        <div className="absolute -left-12 -bottom-12 w-64 h-64 text-[#FDE8B3]/10 pointer-events-none">
          <svg className="w-full h-full animate-[spin_60s_linear_infinite]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="90" />
            <circle cx="100" cy="100" r="70" />
            <circle cx="100" cy="100" r="50" />
            <circle cx="100" cy="100" r="30" />
            <path d="M100 10 L100 190 M10 100 L190 100 M36 36 L164 164 M36 164 L164 36" />
            <path d="M100 30 Q130 65 100 100 Q70 65 100 30 Z" />
            <path d="M100 100 Q130 135 100 170 Q70 135 100 100 Z" />
            <path d="M30 100 Q65 130 100 100 Q65 70 30 100 Z" />
            <path d="M100 100 Q135 130 170 100 Q135 70 100 100 Z" />
          </svg>
        </div>

        {/* NATHDWARA PICHWAI ART BACKGROUND MOTIFS (Kamdhenu Sacred Cow, Blooming Pichwai Lotuses, Rajasthani Jharokha Arch) */}
        <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden">
          {/* Blooming Pichwai Lotus Mandala with gentle pulse (Top Right of Text Column) */}
          <div className="absolute top-4 left-1/3 w-48 h-48 text-[#FDE8B3]/20 anim-pichwai-lotus">
            <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" strokeDasharray="2 3" strokeWidth="0.8" />
              {/* Multi-layered Pichwai lotus petals */}
              <path d="M50 15 C58 28 64 38 50 50 C36 38 42 28 50 15 Z" fill="currentColor" fillOpacity="0.15" strokeWidth="1.2" />
              <path d="M50 85 C58 72 64 62 50 50 C36 62 42 72 50 85 Z" fill="currentColor" fillOpacity="0.15" strokeWidth="1.2" />
              <path d="M15 50 C28 42 38 36 50 50 C38 64 28 58 15 50 Z" fill="currentColor" fillOpacity="0.15" strokeWidth="1.2" />
              <path d="M85 50 C72 42 62 36 50 50 C62 64 72 58 85 50 Z" fill="currentColor" fillOpacity="0.15" strokeWidth="1.2" />
              <path d="M25 25 C38 28 44 38 50 50 C38 44 28 38 25 25 Z" strokeWidth="1" />
              <path d="M75 25 C62 28 56 38 50 50 C62 44 72 38 75 25 Z" strokeWidth="1" />
              <path d="M75 75 C62 72 56 62 50 50 C62 56 72 62 75 75 Z" strokeWidth="1" />
              <path d="M25 75 C38 72 44 62 50 50 C38 56 28 62 25 75 Z" strokeWidth="1" />
            </svg>
          </div>

          {/* Pichwai Kamdhenu Cow Silhouette with garland drape (Lower Left text background) */}
          <div className="absolute -bottom-6 left-1/4 w-52 h-44 text-[#FDC33E]/15">
            <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 160 120">
              <path d="M140 100 L135 70 C135 55 125 50 110 50 L85 50 C75 50 68 42 65 30 C60 18 50 15 42 22 C38 25 38 32 40 38 L30 45 C25 48 24 55 28 60 L38 65 L36 100" strokeWidth="1.5" />
              <path d="M52 18 C58 10 65 8 70 12" strokeWidth="1.4" />
              <path d="M38 52 Q50 62 60 52" strokeDasharray="2 3" strokeWidth="1.2" />
              <circle cx="48" cy="28" fill="currentColor" r="1.5" />
            </svg>
          </div>

          {/* Floating Golden Lotus Petals drifting across banner */}
          <div className="absolute bottom-8 left-16 w-8 h-8 text-[#FDC33E]/60 anim-pichwai-petal-1">
            <svg className="w-full h-full" fill="currentColor" viewBox="0 0 30 30">
              <path d="M15 2 C22 10 26 18 15 28 C4 18 8 10 15 2 Z" />
            </svg>
          </div>
          <div className="absolute bottom-16 left-1/2 w-6 h-6 text-[#FDE8B3]/50 anim-pichwai-petal-2">
            <svg className="w-full h-full" fill="currentColor" viewBox="0 0 30 30">
              <path d="M15 2 C22 10 26 18 15 28 C4 18 8 10 15 2 Z" />
            </svg>
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 items-center">
          {/* Text Left Column */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-14">
            <div className="inline-flex items-center gap-2 text-[#FDC33E] mb-2">
              <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
              <span className="text-xs uppercase tracking-widest text-[#FDE8B3] font-bold">Heritage Aesthetics</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-4xl font-bold text-white mb-3 sm:mb-4 leading-tight">
              Design Your Celebration Inspired by Indian Art
            </h2>
            <p className="text-sm sm:text-base text-[#FDE8B3]/90 max-w-lg mb-6 sm:mb-8 leading-relaxed font-normal">
              Choose your occasion, share your aesthetics, and let us create a unique celebration for you.
            </p>
            <a
              href="#quote-modal"
              onClick={handleScrollToQuote}
              className="inline-flex items-center gap-2 bg-[#FDC33E] hover:bg-[#DE9E1E] text-[#261900] px-6 sm:px-8 py-3 rounded-full text-sm font-bold transition-all shadow-md transform hover:-translate-y-0.5"
            >
              <span>Plan My Event</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </a>
          </div>

          {/* Lotus & Urli Graphic Right Column */}
          <div className="lg:col-span-5 h-64 lg:h-full min-h-[260px] relative overflow-hidden flex items-center justify-center p-4 sm:p-6">
            <img
              src="/images/cultural-banner-urli.jpg"
              alt="Traditional Indian celebratory scene with polished brass urli bowl filled with floating pink lotus flowers"
              className="w-full h-full object-cover rounded-xl shadow-inner relative z-10 max-h-[320px]"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
