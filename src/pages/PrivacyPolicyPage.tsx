import React from 'react';
import { Container } from '@/components/ui/Container';

export function PrivacyPolicyPage() {
  return (
    <div className="pt-28 pb-20 bg-white">
      <Container size="narrow">
        <h1 className="font-heading text-3xl sm:text-5xl font-bold text-[#292725] mb-4">
          Privacy Policy
        </h1>
        <p className="text-xs text-[#77716B] mb-8">
          Last Updated: November 2026 • Sasamal Events, Navi Mumbai, Maharashtra
        </p>

        <div className="prose prose-neutral max-w-none space-y-6 text-sm text-[#77716B] leading-relaxed">
          <section>
            <h2 className="font-heading text-xl font-bold text-[#292725] mb-2">1. Overview</h2>
            <p>
              Sasamal Events ("we", "our", or "us") respects your privacy. This policy outlines how we collect, use, and protect your information when you browse our website or submit an event enquiry for decoration and management services in Navi Mumbai.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-[#292725] mb-2">2. Information We Collect</h2>
            <p>
              When submitting an enquiry, we collect essential details to formulate your quote and arrange logistics, including:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Customer full name and mobile/WhatsApp number</li>
              <li>Email address (optional)</li>
              <li>Event date, preferred setup time, and venue location in Navi Mumbai</li>
              <li>Selected decoration packages, add-ons, or custom styling requirements</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-[#292725] mb-2">3. How Information Is Used</h2>
            <p>
              We use customer information exclusively to:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Process and calculate your decoration enquiries and custom quotations</li>
              <li>Communicate via WhatsApp or phone regarding booking details and availability</li>
              <li>Coordinate on-site decoration setup at your designated celebration address</li>
            </ul>
            <p className="mt-2">
              We do not sell, rent, or distribute personal information to external third parties or advertisers.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-[#292725] mb-2">4. Data Security</h2>
            <p>
              We implement industry-standard security safeguards. All communications with our administrative dashboard and Supabase database utilize SSL/TLS encryption and strict Row Level Security (RLS) policies.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-[#292725] mb-2">5. Contact Us</h2>
            <p>
              If you have any questions regarding your data or wish to update your details, please reach out via our contact channels or WhatsApp us at our registered support line in Navi Mumbai.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}
