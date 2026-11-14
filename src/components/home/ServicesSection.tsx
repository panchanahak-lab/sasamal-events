import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';

export interface ServiceCardData {
  id: string;
  title: string;
  image: string;
  link: string;
  icon: string;
}

export const servicesData: ServiceCardData[] = [
  {
    id: 'ring-ceremony',
    title: 'Ring Ceremony',
    image: '/images/ring-ceremony.jpg',
    link: '#quote-modal',
    icon: 'favorite',
  },
  {
    id: 'haldi-ceremony',
    title: 'Haldi Ceremony',
    image: '/images/haldi-ceremony.jpg',
    link: '#quote-modal',
    icon: 'palette',
  },
  {
    id: 'mandap-decoration',
    title: 'Mandap Decoration',
    image: '/images/mandap-decoration.jpg',
    link: '#quote-modal',
    icon: 'temple_hindu',
  },
  {
    id: 'birthday-celebration',
    title: 'Birthday Celebration',
    image: '/images/birthday-celebration.jpg',
    link: '#quote-modal',
    icon: 'cake',
  },
  {
    id: 'family-functions',
    title: 'Family Functions',
    image: '/images/family-functions.jpg',
    link: '#quote-modal',
    icon: 'diversity_1',
  },
  {
    id: 'private-functions',
    title: 'Private Functions',
    image: '/images/private-functions.jpg',
    link: '#quote-modal',
    icon: 'wine_bar',
  },
];

export function ServicesSection() {
  const handleScrollToQuote = (e: React.MouseEvent) => {
    e.preventDefault();
    const elem = document.getElementById('quote-modal');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full py-16 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto overflow-hidden" id="services-section">
      {/* SACRED GEOMETRY KOLAM BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center">
        {/* Top Left Radial Kolam Mandala */}
        <div className="absolute -top-24 -left-24 w-96 h-96 text-[#7a5900]/15 anim-spin-kolam">
          <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 300 300">
            {/* 8-petaled Kolam geometry with pulli dots */}
            <circle cx="150" cy="150" r="140" strokeDasharray="4 6" strokeWidth="1" />
            <circle cx="150" cy="150" r="100" strokeWidth="1.2" />
            <circle cx="150" cy="150" r="60" strokeWidth="1" />
            <circle cx="150" cy="150" r="20" strokeWidth="1.5" />
            {/* 8 radial looping loops (Sikku / Brahma Mudi) */}
            <path d="M150 10 Q190 70 150 150 Q110 70 150 10 Z" strokeWidth="1.4" />
            <path d="M150 290 Q190 230 150 150 Q110 230 150 290 Z" strokeWidth="1.4" />
            <path d="M10 150 Q70 190 150 150 Q70 110 10 150 Z" strokeWidth="1.4" />
            <path d="M290 150 Q230 190 150 150 Q230 110 290 150 Z" strokeWidth="1.4" />
            <path d="M51 51 Q110 90 150 150 Q90 110 51 51 Z" strokeWidth="1.4" />
            <path d="M249 249 Q190 210 150 150 Q210 190 249 249 Z" strokeWidth="1.4" />
            <path d="M249 51 Q210 110 150 150 Q190 90 249 51 Z" strokeWidth="1.4" />
            <path d="M51 249 Q90 190 150 150 Q110 210 51 249 Z" strokeWidth="1.4" />
            {/* Symmetric Pulli dots */}
            <circle cx="150" cy="50" fill="currentColor" r="3" />
            <circle cx="150" cy="250" fill="currentColor" r="3" />
            <circle cx="50" cy="150" fill="currentColor" r="3" />
            <circle cx="250" cy="150" fill="currentColor" r="3" />
          </svg>
        </div>

        {/* Bottom Right Counter-Spinning Kolam */}
        <div className="absolute -bottom-28 -right-28 w-[420px] h-[420px] text-[#6b1d2f]/10 anim-spin-kolam-rev">
          <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 300 300">
            <circle cx="150" cy="150" r="135" strokeWidth="1.2" />
            <polygon points="150,20 270,150 150,280 30,150" strokeWidth="1.2" />
            <polygon points="150,40 250,150 150,260 50,150" strokeDasharray="3 3" strokeWidth="0.8" />
            <rect height="150" rx="8" strokeWidth="1.2" transform="rotate(45 150 150)" width="150" x="75" y="75" />
            {/* Lotus center petal */}
            <path d="M150 90 C170 120 180 150 150 180 C120 150 130 120 150 90 Z" strokeWidth="1.4" />
            <path d="M90 150 C120 170 150 180 180 150 C150 120 120 130 90 150 Z" strokeWidth="1.4" />
          </svg>
        </div>

        {/* Central Ambient Pulsing Kolam Floral Grid */}
        <div className="w-[620px] h-[620px] text-[#7a5900]/10 anim-kolam-pulse">
          <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 400 400">
            <circle cx="200" cy="200" r="180" strokeDasharray="5 7" strokeWidth="0.8" />
            {/* Geometric Kolam Interlocking loops */}
            <g strokeWidth="1">
              <path d="M200 40 C280 40 360 120 360 200 C360 280 280 360 200 360 C120 360 40 280 40 200 C40 120 120 40 200 40 Z" />
              <path d="M86 86 Q200 150 314 86 Q250 200 314 314 Q200 250 86 314 Q150 200 86 86 Z" />
              <circle cx="200" cy="200" r="30" strokeWidth="1" />
              <circle cx="200" cy="200" fill="currentColor" r="4" />
            </g>
          </svg>
        </div>
      </div>

      {/* Header with decorative filigree line */}
      <div className="relative z-10 flex flex-col items-center text-center mb-12 sm:mb-16">
        <div className="flex items-center justify-center gap-3 mb-2">
          <span className="w-12 h-0.5 bg-[#FDC33E] rounded-full" />
          <span className="text-xs uppercase tracking-widest text-[#7A5900] font-bold">
            Our Services
          </span>
          <span className="w-12 h-0.5 bg-[#FDC33E] rounded-full" />
        </div>
        <h2 className="font-heading text-3xl sm:text-5xl font-bold text-[#6B1D2F]">
          Celebrations We Create
        </h2>
      </div>

      {/* 6 Card Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {servicesData.map((service) => (
          <div
            key={service.id}
            className="group bg-white rounded-xl p-4 sm:p-5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between border border-[#dac0c2]/30"
          >
            <div>
              {/* Card Top Header */}
              <div className="flex items-center justify-between pb-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#f3ede9] flex items-center justify-center text-[#7a5900] group-hover:bg-[#6b1d2f] group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-[24px]">{service.icon}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1D1B19]">
                    {service.title}
                  </h3>
                </div>

                <a
                  href="#quote-modal"
                  onClick={handleScrollToQuote}
                  aria-label={`View ${service.title}`}
                  className="w-8 h-8 rounded-full bg-[#f3ede9] flex items-center justify-center text-[#6B1D2F] group-hover:bg-[#6B1D2F] group-hover:text-white transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </a>
              </div>

              {/* Card Bottom Image */}
              <div className="overflow-hidden rounded-lg aspect-[16/10] bg-[#f3ede9]">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
