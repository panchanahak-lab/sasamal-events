import React from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { useStore } from '@/stores/useStore';

export function HeroSection() {
  const { setQuoteModalOpen } = useStore();

  const handleScrollToServices = (e: React.MouseEvent) => {
    e.preventDefault();
    const elem = document.getElementById('services-section');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/services';
    }
  };

  const handleScrollToQuote = (e: React.MouseEvent) => {
    e.preventDefault();
    const elem = document.getElementById('quote-modal');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    } else {
      setQuoteModalOpen(true);
    }
  };

  return (
    <section className="relative w-full -mt-20 overflow-hidden bg-[#6B1D2F]">
      <div
        className="relative w-full min-h-[580px] lg:min-h-[660px] bg-cover bg-center flex items-center"
        style={{ backgroundImage: `url('/images/hero-mandap.jpg')` }}
      >
        {/* Scrim gradients matching Stitch code.html for contrast & luxury warmth */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#6B1D2F] via-[#6B1D2F]/85 to-transparent/30 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#4E051A]/90 via-transparent to-[#4E051A]/40 pointer-events-none" />

        {/* LAYERED AUTHENTIC MADHUBANI ART ANIMATED MOTIFS (Peacock, Mithila Sun, Fish & Lotus hatch patterns) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-[2]">
          {/* Madhubani Radiant Sun / Mithila Surya (Top Right Floating Shimmer) */}
          <div className="absolute -top-12 -right-12 w-80 h-80 lg:w-96 lg:h-96 text-[#FDE8B3] opacity-20 anim-spin-kolam">
            <svg className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="32" strokeDasharray="2 3" strokeWidth="1.8" />
              <circle cx="100" cy="100" fill="currentColor" fillOpacity="0.08" r="24" />
              {/* Sun eyes & serene face elements characteristic of Mithila painting */}
              <path d="M92 94 Q100 90 108 94 M94 105 Q100 110 106 105" strokeWidth="1.2" />
              {/* Dual-line rays with traditional hatching */}
              <g strokeWidth="1">
                <path d="M100 64 L100 20 M96 66 L96 26 M104 66 L104 26" />
                <path d="M100 136 L100 180 M96 134 L96 174 M104 134 L104 174" />
                <path d="M64 100 L20 100 M66 96 L26 96 M66 104 L26 104" />
                <path d="M136 100 L180 100 M134 96 L174 96 M134 104 L174 104" />
                <path d="M74 74 L42 42 M78 72 L48 42 M72 78 L42 48" />
                <path d="M126 126 L158 158 M128 122 L158 152 M122 128 L152 158" />
                <path d="M126 74 L158 42 M122 72 L152 42 M128 78 L158 48" />
                <path d="M74 126 L42 158 M72 122 L42 152 M78 128 L48 158" />
              </g>
              {/* Mithila border ring */}
              <circle cx="100" cy="100" r="82" strokeDasharray="3 4" strokeWidth="1" />
            </svg>
          </div>

          {/* Madhubani Royal Mayura / Peacock motif (Center-Left subtle float) */}
          <div className="absolute top-1/4 -left-10 w-72 h-72 lg:w-96 lg:h-96 text-[#FDC33E] opacity-20 anim-float-madhubani">
            <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 200 200">
              {/* Characteristic double-outline neck and head */}
              <path d="M50 140 C50 100 65 70 85 50 C95 40 105 45 102 58 C98 75 85 95 85 120" strokeWidth="1.8" />
              <path d="M54 138 C54 104 68 76 86 56" strokeDasharray="2 2" strokeWidth="1" />
              {/* Beak and eye */}
              <path d="M102 58 L114 62 L104 66 Z" fill="currentColor" fillOpacity="0.3" />
              <circle cx="95" cy="54" fill="currentColor" r="2.5" />
              {/* Peacock Crest / Kalgi */}
              <path d="M96 46 Q100 32 108 30 M94 48 Q93 32 90 28 M98 48 Q106 36 114 38" strokeWidth="1.2" />
              {/* Madhubani Elaborate Plume Fans with Fish-scale crosshatch */}
              <path d="M85 120 C110 110 160 120 175 145 C155 160 110 165 70 150 Z" fill="currentColor" fillOpacity="0.05" strokeWidth="1.6" />
              <path d="M95 122 C115 115 155 125 165 142" strokeDasharray="3 3" strokeWidth="1" />
              <path d="M90 135 C115 130 145 140 155 150" strokeDasharray="2 3" strokeWidth="1" />
              <circle cx="150" cy="135" r="7" strokeWidth="1.4" />
              <circle cx="150" cy="135" fill="currentColor" r="3" />
              <circle cx="130" cy="125" r="6" strokeWidth="1.4" />
              <circle cx="130" cy="125" fill="currentColor" r="2.5" />
            </svg>
          </div>

          {/* Madhubani Twin Fishes (Matsya) Motif of Prosperity (Bottom Center) */}
          <div className="absolute bottom-6 left-1/3 w-64 h-32 text-[#FDE8B3] opacity-18 anim-float-madhubani" style={{ animationDelay: '-4s' }}>
            <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 240 100">
              {/* Fish 1 */}
              <path d="M20 50 C45 30 75 30 100 50 C75 70 45 70 20 50 Z" fill="currentColor" fillOpacity="0.06" strokeWidth="1.8" />
              <path d="M20 50 L8 36 L12 50 L8 64 Z" fill="currentColor" fillOpacity="0.15" strokeWidth="1.4" />
              {/* Fish Hatching & Eyes */}
              <circle cx="82" cy="48" fill="currentColor" r="3" />
              <path d="M40 38 Q50 50 40 62 M55 35 Q65 50 55 65 M70 38 Q78 50 70 62" strokeWidth="1.2" />
              {/* Lotus beside twin fish */}
              <path d="M140 65 C130 45 138 30 150 25 C162 30 170 45 160 65 Z" strokeWidth="1.5" />
              <path d="M125 65 C120 52 130 40 140 40 C145 52 142 65 142 65 Z" strokeWidth="1.2" />
              <path d="M175 65 C180 52 170 40 160 40 C155 52 158 65 158 65 Z" strokeWidth="1.2" />
            </svg>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 pt-28 pb-16 w-full">
          <div className="max-w-2xl text-white">
            {/* Kicker badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FDC33E]/20 backdrop-blur-sm text-[#FDE8B3] mb-4 border border-[#FDC33E]/30">
              <span className="material-symbols-outlined text-[16px]">celebration</span>
              <span className="text-xs uppercase tracking-widest text-[#FDE8B3] font-bold">
                Curators of Royal Celebrations
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-heading text-3xl sm:text-5xl lg:text-[52px] font-bold text-white mb-4 leading-tight tracking-tight">
              Celebrating Life's Special Moments with the <span className="text-[#FDC33E] drop-shadow-sm">Colours &amp; Culture of India</span>
            </h1>

            {/* Subtitle Description */}
            <p className="text-sm sm:text-lg text-[#FDE8B3]/90 leading-relaxed mb-8 max-w-xl font-normal">
              Elegant decorations for weddings, pre-wedding ceremonies, birthdays, family functions and milestones.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#services-section"
                onClick={handleScrollToServices}
                className="inline-flex items-center gap-2 bg-[#4E051A] hover:bg-[#4E1220] text-white px-7 py-3.5 rounded-full text-sm font-semibold transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#6B1D2F]/40 border border-white/10"
              >
                <span>Explore Services</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </a>

              <a
                href="#quote-modal"
                onClick={handleScrollToQuote}
                className="inline-flex items-center gap-2 bg-[#FFFDF9] hover:bg-white text-[#4E1220] px-6 py-3.5 rounded-full text-sm font-semibold transition-all shadow-md hover:shadow-lg"
              >
                <span className="material-symbols-outlined text-[20px] text-[#6B1D2F]">support_agent</span>
                <span>Get a Quote</span>
              </a>
            </div>
          </div>

          {/* Carousel Indicators */}
          <div className="flex items-center justify-center sm:justify-start gap-2 mt-12 sm:mt-16">
            <button aria-label="Slide 1" className="w-3 h-3 rounded-full bg-[#6B1D2F] ring-2 ring-white/70 transition-all" />
            <button aria-label="Slide 2" className="w-3 h-3 rounded-full bg-white/80 hover:bg-white transition-all" />
            <button aria-label="Slide 3" className="w-3 h-3 rounded-full bg-white/80 hover:bg-white transition-all" />
          </div>
        </div>
      </div>
    </section>
  );
}
