import React from 'react';
import { Container } from '@/components/ui/Container';

export function CancellationPolicyPage() {
  return (
    <div className="pt-28 pb-20 bg-white">
      <Container size="narrow">
        <h1 className="font-heading text-3xl sm:text-5xl font-bold text-[#292725] mb-4">
          Cancellation & Rescheduling Policy
        </h1>
        <p className="text-xs text-[#77716B] mb-8">
          Sasamal Events • Navi Mumbai, Maharashtra
        </p>

        <div className="prose prose-neutral max-w-none space-y-6 text-sm text-[#77716B] leading-relaxed">
          <section>
            <h2 className="font-heading text-xl font-bold text-[#292725] mb-2">1. Rescheduling Your Event</h2>
            <p>
              We understand that family plans can change. You may reschedule your decoration date free of cost by notifying us at least 48 hours prior to the scheduled setup time, subject to slot availability on the new date.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-[#292725] mb-2">2. Package Cancellation (Direct Services)</h2>
            <p>
              For birthday and intimate celebration packages:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>Cancellation &gt; 48 hours in advance:</strong> Full refund of any deposit paid, less small administrative / procurement costs if custom items were made.</li>
              <li><strong>Cancellation 24–48 hours in advance:</strong> 50% refund of deposit, or 100% credit toward a future booking within 6 months.</li>
              <li><strong>Cancellation &lt; 24 hours in advance:</strong> The advance deposit is non-refundable as customized balloons and materials have already been prepped.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-[#292725] mb-2">3. Grand & Custom Wedding Events</h2>
            <p>
              For weddings, reception stages, and large custom events requiring fresh floral procurement or structural carpentry, cancellation terms will be specified in your agreed custom quotation contract.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-[#292725] mb-2">4. Force Majeure</h2>
            <p>
              In the unlikely event of severe weather extremes, government restrictions, or unforeseeable emergencies, both parties agree to coordinate in good faith to reschedule or settle fairly.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}
