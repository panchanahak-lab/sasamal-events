import React from 'react';
import { Palette, Award, MapPin } from 'lucide-react';
import { Container } from '@/components/ui/Container';

const features = [
  {
    icon: Palette,
    title: 'Customised Themes',
    subtitle: 'As per your style.',
  },
  {
    icon: Award,
    title: 'Quality Execution',
    subtitle: 'From concept to celebration.',
  },
  {
    icon: MapPin,
    title: 'Navi Mumbai & Beyond',
    subtitle: 'Your local celebration partner.',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-16 sm:py-20 bg-[#FAF7F2] border-t border-[#C5A46D]/15">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center text-center p-8 rounded-3xl bg-white border border-[#C5A46D]/20 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                {/* Gold-style Icon Container */}
                <div className="w-16 h-16 rounded-2xl bg-[#FAF8F3] border border-[#C5A46D]/30 flex items-center justify-center text-[#C5A46D] mb-5 shadow-inner">
                  <Icon className="w-8 h-8 stroke-[1.75]" />
                </div>

                {/* Title */}
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#6B1D2F] mb-1.5">
                  {feature.title}
                </h3>

                {/* Subtitle */}
                <p className="text-sm font-medium text-[#77716B]">
                  {feature.subtitle}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
