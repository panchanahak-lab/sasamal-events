import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { useStore } from '@/stores/useStore';

export interface ServiceCardData {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  badge?: string;
}

export const servicesData: ServiceCardData[] = [
  {
    id: 'ring-ceremony',
    title: 'Ring Ceremony',
    description: 'Elegant engagement stage with bespoke floral arches, romantic couple seating, ambient lighting and personalized backdrops.',
    image: '/images/ring-ceremony.jpg',
    link: '/services#engagement-ring-ceremony',
  },
  {
    id: 'haldi-ceremony',
    title: 'Haldi Ceremony',
    description: 'Bright yellow festive decoration, yellow drapes, fresh marigold flowers, colorful umbrellas, traditional urli seating and brass accessories.',
    image: '/images/haldi-ceremony.jpg',
    link: '/services#haldi-mehendi-decorations',
  },
  {
    id: 'mandap-decoration',
    title: 'Mandap Decoration',
    description: 'Traditional sacred wedding mandap with grand pillars, fresh rose and jasmine floral craft, temple bells, holy havan kund and royal aisle styling.',
    image: '/images/mandap-decoration.jpg',
    link: '/services#wedding-mandap-decorations',
  },
  {
    id: 'birthday-celebration',
    title: 'Birthday Celebration',
    description: 'Colourful balloon arches, customized birthday backdrops, illuminated signage, pastel themes and attractive party decorations starting at ₹1,500.',
    image: '/images/birthday-celebration.jpg',
    link: '/packages',
  },
  {
    id: 'family-functions',
    title: 'Family Functions',
    description: 'Warm, dignified arrangements for baby showers (Godh Bharai), naming ceremonies, housewarmings, and family anniversaries with elegant dining styling.',
    image: '/images/family-functions.jpg',
    link: '/services#family-functions',
  },
  {
    id: 'private-functions',
    title: 'Private Functions',
    description: 'Intimate romantic celebrations for 2–5 people: marriage proposals, candlelit anniversary dinners, and terrace dates with candles, lanterns, rose petals, and warm ambiance.',
    image: '/images/private-functions.jpg',
    link: '/services#special-events',
  },
];

export function ServicesSection() {
  const { setQuoteModalOpen } = useStore();

  return (
    <section id="services" className="py-20 sm:py-24 bg-[#FAF8F3]">
      <Container>
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-14 sm:mb-16">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#C5A46D] block mb-2">
            What We Do
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-[#6B1D2F] tracking-tight mb-4">
            Celebrations We Create
          </h2>
          <div className="w-16 h-0.5 bg-[#C5A46D] mx-auto rounded-full" />
        </div>

        {/* Six Service Cards Grid (Desktop: 3 cols, Tablet: 2 cols, Mobile: 1 col) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service) => (
            <div
              key={service.id}
              className="group bg-white rounded-3xl overflow-hidden border border-[#C5A46D]/20 shadow-sm hover:shadow-xl hover:border-[#6B1D2F]/30 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image Container with Consistent Aspect Ratio */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-warm-gray/10">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                </div>

                {/* Card Content */}
                <div className="p-6 sm:p-7">
                  <h3 className="font-heading text-2xl font-bold text-[#292725] group-hover:text-[#6B1D2F] transition-colors mb-3">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[#77716B] leading-relaxed line-clamp-3">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="px-6 pb-6 pt-0 flex items-center justify-between border-t border-gray-100 mt-2">
                <Link
                  to={service.link}
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#6B1D2F] hover:text-[#C5A46D] transition-colors py-2"
                >
                  <span>Explore Details</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <button
                  type="button"
                  onClick={() => setQuoteModalOpen(true)}
                  className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[#FAF8F3] text-[#77716B] hover:bg-[#6B1D2F] hover:text-white transition-all border border-[#C5A46D]/20"
                >
                  Enquire
                </button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
