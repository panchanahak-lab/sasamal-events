import React from 'react';
import { Star, MessageSquareHeart, CheckCircle } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useTestimonials } from '@/hooks/useSupabase';

export function TestimonialsSection() {
  const { testimonials, loading } = useTestimonials();

  return (
    <section className="py-20 sm:py-28 bg-[#FAF8F3]" id="reviews">
      <Container>
        <SectionHeading
          subtitle="Client Stories"
          title="Customer Feedback & Experiences"
          description="We are committed to honest service and customer delight. Here is what families and couples in Navi Mumbai say about Sasamal Events."
        />

        {testimonials && testimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="bg-white rounded-3xl p-7 border border-warm-gray-light/20 shadow-sm flex flex-col justify-between"
              >
                <div>
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 mb-4 text-[#C5A46D]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < (t.rating || 5) ? 'fill-[#C5A46D]' : 'text-warm-gray-light'
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-sm text-[#292725] leading-relaxed italic mb-6">
                    "{t.review_text}"
                  </p>
                </div>

                <div className="pt-4 border-t border-warm-gray-light/20 flex items-center justify-between">
                  <div>
                    <h4 className="font-heading font-bold text-sm text-[#292725]">
                      {t.customer_name}
                    </h4>
                    <span className="text-xs text-[#77716B]">{t.event_type}</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    <CheckCircle className="w-3 h-3" />
                    Verified
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Graceful placeholder card when no reviews published yet */
          <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 sm:p-10 border border-warm-gray-light/20 shadow-sm text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#C5A46D]/15 flex items-center justify-center text-[#B08F56] mx-auto mb-4">
              <MessageSquareHeart className="w-7 h-7" />
            </div>
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#292725] mb-2">
              Genuine Customer Reviews Coming Soon
            </h3>
            <p className="text-sm text-[#77716B] leading-relaxed max-w-lg mx-auto mb-6">
              At Sasamal Events, we value integrity. We do not publish fabricated testimonials. As upcoming celebrations in Navi Mumbai are completed, real customer feedback and photographs will be featured right here.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FAF8F3] text-xs font-semibold text-[#292725] border border-[#EBE7DF]">
              <span>Have you celebrated with us? Share your review with our team on WhatsApp!</span>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
