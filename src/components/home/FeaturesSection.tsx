import React from 'react';
import { Container } from '@/components/ui/Container';

const features = [
  {
    icon: 'diamond',
    title: 'Customised Themes',
    subtitle: 'as per your style',
  },
  {
    icon: 'verified',
    title: 'Quality Execution',
    subtitle: 'From concept to celebration',
  },
  {
    icon: 'location_on',
    title: 'Navi Mumbai & Beyond',
    subtitle: 'Your local celebration partner',
  },
];

export function FeaturesSection() {
  return (
    <section className="w-full py-8 sm:py-12 px-4 sm:px-8 max-w-7xl mx-auto overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#dac0c2]/30">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 p-2 sm:p-3 rounded-xl hover:bg-[#F8F2EF] transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-[#FDC33E]/15 flex items-center justify-center text-[#7A5900] shrink-0">
              <span className="material-symbols-outlined text-[28px]">{feature.icon}</span>
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
        ))}
      </div>
    </section>
  );
}
