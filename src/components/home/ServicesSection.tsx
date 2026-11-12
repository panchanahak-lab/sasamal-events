import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { defaultServices } from '@/data/defaults';
import { useStore } from '@/stores/useStore';

type CategoryFilter = 'all' | 'wedding' | 'birthday' | 'family' | 'special';

export function ServicesSection() {
  const [activeTab, setActiveTab] = useState<CategoryFilter>('all');
  const { setQuoteModalOpen } = useStore();

  const filteredServices = activeTab === 'all'
    ? defaultServices
    : defaultServices.filter((s) => s.group === activeTab);

  const weddingServices = defaultServices.filter((s) => s.group === 'wedding');

  return (
    <section className="py-20 sm:py-28 bg-white" id="services">
      <Container>
        <SectionHeading
          subtitle="Celebration Solutions"
          title="Explore Our Services"
          description="From dedicated wedding suites (Mandap, Haldi, Ring Ceremony, Reception) to affordable birthday packages and family functions across Navi Mumbai."
        />

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
              activeTab === 'all'
                ? 'bg-[#292725] text-white shadow-md'
                : 'bg-[#FAF8F3] text-[#77716B] hover:text-[#292725] hover:bg-[#EBE7DF]'
            }`}
          >
            All Services ({defaultServices.length})
          </button>

          <button
            onClick={() => setActiveTab('wedding')}
            className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 ${
              activeTab === 'wedding'
                ? 'bg-[#C5A46D] text-white shadow-md ring-2 ring-[#C5A46D]/30'
                : 'bg-[#FAF8F3] text-[#C5A46D] hover:bg-[#C5A46D]/15'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>For Wedding ({weddingServices.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('birthday')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
              activeTab === 'birthday'
                ? 'bg-[#292725] text-white shadow-md'
                : 'bg-[#FAF8F3] text-[#77716B] hover:text-[#292725] hover:bg-[#EBE7DF]'
            }`}
          >
            For Birthdays
          </button>

          <button
            onClick={() => setActiveTab('family')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
              activeTab === 'family'
                ? 'bg-[#292725] text-white shadow-md'
                : 'bg-[#FAF8F3] text-[#77716B] hover:text-[#292725] hover:bg-[#EBE7DF]'
            }`}
          >
            For Family Functions
          </button>

          <button
            onClick={() => setActiveTab('special')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
              activeTab === 'special'
                ? 'bg-[#292725] text-white shadow-md'
                : 'bg-[#FAF8F3] text-[#77716B] hover:text-[#292725] hover:bg-[#EBE7DF]'
            }`}
          >
            For Special Events
          </button>
        </div>

        {/* Featured Wedding Spotlight Box when viewing "all" or "wedding" */}
        {(activeTab === 'all' || activeTab === 'wedding') && (
          <div className="mb-12 bg-gradient-to-r from-[#292725] via-[#38332E] to-[#292725] rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden border border-[#C5A46D]/30">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#C5A46D]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#C5A46D]/20 text-[#D4B887] text-xs font-bold uppercase tracking-wider mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  Featured Collection
                </span>
                <h3 className="font-heading text-2xl sm:text-4xl font-bold text-white mb-2 leading-tight">
                  For Wedding: Complete Ceremonial Decoration Suite
                </h3>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                  Celebrate every auspicious chapter together. We design coordinated aesthetics across all wedding rituals: <strong>Ring Ceremony & Engagement</strong>, <strong>Haldi & Mehendi Urli setups</strong>, <strong>Traditional Mandap Decoration</strong>, and <strong>Grand Reception Stages</strong>.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
                <Button
                  variant="gold"
                  size="md"
                  onClick={() => setQuoteModalOpen(true)}
                  className="shadow-lg whitespace-nowrap"
                >
                  Request Wedding Quotation
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
                <Link to="/services#wedding-mandap-decorations">
                  <button className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-white/30 text-white text-xs font-semibold hover:bg-white/10 transition-colors">
                    Explore Wedding Suite
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Grid of Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="group bg-[#FAF8F3] rounded-3xl overflow-hidden border border-warm-gray-light/20 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image Frame with consistent 4:3 ratio */}
                <div className="relative aspect-[4/3] overflow-hidden bg-warm-gray-light/10">
                  <img
                    src={service.image_url || 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop'}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#292725]/70 via-transparent to-transparent" />
                  
                  {/* Category Pill */}
                  <div className="absolute top-4 left-4 flex gap-1.5">
                    {service.group === 'wedding' && (
                      <span className="px-3 py-1 rounded-full bg-[#C5A46D] text-white text-[11px] font-bold tracking-wide uppercase shadow-sm">
                        For Wedding
                      </span>
                    )}
                    <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[11px] font-semibold text-[#292725] tracking-wide uppercase shadow-sm">
                      {service.category === 'direct' ? 'Direct Service' : 'Curated Management'}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-7">
                  {service.tagline && (
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#C5A46D] block mb-1">
                      {service.tagline}
                    </span>
                  )}
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#292725] mb-2.5 group-hover:text-[#C5A46D] transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-sm text-[#77716B] leading-relaxed mb-4">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Card Footer CTA */}
              <div className="p-6 sm:p-7 pt-0 border-t border-warm-gray-light/15 flex items-center justify-between">
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
          ))}
        </div>
      </Container>
    </section>
  );
}
