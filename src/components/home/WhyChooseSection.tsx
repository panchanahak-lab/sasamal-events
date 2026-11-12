import React from 'react';
import { CalendarHeart, Wallet, Sparkles, UserCheck } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

const reasons = [
  {
    icon: CalendarHeart,
    title: 'Decoration for Every Occasion',
    description: 'Whether it is a child’s milestone birthday at your apartment or a high-profile reception at a Navi Mumbai banquet, we provide thoughtfully designed decoration solutions suited to the scale.',
  },
  {
    icon: Wallet,
    title: 'Affordable and Premium Packages',
    description: 'We believe memorable decoration should be accessible. Choose from clear fixed birthday packages starting at ₹1,500, or explore bespoke custom quote arrangements for weddings and large family functions.',
  },
  {
    icon: Sparkles,
    title: 'Personalised Decoration Solutions',
    description: 'No two celebrations are alike. We listen to your preferred colour schemes, balloon styles, floral arrangements, and cultural traditions to match your individual aesthetic vision.',
  },
  {
    icon: UserCheck,
    title: 'Dedicated Booking Assistance',
    description: 'From initial concept discussion to WhatsApp enquiries, quotation generation, and final venue coordination, our team ensures friendly and attentive communication throughout.',
  },
];

export function WhyChooseSection() {
  return (
    <section className="py-20 sm:py-28 bg-[#FAF8F3]">
      <Container>
        <SectionHeading
          subtitle="Our Commitment"
          title="Why Choose Sasamal Events?"
          description="A reliable, local decoration partner dedicated to making your celebrations smooth, authentic, and memorable."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {reasons.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-7 border border-warm-gray-light/20 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#C5A46D]/15 flex items-center justify-center text-[#B08F56] mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-[#292725] mb-3 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#77716B] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-warm-gray-light/10 text-[11px] font-semibold uppercase tracking-wider text-[#C5A46D]">
                  Navi Mumbai Focus
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
