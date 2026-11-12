import React from 'react';
import { Container } from '@/components/ui/Container';
import { ContactSection } from '@/components/home/ContactSection';
import { MapPin, Clock, ShieldCheck } from 'lucide-react';
import { useStore } from '@/stores/useStore';

export function ContactPage() {
  const { settings } = useStore();

  return (
    <div className="pt-24 sm:pt-28 pb-20 bg-white">
      <Container>
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#C5A46D] block mb-2">
            Get in Touch
          </span>
          <h1 className="font-heading text-4xl sm:text-6xl font-bold text-[#292725] mb-4">
            Contact Sasamal Events
          </h1>
          <p className="text-base sm:text-lg text-[#77716B] leading-relaxed">
            We are based in Navi Mumbai and ready to assist you with booking enquiries, customized quotations, or general decoration guidance.
          </p>
        </div>

        {/* Service Areas banner */}
        <div className="mb-12 p-6 rounded-3xl bg-[#FAF8F3] border border-warm-gray-light/20 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-warm-gray-light/30 flex items-center justify-center text-[#C5A46D] shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-semibold text-[#292725] block">Coverage</span>
              <span className="text-xs text-[#77716B]">All sectors across Navi Mumbai</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-warm-gray-light/30 flex items-center justify-center text-[#C5A46D] shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-semibold text-[#292725] block">Operating Hours</span>
              <span className="text-xs text-[#77716B]">9:00 AM – 9:00 PM (Daily)</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-warm-gray-light/30 flex items-center justify-center text-[#C5A46D] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-semibold text-[#292725] block">Direct Consultation</span>
              <span className="text-xs text-[#77716B]">Zero obligation quote chats</span>
            </div>
          </div>
        </div>
      </Container>

      {/* Embed Contact Section */}
      <ContactSection />
    </div>
  );
}
