import React from 'react';
import { Container } from '@/components/ui/Container';

// Custom Gold Outlined Icons matching reference screenshot
function DiamondIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3h12l4 6-10 12L2 9l4-6z" />
      <path d="M2 9h20" />
      <path d="M12 21L8.5 9 12 3l3.5 6L12 21z" />
    </svg>
  );
}

function RosetteAwardIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="9" r="6" />
      <path d="M8.21 13.89L7 22l5-3 5 3-1.21-8.11" />
      <circle cx="12" cy="9" r="2.5" fill="currentColor" fillOpacity="0.2" />
    </svg>
  );
}

function LocationPinIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" fill="currentColor" fillOpacity="0.2" />
    </svg>
  );
}

const features = [
  {
    icon: DiamondIcon,
    title: 'Customised Themes',
    subtitle: 'as per your style',
  },
  {
    icon: RosetteAwardIcon,
    title: 'Quality Execution',
    subtitle: 'From concept to celebration',
  },
  {
    icon: LocationPinIcon,
    title: 'Navi Mumbai & Beyond',
    subtitle: 'Your local celebration partner',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-8 sm:py-12 bg-[#FAF7F2] overflow-hidden">
      <Container>
        {/* Horizontal Card / Strip with 3 Segmented Features & Vertical Dividers */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#C5A46D]/25 shadow-sm p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 items-center">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className={`flex items-center gap-4 px-4 sm:px-6 py-2 ${
                    idx < features.length - 1 ? 'md:border-r md:border-[#C5A46D]/25' : ''
                  }`}
                >
                  {/* Gold Badge Icon Container */}
                  <div className="w-12 h-12 rounded-full border border-[#C5A46D]/50 bg-[#FAF7F0] flex items-center justify-center text-[#B68B42] shrink-0 shadow-sm">
                    <Icon className="w-6 h-6 stroke-[1.8]" />
                  </div>

                  {/* Feature Title & Subtitle */}
                  <div>
                    <h3 className="font-heading text-base sm:text-lg font-bold text-[#2A2421] leading-tight mb-0.5">
                      {feature.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#77716B] font-normal">
                      {feature.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
