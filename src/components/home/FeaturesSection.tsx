import React from 'react';
import { Container } from '@/components/ui/Container';

// Custom Outlined Icons matching Stitch design
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
    <section className="py-8 sm:py-12 bg-[#FEF8F5] overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#dac0c2]/30">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-4 p-2 sm:p-3 rounded-xl hover:bg-[#F8F2EF] transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-[#FDC33E]/20 flex items-center justify-center text-[#7A5900] shrink-0">
                  <Icon className="w-6 h-6 stroke-[1.8]" />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-base sm:text-lg font-bold text-[#1D1B19] leading-tight">
                    {feature.title}
                  </h4>
                  <span className="text-xs sm:text-sm text-[#544244]">
                    {feature.subtitle}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
