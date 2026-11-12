import React from 'react';
import { Sparkles, ArrowRight, CheckCircle2, HeartHandshake, ShieldCheck } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/stores/useStore';
import { Link } from 'react-router-dom';

const weddingSuite = [
  {
    id: 'engagement-ring-ceremony',
    name: 'Ring Ceremony & Engagement',
    tagline: 'An Intimate Setting for Your Lifelong Promise',
    categoryType: 'Curated Stage Design',
    description: 'Create an enchanting backdrop for your ring exchange. We coordinate bespoke floral arches, couple seating sofas, velvet pedestals, neon signage, and warm ambient lighting suited for banquet halls and garden lawns.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1000&q=80&fit=crop',
    features: [
      'Bespoke couple seating sofas & velvet stage pedestals',
      'Artificial & fresh floral arches with ring ceremony thematic signage',
      'Warm white fairy light drapes & stage floodlighting',
      'Personalized welcome easel boards for your guests',
    ],
    pricingNote: 'Custom Quotation Based on Scope & Venue',
    isDirect: false,
  },
  {
    id: 'haldi-mehendi-decorations',
    name: 'Haldi & Mehendi Decoration',
    tagline: 'Vibrant Traditions, Bright Marigolds & Sunny Celebrations',
    categoryType: 'Thematic Ceremony Decor',
    description: 'Bring boundless joy to your pre-wedding rituals with bright yellow and orange marigold canopies, traditional brass urlis for floral baths, colorful Rajasthani drapes, dreamcatcher backdrops, and decorated couple swings.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1000&q=80&fit=crop',
    features: [
      'Traditional brass / fiber urli for the Haldi ceremony',
      'Marigold flower strings, tassel canopies & gota patti hangings',
      'Festive decorated couple jhoola (swing) photo-op',
      'Cushions, low-seating diwan styling & colorful umbrellas',
    ],
    pricingNote: 'Custom Quotation Based on Setup Scale',
    isDirect: false,
  },
  {
    id: 'wedding-mandap-decorations',
    name: 'Wedding Mandap Decoration',
    tagline: 'Sacred Mandaps & Timeless Indian Traditions',
    categoryType: 'Full Event Management',
    description: 'A wedding is a sacred and grand celebration of two families. Our team crafts magnificent square and dome mandaps decorated with fresh marigolds, roses, tuberose garlands, brass lamps, sacred havan kund setup, and regal floral pathways.',
    image: 'https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?w=1000&q=80&fit=crop',
    features: [
      'Authentic square & dome mandap structural styling',
      'Fresh marigold, rose, and jasmine floral craftsmanship',
      'Aisle floral pillars, sacred havan kund & entrance arch',
      'Comprehensive venue styling for wedding halls across Navi Mumbai',
    ],
    pricingNote: 'Custom Quotation Based on Venue Dimensions',
    isDirect: false,
  },
  {
    id: 'reception-decorations',
    name: 'Reception Stage & Seating',
    tagline: 'Sophistication, Elegance & Modern Stage Craft',
    categoryType: 'Full Event Management',
    description: 'Make a magnificent first impression as newlyweds. We craft glamorous reception stages featuring cascading floral backdrops, geometric arches, chandelier accents, royal couple sofas, and professional stage mood lighting.',
    image: 'https://images.unsplash.com/photo-1478146059778-26028b07395a?w=1000&q=80&fit=crop',
    features: [
      'Grand scale floral walls and geometric structure framing',
      'Dynamic lighting effects, warm white floodlights & couple spotlighting',
      'Custom stage risers and royal sofa configurations',
      'Photo booth backdrop installations for your attendees',
    ],
    pricingNote: 'Custom Quotation Based on Guest Scale & Stage Size',
    isDirect: false,
  },
  {
    id: 'sangeet-cocktail-decorations',
    name: 'Sangeet & Cocktail Night',
    tagline: 'High Energy Glamour, Neon Aesthetics & Music',
    categoryType: 'Curated Party Production',
    description: 'Turn your sangeet into a breathtaking gala with vibrant concert lighting, neon quote backdrops, DJ console styling, acoustic dancefloor trussing, and cocktail lounge seating.',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1000&q=80&fit=crop',
    features: [
      'Neon phrase signage ("Better Together", "Happily Ever After")',
      'Light bars, strobe effects & DJ booth thematic facade',
      'Fairy light ceilings and cocktail high-table arrangements',
      'Custom photo wall backdrop for family selfie-ops',
    ],
    pricingNote: 'Custom Quotation Based on Requirements',
    isDirect: false,
  },
];

const otherCategories = [
  {
    id: 'birthday-celebrations',
    name: 'Birthday Celebrations',
    tagline: 'From First Birthdays to Milestone Jubilees',
    categoryType: 'Direct Sasamal Service',
    groupName: 'For Birthdays',
    description: 'We directly plan and execute joyous birthday setups for toddlers, kids, teenagers, and milestone adult celebrations across Navi Mumbai. Enjoy fixed package pricing starting at ₹1,500, themed balloon rings, vibrant arches, and delightful personalized props.',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1000&q=80&fit=crop',
    features: [
      'Children theme characters & pastel balloon backdrops',
      'Number and name foil setups with LED illumination',
      'Compact home setups & grand banquet hall decoration',
      'Predefined packages starting at ₹1,500 with transparent add-ons',
    ],
    pricingNote: 'Fixed Packages from ₹1,500 + Add-ons',
    isDirect: true,
  },
  {
    id: 'family-functions',
    name: 'Family Functions & Ceremonies',
    tagline: 'Warmth and Tradition for Every Precious Milestone',
    categoryType: 'Direct & Curated Solutions',
    groupName: 'For Family Functions',
    description: 'Special family gatherings deserve warm, dignified decoration. We craft thoughtful setups for Baby Showers (Godh Bharai), Naming Ceremonies (Namkaran), Housewarming (Griha Pravesh), and Silver/Golden Wedding Anniversaries.',
    image: 'https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=1000&q=80&fit=crop',
    features: [
      'Pastel and floral themes for baby showers and cradle ceremonies',
      'Traditional marigold and mango leaf toran entrance decor',
      'Anniversary memories photo line with fairy lights',
      'Comfortable setup designed for family living rooms or halls',
    ],
    pricingNote: 'Flexible Packages & Custom Estimates',
    isDirect: true,
  },
  {
    id: 'special-events',
    name: 'Special Events & Private Soirees',
    tagline: 'Romantic Proposals, Intimate Gatherings & VIP Dinners',
    categoryType: 'Curated Event Management',
    groupName: 'For Special Events',
    description: 'Planning a surprise marriage proposal, terrace candlelit dinner, or private cocktail gathering? Sasamal Events designs intimate, tasteful environments with ambient lanterns, rose petal paths, and fairy light canopies.',
    image: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=1000&q=80&fit=crop',
    features: [
      'Marry Me marquee letters and ambient candlelit walkways',
      'Terrace canopies with sheer drapes and warm lighting',
      'Intimate dining table styling with fresh florals',
      'Confidential and prompt setup coordination',
    ],
    pricingNote: 'Custom Quotation Based on Requirements',
    isDirect: false,
  },
];

export function ServicesPage() {
  const { setQuoteModalOpen } = useStore();

  return (
    <div className="pt-24 sm:pt-28 pb-20 bg-[#FAF8F3]">
      <Container>
        {/* Page Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#C5A46D] block mb-2">
            Tailored Decoration Services
          </span>
          <h1 className="font-heading text-4xl sm:text-6xl font-bold text-[#292725] mb-4">
            Our Decoration Portfolio
          </h1>
          <p className="text-base sm:text-lg text-[#77716B] leading-relaxed">
            Sasamal Events offers end-to-end event styling in Navi Mumbai—featuring our dedicated <strong>"For Wedding"</strong> suite alongside affordable birthday packages and family functions.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 1: FOR WEDDING (MAIN SHOWCASE SECTION) */}
        {/* ========================================================================= */}
        <div className="mb-24" id="wedding">
          <div className="bg-[#292725] rounded-3xl p-8 sm:p-12 text-white mb-12 relative overflow-hidden shadow-xl border border-[#C5A46D]/30">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A46D]/15 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#C5A46D]/20 text-[#D4B887] text-xs font-bold uppercase tracking-wider mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  Primary Event Suite
                </span>
                <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white mb-3">
                  For Wedding: Complete Ceremonial Services
                </h2>
                <p className="text-sm sm:text-base text-white/80 max-w-2xl leading-relaxed">
                  From the intimate promises of the Ring Ceremony to vibrant Haldi urlis, sacred Mandap architecture, and glamorous Reception stages, we orchestrate cohesive wedding aesthetics across Navi Mumbai banquets and lawns.
                </p>
              </div>

              <Button
                variant="gold"
                size="lg"
                onClick={() => setQuoteModalOpen(true)}
                className="shrink-0 shadow-lg"
              >
                Request Wedding Quotation
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Wedding Suite Items */}
          <div className="space-y-12">
            {weddingSuite.map((svc, index) => {
              const isEven = index % 2 === 1;

              return (
                <div
                  key={svc.id}
                  id={svc.id}
                  className="bg-white rounded-3xl overflow-hidden border border-warm-gray-light/20 shadow-md scroll-mt-28"
                >
                  <div className={`grid grid-cols-1 lg:grid-cols-12 items-center ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                    {/* Image Column */}
                    <div className={`lg:col-span-5 relative aspect-[4/3] lg:aspect-auto lg:h-full min-h-[300px] ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                      <img
                        src={svc.image}
                        alt={svc.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="px-3 py-1 rounded-full bg-[#C5A46D] text-white text-[11px] font-bold tracking-wide uppercase shadow-sm">
                          For Wedding
                        </span>
                        <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[11px] font-bold text-[#292725] tracking-wide uppercase shadow-sm">
                          {svc.categoryType}
                        </span>
                      </div>
                    </div>

                    {/* Content Column */}
                    <div className={`lg:col-span-7 p-7 sm:p-10 lg:p-12 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#C5A46D] block mb-1">
                        {svc.tagline}
                      </span>
                      <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#292725] mb-3">
                        {svc.name}
                      </h3>
                      <p className="text-sm sm:text-base text-[#77716B] leading-relaxed mb-6">
                        {svc.description}
                      </p>

                      {/* Features */}
                      <div className="space-y-2.5 mb-8">
                        {svc.features.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#292725]">
                            <CheckCircle2 className="w-4 h-4 text-[#C5A46D] shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-6 border-t border-warm-gray-light/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <span className="text-[11px] text-[#77716B] uppercase font-semibold block">
                            Pricing Structure
                          </span>
                          <span className="text-sm font-bold text-[#292725] font-heading">
                            {svc.pricingNote}
                          </span>
                        </div>

                        <Button variant="primary" size="md" onClick={() => setQuoteModalOpen(true)}>
                          Enquire for this Ritual
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 2: OTHER CATEGORIES (BIRTHDAYS, FAMILY, SPECIAL) */}
        {/* ========================================================================= */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C5A46D] block mb-2">
              Beyond Weddings
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#292725]">
              Birthdays, Family Functions & Special Celebrations
            </h2>
          </div>

          <div className="space-y-12">
            {otherCategories.map((svc, index) => {
              const isEven = index % 2 === 1;

              return (
                <div
                  key={svc.id}
                  id={svc.id}
                  className="bg-white rounded-3xl overflow-hidden border border-warm-gray-light/20 shadow-md scroll-mt-28"
                >
                  <div className={`grid grid-cols-1 lg:grid-cols-12 items-center ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                    {/* Image Column */}
                    <div className={`lg:col-span-5 relative aspect-[4/3] lg:aspect-auto lg:h-full min-h-[300px] ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                      <img
                        src={svc.image}
                        alt={svc.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[11px] font-bold text-[#292725] tracking-wide uppercase shadow-sm">
                          {svc.groupName}
                        </span>
                      </div>
                    </div>

                    {/* Content Column */}
                    <div className={`lg:col-span-7 p-7 sm:p-10 lg:p-12 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#C5A46D] block mb-1">
                        {svc.tagline}
                      </span>
                      <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#292725] mb-3">
                        {svc.name}
                      </h3>
                      <p className="text-sm sm:text-base text-[#77716B] leading-relaxed mb-6">
                        {svc.description}
                      </p>

                      <div className="space-y-2.5 mb-8">
                        {svc.features.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#292725]">
                            <CheckCircle2 className="w-4 h-4 text-[#C5A46D] shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-6 border-t border-warm-gray-light/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <span className="text-[11px] text-[#77716B] uppercase font-semibold block">
                            Pricing Structure
                          </span>
                          <span className="text-sm font-bold text-[#292725] font-heading">
                            {svc.pricingNote}
                          </span>
                        </div>

                        {svc.isDirect ? (
                          <Link to="/packages">
                            <Button variant="gold" size="md">
                              View Birthday Packages
                              <ArrowRight className="w-4 h-4 ml-1" />
                            </Button>
                          </Link>
                        ) : (
                          <Button variant="primary" size="md" onClick={() => setQuoteModalOpen(true)}>
                            Request Custom Quote
                            <ArrowRight className="w-4 h-4 ml-1" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-[#292725] text-white text-center max-w-4xl mx-auto relative overflow-hidden shadow-xl">
          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#C5A46D] text-xs font-semibold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Serving Navi Mumbai Families
            </span>
            <h3 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
              Need a Bespoke Decoration Concept?
            </h3>
            <p className="text-sm sm:text-base text-white/75 max-w-xl mx-auto mb-8">
              Every venue has distinct architecture and every family has unique traditions. Let us build a personalized decoration blueprint for your upcoming occasion.
            </p>
            <Button variant="gold" size="lg" onClick={() => setQuoteModalOpen(true)}>
              Share Your Vision With Us
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
