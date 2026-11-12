import React from 'react';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/stores/useStore';

const premiumHighlights = [
  {
    title: 'Engagement & Ring Ceremony Stages',
    description: 'Elegantly styled couple backdrops, bespoke floral arches, and warm mood lighting tailored for your memorable promise.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1000&q=80&fit=crop',
    tags: ['Couple Seating', 'Ring Ceremony Stage', 'Fairy Light Drapery'],
  },
  {
    title: 'Traditional & Modern Wedding Mandaps',
    description: 'Authentic Indian mandaps decorated with fresh marigolds, roses, brass elements, and rich fabrics suited for banquet halls and lawns.',
    image: 'https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?w=1000&q=80&fit=crop',
    tags: ['Mandap Styling', 'Havan Kund Setup', 'Pooja Decor'],
  },
  {
    title: 'Grand Reception Stages',
    description: 'Sophisticated floral installations, thematic stage framing, and dramatic ambient lighting that make a striking statement.',
    image: 'https://images.unsplash.com/photo-1478146059778-26028b07395a?w=1000&q=80&fit=crop',
    tags: ['Floral Wall', 'LED Backdrop', 'Sofa & Stage Pedestals'],
  },
  {
    title: 'Customised Family Celebrations',
    description: 'Bespoke themes for Baby Showers, Silver Jubilees, Naming Ceremonies, and private rooftop soirees across Navi Mumbai.',
    image: 'https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=1000&q=80&fit=crop',
    tags: ['Pastel Themes', 'Photo Corners', 'Entrance Arches'],
  },
];

export function PremiumSection() {
  const { setQuoteModalOpen } = useStore();

  return (
    <section className="py-20 sm:py-28 bg-[#292725] text-white relative overflow-hidden" id="premium">
      {/* Background aesthetics */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A46D]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#B77C68]/10 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-[#C5A46D] text-xs font-semibold tracking-wider uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Curated Event Management
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-5 leading-tight text-white">
            Every Occasion Deserves a <br />
            <span className="text-[#C5A46D] italic font-serif">Beautiful Setting.</span>
          </h2>

          <p className="text-base sm:text-lg text-white/75 leading-relaxed">
            Tell us about your celebration, and our team will help you create an event that reflects your vision. From grand venue styling to detailed stage craftsmanship, we bring distinction to every milestone.
          </p>

          <div className="mt-8 flex justify-center">
            <Button
              variant="gold"
              size="lg"
              onClick={() => setQuoteModalOpen(true)}
              className="shadow-xl"
            >
              Request a Custom Quote
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* 2x2 Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {premiumHighlights.map((item, idx) => (
            <div
              key={idx}
              className="group bg-white/5 rounded-3xl overflow-hidden border border-white/10 hover:border-[#C5A46D]/50 transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#292725] via-transparent to-transparent" />
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading text-2xl font-bold text-white mb-3 group-hover:text-[#C5A46D] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/70 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                  {item.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-medium"
                    >
                      <CheckCircle2 className="w-3 h-3 text-[#C5A46D]" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
