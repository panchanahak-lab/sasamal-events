import React from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/stores/useStore';
import { Sparkles, Heart, ShieldCheck, MapPin, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function AboutPage() {
  const { setQuoteModalOpen, settings } = useStore();

  return (
    <div className="pt-24 sm:pt-28 pb-20 bg-white">
      <Container>
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#C5A46D] block mb-2">
            Our Story & Philosophy
          </span>
          <h1 className="font-heading text-4xl sm:text-6xl font-bold text-[#292725] mb-6">
            Making Every Celebration Special
          </h1>
          <p className="text-base sm:text-xl text-[#77716B] leading-relaxed">
            Sasamal Events was founded in Navi Mumbai to bring modern aesthetics, trustworthy execution, and transparent pricing to family functions and milestone celebrations.
          </p>
        </div>

        {/* Brand narrative section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-6 relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-warm-gray-light/20">
            <img
              src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1000&q=80&fit=crop"
              alt="Sasamal Events Venue Setup in Navi Mumbai"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#292725]/50 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/90 backdrop-blur-sm">
              <span className="text-xs font-bold text-[#292725] block">Navi Mumbai, Maharashtra</span>
              <span className="text-xs text-[#77716B]">Committed to genuine craftsmanship & reliable timelines</span>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF8F3] text-xs font-semibold text-[#C5A46D] border border-[#EBE7DF]">
              <Sparkles className="w-3.5 h-3.5" />
              Dual-Segment Positioning
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#292725]">
              Affordable Simplicity & Premium Grandeur Under One Roof
            </h2>
            <p className="text-sm sm:text-base text-[#77716B] leading-relaxed">
              We understand that celebrations come in all sizes. Sometimes, a child’s birthday party calls for an intimate, vibrant balloon arch with quick setup and honest rates starting at ₹1,500. Other times, an engagement or wedding reception requires intricate mandap artistry, bespoke floral drapes, and sophisticated lighting design.
            </p>
            <p className="text-sm sm:text-base text-[#77716B] leading-relaxed">
              At Sasamal Events, we cater seamlessly to both needs. Our direct decor team handles cozy birthdays and home functions with transparent, itemized packages. For grand occasions, we lead end-to-end venue styling, staging, and floral coordination—delivering a singular, refined brand experience without compromise.
            </p>
          </div>
        </div>

        {/* Core Principles */}
        <div className="bg-[#FAF8F3] rounded-3xl p-8 sm:p-12 border border-warm-gray-light/20 mb-20">
          <SectionHeading
            subtitle="What Defines Us"
            title="Our Foundational Values"
            description="Clear commitments to our clients across Navi Mumbai."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 border border-warm-gray-light/20 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-[#C5A46D]/15 flex items-center justify-center text-[#B08F56] mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-lg font-bold text-[#292725] mb-2">
                Honest & Transparent Pricing
              </h3>
              <p className="text-xs sm:text-sm text-[#77716B] leading-relaxed">
                No hidden transport surprises or last-minute charges. We provide exact package line items and transparent custom quotations before you commit.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-warm-gray-light/20 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-[#C5A46D]/15 flex items-center justify-center text-[#B08F56] mb-4">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-lg font-bold text-[#292725] mb-2">
                Personal Touch for Every Family
              </h3>
              <p className="text-xs sm:text-sm text-[#77716B] leading-relaxed">
                Every ceremony carries emotional significance. We listen carefully to your vision, favorite color palettes, and traditions to deliver a setup you love.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-warm-gray-light/20 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-[#C5A46D]/15 flex items-center justify-center text-[#B08F56] mb-4">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-lg font-bold text-[#292725] mb-2">
                Deep Navi Mumbai Focus
              </h3>
              <p className="text-xs sm:text-sm text-[#77716B] leading-relaxed">
                Operating locally across Vashi, Kharghar, Nerul, Belapur, Seawoods, and Panvel allows us to guarantee punctual arrival and attentive on-site care.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center max-w-2xl mx-auto">
          <h3 className="font-heading text-3xl font-bold text-[#292725] mb-4">
            Planning an Upcoming Function?
          </h3>
          <p className="text-sm sm:text-base text-[#77716B] mb-8">
            Let us discuss your dates, ideas, and budget. Our team is ready to help you plan with complete peace of mind.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/packages">
              <Button variant="gold" size="lg">
                View Birthday Packages
              </Button>
            </Link>
            <Button variant="outline" size="lg" onClick={() => setQuoteModalOpen(true)}>
              Request Custom Quotation
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
