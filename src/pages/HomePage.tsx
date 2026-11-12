import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { ServicesSection } from '@/components/home/ServicesSection';
import { PackagesSection } from '@/components/home/PackagesSection';
import { CustomiseSection } from '@/components/home/CustomiseSection';
import { PremiumSection } from '@/components/home/PremiumSection';
import { GalleryPreview } from '@/components/home/GalleryPreview';
import { WhyChooseSection } from '@/components/home/WhyChooseSection';
import { HowItWorksSection } from '@/components/home/HowItWorksSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { ContactSection } from '@/components/home/ContactSection';

export function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* Section 1: Hero */}
      <HeroSection />

      {/* Section 2: Explore Our Services */}
      <ServicesSection />

      {/* Section 3: Affordable Birthday Packages */}
      <PackagesSection />

      {/* Section 4: Interactive Customise Your Decoration Experience */}
      <CustomiseSection />

      {/* Section 5: Premium Event Decorations */}
      <PremiumSection />

      {/* Section 6: Our Work / Gallery */}
      <GalleryPreview />

      {/* Section 7: Why Choose Sasamal Events */}
      <WhyChooseSection />

      {/* Section 8: How It Works */}
      <HowItWorksSection />

      {/* Section 9: Customer Reviews */}
      <TestimonialsSection />

      {/* Section 10: Contact Section */}
      <ContactSection />
    </div>
  );
}
