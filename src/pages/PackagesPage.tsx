import React from 'react';
import { Container } from '@/components/ui/Container';
import { PackagesSection } from '@/components/home/PackagesSection';
import { CustomiseSection } from '@/components/home/CustomiseSection';
import { ShieldCheck, Sparkles, Clock, MapPin } from 'lucide-react';

export function PackagesPage() {
  return (
    <div className="pt-24 sm:pt-28 pb-20 bg-[#FAF8F3]">
      <Container>
        {/* Page Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#C5A46D] block mb-2">
            Transparent Pricing & Real-Time Estimation
          </span>
          <h1 className="font-heading text-4xl sm:text-6xl font-bold text-[#6B1D2F] mb-4">
            Ceremony Packages &amp; Customizer
          </h1>
          <p className="text-base sm:text-lg text-[#77716B] leading-relaxed">
            Choose from pre-designed celebration packages or configure your setup in real time for Weddings, Haldi, Ring Ceremony, Birthdays, Family, and Private Functions. Experience instant price calculations with complete transparency.
          </p>

          {/* Quick Info bar */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-white border border-[#C5A46D]/25 text-xs text-[#77716B] shadow-sm">
            <div className="flex items-center gap-2 justify-center">
              <Sparkles className="w-4 h-4 text-[#6B1D2F]" />
              <span className="font-semibold">All 6 Ceremonies Covered</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <ShieldCheck className="w-4 h-4 text-[#6B1D2F]" />
              <span className="font-semibold">Live Real-Time Total</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <Clock className="w-4 h-4 text-[#6B1D2F]" />
              <span className="font-semibold">Modular Add-on Quantities</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <MapPin className="w-4 h-4 text-[#6B1D2F]" />
              <span className="font-semibold">Navi Mumbai & Beyond</span>
            </div>
          </div>
        </div>
      </Container>

      {/* Interactive Customiser Section (Primary Feature) */}
      <CustomiseSection />

      {/* Package comparison cards */}
      <PackagesSection />
    </div>
  );
}
