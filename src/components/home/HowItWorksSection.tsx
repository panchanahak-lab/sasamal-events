import React from 'react';
import { Calendar, FileText, CheckCircle2, PartyPopper } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

const steps = [
  {
    number: '01',
    icon: Calendar,
    title: 'Choose Your Event',
    description: 'Select your occasion from birthdays, baby showers, engagements, or grand wedding functions across Navi Mumbai.',
  },
  {
    number: '02',
    icon: FileText,
    title: 'Select a Package or Share Requirements',
    description: 'Pick an affordable fixed package with optional add-ons, or submit a custom quote form detailing your dream venue styling.',
  },
  {
    number: '03',
    icon: CheckCircle2,
    title: 'Receive Quotation & Confirm',
    description: 'Review transparent line items on WhatsApp or via our booking team. Confirm your date slot with zero hidden fees.',
  },
  {
    number: '04',
    icon: PartyPopper,
    title: 'Celebrate Your Special Day',
    description: 'Our decorators handle timely on-site setup, styling, and coordination so you can cherish every moment with loved ones.',
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-20 sm:py-28 bg-white" id="how-it-works">
      <Container>
        <SectionHeading
          subtitle="Seamless Booking Journey"
          title="How It Works"
          description="Booking your celebration decoration with Sasamal Events is effortless and clear from start to finish."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connector line for large screens */}
          <div className="hidden lg:block absolute top-1/4 left-16 right-16 h-0.5 bg-gradient-to-r from-[#C5A46D]/20 via-[#C5A46D]/40 to-[#C5A46D]/20 z-0" />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative z-10 bg-[#FAF8F3] rounded-3xl p-7 border border-warm-gray-light/20 flex flex-col justify-between hover:bg-white hover:shadow-lg transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-heading text-3xl font-bold text-[#C5A46D]">
                      {step.number}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-white border border-warm-gray-light/30 shadow-sm flex items-center justify-center text-[#292725]">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="font-heading text-lg font-bold text-[#292725] mb-2.5">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#77716B] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-warm-gray-light/20 flex items-center gap-1.5 text-[11px] font-semibold text-[#77716B]">
                  <span>Step {idx + 1} of 4</span>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
