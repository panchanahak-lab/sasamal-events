import React from 'react';
import { Container } from '@/components/ui/Container';

export function TermsPage() {
  return (
    <div className="pt-28 pb-20 bg-white">
      <Container size="narrow">
        <h1 className="font-heading text-3xl sm:text-5xl font-bold text-[#292725] mb-4">
          Terms and Conditions
        </h1>
        <p className="text-xs text-[#77716B] mb-8">
          Effective Date: November 2026 • Sasamal Events (Navi Mumbai)
        </p>

        <div className="prose prose-neutral max-w-none space-y-6 text-sm text-[#77716B] leading-relaxed">
          <section>
            <h2 className="font-heading text-xl font-bold text-[#292725] mb-2">1. Booking & Enquiries</h2>
            <p>
              Submitting an enquiry via the website or WhatsApp does not automatically guarantee or confirm an event booking. A booking is considered confirmed only upon explicit availability confirmation by Sasamal Events and receipt of any agreed booking advance.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-[#292725] mb-2">2. Pricing & Add-ons</h2>
            <p>
              Package prices (such as our ₹1,500 Basic Celebration and ₹2,000 Standard Celebration) and listed add-on rates are transparent indicators for setups within Navi Mumbai municipal limits. Any special requirements or venue logistical complexities will be communicated clearly beforehand.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-[#292725] mb-2">3. Venue Access & Cooperation</h2>
            <p>
              The client is responsible for securing timely venue access, elevator permissions, society gate approvals, and required power points at the premises for proper setup execution.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-[#292725] mb-2">4. Care of Rented Decorative Assets</h2>
            <p>
              Reusable rental fixtures (such as stands, LED lights, artificial floral frames, and props) remain the property of Sasamal Events and will be collected after the event. Willful damage or loss of rental assets may be subject to replacement fees.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-[#292725] mb-2">5. Jurisdiction</h2>
            <p>
              All agreements are governed by the laws of India, subject to the jurisdiction of courts in Navi Mumbai / Thane, Maharashtra.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}
