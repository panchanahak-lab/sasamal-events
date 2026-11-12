import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { defaultServices } from '@/data/defaults';

const serviceImages: Record<string, string> = {
  'birthday-celebrations': 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=600&fit=crop',
  'engagement-ring-ceremony': 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop',
  'wedding-decorations': 'https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?w=800&h=600&fit=crop',
  'reception-decorations': 'https://images.unsplash.com/photo-1478146059778-26028b07395a?w=800&h=600&fit=crop',
  'family-functions': 'https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=800&h=600&fit=crop',
  'special-events': 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=800&h=600&fit=crop',
};

export function ServicesSection() {
  return (
    <section className="py-20 sm:py-28 bg-white" id="services">
      <Container>
        <SectionHeading
          subtitle="Tailored Celebrations"
          title="Explore Our Services"
          description="Whether you are planning an intimate birthday celebration at home or a grand reception at a banquet in Navi Mumbai, we create authentic, beautiful atmospheres."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {defaultServices.map((service) => (
            <div
              key={service.id}
              className="group bg-[#FAF8F3] rounded-3xl overflow-hidden border border-warm-gray-light/20 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Image Frame with consistent 4:3 ratio */}
              <div className="relative aspect-[4/3] overflow-hidden bg-warm-gray-light/10">
                <img
                  src={serviceImages[service.slug] || serviceImages['birthday-celebrations']}
                  alt={service.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#292725]/60 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[11px] font-semibold text-[#292725] tracking-wide uppercase">
                  {service.category === 'direct' ? 'Direct Service' : 'Curated Event'}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#292725] mb-2.5 group-hover:text-[#C5A46D] transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-sm text-[#77716B] leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-warm-gray-light/20 flex items-center justify-between">
                  <Link
                    to={`/services#${service.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#292725] group-hover:text-[#C5A46D] transition-colors"
                  >
                    <span>Explore Service Details</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#C5A46D] shadow-sm">
                    <Sparkles className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
