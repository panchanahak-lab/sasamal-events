import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
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
    <section className="py-12 sm:py-16 bg-[#FEF8F5] overflow-hidden">
      <Container>
        <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-[#6B1D2F] text-white shadow-xl">
          {/* Subtle Rotating Mandala Watermark SVG Pattern */}
          <div className="absolute -left-12 -bottom-12 w-64 h-64 text-[#FDE8B3]/10 pointer-events-none">
            <svg
              className="w-full h-full animate-[spin_60s_linear_infinite]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 200 200"
            >
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

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-14">
              <div className="inline-flex items-center gap-2 text-[#FDC33E] mb-2">
                <Sparkles className="w-4 h-4 text-[#FDC33E]" />
                <span className="text-xs uppercase tracking-widest text-[#FDE8B3] font-bold">
                  Heritage Aesthetics
                </span>
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
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Right Lotus & Urli Photograph */}
            <div className="lg:col-span-5 h-64 lg:h-full min-h-[260px] relative overflow-hidden flex items-center justify-center p-4 sm:p-6">
              <img
                src="/images/cultural-banner-urli.jpg"
                alt="Traditional Indian Urli with Floating Lotus Flowers and Diya"
                className="w-full h-full object-cover rounded-xl shadow-inner max-h-[320px]"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
