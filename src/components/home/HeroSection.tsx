import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, Sparkles, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { useStore } from '@/stores/useStore';
import { getWhatsAppUrl } from '@/utils/format';
import { generateSimpleWhatsAppMessage } from '@/utils/whatsapp';

export function HeroSection() {
  const { setQuoteModalOpen, settings } = useStore();

  const handleWhatsApp = () => {
    const url = getWhatsAppUrl(settings.whatsapp, generateSimpleWhatsAppMessage());
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image with warm overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80&fit=crop"
          alt="Sasamal Events Decorated Venue in Navi Mumbai"
          className="w-full h-full object-cover object-center filter brightness-[0.78]"
        />
        {/* Editorial Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#292725]/85 via-[#292725]/60 to-[#292725]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#292725]/90 via-transparent to-transparent" />
      </div>

      {/* Hero Content */}
      <Container className="relative z-10 py-16 sm:py-24">
        <div className="max-w-3xl">
          {/* Location & Brand pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-xs sm:text-sm font-medium mb-6 animate-fade-in">
            <MapPin className="w-4 h-4 text-[#C5A46D]" />
            <span>Serving Navi Mumbai, Maharashtra</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A46D]" />
            <span className="text-[#C5A46D] font-semibold">Affordable & Premium Events</span>
          </div>

          {/* Headline */}
          <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.12] tracking-tight">
            Making Every <br />
            <span className="text-[#C5A46D] italic font-serif">Celebration Special.</span>
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-xl text-white/85 leading-relaxed mb-10 max-w-2xl font-normal">
            From intimate birthday celebrations to beautiful engagements and grand wedding occasions, Sasamal Events brings your special moments to life with thoughtful decoration and personalised event solutions.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link to="/services">
              <Button variant="gold" size="lg" className="w-full sm:w-auto shadow-lg hover:shadow-xl">
                Explore Our Services
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>

            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-white/40 text-white hover:bg-white/15 hover:text-white"
              onClick={() => setQuoteModalOpen(true)}
            >
              Get a Custom Quote
            </Button>

            <Button
              variant="whatsapp"
              size="lg"
              className="w-full sm:w-auto"
              onClick={handleWhatsApp}
            >
              <MessageCircle className="w-4 h-4 mr-1" />
              WhatsApp Us
            </Button>
          </div>

          {/* Trust badges */}
          <div className="mt-12 pt-8 border-t border-white/15 grid grid-cols-2 sm:grid-cols-3 gap-6 text-white/75 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C5A46D] shrink-0" />
              <span>Starting from ₹1,500</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C5A46D] shrink-0" />
              <span>Transparent Pricing</span>
            </div>
            <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
              <Sparkles className="w-4 h-4 text-[#C5A46D] shrink-0" />
              <span>Navi Mumbai Local Team</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
