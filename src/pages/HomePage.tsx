import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { ServicesSection } from '@/components/home/ServicesSection';
import { CelebrationStyleSection } from '@/components/home/CelebrationStyleSection';
import { CulturalBannerSection } from '@/components/home/CulturalBannerSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { CustomiseSection } from '@/components/home/CustomiseSection';

export function HomePage() {
  return (
    <div className="flex flex-col w-full bg-[#FAF8F3] overflow-x-hidden">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Celebrations We Create (6 service cards) */}
      <ServicesSection />

      {/* 3. Discover Your Celebration Style (Minimal Luxury & Enchanted Garden) */}
      <CelebrationStyleSection />

      {/* 4. Indian Cultural Design Banner */}
      <CulturalBannerSection />

      {/* 5. Features Section (3 blocks: Customised Themes, Quality Execution, Navi Mumbai & Beyond) */}
      <FeaturesSection />

      {/* 6. Interactive Real-Time Customizer & Price Calculator Tool (Multi-Ceremony) */}
      <CustomiseSection />
    </div>
  );
}
