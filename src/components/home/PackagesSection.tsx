import React, { useState } from 'react';
import { Check, Sparkles, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/stores/useStore';
import { formatCurrency } from '@/utils/format';
import { PackageBookingModal } from '@/components/booking/PackageBookingModal';
import type { Package } from '@/types';

export function PackagesSection() {
  const { packages } = useStore();
  const [selectedPkgForBooking, setSelectedPkgForBooking] = useState<Package | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleSelectPackage = (pkg: Package) => {
    setSelectedPkgForBooking(pkg);
    setIsBookingOpen(true);
  };

  const scrollToCustomise = () => {
    const el = document.getElementById('customise');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 sm:py-28 bg-[#FAF8F3]" id="packages">
      <Container size="narrow">
        <SectionHeading
          subtitle="Fixed Pricing Packages"
          title="Affordable Birthday Decoration Packages"
          description="Designed for intimate celebrations, kid parties and home celebrations in Navi Mumbai. Transparent pricing with no surprises."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-3xl mx-auto">
          {packages.map((pkg) => {
            const isPopular = pkg.is_popular;

            return (
              <div
                key={pkg.id}
                className={`relative bg-white rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  isPopular
                    ? 'border-2 border-[#C5A46D] shadow-xl md:-translate-y-2'
                    : 'border border-warm-gray-light/20 shadow-md hover:shadow-lg'
                }`}
              >
                {/* Popular Pill */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#C5A46D] text-white text-xs font-bold uppercase tracking-wider shadow-md">
                      <Sparkles className="w-3.5 h-3.5" />
                      Most Popular
                    </span>
                  </div>
                )}

                <div>
                  {/* Title & Description */}
                  <div className="mb-6">
                    <span className="text-[11px] font-semibold text-[#77716B] uppercase tracking-wider block mb-1">
                      Direct Sasamal Service
                    </span>
                    <h3 className="font-heading text-2xl font-bold text-[#292725] mb-2">
                      {pkg.name}
                    </h3>
                    <p className="text-sm text-[#77716B] leading-relaxed">
                      {pkg.description}
                    </p>
                  </div>

                  {/* Pricing Box */}
                  <div className="mb-6 pb-6 border-b border-warm-gray-light/20">
                    <span className="text-xs text-[#77716B] block">Starting Price</span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="font-heading text-4xl sm:text-5xl font-bold text-[#292725]">
                        {formatCurrency(pkg.price)}
                      </span>
                      <span className="text-xs text-[#77716B] font-medium">/ setup</span>
                    </div>
                    <span className="text-[11px] text-[#C5A46D] font-medium block mt-1">
                      * Customizable with optional add-ons
                    </span>
                  </div>

                  {/* Inclusions list */}
                  <div className="mb-8">
                    <span className="text-xs font-bold text-[#292725] uppercase tracking-wider block mb-3">
                      Package Inclusions:
                    </span>
                    <ul className="space-y-3">
                      {(pkg.inclusions || []).map((inc) => (
                        <li key={inc.id} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#292725]">
                          <div className="w-5 h-5 rounded-full bg-[#C5A46D]/15 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-[#B08F56]" />
                          </div>
                          <span>
                            {inc.item_name}
                            {inc.quantity && inc.quantity !== 'Included' && (
                              <span className="text-[#77716B]"> ({inc.quantity})</span>
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Buttons & Customisation Link */}
                <div className="pt-4 border-t border-warm-gray-light/20 space-y-3">
                  <Button
                    variant={isPopular ? 'gold' : 'primary'}
                    fullWidth
                    size="lg"
                    onClick={() => handleSelectPackage(pkg)}
                    className="shadow-md"
                  >
                    Select Package
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>

                  <button
                    type="button"
                    onClick={scrollToCustomise}
                    className="w-full text-center text-xs font-semibold text-[#77716B] hover:text-[#C5A46D] transition-colors py-1 block"
                  >
                    Customise with balloons, lights & props ↓
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reassurance footnote */}
        <div className="mt-10 p-4 rounded-2xl bg-white border border-warm-gray-light/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#77716B] max-w-3xl mx-auto">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#C5A46D] shrink-0" />
            <span>Inclusive of setup & takedown guidance in Navi Mumbai locations.</span>
          </div>
          <div className="flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-[#77716B]" />
            <span>Subject to slot availability & confirmation.</span>
          </div>
        </div>
      </Container>

      {/* Booking Modal */}
      <PackageBookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedPackage={selectedPkgForBooking}
      />
    </section>
  );
}
