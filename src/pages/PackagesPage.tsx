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
            Transparent Pricing
          </span>
          <h1 className="font-heading text-4xl sm:text-6xl font-bold text-[#292725] mb-4">
            Birthday & Celebration Packages
          </h1>
          <p className="text-base sm:text-lg text-[#77716B] leading-relaxed">
            Choose from our pre-designed celebration packages or customize your setup with modular add-ons. No hidden surprises—just delightful decoration.
          </p>

          {/* Quick Info bar */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-white border border-warm-gray-light/20 text-xs text-[#77716B]">
            <div className="flex items-center gap-2 justify-center">
              <Sparkles className="w-4 h-4 text-[#C5A46D]" />
              <span>Starting at ₹1,500</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <ShieldCheck className="w-4 h-4 text-[#C5A46D]" />
              <span>Zero Hidden Costs</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <Clock className="w-4 h-4 text-[#C5A46D]" />
              <span>Prompt Setup</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <MapPin className="w-4 h-4 text-[#C5A46D]" />
              <span>Navi Mumbai Wide</span>
            </div>
          </div>
        </div>
      </Container>

      {/* Package comparison cards */}
      <PackagesSection />

      {/* Interactive Customiser Section */}
      <CustomiseSection />
    </div>
  );
}
